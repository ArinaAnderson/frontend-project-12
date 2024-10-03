import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  prepareHeaders: (headers, { getState }) => { // (headers, { getState }) => {
    // const token = getState().auth.token;
    const token = localStorage.getItem('token');
    console.log('TOKEN', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers;
  },
  endpoints: (builder) => ({
    getChannels: builder.query({
      providesTags: ['Channel'],
      query: (user) => ({
        url: '/channels',
      }),
    }),
    /*
        addAlbum: builder.mutation({
            invalidatesTags: (result, error, user) => [{ type: 'UsersAlbums', id: user.userId }], // ['Album']
            query: ({ title, userId }) => ({
                url: '/albums',
                body: { title, userId },
                method: 'POST',
            }),
        }),
        removeAlbum: builder.mutation({
            invalidatesTags: (result, error, album) => [{ type: 'Album', id: album.id }], // ['Album']
            query: (album) => ({
                url: `/albums/${album.id}`,
                method: 'DELETE',
            }),
        }),
    */
    }),
});

export const { useGetChannelsQuery } = channelsApi;
