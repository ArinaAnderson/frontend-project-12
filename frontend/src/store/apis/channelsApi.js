import apiSlice from '../api.js';

export const channelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      providesTags: ['Channel'],
      query: () => ({
        url: '/channels',
      }),
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
