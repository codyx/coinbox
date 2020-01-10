import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/login.css';
import Footer from '../../Footer';
import CoinboxImg from '../../../../public/assets/coinbox_tr.png';
import HeroImg from '../../../../public/assets/hero1.svg';
import BackArrow from '../../../../public/assets/ionic-md-arrow-round-back.svg';
import LoginAnimRenderer from './LoginAnimRenderer';

const Login = () => {
  // Allow user to log in again if a wallet is already stored.
  if (window && window.localStorage) window.localStorage.removeItem('wallet');
  return (
    <div id="container">
      <div id="box">
        <Link to="/">
          <img alt="Go back" src={BackArrow} id="login-back-arrow" />
        </Link>
        <div id="login-container">
          <img alt="Coinbox home" src={CoinboxImg} />
          <h1 className="hero-text login-hero-text">
          You are one step away<br />
          to unleash the wizard<br />
          inside you.
          </h1>
          <br />
          <LoginAnimRenderer />
        </div>
        <img alt="" id="hero-img" src={HeroImg} />
        <Footer />
      </div>
    </div>
  );
};

export default Login;
