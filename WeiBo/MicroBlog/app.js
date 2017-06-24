var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var flash = require('connect-flash');

var routes = require('./routes/index');
// var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//添加ejs模块的partials方法，之后才可以添加layout.ejs和index.ejs文件
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        url: settings.url,  //必须指向  调用的 数据库路径
        // url: 'mongodb://localhost/blog',
    })
}));

app.use(flash());  //调用 该模块

app.use(function (req, res, next) {
    console.log('app.usr local');
    res.locals.user = req.session.user;
    res.locals.post = req.session.post;
    var error = req.flash('error');
    res.locals.error = error.length ? error : null;

    var success = req.flash('success');
    res.locals.success = success.length ? success : null;

    next();
});

app.use('/', routes);
// app.use(express.Router(routes));  不能用

//  app.use('/', routes);
// app.use('/users', users);

//设置监听端口为：3000
app.listen(3000,function() {
  console.log("服务器起来了！");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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



//添加路由
// app.get('/', routes.index);
// app.get('/u/:user', routes.user);
// app.post('/post', routes.post);
// app.get('/reg', routes.reg);
// app.post('/reg', routes.doReg);
// app.get('/login', routes.login);
// app.post('/login', routes.doLogin);
// app.get('/logout', routes.logout);
