import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales/index';

import store from './store/index.js';
// { injectStore } from './api'; ??

import App from './App';
import AuthProvider from './contexts/AuthContextProvider.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const rollbarConfig = {
  enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'testenv',
  // environment: 'production',
};

const init = async () => {
  const i18n = i18next.createInstance();
  // const store = setupStore(); ??
  // injectStore(store); ??

  await i18n
    .use(initReactI18next)
    // .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const ruDictionary = leoProfanity.getDictionary('ru');
  const enDictionary = leoProfanity.getDictionary('en');
  leoProfanity.add(ruDictionary);
  leoProfanity.add(enDictionary);

  function TestError() {
    const a = null;
    return a.hello();
  }

  return (
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <ErrorBoundary>
          <TestError />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </Provider>
    </RollbarProvider>
  );
};

export default init;
