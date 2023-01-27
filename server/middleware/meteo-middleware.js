import City from '../models/cities-model.js';

export const cityToLatAndLong = async (city) => {
  const cityData = await City.findOne({
    where: {
      name: city,
    },
  });
  return [cityData.lat, cityData.lng];
};
