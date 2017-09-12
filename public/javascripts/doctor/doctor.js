var doctor = (function() {
    console.log("doctor page ready");
    var doctorId;
    var $container;
    var init = function(container) {
        $container = container;
        setId();
        doctor.shell.init($container);
        doctor.patient.init($container);
    };

    var setId = function(id) {
        if(id == undefined) {
            doctorId = doctor.cookie.getCookie("doctorid");
        }
        else {
            doctorId = id;
        }
        if(typeof doctorId != 'string') {
            doctorId = doctorId.toString();
        }
    };

    var getId = function() {
        return doctorId.toString();
    };
    
    return {
        init: init,
        getId: getId
    };
})();