/**
 * Created by jiangxu on 2017/8/8.
 * 服务器热更 前端js代码
 */
// 获取焦点，显示 服务器列表
$(document).ready(function () {
    $('#zoneID').focus(function () {
        $('#checkboxList').show();
    })
});

// checkbox 功能实现
$(document).ready(function () {
// 全选 与 取消全选
    var isCheckAll = false;  // 判断是否全选
    $(document).on('click', '#zoneIDCheckAll', function () {

        var $subBox = $("input[type=checkbox][name='zoneIDCheckbox']");
        $subBox.click(function () {
            $('#zoneIDCheckAll').prop('checked', $subBox.length == $subBox.filter(':checked').length ? true :false);
        });

        if (isCheckAll) {
            $('input:checkbox').each(function () {
                // $(this).attr('checked', false);
                $("input[type=checkbox][name='zoneIDCheckbox']").prop('checked', false);
            });
            isCheckAll = false;

        } else {
            $('input:checkbox').each(function () {
                // $(this).attr('checked', true);
                $("input[type=checkbox][name='zoneIDCheckbox']").prop('checked', true);
            });
            isCheckAll = true;
        }

// 将 复选框 的值，输入到 input中，用 ‘|’ 分隔
        if ( $('#zoneIDCheckAll').is(':checked') ) {
            var text = '';
            $('.zoneIDCheckbox').each(function () {
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
    $(document).on('click', '.zoneIDCheckbox', function () {
        var text = '';
        $('.zoneIDCheckbox').each(function () {
            var value = $(this).val();
            var checked = $(this).is(':checked');
            if (checked) {
                text += value + '|';
            }
            $('#zoneID').val(text);
        });
    });
});

// 输入验证
$(document).ready(
    $('#submitServerUpdateBtn').click(function () {
        if ( !$('#zoneID').val() ) {
            alert('服务器选择不能为空！');

        } else {
            $.ajax({
                url: '',
                type: 'post',
                data: {
                    zoneID: $('#zoneID').val()
                },
                dataType: 'json',
                success: function (data, textStatus) {

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    })
);