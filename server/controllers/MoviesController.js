const fetch = require('node-fetch');
const Movie = require('../models/MovieModel');

exports.getSearchResults = ({ params }, res) => {
  const apiKey = process.env.API_KEY;
  const { query, num } = params;
  fetch(`http://www.omdbapi.com?s=${ query.trim() }&apikey=${ apiKey }&page=${ num }`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch((console.log));
};

exports.getMovieData = (req, res) => {
  const apiKey = process.env.API_KEY;
  const movieId = req.params.id;
  fetch(`http://www.omdbapi.com/?i=${ movieId }&apikey=${ apiKey }`)
    .then(res => res.json())
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => res.status(400).json({ movieDataError: 'Failed to get movie data' }));
};

exports.updateMovie = (req, res) => {
  const {
    id,
    title,
    year,
    director,
    averageRanking,
    points,
    voters,
    overallRanking
  } = req.body;
  Movie.updateOne(
    { id: req.params.id },
    {
      $set: {
        id,
        title,
        year,
        director,
        averageRanking,
        points,
        numberOfLists: voters.length,
        overallRanking,
      }
    },
    {
      upsert: 'true',
    }
  ).then(() => res.sendStatus(200))
  .catch(console.log);
};

exports.getTopMovies = (req, res) => {
  // * modify all documents so they come back with their overallRanking as their index + 1 after the sort
  // * use .update() maybe or .count()
  Movie.find({}).sort('-points')
    .exec().then(data => {
      res.status(200).json(data);
    }).catch(() => res.status(400).json({ topMoviesError: 'Failed to get Top Movies' }));
};