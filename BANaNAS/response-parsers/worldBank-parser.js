export const worldBankParser = (response) => {
  let responseObj = {};
  response[1].forEach((item) => {
    let year = item.date;
    let value = item.value;
    responseObj[year] = value;
  });
  return responseObj;
}

// KINDA SHEESH TOO TBH