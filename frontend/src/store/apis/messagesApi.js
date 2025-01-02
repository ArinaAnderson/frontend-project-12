// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { io } from 'socket.io-client';
// import { API_ROUTES } from '../../utils/router';
import apiSlice from '../api.js';

export const messagesApi = apiSlice.injectEndpoints({
  reducerPath: 'messages',
  endpoints: (builder) => ({
    getMessages: builder.query({
      providesTags: ['Message'],
      query: () => ({
        url: '/messages',
      }),
      /*
      async onCacheEntryAdded(
        _,
        {
          updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch,
        },
      ) {
        const socket = io();

        const addMessageSocketListener = (payload) => {
          updateCachedData((draft) => {
            draft.push(payload);
            // throw new Error('WEB SOCKET ERROR'); ---> not getting catched
          });
        };

        try {
          await cacheDataLoaded;
          socket.on('newMessage', addMessageSocketListener);

          // TESTING WEB SOCKET ERROR TO SHOW a TOAST:
          // throw new Error('WEB SOCKET ERROR'); // here the error gets caught
        } catch (e) {
          dispatch({ type: 'ui/setSocketError', payload: e.message });
        }

        await cacheEntryRemoved;
        console.log('SOCKET OFF');
        socket.off('newMessage', addMessageSocketListener);
      },
      */
    }),
    addMessage: builder.mutation({
      invalidatesTags: ['Message'],
      query: ({ body, channelId, username }) => ({
        url: '/messages',
        body: { body, channelId, username },
        method: 'POST',
      }),
    }),
    editMessage: builder.mutation({
      invalidatesTags: ['Message'],
      query: ({ body, messageId }) => ({
        url: `/messages/${messageId}`,
        body: { body },
        method: 'PATCH',
      }),
    }),
    removeMessage: builder.mutation({
      invalidatesTags: ['Message'],
      query: ({ messageId }) => ({
        url: `/messages/${messageId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
