import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/new-prediction.css';
import requester from '../../../utils/requester';
import Footer from '../../Footer';
import CoinboxImg from '../../../../public/assets/coinbox_tr.png';
import SignOutButton from '../../../../public/assets/sign-out-button.svg';
import NewPredictionContainer from './NewPredictionContainer';
import { createAndPostTransaction } from '../../../utils/arweave';
import WalletContext from '../../../WalletContext';
import ValidatePrediction from '../predictions/ValidatePrediction';

const NewPrediction = () => {
  const { wallet } = useContext(WalletContext);
  const [isAnimated, setIsAnimated] = useState(false);

  const makePrediction = async ({ selectedMarket, direction, duration }) => {
    const prediction = {
      market: selectedMarket,
      prediction: direction,
      expiresIn: duration,
    };
    console.log(
      await createAndPostTransaction(prediction, wallet.jwk),
    );
    setIsAnimated(true);
  };

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await requester('https://api.pro.coinbase.com/products');
    const p = data
      .filter((product) => product.quote_currency === 'USD'
        || product.quote_currency === 'EUR')
      .sort((p1, p2) => {
        if (p1.quote_currency < p2.quote_currency) return -1;
        if (p1.quote_currency > p2.quote_currency) return 1;
        return 0;
      });
    setProducts(p);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div id="container">
      <Link to="/">
        <img alt="Coinbox home" id="coinbox-logo-home" src={CoinboxImg} />
      </Link>
      <img alt="Sign out" id="coinbox-signout-button" src={SignOutButton} />
      <div id="box" className="predictions-box">
        {
          isAnimated
            ? <ValidatePrediction />
            : (
              <NewPredictionContainer
                products={products}
                makePrediction={makePrediction}
              />
            )
        }
        <Footer />
      </div>
    </div>
  );
};

export default NewPrediction;
