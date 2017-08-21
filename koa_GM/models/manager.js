/**
 * Created by jiangxu on 2017/8/4.
 * 权限访问，修改密码  模型
 */
const mysql = require('./db');

// 修改密码 请求
changePassword = async function (loginUser, password) {
    let queryResult = await queryLoginUser(loginUser);
    let changeSql = 'UPDATE `userinfo` SET `password` = ? WHERE `username` = ?';
    let changeParams = [password, loginUser];
    // console.log(queryResult)
    return new Promise((resolve, reject) => {
        if (queryResult.queryResult === -1) {
            resolve(-1);

        } else if (queryResult.queryResult === 1) {
            mysql.getConnection((err, connection) => {
                if (err) {
                    console.log('数据库连接时，发生错误！');
                    reject(err);
                } else {
                    connection.query(changeSql, changeParams, (err, results, fields) => {
                        if (err) {
                            console.log('修改 登录用户密码 数据时，发生错误！');
                            reject(err);
                        } else {
                            console.log('修改 登录用户密码 成功！');
                            // console.log(results);
                            resolve(1);
                        }
                    })
                }
                connection.release();
            })
        }
    })
};


// 查询 是否有该用户 存在
queryLoginUser = function (loginUser) {
    let querySql = 'SELECT * FROM `userinfo` WHERE `username` = ?';
    let queryParams = [loginUser];
    // console.log(loginUser)
    return new Promise((resolve, reject) => {
       mysql.getConnection((err, connection) => {
           if (err) {
               console.log('数据库连接时，发生错误！');
               reject(err);

           } else {
               mysql.query(querySql, queryParams, (err, results, fields) => {
                   if (err) {
                       console.log('查询 登录用户信息 数据时，发生错误！');
                       reject(err);

                   } else {
                       console.log(results);
                       if (!results[0]) {
                           console.log('查询不到该用户！');
                           resolve({
                               queryResult: -1
                           });

                       } else {
                           console.log('成功查询到该用户！');
                           resolve({
                               queryResult: 1,
                               queryInfo: results[0]
                           });
                       }
                   }
               })
           }
           connection.release();
       })
    });
};

// 查询 所有 用户信息
queryAllUsers = function () {
    let sql = 'SELECT * FROM `userinfo`';
    return new Promise((resolve, reject) => {
       mysql.getConnection((err, connection) => {
           if (err) {
               console.log('数据库连接时，发生错误！');
               reject(err);

           } else {
               connection.query(sql, (err, results, fields) => {
                   if (err) {
                       console.log('查询 所有用户信息 数据时，发生错误！');
                       reject(err);

                   } else {
                       console.log('成功查询所有用户！');
                       console.log(results);
                       resolve(results);
                   }
               });
           }
           connection.release();
       })
    });
};

// 核验 是否是用户本人操作
checkUser = function (loginUser, userPassword) {
    let checkSql = 'SELECT * FROM `userinfo` WHERE `username` = ? AND `password` = ?';
    let checkParams = [loginUser, userPassword];
    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                connection.query(checkSql, checkParams, (err, results, fields) => {
                   if (err) {
                       console.log('核验 用户信息 数据时，发生错误！');
                       reject(err);

                   } else {
                       if (!results[0]) {
                           resolve(-1); // 不存在 该用户 或 验证密码错误

                       } else {
                           resolve(1);  // 验证信息正确，可以接受和处理其请求
                       }
                   }
                });
            }
            connection.release();
        })
    })
};

// 添加 管理员
addUser = async function (loginUser, postData) {
    let checkUserResult = await checkUser(loginUser, postData.password);
    if (checkUserResult === -1) {
        console.log('验证信息 失败，请检查信息是否正确！');
        return -1;

    } else {
        let queryUser = await queryLoginUser(postData.addUsername);  // 检查 要添加的 用户名 是否 已经存在
        if (queryUser.queryResult === 1) {
            console.log('已经存在该用户，无法添加！');
            return 0;

        } else {
            //如果没有提交该权限，则默认为 ‘F’
            if (!postData.playerManage) {
                playerManage = 'F';
            } else {
                playerManage = postData.playerManage;
            }

            if (!postData.gameManage) {
                gameManage = 'F';
            } else {
                gameManage = postData.gameManage;
            }

            if (!postData.playerLog) {
                playerLog = 'F';
            } else {
                playerLog = postData.playerLog;
            }

            if (!postData.serverManage) {
                serverManage = 'F';
            } else {
                serverManage = postData.serverManage;
            }

            if (!postData.userManage) {
                userManage = 'F';
            } else {
                userManage = postData.userManage;
            }

            var addParams = {username: postData.addUsername, password: postData.addPassword, permissionLevel: postData.addPermissionLevel, playerManage: playerManage, gameManage: gameManage, playerLog: playerLog, serverManage: serverManage, userManage: userManage};
            var addSql = 'INSERT INTO `userinfo` SET ?';
        }
    }
    return new Promise((resolve, reject) => {
        mysql.getConnection((err, conncection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                conncection.query(addSql, addParams, (err, results, fields) => {
                   if (err) {
                       console.log('写入 新用户信息 数据时，发生错误！');
                       reject(err);

                   } else {
                       console.log('写入 新用户信息 成功！');
                       resolve(1);
                   }
                });
            }
            conncection.release();
        })
    })
};

// 编辑 管理员
editUser = async function (loginUser, postData) {
    let checkUserResult = await checkUser(loginUser, postData.password);
    if (checkUserResult === -1) {
        console.log('验证信息 失败，请检查信息是否正确！');
        return -1;

    } else {
        let queryUser = await queryLoginUser(postData.editUsername);  // 检查 要添加的 用户名 是否 已经存在
        if (queryUser.queryResult === -1) {
            console.log('查询不到该用户，无法更新信息！');
            return 0;

        } else {
        //如果没有提交该权限，则默认为 ‘F’
            if (!postData.playerManage) {
                playerManage = 'F';
            } else {
                playerManage = postData.playerManage;
            }

            if (!postData.gameManage) {
                gameManage = 'F';
            } else {
                gameManage = postData.gameManage;
            }

            if (!postData.playerLog) {
                playerLog = 'F';
            } else {
                playerLog = postData.playerLog;
            }

            if (!postData.serverManage) {
                serverManage = 'F';
            } else {
                serverManage = postData.serverManage;
            }

            if (!postData.userManage) {
                userManage = 'F';
            } else {
                userManage = postData.userManage;
            }

            var editSql = 'UPDATE `userinfo` SET `password` = ?, `playerManage` = ?, `gameManage` = ?, `playerLog` = ?, `serverManage` = ?, `userManage` = ? WHERE `username` = ?';
            var editParams = [postData.editPassword, playerManage, gameManage, playerLog, serverManage, userManage, postData.editUsername];
        }
    }
    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接时，发生错误！');
                reject(err);

            } else {
                connection.query(editSql, editParams, (err, results, fields) => {
                    if (err) {
                        console.log('更新（编辑） 用户信息 数据时，发生错误！');
                        reject(err);

                    } else {
                        console.log('更新（编辑） 用户信息 成功！');
                        resolve(1);
                    }
                });
            }
            connection.release();
        });
    });
};

// 删除 管理员
deleteUser = function (deleteUser) {
    let deleteSql = 'DELETE FROM `userinfo` WHERE `username` = ?';
    let deleteParams = [deleteUser];
    return new Promise((resolve, reject) => {
        mysql.getConnection((err, connection) => {
           if (err) {
               console.log('数据库连接时，发生错误！');
               reject(err);

           } else {
               connection.query(deleteSql, deleteParams, (err, results, fields) => {
                   if (err) {
                       console.log('删除 用户信息 数据时，发生错误！');
                       reject(err);

                   } else {
                       console.log('删除 用户信息 成功！');
                       // console.log(results);
                       resolve(1);
                   }
               });
           }
           connection.release();
        });
    });
};

module.exports = {
    changePassword,
    queryLoginUser,
    queryAllUsers,
    addUser,
    editUser,
    deleteUser
};