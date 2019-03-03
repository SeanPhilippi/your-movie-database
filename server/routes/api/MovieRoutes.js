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
    res.json(data)
  }).catch(err => console.log('error', err));
});

// @route   POST /save/:username
// @desc    create and save movie list to mlab
// @access  Public
router.post('/save/:username', (req, res) => {
  const newList = new List();
  // set username to redux state's username
  newList.username = req.body.username;
  newList.listDescript = req.body.listDescript;
  // * one list per user for now
  // newList.listName = req.body.listName;
  // newList.listId = req.body.listId;
  req.body.list.map(item => {
    const movie = {};
    movie.name = item.name;
    movie.year = item.year;
    movie.director = item.director;
    movie.id = item.id;
    // push created movie objects to list array in newList object
    newList.list.push(movie);
  });
  newList.save()
    .catch(err => console.log('error', err));
});

// @route   PUT /update/:username
// @desc    update existing list attached to username
// @access  Public
// TODO: finish, find proper method to find list by username and update
router.put('/update/:username', (req, res) => {
  // update list array of movie objects
  List.update(
    {username: req.params.username}, 
    {$set: {list: req.params.list, listDescript: req.params.listDescript}},
    {upsert: true},
    function(err, object) {
      if (err){
          console.warn(err.message);  // returns error if no matching object found
      }else{
          console.dir(object);
      }
    }
  );
  console.log('updated!!!')
})


//! ----working here----
// @route   DELETE /delete/:username
// @desc    delete list attached to username
// @access  Public
router.delete('/delete/:username', (req, res) => {
  List.deleteOne({username: req.params.username})
    .then(res => console.log(res))
    .catch(err => console.log(err));
})

module.exports = router;