/**
 * Created by jiangxu on 2017/8/10.
 * 邮件管理 模型
 */
const mysql = require('./db');

// 发送邮件 请求
sendMail = function (postData) {
// 处理 发送的道具 将其转换成： 道具类型,道具ID,道具数量;
    let items = '';
    if (postData.itemID) {
        let itemLists = postData.itemLists;
        let itemIDs = postData.itemID;
        let itemNumbers = postData.itemNumbers;
        for (let i=0; i<itemLists.length; i++) {
            items += itemLists[i] + ',' + itemIDs[i] + ',' + itemNumbers[i] + ';';
        }
        // console.log(items);
    }

    let sendSql = 'INSERT INTO `mail` SET ?';
    let sendParams = {mailType: postData.mailType, lostDay: postData.lostDay, lowerLevel: postData.lowerLevel,
        higherLevel: postData.higherLevel, zoneID: postData.zoneID, language: postData.language,
        sendTime: postData.sendTime, nickName: postData.nickName, mailTitle: postData.mailTitle,
        mailContent: postData.mailContent, mailVersion: postData.mailVersion, remarks: postData.remarks,
        sender: postData.sender, items: items, status: 1
    };

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                connection.query(sendSql, sendParams, (err, results, fields) => {
                    if (err) {
                        console.log('发送邮件信息 数据时，发生错误！');
                        reject(err);

                    } else {
                        console.log('发送邮件 成功！');
                        // console.log(results);
                        resolve(1);
                    }
                })
            }
            connection.release();
        })
    })
};

// 查询邮件 请求
queryMail = function (mailType) {
    let querySql = 'SELECT * FROM `mail` WHERE `mailType` = ?';
    let queryParams = [mailType];

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
           if (err) {
               console.log('数据库连接时，发生错误！');
               reject(err);

           } else {
               connection.query(querySql, queryParams, (err, results, fields) => {
                  if (err) {
                      console.log('查询邮件信息 数据时，发生错误！');
                      reject(err);

                  } else {
                      console.log('查询邮件信息 成功！');
                      // console.log(results);
                      resolve({
                          queryResult: 1,
                          mailInfo: results
                      });
                  }
               });
           }
           connection.release();
        });
    })
};


module.exports = {
    sendMail,
    queryMail
};