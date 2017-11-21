#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/14 16:52
# @Author  : HaHei
# 读取 数据库 配置信息

import configparser

def getConfig(section, key):
    config = configparser.ConfigParser()
    path = '../db/db_config.ini'
    config.read(path)
    #print(config.get("database", "db_host"))
    return config.get(section, key)
