import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../../utils/router';

import { io } from 'socket.io-client';

export const channelsApi = createApi({
  reducerPath: 'channels',
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
    getChannels: builder.query({
      providesTags: ['Channel'],
      query: () => ({
        url: '/channels',
      }),


      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {

        const socket = io();

        try {
          await cacheDataLoaded

          const socketListener = (payload) => {
            console.log('SOCKET Channels', payload);

            updateCachedData((draft) => {
              draft.push(payload);
            });
          };
          socket.on('newChannel', socketListener);
        } catch {}
        await cacheEntryRemoved;
        console.log('SOCKET OFF');
        socket.off('newChannel', socketListener);
        // ws.close()
      },
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
