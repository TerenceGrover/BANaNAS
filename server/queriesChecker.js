import { queries } from './queries/queries.js';

async function checkQueries() {
  // iterate over queries
  let logs = {};
  for (let category in queries) {
    console.log(category);
    // iterate over metrics in category
    for (let metricName in queries[category]) {
      console.log('**** Trying : ' + metricName + ' ****');
      
      let queryString = queries[category][metricName].queryString;
      queryString = queryString.replace('countryCode', 'IT');
      queryString = queryString.replace('startYear', 2015);
      queryString = queryString.replace('endYear', 2017);
      
      console.log(queryString);

      await fetch(queryString)
        .then((res) => res.json())
        .then((res) => {
          console.log('**** Success : ' + metricName + ' ****');
          console.log(res);
        })
        .catch((err) => {
          console.log('**** Error : ' + metricName + ' ****');
          let buff=[];
          
        });
      console.log('\n');
      // wait 2 seconds before next query
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

checkQueries();
