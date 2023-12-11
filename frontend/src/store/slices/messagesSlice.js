
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessages: (state, { payload }) => {
      state.messages = payload.messages;
    },
    addMessage: (state, { payload }) => {
      state.messages = [ ...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const { id } = action.payload;
      const filtered = state.messages.filter((msg) => msg.channelId !== id);
      state.messages = filtered;
    })
  },
});

export const { fetchMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
