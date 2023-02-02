import cities from './cities-data.json' assert { type: 'json' };
import fs from 'fs';

function hasWeirdCharacters(str) {
  let weird = false;
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    if (charCode > 128) {
      weird = true;
    }
  }
  return weird;
}

(function writeJSON() {
  let list = [];
  for (const city of cities) {
    const weird = hasWeirdCharacters(city.name);
    if (!weird) {
      list.push(city.name);
    }
  }
  let json = JSON.stringify(list);
  fs.writeFileSync('city-names.json', json, 'utf8');
})();
