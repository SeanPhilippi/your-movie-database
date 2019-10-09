const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/MoviesController');

const {
  getSearchResults,
  getMovieData,
  getListData,
  saveList,
  deleteList,
  createMovie,
  getMovieRankings,
  calcAffinities
} = moviesController;

// @route   GET api/movies/search/:query/:num
// @desc    get search results
// @access  Public
router.get('/search/:query/:num', getSearchResults);

// @route   GET api/movies/id/:id
// @desc    fetch movie details by imdb id
// @access  Public
router.get('/id/:id', getMovieData);

// @route   GET api/movies/:username/list
// @desc    fetch user's existing list and user statement
// @access  Public
router.get('/:username/list', getListData);

// @route   PUT api/movies/save/:username
// @desc    update existing list attached to username
// @access  Public
router.put('/save/:username', saveList);

// @route   DELETE api/movies/delete/:username
// @desc    delete list attached to username
// @access  Public
router.delete('/delete/:username', deleteList);

// @route   PUT api/movies/update/:id
// @desc    create or update movie model
// @access  Public
router.delete('/update/:id', createMovie);

// @route   GET api/movies/rankings/:movieId
// @desc    grab user rankings for specific movie
// @access  Public
router.get('/rankings/:movieId', getMovieRankings);

// @route   POST api/movies/affinities/:username
// @desc    grab lists, calculate similarity to current user list
// @access  Public
router.post('/affinities', calcAffinities);

module.exports = router;