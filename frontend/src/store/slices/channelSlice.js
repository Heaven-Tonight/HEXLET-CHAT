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
      // добавляем новый канал
      state.channelsData = [ ...state.channelsData, payload];
      // и делаем его активным
      state.currentChannelId = payload.id;
    },
  }
});

export const { fetchChannels, toggleChannel, addChannel } = channelSlice.actions;

export default channelSlice.reducer;
