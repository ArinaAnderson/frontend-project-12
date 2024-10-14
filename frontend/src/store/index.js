import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { channelsApi } from './apis/channelsApi.js';
import { messagesApi } from './apis/messagesApi.js';
import authReducer from './slices/authSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
});

setupListeners(store.dispatch);

export default store;
