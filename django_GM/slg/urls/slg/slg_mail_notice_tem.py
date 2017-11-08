#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:12
# @Author  : HaHei
'''公告邮件管理，相关子路由'''
from django.conf.urls import url
from slg.views.slg import slg_mail_notice_tem

urlpatterns = [
	url(r'^slg_mail_notice_tem$', slg_mail_notice_tem.get_slg_mail_notice_tem, name='get_slg_mail_notice_tem'),  # 获取 公告管理页面
	url(r'^sendMail$', slg_mail_notice_tem.sendMail, name='sendMail'), # 发送邮件
	url(r'^queryLogs$', slg_mail_notice_tem.queryLogs, name='queryLogs'), # 查询邮件

]