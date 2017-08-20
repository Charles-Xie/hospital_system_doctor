var express = require('express');
var router = express.Router();

// get doctor page
router.get('/', function(req, res, next) {
    var options = {
        root: __dirname + "/../views/"
    };

    console.log("get doctor page");
    res.sendFile('doctor_sys.html', options);
});

module.exports = router;