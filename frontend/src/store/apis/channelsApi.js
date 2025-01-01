// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials } from '../slices/authSlice.js';
// import { logout } from '../utils/auth.js';
// import { API_ROUTES } from '../../utils/router';
import apiSlice from '../api.js';

/*
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
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.originalStatus === 401) {
    console.log('sending refresh');
    // api.dispatch(logout(() => api.dispatch(setCredentials({ token: null, username: null }))));

    const refreshResult = await baseQuery('/refresh', api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut(() => api.dispatch(setCredentials({ token: null, username: null }))));
    }
  }
  return result;
};
*/

export const channelsApi = apiSlice.injectEndpoints({
  reducerPath: 'channels',
  endpoints: (builder) => ({
    getChannels: builder.query({
      providesTags: ['Channel'],
      query: () => ({
        url: '/channels',
      }),
      /*
      async onCacheEntryAdded(
        _,
        {
          updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch, getState,
        },
      ) {
        const socket = io();

        const addChannelSocketListener = (payload) => {
          updateCachedData((draft) => {
            draft.push(payload);
          });
        };

        const renameChannelSocketListener = (payload) => {
          updateCachedData((draft) => {
            const idx = draft.findIndex((el) => el.id === payload.id);
            draft[idx].name = payload.name;
            // draftCopy[idx].name = payload.name;
          });
        };

        const removeChannelSocketListener = (payload) => {
          updateCachedData((draft) => {
            const idx = draft.findIndex((el) => el.id === payload.id);
            draft.splice(idx, 1);

            const { currentChannel } = getState().ui;
            if (Number(currentChannel.id) === Number(payload.id)) {
              dispatch({ type: 'ui/setCurrentChannel', payload: null });
            }
          });
        };

        try {
          await cacheDataLoaded;

          socket.on('newChannel', addChannelSocketListener);
          socket.on('renameChannel', renameChannelSocketListener);
          socket.on('removeChannel', removeChannelSocketListener);
        } catch (e) {
          console.log('WEB SOCKET ERROR', e, e.message);
          dispatch({ type: 'ui/setSocketError', payload: e.message });
        }
        await cacheEntryRemoved;
        console.log('SOCKET OFF');
        socket.off('newChannel', addChannelSocketListener);
        socket.off('renameChannel', renameChannelSocketListener);
        socket.off('removeChannel', removeChannelSocketListener);
      },
      */
    }),
    addChannel: builder.mutation({
      invalidatesTags: ['Channel'],
      query: ({ name }) => ({
        url: '/channels',
        body: { name },
        method: 'POST',
      }),
    }),
    editChannel: builder.mutation({
      invalidatesTags: ['Channel'],
      query: ({ name, channelId }) => ({
        url: `/channels/${channelId}`,
        body: { name },
        method: 'PATCH',
      }),
    }),
    removeChannel: builder.mutation({
      invalidatesTags: ['Channel'],
      query: ({ channelId }) => ({
        url: `/channels/${channelId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
