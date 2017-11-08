#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:14
# @Author  : HaHei
'''服务器管理，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_server_tem

urlpatterns = [
    url(r'^slg_server_tem$', slg_server_tem.get_slg_server_tem, name='get_slg_server_tem'),   # 获取 服务器管理页面
    url(r'^submitAndroidVersion$', slg_server_tem.post_AndroidVersion, name='post_AndroidVersion'),     # 版本，地址

]