var mongoose = require('mongoose')

exports.User = mongoose.model('user', {
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    address: String,
    province: String,
    password: String,
    type: String
});