import { useState, useEffect } from 'react';
import axios from 'axios';
import { listPredictions } from '../../../utils/arweave';
import { getMarketData } from '../../../utils/get-market-data';
import { intervalToSeconds, secondsToInterval } from '../../../utils/time-intervals';

const { CancelToken } = axios;
const MAX_PREDICTIONS_PER_PAGE = 4; // Default value

export default function usePredictions(wallet) {
  const [predictions, setPredictions] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPredPerPage, setMaxPredPerPage] = useState(MAX_PREDICTIONS_PER_PAGE);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const getCurrentPageItems = (arr) => {
    const start = ((pageIndex - 1) * maxPredPerPage);
    const end = start + maxPredPerPage;
    return arr.slice(start, end);
  };

  useEffect(() => {
    let isCancelled = false;
    const source = CancelToken.source();
    const cancelTokenCfg = {
      cancelToken: source.token,
    };

    const fetchPredictions = async () => {
      if (!wallet) {
        console.error('No wallet injected');
        return;
      }
      try {
        setPredictions([]);
        const { txs, totalCount: count } = await listPredictions(wallet.address,
          getCurrentPageItems);
        const pp = txs
          .map(async (tx) => {
            const now = Math.round(Date.now() / 1000); // Seconds
            const expiresIn = secondsToInterval(now - tx.timestamp);
            const hasExpired = intervalToSeconds(expiresIn) > intervalToSeconds(tx.expiresIn)
              ? 'completed' : expiresIn;
            const entryPrice = await getMarketData(tx.market, tx.timestamp, cancelTokenCfg);
            const expirationPrice = hasExpired
              ? (await getMarketData(tx.market, tx.timestamp
                  + intervalToSeconds(tx.expiresIn), cancelTokenCfg)) : -1;
            return {
              ...tx,
              expirationPrice,
              entryPrice,
            };
          });
        const p = await Promise.all(pp);
        if (!isCancelled) {
          console.log('predictions', p);
          setPredictions(p);
          setPageCount(Math.ceil(count / maxPredPerPage));
          setTotalCount(count);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(`fetchPredictions error: ${err}`);
        }
      }
    };

    fetchPredictions();
    return () => {
      isCancelled = true;
      source.cancel();
    };
  }, [pageIndex]);

  return [predictions, {
    totalCount,
    pageCount,
    pageIndex,
    setPageIndex,
    maxPredPerPage,
    setMaxPredPerPage,
  }];
}
