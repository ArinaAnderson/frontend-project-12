import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../../utils/router';
import { io } from 'socket.io-client';

// UNSUCCESSFUL ATTEMPT to SHOW a TOAST related WEBSOCKET:
/*
import { toast } from 'react-toastify';
import i18next from 'i18next';
import resources from '../../locales/index';

const i18nextInstance = i18next.createInstance();
await i18nextInstance.init({
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  }
});
*/

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROUTES.base,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
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
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch, getState }
      ) {

        const socket = io();

        const addMessageSocketListener = (payload) => {
          updateCachedData((draft) => {
            draft.push(payload);

            // UNSUCCESSFUL ATTEMPT to SHOW a TOAST related WEBSOCKET:
            // const currentLang = getState().ui.currentLanguage;
            // i18nextInstance.changeLanguage(currentLang)
              // .then(() => toast.success(i18nextInstance.t('toasts.addChannelSuccess')));

            // throw new Error('WEB SOCKET ERROR'); ---> not getting catched
          });
        };

        try {
          await cacheDataLoaded;
          socket.on('newMessage', addMessageSocketListener);

          // TESTING WEB SOCKET ERROR TO SHOW a TOAST:
          // throw new Error('WEB SOCKET ERROR'); // here the error gets caught
        } catch(e) {
          dispatch({ type: 'ui/setSocketError', payload: e.message });
        }

        await cacheEntryRemoved;
        console.log('SOCKET OFF');
        socket.off('newMessage', addMessageSocketListener);
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
    editMessage: builder.mutation({
      invalidatesTags: ['Message'],
      query: ({ body, messageId }) => ({
        url: `/messages/${messageId}`,
        body: { body },
        method: 'PATCH',
      }),
    }),
    removeMessage: builder.mutation({
      // invalidatesTags: ['Message'],
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
