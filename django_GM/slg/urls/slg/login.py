#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/17 11:28
# @Author  : HaHei

'''登录，登出，相关子路由'''
from django.conf.urls import url
from slg.views.slg import login

urlpatterns = [
	url(r'^login$', login.login, name='login'),
	url(r'^logout$', login.logout, name='logout'),
]