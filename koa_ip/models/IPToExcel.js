/**
 * Created by jiangxu on 2017/7/17.
 */
const fs = require('fs');
const superagent = require('superagent');
const Excel = require('exceljs');
const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('Data');
const fileName = '../IP数据.xlsx';

// 读取 txt文件
fs.readFile('../register.txt', 'utf8', function (err, data) {
    if (err) {
        console.log(err);
        console.log('导入出错！');
    } else {
        console.log('正在导入！');

        queryIp(data);
    }
});

function queryIp(data) {
    let matchIp = new RegExp("((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)", "gi");
    let country;
    let countrys = [];
    if (matchIp.test(data)) {
        let matchIpArr = data.match(matchIp);
        let i = 0;
        let TimerBack = function (callback) {
            let Timer = setInterval(function () {
                if (i != matchIpArr.length) {
                   superagent.get('http://ip.soshoulu.com/ajax/shoulu.ashx')
                      .query({_type: 'ipsearch', ip: matchIpArr[i], px: '1'})
                      .end((err, sres) => {
                          if (err) {
                             console.log(err);
                             console.log('ip请求时出错！');
                          } else {
                              country = sres.text.toString().split(new RegExp(" |$"))[0];
                              // console.log(222)
                              console.log('解析完成IP：' + matchIpArr[i] + ', 所在国家：' + country);
                              countrys.push(country);
                          }
                      });
                   i++;
                } else {
                    clearInterval(Timer);
                    callback(data, countrys);
                }
            }, 100)
        };
        TimerBack(function (data, countrys) {
            writeData(data,countrys);
        });
    }
    // console.log(111)
}

// 将匹配的数据，加入到 excel 中
function writeData(data, countrys) {
    let matchTime = new RegExp("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}", "gi");
    let matchUid = new RegExp("\\d{14}", "gi");
    let matchIp = new RegExp("((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)", "gi");

    if ( matchTime.test(data) && matchUid.test(data) && matchIp.test(data) ) {

// 匹配 与正则一致的 结果
        let matchTimeArr = data.match(matchTime);
        let matchUidArr = data.match(matchUid);
        let matchIpArr = data.match(matchIp);
         // console.log(matchTimeArr);

// excel 表头
        worksheet.columns = [
            { header: 'dtEventTime', key: 'eventTime' },
            { header: 'UID', key: 'uid' },
            { header: 'IP', key: 'ip' },
            { header: 'Country', key: 'country' }
        ];

//excel 各行 数据 （循环输出）
        for (let i=0; i<matchTimeArr.length; i++) {
            worksheet.addRow( { eventTime: matchTimeArr[i], uid: matchUidArr[i], ip: matchIpArr[i], country: countrys[i] } );
            console.log(matchTimeArr[i] + ' ' + matchUidArr[i] + ' ' + matchIpArr[i] + ' ' + countrys[i]);
        }

//写入到 excel 中 （该方法比较耗内存！）
        workbook.xlsx.writeFile(fileName)
            .then(function () {
            console.log('导入完毕！');
        });
    }
}
