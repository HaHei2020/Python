# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models

class Permission(models.Model):
    #name = models.CharField("权限名称", max_length=64)
    # url = models.CharField('URL名称', max_length=255)
    # chioces = ((1, 'GET'), (2, 'POST'))
    # per_method = models.SmallIntegerField('请求方法', choices=chioces, default=1)
    # argument_list = models.CharField('参数列表', max_length=255, help_text='多个参数之间用英文半角逗号隔开', blank=True, null=True)
    #describe = models.CharField('描述', max_length=255)
    #
    # def __str__(self):
    #     return self.name

    class Meta:
        # verbose_name = '权限表'
        # verbose_name_plural = verbose_name
        #权限信息，这里定义的权限的名字，后面是描述信息，描述信息是在django admin中显示权限用的
        permissions = (
            ('views_slg_users_tem', '查看玩家管理'),
            ('views_slg_alliance_tem', '查看联盟管理'),
            ('views_slg_mail_notice_tem', '查看公告邮件'),
            ('views_slg_order_tem', '查看订单系统'),
            ('views_slg_reward_tem', '查看礼包奖励'),
            ('views_slg_service_reply_tem', '查看客服反馈'),
            ('views_slg_user_log_tem', '查看玩家日志'),
            ('views_slg_server_tem', '查看服务器管理'),
            ('views_slg_manager_tem', '查看管理员管理'),
        )
        # db_table = 'slg_permission'

class Battlevaluestructure(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    level = models.IntegerField(db_column='Level', blank=True, null=True)  # Field name made lowercase.
    lastlogintime = models.DateTimeField(db_column='LastLoginTime', blank=True, null=True)  # Field name made lowercase.
    battlevalue = models.IntegerField(db_column='BattleValue', blank=True, null=True)  # Field name made lowercase.
    buildvalue = models.IntegerField(db_column='BuildValue', blank=True, null=True)  # Field name made lowercase.
    soldiervalue = models.IntegerField(db_column='SoldierValue', blank=True, null=True)  # Field name made lowercase.
    techvalue = models.IntegerField(db_column='TechValue', blank=True, null=True)  # Field name made lowercase.
    demnodprofile = models.IntegerField(db_column='DemnodProfile', blank=True, null=True)  # Field name made lowercase.
    equipmentprofile = models.IntegerField(db_column='EquipmentProfile', blank=True, null=True)  # Field name made lowercase.
    buildprofile = models.IntegerField(db_column='BuildProfile', blank=True, null=True)  # Field name made lowercase.
    talentprofile = models.IntegerField(db_column='TalentProfile', blank=True, null=True)  # Field name made lowercase.
    otherprofile = models.IntegerField(db_column='OtherProfile', blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'BattleValueStructure'


class Eventtimes(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    sequence = models.IntegerField(db_column='Sequence', blank=True, null=True)  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    level = models.IntegerField(db_column='Level', blank=True, null=True)  # Field name made lowercase.
    type = models.IntegerField(db_column='Type', blank=True, null=True)  # Field name made lowercase.
    times = models.IntegerField(db_column='Times', blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    tarname = models.CharField(db_column='TarName', max_length=32, blank=True, null=True)  # Field name made lowercase.
    tartype = models.IntegerField(db_column='TarType', blank=True, null=True)  # Field name made lowercase.
    tarlevel = models.IntegerField(db_column='TarLevel', blank=True, null=True)  # Field name made lowercase.
    atkway = models.IntegerField(db_column='AtkWay', blank=True, null=True)  # Field name made lowercase.
    originallevel = models.IntegerField(db_column='OriginalLevel', blank=True, null=True)  # Field name made lowercase.
    color = models.IntegerField(db_column='Color', blank=True, null=True)  # Field name made lowercase.
    opttype = models.IntegerField(db_column='Opttype', blank=True, null=True)  # Field name made lowercase.
    num = models.IntegerField(db_column='Num', blank=True, null=True)  # Field name made lowercase.
    winning = models.IntegerField(db_column='Winning', blank=True, null=True)  # Field name made lowercase.
    defresult = models.IntegerField(db_column='Defresult', blank=True, null=True)  # Field name made lowercase.
    tarcatslelevel = models.IntegerField(db_column='TarCatsleLevel', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    hurtendtime = models.CharField(db_column='HurtEndTime', max_length=64, blank=True, null=True)  # Field name made lowercase.
    numtwo = models.IntegerField(db_column='NumTwo', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'EventTimes'


class Itemflow(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    sequence = models.IntegerField(db_column='Sequence', blank=True, null=True)  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    itemtype = models.IntegerField(db_column='ItemType', blank=True, null=True)  # Field name made lowercase.
    itemid = models.CharField(db_column='ItemId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    aftercount = models.IntegerField(db_column='AfterCount', blank=True, null=True)  # Field name made lowercase.
    count = models.IntegerField(db_column='Count', blank=True, null=True)  # Field name made lowercase.
    reason = models.IntegerField(db_column='Reason', blank=True, null=True)  # Field name made lowercase.
    subreason = models.IntegerField(db_column='SubReason', blank=True, null=True)  # Field name made lowercase.
    reasoneventid = models.CharField(db_column='ReasonEventID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    addorreduce = models.IntegerField(db_column='AddOrReduce', blank=True, null=True)  # Field name made lowercase.
    itid = models.CharField(db_column='ItId', max_length=50, blank=True, null=True)  # Field name made lowercase.
    imoney = models.IntegerField(db_column='iMoney', blank=True, null=True)  # Field name made lowercase.
    imoneytype = models.IntegerField(db_column='iMoneyType', blank=True, null=True)  # Field name made lowercase.
    level = models.IntegerField(db_column='Level', blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ItemFlow'


class Moneyflow(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    sequence = models.IntegerField(db_column='Sequence', blank=True, null=True)  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    level = models.IntegerField(db_column='Level', blank=True, null=True)  # Field name made lowercase.
    aftermoney = models.BigIntegerField(db_column='AfterMoney', blank=True, null=True)  # Field name made lowercase.
    money = models.BigIntegerField(db_column='Money', blank=True, null=True)  # Field name made lowercase.
    reason = models.IntegerField(db_column='Reason', blank=True, null=True)  # Field name made lowercase.
    subreason = models.IntegerField(db_column='SubReason', blank=True, null=True)  # Field name made lowercase.
    reasoneventid = models.CharField(db_column='ReasonEventID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    addorreduce = models.IntegerField(db_column='AddOrReduce', blank=True, null=True)  # Field name made lowercase.
    moneytype = models.IntegerField(db_column='MoneyType', blank=True, null=True)  # Field name made lowercase.
    viplevel = models.IntegerField(db_column='VipLevel', blank=True, null=True)  # Field name made lowercase.
    isrechargemoney = models.IntegerField(db_column='IsRechargeMoney', blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'MoneyFlow'


class Playerfeaturesflow(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    level = models.IntegerField(db_column='Level', blank=True, null=True)  # Field name made lowercase.
    castlelevel = models.IntegerField(db_column='CastleLevel', blank=True, null=True)  # Field name made lowercase.
    lastlogintime = models.DateTimeField(db_column='LastLoginTime', blank=True, null=True)  # Field name made lowercase.
    onlinetime = models.IntegerField(db_column='OnlineTime', blank=True, null=True)  # Field name made lowercase.
    recgargevalue = models.IntegerField(db_column='RecgargeValue', blank=True, null=True)  # Field name made lowercase.
    demondvalue = models.IntegerField(db_column='DemondValue', blank=True, null=True)  # Field name made lowercase.
    coinvalue = models.IntegerField(db_column='CoinValue', blank=True, null=True)  # Field name made lowercase.
    woodvalue = models.IntegerField(db_column='WoodValue', blank=True, null=True)  # Field name made lowercase.
    stonevalue = models.IntegerField(db_column='StoneValue', blank=True, null=True)  # Field name made lowercase.
    steelvalue = models.IntegerField(db_column='SteelValue', blank=True, null=True)  # Field name made lowercase.
    viplevel = models.IntegerField(db_column='VipLevel', blank=True, null=True)  # Field name made lowercase.
    vipstatus = models.IntegerField(db_column='VipStatus', blank=True, null=True)  # Field name made lowercase.
    battlevalue = models.IntegerField(db_column='BattleValue', blank=True, null=True)  # Field name made lowercase.
    country = models.CharField(db_column='Country', max_length=64, blank=True, null=True)  # Field name made lowercase.
    language = models.CharField(db_column='Language', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    farmersum = models.IntegerField(db_column='FarmerSum', blank=True, null=True)  # Field name made lowercase.
    farmerfreenum = models.IntegerField(db_column='FarmerFreeNum', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PlayerFeaturesFlow'


class Playerlevelup(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    expchange = models.IntegerField(db_column='ExpChange', blank=True, null=True)  # Field name made lowercase.
    beforelevel = models.IntegerField(db_column='BeforeLevel', blank=True, null=True)  # Field name made lowercase.
    afterlevel = models.IntegerField(db_column='AfterLevel', blank=True, null=True)  # Field name made lowercase.
    time = models.IntegerField(db_column='Time', blank=True, null=True)  # Field name made lowercase.
    reason = models.IntegerField(db_column='Reason', blank=True, null=True)  # Field name made lowercase.
    subreason = models.IntegerField(db_column='SubReason', blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PlayerLevelup'


class Playerlogin(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    level = models.IntegerField(db_column='Level', blank=True, null=True)  # Field name made lowercase.
    playerfriendsnum = models.IntegerField(db_column='PlayerFriendsNum', blank=True, null=True)  # Field name made lowercase.
    clientversion = models.CharField(db_column='ClientVersion', max_length=64, blank=True, null=True)  # Field name made lowercase.
    systemsoftware = models.CharField(db_column='SystemSoftware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    systemhardware = models.CharField(db_column='SystemHardware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    telecomoper = models.CharField(db_column='TelecomOper', max_length=64, blank=True, null=True)  # Field name made lowercase.
    network = models.CharField(db_column='Network', max_length=64, blank=True, null=True)  # Field name made lowercase.
    screenwidth = models.IntegerField(db_column='ScreenWidth', blank=True, null=True)  # Field name made lowercase.
    screenhight = models.IntegerField(db_column='ScreenHight', blank=True, null=True)  # Field name made lowercase.
    density = models.FloatField(db_column='Density', blank=True, null=True)  # Field name made lowercase.
    loginchannel = models.IntegerField(db_column='LoginChannel', blank=True, null=True)  # Field name made lowercase.
    uuid = models.CharField(db_column='UUID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    cpuhardware = models.CharField(db_column='CpuHardware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    memory = models.IntegerField(db_column='Memory', blank=True, null=True)  # Field name made lowercase.
    glrender = models.CharField(db_column='GLRender', max_length=64, blank=True, null=True)  # Field name made lowercase.
    glversion = models.CharField(db_column='GLVersion', max_length=255, blank=True, null=True)  # Field name made lowercase.
    deviceid = models.CharField(db_column='DeviceId', max_length=64, blank=True, null=True)  # Field name made lowercase.
    ip = models.CharField(db_column='IP', max_length=64, blank=True, null=True)  # Field name made lowercase.
    reconnect = models.IntegerField(db_column='Reconnect', blank=True, null=True)  # Field name made lowercase.
    attack = models.IntegerField(db_column='Attack', blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PlayerLogin'


class Playerlogout(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    level = models.IntegerField(db_column='Level', blank=True, null=True)  # Field name made lowercase.
    playerfriendsnum = models.IntegerField(db_column='PlayerFriendsNum', blank=True, null=True)  # Field name made lowercase.
    clientversion = models.CharField(db_column='ClientVersion', max_length=64, blank=True, null=True)  # Field name made lowercase.
    systemsoftware = models.CharField(db_column='SystemSoftware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    systemhardware = models.CharField(db_column='SystemHardware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    telecomoper = models.CharField(db_column='TelecomOper', max_length=64, blank=True, null=True)  # Field name made lowercase.
    network = models.CharField(db_column='Network', max_length=64, blank=True, null=True)  # Field name made lowercase.
    screenwidth = models.IntegerField(db_column='ScreenWidth', blank=True, null=True)  # Field name made lowercase.
    screenhight = models.IntegerField(db_column='ScreenHight', blank=True, null=True)  # Field name made lowercase.
    density = models.FloatField(db_column='Density', blank=True, null=True)  # Field name made lowercase.
    loginchannel = models.IntegerField(db_column='LoginChannel', blank=True, null=True)  # Field name made lowercase.
    uuid = models.CharField(db_column='UUID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    cpuhardware = models.CharField(db_column='CpuHardware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    memory = models.IntegerField(db_column='Memory', blank=True, null=True)  # Field name made lowercase.
    glrender = models.CharField(db_column='GLRender', max_length=255, blank=True, null=True)  # Field name made lowercase.
    glversion = models.CharField(db_column='GLVersion', max_length=255, blank=True, null=True)  # Field name made lowercase.
    deviceid = models.CharField(db_column='DeviceId', max_length=64, blank=True, null=True)  # Field name made lowercase.
    ip = models.CharField(db_column='IP', max_length=64, blank=True, null=True)  # Field name made lowercase.
    loginttime = models.DateTimeField(db_column='LogintTime', blank=True, null=True)  # Field name made lowercase.
    onlinetime = models.IntegerField(db_column='OnlineTime', blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PlayerLogout'


class Playerrecharge(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    billno = models.CharField(db_column='BillNo', max_length=64, blank=True, null=True)  # Field name made lowercase.
    goodsid = models.CharField(db_column='GoodsID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    cost = models.FloatField(db_column='Cost', blank=True, null=True)  # Field name made lowercase.
    money = models.IntegerField(db_column='Money', blank=True, null=True)  # Field name made lowercase.
    payfrom = models.CharField(db_column='PayFrom', max_length=32, blank=True, null=True)  # Field name made lowercase.
    systype = models.IntegerField(db_column='sysType', blank=True, null=True)  # Field name made lowercase.
    syscfgid = models.IntegerField(db_column='sysCfgid', blank=True, null=True)  # Field name made lowercase.
    level = models.IntegerField(db_column='Level', blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rewardmoney = models.IntegerField(db_column='RewardMoney', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PlayerRecharge'


class Playerregister(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    izoneareaid = models.IntegerField(db_column='iZoneAreaID')  # Field name made lowercase.
    dteventtime = models.DateTimeField(db_column='dtEventTime')  # Field name made lowercase.
    vgameappid = models.CharField(db_column='vGameAppid', max_length=32, blank=True, null=True)  # Field name made lowercase.
    platid = models.IntegerField(db_column='PlatID')  # Field name made lowercase.
    dvid = models.CharField(db_column='DVID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    clientversion = models.CharField(db_column='ClientVersion', max_length=64, blank=True, null=True)  # Field name made lowercase.
    systemsoftware = models.CharField(db_column='SystemSoftware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    systemhardware = models.CharField(db_column='SystemHardware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    telecomoper = models.CharField(db_column='TelecomOper', max_length=64, blank=True, null=True)  # Field name made lowercase.
    network = models.CharField(db_column='Network', max_length=64, blank=True, null=True)  # Field name made lowercase.
    screenwidth = models.IntegerField(db_column='ScreenWidth', blank=True, null=True)  # Field name made lowercase.
    screenhight = models.IntegerField(db_column='ScreenHight', blank=True, null=True)  # Field name made lowercase.
    density = models.FloatField(db_column='Density', blank=True, null=True)  # Field name made lowercase.
    regchannel = models.IntegerField(db_column='RegChannel', blank=True, null=True)  # Field name made lowercase.
    uuid = models.CharField(db_column='UUID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    cpuhardware = models.CharField(db_column='CpuHardware', max_length=64, blank=True, null=True)  # Field name made lowercase.
    memory = models.IntegerField(db_column='Memory', blank=True, null=True)  # Field name made lowercase.
    glrender = models.CharField(db_column='GLRender', max_length=64, blank=True, null=True)  # Field name made lowercase.
    glversion = models.CharField(db_column='GLVersion', max_length=255, blank=True, null=True)  # Field name made lowercase.
    deviceid = models.CharField(db_column='DeviceId', max_length=64, blank=True, null=True)  # Field name made lowercase.
    ip = models.CharField(db_column='IP', max_length=64, blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=64, blank=True, null=True)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='UID', blank=True, null=True)  # Field name made lowercase.
    sex = models.IntegerField(db_column='Sex', blank=True, null=True)  # Field name made lowercase.
    fbid = models.CharField(db_column='FBID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apid = models.CharField(db_column='APID', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PlayerRegister'


class Allianceinfo(models.Model):
    zoneid = models.IntegerField(db_column='zoneID')  # Field name made lowercase.
    alliancename = models.CharField(db_column='allianceName', max_length=30)  # Field name made lowercase.
    allianceabbreviation = models.CharField(db_column='allianceAbbreviation', max_length=3)  # Field name made lowercase.
    alliancedeclaration = models.CharField(db_column='allianceDeclaration', max_length=200, blank=True, null=True)  # Field name made lowercase.
    alliancepicture = models.FloatField(db_column='alliancePicture', blank=True, null=True)  # Field name made lowercase.
    alliancepower = models.FloatField(db_column='alliancePower', blank=True, null=True)  # Field name made lowercase.
    alliancelowpower = models.FloatField(db_column='allianceLowPower', blank=True, null=True)  # Field name made lowercase.
    alliancepoint = models.FloatField(db_column='alliancePoint', blank=True, null=True)  # Field name made lowercase.
    alliancehonor = models.FloatField(db_column='allianceHonor', blank=True, null=True)  # Field name made lowercase.
    alliancemembers = models.IntegerField(db_column='allianceMembers', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'allianceinfo'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Feedback(models.Model):
    uid = models.CharField(db_column='UID', max_length=14)  # Field name made lowercase.
    mid = models.IntegerField(db_column='MID')  # Field name made lowercase.
    zoneid = models.CharField(db_column='zoneID', max_length=5)  # Field name made lowercase.
    platform = models.CharField(max_length=5)
    channel = models.IntegerField()
    language = models.CharField(max_length=3)
    type = models.CharField(max_length=1)
    summary = models.CharField(max_length=100, blank=True, null=True)
    content = models.CharField(max_length=800, blank=True, null=True)
    screenshots = models.CharField(max_length=100, blank=True, null=True)
    operatetime = models.DateTimeField(db_column='operateTime')  # Field name made lowercase.
    replytitle = models.CharField(db_column='replyTitle', max_length=100, blank=True, null=True)  # Field name made lowercase.
    replycontent = models.CharField(db_column='replyContent', max_length=800, blank=True, null=True)  # Field name made lowercase.
    replytime = models.DateTimeField(db_column='replyTime')  # Field name made lowercase.
    replyer = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'feedback'


class Gift(models.Model):
    giftid = models.CharField(db_column='giftID', max_length=7)  # Field name made lowercase.
    starttime = models.DateTimeField(db_column='startTime')  # Field name made lowercase.
    endtime = models.DateTimeField(db_column='endTime')  # Field name made lowercase.
    buynumbers = models.IntegerField(db_column='buyNumbers')  # Field name made lowercase.
    status = models.CharField(max_length=1, blank=True, null=True)
    sender = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gift'


class Mail(models.Model):
    mailtype = models.CharField(db_column='mailType', max_length=15)  # Field name made lowercase.
    lostday = models.CharField(db_column='lostDay', max_length=11, blank=True, null=True)  # Field name made lowercase.
    lowerlevel = models.IntegerField(db_column='lowerLevel')  # Field name made lowercase.
    higherlevel = models.IntegerField(db_column='higherLevel')  # Field name made lowercase.
    zoneid = models.CharField(db_column='zoneID', max_length=100)  # Field name made lowercase.
    language = models.CharField(max_length=200)
    sendtime = models.DateTimeField(db_column='sendTime')  # Field name made lowercase.
    nickname = models.CharField(db_column='nickName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    mailtitle = models.CharField(db_column='mailTitle', max_length=100)  # Field name made lowercase.
    mailcontent = models.CharField(db_column='mailContent', max_length=800)  # Field name made lowercase.
    mailversion = models.CharField(db_column='mailVersion', max_length=10, blank=True, null=True)  # Field name made lowercase.
    remarks = models.CharField(max_length=100)
    sender = models.CharField(max_length=30)
    items = models.CharField(max_length=200, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mail'


class Notice(models.Model):
    zoneid = models.CharField(db_column='zoneID', max_length=100)  # Field name made lowercase.
    language = models.CharField(max_length=100)
    noticetype = models.CharField(db_column='noticeType', max_length=20)  # Field name made lowercase.
    noticeinterval = models.IntegerField(db_column='noticeInterval', blank=True, null=True)  # Field name made lowercase.
    noticenumbers = models.IntegerField(db_column='noticeNumbers', blank=True, null=True)  # Field name made lowercase.
    noticetime = models.DateTimeField(db_column='noticeTime')  # Field name made lowercase.
    noticetitle = models.CharField(db_column='noticeTitle', max_length=100, blank=True, null=True)  # Field name made lowercase.
    noticecontent = models.CharField(db_column='noticeContent', max_length=1000)  # Field name made lowercase.
    remarks = models.CharField(max_length=30)
    sender = models.CharField(max_length=10)
    status = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'notice'


class OldPlayerRecall(models.Model):
    zoneid = models.IntegerField(db_column='zoneID')  # Field name made lowercase.
    nickname = models.CharField(db_column='nickName', max_length=30)  # Field name made lowercase.
    rewards = models.IntegerField(blank=True, null=True)
    sendtime = models.DateTimeField(db_column='sendTime', blank=True, null=True)  # Field name made lowercase.
    sendinterval = models.IntegerField(db_column='sendInterval', blank=True, null=True)  # Field name made lowercase.
    sendnumbers = models.IntegerField(db_column='sendNumbers', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'old_player_recall'


class Playerinfo(models.Model):
    accounttype = models.IntegerField(db_column='accountType')  # Field name made lowercase.
    openid = models.CharField(db_column='OpenID', max_length=36)  # Field name made lowercase.
    uid = models.CharField(db_column='UID', max_length=14)  # Field name made lowercase.
    nickname = models.CharField(db_column='nickName', max_length=30)  # Field name made lowercase.
    zoneid = models.IntegerField(db_column='zoneID')  # Field name made lowercase.
    playerlevel = models.IntegerField(db_column='playerLevel')  # Field name made lowercase.
    playeridol = models.IntegerField(db_column='playerIdol')  # Field name made lowercase.
    diamonds = models.IntegerField()
    rechargediamonds = models.IntegerField(db_column='rechargeDiamonds')  # Field name made lowercase.
    registerdate = models.DateTimeField(db_column='registerDate')  # Field name made lowercase.
    isonline = models.IntegerField(db_column='isOnline')  # Field name made lowercase.
    isblock = models.FloatField(db_column='isBlock')  # Field name made lowercase.
    isstopchat = models.FloatField(db_column='isStopChat')  # Field name made lowercase.
    playerwoods = models.FloatField(db_column='playerWoods')  # Field name made lowercase.
    playergold = models.FloatField(db_column='playerGold')  # Field name made lowercase.
    playeriron = models.FloatField(db_column='playerIron')  # Field name made lowercase.
    playerstone = models.FloatField(db_column='playerStone')  # Field name made lowercase.
    playercoordsx = models.IntegerField(db_column='playerCoordsX')  # Field name made lowercase.
    playercoordsy = models.IntegerField(db_column='playerCoordsY')  # Field name made lowercase.
    playerviplevel = models.IntegerField(db_column='playerVIPLevel')  # Field name made lowercase.
    playerresourceslevel = models.IntegerField(db_column='playerResourcesLevel')  # Field name made lowercase.
    playerrank = models.IntegerField(db_column='playerRank')  # Field name made lowercase.
    playeralliance = models.CharField(db_column='playerAlliance', max_length=30)  # Field name made lowercase.
    allianceposition = models.IntegerField(db_column='alliancePosition', blank=True, null=True)  # Field name made lowercase.
    playercastlelevel = models.IntegerField(db_column='playerCastleLevel')  # Field name made lowercase.
    playercastledefensevalue = models.IntegerField(db_column='playerCastleDefenseValue')  # Field name made lowercase.
    playerpower = models.FloatField(db_column='playerPower')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'playerinfo'


class Recharge(models.Model):
    platformorder = models.CharField(db_column='platformOrder', max_length=30)  # Field name made lowercase.
    gameorder = models.CharField(db_column='gameOrder', max_length=10)  # Field name made lowercase.
    nickname = models.CharField(db_column='nickName', max_length=30)  # Field name made lowercase.
    gamename = models.CharField(db_column='gameName', max_length=10)  # Field name made lowercase.
    zoneid = models.IntegerField(db_column='zoneID')  # Field name made lowercase.
    paytype = models.CharField(db_column='payType', max_length=9)  # Field name made lowercase.
    rechargecount = models.IntegerField(db_column='rechargeCount')  # Field name made lowercase.
    rechargemoney = models.FloatField(db_column='rechargeMoney')  # Field name made lowercase.
    orderstatus = models.IntegerField(db_column='orderStatus')  # Field name made lowercase.
    rechargetime = models.DateTimeField(db_column='rechargeTime')  # Field name made lowercase.
    arrivetime = models.DateTimeField(db_column='arriveTime')  # Field name made lowercase.
    registertime = models.DateTimeField(db_column='registerTime')  # Field name made lowercase.
    openid = models.CharField(db_column='OpenID', max_length=36)  # Field name made lowercase.
    uid = models.CharField(db_column='UID', max_length=14)  # Field name made lowercase.
    rechargetype = models.CharField(db_column='rechargeType', max_length=1)  # Field name made lowercase.
    giftid = models.CharField(db_column='giftID', max_length=7)  # Field name made lowercase.
    country = models.CharField(max_length=3)
    currency = models.CharField(max_length=3)
    platform = models.CharField(max_length=7)

    class Meta:
        managed = False
        db_table = 'recharge'


class TbBills(models.Model):
    gameorderid = models.BigAutoField(db_column='GameOrderId', primary_key=True)  # Field name made lowercase.
    giftid = models.CharField(db_column='GiftId', max_length=32)  # Field name made lowercase.
    producttype = models.CharField(db_column='ProductType', max_length=1)  # Field name made lowercase.
    productid = models.CharField(db_column='ProductId', max_length=32)  # Field name made lowercase.
    otherarg = models.IntegerField(db_column='OtherArg')  # Field name made lowercase.
    pricecurrencycode = models.CharField(db_column='PriceCurrencyCode', max_length=3)  # Field name made lowercase.
    priceamount = models.DecimalField(db_column='PriceAmount', max_digits=10, decimal_places=2)  # Field name made lowercase.
    uid = models.BigIntegerField(db_column='Uid')  # Field name made lowercase.
    zoneid = models.IntegerField(db_column='ZoneId')  # Field name made lowercase.
    os = models.IntegerField(db_column='Os')  # Field name made lowercase.
    accounttype = models.IntegerField(db_column='AccountType')  # Field name made lowercase.
    accountid = models.CharField(db_column='AccountId', max_length=32)  # Field name made lowercase.
    registertime = models.IntegerField(db_column='RegisterTime')  # Field name made lowercase.
    nickname = models.CharField(db_column='Nickname', max_length=100)  # Field name made lowercase.
    clientip = models.CharField(db_column='ClientIP', max_length=50)  # Field name made lowercase.
    countrycode = models.CharField(db_column='CountryCode', max_length=2)  # Field name made lowercase.
    purchasetimes = models.IntegerField(db_column='PurchaseTimes')  # Field name made lowercase.
    purchaseplatform = models.IntegerField(db_column='PurchasePlatform')  # Field name made lowercase.
    orderid = models.CharField(db_column='OrderId', max_length=50)  # Field name made lowercase.
    purchasetoken = models.CharField(db_column='PurchaseToken', max_length=120)  # Field name made lowercase.
    purchasestate = models.IntegerField(db_column='PurchaseState')  # Field name made lowercase.
    cancelreason = models.CharField(db_column='CancelReason', max_length=10, blank=True, null=True)  # Field name made lowercase.
    createtime = models.IntegerField(db_column='CreateTime')  # Field name made lowercase.
    purchasetime = models.IntegerField(db_column='PurchaseTime')  # Field name made lowercase.
    delivertime = models.IntegerField(db_column='DeliverTime')  # Field name made lowercase.
    inaccounttime = models.IntegerField(db_column='InAccountTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tb_bills'


class Userinfo(models.Model):
    username = models.CharField(max_length=10)
    password = models.CharField(max_length=20)
    permissionlevel = models.CharField(db_column='permissionLevel', max_length=2)  # Field name made lowercase.
    playermanage = models.CharField(db_column='playerManage', max_length=1)  # Field name made lowercase.
    gamemanage = models.CharField(db_column='gameManage', max_length=1)  # Field name made lowercase.
    playerlog = models.CharField(db_column='playerLog', max_length=1)  # Field name made lowercase.
    servermanage = models.CharField(db_column='serverManage', max_length=1)  # Field name made lowercase.
    usermanage = models.CharField(db_column='userManage', max_length=1)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'userinfo'
