const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listName: {
    type: String,
    required: true
  },
  listId: {
    type: String,
    required: true
  },
  movies: [{
    // array of movie objects
    title: {
      type: String,
      required: true
    },
    imdbURL: {
      type: String,
      required: true
    }
  }]
});

module.exports = List = mongoose.model('List', ListSchema);