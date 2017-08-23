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

// _________________________________________________ version 1 start
    // patient: patient info
    // var showPatientInfo = function(page, patient) {
    //     var $page = page;
    //     var $table, tdsVal;

    //     // basic info table
    //     // var $tds = $page.find('table.patient-info-table').find('td');
    //     // $tds.forEach(function(td, index) {
    //     //     td.text(patient[index]);
    //     // });
    //     var basicInfo;
    //     $table = $page.find('table.patient-info-table');
    //     tdsVal = [basicInfo.name, basicInfo.age, basicInfo.gen, basicInfo.fee, basicInfo.ub, basicInfo.rb];
    //     addTableItems($table, tdsVal);

    //     // disease-diagnose-table
    //     var diseaseDiag;
    //     $table = $page.find('table.disease-diagnose-table');
    //     tdsVal = [diseaseDiag.date, diseaseDiag.doctor, diseaseDiag.history];
    //     addTableItems($table, tdsVal, "[contenteditable='false']");

    //     // treatment-schedule-table
    //     // wait

    //     // record-cover-table
    //     var 
    //     // record-history-table

    //     // check-item-table

    //     // check-option-table

    //     // search-result-table

    //     // chosen-medicine-table
    // };
    
    // // add array items to a table
    // var addTableItems = function(table, tdsVal, condition) {
    //     var $tds = table.find('td');
    //     if(typeof condition == 'string') {
    //         $tds = $tds.filter(condition);
    //     }
    //     var count = 0;
    //     while(count < tdsVal.length && count < $tds.length) {
    //         if(typeof tdsVal[count] == 'string' || typeof tdsVal[count] == 'number') {
    //             $tds.eq(count).text(tdsVal[count]);
    //         }
    //         else {
    //             $tds.eq(count).append(tdsVal[count]);
    //         }
    //     }
    // }; 

// _________________________________________________ version 1 end

// _________________________________________________ version 2 start
    var showPatientInfo = function(page, pageInfo/* page is jQuery obj and pageInfo JSON obj */) {

    };

    var addTableItems = function(page, tableSelector, tableInfo, condition/* tableInfo is JSON obj */) {
        var $table = page.find(tableSelector);
        var $tds = (typeof condition == 'string')? $table.find('td').filter(condition): $table.find('td');
        var count = 0;
        while(count < $tds.length) {
            var itemName = $tds.eq(count).data('tag')
            if(typeof tableInfo(itemName) == 'string') {
                $tds.eq(count).text(tableInfo(itemName));
            }
            else if(typeof tableInfo(itemName) == 'undefined') {
                console.log("Haven't got info item" + tableSelector + " " + itemName);
            }
            else {
                $tds.eq(count).append(tableInfo(itemName));
            }
        }
    };
// _________________________________________________version 2 end

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