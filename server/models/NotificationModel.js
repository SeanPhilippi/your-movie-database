const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const NotificationSchema = new Schema({
  recipient: { type: String, required: true }, // username of the person being notified
  type:      { type: String, required: true }, // 'profile_comment' | 'announcement'
  actor:     { type: String },                 // username who triggered it (null for announcements)
  ref_id:    { type: Schema.Types.ObjectId },  // comment _id or null
  link:      { type: String },                 // e.g. '/profile/filmfan99'
  read:      { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Notification', NotificationSchema);
