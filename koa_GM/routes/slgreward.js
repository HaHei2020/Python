/**
 * Created by jiangxu on 2017/8/2.
 * 老玩家召回  路由
 */
const slgreward = require('koa-router')();
const fs = require('fs');
const ReadLine = require('line-by-line');
const busboy = require('koa-busboy');
const slgReward = require('../models/slgReward');
const Manager = require('../models/manager');

const uploader = busboy({
  dest: './uploads',
  fnDestFilename: (fieldname, filename) => Date.now() + '_' + filename
});

slgreward.prefix('/slgreward');


slgreward.get('/user', checkNotLogin);
slgreward.get('/user', async (ctx, next) => {
    await ctx.render('./slgreward/user', {
        title: '玩家召回',
        playerManage: ctx.state.playerManage,
        gameManage: ctx.state.gameManage,
        playerLog: ctx.state.playerLog,
        serverManage: ctx.state.serverManage,
        userManage: ctx.state.userManage
    });
    return next();
});

slgreward.post('/user', checkNotLogin);
slgreward.post('/user', uploader, async (ctx, next) => {
    let fieldsParams  = ctx.request.body;  //表单中，除文件的 其他参数
    let fileReadStream = ctx.request.files[0]; //表单中，上传过来的文件
    // console.log(fileReadStream);

    if (new RegExp('.txt').test(fileReadStream.filename)) { //检查 扩展名
        let result = function() {  //返回 结果  (回调函数)
            return new Promise((resolve, reject) => {
                lr = new ReadLine(fileReadStream.path, {encoding: 'utf8', skipEmptyLines: true});

                lr.on('error', function (err) {
                    console.log('文件读取出错！');
                    reject(err);
                });
                lr.on('line', async function (line) {  // 写入 数据 （按行）
                    let textLine = line.split(', ');  //变成 数组
                    lr.pause();

                    let result = await slgReward.oldPlayerRecall(fieldsParams.zoneId, fieldsParams.sendTime, fieldsParams.sendInterval, fieldsParams.sendNumbers, textLine);
                    if (result === 'OkPacket') {
                        lr.resume();

                    } else {
                        lr.close();
                        resolve(0);
                    }
                });
                lr.on('end', function () {
                    console.log('读取结束，文件关闭！');
                    resolve(1);
                });
             });
        };

        let returnResult = await result();  //接收 返回结果
        if (returnResult === 0) {
            ctx.response.body = '<script> alert("数据发送过程中出错，请检查数据格式！"); window.location.href = "/slgreward/user"; </script>';
        } else {
            // fs.unlinkSync(fileReadStream.path);  //删除 文件
            ctx.response.body = '<script> alert("数据发送成功！"); window.location.href = "/slgreward/user"; </script>';
        }

    } else {
        console.log('扩展名非法！');
        ctx.response.body = '<script> alert("扩展名非法！"); window.location.href = "/slgreward/user"; </script>';
    }
});

module.exports = slgreward;

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