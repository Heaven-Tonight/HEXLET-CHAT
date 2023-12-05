import { io } from 'socket.io-client';

const socket = io();

socket.on('connect', () => {
  console.log('Подключено к серверу через сокет');
});

export default socket;

