/**
 * Created by jiangxu on 2017/8/10.
 * 礼包管理 模型
 */
const mysql = require('./db');

// 发送奖励
sendGift = function (giftID, startTime, endTime, buyNumbers, loginUser) {
    let sendSql = 'INSERT INTO `gift` SET ?';
    let sendParams = {giftID: giftID, startTime: startTime, endTime: endTime, buyNumbers: buyNumbers, status: 1, sender: loginUser};

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                connection.query(sendSql, sendParams, (err, results, fields) => {
                    if (err) {
                        console.log('发送奖励 数据时，发生错误！');
                        reject(err);

                    } else {
                        console.log('发送奖励 成功！');
                        // console.log(results);
                        resolve(1);
                    }
                });
            }
            connection.release();
        })
    });
};

// 查询奖励
queryGift = function () {
    let querySql = 'SELECT * FROM `gift`';

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                connection.query(querySql, (err, results, fields) => {
                    if (err) {
                        console.log('查询奖励 数据时，发生错误！');
                        reject(err);

                    } else {
                        console.log('查询奖励 成功！');
                        // console.log(results);
                        resolve(results);
                    }
                });
            }
            connection.release();
        });
    });
};


module.exports = {
    sendGift,
    queryGift
};