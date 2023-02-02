import { queries } from './queries/queries';
import {countryCodes} from './countryCodes';
import fs from 'fs';

async function checkQueriesFromWorldBank() {
  // iterate over queries
  let logs:any = {};
  let arrLength = Object.keys(queries);

  for (let category in queries) {
    // console log percentage
    console.log(
      'Progress: ' +
        Math.round((Object.keys(logs).length / arrLength.length) * 100) +
        '%'
    );

    // iterate over metrics in category
    let metricLog:any = {};
    for (let metricName in queries[category]) {
      // if provider is not world bank, skip
      if (queries[category][metricName].provider !== 'World Bank') {
        continue;
      }
      let queryString = queries[category][metricName].queryString;

      queryString = queryString.replace('countryCode', 'IT');
      queryString = queryString.replace('startYear', 1960);
      queryString = queryString.replace('endYear', 2022);
      console.log(queryString);
      await fetch(queryString)
        .then((res) => res.json())
        .then((res) => {
          if (res[0].message) {
            metricLog[metricName] = res[0].message[0].value;
          } else {
            metricLog[metricName] = 'Success';
          }
        })
        .catch((err) => {
          metricLog[metricName] = err;
        });
      // wait 2 seconds before next query
      await new Promise((r) => setTimeout(r, 300));
    }
    logs[category] = metricLog;
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
    fs.writeFileSync('./logs.txt', JSON.stringify(errors));
  }

  console.log('Total errors: ' + errors.length);
  console.log('Metrics with errors: ' + errors);
}

checkQueriesFromWorldBank();
