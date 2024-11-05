const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  courseId: {
    type: String,
    required: true
  },
  videoName: {
    type: String,
    required: true
  },
  videoSequence: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Videos = mongoose.model('Videos', videoSchema);

module.exports = Videos;
