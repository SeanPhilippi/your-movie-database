import axios from 'axios';

export const get = {
  topMoviesComments: () => axios('/api/comments/top-movies'),
  profileComments: username => axios(`/api/comments/${ username }`),
  movieComments: movieId => axios(`/api/comments/movie/${ movieId }`)
};

export const post = {
  comment: comment => axios.post('/api/comments', comment),
};