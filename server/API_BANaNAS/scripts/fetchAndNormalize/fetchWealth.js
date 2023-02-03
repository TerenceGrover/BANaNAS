// import twentyone from './l.json' assert { type: 'json' };
import fs from 'fs';
const info = [];

async function writeForbesData() {
  try {
    for (let year = 2014; year >= 1995; year--) {
      // let year = 2021;
      const queryString = `https://forbes-worlds-billionaires-list.p.rapidapi.com/billionaires/${year}?page=0&size=100`;
      const data = await fetch(queryString, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,

          'X-RapidAPI-Host': 'forbes-worlds-billionaires-list.p.rapidapi.com',
        },
      });
      const json = await data.json();
      for (let element of json.personLists) {
        const year = element.year;
        const name = element.personName;
        const worth = (element.finalWorth / 1000).toFixed(1);
        const country = element.country;
        const bio = element.bios ? element.bios[0] : '';
        info.push({ year, name, worth, country, bio });
      }
      console.log('year ', year, ' done');
      fs.writeFileSync(`forbesApiEarlier.json`, JSON.stringify(info), 'utf8');
    }
  } catch (err) {
    console.log(err);
    fs.writeFileSync(`forbesError.json`, JSON.stringify(info), 'utf8');
  }
}

writeForbesData();
