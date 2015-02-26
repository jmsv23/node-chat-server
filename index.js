var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config.json');
var sanitizeHtml = require('sanitize-html');

io.on('connection', function(socket){
  // console.log('a user connected');
  socket.on('disconnect', function(){
    // console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
  	// console.log('message: ' + msg);
  	//sanitizar mensaje
  	msg.msg = sanitizeHtml(msg.msg);
  	io.emit('server message',msg);
  });
});

http.listen(config.port || 2000, function(){
  console.log('listening on *:' + (config.port || 2000));
});