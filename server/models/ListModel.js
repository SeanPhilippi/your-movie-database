const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listName: {
    type: String,
    // required: true
  },
  listId: {
    type: String,
    // required: true
  },
  list: [{
    // array of movie objects
    // removed required so an empty list could be created
    // adding, removing, reordering can be an update (PUT) from there
    name: {
      type: String
    },
    year: {
      type: String
    },
    director: {
      type: String
    },
    id: {
      type: String
    }
  }]
});

module.exports = List = mongoose.model('List', ListSchema);