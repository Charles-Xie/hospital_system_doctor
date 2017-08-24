// initialize the patient page
doctor.patient = (function() {
    var $container;
    var $patientPage;   // template

    // init the patient template
    var init = function(container) {
        console.log("doctor.patient init");

        $container = container;
        var $patientItem = $container.find('#patient-list-start');

        var countItemNum = 0;
        $patientPage = $container.find('#patient-');

        // remove existing patient page
        $patientPage.nextAll().remove();

        // function used to make ids in pages not repeated
        

        while($patientItem.next().length != 0) {
            $patientItem = $patientItem.next('li.patient-item');
            countItemNum += 1;
            $patientItem.children('a.nav-link').first().attr('href', '#patient-' + countItemNum);
            // make the patient LIST item point to that patient page

            //initialize the patient PAGE
            var newPatientPage = $patientPage.clone().attr('id', 'patient-' + countItemNum);
            makeUnique(newPatientPage, countItemNum);
            $patientPage.parent().append(newPatientPage);
        }
        // $('#patient1').find('[id]').attr('id', function(index, id) {
        //     return id + 1;
        // });
    };

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

    var addNewPatient = function() {
        // console.log("doctor.patient addNewPatient()");
        var $lastLink = $container.find('[data-id]').filter('[href!="#"]:last');
        var pageNum = parseInt($lastLink.attr('href').split("-")[1]);
        $lastLink.parent().next('li.nav-item').children().first().attr('href', "#patient-" + pageNum);
        var newPatientPage = $patientPage.clone().attr('id', 'patient-' + pageNum);
        makeUnique(newPatientPage, pageNum);
        $patientPage.parent().append(newPatientPage)
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
    // count += 1;
    // }; 

// _________________________________________________ version 1 end

// _________________________________________________ version 2 start
    var showPatientInfo = function(page, pageInfo/* page is jQuery obj and pageInfo JSON obj */) {
        var basicInfo = pageInfo.basicInfo;
        addTableItems(page, 'table.patient-info-table', basicInfo);

        var diseaseDiag = pageInfo.diseaseDiag;
        addTableItems(page, 'table.disease-diagnose-table', diseaseDiag, '[contenteditable="false"]');

        var treatSche = pageInfo.treatSche;
        doctor.shell.addMultiRows(page, 'table.treatment-schedule-table', treatSche, '[data-tag]');

        var recordCover = pageInfo.recordCover;
        addTableItems(page, 'table.record-cover-table', recordCover, '[data-tag]');

        var currentCheck = pageInfo.currentCheck;
        doctor.shell.addMultiRows(page, 'table.current-check-table', currentCheck, '[data-tag]');
    };
 
    // add info to items in table
    var addTableItems = function(page, tableSelector, tableInfo, condition/* tableInfo is JSON obj */) {
        if(typeof tableInfo)
        var $table = page.find(tableSelector);
        var $tds = (typeof condition == 'string')? $table.find('td').filter(condition): $table.find('td');
        var count = 0;
        while(count < $tds.length) {
            var itemName = $tds.eq(count).data('tag');
            // if no data-tag attribute, typeof itemName == undefined
            if(typeof itemName != 'undefined') {
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
            count += 1;
        }
    };

    
// _________________________________________________ version 2 end

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
        init: init,
        addPatientPage: addNewPatient,
        makePageUnique: makeUnique
    };
})();