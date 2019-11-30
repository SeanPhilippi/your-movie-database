const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/CommentsController');

const {
  getComments,
  getMovieComments,
  getTopMoviesComments,
  postComment,
  deleteComment,
} = commentsController

// @route   GET api/comments/top-movies
// @desc    get comments to populate TopMoviesPage
// @access  Public
router.get('/top-movies', getTopMoviesComments);

// @route   GET api/comments/:username
// @desc    get comments to populate username's profile
// @access  Public
router.get('/:username', getComments);

// @route   GET api/comments/movie/:movie_id
// @desc    get comments to populate MoviePage
// @access  Public
router.get('/movie/:movie_id', getMovieComments);

// @route   POST api/comments/
// @desc    post new comment document to mongodb
// @access  Public
router.post('/', postComment);

// @route   PUT api/comments/
// @desc    update comment with disabled prop
// @access  Public
router.put('/:id', deleteComment);

module.exports = router;