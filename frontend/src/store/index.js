import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messagesSlice.js';
import channelReducer from './slices/channelSlice.js';
import { renameChannel } from '../middlewares/index.js';


export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(renameChannel),
});

