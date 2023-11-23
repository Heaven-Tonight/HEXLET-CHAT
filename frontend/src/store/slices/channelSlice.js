import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsData: [],
  messagesData: [],
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initialFetch: (state, { payload }) => [ state.channelsData, payload ],
  }
});

export const { initialFetch } = channelSlice.actions;

export default channelSlice.reducer;

