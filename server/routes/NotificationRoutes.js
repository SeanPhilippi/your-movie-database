const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getNotifications, markAllRead, markRead } = require('../controllers/NotificationController');

const auth = passport.authenticate('jwt', { session: false });

// @route   GET /api/notifications
// @desc    Fetch current user's notifications (last 20)
// @access  Private
router.get('/', auth, getNotifications);

// @route   PUT /api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put('/read-all', auth, markAllRead);

// @route   PUT /api/notifications/:id/read
// @desc    Mark a single notification as read
// @access  Private
router.put('/:id/read', auth, markRead);

module.exports = router;
