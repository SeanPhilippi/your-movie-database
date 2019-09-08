const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    // converts string to lowercase so different capitalization is not considered unique
    lowercase: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    requried: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: String,
    required: true
  },
  location: {
    type: String
  }
});

module.exports = User = mongoose.model("User", UserSchema);