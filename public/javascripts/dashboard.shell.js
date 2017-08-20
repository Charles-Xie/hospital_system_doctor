var dashboard = function () {
    var $sidebarContainer, $navContainer;
    var init = function($container) {
        $sidebarContainer = $container.find('.sidebar-content-container');
        $navContainer = $container.find('.navbar-content-container');
    };

    var addTableRow = function(tableId, cols) {
        var $table = $(tableId);
        var $body =  $table.find('tbody');
        if($body.length === 0) {
            $table.append($('<tbody></tbody>'));
            $body = $table.find('tbody');
        }
        $body.append($('<tr></tr>'));
        var $tr = $body.find('tr').last();
        cols.forEach(function(item) {
            var $td = $('<td></td>');
            if(typeof item === 'string')
                $td.text(item);
            else
                $td.append(item);
            $tr.append($td);
        });
        return $tr;
    };

    return {
        init : init,
        addTableRow : addTableRow
    }
}();