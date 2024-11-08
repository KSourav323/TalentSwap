const mongoose = require('mongoose');

const pmSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true
  },
  senderId: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  recieverId: {
    type: String,
    required: true
  },
  recieverName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Pm = mongoose.model('Pms', pmSchema);

module.exports = Pm;
