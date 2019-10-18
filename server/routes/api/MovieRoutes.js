const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/MoviesController');

const {
  getSearchResults,
  getMovieData,
  updateMovie,
  getTopMovies,
} = moviesController;

// @route   GET api/movies/search/:query/:num
// @desc    get search results
// @access  Public
router.get('/search/:query/:num', getSearchResults);

// @route   GET api/movies/id/:id
// @desc    fetch movie details by imdb id
// @access  Public
router.get('/id/:id', getMovieData);

// @route   GET api/movies/top-movies-list
// @desc    get all movies docs sorted by their points
// @access  Public
router.get('/top-movies-list', getTopMovies);

// @route   PUT api/movies/update/:id
// @desc    create or update movie model
// @access  Public
router.put('/update/:id', updateMovie);

module.exports = router;