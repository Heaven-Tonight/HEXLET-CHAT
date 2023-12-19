import axios from 'axios';
import routes from '../routes';

export const getInitialData = (token) => axios.get(routes.server.data, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const sendLoginData = async (data) => axios.post(routes.server.login, data);

export const sendRegistrationData = async (data) => axios.post(routes.server.signup, data);
