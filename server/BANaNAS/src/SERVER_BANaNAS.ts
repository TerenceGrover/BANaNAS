import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './router.js';
import sequelize from './models/index.js';
import path from 'path';

const app = express();
const port = 3000;
let __dirname = path.resolve();
let pathToPrivate = path.join(__dirname, '..');

async function startDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection to db ok');
  } catch (error) {
    console.log('err' + error);
  }
}
startDB();

const corsOptions = {
  origin: ['http://localhost:8080', 'https://data-banana.com'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.get('*', (req, res) => {
  res.sendFile(pathToPrivate + '/src/public/index.html');
});

app.listen(port, () => {
  console.log('Launched 🚀: ' + ' http://localhost:' + port);
});

export default app;