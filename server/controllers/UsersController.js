const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Validator = require('validator');
const geoip = require('geoip-lite');
const User = require('../models/UserModel');
const keys = require('../config/keys');
const validateRegisterInput = require('./validation/validateRegisterInput');
const formatDate = require('../../src/utils/helpers/formatDate');
const { verifyUnsubscribeToken } = require('./utils/unsubscribeToken');

exports.registerUser = async (req, res) => {
  // takes newUser object created on front-end and runs through validating function
  // destructuring object that is returned which contains errors and isValid.
  // isValid returns a boolean and wants an empty errors object
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  try {
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      errors.username = 'This username is already taken.';
      return res.status(400).json(errors);
    }

    // 400 error for validation related errors
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      errors.email =
        'You already have an account. Click "Forgot password" if you need to reset your password.';
      return res.status(400).json(errors);
    }

    const { username, email, password } = req.body;
    // grab ip address from req header
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // look up location via ip
    const geo = geoip.lookup(ip);
    // create new user document to be posted to db
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

    // hash password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    return res.status(200).json({ message: `New user ${newUser.username} successfully saved` });
  } catch (err) {
    console.error(err);
    errors.general = 'An error was encountered when trying to save user';
    res.status(400).json(errors);
  }
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
  User.find({})
    .sort({ _id: 1 })
    .select('username _id register_date')
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(console.log);
};

exports.forgotPassword = async (req, res) => {
  const genericResponse = () =>
    res.status(200).json({ message: 'If that email is registered, reset instructions have been sent.' });

  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return genericResponse();

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://www.yourmoviedatabase.com'
      : 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password/${rawToken}`;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.NODE_ENV === 'production'
          ? 'YMDB <noreply@yourmoviedatabase.com>'
          : 'YMDB <onboarding@resend.dev>',
        to: process.env.NODE_ENV === 'production' ? user.email : 'sean.philippi@protonmail.com',
        subject: 'Reset your YMDB password',
        html: `
          <p>You requested a password reset for your YMDB account.</p>
          <p>Click the link below to reset your password. This link expires in 1 hour.</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.json().catch(() => ({}));
      console.error('[Resend] email send failed:', emailRes.status, errBody);
    }

    genericResponse();
  } catch (err) {
    console.error(err);
    res.status(500).json({ general: 'Something went wrong. Please try again.' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, password2 } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ password: 'Password must be at least 6 characters.' });
  }
  if (password !== password2) {
    return res.status(400).json({ password2: 'Passwords do not match.' });
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ general: 'Reset link is invalid or has expired.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully. You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ general: 'Something went wrong. Please try again.' });
  }
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
  } catch(err) {
    console.error(err);
    res.status(400).json({ currentUserError: 'Failed to get current user' })
  }
};

exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      'emailPreferences inAppPreferences hideVisitCount hideFromMostVisited'
    );
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { emailPreferences, inAppPreferences, hideVisitCount, hideFromMostVisited } = req.body;
    await User.findByIdAndUpdate(req.user._id, {
      $set: { emailPreferences, inAppPreferences, hideVisitCount, hideFromMostVisited },
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};

exports.unsubscribe = async (req, res) => {
  const { token } = req.params;
  const { category } = req.query;

  const parsed = verifyUnsubscribeToken(token);
  if (!parsed) {
    return res.status(400).json({ error: 'Invalid or tampered unsubscribe link.' });
  }

  // Use category from query string if provided, fall back to token's category
  const cat = category || parsed.category;
  const allowedCategories = ['profileComments', 'announcements'];
  if (!allowedCategories.includes(cat)) {
    return res.status(400).json({ error: 'Unknown notification category.' });
  }

  try {
    await User.findOneAndUpdate(
      { username: parsed.username },
      { $set: { [`emailPreferences.${cat}`]: false } }
    );
    res.status(200).json({ username: parsed.username, category: cat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unsubscribe.' });
  }
};
