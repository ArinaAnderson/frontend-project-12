import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice.js';
import AuthContext from './index.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  // const token = localStorage.getItem('token');
  const localStorageAuth = localStorage.getItem('auth');
  const auth = localStorageAuth ? JSON.parse(localStorageAuth) : { token: null, username: null };
  // dispatch(setCredentials({ token: auth.token, username: auth.username }));
  dispatch(setCredentials(auth));

  const [ loggedIn, setLoggedIn ] = useState(() => {
    if (localStorageAuth) {
      return true;
    }
    return false;
  });

  const login = () => setLoggedIn(true);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

