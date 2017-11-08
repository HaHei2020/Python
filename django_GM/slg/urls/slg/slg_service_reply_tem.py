#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:14
# @Author  : HaHei
'''客服反馈，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_service_reply_tem

urlpatterns = [
    url(r'^slg_service_reply_tem$', slg_service_reply_tem.get_slg_service_reply_tem, name='get_slg_service_reply_tem'),   # GET 渲染页面
    url(r'^feedback$', slg_service_reply_tem.get_feedback, name='get_feedback'),           # GET 玩家反馈 表格
    url(r'^replyFeedback$', slg_service_reply_tem.post_reply_feedback, name='post_reply_feedback'),   # 提交 回复

]