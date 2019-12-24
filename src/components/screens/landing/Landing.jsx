import React from 'react';
import '../../../styles/landing.css';
import LandingMarketing from './LandingMarketing';
import Footer from '../../Footer';
import HeroImg from '../../../../public/assets/hero1.svg';

const Landing = () => (
  <div id="container">
    <div id="box">
      <LandingMarketing />
      <img alt="" id="hero-img" src={HeroImg} />
      <Footer />
    </div>
  </div>
);

export default Landing;
