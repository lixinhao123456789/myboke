var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();
var db = require("../../models/db")

//管理员页面
router.get('/', function(req, res, next) {
  res.render('admin/admin');
});


module.exports = router;
