/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL = { id: '1', name: 'general' };

const initialState = {
  currentChannel: { ...DEFAULT_CHANNEL },
  currentLanguage: 'ru',

  modalInfo: {
    channelId: null,
    channelName: null,
    modalType: null,
  },
  realTimeDataUpdateError: null,
  isLottieAnimationOn: {
    login: true,
    signup: true,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const { payload } = action;
      const currentChannel = payload ?? DEFAULT_CHANNEL;
      state.currentChannel = currentChannel;
    },

    setCurrentLanguage: (state, action) => {
      const { payload } = action;
      state.currentLanguage = payload;
    },

    hideModal: (state) => {
      state.modalInfo = { modalType: null, channelId: null, channelName: null };
    },

    showModal: (state, action) => {
      const { payload } = action;
      state.modalInfo = payload;
    },

    setRealTimeDataUpdateError: (state, action) => {
      const { payload } = action;
      state.realTimeDataUpdateError = payload;
    },
    hideLottieAnimation: (state, action) => {
      const { payload } = action;
      state.isLottieAnimationOn[payload] = false;
    },
  },
});

export const {
  setCurrentChannel,
  setCurrentLanguage,
  hideModal,
  showModal,
  setRealTimeDataUpdateError,
  hideLottieAnimation,
} = uiSlice.actions;

export default uiSlice.reducer;
