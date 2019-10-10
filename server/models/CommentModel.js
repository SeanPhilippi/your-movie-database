const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  movie_id: String,
  top_movies_list: Boolean,
  author: {
    type: String,
    lowercase: true,
    required: true
  },
  username: {
    type: String,
    lowercase: true,
  },
  text: {
    type: String,
    requried: true
  },
  post_date: {
    type: String,
    required: true
  }
});

module.exports = model('Comment', CommentSchema);