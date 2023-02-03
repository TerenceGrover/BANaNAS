import City from '../models/cities-model.js';

export const cityToLatAndLong = async (city: string) => {
  const cityData: any = await City.findOne({
    where: {
      name: city,
    },
  });
  if (!cityData) {
    throw new Error('City not found!');
  }
  return { lat: cityData.lat, lng: cityData.lng };
};
