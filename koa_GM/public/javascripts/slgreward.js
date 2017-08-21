/**
 * Created by jiangxu on 2017/8/2.
 * 玩家召回（slgreward/user.ejs） Jq操作
 */
// 调用 jedate 日期插件
$(document).ready(
    $('#sendTime').jeDate({
        festival: false,
        format: 'YYYY-MM-DD hh:mm:ss',
        isTime: true
    })
);

//检查 发送奖励 格式
$(document).ready(
    $('#sendRewardsBtn').click(function () {
        if ( !$('#sendTime').val() ) {
            alert('发送时间不能为空！');
            return false;

        } else if (!$('#sendInterval').val()) {
            alert('发送间隔不能为空！');
            return false;

        } else if (!$('#sendNumbers').val()) {
            alert('发送次数不能为空！');
            return false;

        } else if (!$('#playerList').val()) {
            alert('玩家列表不能为空！');
            return false;
        }
    })
);
