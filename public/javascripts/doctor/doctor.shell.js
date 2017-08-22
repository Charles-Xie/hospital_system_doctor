doctor.shell = (function() {
    var $container;

    var init = function(container) {
        $container = container;
        console.log("doctor shell init");

        // send request and add register table items
        addPatientList([{name: "李白"}, {name: "杜甫"}, {name: "王维"}]);
    };

    var addRegTable = function(arr) {
        $regTable = $container.find('#reg-patient-table');
        $regTable.find('tbody').find('tr').remove();
        // remove all the rows currently existing on the page
        arr.count = 1;
        arr.forEach(function (patient, index) {
            // var oneRow = [
            //     patient.name,
            //     patient.email,
            //     patient.time,
            // ];
            var oneRow = [arr.count];
            var optChoose = $('<button>')
                .addClass('btn')
                .addClass('btn-outline-primary')
                .addClass('btn-outline-sm')
                .text("选择");
            var optFinish = $('<button>')
                .addClass('btn')
                .addClass('btn-outline-secondary')
                .addClass('btn-sm')
                .text("完成");
            var optNode = $('<div>').append(optChoose).append(optFinish);
            oneRow.concat(patient.id, patient.name, patient.time, optNode);
            // need to add a col 'option', add node directly
            dashboard.addTableRow('#reg-patient-table',line);
        });
    };

    var addPatientList = function(arr) {
        $patientItem = $container.find('#patient-list-start');
        $patientItem.nextAll().remove();
        // remove all the patient currently in this list

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
                            "href": "#"
                        }).text(patient.name)
                    )
            );
        });
    };

    return {
        init: init,
        addRegTable: addRegTable,
        addPatient: addPatientList
    };
})();