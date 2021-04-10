import axios from 'axios';

export const get = {
  movie: id => axios(`/api/movies/id/${id}`), // api call to omdb
  rankings: movieId => axios(`/api/movies/rankings/${movieId}`),
  topMoviesList: () => axios('/api/movies/top-movies-list'),
};

export const put = {
  movie: movie => axios.put(`/api/movies/update`, movie),
};
