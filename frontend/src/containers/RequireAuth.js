import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth.js';
import { ROUTES } from '../utils/router.js';

const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const { loggedIn } = useAuth();
  console.log('REQUIRE AUTH - SHOULD NOT LOAD Chat', loggedIn, token, localStorage.getItem('auth'));
  const location = useLocation();

  if (!loggedIn || !token) {
    console.log('REQUIRE AUTH');
    return <Navigate to={ROUTES.login} state={{from: location.pathname}} />
  }

  return children;
}

export default RequireAuth ;
