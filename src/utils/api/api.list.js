import axios from 'axios';

export const get = {
  rankings: movieId => axios(`/api/list/rankings/${movieId}`),
  userList: username => axios(`/api/list/${username}/list`),
};

export const post = {
  affinities: movieIds => axios.post('/api/list/affinities', movieIds),
};

export const put = {
  saveList: (username, list) => axios.put(`/api/list/save/${username}`, list),
};
