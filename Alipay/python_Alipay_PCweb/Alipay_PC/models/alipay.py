#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/21 14:10
# @Author  : HaHei
# 支付宝接口

import logging
import json
import OpenSSL
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from urllib.parse import quote_plus
import base64
import datetime
import requests
from python_Alipay_PCweb import settings
from Alipay_PC.models import db_models as db
from Alipay_PC.alipay_config import AlipaySandBoxSettings, AlipayProduceSettings
from django.core.exceptions import ObjectDoesNotExist

# 获取 Alipay 配置信息
def AlipaySettings():
    if settings.DEBUG:  # 测试环境，用支付宝沙箱信息
        AlipaySettings = AlipaySandBoxSettings
    else:
        AlipaySettings = AlipayProduceSettings
    return AlipaySettings


# 对数组排序（ASCII码递增排序），并剔除数值中，sign字段，剔除值为空的参数
# 将排序后的参数与其对应值，组合成“参数=参数值”的格式，并且把这些参数用&字符连接起来，此时生成的字符串为待签名字符串
def params_filter(params):
    # print(params)
    new_params = {}
    for key in params:
        if params[key] != '' and key != 'sign':
            if key == 'biz_content':
                new_params[key] = {}  # 不声明，会出现 KeyError
                for k in params[key]:
                    if params[key][k] != '':
                        new_params[key][k] = params[key][k]
                continue   # 遍历完 biz_content 后，跳过本次循环，继续下一次循环
            new_params[key] = params[key]
    # print(new_params)
    sorted_keys = sorted(new_params)   # key 排序 升序
    str_sorted_new_params = ''
    for sks in sorted_keys:
        str_sorted_new_params += '%s=%s&' %(sks, new_params[sks])
    str_sorted_new_params = str_sorted_new_params[:-1]   # 截取字符串，去掉最后一个 &  待签名字符串
    # print(str_sorted_new_params)

    return_urlencode_str = RSA2_signed(str_sorted_new_params)   # 调用 签名

    return [str_sorted_new_params, return_urlencode_str]


# 进行RSA2签名，并进行base64编码
def RSA2_signed(sign_str):
    '''
    安装：pycryptodome 库
        from Crypto.PublicKey import RSA
        from Crypto.Signature import PKCS1_v1_5
        from Crypto.Hash import SHA256
        
    另一种 RSA2 签名 方式： 
        with open(AlipaySettings().PRIVATE_KEY_DIR) as pk:
            private_key = RSA.import_key(pk.read())
            
        signer = PKCS1_v1_5.new(private_key)
        signature = signer.sign(SHA256.new(sign_str.encode('utf-8')))    
        signed_base64 = base64.encodebytes(signature).decode('utf-8').replace('\n', '')
    '''

    '''
    对 获得的签名  进行 验证，看是否正确：
        with open(AlipaySettings().PUBLIC_KEY_DIR) as pk:
            public_key = RSA.import_key(pk.read())
            
        h = SHA256.new(sign_str.encode('utf-8'))
        verifier = PKCS1_v1_5.new(public_key)
        if verifier.verify(h, (signature)):
            print('True')
            return
        else:
            print('False')
            return    
    '''

    private_key = OpenSSL.crypto.load_privatekey(OpenSSL.crypto.FILETYPE_PEM, open(AlipaySettings().PRIVATE_KEY_DIR).read(), None)
    signed_bytes = OpenSSL.crypto.sign(private_key, sign_str, "SHA256")  # RSA2
    signed_base64_bytes = base64.b64encode(signed_bytes)    # base64编码，获得 bytes类型
    signed_base64 = bytes.decode(signed_base64_bytes)     # 提取成 字符串
    urlencode_str = quote_plus(signed_base64, encoding='utf-8')    # 对 签名，进行 urlencode 编码
    logging.getLogger('info').info('签名完毕！')
    return urlencode_str

# 创建订单，并写入数据库
def create_order_db(postData):
    product_name = postData['product_name']
    buy_username = postData['buy_username']
    # product_price = postData['product_price']
    # buy_num = postData['buy_num']
    total_price = postData['total_price']
    create_time = datetime.datetime.now()
    str_create_time = str(create_time).split('.')[0]
    out_trade_no = str(create_time.year) + str(create_time.month).zfill(2) + str(create_time.day).zfill(2) \
                   + str(create_time.hour).zfill(2) + str(create_time.minute).zfill(2) + str(create_time.second).split('.')[0].zfill(2)
    in_trade_no = 'TEST' + today_num(create_time)  # A2017010100001
    #print(in_trade_no)
    product_code = AlipaySettings().PRODUCT_CODE
    insert_data = {
        "in_trade_no": in_trade_no,
        "out_trade_no": out_trade_no,
        "product_code": product_code,
        "subject": product_name,
        "total_amount": total_price,
        "username": buy_username,
        "createtime": str_create_time,
        "status": 1
    }
    try:
        db.Orderinfo.objects.create(**insert_data)
    except Exception as e:
        print("数据库创建订单出错！")
        logging.getLogger('error').error('数据库创建订单出错! 出错信息：%s', e)
    else:
        logging.getLogger('info').info('数据库创建订单完毕! 创建信息：%s', insert_data)
        splice_str_result = create_order_pay(insert_data)
        logging.getLogger('info').info('向支付宝发起支付请求!')

    return [AlipaySettings().GET_WAY, splice_str_result]

# 支付宝 充值接口
def create_order_pay(data):
    params = {}
    params['biz_content'] = {}

    # 获取 配置文件信息
    params['app_id'] = AlipaySettings().APPID
    params['method'] = AlipaySettings().PAY_METHOD
    params['charset'] = AlipaySettings().ALIPAY_CHARSET
    params['sign_type'] = AlipaySettings().ALIPAY_SIGN_TYPE
    params['version'] = AlipaySettings().VERSION
    params['return_url'] = ''    # 支付宝 支付 同步返回结果
    params['notify_url'] = ''    # 支付宝 支付 异步返回结果 （支付结果，以 异步 为准！）
    params['sign'] = ''

    # 获取 订单信息 必填参数
    params['timestamp'] = data['createtime']
    params['biz_content']['out_trade_no'] = data['out_trade_no']
    params['biz_content']['subject'] = data['subject']
    params['biz_content']['total_amount'] = data['total_amount']
    params['biz_content']['product_code'] = data['product_code']
    params['biz_content']['body'] = ''

    return_signed_str = params_filter(params)   # 调用 去重空值，sign值，排序 方法
    params['sign'] = return_signed_str[1]

    splice_str_result = return_signed_str[0] + '&sign=' + params['sign']   # 返回 拼接结果
    return splice_str_result

# 支付宝 查询接口
def query_order_pay(data):
    params = {}
    params['biz_content'] = {}

    # 获取 配置文件信息  公共请求参数
    params['app_id'] = AlipaySettings().APPID
    params['method'] = AlipaySettings().QUERY_METHOD
    params['charset'] = AlipaySettings().ALIPAY_CHARSET
    params['sign_type'] = AlipaySettings().ALIPAY_SIGN_TYPE
    params['version'] = AlipaySettings().VERSION
    params['sign'] = ''
    params['timestamp'] = str(datetime.datetime.now()).split('.')[0]

    # 请求参数
    params['biz_content']['out_trade_no'] = '' # 和支付宝交易号不能同时为空。trade_no, out_trade_no: 如果同时存在优先取trade_no
    #params['biz_content']['trade_no'] = ''    # 支付宝交易号，和商户订单号不能同时为空

    # 获取 out_trade_no
    product_name = data['product_name']
    buyer = data['buyer']
    total_price = data['total_price']
    out_trade_no_last = db.Orderinfo.objects.filter(subject=product_name, username=buyer, total_amount=total_price).latest(field_name='out_trade_no').out_trade_no  # 获取 最后一笔订单号
    #print(out_trade_no_last)
    params['biz_content']['out_trade_no'] = out_trade_no_last

    return_signed_str = params_filter(params)   # 调用 去重空值，sign值，排序 方法
    params['sign'] = return_signed_str[1]

    splice_str_result = return_signed_str[0] + '&sign=' + params['sign']   # 返回 拼接结果
    query_response = alipay_response(splice_str_result)
    #return_msg = query_response['alipay_trade_query_response']
    return_msg = query_response
    logging.getLogger('info').info('支付宝同步返回结果，进行验签！%s', return_msg)
    verify_result = alipay_sync_return_verify_signature(return_msg)
    if verify_result:  # 返回 True
        if return_msg['alipay_trade_query_response']['msg'] == 'Success':
            recharge_time = datetime.datetime.now()
            db.Orderinfo.objects.filter(out_trade_no=out_trade_no_last).update(status=0, trade_no=return_msg['alipay_trade_query_response']['trade_no'], rechargetime=recharge_time)  # 更新数据库 订单状态
            #return_msg = '交易成功！'
            logging.getLogger('info').info('支付宝返回结果，写入数据库完毕！')
            return return_msg['alipay_trade_query_response']['msg']
    else:
        print('验签失败！')
        logging.getLogger('error').error('验签失败!')
        return 'error'

# 返回 支付宝 响应信息
def alipay_response(params_str_urlencode):
    url = AlipaySettings().GET_WAY + '?' + str(params_str_urlencode)
    r = requests.get(url)
    responseText = r.json()
    logging.info(responseText)
    #print(responseText)
    return responseText


# 同步返回结果 验签
def alipay_sync_return_verify_signature(return_msg):
    sign = return_msg['sign']
    no_sign_dic = return_msg['alipay_trade_query_response']   # 字典对象
    no_sign_str = json.dumps(no_sign_dic)    # 待验签 json字符串，一定要 双引号，并且去掉空格！
    no_sign_str = no_sign_str.replace(': ', ':').replace(', ', ',')  # 待验签 json字符串，一定要 双引号，并且去掉空格！
    #no_sign_str2 = '{"code":"10000","msg":"Success","buyer_logon_id":"uan***@sandbox.com","buyer_pay_amount":"0.00","buyer_user_id":"2088102173103745","buyer_user_type":"PRIVATE","invoice_amount":"0.00","open_id":"20881058078135932058644541017874","out_trade_no":"20171125204821","point_amount":"0.00","receipt_amount":"0.00","send_pay_date":"2017-11-25 20:48:49","total_amount":"20.00","trade_no":"2017112521001004740200384630","trade_status":"TRADE_SUCCESS"}'

    ''' 开始 验签 '''
    with open(AlipaySettings().ALIPAY_PUBLIC_KEY_DIR) as pk:
        alipay_public_key = RSA.import_key(pk.read())

    h = SHA256.new(no_sign_str.encode('utf-8'))
    verifier = PKCS1_v1_5.new(alipay_public_key)
    if verifier.verify(h, base64.decodebytes(sign.encode('utf-8'))):
        #print('True')
        logging.getLogger('info').info('验签结果：True')
        return True

    else:
        #print('False')
        logging.getLogger('info').info('验签结果：False')
        return False


# 今日编号
def today_num(create_time):
    today_time = datetime.datetime.today().strftime('%Y-%m-%d')    # 输出 2017-11-25
    try:
        create_time_last = db.Orderinfo.objects.latest(field_name='createtime').createtime.strftime('%Y-%m-%d')   # 获取 最后一笔订单的创建时间
    except ObjectDoesNotExist:   # 数据库里 没有信息，需要初始化
        #print('初始化create_time信息！')
        create_time_last = today_time

    if today_time == create_time_last:   # 如果 最后一笔创建订单日期 和 今天日期 相同，则订单编号 累加； 否则，订单编号 重置为1
        try:
            order_num = db.Orderinfo.objects.latest(field_name='in_trade_no').in_trade_no
        except ObjectDoesNotExist:    # 数据库里 没有信息，需要初始化
            #print('初始化in_trade_no信息！')
            order_num = str(create_time.year) + str(create_time.month).zfill(2) + str(create_time.day).zfill(2) + '%05d'%1
        else:
            order_num = str(create_time.year) + str(create_time.month).zfill(2) + str(create_time.day).zfill(2) + '%05d'%(int(order_num[-5:]) + 1)
    else:
        order_num = str(create_time.year) + str(create_time.month).zfill(2) + str(create_time.day).zfill(2) + '%05d'%1
    #print(order_num)
    return str(order_num)
