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

/*Table structure for table `notice` */

DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `zoneID` varchar(100) NOT NULL COMMENT '区服',
  `language` varchar(100) NOT NULL COMMENT '目标语言',
  `noticeType` varchar(20) NOT NULL COMMENT '公告类型',
  `noticeInterval` int(11) DEFAULT NULL COMMENT '发送间隔',
  `noticeNumbers` int(11) DEFAULT NULL COMMENT '发送次数',
  `noticeTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '发送时间',
  `noticeTitle` varchar(100) DEFAULT NULL COMMENT '标题',
  `noticeContent` varchar(1000) NOT NULL COMMENT '正文',
  `remarks` varchar(30) NOT NULL COMMENT '备注',
  `sender` varchar(10) NOT NULL COMMENT '发送者',
  `status` int(1) NOT NULL COMMENT '状态，0：失败，1：成功，-1：异常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `notice` */

insert  into `notice`(`id`,`zoneID`,`language`,`noticeType`,`noticeInterval`,`noticeNumbers`,`noticeTime`,`noticeTitle`,`noticeContent`,`remarks`,`sender`,`status`) values (1,'10001|10002|10003|10004|','English|Chinese|Germany|','chatMessage',3600,12,'2017-08-08 21:08:47',NULL,'大家好~~~很高兴啊~~~哈哈哈~','测试','hahei',1),(2,'10001|10002|10003|10004|','English|Chinese|Germany|','chatMessage',3600,12,'2017-08-08 20:52:03',NULL,'大家好~~~很高兴啊~~~哈哈哈~测试测试！！！','测试','hahei',0),(5,'10001|10002|10003|10004|','English|Chinese|Germany|','inAnnouncement',NULL,NULL,'2017-08-15 14:05:39','哼哼哈嘿','啦啦啦啦~~！！！','测试','hahei',1),(6,'10001|','English|Chinese|Germany|','inAnnouncement',NULL,NULL,'2017-08-31 14:54:17','12333','112223131331133','1111','hahei',1),(7,'10001|','English|','inAnnouncement',NULL,NULL,'2017-08-01 14:54:35','阿萨斯','11122121212对我的撒','1223','hahei',1),(8,'10002|','Chinese|','inAnnouncement',NULL,NULL,'2017-08-16 14:54:55','a爱死','1·22·我是w','233','hahei',1),(9,'10001|10002|10003|10004|','English|Chinese|Germany|','inAnnouncement',NULL,NULL,'2017-08-14 14:55:13','12221111','1122122·','4444','hahei',1),(10,'10001|10002|10003|10004|','English|Chinese|Germany|','inAnnouncement',NULL,NULL,'2017-08-22 14:55:30','前往312123','1231231321','2333','hahei',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
