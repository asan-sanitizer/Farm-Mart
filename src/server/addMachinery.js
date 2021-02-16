const config = require('./configure')
var machine = require('./machinery.schema')
var mongoose = require('mongoose')

mongoose.connect(config.cloudurl, { useNewUrlParser: true }).then(
    () => { console.log("connection successfull") }).
    catch(err => console.log('could not connect to mongo', err));


exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.title) {
        return res.status(400).send({ msg: "Post Title cannot be empty" });
    }

    var title = req.body.title;
    var description = req.body.description;
    var rent = req.body.rent;
    var image = req.body.image;
    var year = req.body.year;
    var name = req.body.name;
    var username = req.body.username;

    const newmachine = machine.Machine({
        title: title,
        description: description,
        rent: rent,
        image: image,
        year: year,
        name: name,
        user_name: username
    });

    newmachine.save().then(() => res.send("saved"));
}

exports.edit = (req, res) => {
    console.log("_id : ", req.body.id)
    console.log("Edit Post:(Title) ", req.body.title)

    machine.Machine.findById(req.body.id, (err, result) => {
        if (err) {
            console.log("error fetching the post ", err)
        } else {
            result.title = req.body.title;
            result.description = req.body.description;
            result.rent = req.body.rent;
            result.image = req.body.image;
            res.send(result)
        }
    })

}

exports.showPost = (req, res) => {
    console.log("Params ID : ", req.params.id)

    machine.Machine.findById(req.params.id, (err, result) => {
        if (err) {
            console.log("error fetching the post ", err)
        } else {
            console.log(" result ", result)
            req.session.postData = result;
            req.session.postType = 'Machinery';
            res.render("detailed-post-machine.ejs", { "postData": result })
        }
    })

}