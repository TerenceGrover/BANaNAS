import countryCodes from '../countryCodes.json';

function findCountryCode(country) {
  return countryCodes[country];
}

async function callApi(category, params, country, startYear, endYear) {
  let countryCode = findCountryCode(country);
  let massiveObjectThing = `${category}.queries.${params}.queryString`;
  let queryString = eval(massiveObjectThing);
  queryString = queryString.replace('countryCode', countryCode);
  queryString = queryString.replace('startYear', startYear);
  queryString = queryString.replace('endYear', endYear);
  let response;
  let arr = [];
  await fetch(queryString)
    .then((res) => res.json())
    .then((res) => (response = res));

  // mega parser thingy

  response[1].forEach((item) => {
    let buff = {
      year: item.date,
      value: item.value,
    };
    arr.push(buff);
  });
  return arr;
}

// this function calculates the correlation between data
async function calculateCorrelation() {
  const first = await callApi('PEOPLE', 'DeathRate', 'Italy', 2010, 2022);
  const second = await callApi('PEOPLE', 'BirthRate', 'Yemen', 2010, 2022);
  let x = first.value;
  let n = first.length;
  let y = second.value;
  let xSum = 0,
    ySum = 0,
    xSquareSum = 0,
    ySquareSum = 0,
    xySum = 0;
  for (let i = 0; i < n; i++) {
    xySum += x[i].value * y[i].value;
    xSum += x[i].value;
    ySum += y[i].value;
    xSquareSum += x[i].value * x[i].value;
    ySquareSum += y[i].value * y[i].value;
  }
  let numerator = n * xySum - xSum * ySum;
  let denominator = Math.sqrt(
    (n * xSquareSum - xSum * xSum) * (n * ySquareSum - ySum * ySum)
  );
  let r = numerator / denominator;
  return r;
}