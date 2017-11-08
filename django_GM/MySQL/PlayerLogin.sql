CREATE TABLE PlayerLogin
(
    ID bigint(20) PRIMARY KEY NOT NULL,
    iZoneAreaID int(10) DEFAULT '0' NOT NULL,
    dtEventTime datetime NOT NULL,
    vGameAppid varchar(32) DEFAULT '',
    PlatID int(10) DEFAULT '0' NOT NULL,
    DVID varchar(64) DEFAULT '',
    Level int(10) DEFAULT '0',
    PlayerFriendsNum int(10) DEFAULT '0',
    ClientVersion varchar(64) DEFAULT '',
    SystemSoftware varchar(64) DEFAULT '',
    SystemHardware varchar(64) DEFAULT '',
    TelecomOper varchar(64) DEFAULT '',
    Network varchar(64) DEFAULT '',
    ScreenWidth int(10) DEFAULT '0',
    ScreenHight int(10) DEFAULT '0',
    Density float DEFAULT '0',
    LoginChannel int(10) DEFAULT '0',
    UUID varchar(64) DEFAULT '',
    CpuHardware varchar(64) DEFAULT '',
    Memory int(10) DEFAULT '0',
    GLRender varchar(64) DEFAULT '',
    GLVersion varchar(255) DEFAULT '',
    DeviceId varchar(64) DEFAULT '',
    IP varchar(64) DEFAULT '',
    Reconnect int(10) DEFAULT '0',
    Attack int(10) DEFAULT '0',
    Nickname varchar(64) DEFAULT '',
    UID bigint(20) DEFAULT '0',
    FBID varchar(64) DEFAULT '',
    APID varchar(64) DEFAULT ''
);
CREATE INDEX simple_time ON PlayerLogin (dtEventTime);
CREATE INDEX simple_uid ON PlayerLogin (UID);
CREATE INDEX union_uid_time ON PlayerLogin (UID, dtEventTime);
INSERT INTO PlayerLogin (ID, iZoneAreaID, dtEventTime, vGameAppid, PlatID, DVID, Level, PlayerFriendsNum, ClientVersion, SystemSoftware, SystemHardware, TelecomOper, Network, ScreenWidth, ScreenHight, Density, LoginChannel, UUID, CpuHardware, Memory, GLRender, GLVersion, DeviceId, IP, Reconnect, Attack, Nickname, UID, FBID, APID) VALUES (2017100100000000001, 10011, '2017-10-01 00:00:00', 'APPID', 1, '25518b97-e570-3232-b09f-5513bfe9273f', 24, 12, '1.6.01', '7.0', 'Moto G (4)', '未知', 'wifi', 1080, 1920, 480, 0, '0', 'ARMv7 VFPv3 NEON 1516 8', 1866, 'Adreno (TM) 405', 'OpenGL ES 3.2 V@145.0 (GIT@I8ee426a9a2)', '0', '190.183.213.164', 0, 4341949, 'walterJM', 10011100000827, '850376911833450', '1505595630412-6141515778762502795');
INSERT INTO PlayerLogin (ID, iZoneAreaID, dtEventTime, vGameAppid, PlatID, DVID, Level, PlayerFriendsNum, ClientVersion, SystemSoftware, SystemHardware, TelecomOper, Network, ScreenWidth, ScreenHight, Density, LoginChannel, UUID, CpuHardware, Memory, GLRender, GLVersion, DeviceId, IP, Reconnect, Attack, Nickname, UID, FBID, APID) VALUES (2017100100000000497, 10002, '2017-10-01 00:00:07', 'APPID', 1, '6bd21d9b-5212-3865-bbf4-b7de86edf3bb', 23, 6, '1.6.01', '7.0', 'SM-G928F', '未知', 'wifi', 1080, 1920, 420, 0, '0', 'ARMv7 VFPv3 NEON 2100 8', 3664, 'Mali-T760', 'OpenGL ES 3.2 v1.r15p0-00rel0.5dff6779e3b10548dc5cd2b2f4972566', '0', '82.56.173.24', 0, 1141004, 'baby obi', 10008100011911, '449388322113441', '1505810026328-3425047919129852210');
