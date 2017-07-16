const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

// 路由信息
// const index = require('./routes/index')
// const users = require('./routes/users')
const routes = require('./routes/routes');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
// 静态资源目录，必要时可以用 console.log(__dirname + '\\public')去查看 拼接的路径对不对
app.use(require('koa-static')(__dirname + '\\public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 注册路由  routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(routes.routes(), routes.allowedMethods());

//监听事件
app.listen(3000, function () {
    console.log('服务器起来了！');
});

//局域网访问   http://192.168.20.197:3000
// app.listen(3000, '192.168.20.197', function () {
//     console.log('服务器起来了！');
// });


module.exports = app;
