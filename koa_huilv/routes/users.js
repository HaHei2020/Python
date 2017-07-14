const users = require('koa-router')()

users.prefix('/users')

users.get('/', async (ctx, next) =>{
  await ctx.render('query', {
    title: '汇率查询网站22'
  })
})

users.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = users
