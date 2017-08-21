/**
 * Created by jiangxu on 2017/8/10.
 * 礼包管理 路由
 */
const slggift = require('koa-router')();
const Manager = require('../models/manager');
const Slggift = require('../models/slggift');

slggift.prefix('/slggift');

slggift.get('/list', checkNotLogin);
slggift.get('/list', async (ctx, next) => {
    let queryResult = await Slggift.queryGift();
    await ctx.render('./slggift/list', {
        title: '礼包管理',

        playerManage: ctx.state.playerManage,
        gameManage: ctx.state.gameManage,
        playerLog: ctx.state.playerLog,
        serverManage: ctx.state.serverManage,
        userManage: ctx.state.userManage,

        giftLog: queryResult
    });
    return next();
});

// 发送礼包 请求
slggift.post('/sendgift', checkNotLogin);
slggift.post('/sendgift', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    let loginUser = ctx.session.user;
    // console.log(postData);
    let sendResult = await Slggift.sendGift(postData.giftID, postData.startTime, postData.endTime, postData.buyNumbers, loginUser);
    if (sendResult === 1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("发送成功！"); window.location.href = "/slggift/list"; </script>';
    }
});

module.exports = slggift;

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