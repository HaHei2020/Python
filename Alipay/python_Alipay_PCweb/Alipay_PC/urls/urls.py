#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/21 10:53
# @Author  : HaHei

from django.conf.urls import url
from Alipay_PC.views import order_views

urlpatterns = [
    url(r'^$', order_views.get_order_views, name='order'),                      # index、order页面
    url(r'^Success$', order_views.get_order_success, name='order_success'),     # 订单成功
    url(r'^fail$', order_views.get_order_fail, name='order_fail'),              # 订单失败
    url(r'^error', order_views.get_order_error, name='order_error'),            # 订单出错
    url(r'^createOrder$', order_views.create_order, name='create_order'),       # 创建订单
    url(r'^queryOrder$', order_views.query_order_status, name='query_order'),   # 查询订单

]
