const express = require('express');
const User = require('../models/User');                     
const Course = require('../models/Course');             
const Video = require('../models/Video');             
const router = express.Router();
const { auth } = require("../middleware/auth");
const { generateCourseId, getVideoId }= require("../functions/utility");
const upload = require('../functions/multer');
const path = require('path');
const fs = require('fs');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (password == user.password){
    res.status(200).json({ user:user, message: 'message from server' });
  }
  else{
    res.status(401).json({ message: 'Wrong password' });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
    try {
      const newUser = new User({ name, email, password });
      const savedUser = await newUser.save();
      res.status(200).json({ message: 'message from server' });
    } 
    catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
 
});

router.post('/getCourseList', async (req, res) => {
  const { email } = req.body;
  try{
    const user = await User.findOne({ email });
    const offered = user.teachingCourses || [];
    const enrolled = user.enrolledCourses || [];

    const offeredCourses = await Course.find({ courseId: { $in: offered } });
    const enrolledCourses = await Course.find({ courseId: { $in: enrolled } });

    const offeredCoursesDetails = offeredCourses.map(course => ({
      courseId: course.courseId,
      courseName: course.courseName,
    }));

    const enrolledCoursesDetails = enrolledCourses.map(course => ({
      courseId: course.courseId,
      courseName: course.courseName,
    }));

    res.status(200).json({offered:offeredCoursesDetails, enrolled:enrolledCoursesDetails, message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/getSearchResult', async (req, res) => {
  try {
    const result = await Course.find();
    const courses = result.map(course => ({
      courseId: course.courseId,
      courseName: course.courseName,
    }));
    res.status(200).json({result:courses});
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/addOffered', async (req, res) => {
  const { email, name, courseName, courseDesc } = req.body;
  const courseId=generateCourseId();

  try {
    const newCourse= new Course({ courseId, courseName, courseDesc, courseTutor:name, email });
    const savedCourse = await newCourse.save();

    const user = await User.findOne({ email: email });
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { teachingCourses: courseId }
    });

    res.status(200).json({message: 'message from server: course added' });
  } 
  catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

router.post('/enroll', async (req, res) => {
  try{
    const { email,courseId } = req.body;
    const user = await User.findOne({ email: email });
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { enrolledCourses: courseId }
    });
    res.status(200).json({message: 'message from server: course enrolled' });
  }
  catch (error){
    console.log(error)
    res.status(400).json({ message: error.message });
  }
  
});

router.post('/unEnroll', async (req, res) => {
  try{
    const { email,courseId } = req.body;
    const user = await User.findOne({ email: email });
    user.enrolledCourses = user.enrolledCourses.filter(id => id !== courseId);
    await user.save();
    res.status(200).json({message: 'message from server: course unenrolled' });
  }
  catch (error){
    console.log(error)
    res.status(400).json({ message: error.message });
  }
  
});

router.post('/isEnrolled', async (req, res) => {
  try{
    const { email, courseId } = req.body;
    const user = await User.findOne({ email });
    const isEnrolled = user.enrolledCourses.includes(courseId);
    if (isEnrolled) {
      res.status(200).json({isEnrolled:true, message: 'message from server: course enrolled' });
    }
    else{
      res.status(200).json({isEnrolled:false, message: 'message from server: course enrolled' });
    }
  }
  catch (error){
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

router.post('/getVideoList', async (req, res) => {
  const { courseId } = req.body;
  try{
    const course = await Course.findOne({ courseId });
    res.status(200).json({videos:course.videos, message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/addVideo', upload.single('video'), async (req, res) => {
  const { courseId } = req.body;
  try{
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const videoFileName = req.file.filename;
    const course = await Course.findOne({ courseId: courseId });
    await Course.findByIdAndUpdate(course._id, {
      $addToSet: { videos: videoFileName }
    });

    const videoId = getVideoId(videoFileName);
    const videoName= 'course-video'
    const videoSequence= 1
    const newVideo= new Video({ videoId, courseId, videoName, videoSequence });
    const savedVideo = await newVideo.save();

    res.status(200).json({message: 'message from server' });
  }
  catch (error){
    console.log(error) 
    res.status(500).json({ message: error.message });
  }
});

router.post('/playVideo', (req, res) => {
  const { filename } = req.body;
  try{
    const videoPath = path.join(__dirname, '..', 'videos', filename);
    
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.sendFile(videoPath, (err) => {
        if (err) {
          res.status(404).send('Video not found');
        }
    });
  }
  catch (error){
    console.log(error) 
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
