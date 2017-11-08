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

/*Table structure for table `recharge` */

DROP TABLE IF EXISTS `recharge`;

CREATE TABLE `recharge` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `platformOrder` varchar(30) NOT NULL COMMENT '渠道订单号',
  `gameOrder` varchar(10) NOT NULL COMMENT '游戏订单号',
  `nickName` varchar(30) NOT NULL COMMENT '昵称',
  `gameName` varchar(10) NOT NULL DEFAULT 'The War' COMMENT '游戏名称',
  `zoneID` int(5) NOT NULL COMMENT '区服',
  `payType` varchar(9) NOT NULL COMMENT '充值方式',
  `rechargeCount` int(11) NOT NULL COMMENT '充值次数，从1开始',
  `rechargeMoney` float NOT NULL COMMENT '充值金额',
  `orderStatus` int(1) NOT NULL COMMENT '订单状态，1：成功，2：已创建，0：已取消，-1：非法，-2：已退款',
  `rechargeTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '充值时间',
  `arriveTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '到账时间',
  `registerTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '注册时间',
  `OpenID` varchar(36) NOT NULL COMMENT 'openID',
  `UID` varchar(14) NOT NULL COMMENT 'UID',
  `rechargeType` varchar(1) NOT NULL COMMENT '充值类型，1：礼包，0：普通，2：月卡',
  `giftID` varchar(7) NOT NULL COMMENT '礼包ID',
  `country` varchar(3) NOT NULL COMMENT '国家',
  `currency` varchar(3) NOT NULL COMMENT '充值币种',
  `platform` varchar(7) NOT NULL COMMENT '平台',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `recharge` */

insert  into `recharge`(`id`,`platformOrder`,`gameOrder`,`nickName`,`gameName`,`zoneID`,`payType`,`rechargeCount`,`rechargeMoney`,`orderStatus`,`rechargeTime`,`arriveTime`,`registerTime`,`OpenID`,`UID`,`rechargeType`,`giftID`,`country`,`currency`,`platform`) values (1,'GPA.3332-1865-7168-78516','56638','женя','The War',10009,'GooglePay',2,59,1,'2017-08-20 12:02:14','2017-08-17 00:12:51','2017-08-05 15:23:13','fd6f95ba-b77a-3db4-8083-7cf6b66b','10009100002076','1','1320103','RU','RUB','Android'),(2,'GPA.3385-1047-6193-03423','56639','AzraelAzul','The War',10002,'GooglePay',54,29.99,1,'2017-08-20 15:26:33','2017-08-01 18:16:32','2017-07-07 18:16:40','b69d6dfc-3344-369e-a2c9-db1acb21','10002100007777','1','1320123','USA','RUB','Android'),(3,'190000378232467','56677','Dirtyjocks','The War',10004,'ApplePay',7,1.49,1,'2017-08-20 13:41:49','2017-08-10 18:18:31','2017-07-31 18:18:34','c2124969f8714d68807341fbc91b07b2','10009100001121','1','1320101','AU','AUD','iOS');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
