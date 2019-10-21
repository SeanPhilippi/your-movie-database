const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const list = require('./routes/api/ListRoutes');
const movies = require('./routes/api/MovieRoutes');
const users = require('./routes/api/UserRoutes');
const comments = require('./routes/api/CommentRoutes');
const app = express();
// DB config
const PORT = process.env.PORT || 4300;
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Express will serve up production assets
// express.static is middleware that lets you serve up static files
app.use(express.static('build'));

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('connected to MongoDB!'))
  .catch(console.log);
mongoose.set('useCreateIndex', true);

// Use routes
app.use('/api/list', list);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/comments', comments);

app.get('/express', (req, res) => {
  res.send({ express: 'Your express backend is connected to React!' })
});

// Express serve up index.html file if it doesn't recognize route this needs to be
// after all other routes used for when deploying to Heroku as it is a fallback
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, err => {
  // eslint-disable-next-line no-unused-expressions
  err ? console.log(err) : console.log(`Server started on port ${ PORT }`);
});