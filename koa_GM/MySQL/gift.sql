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

/*Table structure for table `gift` */

DROP TABLE IF EXISTS `gift`;

CREATE TABLE `gift` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `giftID` varchar(7) NOT NULL COMMENT '礼包ID',
  `startTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '开始时间',
  `endTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '结束时间',
  `buyNumbers` int(11) NOT NULL COMMENT '购买次数',
  `status` varchar(1) DEFAULT NULL COMMENT '状态，0：失败，1：成功',
  `sender` varchar(20) DEFAULT NULL COMMENT '操作者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `gift` */

insert  into `gift`(`id`,`giftID`,`startTime`,`endTime`,`buyNumbers`,`status`,`sender`) values (1,'1230001','2017-08-09 22:43:21','2017-08-10 22:43:22',1,'1','hahei');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
