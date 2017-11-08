#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/10/25 16:01
# @Author  : HaHei
import requests
import re

def requestUSD(currencyData):
    requestResults = []
    for requestData in currencyData:
        getParams = {'from': requestData['fromCurrency'], 'to': 'USD', 'q': requestData['fromCurrencyAmount']}
        r = requests.get('http://m.ip138.com/huilv/huilv.asp', params=getParams)
        if r.status_code == 200:
            r.encoding = 'utf-8'   # 设定编码，否则会出现 乱码
            content = r.text
            #print(content)
            data=content.split('<table border="1" cellpadding="3" cellspacing="0" width="260" align="left"><tr align=center>')[1]
            #print(data)
            result = re.match('<td>([^<]*)</td><td>[^<]*</td><td>[^<]*</td></tr>\s*<tr align=center><td>([^<]*)</td><td>([^<]*)</td><td>([^<]*)</td>', data)
            #print('匹配结果：', result.group())
            fromCurrency = result.group(1) #获取 第1个 捕获组
            fromCurrencyAmount = result.group(2)
            rate = result.group(3)
            toUSDAmount = result.group(4)
            #print(fromCurrency, fromCurrencyAmount, rate, toUSDAmount)
            requestResults.append({"fromCurrency": fromCurrency, "fromCurrencyAmount": fromCurrencyAmount, "rate": rate, "toUSDAmount": toUSDAmount, "rechargePlayersCount": requestData['rechargePlayersCount'], "rechargeOrders": requestData['rechargeOrders']})
    #print(requestResults)
    return requestResults

