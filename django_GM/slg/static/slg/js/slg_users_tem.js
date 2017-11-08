/**
 * Created by jiangxu on 2017/9/19.
 * 玩家管理
 */

// 显示 不同的 子Div
var showDivId;
$(document).ready(function () {
   $('a[data-toggle="tab"]').click(function () {
       $('#' + showDivId + 'Div').hide();
       showDivId = $(this).attr('id');
       $('#' + showDivId + 'Div').show();
   })
});

// 增加士兵，添加更多
var addCount = 1;
$(document).ready(function () {
    $('#addMoreBtn').click(function () {
        var addMoreDiv = $('#soliders_list').html();

        if (addCount <= 3) {
            $(this).before(addMoreDiv);
            addCount++;
        } else {
            alert('不能超过4个！')
        }

    })
});

// 查询玩家
$(document).ready(function () {
    $('#querySubmitBtn').click(function () {
        var queryServerID = $('#queryServerID option:selected').val();
        var queryType = $('#queryType option:selected').val();
        var queryInput = $('#queryInput').val();

        if (!queryInput) {
            alert('请求参数不能为空！');
            return false;

        } else if (queryType == 'uid' && queryInput.length != 14) {
            alert('UID不符合长度！');
            return false;

        } else if (queryType == 'uid' && isNaN(queryInput)) {
            alert('UID非法！');
            return false;

        } else {
            $.ajax({
                url: '/queryPlayer',
                type: 'POST',
                data: {
                    queryServerID: queryServerID,
                    queryType: queryType,
                    queryInput: queryInput
                },
                // dataType: 'json',
                success: function (data, textStatus) {
                    if (data == -1) {
                        alert('服务器错误！');

                    } else if (data == 0) {
                        $('#userInfo').hide();
                        $('#' + showDivId + 'Div').hide();
                        alert('该玩家不存在！');

                    } else {
                        $('#infomation').html(data);
                        $('#userInfo').show();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    })
});

// 发送奖励
$(document).ready(function () {
    $('#sendRewardBtn').click(function () {
        var sendRewardType = $('#sendRewardType option:selected').val();
        var sendRewardAmount = $('#sendRewardAmount').val();

        if (!sendRewardAmount) {
            alert('参数不能为空！');
            return false;

        } else {
            $.ajax({
                url: '/sendReward',
                type: 'POST',
                data: {
                    queryServerID: $('#queryServerID option:selected').val(),
                    queryType: $('#queryType option:selected').val(),
                    queryInput: $('#queryInput').val(),
                    sendRewardType: sendRewardType,
                    sendRewardAmount: sendRewardAmount
                },
                success: function (data, textStatus) {
                   if (data == 1) {
                       alert('发送成功！');

                   } else if (data == -1) {
                       alert('存量不能为负！')
                   }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }

    })
});