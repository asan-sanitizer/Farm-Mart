let config = require('./configure')
let user = require('./user.schema')
let mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { Land } = require('./land.schema');
const { json } = require('body-parser');
var currentUSer = { id: '', body: {} };
var session = require('express-session')

mongoose.connect(config.cloudurl, { useNewUrlParser: true }).then(
    () => {
        console.log("connection successfull")
    }).catch(err => console.log('could not connect to mongo', err));

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.username) {
        return res.status(400).send({ msg: "UserName cannot be empty" });
    }

    const newuser = user.User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        province: req.body.province,
        password: req.body.password,
        type: req.body.radioType
    });
    newuser.save().then(() => res.redirect("/login"));
}



exports.showinfo = (req, res) => {
    console.log("showinfo")
    if(!req.session.user){res.redirect("/login")}
    user.User.findById(ObjectId(req.session.user._id), (err, result) => {
        if (err) {
            console.log("error fetching the post ", err)
        } else {
            Land.find({ user_name: "abhishek" }, (err, allPosts) => {
                console.log('Session ID: ' + req.session.user._id)
                console.log("posts " + result)
                console.log("loggin the result ", result)
                console.log("loggin the allPosts", allPosts)
                currentUSer.id = result._id;
                currentUSer.body = result;
                res.render("account-info.ejs", { "data": result, "posts": allPosts })
            })
        }
    })

}


exports.editinfo = (req, res) => {
    console.log("_id : ", JSON.stringify(req.body));
    console.log(currentUSer);
    res.render("edit-account-info.ejs", { "data": currentUSer.body })
}

exports.edit = (req, res) => {
    var currId = req.body.id;
    if (!currId) { currId = currentUSer.id }
    console.log("_id : ", currId)
    console.log("Edit User: ", req.body.name)
    user.User.findByIdAndUpdate(ObjectId(currId), req.body, (err, result) => {
        if (err) {
            console.log("error fetching the post ", err)
        } else {
            console.log("result", result)
            currentUSer.id = currId;
            currentUSer.body = req.body;
            res.render("account-info.ejs", { "data": req.body })
        }
    })
}



