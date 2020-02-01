import React from 'react';
import { useHistory } from 'react-router-dom';
import SignOutButtonImg from '../../../public/assets/sign-out-button.svg';

const SignOutButton = () => {
  const history = useHistory();
  const signOut = () => {
    console.log('Signing out...');
    if (window.localStorage && window.localStorage.getItem('wallet')) {
      window.localStorage.removeItem('wallet');
    }
    history.push('/login');
  };

  return (
    <div onClick={signOut} role="button" tabIndex={0}>
      <img alt="Sign out" id="coinbox-signout-button" src={SignOutButtonImg} />
    </div>
  );
};

export default SignOutButton;
