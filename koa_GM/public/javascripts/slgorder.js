/**
 * Created by jiangxu on 2017/8/17.
 * 订单管理 前端js代码
 */
// 日期 插件 初始化
$(document).ready(
    $.jeDate('.myTime', {
        festival: false,
        format: 'YYYY-MM-DD hh:mm:ss',
    })
);

// 输入验证 及 ajax
$(document).ready(
    $('#submitOrderFormBtn').click(function () {
        if ( !$('#rechargeBeginTime').val() || !$('#rechargeEndTime').val() ) {
            alert('充值时间不能为空！');
            return false;

        } else {
            $.ajax({
                url: '/slgorder/queryOrder',
                type: 'post',
                data: {
                    'zoneID': $('#zoneID').val(),
                    'platform': $('#platform').val(),
                    'payType': $('#payType').val(),
                    'orderStatus': $('#orderStatus').val(),
                    'country': $('#country').val(),
                    'currency': $('#currency').val(),
                    'gameOrderNumber': $('#gameOrderNumber').val(),
                    'platformOrderNumber': $('#platformOrderNumber').val(),
                    'openID': $('#openID').val(),
                    'uid': $('#uid').val(),
                    'rechargeMinMoney': $('#rechargeMinMoney').val(),
                    'rechargeMaxMoney': $('#rechargeMaxMoney').val(),
                    'rechargeBeginTime': $('#rechargeBeginTime').val(),
                    'rechargeEndTime': $('#rechargeEndTime').val(),
                    'arriveBeginTime': $('#arriveBeginTime').val(),
                    'arriveEndTime': $('#arriveEndTime').val(),
                    'registerBeginTime': $('#registerBeginTime').val(),
                    'registerEndTime': $('#registerEndTime').val()
                },
                dataType: 'json',
                success: function (data, textStatus) {
                    var html;
                    $('#queryOrdersBody').empty();
                    $('#queryOrdersDiv').hide();

                    if ( data.length === 0 ) {
                        alert('没有订单数据！');
                        return false;

                    } else {
                        $('#queryOrdersBody').empty();
                        var rechargeTypes = ['普通充值', '礼包充值', '月卡'];
                        var orderStatus = {'1': '成功', '2': '已创建', '0': '已取消', '-1': '非法', '-2': '已退款'};
                        data.forEach(function (data) {
                            html += '<tr>' +
                                        '<td>' + data.platformOrder + '</td>' +
                                        '<td>' + data.gameOrder + '</td>' +
                                        '<td>' + data.nickName + '</td>' +
                                        '<td>' + data.gameName + '</td>' +
                                        '<td>' + data.zoneID + '</td>' +
                                        '<td>' + data.payType + '</td>' +
                                        '<td>' + data.rechargeCount + '</td>' +
                                        '<td>' + data.rechargeMoney.toFixed(2) + '</td>' +
                                        '<td>' + orderStatus[data.orderStatus] + '</td>' +
                                        '<td>' + moment(data.rechargeTime).format('YYYY-MM-DD hh:mm:ss') + '</td>' +
                                        '<td>' + moment(data.arriveTime).format('YYYY-MM-DD hh:mm:ss') + '</td>' +
                                        '<td>' + moment(data.registerTime).format('YYYY-MM-DD hh:mm:ss') + '</td>' +
                                        '<td>' + data.OpenID + '</td>' +
                                        '<td>' + data.UID + '</td>' +
                                        '<td>' + rechargeTypes[data.rechargeType] + '</td>' +
                                        '<td>' + data.giftID + '</td>' +
                                        '<td>' + data.country + '</td>' +
                                        '<td>' + data.currency + '</td>' +
                                    '</tr>';
                        });
                        $('#queryOrdersBody').append(html);
                        $('#queryOrdersDiv').show();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    })
);

// 订单汇总 输入验证 及 ajax
$(document).ready(
    $('#orderSummaryBtn').click(function () {
        if ( !$('#rechargeBeginTime').val() || !$('#rechargeEndTime').val() ) {
            alert('充值时间不能为空！');
            return false;

        } else {
            $.ajax({
                url: '/slgorder/allOrder',
                type: 'post',
                data: {
                    'zoneID': $('#zoneID').val(),
                    'platform': $('#platform').val(),
                    'payType': $('#payType').val(),
                    'orderStatus': $('#orderStatus').val(),
                    'country': $('#country').val(),
                    'currency': $('#currency').val(),
                    'gameOrderNumber': $('#gameOrderNumber').val(),
                    'platformOrderNumber': $('#platformOrderNumber').val(),
                    'openID': $('#openID').val(),
                    'uid': $('#uid').val(),
                    'rechargeMinMoney': $('#rechargeMinMoney').val(),
                    'rechargeMaxMoney': $('#rechargeMaxMoney').val(),
                    'rechargeBeginTime': $('#rechargeBeginTime').val(),
                    'rechargeEndTime': $('#rechargeEndTime').val(),
                    'arriveBeginTime': $('#arriveBeginTime').val(),
                    'arriveEndTime': $('#arriveEndTime').val(),
                    'registerBeginTime': $('#registerBeginTime').val(),
                    'registerEndTime': $('#registerEndTime').val()
                },
                dataType: 'json',
                success: function (data, textStatus) {
                    var html;
                    $('#orderSummaryBody').empty();
                    $('#orderSummaryDiv').hide();

                    if (data == 0) {
                        alert('没有订单数据！');
                        return false;

                    } else {
                        $('#orderSummaryBody').empty();
                        for (let i=0; i<data.getResults.currencys.length; i++) {

                            for (let j=0; j<data.countInfos.length; j++) {
                                if ( data.countInfos[j].name == data.getResults.currencys[i] ) {
                                    var orderCount = data.countInfos[j].orderCount;
                                    var rechargePeopleCount = data.countInfos[j].rechargePeopleCount;
                                }
                            }
                            html += '<tr>' +
                                        '<td>' + data.getResults.currencys[i] + '</td>' +
                                        '<td>' + rechargePeopleCount + '</td>' +
                                        '<td>' + orderCount + '</td>' +
                                        '<td>' + data.getResults.rechargeMoneys[i] + '</td>' +
                                        '<td>' + data.getResults.rates[i] + '</td>' +
                                        '<td>' + data.getResults.USDmoneys[i] + '</td>' +
                                    '</tr>';
                        }
                        $('#orderSummaryBody').append(html);
                        $('#orderSummaryDiv').show();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    })
);
