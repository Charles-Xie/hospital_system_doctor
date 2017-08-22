doctor.patient = (function() {
    var $container;

    // init the patient template
    var init = function(container) {
        $container = container;
        $patientItem = $container.find('#patient-list-start');

        var countItemNum = 0;
        var $patientPage = $container.find('#patient1');
        while($patientItem.next().length != 0) {
            $patientItem = $patientItem.next('li.patient-item');
            countItemNum += 1;
            $patientItem.children('a.nav-link').first().attr('href', '#patient' + countItemNum);
            // make the patient list item point to that patient page

            //initialize the patient page
            if(countItemNum != 1) {
                $patientPage.parent().append(
                    $patientPage.clone().attr('id', 'patient' + countItemNum)
                );
            }
        }
    };

    var addPatientListener = function() {

    };

    return {
        init: init
    };
})();