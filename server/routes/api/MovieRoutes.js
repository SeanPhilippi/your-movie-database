const express = require('express');
const router = express.Router();

// @route   Get api/movies
// @desc    display movies?
// @access  Public
router.get('/movies/search/:query', (req, res) => {
  res.send('you got a movie!');
})

module.exports = router;