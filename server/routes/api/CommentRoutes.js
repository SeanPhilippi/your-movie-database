const express = require('express');
const router = express.Router();
const Comments = require('../../models/CommentsModel');
const fetch = require('node-fetch');

// @route   GET api/comments/:username
// @desc    get comments to populate username's profile
// @access  Public
router.get('/:username', (req, res) => {
  console.log('inside GET comments')
  Comments.findOne(
      { username: req.params.username },
      { comments: 1 }
    ).exec().then(data => {
      console.log('data:', data);
        res.json(data);
    }).catch(console.log);
});

// @route   POST api/comments/:username
// @desc    post comment on username's profile
// @access  Public
// ! would I use the same route for posting on user lists, top movie list, and movie pages?
// ! or separate routes?
router.put('/:author/:username', (req, res) => {
  console.log('inside put comments:', req.body)
  Comments.updateOne(
    { username: req.params.username },
    {
      $set: {
        'comments': req.body
      }
    },
    {
      upsert: 'true'
    }
  ).catch(console.log);
});

module.exports = router;