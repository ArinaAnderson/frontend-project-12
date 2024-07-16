import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div>
        HEADER
      </div>
      <Outlet />
      <div>
        FOOTER
      </div>
    </>
  );
}

export default Layout;
