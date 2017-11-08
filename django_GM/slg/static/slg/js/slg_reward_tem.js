/**
 * Created by HaHei on 2017/11/3 21:11.
 *  礼包奖励
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

// 加载 jeDate
$(document).ready(function () {
   $.jeDate('.myTime', {
       festival: false,
       format: 'YYYY-MM-DD hh:mm:ss'
   })
});

// 加载 file input
$(document).ready(function () {
    $('#playerList').fileinput({
        language: 'zh',
        uploadUrl: '/sendLevelRewards',
        uploadExtraData: {
            zoneID: $('#zoneID').val(),
            sendTime: $('#sendTime').val(),
            sendInterval: Math.abs(parseInt($('#sendInterval').val())),
            sendCount: Math.abs(parseInt($('#sendCount').val()))
        },
        textEncoding: 'UTF-8',
        showUpload: false,
        maxFileCount: 1,
        allowedFileExtensions: ['txt'],
        elErrorContainer: '#fileError',
        msgErrorClass: 'alert alert-block alert-danger',
        showAjaxErrorDetails: false   // 展示错误细节，debug时，可用
    })
});

// 上传前 判断
$(document).ready(function () {
    $('#sendLevelRewardsBtn').click(function () {
        if ( !$('#zoneID').val() ) {
            alert('区服不能为空！');
            return false;

        } else if ( !$('#sendTime').val() ) {
            alert('发送时间不能为空！');
            return false;

        } else if ( !$('#sendInterval').val() ) {
            alert('发送间隔不能为空！');
            return false;

        } else if ( !$('#sendCount').val() ) {
            alert('发送次数不能为空！');
            return false;

        } else if ( !$('#playerList').val() ) {
            alert('玩家列表不能为空！');
            return false;

        } else if ( typeof parseInt($('#sendInterval').val()) != 'number' || typeof parseInt($('#sendCount').val()) != 'number' ) {
            alert('参数必须为数字！');
            return false;

        } else if ( parseInt($('#sendInterval').val()) <= 0 || parseInt($('#sendCount').val()) <= 0 ) {
            alert('参数必须为正整数！');
            return false;

        } else {
            $('#playerList').fileinput('upload');
            // $('#playerList').on('fileuploaded', function (event, data, previewId, index) {
            //     console.log(event);
            //     console.log(data);
            //     console.log(previewId);
            //     console.log(index);
            // });
            // $('#playerList').on('fileuploaderror', function(event, data, msg) {
            //     alert(msg)
            // });
        }
    })
});

// 提交 限时礼包
$(document).ready(function () {
   $('#limitGiftsBtn').click(function () {
       if ( !$('#giftID').val() || !$('#startTime').val() || !$('#endTime').val() || !$('#buyNumbers').val() ) {
           alert('参数不能为空！');
           return false;

       } else {
           $.ajax({
               url: '/limitGifts',
               type: 'POST',
               data: {
                   giftID: $('#giftID').val(),
                   startTime: $('#startTime').val(),
                   endTime: $('#endTime').val(),
                   buyNumbers: $('#buyNumbers').val()
               },
               success: function (data, textStatus) {
                   if (data == 1) {
                       alert('发送成功！');

                   } else {
                       alert(data);  // 发生错误，直接输出
                   }
                   // else if (data == -1) {
                   //     alert('发送失败！未知错误！');
                   // }
               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                   alert(errorThrown);
               }
           })
       }
   })
});


// 删除 限时礼包
$(document).ready(function () {
// 点击了 哪个删除按钮
      $('a[data-toggle="modal"]').click(function () {
           // $(this).parent().siblings()  获取 a 的 父元素 td 的 所有 兄弟节点
          deleteGift = {
              deleteGiftID: $(this).parent().siblings().eq(0).text(),
              deleteStartTime: $(this).parent().siblings().eq(1).text(),
              deleteEndTime: $(this).parent().siblings().eq(2).text(),
              deleteBuyNumbers: $(this).parent().siblings().eq(3).text()
          };
      });

// 发起请求
       $('#confirmDeleteBtn').click(function () {
           $('#deleteGiftsModal').modal('hide');
           $.ajax({
               url: '/deleteGifts',
               type: 'POST',
               data: deleteGift,
               success: function (data, textStatus) {
                   if (data == 1) {
                       alert('删除成功！');
                       window.location.href = 'slg_reward_tem';

                   } else {
                       alert(data);
                   }
               },
               error: function (XMLHttprequest, textStatus, errorThrown) {
                   alert(errorThrown);
               }
           })
       })
});