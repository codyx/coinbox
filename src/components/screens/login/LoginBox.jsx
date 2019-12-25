import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createWalletFromJwk } from '../../../utils/arweave';
import WalletContext from '../../../WalletContext';

const LoginBox = ({ onComplete }) => {
  const { updateWallet } = useContext(WalletContext);
  const parseWallet = async (e) => {
    try {
      const jwk = JSON.parse(e.target.result);
      const updatedWallet = await createWalletFromJwk(jwk);

      updateWallet(updatedWallet);
      onComplete('validate-anim');
    } catch (err) {
      onComplete('upload-fail-anim');
      console.error(err);
    }
  };
  const handleFileInput = async (files) => {
    const fr = new FileReader();

    fr.onload = parseWallet;
    fr.readAsText(files[0]);
  };

  return (
    <div id="arweave-login-box">
      <input id="arweave-keyfile" type="file" onChange={(e) => handleFileInput(e.target.files)} />
      <span id="arweave-login-box-text">
            Drop an Arweave keyfile to login<br />
            Don&apos;t have one? Visit <a href="https://www.arweave.org/" rel="noopener noreferrer" target="_blank">www.arweave.org</a>
      </span>
    </div>
  );
};

LoginBox.defaultProps = {
  onComplete: () => {},
};

LoginBox.propTypes = {
  onComplete: PropTypes.func,
};

export default LoginBox;
