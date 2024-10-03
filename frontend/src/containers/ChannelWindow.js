import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/index.js'

const RequireAuth = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  if (!loggedIn) {
    console.log('REQUIRE AUTH');
    return <Navigate to='/login' state={{from: location.pathname}} />
  }

  return children;
}

export default RequireAuth ;
