/**
 * Created by jiangxu on 2017/9/21.
 * 联盟管理
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

// 联盟信息
$(document).ready(function () {
    $('#allianceInfo').click(function () {
        if ( !$('#allianceName').val() ) {
            alert('联盟名称不能为空！');
            return false;

        } else {
            $.ajax({
                url: '/queryAlliance',
                type: 'POST',
                data: {
                    serverID: $('#serverID option:selected').val(),
                    allianceName: $('#allianceName').val()
                },
                success: function (data, textStatus) {
                    if (data == -1) {
                        alert('服务器错误！');

                    } else if (data == 0) {
                        // $('#information').hide();
                        $('#' + showDivId + 'Div').hide();
                        alert('该联盟不存在！');

                    } else {
                        $('#information').html(data);
                        $('#allianceInfoDiv').show();
                        // $('#information').show();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    })
});


// 联盟成员
$(document).ready(function () {
   $('#membersInfo').click(function () {
       if ( !$('#allianceName').val() ) {
           alert('联盟名称不能为空！');
           return false;

       } else {
           $.ajax({
               url: '/queryAllianceMembers',
               type: 'POST',
               data: {
                   serverID: $('#serverID option:selected').val(),
                   allianceName: $('#allianceName').val()
               },
               success: function (data, textStatus) {
                    if (data == -1) {
                        alert('服务器错误！');

                    } else if (data == 00) {
                        // $('#information').hide();
                        $('#' + showDivId + 'Div').hide();
                        alert('该联盟不存在！');

                    } else if (data == 0) {
                        // $('#information').hide();
                        $('#' + showDivId + 'Div').hide();
                        alert('该联盟没有成员！');

                    } else {
                        $('#information').html(data);
                        $('#membersInfoDiv').show();
                        // $('#information').show();
                    }
               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                   alert(errorThrown);
               }
           })
       }
   })
});

// 修改信息
$(document).ready(function () {
   $('#changeInfo').click(function () {
       $('#changeInfoDiv').show();
   });

   $('#changeInfoBtn').click(function () {
       if ( !$('#allianceName').val() ) {
           alert('联盟名称不能为空！');
           return false;

       } else {
           $.ajax({
               url: '/changeAllianceInfo',
               type: 'POST',
               data: {
                   serverID: $('#serverID option:selected').val(),
                   allianceName: $('#allianceName').val(),
                   changeType: $('#changeType').val(),
                   changeAmount: $('#changeAmount').val()
               },
               success: function (data, textStatus) {
                    if (data == -1) {
                        alert('服务器错误！');

                    } else if (data == 00) {
                        alert('该联盟不存在！');

                    } else if (data == -2) {
                        alert('存量不能为负！');

                    } else if (data == 1) {
                        alert('发送成功！');
                    }
               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                   alert(errorThrown);
               }
           })
       }
   })
});