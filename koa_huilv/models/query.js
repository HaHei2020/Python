/**
 * Created by jiangxu on 2017/7/7.
 */
const superagent = require('superagent');
const charset = require('superagent-charset');
const cheerio = require('cheerio');

charset(superagent);

function Rate(from, to, queryNumber) {
    this.from = from;
    this.to = to;
    this.queryNumber = queryNumber;
}

module.exports = Rate;

Rate.query = function query(rate) {
    return new Promise((resolve, reject) => {
        "use strict";
        let URL = 'http://qq.ip138.com/hl.asp?from=' + rate.from + '&to=' + rate.to + '&q=' + rate.queryNumber;
        superagent.get(URL)
        .charset('gbk')
        .end((err, sres)=> {
          if (err) {
             return reject(err);
          }
          var $ = cheerio.load(sres.text);
          var queryResult = [];
          queryResult[0] = $(".rate td").eq(4).text();
          queryResult[1] = $(".rate td").eq(5).text();
          return resolve(queryResult);
       })
    })

};
