doctor.dynamic = (function() {
    var initRegSelect = function(container) {
        console.log("doctor.dynamic initRegSelect() called");
        var $table = container.find('#reg-patient-table');
        var chooseBtn = $table.find('button.btn-outline-primary');
        var finishBtn = $table.find('button.btn-outline-secondary');
        chooseBtn.click(function() {
            var $td = $(this).parent();
            var id = $td.siblings('[data-tag="id"]').text();
            var name = $td.siblings('[data-tag="name"]').text();
            // add name and id to patient list
            doctor.shell.addPatient([{id: id, name: name}], ':last');
            // remove this row
            $td.parent().remove();
        });
        // console.log(doctor.shell);
        finishBtn.click(function() {
            var $td = $(this).parent();
            // remind info?
            // remove this row
            $td.parent().remove();
        });
    };

    var initRefBtn = function() {

    };

    var init = function(container) {
        $container = container;
        initRegSelect(container);
    };

    return {
        init: init
    };
})();