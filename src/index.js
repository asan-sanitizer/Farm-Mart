const path = require('path')
const logger = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
var session = require('express-session')


const machineryController = require('./server/addMachinery')
const landController = require('./server/addLand')
const searchLandPosts = require('./server/searchLandPosts')
const searchMachinePosts = require('./server/searchMachinePosts')
const accountinfo = require('./server/accountInfo')
const sendMsg = require('./server/sendsms')
const getMsg = require('./server/getAllMessages')
const { url } = require('inspector')
const auth = require('./server/auth')
const searchAll = require('./server/searchAll')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(logger("dev"))



app.use(session({
    user: null,
    secret: 'farmkey',
    resave: false,
    saveUninitialized: true
}))


app.get('/', (req, resp) => {
    resp.render("home.ejs");
})

app.get("/land", urlencodedParser, searchLandPosts.getAllPosts);

app.get('/machine', urlencodedParser, searchMachinePosts.getAllPosts);

app.get('/getAllMessages', urlencodedParser, getMsg.getAllMessages);

app.get('/addAsset', (req, resp) => {
    resp.render("add-asset-form.ejs");
})

app.get('/profile/:username', (req, res) => {
    res.send(req.params.username)
})

app.get('/getAllMessages', urlencodedParser, getMsg.getAllMessages);

app.get('/addAsset', (req, resp) => {
    resp.render("add-asset-form.ejs");
})

app.post("/addMachine", urlencodedParser, machineryController.create);

app.post("/addLand", urlencodedParser, landController.create);


app.get('/land/:id', urlencodedParser, landController.showPost);
app.post('/land/update', urlencodedParser, landController.edit);

app.get('/machine/:id', urlencodedParser, machineryController.showPost);
app.post('/machine/update', urlencodedParser, landController.edit);

app.post("/searchLandPosts", urlencodedParser, searchLandPosts.getPosts);
app.post("/searchMachinePosts", urlencodedParser, searchMachinePosts.getPosts);
app.get("/success", urlencodedParser, (req, res) => {
    res.render("success.ejs");
})
app.get("/cancel", urlencodedParser, (req, res) => {
    res.render("Oncancel.ejs");
})
app.post("/search", urlencodedParser, searchLandPosts.getPosts);
app.get('/account-info', urlencodedParser, accountinfo.showinfo);
app.post('/edit-account-info', urlencodedParser, accountinfo.edit);

app.post('/usercreate', urlencodedParser, accountinfo.create);

app.post('/account-info-edit', urlencodedParser, accountinfo.editinfo);

app.get("/landPosts", urlencodedParser, searchLandPosts.getAllPosts);
app.get("/machineryPosts", urlencodedParser, searchMachinePosts.getAllPosts);
app.post('/login', urlencodedParser, auth.login);

app.get('/login', (req, resp) => {
    if (!req.session.user) {
        resp.render("login.ejs");
    }
    else {
        resp.redirect("/");
    }

});

app.get('/signUp', (req, resp) => {
    resp.render("sign-up.ejs");
})


const client = require('twilio')("AC98b8ec28dd24a88aa5ad77ed76edff47", "6d564b2e2b0f510133eb8020a9f50c82");

app.get("/notification", urlencodedParser, (req, res) => {
    client.messages.list({ limit: 20 })
        .then(messages => res.render("notification.ejs", { "data": messages }));
})

app.get("/payment", urlencodedParser, (req, res) => {
    console.log(req.session.postData);
    res.render("payment.ejs", { "postData": req.session.postData, "postType": req.session.postType })
})

app.get("/directchat", urlencodedParser, getMsg.getAllMessages);

app.post('/searchAll', urlencodedParser, searchAll.getAllPosts);
app.get("/logout", urlencodedParser, (req, res) => {
    req.session.user = null;
    res.redirect("/")
})

app.use(logger("dev"))

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});
