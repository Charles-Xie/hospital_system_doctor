// initialize the patient page
doctor.patient = (function() {
    var $container;
    var $patientPage;   // template

    // init the patient template
    var init = function(container) {
        console.log("doctor.patient init");

        $container = container;
        initListener1();
    };

    var initListener1 = function() {
        var pageId = '#patient-';
        addDiseaDiagSave(pageId);
        addTreatScheDels(pageId);
        addCheckItemSend(pageId);
        addCheckItemToggle(pageId);
        addMedicineDels(pageId);
        addMedicineBillShow(pageId);
        addCheckReportShow(pageId);
        // addBasicInfoFinish(pageId);
    };

    var addPatientPage = function() {
        console.log("doctor.patient addPatientPage() called");
        var $patientItem = $container.find('#patient-list-start');

        var countItemNum = 0;
        $patientPage = $container.find('#patient-');

        // remove existing patient page
        $patientPage.nextAll().remove();

        while($patientItem.next().length != 0) {
            $patientItem = $patientItem.next('li.patient-item');
            countItemNum += 1;
            $patientItem.children('a.nav-link').first().attr('href', '#patient-' + countItemNum);
            // make the patient LIST item point to that patient page

            //initialize the patient PAGE
            var newPatientPage = $patientPage.clone(true).attr('id', 'patient-' + countItemNum);
            $patientPage.parent().append(newPatientPage);
            newPatientPage.attr('data-patient', $patientItem.children('a.nav-link').first().data('id'));
            initListener2("#patient-" + countItemNum);
        }
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
            console.log("data-target: " + target + seq);
            return target + seq;
        })
    };

    var addNewPatient = function() {
        console.log("doctor.patient addNewPatient() called");
        var $lastLink = $container.find('[data-id]').filter('[href!="#"]:last');
        var pageNum = parseInt($lastLink.attr('href').split("-")[1]);
        $lastLink = $lastLink.parent().next('li.nav-item').children().first();
        $lastLink.attr('href', "#patient-" + pageNum);
        var newPatientPage = $patientPage.clone(true).attr('id', 'patient-' + pageNum);
        $patientPage.parent().append(newPatientPage);
        newPatientPage.attr('data-patient', $lastLink.data('patient'));
        initListener2("#patient-" + countItemNum);
    };

// _________________________________________________ version 2 start
    var showPatientInfo = function(pageInfo, page/* pageInfo JSON obj */) {
        var basicInfo = pageInfo.basicInfo;screen
        
        // console.log(basicInfo);
        doctor.util.addTableItems(
            page, 
            'table.patient-info-table', 
            basicInfo);

        var diseaseDiag = pageInfo.diseaseDiag;
        // console.log(diseaseDiag);
        doctor.util.addTableItems(
            page, 
            'table.disease-diagnose-table', 
            diseaseDiag, 
            '[data-tag]');

        var treatSche = pageInfo.treatSche;
        // console.log(treatSche);
        doctor.util.addMultiRows(
            page, 
            'table.treatment-schedule-table', 
            treatSche, 
            '[data-tag]', 
            true);

        var recordCover = pageInfo.recordCover;
        // console.log(recordCover);
        doctor.util.addTableItems(
            page, 
            'table.record-cover-table', 
            recordCover, 
            '[data-tag]');

        var currentCheck = pageInfo.currentCheck;
        // console.log(currentCheck);
        doctor.util.addMultiRows(
            page, 
            'table.current-check-table', 
            currentCheck, 
            '[data-tag]', 
            true);

        var recordHistory = pageInfo.recordHistory;
        doctor.utl.addMultiRows(
            page, 
            '', 
            recordHistory, 
            '', 
            '[data-tag]');

        makeUnique(page, page.attr('id').split('-')[1]);
    };
        
    
    
// _________________________________________________ version 2 end

    var getPatientInfo = function(patient_id, page) {
        var data = {doc_id: doctor.getId(), pat_id: patient_id};
        console.log(data.pat_id);
        doctor.con.emit(
            "web-get-patient-info-apply", 
            data, 
            "web-get-patient-info-reply", 
            showPatientInfo, 
            page);
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

    var addDiseaDiagSave = function(pageId) {
        // console.log("doctor.patient addDiseaDiagSave() called, pageId: " + pageId);
        var $button = $(pageId).find('button.disease-diagnose-save');
        $button.click(function() {
            // console.log("disease diagnose save button clicked");
            var patientId = $(pageId).data('patient');
            var $table = $(pageId).find('table.disease-diagnose-table');
            var $tds = $table.find('td[contenteditable="true"]');
            var count = 0;
            var data = {doc_id: doctor.getId(), pat_id: patientId};
            while(count < $tds.length){
                data[$tds.eq(count).data('tag')] = $tds.eq(count).text();
                count += 1;
            }
            doctor.con.emit(
                "web-change-disease-diagnosis-apply", 
                data, 
                "web-change-disease-diagnosis-reply");
        });
    };

    var addTreatScheAdd = function(pageId) {
        console.log("doctor.patient addTreatSche called");
        var $button = $(pageId).find('button.treatment-schedule-add');
        $button.click(function() {
            console.log("add treat sche button clicked");
            var $table = $(pageId).find('table.treatment-schedule-table');
            var rowTemp = $('#patient-').find('table.treatment-schedule-table').children('tbody').children().eq(0).clone(true);
            rowTemp.children('td[data-tag="stage"]').text($table.find('tr').length);
            // addDeleteListener(rowTemp.find('button.treatment-schedule-del'));
            // get the first row of the template table
            $table.children('tbody').append(rowTemp);
        });
    };

    var addDels = function(pageId, buttonSelector) {
        var $buttons = $(pageId).find(buttonSelector);
        console.log("addDels() called,", $buttons.length, "buttons");
        for(var i = 0; i < $buttons.length; i++) {
            addDeleteListener($buttons.eq(i));
        }
    }

    var addTreatScheDels = function(pageId) {
        // console.log("addTreatScheDels() called");
        addDels(pageId, 'button.treatment-schedule-del')
    };

    var addMedicineDels = function(pageId) {
        // console.log("addMedicineDels() called");
        addDels(pageId, 'button.chosen-medicine-del');
    };

    var addDeleteListener = function(button) {
        button.click(function() {
            var thisRow = $(this).parent().parent();
            thisRow.remove();
        });
    }

    var addTreatScheSave = function(pageId) {
        var $button = $(pageId).find('button.treatment-schedule-save');
        $button.click(function() {
            console.log("treatment schedule save button clicked");
            var patientId = $(pageId).data('patient');
            var $table = $(pageId).find('table.treatment-schedule-table');
            var data = {doc_id: doctor.getId(), pat_id: patientId};
            var $trs = $table.children('tbody').children();
            var treatData = [];
            for(var i = 0; i < $trs.length; i++){
                var treatItem = {};
                var $tds = $trs.eq(i).children('[contenteditable="true"]');
                for(var j = 0; j < $tds.length; j++) {
                    var itemName = $tds.eq(j).data('tag');
                    treatItem[itemName] = $tds.eq(j).text();
                }
                treatData.push(treatItem);
            }
            data.treat = treatData;
            doctor.con.emit("web-change-treatment-apply", data, "web-change-treatment-reply");
        });
    };

    var addMedicineSearch = function(pageId) {
        var $button = $(pageId).find('span.search-medicine-mark');
        $button.click(function() {
            console.log("search medicine button clicked");
            // show hidden content 
            // $(pageId).find('div.medicine-content').show();
            // get input
            data = {name: $(this).prev().val()};
            // send request and get info
            var showMedicineSearchResult = function(info) {
                doctor.util.addMultiRows($(pageId), 'table.search-result-table', info, '[data-tag]');
                addMedicineChoose(pageId);
            };
            doctor.con.emit(
                "web-get-drug-info-apply", 
                data, 
                "web-get-drug-info-reply", 
                showMedicineSearchResult);
        });
        $button.prev().keydown(function() {
            if(event.keyCode == "13") {
                console.log("enter key pressed");
                $button.click();
            }
        });
    };

    var addMedicineChoose = function(pageId) {
        var $buttons = $(pageId).find('button.search-result-choose');
        var rowTemp = $('#patient-').find('table.chosen-medicine-table').children('tbody').children().eq(0);
        var $table = $(pageId).find('table.chosen-medicine-table');
        for(var i = 0; i < $buttons.length; i++) {
            addChooseListener($buttons.eq(i), $table, rowTemp);
        }
    };

    var addChooseListener = function(button, table, row) {
        data = {table: table, row: row.clone(true)};
        button.click(data, function(event) {
            console.log("doctor.patient medicine choose button clicked");
            // get info
            $tds1 = $(this).parent().siblings('[data-tag]');
            $tds2 = event.data.row.children('td[data-tag]');
            for(var i = 0; i < $tds2.length; i++){
                itemName = $tds2.eq(i).data('tag');
                td = $tds1.filter('[data-tag="' + itemName + '"]');
                if(td.length == 1) {
                    $tds2.eq(i).text(td.text());
                }
            }
            event.data.table.append(event.data.row);
        });
    };

    var removeTemplates = function(pageId) {
        var tableNames = [
            '.treatment-schedule-table', 
            '.current-check-table', 
            '.search-result-table', 
            '.chosen-medicine-table'];
        for(var i = 0; i < tableNames.length; i++) {
            $(pageId).find(tableNames[i]).children('tbody').children('tr').eq(0).remove();
        }
    };

    var addMedicineSave = function(pageId) {
        var $button = $(pageId).find('button.chosen-medicine-save');
        $button.click(function() {
            console.log("chosen medicine save button clicked");
            var patientId = $(pageId).data('patient');
            var $table = $(pageId).find('table.chosen-medicine-table');
            var data = {doc_id: doctor.getId(), pat_id: patientId};
            var $trs = $table.children('tbody').children();
            var chosenData = [];
            for(var i = 0; i < $trs.length; i++){
                var chosenItem = {};
                var $tds = $trs.eq(i).children('[data-tag]');
                for(var j = 0; j < $tds.length; j++) {
                    var itemName = $tds.eq(j).data('tag');
                    chosenItem[itemName] = $tds.eq(j).text();
                }
                chosenData.push(chosenItem);
            }
            data.chosen = chosenData;
            var alertMedicineSaveResult = function(data, page) {
                doctor.util.alertResult(data, page, "药品单成功发送", "药品单已发送，不能重复操作");
            };
            doctor.con.emit(
                "web-add-prescribe-apply", 
                data, 
                "web-add-prescribe-reply", 
                alertMedicineSaveResult, 
                $(pageId));
        });
    };

    
    var addMedicineBillShow = function(pageId) {
        var $button = $(pageId).find('button.medicine-bill-show');
        $button.click(function() {
            // console.log("medicine list show button clicked");
            var page = $(this).parents('[data-patient]');
            var patientId = page.data('patient');
            var showMedicineBillInfo = function(data, page) {
                data = data.result;
                if(data == undefined) {
                    return;
                }
                doctor.util.addMultiRows(
                    page, 
                    'table.medicine-bill-table', 
                    data, 
                    '[data-tag]');    
                var totalPrice = 0;
                for(var i = 0; i < data.length; i++) {
                    totalPrice += parseInt(data[i].total);
                }
                page.find('span.total-price').text(totalPrice);            
            }
            doctor.con.emit(
                'web-get-prescribe-apply', 
                {doc_id: doctor.getId(), pat_id: patientId}, 
                'web-get-prescribe-reply', 
                showMedicineBillInfo, 
                page);
            // count the total price
        });
    };

    var addCheckItemToggle = function(pageId) {
        var $buttons = $(pageId).find('button.check-item-choose');
        $buttons.click(function() {
            var $this = $(this);
            if($this.hasClass('active')) {
                $this.removeClass('active');
            }
            else {
                $this.addClass('active');
            }
        });
    };

    var addCheckItemSend = function(pageId) {
        var $button = $(pageId).find('button.check-item-send');
        $button.click(function(){
            var page = $(this).parents('[data-patient]');
            var patientId = page.data('patient').toString();

            var showCurrentCheck = function(data, page) {
                console.log("showCurrentCheck() called");
                doctor.util.alertResult(data, page, "检查项目成功发送", "检查项目已经发送，不能重复操作");
                data = data.result;
                if(data instanceof Array) {
                    doctor.util.addMultiRows(
                        page, 
                        'table.current-check-table', 
                        data, 
                        '[data-tag]', 
                        true);
                }
            };
            var data = {doc_id: doctor.getId(), pat_id: patientId};
            data.array = [];
            var chosenButtons = page.find('button.check-item-choose').filter('.active');
            for(var i = 0; i < chosenButtons.length; i++) {
                data.array.push({name: chosenButtons.eq(i).text()});
            }
            doctor.con.emit(
                'web-add-exam-item-apply', 
                data, 
                'web-add-exam-item-reply', 
                showCurrentCheck, 
                page);            
        });
    };

    var addCheckReportShow = function(pageId) {
        var $button = $(pageId).find('button.check-report-show');
        var showCheckReport = function(data, page) {
            data = typeof data.result == "string"? data.result: "结果正常";
            page.find('div.check-report-modal').find('.modal-body').append(data);
        };
        $button.click(function() {
            var $this = $(this);
            var page = $this.parents('[data-patient]');
            var patientId = page.data('patient').toString();
            var itemId = $this.parent().siblings('[data-tag="id"]').text();
            doctor.con.emit(
                'web-get-presentation-apply', 
                {doc_id: doctor.getId(), pat_id: patientId, item_id: itemId}, 
                'web-get-presentation-reply',
                showCheckReport,
                page);
        });
    };

    // var addBasicInfoFinish = function(pageId) {
    //     var patient_id = $(pageId).data('patient');
    // }

    var initListener2 = function(pageId) {
        removeTemplates(pageId);
        // addDiseaDiagSave(pageId);
        addTreatScheAdd(pageId);
        // addTreatScheDels(pageId);
        addTreatScheSave(pageId);
        addMedicineSearch(pageId);
        addMedicineSave(pageId);
        // addMedicineDels(pageId);
        // addMedicineBillShow(pageId);
    };

    return {
        init: init,
        addPatientPage: addPatientPage,
        addNewPatient: addNewPatient,
        addPatientListener: addPatientListener,
    };
})();