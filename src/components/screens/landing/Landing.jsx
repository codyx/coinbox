import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import '../../../styles/landing.css';
import LandingMarketing from './LandingMarketing';
import Footer from '../../Footer';
import HeroImg from '../../../../public/assets/hero1.svg';

const Landing = () => {
  // const history = useHistory();

  useEffect(() => {
    // if (window.localStorage && window.localStorage.getItem('wallet')) {
    //   window.setTimeout(() => history.push('/predictions'), 1500); // Redirecting returning user.
    // }
  }, []);

  return (
    <div id="container">
      <div id="box">
        <LandingMarketing />
        <img alt="" id="hero-img" src={HeroImg} />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
