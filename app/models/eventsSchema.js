const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    Title: {type: String, required: true},
    StartDate: {type: String, required: true},
    EndDate: {type: String, required: false},
    Host: {type: String, required: true},
    Guest: {type: String, required: false},
    About: {type: String, required: true},
    Media: {type: String, required: true},
    Interested: {type: Array, required: false},
    Shared: {type: Array, required: false},
})

module.exports = eventSchema;