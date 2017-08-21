/**
 * Created by jiangxu on 2017/8/17.
 * 订单管理 模型
 */
const mysql = require('./db');
const country = require('../country.json');
// const superagent = require('../node_modules/superagent');
const cheerio = require('../node_modules/cheerio');
const superagent = require('../node_modules/superagent-charset');  // 里面已经包含了 原版的 superagent（依赖关系）

// 查询订单
queryOrders = function (data) {
    let zoneID = data.zoneID;    // 区服
    let platform = data.platform;   // 平台
    let payType = data.payType;   // 支付方式
    let orderStatus = data.orderStatus;  // 订单状态，1：成功，2：已创建，0：已取消，-1：非法，-2：已退款
    let country = data.country;  // 国家
    let currency = data.currency;  // 货币类型
    let gameOrder = data.gameOrderNumber;  // 游戏订单号
    let platformOrder = data.platformOrderNumber;  // 渠道订单号
    let openID = data.openID;
    let UID = data.uid;
    let rechargeMinMoney = data.rechargeMinMoney; // 查询 充值最小金额
    let rechargeMaxMoney = data.rechargeMaxMoney;
    let rechargeBeginTime = data.rechargeBeginTime;  // 查询 充值开始时间
    let rechargeEndTime = data.rechargeEndTime;
    let arriveBeginTime = data.arriveBeginTime;     // 查询 到账开始时间
    let arriveEndTime = data.arriveEndTime;
    let registerBeginTime = data.registerBeginTime;  // 查询 注册开始时间
    let registerEndTime = data.registerEndTime;

    var querySql = 'SELECT * FROM `recharge` WHERE `rechargeTime` >= ? AND `rechargeTime` <= ?';
    var queryParams = [rechargeBeginTime, rechargeEndTime];

    if (zoneID) {
        querySql += ' AND `zoneID` = ?';
        queryParams.push(zoneID);
    }

    if (platform) {
        querySql += ' AND `platform` = ?';
        queryParams.push(platform);
    }

    if (payType) {
        querySql += ' AND `payType` = ?';
        queryParams.push(payType);
    }

    if (orderStatus) {
        querySql += ' AND `orderStatus` = ?';
        queryParams.push(orderStatus);
    }

    if (country) {
        querySql += ' AND `country` = ?';
        queryParams.push(country);
    }

    if (currency) {
        querySql += ' AND `currency` = ?';
        queryParams.push(currency);
    }

    if (gameOrder) {
        querySql += ' AND `gameOrder` = ?';
        queryParams.push(gameOrder);
    }

    if (platformOrder) {
        querySql += ' AND `platformOrder` = ?';
        queryParams.push(platformOrder);
    }

    if (openID) {
        querySql += ' AND `openID` = ?';
        queryParams.push(openID);
    }

    if (UID) {
        querySql += ' AND `UID` = ?';
        queryParams.push(UID);
    }

    if (rechargeMinMoney && rechargeMaxMoney) {
        querySql += ' AND `rechargeMoney` >= ? AND `rechargeMoney` <= ?';
        queryParams.push(rechargeMinMoney, rechargeMaxMoney);
    }

    if (arriveBeginTime && arriveEndTime) {
        querySql += ' AND `arriveTime` >= ? AND `arriveTime` <= ?';
        queryParams.push(arriveBeginTime, arriveEndTime);
    }

    if (registerBeginTime && registerEndTime) {
        querySql += ' AND `registerTime` >= ? AND `registerTime` <= ?';
        queryParams.push(registerBeginTime, registerEndTime);
    }
    // console.log(querySql);
    // console.log(queryParams);

    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
           if (err) {
               console.log('数据库连接时，发生错误！');
               reject(err);

           } else {
               connection.query(querySql, queryParams, (err, results, fields) => {
                   if (err) {
                       console.log('查询订单 数据时，发生错误！');
                       reject(err);

                   } else {
                       // console.log(results);
                       console.log('查询订单 成功！');
                       resolve(results);
                   }
               });
           }
           connection.release();
        });
    });
};

// 汇总订单
summaryOrders = async function (ordersInfo) {
    if (ordersInfo.length != 0) {

        let queryCurrencys = [];
        let rechargePeople = [];
        let rechargePeopleCount = 0;
        // let rechargePeopleCounts = [];
        let ordersCount = 0;
        // let ordersCounts = [];
        let rechargeMoneySum = 0;
        let rechargeMoneySums = [];
        let countInfos = [];

        for (let i = 0; i < ordersInfo.length; i++) {
            if (ordersInfo[i].orderStatus === 1) {  // 成功的订单
                if (!queryCurrencys.includes(ordersInfo[i].currency)) {  // 数组里 去除 重复元素
                    queryCurrencys.push(ordersInfo[i].currency);

                    for (let j = 0; j < ordersInfo.length; j++) {  // 充值金额汇总 （写在 货币去重的数组中，可以保证 货币和金额汇总的2个数组中，元素的顺序保持一致，可以正确读出对应数据）
                        if (ordersInfo[j].currency === ordersInfo[i].currency) {  // 所有的汇总，都是在 “同种货币”的情况下
                            rechargeMoneySum += ordersInfo[j].rechargeMoney;

                            ordersCount++;  // 订单计数

                            if (!rechargePeople.includes(ordersInfo[i].UID)) {  // 充值人数 去重 计数
                                rechargePeople.push(ordersInfo[i].UID);
                                rechargePeopleCount++;  // 计数
                            }
                        }
                    }
                    country.currency.forEach(function (currency) {
                        if (currency.shorthand === ordersInfo[i].currency) {
                            countInfos.push({'name': currency.name, 'orderCount': ordersCount, 'rechargePeopleCount': rechargePeopleCount});
                        }
                    });
                    // 充值金额汇总 及 初始化
                    rechargeMoneySums.push(rechargeMoneySum);  // 充值金额汇总 数组
                    rechargeMoneySum = 0;  // 重新赋初始值

                    // 订单计数汇总 及 初始化
                    // ordersCounts.push(ordersCount);
                    ordersCount = 0;

                    // 充值人数汇总（去重） 及 初始化
                    // rechargePeopleCounts.push(rechargePeopleCount);
                    rechargePeopleCount = 0;
                    rechargePeople = [];
                }
            }
        }
        // console.log(countInfos)
        //console.log(ordersInfo.length + ', ' + queryCurrencys + ', ' + rechargePeopleCount + ', ' + ordersCount + ', ' + rechargeMoneySums);
        let getResults = await requestRate(queryCurrencys, rechargeMoneySums);
        //console.log(getResults);
        return {
            // queryCurrencys: queryCurrencys,
            // rechargePeopleCounts: rechargePeopleCounts,
            // ordersCounts: ordersCounts,
            // rechargeMoneySums: rechargeMoneySums,
            countInfos: countInfos,
            getResults: getResults
        }

    } else {
        console.log('没有符合条件的订单！');
        return 0;  // 没有符合条件的订单！
    }
};


// 请求 汇率 相关数据
requestRate = async function (queryCurrencys, rechargeMoneySums) {

    let queryRate = function () {
        return new Promise((resolve, reject) => {
            let currencys = [];
            let rechargeMoneys = [];
            let rates = [];  // 存储 返回的 汇率
            let USDmoneys = [];  // 存储 返回的 兑换后的 USD

            for (let i = 0; i < queryCurrencys.length; i++) {
                let url = 'http://qq.ip138.com/hl.asp?from=' + queryCurrencys[i] + '&to=USD&q=' + rechargeMoneySums[i];

                superagent.get(url)
                    .charset('gbk')  // 解决乱码
                    .end(function (err, sres) {
                        if (err) {
                            console.log('请求汇率时，出错！');
                            console.log(err);
                            reject(err);
                        }
                        let $ = cheerio.load(sres.text);
                        // console.log(sres.text);
                        let $currency = $('.rate').find('tr').eq(1).find('td').eq(0).text();
                        let $rechargeMoney = $('.rate').find('tr').eq(2).find('td').eq(0).text();
                        let $rate = $('.rate').find('tr').eq(2).find('td').eq(1).text();
                        let $USDmoney = $('.rate').find('tr').eq(2).find('td').eq(2).text();
                        // console.log($rate + ', ' + $USDmoney + '\t');

                        if ($rate && $USDmoney) {
                            currencys.push($currency);
                            rechargeMoneys.push($rechargeMoney);
                            rates.push($rate);
                            USDmoneys.push($USDmoney);

                            if (rates.length === queryCurrencys.length) {
                                // console.log(queryCurrencys + ',' + rates + ', ' + USDmoneys);
                                resolve({
                                    currencys: currencys,
                                    rechargeMoneys: rechargeMoneys,
                                    rates: rates,
                                    USDmoneys: USDmoneys
                                });
                            }
                        }
                    });
            }
        });
    };

    let queryRateResults = await queryRate();  // 发起请求，等待回调
    // console.log(queryRateResults);
    return queryRateResults;
};

module.exports = {
    queryOrders,
    summaryOrders
};
