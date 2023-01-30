import fs from 'fs';
import commodity from './bananas2010.json' assert { type: 'json' };
// import Sequelize from 'sequelize';
// import * as dotenv from 'dotenv';
// import { DataTypes } from '@sequelize/core';
// dotenv.config();

// const sequelize = new Sequelize(
//   'postgresql://doadmin:AVNS_Y4mlFzDkJzW0ZzEysyf@db-postgresql-fra1-04268-do-user-13299607-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=no-verify',
//   {
//     dialect: 'postgres',
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//       client_encoding: 'auto',
//     },
//   }
// );

// async function start() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection to db ok');
//   } catch (error) {
//     console.log('err' + error);
//   }
// }
// start();

// const Country = sequelize.define('countries', {
//   countryName: DataTypes.STRING,
//   primaryKey: true,
// });

// const ExportData = sequelize.define('export-data', {
//   year: DataTypes.INTEGER,
//   bananas: DataTypes.INTEGER,
// });

// Country.hasMany(ExportData, {
//   foreignKey: 'countryName',
//   as: 'exportData',
// });

// sequelize.sync();

let exports = {
  // America: {
  //   bananas: {
  //     2010: 0,
  //     2011: 0,
  //   },
  // },
};
// const bananas = 'bananas';

(async function write() {
  commodity.dataset.forEach((country) => {
    let name = country.rtTitle;
    let yr = country.periodDesc;
    let weight = country.NetWeight;

    if (!exports[name]) {
      exports[name] = {};
    }
    if (!exports[name].bananas) {
      exports[name].bananas = {};
    }
    exports[name].bananas[yr] = weight;
  });
  console.log(exports);
  fs.writeFileSync('bananaexport.json', JSON.stringify(exports), 'utf8');
})();

// fs.writeFileSync(test.json, exports, 'utf8');
// const exports = {name: { bananas: {country.yr: country.NetWeight}}
