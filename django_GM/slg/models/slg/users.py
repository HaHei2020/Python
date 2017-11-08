#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/9/16 15:07
# @Author  : HaHei
# GM后台 用户管理 相关模块
from . import db_models as db
import traceback

#查询 登录用户和密码
def queryLoinUser(userName, userPassword):
	result = db.Userinfo.objects.filter(username=userName, password=userPassword)
	try:
		if result.count() == 0:
			return 'noExist'
		
		else:
			return 'success'
		
	except BaseException:
		print(traceback.format_exc())
		return 'server error'
	