import { useState } from 'react';
import AuthContext from './index.js';

const AuthProvider = ({ children }) => {
  const [ loggedIn, setLoggedIn ] = useState(() => {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  });

  const login = () => setLoggedIn(true);

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

