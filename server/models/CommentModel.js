const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    lowercase: true,
    required: true
  },
  text: {
    type: String,
    requried: true
  },
  post_date: {
    type: String,
    required: true
  },
  movie_id: String,
  user: String,
  top_movie_list: Boolean
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);