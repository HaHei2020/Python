#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:15
# @Author  : HaHei
'''管理员管理，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_manager_tem

urlpatterns = [
    url(r'^slg_manager_tem$', slg_manager_tem.get_slg_manager_tem, name='get_slg_manager_tem'),  # GET 管理员管理 页面
    url(r'^createUser', slg_manager_tem.create_user, name='create_user'),     # 创建用户 激活/封停
    url(r'^deleteUser$', slg_manager_tem.delete_user, name='delete_user'),      # 删除用户
    url(r'^changePassword$', slg_manager_tem.change_password, name='change_password'),   # 修改密码
    url(r'^changePermission$', slg_manager_tem.change_permission, name='change_permission'),  # 修改权限

]