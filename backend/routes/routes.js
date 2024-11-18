const express = require('express');
const User = require('../models/User');                     
const Course = require('../models/Course');             
const Video = require('../models/Video');             
const Chat = require('../models/Chats');         
const Rating = require('../models/Rating');         
const router = express.Router();
const { auth } = require("../middleware/auth");
const { generateCourseId, getVideoId, generateChatId, generateUserId }= require("../functions/utility");
const upload = require('../functions/multer');
const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyD-MquYEAZ77bAblfuY5D_f_WyAHEn8EOk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
      const userId = generateUserId();
      const newUser = new User({ userId, name, email, password });
      const savedUser = await newUser.save();
      res.status(200).json({ user:savedUser, message: 'message from server' });
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

    res.status(200).json({offered:offeredCourses, enrolled:enrolledCourses, message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/getCourseDetails', async (req, res) => {
  const { courseId } = req.body;
  try{
    const course = await Course.findOne({ courseId:courseId });
    res.status(200).json({course:course, message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/deleteCourse', async (req, res) => {
  const { courseId } = req.body;
  try{
    const courseResult = await Course.deleteOne({ courseId });

    const userResult = await User.updateMany(
      {}, 
      {
        $pull: {
          enrolled: courseId,
          offered: courseId
        }
      }
    );

    res.status(200).json({message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/getSearchResult', async (req, res) => {
  try {
    const {filter} = req.body
    console.log(filter)
    const result = await Course.find();
    res.status(200).json({result:result});
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/addOffered', async (req, res) => {
  const { email, name, courseName, courseDesc, courseCat } = req.body;
  const courseId=generateCourseId();

  try {
    const newCourse= new Course({ courseId, courseName, courseDesc, courseTutor:name, email, category:courseCat, rating:0 });
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
    const videos = await Video.find({ courseId });
    res.status(200).json({videos:videos, message: 'message from server' });
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

router.post('/deleteVideo', async (req, res) => {
  const { videoId } = req.body;
  try{
    const result = await Video.deleteOne({ videoId: videoId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({message: 'message from server' });
  }
  catch (error){
    console.log(error) 
    res.status(500).json({ message: error.message });
  }
});

router.post('/playVideo', async (req, res) => {
  const { filename } = req.body;
  try{
    const videoPath = path.join(__dirname, '..', 'videos', `${filename}.mp4`);
    
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

router.post('/getMessages', async (req, res) => {
  const { courseId,  } = req.body;
  try{
    const chats = await Chat.find({ courseId });
    res.status(200).json({chats:chats, message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/sendMessage', async (req, res) => {
  const { courseId, senderId, message } = req.body;
  try{
    const user = await User.findOne({ userId: senderId });
    const chatId = generateChatId();
    const senderName = user.name;
    const newChat = new Chat({ chatId, courseId, senderId, senderName, message });
    const savedChat = await newChat.save();
    res.status(200).json({ message: 'sent' });
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/sendAi', async (req, res) => {
  const { courseId, message } = req.body;
  try{
    const course = await Course.findOne({ courseId: courseId });
    const prompt = `You are an AI assistant for students. In a formal, simple and friendly tone, related to the topic: ${course.courseName}, give a short response to the query: ${message}.`;
    const result = await model.generateContent(prompt);
    res.status(200).json({ message: result.response.text() });
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/getRating', async (req, res) => {
  const { userId, courseId } = req.body;
  try{
    const userRating = await Rating.findOne({ userId, courseId });
    if (userRating) {
      return res.status(200).json({ rating: userRating.rating });
    } else {
      return res.status(200).json({ rating: 0 });
    }
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/rate', async (req, res) => {
  const { userId, courseId, rating } = req.body;
  try{
    const existingRating = await Rating.findOne({ userId, courseId });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } 
    else {
      const newRating = new Rating({
        userId,
        courseId,
        rating,
      });
      await newRating.save();
    }
    
    const courseRatings = await Rating.find({ courseId });
    const totalRatings = courseRatings.length;
    const sumRatings = courseRatings.reduce((sum, current) => sum + current.rating, 0);
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
    console.log(courseRatings, totalRatings, sumRatings, averageRating)

    const course = await Course.findOne({ courseId });
    if (course) {
      course.rating = averageRating;
      await course.save();
    }

    res.status(200).json({ message: 'rated' });
    
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});





module.exports = router;
