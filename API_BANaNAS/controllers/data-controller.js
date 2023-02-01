import { Commodity } from '../models/commodity-model.js';
import { WealthAmount } from '../models/wealth-model.js';
import { Sequelize } from 'sequelize';

export const dataController = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const noun1 = req.params.param1; // country
    const noun2 = req.params.param2; // commodity or name
    const responseObj = {};
    async function queryModel(categoryName) {
      let data;
      switch (categoryName) {
        case 'Commodity':
          data = await Commodity.findAll({
            where: {
              country: noun1,
              commodity: noun2,
            },
          });
          return data;
          break;
        case 'Wealth':
          data = await WealthAmount.findAll({
            where: {
              name: noun2,
            },
          });
          return data;
          break;
      }
    }
    let data = await queryModel(categoryName);

    if (!data.length) {
      res.status(404).json({
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
