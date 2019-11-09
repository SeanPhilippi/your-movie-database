const express = require('express');
const router = express.Router();
const listsController = require('../controllers/ListsController');

const {
  getListData,
  saveList,
  deleteList,
  getMovieRankings,
  calcAffinities,
} = listsController;

// @route   GET api/list/:username/list
// @desc    fetch user's existing list and user statement
// @access  Public
router.get('/:username/list', getListData);

// @route   PUT api/list/save/:username
// @desc    update existing list attached to username
// @access  Public
router.put('/save/:username', saveList);

// @route   DELETE api/list/delete/:username
// @desc    delete list attached to username
// @access  Public
router.delete('/delete/:username', deleteList);

// @route   GET api/movies/rankings/:movieId
// @desc    grab user rankings for specific movie
// @access  Public
router.get('/rankings/:movieId', getMovieRankings);

// @route   POST api/movies/affinities/:username
// @desc    grab lists, calculate similarity to current user list
// @access  Public
router.post('/affinities', calcAffinities);

module.exports = router;