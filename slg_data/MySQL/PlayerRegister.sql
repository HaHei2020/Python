CREATE TABLE PlayerRegister
(
    ID bigint(20) PRIMARY KEY NOT NULL,
    iZoneAreaID int(10) DEFAULT '0' NOT NULL,
    dtEventTime datetime NOT NULL,
    vGameAppid varchar(32) DEFAULT '',
    PlatID int(10) DEFAULT '0' NOT NULL,
    DVID varchar(64) DEFAULT '',
    ClientVersion varchar(64) DEFAULT '',
    SystemSoftware varchar(64) DEFAULT '',
    SystemHardware varchar(64) DEFAULT '',
    TelecomOper varchar(64) DEFAULT '',
    Network varchar(64) DEFAULT '',
    ScreenWidth int(10) DEFAULT '0',
    ScreenHight int(10) DEFAULT '0',
    Density float DEFAULT '0',
    RegChannel int(10) DEFAULT '0',
    UUID varchar(64) DEFAULT '',
    CpuHardware varchar(64) DEFAULT '',
    Memory int(10) DEFAULT '0',
    GLRender varchar(64) DEFAULT '',
    GLVersion varchar(255) DEFAULT '',
    DeviceId varchar(64) DEFAULT '',
    IP varchar(64) DEFAULT '',
    Nickname varchar(64) DEFAULT '',
    UID bigint(20) DEFAULT '0',
    Sex int(10) DEFAULT '0',
    FBID varchar(64) DEFAULT '',
    APID varchar(64) DEFAULT ''
);
CREATE INDEX simple_time ON PlayerRegister (dtEventTime);
CREATE INDEX simple_uid ON PlayerRegister (UID);
CREATE INDEX union_uid_time ON PlayerRegister (UID, dtEventTime);
INSERT INTO PlayerRegister (ID, iZoneAreaID, dtEventTime, vGameAppid, PlatID, DVID, ClientVersion, SystemSoftware, SystemHardware, TelecomOper, Network, ScreenWidth, ScreenHight, Density, RegChannel, UUID, CpuHardware, Memory, GLRender, GLVersion, DeviceId, IP, Nickname, UID, Sex, FBID, APID) VALUES (2017070523000007134, 10002, '2017-07-06 00:00:05', 'APPID', 1, '07534dc7-7176-3d37-affe-81752d79e6db', '1.1.03', '7.0', 'SM-G955U', '未知', '4g', 1080, 2220, 420, 0, '0', 'ARMv7 VFPv3 NEON 2361 8', 3372, 'Adreno (TM) 540', 'OpenGL ES 3.2 V@197.0 (GIT@dd296bd, I7547f23799) (Date:03/29/17)', '0', '70.208.67.24', 'Empire.000288', 10002100000288, 0, '0', '1499298866592-5689818531032647622');
INSERT INTO PlayerRegister (ID, iZoneAreaID, dtEventTime, vGameAppid, PlatID, DVID, ClientVersion, SystemSoftware, SystemHardware, TelecomOper, Network, ScreenWidth, ScreenHight, Density, RegChannel, UUID, CpuHardware, Memory, GLRender, GLVersion, DeviceId, IP, Nickname, UID, Sex, FBID, APID) VALUES (2017070600000000072, 10002, '2017-07-06 00:00:59', 'APPID', 1, '0b06c5e0-e5fb-3d7a-958b-eff3e23d06a0', '1.1.03', '7.0', 'SM-G925W8', '未知', 'wifi', 1080, 1920, 480, 0, '0', 'ARMv7 VFPv3 NEON 2100 8', 2680, 'Mali-T760', 'OpenGL ES 3.2 v1.r15p0-00rel0.68b65ac7cf15907aeb95fa944f39eef2', '0', '184.64.14.128', 'Empire.000289', 10002100000289, 0, '0', '1499299226942-4646854010094854678');
INSERT INTO PlayerRegister (ID, iZoneAreaID, dtEventTime, vGameAppid, PlatID, DVID, ClientVersion, SystemSoftware, SystemHardware, TelecomOper, Network, ScreenWidth, ScreenHight, Density, RegChannel, UUID, CpuHardware, Memory, GLRender, GLVersion, DeviceId, IP, Nickname, UID, Sex, FBID, APID) VALUES (2017070600000000282, 10002, '2017-07-06 00:03:21', 'APPID', 1, '1ff7e2a6-e201-3d49-a523-b05c182faf8a', '1.1.03', '7.0', 'SM-G955U', '未知', 'wifi', 1080, 1920, 540, 0, '0', 'ARMv7 VFPv3 NEON 2361 8', 3372, 'Adreno (TM) 540', 'OpenGL ES 3.2 V@197.0 (GIT@dd296bd, I7547f23799) (Date:03/29/17)', '0', '108.81.33.2', 'Empire.000290', 10002100000290, 0, '0', '1499279727473-7169809468391532415');
