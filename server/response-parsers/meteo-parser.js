export const meteoParser = (json, indicatorCode) => {
  let responseObj = {};
  for (let i = 0; i < json.daily.time.length; i += 364) {
    let temps = json.daily.indicatorCode.slice(i, i + 364);
    let year = json.daily.time[i].slice(0, 4);
    let avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    responseObj[year] = avg;
    console.log('responseObj', responseObj);
  }
  return responseObj;
};

// const data = await fetch(
//   'https://archive-api.open-meteo.com/v1/archive?latitude=18.20&longitude=110.5&start_date=2010-01-01&end_date=2020-12-31&daily=temperature_2m_mean&timezone=America%2FAnchorage'
// );
// const read = await data.json();
// meteoParser(read);
