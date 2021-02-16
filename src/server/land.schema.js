var mongoose = require('mongoose')

exports.Land = mongoose.model('land-post', {
    title: String,
    description: String,
    rent: mongoose.Types.Decimal128,
    image: Buffer,
    dimensions: String,
    soil: String,
    location: String,
    user_name: String,
});