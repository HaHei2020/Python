#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/21 14:23
# @Author  : HaHei
# 联盟管理

from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render
from slg.models.slg.alliance_info import db_queryAlliance, db_queryAllianceMembers, db_changeAllianceInfo

# GET 渲染页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_alliance_tem', login_url='slg:get_permissionDenied')
def get_alliance_tem(request):
	perms = User.get_all_permissions(request.user)
	context = {"perms": perms}
	return render(request, 'slg/slg_alliance_tem.html', context=context)

# 查询联盟信息
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_alliance_tem', login_url='slg:get_permissionDenied')
def queryAlliance(request):
	serverID = request.POST['serverID']
	allianceName = request.POST['allianceName']
	
	queryResult = db_queryAlliance(serverID, allianceName)
	
	if queryResult == 0:
		return HttpResponse('0')
	
	elif queryResult == -1:
		return HttpResponse('-1')
	
	else:
		context = {"queryResult": queryResult}
		return render(request, 'slg/slg_alliance_list_table.html', context=context)
	
	
# 查询联盟成员信息
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_alliance_tem', login_url='slg:get_permissionDenied')
def queryAllianceMembers(request):
	serverID = request.POST['serverID']
	allianceName = request.POST['allianceName']
	
	queryAllianceResult = db_queryAlliance(serverID, allianceName)
	if queryAllianceResult == 0:
		return HttpResponse('00')
	
	elif queryAllianceResult == -1:
		return HttpResponse('-1')
	
	else:
		queryAllianceMembersResult = db_queryAllianceMembers(serverID, allianceName)
		if queryAllianceMembersResult == 0:
			return HttpResponse('0')
		
		elif queryAllianceMembersResult == -1:
			return HttpResponse('-1')
		
		else:
			context = {"queryMembersResult": queryAllianceMembersResult}
			return render(request, 'slg/slg_alliance_list_table.html', context=context)


# 修改联盟信息
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_alliance_tem', login_url='slg:get_permissionDenied')
def changeAllianceInfo(request):
	serverID = request.POST['serverID']
	allianceName = request.POST['allianceName']
	changeType = request.POST['changeType']
	changeAmount = request.POST['changeAmount']

	queryAllianceResult = db_queryAlliance(serverID, allianceName)
	if queryAllianceResult == 0:
		return HttpResponse('00')
	
	elif queryAllianceResult == -1:
		return HttpResponse('-1')
	
	else:
		changeAllianceInfoResult = db_changeAllianceInfo(serverID, allianceName, changeType, changeAmount)
		if changeAllianceInfoResult == -1:
			return HttpResponse('-1')
		
		elif changeAllianceInfoResult == -2:
			return HttpResponse('-2')
		
		elif changeAllianceInfoResult == 1:
			return HttpResponse('1')
