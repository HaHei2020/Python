/**
 * Created by jiangxu on 2017/8/11.
 * 客服反馈 模型
 */
const mysql = require('./db');

queryFeedback = function () {
    let querySql = 'SELECT * FROM `feedback`';

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
           if (err) {
               console.log('数据库连接时，发生错误！');
               reject(err);

           } else {
               connection.query(querySql, (err, results, fields) => {
                  if (err) {
                      console.log('查询 客服反馈 数据时，发生错误！');
                      reject(err);

                  } else {
                      console.log('查询 客服反馈 成功！');
                      // console.log(results);
                      resolve(results);
                  }
               });
           }
           connection.release();
        });
    });
};

// 回复消息
replyFeedback = function (mid, replyTitle, replyContent, replyTime, replyer) {
    let replySql = 'UPDATE `feedback` SET `replyTitle` = ?, `replyContent` = ?, `replyTime` = ?, `replyer` = ? WHERE `mid` = ?';
    let replyParams = [replyTitle, replyContent, replyTime, replyer, mid];

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                connection.query(replySql, replyParams, (err, results, fields) => {
                    if (err) {
                        console.log('写入 回复消息 数据时，发生错误！');
                        reject(err);

                    } else {
                        console.log('写入 回复消息 成功！');
                        console.log(results);
                        resolve(1);
                    }
                })
            }
        });
    });
};

// // 查询单条数据
// queryOneFeedback = function (mid) {
//     let queryOneSql = 'SELECT * FROM `feedback` WHERE `mid` = ?';
//     let queryOneParams = [mid];
//
//     return new Promise((resolve, reject) => {
//     mysql.getConnection((err, connection) => {
//        if (err) {
//            console.log('数据库连接时，发生错误！');
//            reject(err);
//
//        } else {
//            connection.query(querySql, (err, results, fields) => {
//               if (err) {
//                   console.log('查询 单条客服反馈 数据时，发生错误！');
//                   reject(err);
//
//               } else {
//                   console.log('查询 单条客服反馈 成功！');
//                   // console.log(results);
//                   resolve(1);
//               }
//            });
//        }
//        connection.release();
//     });
// });
// };

module.exports = {
    queryFeedback,
    replyFeedback
};