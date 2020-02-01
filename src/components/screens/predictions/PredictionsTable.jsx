import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import TablePagination from './TablePagination';
import { intervalToSeconds, secondsToInterval } from '../../../utils/time-intervals';

const percentChange = (a, b) => (((b - a) / a) * 100);

const renderOutcome = (outcome, noLiquidityAtEntry, noLiquidityAtExp) => {
  if (noLiquidityAtEntry) return '❌ (no liquidity at entry)';

  // noLiquidityAtExp is true if Coinbase doesn't return the candle on which the prediction ends.
  if (noLiquidityAtExp) return '❌ (no liquidity at expiration)';
  if (!outcome) return '';
  if (outcome === 'success') {
    return <span role="img" aria-label="thumbs-up" style={{ color: '#26a69a' }}>👍</span>;
  }
  if (outcome === 'fail') return <span role="img" aria-label="thumbs-up" style={{ color: '#ef5350' }}>👎</span>;
  return '';
};

const renderExpirationPrice = (entryPrice, finalPrice) => {
  const change = percentChange(entryPrice, finalPrice);
  const pos = change > 0 ? '+' : '';
  return (
    <div>
      <span>{finalPrice === -1 ? 'no liquidity' : finalPrice }</span>
      {entryPrice !== -1 ? (
        <span>
          {` (${pos}${change.toPrecision(4)}% change)`}
        </span>
      ) : ''}
    </div>
  );
};

const renderPrediction = (prediction) => (
  prediction === 'UP'
    ? <span role="img" aria-label="chart-increasing">📈</span>
    : <span role="img" aria-label="chart-decreasing">📉</span>
);

const checkOutcome = (entryPrice, expirationPrice, prediction) => {
  if (prediction === 'UP' && expirationPrice >= entryPrice) return 'success';
  if (prediction === 'DOWN' && expirationPrice <= entryPrice) return 'success';
  return 'fail';
};

const renderData = (predictions, tickers) => predictions.map((p) => {
  const startDate = new Date(p.timestamp * 1000);
  const now = Math.round(Date.now() / 1000);
  const expiresIn = secondsToInterval(now - p.timestamp);
  const hasExpired = intervalToSeconds(expiresIn) >= intervalToSeconds(p.expiresIn)
    ? 'finished' : expiresIn;
  const outcome = hasExpired && p.expirationPrice !== -1
    ? checkOutcome(p.entryPrice, p.expirationPrice, p.prediction) : '?';
  const expirationPrice = hasExpired ? p.expirationPrice : '?';
  return (
    <tr key={p.id}>
      <td>{startDate.toUTCString()}</td>
      <td>{hasExpired}</td>
      <td>{p.expiresIn}</td>
      <td>{p.market}</td>
      <td><strong>{tickers[p.market]}</strong></td>
      <td>{p.entryPrice === -1 ? 'no liquidity' : p.entryPrice}</td>
      <td>{expirationPrice !== -1
        ? renderExpirationPrice(p.entryPrice, p.expirationPrice) : 'N/A'}
      </td>
      <td>{renderPrediction(p.prediction)}</td>
      <td>{renderOutcome(outcome, p.entryPrice === -1, hasExpired && p.expirationPrice === -1)}
      </td>
    </tr>
  );
});

const PredictionsTable = ({
  predictions, tickers,
  paginationInfo: { pageCount, pageIndex, setPageIndex },
}) => (
  <div id="predictions-table-container">
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Elapsed</th>
          <th>Duration</th>
          <th>Market</th>
          <th>Ticker Price</th>
          <th>Entry Price</th>
          <th>Final Price</th>
          <th>Prediction</th>
          <th>Outcome</th>
        </tr>
      </thead>
      <tbody>
        {renderData(predictions, tickers)}
      </tbody>
    </Table>
    <TablePagination
      pageCount={pageCount}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
    />
  </div>
);

PredictionsTable.propTypes = {
  predictions: PropTypes.instanceOf(Array).isRequired,
  tickers: PropTypes.instanceOf(Object).isRequired,
  paginationInfo: PropTypes.instanceOf(Object).isRequired,
};

export default PredictionsTable;
