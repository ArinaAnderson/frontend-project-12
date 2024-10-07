import { createSlice, current } from '@reduxjs/toolkit';

const initialState = { token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      console.log(current(state));
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
