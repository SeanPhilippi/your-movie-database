const express = require('express');
const router = express.Router();
const Comment = require('../../models/CommentModel');
const fetch = require('node-fetch');
const commentsController = require('../../controllers/CommentsController');

const { getComments, postComments } = commentsController

// @route   GET api/comments/:username
// @desc    get comments to populate username's profile
// @access  Public
router.get('/:username', getComments);

// @route   POST api/comments/
// @desc    post comment on username's profile
// @access  Public
router.post('/', postComments);

module.exports = router;