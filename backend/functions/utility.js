const { v4: uuidv4 } = require('uuid');

function generateCourseId() {
  return `COURSE-${uuidv4()}`;
}

module.exports = { generateCourseId };