const Comment = require('../models/CommentModel');

exports.getComments = (req, res) => {
  Comment.find({ username: req.params.username, disabled: undefined })
    .then(data => res.json(data.reverse()))
    .catch(() =>
      res
        .status(400)
        .json({ profileCommentsError: 'Failed to find profile comments' })
    );
};

exports.getMovieComments = (req, res) => {
  Comment.find({ movie_id: req.params.movie_id, disabled: undefined })
    .then(data => res.json(data.reverse()))
    .catch(() =>
      res
        .status(400)
        .json({ movieCommentsError: 'Failed to find movie comments' })
    );
};

exports.getTopMoviesComments = (req, res) => {
  Comment.find({ top_movies_list: true, disabled: undefined })
    .then(data => res.json(data.reverse()))
    .catch(() =>
      res
        .status(400)
        .json({ topMoviesCommentsError: 'Failed to find top movies comments' })
    );
};

exports.postComment = (req, res) => {
  const {
    username,
    text,
    post_date,
    author,
    movie_id,
    top_movies_list,
  } = req.body;
  let newComment;
  if (movie_id) {
    newComment = new Comment({
      movie_id,
      author,
      text,
      post_date,
    });
  }
  if (username) {
    newComment = new Comment({
      username,
      author,
      text,
      post_date,
      movie_id,
    });
  }
  if (top_movies_list) {
    newComment = new Comment({
      top_movies_list,
      author,
      text,
      post_date,
      movie_id,
    });
  }
  newComment
    .save()
    .then(comment => res.status(200).json(comment))
    .catch(() =>
      res.status(400).json({ postCommentError: 'Failed to post comment' })
    );
};

exports.deleteComment = (req, res) => {
  const { id } = req.params;
  Comment.updateOne({ _id: id }, { $set: { disabled: true } })
    .then(() => res.sendStatus(200))
    .catch(() =>
      res.status(400).json({ failedToDelete: 'Failed to delete comment' })
    );
};
