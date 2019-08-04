const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    requried: true
  },
  year: {
    type: String,
    requried: true
  },
  director: {
    type: String,
    required: true
  },
  release_date: {
    type: String,
    required: true
  },
  country: {
    type: Array,
    required: true
  },
  poster_url: {
    type: String,
    required: false
  },
  imdb_id: {
    type: String,
    required: false
  },
  plot: {
    type: String,
    required: false
  },
  runtime: {
    type: String,
    required: true
  }
  stats: {
    overall_ranking: {
      type: Number,
      required: true
    },
    average_ranking: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    num_of_lists: {
      type: Number,
      required: true
    }
  },
  reviews: [{
    author: {
      type: String,
      required: true
    },
    post_date: {
      type: String, // is there a mongoose date type?
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: false
    },
    strengths: {
      type: String,
      // might change this, think of incentives, this might increase review quality if users have to consider this
      required: false
    },
    weaknesses: {
      type: String,
      required: false
    }
  }]

});

module.exports = Movie = mongoose.model("Movie", MovieSchema);