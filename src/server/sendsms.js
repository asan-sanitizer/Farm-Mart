
var express = require('express');
var app = express();
exports.sendSMS = function (msg) {
  console.log("sending messgage")
  client.messages
    .create({
      body: msg,
      from: '+14343227238',
      to: '+14379902485',

    })
    .then(message => console.log(message.sid));
}




