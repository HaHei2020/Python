/**
 * Created by jiangxu on 2017/8/11.
 * 客服反馈 路由
 */
const slgfeedback = require('koa-router')();
const Manager = require('../models/manager');
const Slgfeedback = require('../models/slgfeedback');

slgfeedback.prefix('/slgfeedback');

slgfeedback.get('/list', checkNotLogin);
slgfeedback.get('/list', async (ctx, next) => {
   let queryResult = await Slgfeedback.queryFeedback();
   if (queryResult) {
       await ctx.render('./slgfeedback/list', {
           title: '客服反馈',

           playerManage: ctx.state.playerManage,
           gameManage: ctx.state.gameManage,
           playerLog: ctx.state.playerLog,
           serverManage: ctx.state.serverManage,
           userManage: ctx.state.userManage,

           feedbackInfo: queryResult
       });
   } else {
       ctx.response.type = 'text/html';
       ctx.response.body = '<script> alert("没有相关问题！"); window.location.href = "/slgfeedback/list"; </script>';
   }
   return next();
});

// 回复消息 请求
slgfeedback.post('/reply', checkNotLogin);
slgfeedback.post('/reply', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    let loginUser = ctx.session.user;
    let replyTime = new Date().toLocaleString();
    // console.log(postData);
    let replyResult = await Slgfeedback.replyFeedback(postData.mid, postData.replyTitle, postData.replyContent, replyTime, loginUser);
    if (replyResult === 1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("发送成功！"); window.location.href = "/slgfeedback/list";</script>';
    }
});

module.exports = slgfeedback;

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