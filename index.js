// Setup Redis
var redisConnectionString = "redis://redistogo:8f4f25e5043da7a2e53deb0a5f149824@bluegill.redistogo.com:9504/";
var redis = require("redis").createClient(redisConnectionString);
redis.on("error", function (err) {
    console.log("Error " + err);
});

// Setup Express
var express = require('express');
var app = express();
app.use(express.static('static-web'));

// Webhook to increment the counter
// Atomically increment in Redis
// Update Firebase for all the dashboard clients
app.get('/webhook', function (req, res) {
  redis.incr('myCounter', function(err, reply) {
    res.send('myCounter: ' + reply);
  });
});

// Start the express HTTP server
// Use either the Heroku defined port, or default port 5000
var server = app.listen((process.env.PORT || 5000), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
