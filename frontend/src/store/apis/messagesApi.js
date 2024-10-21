import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
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
        const ws = new WebSocket('ws://localhost:5001')
        try {
          await cacheDataLoaded

          const listener = (event) => {
            console.log(event.data);
          }

          ws.addEventListener('message', listener)
        } catch {}
        await cacheEntryRemoved
        ws.close()
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
