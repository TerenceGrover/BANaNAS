import { DataTypes } from 'sequelize';
import sequelize from './index.js';

export const WealthAmount = sequelize.define('wealthamount', {
  year: DataTypes.INTEGER,
  name: DataTypes.STRING,
  value: DataTypes.STRING,
});

async function synchronize() {
  await WealthAmount.sync();
}
synchronize();
