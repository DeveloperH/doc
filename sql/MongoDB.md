# MongoDB

## 介绍

数据库结构: 库 > 集合(表) > item > 字段

* 



## 安装

下载地址: https://www.mongodb.com/try/download/community

安装步骤参考: https://blog.csdn.net/qq_39377418/article/details/102870295



安装完成后，可以配置环境变量。



## Robo3T 可视化工具

官网: https://robomongo.org/





## 命令

**win10 需要使用管理员命令行启动**

**路径必须以 `/` 标识，不允许使用带有反斜杠 `\` 的路径**



* 启动数据库 : `mongod --dbpath 数据库存放文件夹所在目录`
  * `mongod --path d:/data/db`
  * 看到 `27017` 表示成功
* 导入数据库数据 : `mongoimport -h 数据库地址 -d 要使用的库 -c 要使用的集合 要导入文件的路径`
  * -h : 数据库地址，MongoDB 服务器所在的 IP 与 端口号，如 localhost:27017
  * -d : 指明要使用的数据库实例
  * -c : 指明数据要导入到哪个集合
  * `mongoimport -h localhost:27017 -d cakedemo -c test C:/Users/RainstormDy/Desktop/icons.json`
  * 当数据库实例或者集合不存在时，会自动创建





### 常用shell命令

```
mongo					进入mongo shell
show dbs			列出所有DB
use dbname		切换当前DB
show tables 或 show collections 列出已选择DB中的所有表

show users		列出当前DB的所有用户
show profile	列出当前DB的所有慢查询
show logs			列出运行日志

db.表名.insert({要插入的数据})		在指定表中插入数据，如果表不存在则自动创建
例如: db.mystu.insert({name:"zhangsan", age:15})

db.getCollection('表名').find({})	查询指定表中数据
```



























