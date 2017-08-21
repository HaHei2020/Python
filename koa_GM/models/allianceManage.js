/**
 * Created by jiangxu on 2017/8/1.
 * 联盟管理 模型
 */
const mysql = require('./db');

//查询联盟 请求
queryAlliance = function (zoneID, allianceName) {
    let sql = 'SELECT * FROM `allianceinfo` WHERE `zoneID` = ? AND `allianceName` = ?';
    let params = [zoneID, allianceName];

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('连接数据库时，发生错误！');
                reject(err);
            } else {
                connection.query(sql, params, (err, results, fields) => {
                    if (err) {
                        console.log('查询 联盟信息 时，发生错误！');
                        reject(err);
                    } else {
                        if (!results[0]) {  //没有结果，返回 空数组 []
                            console.log('没有该联盟！' + '详细信息： ' + zoneID + ', '+ allianceName);
                            resolve({
                                queryResult: -1
                            });
                        } else {
                            console.log('查询 联盟信息 成功！' + '详细信息： ' + zoneID + ', '+ allianceName);
                            resolve({
                                queryResult: 1,
                                allianceInfo: results[0]
                            });
                        }
                        connection.release();
                    }
                })
            }
        })
    })
};

// 接受 修改信息 请求
changeProperty = async (zoneID, allianceName, sendAlliancePropertyType, sendAlliancePropertyValue) => {
    let queryAllianceInfo = await queryAlliance(zoneID, allianceName);

    if (sendAlliancePropertyType === 'allianceHonor') {
        let allianceHonor = queryAllianceInfo.allianceInfo.allianceHonor;
        allianceHonor = Math.floor(parseFloat(allianceHonor)) + Math.floor(parseFloat(sendAlliancePropertyValue));

        var changeSql = 'UPDATE `allianceinfo` SET `allianceHonor` = ? WHERE `zoneID` = ? AND `allianceName` = ?';
        var changeParams = [allianceHonor, zoneID, allianceName];
    }

    if (sendAlliancePropertyType === 'alliancePoint') {
        let alliancePoint = queryAllianceInfo.allianceInfo.alliancePoint;
        alliancePoint = Math.floor(parseFloat(alliancePoint)) + Math.floor(parseFloat(sendAlliancePropertyValue));

        var changeSql = 'UPDATE `allianceinfo` SET `alliancePoint` = ? WHERE `zoneID` = ? AND `allianceName` = ?';
        var changeParams = [alliancePoint, zoneID, allianceName];
    }

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('连接数据库时，发生错误！');
                reject(err);
            } else {
                connection.query(changeSql, changeParams, (err, results, fields) => {
                    if (err) {
                        console.log('写入 联盟更改信息 时，发生错误！');
                        reject(err);
                    } else {
                        console.log('写入 联盟更改信息 成功！' + '详细信息： ' + zoneID + ', '+ allianceName + ', ' + sendAlliancePropertyType + ', ' + sendAlliancePropertyValue);
                        resolve(results.constructor.name);
                    }
                    connection.release();
                })
            }
        })
    })
};

// 接受 查找联盟成员 请求
queryDetails = function (zoneID, allianceName) {
    let sql = 'SELECT * FROM `playerinfo` WHERE `zoneID` = ? AND `playerAlliance` = ?';
    let params = [zoneID, allianceName];

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('连接数据库时，发生错误！');
                reject(err);
            } else {
                connection.query(sql, params, (err, results, fields) => {
                    if (err) {
                        console.log('查询 玩家所在联盟信息 时，发生错误！');
                        reject(err);
                    } else {
                        if (! results) { //没有结果，返回 空数组 []
                            console.log('没有玩家在该联盟！' + '详细信息： ' + zoneID + ', '+ allianceName);
                            resolve({
                                queryResult: -1
                            });
                        } else {
                            console.log('查询 玩家所在联盟信息 成功！' + '详细信息： ' + zoneID + ', '+ allianceName);
                            // console.log(results[0])
                            resolve({
                                queryResult: 1,
                                queryDetails: results  //返回 数组 中的 多个结果
                            });
                        }
                    }
                    connection.release();
                })
            }
        })
    })
};

module.exports = {
    queryAlliance,
    changeProperty,
    queryDetails
};
