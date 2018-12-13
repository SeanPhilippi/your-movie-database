const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movies = require('./routes/api/MovieRoutes');
const app = express();
// DB config
const db = 'https://api.themoviedb.org/3/movie/550?api_key=db0fb828044fb9954101dd9eef659794';
const port = 4300;

app.use(bodyParser.json());

// Connect to Mongo
mongoose.connect(db)
  .then(() => console.log('connect to MongoDB!'))
  .catch(err => console.log(err));

// Use routes
app.use(movies);

app.get('/express', (req, res) => {
  res.send({ express: 'Your express backend is connected to React!' })
});

app.listen(port, err => {
  if (err) console.log(err);
  else console.log(`Server started on port ${port}`);
})