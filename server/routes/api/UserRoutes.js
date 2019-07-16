const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const formatDate = require('./formatDate');
const geoip = require('geoip-lite');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  // takes newUser object created on front-end and runs through validating function
  // destructuring object that is returned which contains errors and isValid. isValid return
  // a boolean and wants an empty errors object
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  //* for future, incorporate creating an avatar that accepts gravatar here

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        // 400 error for validation related errors
        return res.status(400).json(errors);
      } else {
        const { username, email, password } = req.body;
        // grab ip address from req header
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // '207.97.227.239' dummy ip addy
        // look up location via ip
        const geo = geoip.lookup(ip);
        // create new user document to be posted to mlab
        const newUser = new User({
          username,
          email,
          password,
          date: formatDate(new Date()),
          location: geo ?
            `${geo.city ? geo.city : 'n/a'}, ${geo.region ? geo.region : 'n/a'}, ${geo.country}, (lat: ${geo.ll[0]}, long: ${geo.ll[1]})`
            : 'n/a'
        });
        // encrypting password before saving to mlab
        bcrypt.genSalt(10, (err, salt) => {
          // throw salt in with password for hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // assigning newUser password to hash
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
})

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const errors = {};
  const { email, password } = req.body;
  //* for future, allow for login with username OR email, and then search by username, then by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // JWT payload
          const payload = { id: user._id, email: user.email };
          // Sign token
          jwt.sign(payload, keys.secret, { expiresIn: 10800 }, (err, token) => {
            res.json({ success: true, token: 'Bearer ' + token })
          });
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, email } = req.user;
    res.json({
      id,
      email
    })
  }
)

module.exports = router;