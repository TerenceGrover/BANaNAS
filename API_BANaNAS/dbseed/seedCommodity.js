import Sequelize from 'sequelize';
import { DataTypes } from '@sequelize/core';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    client_encoding: 'auto',
  },
});

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connection to db ok');
  } catch (error) {
    console.log('err' + error);
  }
}
await start();

const Commodity = sequelize.define('commodities', {
  country: DataTypes.STRING,
  commodity: DataTypes.STRING,
  year: DataTypes.STRING,
  value: DataTypes.BIGINT,
  description: DataTypes.STRING,
});

sequelize.sync();

async function writeToDB(
  worldCommodityData,
  commodityName,
  commodityDescription
) {
  for (const country of worldCommodityData.dataset) {
    let countryName = country.rtTitle;
    let weight = country.NetWeight;
    let value = country.TradeValue;
    let quantity = country.TradeQuantity;
    let yr = country.periodDesc;

    await Commodity.create({
      country: countryName,
      commodity: commodityName,
      year: yr,
      value: weight,
      description: commodityDescription,
    });
  }
}

async function getComTradeData(year, commodityCode) {
  const queryString = `https://comtrade.un.org/api/get?max=50000&type=C&freq=A&px=HS&ps=${year}&r=ALL&p=0&rg=2&cc=${commodityCode}&fmt=json`;
  const data = await fetch(queryString);
  const json = await data.json();
  return json;
}

async function seedDB(commodityCode, commodityName, commodityDescription) {
  try {
    for (let year = 2021; year >= 1988; year--) {
      const worldCommodityData = await getComTradeData(year, commodityCode);
      if (worldCommodityData) {
        await writeToDB(
          worldCommodityData,
          commodityName,
          commodityDescription
        );
        console.log(commodityName, ' year ', year, ' done');
      }
    }
  } catch (err) {
    console.log(err);
  }
}

seedDB('0701', 'potatoes', 'potatoes exported (kg)');

const commodities = [
  { name: 'bananas', code: '0803', description: 'bananas exported (kg)' },
  {
    name: 'petroleumLube',
    code: '2701',
    description: 'petroleum lube exported (kg)',
  },
  {
    name: 'pigAndPoultryFat',
    code: '0209',
    description: 'pig and poultry fat (kg)',
  },
  { name: 'whiskey', code: '220830', description: 'whiskey exported (liters)' },
  {
    name: 'bloodAndToxinsAndCultures',
    code: '3002',
    description: 'blood, antisera, toxins, and cultures exported (kg)',
  },
  {
    name: 'fertilizers',
    code: '31',
    description: 'fertilizers exported (US$)',
  },
  {
    name: 'pharmaceuticals',
    code: '30',
    description: 'pharmaceuticals exported (US$)',
  },
  { name: 'potatoes', code: '0701', description: 'potatoes exported (kg)' },
  { name: 'coffee', code: '0901', description: 'coffee exported (kg)' },
  { name: 'oats', code: '1004', description: 'oats exported (kg)' },
  { name: 'rapeSeed', code: '1205', description: 'oats exported (kg)' },
  { name: 'sausages', code: '1601', description: 'sausages exported (kg)' },
];
