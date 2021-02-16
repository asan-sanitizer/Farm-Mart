let config = require('./configure')
let land = require('./land.schema')
let mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

mongoose.connect(config.cloudurl, { useNewUrlParser: true }).then(
    () => {
        console.log("connection successfull")
    }).catch(err => console.log('could not connect to mongo', err));

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.title) {
        return res.status(400).send({ msg: "Post Title cannot be empty" });
    }

    var title = req.body.title;
    var description = req.body.description;
    var dimensions = req.body.dimensions;
    var rent = req.body.rent;
    var image = req.body.image;
    var soil = req.body.soil;
    var location = req.body.location;
    var username = req.body.username;

    const newland = land.Land({
        title: title,
        description: description,
        rent: rent,
        image: image,
        dimensions: dimensions,
        soil: soil,
        location: location,
        user_name: username
    });

    const id = newland._id;
    const url = "/land/" + id;
    newland.save().then(() => res.redirect("/land"));
}

exports.edit = (req, res) => {
    console.log("_id : ", req.body.id)
    console.log("Edit Post:(Title) ", req.body.title)
    land.Land.findById(req.body.id, (err, result) => {
        if (err) {
            console.log("error fetching the post ", err)
        } else {
            result.title = req.body.title;
            result.description = req.body.description;
            result.rent = req.body.rent;
            result.soil = req.body.soil;
            result.rent = req.body.rent;
            result.image = req.body.image;
            res.send(result)
        }
    })
}


exports.showPost = (req, res) => {
    console.log("Params ID : ", req.params.id)

    land.Land.findById(req.params.id, (err, result) => {
        if (err) {
            console.log("error fetching the post ", err)
        } else {
            console.log(" result ", result)
            req.session.postData = result;
            req.session.postType = 'Land';
            res.render("detailed-post-land.ejs", { "Data": result })
        }
    })
}