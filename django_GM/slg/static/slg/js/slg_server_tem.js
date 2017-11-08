/**
 * Created by HaHei on 2017/11/3 15:13.
 * 服务器管理
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
    $.jeDate('#myTime', {
        isinitVal:true,
        festival: false,
        format: 'YYYY-MM-DD hh:mm:ss'
    })
});

// 编辑
var operate;
$(document).ready(function () {
    $('a[data-toggle="operate"]').click(function () {
        operate = $(this).attr('id');
        if ( operate.split('_')[1] == 'Edit' ) {

            if ( operate.split('_')[0] == 'androidInfo' ) {
                edit_androidInfo();
            }
            //    going do something

        } else if ( operate.split('_')[1] == 'Confirm' ) {

            if ( operate.split('_')[0] == 'androidInfo' ) {
                confirm_androidInfo();
            }
            //    going do something
        }
    })
});

// 编辑 版本，地址
function edit_androidInfo() {
    $('[data-toggle="androidInfo"]').removeAttr("disabled");
    // $('select[data-toggle="serverParams"]').removeAttr("disabled");
    $('[data-toggle="androidInfo"]').css({
        "border-color": "blue"
    });
    $('#androidInfo_Confirm').show();
}

// 提交 版本，地址
function confirm_androidInfo() {
    var isConfirm = false;
    $.each($('[data-toggle="androidInfo"]'), function (index, value, array) {
        if ( !$(this).val() ) {
            alert('关键参数不能为空！');
            return false;

        } else {
            isConfirm = true;
        }
    });
    if (isConfirm) {
        $.ajax({
            url: '/submitAndroidVersion',
            type: 'POST',
            data: {
                androidLowerVersion: $('#androidLowerVersion').val(),
                androidHigherVersion: $('#androidHigherVersion').val(),
                androidDownload: $('#androidDownload').val(),
                suggestUpdate: $('#suggestUpdate').val()
            },
            success: function (data, textStatus) {
                if (data == 1) {
                    alert('提交成功！');
                    $('[data-toggle="androidInfo"]').attr("disabled", true);
                    $('[data-toggle="androidInfo"]').css({
                        "border-color": "inherit"
                    });
                    $('#androidInfo_Confirm').hide();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    }
}