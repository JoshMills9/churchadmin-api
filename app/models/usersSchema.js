const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    church: {type: String, required: true},
    phone: {type: String, required: true},
    posts: {type: Array, required: false},
    events: {type: Array, required: false},
    followers: {type: Array, required: false},
});

module.exports =  mongoose.model('User', userSchema);