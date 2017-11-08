#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/7 14:12
# @Author  : HaHei

from . import db_models as db
import traceback

# 阶段奖励
'''
    省略
'''

# 写入 限时礼包
def db_send_limitGifts(giftID, startTime, endTime, buyNumbers, sender):
    try:
        db.Gift.objects.create(giftid=giftID, starttime=startTime, endtime=endTime, buynumbers=buyNumbers, sender=sender, status='1')
    except Exception as e:
        #print(e)
        return e  # 失败，输出异常
    else:
        return 1   # 成功

# 查询 限时礼包
def db_query_limitGifts():
    try:
        result = db.Gift.objects.all()
    except Exception as e:
        return e
    else:
        return result

# 删除 限时礼包
def db_delete_limitGifts(deleteGiftID, deleteStartTime, deleteEndTime, deleteBuyNumbers):
    try:
        result = db.Gift.objects.filter(giftid=deleteGiftID, starttime=deleteStartTime, endtime=deleteEndTime, buynumbers=deleteBuyNumbers).delete()
    except Exception as e:
        return e
    else:
        #print(result)
        return 1
