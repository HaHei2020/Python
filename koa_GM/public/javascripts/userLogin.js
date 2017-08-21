/**
 * Created by jiangxu on 2017/7/23.
 * “用户登录” 表单 验证规则
 * ajax 请求， button 类型 不能为：submit！！！！
 */
$loginForm = $('.ui.form');
$(document).ready(
    $loginForm
        .form({
            keyboardShortcuts: true,
            fields: {
                userName: {
                    identifier: 'userName',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '账号不能为空！'
                        }
                    ]
                },
                userPassword: {
                    identifier: 'userPassword',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '密码不能为空！'
                        },
                        {
                            type: 'minLength[6]',
                            prompt: '密码不能少于 {ruleValue} 位！'
                        }
                    ]
                }
            },
            // onSuccess: function () {
            //     var name = $loginForm.form('get value', 'userName');
            //     var password = $loginForm.form('get value', 'userPassword');
            //     // alert(name + '  ' + password);
            //     CallAjax(name, password);
            // }
        })
);
//
// function CallAjax(name, password) {
//     $.ajax({
//         type: 'POST',
//         url: '/login',
//         data: {
//             userName: name,
//             userPassword: password
//         },
//         dataType: 'json',
//         success: function (data, textStatus) {
//             if (data === -1) {
//                 // $loginForm.form('add prompt', "userName", "账号不存在！");
//                 alert('账号不存在！');
//
//             } else if (data === 0) {
//                 alert('账号或密码错误！')
//             }
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             alert(errorThrown);
//         }
//     })
// }
