import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './router.js';
import sequelize from './models/index.js';

const app = express();
const port = 4000;

async function startDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection to db ok');
  } catch (error) {
    console.log('err' + error);
  }
}
startDB();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log('Launched 🚀: ' + ' http://localhost:' + port);
});
