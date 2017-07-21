const index = require('koa-router')();

index.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
  return next();
});

// 登录页
index.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: '用户登录'
  });
  return next();
});

index.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
});

index.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

module.exports = index;
