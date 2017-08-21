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

/*Table structure for table `userinfo` */

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `username` varchar(10) NOT NULL COMMENT '系统用户登录账号',
  `password` varchar(20) NOT NULL COMMENT '系统用户登录密码',
  `permissionLevel` varchar(2) NOT NULL DEFAULT 'L1' COMMENT '用户权限，L1：管理员，L2：运营人员，L3：客服，L4：其他',
  `playerManage` varchar(1) NOT NULL DEFAULT 'F' COMMENT '玩家管理权限，T为真，F为假',
  `gameManage` varchar(1) NOT NULL DEFAULT 'F' COMMENT '游戏管理权限，T为真，F为假',
  `playerLog` varchar(1) NOT NULL DEFAULT 'F' COMMENT '玩家日志权限，T为真，F为假',
  `serverManage` varchar(1) NOT NULL DEFAULT 'F' COMMENT '服务器管理权限，T为真，F为假',
  `userManage` varchar(1) NOT NULL DEFAULT 'F' COMMENT '管理员管理权限，T为真，F为假',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `userinfo` */

insert  into `userinfo`(`id`,`username`,`password`,`permissionLevel`,`playerManage`,`gameManage`,`playerLog`,`serverManage`,`userManage`) values (1,'hahei','1234567','L1','T','T','T','T','T'),(6,'hhahha','11111111','L1','T','F','T','F','F');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
