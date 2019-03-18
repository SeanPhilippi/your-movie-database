const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const tokenForUser = require('../../services/token').tokenForUser;
const bcrypt = require("bcrypt-nodejs");
const passport = require('passport');

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        // 400 error for validation related errors
        return res.status(400).json(errors);
      }
    })
})

router.post('/login', (req, res, done) => {
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