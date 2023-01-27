// functions to interact with db
import model from '../models/model.js';

/*
exports.getMessages = async (req, res) => {
  try {
    const data = await model.find();
    res.status(200);
    res.send(data);
  } catch (e) {
    console.log('e', e);
    res.sendStatus(500);
  ctx.status = 201;
  }
}; 
exports.postMessage = async (req, res) => {
  try {
    await model.create(req.body);
    res.status(201); 
    res.send();
  } catch (e) {
    console.log('e', e); 
    res.sendStatus(500);
  }
};
*/