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
  list: [{
    // array of movie objects
    // removed required so an empty list could be created
    // adding, removing, reordering can be an update (PUT) from there
    name: {
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
  }]
});

module.exports = List = mongoose.model('List', ListSchema);