#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:13
# @Author  : HaHei
'''礼包管理，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_reward_tem

urlpatterns = [
    url(r'^slg_reward_tem$', slg_reward_tem.get_slg_reward_tem, name='get_slg_reward_tem'),     # GET 获取 礼包页面
    url(r'^sendLevelRewards$', slg_reward_tem.send_levelRewards, name='send_levelRewards'),     # 阶段奖励
    url(r'^limitGifts$', slg_reward_tem.send_limitGifts, name='send_limitGifts'),               # 限时礼包
    url(r'^deleteGifts$', slg_reward_tem.delete_limitGifts, name='delete_limitGifts'),          # 删除 限时礼包

]