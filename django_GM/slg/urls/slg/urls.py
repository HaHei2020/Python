#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/15 21:12
# @Author  : HaHei

'''总路由，路由分发地'''
from django.conf.urls import url, include

urlpatterns = [
	url(r'^', include('slg.urls.slg.index')),                         # index 相关路由
	url(r'^', include('slg.urls.slg.login')),                         # 登录，登出相关路由
	url(r'^', include('slg.urls.slg.slg_users_tem')),                 # 玩家管理 相关路由
	url(r'^', include('slg.urls.slg.slg_alliance_tem')),              # 联盟管理 相关路由
	url(r'^', include('slg.urls.slg.slg_mail_notice_tem')),           # 邮件公告管理 相关路由
	url(r'^', include('slg.urls.slg.slg_order_tem')),                 # 订单管理 相关路由
	url(r'^', include('slg.urls.slg.slg_reward_tem')),                # 礼包奖励管理 相关路由
	url(r'^', include('slg.urls.slg.slg_service_reply_tem')),         # 玩家反馈管理 相关路由
	url(r'^', include('slg.urls.slg.slg_user_log_tem')),              # 玩家日志管理 相关路由
	url(r'^', include('slg.urls.slg.slg_server_tem')),                # 服务器管理 相关路由
	url(r'^', include('slg.urls.slg.slg_manager_tem')),               # 管理员管理 相关路由
	url(r'^', include('slg.urls.slg.error')),                      # 错误页面 相关路由
]

# urlpatterns = [
# 	url(r'^slg/', include('slg.urls.slg.index')),  # index 相关路由, 'slg/'为：app名字
# ]






'''路由写到一起'''
# from django.conf.urls import url
# from slg.views.slg import index
# from slg.views.slg import login

# urlpatterns = [
# 	url(r'^login$', login.login, name='login'),
# 	url(r'^logout$',login.logout, name='logout'),
# 	url(r'^index$', index.index, name='index'),
# ]