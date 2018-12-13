import mongoose from 'mongoose';

export default mongoose.model('List',
  new mongoose.Schema({
    list: {
      name: {
        type: String,
        required: true
      },
      [{
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
    }
  });