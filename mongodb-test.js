const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/book', {useNewUrlParser: true, useUnifiedTopology: true});

const Post = mongoose.model('testpost',{ title: String, author:String, rating:Number})

var Machine = mongoose.model('machine-post',{
    title: String,
    description: String,
    rent: mongoose.Types.Decimal128,
    image: Buffer,
    year: String,
    name: String

});



const path = require('path')
const logger = require('morgan')
const express = require('express')
const bodyParser = require('body-parser');
const { url } = require('inspector');
const app = express()
const port = 3000


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended:false})

// // Middleware setup 
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(__dirname + '/public'));
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
// // app.use(bodyParser.urlencoded({extended: false}));
// app.use(logger("dev"))


/** ROUTES **/

//creats a new machinery post and adds it to mongodb 
app.post('/addForm', urlencodedParser ,function(req,res) {
	var title = req.body.title;
	var description= req.body.description;
	var rent = req.body.rent;
	var image= req.body.image;
	var year= req.body.year;
	var name= req.body.name;

	const newmachine= Machine({title: title, description:description, rent: rent,image:image,year:year,name:name});

	newmachine.save().then(( ) => res.send("saved"));

})

app.get("/", urlencodedParser,(req,res) => {
    res.sendFile(__dirname + "/form.html");
})


app.post("/search", urlencodedParser, (req,res) => {
        console.log(req.body.example)
});


//updates the existing post and push the updated post deatils to mongodb
//app.put('/addPost/:id', urlencodedParser ,postController.update)

/** ROUTES END **/

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});
