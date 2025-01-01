import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials } from '../slices/authSlice.js';
// import { logout } from '../utils/auth.js';
import { API_ROUTES } from '../utils/router';

export default createApi({
  // reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROUTES.base,
    prepareHeaders: (headers, { getState }) => {
      // console.log('AUTH TOKEN', getState().auth.token);
      const { token } = getState().auth;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
