const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please provide a title'],
        unique: true,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please provide a description'],
    },
    username: {
        type: String,
        trim: true,
        default: 'Anonymous',
        required: false,
    },
    
    category: {
        type: Array,
        required: false,
    },
    photo: {
        type: String,
        required: [true, 'Please provide an image'],
    },
},{
    timestamps: true,
});

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;