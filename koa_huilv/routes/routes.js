/**
 * Created by jiangxu on 2017/7/4.
 * 总路由（汇总路由信息）
 */
const router = require('koa-router')();

const index = require('./index');
// const users = require('./users');

router.use(index.routes(), index.allowedMethods());
// router.use(users.routes(), users.allowedMethods());

module.exports = router;
