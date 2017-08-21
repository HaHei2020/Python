/**
 * Created by jiangxu on 2017/7/29.
 * 玩家管理 模型
 */
const mysql = require('./db');

// 查询玩家
queryUser = function (zoneId, queryType, queryInfo) {
    if (queryType === 'nickname') {
        var sql = 'SELECT * FROM `playerinfo` WHERE `nickName` = ? AND `zoneID` = ?';
        var queryParams = [queryInfo, zoneId];

    } else if (queryType === 'uid') {
        var sql = 'SELECT * FROM `playerinfo` WHERE `UID` = ? AND `zoneID` = ?';
        var queryParams = [queryInfo, zoneId];
    }

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);
            } else {
                connection.query(sql, queryParams, (err, results, fields) => {
                    if (err) {
                        console.log('查询 玩家信息 时，发生错误！');
                        reject(err);
                    } else {
                        // console.log(results);
                        if (!results[0]) {  //判断 是否 为 “空数组”
                            console.log('没有该玩家！' + '详细信息： ' + zoneId + ', '+ queryType + ', ' + queryInfo);
                            resolve({
                                queryResult: -1
                            });
                        } else {
                            console.log('查询 玩家信息 成功！' + '详细信息： ' + zoneId + ', '+ queryType + ', ' + queryInfo);
                            resolve({
                                queryResult: 1,
                                accountType: results[0].accountType,
                                OpenID: results[0].OpenID,
                                UID: results[0].UID,
                                nickName: results[0].nickName,
                                zoneID: results[0].zoneID,
                                playerLevel: results[0].playerLevel,
                                playerIdol: results[0].playerIdol,
                                diamonds: results[0].diamonds,
                                rechargeDiamonds: results[0].rechargeDiamonds,
                                registerDate: results[0].registerDate,
                                isOnline: results[0].isOnline,
                                isBlock: results[0].isBlock,
                                isStopChat: results[0].isStopChat,
                                playerWoods: results[0].playerWoods,
                                playerGold: results[0].playerGold,
                                playerIron: results[0].playerIron,
                                playerStone: results[0].playerStone,
                                playerCoordsX: results[0].playerCoordsX,
                                playerCoordsY: results[0].playerCoordsY,
                                playerVIPLevel: results[0].playerVIPLevel,
                                playerResourcesLevel: results[0].playerResourcesLevel,
                                playerRank: results[0].playerRank,
                                playerAlliance: results[0].playerAlliance,
                                playerCastleLevel: results[0].playerCastleLevel,
                                playerCastleDefenseValue: results[0].playerCastleDefenseValue,
                                playerPower: results[0].playerPower,
                            });
                        }
                    }
                    connection.release();
                })
            }
        })
    })
};

// 直接发奖
sendRewards = async (zoneID, nickName, sendAttributeType, sendAttributeValue) => {
    let otherType = ['vipEXP', 'lordEXP', 'allianceDonation', 'fullEquipments', 'forgedValue'];
    if (otherType.includes(sendAttributeType)) {
        return -1;  //不支持写入 这些信息 （没有相关字段）
    }

    let queryUserInfo = await queryUser(zoneID, 'nickname', nickName); //返回一个 result 数组

    if (sendAttributeType === 'diamonds') {
        let diamonds = queryUserInfo.diamonds;  //获取玩家 当前 钻石存量
        diamonds = parseInt(diamonds) + parseInt(sendAttributeValue);

        var rewardSql = 'UPDATE `playerinfo` SET `diamonds` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        var rewardParams = [diamonds, nickName, zoneID];
        console.log(rewardParams);
    }

    if (sendAttributeType === 'golds') {
        let golds = queryUserInfo.playerGold;
        golds = Math.floor(parseFloat(golds) + parseFloat(sendAttributeValue));  //结果，向下取整

        var rewardSql = 'UPDATE `playerinfo` SET `playerGold` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        var rewardParams = [golds, nickName, zoneID];
    }

    if (sendAttributeType === 'woods') {
        let woods = queryUserInfo.playerWoods;
        woods = Math.floor(parseFloat(woods) + parseFloat(sendAttributeValue));

        var rewardSql = 'UPDATE `playerinfo` SET `playerWoods` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        var rewardParams = [woods, nickName, zoneID];
    }

    if (sendAttributeType === 'iron') {
        let iron = queryUserInfo.playerIron;
        iron = Math.floor(parseFloat(iron) + parseFloat(sendAttributeValue));

        var rewardSql = 'UPDATE `playerinfo` SET `playerIron` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        var rewardParams = [iron, nickName, zoneID];
    }

    if (sendAttributeType === 'stone') {
        let stone = queryUserInfo.playerStone;
        stone = Math.floor(parseFloat(stone) + parseFloat(sendAttributeValue));

        var rewardSql = 'UPDATE `playerinfo` SET `playerStone` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        var rewardParams = [stone, nickName, zoneID];
    }

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);
            } else {
                connection.query(rewardSql, rewardParams, (err, results, fields) => {
                    if (err) {
                        console.log('写入 发奖 数据时，发生错误！');
                        reject(err);
                    } else {
                        console.log('写入 发奖 成功！' + '详细信息： ' + zoneID + ', '+ nickName + ', ' + sendAttributeType + ', ' + sendAttributeValue);
                        // console.log(results.constructor.name);
                        resolve(results.constructor.name);
                    }
                })
            }
            connection.release();
        })
    })
};

// 玩家禁封
userBlock = function (zoneID, nickName, userBlockType, userBlockWay, userBlockTime) {
    if (userBlockType === 'stopChat') {
        var blockSql = 'UPDATE `playerinfo` SET `isStopChat` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        if (userBlockWay === 'permanent') {
            var blockParams = ['1', nickName, zoneID];

        } else if (userBlockWay === 'hour') {
            let blockTime = new Date();
            blockTime.setHours(blockTime.getHours()+parseFloat(userBlockTime));
            var timeStamp = Math.round(blockTime/1000) - 8*60*60;  //转换为 时间戳，并保持 UTC 时区
            var blockParams = [timeStamp, nickName, zoneID];
        }
    }

    if (userBlockType === 'accountBlock') {
        var blockSql = 'UPDATE `playerinfo` SET `isBlock` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        if (userBlockWay === 'permanent') {
            var blockParams = ['1', nickName, zoneID];
        } else if (userBlockWay === 'hour') {
            let blockTime = new Date();
            blockTime.setHours(blockTime.getHours()+parseFloat(userBlockTime));
            var timeStamp = Math.round(blockTime/1000) - 8*60*60;  //转换为 时间戳，并保持 UTC 时区
            var blockParams = [timeStamp, nickName, zoneID];
        }
    }

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);
            } else {
                connection.query(blockSql, blockParams, (err, results, fields) => {
                    if (err) {
                        console.log('写入 禁封 数据时，发生错误！');
                        reject(err);
                    } else {
                        console.log('写入 禁封 成功！' + '详细信息： ' + zoneID + ', '+ nickName + ', ' + userBlockType + ', ' + userBlockWay + ', ' + userBlockTime + ', ' + timeStamp);
                        // console.log(results);
                        resolve(results.constructor.name);
                    }
                    connection.release();
                })
            }
        })
    })
};

// 玩家解封
userNotBlock = function (zoneID, nickName, userNotBlockType) {
    if (userNotBlockType === 'chat') {
        var NotBlockSql = 'UPDATE `playerinfo` SET `isStopChat` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        var NotBlockParams = ['0', nickName, zoneID];
    }

    if (userNotBlockType === 'account') {
        var NotBlockSql = 'UPDATE `playerinfo` SET `isBlock` = ? WHERE `nickName` = ? AND `zoneID` = ?';
        var NotBlockParams = ['0', nickName, zoneID];
    }
    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);
            } else {
                connection.query(NotBlockSql, NotBlockParams, (err, results, fields) => {
                    if (err) {
                        console.log('写入 解封 数据时，发生错误！');
                        reject(err);
                    } else {
                        console.log('写入 解封 成功！' + '详细信息： ' + zoneID + ', '+ nickName + ', ' + userNotBlockType);
                        // console.log(results);
                        resolve(results.constructor.name);
                    }
                })
            }
        })
    })
};

module.exports = {
    queryUser,
    sendRewards,
    userBlock,
    userNotBlock
};