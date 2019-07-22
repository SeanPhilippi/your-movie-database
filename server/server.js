const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movies = require('./routes/api/MovieRoutes');
const users = require('./routes/api/UserRoutes');
const app = express();
const passport = require('passport');
const cors = require('cors');
// core nodejs file
const path = require('path');
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
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB!'))
  .catch(console.log);

// Use routes
app.use('/api/movies', movies);
app.use('/api/users', users);

app.get('/express', (req, res) => {
  res.send({ express: 'Your express backend is connected to React!' })
});

// Express serve up index.html file if it doesn't recognize route this needs to be
// after all other routes used for when deploying to Heroku as it is a fallback
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server started on port ${PORT}`);
})