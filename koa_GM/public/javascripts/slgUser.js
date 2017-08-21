/**
 * Created by jiangxu on 2017/7/29.
 */
$(document).ready(
    $('#queryUserBtn').click(function () {
        var $zoneId = $('#zoneId').val();
        var $queryType = $('#queryType').val();
        var $queryInfo = $('#queryInfo').val();
         // alert($zoneId + ';' + $queryType + ';' + $queryInfo)
        // var checkResult = checkVaild($queryType, $queryInfo);
        // if (checkResult) {
        //     // CallAjax_queryUser($zoneId, $queryType, $queryInfo);
        // }
        return checkVaild($queryType, $queryInfo);
    })
);

function checkVaild($queryType, $queryInfo) {
    if ($queryType === 'nickname') {
        if (!$queryInfo) {   //检查 是否有值
            alert('昵称不能为空！');
            return false;
        } else {
            return true;
        }
    }
    if ($queryType === 'uid') {
        if (!$queryInfo) {
            alert('UID不能为空！');
            return false;
        } else {
            var isNumber = /\d{14}/g;   //UID：14位数字 组成
            if (!isNumber.test($queryInfo)) {
                alert('UID不合法！');
                return false;
            } else {
                return true;
            }
        }
    }
}

// function CallAjax_queryUser($zoneId, $queryType, $queryInfo) {
//     $.ajax({
//         type: 'POST',
//         url: '/slguser/list',
//         data: {
//             zoneId: $zoneId,
//             queryType: $queryType,
//             queryInfo: $queryInfo
//         },
//         // dataType: 'json',
//         success: function (data, textStatus) {
//              // alert(data)
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             alert(errorThrown);
//         }
//     })
// }