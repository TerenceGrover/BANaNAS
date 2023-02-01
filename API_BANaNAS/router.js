import express from 'express';
import { tradeController } from './controllers/trade-controller.js';
import { assassinationController } from './controllers/assassination-controller.js';

const router = express.Router();

router.get('/api/:param1/:param2/:param3?/:param4?/:param5?', tradeController);
router.get('/filter/api/Assassination/:value', assassinationController);

export default router;
