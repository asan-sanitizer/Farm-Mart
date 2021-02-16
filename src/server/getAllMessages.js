var express = require('express');
var app = express();
const client = require('twilio')("AC98b8ec28dd24a88aa5ad77ed76edff47", "6d564b2e2b0f510133eb8020a9f50c82");

exports.getAllMessages = function (req, res) {
    var result = [{}]
    console.log("getting all msgs")
    client.messages.list({ limit: 20 })
        .then(messages => res.render("chat-ui.ejs", { "Data": messages }));

}