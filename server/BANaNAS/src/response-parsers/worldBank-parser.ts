export const worldBankParser = (response: any) => {
  let responseObj : any = {};
  response[1].forEach((item: any) => {
    let year = item.date;
    let value = item.value;
    responseObj[year] = value;
  });
  return responseObj;
}

// KINDA SHEESH TOO TBH