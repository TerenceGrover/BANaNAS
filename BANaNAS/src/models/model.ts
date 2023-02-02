import { DataTypes } from 'sequelize';
import sequelize from './index.js';

// each one og these will be a category
// meaning that inside queries will be the queries for that category (JSON stringified) in this format:
//
const CategoriesTable = sequelize.define('CategoriesTable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  queries: {
    type: DataTypes.TEXT,
  },
});

const BananaCounter = sequelize.define('BananaCounter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function synchronize() {
  await CategoriesTable.sync();
  await BananaCounter.sync();
}
synchronize();

// every 2 seconds, query the db and get the total count of bananas, the update the BananaCountNumber variable 
let BananaCountNumber = 0;
setInterval(async () => {
  const bananaCount = await BananaCounter.findAll();
  BananaCountNumber = bananaCount.reduce((acc, user:any) => acc + user.count, 0);
}, 2000);


export { CategoriesTable, BananaCounter, BananaCountNumber };