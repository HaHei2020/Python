#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/1 11:51
# @Author  : HaHei
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.utils import IntegrityError
from . import db_models as db
import traceback

# 查询已有用户
def db_query_user():
    queryResult = db.AuthUser.objects.filter().values('username')
    return queryResult


# 创建用户 激活/封停
def db_create_user(username, password, is_active):
    if is_active == '0':
        is_active = False
    elif is_active == '1':
        is_active = True

    try:
        User.objects.create_user(username=username, password=password, is_active=is_active)
    except  IntegrityError:
        return -1   # 已经创建，无法重复创建
    else:
        return 1    # 创建成功

# 删除用户
def db_delete_user(username):
    deleteResult = User.objects.filter(username=username).delete()
    if deleteResult:
        return 1

# 修改密码
def db_change_password(username, oldPassword, newPassword):
    user = authenticate(username=username, password=oldPassword)
    if user is not None:
        if user.is_active:
            user.set_password(newPassword)
            user.save()
            return 1    # 修改成功，允许特殊符号
        else:
            return -2   # 没有权限
    else:
        return -1      # 旧密码错误

# 修改权限
def db_change_permission(username, permissions):
    try:
        user = User.objects.get(username=username)
        if permissions:
            pers = []
            for per in permissions:
                db_per = db.AuthPermission.objects.filter(codename=per).values('id')[0]['id']   # 只把 id 取出来
                pers.append(db_per)
            #print(pers)   # 形如： [147, 150, 152]  数字为 auth_permission 中的 id
            user.user_permissions = pers

        else:
            user.user_permissions.clear()
        User.objects.get(username=username)   # 刷新 缓存
        #print(user.get_all_permissions())

    except Exception:
        return -1
    else:
        return 1   # 修改成功

