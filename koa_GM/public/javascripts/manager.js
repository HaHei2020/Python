/**
 * Created by jiangxu on 2017/8/6.
 * 管理员管理 前端js
 */
$(document).ready(
// 弹出 增加管理员 窗口
    $("#addUserBtn").click(function () {
        showBg();
        $("#addUserDiv").show();
    }),

// 弹出 编辑管理员 窗口
    $("#editUserBtn").click(function () {
        var editUserID = $('#selectedUserID:checked').val();  // 获取 选择的 “编号”

        if ( !editUserID ) {
            alert('请先选择一名用户！');
            return false;
        } else {
        // 通过 编号，选择 第几个tr，最后在选择 其子元素 第几个td元素
            var $selectedUsername = $('tr').eq(editUserID).find('td').eq(2).text();
            var $selectedPermissionLevel = $('tr').eq(editUserID).find('td').eq(3).text();
            var $selectedPlayerManage = $('tr').eq(editUserID).find('td').eq(4).text();
            var $selectedGameManage = $('tr').eq(editUserID).find('td').eq(5).text();
            var $selectedPlayerLog = $('tr').eq(editUserID).find('td').eq(6).text();
            var $selectedServerManage = $('tr').eq(editUserID).find('td').eq(7).text();
            var $selectedUserManage = $('tr').eq(editUserID).find('td').eq(8).text();

        // 设置 默认值
            $('#editUsername').val($selectedUsername);
            $('#editPermissionLevel').val($selectedPermissionLevel);
            if ($selectedPlayerManage === 'T') {
                $('#playerManage').attr({
                    checked: true
                });
            }
            if ($selectedGameManage === 'T') {
                $('#gameManage').attr({
                    checked: true
                });
            }
            if ($selectedPlayerLog === 'T') {
                $('#playerLog').attr({
                    checked: true
                });
            }
            if ($selectedServerManage === 'T') {
                $('#serverManage').attr({
                    checked: true
                });
            }
            if ($selectedUserManage === 'T') {
                $('#userManage').attr({
                    checked: true
                });
            }
            showBg();
            $("#editUserDiv").show();
        }
    }),

// 弹出 删除管理员 提示框
    $("#deleteUserBtn").click(function () {
        var selectedID = $('#selectedUserID:checked').val();  // 获取 选择的 “编号”
        if (!selectedID) {
            alert('请先选择一名用户！');
            return false;

        } else {
            var selectedUsername = $('tr').eq(selectedID).find('td').eq(2).text();
            var result = confirm('确认删除该用户？');
            if (result) {  // 确认为： true
                $.ajax({
                    url: '/manager/deleteUser',
                    type: 'post',
                    data: {
                        deleteUser: selectedUsername
                    },
                    dataType: 'json',
                    success: function (data, textStatus) {
                        if (data === 1) {
                            alert("删除管理员成功！");
                            window.location.href = "/manager";
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

// 关闭 弹窗
$(document).ready(
    $('.cancelBtn').click(function () {
        $('#addUserDiv').hide();
        $('#editUserDiv').hide();
        closeBg();
    })
);

// 增加 管理员 验证
$(document).ready(
    $('#submitAddUserBtn').click(function () {
        if ( !$('#addUsername').val() ) {
            alert('添加的用户名不能为空！');
            return false;

        } else if ( !$('#addPassword').val() || !$('#password').val() ) {
            alert('密码不能为空！');
            return false;

        } else if ( $('#addPassword').val().length < 6 || $('#password').val().length < 6 ) {
            alert('密码长度不能小于6位！');
            return false;

        } else if ( $('#addPassword').val() != $('#addPasswordAgain').val() ) {
            alert('2次输入的密码不一致！');
            return false;

        } else if ( !$('.checkboxVal:checked').val() ) {
            alert('权限至少添加一项！');
            return false;

        } else {
            return true;
        }
    })
);

// 编辑 管理员 验证
$(document).ready(
    $('#submitEditUserBtn').click(function () {
        if ( !$('#editUsername').val() ) {
            alert('添加的用户名不能为空！');
            return false;

        } else if ( !$('#editPassword').val() || !$('#password2').val() ) {
            alert('密码不能为空！');
            return false;

        } else if ( $('#editPassword').val().length < 6 || $('#password2').val().length < 6 ) {
            alert('密码长度不能小于6位！');
            return false;

        } else if ( $('#editPassword').val() != $('#editPasswordAgain').val() ) {
            alert('2次输入的密码不一致！');
            return false;

        } else if ( !$('.checkboxVal:checked').val() ) {
            alert('权限至少添加一项！');
            return false;

        } else {
            return true;
        }
    })
);

// 显示 灰色遮罩层
function showBg() {
    var $bh = $('body').height();
    var $bw = $('body').width();
    $('#fullBg').css({
        height: $bh,
        width: $bw,
        display: 'block'
    });
    $('#fullBg').show();
}

// 关闭 灰色遮罩层
function closeBg() {
    $('#fullBg').hide();
}