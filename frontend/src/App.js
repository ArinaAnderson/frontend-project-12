import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './containers/Layout.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Error404 from './pages/Error404.js';
import RequireAuth from './containers/RequireAuth.js';
import Chat from './pages/Chat.js';
import Modal from './containers/Modals/index.js';
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
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
    <Modal />
    <ToastContainer />
  </BrowserRouter>
);

export default App;
