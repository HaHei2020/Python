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

/*Table structure for table `old_player_recall` */

DROP TABLE IF EXISTS `old_player_recall`;

CREATE TABLE `old_player_recall` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `zoneID` int(11) NOT NULL COMMENT '区服',
  `nickName` varchar(30) NOT NULL COMMENT '玩家昵称',
  `rewards` int(11) DEFAULT NULL COMMENT '发送的奖励',
  `sendTime` datetime DEFAULT NULL COMMENT '发送的时间',
  `sendInterval` int(11) DEFAULT NULL COMMENT '发送的间隔',
  `sendNumbers` int(11) DEFAULT NULL COMMENT '发送的次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `old_player_recall` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
