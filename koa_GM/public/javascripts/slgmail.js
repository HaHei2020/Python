/**
 * Created by jiangxu on 2017/8/9.
 * 邮件管理 前端js代码
 */
// 判断 流失天数 是否显示
$(document).ready(
    $(document).on('change', '#mailType', function () {
        var $mailType = $('#mailType').val();
        if ($mailType === 'recallMail') {
            $('#lostDayP').show();
        } else {
            $('#lostDayP').hide();
        }
    })
);

// 初始化 日期插件
$(document).ready(function () {
    $.jeDate('#myDate', {
        format: 'YYYY-MM-DD hh:mm:ss',
        festival: false
    })
});

// 复选框 显示 及 隐藏
$(document).ready(
    $('#zoneID').focus(function () {
        $('#zoneIDList').show();
    }),
    $('#language').focus(function () {
        $('#languageList').show();
    })
);

// 区服选择 全选，取消全选，单选 实现
$(document).ready(function () {
// 判断 全选 是否取消
    var $subBox = $("input[type=checkbox][name='zoneIDCheckbox']");
    $subBox.click(function () {
        $('#allServer').prop('checked', $subBox.length == $subBox.filter(':checked').length ? true : false);
    });

// 全选 取消全选 功能
    $(document).on('click', '#allServer', function () {
        if ( $('#allServer').is(':checked')) {
            var text = '';

            $('.subServer').each(function () {
                $("input[type=checkbox][name='zoneIDCheckbox']").prop('checked', true);  // 全选

                var value = $(this).val();
                var checked = $(this).is(':checked');
                if (checked) {
                    text += value + '|';
                }
                $('#zoneID').val(text);
            });

        } else {
            $('.subServer').each(function () {
                $("input[type=checkbox][name='zoneIDCheckbox']").prop('checked', false);
                $('#zoneID').val('');
            })
        }
    });

// 单选 功能
    $(document).on('click', '.subServer', function () {
        var text = '';
        $('.subServer').each(function () {
            var value = $(this).val();
            var checked = $(this).is(':checked');
            if (checked) {
                text += value + '|';
            }
            $('#zoneID').val(text);
        })
    })
});

// 目标语言 全选，取消全选，单选 实现
$(document).ready(function () {
// 判断 全选 是否取消
    var $subBox = $("input[type=checkbox][name='languageCheckbox']");
    $subBox.click(function () {
        $('#allLanguage').prop('checked', $subBox.length == $subBox.filter(':checked').length ? true : false);
    });

// 全选 取消全选 功能
    $(document).on('click', '#allLanguage', function () {
        var text = '';
        if ( $('#allLanguage').is(':checked') ) {
            $("input[type=checkbox][name='languageCheckbox']").prop('checked', true);

            $('.subLanguage').each(function () {
                var value = $(this).val();
                var checked = $(this).is(':checked');
                if (checked) {
                    text += value + '|';
                }
                $('#language').val(text);
            })

        } else {
            $("input[type=checkbox][name='languageCheckbox']").prop('checked', false);
            $('#language').val('');
        }
    });

// 单选 功能
    $(document).on('click', '.subLanguage', function () {
        var text = '';
        $('.subLanguage').each(function () {
            var value = $(this).val();
            var checked = $(this).is(':checked');
            if (checked) {
                text += value + '|';
            }
            $('#language').val(text);
        })
    })
});

// 添加奖品 功能
var addCount = 1;
$(document).ready(
    $('#addItemBtn').click(function () {
        addCount++;
        if ( addCount > 4 ) {
            alert('不能超过4个！');
            return false;

        } else {
            var $itemDiv =
                '<div class="itemDiv" style="margin-bottom: 10px;">' +
                    '<p>' +
                        '<label for="itemLists">道具列表</label>' +
                        '<select name="itemLists" id="itemLists" style="margin-left: 15px;">' +
                            '<option value="item">道具</option>' +
                            '<option value="equipment">装备</option>' +
                        '</select>' +
                    '</p>' +
                    '<p>' +
                        '<label for="itemID">道具ID</label>' +
                        '<input type="text" name="itemID" class="itemID" id="itemID" style="margin-left: 28px;">' +
                    '</p>' +
                    '<p>' +
                        '<label for="itemNumbers">道具数量</label>' +
                        '<input type="text" name="itemNumbers" class="itemNumbers" id="itemNumbers" style="margin-left: 15px;">' +
                    '</p>' +
                '</div>';
            $('#addP').before($itemDiv);
        }
    })
);


// 输入验证
$(document).ready(
    $('#submitSendMailBtn').click(function () {
        if ($('#mailType').val() === 'recallMail') {
            if ( !$('#lostDay').val() ) {
                alert('流失天数不能为空！');
                return false;
            }
        }

        if ( !$('#higherLevel').val() || !$('#lowerLevel').val() ) {
            alert('等级限制不能为空！');
            return false;
        }

        if ( !$('#zoneID').val() ) {
            alert('区服不能为空！');
            return false;
        }

        if ( !$('#language').val() ) {
            alert('语言不能为空！');
            return false;
        }

        if ( !$('#myDate').val() ) {
            alert('发送时间不能为空！');
            return false;
        }

        if ( !$('#mailTitle').val() ) {
            alert('标题不能为空！');
            return false;
        }

        if ( !$('#mailContent').val() ) {
            alert('内容不能为空！');
            return false;
        }

        if ( !$('#remarks').val() ) {
            alert('备注不能为空！');
            return false;
        }

// 当 道具DIV 不是1个的时候，进行判断
        if ( $('.itemID').length > 1 ) {
// 批量 添加道具 判断是否为空
            var isItemIDNull = true;   // 加个 第三方
            $('.itemID').each(function () {
                if (!$(this).val()) {
                    isItemIDNull = false;
                    alert('道具ID不能为空！');
                    return false;
                }
            });

            var isItemNumbersNull = true;
            $('.itemNumbers').each(function () {
                if (isItemIDNull) {  // 如果 ID 通过验证了，再验证下面；否则会弹出2次提示！
                    if (!$(this).val()) {
                        isItemNumbersNull = false;
                        alert('道具数量不能为空！');
                        return false;
                    }
                }
            });

            if (isItemIDNull == false || isItemNumbersNull == false) {   // 最终给 click事件，返回一个结果
                return false;
            }
        }

        var confirmResult = confirm('确认发送邮件？');
        if (!confirmResult) {
            return false;
        }
    })
);

// 查询 普通邮件
$(document).ready(
    $('#queryGeneralMailBtn').click(function () {
        $.ajax({
            url: '/slgmail/querymail',
            type: 'post',
            data: {
                mailType: 'generalMail'
            },
            dataType: 'json',
            success: function (data, textStatus) {
                $('#displayMailDiv').empty();
                $('#displayMailDiv').hide();
                if (data.length === 0) {
                    alert('没有相关数据！');
                    return false;

                } else {
                    var text = '';
                    data.forEach(function (data) {
                        if (data.items == null) {
                            var items = '';

                        } else {
                            var items = data.items;
                        }

                        text +=
                            '<tr>' +
                                '<td>' + data.zoneID + '</td>' +
                                '<td>' + data.id + '</td>' +
                                '<td>' + data.mailType + '</td>' +
                                '<td>' + data.mailTitle + '</td>' +
                                '<td>' + data.mailContent + '</td>' +
                                '<td>' + items + '</td>' +
                                '<td>' + data.status + '</td>' +
                                '<td>' + moment(data.sendTime).format('YYYY-MM-D HH:mm:ss') + '</td>' +
                                '<td>' + data.remarks + '</td>' +
                                '<td>' + data.mailVersion + '</td>' +
                                '<td>' + data.sender + '</td>' +
                            '</tr>';
                    });
                    var html =
                            '<table>' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th>区服</th>' +
                                        '<th>流水号</th>' +
                                        '<th>邮件类型</th>' +
                                        '<th>邮件标题</th>' +
                                        '<th>邮件内容</th>' +
                                        '<th>邮件物品</th>' +
                                        '<th>状态</th>' +
                                        '<th>发送时间</th>' +
                                        '<th>备注</th>' +
                                        '<th>版本要求</th>' +
                                        '<th>发送者</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                     text +
                                '</tbody>' +
                            '</table>';
                    $('#displayMailDiv').append(html);
                    $('#displayMailDiv').show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
);

// 查询 回归邮件
$(document).ready(
    $('#queryRecallMailBtn').click(function () {
        $.ajax({
            url: '/slgmail/querymail',
            type: 'post',
            data: {
                mailType: 'recallMail'
            },
            dataType: 'json',
            success: function (data, textStatus) {
                $('#displayMailDiv').empty();
                $('#displayMailDiv').hide();
                if (data.length === 0) {
                    alert('没有相关数据！');
                    return false;

                } else {
                    var text = '';
                    data.forEach(function (data) {
                        if (data.items == null) {
                            var items = '';

                        } else {
                            var items = data.items;
                        }

                        text +=
                            '<tr>' +
                                '<td>' + data.zoneID + '</td>' +
                                '<td>' + data.id + '</td>' +
                                '<td>' + data.mailType + '</td>' +
                                '<td>' + data.mailTitle + '</td>' +
                                '<td>' + data.mailContent + '</td>' +
                                '<td>' + items + '</td>' +
                                '<td>' + data.status + '</td>' +
                                '<td>' + moment(data.sendTime).format('YYYY-MM-D HH:mm:ss') + '</td>' +
                                '<td>' + data.remarks + '</td>' +
                                '<td>' + data.mailVersion + '</td>' +
                                '<td>' + data.sender + '</td>' +
                            '</tr>';
                    });
                    var html =
                            '<table>' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th>区服</th>' +
                                        '<th>流水号</th>' +
                                        '<th>邮件类型</th>' +
                                        '<th>邮件标题</th>' +
                                        '<th>邮件内容</th>' +
                                        '<th>邮件物品</th>' +
                                        '<th>状态</th>' +
                                        '<th>发送时间</th>' +
                                        '<th>备注</th>' +
                                        '<th>版本要求</th>' +
                                        '<th>发送者</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                     text +
                                '</tbody>' +
                            '</table>';
                    $('#displayMailDiv').append(html);
                    $('#displayMailDiv').show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
);
