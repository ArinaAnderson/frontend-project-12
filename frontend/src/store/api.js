import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from './slices/authSlice.js';
import { logout } from '../utils/auth.js';
import { API_ROUTES } from '../utils/router';

const baseQuery = fetchBaseQuery({
  baseUrl: API_ROUTES.base,
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    logout(() => api.dispatch(setCredentials({ token: null, username: null })));
  }
  return result;
};

export default createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
