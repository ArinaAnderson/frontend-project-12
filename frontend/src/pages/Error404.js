import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Error404 = () => {
  const { t } = useTranslation();

  return (
    <main className="error404">
      <h1 className="error404__title">{t('error404.title')}</h1>
      <Link to="/" className="error404__link">{t('error404.returnLink')}</Link>
    </main>
  );
};

export default Error404;
