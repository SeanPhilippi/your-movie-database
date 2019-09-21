const User = require('../models/UserModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validateRegisterInput = require('./validation/register');
const Validator = require('validator');
const formatDate = require('./formatDate');
const geoip = require('geoip-lite');

exports.registerUser = (req, res) => {
  // takes newUser object created on front-end and runs through validating function
  // destructuring object that is returned which contains errors and isValid. isValid return
  // a boolean and wants an empty errors object
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  // ! figure out $or operator so I can give an error for finding a matching username as well
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'You already have an account. Click "Forgot password" if you need to reset your password.';
        // 400 error for validation related errors
        return res.status(400).json(errors);
      } else {
        const { username, email, password } = req.body;
        console.log('req body in /register', req.body)
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
          register_date: formatDate(new Date()),
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
              .catch(console.log);
          })
        })
      }
    })
};

exports.loginUser = (req, res) => {
  const errors = {};
  const { login, password } = req.body;
  let data;
  //* for future, allow for login with username OR email, and then search by username, then by email
  // ! check for login against email in database, then check against username
  if (Validator.isEmail(login)) {
    data = { email: login };
  } else {
    data = { username: login };
  }
  User.findOne(data)
    .then(user => {
      if (!user) {
        errors.login = 'User not found';
        return res.status(404).json(errors);
      }
      const { _id, email, username } = user;
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // JWT payload
          const payload = {
            id: _id,
            email: email
          };
          // Sign token
          jwt.sign(payload, keys.secret, { expiresIn: 10800 }, (err, token) => {
            res.json({ success: true, token: 'Bearer ' + token, user: { email, id: _id, username } })
          });
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
};

exports.getNewRegisters = (req, res) => {
  // switch to a limit of the 50 most recent eventually
  User.find({}).exec().then(data => {
    res.json(data);
  }).catch(console.log);
};

exports.getCurrentUser = (req, res) => {
  res.json({
    user: {email: req.user.email, id: req.user._id, username: req.user.username}
  });
};