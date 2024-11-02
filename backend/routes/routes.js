const express = require('express');
const User = require('../models/User');                     
const Course = require('../models/Course');             
const router = express.Router();
const { auth } = require("../middleware/auth");
const { generateCourseId }= require("../functions/utility");

router.post('/login', async (req, res) => {
  console.log(req.body)
  res.status(200).json({ message: 'message from server' });
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

router.post('/getVideoList', async (req, res) => {
  const videos = ['svid 1', 'svid 2', 'svid 3'];
  res.status(200).json({videos:videos, message: 'message from server' });
});

router.post('/addOffered', async (req, res) => {
  const { courseName, courseDesc } = req.body;
  const email='sourav@gmail.com'
  const courseId=generateCourseId();
  const courseTutor='sourav'

  try {
    const newCourse= new Course({ courseId, courseName, courseDesc, courseTutor, email });
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

module.exports = router;
