const Comment = require('../models/CommentModel');
const User = require('../models/UserModel');
const Notification = require('../models/NotificationModel');
const { createUnsubscribeToken } = require('./utils/unsubscribeToken');

exports.getComments = (req, res) => {
  Comment.find({ username: req.params.username, disabled: undefined })
    .then(data => res.json(data.reverse()))
    .catch(() =>
      res
        .status(400)
        .json({ profileCommentsError: 'Failed to find profile comments' })
    );
};

exports.getMovieComments = (req, res) => {
  Comment.find({ movie_id: req.params.movie_id, disabled: undefined })
    .then(data => res.json(data.reverse()))
    .catch(() =>
      res
        .status(400)
        .json({ movieCommentsError: 'Failed to find movie comments' })
    );
};

exports.getTopMoviesComments = (req, res) => {
  Comment.find({ top_movies_list: true, disabled: undefined })
    .then(data => res.json(data.reverse()))
    .catch(() =>
      res
        .status(400)
        .json({ topMoviesCommentsError: 'Failed to find top movies comments' })
    );
};

exports.postComment = async (req, res) => {
  const {
    username,
    text,
    post_date,
    author,
    movie_id,
    top_movies_list,
  } = req.body;
  let newComment;
  if (movie_id) {
    newComment = new Comment({
      movie_id,
      author,
      text,
      post_date,
    });
  }
  if (username) {
    newComment = new Comment({
      username,
      author,
      text,
      post_date,
      movie_id,
    });
  }
  if (top_movies_list) {
    newComment = new Comment({
      top_movies_list,
      author,
      text,
      post_date,
      movie_id,
    });
  }

  try {
    const comment = await newComment.save();
    res.status(200).json(comment);

    // Only notify for profile comments, and never notify when commenting on own profile
    if (username && author && author !== username) {
      sendProfileCommentNotification({ recipient: username, actor: author, comment, text });
    }
  } catch (err) {
    console.error('postComment error:', err);
    res.status(400).json({ postCommentError: 'Failed to post comment' });
  }
};

const sendProfileCommentNotification = async ({ recipient, actor, comment, text }) => {
  try {
    const user = await User.findOne({ username: recipient.toLowerCase() }).select(
      'email emailPreferences inAppPreferences'
    );
    if (!user) {
      return;
    }

    const snippet = text.length > 120 ? text.slice(0, 120) + '…' : text;

    // Create in-app notification
    if (!user.inAppPreferences || user.inAppPreferences.profileComments !== false) {
      await Notification.create({
        recipient,
        type: 'profile_comment',
        actor,
        ref_id: comment._id,
        link: `/profile/${recipient}`,
      });
    }

    // Send email notification
    if (!user.emailPreferences || user.emailPreferences.profileComments !== false) {
      const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://www.yourmoviedatabase.com'
        : 'http://localhost:3000';
      const unsubToken = createUnsubscribeToken(recipient, 'profileComments');
      const unsubUrl = `${baseUrl}/unsubscribe/${unsubToken}?category=profileComments`;
      const profileUrl = `${baseUrl}/profile/${recipient}`;

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.NODE_ENV === 'production'
            ? 'YMDB <noreply@yourmoviedatabase.com>'
            : 'YMDB <onboarding@resend.dev>',
          to: process.env.NODE_ENV === 'production' ? user.email : 'sean.philippi@protonmail.com',
          subject: `[YMDB] ${actor} commented on your list`,
          html: `
            <p><strong>${actor}</strong> left a comment on your YMDB profile:</p>
            <blockquote style="border-left: 3px solid #EB5018; padding-left: 1em; margin-left: 0; color: #555;">
              ${snippet}
            </blockquote>
            <p><a href="${profileUrl}">View on YMDB →</a></p>
            <hr style="margin-top: 2em;" />
            <p style="font-size: 0.8em; color: #999;">
              You're receiving this because you have profile comment notifications enabled.<br />
              <a href="${unsubUrl}">Unsubscribe from profile comment emails</a> &nbsp;|&nbsp;
              <a href="${baseUrl}/settings">Manage all email preferences</a>
            </p>
          `,
        }),
      });

      if (!emailRes.ok) {
        const errBody = await emailRes.json().catch(() => ({}));
        console.error('[Resend] profile comment email failed:', emailRes.status, errBody);
      }
    }
  } catch (err) {
    console.error('[sendProfileCommentNotification] error:', err);
  }
}

exports.deleteComment = (req, res) => {
  const { id } = req.params;
  Comment.updateOne({ _id: id }, { $set: { disabled: true } })
    .then(() => res.sendStatus(200))
    .catch(() =>
      res.status(400).json({ failedToDelete: 'Failed to delete comment' })
    );
};
