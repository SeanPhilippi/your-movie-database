const fetch = require('node-fetch');
const List = require('../models/ListModel');
const affinitiesQuery = require('./queries/affinitiesQuery');

exports.getSearchResults = ({ params }, res) => {
  const apiKey = process.env.API_KEY;
  const { query, num } = params;
  fetch(`http://www.omdbapi.com?s=${query.trim()}&apikey=${apiKey}&page=${num}`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(console.log);
};

exports.getMovieData = (req, res) => {
  const apiKey = process.env.API_KEY;
  const movieId = req.params.id;
  fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(console.log);
};

exports.getListData = (req, res) => {
  List.findOne({ username: req.params.username }).exec().then(data => {
    console.log('getlistdata', data)
    res.json(data);
  }).catch(console.log);
};

exports.saveList = (req, res) => {
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
};

exports.deleteList = (req, res) => {
  List.deleteOne({username: req.params.username})
    .then(res => console.log(res))
    .catch(console.log);
};

exports.calcAffinities = (req, res) => {
  // store current user's movie ids from state.list in a variable
  console.log('req body in affinity', req.body)
  const movieIds = req.body;

  List.aggregate(affinitiesQuery(movieIds))
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
};