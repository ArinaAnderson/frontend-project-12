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
import apiSlice from './store/api.js';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const rollbarConfig = {
  // enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'testenv',
  // environment: 'production',
};

const init = async () => {
  const i18n = i18next.createInstance();

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
  const socket = io();

  const handleSocketError = (e) => {
    console.log('Channel Update Error');
    store.dispatch({ type: 'ui/setRealTimeDataUpdateError', payload: e.message });
  };

  const addChannelSocketListener = (payload) => {
    try {
      store.dispatch(
        apiSlice.util.updateQueryData(
          'getChannels',
          undefined,
          (draft) => {
            draft.push(payload);
          },
        ),
      );
    } catch (e) {
      handleSocketError(e);
    }
  };

  const renameChannelSocketListener = (payload) => {
    try {
      store.dispatch(
        apiSlice.util.updateQueryData(
          'getChannels',
          undefined,
          (draft) => {
            const idx = draft.findIndex((el) => el.id === payload.id);
            draft[idx].name = payload.name;
          },
        ),
      );
    } catch (e) {
      handleSocketError(e);
    }
  };

  const removeChannelSocketListener = (payload) => {
    try {
      store.dispatch(
        apiSlice.util.updateQueryData(
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
    } catch (e) {
      handleSocketError(e);
    }
  };

  const addMessageSocketListener = (payload) => {
    try {
      store.dispatch(
        apiSlice.util.updateQueryData(
          'getMessages',
          undefined,
          (draft) => {
            draft.push(payload);
          },
        ),
      );
    } catch (e) {
      handleSocketError(e);
    }
  };

  socket.on('newChannel', addChannelSocketListener);
  socket.on('renameChannel', renameChannelSocketListener);
  socket.on('removeChannel', removeChannelSocketListener);
  socket.on('newMessage', addMessageSocketListener);

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
