const express = require('express');
const router = express.Router();
const commentsController = require('../../controllers/CommentsController');

const { getComments, postComment } = commentsController

// @route   GET api/comments/:username
// @desc    get comments to populate username's profile
// @access  Public
router.get('/:username', getComments);

// @route   POST api/comments/
// @desc    post new comment document to mongodb
// @access  Public
router.post('/', postComment);

module.exports = router;