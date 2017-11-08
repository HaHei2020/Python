/*
SQLyog Professional v12.09 (64 bit)
MySQL - 5.7.18-log : Database - koa_gm
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`django_gm` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `django_gm`;

/*Table structure for table `playerinfo` */

DROP TABLE IF EXISTS `playerinfo`;

CREATE TABLE `playerinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `accountType` int(11) NOT NULL DEFAULT '0' COMMENT '账号类型',
  `OpenID` varchar(36) NOT NULL COMMENT 'OpenID',
  `UID` varchar(14) NOT NULL COMMENT 'UID',
  `nickName` varchar(30) NOT NULL COMMENT '昵称',
  `zoneID` int(5) NOT NULL COMMENT '区服',
  `playerLevel` int(2) NOT NULL COMMENT '玩家等级',
  `playerIdol` int(11) NOT NULL COMMENT '玩家形象',
  `diamonds` int(11) NOT NULL COMMENT '钻石存量',
  `rechargeDiamonds` int(11) NOT NULL DEFAULT '0' COMMENT '充值钻石数量',
  `registerDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `isOnline` int(1) NOT NULL DEFAULT '0' COMMENT '是否在线',
  `isBlock` float NOT NULL DEFAULT '0' COMMENT '是否封停',
  `isStopChat` float NOT NULL DEFAULT '0' COMMENT '是否禁言',
  `playerWoods` float NOT NULL COMMENT '木材数量',
  `playerGold` float NOT NULL COMMENT '金币数量',
  `playerIron` float NOT NULL COMMENT '铁矿数量',
  `playerStone` float NOT NULL COMMENT '石头数量',
  `playerCoordsX` int(11) NOT NULL COMMENT '玩家坐标X',
  `playerCoordsY` int(11) NOT NULL COMMENT '玩家坐标Y',
  `playerVIPLevel` int(2) NOT NULL COMMENT 'VIP等级',
  `playerResourcesLevel` int(1) NOT NULL COMMENT '资源带等级',
  `playerRank` int(11) NOT NULL COMMENT '玩家本服排名',
  `playerAlliance` varchar(30) NOT NULL COMMENT '玩家所在联盟',
  `alliancePosition` int(1) DEFAULT '3' COMMENT '玩家所在联盟职位',
  `playerCastleLevel` int(2) NOT NULL COMMENT '玩家城堡等级',
  `playerCastleDefenseValue` int(11) NOT NULL COMMENT '玩家城防值',
  `playerPower` float NOT NULL COMMENT '玩家战力',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `playerinfo` */

insert  into `playerinfo`(`id`,`accountType`,`OpenID`,`UID`,`nickName`,`zoneID`,`playerLevel`,`playerIdol`,`diamonds`,`rechargeDiamonds`,`registerDate`,`isOnline`,`isBlock`,`isStopChat`,`playerWoods`,`playerGold`,`playerIron`,`playerStone`,`playerCoordsX`,`playerCoordsY`,`playerVIPLevel`,`playerResourcesLevel`,`playerRank`,`playerAlliance`,`alliancePosition`,`playerCastleLevel`,`playerCastleDefenseValue`,`playerPower`) values (1,0,'7163fc0d-6da0-4210-95c6-6528685af904','10001100000039','commander',10001,22,1000000,133553,9580,'2017-05-11 16:19:11',1,0,1,44584700,3634380,5832210,559666,-1,-1,7,0,6,'LifeGuard and Pin',1,34,12000,8619290),(2,1,'3ce38339-6df6-3564-afb0-71e5ae468796','10001100003246','wow',10001,7,4000000,74,0,'2017-05-13 13:48:18',0,0,0,27554,42811,10000,10000,-1,-1,2,0,5943,'LifeGuard and Pin',2,4,2940,2511),(3,1,'4fbda572-2d76-3ad6-ba66-64eb2dcc7b46','10001100012515','lol',10001,11,4000000,9,0,'2017-05-18 11:52:07',0,0,0,593169,792223,10000,10000,100,10,2,1,2436,'LifeGuard and Pin1',3,6,4000,5427);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
