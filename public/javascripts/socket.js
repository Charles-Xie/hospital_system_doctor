var socketIO;
jQuery(function () {
    var local = false;
    var DBadress = 'http://115.159.216.116:3200/web';
    var localAdress = 'http://loacalhost:3200/web';

    var logOnAnything = function (socket, prefix_opt) {
        var onevent = socket.onevent;
        socket.onevent = function (packet) {
            var args = packet.data || [];
            onevent.call(this, packet);
            packet.data = ["*"].concat(args);
            onevent.call(this, packet);
        };
        socket.on('*', function (event, data) {
            if (prefix_opt)
                console.log(prefix_opt, event, data, 'from', socket.id);
            else
                console.log(event, data, 'from', socket.id);
        });
    };

    socketIO = io(local ? localAdress : DBadress );

    socketIO.logFormatError = function(event) {
        console.error('[browser] ' + event + ' format error.');
    };
    socketIO.on('connect', function () {
        console.log('Has connected.');
    });
    socketIO.on('disconnect', function () {
        console.log('Lost connection.');
    });
    socketIO.on('echo', function (data) {
        console.log(data);
    });
    logOnAnything(socketIO, '[event received]');
});