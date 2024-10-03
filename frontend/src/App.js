import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './containers/Layout.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import RequireAuth from './containers/RequireAuth.js';
import Chat from './pages/Chat.js';
import AuthProvider from './contexts/AuthProvider.js';

const App = () => (
  <AuthProvider>
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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
