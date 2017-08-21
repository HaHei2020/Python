const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const ejs = require('koa-ejs');
const path = require('path');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session-minimal');
const MySQLStore = require('koa-mysql-session');
const Config = require('./config');

const routes = require('./routes/routes');

// error handler
onerror(app);

// middlewares
const THIRTY_MINTUES = 15 * 24 * 60 * 60 * 1000;   //15天，单位：ms
app.keys = [Config.key];
app.use(session({
    key: 'loginUser',   //设置 cookie 存储名称
    prefix: 'koa_loginUser',   //设置 数据库session表 存储名称
    store: new MySQLStore(Config),
    rolling: true,
    cookie: {
      maxAge: THIRTY_MINTUES,
      signed: true
    }
}));

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));

app.use(json());

app.use(logger());

// 静态资源目录，必要时可以用 console.log(__dirname + '\\public')去查看 拼接的路径对不对
app.use(require('koa-static')(__dirname + '\\public'));

// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }));

ejs(app, {
    root: path.join(__dirname, '/views'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: false
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(routes.routes(), routes.allowedMethods());

//设置监听
// app.listen(3000, function () {
//     console.log('服务器起来了！');
// });

//局域网访问   http://192.168.20.197:3000
app.listen(3000, '192.168.20.197', function () {
    console.log('服务器起来了！');
});

module.exports = app;
