/**
 * Created by jiangxu on 2017/7/22.
 * 总路由（汇总路由信息）
 */
const router = require('koa-router')();

const index = require('./index');
const slguser = require('./slguser');
const alliance = require('./alliance');
const slgreward = require('./slgreward');
const manager = require('./manager');
const slgnotice = require('./slgnotice');
const slgmail = require('./slgmail');
const slgfeedback = require('./slgfeedback');
const slgorder = require('./slgorder');
const slggift = require('./slggift');
const slgaction = require('./slgaction');
const slg_resourse = require('./slg_resourse');
const slg_server_info = require('./slg_server_info');
const slg_audt_server = require('./slg_audt_server');
const slg_server_update = require('./slg_server_update');
const env = require('./env');

router.use(index.routes(), index.allowedMethods());
router.use(slguser.routes(), slguser.allowedMethods());
router.use(alliance.routes(), alliance.allowedMethods());
router.use(slgreward.routes(), slgreward.allowedMethods());
router.use(manager.routes(), manager.allowedMethods());
router.use(slgnotice.routes(), slgnotice.allowedMethods());
router.use(slgmail.routes(), slgmail.allowedMethods());
router.use(slgfeedback.routes(), slgfeedback.allowedMethods());
router.use(slgorder.routes(), slgorder.allowedMethods());
router.use(slggift.routes(), slggift.allowedMethods());
router.use(slgaction.routes(), slgaction.allowedMethods());
router.use(slg_resourse.routes(), slg_resourse.allowedMethods());
router.use(slg_server_info.routes(), slg_server_info.allowedMethods());
router.use(slg_audt_server.routes(), slg_audt_server.allowedMethods());
router.use(slg_server_update.routes(), slg_server_update.allowedMethods());
router.use(env.routes(), env.allowedMethods());

module.exports = router;
