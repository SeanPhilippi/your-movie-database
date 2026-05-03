const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/UsersController');

const {
  registerUser,
  loginUser,
  getNewRegisters,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  getSettings,
  updatePreferences,
  unsubscribe,
  searchUsers,
} = usersController;

// @route   GET api/users/search
// @desc    Search users by username prefix for @mentions
// @access  Public
router.get('/search', searchUsers);

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

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// @route   GET api/users/settings
// @desc    Fetch current user's notification preferences
// @access  Private
router.get(
  '/settings',
  passport.authenticate('jwt', { session: false }),
  getSettings
);

// @route   PUT api/users/settings/preferences
// @desc    Update email + in-app notification preferences
// @access  Private
router.put(
  '/settings/preferences',
  passport.authenticate('jwt', { session: false }),
  updatePreferences
);

// @route   POST api/users/unsubscribe/:token
// @desc    One-click unsubscribe from email notifications (no auth required)
// @access  Public
router.post('/unsubscribe/:token', unsubscribe);

module.exports = router;
