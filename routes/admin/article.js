var express = require('express');
var router = express.Router();
var db_a = require("../../models/db_a")
var db = require("../../models/db")
var ObjectID = require('mongodb').ObjectID;



//后台文章列表
router.get('/', function(req, res, next) {


  db_a.postsQuery(function(arr){
    res.render('admin/article_list',{
      msg:arr
    });
  })


  
});




//增加文章页面
router.get('/add', function(req, res, next) {
  db.catsQuery(function(result){
    // let obj = ObjectId(newsId)
    // console.log(obj);
    res.render('admin/article_add',{
      msg:result
    });
  });
});
//存入一篇文章
router.post('/add', function(req, res, next) {
  console.log(req.body);
  req.body.date = new Date().toLocaleString()
  db_a.articleAdd(req.body,function(result){
    if(result == "1"){
      res.redirect("/admin/posts")
    }else if(result == "-1"){
      res.send("<h3>文章插入失败 <a href='/admin/posts'>查看文章列表</a> </h3>")
    }
  })
});

//用户文章删除
router.get('/delete', function(req, res, next) {
  let i = ObjectID(req.query.id);
  console.log(i);
  db_a.postsDelete(i,function(result){
    if(result){
      res.redirect("/admin/posts")
    }else{
      res.send("<h3>文章删除失败 <a href='/admin/posts'>查看文章列表</a> </h3>")
    }
  })
});






module.exports = router;
