#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/14 18:42
# @Author  : HaHei
# 查询ip，如果从 IpAddress表 中查询不到，则向ip138发起请求

import time
import pymysql
from ip import countrys
from models import get_db_config, request_country

''' lambda 就相当于 一个 function 函数，“ = ” 左边是自己的返回值 '''
ip_to_long = lambda strIp: sum([256 ** j * int(i) for j, i in enumerate(strIp.split('.')[::-1])])

def query_ip():
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

    # 创建 游标
    cur = conn.cursor()

    cur.execute("SELECT ID, IP FROM PlayerRegister")
    queryResult = cur.fetchall()
    db_countrys = []
    print('查询ip...')
    for i in queryResult:
        id = i[0]
        ip = i[1]
        long_ip = ip_to_long(ip)
        #print("id: %s, ip: %s, longIP: %s"%(id, ip, long_ip))
        db_countrys.append(dict(id=id, ip=ip, long_ip=long_ip, country=''))
    #print(db_countrys)
    print('查询国家...')
    for data in db_countrys:
        cur.execute("SELECT country_code FROM IpAddress WHERE ip_longNum_start <= '%d' AND ip_longNum_end >= '%d'" %(data['long_ip'], data['long_ip']))
        queryCountryCode = cur.fetchone()
        #print(queryCountryCode[0])
        try:
            country = countrys.country_data[queryCountryCode[0]]
        except KeyError:
            print("KeyError: ip: %s, long_ip: %s" % (data['ip'], data['long_ip']))
            print('获取不到 相应的long_ip，正在向ip138发起请求...')
            data['country'] = request_country.requestCountry(data['ip'])
            print('获取完毕，输出：%s，继续处理其他请求...' %(data['country']))
            pass

        except TypeError:
            print("TypeError: ip: %s, long_ip: %s" %(data['ip'], data['long_ip']))
            print('获取不到 相应的country_code，正在向ip138发起请求...')
            data['country'] = request_country.requestCountry(data['ip'])
            print('获取完毕，输出：%s，继续处理其他请求...' % (data['country']))
            pass

        else:
            data['country'] = country

    print('写入 txt文件...')
    with open('/code/StudyDemo/slg_data/ip_country_datas.txt', 'a') as f:
        for c in db_countrys:
            f.write(str(c['id']) + ', ' + str(c['ip']) + ', ' + str(c['long_ip']) + ', ' + c['country'] + '\n')
            if not c:
                f.close()

            insert_sql = ("UPDATE PlayerRegister SET Country = '%s' WHERE ID = '%s';" % (c['country'], c['id']))
            cur.execute(insert_sql)

    print('DONE')

    conn.commit()  # 提交修改
    cur.close()  # 关闭 指针对象
    conn.close()  # 关闭 连接对象



if __name__ == '__main__':
    query_ip()
