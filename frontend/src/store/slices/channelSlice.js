import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsData: [],
  currentChannelId: 1,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannels: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
      state.channelsData = payload.channels;
    },
    toggleChannel: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
    },
    addChannel: (state, { payload }) => {
      state.channelsData = [ ...state.channelsData, payload];
      state.currentChannelId = payload.id;
    },
    renameChannel: (state, { payload }) => {
      state.channelsData = payload;
    },
    removeChannel: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
      state.channelsData = payload.channelsData;
    },
  }
});

export const { fetchChannels, toggleChannel, addChannel, renameChannel, removeChannel } = channelSlice.actions;

export default channelSlice.reducer;
