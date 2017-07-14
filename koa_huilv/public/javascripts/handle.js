/**
 * Created by jiangxu on 2017/7/12.
 */
$(document).ready((function () {
// 判断 查询的数字  是否符合要求
        $('.btn_submit').click(function () {
        var queryNumber = $('#queryNumber').val();

        if (isNaN(queryNumber)) {
            alert('请输入一个数字！');
            $('#queryNumber').focus();
            return false;
        }

        if ((0-queryNumber) >= 0) {
            alert('请输入一个大于0的数字');
            $('#queryNumber').focus();
            return false;
        }
    });

// “互换”按钮，功能，不会用 jQ 写
    $('.btn_change').click(function () {
// 获取 选中的列表项的 文本（只截取 中文部分）
//      var fromCurrency = $('#from option:selected').text().split(' ')[0];

// 获取 选中列表项的 索引（从0开始）
 		var fromIndex = document.getElementById("from").selectedIndex;
 		var toIndex = document.getElementById("to").selectedIndex;

 		document.getElementById("from").selectedIndex = toIndex;
 		document.getElementById("to").selectedIndex = fromIndex;
    })
    

}));
