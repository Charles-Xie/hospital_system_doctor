doctor.shell = (function() {
    var $container;

    var init = function(container) {
        $container = container;
        console.log("doctor shell init");

        // addRegTable(): add rows to register patient table
        // addPatientList(): add patient list
        addPatientList([{name: "李白", id: 1534662}, {name: "杜甫", id: 2352645}, {name: "王维", id: 3221497}]);
    };

    // Util
    // add several rows of same format to a table
    var addMultiRows = function(page, tableSelector, tableInfo, condition/* tableInfo JSON object array */) {
        if(tableInfo.length == 0)
            console.log("No items found");
            return;
        var $table = page.find(tableSelector);
        var $row = $table.find(tr).first().clone();     // as row template
        var $tbody = $table.find('tbody');
        $tbody.empty();

        var addRowItems = function(tds, rowInfo) {
            var count = 0;
            var itemName;
            while(count < tds.length) {
                itemName = tds.eq(count).data('tag');
                if(typeof itemName!= 'undefined') {
                    if(typeof rowInfo(itemName) == 'string') {
                        tds.eq(count).text(rowInfo(itemName));
                    }
                    else if(typeof itemName != 'undefined') {
                        tds.eq(count).append(rowInfo(itemName));
                    }
                }
                count += 1;
            }
        };

        tableInfo.forEach(function(rowInfo, index) {
            var newRow = $row.clone();
            addRowItems(((typeof condition == 'string')? newRow.find('td').filter(condition): newRow.find('td')), rowInfo);
            $tbody.append(newRow);
        });
    };

// _______________________________________ version 1 start
    // var addRegTable = function(arr) {
    //     $regTable = $container.find('#reg-patient-table');
    //     $regTable.find('tbody').find('tr').remove();
    //     // remove all the rows currently existing on the page
    //     arr.count = 1;
    //     arr.forEach(function (patient, index) {
    //         // var oneRow = [
    //         //     patient.name,
    //         //     patient.email,
    //         //     patient.time,
    //         // ];
    //         var oneRow = [arr.count];
    //         var optChoose = $('<button>')
    //             .addClass('btn')
    //             .addClass('btn-outline-primary')
    //             .addClass('btn-outline-sm')
    //             .text("选择");
    //         var optFinish = $('<button>')
    //             .addClass('btn')
    //             .addClass('btn-outline-secondary')
    //             .addClass('btn-sm')
    //             .text("完成");
    //         var optNode = $('<div>').append(optChoose).append(optFinish);
    //         oneRow.concat(patient.id, patient.name, patient.time, optNode);
    //         // need to add a col 'option', add node directly
    //         dashboard.addTableRow('#reg-patient-table',line);
    //     });
    // };
// _______________________________________ version 1 end

// ______________________________________ version 2 start
    var addRegTable = function(page, tableInfo) {
        addMultiRows(page, '#reg-patient-list', tableInfo, '[data-tag]');
    };
// ______________________________________ version 2 end
    
    var addPatientList = function(arr, itemSelector) {
        // console.log(doctor.dynamic);
        // console.log($container);
        console.log("addPatientList() called");        
        var $patientItem = (typeof itemSelector == 'undefined'? 
            $container.find('#patient-list-start'): 
            $container.find('#patient-list-start').parent().children('li.nav-item').filter(itemSelector));
        $patientItem.nextAll().remove();
        // remove all the patient currently in this list
        // console.log(doctor.dynamic);

        var $patientList = $patientItem.parent();
        arr.forEach(function(patient, index) {
            $patientList.append(
                $('<li>')
                    .addClass('nav-item')
                    .addClass('patient-item')
                    .append(
                        $('<a>',{
                            "class": "nav-link",
                            "data-toggle": "pill",
                            "href": "#",
                            "data-id": patient.id        // custom attribute set by myself
                        }).text(patient.name)
                    )
            );
        });
    };

    return {
        init: init,
        // addRegTable: addRegTable,
        addPatient: addPatientList,
        addMultiRows: addMultiRows
    };
})();