var express = require('express');
var app = express();

var webhookCalledCount = 0;

app.get('/', function (req, res) {
  res.send(webhookCalledCount);
});

app.get('/webhook', function (req, res) {
  webhookCalledCount++;
  res.send('success');
});

var server = app.listen((process.env.PORT || 5000), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
