#!/usr/bin/env python
# coding: UTF-8
# @Time    : 2017/11/21 11:22
# @Author  : HaHei
# 支付宝  环境配置

import os

''' 沙盒环境 '''
class AlipaySandBoxSettings:

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    GET_WAY = 'https://openapi.alipaydev.com/gateway.do'

    APPID = ***************

    PRODUCT_CODE = 'FAST_INSTANT_TRADE_PAY'

    ALIPAY_CHARSET = 'utf-8'

    ALIPAY_SIGN_TYPE = 'RSA2'

    VERSION = '1.0'

    PAY_METHOD = 'alipay.trade.page.pay'

    QUERY_METHOD = 'alipay.trade.query'

    PRIVATE_KEY_DIR = os.path.join(BASE_DIR, 'Alipay_PC/certs/alipay_app_private_key.pem')

    PUBLIC_KEY_DIR = os.path.join(BASE_DIR, 'Alipay_PC/certs/alipay_app_public_key.pem')

    ALIPAY_PUBLIC_KEY_DIR = os.path.join(BASE_DIR, 'Alipay_PC/certs/alipay_alibaba_public_key.pem')


''' 正式环境 '''
class AlipayProduceSettings:

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    GET_WAY = ''

    APPID = ***************

    PRODUCT_CODE = 'FAST_INSTANT_TRADE_PAY'

    ALIPAY_CHARSET = 'utf-8'

    ALIPAY_SIGN_TYPE = 'RSA2'

    VERSION = '1.0'

    PAY_METHOD = 'alipay.trade.page.pay'

    QUERY_METHOD = 'alipay.trade.query'

    PRIVATE_KEY_DIR = os.path.join(BASE_DIR, '')

    PUBLIC_KEY_DIR = os.path.join(BASE_DIR, '')

    ALIPAY_PUBLIC_KEY_DIR = os.path.join(BASE_DIR, '')


