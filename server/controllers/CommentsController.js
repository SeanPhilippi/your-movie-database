const Comment = require('../models/CommentModel');

exports.getComments = (req, res) => {
  Comment.aggregate([
    {
      $match: {
        username: req.params.username
      }
    },
    {
      $project: {
        author: 1,
        username: 1,
        text: 1,
        post_date: 1
      }
    }
  ]).then(data =>  res.json(data.reverse())
  ).catch(console.log);
};

exports.getMovieComments = (req, res) => {
  Comment.aggregate([
    {
      $match: {
        movie_id: req.params.movie_id
      }
    },
    {
      $project: {
        author: 1,
        movie_id: 1,
        text: 1,
        post_date: 1
      }
    }
  ]).then(data =>  res.json(data.reverse())
  ).catch(console.log);
};

exports.postComment = (req, res) => {
  const { username, text, post_date, author, movie_id } = req.body;
  let newComment;
  if (movie_id) {
    newComment = new Comment({
      author,
      text,
      post_date,
      movie_id
    });
  };
  if (username) {
    newComment = new Comment({
      username,
      author,
      text,
      post_date,
      movie_id
    });
  };
  newComment.save()
    .then(comment => res.json(comment))
    .catch(console.log);
};