import express from 'express';
const router = express.Router();
import globalController, {
  addBanana,
  deleteBanana,
  getBananas,
  getBananaFact,
  allTheCountriesCallController,
} from './controllers/controller.js';
import { categoryController } from './controllers/category-controller.js';
import { descriptionController } from './controllers/description-controller.js';
import { gptController } from './controllers/gpt-controller.js';
import * as lightingController from './controllers/lighting-controller.js';

router.get('/api/:selectedCategory', categoryController);

router.get('/api/:selectedCategory/:selectedMetric', descriptionController);

router.get(
  '/api/:category/:metricName/:param1/:param2?/:param3?/:param4?/:param5?',
  globalController
);

router.get('/global/:category/:metricName', allTheCountriesCallController);

router.post('/gpt', gptController);

router.post('/lighting/login', lightingController.login);
router.post('/lighting/color', lightingController.color);

router.post('/banana/:name', addBanana);

// reset banana table
router.delete('/bananas', deleteBanana);

// get all bananas eaten and by who
router.get('/bananas', getBananas);

// get a random banana fact
router.get('/bananaFact', getBananaFact);

export default router;
