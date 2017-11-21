#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/14 16:25
# @Author  : HaHei
# 请求 注册表 ip对应国家

import requests
import re
from bs4 import BeautifulSoup as bf

def requestCountry(ip):
    url = 'http://ip138.com/ips138.asp?ip=' + ip + '&action=2'
    r = requests.get(url)
    # exp = '\s*<tr>\s*<td align="center">\s*<h3>([^<>]*)</h3>\s*</td>\s*</tr>\s*<tr>\s*<td align="center">\s*<h1>([^<>]*)</h1>\s*</td>\s*</tr>' \
    #       '\s*<tr>\s*<td align="center">\s*<ul class="ul1">\s*<li>([^<>]*)</li>'
    if r.status_code == 200:
        #r.encoding = 'utf-8'
        try:
            responseText = r.text.encode('iso-8859-1').decode('gbk', 'ignore')
            data = bf(responseText, "html.parser")
            ul = data.find("ul",attrs={"class": "ul1"})
            li = ul.find("li")
            country = li.text.split("：")[1]
        except AttributeError as e:
            print('aaa: ', responseText)

        # data = responseText.split('<table width="80%"  border="0" align="center" cellpadding="0" cellspacing="0">')[1]
        # result = re.match(exp, data)
        # #print(data)
        # #print(result.group(3))
        # country = result.group(3).split('：')[1]
    #print(country)
    return country
