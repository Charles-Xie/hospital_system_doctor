doctor.patient = (function() {
    var $container;

    // init the patient template
    var init = function(container) {
        $container = container;
        $container.find('a.patient');
        // find all the patient item on the list
    };

    var addPatientListener = function() {

    };

    return {
        init: init
    };
})();