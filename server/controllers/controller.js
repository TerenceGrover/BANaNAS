// functions to interact with db
import model from '../models/model.js';

exports.globalController = async (req, res) => {
  const category = req.params.category;

  if (category === 'Weather') {
    const city = req.params.param1;
    const {latitude, longitude} = await cityToLatAndLong(city)
  }


  // do things like calling api etc 


  switch (category) {
    case 'World Bank':
      // parse using worldBankParser
      break;
    case 'WeatherParser':
      // parse using WeatherParser
      break;
    case 'EuroStatParser':
      // parse using EuroStatParser
      break;
    default:
      // do nothing 
      break;
  }
}