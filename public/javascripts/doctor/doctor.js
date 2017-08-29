var doctor = (function() {
    console.log("doctor page ready");
    var doctorId;
    var $container;
    var init = function(container) {
        $container = container;
        setId(3);
        // dashboard.init($container);
        doctor.shell.init($container);
        doctor.patient.init($container);
    };

    var setId = function(id) {
        // test only
        doctorId = id;
        doctorId = doctorId.toString();
    };

    var getId = function() {
        return doctorId;
    };
    
    return {
        init: init,
        getId: getId
    };
})();