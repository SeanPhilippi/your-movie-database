const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    // converts string to lowercase so different capitalization is not considered unique
    lowercase: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    requried: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  emailPreferences: {
    profileComments: { type: Boolean, default: true },
    announcements:   { type: Boolean, default: true },
  },
  inAppPreferences: {
    profileComments: { type: Boolean, default: true  },
    announcements:   { type: Boolean, default: false },
  },
  hideVisitCount:       { type: Boolean, default: false },
  hideFromMostVisited:  { type: Boolean, default: false },
  isAdmin:        { type: Boolean, default: false },
});

module.exports = model('User', UserSchema);
