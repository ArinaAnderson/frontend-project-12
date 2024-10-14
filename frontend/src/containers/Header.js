import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from '../components/AuthButton.js';

const Header = () => (
  <header className="page-header">
    <Link to="/" className="page-header__nav-link link">Hexlet Chat</Link>
    <AuthButton />
  </header>
);

export default Header;

// <button className='page-header__btn page-header__btn--logout btn'>Выйти</button>
