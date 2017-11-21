### 根据 国家，汇总 留存 信息

**运行步骤：**
1. 配置 本地数据库，db_config.ini
2. 从线上 拉取 注册表（PlayerRegister） 和 登录表（PlayerLogin） 数据，并导入 本地数据库中
3. 在 注册表 中 新建 Country 字段， 要求：VARCHAR(64)
4. 新建 IpAddress表，sql语句：
`
CREATE TABLE IpAddress
(
  id               INT AUTO_INCREMENT
    PRIMARY KEY,
  ip_start         VARCHAR(15) NOT NULL,
  ip_end           VARCHAR(15) NOT NULL,
  ip_longNum_start BIGINT(20)  NOT NULL,
  ip_longNum_end   BIGINT(20)  NOT NULL,
  country_code     VARCHAR(5)  NOT NULL,
  country          VARCHAR(50) NOT NULL
)
  COMMENT 'ip库';
`
5. 运行 write_IpAddress.py ，将 ipadress.csv 文件中的数据，写入到 IpAddress表 中，完成后，打印 "ip写入完毕！"
6. 运行 query_ip.py ，根据 注册表 中的 ip 查询 相应的 国家名称，如果在 IpAddress表 中 查询不到，会向 ip138 网站，发起请求，完成后，打印 "DONE"
7. 配置 query_data.ini
8. 运行 player_retenion.py ，完成后，打印"DONE!"  并在 slg_data 根目录下 生成：retenion_datas_all.xlsx 或 retenion_datas_country.xlsx

**备注：**
- 4，5，6 可以直接不用做，直接运行 taobao_ip_to_country.py 从 淘宝的ip库进行查询，不过很慢。。。
  