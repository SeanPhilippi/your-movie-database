const express = require('express');
const router = express.Router();
const List = require('../../models/ListModel');
const fetch = require('node-fetch');

// @route   GET /search/:query/:num
// @desc    get search results
// @access  Public
router.get('/search/:query', (req, res) => {
  const apiKey = process.env.API_KEY;
  const searchText = req.params.query;
  fetch(`http://www.omdbapi.com?s=${searchText.trim()}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

// @route   GET /addMovie/:id
// @desc    fetch movie details to create movie object for handleAdd()
// @access  Public
router.get('/addMovie/:id', (req, res) => {
  const apiKey = process.env.API_KEY;
  const movieId = req.params.id;
  fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
})

// @route   GET /:username/list
// @desc    fetch user's existing list
// @access  Public
router.get('/:username/list', (req, res) => {
  List.findOne({ username: req.params.username }).exec().then(data => {
    res.json(data);
  }).catch(err => console.log('error', err));
});

// @route   PUT /update/:username
// @desc    update existing list attached to username
// @access  Public
router.put('/save/:username', (req, res) => {
  // update list array of movie objects
  console.log('update request')
  List.updateOne(
    {username: req.params.username},
    {
      $set: {
      'username': req.body.username,
      'list': req.body.list,
      'listDescript': req.body.listDescript,
      }
    },
    {
      upsert: 'true'
    }
  ).catch(err => console.log(err));
  console.log('updated!!!')
})

// @route   DELETE /delete/:username
// @desc    delete list attached to username
// @access  Public
router.delete('/delete/:username', (req, res) => {
  List.deleteOne({username: req.params.username})
    .then(res => console.log(res))
    .catch(err => console.log(err));
})

module.exports = router;