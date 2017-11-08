#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/7 16:17
# @Author  : HaHei
# 客服反馈

from . import db_models as db

# GET 渲染 玩家反馈 表格
def db_query_feedback(postType):
    if postType == '0':
        try:
            result = db.Feedback.objects.all().values()
        except Exception as e:
            return 0
        else:
            return result

    else:
        try:
            result = db.Feedback.objects.filter(type=postType).values()
        except Exception as e:
            return 0
        else:
            return result

# 提交 回复
def db_reply_feedback(postData, replyTime, replyer):
    replyZoneID = postData['replyZoneID']
    replyUID = postData['replyUID']
    replyTitle = postData['replyTitle']
    replyContent = postData['replyContent']
    mid = postData['mid']

    try:
        db.Feedback.objects.filter(mid=mid).update(replytitle=replyTitle, replycontent=replyContent, replytime=replyTime, replyer=replyer)
    except Exception as e:
        return e
    else:
        return 1
