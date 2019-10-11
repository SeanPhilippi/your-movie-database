const Comment = require('../models/CommentModel');

exports.getComments = (req, res) => {
  Comment.find({ username: req.params.username })
    .then(data => res.json(data.reverse()))
    .catch(console.log);
};

exports.getMovieComments = (req, res) => {
  Comment.find({ movie_id: req.params.movie_id })
    .then(data => res.json(data.reverse()))
    .catch(console.log);
};

exports.getTopMoviesComments = (req, res) => {
  console.log('in getTopMoviesComments')
  Comment.find({ top_movies_list: true })
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