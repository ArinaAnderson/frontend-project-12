import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header.js';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Layout;
