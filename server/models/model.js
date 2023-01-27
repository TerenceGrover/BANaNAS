import { DataTypes } from 'sequelize';
import { Sequelize } from './index.js';

// each one og these will be a category
// meaning that inside queries will be the queries for that category (JSON stringified) in this format:
// 
const CategoriesTable = sequelize.define('CategoriesTable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  queries: {
    type: DataTypes.TEXT,
  }
})

async function synchronize() {
  await CategoriesTable.sync(); 
} synchronize();

module.exports = {CategoriesTable};