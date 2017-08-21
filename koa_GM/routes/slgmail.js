/**
 * Created by jiangxu on 2017/8/9.
 * 邮件管理 路由
 */
const slgmail = require('koa-router')();
const Manager = require('../models/manager');
const Slgmail = require('../models/slgmail');


slgmail.prefix('/slgmail');

slgmail.get('/mail', checkNotLogin);
slgmail.get('/mail', async (ctx, next) => {
    await ctx.render('./slgmail/mail', {
        title: '邮件管理',
        loginUser: ctx.session.user,

        playerManage: ctx.state.playerManage,
        gameManage: ctx.state.gameManage,
        playerLog: ctx.state.playerLog,
        serverManage: ctx.state.serverManage,
        userManage: ctx.state.userManage
    });
    return next();
});

// 发送邮件 请求
slgmail.post('/sendmail', checkNotLogin);
slgmail.post('/sendmail', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    // console.log(postData);
    let sendResult = await Slgmail.sendMail(postData);
    if (sendResult === 1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("发送邮件成功！"); window.location.href = "/slgmail/mail"; </script>';
    }
});

// 查询邮件 请求
slgmail.post('/querymail', checkNotLogin);
slgmail.post('/querymail', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    console.log(postData);
    let queryResult = await Slgmail.queryMail(postData.mailType);
    if (queryResult.queryResult === 1) {
        ctx.body = queryResult.mailInfo;
    }
});


module.exports = slgmail;

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
