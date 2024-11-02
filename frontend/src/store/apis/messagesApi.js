import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../../utils/router';
import useSocket from '../../hooks/useSocket.js';

import { io } from 'socket.io-client';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROUTES.base,
    prepareHeaders: (headers, { getState }) => {
      // console.log('AUTH TOKEN', getState().auth.token);
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      providesTags: ['Message'],
      query: () => ({
        url: '/messages',
      }),

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // const { socket } = useSocket();
        const socket = io();
        try {
          await cacheDataLoaded

          const socketListener = (payload) => {
            console.log('SOCKET MESSAGES', payload);
            // {body: 'meow', channelId: '1', username: 'test', removable: true, id: '3'}

            updateCachedData((draft) => {
              draft.push(payload);
            });
          };
          socket.on('newMessage', socketListener);
        } catch {}
        await cacheEntryRemoved;
        console.log('SOCKET OFF');
        socket.off('newMessage', socketListener);
        // ws.close()
      },
    }),
    addMessage: builder.mutation({
      invalidatesTags: ['Message'],
      query: ({ body, channelId, username }) => ({
        url: '/messages',
        body: { body, channelId, username },
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
