export const CURRENCIES_LIST = ["usd", "eur", "gbp", "inr", "chf"];

export const GET_COINGECKO_API_URL = (currency: string) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`;