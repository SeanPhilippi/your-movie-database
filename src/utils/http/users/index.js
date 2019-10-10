import axios from 'axios';

export const get = {
  newRegisters: () => axios('api/users/new-registers'),
  current: () => axios('api/users/current'),
};

export const post = {
  register: user => axios('api/users/register', user),
  login: user => axios('api/users/login', user),
};