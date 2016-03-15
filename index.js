var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req,res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *: 3000')
})


//Send to everyone
io.emit('some event', {for: 'everyone'});

//Sned to everyone except for a certainsocket
io.on('connection', function(socket){
    socket.broadcast.emit('hi');
});

io.on('conection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});