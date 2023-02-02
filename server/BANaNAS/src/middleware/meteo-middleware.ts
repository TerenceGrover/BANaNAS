import City from '../models/cities-model.js';

export const cityToLatAndLong = async (city: string) => {
  const cityData: any = await City.findOne({
    where: {
      name: city,
    },
  });

  return { lat: cityData.lat, lng: cityData.lng };
};
