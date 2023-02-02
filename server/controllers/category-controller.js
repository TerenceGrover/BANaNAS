import { queries } from '../queries/queries.js';

export const dcategoryController = async (req, res) => {
  try {
    const category = req.params.selectedCategory;
    let responseObj = {};
    for (let query in queries[category]) {
      responseObj[query] = {
        description: queries[category][query]['description'],
        parameters_needed: queries[category][query]['parameters_needed'],
        available_countries: queries[category][query]['availableCountries'],
      };
    }
    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
