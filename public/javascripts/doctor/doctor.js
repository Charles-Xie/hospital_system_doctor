var doctor = (function() {
    console.log("doctor page ready");
    var $container;
    var init = function(container) {
        $container = container;
        dashboard.init($container);
        doctor.shell.init($container);
        doctor.patient.init($container);
    };

    return {
        init: init
    };
})();