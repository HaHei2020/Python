/**
 * Created by jiangxu on 2017/9/15.
 */
$(document).ready(
    $('#sub').click(function () {
        if ( !$('#userName').val() ) {
            alert('用户名不能为空！');
            return false;
        } else if ( !$('#userPassword').val() ) {
            alert('密码不能为空！');
            return false;

        } else if ( $('#userPassword').val().length < 6) {
            alert('密码不能小于6位数！');
            return false;
        } else {
            // return true;
            $.ajax({
                type: 'POST',
                url: '/login',
                data: {
                    userName: $('#userName').val(),
                    userPassword: $('#userPassword').val()
                },
                dataType: 'json',
                success: function (data, textStatus) {
                    console.log(data);
                    if (data == 0) {
                        alert('账号或密码错误！');

                    } else if (data == 2) {
                        alert('非激活账号，无权限登录！');

                    } else if (data == 1) {
                        window.location.href = 'index';
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            })
        }
    })
);