const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  movie_id: String,
  top_movie_list: Boolean,
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

module.exports = Comment = mongoose.model("Comment", CommentSchema);