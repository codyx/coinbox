import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GenericAnim from '../../animations/GenericAnim';
import LoginBox from './LoginBox';

const LoginAnimRenderer = () => {
  const history = useHistory();
  const [animState, setAnimState] = useState('wallet-anim');
  const selectAnim = () => {
    switch (animState) {
      case 'wallet-anim':
        return <GenericAnim onComplete={() => setAnimState('no-anim')} fileName="wallet-anim.json" />;
      case 'validate-anim':
        return <GenericAnim onComplete={() => history.push('/predictions')} fileName="validate-anim.json" />;
      case 'upload-fail-anim':
        return (
          <div>
            <GenericAnim onComplete={() => setAnimState('no-anim')} fileName="upload-fail-anim.json" />
            <span className="error-txt">
                Invalid Arweave wallet<br />
                Don&apos;t have one? Visit
              <a href="https://www.arweave.org/" rel="noopener noreferrer" target="_blank"> www.arweave.org</a>
            </span>
          </div>
        );
      default:
        return <LoginBox onComplete={(newAnimState) => setAnimState(newAnimState)} />;
    }
  };
  return selectAnim(animState, setAnimState);
};

export default LoginAnimRenderer;
