#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/8 14:49
# @Author  : HaHei

def application(env, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return [b"Hello World"]