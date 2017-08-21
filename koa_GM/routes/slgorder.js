/**
 * Created by jiangxu on 2017/8/17.
 * 订单管理 路由
 */
const slgorder = require('koa-router')();
const Manager = require('../models/manager');
const Country = require('../country.json');
const Slgorder = require('../models/slgorder');

slgorder.prefix('/slgorder');


slgorder.get('/order', checkNotLogin);
slgorder.get('/order', async (ctx, next) => {
    await ctx.render('./slgorder/order', {
        title: '订单管理',

        playerManage: ctx.state.playerManage,
        gameManage: ctx.state.gameManage,
        playerLog: ctx.state.playerLog,
        serverManage: ctx.state.serverManage,
        userManage: ctx.state.userManage,

        country: Country.country,
        currency: Country.currency
    });
    return next();
});

// 查询订单 请求
slgorder.post('/queryOrder', checkNotLogin);
slgorder.post('/queryOrder', async (ctx, next) => {
   ctx.body = JSON.stringify(ctx.request.body);
   let postData = JSON.parse(ctx.body);
   // console.log(postData);
   let queryResults = await Slgorder.queryOrders(postData);
   ctx.body = queryResults;
});

// 订单汇总 请求
slgorder.post('/allOrder', checkNotLogin);
slgorder.post('/allOrder', async (ctx, next) => {
   ctx.body = JSON.stringify(ctx.request.body);
   let postData = JSON.parse(ctx.body);
   // console.log(postData);
   let queryResults = await Slgorder.queryOrders(postData);

   if (queryResults) {
       let summaryResults = await Slgorder.summaryOrders(queryResults);
       //console.log(summaryResults);
       if (summaryResults === 0) {
           ctx.body = 0;  // 没有符合条件的订单！

       } else {
           ctx.body = summaryResults;
       }
   }
});


module.exports = slgorder;

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