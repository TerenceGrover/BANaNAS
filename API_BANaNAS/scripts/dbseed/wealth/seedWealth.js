import wealth from './wealth.json' assert { type: 'json' };
import { Sequelize } from 'sequelize';
import { DataTypes } from '@sequelize/core';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

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

const WealthAmount = sequelize.define('wealthamount', {
  year: DataTypes.INTEGER,
  name: DataTypes.STRING,
  value: DataTypes.STRING,
});

await sequelize.sync();

// (function findPeopleWithEnoughDataPoints() {
//   try {
//     let filtered = [];
//     let count = {};
//     for (const person of wealth) {
//       if (count[person.name]) {
//         count[person.name]++;
//       } else {
//         count[person.name] = 1;
//       }
//     }
//     for (const person in count) {
//       if (count[person] > 5) {
//         filtered.push(person);
//       }
//     }
//     fs.writeFileSync('available-people.json', JSON.stringify(filtered), 'utf8');
//   } catch (err) {
//     console.log(err);
//   }
// })();

(async function writeToDB() {
  for (const person of wealth) {
    const { year, name, worth } = person;

    await WealthAmount.create({
      year: year,
      name: name,
      value: worth,
    });
  }
})();
