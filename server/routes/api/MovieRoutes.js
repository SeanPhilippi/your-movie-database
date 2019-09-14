const express = require('express');
const router = express.Router();
const List = require('../../models/ListModel');
const fetch = require('node-fetch');

// @route   GET api/movies/search/:query/:num
// @desc    get search results
// @access  Public
router.get('/search/:query/:num', ({ params }, res) => {
  const apiKey = process.env.API_KEY;
  let { query, num } = params;
  let searchText = query;
  let pageNum = num;
  fetch(`http://www.omdbapi.com?s=${searchText.trim()}&apikey=${apiKey}&page=${pageNum}`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(console.log);
});

// @route   GET api/movies/movies/:slug
// @desc    get movie data to populate MoviePage.js
// @access  Public
router.get('/id/:id', (req, res) => {
  const apiKey = process.env.API_KEY;
  let { slug, id } = req.params;
  // if there is a '-' and 4 numbers at the end, slice out

  // then replace all '-'s with ' '
  // let title = slug.replace('-', ' ')
  // use this title to grab that movie's info from omdb
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(console.log);
});

// @route   GET api/movies/addMovie/:id
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
    .catch(console.log);
})

// @route   GET api/movies/:username/list
// @desc    fetch user's existing list
// @access  Public
router.get('/:username/list', (req, res) => {
  List.findOne({ username: req.params.username }).exec().then(data => {
    res.json(data);
  }).catch(console.log);
});

// @route   PUT api/movies/save/:username
// @desc    update existing list attached to username
// @access  Public
router.put('/save/:username', (req, res) => {
  List.updateOne(
    { username: req.params.username },
    {
      $set: {
      'username': req.body.username,
      'items': req.body.items,
      'statement': req.body.statement,
      }
    },
    {
      upsert: 'true'
    }
  ).catch(console.log);
});

// @route   DELETE api/movies/delete/:username
// @desc    delete list attached to username
// @access  Public
router.delete('/delete/:username', (req, res) => {
  List.deleteOne({username: req.params.username})
    .then(res => console.log(res))
    .catch(console.log);
});

// @route   POST api/movies/affinity/:username
// @desc    grab lists, calculate similarity to current user list
// @access  Public
router.post('/affinity', (req, res) => {
  // store current user's movie ids from state.list in a variable
  console.log('req body in affinity', req.body)
  const movieIds = [...req.body];
  let aggregateQuery = [
    {
      $match: {
        items: {
          $elemMatch: {
            id: {
              $in: movieIds
            }
          }
        }
      }
    },
    {
      $project: {
        numberOfMatches: {
          $size: {
            $filter: {
              input: '$items',
              as: 'i',
              cond: {
                $in: ['$$i.id', movieIds]
              }
            }
          }
        }
      }
    },
    {
      $sort: {
        numberOfMatches: -1,
      }
    },
    {
      $limit: 5
    }
  ];

  List.aggregate(aggregateQuery)
    .then(result => console.log('result', result))
    .catch(console.log);
});

module.exports = router;