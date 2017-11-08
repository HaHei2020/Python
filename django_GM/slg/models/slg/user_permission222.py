#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/10/31 15:46
# @Author  : HaHei
from django.shortcuts import render
from slg.models.slg import db_models as models
from django.contrib.auth.models import Permission
from django.core.urlresolvers import resolve   #此方法可以将url地址转换成url的name

def perm_check(request, *args, **kwargs):
    url_obj = resolve(request.path_info)
    url_name = url_obj.url_name
    perm_name = ''
    #权限必须和urlname配合使得
    if url_name:
        #获取请求方法，和请求参数
        if request.method == 'GET':
            url_args = request.GET
            url_method = 1
        elif request.method == 'POST':
            url_method = 2
        #url_args_list = []
        #将各个参数的值用逗号隔开组成字符串，因为数据库中是这样存的  默认为 null
        # for i in url_args:
        #     url_args_list.append(str(url_args[i]))
        # url_args_list = ','.join(url_args_list)
        #操作数据库
        #get_perm = models.Permission.objects.filter(Q(url=url_name) and Q(per_method=url_method) and Q(argument_list=None))
        get_perm = models.Permission.objects.filter(url=url_name, per_method=url_method)
        if get_perm:
            for i in get_perm:
                perm_name = i.name
                perm_str = 'slg.' + perm_name   # 将 权限 拼接成 'app.permissionA' 的形式
                if request.user.has_perm(perm_str):  # 调用 内部函数，检验 是否 有 该权限
                    print('====》权限已匹配')
                    return True
            else:
                print('---->权限没有匹配')
                return False
        else:
            return False
    else:
        return False   #没有权限设置，默认不放过


def check_permission(fun):    #定义一个装饰器，在views中应用
    def wapper(request, *args, **kwargs):
        if perm_check(request, *args, **kwargs):  #调用上面的权限验证方法
            return fun(request, *args, **kwargs)
        return render(request, 'slg/403.html', locals())
    return wapper