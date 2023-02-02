import cities from './cities.json' assert { type: 'json' };
import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
import { DataTypes } from '@sequelize/core';
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
start();

const City = sequelize.define('cities', {
  name: DataTypes.STRING,
  lat: DataTypes.STRING,
  lng: DataTypes.STRING,
});

sequelize.sync();

function hasWeirdCharacters(str) {
  let weird = false;
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    if (charCode > 128) {
      weird = true;
    }
  }
  return weird;
}

(async function seed() {
  try {
    for (const city of cities) {
      const weird = hasWeirdCharacters(city.name);
      if (weird) {
      } else {
        const done = await City.create({
          name: city.name,
          lat: city.lat,
          lng: city.lng,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
