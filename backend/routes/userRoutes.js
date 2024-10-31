const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { auth } = require("../middleware/auth");

router.post('/login', async (req, res) => {
  console.log(req.body)
  res.status(200).json({ message: 'message from server' });
});

router.post('/signup', async (req, res) => {
  console.log(req.body)
  res.status(200).json({ message: 'message from server' });
});

module.exports = router;
