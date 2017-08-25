doctor.shell = (function() {
    var $container;

    var init = function(container) {
        $container = container;
        console.log("doctor shell init");

        // addRegTable(): add rows to register patient table
        // addPatientList(): add patient list
        // addPatientList([{name: "李白", id: 1534662}, {name: "杜甫", id: 2352645}, {name: "王维", id: 3221497}]);
        doctor.con.emit("web-get-regis-patient-apply", {id: doctor.getId()}, "web-get-regis-patient-reply", addRegTable);
        doctor.con.emit("web-get-medical-patient-apply", {id: doctor.getId()}, "web-get-medical-patient-reply", addPatientList);
    };

    // Util
    // add several rows of same format to a table
    var addMultiRows = function(page, tableSelector, tableInfo, condition/* tableInfo JSON object array */) {
        console.log("addMultiRows() called");
        if(tableInfo.length == 0) {
            console.log("No items found");
            return;
        }
        var $table = page.find(tableSelector);
        console.log($table, tableInfo);
        var $row = $table.find('tr').eq(1).clone();     // as row template
        var $tbody = $table.find('tbody');
        $tbody.empty();

        var addRowItems = function(tds, rowInfo/* rowInfo an object */) {
            var count = 0;
            var itemName;
            while(count < tds.length) {
                itemName = tds.eq(count).data('tag');
                if(typeof itemName!= 'undefined') {
                    if(typeof rowInfo[itemName] == 'string') {
                        tds.eq(count).text(rowInfo[itemName]);
                    }
                    else if(typeof rowInfo[itemName] != 'undefined') {
                        tds.eq(count).append(rowInfo[itemName]);
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
    var addRegTable = function(data) {
        console.log("addRegTable() called");
        var tableInfo = (data instanceof Array? data: data.result);
        addMultiRows($container, '#reg-patient-table', tableInfo, '[data-tag]');
        doctor.dynamic.addRegBtns($container);
        updateRegNum();
    };

    var updateRegNum = function() {
        var regNum = $('#reg-patient-table').find('tr').length - 1;
        console.log("doctor.shell updateRegNum() called, reg num: " + regNum);
        if(regNum != 0) {
            $('#reg-patient-table').prev('div').children('p').text("共有 " + regNum + " 位病人");
        }
        else {
            console.log("No reg patient");
        }
    }
// ______________________________________ version 2 end
    
    var addPatientList = function(data, itemSelector) {
        // console.log(doctor.dynamic);
        // console.log($container);
        console.log("addPatientList() called");        
        var $patientItem = (typeof itemSelector == 'undefined'? 
            $container.find('#patient-list-start'): 
            $container.find('#patient-list-start').parent().children('li.nav-item').filter(itemSelector));
        $patientItem.nextAll().remove();
        // remove all the patient currently in this list
        // console.log(doctor.dynamic);

        var arr = (data instanceof Array? data: data.result);
        console.log(data.result);
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
        doctor.patient.addPatientPage();
        doctor.patient.addPatientListener();
    };

    return {
        init: init,
        // addRegTable: addRegTable,
        addPatient: addPatientList,
        addMultiRows: addMultiRows,
        updateRegNum: updateRegNum
    };
})();