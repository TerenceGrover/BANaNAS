import { DataTypes } from 'sequelize';
import sequelize from './index.js';

export const Commodity = sequelize.define('commodities', {
  country: DataTypes.STRING,
  commodity: DataTypes.STRING,
  year: DataTypes.STRING,
  value: DataTypes.BIGINT,
  description: DataTypes.STRING,
});

async function synchronize() {
  await Commodity.sync();
}
synchronize();
