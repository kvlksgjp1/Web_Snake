var express = require('express')
const app = express();
var http = require('http').createServer(app);
var fs = require('fs');

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Connected at 3000');
});
