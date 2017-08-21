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
CREATE DATABASE /*!32312 IF NOT EXISTS*/`koa_gm` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `koa_gm`;

/*Table structure for table `allianceinfo` */

DROP TABLE IF EXISTS `allianceinfo`;

CREATE TABLE `allianceinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `zoneID` int(5) NOT NULL COMMENT '所在区服',
  `allianceName` varchar(30) NOT NULL COMMENT '联盟名称',
  `allianceAbbreviation` varchar(3) NOT NULL COMMENT '联盟缩写',
  `allianceDeclaration` varchar(200) DEFAULT NULL COMMENT '联盟宣言',
  `alliancePicture` float DEFAULT NULL COMMENT '联盟头像',
  `alliancePower` float DEFAULT NULL COMMENT '联盟战力',
  `allianceLowPower` float DEFAULT NULL COMMENT '联盟最低战力',
  `alliancePoint` float DEFAULT NULL COMMENT '联盟积分',
  `allianceHonor` float DEFAULT NULL COMMENT '联盟荣誉值',
  `allianceMembers` int(3) DEFAULT NULL COMMENT '联盟成员数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `allianceinfo` */

insert  into `allianceinfo`(`id`,`zoneID`,`allianceName`,`allianceAbbreviation`,`allianceDeclaration`,`alliancePicture`,`alliancePower`,`allianceLowPower`,`alliancePoint`,`allianceHonor`,`allianceMembers`) values (1,10001,'LifeGuard and Pin','JWJ','WIPE OUT UNW, WIPE OUT UNWs ALLIES',4010800,85639100,500000,128802,7114,70);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
