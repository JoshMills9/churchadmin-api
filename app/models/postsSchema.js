const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    img: {type: String, required: false},
    bg: {type: String, required: false},
    text: {type: String, required: false},
    vid: {type: String, required: false},
    title: {type: String, required: false},
    audio: {type: String, required: false},
    tagged: {type: Array, required: false},
    isBlessed: {type: Boolean, required: false},
    comments: {type: Array, required: false},
    blessed: {type: Array, required: false},
    shared: {type: Array, required: false},
})

module.exports = postSchema;