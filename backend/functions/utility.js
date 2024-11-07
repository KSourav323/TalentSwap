const { v4: uuidv4 } = require('uuid');
const path = require('path');

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

module.exports = { generateCourseId, generateVideoId, getVideoId, generateChatId, generateUserId};