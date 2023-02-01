import { DataTypes } from 'sequelize';
import sequelize from './index.js';

export const Disaster = sequelize.define('disasters', {
  category: DataTypes.STRING,
  year: DataTypes.STRING,
  place: DataTypes.STRING,
  deathtoll: DataTypes.STRING,
});

async function synchronize() {
  await Disaster.sync();
}
synchronize();
