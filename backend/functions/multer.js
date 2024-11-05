const multer = require('multer');
const path = require('path');
const { generateVideoId }= require("./utility");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'videos');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = generateVideoId();
    const fileExtension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${fileExtension}`);
  }
});


const fileFilter = function (req, file, cb) {
  const filetypes = /mp4|mkv|avi|mov/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Only video files are allowed!'));
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100000000 }
});

module.exports = upload;
