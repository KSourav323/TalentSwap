const mongoose = require('mongoose');

const notiSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true
  },
  receiverId: {
    type: String,
    required: true
  },
  content: {
    type: String,
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notiSchema);

module.exports = Notification;
