const index = require('koa-router')();
const User = require('../models/userLogin');
const Manager = require('../models/manager');


//首页
index.get('/index', checkNotLogin);
index.get('/index', async (ctx, next) => {
  await ctx.render('index', {
    title: '首页',
    playerManage: ctx.state.playerManage,
    gameManage: ctx.state.gameManage,
    playerLog: ctx.state.playerLog,
    serverManage: ctx.state.serverManage,
    userManage: ctx.state.userManage
  });
  return next();
});

// 登录页
index.get('/login', checkLogin);
index.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: '用户登录',
    layout: false   //不加载到 模版 中，单独使用
  });
  return next();
});

//登出
index.get('/logout', checkNotLogin);
index.get('/logout',  (ctx, next) => {
   ctx.session.user = null;
   ctx.redirect('/login');
   next();
});

//登录验证
index.post('/login', checkLogin);
index.post('/login', async (ctx, next) => {
  ctx.body = JSON.stringify(ctx.request.body);
  let postData = JSON.parse(ctx.body);
  // console.log(postData.userName);

  let loginInfo = await User.get(postData.userName, postData.userPassword);
  if (loginInfo === 'accountNotExist') {
/*
* 第1种方式：直接 返回 一段 JS 代码
*/
     ctx.response.type = 'text/html';
     ctx.response.body = "<script> alert('账号不存在！'); window.location.href = '/login'; </script>"

/*
* 第2种方式：后台用 ctx.state， 前台用 locals.xxx 渲染出 相关信息
*/

//设置  登录时， 可能显示的 “正确/错误信息”
//     ctx.state = {error: '账号不存在！'};
//重新 渲染 页面
//     return ctx.render('login', {
//         title: '用户登录',
//         layout: false,
//         error: ctx.state.error
//     });

  } else if (loginInfo === 'accORpassError') {
    ctx.response.type = 'text/html';
    ctx.response.body = "<script> alert('账号或密码错误！'); window.location.href = '/login'; </script>";

    // ctx.state = {error: '账号或密码错误！'};
    //
    // return ctx.render('login', {
    //     title: '用户登录',
    //     layout: false,
    //     error: ctx.state.error
    // })

  } else if (loginInfo === 'loginSuccess') {
    ctx.session.user = postData.userName;
    return ctx.redirect('/index');
  }
  return next();
});

module.exports = index;

// 检查 是否 已登录，如果已登录，则进入index页面，否则控制权转移
function checkLogin(ctx, next) {
    if (ctx.session.user) {
        // ctx.response.type = 'text/html';
        // ctx.response.body = '<script> alert("已登录") </script>';
        return ctx.redirect('/index');
    }
    return next();
}

// 检查 是否 未登录，如果未登录，则进入登录页面，否则控制权转移
async function checkNotLogin(ctx, next) {
    if (!ctx.session.user) {
        // ctx.response.type = 'text/html';
        // ctx.response.body = '<script> alert("未登录") </script>';
        return ctx.redirect('/login');
    } else {
        let loginUser = ctx.session.user;
        let queryPermissionList = await Manager.queryLoginUser(loginUser);
        ctx.state = {
        playerManage: queryPermissionList.queryInfo.playerManage,
        gameManage: queryPermissionList.queryInfo.gameManage,
        playerLog: queryPermissionList.queryInfo.playerLog,
        serverManage: queryPermissionList.queryInfo.serverManage,
        userManage: queryPermissionList.queryInfo.userManage
        };
    }
    return next();
}
