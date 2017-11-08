/**
 * Created by HaHei on 2017/11/1 11:50.
 * 管理员管理
 */

// 标签 切换
var showDiv;
$(document).ready(function () {
   $('a[data-toggle="tab"]').click(function () {
       $('#' + showDiv + 'Div').hide();
       showDiv = $(this).attr('id');
       $('#' + showDiv + 'Div').show();
   })
});

// 模态框 body显示
$(document).ready(function () {
   $('#alertTip').on('show.bs.modal', function (e) {
       var button = $(e.relatedTarget);
       var content = button.data('whatever');

       var modal = $(this);
       modal.find('#modal_content').text('确认 ' + content);
   })
});

// 模态框 显示前，记录 哪个div 启动了 模态框
var preAjaxDiv;
$(document).ready(function () {
    $('#createUserBtn').click(function () {
        preAjaxDiv = $(this).attr('id');
    });
    $('#deleteUserBtn').click(function () {
        preAjaxDiv = $(this).attr('id');
    });
    $('#changePasswordBtn').click(function () {
        preAjaxDiv = $(this).attr('id');
    });
    $('#changePermissionBtn').click(function () {
        preAjaxDiv = $(this).attr('id');
    });
});


// 模态框 点击确认后执行
$(document).ready(function () {
       $('#modalConfirmBtn').click(function () {
           if (preAjaxDiv == 'createUserBtn') {
               createUser();
               $('#alertTip').modal('hide');

           } else if (preAjaxDiv == 'deleteUserBtn') {
               deleteUser();
               $('#alertTip').modal('hide');

           } else if (preAjaxDiv == 'changePasswordBtn') {
               changePassword();
               $('#alertTip').modal('hide');

           } else if (preAjaxDiv == 'changePermissionBtn') {
               changePermission();
               $('#alertTip').modal('hide');
           }
       })
});

// 创建用户  激活/封停
function createUser() {
    var createUserAlert = '';
    $('#createUserAlert').hide();
    if ( !$('#username').val() ) {
        createUserAlert += "**  用户名不能为空！<br />";

    }
    if ( !$('#password').val() ) {
        createUserAlert += "**  密码不能为空！<br />";

    }
    if ( !$('#passwordAgain').val() ) {
        createUserAlert += "**  确认密码不能为空！<br />";

    }
    if ( $('#password').val() != $('#passwordAgain').val() ) {
        createUserAlert += "**  两次密码输入不一致！<br />";
    }
    if (createUserAlert) {
        $('#createUserAlert').html(createUserAlert);
        $('#createUserAlert').show();

    } else {
        $.ajax({
            url: '/createUser',
            type: 'POST',
            data: {
                createUsername: $('#username').val(),
                password: $('#password').val(),
                is_active: $('#userStatus').val()
            },
            success: function (data, textStatus) {
                if (data == 1) {
                    alert('创建成功！');
                    window.location.href = 'slg_manager_tem';

                } else if (data == -1) {
                    alert('已经创建该账户，无法重复创建！');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    }
}


// 删除用户
function deleteUser() {
    $.ajax({
        url: '/deleteUser',
        type: 'POST',
        data: {
            deleteUsername: $('#deleteUsername').val()
        },
        success: function (data, textStatus) {
            if (data == 1) {
                alert('删除成功！');
                window.location.href = 'slg_manager_tem';
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    })
}

// 修改密码
function changePassword() {
    var changePasswordAlert = '';
    $('#changePasswordAlert').hide();
    if ( !$('#oldPassword').val() ) {
        changePasswordAlert += '**  旧密码不能为空！<br />';
    }
    if ( !$('#newPassword').val() ) {
        changePasswordAlert += '**  新密码不能为空！<br />';
    }
    if ( !$('#newPasswordAgain').val() ) {
        changePasswordAlert += '**  确认密码不能为空！<br />';
    }
    if ( $('#newPassword').val() != $('#newPasswordAgain').val() ) {
        changePasswordAlert += '**  两次密码不一致！<br />';
    }
    if ( $('#oldPassword').val() == $('#newPasswordAgain').val() ) {
        changePasswordAlert += '**  新密码和旧密码不能一样！<br />';
    }
    if (changePasswordAlert) {
        $('#changePasswordAlert').html(changePasswordAlert);
        $('#changePasswordAlert').show();

    } else {
        $.ajax({
            url: '/changePassword',
            type: 'POST',
            data: {
                username: $('#loginUsername').text().split(' ')[0],
                oldPassword: $('#oldPassword').val(),
                newPassword: $('#newPassword').val()
            },
            success: function (data, textStatus) {
                if (data == 1) {
                    alert('修改成功！');
                    window.location.href = 'index';

                } else if (data == -1) {
                    alert('旧密码错误！');

                } else if (data == -2) {
                    alert('没有相关权限！');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        })
    }
}

// 修改权限
function changePermission() {
    var permissionList = $('input[name="permissionList"]:checked');
    var permissions = '';
    $.each(permissionList, function (index, value, array) {
        if (index+1 == permissionList.length) {   // 最后一位，不加逗号
            permissions += permissionList[index].value;
        } else {
            permissions += permissionList[index].value + ', ';
        }
    });
    $.ajax({
        url: '/changePermission',
        type: 'POST',
        data: {
            username: $('#usernamePermission').val(),
            permissions: permissions
        },
        success: function (data, textStatus) {
            if (data == 1) {
                alert('修改成功！');
                window.location.href = 'index';

            } else if (data == -1) {
                alert('未知错误！');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    })
}
