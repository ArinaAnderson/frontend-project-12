import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { ROUTES } from '../utils/router.js';

const RequireAuth = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  if (!loggedIn) {
    console.log('REQUIRE AUTH');
    return <Navigate to={ROUTES.login} state={{from: location.pathname}} />
  }

  return children;
}

export default RequireAuth ;
