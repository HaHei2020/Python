#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/10/21 19:12
# @Author  : HaHei

from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render
from slg.models.slg.order_info import db_queryOrder, requestsOrderSum
import json
import time


# GET 渲染页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_order_tem', login_url='slg:get_permissionDenied')
def get_slg_order_tem(request):
    perms = User.get_all_permissions(request.user)
    ''' 读取 json文件 '''
    with open("slg/others/country", "r") as f:
        datas = json.loads(f.read())
    context = {"datas":  datas, "perms": perms}
    return render(request, 'slg/slg_order_tem.html', context=context)

# 查询订单 请求
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_order_tem', login_url='slg:get_permissionDenied')
def query_order(request):
    postData = request.POST   # 获取 bootstrap-table post请求的数据，直接POST获取！
    queryResult = db_queryOrder(postData)
    if queryResult == 0:
        return HttpResponse('0')

    elif queryResult == -1:
        return HttpResponse('-1')

    else:
        '''服务端分页时，前端需要传回：limit（每页需要显示的数据量），offset（分页时 数据的偏移量，即第几页）'''
        '''mysql 利用 limit语法 进行分页查询'''
        '''服务端分页时，需要返回：total（数据总量），rows（每行数据）  如： {"total": total, "rows": []}'''
        returnData = {"rows": []}
        with open("slg/others/country", "r") as f:
            datas = json.loads(f.read())  # 直接读出来，是dic对象，用key，value获取。。。上面的是转换为 对象了，可以用 “.” 获取
        '''遍历 查询结果集'''
        for results in queryResult:
            '''遍历 country.json 输出 订单状态'''
            for data in datas['order']:
                if data['stateNum'] == str(results['purchasestate']):
                    orderStateResult = data['stateResult']
            '''遍历 country.json 输出 用户手机操作系统'''
            for data in datas['channel']:
                if data['channelID'] == str(results['os']):
                    channelName = data['channelName']
            '''遍历 country.json 输出 充值平台'''
            for data in datas['payType']:
                if data['payTypeNum'] == str(results['purchaseplatform']):
                    payTypeResult = data['payTypeResult']
            '''遍历 country.json 输出 国家名称'''
            for data in datas['country']:
                if data['shorthand'] == results['countrycode']:
                    countryName = data['name']
            '''遍历 country.json 输出 货币名称'''
            for data in datas['currency']:
                if data['shorthand'] == results['pricecurrencycode']:
                    currencyName = data['name']

            returnData['rows'].append({
                "gameorderid": results['gameorderid'],
                "orderid": results['orderid'],
                "nickname": results['nickname'],
                "gameName": "Wrath Of War",
                "ZoneId": results['zoneid'],
                "Os": channelName,
                "PurchasePlatform": payTypeResult,
                "PurchaseTimes": results['purchasetimes'],
                "PriceAmount": str(results['priceamount']),
                "PurchaseState": orderStateResult,
                "PurchaseTime": time.strftime("%Y-%m-%d %H:%M:%S %Z", time.gmtime(results['purchasetime'])),
                "InAccountTime": time.strftime("%Y-%m-%d %H:%M:%S %Z", time.gmtime(results['inaccounttime'])),
                "RegisterTime": time.strftime("%Y-%m-%d %H:%M:%S %Z", time.gmtime(results['registertime'])),
                "AccountId": results['accountid'],
                "Uid": results['uid'],
                "ProductType": results['producttype'],
                "GiftId": results['giftid'],
                "CountryCode": countryName,
                "PriceCurrencyCode": currencyName
            })
        #json.dumps({"rows": [{"gameorderid": 1}, {"gameorderid": 22}]})
        return HttpResponse(json.dumps(returnData))

# 订单汇总 请求
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_order_tem', login_url='slg:get_permissionDenied')
def order_sum(request):
    postOrderSumData = request.POST
    requestResults = requestsOrderSum(postOrderSumData)
    #print(requestResults)
    if requestResults == 0:
        return HttpResponse('0')

    elif requestResults == -1:
        return HttpResponse('-1')
    else:
        returnData = {"rows": []}
        totalUSD = 0
        for result in requestResults:
            totalUSD += float(result['toUSDAmount'])
            returnData['rows'].append({
                "fromCurrency": result['fromCurrency'],
                "rechargePlayersCount": result['rechargePlayersCount'],
                "rechargeOrders": result['rechargeOrders'],
                "fromCurrencyAmount": result['fromCurrencyAmount'],
                "rate": result['rate'],
                "toUSDAmount": result['toUSDAmount']
            })
        ''' 将 最终 美元的数据结果，放到 去重人数 那一列，可以合并单元格（左 --> 右）    %.2f float保留2位小数 '''
        returnData['rows'].append({"fromCurrency": "美元总计", "rechargePlayersCount": '%.2f' % totalUSD})
    return HttpResponse(json.dumps(returnData))
