import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/predictions.css';
import Spinner from 'react-bootstrap/Spinner';
import Footer from '../../Footer';
import CoinboxImg from '../../../../public/assets/coinbox_tr.png';
import SignOutButton from '../../../../public/assets/sign-out-button.svg';
import BackArrow from '../../../../public/assets/ionic-md-arrow-round-back.svg';
import Stats from './Stats';
import PredictionsTable from './PredictionsTable';
import WalletContext from '../../../WalletContext';
import usePredictions from './usePredictions';
import useTickers from './useTickers';

const Predictions = () => {
  const { wallet } = useContext(WalletContext);
  const [predictions, paginationInfo] = usePredictions(wallet);
  const tickers = useTickers(predictions);

  return (
    <div id="container">
      <Link to="/">
        <img alt="Coinbox home" id="coinbox-logo-home" src={CoinboxImg} />
      </Link>
      <img alt="Sign out" id="coinbox-signout-button" src={SignOutButton} />
      <div id="box" className="predictions-box">
        <Link to="/login" id="predictions-back-arrow">
          <img alt="Go back" src={BackArrow} />
        </Link>
        <Stats predictionsCount={paginationInfo.totalCount} />
        {
          (predictions.length > 0)
            ? (
              <PredictionsTable
                predictions={predictions}
                tickers={tickers}
                paginationInfo={paginationInfo}
              />
            )
            : (
              <div id="loading-container">
                <Spinner id="loading" animation="border" style={{ width: '3rem', height: '3rem', color: '#066bf7' }} />
              </div>
            )
        }
        <Footer />
      </div>
    </div>
  );
};

export default Predictions;
