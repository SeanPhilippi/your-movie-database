import axios from 'axios';

export const get = {
  newRegisters: () => axios('api/users/new-registers'),
  currentUser: () => axios('api/users/current'),
  settings: () => axios.get('/api/users/settings'),
  searchUsers: query => axios.get(`/api/users/search?q=${encodeURIComponent(query)}`),
};

export const post = {
  newUser: user => axios.post('/api/users/register', user),
  login: user => axios.post('api/users/login', user),
  forgotPassword: data => axios.post('/api/users/forgot-password', data),
  resetPassword: (token, data) => axios.post(`/api/users/reset-password/${token}`, data),
  unsubscribe: (token, category) =>
    axios.post(`/api/users/unsubscribe/${token}`, null, { params: { category } }),
};

export const put = {
  preferences: prefs => axios.put('/api/users/settings/preferences', prefs),
};
