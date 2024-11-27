import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  /*
  const localStorageAuth = localStorage.getItem('auth');
  const auth = localStorageAuth ? JSON.parse(localStorageAuth) : { token: null, username: null };

  dispatch(setCredentials(auth));
  */
  const localStorageAuth = useSelector((state) => state.auth);

  const [localStorageAuthData, setLocalStorageAuthData] = useLocalStorage({ key: 'auth'});

  const [ loggedIn, setLoggedIn ] = useState(() => {
    if (localStorageAuth.token) {
      return true;
    }
    return false;
  });

  const login = () => setLoggedIn(true);

  const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('auth');
    setLocalStorageAuthData({ type: 'removeValue' });
    setLoggedIn(false);
    dispatch(setCredentials({ token: null, username: null }));
  };

  const value = useMemo(() => ({ loggedIn, login, logout }), [loggedIn, login, logout]);

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

