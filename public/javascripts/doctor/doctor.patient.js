// initialize the patient page
doctor.patient = (function() {
    var $container;
    var $patientPage;   // template

    // init the patient template
    var init = function(container) {
        console.log("doctor.patient init");

        $container = container;
    };

    var addPatientPage = function() {
        console.log("doctor.patient addPatientPage() called");
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

    var makeUnique = function(page, seq) {
        console.log("makeUnique() called");
        page.find('[id]').attr('id', function(index, id) {
            return id + seq;
        });
        page.find("[href$='-page']").attr('href', function(index, href) {
            // console.log(href);
            return href + seq;
        });
        page.find("[data-target$='-modal']").attr('data-target', function(index, target){
            return target + seq;
        })
    };

    var addNewPatient = function() {
        console.log("doctor.patient addNewPatient() called");
        var $lastLink = $container.find('[data-id]').filter('[href!="#"]:last');
        var pageNum = parseInt($lastLink.attr('href').split("-")[1]);
        $lastLink.parent().next('li.nav-item').children().first().attr('href', "#patient-" + pageNum);
        var newPatientPage = $patientPage.clone().attr('id', 'patient-' + pageNum);
        makeUnique(newPatientPage, pageNum);
        $patientPage.parent().append(newPatientPage)
    };

// _________________________________________________ version 2 start
    var showPatientInfo = function(pageInfo, page/* pageInfo JSON obj */) {
        var basicInfo = pageInfo.basicInfo;
        console.log(basicInfo);
        addTableItems(page, 'table.patient-info-table', basicInfo);

        var diseaseDiag = pageInfo.diseaseDiag;
        console.log(diseaseDiag);
        addTableItems(page, 'table.disease-diagnose-table', diseaseDiag, '[data-tag]');

        var treatSche = pageInfo.treatSche;
        console.log(treatSche);
        doctor.shell.addMultiRows(page, 'table.treatment-schedule-table', treatSche, '[data-tag]');

        var recordCover = pageInfo.recordCover;
        console.log(recordCover);
        addTableItems(page, 'table.record-cover-table', recordCover, '[data-tag]');

        var currentCheck = pageInfo.currentCheck;
        console.log(currentCheck);
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
                if(typeof tableInfo[itemName] == 'string') {
                    $tds.eq(count).text(tableInfo[itemName]);
                }
                else if(typeof tableInfo[itemName] == 'undefined') {
                    console.log("Haven't got info item" + tableSelector + " " + itemName);
                }
                else {
                    $tds.eq(count).append(tableInfo[itemName]);
                }
            }
            count += 1;
        }
    };
    
// _________________________________________________ version 2 end

    var getPatientInfo = function(patient_id, page) {
        var data = {doc_id: doctor.getId(), pat_id: patient_id};
        console.log(data.pat_id);
        doctor.con.emit("web-get-patient-info-apply", data, "web-get-patient-info-reply", showPatientInfo, page);
    };

    // add event listener to patient items
    // so that when clicked they get and show info
    var addPatientListener = function() {
        console.log("doctor.patient addPatientListener() called");
        var $patientItem = $('#patient-list-start');

        // add event listener
        $patientItem.parent().on('click', '[data-id]', function() {
            // condition; this page is not shown currently
            // that is, class != "active"
            // console.log(this);
            $this = $(this);
            if($this.data('ver') == undefined) {
                $this.attr('data-ver', '1');
            }
            else return;
            console.log($this);
            var dataId = $this.attr('data-id');
            var $page = $($this.attr('href'));
            console.log("Click link data-id " + dataId);
            // send request and get data
            getPatientInfo(dataId, $page);
        });
    };

    return {
        init: init,
        addPatientPage: addPatientPage,
        addNewPatient: addNewPatient,
        addPatientListener: addPatientListener,
        makePageUnique: makeUnique
    };
})();