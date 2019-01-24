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
router.get('/list', (req, res) => {
  List.find({}).then(data => {
    res.json(data)
  })
});

// @route   Post api/movies
// @desc    create and save movie list to mlab
// @access  Public
router.post('/list', (req, res) => {
  const newList = new List();
  // listName and listId required by model
  // make sure req (list) has listName and listId
  console.log('req', req)
  newList.listName = req.body.listName;
  newList.listId = req.body.listId;
  req.body.map(item => {
    const movie = {};
    movie.name = item.name;
    movie.year = item.year;
    movie.director = item.director;
    movie.id = item.id;
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
// @desc    delete movies
// @access  Public
router.delete('/:user/:listId/:movieId', (req, res) => {
  Movie.findByIdAndRemove(req.params.id).exec()
    .then(movie => res.json(movie))
    .catch(err => console.log(err));
})

// @route   Delete api/movies
// @desc    delete list
// @access  Public
router.delete('/:user/list/:id', (req, res) => {
  List.findByIdAndRemove(req.params.id).exec()
    .then(list => res.json(list))
    .catch(err => console.log(err));
})

module.exports = router;