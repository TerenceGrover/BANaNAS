import { Sequelize, Model } from 'sequelize';
import { DataTypes } from '@sequelize/core';
import dotenv from 'dotenv';
dotenv.config();
//To seed the database, uncomment the following line after running wiki-scrape assassinations.py to write assassinations.json:
// import assassinations from '../wiki-scrape/assassinations.json' assert { type: 'json' }

const sequelize = new Sequelize('your db connection string', {
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

await (async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connection to db ok');
  } catch (error) {
    console.log('err' + error);
  }
})();

const Assassination = sequelize.define('assassinations', {
  category: DataTypes.STRING,
  year: DataTypes.STRING,
  position: DataTypes.STRING,
  country: DataTypes.STRING,
  victim: DataTypes.STRING,
});
//uncomment to sync
//   await sequelize.sync();

// uncomment the following code after running wiki scrape assassinations and importing the assassination.json file:

// (async function writeToDB() {
//   for (const assassination of assassinations) {
//     let category = assassination.category;
//     let year = assassination.year;
//     let position = assassination.position;
//     let country = assassination.country;
//     let victim = assassination.victim;

//     await Assassination.create({
//       category: category,
//       year: year,
//       position: position,
//       country: country,
//       victim: victim,
//     });
//   }
// })();
