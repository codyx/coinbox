import { useState, useEffect } from 'react';
import axios from 'axios';
import { getLiveData } from '../../../utils/get-market-data';

const { CancelToken } = axios;

export default function useTickers(predictions) {
  const [tickers, setTickers] = useState({});

  useEffect(() => {
    let isCancelled = false;
    const source = CancelToken.source();

    const fetchTickers = async () => {
      try {
        const newTickers = {};
        const updatedMarkets = {};
        const promises = predictions.map(async ({ market }) => {
          if (!Object.prototype.hasOwnProperty.call(updatedMarkets, market)) {
            updatedMarkets[market] = true;
            newTickers[market] = await getLiveData(market, {
              cancelToken: source.token,
            });
          }
        });
        await Promise.all(promises);
        if (!isCancelled) setTickers(newTickers);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
        }
      }
    };

    if (predictions.length > 0) {
      fetchTickers();
      const intervalId = setInterval(fetchTickers, 5 * 1000);
      return () => {
        isCancelled = true;
        source.cancel();
        clearInterval(intervalId);
      };
    }
    return () => {};
  }, [predictions]);

  return tickers;
}
