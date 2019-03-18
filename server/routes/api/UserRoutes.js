const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const tokenForUser = require('../../services/token').tokenForUser;
const bcrypt = require("bcrypt-nodejs");
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
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
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });

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

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.get('/login', (req, res, done) => {
  const { errors, isValid } = validateLoginInput(req.body);

  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log("No user found with this username", username);
        return res.send("No user found with this username");
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false);

      })
    })
})

module.exports = router;