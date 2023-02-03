import { queries } from './queries/queries.js';
import fs from 'fs';

// This script checks if all queries from BANaNAS API are working
// npm run dev from BANaNAS folder and npm run dev from API_BANaNAS folder
async function checkQueriesFromBananasAPI() {
  // iterate over queries
  let logs: any = {};
  let arrLength = Object.keys(queries);

  for (let category in queries) {
    // iterate over metrics in category
    let metricLog: any = {};
    for (let metricName in queries[category]) {
      // if provider is not world bank, skip
      if (queries[category][metricName].provider !== 'Bananas API') {
        continue;
      }
      let queryString = 'http://localhost:3000/api/' + category + '/';
      switch (category) {
        case 'Bananas':
          queryString += metricName + '/USA/1980/2020';
          break;
        case 'Economy':
          queryString += metricName + '/USA/1980/2020';
          break;
        case 'Weather':
          queryString += metricName + '/Seattle/1980/2020';
          break;
        case 'Finance':
          queryString += metricName + '/Jeff%20Bezos/1980/2020';
          break;
        case 'Filters':
          switch (metricName) {
            case 'Assassinations':
              queryString += metricName + '/criminal';
              break;
            case 'NaturalDisasters':
              queryString += metricName + '/earthquake';
          }
      }
      console.log(queryString);
      const res = await fetch(queryString);
      if (res.status !== 200) {
        const data = await res.json();
        metricLog[metricName] = 'Failed, response: ' + data;
      } else {
        metricLog[metricName] = 'Success';
        console.log('Success: ' + metricName);
      }
    }
  }

  // in logs, save which metric has error
  let errors = [];
  for (let category in logs) {
    for (let metric in logs[category]) {
      if (logs[category][metric] !== 'Success') {
        errors.push({
          Metric: metric,
          Error: logs[category][metric],
        });
      }
    }
  }
  if (errors.length) {
    // inside this path, create a logs.txt file or overwrite it
    fs.writeFileSync('./BananasApiLogs.txt', JSON.stringify(errors));
  }

  console.log('Total errors: ' + (errors.length ? errors.length : 0));
}

checkQueriesFromBananasAPI();
