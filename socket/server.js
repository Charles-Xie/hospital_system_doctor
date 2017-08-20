var io = require("socket.io")();
var client = require('socket.io-client');
var DBadress = 'http://115.159.216.116:3200/web';
var local = true;
var ioClient = client(local ? 'http://localhost:3200/web' : DBadress);

var logOnAnything = function (socket, prefix_opt) {
    var onevent = socket.onevent;
    socket.onevent = function (packet) {
        var args = packet.data || [];
        onevent.call(this, packet);    // original call
        packet.data = ["*"].concat(args);
        onevent.call(this, packet);      // additional call to catch-all
    };
    socket.on('*', function (event, data) {
        if (prefix_opt)
            console.log(prefix_opt, event, data, 'from', socket.id);
        else
            console.log(event, data, 'from', socket.id);
    });
};

var clientIni = function () {
    ioClient.on('connect', function () {
        console.log('connected to node forwarder.');
    });
    ioClient.on('disconnect', function () {
        console.warn('disconnect to node forwarder.');
    });
    logOnAnything(ioClient, '[active db]');
}

clientIni();

io.emitToSql = function (event, data, waitForEvent, callback, timeout_opt, timeoutCallback_opt) {
        var replied = false;
        var listener = function (data) {
            console.log('[active db] trigger one listener to', waitForEvent);
            replied = true;
            console.log('[active db]', waitForEvent, 'reply received');
            ioClient.removeListener(waitForEvent, listener);
            if (callback)
                callback(data);
        };
        if(waitForEvent)
            ioClient.on(waitForEvent, listener);
        console.log(event, data, 'to sql');
        ioClient.emit(event, data);
        // timeout option
        if (timeout_opt) {
            setTimeout(function () {
                if (!replied) {
                    console.warn('[active db] wait for', waitForEvent, timeout_opt + 'ms', 'timeout.');
                    ioClient.removeListener(waitForEvent, listener);
                    timeoutCallback_opt && timeoutCallback_opt();
                }
            }, timeout_opt)
        }
};

module.exports = io;