/**
 * Created by jiangxu on 2017/7/23.
 * 用户登录 模型
 */
const mysql = require('./db');

function User(user) {
    this.username = user.username;
    this.password = user.password;
}

module.exports = User;

// 查询 用户登录 账号和密码 是否匹配
User.get = function get(username, password) {
    let sql = 'SELECT * FROM `userinfo` WHERE `username` = ?';
    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);
            } else {
                connection.query(sql, [username], (err, results, fields) => {
                    if (err) {
                        console.log('查询时，发生错误！');
                        reject(err);
                    } else {
                        // console.log(results[0].username);
                        if (!results[0]) {   // 如果 获取不到 “账号信息”，则传回 “空数组” []，因此，用 results[0] 即可
                            console.log('账号不存在！');
                            resolve('accountNotExist')
                        } else if (results[0].username != username || results[0].password != password) {
                            console.log('账号或密码不正确！');
                            resolve('accORpassError')
                        } else {
                            console.log('登录成功！');
                            resolve('loginSuccess')
                        }
                    }
                    connection.release();
                })
            }
        })
    })
};
