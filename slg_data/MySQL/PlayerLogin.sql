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
INSERT INTO PlayerLogin (ID, iZoneAreaID, dtEventTime, vGameAppid, PlatID, DVID, Level, PlayerFriendsNum, ClientVersion, SystemSoftware, SystemHardware, TelecomOper, Network, ScreenWidth, ScreenHight, Density, LoginChannel, UUID, CpuHardware, Memory, GLRender, GLVersion, DeviceId, IP, Reconnect, Attack, Nickname, UID, FBID, APID) VALUES (2017070623000033682, 10002, '2017-07-07 00:00:06', 'APPID', 1, '5cf2e243-8983-37ab-8ea6-ddd22a2085d8', 1, 0, '1.2.01', '5.1.1', 'SM-J500F', '未知', '0', 720, 1280, 320, 0, '0', 'ARMv7 VFPv3 NEON 1190 4', 1388, 'Adreno (TM) 306', 'OpenGL ES 3.0 V@100.0 AU@05.01.00.032.018 (GIT@I856e09677e)', '0', '5.41.88.27', 0, 13795, 'Empire.002086', 10002100002086, '0', '1499384042366-7972610745362292280');
INSERT INTO PlayerLogin (ID, iZoneAreaID, dtEventTime, vGameAppid, PlatID, DVID, Level, PlayerFriendsNum, ClientVersion, SystemSoftware, SystemHardware, TelecomOper, Network, ScreenWidth, ScreenHight, Density, LoginChannel, UUID, CpuHardware, Memory, GLRender, GLVersion, DeviceId, IP, Reconnect, Attack, Nickname, UID, FBID, APID) VALUES (2017070623000033698, 10002, '2017-07-07 00:00:07', 'APPID', 1, '778db145-be1d-35ce-ac63-1bd689f00a99', 12, 0, '1.2.01', '4.4.4', 'XT1033', '未知', 'wifi', 720, 1280, 320, 0, '0', 'ARMv7 VFPv3 NEON 1190 4', 882, 'Adreno (TM) 305', 'OpenGL ES 3.0 V@66.0 AU@04.04.02.048.018 (CL@)', '0', '200.193.151.222', 0, 52382, 'ShadowBR', 10002100001748, '0', '1499377564455-4531264173170001594');
INSERT INTO PlayerLogin (ID, iZoneAreaID, dtEventTime, vGameAppid, PlatID, DVID, Level, PlayerFriendsNum, ClientVersion, SystemSoftware, SystemHardware, TelecomOper, Network, ScreenWidth, ScreenHight, Density, LoginChannel, UUID, CpuHardware, Memory, GLRender, GLVersion, DeviceId, IP, Reconnect, Attack, Nickname, UID, FBID, APID) VALUES (2017070700000000126, 10001, '2017-07-07 00:00:19', 'APPID', 1, '28c456c0-eb88-32db-a691-f1841f631e72', 15, 2, '1.2.01', '4.1.2', 'GT-I8190', '未知', 'wifi', 480, 800, 240, 0, '0', 'ARMv7 VFPv3 NEON 1000 2', 804, 'Mali-400 MP', 'OpenGL ES 2.0', '0', '105.232.65.124', 0, 158880, 'zhane', 10001100016743, '845582998964993', '1498754802721-5470644928621384464');
