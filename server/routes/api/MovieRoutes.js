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
// @desc    save movie list to mlab
// @access  Public
router.post('/:user/list', (req, res) => {
  // const user = get user name

})

// @route   Delete api/movies
// @desc    delete movies
// @access  Public
router.delete('/:user/list/:movieId', (req, res) => {
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