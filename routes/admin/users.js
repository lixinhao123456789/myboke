var express = require('express');
var router = express.Router();
var db = require("../../models/db")
var ObjectID = require('mongodb').ObjectID;

router.post('/login', function(req, res, next) {
    //获取数据
    let u = req.body.username
    let p = req.body.password
    db.login(function(a){
        var b = a.some(item=>{
            if(item.username == u && item.password == p){
                return true
            }
        })
        if(b){
            req.session.islogin = true;
            console.log("......")
            res.render("admin/admin")
        }else{
            res.redirect("/admin/users/login")
        }
    })


});
//管理员登录页面
router.get('/login', function(req, res, next) {
    res.render('admin/login');
});

router.get('/logout', function(req, res, next) {
    req.session.islogin = null;
    res.redirect("/admin/users/login")
});












module.exports = router;
