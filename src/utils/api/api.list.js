import axios from 'axios';

export const get = {
  userList: username => axios(`/api/list/${username}/list`),
  mostVisited: limit => axios(`/api/list/most-visited?limit=${limit}`),
};

export const post = {
  affinities: movieIds => axios.post('/api/list/affinities', movieIds),
  recordVisit: username => axios.post(`/api/list/${username}/visit`),
};

export const put = {
  saveList: (username, list) => axios.put(`/api/list/save/${username}`, list),
};
