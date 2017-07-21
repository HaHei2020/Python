/**
 * Created by jiangxu on 2017/7/22.
 * 总路由（汇总路由信息）
 */
const router = require('koa-router')();

const index = require('./index');

router.use(index.routes(), index.allowedMethods());

module.exports = router;
