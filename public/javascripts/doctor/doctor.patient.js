doctor.patient = (function() {
    var $container;

    // init the patient template
    var init = function(container) {
        console.log("doctor.patient init");

        $container = container;
        var $patientItem = $container.find('#patient-list-start');

        var countItemNum = 0;
        var $patientPage = $container.find('#patient1');

        // remove existing patient page
        $patientPage.nextAll().remove();

        // function used to make ids in pages not repeated
        var makeUnique = function(node, seq) {
            console.log("makeUnique() called");
            node.find('[id]').attr('id', function(index, id) {
                return id + seq;
            });
            node.find("[href$='-page']").attr('href', function(index, href) {
                // console.log(href);
                return href + seq;
            });
        };

        while($patientItem.next().length != 0) {
            $patientItem = $patientItem.next('li.patient-item');
            countItemNum += 1;
            $patientItem.children('a.nav-link').first().attr('href', '#patient' + countItemNum);
            // make the patient LIST item point to that patient page

            //initialize the patient PAGE
            if(countItemNum != 1) {
                var newPatientPage = $patientPage.clone().attr('id', 'patient' + countItemNum);
                makeUnique(newPatientPage, countItemNum);
                // newPatientPage.find('[id]').attr('id', function(index, id) {
                //     return id + countItemNum;
                //     // need to make every id unique
                // });
                // newPatientPage.find("[id$='-page']").attr('href', function() {
                //     return href + countItemNum;
                // });
                $patientPage.parent().append(newPatientPage);
            }
        }

        makeUnique($('#patient1'), 1);
        // $('#patient1').find('[id]').attr('id', function(index, id) {
        //     return id + 1;
        // });

        
    };

    var sendPatientInfoRequest = function(patient_id) {

    };

    // patient: patient info
    var showPatientInfo = function(page, patient) {
        var $page = page;

        // basic info table
        var $tds = $page.find('table.patient-info-table').find('td');
        $tds.forEach(function(td, index) {
            td.text(patient[index]);
        });

        // disease-diagnose-table
        
        // treatment-schedule-table

        // record-cover-table

        // record-history-table

        // check-item-table

        // check-option-table

        // search-result-table

        // chosen-medicine-table
    };
    
    // add array items to a table
    var addTableItems = function(table, tdsVal) {
        var $tds = table.find('td');

    };

    // add event listener to patient items
    // so that when clicked they get and show info
    var addPatientListener = function() {
        var $patientItem = $('#patient-list-start');

        // add event listener
        $patientItem.parent().on('click', '[data-id]', function() {
            // condition; this page is not shown currently
            // that is, class != "active"
            var dataId = this.attr('data-id');
            var $page = $(this.attr('href'));
            console.log("Click link data-id " + dataId);
            // send request and get data
            sendPatientInfoRequest(dataId);

            showPatientInfo(page, patientInfo);
        });
    };

    return {
        init: init
    };
})();