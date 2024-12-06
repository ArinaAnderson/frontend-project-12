/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const localStorageAuth = localStorage.getItem('auth');
const auth = localStorageAuth ? JSON.parse(localStorageAuth) : { token: null, username: null };

const initialState = {
  token: auth.token,
  username: auth.username,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.username = payload.username;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
