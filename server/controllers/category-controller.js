import { allQueries } from '../queries/queries.js';

//PASTE THIS INTO ROUTER -> router.get('/api/:selectedCategory', categoryController);

export const categoryController = async (req, res) => {
  try {
    const category = req.params.selectedCategory;
    let responseObj = {};
    for (let query in allQueries[category]) {
      responseObj[query] = {
        description: allQueries[category][query]['description'],
        parameters_needed: allQueries[category][query]['parameters_needed'],
      };
    }
    res.status(200).json(responseObj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
