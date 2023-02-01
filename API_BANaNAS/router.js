import express from 'express';
import { tradeController } from './controllers/trade-controller.js';
import { assassinationController } from './controllers/assassination-controller.js';
import { disasterController } from './controllers/disaster-controller.js';

const router = express.Router();

router.get('/api/:param1/:param2/:param3?/:param4?/:param5?', tradeController);
router.get('/filter/api/Assassination/:value', assassinationController);
router.get('/filter/api/Disaster/:category', disasterController);

export default router;
