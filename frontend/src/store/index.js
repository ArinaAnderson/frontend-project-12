import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import apiSlice from './api.js';
import authReducer from './slices/authSlice.js';
import uiReducer from './slices/ui.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// console.log('STORE', store.getState());

export default store;
