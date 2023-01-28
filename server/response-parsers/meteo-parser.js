// const snow = await fetch(
//   'https://archive-api.open-meteo.com/v1/archive?latitude=39.74&longitude=-104.98&start_date=2010-01-01&end_date=2011-12-31&daily=temperature_2m_mean&timezone=America%2FAnchorage'
// );
// const snowJson = await snow.json();
// const code = 'temperature_2m_mean';

export const meteoParser = (json, indicatorCode) => {
  let responseObj = {};
  console.log('values', json.daily[indicatorCode]);
  for (let i = 0; i < json.daily.time.length - 1; i += 365) {
    let values = json.daily[indicatorCode].slice(i, i + 365);
    let year = json.daily.time[i].slice(0, 4);
    let avg = values.reduce((a, b) => a + b, 0) / values.length;
    let sum = values.reduce((a, b) => a + b, 0);
    responseObj[year] =
      indicatorCode === 'snowfall_sum' || indicatorCode === 'rain_sum'
        ? sum
        : avg;
    console.log('responseObj', responseObj);
  }
  return responseObj;
};

//SHEEEEEEEESH

// meteoParser(snowJson, code);

// const data = await fetch(
//   'https://archive-api.open-meteo.com/v1/archive?latitude=18.20&longitude=110.5&start_date=2010-01-01&end_date=2020-12-31&daily=temperature_2m_mean&timezone=America%2FAnchorage'
// );
// const read = await data.json();
// meteoParser(read);
