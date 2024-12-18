import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import useAuth from '../hooks/useAuth.js';
import { ROUTES } from '../utils/router.js';

const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  // const { loggedIn } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={ROUTES.login} state={{ from: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;
