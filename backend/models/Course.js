const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseDesc: {
    type: String,
    required: true
  },
  courseTutor: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;
