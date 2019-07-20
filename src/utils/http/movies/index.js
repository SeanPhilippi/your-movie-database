import axios from 'axios';

export const get = {
  userList: (userName) => axios(`api/movies/${userName}/list`),
};
