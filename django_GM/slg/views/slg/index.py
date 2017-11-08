#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/15 21:18
# @Author  : HaHei
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required(login_url='slg:login')
def index(request):
	perms = User.get_all_permissions(request.user)
	context = {"perms": perms}
	return render(request, 'slg/index.html', context=context)
