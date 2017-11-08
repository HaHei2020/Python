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

/*Table structure for table `mail` */

DROP TABLE IF EXISTS `mail`;

CREATE TABLE `mail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `mailType` varchar(15) NOT NULL COMMENT '邮件类型，普通邮件，回归邮件',
  `lostDay` varchar(11) DEFAULT NULL COMMENT '流失天数',
  `lowerLevel` int(11) NOT NULL COMMENT '最低等级',
  `higherLevel` int(11) NOT NULL COMMENT '最高等级',
  `zoneID` varchar(100) NOT NULL COMMENT '区服',
  `language` varchar(200) NOT NULL COMMENT '语言',
  `sendTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
  `nickName` varchar(100) DEFAULT NULL COMMENT '昵称',
  `mailTitle` varchar(100) NOT NULL COMMENT '邮件标题',
  `mailContent` varchar(800) NOT NULL COMMENT '邮件内容',
  `mailVersion` varchar(10) DEFAULT NULL COMMENT '最低版本号',
  `remarks` varchar(100) NOT NULL COMMENT '备注',
  `sender` varchar(30) NOT NULL COMMENT '发送者',
  `items` varchar(200) DEFAULT NULL COMMENT '道具类型,道具ID,道具数量;',
  `status` int(1) DEFAULT NULL COMMENT '发送状态，0：失败，1：成功',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `mail` */

insert  into `mail`(`id`,`mailType`,`lostDay`,`lowerLevel`,`higherLevel`,`zoneID`,`language`,`sendTime`,`nickName`,`mailTitle`,`mailContent`,`mailVersion`,`remarks`,`sender`,`items`,`status`) values (1,'generalMail','',0,0,'10001|10002|10003|10004|','English|Chinese|Germany|','2017-08-10 16:35:20','','全服邮件','这是一封全服邮件，没有奖励~~~','','测试','hahei',NULL,1),(2,'generalMail','',0,0,'10001|10002|','English|','2017-08-11 16:36:43','hahei;commander','部分玩家邮件','部分玩家邮件，带奖励！！！','1.2.03','测试','hahei','item,1032001,1;item,1032008,10;',1),(3,'generalMail','',12,20,'10001|10002|10003|10004|','English|Chinese|Germany|','2017-08-10 16:42:54','','回归邮件','回归邮件~~回归邮件~~回归邮件~~','','测试233','hahei','item,1023000,1;item,1050666,100;equipment,1062555,3;',1),(4,'generalMail','',0,0,'10001|10002|10003|10004|','English|Chinese|Germany|','2017-08-23 18:30:53','','更新邮件','更新邮件~全服~不带奖励','','测试','hahei',NULL,1),(5,'generalMail','',1,1,'10001|10002|10003|10004|','English|Chinese|Germany|','2017-08-17 18:32:24','','全服邮件咳咳','全服邮件咳咳发生了什么','','测试','hahei',NULL,1),(6,'generalMail','',4,4,'10001|10002|10003|10004|','English|Chinese|Germany|','2017-08-23 18:33:49','','这回应该对了','这回应该对了这回应该对了这回应该对了这回应该对了\r\n这回应该对了这回应该对了这回应该对了\r\n这回应该对了这回应该对了','','测试','hahei',NULL,1),(7,'generalMail','',1,1,'10001|','English|Chinese|Germany|','2017-08-15 18:35:37','','这回应该对了这回应该对了这回应该对了这回应该对了 这回应该对了这回应该对了这回应该对了 这回应该对了这回应该对了','这回应该对了这回应该对了这回应该对了这回应该对了 这回应该对了这回应该对了这回应该对了 这回应该对了这回应该对了233333','','233','hahei',NULL,1),(8,'generalMail','',1,1,'10002|','Chinese|','2017-08-24 18:38:33','','这回呢','这回呢\r\n这回呢\r\n这回呢\r\n这回呢','','测','hahei',NULL,1),(9,'generalMail','',1,1,'10001|10002|10003|10004|','English|Chinese|Germany|','2017-08-08 18:59:16','','121232323','123131313131133113','','111','hahei','',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
