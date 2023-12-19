import { io } from 'socket.io-client';
import routes from '../routes';
import { addMessage } from '../store/slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from '../store/slices/channelSlice';
import filterProfanityWords from '../dictionary';

const socket = io();

// eslint-disable-next-line
socket.on('connect', () => {
  // eslint-disable-next-line
  console.log('Подключено к серверу через сокет');
});

export const startListening = (dispatch) => {
  // eslint-disable-next-line
  socket.on(routes.server.socket.newMessage, (payload) => dispatch(addMessage(payload)));
  // eslint-disable-next-line
  socket.on(routes.server.socket.newChannel, (payload) => (dispatch(addChannel(payload))));
  // eslint-disable-next-line
  socket.on(routes.server.socket.renameChannel, (payload) => dispatch(renameChannel(payload)));
  // eslint-disable-next-line
  socket.on(routes.server.socket.removeChannel, (payload) => dispatch(removeChannel(payload)));
};

export const sendMessage = (data) => {
  const { body, channelId, username } = data;
  // eslint-disable-next-line
  socket.emit(routes.server.socket.newMessage, { body: filterProfanityWords(body), channelId, username });
};

export const addNewChannel = (channelName) => {
  // eslint-disable-next-line
  socket.emit(routes.server.socket.newChannel, { name: filterProfanityWords(channelName) });
};

export const renameCurrentChannel = (newName, id) => {
  // eslint-disable-next-line
  socket.emit(routes.server.socket.renameChannel, { id, name: filterProfanityWords(newName) });
};

export const deleteChannel = (id) => {
  // eslint-disable-next-line
  socket.emit(routes.server.socket.removeChannel, { id });
};
