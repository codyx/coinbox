import React from 'react';
import GitHubLogo from '../../public/assets/logo_github.svg';

const Footer = () => (
  <footer>
    <a href="https://github.com/codyx/coinbox" rel="noopener noreferrer" target="_blank">
      <img alt="GitHub profile" id="github-img" src={GitHubLogo} />
    </a>
  </footer>
);

export default Footer;
