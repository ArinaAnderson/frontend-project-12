import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const localStorageAuth = localStorage.getItem('auth');
  const auth = localStorageAuth ? JSON.parse(localStorageAuth) : { token: null, username: null };

  dispatch(setCredentials(auth));

  const [ loggedIn, setLoggedIn ] = useState(() => {
    if (localStorageAuth) {
      return true;
    }
    return false;
  });

  // useEffect(() => {
    // dispatch(setCredentials(auth));
  // }, []);

  const login = () => setLoggedIn(true);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    setLoggedIn(false);
  };

  const value = useMemo(() => ({ loggedIn, login, logout }), [loggedIn, login, logout]);

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

