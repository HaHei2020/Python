/**
 * Created by HaHei on 2017/11/7 16:16.
 * 客服反馈
 */

// 标签切换
var showDiv;
$(document).ready(function () {
   $('a[data-toggle="tab"]').click(function () {
       $('#' + showDiv + 'Div').hide();
       showDiv = $(this).attr('id');
       $('#' + showDiv + 'Div').show();
   });
});

// 玩家反馈
    // 页面渲染
$(document).ready(function () {
    $('#playerFeedback').click(function () {
       createFeedbackTable();
    });
});

    // 创建/渲染 玩家反馈 信息表
function createFeedbackTable(params) {
    postData = function (params) {
        var temp;
        if (params) {
            temp = {
                "type": params
            }
        } else {  // undefined
           temp = {
               "type": "0"  // 全部
           }
        }
        return temp;
    };

    $('#feedbackTable').bootstrapTable('destroy');
    $('#feedbackTable').bootstrapTable({
        url: '/feedback',
        method: 'get',
        queryParams: postData(params),
        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        uniqueId: 'mid',
        cache: false,   //是否启用 数据缓存
        pagination: true,  //是都分页
        sidePageination: 'client',   //谁来分页，客户端：'client'，服务端：'server'
        pageNumber: 1,   //默认显示 首页
        pageSize: 20,     //每页需要显示的数据量
        pageList: [10, 25, 50],  //可供选择的，每页需要显示的数据量
        height: 420,       //表格高度
        silent: true,    // 刷新服务器数据
        showExport: true,
        exportDataType: 'all',
        // filter: true,
        columns: [{
            field: 'uid',
            title: 'UID',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'mid',
            title: 'MID',
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
            field: 'platID',
            title: '平台',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'channelID',
            title: '渠道',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'language',
            title: '语言',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'type',
            title: typeTitle,
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'summary',
            title: '概述',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'content',
            title: '详细内容',
            width: '600px',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'operateTime',
            title: '操作时间',
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }, {
            field: 'operate',
            title: '操作',
            // events:
            formatter: operateFormatter,
            valign: 'middle',
            align: 'left',
            halign: 'center'
        }],
        responseHandler: function (res) {
            if (res == 0) {
                alert('查询出问题！');
            } else {
                var data = res['rows'];
                return data;
            }
        },
        onLoadError: function (status) {
            $('#feedbackTable').bootstrapTable('removeAll');
        }
        // data: [
        //     {"uid": 222222}
        // ]
    })
}

    // 操作栏 中的 “查看”、“标记”、“回复”
function operateFormatter(value, row, index) {
    return [
        '<div style="text-align: center;">',
            '<a href="javascript:void(0)" id="checkView" data-toggle="checkView" style="margin-right: 15px;">查看</a>',
            '<a href="javascript:void(0)" id="mark" data-toggle="mark" style="margin-right: 15px;">标记</a>',
            '<a href="javascript:void(0)" id="reply" data-toggle="modal" data-target="#replyModal">回复</a>',
        '</div>'
    ].join('');
}

    // 分类 下拉框
typeTitle = '<select name="filterType" id="filterType" style="width: 90%;">' +
                '<option value="">分类</option>' +
                '<option value="0">全部</option>' +
                '<option value="1">错误和问题</option>' +
                '<option value="2">建议</option>' +
                '<option value="3">账户和登录</option>' +
                '<option value="4">付费问题</option>' +
                '<option value="5">资源销售</option>' +
                '<option value="6">过激言论</option>' +
                '<option value="7">游戏帮助</option>' +
                '<option value="8">其他</option>' +
            '</select>';

    // 切换 分类，重新发起请求
$(document).ready(function () {
   $('#feedbackTable').on('post-header.bs.table', function () {   // 表头在 DOM 中，可用！
       $('#filterType').change(function () {
           // console.log($('#filterType').val());
           createFeedbackTable( $('#filterType').val() );
       })
   });
});

// 标记
$(document).ready(function () {
   $('#feedbackTable').on('post-body.bs.table', function () {  // 表体（每一行）在 DOM 中，可用！
       $('a[data-toggle="mark"]').click(function () {
           var markRow = $(this).parents('tr');  // 获取 祖先元素
           var data_index = markRow.attr('data-index');
           var confirmAlert = confirm('确认标记？');
           if (confirmAlert == true) {
               $('#feedbackTable').bootstrapTable('hideRow', {   // 隐藏 某一行
                   index: data_index
               });
           }
       })
   })
});

// 回复
$(document).ready(function () {
    $('#feedbackTable').on('post-body.bs.table', function () {
        $('a[data-toggle="modal"]').click(function () {
           var markRow = $(this).parents('tr');  // 获取 祖先元素
           var data_index = markRow.attr('data-index');
           mid = markRow.attr('data-uniqueid');

           var uid = markRow.children().eq(0).text();  // 获取 uid
           var zoneID = markRow.children().eq(2).text(); // 获取 区服
           $('#replyZoneID').val(zoneID);
           $('#replyUID').val(uid);
        })
    })
});

// 提交 回复
$(document).ready(function () {
   $('#replyBtn').click(function () {
       if ( !$('#replyZoneID').val() || !$('#replyUID').val() || !$('#replyTitle').val() || !$('#replyContent').val() ) {
           alert('参数不能为空！');
           return false;

       } else {
           var postData = {
               "replyZoneID": $('#replyZoneID').val(),
               "replyUID": $('#replyUID').val(),
               "replyTitle": $('#replyTitle').val(),
               "replyContent": $('#replyContent').val(),
               "mid": mid
           };
           $.ajax({
               url: '/replyFeedback',
               type: 'POST',
               data: postData,
               success: function (data, textStatus) {
                   if (data == 1) {
                       alert('发送成功！');

                   } else {
                       alert(data);
                   }
               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                   alert(errorThrown);
               }
           })
       }
   })
});
