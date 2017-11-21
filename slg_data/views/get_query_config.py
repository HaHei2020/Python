#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/17 11:37
# @Author  : HaHei
# 获取 查询数据 的配置信息

import configparser

def getConfig(section, key):
    config = configparser.ConfigParser()
    path = '../data/query_data.ini'
    config.read(path)
    return config.get(section, key)
