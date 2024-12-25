/* eslint-disable no-param-reassign */
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales/index';

import store from './store/index.js';
import { messagesApi } from './store/apis/messagesApi.js';
import { channelsApi } from './store/apis/channelsApi.js';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const socket = io();

const addChannelSocketListener = (payload) => {
  store.dispatch(
    channelsApi.util.updateQueryData(
      'getChannels',
      undefined,
      (draft) => {
        draft.push(payload);
      },
    ),
  );
};

const renameChannelSocketListener = (payload) => {
  store.dispatch(
    channelsApi.util.updateQueryData(
      'getChannels',
      undefined,
      (draft) => {
        const idx = draft.findIndex((el) => el.id === payload.id);
        draft[idx].name = payload.name;
      },
    ),
  );
};

const removeChannelSocketListener = (payload) => {
  store.dispatch(
    channelsApi.util.updateQueryData(
      'getChannels',
      undefined,
      (draft) => {
        const idx = draft.findIndex((el) => el.id === payload.id);
        draft.splice(idx, 1);
        const { currentChannel } = store.getState().ui;
        if (Number(currentChannel.id) === Number(payload.id)) {
          store.dispatch({ type: 'ui/setCurrentChannel', payload: null });
        }
      },
    ),
  );
};

const addMessageSocketListener = (payload) => {
  store.dispatch(
    messagesApi.util.updateQueryData(
      'getMessages',
      undefined,
      (draft) => {
        draft.push(payload);
      },
    ),
  );
};

socket.on('newChannel', addChannelSocketListener);
socket.on('renameChannel', renameChannelSocketListener);
socket.on('removeChannel', removeChannelSocketListener);
socket.on('newMessage', addMessageSocketListener);

const rollbarConfig = {
  // enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'testenv',
  // environment: 'production',
};
console.log(process.env.REACT_APP_ROLLBAR_TOKEN);
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

  /*
  function TestError() {
    const a = null;
    return a.hello();
  }
  */

  return (
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </RollbarProvider>
  );
};

export default init;
