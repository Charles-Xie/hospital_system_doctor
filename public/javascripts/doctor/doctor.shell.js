doctor.shell = (function() {
    var $container;

    var init = function(container) {
        $container = container;
        console.log("doctor shell init");

        // send request and add register table items
        // addPatientList([{name: "1. 李白"}, {name: "2. 杜甫"}, {name: "3. 王维"}]);
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
            oneRow.concat(patient.name, patient.email, patient.time);
            // need to add a col 'option'
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