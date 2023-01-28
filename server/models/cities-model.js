import { DataTypes } from 'sequelize';
import { Sequelize } from './index.js';

const City = sequelize.define('cities', {
  name: DataTypes.STRING,
  lat: DataTypes.STRING,
  lng: DataTypes.STRING,
});

async function synchronize() {
  await City.sync();
}
synchronize();

module.exports = { City };
