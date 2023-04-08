// const fetch = require('node-fetch')
import fetch from 'node-fetch';
const Movie = require('../models/MovieModel');
const List = require('../models/ListModel');
const movieRankingsQuery = require('./queries/movieRankingsQuery');

exports.getSearchResults = ({ params }, res) => {
  const apiKey = process.env.API_KEY;
  const { query, num, searchType } = params;
  fetch(`http://www.omdbapi.com?${searchType}=${query.trim()}&apikey=${apiKey}&page=${num}`)
    .then(res => res.json())
    .then(data => res.status(200).json(data))
    .catch(() =>
      res.status(400).json({ searchResultsError: 'Failed to fetch search results' })
    );
};

exports.getMovieData = (req, res) => {
  const apiKey = process.env.API_KEY;
  const movieId = req.params.id;
  fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => res.status(200).json(data))
    .catch(() =>
      res.status(400).json({ movieDataError: 'Failed to get movie data' })
    );
};

exports.getMovieRankings = (req, res) => {
  const { movieId } = req.params;
  let averageRanking;
  let points;

  // for movieId, get the ranking info from the database (averageRanking, points, voters)
  // voters is a list of movie voter objects with id, username, and rank in their list for that movie
  List.aggregate(movieRankingsQuery(movieId))
    .then(data => {
      const voters = data.map(({ _id, username, rank }) => ({
        id: _id,
        username,
        // 1 is being added to rank because the movieRankingsQuery just assigns the index to rank
        rank: (rank += 1),
      }));

      if (voters.length > 1) {
        const rankings = voters.map(result => result.rank);
        // get rounded average of sum of rankings divided by # of rankings
        averageRanking = Math.round(
          rankings.reduce((ac, cv) => ac + cv) / voters.length
        );
        // for each ranking of that movie from the movieRankingsQuery aggregation result, subtract that rank
        // from 21 to determine the points from that particular ranking in a user's list
        const pointsArr = rankings.map(rank => 21 - rank);
        // get the sum of all these points for a total
        points = pointsArr.reduce((ac, cv) => ac + cv);
      } else if (voters.length === 1) {
        averageRanking = voters[0].rank;
        points = 21 - voters[0].rank;
        // else no voters
      } else {
        averageRanking = '';
        points = '';
      }

      const rankingData = {
        voters,
        averageRanking,
        points,
      };

      return res.status(200).json(rankingData);
    })
    .catch(() =>
      res.status(400).json({ movieRankingsError: 'Failed to collect rankings' })
    );
};

exports.updateMovie = (req, res) => {
  // ! the movie currently is not being updated with the newest averageRanking, points, voters, overallRanking
  // they are just being grabbed from redux state, making this method pointless unless a movie is being newly
  // added?
  const {
    id,
    title,
    year,
    director,
    averageRanking,
    points,
    voters,
    overallRanking,
  } = req.body;
  Movie.updateOne(
    { id },
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
      },
    },
    {
      upsert: 'true',
    }
  )
    // ! in progress, data.message is 'OK' on front-end...
    .then(() => res.status(200).json({ updateMovieMessage: 'Add successful' }))
    .catch(() =>
      res.status(400).json({ updateMovieError: 'Failed to update movie' })
    );
};

exports.getTopMovies = (req, res) => {
  // * modify all documents so they come back with their overallRanking as their index + 1 after the sort
  // * use .update() maybe or .count()
  Movie.find({})
    .sort('-points')
    .exec()
    .then(data => res.status(200).json(data))
    .catch(() =>
      res.status(400).json({ topMoviesError: 'Failed to get Top Movies' })
    );
};