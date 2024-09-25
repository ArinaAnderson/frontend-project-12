import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
// <Route path="" element={} />
export default App;

/*
<Route path="/" element={<Layout />}>
          <Route index /> --> PROTECTED
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
*/
