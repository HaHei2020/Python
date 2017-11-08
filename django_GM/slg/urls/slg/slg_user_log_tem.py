#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:14
# @Author  : HaHei
'''玩家日志管理，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_user_log_tem

urlpatterns = [
    url(r'^slg_user_log_tem$', slg_user_log_tem.get_slg_user_log_tem, name='get_slg_user_log_tem'),  # GET 获取 玩家日志 页面
    url(r'^queryPlayerLog$', slg_user_log_tem.query_playerLog, name='query_playerLog'),    # 查询 玩家特征 日志
    url(r'^queryLostPlayer$', slg_user_log_tem.query_lostPlayer, name='query_lostPlayer'),  # 查询 流失玩家 名单

]