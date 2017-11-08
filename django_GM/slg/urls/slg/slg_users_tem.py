#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:11
# @Author  : HaHei
'''玩家管理，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_users_tem

urlpatterns = [
	url(r'^slg_users_tem$', slg_users_tem.get_users_tem, name='get_slg_users_tem'),  # 获取 玩家管理页面
	url(r'^queryPlayer$', slg_users_tem.queryPlayer, name='queryPlayer'),        # 查询 玩家信息
	url(r'^sendReward$', slg_users_tem.sendRewards, name='sendReward'),          # 发送奖励

]