#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/10/20 14:45
# @Author  : HaHei
from . import db_models as db
import traceback

# 发送邮件
def db_sendMail(zoneID, language, mailType, lostDay, playerLowLevel, playerHighLevel, sendTime, nickname, mailTitle, mailContent, mailVersion, remarks, sender, rewardsList):
    result = db.Mail.objects.create(zoneid=zoneID, language=language, mailtype=mailType, \
                                    lostday=lostDay, lowerlevel=playerLowLevel, higherlevel=playerHighLevel, \
                                    sendtime=sendTime, nickname=nickname, mailtitle=mailTitle, mailcontent=mailContent, \
                                    mailversion=mailVersion, remarks=remarks, sender=sender, items=rewardsList, status=1)
    try:
        if result.id != '':
            return 0
    except Exception:
        print(traceback.format_exc())
        return -1

# 查询邮件
def db_queryLogs(queryLogsType):
    if 'Notice' in queryLogsType or 'chatMessage' in queryLogsType:
        result = db.Notice.objects.filter(noticetype=queryLogsType)
    else:
        result = db.Mail.objects.filter(mailtype=queryLogsType)

    try:
        if result.count() == 0:
            return 0

        else:
            return result

    except BaseException:
        print(traceback.format_exc())
        return -1

