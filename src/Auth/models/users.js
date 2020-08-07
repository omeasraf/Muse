const mongoose = require('mongoose')
const config = require('../../../config.json')

var users = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    firstname: String,
    lastname: String,
    birthday: String,
})

var User = mongoose.model(config.mongodb.collections, users);

module.exports = User;