#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/15 22:02
# @Author  : HaHei

from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
#from slg.models.slg.users import queryLoinUser
from django.contrib.auth import authenticate, login as d_login, logout as d_logout


#@require_http_methods(["GET"])
# def login(request):
# 	return render(request, 'slg/login.html')

@require_http_methods(["GET", "POST"])
def login(request):
	if request.method == 'GET':
		user = request.user
		if user.is_authenticated:   #如果已登录
			return redirect(reverse('slg:index'))
		
		else:
			return render(request, 'slg/login.html')

	if request.method == 'POST':
		userName = request.POST['userName']
		userPassword = request.POST['userPassword']
		
		user = authenticate(username=userName, password=userPassword) #django认证
		if user is not None:
			if user.is_active:  # 用户 在 Admin后台，被设置为 “激活状态”
				d_login(request, user)   #将 登录信息 存储到 django自身的 login模块 中
				return HttpResponse(1)

			else:
				return HttpResponse(2)
		
		else:
			return HttpResponse(0)
		
		# queryResult = queryLoinUser(userName, userPassword)
		# print('登录查询结果：', queryResult)
		#
		# if queryResult == 'noExist':
		# 	return HttpResponse(0)
		#
		# elif queryResult == 'server error':
		# 	return HttpResponse(-1)
		#
		# elif queryResult == 'success':
		# 	request.session['loginUser'] = userName
		# 	return HttpResponse(1)
		

def logout(request):
	d_logout(request)
	return redirect(reverse('slg:index'))

