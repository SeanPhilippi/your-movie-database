const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movies = require('./routes/api/MovieRoutes');
const app = express();
const cors = require('cors');
// DB config
const db = require('./config/keys').mongoURI;
const PORT = process.env.PORT || 4300;
// core nodejs file
const path = require('path');

app.use(bodyParser.json());
app.use(cors());

// Express will serve up production assets
app.use(express.static('build'));

// Express serve up index.html file if it doesn't recognize route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// Connect to Mongo
mongoose.connect(
  process.env.MONGO_URI || db
  )
  .then(() => console.log('connected to MongoDB!'))
  .catch(err => console.log(err));

// Use routes
app.use(movies);

app.get('/express', (req, res) => {
  res.send({ express: 'Your express backend is connected to React!' })
});

app.listen(PORT, err => {
  if (err) console.log(err)
  else console.log(`Server started on port ${PORT}`);
})