import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './slices/channelSlice.js';

export default configureStore({
  reducer: {
    channels: channelReducer,
  },
});
