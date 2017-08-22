doctor.patient = (function() {
    var $container;

    // init the patient template
    var init = function(container) {
        console.log("doctor.patient init");
        $container = container;
        $patientItem = $container.find('#patient-list-start');

        var countItemNum = 0;
        var $patientPage = $container.find('#patient1');

        // remove existing patient page
        $patientPage.nextAll().remove();

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

    var sendPatientInfoRequest = function() {

    };
    
    // add event listener to patient items
    // so that when clicked they get and show info
    var addPatientListener = function() {

    };

    return {
        init: init
    };
})();