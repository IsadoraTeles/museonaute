
// importing the module that you're using
var express = require('express'); // require access to 'express'

var app = express(); // create the app, making 'express' application

var server = app.listen (3000);

app.use(express.static('public')); // see whats in the public directory

// test code
console.log("socket server running");

var socket = require('socket.io');

// keep track of io
var io = socket(server);
io.sockets.on('connection', newConnection);
function newConnection(socket) // triggered with new socket connection
{
    console.log('new connection' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data)
    {
        socket.broadcast.emit('mouse', data)
        console.log('Server receiving : '+ data.x + ', ' + data.y);
    }
}
