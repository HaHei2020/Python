CREATE TABLE ItemFlow
(
    ID bigint(20) PRIMARY KEY NOT NULL,
    iZoneAreaID int(10) DEFAULT '0' NOT NULL,
    dtEventTime datetime NOT NULL,
    Sequence int(10) DEFAULT '0',
    vGameAppid varchar(32) DEFAULT '',
    PlatID int(10) DEFAULT '0' NOT NULL,
    DVID varchar(64) DEFAULT '',
    ItemType int(10) DEFAULT '0',
    ItemId varchar(32) DEFAULT '',
    AfterCount int(10) DEFAULT '0',
    Count int(10) DEFAULT '0',
    Reason int(10) DEFAULT '0',
    SubReason int(10) DEFAULT '0',
    ReasonEventID varchar(64) DEFAULT '',
    AddOrReduce int(10) DEFAULT '0',
    ItId varchar(50) DEFAULT '',
    iMoney int(10) DEFAULT '0',
    iMoneyType int(10) DEFAULT '0',
    Level int(10) DEFAULT '0',
    Nickname varchar(64) DEFAULT '',
    UID bigint(20) DEFAULT '0',
    FBID varchar(64) DEFAULT '',
    APID varchar(64) DEFAULT ''
);
CREATE INDEX simple_ItemId ON ItemFlow (ItemId);
CREATE INDEX simple_uid ON ItemFlow (UID);
CREATE INDEX union_ItemId_time ON ItemFlow (dtEventTime, ItemId);
INSERT INTO ItemFlow (ID, iZoneAreaID, dtEventTime, Sequence, vGameAppid, PlatID, DVID, ItemType, ItemId, AfterCount, Count, Reason, SubReason, ReasonEventID, AddOrReduce, ItId, iMoney, iMoneyType, Level, Nickname, UID, FBID, APID) VALUES (2017101800000000073, 10008, '2017-10-18 00:00:00', 0, 'APPID', 1, '4c9a98f6-5e9b-3b76-980e-4f06f83013b6', 3, '1031102', 1, 1, 164, 1031102, '0', 0, '1031102', 0, 0, 28, 'Aji Sanjaya', 10008100006357, '1612747348799588', '1499995814655-4339015588689960459');
INSERT INTO ItemFlow (ID, iZoneAreaID, dtEventTime, Sequence, vGameAppid, PlatID, DVID, ItemType, ItemId, AfterCount, Count, Reason, SubReason, ReasonEventID, AddOrReduce, ItId, iMoney, iMoneyType, Level, Nickname, UID, FBID, APID) VALUES (2017101800000000228, 10005, '2017-10-18 00:00:02', 0, 'APPID', 0, '502e962b8ae5457bbd4a042e788f6aea', 3, '1030101', 209, 1, 164, 1030101, '0', 0, '1030101', 0, 0, 25, 'Onwards', 10007100015689, '0', '1507284620119-3554225');
