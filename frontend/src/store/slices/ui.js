import { createSlice, current } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL = { id: '1', name: 'general'};

const initialState = {
  currentChannel: { ...DEFAULT_CHANNEL },
  modalType: null,
  // chanelNames: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const { payload } = action;
      state.currentChannel = payload;
      console.log('CURRENT CHANNEL', current(state));
    },

    hideModal: (state) => {
      state.modalType = null;
      console.log('CURRENT CHANNEL', current(state));
    },

    setModalType: (state, action) => {
      const { payload } = action;
      state.modalType = payload;
      console.log('CURRENT CHANNEL', current(state));
    },

    addChannelName: (state, action) => {
      const { payload } = action;
      state.chanelNames = state.chanelNames.concat(payload);
      console.log('CHANNEL NAMES', current(state));
    },
  },
});

export const { setCurrentChannel, hideModal, setModalType, addChannelName } = uiSlice.actions;

export default uiSlice.reducer;
