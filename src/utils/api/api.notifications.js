import axios from 'axios';

export const get = {
  all: () => axios.get('/api/notifications'),
};

export const put = {
  markAllRead: () => axios.put('/api/notifications/read-all'),
  markRead: id => axios.put(`/api/notifications/${id}/read`),
};
