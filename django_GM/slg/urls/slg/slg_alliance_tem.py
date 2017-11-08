#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:12
# @Author  : HaHei
'''联盟管理，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_alliance_tem

urlpatterns = [
	url(r'^slg_alliance_tem$', slg_alliance_tem.get_alliance_tem, name='get_alliance_tem'),     # 获取 联盟管理页面
	url(r'^queryAlliance$', slg_alliance_tem.queryAlliance, name='queryAlliance'),              # 查询 联盟
	url(r'^queryAllianceMembers$', slg_alliance_tem.queryAllianceMembers, name='queryAllianceMembers'), # 查询 联盟成员
	url(r'^changeAllianceInfo$', slg_alliance_tem.changeAllianceInfo, name='changeAllianceInfo'),  # 修改 联盟信息
	
]