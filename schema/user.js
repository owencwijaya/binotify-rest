const mongoose = require("mongoose");
const songSchema = require('./song');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }, 
    admin: {
        type: Boolean,
        default: false
    },
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);