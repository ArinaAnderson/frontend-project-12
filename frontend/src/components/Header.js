import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <header className='page-header'>
      <Link to='/' className='page-header__nav-link'>Hexlet Chat</Link>
      <button className='page-header__btn page-header__btn--logout btn'>Выйти</button>
    </header>
  );
}

export default Header;
