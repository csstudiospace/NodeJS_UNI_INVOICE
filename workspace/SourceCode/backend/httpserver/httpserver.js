const express = require('express');
const path = require('path');
const app = express();
const http = require('http');

var httpserver = http.createServer(app);

//the path is based on js folder
const curpath = path.resolve(__dirname);

//Home page
app.get('/', function (req, res) {
  res.sendFile(curpath+'/index.html');
});

//hello page
app.get('/hello', function (req, res) {
  res.send('Hello HTTP Server');
});

//static page
app.use('/static', express.static(curpath+"/public"));


//listen event
httpserver.on("listening", function(){
	var addr = httpserver.address();
	var port = addr.port;
	console.log("Http Server listen on:"+port);
});

//start server
httpserver.listen(8080);
