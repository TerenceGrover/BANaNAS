import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const User = sequelize.define('users', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  deviceToken: DataTypes.TEXT,
});

async function synchronize() {
  await User.sync();
}
synchronize();

export default User;
