// functions to interact with db
import { queries } from '../queries/queries.js';
import countryCodes from '../countryCodes.json' assert { type: 'json' };
import { cityToLatAndLong } from '../middleware/meteo-middleware.js';
import { meteoParser } from '../response-parsers/meteo-parser.js';
import { worldBankParser } from '../response-parsers/worldBank-parser.js';
import { BananaCounter } from '../models/model.js';
import bananaFacts from '../bananaFacts.js';
function findCountryCode(country) {
  return countryCodes[country];
}
// IN ORDER TO HAVE TWO GRAPHS THAT ARE COMPARED, NUMBER OF YEARS MUST BE THE SAME !!!!!

// the request from the frontedn looks like this:
// BASEURL/api/CATEGORY/METRICNAME/PARAM1/PARAM2/PARAM3?/PARAM4?/PARAM5?
// example:
// or http://localhost:3000/api/Weather/AverageTemperature/Stockholm/2021/2022
// or http://localhost:3000/api/Demographics/BirthRate/Italy/2019/2022
// or http://localhost:3000/api/Demographics/DeathRate/Italy/2019/2021
// or http://localhost:3000/api/Enviroment/AveragePrecipitation/Germany/2017/2019

// SHEEEEEEEEESH

const globalController = async (req, res) => {
  try {
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
      const { lat, lng } = await cityToLatAndLong(city);
      req.params.param1 = +lat;
      req.params.param4 = req.params.param3;
      req.params.param3 = req.params.param2;
      req.params.param2 = +lng;
    }
    // here check what parameters we need for the called category&metricName
    // and assign params values to them
    // for example if we need 2 params, we assign param1 to first param and param2 to second param
    let paramsNeeded = eval(
      queries[`${category}`][`${metricName}`].parameters_needed
    );
    // count the number of params passed that are not undefined
    let paramsPassed = 0;
    for (let i = 1; i <= 5; i++) {
      if (req.params[`param${i}`] !== undefined) {
        paramsPassed++;
      }
    }
    // if params passed are less than params needed, return error
    if (paramsNeeded.length !== paramsPassed) {
      return res.status(400).send('Missing some parameters!');
    }
    let params = [];
    paramsNeeded.forEach((_, index) => {
      params.push(req.params[`param${index + 1}`]);
    });

    // take the query string from queries.js and replace the params with the values
    let queryString = queries[`${category}`][`${metricName}`].queryString;
    paramsNeeded.forEach((param, index) => {
      // if param is country, we need to find the country code
      if (param === 'countryCode') {
        params[index] = findCountryCode(params[index]);
      }
      queryString = queryString.replace(param, params[index]);
    });
    // call the api and get the data
    let response;
    await fetch(queryString)
      .then((res) => res.json())
      .then((res) => (response = res));

    // based on the provider we need to call a different parser
    switch (queries[`${category}`][`${metricName}`].provider) {
      case 'World Bank':
        // parse using worldBankParser
        response = worldBankParser(response);
        break;
      case 'Open-Meteo':
        let indicatorCode =
          queries[`${category}`][`${metricName}`].indicatorCode;
        response = meteoParser(response, indicatorCode);
        break;
      case 'Bananas API':
        break;
      default:
        // do nothing
        break;
    }
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error!');
  }
};

export const addBanana = async (req, res) => {
  try {
    const name = req.params.name;
    // find one or create if not found
    const bananaCount = await BananaCounter.findOrCreate({
      where: { name: name },
      defaults: { count: 0 },
    });
    // increment count
    bananaCount[0].count++;
    // save
    await bananaCount[0].save();
    res.status(200).json({ message: 'Banana added' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBanana = async (req, res) => {
  // go in db and reset count to 0 for every user
  try {
    await BananaCounter.update({ count: 0 }, { where: {} });
    res.status(200).json({ message: 'Banana deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBananas = async (req, res) => {
  // go in db and get count for every user
  try {
    const bananaCount = await BananaCounter.findAll();
    // vreate an object with key value pairs name and count
    const bananaCountObj = {};
    bananaCount.forEach((user) => {
      bananaCountObj[user.name] = user.count;
    });
    // add total count to the object
    bananaCountObj.total = bananaCount.reduce(
      (acc, user) => acc + user.count,
      0
    );
    res.status(200).json(bananaCountObj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBananaFact = async (req, res) => {
  try {
    const bananaCount = await BananaCounter.findAll();
    let BananaCountNumber = bananaCount.reduce((acc, user) => acc + user.count, 0);

    const random = Math.floor(Math.random() * 21);
    const randomFact = bananaFacts[`${random}`];

    const fact = randomFact.replace('BananaCountNumber', BananaCountNumber);
    res.status(200).json({ fact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default globalController;
