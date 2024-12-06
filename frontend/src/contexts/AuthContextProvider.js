import { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';
import updateLocalStorage from '../utils/localStorage.js';

import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const localStorageAuth = useSelector((state) => state.auth);

  const [loggedIn, setLoggedIn] = useState(() => {
    if (localStorageAuth.token) {
      return true;
    }
    return false;
  });

  const login = useCallback(() => setLoggedIn(true), []);

  const logout = useCallback(() => {
    console.log('RERENDERING LOGOUT');
    updateLocalStorage({ type: 'removeValue', key: 'auth' });
    setLoggedIn(false);
    dispatch(setCredentials({ token: null, username: null }));
  }, [dispatch]);

  const value = useMemo(() => ({ loggedIn, login, logout }), [loggedIn, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
