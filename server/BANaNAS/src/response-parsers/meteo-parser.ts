export const meteoParser = (json: any, indicatorCode: string) => {
  let responseObj: any = {};
  console.log('values', json.daily[indicatorCode]);
  for (let i = 0; i < json.daily.time.length - 1; i += 365) {
    let values = json.daily[indicatorCode].slice(i, i + 365);
    let year = json.daily.time[i].slice(0, 4);
    let avg = values.reduce((a: number, b: number) => a + b, 0) / values.length;
    let sum = values.reduce((a: number, b: number) => a + b, 0);
    responseObj[year] =
      indicatorCode === 'snowfall_sum' || indicatorCode === 'rain_sum'
        ? sum
        : avg;
    console.log('responseObj', responseObj);
  }
  return responseObj;
};
