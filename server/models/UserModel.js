const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    // converts string to lowercase so different capitalization is not considered unique
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    requried: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("User", UserSchema);