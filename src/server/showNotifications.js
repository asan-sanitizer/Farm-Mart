
var express = require('express');
var app = express();

function notification() {
  var result = [{}]
  console.log("getting all notifications")
  client.messages.list({ limit: 20 })
    .then(messages => messages.forEach(m => console.log(m.body)));
}


setInterval(() => {
  console.log("running function every 200000 seconds ")
}, 2000);