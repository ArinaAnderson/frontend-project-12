import { createSlice, current } from '@reduxjs/toolkit';

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
      state.modalInfo = payload;
    },

    hideModal: (state) => {
      state.modalInfo = { modalType: null, channelId: null, channelName: null };
      console.log('CURRENT CHANNEL', current(state));
    },

    setModalType: (state, action) => {
      const { payload } = action;
      state.modalType = payload;
      console.log('CURRENT CHANNEL', current(state));
    },

    setModalInfo: (state, action) => {
      const { payload } = action;
      state.modalInfo = payload;
      console.log('MODAL INFO', current(state));
    },

    addChannelName: (state, action) => {
      const { payload } = action;
      state.chanelNames = state.chanelNames.concat(payload);
      console.log('CHANNEL NAMES', current(state));
    },
  },
});

export const {
  setCurrentChannel,
  setCurrentLanguage,
  hideModal,
  setModalInfo,
  setModalType,
  addChannelName,
} = uiSlice.actions;

export default uiSlice.reducer;
