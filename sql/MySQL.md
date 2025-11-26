# MySQL

MySQL 是一个关系型数据库管理系统。

[官网](https://www.mysql.com/)



## 安装

推荐版本：5.7、8.0

[5.7 msi 下载](https://dev.mysql.com/downloads/installer/5.7.html)

[解压版下载](https://downloads.mysql.com/archives/community/)



mysql-5.7.44 安装步骤：

1. 解压安装文件到任意目录

2. path 环境变量中添加 mysql 的 bin 目录，例如 `D:\Program Files\mysql-5.7.44\bin`

3. 在mysql目录下新建 `my.ini` 文件

   ```ini
   [mysql]
   # 设置mysql客户端默认字符集
   default-character-set=utf8 
   [mysqld]
   #设置3306端口
   port = 3306 
   # 设置mysql的安装目录
   basedir=D:\Program Files\mysql-5.7.44\bin
   # 设置mysql数据库的数据的存放目录
   datadir=D:\Program Files\mysql-5.7.44\data
   # 允许最大连接数
   max_connections=200
   # 服务端使用的字符集默认为8比特编码的latin1字符集
   character-set-server=utf8
   # 创建新表时将使用的默认存储引擎
   default-storage-engine=INNODB
   # 安装好后, 免密码进入mysql
   skip-grant-tables
   ```

4. 以管理员身份运行 cmd

   ```sh
   # 安装服务
   mysqld -install
   
   # 安装成功后，初始化数据文件
   mysqld --initialize-insecure --user=mysql
   
   # 启动mysql服务
   net start mysql
   
   # 进入mysql管理界面
   mysql -u root-p
   
   # 修改密码
   update mysql.user set authentication_string=password('123qwe') where user='root' and Host ='localhost';
   
   # 刷新权限
   flush privileges;
   ```

5. 删除 `my.ini` 中的免密登录配置 `skip-grant-tables`

6. 以管理员身份运行 cmd

   ```sh
   # 重启mysql
   net stop mysql
   net start mysql
   
   # 通过密码进入管理界面。还可以这样写：mysql -u root -p密码 [-h数据库服务器IP地址 -P端口号]
   mysql -u root -p
   
   # 查看mysql信息
   status
   
   #查看所有数据库
   show databases;
   
   # 退出。或者 quit
   exit
   ```



## 数据库工具

### SQLyog

[SQLyog 下载](https://pan.baidu.com/s/1HzyuR2LyiaqXVyhmGGrLSg?pwd=8mg1)



![image-20240615150446812](http://qiniu.huangyihui.cn/doc/202511262249769.png)



![image-20240615150517186](http://qiniu.huangyihui.cn/doc/202511262250425.png)



### DataGrip

JB全家桶的一部分。已内置在 IDEA 中。



## UTF8

* UTF-8 ：用来表示 Unicode 标准中的任何字符，支持最多四个字节
* MySQL 中的 UTF-8 ：MySQL 中的字符集，最多支持三个字节
* utf8mb4 ：英文占1个字节，大部分中文占3个字节，生僻汉字、emoji 等占4个字节

MySQL 推荐字符集：utf8mb4，排序规则 utf8mb4_general_ci



## 基础

语法：

* SQL 语句可以单行或多行书写，以分号结尾
* SQL 语句可以使用空格或缩进来增强语句的可读性
* MySQL 数据库的 SQL 语句不区分大小写
* 注释
  * 单行注释 `--`
  * 单行注释 `#` （MySQL 独有）
  * 多行注释 `/*  */`



```mysql
-- 单行注释
/*
	多行注释
*/

-- 查看所有的数据库
show databases;

-- 创建数据库 create database 数据库名
create database demo;

-- 切换数据库 user 数据库名
use demo;

-- 查看数据库中所有的表
show tables;

-- 查看表信息 describe 表名
describe user;
```



SQL 语句分为以下几种：

* DDL 数据定义语言，用来定义数据库对象（数据库、表、字段）
* DML 数据操作语言，用来对数据库表中的数据进行增删改
* DQL 数据查询语言，用来查询数据库中表的记录
* DCL 数据控制语言，用来创建数据库用户、控制数据库的访问权限



### 字段类型

| 类型         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| **tinyint**  | 十分小的数据，1个字节。有符号 `-128,127` ，无符号 `0, 255`   |
| smallint     | 较小的数据，2个字节。有符号 `-32768, 32767` ，无符号 `0, 65535` |
| mediumint    | 中等大小的数据，3个字节                                      |
| **int**      | 常用。标准的整数，4个字节。21亿多                            |
| **bigint**   | 较大的数据，8个字节                                          |
| float        | 浮点数，4个字节。`float(5,2)` 5表示整个数字长度，2 表示小数位个数 |
| double       | 浮点数，8个字节                                              |
| decimal      | 字符串形式的浮点数，常用于金额计算                           |
|              |                                                              |
| char         | 字符串固定大小的 0~255                                       |
| **varchar**  | 常用。可变字符串 0~65535                                     |
| tinytext     | 微型文本 2^8 - 1                                             |
| text         | 文本串 2^16 - 1，常用于保存大文本                            |
|              |                                                              |
| **date**     | 日期格式 YYYY-MM-DD。`1000-01-01 至 9999-12-31`              |
| time         | 时间格式 HH:mm:ss                                            |
| **datetime** | 常用。YYYY-MM-DD HH:mm:ss                                    |
| timestamp    | 常用。时间戳，1970.1.1 到现在的毫秒数                        |
| year         | 年份展示。`1901 至 2155`                                     |



### 字段属性

* `Unsigned` ：无符号的整数。声明了该列不能为负数。
* `zerofill` ：不足的位数，使用 0 来填充。例如 `int(3)  5 --- 005`
* 自增：自动在上一条记录的基础上 +1（默认）。通常用来设计唯一的主键，必须是整数类型。
  * 可以自定义设置主键自增的起始值和步长
* 非空 `not null` ：如果不给它赋值就会报错。
* 默认：设置默认的值。



### 数据表的类型

|              | MYISAM             | INNODB                                 |
| ------------ | ------------------ | -------------------------------------- |
| 事务支持     | 不支持             | 支持                                   |
| 数据行锁定   | 不支持             | 支持                                   |
| 外键索引     | 不支持             | 支持                                   |
| 全文索引     | 支持               | 不支持                                 |
| 表空间的大小 | 较小               | 较大，约为 2倍                         |
| 总结         | 节约空间，速度较快 | 安全性高，支持事务处理，多表多用户操作 |



### 数据库文件

所有的数据库文件都存在 data 目录下，本质上还是文件的存储。

* InnoDB 在数据库表中只有一个 `*.frm` 文件，以及上级目录下的 `ibdata1` 文件
* MYISAM 对应文件
  * `*.frm` ：表结构的定义文件
  * `*.MYD` ：数据文件
  * `*.MYI` ：索引文件



### 物理外键

使用 `foreign key` 定义外键关联另外一张表。

缺点：

* 影响增、删、改的效率（需要检查外键关系）
* 仅用于单节点数据库，不适用于分布式、集群场景
* 容易引发数据库的死锁问题，消耗性能



#### 创表时增加约束

删除有外键关系的表的时候，必须要先删除引用别人的表（从表），再删除被引用的表（主表）。

```mysql
CREATE TABLE IF NOT EXISTS `level` (
	`id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '等级id',
	`name` VARCHAR(10) NOT NULL COMMENT '等级名称',
	PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

CREATE TABLE IF NOT EXISTS `user` (
	`id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '用户id',
	`name` VARCHAR(10) NOT NULL COMMENT '姓名',
	`levelid` INT(10) COMMENT '等级id',
	PRIMARY KEY(`id`),
	KEY `FK_levelid` (`levelid`),
	CONSTRAINT `FK_levelid` FOREIGN KEY (`levelid`) REFERENCES `level`(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8
```



#### 创表成功后添加约束

```mysql
CREATE TABLE IF NOT EXISTS `level` (
	`id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '等级id',
	`name` VARCHAR(10) NOT NULL COMMENT '等级名称',
	PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

CREATE TABLE IF NOT EXISTS `user` (
	`id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '用户id',
	`name` VARCHAR(10) NOT NULL COMMENT '姓名',
	`levelid` INT(10) COMMENT '等级id',
	PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

-- ALTER TABLE 表名 ADD CONSTRAINT 约束名 FOREIGN KEY(作为外键的列) REFERENCES 哪个表(哪个字段)
ALTER TABLE `user` ADD CONSTRAINT `FK_levelid` FOREIGN KEY(`levelid`) REFERENCES `level`(`id`)
```

这些都是物理外键，数据库级别的外键，不建议使用。





### 语句

```mysql
SHOW CREATE DATABASE demo		-- 查看创建数据库的语句
SHOW CREATE TABLE student		-- 查看创建表的定义语句
DESC student	-- 显示表的结构

SHOW VARIABLES LIKE 'char%'	-- 查看系统配置变量
SHOW STATUS		-- 查看服务器运行状态

SELECT VERSION()	-- 查询系统版本
```



## DDL

### 操作数据库

```mysql
-- 创建数据库
CREATE DATABASE [IF NOT EXISTS] demo

-- 删除数据库
DROP DATABASE [IF EXISTS] demo

-- 使用数据库。表名或字段名可以用 `` 包起来
USE `demo`

-- 查看所有数据库
SHOW DATABASES

-- 查询当前数据库
select database()
```

上述语法中的 database，也可以替换成 schema，例如 `create schema study;`



### 操作表

```sql
-- 创建表格式
CREATE TABLE [IF NOT EXISTS] `表名` (
	`字段名` 字段类型 [约束] [注释],
  `字段名` 字段类型 [约束] [注释],
  ...
)[表类型] [字符集设置] [注释]
```



约束：是作用于表中字段上的规则，用于限制存储在表中的数据。目的是保证数据库中数据的正确性、有效性和完整性。

| 约束     | 描述                                             | 关键字        |
| -------- | ------------------------------------------------ | ------------- |
| 非空约束 | 限制该字段值不能为 null                          | `not null`    |
| 唯一约束 | 保证字段的所有数据都是唯一、不重复的             | `unique`      |
| 主键约束 | 主键是一行数据的唯一标识，要求非空且唯一         | `primary key` |
| 默认约束 | 保存数据时，如果未指定该字段值，则采用默认值     | `default`     |
| 外键约束 | 让两张表的数据建立连接，保证数据的一致性和完整性 | `foreign key` |



```mysql
-- AUTO_INCREMENT 自增
-- PRIMARY KEY 主键，一个表只有一个主键

CREATE TABLE IF NOT EXISTS `student` (
	`id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
	`pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT '密码',
	`sex` VARCHAR(2) NOT NULL DEFAULT '女' COMMENT '性别',
	`birthday` DATETIME DEFAULT NULL COMMENT '出生日期',
	`address` VARCHAR(100) DEFAULT NULL COMMENT '地址',
	`email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
	PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT '学生表'
```

```mysql
-- 查看当前数据库的所有表
show tables;

-- 查询表结构：desc 表名
desc `tb_user`;

-- 查询建表语句：show create table 表名
show create table tb_user;
```



### 修改、删除表

```mysql
-- 增加字段  ALTER TABLE 表名 ADD 字段名 字段类型 [约束] [注释]
ALTER TABLE student ADD phone VARCHAR(20)

-- 修改字段类型  ALTER TABLE 表名 MODIFY 字段名 新字段类型
ALTER TABLE	student MODIFY phone VARCHAR(11)

-- 修改字段名和字段类型  ALTER TABLE	表名 CHANGE 旧名字 新名字 字段类型 [约束] [注释]
ALTER TABLE	student CHANGE phone phone1 INT(11)

-- 删除字段  ALTER TABLE 表名 DROP 字段名
ALTER TABLE	student DROP phone1
alter table tb_user drop column tel

-- 修改表名  ALTER TABLE 旧表名 RENAME AS 新表名
ALTER TABLE student RENAME AS student1
rename table tb_score1 to tb_score2

-- 删除表 DROP TABLE [IF EXISTS] 表名
DROP TABLE [IF EXISTS] test
```



## DML

### 增删改语句

* 插入语句：`INSERT INTO 表名(字段1, 字段2...) VALUES(值1, 值2...)`
  * 如果不写字段名，值就会一一匹配所有的字段
  * 插入多条数据时，value 用逗号隔开
* 修改语句：`UPDATE 表名 SET 字段1=新值 [,字段2=新值...] WHERE 条件`
  * 不指定条件会修改所有的列
  * 修改多个字段，用逗号隔开
  * value 是一个具体的值，也可以是一个变量，例如 `CURRENT_TIME`
* 删除语句：`DELETE FROM 表名 WHERE 条件`
  * 如果不加条件，会删除所有数据。要避免这样写。
  * DELETE 语句不能删除某一个字段的值（如果要操作，可以使用 UPDATE，将该字段的值置为 NULL）
* `TRUNCATE` ：完全清空一个数据库表，表的结构和索引约束不会变。 `TRUNCATE 表名`

```mysql
-- 指定字段添加数据
INSERT INTO `student`(`name`,`pwd`,`sex`) VALUES('李四', '6666', '男')

-- 全部字段添加数据
INSERT INTO `student` VALUES('李四', '6666', '男')

-- 插入多条，value的括号用逗号隔开
INSERT INTO `level`(`name`) VALUES('黄金'),('白金'),('王者')
INSERT INTO `student` VALUES('李四', '6666', '男'),('张三', '888', '男')


-- 修改语句
UPDATE `student` SET `name`='张三丰' WHERE id = 1

-- 不指定条件会修改所有的列
UPDATE `student` SET `email`='123@qq.com'

-- 修改多个字段
UPDATE `student` SET `pwd`='abc123',`address`='广东' WHERE id = 1

-- value 值可以是一个变量
UPDATE `student` SET `birthday` = CURRENT_TIME WHERE id = 1

-- 多个条件
UPDATE `student` SET `pwd`='abc123456',`address`='广东' WHERE id = 1 AND sex='男'


-- 删除语句 DELETE FROM 表名 WHERE 条件
DELETE FROM `student` WHERE `id` = 4


-- 清空表 
TRUNCATE `teacher`
-- 或者
TRUNCATE TABLE `teacher`
```



delete 和 truncate 的区别：

* 相同点：都能删除数据，都不会删除表结构
* 不同点：
  * truncate 会重新设置自增列（计数器会归零）
  * truncate 不会影响事务
  * delete 自增列不归零问题：
    * InnoDB ：自增列存在内存中，断电即失，所以重启数据库后也会归零
    * MyISAM ：继续从上一个自增量开始（存在文件中，不会丢失）



## DQL

### 语法

```mysql
SELECT
		字段列表 
FROM
		表名列表 
WHERE
		条件列表 
GROUP BY
		分组字段列表 
HAVING
		分组后条件列表 
ORDER BY
		排序字段列表 
LIMIT
		分页参数
```



```mysql
SELECT [ALL | DISTINCT]
{* | table.* | [table.field1[as alias1][,table.field2[as alias2]][,...]]}
FROM table_name [as table_alias]
  [left | right | inner join table_name2] -- 联合查询
  [WHERE ...] -- 指定结果需满足的条件
  [GROUP BY ...] -- 指定结果按照哪几个字段来分组
  [HAVING] -- 过滤分组的记录必须满足的次要条件
  [ORDER BY ...] -- 指定查询记录按一个或多个条件排序s
  [LIMIT {[offset,]row_count | row_countOFFSET offset}];
  -- 指定查询的记录从哪条至哪条
```

**注意 : [ ] 括号代表可选的 , { }括号代表必选的**



select 语句中的执行顺序：

```sql
select 去重 要査询的字段 from 表 (注意:表和字段可以取别名)
  xxx join 要连接的表 on 等值判断
  where(具体的值，子查询语句)
  Group By (通过哪个字段来分组)
  Having(过滤分组后的信息，条件和 where是一样的，位置不同)
  Order By.(通过哪个字段排序)[升序/降序]
  limit startindex, pagesize
```





* 查询语句：可以执行任何表达式，表达式包含文本值、列名、Null、函数、计算表达式、系统变量等
  * 查询所有数据 `SELECT * FROM 表名`
  * 查询指定字段 `SELECT 字段1, 字段2 FROM 表名`
  * `AS` ：给结果起一个别名 `SELECT 字段名 AS 别名 FROM 表名`
  * `CONCAT()` ：连接字符串
  * distinct ：去重。去除 select 查询出来的结果中重复的数据，重复的数据只显示一条。 `SELECT DISTINCT 字段名 FROM 表名`



```mysql
-- 查询语句 SELECT * FROM 表名 WHERE 条件列表
SELECT * FROM `student`

-- 查询指定字段 SELECT 字段1, 字段2 FROM 表名
SELECT `id`,`name` FROM `student`

-- 给结果起一个别名 SELECT 字段名 AS 别名 FROM 表名
SELECT `id`,`name` AS 姓名 FROM `student`

-- 函数 CONCAT 连接字符串
SELECT CONCAT('姓名', `name`) AS 新姓名 FROM `student`

-- 去重 distinct
SELECT DISTINCT `name` FROM `student`

-- SELECT 语句可以执行任何表达式
SELECT VERSION()	-- 查询系统版本（函数）
SELECT 100*3-2 AS 计算结果	-- 用来计算（表达式）
SELECT @@auto_increment_increment	-- 查询自增的步长（自增）
SELECT `name`, `score`+1 AS 分数 FROM `student`
```



### where 条件

作用：检索数据中符合条件的值。搜索的条件由一个或多个表达式组成，结果返回布尔值。

操作符尽量使用英文字母。

| 操作符            | 含义                                                         | 范围             | 结果     |
| ----------------- | ------------------------------------------------------------ | ---------------- | -------- |
| `=`               | 等于                                                         | 5=6              | false    |
| `<> 或 !=`        | 不等于                                                       | 5<>6             | true     |
| `>、<、>=、<=`    |                                                              |                  |          |
| `BETWEEN ... AND` | 在某个范围内                                                 | BETWEEN 2 AND 4  | 2到4之间 |
| `AND 或 &&`       | 逻辑与                                                       | 5>1 AND 1>2      | false    |
| `OR` 或 `||`      | 逻辑或                                                       | OR 1>2           | true     |
| `NOT 或  !`       | 逻辑非                                                       | !false           | true     |
| `IS NULL`         | 如果字段值为null，则为真                                     | a IS NULL        |          |
| `IS NOT NULL`     | 如果字段值不为null，则为真                                   | a IS NOT NULL    |          |
| `LIKE % _`        | SQL 匹配，如果a匹配b，则为真。%代表0到任意个字符。_ 代表一个字符。 | a like b         |          |
| `IN`              | 如果a在某些值中，则为真                                      | a in (v1, v2...) |          |



```mysql
-- 单个条件
UPDATE `student` SET `name`='张三丰' WHERE id = 1

-- 多个条件
UPDATE `student` SET `pwd`='abc123456' WHERE id = 1 AND sex='男'

-- id 在2到4之间
UPDATE `student` SET `name`='老王' WHERE id BETWEEN 2 AND 4

-- id 不等于1
SELECT `id`, `name` FROM `student` WHERE NOT id = 1
-- 等同于
SELECT `id`, `name` FROM `student` WHERE id != 1
SELECT `id`, `name` FROM `student` WHERE id <> 1

-- IS NULL 字段值为null
SELECT * FROM `student` WHERE `address` IS NULL
-- IS NOT NULL 字段值不为null
SELECT * FROM `student` WHERE `address` IS NOT NULL

-- 查询姓张的同学
SELECT * FROM `student` WHERE `name` LIKE '张%'
-- 查询名字以张结尾的同学
SELECT * FROM `student` WHERE `name` LIKE '%张'
-- 查询姓张的同学，姓后面有且只有一个字
SELECT * FROM `student` WHERE `name` LIKE '张_'
-- 查询姓张的同学，姓后面有且只有两个字
SELECT * FROM `student` WHERE `name` LIKE '张__'
-- 查询名字中有张的同学
SELECT * FROM `student` WHERE `name` LIKE '%张%'

-- 查询id为5,6的同学
SELECT * FROM `student` WHERE `id` IN (5,6)
```



### 多表查询

多表查询：指从多张表中查询数据。

笛卡尔积：笛卡尔乘积是指在数学中，两个集合的所有组合情况。在多表查询时，需要消除无效的笛卡尔积（通过 where 或者 on 条件过滤）



强制：超过三个表禁止 join。需要 join 的字段，数据类型必须绝对一致；多表关联查询时，保证被关联的字段需要有索引。

注意：即使双表 join 也要注意表索引、SQL 性能。



连接查询：

* 内连接：相当于查询 A、B 交集部分数据
* 外连接
  * 左外连接：查询左表所有数据（包括两张表交集部分数据）
  * 右外连接：查询右表所有数据（包括两张表交集部分数据）
* 子查询



#### 连接查询

[MySQL：七种 SQL JOINS 的实现](https://blog.csdn.net/weixin_52533007/article/details/131240219)

| 操作                 | 描述                                                       |
| -------------------- | ---------------------------------------------------------- |
| inner join           | 内连接。如果表中至少有一个匹配，就返回行                   |
| left join            | 左连接。会从左表中返回所有的值，即使右表中没有匹配         |
| right join           | 右连接。会从右表中返回所有的值，即使左表中没有匹配         |
| left join ... where  | 左排除连接。左排除连接返回左表中没有在右表中找到匹配的行。 |
| right join ... where | 右排除连接。右排除连接返回右表中没有在左表中找到匹配的行。 |

自连接：自己的表和自己的表连接。核心：**一张表拆为两张一样的表即可。**



步骤：

* 分析需求，分析查询的字段来自哪些表
* 确定使用哪种连接查询（有7种）
* 确定交叉点（这两个表中哪个数据是相同的）



```mysql
-- 隐式内连接
select * from tb_shop, tb_shop_type where tb_shop.type_id = tb_shop_type.id

-- 显式内连接
SELECT s.`studentNo`, `name`, `score`
FROM `student` AS s 
INNER JOIN `result` AS r 
ON s.studentNo = r.studentNo

-- 右连接
SELECT s.`studentNo`, `name`, `score`
FROM `student` s 
RIGHT JOIN `result` r 
ON s.studentNo = r.studentNo

-- 左连接
SELECT s.`studentNo`, `name`, `score`
FROM `student` s 
LEFT JOIN `result` r 
ON s.studentNo = r.studentNo

-- 左排除连接，排除就是 WHERE 右表字段 IS NULL
SELECT s.`studentNo`, `name`, `score`
FROM `student` s 
LEFT JOIN `result` r 
ON s.studentNo = r.studentNo
WHERE score IS NULL

-- 多表查询：先查询两张表然后再慢慢增加
SELECT s.`studentNo`, `name`, `score`, `subjectName`
FROM `student` s 
RIGHT JOIN `result` r 
ON s.studentNo = r.studentNo
INNER JOIN `subject` sub
ON r.subjectNo = sub.subjectNo
WHERE score >= 60
```







#### 子查询

SQL 语句中嵌套 select 语句，称为嵌套查询，又称子查询。子查询是由里及外查询的。

子查询外部的语句可以是 insert / update / delete / select 的任何一个，最常见的是 select。



分类：

* 标量子查询：子查询返回的结果为单个值（数字、字符串、日期等）
  * 常见的操作符：`= <> > >= < <=`
* 列子查询：子查询返回的结果为一列
  * 常见的操作符：`in、not in`
* 行子查询：子查询返回的结果为一行
  * 常见的操作符：`=、<>、in、not in`
* 表子查询：子查询返回的结果为多行多列，常作为临时表
  * 常见的操作符：`in`



```mysql
-- 查询科目为数字的分数信息
SELECT * FROM `result` WHERE `subjectNo` = (
	SELECT `subjectNo` FROM `subject` WHERE `subjectName` = '数学'
)

-- 查询科目为数学，并且姓张的同学
SELECT * FROM `student` WHERE `name` LIKE '张%'  AND `studentNo` IN  (
	SELECT `studentNo` FROM `result` WHERE `subjectNo` = (
		SELECT `subjectNo` FROM `subject` WHERE `subjectName` = '数学'
	)
)
```







### 排序

* `order by` ：排序，默认是升序。`ORDER BY 通过哪个字段排序 [升序还是降序]`
  * 升序 ASC，降序 DESC
  * 如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序

```mysql
SELECT * FROM `result` ORDER BY `score` DESC

SELECT s.`studentNo`, `name`, `score`, `subjectName`
FROM `student` s 
RIGHT JOIN `result` r 
ON s.studentNo = r.studentNo
INNER JOIN `subject` sub
ON r.subjectNo = sub.subjectNo
ORDER BY score ASC
```



### 分页

* `LIMIT` ：分页。`LIMIT 起始值, 每页数量`
  * 起始索引从0开始。起始索引 = (查询页码 - 1) * 每页显示记录数
  * 如果查询的是第一页数据，起始索引可以省略，直接简写为 `limit 10`
  * 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL 中是 limit



```mysql
-- limit 0,5   	第1~5条数据  		第1页：(1-1) * 5
-- limit 1,5   	第2~6条数据
-- limit 5,5   	第6~10条数据		第2页：(2-1) * 5
-- limit 10,5   第11~15条数据		第3页：(3-1) * 5
-- 第N页：(currentPage-1) * pageSize, pageSize

SELECT * FROM `result` LIMIT 0,5

SELECT s.`studentNo`, `name`, `score`, `subjectName`
FROM `student` s 
RIGHT JOIN `result` r 
ON s.studentNo = r.studentNo
INNER JOIN `subject` sub
ON r.subjectNo = sub.subjectNo
ORDER BY score DESC
LIMIT 0,2
```



### 分组和过滤

分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无意义。

执行顺序为：where → 聚合函数 → having

* `GROUP BY` ：分组。核心是确定根据什么字段来分组
* `HAVING` ：过滤。



where 和 having 区别：

* 执行时机不同：where 是分组之前进行过滤，不满足 where 条件，不参与分组；而 having 是分组之后对结果进行过滤
* 判断条件不同：where 不能对聚合函数进行判断，而 having 可以



```mysql
-- select 字段列表 from 表名 [where 条件] group by 分组字段名 [having 分组后过滤条件]

-- 查询不同课程的平均分
SELECT `subjectName`, AVG(`score`) AS 平均分
FROM `result` r
INNER JOIN `subject` sub
ON r.subjectNo = sub.subjectNo
GROUP BY r.subjectNo		-- 根据课程id来分组


SELECT `subjectName`, AVG(`score`) AS 平均分
FROM `result` r
INNER JOIN `subject` sub
ON r.subjectNo = sub.subjectNo
GROUP BY r.subjectNo
HAVING 平均分>=80	-- 过滤保留平均分大于等于80的数据


select if(gender=1, '男', '女') 性别, count(*) from tb_emp group by gender;
```



### 表达式

* `if(条件表达式, true取值, false取值)`
* `case 表达式 when 值1 then 结果1 when 值2 then 结果2  ... [else 结果] ... end`



```mysql
select if(gender=1, '男', '女') 性别, count(*) from tb_emp group by gender;


select
		case job when 1 then '班主任' when 2 then '讲师' else '未知' end,
		count(*)
from tb_emp group by job;
```





## 函数

### 常用函数

```mysql
-- 数学运算
SELECT ABS(-2)					-- 绝对值
SELECT CEILING(9.4)			-- 向上取整
SELECT FLOOR(9.4)				-- 向下取整
SELECT RAND()						-- 返回一个 0~1 之间的随机数
SELECT SIGN(10)					-- 判断一个数的符号，负数返回-1，正数返回1
SELECT SIGN(10-20)


-- 字符串函数
SELECT CHAR_LENGTH('hello')						-- 返回字符串长度
SELECT CONCAT('a', 'b', 'c')					-- 拼接字符串
SELECT INSERT('hello', 2, 1, 'abc')		-- 从某个位置开始替换某个长度
SELECT LOWER('aBc')										-- 小写字母
SELECT UPPER('aBc')										-- 大写字母
SELECT INSTR('hello', 'e')						-- 返回第一次出现的子串的索引，从1开始
SELECT REPLACE('hello', 'll', 'gg')		-- 全部替换出现的指定字符串
SELECT SUBSTR('hello', 2)							-- 返回指定的字符串 (源字符串，截取的位置，截取的长度)
SELECT SUBSTR('hello', 2, 2)
SELECT REVERSE('abcd')								-- 反转
-- 将姓张的同学名字中的张改成章
SELECT REPLACE(`name`, '张', '章') FROM `student` WHERE `name` LIKE '张%'


-- 时间和日期函数
SELECT CURRENT_DATE()		-- 获取当前日期 年月日
SELECT CURDATE()				-- 获取当前日期 年月日
SELECT NOW()						-- 获取当前的时间 年月日时分秒
SELECT LOCALTIME()			-- 本地时间 年月日时分秒
SELECT SYSDATE()				-- 系统时间 年月日时分秒

-- 分别获取当前时间的 年 月 日 时 分 秒
SELECT YEAR(NOW())
SELECT MONTH(NOW())
SELECT DAY(NOW())
SELECT HOUR(NOW())
SELECT MINUTE(NOW())
SELECT SECOND(NOW())


-- 系统
SELECT SYSTEM_USER()	-- 获取当前 MySQL 会话的 MySQL 用户名和主机名 root@localhost
SELECT USER()					-- 同上
SELECT VERSION()			-- 返回当前 MySQL 服务器的版本信息 5.7.44

-- MD5() md5 加密
UPDATE `student` SET `md5`=MD5('123') WHERE `id` = 9
UPDATE `student` SET `md5`=MD5(`md5`)
SELECT * FROM `student` WHERE `md5`=MD5('111')
```



### 聚合函数

将一列数据作为一个整体，进行纵向计算，常用于统计表中的数据。

| 函数名称 | 描述   |
| -------- | ------ |
| COUNT()  | 计数   |
| SUM()    | 求和   |
| AVG()    | 平均值 |
| MAX()    | 最大值 |
| MIN()    | 最小值 |
| ...      |        |

注意：

* null 值不参与所有聚合函数运算
* 统计数量可以使用 `count(*)` 、`count(字段)` 、`count(常量)` 。推荐用 `count(*)`



```mysql
-- select 聚合函数(字段列表) from 表名
SELECT COUNT(`address`) FROM `student`	-- COUNT(字段) 会忽略所有的null值
SELECT COUNT(*) FROM `student`					-- COUNT(*) 推荐。不会忽略null值，本质是计算行数
SELECT COUNT(1) FROM `student`					-- COUNT(1) 不会忽略null值，本质是计算行数

SELECT SUM(`score`) FROM `result`
SELECT AVG(`score`) FROM `result`
SELECT MAX(`score`) FROM `result`
SELECT MIN(`score`) FROM `result`
```



不同 `COUNT()` 的执行效率：

* 列名为主键， count(列名) 会比 count(1) 快
* 列名不为主键，  count(1) 会比 count(列名) 快
* 如果表有多个列，并且没有主键，则 count(1) 的执行效率优于 count(*)
* 如果有主键，则 count(主键) 的执行效率最优
* 如果表只有一个字段，则 count(*) 最优





## 事务 transaction

事务是一组操作的集合，它是一个不可分割的工作单位。事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

默认 MySQL 的事务是自动提交的，也就是说，当执行一条 DML 语句，MySQL 会立即隐式的提交事务。



事务原则（ACID）：

* 原子性（atomicity）：要么都成功，要么都失败。
* 一致性（consistency）：事务前后的数据完整性要保证一致
* 隔离性（isolation）：多个用户并发访问数据库时，数据库为每一个用户开启事务，不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离
* 持久性（durability）：事务一旦提交就不可逆，被持久化到数据库中



```mysql
-- mysql 是默认开启事务自动提交的
SET autocommit = 0	-- 关闭
SET autocommit = 1	-- 开启(默认)
SHOW VARIABLES LIKE 'autocommit'	-- 查看mysql是否自动提交

-- 手动处理事务步骤
SET autocommit = 0	-- 关闭自动提交

START TRANSACTION		-- 标记一个事务的开始，从这个之后的sql都在同一个事务内

-- 事务具体操作sql
-- ...

COMMIT			-- 提交：持久化(成功)。如果事务中的sql没报错，就可以执行 commit

ROLLBACK		-- 回滚：回到原来的样子(失败)。如果事务中的sql报错了，就可以执行 rollback

SET autocommit = 1		-- 开启自动提交


-- 保存点操作
SAVEPOINT 保存点名			-- 设置一个事务的保存点

ROLLBACK TO 保存点名		-- 回滚到指定的保存点

RELEASE SAVEPOINT 保存点名	-- 撤销保存点
```



## 索引

索引是帮助 MySQL 高效获取数据的数据结构。MySQL 数据库中默认的索引结构是 B+tree。

索引在小数据量的时候，用处不大，但是在大数据的时候，区分十分明显。



优点：

* 提高数据查询的效率，降低数据库的 IO 成本
* 通过索引列对数据进行排序，降低数据排序的成本，降低 CPU 消耗

缺点：

* 索引会占用存储空间
* 索引大大提高了查询效率，同时却也降低了 insert、update、delete 的效率



索引分类：

* 主键索引（PRIMARY KEY）
  * 唯一的标识，主键不可重复，只能有一个列作为主键
* 唯一索引（UNIQUE KEY）
  * 用于避免重复列的出现。唯一索引可以重复，多个列都可以标识为唯一索引
* 常规索引（KEY / INDEX）
  * 默认的。index，key 关键字来设置
* 全文索引（FULLTEXT）
  * 在特定的数据库引擎下才有(MyISAM)。用于快速定位数据

**在一个表中，主键索引只能有一个，唯一索引可以有多个。**



索引原则：

* 索引不是越多越好
* 不要对经常的变动数据加索引
* 小数据量的表不需要加索引
* 索引一般加在常用来查询的字段上



索引的添加方式：

1. 在创建表的时候给字段添加索引
2. 创建完成后，增加索引

```mysql
-- 建表时添加索引
CREATE TABLE IF NOT EXISTS `student` (
	`id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
	`name` VARCHAR(30) NOT NULL COMMENT '姓名',
	PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

-- 增加一个全文索引  ALTER TABLE 表名 ADD FULLTEXT INDEX 索引名(列名)
ALTER TABLE `book` ADD FULLTEXT INDEX `keyname`(`name`)

-- 增加常规索引		CREATE [UNIQUE] INDEX 索引名 ON 表名(字段名)
-- 索引名常用格式： id_表名_字段名
CREATE INDEX id_book_name ON `book`(`name`)

-- 显示表的所有索引信息
SHOW INDEX FROM `book`

-- 删除索引
-- drop index 索引名 on 表名;
drop index idx_book on book;

-- explain 分析sql执行的状况
EXPLAIN SELECT * FROM `book`
EXPLAIN SELECT * FROM `book` WHERE MATCH(`name`) AGAINST('张')
```



```mysql
-- 批量插入10w条数据
-- 创建一个表来存储随机数据
CREATE TABLE random_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    grade VARCHAR(5)
);

-- 使用INSERT INTO ... SELECT语句插入100,000条随机数据
INSERT INTO random_data (name, age, grade)
SELECT
    CONCAT('Student', FLOOR(RAND() * 100000) + 1) AS name,
    FLOOR(RAND() * 18) + 13 AS age,
    CONCAT(FLOOR(RAND() * 3) + 7, 'th') AS grade
FROM
    information_schema.tables t1,
    information_schema.tables t2;

-- 查看插入的数据
SELECT * FROM random_data LIMIT 10;  -- 仅显示前10条数据作为示例
```



## 用户管理

```mysql
-- 创建用户		CREATE USER 用户名 IDENTIFIED BY 密码
CREATE USER hlw IDENTIFIED BY '123'

-- 修改当前用户密码
SET PASSWORD = PASSWORD('123abc')

-- 修改指定用户密码
SET PASSWORD FOR hlw = PASSWORD('8888')

-- 重命名 	RENAME USER 原来的名字 TO 新名字
RENAME USER hlw TO hlw2

-- 用户授权 	GRANT ALL PRIVILEGES ON *.* TO 用户名
-- *.* 代表库.表
GRANT ALL PRIVILEGES ON *.* TO 

-- 撤销权限
REVOKE ALL PRIVILEGES ON *.* FROM hlw

-- 查看用户的权限
SHOW GRANTS
-- 查看指定用户的权限
SHOW GRANTS FOR hlw
SHOW GRANTS FOR root@localhost

-- 删除用户
DROP USER hlw
```





## 备份

在命令行中使用 `mysqldump` 导出。

```sh
# mysqldump -h 主机 -u 用户名 -p 数据库 [表名] >物理磁场位置/文件名
mysqldump -hlocalhost -uroot -p demo student >d:/student.sql

# 导出整个 student 数据库
mysqldump -hlocalhost -uroot -p demo student >d:/student.sql
mysqldump -uroot -p demo student >d:/student.sql
```



导入：在登录的情况下，需要切换到指定的数据库。

```mysql
-- source 备份的文件路径
source d:/student.sql
```





















## 设计表

每个表都必须存在以下字段：

| 字段       | 描述     |
| ---------- | -------- |
| id         | 主键     |
| version    | 乐观锁   |
| is_delete  | 伪删除   |
| gmt_create | 创建时间 |
| gmt_update | 修改时间 |



**三大范式：**

* 第一范式（1NF）
  * 保证每一列不可再分
  * 例如：家庭信息列存放了人口数量和户籍，就需要拆分为人口数列和户籍列
* 第二范式（2NF）
  * 前提：满足第一范式
  * 每张表只描述一件事情
* 第三范式（3NF）
  * 前提：满足第一范式和第二范式
  * 需要确保数据表中的每一列数据都和主键直接相关，而不能间接相关。





多表设计：

* 一对多（多对一）：在数据库表中多的一方添加字段，来关联一的一方的主键
* 多对多：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键
* 一对一：多用于单表拆分，将一张表的基础字段放在一张表中，其他字段放在另一张表中，以提升操作效率。在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的（unique）



## 技巧

### 多层级分类设计

```
// 查询分类为1的所有食物
select * from food where index_link like "1-%";

// 查询分类为1且级别为1所有食物
select * from food where index_link like "1-%" and level = 1;
```



字段：

* id
* name
* parent_id
* index_link
* level

例如：

| id   | name | parent_id | index_link | level |
| ---- | ---- | --------- | ---------- | ----- |
| 1    | 食物 | 0         | 1-0        | 0     |
| 2    | 中餐 | 1         | 1-2        | 1     |
| 3    | 西餐 | 1         | 1-3        | 1     |
| 4    | 川菜 | 2         | 1-2-4      | 2     |



### 数据更新时更新修改时间

```mysql
create table `person` {
	...
	`update_tiem` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
}
```

或者 mybatis-plus 的注解

```java
public class Person {

	// INSERT_UPDATE 表示新增和更新时都触发
	@TableField(fill = FieldFill.INSERT_UPDATE)
	private String updateBy;

}
```







## TODO 优化



















