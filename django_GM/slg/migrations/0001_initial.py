# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-10 12:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Allianceinfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zoneid', models.IntegerField(db_column='zoneID')),
                ('alliancename', models.CharField(db_column='allianceName', max_length=30)),
                ('allianceabbreviation', models.CharField(db_column='allianceAbbreviation', max_length=3)),
                ('alliancedeclaration', models.CharField(blank=True, db_column='allianceDeclaration', max_length=200, null=True)),
                ('alliancepicture', models.FloatField(blank=True, db_column='alliancePicture', null=True)),
                ('alliancepower', models.FloatField(blank=True, db_column='alliancePower', null=True)),
                ('alliancelowpower', models.FloatField(blank=True, db_column='allianceLowPower', null=True)),
                ('alliancepoint', models.FloatField(blank=True, db_column='alliancePoint', null=True)),
                ('alliancehonor', models.FloatField(blank=True, db_column='allianceHonor', null=True)),
                ('alliancemembers', models.IntegerField(blank=True, db_column='allianceMembers', null=True)),
            ],
            options={
                'db_table': 'allianceinfo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(db_column='UID', max_length=14)),
                ('mid', models.IntegerField(db_column='MID')),
                ('zoneid', models.CharField(db_column='zoneID', max_length=5)),
                ('platform', models.CharField(max_length=5)),
                ('channel', models.IntegerField()),
                ('language', models.CharField(max_length=3)),
                ('type', models.CharField(max_length=1)),
                ('summary', models.CharField(blank=True, max_length=100, null=True)),
                ('content', models.CharField(blank=True, max_length=800, null=True)),
                ('screenshots', models.CharField(blank=True, max_length=100, null=True)),
                ('operatetime', models.DateTimeField(db_column='operateTime')),
                ('replytitle', models.CharField(blank=True, db_column='replyTitle', max_length=100, null=True)),
                ('replycontent', models.CharField(blank=True, db_column='replyContent', max_length=800, null=True)),
                ('replytime', models.DateTimeField(db_column='replyTime')),
                ('replyer', models.CharField(blank=True, max_length=30, null=True)),
            ],
            options={
                'db_table': 'feedback',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Gift',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('giftid', models.CharField(db_column='giftID', max_length=7)),
                ('starttime', models.DateTimeField(db_column='startTime')),
                ('endtime', models.DateTimeField(db_column='endTime')),
                ('buynumbers', models.IntegerField(db_column='buyNumbers')),
                ('status', models.CharField(blank=True, max_length=1, null=True)),
                ('sender', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'gift',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Mail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mailtype', models.CharField(db_column='mailType', max_length=15)),
                ('lostday', models.CharField(blank=True, db_column='lostDay', max_length=11, null=True)),
                ('lowerlevel', models.IntegerField(db_column='lowerLevel')),
                ('higherlevel', models.IntegerField(db_column='higherLevel')),
                ('zoneid', models.CharField(db_column='zoneID', max_length=100)),
                ('language', models.CharField(max_length=200)),
                ('sendtime', models.DateTimeField(db_column='sendTime')),
                ('nickname', models.CharField(blank=True, db_column='nickName', max_length=100, null=True)),
                ('mailtitle', models.CharField(db_column='mailTitle', max_length=100)),
                ('mailcontent', models.CharField(db_column='mailContent', max_length=800)),
                ('mailversion', models.CharField(blank=True, db_column='mailVersion', max_length=10, null=True)),
                ('remarks', models.CharField(max_length=100)),
                ('sender', models.CharField(max_length=30)),
                ('items', models.CharField(blank=True, max_length=200, null=True)),
                ('status', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'mail',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zoneid', models.CharField(db_column='zoneID', max_length=100)),
                ('language', models.CharField(max_length=100)),
                ('noticetype', models.CharField(db_column='noticeType', max_length=20)),
                ('noticeinterval', models.IntegerField(blank=True, db_column='noticeInterval', null=True)),
                ('noticenumbers', models.IntegerField(blank=True, db_column='noticeNumbers', null=True)),
                ('noticetime', models.DateTimeField(db_column='noticeTime')),
                ('noticetitle', models.CharField(blank=True, db_column='noticeTitle', max_length=100, null=True)),
                ('noticecontent', models.CharField(db_column='noticeContent', max_length=1000)),
                ('remarks', models.CharField(max_length=30)),
                ('sender', models.CharField(max_length=10)),
                ('status', models.IntegerField()),
            ],
            options={
                'db_table': 'notice',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OldPlayerRecall',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zoneid', models.IntegerField(db_column='zoneID')),
                ('nickname', models.CharField(db_column='nickName', max_length=30)),
                ('rewards', models.IntegerField(blank=True, null=True)),
                ('sendtime', models.DateTimeField(blank=True, db_column='sendTime', null=True)),
                ('sendinterval', models.IntegerField(blank=True, db_column='sendInterval', null=True)),
                ('sendnumbers', models.IntegerField(blank=True, db_column='sendNumbers', null=True)),
            ],
            options={
                'db_table': 'old_player_recall',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Playerinfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accounttype', models.IntegerField(db_column='accountType')),
                ('openid', models.CharField(db_column='OpenID', max_length=36)),
                ('uid', models.CharField(db_column='UID', max_length=14)),
                ('nickname', models.CharField(db_column='nickName', max_length=30)),
                ('zoneid', models.IntegerField(db_column='zoneID')),
                ('playerlevel', models.IntegerField(db_column='playerLevel')),
                ('playeridol', models.IntegerField(db_column='playerIdol')),
                ('diamonds', models.IntegerField()),
                ('rechargediamonds', models.IntegerField(db_column='rechargeDiamonds')),
                ('registerdate', models.DateTimeField(db_column='registerDate')),
                ('isonline', models.IntegerField(db_column='isOnline')),
                ('isblock', models.FloatField(db_column='isBlock')),
                ('isstopchat', models.FloatField(db_column='isStopChat')),
                ('playerwoods', models.FloatField(db_column='playerWoods')),
                ('playergold', models.FloatField(db_column='playerGold')),
                ('playeriron', models.FloatField(db_column='playerIron')),
                ('playerstone', models.FloatField(db_column='playerStone')),
                ('playercoordsx', models.IntegerField(db_column='playerCoordsX')),
                ('playercoordsy', models.IntegerField(db_column='playerCoordsY')),
                ('playerviplevel', models.IntegerField(db_column='playerVIPLevel')),
                ('playerresourceslevel', models.IntegerField(db_column='playerResourcesLevel')),
                ('playerrank', models.IntegerField(db_column='playerRank')),
                ('playeralliance', models.CharField(db_column='playerAlliance', max_length=30)),
                ('allianceposition', models.IntegerField(blank=True, db_column='alliancePosition', null=True)),
                ('playercastlelevel', models.IntegerField(db_column='playerCastleLevel')),
                ('playercastledefensevalue', models.IntegerField(db_column='playerCastleDefenseValue')),
                ('playerpower', models.FloatField(db_column='playerPower')),
            ],
            options={
                'db_table': 'playerinfo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Recharge',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('platformorder', models.CharField(db_column='platformOrder', max_length=30)),
                ('gameorder', models.CharField(db_column='gameOrder', max_length=10)),
                ('nickname', models.CharField(db_column='nickName', max_length=30)),
                ('gamename', models.CharField(db_column='gameName', max_length=10)),
                ('zoneid', models.IntegerField(db_column='zoneID')),
                ('paytype', models.CharField(db_column='payType', max_length=9)),
                ('rechargecount', models.IntegerField(db_column='rechargeCount')),
                ('rechargemoney', models.FloatField(db_column='rechargeMoney')),
                ('orderstatus', models.IntegerField(db_column='orderStatus')),
                ('rechargetime', models.DateTimeField(db_column='rechargeTime')),
                ('arrivetime', models.DateTimeField(db_column='arriveTime')),
                ('registertime', models.DateTimeField(db_column='registerTime')),
                ('openid', models.CharField(db_column='OpenID', max_length=36)),
                ('uid', models.CharField(db_column='UID', max_length=14)),
                ('rechargetype', models.CharField(db_column='rechargeType', max_length=1)),
                ('giftid', models.CharField(db_column='giftID', max_length=7)),
                ('country', models.CharField(max_length=3)),
                ('currency', models.CharField(max_length=3)),
                ('platform', models.CharField(max_length=7)),
            ],
            options={
                'db_table': 'recharge',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Userinfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=10)),
                ('password', models.CharField(max_length=20)),
                ('permissionlevel', models.CharField(db_column='permissionLevel', max_length=2)),
                ('playermanage', models.CharField(db_column='playerManage', max_length=1)),
                ('gamemanage', models.CharField(db_column='gameManage', max_length=1)),
                ('playerlog', models.CharField(db_column='playerLog', max_length=1)),
                ('servermanage', models.CharField(db_column='serverManage', max_length=1)),
                ('usermanage', models.CharField(db_column='userManage', max_length=1)),
            ],
            options={
                'db_table': 'userinfo',
                'managed': False,
            },
        ),
    ]