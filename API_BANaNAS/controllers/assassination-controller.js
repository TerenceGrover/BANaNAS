import { Assassination } from '../models/assassination-model.js';
import { assassinCategoryFilters } from '../filter-categories/assassin-filters.js';

export const assassinationController = async (req, res) => {
  try {
    const value = req.params.value;
    const responseObj = {};
    const data = assassinCategoryFilters.includes(value)
      ? await Assassination.findAll({
          where: {
            category: value,
          },
        })
      : await Assassination.findAll({
          where: {
            country: value,
          },
        });
    if (!data.length) {
      res.status(400).json({
        message: 'no data found, check your filter and value parameters',
      });
      return;
    }
    data.forEach((element) => {
      const year = element.get('year');
      const victim = element.get('victim');
      const position = element.get('position');
      const country = element.get('country');
      responseObj[year] = { victim, position, country };
    });
    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
  }
};
