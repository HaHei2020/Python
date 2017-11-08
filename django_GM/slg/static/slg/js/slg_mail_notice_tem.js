/**
 * Created by jiangxu on 2017/9/26.
 * 公告管理
 */

// 显示 不同的 子Div
var showDivId;
$(document).ready(function () {
    $('a[data-toggle="tab"]').click(function () {
        $('#logsResult').hide();
        $('#' + showDivId + 'Div').hide();
        showDivId = $(this).attr('id');
        $('#' + showDivId + 'Div').show();
    })
})

// 加载 jedate
$(document).ready(function () {
    $.jeDate('.myTime',{
        festival: false,
        format: 'YYYY-MM-DD hh:mm:ss'
    })
})

// 流失天数显示
$(document).ready(function () {
    $('#mailType').change(function () {
        if ( $('#mailType').val() == 'returnMail') {
            $('#lostDayDiv').show();

        } else {
            $('#lostDay').val('');
            $('#lostDayDiv').hide();
        }
    })
})

// 添加 更多 按钮
var addCount = 1;
$(document).ready(function () {
   $('#addMoreBtn').click(function () {
       if (addCount >= 4) {
           alert('最多可添加4个！');
           return false;

       } else {
           addCount++;
           var addContent = $('.rewardDiv').prop('outerHTML');  // 包含 本身的div 即：rewardDiv
           $('#addDiv').append(addContent);
       }
   })
});

// 发送邮件 请求
$(document).ready(function () {
   $('#sendMailBtn').click(function () {
       var num = 0;
       var rewardsParams = {};
       var rewardsList = [];
       var canAjax = true;
       if ( !$('#zoneID').val() ) {
           alert('区服不能为空！');
           return false;

       } else if ( !$('#language').val() ) {
           alert('发送语言不能为空！');
           return false;

       } else if ( !$('#playerLowLevel').val() ) {
           alert('玩家最低等级不能为空！');
           return false;

       } else if ( !$('#playerHighLevel').val() ) {
           alert('玩家最高等级不能为空！');
           return false;

       } else if ( !$('#sendTime').val() ) {
           alert('发送时间不能为空！');
           return false;

       } else if ( !$('#mailTitle').val() ) {
           alert('邮件标题不能为空！');
           return false;

       } else if ( !$('#mailContent').val() ) {
           alert('邮件正文不能为空！');
           return false;

       } else if ( !$('#remarks').val() ) {
           alert('备注不能为空！');
           return false;

       } else {
           if ($('.rewardDiv').length >1 || $('#rewardsID').val() || $('#rewardsAmount').val() ) {
               canAjax = false;
               $('.rewardDiv').each(function () {
                   var rewardsType = $(this).find('[name="rewardsType"]');
                   var rewardsID = $(this).find('[name="rewardsID"]');
                   var rewardsAmount = $(this).find('[name="rewardsAmount"]');
                   rewardsParams = {
                       "rewardsType": rewardsType.val(),
                       "rewardsID": rewardsID.val(),
                       "rewardsAmount": rewardsAmount.val()
                   };
                   rewardsList.push(rewardsParams);
                   num++;
               });
               for (var len = 0; len < rewardsList.length; len++) {
                   if (!rewardsList[len].rewardsID || !rewardsList[len].rewardsAmount) {
                       alert('奖品参数不能为空！');
                       rewardsList = [];
                       return false;

                   } else if (len == rewardsList.length-1) {
                       canAjax = true;
                   }
               }
           }
           if (canAjax) {
               $.ajax({
                   url: '/sendMail',
                   type: 'POST',
                   data: {
                       zoneID: JSON.stringify($('#zoneID').val()),
                       language: JSON.stringify($('#language').val()),
                       mailType: $('#mailType').val(),
                       lostDay: $('#lostDay').val(),
                       playerLowLevel: $('#playerLowLevel').val(),
                       playerHighLevel: $('#playerHighLevel').val(),
                       sendTime: $('#sendTime').val(),
                       nickname: $('#nickname').val(),
                       mailTitle: $('#mailTitle').val(),
                       mailContent: $('#mailContent').val(),
                       mailVersion: $('#mailVersion').val(),
                       remarks: $('#remarks').val(),
                       sender: $('#sender').val(),
                       rewardsList: JSON.stringify(rewardsList)
                   },
                   success: function (data, textStatus) {
                       if (data == 0) {
                           alert('发送成功！');
                       } else if (data == -1) {
                           alert('发送失败！');
                       }
                   },
                   error: function (XMLHttpRequest, textStatus, errorThrown) {
                       alert(errorThrown);
                   }
               })
           }
       }
   })
});

// 查询邮件 请求
$(document).ready(function () {
    $('#queryLogsBtn').click(function () {
        var queryLogsType = $('#queryLogsType').val();
        $.ajax({
            url: '/queryLogs',
            type: 'POST',
            data: {
                queryLogsType: queryLogsType
            },
            success: function (data, textStatus) {
                if (data == 0) {
                    $('#' + queryLogsType + 'Div').hide();
                    $('#logsResult').empty();
                    alert('没有数据！');

                } else if (data == -1) {
                    alert('服务器错误！');

                } else {
                    $('#logsResult').html(data);
                    $('#' + queryLogsType + 'Div').show();
                    $('#logsResult').show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
})