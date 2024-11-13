import React from 'react';
import { Provider } from 'react-redux';
// leoProfanity
// i18n --> resources

import store from './store/index.js';
import App from './App';

import AuthProvider from './contexts/AuthContextProvider.js';
import SocketProvider from './contexts/SocketContextProvider.js';

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

const init = async () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );
};

export default init;

/*
<Provider store={store}>
  <AuthProvider>
    <SocketProvider>
      <App />
    </SocketProvider>  
  </AuthProvider>
</Provider>
*/
