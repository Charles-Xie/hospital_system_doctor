var express = require('express');
var router = express.Router();
var io = require('../socket/server');

var renderFront = function (res) {
    res.render('front');
};


router.get('/',function (req,res) {
    renderFront(res);
});

router.post('/',function (req,res) {
    if(req.body.chat){
        var chatContent = req.body.chat;
        io.emitToSql('web-send-chat-apply',chatContent,'wen-send-chat-reply',function (data) {
            console.log(data);
        });
    }
    else{
        var email = req.body.email;
        var dept = req.body.dept;
        io.emitToSql('web-add-reg-apply',{
            email : email,
            dept : dept
        },'web-add-reg-reply',function (data) {
            console.log(data);
        })
    }
    renderFront(res);
});

module.exports = router;