var redisConnectionString = "redis://redistogo:8f4f25e5043da7a2e53deb0a5f149824@bluegill.redistogo.com:9504/";
var redis = require("redis").createClient(redisConnectionString);
redis.on("error", function (err) {
    console.log("Error " + err);
});

var express = require('express');
var app = express();

//var webhookCalledCount = 0;

app.get('/', function (req, res) {
  redis.get('myCounter', function(err, reply) {
    res.send('webhook called: ' + reply + ' times');
  });
});

app.get('/webhook', function (req, res) {
  //webhookCalledCount++;
  redis.incr('myCounter', function(err, reply) {
    res.send('myCounter: ' + reply);
  });
});

var server = app.listen((process.env.PORT || 5000), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
