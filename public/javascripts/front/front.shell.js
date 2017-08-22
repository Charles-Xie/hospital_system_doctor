front.shell = (function () {
    var $container;

    var init = function (container) {
        $container = container;
        front.modal.emit('web-get-reglist-apply','','web-get-reglist-reply',addRegList);
        front.modal.emit('web-get-chat-apply','','web-get-chat-reply',addChatContent);

    }

    var addChatContent = function (content) {
        var $text = $('#chatContent');
        $text.val(content);
    }

    var regTableRefresh = function() {
        front.modal.getRegList().then(function(arr) {
            $table = $('#regTable');
            $table.find('tbody').find('tr').remove();
            arr.forEach(function(item, index) {
                var line = [
                    // to do 把信息改了加上
                    item.sequence,
                    item.title,
                    item.description
                ];
                dashboard.addTableRow('#regTable', line);
            });
        });
    };

    var addRegList = function (arr) {
        $regTable = $container.find('#regTable');
        $regTable.find('tbody').find('tr').remove();
        arr.forEach(function (patient, index) {
            var line = [
                patient.name,
                patient.email,
                patient.time,
                patient.test
            ];
            dashboard.addTableRow('#regTable',line);
        });
    };

    return{
        init : init ,
        regTableRefresh : regTableRefresh ,
        addRegList : addRegList
    };
})();