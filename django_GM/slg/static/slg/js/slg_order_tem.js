/**
 * Created by HaHei on 2017/10/21 19:20.
 *
 */

// 标签 切换
$(document).ready(function () {
    $('#queryOrderBtn').click(function () {
        $('#order_sum').bootstrapTable('destroy');
        $('#order_sum').hide();
        $('#order_list').show();
    });

    $('#orderSumBtn').click(function () {
        $('#order_list').bootstrapTable('destroy');
        $('#order_list').hide();
        $('#order_sum').show();
    })
});

// 加载 Jedate
$(document).ready(function () {
   $.jeDate('.myTime', {
       festival: false,
       format: 'YYYY-MM-DD hh:mm:ss'
   })
});

// 查询订单 请求
$(document).ready(function () {
    $('#queryOrderBtn').click(function () {
        if ( !$('#rechargeStartTime').val() || !$('#rechargeEndTime').val() ) {
            alert('充值时间不能为空！');

        } else {
            createOrderTable();
        }
    })
});

// 查询订单 返回结果 调用bootstrap-table插件
function createOrderTable(params) {
    $('#order_list').bootstrapTable('destroy');
     postOrderData = function (params) {
        var temp = {
            // limit: params.limit,   //页面大小
            // offset: params.offset,  //页码
            "zoneID": $('#zoneID').val(),
            "channelID": $('#channelID').val(),
            "payType": $('#payType').val(),
            "orderState": $('#orderState').val(),
            "country": $('#country').val(),
            "currency": $('#currency').val(),
            "gameOrderId": $('#gameOrder').val(),
            "channelOrder": $('#channelOrder').val(),
            "UID": $('#UID').val(),
            "rechargeStartMoney": $('#rechargeStartMoney').val(),
            "rechargeEndMoney": $('#rechargeEndMoney').val(),
            "rechargeStartTime": $('#rechargeStartTime').val(),
            "rechargeEndTime": $('#rechargeEndTime').val(),
            "inAccountStartTime": $('#inAccountStartTime').val(),
            "inAccountEndTime": $('#inAccountEndTime').val()
        };
        return temp;
    };

    $('#order_list').bootstrapTable({
        url: '/queryOrder',
        method: 'post',
        // dataType: 'json',
        contentType:"application/x-www-form-urlencoded; charset=UTF-8", // 默认是：'application/json'， 不改的话，后台获取不到数据
        queryParams: postOrderData,
        cache: false,
        pagination: true,
        sidePageination: 'client',
        pageNumber: 1,
        pageSize: 20,
        pageList: [10, 25, 50],
        height: 420,
        uniqueId: 'gameorderid',
        silent: true,    // 刷新服务器数据
        showExport: true,
        exportDataType: 'all',
        columns: [{
            field: 'gameorderid',
            title: '游戏订单号',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'orderid',
            title: '渠道订单号',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'nickname',
            title: '玩家昵称',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'gameName',
            title: '游戏名',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'ZoneId',
            title: '服务器',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
           field: 'Os',
           title: '平台',
           valign: 'middle',
           align: 'left',
           halign: 'center'
        }, {
            field: 'PurchasePlatform',
            title: '支付方式',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'PurchaseTimes',
            title: '充值次数',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'PriceAmount',
            title: '充值金额',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'PurchaseState',
            title: '订单状态',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'PurchaseTime',
            title: '充值时间',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'InAccountTime',
            title: '到账时间',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'RegisterTime',
            title: '注册时间',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'AccountId',
            title: '玩家ID',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'Uid',
            title: '玩家UID',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'ProductType',
            title: '充值类型',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'GiftId',
            title: '礼包ID',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'CountryCode',
            title: '国家',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'PriceCurrencyCode',
            title: '货币',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }],
        // data: [
        //     {"PriceCurrencyCode":222},
        // ]
        responseHandler: function(res) {
            console.log(res);
            if (res == -1) {
                alert('查询出问题！');

            } else if (res == 0) {
                $('#order_list').bootstrapTable('destroy');
                return false;

            } else {
                var orderListData = res['rows'];
                return orderListData;
            }
        },
        onLoadError: function (status) {
            console.log(status);
            $('#order_list').bootstrapTable('removeAll');
        }
    })
}

// 订单汇总 请求
$(document).ready(function () {
    $('#orderSumBtn').click(function () {
        if ( !$('#rechargeStartTime').val() || !$('#rechargeEndTime').val() ) {
            alert('充值时间不能为空！');

        } else {
            createOrderSumTable();
        }
    })
});

// 订单汇总 查询结果返回  调用 bootstrap-table 插件
function createOrderSumTable() {
    $('#order_sum').bootstrapTable('destroy');
    postOrderSumData = function (params) {
        var temp = {
            // limit: params.limit,   //页面大小
            // offset: params.offset,  //页码
            "zoneID": $('#zoneID').val(),
            "channelID": $('#channelID').val(),
            "payType": $('#payType').val(),
            "orderState": $('#orderState').val(),
            "country": $('#country').val(),
            "currency": $('#currency').val(),
            "gameOrderId": $('#gameOrder').val(),
            "channelOrder": $('#channelOrder').val(),
            "UID": $('#UID').val(),
            "rechargeStartMoney": $('#rechargeStartMoney').val(),
            "rechargeEndMoney": $('#rechargeEndMoney').val(),
            "rechargeStartTime": $('#rechargeStartTime').val(),
            "rechargeEndTime": $('#rechargeEndTime').val(),
            "inAccountStartTime": $('#inAccountStartTime').val(),
            "inAccountEndTime": $('#inAccountEndTime').val()
        };
        return temp;
    };
    $('#order_sum').bootstrapTable({
        url: '/orderSum',
        method: 'post',
        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        queryParams: postOrderSumData,
        cache: false,
        pagination: true,
        sidePageination: 'client',
        pageNumber: 1,
        pageSize: 20,
        pageList: [10, 25, 50],
        height: 420,
        silent: true,    // 刷新服务器数据
        // showExport: true,
        // exportDataType: 'all',
        rowStyle: function (row, index) {
            if (index == $('#order_sum').bootstrapTable('getData').length-1) {
                return {
                    css: {
                        // "color": "red",
                        "text-align": "center"
                    }
                };
            }
            return {};
        },
        columns: [{
            field: 'fromCurrency',
            title: '充值货币',
            valign: 'middle',
            // align: 'left',
            // halign: 'center'
        }, {
            field: 'rechargePlayersCount',
            title: '充值人数（去重）',
            valign: 'middle',
            // align: 'left',
            // halign: 'center'
        }, {
            field: 'rechargeOrders',
            title: '充值订单数量',
            valign: 'middle',
            // align: 'left',
            // halign: 'center'
        }, {
            field: 'fromCurrencyAmount',
            title: '充值货币数量',
            valign: 'middle',
            // align: 'left',
            // halign: 'center'
        }, {
            field: 'rate',
            title: '汇率',
            valign: 'middle',
            // align: 'left',
            // halign: 'center'
        }, {
            field: 'toUSDAmount',
            title: '美元',
            valign: 'middle',
            // align: 'left',
            // halign: 'center'
        }],
        responseHandler: function (res) {
            console.log(res);
            var orderSumData = res['rows'];
            return orderSumData;
        },
        onLoadSuccess: function (data) {
            var index = $('#order_sum').bootstrapTable('getData').length-1;
            $('#order_sum').bootstrapTable('mergeCells', {index: index, field: 'rechargePlayersCount', colspan: 5});
        }
    })
}
