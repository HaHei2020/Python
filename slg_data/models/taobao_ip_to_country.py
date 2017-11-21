#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/20 10:26
# @Author  : HaHei
# 访问 淘宝IP地址库，查询国家，写入数据库，要求：访问频率 < 10qps

import time
import pymysql
import requests
from models import get_db_config

def taobao_query_ip():
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
    print('搜集ip...')
    for i in queryResult:
        id = i[0]
        ip = i[1]
        #print("id: %s, ip: %s, longIP: %s"%(id, ip, long_ip))
        db_countrys.append(dict(id=id, ip=ip, country=''))
    #print(db_countrys)

    print('开始查询ip对应国家...')
    db_countrys = request_taobao_ip(db_countrys)

    with open('/code/StudyDemo/slg_data/ip_country_datas.txt', 'a') as f:
        for c in db_countrys:
                f.write(str(c['id']) + ', ' + str(c['ip']) + ', ' + c['country'] + '\n')
                if not c:
                    f.close()

                insert_sql = ("UPDATE PlayerRegister SET Country = '%s' WHERE ID = '%s';" % (c['country'], c['id']))
                cur.execute(insert_sql)

        print('DONE')

    conn.commit()  # 提交修改
    cur.close()  # 关闭 指针对象
    conn.close()  # 关闭 连接对象



def request_taobao_ip(db_countrys):
    index = 1
    for data in db_countrys:
        query_ip = data['ip']
        url = 'http://ip.taobao.com/service/getIpInfo.php'
        param = {'ip': query_ip}
        r = requests.get(url, params=param)
        responseJson = r.json()
        if responseJson['code'] == 0 and r.status_code == 200:
            data['country'] = responseJson['data']['country']
            leave_counts = len(db_countrys) - index
            print("正在查询... ip: %s, 国家: %s, 剩余 %s 个..." %(query_ip, responseJson['data']['country'], leave_counts))
        index += 1
        time.sleep(1.2)     # 为了保障服务正常运行，每个用户的访问频率需小于10qps
    print("ip查询完毕，正在请求写入文本和数据库！")
    return db_countrys


if __name__ == '__main__':
    taobao_query_ip()
