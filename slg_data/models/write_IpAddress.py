#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/16 12:24
# @Author  : HaHei
# 读取 csv文件，向数据库 写入 ip地址 国家 等字段

import csv
import pymysql
from models import get_db_config

'''
    读取 csv文件
'''
def load_csv():
    print('准备读取csv文件！')
    ipAddress = []
    csv_reader = csv.reader(open('../ip/ipadress.csv', encoding='utf-8'))
    for row in csv_reader:
        ip_start = row[0]
        ip_end = row[1]
        ip_longNum_start = row[2]
        ip_longNum_end = row[3]
        country_code = row[4]
        country = row[5]
        ipAddress.append({
            "ip_start": ip_start,
            "ip_end": ip_end,
            "ip_longNum_start": ip_longNum_start,
            "ip_longNum_end": ip_longNum_end,
            "country_code": country_code,
            "country": country
        })
    print('csv文件读取完毕！')
    return ipAddress

'''
    写入 数据库 IpAddress表
'''
def mysql():
    # 获取 数据库 配置
    db_host = get_db_config.getConfig("database", "db_host")
    db_port = get_db_config.getConfig("database", "db_port")
    db_user = get_db_config.getConfig("database", "db_user")
    db_password = get_db_config.getConfig("database", "db_password")
    db_name = get_db_config.getConfig("database", "db_name")
    db_charset = get_db_config.getConfig("database", "db_charset")

    # 连接 数据库
    conn = pymysql.connect(
        host=db_host,
        port=int(db_port),
        user=db_user,
        password=db_password,
        db=db_name,
        charset=db_charset
    )

    # 创建游标
    cur = conn.cursor()

    # 获取数据
    datas = load_csv()
    print('开始写入数据！')
    for data in datas:

    # 写入数据
        insert_sql = (
            'INSERT INTO IpAddress ' \
            '(ip_start, ip_end, ip_longNum_start, ip_longNum_end, country_code, country) ' \
            'VALUES ("%s","%s","%s","%s","%s","%s")' \
            %(data['ip_start'], data['ip_end'], data['ip_longNum_start'], data['ip_longNum_end'], data['country_code'], data['country'])
        )
        cur.execute(insert_sql)

    # 关闭连接
    conn.commit()
    cur.close()
    conn.close()
    return print('ip写入完毕！')

if __name__ == "__main__":
    mysql()
