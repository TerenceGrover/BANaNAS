import { assert } from 'console';
import fs from 'fs';
import massiveObj from './exportoats.json' assert { type: 'json' };

function addToMassiveObj(worldCommodityData, massiveObj, commodityName) {
  worldCommodityData.dataset.forEach((country) => {
    let countryName = country.rtTitle;
    let weight = country.NetWeight;
    let value = country.TradeValue;
    let yr = country.periodDesc;

    if (!massiveObj[countryName]) {
      massiveObj[countryName] = {};
    }
    if (!massiveObj[countryName][commodityName]) {
      massiveObj[countryName][commodityName] = {};
    }
    massiveObj[countryName][commodityName][yr] = weight;
  });
}

async function getComTradeData(year, commodityCode) {
  const queryString = `https://comtrade.un.org/api/get?max=50000&type=C&freq=A&px=HS&ps=${year}&r=ALL&p=0&rg=2&cc=${commodityCode}&fmt=json`;
  const data = await fetch(queryString);
  const json = await data.json();
  // console.log('json', json);
  return json;
}

async function addToGiantExportsObj(massiveObj, commodityCode, commodityName) {
  try {
    for (let year = 2020; year >= 1988; year--) {
      const worldCommodityData = await getComTradeData(year, commodityCode);
      if (worldCommodityData) {
        addToMassiveObj(worldCommodityData, massiveObj, commodityName);
        console.log('year', year, 'done -- USA:', massiveObj.USA);
        if (year === 1988) {
          fs.writeFileSync(
            `export${commodityName}.json`,
            JSON.stringify(massiveObj),
            'utf8'
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
    fs.writeFileSync(
      `export${commodityName}.json`,
      JSON.stringify(massiveObj),
      'utf8'
    );
  }
}

addToGiantExportsObj(massiveObj, '1004', 'oats');

const commodities = {
  bananas: { code: '0803', description: 'bananas exported (kg)' },
  petroleumLube: { code: '2701', description: 'petroleum lube exported (kg)' },
  pigAndPoultryFat: { code: '0209', description: 'pig and poultry fat (kg)' },
  whiskey: { code: '220830', description: 'whiskey exported (liters)' },
  bloodAntiseraToxinsAndCultures: {
    code: '3002',
    description: 'blood, antisera, toxins, and cultures exported (kg)',
  },
  fertilizers: { code: '31', description: 'fertilizers exported (US$)' },
  pharmaceuticals: {
    code: '30',
    description: 'pharmaceuticals exported (US$)',
  },
  potatoes: { code: '0701', description: 'potatoes exported (kg)' },
  coffee: { code: '0901', description: 'coffee exported (kg)' },
  oats: { code: '1004', description: 'oats exported (kg)' },
  rapeSeed: { code: '1205', description: 'oats exported (kg)' },
  sausages: { code: '1601', description: 'sausages exported (kg)' },
};
