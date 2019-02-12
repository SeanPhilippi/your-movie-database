const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    // so same username with different capitalization is not considered unique
    lowercase: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);