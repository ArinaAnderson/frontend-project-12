import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../../utils/router';
import store from '../index.js';

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

        const addChannelSocketListener = (payload) => {
          // console.log('SOCKET Channels', payload);
        
          updateCachedData((draft) => {
            draft.push(payload);
          });
        };

        const renameChannelSocketListener = (payload) => {
          // console.log('renameChannelSocketListener', payload);
        
          updateCachedData((draft) => {
            const idx = draft.findIndex((el) => el.id === payload.id);
            draft[idx].name = payload.name;
            /*
            // WORKING:
            draft.forEach((el) => {
              if (el.id === payload.id) {
                el.name = payload.name;
              }
            });
            */
            /*
            // NO WORKING:
            // isn't updateElem conataining a ref to draft elem??
            const updatedElem = draft.find((el) => {
              console.log('RENAMING EL',el.id, el.name, payload.id, Number(el.id)===Number(payload.id));
              el.id == payload.id;
              return el;
            });
            updatedElem.name = payload.name;
            */
          });
        };

        const removeChannelSocketListener = (payload) => {
          console.log('removeChannelSocketListener', payload);
        
          updateCachedData((draft) => {
            const idx = draft.findIndex((el) => el.id === payload.id);
            draft.splice(idx, 1);
            const currentChannel = store.getState().ui.currentChannel;
            if (Number(currentChannel.id) === Number(payload.id)) {
              store.dispatch({ type: 'ui/setCurrentChannel', payload: null});
            }
          });
        };

        try {
          await cacheDataLoaded

          socket.on('newChannel', addChannelSocketListener);
          socket.on('renameChannel', renameChannelSocketListener);
          socket.on('removeChannel', removeChannelSocketListener);
        } catch {

        }
        await cacheEntryRemoved;
        console.log('SOCKET OFF');
        socket.off('newChannel', addChannelSocketListener);
        socket.off('renameChannel', renameChannelSocketListener);
        socket.off('removeChannel', removeChannelSocketListener);

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
