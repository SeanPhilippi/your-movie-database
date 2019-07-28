const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    id: {
      type: String,
      required: true
    },
    username: {
      type: String,
      // make searching for username by author easier
      lowercase: true,
      required: true
    }
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
  list_id: String,
  top_movie_list: Boolean
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);