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

exports.postComment = (req, res) => {
  console.log('inside post comment:', req.body)
  const { username, text, post_date, author } = req.body;
  const newComment = new Comment({
    username,
    author,
    text,
    post_date
  });
  newComment.save()
    .then(comment => res.json(comment))
    .catch(console.log);
};