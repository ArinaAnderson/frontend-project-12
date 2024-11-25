import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import _ from 'lodash';
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
    const lng = evt.target.dataset.testid;
    i18n.changeLanguage(lng);
      //.then(() => dispatch(setCurrentLanguage(evt.target.dataset.testid)));
  };

  const languages = [ 'ru', 'en' ];

  const lngBtns = languages.map((lng) => {
    const btnClasses = cn({
      bttn: true, 
      'page-header__btn': true,
      'page-header__lng-btn': true,
      [`page-header__lng-btn--${lng}`]: true,
      'page-header__btn--current': i18n.language === lng,
    });

    return (
      <button
        key={lng}
        onClick={handleLngSwicth}
        type="button"
        className={btnClasses}
        data-testid={lng}
        aria-labelledby={`lng-btn--${lng}`}
      >
        <span data-testid={lng} className="page-header__lng-icon" aria-hidden="true" focusable="false">{lng}</span>
        <span id={`lng-btn--${lng}`} hidden>{t(`header.buttons.languages.${lng}`)}</span>
      </button>
    );
  });

  const languageBtns = (
    <div className="page-header__lang-btns">
      {lngBtns}
    </div>
    
  );
  return (
    <header className="page-header">
      <Link to="/" className="page-header__nav-link link">Hexlet Chat</Link>
      <div className="page-header__btn-box">
        {languageBtns}
        <AuthButton />
      </div>
    </header>
  );
}
export default Header;
