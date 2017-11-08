#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/10/27 15:28
# @Author  : HaHei
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render
import time
import datetime
import json
from slg.models.slg.slg_user_log_tem import db_queryPlayerLog, db_queryLostPlayer

# GET 获取 玩家日志 页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_user_log_tem', login_url='slg:get_permissionDenied')
def get_slg_user_log_tem(request):
    perms = User.get_all_permissions(request.user)
    context = {"perms": perms}
    return render(request, 'slg/slg_user_log_tem.html', context=context)

# 查询 流失玩家 名单
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_user_log_tem', login_url='slg:get_permissionDenied')
def query_lostPlayer(request):
    postData = request.POST
    queryLostResult = db_queryLostPlayer(postData)

    returnData = {"rows":[]}
    if len(queryLostResult) == 0:
        return HttpResponse('0')

    else:
        for r in queryLostResult:
            returnData['rows'].append({
                "zoneID": r['izoneareaid'],
                "channelID": r['platid'],
                "nickname": r['nickname'],
                "uid": r['uid']
            })
        return HttpResponse(json.dumps(returnData, cls=DateEncoder))

# 查询 玩家特征 日志
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_user_log_tem', login_url='slg:get_permissionDenied')
def query_playerLog(request):
    postData = request.POST
    queryResult = db_queryPlayerLog(postData)
    #print(queryResult)
    returnData = {"rows": []}
    if queryResult == 0:
        return HttpResponse('0')

    elif queryResult == -1:
        return HttpResponse('-1')

    else:
        if postData['logType'] == 'PlayerFeaturesFlow':
            for result in queryResult:
                returnData['rows'].append({
                    "nickname": result['nickname'],
                    "uid": result['uid'],
                    "zoneID": result['izoneareaid'],
                    "channelID": result['platid'],
                    "playerLevel": result['level'],
                    "castleLevel": result['castlelevel'],
                    "statisticalDate": result['dteventtime'] + datetime.timedelta(days=1),
                    "lastLoginDate": result['dteventtime'].strftime("%Y-%m-%d"),
                    "onlineTime": result['onlinetime'],
                    "rechargeValue": result['recgargevalue'],
                    "diamondValue": result['demondvalue'],
                    "coinValue": result['coinvalue'],
                    "woodValue": result['woodvalue'],
                    "stoneValue": result['stonevalue'],
                    "steelValue": result['steelvalue'],
                    "vipLevel": result['viplevel'],
                    "vipStatus": result['vipstatus'],
                    "battleValue": result['battlevalue'],
                    "country": result['country'],
                    "language": result['language']
                })

        if postData['logType'] == 'BattleValueStructure':
            for result in queryResult:
                returnData['rows'].append({
                    "nickname": result['nickname'],
                    "uid": result['uid'],
                    "zoneID": result['izoneareaid'],
                    "channelID": result['platid'],
                    "playerLevel": result['level'],
                    "statisticalDate": result['dteventtime'] + datetime.timedelta(days=1),
                    "lastLoginDate": result['dteventtime'].strftime("%Y-%m-%d"),
                    "battleValue": result['battlevalue'],
                    "buildValue": result['buildvalue'],
                    "soldierValue": result['soldiervalue'],
                    "techValue": result['techvalue'],
                    "demnodProfile": result['demnodprofile'],
                    "equipmentProfile": result['equipmentprofile'],
                    "buildProfile": result['buildprofile'],
                    "talentProfile": result['talentprofile'],
                    "otherProfile": result['otherprofile']
                })

        if postData['logType'] == 'LogDetails':
            for result in queryResult:
                ''' 行为备注 相关数据 预处理 '''
                behaviorRemark = ''
                if result['behaviorRemark'] and isinstance(result['behaviorRemark'], dict):
                    for v,k in result['behaviorRemark'].items():    # 遍历 字典中的内容
                        behaviorRemark += '{v}: {k} &nbsp;&nbsp;&nbsp;'.format(v=v, k=k)
                elif len(result['behaviorRemark']) == 0:  # behaviorRemark 中 没有数据
                    behaviorRemark = ''
                else:   # behaviorRemark 中 存有 字符串类型 数据
                    behaviorRemark = result['behaviorRemark']

                returnData['rows'].append({
                    "nickname": result['nickname'],
                    "uid": result['uid'],
                    "zoneID": result['zoneID'],
                    "channelID": result['channelID'],
                    "playerLevel": result['level'],
                    "behaviorType": result['behaviorType'],
                    "resourceType": result['resourceType'],
                    "behaviorRemark": behaviorRemark,
                    "afterBehaviorAmount": result['afterBehaviorAmount'],
                    "behaviorAmount": result['behaviorAmount'],
                    "behaviorTime": result['dteventtime']
                })
        return HttpResponse(json.dumps(returnData, cls=DateEncoder))

''' 重写构造json类，遇到日期特殊处理，其余的用内置的就行。'''
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')   # 针对 dateTime 类型
        elif isinstance(obj, date):
            return obj.strftime("%Y-%m-%d")
        else:
            return json.JSONEncoder.default(self, obj)
