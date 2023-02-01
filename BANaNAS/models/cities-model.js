import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const City = sequelize.define('cities', {
  name: DataTypes.STRING,
  lat: DataTypes.STRING,
  lng: DataTypes.STRING,
});

async function synchronize() {
  await City.sync();
}
synchronize();

export default City;
