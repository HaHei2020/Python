/**
 * Created by jiangxu on 2017/7/30.
 * slguser_list_table.ejs Jq操作
 */
var ShowDivId;
$(document).ready(
    $('#sendRewardsBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#sendRewards';
        $('#sendRewards').show();
    }),
    $('#sendItemsBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#sendItems';
        $('#sendItems').show();
    }),
    $('#sendDragonBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#sendDragon';
        $('#sendDragon').show();
    }),
    $('#userInfoBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#userInfo';
        $('#userInfo').show();
    }),
    $('#userBlockBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#userBlock';
        $('#userBlock').show();
    }),
    $('#userNotBlockBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#userNotBlock';
        $('#userNotBlock').show();
    }),
    $('#userTeleportBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#userTeleport';
        $('#userTeleport').show();
    }),
    $('#userBindBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#userBind';
        $('#userBind').show();
    }),
    $('#sendGiftsBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#sendGifts';
        $('#sendGifts').show();
    }),
    $('#addSoldiersBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#addSoldiers';
        $('#addSoldiers').show();
    })
);

//增加士兵  "添加其他" 功能
var addCount = 1;
$(document).ready(
    $('#addOthersBtn').click(function () {
        addCount ++;
        if (addCount > 4) {
            alert('最多只能同时发送4个！');
            return false;
        }
        var $p = $(
            '<p>' +
            '<label for="addSoldiersID">士兵ID：</label>' +
            '<input type="text" name="addSoldiersID" id="addSoldiersID" style="width: 180px;">' +
            '</p>' +
            '<p>' +
            '<label for="addSoldiersNumber">士兵数量：</label>' +
            '<input type="text" name="addSoldiersNumber" id="addSoldiersNumber" style="width: 180px;">' +
            '</p>'
        );
        $('#appendPlace').after($p);
    }),
);

// 玩家迁城，点击 “迁入坐标”、“迁出坐标”，输入框清空
$(document).ready(
    $('#teleportCoordsX').focus(function () {
        $('#teleportCoordsX').val('');
    }),
    $('#teleportCoordsY').focus(function () {
        $('#teleportCoordsY').val('');
    }),
);

// 不需要返回值的，可以用ajax发送请求； 如果需要返回值，最好通过 表单自己的submit去提交，这样返回值可以很好的发送出去，便于前端接收！！！
/*
* 直接发奖，请求
* 没有做如下请求：（数据库没有对应字段）
* （1）VIP经验
* （2）领主经验
* （3）联盟捐献
* （4）全套装备
* （5）锻造值
*/
$(document).ready(
    $('#submitSendRewardsBtn').click(function () {
        if ( !$('#sendAttributeValue').val() ) {
            alert('查询参数不能为空！');
        } else {
            var confirmResult = confirm('确认进行该操作？');
            if (confirmResult) {  // “确认”，返回 True
                $.ajax({
                    url: '/slguser/sendRewards',
                    type: 'post',
                    data: {
                        zoneID: $('#userRecord > #zoneID').text(),
                        nickName: $('#userRecord > #nickName').text(),
                        sendAttributeType: $('#sendAttributeType').val(),
                        sendAttributeValue: $('#sendAttributeValue').val()
                    },
                    dataType: 'json',
                    success: function (data, textStatus) {
                        if (data === 1) {
                            alert('写入成功');

                        } else if (data === -1) {
                            alert('不支持这些字段');

                        } else if (data === 0) {
                            alert('写入失败');
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                })
            }
        }
    })
);

// 玩家禁封，请求
$(document).ready(
// 如果 “禁封方式”为：永久，则隐藏 “禁封时长”
    $('#userBlockWay').change(function () {
        if ( $('#userBlockWay').val() === 'permanent') {
           $('#userBlockTimeP').hide();

        } else {
           $('#userBlockTimeP').show();
        }
    }),

    $('#submitUserBlockBtn').click(function () {
        if ( !$('#userBlockTime').val() && $('#userBlockWay').val() != 'permanent' ) {
            alert('查询参数不能为空！');
        } else {
            var confirmResult = confirm('确认进行该操作？');
            if (confirmResult) {
                $.ajax({
                    url: '/slguser/userBlock',
                    type: 'post',
                    data: {
                        zoneID: $('#userRecord > #zoneID').text(),
                        nickName: $('#userRecord > #nickName').text(),
                        userBlockType: $('#userBlockType').val(),
                        userBlockWay: $('#userBlockWay').val(),
                        userBlockTime: $('#userBlockTime').val()
                    },
                    dataType: 'json',
                    success: function (data, textStatus) {
                        if (data === 1) {
                            alert('禁封成功！');
                        } else if (data === 0) {
                            alert('禁封失败！');
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                })
            }
        }
    })
);

// 玩家解封，请求
$(document).ready(
    $('#submitUserNotBlockBtn').click(function () {
        $.ajax({
            url: '/slguser/userNotBlock',
            type: 'post',
            data: {
                zoneID: $('#userRecord > #zoneID').text(),
                nickName: $('#userRecord > #nickName').text(),
                userNotBlockType: $('#userNotBlockType').val()
            },
            dataType: 'json',
            success: function (data, textStatus) {
                if (data === 1) {
                    alert('解封成功！');
                } else if (data === 0) {
                    alert('解封失败！');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
);