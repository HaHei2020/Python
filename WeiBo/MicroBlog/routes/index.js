var express = require('express');
var router = express.Router();
// var app = require('../app');
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: '首页'
    });
});

router.get('/reg', checkNotLogin);  //注册前，要确保用户是 未登录状态，属于：页面访问控制权限
router.get('/reg', function(req, res) {
  res.render('reg', {
    title: '用户注册'
    });
});

router.get('/login', checkNotLogin);  //登录前，要确保用户是 未登录状态，属于：页面访问控制权限
router.get('/login', function (req, res) {
    res.render('login', {
      title: '用户登入',
    });
});

router.get('/logout', checkLogin);  //登出前，要确保用户是 登录状态，属于：页面访问控制权限
router.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', '登出成功！');
    return res.redirect('/');
});

router.get('/users', function(req, res) {
  res.render('users', {
    title: '用户注册222'
    });
});


/* POST home page. */
router.post('/reg', checkNotLogin);  //注册前，要确保用户是 未登录状态，属于：页面访问控制权限
router.post('/reg', function (req, res) {
  //检验用户2次输入的口令是否一致
   if(req.body['password-repeat'] != req.body['password']) {
     req.flash('error', "两次输入的口令不一致");
     return res.redirect('/reg');
   }

   //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: password,
    });

    //检查用户名是否已经存在
    User.get(newUser.name, function (err, user) {
        if(user) {
          err = '用户名已存在！';
        }
        if(err) {
          req.flash('error', err);
          return res.redirect('/reg');
        }

        //如果不存在，则新增
        newUser.save(function (err) {
            if(err) {
              req.flash('error', err);   //flash: 用来显示“一次性通知”
              return res.redirect('/reg');  //重定向
            }
            req.session.user = newUser;  //服务器记录session，用来验证
            req.flash('success', '注册成功');
            res.redirect('/');
        });
    });
});

router.post('/login', checkNotLogin);  //登录前，要确保用户是 未登录状态，属于：页面访问控制权限
router.post('/login', function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function (err, user) {
        if(!user) {
          req.flash('error', '用户不存在！');
          return res.redirect('/login');
        }
        if(user.password != password) {
          req.flash('error', '用户口令错误！');
          return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登入成功！');
        return res.redirect('/');
    });
});


module.exports = router;

//登录状态 检查 （主要检查：服务器存储的session 和 浏览器存储的session 是否一致）
function checkLogin(req, res, next) {
    if(!req.session.user) {
      req.flash('error', '未登录');
      return res.redirect('/login');
    }
    next();
}

//未登录状态 检查
function checkNotLogin(req, res, next) {
    if(req.session.user) {
      req.flash('success', '已登录');
      return res.redirect('/');
    }
    next();
}
