-- auto-generated definition
CREATE TABLE OrderInfo
(
  id           INT AUTO_INCREMENT
    PRIMARY KEY,
  in_trade_no  VARCHAR(64)    NULL
  COMMENT '业务订单号，商户业务 创建订单时，产生的订单号，规则：业务类型+创建时间+顺序编号，如： A2017010100001',
  trade_no     VARCHAR(64)    NULL
  COMMENT '支付宝交易号， 支付宝结算依据',
  out_trade_no VARCHAR(64)    NULL
  COMMENT '商户订单号，64个字符以内、可包含字母、数字、下划线；需保证在商户端不重复，与支付宝对账使用',
  product_code VARCHAR(64)    NULL
  COMMENT '销售产品码，与支付宝签约的产品码名称。 注：目前仅支持FAST_INSTANT_TRADE_PAY',
  total_amount DECIMAL(10, 2) NULL
  COMMENT '订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]',
  rechargeTime DATETIME       NULL
  COMMENT '订单成功到账时间',
  status       INT            NULL
  COMMENT '0:成功，1:失败，-1: 异常',
  createTime   DATETIME       NULL
  COMMENT '订单创建时间',
  subject      VARCHAR(256)   NULL
  COMMENT '订单标题',
  username     VARCHAR(100)   NULL
  COMMENT '购买人信息'
)
  COMMENT '订单信息';