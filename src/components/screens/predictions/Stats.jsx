import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const renderStatsElements = (predictionsCount) => (
  <>
    <div key={1} className="stats-element">
      <span className="stats-label">
        Exchange
      </span>
      <br />
      <span className="stats-value">
        Coinbase Pro
      </span>
    </div>
    <div key={2} className="stats-element">
      <span className="stats-label">
        Number of Predictions
      </span>
      <br />
      <span className="stats-value">
        {predictionsCount > 0 ? predictionsCount : ''}
      </span>
    </div>
  </>
);

const Stats = ({ predictionsCount }) => (
  <div id="predictions-stats-container">
    {renderStatsElements(predictionsCount)}
    <Link to="/new-prediction" style={{ textDecoration: 'none' }}>
      <div className="new-prediction-btn">
        <div className="new-prediction-btn-txt">
          <span role="img" aria-label="Wizard">🧙‍♂️</span>
          <span> New Prediction</span>
        </div>
      </div>
    </Link>
  </div>
);

Stats.defaultProps = {
  predictionsCount: 0,
};

Stats.propTypes = {
  predictionsCount: PropTypes.number,
};

export default Stats;
