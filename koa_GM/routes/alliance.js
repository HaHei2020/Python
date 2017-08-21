/**
 * Created by jiangxu on 2017/8/1.
 * 联盟管理 路由
 */
const alliance = require('koa-router')();
const allianceManage = require('../models/allianceManage');
const Manager = require('../models/manager');

alliance.prefix('/alliance');

alliance.get('/list', checkNotLogin);
alliance.get('/list', async (ctx, next) => {
    await ctx.render('./alliance/list', {
        title: '联盟管理',
        playerManage: ctx.state.playerManage,
        gameManage: ctx.state.gameManage,
        playerLog: ctx.state.playerLog,
        serverManage: ctx.state.serverManage,
        userManage: ctx.state.userManage
    });
    return next();
});

//接受 联盟查询 请求
alliance.post('/list', checkNotLogin);
alliance.post('/list', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    // console.log(postData);

    let result = await allianceManage.queryAlliance(postData.zoneId, postData.allianceName);
    if (result.queryResult === 1) {
        ctx.state = {
            queryResult: 1,
            allianceName: postData.allianceName,

            playerManage: ctx.state.playerManage,
            gameManage: ctx.state.gameManage,
            playerLog: ctx.state.playerLog,
            serverManage: ctx.state.serverManage,
            userManage: ctx.state.userManage,

            allianceAbbreviation: result.allianceInfo.allianceAbbreviation,
            allianceDeclaration: result.allianceInfo.allianceDeclaration,
            alliancePicture: result.allianceInfo.alliancePicture,
            alliancePower: result.allianceInfo.alliancePower,
            allianceLowPower: result.allianceInfo.allianceLowPower,
            alliancePoint: result.allianceInfo.alliancePoint,
            allianceHonor: result.allianceInfo.allianceHonor,
            allianceMembers: result.allianceInfo.allianceMembers,
            // allianceDetails: [['666','222'],['333','444']]    在这里传递 arr 二维数组，就可以在模版中接收到该参数！！！
        };

        return ctx.render('./alliance/list', {
            title: '联盟管理',
            queryResult: ctx.state.queryResult,
            allianceName: ctx.state.allianceName,

            playerManage: ctx.state.playerManage,
            gameManage: ctx.state.gameManage,
            playerLog: ctx.state.playerLog,
            serverManage: ctx.state.serverManage,
            userManage: ctx.state.userManage,

            allianceAbbreviation: ctx.state.allianceAbbreviation,
            allianceDeclaration: ctx.state.allianceDeclaration,
            alliancePicture: ctx.state.alliancePicture,
            alliancePower: ctx.state.alliancePower,
            allianceLowPower: ctx.state.allianceLowPower,
            alliancePoint: ctx.state.alliancePoint,
            allianceHonor: ctx.state.allianceHonor,
            allianceMembers: ctx.state.allianceMembers,
            // allianceDetails: ctx.state.allianceDetails
        })

    } else if (result.queryResult === -1) {
        ctx.response.type = 'text/html';
        ctx.response.body = '<script> alert("没有该联盟！"); window.location.href = "/alliance/list"; </script>';
    }

    return next();
});

// 接受 修改信息 请求
alliance.post('/changeProperty', checkNotLogin);
alliance.post('/changeProperty', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    // console.log(postData);

    let result = await allianceManage.changeProperty(postData.zoneID, postData.allianceName, postData.sendAlliancePropertyType, postData.sendAlliancePropertyValue);
    if (result === 'OkPacket') {
        ctx.body = 1;  //写入成功
    } else {
        ctx.body = 0;  //写入失败
    }
});

// 接受 查找联盟成员 请求
alliance.post('/queryDetails', checkNotLogin);
alliance.post('/queryDetails', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    // console.log(postData);

    let result = await allianceManage.queryDetails(postData.zoneID, postData.allianceName);
    if (result.queryResult === -1) {
        ctx.body = -1;

    } else if (result.queryResult === 1) {
        let arr = [];  //定义 一维数组
        for (let i = 0; i < result.queryDetails.length; i++) {
            arr[i] = [];  //定义 二维数组
            arr[i][0] = result.queryDetails[i].UID;
            arr[i][1] = result.queryDetails[i].nickName;
            arr[i][2] = result.queryDetails[i].alliancePosition;
        }
        // console.log(arr);
        ctx.body = arr;
/*
 * 这里 如果再用 ctx.state.xx 去渲染 模版，就没有用了。因为前端在刚开始渲染这个页面（联盟查询）时，已经把该传的变量传过去了。而查询成员信息，也无法分段渲染，变量没有传递过去，
 * 因此，只能用ajax去接收结果，在前端操作DOM完成页面展示。
 * “玩家游戏信息”，正好说明了该问题。（在刚开始渲染页面时，就把需要的变量全部传递过去了，只是在用户需要的时候，才展示了出来！）
 * “联盟成员信息”，正好说明了，同一页面分段加载的情况（用户需要，才会去请求数据）。
 */
    }
});

module.exports = alliance;


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