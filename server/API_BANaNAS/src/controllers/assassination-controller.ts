import { Assassination } from '../models/assassination-model.js';
import { assassinationCategoryFilters } from '../assassination-filters.js';
import { Request, Response } from 'express';
import { AssassinationResponse } from '../../returnTypes';

export const assassinationController = async (req: Request, res: Response) => {
  try {
    const value = req.params.value;
    const responseObj: AssassinationResponse = {};
    const data = assassinationCategoryFilters.includes(value)
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
      res.status(404).json({
        message: 'no data found, check your filter and value parameters',
      });
      return;
    }
    console.log(data);
    data.forEach((element: any) => {
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
