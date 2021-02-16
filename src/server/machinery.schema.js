var mongoose = require('mongoose')

exports.Machine = mongoose.model('machine-post', {
    title: String,
    description: String,
    rent: mongoose.Types.Decimal128,
    image: Buffer,
    year: String,
    name: String,
    user_name: String
});

