/* eslint-disable no-console */
export function getData() {
  return fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cneo%2Clitecoin%2Cethereum%2Cripple&vs_currencies=usd%2Ceur%2Cgbp%2Cmxn&include_market_cap=true"
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export function getHistoricalData(crypto, from, to) {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export function getActuality() {
  const date = new Date();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return fetch(
    `https://newsapi.org/v2/everything?apiKey=72b0970df76540bbbda3be4bb55f02d3&q=blockchain&sortBy=popularity&from=${date.getFullYear()}-${month}-${
      date.getDate() - 1
    }`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export default getData;
