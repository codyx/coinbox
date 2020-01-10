import requester from './requester';
import { dateFromTs } from './time-intervals';

export const getMarketData = async (market, timestamp, cancelTokenCfg = {}) => {
  let { data } = await requester
    .get(`https://api.pro.coinbase.com/products/${market}/candles`, {
      ...cancelTokenCfg,
      params: {
        start: dateFromTs(timestamp - 60),
        end: dateFromTs(timestamp),
        granularity: 60, // 1mn candle.
      },
    });
  data = data ? data.flat() : [];
  return data.length >= 4 ? data[4] : -1;
};

export const getLiveData = async (market, cancelTokenCfg = {}) => {
  const { data } = await requester
    .get(`https://api.pro.coinbase.com/products/${market}/ticker`, cancelTokenCfg);
  const { price } = data;
  return parseFloat(price) || -1;
};
