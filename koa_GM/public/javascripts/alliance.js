/**
 * Created by jiangxu on 2017/8/1.
 * 联盟管理  前端js
 */
var ShowDivId;

$(document).ready(
    $('#queryAllianceBtn').click(function () {
        if ( !$('#allianceName').val() ) {
            alert('查询参数不能为空！');
            return false;
        } else {
            return true;
        }
    }),

// 点击 修改信息
    $('#changeInfoBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#allianceProperty';
        $('#allianceProperty').show();
    }),

    $('#queryDetailsBtn').click(function () {
        if (ShowDivId) {
            $(ShowDivId).hide();
        }
        ShowDivId = '#allianceDetails';
        $('#allianceDetails').show();
    })
);

// 发送 修改信息 请求
$(document).ready(
    $('#submitAlliancePropertyBtn').click(function () {
        if ( !$('#sendAlliancePropertyValue').val() ) {
            alert('修改的属性值不能为空！');

        } else {
            $.ajax({
                url: '/alliance/changeProperty',
                type: 'post',
                data: {
                    zoneID: $('#zoneId').val(),
                    allianceName: $('#allianceName').val(),
                    sendAlliancePropertyType: $('#sendAlliancePropertyType').val(),
                    sendAlliancePropertyValue: $('#sendAlliancePropertyValue').val()
                },
                dataType: 'json',
                success: function (data, textStatus) {
                    if (data === 1) {
                        alert('写入成功！');

                    } else if (data === 0) {
                        alert('写入失败！');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    })
);

// 发送 查找联盟成员 请求
$(document).ready(
    $('#queryDetailsBtn').click(function () {
        $.ajax({
            url: '/alliance/queryDetails',
            type: 'post',
            data: {
                zoneID: $('#zoneId').val(),
                allianceName: $('#allianceName').val()
            },
            dataType: 'json',
            success: function (data, textStatus) {
                if (data === -1) {
                    alert('该联盟没有成员加入！');
                } else { //data为：二维数组
                    $('#detailsTbody').empty();
                    var html;
                    for (var i=0; i<data.length; i++) {
                        html +=  '<tr> <td>' + data[i][0] + '</td>' + '<td>' + data[i][1] + '</td>' + '<td>' + data[i][2] + '</td> </tr>';
                    }
                    $('#detailsTbody').append(html);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
);