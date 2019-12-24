import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const App = () => (
  // Todo: add ErrorBoundary class
  <Router>
    <Routes />
  </Router>
);

export default App;
