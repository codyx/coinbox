import React from 'react';
import { useLocation } from 'react-router-dom';

const NoRouteMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h3>
        No route match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default NoRouteMatch;
