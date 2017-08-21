/**
 * Created by jiangxu on 2017/8/7.
 * 服务器列表 路由
 */
const slg_server_info = require('koa-router')();
const Manager = require('../models/manager');

slg_server_info.prefix('/slg_server_info');

slg_server_info.get('/index', checkNotLogin);
slg_server_info.get('/index', async (ctx, next) => {
   await ctx.render('./slg_server_info/index', {
       title: '服务器列表',
       playerManage: ctx.state.playerManage,
       gameManage: ctx.state.gameManage,
       playerLog: ctx.state.playerLog,
       serverManage: ctx.state.serverManage,
       userManage: ctx.state.userManage
   });
   return next();
});



module.exports = slg_server_info;

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
