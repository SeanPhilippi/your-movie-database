const express = require('express');
const router = express.Router();
const List = require('../../models/ListModel');

// @route   Get api/movies
// @desc    display movies?
// @access  Public
router.get('/search/:query', (req, res) => {
  // res.send('you got a movie!');

})

// @route   Get list
// @desc    fetch user's existing list
// @access  Public
router.get('/:username/list', (req, res) => {
  List.findOne({ username: req.params.username }).exec().then(data => {
    res.json(data)
  }).catch(err => console.log('error', err));
});

// @route   Post api/movies
// @desc    create and save movie list to mlab
// @access  Public
router.post('/list', (req, res) => {
  const newList = new List();
  // listName and listId required by model
  // make sure req (list) has listName and listId
  console.log('req', req)
  // set username to redux state's username
  newList.username = req.body.username;
  newList.listDescript = req.body.listDescript;
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

// @route   PUT movies/add
// @desc    update existing list
// @access  Public
router.put('/:user/:listId/update', (req, res) => {
  // update list array of movie objects
  List.findByIdAndUpdate()
})

// @route   Delete api/movies
// @desc    delete list
// @access  Public
router.delete('/:username/delete', (req, res) => {
  List.findOneAndDelete({username: req.params.username})
    .then(res => console.log(res))
    .catch(err => console.log(err));
})

module.exports = router;