#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/21 13:06
# @Author  : HaHei

import json
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render, HttpResponseRedirect
from Alipay_PC.models.alipay import create_order_db, query_order_pay

# 渲染 订单 页面
@require_http_methods(["GET"])
def get_order_views(request):
    return render(request, 'order.html')

# 发起 支付
@require_http_methods(["POST"])
def create_order(request):
    product_name = request.POST['product_name']
    buy_username = request.POST['buy_username']
    product_price = request.POST['product_price']
    buy_num = request.POST['buy_num']
    total_price = request.POST['total_price']
    postData = {
        "product_name": product_name,
        "buy_username": buy_username,
        "product_price": product_price,
        "buy_num": buy_num,
        "total_price": total_price
    }
    return_params_str_urlencode = create_order_db(postData)  # 创建订单，写入数据库，并按照 支付宝要求 进行签名 和 拼接参数
    url = return_params_str_urlencode[0] + '?' + str(return_params_str_urlencode[1])
    return HttpResponseRedirect(url)

# 查询 订单状态
@require_http_methods(["POST"])
def query_order_status(request):
    queryData = json.loads(request.body, encoding='utf-8')
    #print(queryData)
    msg = query_order_pay(queryData)
    return HttpResponse(msg)

# 渲染 订单成功 页面
@require_http_methods(["GET"])
def get_order_success(request):
    return render(request, 'Success.html')

# 渲染 订单失败 页面
@require_http_methods(["GET"])
def get_order_fail(request):
    return render(request, 'fail.html')

# 渲染 订单出错 页面
@require_http_methods(["GET"])
def get_order_error(request):
    return render(request, 'error.html')