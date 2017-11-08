CREATE TABLE MoneyFlow
(
    ID bigint(20) PRIMARY KEY NOT NULL,
    iZoneAreaID int(10) DEFAULT '0' NOT NULL,
    dtEventTime datetime NOT NULL,
    Sequence int(10) DEFAULT '0',
    vGameAppid varchar(32) DEFAULT '',
    PlatID int(10) DEFAULT '0' NOT NULL,
    DVID varchar(64) DEFAULT '',
    Level int(10) DEFAULT '0',
    AfterMoney bigint(20) DEFAULT '0',
    Money bigint(20) DEFAULT '0',
    Reason int(10) DEFAULT '0',
    SubReason int(10) DEFAULT '0',
    ReasonEventID varchar(64) DEFAULT '',
    AddOrReduce int(10) DEFAULT '0',
    MoneyType int(10) DEFAULT '0',
    VipLevel int(10) DEFAULT '0',
    IsRechargeMoney int(10) DEFAULT '0',
    Nickname varchar(64) DEFAULT '',
    UID bigint(20) DEFAULT '0',
    FBID varchar(64) DEFAULT '',
    APID varchar(64) DEFAULT ''
);
CREATE INDEX simple_time ON MoneyFlow (dtEventTime);
CREATE INDEX simple_uid ON MoneyFlow (UID);
CREATE INDEX union_uid_time ON MoneyFlow (UID, dtEventTime);
INSERT INTO MoneyFlow (ID, iZoneAreaID, dtEventTime, Sequence, vGameAppid, PlatID, DVID, Level, AfterMoney, Money, Reason, SubReason, ReasonEventID, AddOrReduce, MoneyType, VipLevel, IsRechargeMoney, Nickname, UID, FBID, APID) VALUES (2017101800000000188, 10009, '2017-10-18 00:00:01', 0, 'APPID', 1, '4278778b-679d-3b76-88eb-5f6f699b5b01', 23, 1794108, 35827, 133, 0, '0', 0, 0, 8, 0, '진이짱', 10009100005382, '0', '1502804247833-919081411859766751');
INSERT INTO MoneyFlow (ID, iZoneAreaID, dtEventTime, Sequence, vGameAppid, PlatID, DVID, Level, AfterMoney, Money, Reason, SubReason, ReasonEventID, AddOrReduce, MoneyType, VipLevel, IsRechargeMoney, Nickname, UID, FBID, APID) VALUES (2017101800000000227, 10009, '2017-10-18 00:00:02', 0, 'APPID', 1, '4278778b-679d-3b76-88eb-5f6f699b5b01', 23, 1061159, 9986, 133, 0, '0', 0, 3, 8, 0, '진이짱', 10009100005382, '0', '1502804247833-919081411859766751');
