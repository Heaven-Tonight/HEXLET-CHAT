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
  }
});

export const { fetchChannels } = channelSlice.actions;

export default channelSlice.reducer;
