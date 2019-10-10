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
  ]).then(data => res.json(data.reverse())
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
  ]).then(data => res.json(data.reverse())
  ).catch(console.log);
};

exports.getTopMoviesComments = (req, res) => {
  console.log('in getTopMoviesComments')
  Comment.aggregate([
    {
      $match: {
        top_movies_list: true
      }
    },
    {
      $project: {
        author: 1,
        text: 1,
        post_date: 1
      }
    }
  ])
  .then(data => {
    console.log('data', data)
    return res.json(data.reverse())
  })
  .catch(console.log);
};

exports.postComment = (req, res) => {
  const {
    username,
    text,
    post_date,
    author,
    movie_id,
    top_movies_list
  } = req.body;
  let newComment;
  if (movie_id) {
    newComment = new Comment({
      movie_id,
      author,
      text,
      post_date
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
  if (top_movies_list) {
    newComment = new Comment({
      top_movies_list,
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