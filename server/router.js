import express from 'express';
const router = express.Router();
import globalController, {addBanana, deleteBanana, getBananas} from './controllers/controller.js';
import { categoryController } from './controllers/category-controller.js';

router.get(
  '/api/:category/:metricName/:param1?/:param2?/:param3?/:param4?/:param5?',
  globalController
);
router.get('/api/:selectedCategory', categoryController);

router.post('/banana/:name', addBanana);

// reset banana table 
router.delete('/bananas', deleteBanana);

// get all bananas eaten and by who 
router.get('/bananas', getBananas);
export default router;

fetch('http://localhost:3000/category/1/2/3');
