const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  username: String,
  movie_id: String,
  top_movie_list: Boolean,
  comments: [{
    username: {
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
    }
  }]
});

module.exports = Comment = mongoose.model("Comments", CommentsSchema);