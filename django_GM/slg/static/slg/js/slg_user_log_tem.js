/**
 * Created by HaHei on 2017/10/27 15:28.
 *  玩家日志管理
 */

// 标签切换
var showDiv;
$(document).ready(function () {
    $('a[data-toggle="tab"]').click(function () {
        $('#' + showDiv + 'Div').hide();
        showDiv = $(this).attr('id');
        $('#' + showDiv + 'Div').show();
    })
});

// 加载 jedate
$(document).ready(function () {
   $.jeDate('.myTime', {
       festival: false,
       format: 'YYYY-MM-DD'
   })
});

// 玩家日志 查询
$(document).ready(function () {
   $('#playerLogBtn').click(function () {
       if ( !$('#logType').val() ) {
           alert('日志类型不能为空！');
           return false;

       } else if ( !$('#UID').val() ) {
           alert('UID不能为空！');
           return false;

       } else {
           createPlayerFeaturesFlowTable();
       }
   })
});

// 玩家特征 表格 输出
function createPlayerFeaturesFlowTable() {
    $('#playerLogTableDiv').hide();
    $('#playerLogTable').bootstrapTable('destroy');

    postFeaturesData = function () {
        var temp = {
            "logType": $('#logType').val(),
            "eventStartTime": $('#eventStartTime').val(),
            "eventEndTime": $('#eventEndTime').val(),
            "UID": $('#UID').val()
        };
        return temp;
    };

    if ( $('#logType').val() == 'PlayerFeaturesFlow' ) {
        var columsContent = [{
            field: 'nickname',
            title: '玩家昵称',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'uid',
            title: 'UID',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'zoneID',
            title: '区服',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'channelID',
            title: '平台',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'playerLevel',
            title: '玩家等级',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'castleLevel',
            title: '城堡等级',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'statisticalDate',
            title: '统计日期',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'lastLoginDate',
            title: '最后登陆日期',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'onlineTime',
            title: '在线时长',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'rechargeValue',
            title: '充值金额',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'diamondValue',
            title: '钻石存量',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'coinValue',
            title: '金币存量',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'woodValue',
            title: '木材存量',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'stoneValue',
            title: '石头存量',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'steelValue',
            title: '铁矿存量',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'vipLevel',
            title: 'VIP等级',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'vipStatus',
            title: 'VIP激活状态',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'battleValue',
            title: '战斗力',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'country',
            title: '国家',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'language',
            title: '语言',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }];
    } else if ( $('#logType').val() == 'BattleValueStructure' ) {
        var columsContent = [{
            field: 'nickname',
            title: '玩家昵称',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'uid',
            title: 'UID',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'zoneID',
            title: '区服',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'channelID',
            title: '平台',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'playerLevel',
            title: '玩家等级',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'statisticalDate',
            title: '统计日期',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'lastLoginDate',
            title: '最后登陆日期',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'battleValue',
            title: '总战斗力',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'buildValue',
            title: '城建战斗力',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'soldierValue',
            title: '部队战力',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'techValue',
            title: '科技战力',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'demnodProfile',
            title: '宝石加成',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'equipmentProfile',
            title: '装备加成',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'buildProfile',
            title: '建筑等级',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'talentProfile',
            title: '天赋加成',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'otherProfile',
            title: '其它加成',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }];
    } else if ( $('#logType').val() == 'LogDetails' ) {
        var columsContent = [{
            field: 'nickname',
            title: '玩家昵称',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'uid',
            title: 'UID',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'zoneID',
            title: '区服',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'channelID',
            title: '平台',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'playerLevel',
            title: '玩家等级',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'behaviorType',
            title: '行为类型',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'resourceType',
            title: '资源类型',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'behaviorRemark',
            title: '行为备注',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'afterBehaviorAmount',
            title: '行为后的数量',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'behaviorAmount',
            title: '行为涉及的数量',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'behaviorTime',
            title: '行为时间',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }];
    }

    $('#playerLogTable').bootstrapTable({
        url: '/queryPlayerLog',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        queryParams: postFeaturesData,
        cache: false,
        pagination: true,
        sidePageination: 'client',
        pageNumber: 1,
        pageSize: 20,
        pageList: [10, 25, 50],
        height: 420,
        silent: true,
        showExport: true,
        exportDataType: 'all',
        columns: columsContent,
        responseHandler: function (res) {
            console.log(res);
            $('#playerLogTableDiv').show();
            if (res == 0) {
                $('#playerLogTable').bootstrapTable('destroy');  // 返回 没有匹配到 相关数据
                //alert('没有相关数据！');
                return false;

            } else {
                return res['rows'];
            }
        },
        onLoadError: function (status, res) {
            console.log(status);
            $('#playerLogTableDiv').hide();
            $('#playerLogTable').bootstrapTable('destroy');
            alert(res.statusText);
        }
    })
}


// 流失玩家 查询
$(document).ready(function () {
   $('#queryPlayer').click(function () {
       if ( !$('#zoneID').val() ) {
           alert('区服不能为空！');
           return false;

       } else if ( !$('#channelID').val() ) {
           alert('平台不能为空！');
           return false;

       } else if ( !$('#lostDay').val() ) {
           alert('流失天数不能为空！');
           return false;

       } else if ( !$('#registerTime').val() ) {
           alert('注册时间不能为空！');
           return false;

       } else {
           createLostPlayerTable();
       }
   })
});

// 流失玩家 数据表格 输出
function createLostPlayerTable() {
    $('#queryLostPlayerDiv').hide();
    $('#queryLostPlayerTable').bootstrapTable('destroy');

    postQueryLostPlayerData = function () {
        var temp = {
            "zoneID": $('#zoneID').val(),
            "channelID": $('#channelID').val(),
            "lostDay": $('#lostDay').val(),
            "registerTime": $('#registerTime').val()
        };
        return temp;
    };

    $('#queryLostPlayerTable').bootstrapTable({
        url: '/queryLostPlayer',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        queryParams: postQueryLostPlayerData,
        cache: false,
        pagination: true,
        sidePageination: 'client',
        pageNumber: 1,
        pageSize: 20,
        pageList: [10, 25, 50],
        height: 420,
        silent: true,
        showExport: true,
        exportDataType: 'all',
        columns: [{
            field: 'zoneID',
            title: '区服',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'channelID',
            title: '平台',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'nickname',
            title: '昵称',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'uid',
            title: 'UID',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }],
        responseHandler: function (res) {
            console.log(res);
            $('#queryLostPlayerDiv').show();
            if (res == 0) {
                $('#queryLostPlayerTable').bootstrapTable('destroy');  // 返回 没有匹配到 相关数据
                //alert('没有相关数据！');
                return false;

            } else {
                return res['rows'];
            }
        },
        onLoadError: function (status, res) {
            console.log(status);
            $('#queryLostPlayerDiv').hide();
            $('#queryLostPlayerTable').bootstrapTable('destroy');
            alert(res.statusText);
        }
    })
}

// 日志详情 查询
$(document).ready(function () {
   $('#logDetailsBtn').click(function () {
       if ( !$('#log_UID').val() ) {
           alert('UID不能为空！');
           return false;

       }
   })
});
