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

/*Table structure for table `feedback` */

DROP TABLE IF EXISTS `feedback`;

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `UID` varchar(14) NOT NULL COMMENT '玩家身份识别码',
  `MID` int(11) NOT NULL COMMENT '流水号',
  `zoneID` varchar(5) NOT NULL COMMENT '区服',
  `platform` varchar(5) NOT NULL COMMENT '平台',
  `channel` int(11) NOT NULL DEFAULT '0' COMMENT '渠道',
  `language` varchar(3) NOT NULL COMMENT '语言',
  `type` varchar(1) NOT NULL COMMENT '问题类型，1：错误和问题，2：建议，3：账户和登录，4：付费问题，5：资源销售，6：过激言论，7：游戏帮助，8：其他',
  `summary` varchar(100) DEFAULT NULL COMMENT '问题概述',
  `content` varchar(800) DEFAULT NULL COMMENT '详细内容',
  `screenshots` varchar(100) DEFAULT NULL COMMENT '截图地址',
  `operateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '操作时间',
  `replyTitle` varchar(100) DEFAULT NULL COMMENT '回复标题',
  `replyContent` varchar(800) DEFAULT NULL COMMENT '回复内容',
  `replyTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '回复时间',
  `replyer` varchar(30) DEFAULT NULL COMMENT '回复人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `feedback` */

insert  into `feedback`(`id`,`UID`,`MID`,`zoneID`,`platform`,`channel`,`language`,`type`,`summary`,`content`,`screenshots`,`operateTime`,`replyTitle`,`replyContent`,`replyTime`,`replyer`) values (1,'10005100007092',1079,'10005','安卓',0,'AU','7','Alliance depot','	Can the alliance Depot be upgraded yet? If not it may be something to consider',NULL,'2017-08-10 09:52:30',NULL,NULL,'0000-00-00 00:00:00',NULL),(2,'10008100003555',1080,'10008','安卓',0,'US','2','	Defending deaths','	I would love it if defending troops died as well otherwise it makes people not want to make an attack seeing as they lose troops in the attack and defenders don\'t all defenders ever have to do is heal they\'re troops back up. Many members of my alliance think it would bring more fun and life to the game making it more realistic. It would also make the game more about war seeing as many people are only playing this game for the farming and building aspect yet the name of the game is wrath of war.',NULL,'2017-08-11 16:48:32','WOW Customer Service','Hi, my Lord\r\n\r\n\r\nPlayers are our top priority in the Wrath Of War. We are doing great work to improve the services and experience to our players! Your support will inspire us keep on moving!\r\n\r\nLet\'s Fight To Last Breath!\r\n\r\nAny problems, pls contact us via the following:\r\n1.Find us: Click “Lord Picture”—Settings—Contact Customer Service\r\n\r\n2.Special support email for Lords: wow@mobartsgame.com\r\n\r\nMore details please focus on:\r\nhttps://www.facebook.com/EndlessDarkAge\r\n\r\nFAQ:\r\nhttp://13.56.87.42:443/faq\r\n\r\nWrath Of War Team','2017-08-11 16:48:32','hahei');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
