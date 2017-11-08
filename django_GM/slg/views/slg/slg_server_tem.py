#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/3 15:13
# @Author  : HaHei
# 服务器管理

from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import render

# GET 渲染页面
@login_required(login_url='slg:login')
@require_http_methods(["GET"])
@permission_required('slg.views_slg_server_tem', login_url='slg:get_permissionDenied')
def get_slg_server_tem(request):
    perms = User.get_all_permissions(request.user)
    context = {"perms": perms}
    return render(request, 'slg/slg_server_tem.html', context=context)


# 版本，地址
@login_required(login_url='slg:login')
@require_http_methods(["POST"])
@permission_required('slg.views_slg_server_tem', login_url='slg:get_permissionDenied')
def post_AndroidVersion(request):
    print(request.POST)
    return HttpResponse('1')
