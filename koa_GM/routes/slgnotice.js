/**
 * Created by jiangxu on 2017/8/7.
 * 公告管理 路由
 */
const slgnotice = require('koa-router')();
const Manager = require('../models/manager');
const Slgnotice = require('../models/slgnotice');

slgnotice.prefix('/slgnotice');

slgnotice.get('/list', checkNotLogin);
slgnotice.get('/list', async (ctx, next) => {
    await ctx.render('./slgnotice/list', {
        title: '公告管理',
        loginUser: ctx.session.user,

        playerManage: ctx.state.playerManage,
        gameManage: ctx.state.gameManage,
        playerLog: ctx.state.playerLog,
        serverManage: ctx.state.serverManage,
        userManage: ctx.state.userManage
    });
    return next();
});

// 发送公告 请求
slgnotice.post('/list', checkNotLogin);
slgnotice.post('/list', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    // console.log(postData);
    let writeResult = await Slgnotice.writeNotice(postData);
    if (writeResult === 1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("发送成功！"); window.location.href = "/slgnotice/list"; </script>'
    }
});

// 查询公告 请求
slgnotice.post('/query', checkNotLogin);
slgnotice.post('/query', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    // console.log(postData);
    let queryResult = await Slgnotice.queryNotice(postData.noticeType);
    if (queryResult.queryResult === 1) {
        ctx.body = queryResult.resultInfo;
    }
});

// 删除公告 请求
slgnotice.get('/delete', checkNotLogin);
slgnotice.get('/delete', async (ctx, next) => {
   // console.log(ctx.querystring);
    let deleteResult = await Slgnotice.deleteNotice(ctx.querystring);
    if (deleteResult === 1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("删除成功！"); window.location.href = "/slgnotice/list"; </script>';
    }
});

module.exports = slgnotice;


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