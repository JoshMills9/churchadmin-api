const mongoose = require('mongoose')

const memberSchema = require('../models/membersSchema')
const eventsSchema = require('../models/eventsSchema');
const postSchema = require('./postsSchema');



const userSchema = new mongoose.Schema({
    church: {type: String, required: true},
    phone: {type: String, required: true},
    img: {type: String, required: false},
    user: {type: String, required: false},

    members: {type: [memberSchema], required: false},
    attendace: {type: Array, required: false},
    cells: {type: Array, required: false},
    pledges: {type: Array, required: false},

    posts: {type: [postSchema], required: false},
    events: {type: [eventsSchema], required: false},

    followers: {type: Array, required: false},
    notificaitons: {type: Array, required: false},

    isSubscribed: {type: Boolean, required: false}
});



module.exports = mongoose.model('User', userSchema);