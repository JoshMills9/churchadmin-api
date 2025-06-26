const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: false},
    host: {type: String, required: true},
    guest: {type: String, required: false},
    about: {type: String, required: true},
    media: {type: String, required: true},
    isInterested: {type: Boolean, required: false},
    interested: {type: Array, required: false},
    shared: {type: Array, required: false},
})

module.exports = eventSchema;