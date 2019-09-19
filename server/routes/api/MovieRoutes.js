const express = require('express');
const router = express.Router();
const List = require('../../models/ListModel');
const fetch = require('node-fetch');

// @route   GET api/movies/search/:query/:num
// @desc    get search results
// @access  Public
router.get('/search/:query/:num', ({ params }, res) => {
  const apiKey = process.env.API_KEY;
  const { query, num } = params;
  fetch(`http://www.omdbapi.com?s=${query.trim()}&apikey=${apiKey}&page=${num}`)
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

// @route   POST api/movies/affinities/:username
// @desc    grab lists, calculate similarity to current user list
// @access  Public
router.post('/affinities', (req, res) => {
  // store current user's movie ids from state.list in a variable
  console.log('req body in affinity', req.body)
  const movieIds = req.body;

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
        username: '$username',
        matchingItems: {
          $map: {
            input: {
              $filter: {
                input: '$items',
                as: 'item',
                cond: {
                  $in: ['$$item.id', movieIds],
                }
              }
            },
            as: 'item',
            in: {
              id: '$$item.id',
              idx: { $indexOfArray: ['$items.id', '$$item.id'] },
              idxInComparedList: { $indexOfArray: [movieIds, '$$item.id'] }
            }
          }
        },
        numberOfMatches: {
          $size: {
            $filter: {
              input: '$items',
              as: 'item',
              cond: {
                $in: ['$$item.id', movieIds]
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
      $limit: 15
    }
  ];

  List.aggregate(aggregateQuery)
    .then(result => {
      const matches = [];
      console.log('docs', result.slice(1));
      const docs = result.slice(1);
      // for each document with any matches
      for (let i = 0; i < docs.length; i++) {
        // count points for each matching movieId by getitng difference between indexes, adding 20
        const points = docs[i].matchingItems.map(item => {
          console.log(item)
          return Math.abs(item.idx - item.idxInComparedList) + 20;
        });
        console.log('pts', points);
        const score = (points.reduce((ac, cv) => ac + cv) / (movieIds.length * 20)) * 100;
        const match = {
          username: docs[i].username,
          score: score.toFixed(2)
        };
        matches.push(match);
      };
      const sortedMatches = matches.sort((a, b) => b.score - a.score);
      console.log('sortedMatches', sortedMatches)
      return res.json(sortedMatches);
    })
    .catch(console.log);
});

module.exports = router;