front.modal = (function () {
    var $container;

    var init = function (container) {
        $container = container;
    };

    var emitToSql = function (event, data, waitForEvent, callback, timeout_opt, timeoutCallback_opt) {
        var replied = false;
        var listener = function (data) {
            console.log('[active db] trigger one listener to', waitForEvent);
            replied = true;
            console.log('[active db]', waitForEvent, 'reply received');
            socketIO.removeListener(waitForEvent, listener);
            if (callback)
                callback(data);
        };
        socketIO.on(waitForEvent, listener);
        console.log(event, data, 'to sql');
        socketIO.emit(event, data);
        // timeout option
        if (timeout_opt) {
            setTimeout(function () {
                if (!replied) {
                    console.warn('[active db] wait for', waitForEvent, timeout_opt + 'ms', 'timeout.');
                    socketIO.removeListener(waitForEvent, listener);
                    timeoutCallback_opt && timeoutCallback_opt();
                }
            }, timeout_opt)
        }
    };

    return{
        init : init ,
        emit : emitToSql
    }
})();
