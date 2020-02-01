import React from 'react';
import { Link } from 'react-router-dom';
import CoinboxImg from '../../../../public/assets/coinbox_tr.png';
import ArweaveImg from '../../../../public/assets/logo_arweave.png';
import CoinbaseProImg from '../../../../public/assets/coinbase-pro.svg';

const LandingMarketing = () => (
  <div id="marketing-hero-container">
    <img alt="coinbox" src={CoinboxImg} />
    <h1 className="hero-text">
      Predict the next <span className="blue-text">coin</span> change
    </h1>
    <h1 className="hero-text">
      Think outside the <span className="blue-text">box</span>
    </h1>
    <h3 className="subhero-text">
      Coinbox is made to make you test your prediction skills on the crypto markets.
    </h3>
    <Link to="/login" className="no-text-decoration">
      <div className="get-started-btn">
        <span className="get-started-btn-txt">GET STARTED</span>
      </div>
    </Link>
    <div className="partners">
      <img alt="Arweave" src={ArweaveImg} />
      <img alt="Coinbase Pro" src={CoinbaseProImg} />
    </div>
  </div>
);

export default LandingMarketing;
