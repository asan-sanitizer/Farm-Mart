const config = require('./configure')
var land = require('./land.schema')
var machine = require('./machinery.schema')
var mongoose = require('mongoose')

mongoose.connect(config.cloudurl, { useNewUrlParser: true }).then(
        () => { console.log("connection successfull") }).
        catch(err => console.log('could not connect to mongo', err));

exports.getAllPosts = (req, res) => {
        var title = req.body.title;
        const LandPost = land.Land;
        const machinePost = machine.Machine;
        var landData = null;
        var machineData = null;
        LandPost.find({
                $and: [
                        { 'title': { $regex: new RegExp(".*" + title + ".*", "i") } }
                ]
        }, function (err, inlandpost) {
                if (err) return res.send(err);
                machinePost.find({
                        $and: [
                                { 'title': { $regex: new RegExp(".*" + title + ".*", "i") } }
                        ]
                }, function (err, inmachinepost) {
                        if (err) return res.send(err);
                        res.render("search-posts.ejs", { "data": [inlandpost, inmachinepost] })
                });

        });

}


