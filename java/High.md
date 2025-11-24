# 进阶

SSM：

* Spring MVC
* Spring framework
* Mybatis



消息队列：kafka、RabbitMQ、RockeetMQ

缓存：Redis

搜索引擎：ES

集群分布式



**约定大于配置**：也称为按约定编码，是软件框架使用的一种软件设计范式。

当该工具实现的约定与所需的行为匹配时，它会按预期运行，而无须编写配置文件。只有当期望的行为偏离实现的约定时才需要显式配置。比如：Spring。



## Maven

[Maven](https://maven.apache.org/) 是专门用于管理和构建 Java 项目的工具，它基于项目对象模型（POM poject object model）的概念，通过一小段描述信息来管理项目的构建。它的主要功能有：

* 提供了一套标准化的项目结构：所有 IDE 使用 Maven 构建的项目结构完全一样，所有 IDE 创建的 Maven 项目可以通用
* 提供了一套标准化的构建流程（编译、测试、打包、发布...）
* 提供了一套依赖管理机制：使用标准的坐标配置来管理各种依赖，只需要简单的配置就可以完成依赖管理



目录结构：

```
maven-project							项目名称
	|-- src									源代码和测试代码目录
		|-- main							源代码目录
			|-- java						源代码 Java 文件目录
			|-- resources				源代码配置文件目录
			|-- webapp					Web 项目核心目录
		|-- test							测试代码目录
			|-- java						测试代码 Java 文件目录
			|-- resources				测试代码配置文件目录
  |-- pom.xml						项目核心配置文件
```



仓库：用于存储资源，管理各种 jar 包。

* 本地仓库：自己计算机上的一个目录
* 中央仓库：由 Maven 团队维护的全球唯一的仓库。[仓库地址](https://repo1.maven.org/maven2/)
* 远程仓库(私服)：一般是由公司团队搭建的私有仓库



### 安装与配置

前提：需要安装 Java 开发工具包 （JDK）。要么将 `JAVA_HOME` 环境变量设置为 JDK 安装路径，或者将 `java` 可执行文件放在 `PATH` 上。



1. [下载](https://maven.apache.org/download.cgi)解压 `apache-maven-3.8.8-bin.zip` 即安装完成

2. 在环境变量 `PATH` 中添加安装路径的 bin 目录，cmd 检验是否配置成功 `mvn -v`

3. 配置本地仓库：修改 `conf/settings.xml` 中的 `<localRepository>` 为一个指定目录，例如

   ```xml
   <localRepository>D:\java\apache-maven-3.8.8\mvn_resp</localRepository>
   ```

4. 配置阿里云私服：修改 `conf/settings.xml` 中的 `<mirrors>` 标签，为其添加如下子标签

   ```xml
   <mirror>
     <id>alimaven</id>
     <name>aliyun maven</name>
     <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
     <mirrorOf>central</mirrorOf>
   </mirror>
   ```



### IDEA 配置

* 配置 Maven 环境：打开 File → New Projects Setup → Settings for New Project ，搜索 Maven，设置路径信息、Settings 文件路径、本地仓库路径。
* 配置 Maven-helper 插件：打开设置，选择 Plugins，搜索并安装 Maven-helper，重启 IDEA。
* 配置使用坐标自动导入 ja r包：打开设置，选择 Build Tools，选择 Any changes，点击 ok 即可生效。
* 验证依赖是否下载成功：选择右侧 Maven 面板，展开 Dependencies 后查看列表中是否有需要的依赖
* 下载依赖过程中如果报错，需要检查 IDEA 中的有关 jdk 版本选择是否正确。
* 导入 Maven 项目：选择右侧 Maven 面板，点击 + 号，选中对应项目的 pom.xml 文件，双击即可。



不能使用 Java8 创建 Spring Boot 项目？创建时将 Server URL 改成 `https://start.aliyun.com` 即可。



### 生命周期(命令)

Maven 构建项目生命周期描述的是一次构建过程经历了多少个事件。Maven 对项目构建的生命周期划分为3套：

* `clean` ：删除目标目录中的编译输出文件。这通常是在构建之前执行的，以确保项目从一个干净的状态开始。
* default ：核心工作，例如编译、测试、打包、安装等
  * `validate` ：验证项目的正确性，例如检查项目的版本是否正确。
  * `compile` ：编译项目的源代码
  * `test` ：运行项目的单元测试
  * `package` ：将编译后的代码打包成可分发的格式，例如 jar 、war 等
  * `verify` ：对项目进行额外的检查以确保质量
  * `install` ：将项目的构建结果安装到本地 Maven 仓库中，以供其他项目使用
  * `deploy` ：将项目的构建结果复制到远程仓库，以供其他开发人员或团队使用
* `site` ：生成项目文档和站点信息

同一套生命周期内，执行后边的命令，前边的命令会自动执行。



执行命令：

* 方式1：通过 IDEA 的 Maven 面板，双击执行命令
* 方式2：在 cmd 中进入项目目录下，使用 `mvn 命令` 执行。例如 `mvn clean`



### 依赖和坐标

Maven 中的坐标是**资源的唯一标识**，使用坐标来定义项目或引入项目中需要的依赖。

坐标的主要组成：

* groupId ：定义当前 Maven 项目隶属组织名称，通常是域名反写
* artifactId ：定义当前 Maven 项目名称，通常是模块名称
* version ：定义当前项目版本号
* scope ：默认值 compile，定义依赖的作用范围，可以设置对应 jar 包的作用范围：编译环境、测试环境、运行环境



使用坐标导入 jar 包后，需要点击刷新按钮，使坐标生效。

如果引入的依赖，在本地仓库不存在，将会连接远程仓库/中央仓库，然后下载依赖。



依赖具有传递性：

* 直接依赖：在当前项目中通过依赖配置建立的依赖关系
* 间接依赖：被依赖的资源如果依赖其他资源，当前项目间接依赖其他资源

在 IDEA 中右键选择 Diagrams → Show Dependencies 可以查看项目依赖关系图。

排除依赖指主动断开依赖的资源，被排除的资源无需指定版本。



```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0-SNAPSHOT</version>
  <name>my-app</name>
  <url>http://www.example.com</url>
  
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.release>17</maven.compiler.release>
  </properties>
  
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.junit</groupId>
        <artifactId>junit-bom</artifactId>
        <version>5.11.0</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
  
  <!-- 使用坐标导入jar包 -->
  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.11.0</version>
      <type>pom</type>
      <scope>test</scope>
      <!-- exclusions 排除依赖 -->
      <exclusions>
          <exclusion>
              <groupId>junit</groupId>
              <artifactId>junit</artifactId>
          </exclusion>
      </exclusions>      
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-params</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
  
  <build>
    <pluginManagement>
       
    </pluginManagement>
  </build>
</project>
```







| 依赖的作用范围 | 编译环境 | 测试环境 | 运行环境 | 例子                      |
| -------------- | -------- | -------- | -------- | ------------------------- |
| compile        | Y        | Y        | Y        | logback                   |
| test           | -        | Y        | -        | junit                     |
| provided       | Y        | Y        | -        | servlet-api               |
| runtime        | -        | Y        | Y        | jdbc驱动                  |
| system         | Y        | Y        | -        | 存储在本地的jar包         |
| import         |          |          |          | 引入 DependencyManagement |



### 常用依赖

[mvnrepository 仓库](https://mvnrepository.com/)



* dom4j ：适用于 Java 的灵活 XML 框架

  ```xml
  <dependency>
      <groupId>org.dom4j</groupId>
      <artifactId>dom4j</artifactId>
      <version>2.1.3</version>
  </dependency>
  ```






### 分模块和继承

将项目按照功能拆分成若干个子模块，方便项目的管理维护、扩展，也方便模块间的相互调用，资源共享。比如：通用组件、商品模块、订单模块、用户模块等。

注意：分模块开发需要先针对模块功能进行设计，再进行编码。



继承：子工程可以继承父工程中的配置信息，常见于依赖关系的继承。同时可以简化依赖配置，统一管理依赖。

* parent：父工程。设置打包方式为 `pom`。默认 `jar`
  * utils
  * user
  * order





* jar ：普通模块打包，springboot 项目基本都是 jar 包（内嵌 tomcat 运行）
* war ：普通 web 程序打包，需要部署在外部的 tomcat 服务器运行
* pom ：父工程或聚合工程，该模块不写代码，仅进行依赖管理



分模块步骤：

1. 创建 maven 模块 framework，该工程为父工程，设置打包方式 pom

   ```xml
   <parent>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter</artifactId>
       <version>2.6.13</version>
       <relativePath />
   </parent>
   
   <modelVersion>4.0.0</modelVersion>
   <groupId>cn.hyh</groupId>
   <artifactId>framework</artifactId>
   <version>0.0.1-SNAPSHOT</version>
   <!--  打包方式 pom。该模块不写代码，仅进行依赖管理  -->
   <packaging>pom</packaging>
   
   <!--  共有的依赖（子工程会自动继承父工程的依赖）  -->
   <!--  如果父子工程都配置了同一个依赖的不同版本，以子工程的为准  -->
   <dependencies>
       <dependency>
           <groupId>org.projectlombok</groupId>
           <artifactId>lombok</artifactId>
           <version>1.18.24</version>
       </dependency>
   </dependencies>
   ```

   

2. 在子工程的 `pom.xml` 文件中，配置继承关系

   ```xml
   <modelVersion>4.0.0</modelVersion>
   <groupId>cn.hyh</groupId>
   <artifactId>mall</artifactId>
   <version>0.0.1-SNAPSHOT</version>
   <name>mall</name>
   <description>mall</description>
   
   <parent>
       <groupId>cn.hyh</groupId>
       <artifactId>framework</artifactId>
       <version>0.0.1-SNAPSHOT</version>
       <relativePath>../framework/pom.xml</relativePath>
   </parent>
   ```

   在子工程中，配置了继承关系后，坐标中的 groudId 是可以省略的，因为会自动继承父工程的。

   relativePath 指定父工程的 pom 文件的相对位置，如果不指定，将从本地仓库/远程仓库查找该工程。

   

### 版本锁定

可以在父工程的 pom 文件中通过 `<dependencyManagement>` 来统一管理依赖版本（不会引入依赖）。

子工程引入依赖时，无需指定 `<version>` 版本号，父工程统一管理，变更依赖版本，只需在父工程中统一变更。



`<dependencyManagement>` 是统一管理依赖版本，不会直接依赖，还需要在子工程中引入所需依赖。

` <dependencies>` 是直接依赖，在父工程配置了依赖，子工程会直接继承下来。



父工程：

```xml
<!--  自定义属性  -->
<properties>
    <java.version>1.8</java.version>
    <lombok.version>1.18.24</lombok.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.dom4j</groupId>
            <artifactId>dom4j</artifactId>
            <version>2.1.3</version>
        </dependency>

        <!--  引入属性  -->
     		<dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```



子工程：

```xml
<dependencies>
    <dependency>
        <groupId>org.dom4j</groupId>
        <artifactId>dom4j</artifactId>
    </dependency>
</dependencies>
```



### 聚合工程

聚合工程：一个不具有业务功能的 “空” 工程（有且仅有一个 pom 文件）。它用于快速构建项目（无需根据依赖关系手动构建，直接在聚合工程上构建即可）。



maven 中可以通过 `<modules>` 设置当前聚合工程所包含的子模块名称。

聚合工程中所包含的模块，在构建时，会自动根据模块间的依赖关系设置构建顺序，与聚合工程中模块的配置书写位置无关。

```xml
<modules>
    <module>../mall</module>
    <module>../core-generator</module>
</modules>
```



### 继承与聚合区别

* 作用
  * 聚合用于快速构建项目
  * 继承用于简化依赖配置，统一管理依赖
* 相同点
  * 聚合与继承的 `pom.xml` 文件打包方式均为 pom，可以将两种关系制作到同一个 pom 文件中
  * 聚合与继承均属于设计型模块，并无实际的模块内容
* 不同点
  * 聚合是在聚合工程中配置关系，聚合可以感知到参与聚合的模块有哪些
  * 继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己



### 私服

私服是一种特殊的远程仓库，它是架设在局域网内的仓库服务，用来代理位于外部的中央仓库，用于解决团队内部的资源共享与资源同步问题。

私服在企业项目开发中，一个项目 / 公司，只需要一台即可。

依赖查找顺序：本地仓库 → 私服 → 中央仓库



![私服资源上传和下载.drawio](http://qiniu.huangyihui.cn/doc/202511250131172.png)



项目版本：

* release（发行版本）：功能趋于稳定、当前更新停止，可以用于发行的版本，存储在私服中的 release 仓库中
* snapshot（快照版本）：功能不稳定、尚处于开发中的版本，即快照版本，存储在私服中的 snapshot 仓库中



Nexus 是 [Sonatype](https://help.sonatype.com/index.html?lang=en) 公司的一款 maven 私服产品。

* [下载地址](https://help.sonatype.com/en/download.html)
* [安装文档](https://blog.csdn.net/Wuweihendidiao/article/details/141157243)

下载解压后，在 bin 目录下，执行 sh 命令：`nexus.exe /run` 。出现 `Started Sonatype Nexus` 表示已运行。



1. 修改 maven 配置文件（maven 安装目录下的 `conf/setting.xml` 文件）

   ```xml
   <!-- 设置私服的访问用户名/密码 -->
   <servers>
     <server>
       <id>maven-releases</id>
       <username>admin</username>
       <password>admin</password>
     </server>
     <server>
       <id>maven-snapshots</id>
       <username>admin</username>
       <password>admin</password>
     </server>
   </servers>
   
   <!-- 设置私服依赖下载的仓库组地址 -->
   <mirrors>
     <mirror>
       <id>maven-public</id>
       <mirrorOf>*</mirrorOf>
       <url>http://192.168.101.34:8081/repository/maven-public/</url>
     </mirror>
   </mirrors>
   
   <!-- 设置私服依赖下载的仓库组地址 -->
   <profiles>
     <profile>
       <id>allow-snapshots</id>
       <activation>
         <activeByDefalut>true</activeByDefalut>
       </activation>
       <repositories>
         <repository>
           <id>maven-public</id>
           <url>http://192.168.101.34:8081/repository/maven-public/</url>
           <release>
             <enabled>true</enabled>
           </release>
           <snapshots>
             <enabled>true</enabled>
           </snapshots>
         </repository>
       </repositories>
     </profile>
   </profiles>
   ```

   

2. IDEA 的 maven 工程的 `pom.xml` 中配置上传（发布）地址

   ```xml
   <distributionManagement>
       <repository>
           <id>maven-releases</id>
           <url>http://192.168.101.34:8081/repository/maven-releases/</url>
       </repository>
       <snapshotRepository>
           <id>maven-snapshots</id>
           <url>http://192.168.101.34:8081/repository/maven-snapshots/</url>
       </snapshotRepository>
   </distributionManagement>
   ```

   

3. 工程执行 maven 命令：install → deploy，就可以根据项目的版本上传项目到私服的对应存储目录下。



### TODO 文档补全

链接：https://maven.apache.org/guides/getting-started/index.html



## MyBatis

[MyBatis](https://mybatis.org/mybatis-3/) 是一款优秀的持久层（负责将数据保存到数据库）框架，用于简化 JDBC 的开发。

[MyBatis 中文网](http://www.mybatis.cn/archives/1.html)



1. 引入 MyBatis 的相关依赖，配置 MyBatis （数据库连接信息）
2. 编写 SQL 语句（注解/XML）



```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/demo
    username: root
    password: 123456
```

```java
@Component
@Mapper // 在运行时，会自动生成该接口的实现类对象（代理对象），并且将该对象交给 IOC 容器管理
public interface UserMapper {

    @Select("select * from user")
    public List<User> pageUser();
}
```

默认在 mybatis 中编写 SQL 语句是不识别的，可以做如下配置：选择输入的 sql 语句，右键后选择 show context actions → inject language or reference → MySQL 即可。如果想自动识别表名，需要在 IDEA 中连接 mysql 数据库。



打开 mybatis 的日志，并输出到控制台：

```yaml
mybatis:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

这样可以看到 sql 的执行语句和参数。





### 数据库连接池

数据库连接池是一个容器，负责分配、管理数据库连接。它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个。自动释放空闲时间超过最大空闲时间的连接，来避免因为没有释放连接而引起的数据库连接遗漏。

好处：资源重用、提升系统响应速度、避免数据库连接遗漏。



标准接口 `DataSource` ：用于获取连接。官方提供的数据库连接池接口，由第三方组织实现此接口。

常见产品：

* Druid ：阿里，推荐。
* Hikari ：springboot 默认
* C3P0、DBCP



### Druid

[Druid](https://github.com/alibaba/druid)（德鲁伊） 连接池是阿里巴巴开源的数据库连接池项目。

切换为 Druid：

```xml
<!-- https://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.23</version>
</dependency>
```

```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource  # 可以不加，添加了druid依赖后会自动切换为druid
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/demo?serverTimezone=UTC
    username: root
    password: 123456
```

文档地址：https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter



### SQL 执行注解

* `@Select` ：查询语句
* `@Insert` ：插入语句
* `@Update` ：更新语句
* `@Delete` ：删除语句

这些注解主要用来完成一些简单的增删改查功能，如果需要实现复杂的 sql 功能，建议使用 XML 来配置映射语句。



参数占位符：

* `#{...}` ：执行sql时，会将 `#{...}` 替换为 `?`，生成预编译 SQL，会自动设置参数值。参数传递时使用。
* `${...}` ：拼接sql。直接将参数拼接在sql语句中，存在sql注入问题。如果对表名、表名进行动态设置时使用。
* 如果 mapper 接口方法形参只有一个普通类型的参数，`#/${...}` 里面的属性名可以随便写



预编译 SQL：

* 性能更高。因为会缓存编译好的 sql，下次就不用重新解析、优化、编译同样的 sql 语句了。
* 更安全（防止 SQL 注入）：sql 中的参数用 `#{...}`传递。



SQL 注入是通过操作输入的数据来修改事先定义好的 sql 语句，以达到执行代码对服务器进行攻击的方法。

```mysql
select count(*) from emp where username = '张三' and password = '123';

# 'or'1'='1
select count(*) from emp where username = 'asdad' and password = ''or'1'='1';
select count(*) from emp where username = 'asdad' and password = '' or '1' = '1';
```



```java
@Mapper // 在运行时，会自动生成该接口的实现类对象（代理对象），并且将该对象交给 IOC 容器管理
public interface EmpMapper {

    // 如果 mapper 接口方法形参只有一个普通类型的参数，#{...} 里面的属性名可以随便写
    // 根据id删除，默认会返回影响的条数
    @Delete("delete from emp where id = #{id}")
    void deleteEmp(Integer id);

    // 预编译sql
    @Delete("delete from emp where id = #{idid}")
    int deleteEmp2(Integer id);

    // 拼接sql
    @Delete("delete from emp where id = ${id}")
    int deleteEmp3(Integer id);

    @Insert("insert into emp(username, password, name, age, entry_date, create_time, update_time)\n" +
            "values ('lli', 'abc123', '丽丽', '26', '2024-02-12', now(), now())")
    void insert();

    @Insert("insert into emp(username, password, name, age, entry_date, create_time, update_time)\n" +
            "values (#{username},#{password},#{name},#{age},#{entryDate},#{createTime},#{updateTime})")
    void insert2(Emp emp);

    // 主键返回
    @Options(keyProperty = "id", useGeneratedKeys = true)   // 会自动将生成的主键值，赋值给emp对象的id属性
    @Insert("insert into emp(username, password, name, age, entry_date, create_time, update_time)\n" +
            "values (#{username},#{password},#{name},#{age},#{entryDate},#{createTime},#{updateTime})")
    void insert3(Emp emp);

  	// 如果某个属性的值为null，该字段也会赋值为null
    @Update("update emp set username=#{username}, password=#{password},name=#{name},age=#{age}" +
            ",entry_date=#{entryDate},create_time=#{createTime},update_time=#{updateTime} where id=${id}")
    void update(Emp emp);

    @Select("select * from emp where id = #{id}")
    Emp select(Integer id);
  
    // @Param 用来指定参数名，这样 MyBatis 就能够将方法参数和 SQL 占位符正确关联
    @Select("select * from emp where name like concat('%',#{name},'%') and entry_date between #{begin} and #{end} order by update_time desc")
    List<Emp> list(@Param("name") String name, @Param("begin") LocalDate begin, @Param("end") LocalDate end);

}
```

```java
@SpringBootTest
class MybatisApplicationTests {

    @Autowired
    private EmpMapper empMapper;

    @Test()
    public void testDelete() {
        // empMapper.deleteEmp(3);
        // Integer delete = empMapper.deleteEmp2(5);
        Integer delete = empMapper.deleteEmp3(5);
        System.out.println(delete);
    }

    @Test
    void testInsert() {
        // empMapper.insert();

        Emp emp = new Emp();
        emp.setUsername("hlw");
        emp.setPassword("777");
        emp.setName("葫芦娃");
        emp.setAge(12);
        emp.setEntryDate(LocalDate.of(2022, 10, 17));
        emp.setCreateTime(LocalDateTime.now());
        emp.setUpdateTime(LocalDateTime.now());

        empMapper.insert3(emp);

        System.out.println(emp.getId());    // 查看返回的主键
    }

    @Test
    void testUpdate() {
        Emp emp = new Emp();
        emp.setId(8);
        emp.setUsername("zzz");
        emp.setPassword("123");
        emp.setName("张章");
        emp.setAge(50);
        emp.setEntryDate(LocalDate.of(2024, 10, 17));
        emp.setCreateTime(LocalDateTime.now());
        emp.setUpdateTime(LocalDateTime.now());

        empMapper.update(emp);
    }

    @Test
    void testSelect() {
        Emp emp = empMapper.select(8);
        System.out.println(emp);
    }

    @Test
    void testList() {
        List<Emp> list = empMapper.list("张", LocalDate.of(2024, 9, 1), LocalDate.of(2024, 12, 1));
        System.out.println(list);
    }
}
```



### 数据封装

实体类属姓名和数据库表查询返回的字段名一致，mybatis 会自动封装。不一致时，则不会封装，导致实体类的字段值不能正常的接收。

例如：sql 中的字段是 `create_time`，实体类中的属性是 `createTime`

* 方案1：在 sql 语句中给字段起别名，让别名与实体类属性名一致
* 方案2：通过 `@Results`，`@Result` 注解手动映射封装
* 方案3：开启 mybatis 的驼峰命名自动映射开关。推荐。



```java
@Mapper
public interface EmpMapper {

    @Select("select * from emp where id = #{id}")
    Emp select(Integer id);

    // 方案1：在 sql 语句中给字段起别名，让别名与实体类属性名一致
    @Select("select id, username, password, name, age, entry_date entryDate, create_time createTime, update_time updateTime from emp where id = #{id}")
    Emp getById(Integer id);

    // 方案2：通过 @Results，@Result 注解手动映射封装
    @Results({
            @Result(column = "entry_date", property = "entryDate"),
            @Result(column = "create_time", property = "createTime"),
            @Result(column = "update_time", property = "updateTime")
    })
    @Select("select * from emp where id = #{id}")
    Emp getById2(Integer id);

    // 方案3：开启mybatis的驼峰命名自动映射开关  create_time → createTime
    // mybatis.configuration.map-underscore-to-camel-case=true
    @Select("select id, username, password, name, age, entry_date, create_time, update_time from emp where id = #{id}")
    Emp getById3(Integer id);
}
```



### XML 映射文件

规范：

* XML 映射文件的名称与 Mapper 接口名称一致，并且将 XML 映射文件和 Mapper 接口放置在相同包下（同包同名）
* XML 映射文件的 `namespace` 属性与 Mapper 接口全限定名一致
* XML 映射文件中 sql 语句的 `id` 与 Mapper 接口中的方法名一致，并保持`返回类型一致`

细节：如果 Mapper 接口名称和 SQL 映射文件名称相同，并在同一目录下，则可以使用包扫描的方式简化 SQL 映射文件的加载。

```xml
<mappers>
	<!-- 加载sql的映射文件 -->
	<package name="cn.hyh.mapper">
</mappers>
```



IDEA 插件：`MyBatisX`。mapper 和 xml 可以来回跳转。

```java
@Mapper
public interface EmpMapper {
    List<Emp> getList();
}
```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.hyh.mybatis.mapper.EmpMapper">
    <select id="getList" resultType="cn.hyh.mybatis.entity.Emp">
        select * from emp
    </select>
</mapper>
```



### 动态 SQL

随着用户的输入或外部条件的变化而变化的 SQL 语句，称为动态 SQL。



* `<if>` ：用于判断条件是否成立。使用 test 属性进行条件判断，如果条件为 true，则拼接 SQL。
* `<where>` ：where 元素只会在子元素有内容的情况下才插入 where 子句，而且会自动去除子句开头的 and 或 or。
* `<set>` ：动态的在行首插入 set 关键字，并会删掉额外的逗号。（用在 update 语句中，避免某个值没传递而被修改为 null ）
* `<foreach>` ：遍历
  * collection ：集合名称
  * item ：集合遍历出来的元素
  * separator ：每一次遍历使用的分隔符
  * open ：遍历开始前拼接的片段
  * close ：遍历结束后拼接的片段
* `<sql>` ：定义可重用的 SQL 片段。
* `<include>` ：通过属性 refid 指定包含的 SQL 片段。



```xml
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.hyh.mybatis.mapper.EmpMapper">

    <select id="getList" resultType="cn.hyh.mybatis.entity.Emp">
        select *
        from emp
    </select>

    <select id="list2" resultType="cn.hyh.mybatis.entity.Emp">
        select id, username, password, name, entry_date
        from emp
        where name like concat('%', #{name}, '%')
          and entry_date between #{begin} and #{end}
        order by update_time desc
    </select>

    <sql id="commonSelect">
        select id, username, password, name, entry_date from emp
    </sql>

    <select id="list" resultType="cn.hyh.mybatis.entity.Emp">
        <include refid="commonSelect" />
        <where>
            <if test="name != null">
                name like concat('%', #{name}, '%')
            </if>
            <if test="begin != null and end != null">
                and entry_date between #{begin} and #{end}
            </if>
        </where>
        order by update_time desc
    </select>

    <update id="update">
        update emp
        <set>
            <if test="username != null">
                username = #{username},
            </if>
            <if test="password != null">
                password = #{password},
            </if>
            <if test="name != null">
                name = #{name}
            </if>
        </set>
        where id = #{id}
    </update>

    <delete id="deleteByIds">
        delete from emp where id in
        <foreach collection="ids" item="id" separator="," open="(" close=")">
            #{id}
        </foreach>
    </delete>

</mapper>
```





### 注解

* `@Mapper` ：一般使用在 `Dao` 层接口上。在运行时，会自动生成该接口的实现类对象（代理对象），并且将该对象交给 IOC 容器管理
* sql 注解：
  * `@Select` ：查询语句
  * `@Insert` ：插入语句
  * `@Update` ：更新语句
  * `@Delete` ：删除语句
* `@Options` ： `@Options(keyProperty = "id", useGeneratedKeys = true)`   会自动将生成的主键值，赋值给emp对象的id属性。
  * `@Options` 注解只能搭配 Insert 语句使用
* `@Results` 、 `@Result ` ：手动映射封装。用于解决实体类属姓名和数据库表查询返回的字段名不一致而无法自动封装问题。
* `@Param` ：用来指定参数名，这样 MyBatis 就能够将方法参数和 SQL 占位符正确关联。每个 `@Param`  注解指定的名称在同一个方法内必须是唯一的。`@Param("name") String name` 



### 插件

* 分页插件 PageHelper





## MybatisPlus

[MybatisPlus](https://baomidou.com/) 是基于 Mybatis 框架基础上开发的增强型工具，旨在简化开发，提高效率。



```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.7</version>
</dependency>
```



### BaseMapper

BaseMapper 提供了标准数据层 CRUD 功能，只需要继承 BaseMapper 接口接口。

```java
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
```



* 新增：`int insert(T t)`
* 删除：`deleteById(Serializable id)`
* 根据主键批量删除：`int deleteBatchIds(List idList)`
* 修改：`int updateById(T t)`
* 根据 id 查询：`T selectById(Serializable id)`
* 根据主键批量查询：`List<T> selectBatchIds(List idList)`
* 查询全部：`List<T> selectList()`
* 分页查询：`IPage<T> selectPage(IPage<T> page)`
  * 需要配置分页拦截器后生效
* 按条件查询：`IPage<T> selectPage(Wrapper<T> queryWrapper)`



```java
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    void testSelectById() {
        User user = userMapper.selectById(1809964762209550338L);
        System.out.println(user);
    }
  
    @Test
    void testSelectBatch() {
        List<Long> list = new ArrayList<>();
        list.add(1809964762209550338L);
        list.add(1809975905665720321L);
        List<User> users = userMapper.selectBatchIds(list);
        System.out.println(users);
    }

    @Test
    void testList() {
        List<User> users = userMapper.selectList(null);
        System.out.println(users);
    }

    @Test
    void testPage() {
        // 使用分页需要先配置分页拦截器
        Page<User> userPage = userMapper.selectPage(new Page<User>(1, 5), null);
        System.out.println("数据：" + userPage.getRecords());
        System.out.println("当前页码：" + userPage.getCurrent());
        System.out.println("每页显示数：" + userPage.getSize());
        System.out.println("一共多少页：" + userPage.getPages());
        System.out.println("一共多少条数据：" + userPage.getTotal());
    }

    @Test
    void testInsert() {
        User user = new User();
        user.setName("张三");
        user.setAge(20);
        user.setPassword("123");
        user.setTel("18744778551");
        userMapper.insert(user);
    }

    @Test
    void testDelect() {
        userMapper.deleteById(1);
    }
  
    @Test
    void testDel() {
        List<Long> list = new ArrayList<>();
        list.add(1811065668246224898L);
        list.add(1811066563205853185L);
        userMapper.deleteBatchIds(list);
    }

    @Test
    void testUpdate() {
        User user = new User();
        user.setId(1809964762209550338L);
        user.setName("张三222");
        userMapper.updateById(user);
    }

}
```





### 条件查询

MP 将书写复杂的 SQL 查询条件进行了封装，使用编程的形式完成查询条件的组合。

* eq ：等于
* lt ：小于
* gt ：大于
* le ：小于等于
* ge ：大于等于
* between ：区间
* or ：或者
* select ：查询投影，它用于设置查询的字段。通过调用 `select` 方法，可以指定在查询结果中包含哪些字段，从而实现字段级别的查询定制。



```java
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    void testPageWrap() {
        // 方式1：按条件查询
        QueryWrapper<User> qw1 = new QueryWrapper<>();
        qw1.eq("name", "张三");


        // 方式2：lambda格式按条件查询。推荐
        QueryWrapper<User> qw2 = new QueryWrapper<>();
        qw2.lambda().eq(User::getName, "张三");


        // 方式3：lambda格式按条件查询。推荐
        LambdaQueryWrapper<User> qw3 = new LambdaQueryWrapper<>();
        qw3.eq(User::getName, "张三");


        LambdaQueryWrapper<User> qw4 = new LambdaQueryWrapper<>();
        // 支持链式，默认是 and。年龄大于20并小于40
        qw4.gt(User::getAge, 20).lt(User::getAge, 40);
        // 年龄大于40或者小于20
        qw4.gt(User::getAge, 40).or().lt(User::getAge, 20);
        List<User> users = userMapper.selectList(qw4);
        System.out.println(users);
    }

    @Test
    void testNull() {
        User user1 = new User();
        user1.setAge(null);
        User user2 = new User();
        user2.setAge(40);

        // null 判定，避免查询拼接异常
        LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
        if (null != user1.getAge()) {
            lqw.gt(User::getAge, user1.getAge());
        }
        if (null != user2.getAge()) {
            lqw.lt(User::getAge, user2.getAge());
        }

        LambdaQueryWrapper<User> lqw2 = new LambdaQueryWrapper<>();
        // 方式2：先判定第一个参数是否为true，如果为true连接当前条件
        lqw2.gt(null != user1.getAge(), User::getAge, user1.getAge());
        lqw2.lt(null != user2.getAge(), User::getAge, user2.getAge());

        List<User> users = userMapper.selectList(lqw2);
        System.out.println(users);
    }

    @Test
    void testSelect() {
        // 查询投影：查询结果中只包含指定字段
        LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
        lqw.select(User::getName, User::getPassword);
        List<User> users = userMapper.selectList(lqw);
        System.out.println(users);

        QueryWrapper<User> qw1 = new QueryWrapper<>();
        qw1.select("name", "tel");
        List<User> users1 = userMapper.selectList(qw1);
        System.out.println(users1);

        QueryWrapper<User> qw2 = new QueryWrapper<>();
        qw2.select("count(*) as count");
        List<Map<String, Object>> maps = userMapper.selectMaps(qw2);
        System.out.println(maps);
    }

    @Test
    void testSelect2() {
        // 条件查询
        LambdaQueryWrapper<User> lqw1 = new LambdaQueryWrapper<>();
        lqw1.eq(User::getName, "李四").eq(User::getPassword, "123");
        User user = userMapper.selectOne(lqw1);
        System.out.println(user);

        LambdaQueryWrapper<User> lqw2 = new LambdaQueryWrapper<>();
        // 设定上限下限：小于等于、大于等于
        lqw2.le(User::getAge, 40).ge(User::getAge, 20);
        // 设定区间
        lqw2.between(User::getAge, 20, 40);
        List<User> users = userMapper.selectList(lqw2);
        System.out.println(users);

        LambdaQueryWrapper<User> lqw3 = new LambdaQueryWrapper<>();
        // 模糊查询 %张
        lqw3.likeLeft(User::getName, "张");
        List<User> users1 = userMapper.selectList(lqw3);
        System.out.println(users1);

        // 分组查询聚合函数
        QueryWrapper<User> qw = new QueryWrapper<>();
        qw.select("gender", "count(*) as nums");
        qw.groupBy("gender");
        List<Map<String, Object>> maps = userMapper.selectMaps(qw);
        System.out.println(maps);
    }
}
```



### 字段映射和表名映射

* `@TableName` ：设置实体类映射的表名。
* `@TableField`
  * `@TableField(value = "f_address_id")` ：设置当前属性对应的数据库表中的字段关系。value 可以省略。
  * `@TableField(exist = false)` ：设置属性在数据表字段中是否存在，默认 true。此属性不能与 value 合并使用。
  * `@TableField(select = false)` ：设置属性是否参与查询，此属性与 select() 映射配置不冲突。



```java
@Data
@TableName("tb_user")
public class User {
    private Long id;
    private String name;
    private Integer age;

    @TableField(select = false)
    private String password;
    private String tel;

    // @TableField(value = "f_address_id")
    @TableField("f_address_id")
    private Long address_id;

    @TableField(exist = false)
    private String email;
}
```



### 主键生成策略

* `@TableId` ：设置当前类中主键属性的生成策略。
  * value ：设置数据库主键名称
  * type ：设置主键属性的生成策略。值参照 `IdType` 枚举值，默认为 ASSIGN_ID 雪花算法。
* `IdType` ：枚举
  * AUTO ：使用数据库 id 自增策略控制 id 生成。需确保数据库设置了 id 自增，否则无效。
  * NONE ：不设置 id 生成策略
  * INPUT ：用户手动输入 id
  * ASSIGN_ID ：默认。雪花算法生成 id （可兼容数值型与字符串型）
  * ASSIGN_UUID ：以 UUID 生成算法作为 id 生成策略



```java
@Data
@TableName("tb_address")
public class Address {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private String detail;
}
```



雪花算法：

```
      0 | 00001010100101011..00110 | 10000 | 10001 | 0001212..010
占位符 0          时间戳(41位)            机器码(5+5)       序列号(12)
```



### 逻辑删除

逻辑删除：为数据设置是否可用状态字段，删除时设置状态字段为不可用状态，数据保留在数据库中。

* `@TableLogic` 注解：逻辑删除，用在声明逻辑删除的字段上。

  * value ：未删除的状态值
  * delval ：已删除的状态值

* 全局配置：

  ```yaml
  mybatis-plus:
    global-config:
      db-config:
        logic-delete-field: deleted   # 逻辑删除字段名
        logic-not-delete-value: 0     # 未删除的状态值
        logic-delete-value: 1         # 已删除的状态值
  ```

  

在执行 SQL 语句时，就会自动添加逻辑删除的查询条件。

```sql
UPDATE tb_address SET deleted=1 WHERE id=? AND deleted=0
```



```java
@Data
@TableName("tb_address")
public class Address {

    private Long id;

    private String detail;

    // 逻辑删除字段，标记当前记录是否被删除
    @TableLogic(value = "0", delval = "1")
    private Integer deleted;

}
```

```java
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private AddressMapper addressMapper;

    @Test
    void testDelete() {
        addressMapper.deleteById(1811066536735600642L);
    }

    @Test
    void testSelect() {
        addressMapper.selectList(null);
    }
}
```



### 乐观锁

乐观锁：不能同时修改同一条数据。

1. 通过 `@Version` 注解设置乐观锁字段：当每次修改数据时，该字段会自动自增。

2. 添加乐观锁拦截器，添加后会自动实现锁机制对应的动态 SQL 语句拼装

   ```mysql
   UPDATE tb_address SET detail=?, version=? WHERE id=? AND version=?
   ```



注意：使用乐观锁机制在修改前必须先获取到对应数据的 version 方可正常进行。



```java
@Data
@TableName("tb_address")
public class Address {

    private Long id;

    private String detail;

    @Version
    private Integer version;

}
```

```java
@Configuration
public class MpConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        // 定义 mp 拦截器
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 添加乐观锁拦截器
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

```java
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private AddressMapper addressMapper;

    @Test
    void testUpdate() {
      	// 先查询数据，获取到version数据
        Address address = addressMapper.selectById(1811066536735600642L);
        address.setDetail("深圳");
        addressMapper.updateById(address);
    }

    @Test
    void testUpdate2() {
        // 使用乐观锁机制在修改前必须先获取到对应数据的 version 方可正常进行。
        Address address1 = addressMapper.selectById(1811066536735600642L);
        Address address2 = addressMapper.selectById(1811066536735600642L);

        address1.setDetail("深圳1");
        addressMapper.updateById(address1);

        address2.setDetail("深圳2");
        addressMapper.updateById(address2); // 不会修改
    }
   
}
```





### 拦截器

```java
@Configuration
public class MpConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        // 定义 mp 拦截器
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 添加具体的拦截器，例如分页拦截器
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return interceptor;
    }
}
```



### yml 全局配置

```yaml
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl		# 显示日志
  global-config:
    banner: false   # 不显示logo
    db-config:
      id-type: assign_id     # 主键生成策略
      table-prefix: tb_      # 表名前缀
```



### 代码生成器

[文档](https://baomidou.com/guides/new-code-generator/)



1. 引入依赖

   ```xml
   <!-- 代码生成器 -->
   <dependency>
       <groupId>com.baomidou</groupId>
       <artifactId>mybatis-plus-generator</artifactId>
       <version>3.5.7</version>
   </dependency>
   
   <!-- freemarker模板引擎 -->
   <dependency>
       <groupId>org.freemarker</groupId>
       <artifactId>freemarker</artifactId>
       <version>2.3.31</version>
   </dependency>
   ```

   

2. 编写代码

   ```java
   FastAutoGenerator.create("jdbc:mysql://localhost:3306/demo", "root", "123456")
           .globalConfig(builder -> {
               builder.author("Huang") // 设置作者
                       .enableSwagger() // 开启 swagger 模式
                       .outputDir(Paths.get(System.getProperty("user.dir")) + "/src/main/java"); // 指定输出目录
           })
           .dataSourceConfig(builder ->
                   builder.typeConvertHandler((globalConfig, typeRegistry, metaInfo) -> {
                       int typeCode = metaInfo.getJdbcType().TYPE_CODE;
                       if (typeCode == Types.SMALLINT) {
                           // 自定义类型转换
                           return DbColumnType.INTEGER;
                       }
                       return typeRegistry.getColumnType(metaInfo);
                   })
           )
           .packageConfig(builder ->
                   builder.parent("cn.hyh.coregenerator") // 设置父包名
                           .moduleName("user") // 设置父包模块名
                           .pathInfo(Collections.singletonMap(OutputFile.xml, Paths.get(System.getProperty("user.dir")) + "/src/main/resources/mappers")) // 设置mapperXml生成路径
           )
           .strategyConfig(builder ->
                   builder.addInclude("tb_user") // 设置需要生成的表名
                           .addTablePrefix("tb_", "f_") // 设置过滤表前缀
           )
           .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
           .execute();
   ```

   



### 注解

* `@TableName` ：设置实体类映射的表名。例如 `@TableName("tb_user")`
* `@TableField` ：设置当前属性对应的数据库表中的字段关系。例如 `@TableField("f_address_id")`
* `@TableId` ：设置当前类中主键属性的生成策略。例如 `@TableId(type = IdType.ASSIGN_ID)`
* `@TableLogic` ：逻辑删除，用在声明逻辑删除的字段上。 `@TableLogic(value = "0", delval = "1")`
* `@Version` ：乐观锁注解。在数据更新时会自增。

































































## Lombok

Lombok 是一个实用的 Java 类库，能通过注解的形式自动生成构造器、getter/setter、equals、hashcode、toString 等方法，并可以自动化生成日志变量，简化 Java 开发、提高效率。

Lombok 会在编译时，自动生成对应的 Java 代码。

```xml
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.22</version>
    <scope>provided</scope>
</dependency>
```



* `@Getter/@Setter` ：为所有的属性提供 get/set 方法。
* `@ToString` ：会给类自动生成易阅读的 toString 方法。
* `@EqualsAndHashCode` ：根据类所拥有的非静态字段重写 equals 方法和 hashCode 方法。
* `@Data` ：常用，提供了更综合的生成代码功能。（`@Getter + @Setter + @ToString + @EqualsAndHashCode` ）
* `@NoArgsConstructor` ：为实体类生成无参的构造器方法
* `@AllArgsConstructor` ：为实体类生成除了 static 修饰的字段之外，带有各参数的构造器方法



```java
import lombok.Data;

@Data		// 自动生成对应的代码
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private Integer gender;
    private String phone;
}
```



## TODO hutool

Hutool是一个小而全的Java工具类库，对文件、流、加密解密、转码、正则、线程、XML等JDK方法进行封装，组成各种Util工具类。

[官网](https://www.hutool.cn/)



```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.29</version>
</dependency>
```







## Tomcat

[Tomcat](https://tomcat.apache.org/) 是一个开源免费的轻量级 Web 服务器，支持 Servlet/JSP 少量的 JavaEE 规范。Tomcat 也被称为 Web容器、Servlet 容器。Servlet 程序需要依赖于 Tomcat 才能运行。



* 官网下载后解压即可完成安装
* 启动：双击 bin\startup.bat
* 关闭：Ctrl + C  或者 双击 bin\shutdown.bat
* 部署项目：将项目放置到 webapps 目录下即可。HTTP 协议默认端口号为 80，如果将 Tomcat 端口号改成 80，则将来访问 Tomcat 时，将不用输入端口号。



目录介绍：

```
bin				可执行文件
conf			配置文件
lib				Tomcat依赖的jar包
logs			日志文件
temp			临时文件
webapps		应用发布目录
work			工作目录
```



常见问题：

* 启动窗口一闪而过：检查 JAVA_HOME 环境变量是否正确配置

* 端口号冲突：

  * 方式1：找到对应程序，将其关闭

  * 方式2：修改 Tomcat 端口号 conf\server.xml

    ```
    <Connector port="8080" protocol="HTTP/1.1"
         connectionTimeout="20000"
         redirectPort="8443"
         maxParameterCount="1000"
         />
    ```

* 控制台中文乱码：修改 conf\logging.properties

  ```
  # 将 UTF-8 改成 GBK
  java.util.logging.ConsoleHandler.encoding = GBK		
  ```

  





## Spring

[官网](https://spring.io/)

Spring 全家桶：

* Spring Boot
* Spring Framework
* Spring Data
* Spring Cloud
* Spring Security





### Spring Boot

Spring Boot 可以帮助我们非常快速的构建应用程序，简化开发，提高效率。

基于 springboot 开发的 web 应用程序，内置了 tomcat 服务器，当启动类运行时，会自动启动内嵌的 tomcat 服务器。

阿里URL：https://start.aliyun.com/



起步依赖：

* spring-boot-starter-web ：包含了 web 应用开发所需要的常见依赖
* spring-boot-starter-test ：包含了单元测试所需要的常见依赖



请求响应：

* `HttpServletRequest` ：获取请求数据
* `HttpServletResponse` ：设置响应数据



#### 快速入门

1. 创建 Spring Boot 工程，并勾选 Web 开发相关依赖
2. 定义 HelloController 类，添加方法 Hello，并添加注解
3. 运行测试



```java
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 请求处理类
@RestController
public class HelloController {

    @RequestMapping("/hello")	
    public String hello() {
        System.out.println("hello world");
        return "hello world";
    }

}
```



#### 接收参数

* 简单参数：定义方法形参，请求参数名与形参变量名一致。如果不一致，通过 `@RequestParam` 手动映射
* 实体参数
  * 简单实体对象：请求参数名与实体对象的属性名一致，会自动接收封装
  * 复杂实体对象：请求参数名与实体对象的属性名一致，按照对象层次结构关系即可接收嵌套 POJO 属性参数
* 数组集合参数
  * 数组：请求参数名与数组名一致，直接封装
  * 集合：请求参数名与集合名一致，通过 `@RequestParam` 绑定参数关系
* 日期参数：使用 `@DateTimeFormat` 完成日期参数格式转换
* JSON 参数：使用 `@RequestBody` 标记
* 路径参数：使用 `@PathVariable` 获取路径参数



```java
// 请求处理类
@RestController
public class HelloController {

    @RequestMapping("hello")
    public String hello() {
        System.out.println("hello world");
        return "hello world";
    }

    // 在原始的web程序中，获取请求参数，需要通过 HttpServletRequest 对象手动获取
    @RequestMapping("hello2")
    public String hello2(HttpServletRequest request) {
        String name = request.getParameter("name");
        String ageStr = request.getParameter("age");
        int age = Integer.parseInt(ageStr);
        return name + ":" + age;
    }

    // 简单参数：参数名与形参变量名相同，定义形参即可接收参数。并且会自动进行类型转换
    @RequestMapping("hello3")
    public String hello3(String name, Integer age) {
        return name + ":" + age;
    }

    // 方法形参名称和请求参数名称不匹配，可以使用 @RequestParam 注解完成映射
    @RequestMapping("hello4")
    public String hello4(@RequestParam(name = "uname", required = false) String username, Integer age) {
        // @RequestParam 中的 required 属性默认为 true，代表该请求参数必须传递，不传递则报错。如果该参数是可选的，就将required属性设置为 false
        return username + ":" + age;
    }

    // 简单实体对象：请求参数名与形参对象属性名相同，定义 POJO 接收即可
    @RequestMapping("hello5")
    public String hello5(User user) {
        System.out.println(user);
        return "OK";
    }

    // 复杂实体对象：请求参数名与形参对象属性名相同，按照对象层次结构关系即可接收嵌套 POJO 属性参数
    // 例如 ?name=zs&age=151&address.province=广东&address.city=深圳
    @RequestMapping("hello6")
    public String hello6(User user) {
        System.out.println(user);
        return "OK";
    }

    // 数组参数：请求参数名与形参数组名称相同且请求参数为多个，定义数组类型形参即可接收参数
    @RequestMapping("hello7")
    public String hello7(String[] hobby) {
        System.out.println(Arrays.toString(hobby));
        return "OK";
    }

    // 集合参数：请求参数名与形参集合名称相同且请求参数为多个，通过 @RequestParam 绑定参数关系
    @RequestMapping("hello8")
    public String hello8(@RequestParam List<String> hobby) {
        System.out.println(hobby);
        return "OK";
    }

    // 日期参数：使用 @DateTimeFormat 注解完成日期参数格式转换
    @RequestMapping("hello9")
    public String hello9(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime updateTime) {
        System.out.println(updateTime);
        return "OK";
    }

    // JSON 参数：JSON 数据键名与形参对象属性名相同，定义 POJO 类型形参即可接收参数，需要使用 @RequestBody 标记
    @RequestMapping("hello10")
    public String hello10(@RequestBody User user) {
        System.out.println(user);
        return "OK";
    }

    // 路径参数：通过请求URL直接传递参数，使用 [...] 来标识该路径参数，需要使用 @PathVariable 获取路径参数
    @RequestMapping("/hello11/{id}")
    public String hello11(@PathVariable Integer id) {
        System.out.println(id);
        return "OK";
    }

    // 多个路径参数
    @RequestMapping("/hello11/{id}/{name}")
    public String hello11(@PathVariable Integer id, @PathVariable String name) {
        System.out.println(id + ":" + name);
        return "OK";
    }

}
```





#### 响应数据

`@ResponseBody` 注解：

* 类型：方法注解、类注解
* 位置：Controller 类上/方法上
* 作用：将方法返回值直接响应，如果返回值类型是 实体对象/集合，将会转换为 JSON 格式响应
* 说明：`@RestController` = `@Controller` +  `@ResponseBody`



在实际开发中，为了统一响应结果，通常会封装一个响应结果类，用来规范响应数据的格式。`Result(code, msg, data)`

```java
public class Result {
    private int code;       // 1 成功，0 失败
    private String msg;     // 提示信息
    private Object data;    // 数据 data

    public Result() {
    }

    public Result(int code, String msg, Object data) {
        this.code = code;
        this.data = data;
        this.msg = msg;
    }

    public static Result success(Object data) {
        return new Result(1, "success", data);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "Result{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }
}
```

```java
@RestController
public class ResponseController {

    // 返回字符串
    @RequestMapping("/get1")
    public String get1() {
        return "hello world";
    }

    // 返回实体对象
    @RequestMapping("/get2")
    public Address get2() {
        Address address = new Address();
        address.setProvince("广东");
        address.setCity("深圳");
        return address;
    }

    // 返回集合
    @RequestMapping("/get3")
    public List<Address> get3() {
        List<Address> list = new ArrayList<>();

        Address addr1 = new Address();
        addr1.setProvince("广东");
        addr1.setCity("深圳");
        list.add(addr1);
        Address addr2 = new Address();
        addr2.setProvince("广东");
        addr2.setCity("广州");
        list.add(addr2);

        return list;
    }

    // 统一响应结果
    @RequestMapping("/get4")
    public Result get4() {
        return Result.success("hello world");
    }

    @RequestMapping("/get5")
    public Result get5() {
        Address address = new Address();
        address.setProvince("广东");
        address.setCity("深圳");
        return Result.success(address);
    }

    @RequestMapping("/get6")
    public Result get6() {
        List<Address> list = new ArrayList<>();

        Address addr1 = new Address();
        addr1.setProvince("广东");
        addr1.setCity("深圳");
        list.add(addr1);
        Address addr2 = new Address();
        addr2.setProvince("广东");
        addr2.setCity("广州");
        list.add(addr2);

        return Result.success(list);
    }
}
```





#### 分层解耦

```java
@RestController
public class EmpController {

    @RequestMapping("getEmp")
    public Result getEmp() {
        // 数据访问：加载 emp.xml 并解析里面的数据
        String file = this.getClass().getClassLoader().getResource("static/emp.xml").getFile();
        List<Emp> empList = XmlParserUtils.parse(file, Emp.class);

        // 逻辑处理：对字段进行处理
        empList.stream().forEach(emp -> {
            String gender = emp.getGender();
            if ("1".equals(gender)) {
                emp.setGender("男");
            } else if ("0".equals(gender)) {
                emp.setGender("女");
            }
        });

        // 接收请求、返回数据：组装数据并返回
        return Result.success(empList);
    }
}
```

上面的代码耦合太高，不符合 `单一职责原则`。



##### 三层架构

* `controller` ：控制层，接收前端发来的请求，对请求进行处理，并响应数据。
* `service` ：业务逻辑层，处理具体的业务逻辑。
* `dao` ：数据访问层（Data Access Object），又称持久层。负责数据访问操作，包括数据的增、删、改、查。



软件设计原则：高内聚，低耦合。

* 内聚：软件中各个功能模块内部的功能联系。
* 耦合：衡量软件中各个层/模块之间的依赖、关联的程度。



##### IOC & DI

* 控制反转：Inversion Of Control ，简称 `IOC`。对象的创建控制权由程序自身转移到外部（容器），这种思想称为控制反转。
* 依赖注入：Dependency Injection，简称 DI。容器为应用程序提供运行时所依赖的资源，称之为依赖注入。
* Bean 对象：IOC 容器中创建、管理的对象，称之为 bean。



步骤：

1. Service 层及 Dao 层的实现类，交给 IOC 容器管理。使用 `@Component` 注解
2. 为 Controller 及 Service 注入运行时依赖的对象。使用：`@Autowired` 注解





```java
// controller 层

@RestController
public class EmpController {

    @Autowired
    private EmpService empService;

    @RequestMapping("getEmp")
    public Result getEmp() {
        // 调用service，获取数据
        List<Emp> empList = empService.listEmp();

        // 组装数据并返回
        return Result.success(empList);
    }
}
```

```java
// service 层

@Component  // 将当前类交给 IOC 容器管理，成为 IOC 容器中的bean
public class EmpService {

    @Autowired  // 依赖注入：运行时，IOC容器会提供该类型的bean对象，并赋值给该变量
    private EmpDao empDao;

    public List<Emp> listEmp() {
        // 调用dao层，获取数据
        List<Emp> empList = empDao.listEmp();

        // 对字段进行处理
        empList.stream().forEach(emp -> {
            String gender = emp.getGender();
            if ("1".equals(gender)) {
                emp.setGender("男");
            } else if ("0".equals(gender)) {
                emp.setGender("女");
            }
        });

        // 返回处理结果
        return empList;
    }
}
```

```java
// dao 层

@Component
public class EmpDao {
    public List<Emp> listEmp() {
        // 加载 emp.xml 并解析里面的数据
        String file = this.getClass().getClassLoader().getResource("static/emp.xml").getFile();
        List<Emp> empList = XmlParserUtils.parse(file, Emp.class);
        return empList;
    }
}
```



##### Bean 的声明

要把某个对象交给 IOC 容器管理，需要在相应的类上加上如下注解之一：

* `@Component` ：声明 bean的基础注解。不属于以下三类时，用此注解
* `@Controller` ：`@Component` 的衍生注解，标注在控制器上
* `@Service` ：`@Component` 的衍生注解，标注在业务类上
* `@Respsitory` ：`@Component` 的衍生注解，标注在数据访问类上（由于与 mybatis 整合，用的少）

使用以上四个注解都可以声明 bean，但是在 springboot 集成 web 开发中，声明控制器 bean 只能用 `@Controller` 。



声明 bean 的时候，可以通过 value 属性指定 bean 的名字，如果没有指定，默认为类名首字母小写。

在 IDEA 中，可以在控制台的 Actuator → Beans 中查看 IOC 容器中的 bean。



```java
@RestController
public class EmpController {

}
```

```java
@Service
public class EmpService {

}
```

```java
@Respsitory
public class EmpDao {

}
```



**第三方 Bean**

如果要管理的 bean 对象来自于第三方（不是自定义的），是无法用 `@Component` 及衍生注解声明 bean 的，就需要用到 `@Bean` 注解。

通过 `@Bean` 注解的 name/value 属性指定 bean 名称，如果未指定，默认是方法名。

如果第三方 bean 需要依赖其他 bean 对象，直接在 bean 定义方法中设置形参即可，容器会根据类型自动装配。

若要管理第三方 bean 对象，建议对这些 bean 进行集中分类配置，可以通过 `@Configuration` 注解声明一个配置类。

```java
@Configuration  // 声明配置类
public class CommonConfig {
  
  	// @Bean(name = "SAX")
    @Bean  // 将当前方法的返回值对象交给IOC容器管理，成为IOC容器bean
    public SAXResult SAXResult() {
        return new SAXResult();
    }
}
```





##### Bean 组件扫描

前面声明 bean 的四大注解，要想生效，还需要被组件扫描注解 `@ComponentScan` 扫描。

`@ComponentScan` 注解虽然没有显式配置，但是实际上已经包含在了启动类声明注解 `@SpringBootApplication` 中，默认扫描的范围是启动类所在包及其子包。



```java
@ComponentScan({"dao", "com.hyh"})	// 声明要扫描的包
```



##### bean 注入

`@Autowired` 注解，默认是按照类型进行，如果存在多个相同类型的 bean，将会报错。

可以通过以下几种方案解决：

* `@Primary` ：给某个相同类型的 bean 声明主键注解
* `@Qualifier` ：指定使用哪个 bean
* `@Resource` ：指定 bean



`@Autowired` 和 `@Resource` 的区别：

* `@Autowired` 是 spring 框架提供的注解，而 `@Resource`  是 JDK 提供的注解。
* `@Autowired` 默认是按照类型注入，而 `@Resource` 默认是按照名称注入。



```java
// 方式1

@Primary
@Component
public class EmpServiceA implements EmpService {

}
```

```java
// 方式2

@RestController
public class EmpController {

    @Autowired
    @Qualifier("empServiceA")
    private EmpService empService;

}
```

```java
// 方式3

@RestController
public class EmpController {

    @Resource(name = "empServiceB")
    private EmpService empService;

}
```



##### 获取 bean

默认情况下，spring 项目启动时，会把 bean 都创建好放在 IOC 容器中，如果想要主动获取这些 bean，可以通过以下方式：

```java
@SpringBootTest
class MybatisApplicationTests {

    @Autowired
    private ApplicationContext applicationContext;  // IOC 容器对象

    @Test
    void getBean() {
      	// 默认 singleton 作用域下的 bean 是单例的。通过 @Scope("prototype") 后的 bean 则是非单例的

        // 根据bean的名称获取
        // Object getBean(String name)
        UserController bean1 = (UserController) applicationContext.getBean("userController");
        System.out.println(bean1);

        // 根据bean的类型获取
        // <T> T getBean(Class<T> requiredType)
        UserController bean2 = applicationContext.getBean(UserController.class);
        System.out.println(bean2);

        // 根据bean的名称和类型获取
        // <T> T getBean(String name, Class<T> requiredType)
        UserController bean3 = applicationContext.getBean("userController", UserController.class);
        System.out.println(bean3);

    }
}
```

这些 bean 还会受到作用域及延迟初始化影响，这里主要针对**默认的单例非延迟加载**的 bean 而言。



bean 作用域

spring 支持五种作用域，后三种在 web 环境才生效

* **singleton** ：容器内同名称的 bean 只有一个实例（单例）。默认。
* **prototype** ：每次使用该 bean 时会创建新的实例（非单例）
* request ：每个请求范围内会创建新的实例
* session ：每个会话范围内会创建新的实例
* application ：每个应用范围内会创建新的实例

可以通过 `@Scope` 注解来进行配置作用域。实际开发中，绝大部分的 bean 都是单例的，不需要配置 scope。

```java
@Scope("prototype")		// 非单例
@RestController
public class UserController { }
```



默认 singleton 的 bean，在容器启动时被创建，可以使用 `@Lazy` 注解来延迟初始化（延迟到第一次使用时）。





#### 配置方式

* 配置文件属性配置
  * application.yaml
  * application.yml
  * application.properties
* java 系统属性：`-Dserver.port=9000`
* 命令行参数：`--server.port=9000`
* 优先级从低到高

可以在 IDEA 的 `run/debug configurations`  面板中设置 java 系统属性和命令行参数。



yml 基本语法：

* 大小写敏感
* 数值前边必须有空格，作为分隔符
* 使用缩进表示层级关系。缩进时，不允许使用 tab 键，只能用空格（IDEA会自动转换）
* 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
* `#` 表示注释，从这个字符一直到行尾，都会被解析器忽略



```
# properties 方式
server.port=8080

# yml 或 yaml 方式（表示对象/Map集合）
server:
	port: 8080

# yml 或 yaml （表示数组/List/Set集合）
hobby:
	- java
	- game
```



#### 项目打包

springboot 项目进行打包时，需要在 `pom.xml` 中引入插件 `spring-boot-maven-plugin` （基于官方骨架创建项目，会自动添加该插件）

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>${spring-boot.version}</version>
    <configuration>
        <mainClass>cn.hyh.mybatis.MybatisApplication</mainClass>
    </configuration>
    <executions>
        <execution>
            <id>repackage</id>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```



#### 原理



##### 自动配置

springboot 自动配置就是当 spring 容器启动后，一些配置类、bean 对象就自动存入到 IOC 容器中，不需要手动去声明，从而简化了开发，省去了繁琐的配置操作。



* 方案1：`@CompontentScan` 组件扫描。
* 方案2：`@Import` 导入。使用 `@Import` 导入的类会被 spring 加载到 IOC 容器中。
  * 导入普通类
  * 导入配置类
  * 导入 `ImportSelector` 接口实现类
  * `@EnableXxxx` 注解，封装 `@Import` 注解



```java
@ComponentScan({"cn.hyh", "cn.test"})
@SpringBootApplication
public class DemoApplication {
}
```

```java
@Import({Config.class, Test.class})
@SpringBootApplication
public class DemoApplication {
}
```





#### 注解

* `@SpringBootApplication` ：启动类声明注解。还具有包扫描作用，默认扫描当前包及其子包。

* `@RequestMapping` ：用于设置请求路径。例如 `@RequestMapping("/hello")`

* `@RestController` ：用于标注是请求处理类。`@RestController` = `@Controller` +  `@ResponseBody`

* `@ResponseBody` ：方法注解、类注解。可以用在 Controller 类上/方法上，作用是将方法返回值直接响应，如果返回值类型是 实体对象/集合，将会转换为 JSON 格式响应。

*  声明 bean 的注解（将对象交给 IOC 容器管理）：

  * `@Component` ：将当前类交给 IOC 容器管理，成为 IOC 容器中的 bean
  * `@Controller` ：`@Component` 的衍生注解，标注在控制器上
  * `@Service` ：`@Component` 的衍生注解，标注在业务类上
  * `@Respsitory` ：`@Component` 的衍生注解，标注在数据访问类上（由于与 mybatis 整合，用的少）
  * 声明 bean 的时候，可以通过 value 属性指定 bean 的名字，如果没有指定，默认为类名首字母小写。`@Component(value = "empSer")`

* `@Bean` ：第三方 bean 需要用此注解才能成为 IOC 容器的 bean 对象

* `@Autowired` ：依赖注入：运行时，IOC 容器会提供该类型的 bean 对象，并赋值给该变量。默认按照类型自动装配。

* `@Scope` ：配置 bean 的作用域。例如 `@Scope("prototype")`

* `@Lazy` ：延迟 bean 的自动初始化到第一次使用时。

* `@ComponentScan` ：组件扫描注解。声明 bean 的四大注解，要想生效，需要被该注解扫描到。

* 存在多个相同类型的 bean 时的处理方案：

  * `@Primary` ：给某个相同类型的 bean 声明主键注解
  * `@Qualifier` ：`@Autowired` + 指定使用哪个 bean。例如 `@Qualifier("empServiceA")`
  * `@Resource` ：直接使用该注解指定 bean。`@Resource(name = "empServiceB")`

* 注入外部配置的属性：

  * `@Value` ：一个一个的进行外部属性的注入，用法：`@Value("${配置文件中的key}")`
  * `@ConfigurationProperties` ：可以批量的将外部的属性配置注入到 bean 对象的属性中。需要搭配 `@Component` 使用。例如：  `@ConfigurationProperties(prefix = "aliyun.oss")`

* 请求参数注解

  * 请求参数名与形参变量名不一致时，通过 `@RequestParam` 手动映射。

    * `@RequestParam(name = "pwd", required = false) String password` ：required 属性默认为 true，代表该参数必传
    * `@RequestParam List<String> hobby` ：请求参数名与集合名一致，通过 `@RequestParam` 绑定参数关系

  * JSON 参数：使用 `@RequestBody` 标记。例如 `@RequestBody User user`

  * 日期参数：使用 `@DateTimeFormat` 完成日期参数格式转换

    *  `@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime updateTime`

  * 路径参数：使用 `@PathVariable` 获取路径参数

    ```java
    @RequestMapping("/hello11/{id}/{name}")
    public String hello11(@PathVariable Integer id, @PathVariable String name) {
        System.out.println(id + ":" + name);
        return "OK";
    }
    ```

* `@SpringBootTest` ：单元测试的注解

* `@Configuration` ：声明为配置类

* 参数校验：

  * `@NotNull` ：可用于所有类型的字段，判断字段不能为null
  * `@NotBlank` ：只能用于String类型的字段，判断字段不能为空串或空白(空格或制表符)字符串
  * `@NotEmpty` ：可用于String类型和集合类型，用在String字段上时，字段不能为空串;用于集合时，集合不能为null或集合的size不为0





### RestTemplate



1、在启动类中注册RestTemplate实例

2、在 Service 类中请求接口



```java
@MapperScan("cn.demo.order.mapper")
@SpringBootApplication
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

```java
@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private RestTemplate restTemplate;

    public Order queryOrderById(Long orderId) {
        // 1.查询订单
        Order order = orderMapper.findById(orderId);

				// 2.通过请求url获得数据
        String url = "http://localhost:8081/user/" + order.getUserId();
        User user = restTemplate.getForObject(url, User.class);
        order.setUser(user);

        // 3.返回
        return order;
    }
}
```





### Spring Task

从Spring 3开始，Spring自带了一套定时任务工具Spring-Task，使用起来十分简单，除Spring相关的包外不需要额外的包，支持注解和配置文件两种形式。通常情况下在Spring体系内，针对简单的定时任务，可直接使用Spring提供的功能。



```java
@Component("taskJob")
public class TaskJob {

    @Scheduled(cron = "0 0 3 * * ?")
    public void job1() {
        System.out.println("通过cron定义的定时任务");
    }

    @Scheduled(fixedDelay = 1000L)
    public void job2() {
        System.out.println("通过fixedDelay定义的定时任务");
    }

    @Scheduled(fixedRate = 1000L)
    public void job3() {
        System.out.println("通过fixedRate定义的定时任务");
    }
}
```



* 在Spring Boot项目中，需要在启动类上添加`@EnableScheduling`来开启定时任务。
* `@Component`用于实例化类，这个与定时任务无关。
* `@Scheduled`指定该方法是基于定时任务进行执行，具体执行的频次是由`cron`指定的表达式所决定。
* cron介绍
  * `CronTrigger`功能非常强大，是基于日历的作业调度，而`SimpleTrigger`是精准指定间隔，所以相比`SimpleTrigger`，`CroTrigger`更加常用。`CroTrigger`是基于`Cron`表达式的。
  * 假如说`*/15 * * * * ?`，这个的意思是每隔`15`秒执行一次方法
* fixedDelay和fixedRate的区别
  * `fixedRate`有一个时刻表的概念，在任务启动时，T1、T2、T3就已经排好了执行的时刻，比如1分、2分、3分，当T1的执行时间大于1分钟时，就会造成T2晚点，当T1执行完时T2立即执行。
  * `fixedDelay`比较简单，表示上个任务结束，到下个任务开始的时间间隔。无论任务执行花费多少时间，两个任务间的间隔始终是一致的。



```
# 修改 task 连接池数，默认 1
spring.task.scheduling.pool.size = 256
```





# Redis

[Redis](https://redis.io/) （Remote Dictionary Server）远程词典服务器，是一个基于内存的键值型 NoSQL 数据库。

特征：

* 键值型，value 支持多种不同的数据结构，功能丰富
* 单线程，每个命令具备原子性
* 低延迟，速度快（基于内存、IO 多路复用、良好的编码）
* 支持数据持久化
* 支持主从集群、分片集群
* 支持多语言客户端



SQL 和 NoSQL 区别：

|          |                        SQL                         |                        NoSQL                         |
| :------- | :------------------------------------------------: | :--------------------------------------------------: |
| 数据结构 |                       结构化                       |                       非结构化                       |
| 数据关联 |                       关联的                       |                       无关联的                       |
| 查询方式 |                      SQL 查询                      |                        非 SQL                        |
| 事务特性 |                        ACID                        |                         BASE                         |
| 存储方式 |                        磁盘                        |                         内存                         |
| 扩展性   |                        垂直                        |                         水平                         |
| 使用场景 | 数据结构固定；相关业务对数据安全性、一致性要求较高 | 数据结构不固定；对一致性，安全性要求不高；对性能要求 |



## 安装和启动

[redis-6.2.14.tar.gz](https://github.com/redis/redis/releases/tag/6.2.14)



```sh
# C语言的gcc依赖
yum install -y gcc tcl

# 将下载的包放到服务器上并解压
tar -zxvf redis-6.2.14.tar.gz
cd redis-6.2.14
make & make install
```

 默认的安装路径 是在 `/usr/local/bin` 目录下，该目录已经默认配置到环境变量，因此可以在任意目录下运行这些命令：

* `redis-cli` ：redis 提供的命令行客户端。`redis-cli [options] [commonds]`
  * 常见的 options 有：
    * `-h 127.0.0.1` ：指定要连接的 redis 节点的 IP 地址，默认是 `127.0.0.1`
    * `-p 6379` ：指定要连接的 redis 节点的端口，默认是6739
    * `-a 123` ：指定 redis 的访问密码
  * commonds 有：
    * `ping` ：与 redis 服务端做心跳测试，服务端正常会返回 `pong`
* `redis-server` ：redis 的服务端启动脚本
* `redis-sentinel` ：redis 的哨兵启动脚本

```sh
redis-cli
redis-cli -h 192.168.235.166 -p 6379 -a 123
redis-cli -h 192.168.235.166 -p 6379 -a 123 ping
```





redis 的启动方式有很多：

* 默认启动 `redis-server`

* 指定配置启动

  * 修改解压目录下的 `redis.conf` 文件，以后台方式启动

    ```sh
    # 进入解压目录
    cp redis.conf redis.conf.bak
    
    # 修改redis.conf后启动redis
    redis-server redis.conf
    
    ps -ef | grep redis
    
    # 停止服务
    kill -9 redis进程
    ```

    ```sh
    # 允许访问的地址，默认是 127.0.0.1，会导致只能在本地访问。修改为 0.0.0.0 则可以在任意IP访问。生产环境不要设置为0.0.0.0
    bind 0.0.0.0
    
    # 守护进程，修改为yes后即可后台运行
    daemonize yes
    
    # 密码，设置后访问redis必须输入密码
    requirepass 123
    ```

    ```sh
    # 其他常用配置
    
    # 监听的端口
    port 6379
    
    # 工作目录，默认是当前目录，也就是运行redis-server时的命令、日志、持久化等文件会保存在这个目录
    dir ./
    
    # 数据库数量，默认有16个库，编号0~15
    databases 16
    
    # 设置redis能够使用的最大内存
    maxmemory 512mb
    
    # 日志文件，默认为空，不记录日志，可以指定日志文件名
    logfile "redis.log"
    
    
    ```

    

* 开机自启

  ```sh
  # 新建一个系统服务文件
  vi /etc/systemd/system/redis.service
  
  # 输入配置内容
  
  # 重载系统服务
  systemctl daemon-reload
  
  systemctl start redis
  systemctl status redis
  systemctl enable redis
  ```

  ```
  [Unit]
  Description=redis-server
  After=network.target
   
  [Service]
  Type=forking
  ExecStart=/usr/local/bin/redis-server /root/redis/redis-6.2.14/redis.conf
  PrivateTmp=true
   
  [Install]
  WantedBy=multi-user.target
  ```

  

## 客户端

* 命令行客户端 `redis-cli`

  ```sh
  redis-cli -h 192.168.235.166 -p 6379 -a 123
  ```

* 图形化桌面客户端 [rdm](https://github.com/lework/RedisDesktopManager-Windows/releases/download/2021.10/rdm-2021.10.zip)

  ```sh
  # 如果无法连接，可以放开端口
  firewall-cmd --zone=public --add-port=6379/tcp --permanent
  firewall-cmd --reload
  ```

* 编程客户端



## 通用命令

通用命令是部分数据类型，都可以使用的命令。常见的有：

* `help [@group | command]` ：查看帮助。
  * `@group` ：Redis 将操作不同数据类型的命令做了分组，通过组名查看分组内的命令。`help @generic` 查看通用命令
  *  `command` ：查看指定命令的具体用法。 `help keys`
* `keys` ：查看符合模板的所有 key
* `del` ：删除一个指定 的 key
* `exists` ：判断 key 是否存在
* `expire` ：给一个 key 设置有效期（秒），到期时该 key 会被自动删除
* `ttl` ：查看一个 key 剩余有效期



```
help 
help @generic
help keys

set k1 aaa
get k1

keys *
keys phone
keys p*

del phone
del k1 k2

exists k1
exists k1 k2	

expire k1 20
ttl k1
```



## 数据结构

Redis 是一个 key-value 的数据库，key 一般是 String 类型，不过 value 的类型多种多样：

* String
* Hash
* List
* Set
* SortedSet
* GEO
* BitMap
* HyperLog



Redis 的 key 允许有多个单词形成层级结构，多个单词之间用 `:` 隔开。例如 `项目名:业务名:类型:id`

```
set goods:1 '{"id":1, "name":"mike"}'
get goods:1
```





### String

字符串类型，其 value 是字符串，不过根据字符串的格式不同，有可以分为3类：

* string ：普通字符串
* int ：整数类型，可以做自增、自减操作
* float ：浮点类型，可以做自增、自减操作

不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同，字符串类型的最大空间不能超过512M。



常见命令：

* `set` ：添加或者修改已经存在的一个 string 类型的键值对
* `get` ：根据 key 获取 string 类型的 value
* `mset` ：批量添加多个 string 类型的键值对
* `mget` ：根据多个 key 获取多个 string 类型的 value
* `incr` ：让一个整型的 key 自增1
* `incrby` ：让一个整型的 key 自增并指定步长
* `incrbyfloat` ：让一个浮点型的数字自增并指定步长
* `setnx` ：添加一个 string 类型的键值对，前提是这个 key 不存在，否则不执行
* `setex` ：添加一个 string 类型的键值对，并且指定有效期



```
set msg hello
set num 10
set score 92.5

get msg

mset k1 aaa k2 bbb
mget k1 k2

incr num
incrby num 2
incrbyfloat score 3

setnx k3 ccc
setex k3 20 abc
```



### Hash

Hash 是一个无序字典，类似于 Java 中的 HashMap 结构。

String 结构是将对象序列化为 JSON 字符串后存储，当需要修改对象某个字段时很不方便。Hash 结构可以将对象中的每个字段独立存储，可以针对单个字段做 CRUD。



常见命令：

* `hset key field value` ：添加或者修改 hash 类型 key 的 field 的值
* `hget key field` ：获取一个 hash 类型 key 的 field 的值
* `hmset` ：批量添加多个 hash 类型 key 的 field 的值。效果同 `hset`
* `hmget` ：批量获取多个 hash 类型 key 的 field 的值
* `hgetall` ：获取一个 hash 类型的 key 中的所有的 field 和 value
* `hkeys` ：获取一个 hash 类型的 key 中的所有的 field
* `hvals` ：获取一个 hash 类型的 key 中的所有的 value
* `hincrby` ：让一个 hash 类型的 key 的字段值自增并指定步长
* `hsetnx` ：添加一个 hash 类型的 key 的 field 值，前提是这个 field 不存在，否则不执行



```
hset goods:1 id 1 name mike
hset goods:1 price 20
hget goods:1 name

hmset goods:1 stock 5 desc niunai
hmget goods:1 id name stock

hgetall goods:1
hkeys goods:1
hvals goods:1

hincrby goods:1 price 2
hsetnx goods:1 remark hhh
```



### List

Redis 中的 List 类型与 Java 中的 LinkedList 类似，可以看做是一个双向链表结构，既可以支持正向检索，也可以支持反向检索。

特征也与 LinkedList 类似：

* 有序
* 元素可以重复
* 插入和删除快
* 查询速度一般

常用于存储一个有序数据，例如：朋友圈点赞列表、评论列表等。



常见命令：

* `lpush key element...` ：向列表左侧插入一个或多个元素
* `lpop key [count]` ：移除并返回列表左侧的第一个元素，没有则返回 `nil`
* `rpush key element...` ：向列表右侧插入一个或多个元素
* `rpop key [count]` ：移除并返回列表右侧的第一个元素
* `lrange key start stop` ：返回一段角标范围内的所有元素
* `blpop` 和 `brpop` ：与 lpop 和 rpop 类似，只不过在没有元素时等待指定时间，而不是直接返回 nil



```
lpush users 1 2 3
rpush users 4 5 6
# 3 2 1 4 5 6

lpop users
rpop users
lpop users 2

lrange users 0 20

blpop users 2
rlpop users 2
```



### Set

Redis 的 Set 结构与 Java 中的 HashSet 类似，可以看做是一个 value 为 null 的HashMap。因为也是一个 hash 表，因此具备与 HashSet 类似的特征：

* 无序
* 元素不可重复
* 查找快
* 支持交集、并集、差集等功能



常见命令：

* `sadd key member...` ：向 set 中添加一个或多个元素
* `srem key member...` ：移除 set 中的指定元素
* `scard key` ：返回 set 中元素的个数
* `sismember key member` ：判断一个元素是否存在于 set 中
* `smembers`  ：获取 set 中所有元素
* `sinter key1 key2` ：求 key1 与 key2 的交集
* `sdiff key1 key2` ：求 key1 与 key2 的差集，只返回 key1 中数据
* `sunion key1 key2` ：求 key1 与 key2 的并集



```
sadd s1 a b c
srem s1 b

scard s1
smembers s1
sismember s1 a

sinter s1 s2
sdiff s1 s2	
sunion s1 s2
```



### SortedSet

Redis 的 SortedSet 是一个可排序的 Set 集合，SortedSet 中的每一个元素都带有一个 score 属性，可以基于 score 属性对元素排序，底层的实现是一个跳表（SkipList）加 hash 表。

SortedSet 具备以下特性：

* 可排序
* 元素不重复
* 查询速度快

因为 SortedSet 的可排序特性，经常被用来实现排行榜这样的功能。



常见命令：

* `zadd key score member` ：添加一个或多个元素到 sorted set，如果已经存在中更新其 score 值
* `zrem key member` ：删除 sorted set 中的一个指定元素
* `zscore key member` ：获取 sorted set 中的指定元素的 score 值
* `zrank key member` ：获取 sorted set 中指定元素的排名
* `zcard key` ：获取 sorted set 中的元素个数
* `zcount key min max` ：统计 score 值在给定范围内的所有元素的个数
* `zincrby key increment member` ：让 sorted set 中的指定元素自增，步长为指定的 incrment 值
* `zranage key min max` ：按照 score 排序后，获取指定排名范围内的元素
* `zrangebyscore key min max` ：按照 score 排序后，获取指定 score 范围内的元素
* `zdiff` 、`zinter` 、`zunion`  ：求差集、交集、并集
  * `zdiff 比较的集合个数 k1 k2 [withscores]` ：集合个数要和key个数一样，withscores 表示也一起输出 score

注意：所有的排名顺序默认都是升序，如果要降序，则在命令的 z 后面添加 rev 即可。



```
zadd users 80 zs 76 ls 99 ww
zrem users ww
zadd users 99 ww
zrank users ls
zrevrank users amy
zcard usersz
zscore users zs

zcount users 60 80
zincrby users 2 zs
zrange users 0 0
zrevrange users 0 2
zrangebyscore users 80 90

zdiff 1 users
zunion 1 users withscores
zinter 2 users users2
```



## Java 客户端

* Jedis ：以 Redis 命令作为方法名称，学习成本低，简单实用。但是 Jedis 实例是线程不安全的，多线程环境下需要基于连接池来使用。
* Lettuce ：Lettuce 是基于 Netty 实现的，支持同步、异步和响应式编程方式。并且是线程安全的。支持 Redis 的哨兵模式、集群模式和管道模式。
* Spring Data Redis ：Jedis + Lettuce
* Redisson ：Redission 是一个基于 Redis 实现的分布式、可伸缩的 Java 数据结构集合。包含了诸多 Map、Queue、Lock、Semaphore、AtomicLong 等强大功能。



### Jedis

#### 使用

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.7.0</version>
</dependency>
```

```java
@SpringBootTest
class RedisApplicationTests {

    private Jedis jedis;

    @BeforeEach
    void setUp() {
        // 建立连接
        jedis = new Jedis("192.168.235.166", 6379);
        // 设置密码
        jedis.auth("123");
        // 选择库
        jedis.select(0);
    }

    @Test
    void testString() {
        // 插入数据
        String result = jedis.set("name", "张三");
        System.out.println(result);

        // 获取数据
        String name = jedis.get("name");
        System.out.println(name);
    }

    @Test
    void testHash() {
        jedis.hset("user:1", "name", "jack");
        jedis.hset("user:1", "age", "18");

        Map<String, String> map = jedis.hgetAll("user:1");
        System.out.println(map);
    }

    @AfterEach
    void tearDown() {
        // 释放资源
        if (jedis != null) {
            jedis.close();
        }
    }

}
```



#### 连接池

Jedis 本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此需要使用 Jedis 连接池代替 Jedis 的直连方式。



```java
public class JedisConnectionFactory {

    private static final JedisPool jedisPool;

    static {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        // 最大连接
        jedisPoolConfig.setMaxTotal(8);
        // 最大空闲连接
        jedisPoolConfig.setMaxIdle(8);
        // 最小空闲连接
        jedisPoolConfig.setMinIdle(0);
        // 设置最长等待时间，ms
        jedisPoolConfig.setMaxWait(Duration.ofMillis(200));
        jedisPool = new JedisPool(jedisPoolConfig, "192.168.235.166", 6379, 1000, "123");
    }

    // 获取Jedis对象
    public static Jedis getJedis() {
        return jedisPool.getResource();
    }

}
```

```java
@SpringBootTest
class RedisApplicationTests {

    private Jedis jedis;

    @BeforeEach
    void setUp() {
        // 建立连接
        // jedis = new Jedis("192.168.235.166", 6379);
        // 设置密码
        // jedis.auth("123");
      
        jedis = JedisConnectionFactory.getJedis();
        // 选择库
        jedis.select(0);
    }

}
```





### SpringDataRedis

SpringData 是 Spring 中数据操作的模块，包含对各种数据库的集成，其中对 Redis 的集成模块就叫做 [SpringDataRedis](https://spring.io/projects/spring-data-redis)。

* 提供了对不同 Redis 客户端的整合（Jedis 和 Lettuce）
* 提供了 RedisTemplate 统一 API 来操作 Redis
* 支持 Redis 的发布订阅模式
* 支持 Redis 哨兵和 Redis 集群
* 支持基于 Lettuce 的响应式编程
* 支持基于 JDK、JSON、字符串、Spring 对象的数据序列化及反序列化
* 支持基于 Redis 的 JDKCollection 实现



SpringDataRedis 中提供了 RedisTemplate 工具类，其中封装了各种对 Redis 的操作，并且将不同数据类型的操作 API 封装到了不同的类型中。

|             API             |   返回值类型    |          说明           |
| :-------------------------: | :-------------: | :---------------------: |
| redisTemplate.opsForValue() | ValueOperations |  操作 String 类型数据   |
| redisTemplate.opsForHash()  | HashOperations  |   操作 Hash 类型数据    |
| redisTemplate.opsForList()  | ListOperations  |   操作 List 类型数据    |
|  redisTemplate.opsForSet()  |  SetOperations  |    操作 Set 类型数据    |
| redisTemplate.opsForZSet()  | ZSetOperations  | 操作 SortedSet 类型数据 |
|        redisTemplate        |                 |       通用的命令        |



#### 使用

1. 新建 spring 项目，勾选 NoSQL → Spring Data Redis (Access+Driver)

2. 配置文件

   ```yaml
   spring:
     redis:
       host: 192.168.235.166
       port: 6379
       password: 123
       lettuce:
         pool:
           max-active: 8   # 最大连接
           max-idle: 8     # 最大空闲连接
           min-idle: 0     # 最小空闲连接
           max-wait: 100   # 连接等待时间
   ```

3. 使用

   ```java
   @SpringBootTest
   class Redis3ApplicationTests {
   
       // 注入RedisTemplate
       @Autowired
       private RedisTemplate redisTemplate;
   
       @Test
       void testString() {
           // 插入一条String类型数据
           redisTemplate.opsForValue().set("name", "李四");
           // 读取一条String类型数据
           Object name = redisTemplate.opsForValue().get("name");
           System.out.println(name);
       }
   
   }
   ```

   



#### 序列化

RedisTemplate 可以接收任意 Object 作为值写入 Redis，只不过写入前会把 Object 序列化为字节形式，默认采用 JDK 序列化，得到的结果是这样的：`\xAC\xED\x00\x05t\x00\x04name`

这样的结果可读性差，内存占用较大。

所以我们可以自定义 RedisTemplate 的序列化方式。



##### 自定义 RedisTemplate

```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        // 创建Template
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        // 设置连接工厂
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        // 设置序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();
        // key和hashKey采用string序列化
        redisTemplate.setKeySerializer(RedisSerializer.string());
        redisTemplate.setHashKeySerializer(RedisSerializer.string());
        // value和hashValue采用JSON序列化
        redisTemplate.setValueSerializer(jsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jsonRedisSerializer);

        return redisTemplate;
    }

}
```

```java
@SpringBootTest
class Redis3ApplicationTests {

    // 注入RedisTemplate
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Test
    void testString() {
        // 插入一条String类型数据
        redisTemplate.opsForValue().set("name", "李四");
        // 读取一条String类型数据
        Object name = redisTemplate.opsForValue().get("name");
        System.out.println(name);
    }

    @Test
    void testSaveUser() {
        redisTemplate.opsForValue().set("user:100", new User("张三", 21));
        User user = (User) redisTemplate.opsForValue().get("user:100");
        System.out.println(user);
    }

}
```

```java
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    private String name;

    private Integer age;

}
```



##### StringRedisTemplate

尽管 JSON 的序列化可以满足我们的需求，但依然存在一些问题。

```json
{
  "@class": "cn.hyh.redis3.demos.web.User",
  "name": "张三",
  "age": 21
}
```

为了在反序列化时知道对象的类型，JSON 序列化器会将类的 Class 类型写入 json 的结果中，存入 Redis，会带来额外的内存开销。

为了节省内存空间，不使用 JSON 序列化器来处理 value，而是统一使用 String 序列化器，要求只能存储 String 类型的 key 和 value。当需要存储 java 对象时，手动完成对象的序列化和反序列化。



Spring 默认提供了一个 StringRedisTemplate 类，它的 key 和 value 的序列化方式默认就是 String 方式，省去了自定义 RedisTemplate 的过程。

```java
@SpringBootTest
class Redis3ApplicationTests {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    // JSON工具
    private static final ObjectMapper mapper = new ObjectMapper();

    @Test
    void testStringTemplate() throws JsonProcessingException {
        User user = new User("张三", 20);
        // 手动序列化
        String json = mapper.writeValueAsString(user);
        // 写入数据
        stringRedisTemplate.opsForValue().set("user:200", json);

        // 读取数据
        String val = stringRedisTemplate.opsForValue().get("user:200");
        // 反序列化
        User user1 = mapper.readValue(val, User.class);
        System.out.println(user1);
    }

    @Test
    void testHash() {
        stringRedisTemplate.opsForHash().put("user:400", "name", "李四");
        stringRedisTemplate.opsForHash().put("user:400", "age", "30");

        Map<Object, Object> entries = stringRedisTemplate.opsForHash().entries("user:400");
        System.out.println(entries);
    }

}
```



## 企业实战



### 短信登录

#### 基于 Session 实现







#### 基于 Redis 实现









































```
        <!-- Redis依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!-- 连接池依赖 -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
        </dependency>
        <!-- Jackson依赖 -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        
```









# TODO http请求封装

文档：https://www.cnblogs.com/liyhbk/p/17010086.html





















































