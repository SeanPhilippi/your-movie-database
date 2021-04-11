const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('validator');
const geoip = require('geoip-lite');
const User = require('../models/UserModel');
const keys = require('../config/keys');
const validateRegisterInput = require('./validation/validateRegisterInput');
const formatDate = require('../../src/utils/helpers/formatDate');

exports.registerUser = (req, res) => {
  // takes newUser object created on front-end and runs through validating function
  // destructuring object that is returned which contains errors and isValid. isValid returns
  // a boolean and wants an empty errors object
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = 'This username is already taken.';
      return res.status(400).json(errors);
    }
  });

  User.findOne({ email: req.body.email })
    .then(async user => {
      if (user) {
        errors.email =
          'You already have an account. Click "Forgot password" if you need to reset your password.';
        // 400 error for validation related errors
        return res.status(400).json(errors);
      }
      const { username, email, password } = req.body;
      // grab ip address from req header
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      // look up location via ip
      const geo = geoip.lookup(ip);
      // create new user document to be posted to mlab
      const newUser = new User({
        username,
        email,
        password,
        register_date: formatDate(new Date()),
        location: geo
          ? `${geo.city ? geo.city : 'n/a'}, ${
              geo.region ? geo.region : 'n/a'
            }, ${geo.country}, (lat: ${geo.ll[0]}, long: ${geo.ll[1]})`
          : 'n/a',
      });

      await bcrypt
        .genSalt(10, (err, salt) => {
          // throw salt in with password for hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // assigning newUser password to hash
            newUser.password = hash;
            newUser.save();
          });
        });
      return res.status(200).json({ message: `New user ${newUser.username} successfully saved` });
    })
    .catch(() => {
      errors.general = 'An error was encountered when trying to save user';
      res.status(400).json(errors);
    });
};

exports.loginUser = (req, res) => {
  const errors = {};
  const { login, password } = req.body;
  let data;
  // check for login against email in database, then check against username
  if (Validator.isEmail(login)) {
    data = { email: login };
  } else {
    data = { username: login };
  }
  User.findOne(data).then(user => {
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
          username,
          email,
        };
        // Sign token
        jwt.sign(payload, keys.secret, { expiresIn: 10800 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`,
            user: { email, id: _id, username },
          });
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
  User.find({})
    .sort({ _id: 1 })
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(console.log);
};

exports.getCurrentUser = (req, res) => {
  try {
    res
      .status(200)
      .json({
        user: {
          email: req.user.email,
          id: req.user._id,
          username: req.user.username,
        },
      })
  } catch {
    res.status(400).json({ currentUserError: 'Failed to get current user' })
  }
};
