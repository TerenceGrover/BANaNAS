import express from 'express';
import { tradeController } from './controllers/trade-controller.js';

const router = express.Router();

router.get(
  '/api/:param1?/:param2?/:param3?/:param4?/:param5?',
  tradeController
);

export default router;
