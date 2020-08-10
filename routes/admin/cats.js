var express = require('express');
var router = express.Router();
var db = require("../../models/db")
var ObjectID = require('mongodb').ObjectID;

//后台列表
router.get('/', function(req, res, next) {

  db.catsQuery(function(result){
    // let obj = ObjectId(newsId)
    // console.log(obj);
    res.render('admin/category_list',{
      msg:result
    });
  });
  
});
//用户列表增加
router.get('/add', function(req, res, next) {
  res.render('admin/category_add');
});
router.post("/add",function(req,res){
    //获取数据
    //验证数据
    //掉去models中的方法存数据库
    // console.log(req.body);
    db.catsAdd(req.body,function(result){
      if(result == "1"){
        res.redirect("/admin/cats")
      }else if(result == "-1"){
        res.send("<h3>插入分类失败 <a href='/admin/cats'>查看分类列表</a> </h3>")
      }
    })
})
//用户编辑
router.get('/edit', function(req, res, next) {
  let i = ObjectID(req.query.id);
  let t = req.query.title;
  let s = req.query.sort;
  res.render('admin/category_edit',{
    "id":i,
    "title":t,
    "sort":s
  });
});
router.post('/edit', function(req,res) {
  let i = ObjectID(req.body.id)
  console.log(i);
  
  db.catsUpdata(i,req.body,function(result){
    console.log(result);
    if(result == "1"){
      res.redirect("/admin/cats")
    }else if(result == "-1"){
      res.send("<h3>插入分类失败 <a href='/admin/cats'>查看分类列表</a> </h3>")
    }
  });

});

//用户分类删除
router.get('/delete', function(req, res, next) {
  let i = ObjectID(req.query.id);
  console.log(i);
  db.catsDelete(i,function(result){
    if(result){
      res.redirect("/admin/cats")
    }else{
      res.send("<h3>插入分类失败 <a href='/admin/cats'>查看分类列表</a> </h3>")
    }
  })
});


module.exports = router;
