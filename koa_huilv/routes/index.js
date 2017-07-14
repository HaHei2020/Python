/**
 * Created by jiangxu on 2017/7/4.
 * index路由
 */
const index = require('koa-router')();

const Rate = require('../models/query');

//存放对应 货币类型 和 国家的 json文件  用 currencyName[xxx] 获取
const currencyName = require('../models/currencyName.json');
/**
 * koa-router 路由匹配优先级 问题：
 * 问题描述： 当 '/router/test' 在 '/test' 的前面，用户访问 '/test' 时，路由会优先匹配到 '/router/test'页面，这是由于在 router.use(routerPage.routes(), routerPage.allowedMethods())时，
 *          没有设置前缀，路由就自动添加了默认前缀 “(.*)”，这里的path路径发生了改变，在路由后续的操作中，将path使用pathToRegExp转换成正则表达式时，
 *          “/s”这个path本应该是 /^\/test.../ 就会变成 /(.*)/\/test.../，那么原本以“/test”开头的路由 就会匹配到 包含“/test”的路由，
 *          所以，request path 为 “/router/test”时，会被 “/test” 路由先匹配到，路由也就不会再往下匹配了。
 * 解决办法：1. 将条件更加精确的路由放到前面，用于优先匹配。
 *         2. 在“/test”路由中，加一个中间件，当匹配到“/router/test”时，await next() 继续向下执行。
 *         3. 更改源码 Router.propertype.use 中，path = "(.*)" 为 path = false。
 *         4. 在“汇总路由信息”功能处，使用 router.use()时，改成：router.use('/', index.routes(), index.allowedMethods());
 * */
index.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '汇率查询网站'
  });
  return next();
});


 // /\/?from=\w*&to=\w*&queryNumber=\d*/
index.get('/s*', async (ctx, next) => {
    // ctx.body = JSON.stringify(ctx.request.body)
    // console.log(ctx.body);
    let rate = new Rate(ctx.query.from, ctx.query.to, ctx.query.queryNumber);
    try {
        let queryResult = await Rate.query(rate);
        await  ctx.render('query', {
            title: '查询结果',
            fromCurrency: ctx.query.from,
            toCurrency: ctx.query.to,
            fromCurrencyResult: currencyName[ctx.query.from],
            toCurrencyResult: currencyName[ctx.query.to],
            queryNumber: ctx.query.queryNumber,
            rate: queryResult[0],
            amount: queryResult[1]
    });
    } catch (err) {
        return next(err);  //将 err 传到 错误模版处
    }
});


index.get('/json', async (ctx, next) => {
  // ctx.body = {
  //   title: 'koa2 json'
  // }
    ctx.body='aaaaa'
});



module.exports = index;
