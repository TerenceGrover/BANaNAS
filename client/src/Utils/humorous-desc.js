const meanQuotes = [
  'The middle child of the data set',
  'The average Joe of the numbers',
  'The balance beam of the data',
  'The fair and square mean',
  'The center stage of the statistics',
  "The median's less attractive cousin",
  'The unbiased judge of the data',
  'The swiss army knife of central tendencies'
];

const stDevQuotes = [
  'The wild child of the data family',
  'The mad dash from average',
  'The thrill-seeker of the data set',
  'The maverick of measurements',
  'The daredevil of data points',
  'The rebel of the numbers',
  'The rogue of the figures',
  'The radical of the data',
  'The unorthodox outlier of the data set',
  'The rogue measurement rambling away from the mean',
];

const meanQuote = meanQuotes[Math.floor(Math.random() * meanQuotes.length)];
const stDevQuote = stDevQuotes[Math.floor(Math.random() * stDevQuotes.length)];

export { meanQuote, stDevQuote };