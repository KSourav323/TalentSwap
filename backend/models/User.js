const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roll: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  language: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  enrolledCourses: [
    {
      type: String
    }
  ],
  teachingCourses: [
    {
      type: String  
    }
  ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
