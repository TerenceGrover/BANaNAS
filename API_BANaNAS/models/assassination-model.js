import { DataTypes } from 'sequelize';
import sequelize from './index.js';

export const Assassination = sequelize.define('assassinations', {
  category: DataTypes.STRING,
  year: DataTypes.STRING,
  position: DataTypes.STRING,
  country: DataTypes.STRING,
  victim: DataTypes.STRING,
});

async function synchronize() {
  await Assassination.sync();
}
synchronize();
