/**
 * Created by jiangxu on 2017/8/19.
 * 行为日志 前端js代码
 */
$(document).ready(
    $.jeDate('.myTime', {
        format: 'YYYY-MM-DD',
        festival: false
    })
);


// 玩家行为总览
var isShowDiv;
$(document).ready(
    $('#queryLogBtn').click(function () {
        var $queryType = $('#queryType').val();
        $(isShowDiv).hide();

        if ($queryType == 0) {
            $('#playerCharacteristicsDiv').show();
            isShowDiv = '#playerCharacteristicsDiv';

        } else if ($queryType == 1) {
            $('#playerPowerDiv').show();
            isShowDiv = '#playerPowerDiv';

        } else if ($queryType == 2) {
            $('#playerActionDiv').show();
            isShowDiv = '#playerActionDiv';
        }
    })
);

// 玩家行为详情
var isShowLogDiv;
$(document).ready(
    $('#querySubLogBtn').click(function () {
        var $querySubLogType = $('#querySubLogType').val();
        $(isShowLogDiv).hide();

        if ($querySubLogType == 0) {
            $('#diamondsDiv').show();
            isShowLogDiv = '#diamondsDiv';

        } else if ($querySubLogType == 1) {
            $('#resourcesDiv').show();
            isShowLogDiv = '#resourcesDiv';

        } else if ($querySubLogType == 2) {
            $('#mapDiv').show();
            isShowLogDiv = '#mapDiv';

        } else if ($querySubLogType == 3) {
            $('#allianceDiv').show();
            isShowLogDiv = '#allianceDiv';

        } else if ($querySubLogType == 4) {
            $('#gemsDiv').show();
            isShowLogDiv = '#gemsDiv';
        }
    })
);
