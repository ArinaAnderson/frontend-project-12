import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
// import { setCurrentLanguage } from '../store/slices/ui.js';
import AuthButton from '../components/AuthButton.js';

import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();

  // const dispatch = useDispatch();
  
  const handleLngSwicth = (evt) => {
    evt.preventDefault();
    i18n.changeLanguage(evt.target.dataset.testid)
      //.then(() => dispatch(setCurrentLanguage(evt.target.dataset.testid)));
  };

  const languageBtns = (
    <div className="page-header__lang-btns">
      <button
        onClick={handleLngSwicth}
        type="button"
        className={`bttn page-header__btn ${i18n.language === 'ru' ? 'page-header__btn--current' : ''}`}
        data-testid='ru'
      >
        {t('header.buttons.languages.ru')}
      </button>
      <button
        onClick={handleLngSwicth}
        type="button"
        className={`bttn page-header__btn ${i18n.language === 'en' ? 'page-header__btn--current' : ''}`}
        data-testid='en'
      >
        {t('header.buttons.languages.en')}
      </button>
    </div>
    
  );
  return (
    <header className="page-header">
      <Link to="/" className="page-header__nav-link link">Hexlet Chat</Link>
      {languageBtns}
      <AuthButton />
    </header>
  );
}
export default Header;

// <button className='page-header__btn page-header__btn--logout btn'>Выйти</button>
