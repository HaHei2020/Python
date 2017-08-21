/**
 * Created by jiangxu on 2017/8/4.
 * 权限管理，修改密码  路由
 */
const manager = require('koa-router')();
const Manager = require('../models/manager');

manager.prefix('/manager');

// 修改密码
manager.get('/edit_pw', checkNotLogin);
manager.get('/edit_pw', async (ctx, next) => {
    await ctx.render('./manager/edit_pw', {
        title: '修改密码',

        playerManage: ctx.state.playerManage,
        gameManage: ctx.state.gameManage,
        playerLog: ctx.state.playerLog,
        serverManage: ctx.state.serverManage,
        userManage: ctx.state.userManage
    });
    return next();
});

// 修改密码
manager.post('/edit_pw', checkNotLogin);
manager.post('/edit_pw', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    let loginUser = ctx.session.user;
    // console.log(loginUser + ', ' + postData.newPassword)

    let result = await Manager.changePassword(loginUser, postData.newPassword);
    if (result === 1) {
       ctx.session.user = null;
       ctx.body = 1;
    } else {
       ctx.body = -1;
    }
});

// 管理员管理
manager.get('/', checkNotLogin);
manager.get('/', async (ctx, next) => {
    let userResults = await Manager.queryAllUsers();  // 返回 查询到的 所有用户的信息 （数组）
    // console.log(userResult[0].id);
    await ctx.render('./manager', {
        title: '管理员管理',
        userResults: userResults,

        playerManage: ctx.state.playerManage,
        gameManage: ctx.state.gameManage,
        playerLog: ctx.state.playerLog,
        serverManage: ctx.state.serverManage,
        userManage: ctx.state.userManage
    });
    return next();
});

// 添加 管理员
manager.post('/addUser', checkNotLogin);
manager.post('/addUser', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    let loginUser = ctx.session.user;
    // console.log(postData)
    let addResult = await Manager.addUser(loginUser, postData);
    console.log(addResult);
    if (addResult === 1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("添加管理员成功！"); window.location.href = "/manager"; </script>';

    } else if (addResult === -1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("验证用户或密码错误，添加失败！"); window.location.href = "/manager"; </script>';

    } else if (addResult === 0) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("新用户已存在，无法添加！"); window.location.href = "/manager"; </script>';
    }
});

// 编辑 管理员
manager.post('/editUser', checkNotLogin);
manager.post('/editUser', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    let loginUser = ctx.session.user;
    // console.log(postData);
    let editResult = await Manager.editUser(loginUser, postData);
    if (editResult === 1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("更新管理员信息成功！"); window.location.href = "/manager"; </script>';

    } else if (editResult === -1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("验证用户或密码错误，更新失败！"); window.location.href = "/manager"; </script>';

    } else if (editResult === 0) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("查询不到该用户，无法更新！"); window.location.href = "/manager"; </script>';
    }
});

// 删除 管理员
manager.post('/deleteUser', checkNotLogin);
manager.post('/deleteUser', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    let loginUser = ctx.session.user;
    console.log(postData);
    let deleteResult = await Manager.deleteUser(postData.deleteUser);
    ctx.body = deleteResult;
});

module.exports = manager;

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
