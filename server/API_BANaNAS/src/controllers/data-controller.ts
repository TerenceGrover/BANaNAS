import { Commodity } from '../models/commodity-model.js';
import { WealthAmount } from '../models/wealth-model.js';
import { Sequelize } from 'sequelize';
import { Request, Response } from 'express';
import { DataResponse } from '../../returnTypes';

export const dataController = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const categoryName = req.params.categoryName;
    const noun1 = req.params.param1; // country
    const noun2 = req.params.param2; // commodity or name
    const responseObj: DataResponse | any = {};

    async function queryModel(categoryName: string) {
      let data;
      switch (categoryName) {
        case 'Commodity':
          if (noun1 === 'global') {
            data = await Commodity.findAll({
              where: {
                commodity: noun2,
              },
            });
          } else {
            data = await Commodity.findAll({
              where: {
                country: noun1,
                commodity: noun2,
              },
            });
          }
          return data;
          break;
        case 'Wealth':
          if (noun2 === 'global') {
            data = await WealthAmount.findAll({});
          } else {
            data = await WealthAmount.findAll({
              where: {
                name: noun2,
              },
            });
          }
          return data;
          break;
      }
    }
    let data = await queryModel(categoryName);

    if (!data || !data.length) {
      res.status(404).json({
        message: 'no data found, check your commodity name and year values',
      });
      return;
    }
    if (categoryName === 'Commodity' && noun1 === 'global') {
      data.forEach((element: any) => {
        let year = element.get('year');
        let value = element.get('value');
        let country = element.get('country');
        if (!responseObj[year]) {
          responseObj[year] = {};
        }
        responseObj[year][country] = value;
      });
      res.status(200).json(responseObj);
      return;
    }
    if (categoryName === 'Wealth' && noun2 === 'global') {
      data.forEach((element: any) => {
        let year = element.get('year');
        let value = element.get('value');
        let name = element.get('name');
        if (!responseObj[year]) {
          responseObj[year] = {};
        }
        responseObj[year][name] = value;
      });
      res.status(200).json(responseObj);
      return;
    }
    data.forEach((element: any) => {
      let year = element.get('year');
      let value = element.get('value');
      responseObj[year] = value;
    });
    res.status(200).json(responseObj);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
    console.log(err);
  }
};
