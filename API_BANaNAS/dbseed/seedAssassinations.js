import Sequelize from 'sequelize';
import { DataTypes } from '@sequelize/core';
import assassinations from '../wiki-scrape/assassinations.json' assert { type: 'json' };
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

const Assassination = sequelize.define('assassinations', {
  category: DataTypes.STRING,
  year: DataTypes.STRING,
  position: DataTypes.STRING,
  country: DataTypes.STRING,
  victim: DataTypes.STRING,
});

await sequelize.sync();

(async function writeToDB() {
  for (const assassination of assassinations) {
    let category = assassination.category;
    let year = assassination.year;
    let position = assassination.position;
    let country = assassination.country;
    let victim = assassination.victim;

    await Assassination.create({
      category: category,
      year: year,
      position: position,
      country: country,
      victim: victim,
    });
  }
})();
