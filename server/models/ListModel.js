const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  statement: {
    type: String
  },
  items: [{
    // array of movie objects
    // removed required so an empty list could be created
    // adding, removing, reordering can be an update (PUT) from there
    title: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }],
  comments: [{
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
    }
  }]
});

module.exports = List = mongoose.model('List', ListSchema);