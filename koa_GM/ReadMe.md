###**游戏GM后台（练习）**

###**路由分配：**
**一、总体：**
1. 登录：  `/login`
2. 登出：  `/logout`
3. 首页：  `/`

**二、玩家管理：**
1. 玩家管理：  `/slguser/list`
2. 联盟管理：  `/alliance/list`
3. 玩家召回：  `/slgreward/user`

**三、游戏管理：**
1. 公告管理：   `/slgnotice/list`
2. 邮件管理：   `/slgmail/mail`
3. 订单管理：   `/slgorder/order`
4. 客服反馈：   `/slgfeedback/List`
5. 礼包管理：   `/slggift/list`

**四、玩家日志：**
1. 行为日志：   `/slgaction/list`

**五、服务器管理：**
1. 服务器参数：   `/slg_resourse/index`
2. 服务器列表：   `/slg_server_info/index`
3. 审核服配置：   `/slg_audt_server/index`
4. 服务器热更：   `/slg_server_update/index`
5. 服务器时间：   `/env/edit`

**六、管理员管理：**
1. 修改密码：     `/manager/edit_pw`
2. 管理员管理：   `/manager`


###**数据库表结构：**
1. 见 MySQL 文档

###**项目结构说明：**
1. logs：存放 日志 文件
2. models：存放 后端 业务逻辑
3. MySQL：存放 数据库文件
4. public：存放 前端文件
5. routes： 路由文件
6. views： 视图文件
7. app.js：启动文件
8. config.js：数据库相关设置
9. pm2Config.json：用pm2启动时，设置日志文件存放路径

###**运行环境：**
1. node：V7.7.4
2. koa2：V1.1.15
3. mysql：Server version: 5.7.18-log MySQL Community Server (GPL)

###**启动命令：**
1. 利用supervisor：`supervisor app.js`
2. 利用pm2：`pm2 start pm2Config.json`

###**备注：**
仅供练习使用！！
