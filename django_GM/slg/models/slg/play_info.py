#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/20 12:52
# @Author  : HaHei
# 玩家管理

from . import db_models as db
import traceback

# 查询玩家信息
def db_queryPlayer(serverID, queryType, playerName):
	
	if queryType == 'name':
		result = db.Playerinfo.objects.filter(zoneid=serverID, nickname=playerName)
	elif queryType == 'uid':
		result = db.Playerinfo.objects.filter(zoneid=serverID, uid=playerName)
	
	try:
		if result.count() == 0:
			return 0
		else:
			return result
	except BaseException:
		print(traceback.format_exc())
		return -1
	
	
# 发送奖励
def db_updatePlayer(serverID, queryType, playerName, sendRewardType, sendRewardAmount):
	if queryType == 'name':
		
		if sendRewardType == 'diamonds':
			currentAmount = db.Playerinfo.objects.filter(zoneid=serverID, nickname=playerName).get().diamonds
			currentAmount += int(sendRewardAmount)
			if currentAmount < 0:
				return -1
			else:
				result = db.Playerinfo.objects.filter(zoneid=serverID, nickname=playerName).update(diamonds=currentAmount)
				return result
		
		if sendRewardType == 'coins':
			currentAmount = db.Playerinfo.objects.filter(zoneid=serverID, nickname=playerName).get().playergold
			currentAmount += int(sendRewardAmount)
			if currentAmount < 0:
				return -1
			else:
				result = db.Playerinfo.objects.filter(zoneid=serverID, nickname=playerName).update(playergold=currentAmount)
				return result
			
	elif queryType == 'uid':
		
		if sendRewardType == 'diamonds':
			currentAmount = db.Playerinfo.objects.filter(zoneid=serverID, uid=playerName).get().diamonds
			currentAmount += int(sendRewardAmount)
			if currentAmount < 0:
				return -1
			else:
				result = db.Playerinfo.objects.filter(zoneid=serverID, uid=playerName).update(
					diamonds=currentAmount)
				return result
		
		if sendRewardType == 'coins':
			currentAmount = db.Playerinfo.objects.filter(zoneid=serverID, uid=playerName).get().playergold
			currentAmount += int(sendRewardAmount)
			if currentAmount < 0:
				return -1
			else:
				result = db.Playerinfo.objects.filter(zoneid=serverID, uid=playerName).update(
					playergold=currentAmount)
				return result
			