const mongoose = require('mongoose')


const memberSchema = new mongoose.Schema({
    Firstname: {type: String, required: true},
    Lastname: {type: String, required: true},
    DoB: {type: String, required: true},
    RegDate: {type: String, required: true},
    Phone1: {type: Number, required: true},
    Phone2: {type: Number, required: true},
    Email: {type: String, required: true},
    Residential: {type: String, required: true},
    Marital: {type: String, required: true},
    NoChildren: {type: String, required: true},
    Department: {type: String, required: true},
    Occupation: {type: String, required: true},
    isVisitor: {type: String, required: true},
    isBaptised: {type: String, required: true},
    Photo: {type: String, required: false},
})

module.exports = memberSchema;