import { Disaster } from '../models/disaster-model.js';

export const disasterController = async (req, res) => {
  try {
    const category = req.params.category;
    const data = await Disaster.findAll({
      where: {
        category: category,
      },
    });
    if (!data.length) {
      res.status(400).json({
        message: 'no data found, check your filter and value parameters',
      });
      return;
    }
    const responseObj = {};
    data.forEach((element) => {
      const year = element.get('year');
      const place = element.get('place');
      const deathtoll = element.get('deathtoll');
      responseObj[year] = { place, deathtoll };
    });
    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
  }
};
