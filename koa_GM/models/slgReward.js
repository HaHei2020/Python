/**
 * Created by jiangxu on 2017/8/4.
 * 老玩家召回 模型
 */
const mysql = require('./db');

//老玩家发奖励 请求
oldPlayerRecall = async function (zoneId, sendTime, sendInterval, sendNumbers, textLine) {
    let queryResult = await oldPlayerQuery(zoneId, textLine[0]);
    if (queryResult === 0) {
        var datas = {zoneID: zoneId, nickName: textLine[0], rewards: textLine[1], sendTime: sendTime, sendInterval: sendInterval, sendNumbers: sendNumbers};
        var sql = 'INSERT INTO `old_player_recall` SET ?';

    } else if (queryResult === 1) {
        var sql = 'UPDATE `old_player_recall` SET `rewards` = ?, `sendTime` = ?, `sendInterval` = ?, `sendNumbers` = ? WHERE `zoneID` = ? AND `nickName` = ?';
        var datas = [textLine[1], sendTime, sendInterval, sendNumbers, zoneId, textLine[0]];
    }

    return new Promise((resolve, reject) => {
           mysql.getConnection((err, connection) => {
               if (err) {
                   console.log('数据库连接时，发生错误！');
                   reject(err);
               } else {
                   mysql.query(sql, datas, (err, results, fields) => {
                       if (err) {
                           console.log('写入 老玩家发奖 数据时，发生错误！');
                           resolve(err);  //返回错误信息，并继续执行前端代码，弹出错误信息。 如果 reject，代码就停止了。
                       } else {
                           console.log('写入 老玩家发奖 数据 成功！');
                           // console.log(results);
                           resolve(results.constructor.name);
                       }
                   })
               }
               connection.release();
           })
        });
};

//查询数据库中，是否已有该玩家
oldPlayerQuery = function (zoneId, nickName) {
    let querySql = 'SELECT * FROM `old_player_recall` WHERE `zoneID` = ? AND `nickName` = ?';
    let queryParams = [zoneId, nickName];
    return new Promise((resolve, reject) => {
       mysql.getConnection((err, connection) => {
           if (err) {
               console.log('数据库连接时，发生错误！');
               reject(err);
           } else {
               connection.query(querySql, queryParams, (err, results, fields) => {
                  if (err) {
                      console.log('查询 老玩家发奖 数据时，发生错误！');
                      reject(err);
                  } else {
                      if (!results[0]) { //如果 没有该玩家
                          resolve(0);
                      } else {   //如果 有该玩家
                          resolve(1);
                      }
                  }
               })
           }
           connection.release();
       })
    });
};

module.exports = {
    oldPlayerRecall
};
