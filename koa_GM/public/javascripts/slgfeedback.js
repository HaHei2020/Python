/**
 * Created by jiangxu on 2017/8/11.
 * 客服反馈 前端js代码
 */
$(document).ready(
// 弹出 回复消息 窗口
    $(".replyBtn").click(function () {
        let text = "Hi, my Lord\n\n\nPlayers are our top priority in the xxx. We are doing great work to improve the services and experience to our players! Your support will inspire us keep on moving!\n\n" +
            "\n\nxxx Team";
        let $zoneID = $(this).attr('data-zoneID');
        let $uid = $(this).attr('data-uid');
        let $mid = $(this).attr('data-mid');

        $("#replyContent").val(text);
        $("#zoneID").val($zoneID);
        $('#UID').val($uid);
        $('#mid').val($mid);

        showBg();
        $("#replyDiv").show();
    }),

// 隐藏 回复消息 窗口
    $('.cancelBtn').click(function () {
        closeBg();
        $("#replyDiv").hide();
    })
);


// 输入验证
$(document).ready(
    $('#submitReplyBtn').click(function () {
        if ( !$('#replyTitle').val() ) {
            alert('标题不能为空！');
            return false;

        } else if ( !$('#replyContent').val() ) {
            alert('内容不能为空！');
            return false;
        }
    })
);

// 标记隐藏
$(document).ready(
    $('.mark').click(function () {
        let result = confirm('确认隐藏？');
        let $mid = $(this).attr('data-mid');
        if (result) {
            $('#'+$mid).css({
                'display': 'none'
            })
        }
        return false;
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