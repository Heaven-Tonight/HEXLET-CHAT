import { io } from 'socket.io-client';

const socket = io();
// eslint-disable-next-line
socket.on('connect', () => {
  // console.log('Подключено к серверу через сокет');
});

export default socket;
