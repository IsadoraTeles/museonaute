
// importing the module that you're using
var express = require('express'); // require access to 'express'

var app = express(); // create the app, making 'express' application

var server = app.listen (3000);

app.use(express.static('public')); // see whats in the public directory

// test code
console.log("socket server running");
