import React, { useState, Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import WalletContext from './WalletContext';
import Routes from './router/Routes';
import useLocalStorage from './utils/useLocalStorage';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [storedWallet, setWallet] = useLocalStorage('wallet');
  const [ctxt] = useState({
    updateWallet: (updatedWallet) => setWallet(updatedWallet),
  });
  ctxt.wallet = storedWallet || null;

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loading />}>
          <WalletContext.Provider value={ctxt}>
            <Routes />
          </WalletContext.Provider>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
