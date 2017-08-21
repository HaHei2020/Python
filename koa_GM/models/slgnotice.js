/**
 * Created by jiangxu on 2017/8/8.
 * 公告管理 模型
 */
const mysql = require('./db');

// 写入公告
writeNotice = function (postData) {
    let writeSql = 'INSERT INTO `notice` SET ?';
    if (postData.noticeType === 'broadcast' || postData.noticeType === 'chatMessage') {
        var writeParams = {zoneID: postData.zoneID, language: postData.language, noticeType: postData.noticeType,
            noticeInterval: postData.noticeInterval, noticeNumbers: postData.noticeNumbers, noticeTime: postData.noticeTime,
            noticeContent: postData.noticeContent, remarks: postData.remarks, sender: postData.sender, status: 1
        };
    }
    if (postData.noticeType === 'inAnnouncement' || postData.noticeType === 'outsideAnnouncement') {
        var writeParams = {zoneID: postData.zoneID, language: postData.language, noticeType: postData.noticeType,
            noticeTime: postData.noticeTime, noticeTitle: postData.noticeTitle, noticeContent: postData.noticeContent,
            remarks: postData.remarks, sender: postData.sender, status: 1
        };
    }

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                connection.query(writeSql, writeParams, (err, results, fields) => {
                    if (err) {
                        console.log('写入 公告 数据时，发生错误！');
                        reject(err);

                    } else {
                        console.log('写入 公告 成功！');
                        // console.log(results);
                        resolve(1);
                    }
                })
            }
            connection.release();
        })
    })
};

// 查询公告
queryNotice = function (noticeType) {
    let querySql = 'SELECT * FROM `notice` WHERE `noticeType` = ?';
    let queryParams = [noticeType];
    // if (noticeType === 'broadcast' || noticeType === 'chatMessage') {
    //     var queryParams = [noticeType];
    // }
    // if (noticeType === 'inAnnouncement' || noticeType === 'outsideAnnouncement') {
    //
    // }

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
           if (err) {
               console.log('数据库连接时，发生错误！');
               reject(err);

           } else {
               connection.query(querySql, queryParams, (err, results, fields) => {
                   if (err) {
                       console.log('查询 公告 数据时，发生错误！');
                       reject(err);

                   } else {
                       console.log('查询 公告 成功！');
                       console.log(results);
                       resolve({
                           queryResult: 1,
                           resultInfo: results
                       });
                   }
               })
           }
           connection.release();
        });
    });
};

// 删除公告 (接收 需要删除的公告 的编号信息)
deleteNotice = function (deleteNoticeNumber) {
    let deleteSql = 'DELETE FROM `notice` WHERE `id` = ?';
    let deleteParams = [deleteNoticeNumber];

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                connection.query(deleteSql, deleteParams, (err, results, fields) => {
                    if (err) {
                        console.log('删除 公告 数据时，发生错误！');
                        reject(err);

                    } else {
                        console.log('删除 公告 成功！');
                        // console.log(results);
                        resolve(1);
                    }
                })
            }
            connection.release();
        })
    })
};



module.exports = {
    writeNotice,
    queryNotice,
    deleteNotice
};