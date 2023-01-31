import { Commodity } from '../models/commodity-model.js';
import { Sequelize } from 'sequelize';

export const tradeController = async (req, res) => {
  try {
    const countryName = req.params.param1;
    const commodityName = req.params.param2;
    const startYear = req.params.param3;
    const endYear = req.params.param4;
    const responseObj = {};
    const data = await Commodity.findAll({
      where: {
        country: countryName,
        commodity: commodityName,
        year: {
          [Sequelize.Op.between]: [startYear, endYear],
        },
      },
    });
    if (!data.length) {
      res
        .status(404)
        .json({
          message: 'no data found, check your commodity name and year values',
        });
      return;
    }
    data.forEach((element) => {
      let year = element.get('year');
      let value = element.get('value');
      responseObj[year] = value;
    });
    res.status(200).json(responseObj);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};
