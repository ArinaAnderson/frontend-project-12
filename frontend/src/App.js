import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './containers/Layout.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import RequireAuth from './containers/RequireAuth.js';
import Chat from './pages/Chat.js';
import Modal from './containers/Modals/index.js';
// import AuthProvider from './contexts/AuthContextProvider.js';
import { ROUTES } from './utils/router.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={(
            <RequireAuth>
              <Chat />
            </RequireAuth>
          )}
        />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.signup} element={<Signup />} />
      </Route>
    </Routes>
    <Modal />
  </BrowserRouter>
);

export default App;
