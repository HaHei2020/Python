#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/7 16:16
# @Author  : HaHei
# 客服反馈

from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render
from slg.models.slg.slg_service_reply_tem import db_query_feedback, db_reply_feedback
import json
import datetime
import time

# GET 渲染页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_service_reply_tem', login_url='slg:get_permissionDenied')
def get_slg_service_reply_tem(request):
    perms = User.get_all_permissions(request.user)
    context = {"perms": perms}
    return render(request, 'slg/slg_service_reply_tem.html', context=context)

# GET 玩家反馈 表格
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_service_reply_tem', login_url='slg:get_permissionDenied')
def get_feedback(request):
    postType = request.GET['type']
    queryResult = db_query_feedback(postType)

    returnData = {"rows": []}

    ''' 读取 json文件 '''
    with open("slg/others/country", "r") as f:
        datas = json.loads(f.read())

    ''' 循环结果 '''
    for qr in queryResult:
        for data in datas['feedbackType']:
            if int(data['typeNum']) == int(qr['type']):
                type = data['type']
        returnData['rows'].append({
            "uid": qr['uid'],
            "mid": qr['mid'],
            "zoneID": qr['zoneid'],
            "platID": qr['platform'],
            "channelID": qr['channel'],
            "language": qr['language'],
            "type": type,
            "summary": qr['summary'],
            "content": qr['content'],
            "operateTime": qr['operatetime']
        })
    return HttpResponse(json.dumps(returnData, cls=DateEncoder))

# 提交 回复
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_service_reply_tem', login_url='slg:get_permissionDenied')
def post_reply_feedback(request):
    replyTime = time.strftime("%Y-%m-%d %H:%M:%S")
    replyer = str(request.user)
    result = db_reply_feedback(request.POST, replyTime, replyer)
    return HttpResponse(result)




# 重写 json 类
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')   # 针对 dateTime 类型
        elif isinstance(obj, date):
            return obj.strftime("%Y-%m-%d")
        else:
            return json.JSONEncoder.default(self, obj)