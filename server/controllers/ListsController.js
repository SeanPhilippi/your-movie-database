const affinitiesQuery = require('./queries/affinitiesQuery');
const movieRankingsQuery = require('./queries/movieRankingsQuery');
const List = require('../models/ListModel');

exports.getListData = (req, res) => {
  List.findOne({ username: req.params.username }).exec().then(data => {
    res.json(data);
  }).catch(console.log);
};

exports.saveList = (req, res) => {
  const {
    username,
    items,
    statement
  } = req.body;
  List.updateOne(
    { username: req.params.username },
    {
      $set: {
        username,
        items,
        statement,
      },
    },
    {
      upsert: 'true',
    },
  ).then(() => res.sendStatus(200))
  .catch(console.log);
};

exports.deleteList = (req, res) => {
  List.deleteOne({ username: req.params.username })
    .then(res => console.log(res))
    .catch(console.log);
};

exports.getMovieRankings = (req, res) => {
  const { movieId } = req.params;
  let averageRanking;
  let points;

  List.aggregate(movieRankingsQuery(movieId))
    .then(data => {
      const results = data.map(({ _id, username, rank }) => ({
        id: _id,
        username,
        rank: rank += 1
      }));
      if (results.length > 1) {
        const rankings = results.map(result => result.rank);
        averageRanking = Math.round(rankings.reduce((ac, cv) => ac + cv) / results.length);
        const pointsArr = results.map(result => 21 - result.rank);
        points = pointsArr.reduce((ac, cv) => ac + cv);
      } else if (results.length === 1) {
        averageRanking = results[0].rank;
        points = 21 - results[0].rank;
      } else {
        averageRanking = '';
        points = '';
      }
      const result = {
        results,
        averageRanking,
        points
      };
      return res.json(result);
    })
    .catch(console.log);
};

exports.calcAffinities = (req, res) => {
  // store current user's movie ids from state.list in a variable
  const movieIds = req.body;

  List.aggregate(affinitiesQuery(movieIds))
    .then(result => {
      const matches = [];
      // removing 1st result since it is the compared list
      const docs = result.slice(1);
      // for each document with any matches
      for (let i = 0; i < docs.length; i++) {
        // count points for each matching movieId by getitng difference between indexes, adding 20
        const points = docs[i].matchingItems.map(item => {
          return Math.abs(item.idx - item.idxInComparedList) + 20;
        });
        const score = (points.reduce((ac, cv) => ac + cv) / (movieIds.length * 20)) * 100;
        const match = {
          username: docs[i].username,
          score: score.toFixed(2)
        };
        matches.push(match);
      }
      const sortedMatches = matches.sort((a, b) => b.score - a.score);
      return res.json(sortedMatches);
    })
    .catch(console.log);
};