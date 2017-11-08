#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/10/23 18:42
# @Author  : HaHei
from . import db_models as db
from slg.others.requestToUSD import requestUSD
import time
import traceback

# 查询订单
def db_queryOrder(data):
    ''' 充值时间 '''
    rechargeStartTime = toTimeStamp(data['rechargeStartTime'])
    rechargeEndTime = toTimeStamp(data['rechargeEndTime'])
    result = db.TbBills.objects.filter(purchasetime__gte=rechargeStartTime, purchasetime__lte=rechargeEndTime).values()
    ''' 区服 '''
    if data['zoneID']:
        result = result.filter(zoneid=data['zoneID'])
    ''' 平台 '''
    if data['channelID']:
        result = result.filter(os=data['channelID'])
    ''' 支付方式 '''
    if data['payType']:
        result = result.filter(purchaseplatform=data['payType'])
    ''' 订单状态 '''
    if data['orderState']:
        result = result.filter(purchasestate=data['orderState'])
    ''' 国家 '''
    if data['country']:
        result = result.filter(countrycode=data['country'])
    ''' 货币类型 '''
    if data['currency']:
        result = result.filter(pricecurrencycode=data['currency'])
    ''' 游戏订单号 '''
    if data['gameOrderId']:
        result = result.filter(gameorderid=data['gameOrderId'])
    ''' 渠道订单号 '''
    if data['channelOrder']:
        result = result.filter(orderid=data['channelOrder'])
    ''' UID '''
    if data['UID']:
        result = result.filter(uid=data['UID'])
    ''' 充值金额 '''
    if data['rechargeStartMoney'] and data['rechargeEndMoney']:
        result = result.filter(priceamount__gte=data['rechargeStartMoney'], priceamount__lte=data['rechargeEndMoney'])
    ''' 到账时间 '''
    if data['inAccountStartTime'] and data['inAccountEndTime']:
        inAccountStartTime = toTimeStamp(data['inAccountStartTime'])
        inAccountEndTime = toTimeStamp(data['inAccountEndTime'])
        result = result.filter(inaccounttime__gte=inAccountStartTime, inaccounttime__lte=inAccountEndTime)

    try:

        if result.count() == 0:
            return 0

        else:
            return result

    except BaseException:
        print(traceback.format_exc())
        return -1

def requestsOrderSum(postOrderSumData):
    queryResult = db_queryOrder(postOrderSumData)
    if queryResult == 0:
        return 0
    elif queryResult == -1:
        return -1
    else:
        ''' 当 有查询结果时，才执行下面的汇总，以及发起 汇率请求 '''
        currencyData = []     #汇总结果，如：[{'USD': '555'}]
        queriedCurrency = []  #记录 已经查询过的 货币
        j = -1  #第2个循环的 计数器
        for data in queryResult:
            j += 1
            fromCurrency = data['pricecurrencycode']  # 本地货币
            fromCurrencyAmount = data['priceamount']  # 本地货币金额
            rechargePlayers = data['uid']             # 充值玩家（UID识别）
            rechargePlayersCount = 1                  # 充值人数计数（去重）
            rechargeOrders = 1                        # 充值订单数
            #print('j======= ', j)
            if fromCurrency not in queriedCurrency:  # 只有不在 queriedCurrency 里的，才可以 进行循环 汇总求和
                rechargePlayersSet = set()  # set集合，需要 集合中的元素不能有重复的
                ''' 双循环 '''
                for i in range(j+1, len(queryResult)):
                    #print(i)  # 0-310
                    if fromCurrency == queryResult[i]['pricecurrencycode']:
                        fromCurrencyAmount += queryResult[i]['priceamount']     # 充值金额 汇总
                        rechargeOrders += 1                                     # 充值订单数 汇总
                        rechargePlayersSet.add(queryResult[i]['uid'])           # 向Set中 添加元素
                ''' 去重人数计算，遍历Set集合 '''
                for player in rechargePlayersSet:
                    if rechargePlayers != player:
                        rechargePlayersCount += 1                                # 充值人数计数（去重）汇总
                queriedCurrency.append(fromCurrency)
                currencyData.append({"fromCurrency": fromCurrency, "fromCurrencyAmount": fromCurrencyAmount, "rechargePlayersCount": rechargePlayersCount, "rechargeOrders": rechargeOrders})
        # print(currencyData)
        return requestUSD(currencyData)



# 格式化时间 --> struct_time(时间元祖) --> 时间戳 转换方法
def toTimeStamp(times):
    structTime = time.strptime(times, "%Y-%m-%d %H:%M:%S")
    timeStramp = time.mktime(structTime)
    return timeStramp
