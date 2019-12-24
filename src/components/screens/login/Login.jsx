import React from 'react';
import '../../../styles/login.css';
import Footer from '../../Footer';
import CoinboxImg from '../../../../public/assets/coinbox_tr.png';
import HeroImg from '../../../../public/assets/hero1.svg';
import LoginBox from './LoginBox';

const Login = () => (
  <div id="container">
    <div id="box">
      <div id="login-container">
        <img alt="coinbox" src={CoinboxImg} />
        <h1 className="hero-text login-hero-text">
          You are one step away<br />
          to unleash the wizard<br />
          inside you.
        </h1>
        <LoginBox />
      </div>
      <img alt="" id="hero-img" src={HeroImg} />
      <Footer />
    </div>
  </div>
);

export default Login;
