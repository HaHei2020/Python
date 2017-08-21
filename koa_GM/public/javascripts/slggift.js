/**
 * Created by jiangxu on 2017/8/10.
 * 礼包管理 前端js代码
 */

// 初始化 日期插件
$(document).ready(
    $.jeDate('.myDate', {
        format: 'YYYY-MM-DD hh:mm:ss',
        festival: false
    })
);

// 输入验证
$(document).ready(
    $('#submitGiftManagerBtn').click(function () {
        if ( !$('#giftID').val() ) {
            alert('礼包ID不能为空！');
            return false;
        }

// 时间大小判断
        var startTime = Date.parse( $('#startTime').val() );  // 转换成 时间戳
        var endTime = Date.parse( $('#endTime').val() );
        if (startTime > endTime) {
            alert('开始时间 不能大于 结束时间！');
            return false;
        }
        if ( !startTime || !endTime) {
            alert('时间不能为空！');
            return false;
        }

// 购买次数 判断
        if ( !$('#buyNumbers').val() ) {
            alert('购买次数不能为空！');
            return false;
        }

        if ( isNaN( $('#buyNumbers').val() ) ) {
            alert('购买次数必须为数字！');
            return false;
        }

        if ( parseInt($('#buyNumbers').val()) - 0 <= 0 ) {
            alert('购买次数必须为正数！');
            return false;
        }
    })
);