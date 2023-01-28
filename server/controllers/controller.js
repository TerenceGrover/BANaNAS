// functions to interact with db
import {queries} from '../queries/queries.js';
import countryCodes from '../countryCodes.json' assert { type: "json" };

function findCountryCode(country) {
  return countryCodes[country];
}

// the request from the frontedn looks like this:

// IN ORDER TO HAVE TWO GRAPHS THAT ARE COMPARED, NUMBER OF YEARS MUST BE THE SAME !!!!!

// BASEURL/api/CATEGORY/METRICNAME/PARAM1/PARAM2/PARAM3?/PARAM4?/PARAM5?
// example:
// or http://localhost:3000/api/Weather/AverageTemperature/Stockholm/2021/2022
// or http://localhost:3000/api/Demographics/BirthRate/Italy/2019/2022
// or http://localhost:3000/api/Demographics/DeathRate/Italy/2019/2021
// or http://localhost:3000/api/Enviroment/AveragePrecipitation/Germany/2017/2019

const globalController = async (req, res) => {
  // every call will have category and metricName. We need to check if they are valid.  

  const { category, metricName } = req.params;

  // if missing category or metricName, return error
  if (!category || !metricName) {
    return res.status(400).send('Missing category or metric name!');
  }

  // if category or metricName are not valid, return error
  if (!queries[`${category}`] || !queries[`${category}`][`${metricName}`]) {
    return res.status(400).send('Invalid category or metric name!');
  }
  // if the category is the Weather, we need to convert the city to lat and long
  if (category === 'Weather') {
    const city = req.params.param1;
    const { latitude, longitude } = await cityToLatAndLong(city);
    req.params.param1 = latitude;
    req.params.param2 = longitude;
  }
  // here check what parameters we need for the called category&metricName
  // and assign params values to them
  // for example if we need 2 params, we assign param1 to first param and param2 to second param
  let paramsNeeded = eval(queries[`${category}`][`${metricName}`].parameters_needed);
  // count the number of params passed that are not undefined 
  let paramsPassed = 0;
  for (let i = 1; i <= 5; i++) {
    if (req.params[`param${i}`] !== undefined) {
      paramsPassed++;
    }
  }
  // if params passed are less than params needed, return error
  if(paramsNeeded.length !== paramsPassed) {
    return res.status(400).send('Missing some parameters!');
  }

  let params = [];
  paramsNeeded.forEach((_, index) => {
    params.push(req.params[`param${index + 1}`]);
  });

  // so here we have 2 arrays with params needed and params values, and the indexes match.
  // we can use them to call the api and get the data
  // take the query string from queries.js and replace the params with the values
  let queryString = queries[`${category}`][`${metricName}`].queryString;
  paramsNeeded.forEach((param, index) => {
    // if param is country, we need to find the country code
    if (param === 'countryCode') {
      params[index] = findCountryCode(params[index]);
    }
    queryString = queryString.replace(param, params[index]);
  });

  console.log(queryString);
  // call the api and get the data
  let response;
  await fetch(queryString)
    .then((res) => res.json())
    .then((res) => (response = res));
  res.status(200).send(response);

  // based on the provider we need to call a different parser

  // switch (category) {
  //   case 'World Bank':
  //     // parse using worldBankParser
  //     break;
  //   case 'WeatherParser':
  //     // parse using WeatherParser
  //     break;
  //   case 'EuroStatParser':
  //     // parse using EuroStatParser
  //     break;
  //   default:
  //     // do nothing
  //     break;
  // }
};


async function callApi(category, params, country, startYear, endYear) {
  let countryCode = findCountryCode(country);
  let massiveObjectThing = `${category}.queries.${params}.queryString`;
  let queryString = eval(massiveObjectThing);
  queryString = queryString.replace('countryCode', countryCode);
  queryString = queryString.replace('startYear', startYear);
  queryString = queryString.replace('endYear', endYear);
  let response;
  let arr = [];
  await fetch(queryString)
    .then((res) => res.json())
    .then((res) => (response = res));

  // mega parser thingy

  response[1].forEach((item) => {
    let buff = {
      year: item.date,
      value: item.value,
    };
    arr.push(buff);
  });
  return arr;
}

export default globalController;