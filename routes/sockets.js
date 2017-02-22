var io = require('socket.io');

exports.initialize = function(server) {
    io = io.listen(server);
    io.sockets.on("connection", (socket) => {
        console.log('Client connection');

        socket.on('message', (message) => {
            // message = JSON.parse(message);
            console.log(message);
            if (message.type == "userMessage") {
                socket.broadcast.send(message);
                message.type = "myMessage";
                socket.emit('message', message);
            }
        });

        socket.on('set_name', (data) => {
            console.log(data);
            // socket.set('nickname', data.name, () => {
                socket.emit('name_set', data);
                socket.emit('message', {
                    type: 'serverMessage',
                    message: 'Welcome to the most interesting chat room on earth!'
                });
            // })
        })
    })
}