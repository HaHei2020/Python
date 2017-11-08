#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/18 15:23
# @Author  : HaHei
# 玩家管理

from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render
from slg.models.slg.play_info import db_queryPlayer, db_updatePlayer

# GET 渲染页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_users_tem', login_url='slg:get_permissionDenied')
def get_users_tem(request):
	perms = User.get_all_permissions(request.user)
	context = {"perms": perms}
	return render(request, 'slg/slg_users_tem.html', context=context)

# 查询玩家信息
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_users_tem', login_url='slg:get_permissionDenied')
def queryPlayer(request):
	queryServerID = request.POST['queryServerID']
	queryType = request.POST['queryType']
	queryInput = request.POST['queryInput']
	
	queryResult = db_queryPlayer(queryServerID, queryType, queryInput)
	if queryResult == 0:
		return HttpResponse('0')
	
	elif queryResult == -1:
		return HttpResponse('-1')
	
	else:
		context = {"queryResult": queryResult}
		return render(request, 'slg/slg_list_table.html', context=context)

# 发送奖励
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_users_tem', login_url='slg:get_permissionDenied')
def sendRewards(request):
	queryServerID = request.POST['queryServerID']
	queryType = request.POST['queryType']
	queryInput = request.POST['queryInput']
	sendRewardType = request.POST['sendRewardType']
	sendRewardAmount = request.POST['sendRewardAmount']
	
	sendResult = db_updatePlayer(queryServerID, queryType, queryInput, sendRewardType, sendRewardAmount)
	
	if sendResult == 1:
		return HttpResponse('1')
	else:
		return HttpResponse('-1')
	
	