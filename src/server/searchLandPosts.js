const config = require('./configure')
var land = require('./land.schema')
var mongoose = require('mongoose')

mongoose.connect(config.cloudurl, { useNewUrlParser: true }).then(
        () => { console.log("connection successfull") }).
        catch(err => console.log('could not connect to mongo', err));

exports.getAllPosts = (req, res) => {

        const LandPost = land.Land;
        LandPost.find({}, function (err, inlandpost) {
                if (err) return res.send(err);
                res.render("land-post.ejs", { "data": inlandpost })
        });

}

exports.getPosts = (req, res) => {
        var provinceRadios = req.body.provinceSelect;
        var priceRadios = req.body.priceRadios;
        console.log("priceRadios ", priceRadios)

        var title = req.body.title;
        if (!title) {
                title = '';
        }
        if (!provinceRadios) {
                provinceRadios = '';
        }
        var lowrent = 0.0;
        var highrent = 0.0;

        if (priceRadios == '1') {
                lowrent = 0.0;
                highrent = 100.0;
        }
        else if (priceRadios == '2') {
                lowrent = 100.0;
                highrent = 500.0;
        }
        else if (priceRadios == '3') {
                lowrent = 500.0;
                highrent = 1000.0;
        }
        else if (priceRadios == '4') {
                lowrent = 1000.0;
                highrent = 100000000.0;
        }
        else {
                lowrent = 0.0;
                highrent = 100000000.0;
        }

        const LandPost = land.Land;

        LandPost.find({
                $and: [
                        { 'title': { $regex: new RegExp(".*" + title + ".*", "i") } },
                        { $and: [{ 'rent': { $gte: lowrent } }, { 'rent': { $lte: highrent } }] },
                ]
        }, function (err, inlandpost) {
                if (err) return res.send(err);
                console.log(priceRadios)
                console.log("searching for price between  ", lowrent, " ,", highrent)

                res.render("land-post.ejs", { "data": inlandpost })
        });

}



