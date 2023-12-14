export default {
  root: '/',
  login: '/login',
  signup: '/signup',
  others: '*',
  server: {
    login: '/api/v1/login',
    data: '/api/v1/data',
    signup: '/api/v1/signup',
    socket: {
      newMessage: 'newMessage',
      newChannel: 'newChannel',
      renameChannel: 'renameChannel',
      removeChannel: 'removeChannel',
    },
  },
};

