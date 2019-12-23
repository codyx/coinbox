import React from 'react';

const LandingMarketing = () => (
  <div id="marketing-hero">
    <img alt="coinbox" id="coinbox_tr" src="./coinbox_tr.png" />
    <h1 className="hero-text">
        Predict the next <span className="blue-text">coin</span> change
    </h1>
    <h1 className="hero-text">
        Think outside the <span className="blue-text">box</span>
    </h1>
    <h3 className="subhero-text">Coinbox is made to make you improve your prediction skills on the crypto market.</h3>
    <div className="get-started-btn">
      <span className="get-started-btn-txt">GET STARTED</span>
    </div>
    <div className="partners">
      <img alt="Arweave" id="logo_arweave_2x" src="./logo_arweave.png" />
      <img alt="Coinbase Pro" id="logo_coinbasepro_2x" src="./coinbase-pro.svg" />
    </div>
  </div>
);

export default LandingMarketing;
