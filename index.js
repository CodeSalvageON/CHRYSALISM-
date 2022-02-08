const fs = require('fs');
const express = require('express');

let app = require('express')();
let http = require('http').Server(app);
let bodyParser = require('body-parser');

let io = require('socket.io')(http);
let port = process.env.PORT || 3000;

const rp = require('request-promise');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.post('/getlinks', async function (req, res) {
  const url = req.body.url;
 
  rp(url)
  .then(function (html) {
    res.send(html);
    console.log(html);
  })
  .catch(function (err) {
    throw err;
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});