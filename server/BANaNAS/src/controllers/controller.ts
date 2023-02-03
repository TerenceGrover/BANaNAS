// functions to interact with db
import { queries } from '../queries/queries.js';
import { Request, Response } from 'express';
import { countryCodes } from '../countryCodes.js';
import { cityToLatAndLong } from '../middleware/meteo-middleware.js';
import { meteoParser } from '../response-parsers/meteo-parser.js';
import { worldBankParser } from '../response-parsers/worldBank-parser.js';
import { BananaCounter } from '../models/model.js';
import bananaFacts from '../bananaFacts.js';
import axios from 'axios';

function findCountryCode(country: string) {
  return countryCodes[country];
}

const globalController = async (req: Request, res: Response) => {
  try {
    // every call will have category and metricName. We need to check if they are valid.
    const { category, metricName } = req.params;
    // if missing category or metricName, return error
    if (!category || !metricName) {
      return res.status(404).send('Missing category or metric name!');
    }
    // if category or metricName are not valid, return error
    if (!queries[`${category}`] || !queries[`${category}`][`${metricName}`]) {
      return res.status(404).send('Invalid category or metric name!');
    }
    // if the category is the Weather, we need to convert the city to lat and long
    if (category === 'Weather') {
      const city = req.params.param1;
      try {
        const { lat, lng } = await cityToLatAndLong(city);
        req.params.param4 = req.params.param3;
        req.params.param3 = req.params.param2;
        req.params.param1 = lat;
        req.params.param2 = lng;
        const year: number = +req.params.param3;
        if (year < 1959 || year > 2022) {
          return res
            .status(404)
            .send('Weather data is only available from 1959 to 2022');
        }
      } catch (error) {
        return res.status(404).send('City not found!');
      }
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
      return res.status(404).send('Missing some parameters!');
    }
    let params: any = [];
    paramsNeeded.forEach((_: any, index: number) => {
      params.push(req.params[`param${index + 1}`]);
    });

    // take the query string from queries.js and replace the params with the values
    let queryString = queries[`${category}`][`${metricName}`].queryString;
    paramsNeeded.forEach((param: string, index: number) => {
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
        let indicatorCode: string =
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
    return res.status(500).json({ message: 'Server error' });
  }
};

export const addBanana = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    // find one or create if not found
    const bananaCount: any = await BananaCounter.findOrCreate({
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
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBanana = async (req: Request, res: Response) => {
  // go in db and reset count to 0 for every user
  try {
    await BananaCounter.update({ count: 0 }, { where: {} });
    res.status(200).json({ message: 'Banana deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getBananas = async (req: Request, res: Response) => {
  // go in db and get count for every user
  try {
    const bananaCount: any = await BananaCounter.findAll();
    // vreate an object with key value pairs name and count
    const bananaCountObj: any = {};
    bananaCount.forEach((user: any) => {
      bananaCountObj[user.name] = user.count;
    });
    // add total count to the object
    bananaCountObj.total = bananaCount.reduce(
      (acc: number, user: any) => acc + user.count,
      0
    );
    res.status(200).json(bananaCountObj);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getBananaFact = async (req: Request, res: Response) => {
  try {
    const bananaCount = await BananaCounter.findAll();
    let BananaCountNumber = bananaCount.reduce(
      (acc: number, user: any) => acc + user.count,
      0
    );

    const random: number = Math.floor(Math.random() * 21);
    const randomFact = bananaFacts[`${random}`];

    const fact = randomFact.replace('BananaCountNumber', BananaCountNumber);
    res.status(200).json({ fact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const allTheCountriesCallController = async (req: Request,res: Response) => {
  try {
    let bigAssArray: any = [];
    const category = req.params.category;
    const metricName = req.params.metricName;
    console.log(category, metricName);
    // check if the category and metricName exist in queries.js
    if (
      !queries[`${category}`] ||
      !queries[`${category}`][`${metricName}`]
    ) {
      return res.status(404).send('Category or metric not found!');
    }
    // we dont need parameters because we are gonna call every country that is in the countries_available array of this metric, for the years 1960-2022
    // take the query string from queries.js and replace the params with the values
    let queryString = queries[`${category}`][`${metricName}`].queryString;
    // replace startYear and endYear with 1960 and 2022
    queryString = queryString.replace('startYear', '1960');
    queryString = queryString.replace('endYear', '2022');
    // make a loop for every country in the countries_available array
    let countriesAvailable: any = queries[`${category}`][`${metricName}`].countries_available;
    let response: any = [];
    const promises = countriesAvailable.map(async (country: string) => {
      let countryCode = findCountryCode(country);
      let url = queryString.replace('countryCode', countryCode);
      try {
        const response = await axios.get(url);
        const parsed = worldBankParser(response.data);
        bigAssArray.push({
          contry: country,
          data: parsed
        });
      } catch (error) {
        console.error(error);
      }
    });
    await Promise.all(promises);
    return res.status(200).send(bigAssArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default globalController;
