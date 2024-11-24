const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '##',
    pass: '##',
  },
});

function sendMail(mailOptions) {
  transporter.sendMail(mailOptions);
  return 0;
}

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, 'talentswapkey', {
    expiresIn: '1h',
  });
  return token;
};

function generateUserId() {
  return `USER-${uuidv4()}`;
}

function generateCourseId() {
  return `COURSE-${uuidv4()}`;
}

function generateVideoId() {
  return `VIDEO-${uuidv4()}`;
}

function generateChatId() {
  return `CHAT-${uuidv4()}`;
}

function getVideoId(filename) {
  return path.basename(filename, path.extname(filename));
}


module.exports = { generateCourseId, generateVideoId, getVideoId, generateChatId, generateUserId, generateToken, sendMail };