let config = require('./configure')
let user = require('./user.schema')
let mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { json } = require('body-parser');
var currentUSer = { id: '', body: {} };

mongoose.connect(config.cloudurl, { useNewUrlParser: true }).then(
    () => {
        console.log("connection successfull")
    }).catch(err => console.log('could not connect to mongo', err));


exports.login = (req, res) => {
    console.log("login")
    console.log(req.body.username)
    if (!req.body.username || !req.body.password || !req.body.userType) {
        return res.status(400).send({ msg: "Enter required details" });

    }
    console.log(req.body.username, req.body.password, req.body.userType)
    user.User.findOne({ username: req.body.username, type: req.body.userType, password: req.body.password }, (err, userObj) => {
        console.log(userObj)
        if (!userObj) {
            return res.status(400).send({ msg: "Login Failed" });
        }
        else {
            req.session.user = userObj
            res.redirect("/landPosts")
        }
    })
}
