#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/3 21:11
# @Author  : HaHei
# 礼包奖励

from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render
from slg.models.slg.slg_reward_tem import db_query_limitGifts, db_send_limitGifts, db_delete_limitGifts
import time
from django.core.files import uploadedfile

# GET 渲染页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_reward_tem', login_url='slg:get_permissionDenied')
def get_slg_reward_tem(request):
    perms = User.get_all_permissions(request.user)
    queryResult = db_query_limitGifts()
    context = {"perms": perms, "queryResult": queryResult}
    return render(request, 'slg/slg_reward_tem.html', context=context)

# 阶段奖励
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_reward_tem', login_url='slg:get_permissionDenied')
def send_levelRewards(request):
    '''
    ip = request.META['REMOTE_ADDR']   # 获取ip
    '''
    f = request.FILES.get('playerList', None)  # 获取 上传文件，如果没有，默认为 None

    ''' 写入文件 bytes方式 '''
    fileName = 'levelRewards_' + str( int( time.time()*1000 - 8*60*60*1000 ) ) + '.txt'   # UTC时间戳，ms，int取整
    path = 'slg/uploads/' + fileName
    with open(path, 'w') as destination:  # 写方式
        for chunk in f.chunks():
            destination.write( chunk.decode() )    # python3 中，直接 将 bytes 转换为 utf-8 就行，直接 decode()，没有encode了！！
        destination.close()

    ''' 读取文件 '''
    playerList = []    # 形如： [ [10000121321, 1000230, 20], [10002133222, 1000222, 10;] ]
    with open(path, 'r', encoding='utf-8') as f:   # 只读方式
        for line in f:
            line = line.strip()   # 去掉 换行符 \n
            line = line.replace(";", "")   # 去掉 最后一位的 “ ; ”号
            playerList.append( line.split(', ') )
        print(playerList)
        f.close()
    ''' 去 models 写入数据库 即可 '''
    return HttpResponse('111111')

# 限时礼包
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_reward_tem', login_url='slg:get_permissionDenied')
def send_limitGifts(request):
    giftID = request.POST['giftID']
    startTime = request.POST['startTime']
    endTime = request.POST['endTime']
    buyNumbers = request.POST['buyNumbers']
    sender = request.user
    reslut = db_send_limitGifts(giftID, startTime, endTime, buyNumbers, sender)
    return HttpResponse(reslut)

# 删除  限时礼包
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_reward_tem', login_url='slg:get_permissionDenied')
def delete_limitGifts(request):
    print(request.POST)
    deleteGiftID = request.POST['deleteGiftID']
    deleteStartTime = request.POST['deleteStartTime']
    deleteEndTime = request.POST['deleteEndTime']
    deleteBuyNumbers = request.POST['deleteBuyNumbers']
    deleteResult = db_delete_limitGifts(deleteGiftID, deleteStartTime, deleteEndTime, deleteBuyNumbers)
    return HttpResponse(deleteResult)