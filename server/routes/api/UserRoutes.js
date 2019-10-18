const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../../controllers/UsersController');

const {
  registerUser,
  loginUser,
  getNewRegisters,
  getCurrentUser
} = usersController;

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', loginUser);

// @route   GET api/users/recent-registers
// @desc    Return last 50 registered users
// @access  Public
router.get('/new-registers', getNewRegisters);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  getCurrentUser
);

module.exports = router;