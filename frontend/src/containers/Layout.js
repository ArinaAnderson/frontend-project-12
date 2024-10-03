import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import Header from './Header.js';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
