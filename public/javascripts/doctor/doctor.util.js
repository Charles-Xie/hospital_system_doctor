doctor.util = (function () {
    var alertResult = function (data, page, successMsg, failMsg) {
        var result = data.result ? data.result : (data.res ? data.res : undefined);
        if (result == 'success') {
            var tip =
                $('<div class="alert alert-success" role="alert"></div>')
                .text(successMsg)
                .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            page.prepend(tip);
        } else if (result == 'fail') {
            var tip =
                $('<div class="alert alert-warning" role="alert"></div>')
                .text(failMsg)
                .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            page.prepend(tip);
        }
    };

    // Util
    // add several rows of same format to a table
    var addMultiRows = function (page, tableSelector, tableInfo, condition, includeEvents = false /* tableInfo JSON object array */ ) {
        // console.log("addMultiRows() called");
        if (tableInfo.length == 0) {
            console.log("No items found");
            return;
        }
        var $table = page.find(tableSelector);
        // console.log($table, tableInfo);
        var $tableTemp = page.data('patient') == undefined ? $table : $('#patient-').find(tableSelector);
        var $row = $tableTemp.children('tbody').children().eq(0); // as row template
        var $tbody = $table.find('tbody');
        $tbody.empty();

        var addRowItems = function (tds, rowInfo /* rowInfo an object */ ) {
            var count = 0;
            var itemName;
            while (count < tds.length) {
                itemName = tds.eq(count).data('tag');
                if (typeof itemName != 'undefined') {
                    if (typeof rowInfo[itemName] == 'string' || typeof rowInfo[itemName] == 'number') {
                        tds.eq(count).text(rowInfo[itemName]);
                    } else if (typeof rowInfo[itemName] != 'undefined') {
                        tds.eq(count).append(rowInfo[itemName]);
                    }
                }
                count += 1;
            }
        };

        tableInfo.forEach(function (rowInfo, index) {
            var newRow = $row.clone(includeEvents);
            addRowItems(((typeof condition == 'string') ? newRow.find('td').filter(condition) : newRow.find('td')), rowInfo);
            $tbody.append(newRow);
        });
    };

    // add info to items in table
    var addTableItems = function (page, tableSelector, tableInfo, condition /* tableInfo is JSON obj */ ) {
        if (tableInfo) {
            var $table = page.find(tableSelector);
            var $tds = (typeof condition == 'string') ? $table.find('td').filter(condition) : $table.find('td');
            var count = 0;
            while (count < $tds.length) {
                var itemName = $tds.eq(count).data('tag');
                // if no data-tag attribute, typeof itemName == undefined
                if (typeof itemName != 'undefined') {
                    if (typeof tableInfo[itemName] == 'string' || typeof tableInfo[itemName] == 'number') {
                        $tds.eq(count).text(tableInfo[itemName]);
                    } else if (typeof tableInfo[itemName] == 'undefined') {
                        console.log("Haven't got info item" + tableSelector + " " + itemName);
                    } else {
                        $tds.eq(count).append(tableInfo[itemName]);
                    }
                }
                count += 1;
            }
        }
    };


    return {
        alertResult: alertResult,
        addMultiRows: addMultiRows,
        addTableItems: addTableItems
    };
})();