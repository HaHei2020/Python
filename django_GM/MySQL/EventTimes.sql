CREATE TABLE EventTimes
(
    ID bigint(20) PRIMARY KEY NOT NULL,
    iZoneAreaID int(10) DEFAULT '0' NOT NULL,
    dtEventTime datetime NOT NULL,
    Sequence int(10) DEFAULT '0',
    vGameAppid varchar(32) DEFAULT '',
    PlatID int(10) DEFAULT '0' NOT NULL,
    DVID varchar(64) DEFAULT '',
    Level int(10) DEFAULT '0',
    Type int(10) DEFAULT '0',
    Times int(10) DEFAULT '0',
    Nickname varchar(64) DEFAULT '',
    UID bigint(20) DEFAULT '0',
    TarName varchar(32) DEFAULT '',
    TarType int(10) DEFAULT '0',
    TarLevel int(10) DEFAULT '0',
    AtkWay int(10) DEFAULT '0',
    OriginalLevel int(10) DEFAULT '0',
    Color int(10) DEFAULT '0',
    Opttype int(10) DEFAULT '0',
    Num int(10) DEFAULT '0',
    Winning int(10) DEFAULT '0',
    Defresult int(10) DEFAULT '0',
    TarCatsleLevel int(10) DEFAULT '0',
    FBID varchar(64) DEFAULT '',
    APID varchar(64) DEFAULT '',
    HurtEndTime varchar(64) DEFAULT '0',
    NumTwo int(11) DEFAULT '0'
);
CREATE INDEX simple_time ON EventTimes (dtEventTime);
CREATE INDEX simple_uid ON EventTimes (UID);
CREATE INDEX union_uid_time ON EventTimes (UID, dtEventTime);
INSERT INTO EventTimes (ID, iZoneAreaID, dtEventTime, Sequence, vGameAppid, PlatID, DVID, Level, Type, Times, Nickname, UID, TarName, TarType, TarLevel, AtkWay, OriginalLevel, Color, Opttype, Num, Winning, Defresult, TarCatsleLevel, FBID, APID, HurtEndTime, NumTwo) VALUES (2017101800000000207, 10009, '2017-10-18 00:00:01', 0, 'APPID', 1, '62520040-7721-3b43-986e-aae18c14f8de', 25, 40, 1, 'ขุนพล2', 10009100008484, '2017-10-17 23:56:58', 5, 0, -1, -1, -1, 1, 4, -1, -1, -1, '0', '0', '1970-01-01 00:00:00', 5);
INSERT INTO EventTimes (ID, iZoneAreaID, dtEventTime, Sequence, vGameAppid, PlatID, DVID, Level, Type, Times, Nickname, UID, TarName, TarType, TarLevel, AtkWay, OriginalLevel, Color, Opttype, Num, Winning, Defresult, TarCatsleLevel, FBID, APID, HurtEndTime, NumTwo) VALUES (2017101800000000209, 10009, '2017-10-18 00:00:01', 0, 'APPID', 1, '62520040-7721-3b43-986e-aae18c14f8de', 25, 4, 1, 'ขุนพล2', 10009100008484, '0', 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, '0', '0', '0', 0);
