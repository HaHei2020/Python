#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/26 18:39
# @Author  : HaHei
# 公告管理

from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render
import json
from slg.models.slg.mail_info import db_sendMail, db_queryLogs

# GET 渲染页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_mail_notice_tem', login_url='slg:get_permissionDenied')
def get_slg_mail_notice_tem(request):
	perms = User.get_all_permissions(request.user)
	context = {"perms": perms}
	return render(request, 'slg/slg_mail_notice_tem.html', context=context)

# 发送邮件 请求
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_mail_notice_tem', login_url='slg:get_permissionDenied')
def sendMail(request):
	zoneID = request.POST['zoneID']
	language = request.POST['language']
	mailType = request.POST['mailType']
	lostDay = request.POST['lostDay']
	playerLowLevel = request.POST['playerLowLevel']
	playerHighLevel = request.POST['playerHighLevel']
	sendTime = request.POST['sendTime']
	nickname = request.POST['nickname']
	mailTitle = request.POST['mailTitle']
	mailContent = request.POST['mailContent']
	mailVersion = request.POST['mailVersion']
	remarks = request.POST['remarks']
	sender = request.POST['sender']
	rewardsList = request.POST['rewardsList']

	zoneID = json.loads(zoneID)
	language = json.loads(language)
	rewardsList = json.loads(rewardsList)
	print(zoneID, language, mailType, lostDay, playerLowLevel, playerHighLevel, sendTime, nickname, mailTitle, mailContent, mailVersion, remarks, sender, rewardsList)
	# aa = json.loads(rewardsList)
	# print(aa[0]['rewardsType'])
	insertResult = db_sendMail(zoneID, language, mailType, lostDay, playerLowLevel, playerHighLevel, sendTime, nickname, mailTitle, mailContent, mailVersion, remarks, sender, rewardsList)
	if insertResult == 0:
		return HttpResponse('0')
	else:
		return HttpResponse('-1')

# 查询邮件 请求
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_mail_notice_tem', login_url='slg:get_permissionDenied')
def queryLogs(request):
	queryLogsType = request.POST['queryLogsType']

	queryResult = db_queryLogs(queryLogsType)
	if queryResult == 0:
		return HttpResponse('0')

	elif queryResult == -1:
		return HttpResponse('-1')

	else:
		context = {"queryLogsType": queryLogsType, "queryResult": queryResult}
		return render(request, 'slg/mail_list.html', context=context)

