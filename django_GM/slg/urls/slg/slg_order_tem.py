#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:13
# @Author  : HaHei
'''订单管理，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_order_tem

urlpatterns = [
    url(r'^get_order_tem$', slg_order_tem.get_slg_order_tem, name='get_slg_order_tem'),      # 获取 订单页面
    url(r'^queryOrder$', slg_order_tem.query_order, name='query_order'),                     # 查询 订单请求
    url(r'^orderSum$', slg_order_tem.order_sum, name='order_sum'),                          # 订单汇总 请求

]