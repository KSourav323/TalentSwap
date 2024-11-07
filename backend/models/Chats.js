const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true
  },
  courseId: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Chat = mongoose.model('Chats', chatSchema);

module.exports = Chat;
