/**
 * Created by jiangxu on 2017/8/8.
 * 公告管理 前端js代码
 */
$(document).ready(function () {
// 区服选择 复选框 显示 及 隐藏
    $('#zoneID').focus(function () {
        $('#zoneIDList').show();
        $('p').css({
            'margin-top': '5px'
        })
    });
    // $('#zoneID').focusout(function () {
    //     $('#zoneIDList').hide();
    //     $('p').css({
    //         'margin-top': '0px'
    //     })
    // });

// 目标语言 复选框 显示 及 隐藏
    $('#language').focus(function () {
        $('#languageList').show();
        $('p').css({
            'margin-top': '5px'
        })
    });
    // $('#language').focusout(function () {
    //     $('#languageList').hide();
    //     $('p').css({
    //         'margin-top': '0px'
    //     })
    // })
});

// 调用 日期 插件
$(document).ready(function () {
    $.jeDate('#myDate', {
        format: 'YYYY-MM-DD hh:mm:ss',
        festival: false
    })
});

// 区服选择 复选框 功能实现
$(document).ready(function () {
// 全选 与 取消全选   
    var isCheckAll = false;
    $(document).on('click', '#allServerSelected', function () {
// 当 全选后，取消某一个复选框，全选也要跟着取消掉
        var $subBox = $("input[type=checkbox][name='zoneIDCheckBoxs']");
        $subBox.click(function(){
            $("#allServerSelected").prop("checked", $subBox.length == $subBox.filter(":checked").length ? true :false);
        });
// 以下是 核心功能
        if (isCheckAll) {
            $('input:checkbox').each(function () {
                $("input[type=checkbox][name='zoneIDCheckBoxs']").prop('checked', false);
            });
            isCheckAll = false;

        } else {
            $('input:checkbox').each(function () {
                $("input[type=checkbox][name='zoneIDCheckBoxs']").prop('checked', true);
            });
            isCheckAll = true;
        }
        
// 将 复选框 的值，输入到 input中，用 ‘|’ 分隔
        if ( $('#allServerSelected').is(':checked') ) {
            var text = '';
            $('.subServerSelected').each(function () {
                var value = $(this).val();
                var checked = $(this).is(':checked');
                if (checked) {
                    text += value + '|';
                }
                $('#zoneID').val(text);
            });

        } else {
            $('#zoneID').val('');
        }
    }),

// 单选 功能
    $(document).on('click', '.subServerSelected', function () {
        var text = '';
        $('.subServerSelected').each(function () {
            var value = $(this).val();
            var checked = $(this).is(':checked');
            if (checked) {
                text += value + '|';
            }
            $('#zoneID').val(text);
        })
    })
});

// 目标语言 复选框 功能实现
$(document).ready(function () {
    var isCheckAll = false;
    $(document).on('click', '#allLanguageSelected', function () {

        var $subBox = $("input[type=checkbox][name='languageCheckBoxs']");
        $subBox.click(function(){
            $("#allLanguageSelected").prop("checked", $subBox.length == $subBox.filter(":checked").length ? true :false);
        });

        if (isCheckAll) {
            $('.subLanguageSelected').each(function () {
                $("input[type=checkbox][name='languageCheckBoxs']").prop('checked', false);
            });
            isCheckAll = false;

        } else {
            $('.subLanguageSelected').each(function () {
                $("input[type=checkbox][name='languageCheckBoxs']").prop('checked', true);
            });
            isCheckAll = true;
        }

        if ( $('#allLanguageSelected').is(':checked') ) {
            var text = '';
            $('.subLanguageSelected').each(function () {
                var value = $(this).val();
                var checked = $(this).is(':checked');
                if (checked) {
                    text += value + '|';
                }
                $('#language').val(text);
            });

        } else {
            $('#language').val('');
        }
    }),

    $(document).on('click', '.subLanguageSelected', function () {
        var text = '';
        $('.subLanguageSelected').each(function () {
            var value = $(this).val();
            var checked = $(this).is(':checked');
            if (checked) {
                text += value + '|';
            }
            $('#language').val(text);
        })
    })
});

// 当 公告类型为： 弹出公告 时，不显示 时间间隔 和 发送次数，但显示 标题
$(document).ready(function () {
   $(document).on('change', '#noticeType', function () {
       var $noticeType = $('#noticeType').val();
       if ($noticeType === 'inAnnouncement' || $noticeType === 'outsideAnnouncement') {
           $('#intervalP').hide();
           $('#numbersP').hide();
           $('#titleP').show();
       } else {
           $('#intervalP').show();
           $('#numbersP').show();
           $('#titleP').hide();
       }
   })
});

// 输入验证
$(document).ready(
    $('#submitSlgnoticeFormBtn').click(function () {
        var $noticeType = $('#noticeType').val();
        if ( !$('#zoneID').val() ) {
            alert('区服不能为空！');
            return false;

        } else if ( !$('#language').val() ) {
            alert('目标语言不能为空！');
            return false;

        } else if ( !$('#myDate').val() ) {
            alert('发送时间不能为空！');
            return false;

        } else if ( !$('#noticeContent').val() ) {
            alert('正文不能为空！');
            return false;

        } else if ( !$('#remarks').val() ) {
            alert('备注不能为空！');
            return false;
        }

        if ( $noticeType === 'broadcast' || $noticeType === 'chatMessage') {
            if ( !$('#noticeInterval').val() ) {
                alert('时间间隔不能为空！');
                return false;

            } else if ( !$('#noticeNumbers').val() ) {
                alert('发送次数不能为空！');
                return false;
            }

        } else {
            if ( !$('#noticeTitle').val() ) {
                alert('标题不能为空！');
                return false;
            }
        }
    })
);

// 查询跑马灯 请求
$(document).ready(
    $('#queryBroadcastBtn').click(function () {
        $.ajax({
            url: '/slgnotice/query',
            type: 'post',
            data: {
                noticeType: 'broadcast'
            },
            dataType: 'json',
            success: function (data, textStatus) {
                $('#notice_list').empty();
                $('#notice_list').hide();
                if (data.length === 0) {
                    alert('没有相关数据！');
                    return false;

                } else {
                    $('#notice_list').empty();
                    var text = '';
                    data.forEach(function (data) {
                        text += '<tr>' +
                            '<td>' + data.zoneID + '</td>' +
                            '<td>' + data.id + '</td>' +
                            '<td>' + data.noticeType + '</td>' +
                            '<td>' + data.noticeContent + '</td>' +
                            '<td>' + data.status + '</td>' +
                            '<td>' + moment(data.noticeTime).format('YYYY-MM-D HH:mm:ss') + '</td>' +
                            '<td>' + data.remarks + '</td>' +
                            '</tr>';
                    });
                    var html = '<table>' +
                        '<thead>' +
                        '<tr>' +
                        '<th>区服</th>' +
                        '<th>流水号</th>' +
                        '<th>公告类型</th>' +
                        '<th>跑马灯内容</th>' +
                        '<th>状态</th>' +
                        '<th>发送时间</th>' +
                        '<th>备注</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        text +
                        '</tbody>' +
                        '</table>';
                    $('#notice_list').append(html);
                    $('#notice_list').show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
);

// 查询聊天消息 请求
$(document).ready(
    $('#querychatMessageBtn').click(function () {
        $.ajax({
            url: '/slgnotice/query',
            type: 'post',
            data: {
                noticeType: 'chatMessage'
            },
            dataType: 'json',
            success: function (data, textStatus) {
                $('#notice_list').empty();
                $('#notice_list').hide();
                if (data.length === 0) {
                    alert('没有相关数据！');
                    return false;

                } else {
                    var text = '';
                    data.forEach(function (data) {
                        text += '<tr>' +
                            '<td>' + data.zoneID + '</td>' +
                            '<td>' + data.id + '</td>' +
                            '<td>' + data.noticeType + '</td>' +
                            '<td>' + data.noticeContent + '</td>' +
                            '<td>' + data.status + '</td>' +
                            '<td>' + moment(data.noticeTime).format('YYYY-MM-D HH:mm:ss') + '</td>' +
                            '<td>' + data.remarks + '</td>' +
                            '</tr>';
                    });
                    var html = '<table>' +
                        '<thead>' +
                        '<tr>' +
                        '<th>区服</th>' +
                        '<th>流水号</th>' +
                        '<th>公告类型</th>' +
                        '<th>跑马灯内容</th>' +
                        '<th>状态</th>' +
                        '<th>发送时间</th>' +
                        '<th>备注</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        text +
                        '</tbody>' +
                        '</table>';
                    $('#notice_list').append(html);
                    $('#notice_list').show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
);

// 查询游戏外公告 请求
$(document).ready(
    $('#queryOutsideAnnouncementBtn').click(function () {
        $.ajax({
            url: '/slgnotice/query',
            type: 'post',
            data: {
                noticeType: 'outsideAnnouncement'
            },
            dataType: 'json',
            success: function (data, textStatus) {
                $('#notice_list').empty();
                $('#notice_list').hide();
                if (data.length === 0) {
                    alert('没有相关数据！');
                    return false;

                } else {
                    var text = '';
                    data.forEach(function (data) {
                        var hrefs = '/slgnotice/delete?' + data.id;
                        text += '<tr>' +
                            '<td>' + data.zoneID + '</td>' +
                            '<td>' + data.id + '</td>' +
                            '<td>' + data.language + '</td>' +
                            '<td>' + data.noticeType + '</td>' +
                            '<td>' + data.noticeTitle + '</td>' +
                            '<td>' + data.noticeContent + '</td>' +
                            '<td>' + data.status + '</td>' +
                            '<td>' + moment(data.noticeTime).format('YYYY-MM-D HH:mm:ss') + '</td>' +
                            '<td>' + data.remarks + '</td>' +
                            '<td><a href=' + hrefs + '>删除</a></td>' +
                            '</tr>';
                    });
                    var html = '<table>' +
                        '<thead>' +
                        '<tr>' +
                        '<th>区服</th>' +
                        '<th>流水号</th>' +
                        '<th>目标语言</th>' +
                        '<th>公告类型</th>' +
                        '<th>公告标题</th>' +
                        '<th>公告内容</th>' +
                        '<th>状态</th>' +
                        '<th>发送时间</th>' +
                        '<th>备注</th>' +
                        '<th>操作</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        text +
                        '</tbody>' +
                        '</table>';
                    $('#notice_list').append(html);
                    $('#notice_list').show();
                    $('#deleteNoticeBtn').show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
);

// 查询游戏内公告 请求
$(document).ready(
    $('#queryInAnnouncementBtn').click(function () {
        $.ajax({
            url: '/slgnotice/query',
            type: 'post',
            data: {
                noticeType: 'inAnnouncement'
            },
            dataType: 'json',
            success: function (data, textStatus) {
                $('#notice_list').empty();
                $('#notice_list').hide();
                if (data.length === 0) {
                    alert('没有相关数据！');
                    return false;

                } else {
                    var text = '';
                    data.forEach(function (data) {

                        var hrefs = '/slgnotice/delete?' + data.id;
                        text += '<tr>' +
                            '<td>' + data.zoneID + '</td>' +
                            '<td>' + data.id + '</td>' +
                            '<td>' + data.language + '</td>' +
                            '<td>' + data.noticeType + '</td>' +
                            '<td>' + data.noticeTitle + '</td>' +
                            '<td>' + data.noticeContent + '</td>' +
                            '<td>' + data.status + '</td>' +
                            '<td>' + moment(data.noticeTime).format('YYYY-MM-D HH:mm:ss') + '</td>' +
                            '<td>' + data.remarks + '</td>' +
                            '<td><a href=' + hrefs + '>删除</a></td>' +
                            '</tr>';
                    });
                    var html = '<table>' +
                        '<thead>' +
                        '<tr>' +
                        '<th>区服</th>' +
                        '<th>流水号</th>' +
                        '<th>目标语言</th>' +
                        '<th>公告类型</th>' +
                        '<th>公告标题</th>' +
                        '<th>公告内容</th>' +
                        '<th>状态</th>' +
                        '<th>发送时间</th>' +
                        '<th>备注</th>' +
                        '<th>操作</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        text +
                        '</tbody>' +
                        '</table>';
                    $('#notice_list').append(html);
                    $('#notice_list').show();
                    $('#deleteNoticeBtn').show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    })
);
