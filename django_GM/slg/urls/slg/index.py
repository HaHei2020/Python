#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/17 11:28
# @Author  : HaHei

'''index中，涉及的子路由'''
from django.conf.urls import url
from slg.views.slg import index

urlpatterns = [
	url(r'^$', index.index, name='index'),   #访问 localhost:3000
	url(r'^index$', index.index, name='index'),   #访问 localhost:3000/index
]