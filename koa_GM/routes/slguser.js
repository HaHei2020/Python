/**
 * Created by jiangxu on 2017/8/1.
 * 玩家管理 路由
 */
const slguser = require('koa-router')();
const userManage = require('../models/userManage');
const Manager = require('../models/manager');
const momentTime = require('moment');

slguser.prefix('/slguser');

slguser.get('/list', checkNotLogin);
slguser.get('/list', async (ctx, next) => {
  await ctx.render('./slguser/list', {
    title: '玩家管理',
    playerManage: ctx.state.playerManage,
    gameManage: ctx.state.gameManage,
    playerLog: ctx.state.playerLog,
    serverManage: ctx.state.serverManage,
    userManage: ctx.state.userManage
  });
  return next();
});

// slguser.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// });

// 接受 “玩家查询” 请求
slguser.post('/list', checkNotLogin);
slguser.post('/list', async (ctx, next) => {
   ctx.body = JSON.stringify(ctx.request.body);
   let postData = JSON.parse(ctx.body);
   // console.log(postData);
   let queryUserInfo = await userManage.queryUser(postData.zoneId, postData.queryType, postData.queryInfo);

// render 里面 跟的是 模版的 目录（所以，可以有 ‘.’的存在！），而 window.location.href 后面跟的是 链接地址（所以，不能有‘.’的存在！否则显示URL会有大问题！！）
   if (queryUserInfo.queryResult === 1) {
      ctx.state = {
          queryResult: 1,
          queryNickName: postData.queryInfo,

          playerManage: ctx.state.playerManage,
          gameManage: ctx.state.gameManage,
          playerLog: ctx.state.playerLog,
          serverManage: ctx.state.serverManage,
          userManage: ctx.state.userManage,

          accountType: queryUserInfo.accountType,
          OpenID: queryUserInfo.OpenID,
          UID: queryUserInfo.UID,
          nickName: queryUserInfo.nickName,
          zoneID: queryUserInfo.zoneID,
          playerLevel: queryUserInfo.playerLevel,
          playerIdol: queryUserInfo.playerIdol,
          diamonds: queryUserInfo.diamonds,
          rechargeDiamonds: queryUserInfo.rechargeDiamonds,
          registerDate: momentTime(queryUserInfo.registerDate).format('YYYY-MM-D HH:mm:ss'),
          isOnline: queryUserInfo.isOnline,
          isBlock: queryUserInfo.isBlock,
          isStopChat: queryUserInfo.isStopChat,
          playerWoods: queryUserInfo.playerWoods,
          playerGold: queryUserInfo.playerGold,
          playerIron: queryUserInfo.playerIron,
          playerStone: queryUserInfo.playerStone,
          playerCoordsX: queryUserInfo.playerCoordsX,
          playerCoordsY: queryUserInfo.playerCoordsY,
          playerVIPLevel: queryUserInfo.playerVIPLevel,
          playerResourcesLevel: queryUserInfo.playerResourcesLevel,
          playerRank: queryUserInfo.playerRank,
          playerAlliance: queryUserInfo.playerAlliance,
          playerCastleLevel: queryUserInfo.playerCastleLevel,
          playerCastleDefenseValue: queryUserInfo.playerCastleDefenseValue,
          playerPower: queryUserInfo.playerPower
      };

      return ctx.render('./slguser/list', {
         title: '玩家管理',
         // layout: false
         queryUserResult: ctx.state.queryUserResult,
         queryNickName: ctx.state.queryNickName,

         playerManage: ctx.state.playerManage,
         gameManage: ctx.state.gameManage,
         playerLog: ctx.state.playerLog,
         serverManage: ctx.state.serverManage,
         userManage: ctx.state.userManage,

         accountType: ctx.state.accountType,
         OpenID: ctx.state.OpenID,
         UID: ctx.state.UID,
         nickName: ctx.state.nickName,
         zoneID: ctx.state.zoneID,
         playerLevel: ctx.state.playerLevel,
         playerIdol: ctx.state.playerIdol,
         diamonds: ctx.state.diamonds,
         rechargeDiamonds: ctx.state.rechargeDiamonds,
         registerDate: ctx.state.registerDate,
         isOnline: ctx.state.isOnline,
         isBlock: ctx.state.isBlock,
         isStopChat: ctx.state.isStopChat,
         playerWoods: ctx.state.playerWoods,
         playerGold: ctx.state.playerGold,
         playerIron: ctx.state.playerIron,
         playerStone: ctx.state.playerStone,
         playerCoordsX: ctx.state.playerCoordsX,
         playerCoordsY: ctx.state.playerCoordsY,
         playerVIPLevel: ctx.state.playerVIPLevel,
         playerResourcesLevel: ctx.state.playerResourcesLevel,
         playerRank: ctx.state.playerRank,
         playerAlliance: ctx.state.playerAlliance,
         playerCastleLevel: ctx.state.playerCastleLevel,
         playerCastleDefenseValue: ctx.state.playerCastleDefenseValue,
         playerPower: ctx.state.playerPower
      })

   } else if (queryUserInfo.queryResult === -1) {
       ctx.response.type = 'text/html';
       ctx.response.body = '<script> alert("没有该玩家！"); window.location.href = "/slguser/list"; </script>';
   }

   // ctx.body = queryUserResult;  //可以用来 给 ajax 返回数据(json也可以，如： ctx.body = {aa: '111', bb: '22'})，但是 一定要 写在 最外面，如果用其他函数包围起来，则失去作用！！！！
   return next();
});

// 接受 “直接发奖” 请求
slguser.post('/sendRewards', checkNotLogin);
slguser.post('/sendRewards', async (ctx, next) => {
   ctx.body = JSON.stringify(ctx.request.body);
   let postData = JSON.parse(ctx.body);
   // console.log(postData);
   let result = await userManage.sendRewards(postData.zoneID, postData.nickName, postData.sendAttributeType, postData.sendAttributeValue);
   if (result === 'OkPacket') {
       ctx.body = 1;   // 写入成功

   } else if (result === -1) {
       ctx.body = -1;  // 不支持这些字段

   } else {
       ctx.body = 0;   // 写入失败
   }
});

// 接受 “玩家禁封” 请求
slguser.post('/userBlock', checkNotLogin);
slguser.post('/userBlock', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    // console.log(postData);
    let result = await userManage.userBlock(postData.zoneID, postData.nickName, postData.userBlockType, postData.userBlockWay, postData.userBlockTime);
    if (result === 'OkPacket') {
        ctx.body = 1; // 禁封成功
    } else {
        ctx.body = 0; // 禁封失败
    }
});

// 接受 “玩家解封” 请求
slguser.post('/userNotBlock', checkNotLogin);
slguser.post('/userNotBlock', async (ctx, next) => {
    ctx.body = JSON.stringify(ctx.request.body);
    let postData = JSON.parse(ctx.body);
    // console.log(postData);
    let result = await userManage.userNotBlock(postData.zoneID, postData.nickName, postData.userNotBlockType);
    if (result === 'OkPacket') {
        ctx.body = 1; // 解封成功
    } else {
        ctx.body = 0; // 解封失败
    }
});

module.exports = slguser;

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