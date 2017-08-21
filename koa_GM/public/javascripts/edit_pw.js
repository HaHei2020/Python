/**
 * Created by jiangxu on 2017/8/4.
 * 修改密码 前端js
 */
$(document).ready(
    $('#changePasswordBtn').click(function () {
        if ( !$('#newPassword').val() ) {
            alert('密码不能为空！');
            return false;

        } else {
            $.ajax({
                url: '/manager/edit_pw',
                type: 'post',
                data: {
                    newPassword: $('#newPassword').val()
                },
                dataType: 'json',
                success: function (data, textStatus) {
                    if (data === 1) {
                        alert('密码修改成功！');
                        window.location.href = '/login';

                    } else {
                        alert('密码修改失败！')
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    })
);