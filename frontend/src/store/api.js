import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from './slices/authSlice.js';
import { logout } from '../utils/auth.js';
import { API_ROUTES } from '../utils/router';

const baseQuery = fetchBaseQuery({
  baseUrl: API_ROUTES.base,
  // credentials: 'include', // it will send back our httpOnly secure cookie
  prepareHeaders: (headers, { getState }) => {
    console.log('AUTH TOKEN', getState().auth.token);
    const { token } = getState().auth;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log('INETRECEPTING', result?.error?.status);
  if (result?.error?.status === 401) {
    console.log('sending refresh');
    logout(() => api.dispatch(setCredentials({ token: null, username: null })));
    // api.dispatch(logout(() => api.dispatch(setCredentials({ token: null, username: null }))));
    // result = [];
    /*
    const refreshResult = await baseQuery('/refresh', api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut(() => api.dispatch(setCredentials({ token: null, username: null }))));
    }
    */
  }
  return result;
};

export default createApi({
  baseQuery: baseQueryWithReauth,
  /*
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
  */
  endpoints: () => ({}),
});
