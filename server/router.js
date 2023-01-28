import express from 'express';
const router = express.Router();
import globalController from './controllers/controller.js';

// const { func1, func2 } = require('./controllers/controller');

// router.get('/messages', func1);
// router.post('/messages', func2);


router.get('/api/:category/:metricName/:param1?/:param2?/:param3?/:param4?/:param5?', globalController);



export default router;


fetch('http://localhost:3000/category/1/2/3')
