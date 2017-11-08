#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/10/29 19:09
# @Author  : HaHei

from . import db_models as db
from operator import itemgetter
import xml.etree.ElementTree as ET
import datetime
import traceback

# 查询 流失玩家 名单
def db_queryLostPlayer(postData):
    zoneID = postData['zoneID']
    channelID = postData['channelID']
    lostDay = postData['lostDay']
    registerTime = postData['registerTime']
    loginTime = datetime.datetime.strptime(registerTime, "%Y-%m-%d") + datetime.timedelta(days=int(lostDay))  # datetime 类型
    loginTime = str(loginTime).split(' ')[0]    # 格式化，舍去后面的 00:00:00

    ''' 查 注册表 '''
    registerResult = db.Playerregister.objects.filter(izoneareaid=zoneID, platid=channelID, dteventtime__gte=(registerTime + ' 00:00:00'), dteventtime__lte=(registerTime + ' 23:59:59')).values('nickname', 'izoneareaid', 'platid', 'uid', 'dteventtime')
    #print(registerResult)

    ''' 查 登录表 '''
    loginResult = db.Playerlogin.objects.filter(izoneareaid='10005', platid='1', dteventtime__gte=(loginTime + ' 00:00:00'), dteventtime__lte=(loginTime + ' 23:59:59')).values('nickname', 'izoneareaid', 'platid', 'uid', 'dteventtime')
    #print(loginResult)

    ''' 求 在registerResult里，不在loginResult里 的结果 差集'''
    re = []  # 存储 差集结果
    lrs = set()  # 登录人数 去重
    for lr in loginResult:
        lrs.add(lr['uid'])
    for rr in registerResult:
        if rr['uid'] not in lrs:    # 在registerResult里，不在loginResult里
            re.append(rr)
    #print(re)
    return re

# 查询 玩家特征 日志
def db_queryPlayerLog(postData):
    logType = postData['logType']
    UID = postData['UID']
    ''' 事件时间  为  统计时间，  登录时间 为 统计时间-1 '''
    eventStartTime = postData['eventStartTime']  # str 类型
    eventEndTime = postData['eventEndTime']     # str 类型
    if logType == 'PlayerFeaturesFlow':
        if eventStartTime and eventEndTime:
            eventStartTime = datetime.datetime.strptime(eventStartTime, "%Y-%m-%d") - datetime.timedelta(days=1)  # datetime 类型
            eventEndTime = datetime.datetime.strptime(eventEndTime, "%Y-%m-%d") - datetime.timedelta(days=1)  # datetime 类型
            result = db.Playerfeaturesflow.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
        else:
            result = db.Playerfeaturesflow.objects.filter(uid=UID).values()

    elif logType == 'BattleValueStructure':
        if eventStartTime and eventEndTime:
            eventStartTime = datetime.datetime.strptime(eventStartTime, "%Y-%m-%d") - datetime.timedelta(days=1)  # datetime 类型
            eventEndTime = datetime.datetime.strptime(eventEndTime, "%Y-%m-%d") - datetime.timedelta(days=1)  # datetime 类型
            result = db.Battlevaluestructure.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
        else:
            result = db.Battlevaluestructure.objects.filter(uid=UID).values()

    elif logType == 'LogDetails':
        results = []    # 形如： [ {}, {}, {}, ... ]
        if eventStartTime and eventEndTime:
            ''' 查询  PlayerLogin '''
            result = db.Playerlogin.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
            for r in result:
                results.append({"name": "PlayerLogin", "uid": r['uid'], "nickname": r['nickname'], "channelID": r['platid'], "zoneID": r['izoneareaid'], "level": r['level'], "behaviorType": "登陆", "resourceType": "", "behaviorRemark": "", "afterBehaviorAmount": "", "behaviorAmount": "", "dteventtime": r['dteventtime']})

            ''' 查询  PlayerLogout '''
            result = db.Playerlogout.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
            for r in result:
                results.append({"name": "PlayerLogout", "uid": r['uid'], "nickname": r['nickname'], "channelID": r['platid'], "zoneID": r['izoneareaid'], "level": r['level'], "behaviorType": "登出", "resourceType": "", "behaviorRemark": "", "afterBehaviorAmount": "", "behaviorAmount": "", "dteventtime": r['dteventtime']})

            ''' 查询  MoneyFlow '''
            result = db.Moneyflow.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
            for r in result:
                if r['addorreduce'] == 0:
                    behaviorType = "获取"
                elif r['addorreduce'] == 1:
                    behaviorType = "消耗"
                results.append({"name": "MoneyFlow", "uid": r['uid'], "nickname": r['nickname'], "channelID": r['platid'], "zoneID": r['izoneareaid'], "level": r['level'], "behaviorType": behaviorType,  "resourceType": r['moneytype'], "behaviorRemark": r['reason'], "afterBehaviorAmount": r['aftermoney'], "behaviorAmount": r['money'], "dteventtime": r['dteventtime']})

            ''' 查询  ItemFlow '''
            result = db.Itemflow.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
            for r in result:
                if r['addorreduce'] == 0:
                    behaviorType = "获取"
                elif r['addorreduce'] == 1:
                    behaviorType = "消耗"
                results.append({"name": "ItemFlow", "uid": r['uid'], "nickname": r['nickname'], "channelID": r['platid'], "zoneID": r['izoneareaid'], "level": r['level'], "behaviorType": behaviorType,  "resourceType": r['itemtype'], "behaviorRemark": {"道具ID": r['itemid'], "用户道具ID": r['itid'], "消耗货币数量": r['imoney'], "原因": r['reason']}, "afterBehaviorAmount": r['aftercount'], "behaviorAmount": r['count'], "dteventtime": r['dteventtime']})

            ''' 查询  EventTimes '''
            result = db.Eventtimes.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
            for r in result:
                if r['type'] == 2:   # 攻打玩家
                    results.append({"name": "EventTimes", "uid": r['uid'], "nickname": r['nickname'], "channelID": r['platid'], "zoneID": r['izoneareaid'], "level": r['level'], "behaviorType": "", "resourceType": r['type'], "behaviorRemark": {"攻打方式": r['atkway'], "目标玩家等级": r['tarlevel'], "目标名称": r['tarname'], "结果": r['winning'], "目标城堡等级": r['tarcatslelevel']}, "afterBehaviorAmount": "", "behaviorAmount": "", "dteventtime": r['dteventtime']})
                elif r['type'] == 40: # 队列数量改变
                    results.append({"name": "EventTimes", "uid": r['uid'], "nickname": r['nickname'], "channelID": r['platid'], "zoneID": r['izoneareaid'], "level": r['level'], "behaviorType": "", "resourceType": r['type'], "behaviorRemark": {"目标": r['tartype'], "目标等级": r['tarlevel'], "目标名称": r['tarname'], "结果": r['winning'], "目标城堡等级": r['tarcatslelevel'], "数量": r['num'], "队列数量": r['numtwo']}, "afterBehaviorAmount": "", "behaviorAmount": "", "dteventtime": r['dteventtime']})
                else:
                    results.append({"name": "EventTimes", "uid": r['uid'], "nickname": r['nickname'], "channelID": r['platid'], "zoneID": r['izoneareaid'], "level": r['level'], "behaviorType": "",  "resourceType": r['type'], "behaviorRemark": {"目标玩家等级": r['tarlevel'], "名称": r['tarname'], "结果": r['winning'], "目标城堡等级": r['tarcatslelevel'], "数量": r['num'], "队列数量": r['numtwo']}, "afterBehaviorAmount": "", "behaviorAmount": "", "dteventtime": r['dteventtime']})

            ''' 查询  EventCount '''
            #result = db.Playerlogin.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
            #results.append(result)

            ''' 查询  PlayerLevelup '''
            # result = db.Playerlevelup.objects.filter(uid=UID, dteventtime__gte=eventStartTime, dteventtime__lte=eventEndTime).values()
            # for r in result:
            #     results.append({"name": "PlayerLevelup", "uid": r['uid'], "nickname": r['nickname'], "channelID": r['platid'], "zoneID": r['izoneareaid'], "level": r['level'], "behaviorType": "获取",  "resourceType": "领主经验", "behaviorRemark": "", "afterBehaviorAmount": r['aftercount'], "behaviorAmount": r['count'], "dteventtime": r['dteventtime']})

            ''' 对 结果集 中的 dtEventTime时间 进行 升序排序 '''
            results.sort(key=itemgetter('dteventtime'))
            try:
                XMLdatas = parseXML(results)   # 解析 XML，并返回结果
                #print(XMLdatas)
                if XMLdatas:
                    return XMLdatas
                else:
                    return 0
            except BaseException:
                print(traceback.format_exc())
                return -1


    try:
        if logType != 'LogDetails':
            if result.count() == 0:
                return 0
            else:
                return result

    except BaseException:
        print(traceback.format_exc())
        return -1

# 解析 XML
def parseXML(datas):
    tree = ET.parse('slg/others/slg_tlog.xml')
    root = tree.getroot()
    for data in datas:
        if data['name'] == 'MoneyFlow':
            for childs in root:    # 遍历 节点
                name = childs.attrib['name']
                if name == 'REASON':
                    for child in childs:  # 遍历 子节点
                        if str(data['behaviorRemark']) == str(child.attrib['value']):
                            data['behaviorRemark'] = child.attrib['desc']   # 描述替换

                if name == 'MONEYTYPE':
                    for child in childs:
                        if str(data['resourceType']) == str(child.attrib['value']):
                            data['resourceType'] = child.attrib['desc']

        if data['name'] == 'ItemFlow':
            for childs in root:
                name = childs.attrib['name']
                if name == 'REASON':
                    for child in childs:
                        if str(data['behaviorRemark']['原因']) == str(child.attrib['value']):
                            data['behaviorRemark']['原因'] = child.attrib['desc']

                if name == 'ITEMTYPE':
                    for child in childs:
                        if str(data['resourceType']) == str(child.attrib['value']):
                            data['resourceType'] = child.attrib['desc']

        if data['name'] == 'EventTimes':
            for childs in root:
                name = childs.attrib['name']
                if name == 'TYPE':
                    for child in childs:
                        if str(data['resourceType']) == str(child.attrib['value']):
                            data['resourceType'] = child.attrib['desc']

    #print(datas)
    return datas
