import { queries } from '../queries/queries.js';
import { Request, Response } from 'express';

export const descriptionController = async (req: Request, res: Response) => {
  try {
    const category = req.params.selectedCategory;
    const metric = req.params.selectedMetric;
    let responseObj: any = {};
    responseObj.description = queries[category][metric]['description'];
    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: `Check your parameters, there is no test matching your request`,
    });
  }
};
