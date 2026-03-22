import axios from 'axios';

export const get = {
  newRegisters: () => axios('api/users/new-registers'),
  currentUser: () => axios('api/users/current'),
};

export const post = {
  newUser: user => axios.post('/api/users/register', user),
  login: user => axios.post('api/users/login', user),
  forgotPassword: data => axios.post('/api/users/forgot-password', data),
  resetPassword: (token, data) => axios.post(`/api/users/reset-password/${token}`, data),
};
