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
  page_id: {
    // m_# or u_# or h_# to differentiate movie, user, or home page?
    type: String,
    required: true
  }
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);