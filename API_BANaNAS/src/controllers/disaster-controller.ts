import { Disaster } from '../models/disaster-model.js';
import { Request, Response } from 'express';
import { DisasterResponse } from '../../returnTypes.js';

export const disasterController = async (req: Request, res: Response) => {
  try {
    const responseObj: DisasterResponse = {};
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
    data.forEach((element: any) => {
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
