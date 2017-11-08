#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/2 16:44
# @Author  : HaHei
# 错误页面 集合  403  404  500
from django.conf.urls import url
from slg.views.slg import error

urlpatterns = [
    url(r'^permissionDenied$', error.get_permissionDenied, name='get_permissionDenied'),    # 403页面
]