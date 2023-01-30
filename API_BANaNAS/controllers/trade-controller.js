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
    console.log(data);
    data.forEach((element) => {
      let year = element.get('year');
      let value = element.get('value');
      responseObj[year] = value;
    });
    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
  }
};
