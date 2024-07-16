import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.js';
import Login from './components/Login.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
// <Route path="" element={} />
export default App;
