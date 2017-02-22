$(document).ready(function () {
    var socket = io('http://localhost:3000/');


    socket.on('message', function (data) {
        $('#message').append('<div class="' + data.type + '">' + data.message + '</div>');
    });

    socket.on('name_set', (data) => {
        $('#nameform').hide();
        $('#message').append('<div class="systemMessage">Hello ' +data.name+ '</div>')
    })

    $(function () {
        $('#send').click(function () {
            socket.emit('message', {
                message: $('#message').val(),
                type: 'userMessage'
            });
            $('#message').val('');
        })
    });

    $(function() {
        $('#setname').click(function() {
            socket.emit('set_name', {
                name: $('#nickname').val()
            })
        })
    })
});