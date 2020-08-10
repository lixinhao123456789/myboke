var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
var bodyParser = require('body-parser')





//前台的二级路由
var indexRouter = require('./routes/home/index');
var posts = require('./routes/home/posts');
//后台的二级路由
var cats = require('./routes/admin/cats');
var admin = require('./routes/admin/admin');
var article = require('./routes/admin/article');
var users = require('./routes/admin/users');

var app = express();

//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//配置session
app.use(session({
  secret: 'wangcai',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//告诉express使用的模板引擎是html 但是本质还是ejs引擎
app.engine("html",require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));

//前台的一级路由主页面
app.use('/', indexRouter);
//前台登录页面

//前台文章列表
app.use('/posts',posts);

//后台分类页面的一级路由
//后台主页面 
app.use('/admin/index', checklogin);
app.use('/admin/index', admin);

//后台分类 增删改查页面
app.use('/admin/cats', checklogin);
app.use('/admin/cats', cats);

//后台文章管理增删改查页面
app.use('/admin/posts', checklogin);
app.use('/admin/posts', article);

app.use('/admin/users', users);

function checklogin(req, res, next){
  if(!req.session.islogin){
    res.redirect("/admin/users/login")
  }
  next()
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
