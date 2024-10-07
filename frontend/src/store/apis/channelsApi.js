import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      console.log('AUTH TOKEN', getState().auth.token);
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
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;
