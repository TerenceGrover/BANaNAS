import avalanches from '../wiki-scrape/avalanches.json' assert { type: 'json' };
import earthquakes from '../wiki-scrape/earthquakes.json' assert { type: 'json' };
import tornadoes from '../wiki-scrape/tornadoes.json' assert { type: 'json' };
import volcanoes from '../wiki-scrape/volcanoes.json' assert { type: 'json' };
import { Sequelize } from 'sequelize';
import { DataTypes } from '@sequelize/core';
import dotenv from 'dotenv';
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

const Disaster = sequelize.define('disasters', {
  category: DataTypes.STRING,
  year: DataTypes.STRING,
  place: DataTypes.STRING,
  deathtoll: DataTypes.STRING,
});

await sequelize.sync();

let normalized = [];
function normalize(disastertype, category) {
  for (const year in disastertype) {
    let event = disastertype[year];
    let place = event.place;
    let deathtoll = event.deathtoll ? event.deathtoll : null;
    normalized.push({ category, year, place, deathtoll });
  }
}
normalize(avalanches, 'avalanche');
normalize(earthquakes, 'earthquake');
normalize(tornadoes, 'tornado');
normalize(volcanoes, 'volcano');

(async function writeToDB() {
  for (const disaster of normalized) {
    const { category, year, place, deathtoll } = disaster;

    await Disaster.create({
      category: category,
      year: year,
      place: place,
      deathtoll: deathtoll,
    });
  }
  console.log('done');
})();
