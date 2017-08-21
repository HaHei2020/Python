/**
 * Created by jiangxu on 2017/7/23.
 * MySQL 创建连接池
 */
const Config = require('../config');
const mysql = require('mysql');
const pool = mysql.createPool({
   host:  Config.host,
   database: Config.database,
   user: Config.user,
   password: Config.password
});

module.exports = pool;

