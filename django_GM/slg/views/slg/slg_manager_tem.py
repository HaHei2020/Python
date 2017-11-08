#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/1 11:50
# @Author  : HaHei
# 管理员管理
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render
from slg.models.slg.slg_manager_tem import (db_create_user, db_query_user, db_delete_user,
                                            db_change_password, db_change_permission)
import json

# GET 管理员管理 页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_manager_tem', login_url='slg:get_permissionDenied')
def get_slg_manager_tem(request):
    perms = User.get_all_permissions(request.user)
    queryResult = db_query_user()
    context = {"users": queryResult, "perms": perms}
    return render(request, 'slg/slg_manager_tem.html',context=context)

# 创建用户 激活/封停
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_manager_tem', login_url='slg:get_permissionDenied')
def create_user(request):
    username = request.POST['createUsername']
    password = request.POST['password']
    is_active = request.POST['is_active']

    createResult = db_create_user(username, password, is_active)
    if createResult == 1:
        return HttpResponse('1')
    elif createResult == -1:
        return HttpResponse('-1')

# 删除用户
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_manager_tem', login_url='slg:get_permissionDenied')
def delete_user(request):
    username = request.POST['deleteUsername']
    deleteResult = db_delete_user(username)
    if deleteResult:
        return HttpResponse('1')

# 修改密码
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_manager_tem', login_url='slg:get_permissionDenied')
def change_password(request):
    username = request.POST['username']
    oldPassword = request.POST['oldPassword']
    newPassword = request.POST['newPassword']
    changeResult = db_change_password(username, oldPassword, newPassword)
    return HttpResponse(changeResult)

# 修改权限
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_manager_tem', login_url='slg:get_permissionDenied')
def change_permission(request):
    permissionsList = [
                       'views_slg_users_tem', 'views_slg_alliance_tem', 'views_slg_mail_notice_tem',
                       'views_slg_order_tem', 'views_slg_reward_tem', 'views_slg_service_reply_tem',
                       'views_slg_user_log_tem', 'views_slg_server_tem', 'views_slg_manager_tem'
                       ]
    username = request.POST['username']
    permissions = request.POST['permissions'].split(', ')

    if permissions[0] != '':   # 不为空时
        for index, value in enumerate(permissions):
            permissions[index] = permissionsList[int(value)]    # 将 数字 替换为 上面数组中的 字符串
        print(permissions)
    else:
        permissions = []

    changeResult = db_change_permission(username, permissions)
    return HttpResponse(changeResult)

