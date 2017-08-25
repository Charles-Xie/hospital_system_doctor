var express = require('express');
var router = express.Router();
var io = require('../socket/server');

// get doctor page
router.get('/', function(req, res, next) {
    var options = {
        root: __dirname + "/../views/"
    };

    console.log("get doctor page");
    res.sendFile('doctor_sys.html', options);
});

router.post('/', function(req, res) {
    
});

module.exports = router;