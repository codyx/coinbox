import React from 'react';
import arweave from '../../../utils/arweave';

const parseWallet = async (e) => {
  try {
    const wallet = JSON.parse(e.target.result);
    const address = await arweave.wallets.jwkToAddress(wallet);

    console.log('address', address);
  } catch (err) {
    console.error(err);
  }
};

const handleFileInput = async (files) => {
  const fr = new FileReader();

  fr.onload = parseWallet;
  fr.readAsText(files[0]);
};

const LoginBox = () => (
  <div id="arweave-login-box">
    <input id="arweave-keyfile" type="file" onChange={(e) => handleFileInput(e.target.files)} />
    <span id="arweave-login-box-text">
            Drop an Arweave keyfile to login<br />
            Don&apos;t have one? Visit <a href="https://www.arweave.org/" rel="noopener noreferrer" target="_blank">www.arweave.org</a>
    </span>
  </div>
);

export default LoginBox;
