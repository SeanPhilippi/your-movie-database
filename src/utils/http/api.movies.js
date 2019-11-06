import axios from 'axios';

export const get = {
  userList: userName => axios(`/api/list/${ userName }/list`),
};