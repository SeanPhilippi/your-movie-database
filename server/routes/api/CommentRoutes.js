const express = require('express');
const router = express.Router();
const Comment = require('../../models/CommentModel');
const fetch = require('node-fetch');

// @route   GET api/comments/:username
// @desc    get comments to populate username's profile
// @access  Public
router.get('/:username', (req, res) => {
  console.log('inside GET comments')
  Comment.find({
    username: req.params.username
  }).exec().then(data => {
      return res.json(data);
    }).catch(console.log);
});

// @route   POST api/comments/
// @desc    post comment on username's profile
// @access  Public
router.post('/', (req, res) => {
  console.log('inside post comments:', req.body)
  const { username, text, post_date, author } = req.body;
  const newComment = new Comment({
    username,
    author,
    text,
    post_date
  });
  newComment.save()
    .then(comment => res.json(comment))
    .catch(console.log);
});

module.exports = router;