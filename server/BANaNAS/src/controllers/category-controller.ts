import { queries } from '../queries/queries.js';
import { Request, Response } from 'express';

export const categoryController = async (req: Request, res: Response) => {
  try {
    const category = req.params.selectedCategory;
    if(!queries[category])
      return res.status(404).json({ message: 'Category not found' });
      
    let responseObj: any = {};
    for (let query in queries[category]) {
      if (category === 'Filters') {
        responseObj[query] = {
          description: queries[category][query]['description'],
          parameters_needed: queries[category][query]['parameters_needed'],
          available_filters: queries[category][query]['availableFilters'],
        };
      } else {
        responseObj[query] = {
          description: queries[category][query]['description'],
          parameters_needed: queries[category][query]['parameters_needed'],
          available_countries: queries[category][query]['countries_available'],
        };
      }
    }
    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
