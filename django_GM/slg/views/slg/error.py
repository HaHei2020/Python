#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/2 16:44
# @Author  : HaHei

from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.shortcuts import render

# GET 渲染页面
@login_required(login_url='slg:login')
@require_http_methods(["GET", "POST"])
def get_permissionDenied(request):
    return render(request, 'slg/permissionDenied.html')
