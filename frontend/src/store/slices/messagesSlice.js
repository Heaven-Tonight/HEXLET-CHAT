import { createSlice } from '@reduxjs/toolkit';

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
});

export const { fetchMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
