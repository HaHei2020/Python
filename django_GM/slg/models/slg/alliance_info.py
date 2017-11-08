#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/25 15:04
# @Author  : HaHei
from . import db_models as db
import traceback

# 查询联盟
def db_queryAlliance(serverID, allianceName):
	result = db.Allianceinfo.objects.filter(zoneid=serverID, alliancename=allianceName)
	try:
		
		if result.count() == 0:
			return 0
		
		else:
			return result
		
	except BaseException:
		print(traceback.format_exc())
		return -1

# 查询联盟成员
def db_queryAllianceMembers(serverID, allianceName):
	result = db.Playerinfo.objects.filter(zoneid=serverID, playeralliance=allianceName)
	
	try:
		
		if result.count() == 0:
			return 0
		
		else:
			return result
		
	except BaseException:
		print(traceback.format_exc())
		return -1
	

# 修改联盟信息
def db_changeAllianceInfo(serverID, allianceName, changeType, changeAmount):
	if changeType == 'alliancePoint':
		currentAmount = db.Allianceinfo.objects.filter(zoneid=serverID, alliancename=allianceName).get().alliancepoint
		currentAmount += float(changeAmount)
		if currentAmount < 0:
			return -2
		
		else:
			result = db.Allianceinfo.objects.filter(zoneid=serverID, alliancename=allianceName).update(alliancepoint=currentAmount)
			return result
	
	elif changeType == 'allianceHonor':
		currentAmount = db.Allianceinfo.objects.filter(zoneid=serverID, alliancename=allianceName).get().alliancehonor
		currentAmount += float(changeAmount)
		if currentAmount < 0:
			return -2
		
		else:
			result = db.Allianceinfo.objects.filter(zoneid=serverID, alliancename=allianceName).update(alliancehonor=currentAmount)
			return result
