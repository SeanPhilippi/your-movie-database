const express = require('express');
const router = express.Router();
const commentsController = require('../../controllers/CommentsController');

const { getComments, getMovieComments, postComment } = commentsController

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

module.exports = router;