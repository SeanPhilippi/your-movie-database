const express = require('express');
const router = express.Router();
const Comment = require('../../models/CommentModel');
const User = require('../../models/UserModel');
const fetch = require('node-fetch');

// @route   GET api/comments/:username
// @desc    get comments to populate username's profile
// @access  Public
router.get('/:username', (req, res) => {
  User.findOne({ username: req.body.username }, { username: 0, statement: 0, items: 0, comments: 1 })
    .then(comments => {
      comments.exec().then(data => {
        res.json(data);
    }).catch(console.log);
  })
});

// @route   POST api/comments/:username
// @desc    post comment on username's profile
// @access  Public
// ! would I use the same route for posting on user lists, top movie list, and movie pages?
// ! or separate routes?
router.post('/:author/:owner', (req, res) => {
  const newComment = new Comment({
    author,
    text,
    post_date,
    user
  })
});