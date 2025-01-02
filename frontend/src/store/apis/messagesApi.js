import apiSlice from '../api.js';

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      providesTags: ['Message'],
      query: () => ({
        url: '/messages',
      }),
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
