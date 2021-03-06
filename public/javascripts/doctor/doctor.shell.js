doctor.shell = (function() {
    var $container;

    var init = function(container) {
        $container = container;
        console.log("doctor shell init");

        doctor.con.emit("web-get-regis-patient-apply", {id: doctor.getId()}, "web-get-regis-patient-reply", addRegTable);
        doctor.con.emit("web-get-medical-patient-apply", {id: doctor.getId()}, "web-get-medical-patient-reply", addPatientList);

        $container.find('#reg-patient-table').children('tbody').children('tr').eq(0).hide();
        addRefBtn(container);
        addLogoutBtn(container);
    };

// ______________________________________ version 2 start
    var addRegTable = function(data) {
        console.log("addRegTable() called");
        var tableInfo = (data instanceof Array? data: data.result);
        console.log("tableInfo: " + tableInfo);
        doctor.util.addMultiRows($container, '#reg-patient-table', tableInfo, '[data-tag]');
        addRegBtns($container);
        updateRegNum();
    };

    var updateRegNum = function() {
        var regNum = $('#reg-patient-table').find('tr:visible').length - 1;
        console.log("doctor.shell updateRegNum() called, reg num: " + regNum);
        var regNumLabel = $('#patient-list-start').prev('li.nav-item').find('span.badge');
        if(regNum != 0) {
            $('#reg-patient-table').prev('div').children('p').text("共有 " + regNum + " 位病人");
            regNumLabel.text(regNum);
        }
        else {
            regNumLabel.text("");
            console.log("No reg patient");
        }
    };
// ______________________________________ version 2 end

    // update when items added
    var updatePatientNum = function() {
        var item = $('#patient-list-start');
        var patientNum = item.nextAll('li.nav-item').length;
        var patientNumLabel = item.find('span.badge');
        if(patientNum == 0) {
            patientNumLabel.text("");
        }
        else {
            patientNumLabel.text(patientNum);
        }
    }
    
    var addPatientList = function(data, itemSelector) {
        // console.log($container);
        console.log("addPatientList() called");        
        var $patientItem = (typeof itemSelector == 'undefined'? 
            $container.find('#patient-list-start'): 
            $container.find('#patient-list-start').parent().children('li.nav-item').filter(itemSelector));
        $patientItem.nextAll().remove();
        // remove all the patient currently in this list

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
        updatePatientNum();
        doctor.patient.addPatientPage();
        doctor.patient.addPatientListener();
    };

    var sendTreatNewInfo = function(patientId) {
        doctor.con.emit("web-change-regis-patient-apply", {doc_id: doctor.getId(), pat_id: patientId}, "web-change-regis-patient-reply");
    };

    var addRegBtns = function(container) {
        console.log("doctor.shell addRegBtns() called");
        var $table = container.find('#reg-patient-table');
        var chooseBtn = $table.find('button.btn-outline-primary');
        var finishBtn = $table.find('button.btn-outline-secondary');

        chooseBtn.click(function() {
            var $td = $(this).parent();
            var id = $td.siblings('[data-tag="id"]').text();
            var name = $td.siblings('[data-tag="name"]').text();
            // add name and id to patient list
            addPatientList([{id: id, name: name}], ':last');
            doctor.patient.addNewPatient();
            // remove this row
            $td.parent().remove();
            updatePatientNum();
            sendTreatNewInfo(id);
        });
        // console.log(doctor.shell);

        finishBtn.click(function() {
            var $td = $(this).parent();
            // remind info?
            // remove this row
            $td.parent().remove();
        });
    };

    var addRefBtn = function(container) {
        var refreshBtn = container.find('button#reg-patient-ref');        
        refreshBtn.click(function() {
            doctor.con.emit("web-get-regis-patient-apply", {id: doctor.getId()}, "web-get-regis-patient-reply", addRegTable);
        });
    };

    // add logout function
    var addLogoutBtn = function(container) {
        $('#logout-btn').click(function() {
            console.log("call dashboardShell.logout()");
            console.log("patient logout now");
            dashboardShell.logout();
        });
    };

    return {
        init: init
    };
})();