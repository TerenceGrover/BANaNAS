var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './router.js';
import sequelize from './models/index.js';
const app = express();
const port = 4000;
function startDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Connection to db ok');
        }
        catch (error) {
            console.log('err' + error);
        }
    });
}
startDB();
const corsOptions = {
    origin: ['http://localhost:3000', 'https://data-banana.com'],
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.listen(port, () => {
    console.log('Launched 🚀: ' + ' http://localhost:' + port);
});
