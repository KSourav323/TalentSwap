const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true,
    },
    courseId: { 
    type: String, 
    required: true,
    },
    rating: { 
        type: Number
    },
}, { timestamps: true });

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
