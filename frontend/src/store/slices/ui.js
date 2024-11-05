import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: {},
  modalType: null,
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
  },
});

export const { setCurrentChannel, hideModal, setModalType } = uiSlice.actions;

export default uiSlice.reducer;
