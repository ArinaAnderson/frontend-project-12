import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL = { id: '1', name: 'general'};

const initialState = {
  currentChannel: { ...DEFAULT_CHANNEL },
  currentLanguage: 'ru',
  // modalType: null,
  modalInfo: {
    channelId: null,
    channelName: null,
    modalType: null,
  },
  socketConnectionError: null,
  // chanelNames: [],
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

    setModalType: (state, action) => {
      const { payload } = action;
      state.modalType = payload;
    },

    setModalInfo: (state, action) => {
      const { payload } = action;
      state.modalInfo = payload;
    },

    setSocketError: (state, action) => {
      const { payload } = action;
      state.socketConnectionError = payload;
    },

    /*
    addChannelName: (state, action) => {
      const { payload } = action;
      state.chanelNames = state.chanelNames.concat(payload);
    },
    */
  },
});

export const {
  setCurrentChannel,
  setCurrentLanguage,
  hideModal,
  setModalInfo,
  setModalType,
  setSocketError,
} = uiSlice.actions;

export default uiSlice.reducer;
