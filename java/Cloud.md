# SpringCloud

官网地址：https://spring.io/projects/spring-cloud



## 体系

![image-20240908235456070](http://qiniu.huangyihui.cn/doc/202511250123824.png)



![image-20240908235651191](http://qiniu.huangyihui.cn/doc/202511250124468.png)



## 微服务

- 单体架构：简单方便，高度耦合，扩展性差，适合小型项目。例如：学生管理系统

- 分布式架构：松耦合，扩展性好，但架构复杂，难度大。适合大型互联网项目，例如：京东、淘宝

- 微服务：一种良好的分布式架构方案

  ①优点：拆分粒度更小、服务更独立、耦合度更低

  ②缺点：架构非常复杂，运维、监控、部署难度提高

- SpringCloud 是微服务架构的一站式解决方案，集成了各种优秀微服务功能组件



### 单体架构

将业务的所有功能集中在一个项目中开发，打成一个包部署。

优点：

- 架构简单
- 部署成本低

缺点：

- 耦合度高（维护困难、升级困难）



![image-20210713202807818](http://qiniu.huangyihui.cn/doc/202511250124690.png)



### 分布式架构

根据业务功能对系统做拆分，每个业务功能模块作为独立项目开发，称为一个服务。

优点：

- 降低服务耦合
- 有利于服务升级和拓展

缺点：

- 服务调用关系错综复杂



![image-20210713203124797](http://qiniu.huangyihui.cn/doc/202511250124989.png)





### 微服务架构

微服务的架构特征：

- 单一职责：微服务拆分粒度更小，每一个服务都对应唯一的业务能力，做到单一职责
- 自治：团队独立、技术独立、数据独立，独立部署和交付
- 面向服务：服务提供统一标准的接口，与语言和技术无关
- 隔离性强：服务调用做好隔离、容错、降级，避免出现级联问题



微服务的上述特性其实是在给分布式架构制定一个标准，进一步降低服务之间的耦合度，提供服务的独立性和灵活性。做到高内聚，低耦合。

因此，可以认为**微服务**是一种经过良好架构设计的**分布式架构方案** 。

其中在 Java 领域最引人注目的就是 SpringCloud 提供的方案了。



![image-20210713203753373](http://qiniu.huangyihui.cn/doc/202511250125839.png)





![image-20240908235932510](http://qiniu.huangyihui.cn/doc/202511250125849.png)



### SpringCloud

SpringCloud 是目前国内使用最广泛的微服务框架。官网地址：https://spring.io/projects/spring-cloud。

SpringCloud 集成了各种微服务功能组件，并基于 SpringBoot 实现了这些组件的自动装配，从而提供了良好的开箱即用体验。

其中常见的组件包括：

![image-20210713204155887](http://qiniu.huangyihui.cn/doc/202511250125111.png)



另外，SpringCloud底层是依赖于SpringBoot的，并且有版本的兼容关系，如下：

![image-20210713205003790](http://qiniu.huangyihui.cn/doc/202511250126053.png)



本笔记使用的 SpringBoo t版本是 2.3.x 版本。



## 服务拆分和远程调用

任何分布式架构都离不开服务的拆分，微服务也是一样。

微服务拆分时的几个原则：

- 不同微服务，不要重复开发相同业务
- 微服务数据独立，不要访问其它微服务的数据库
- 微服务可以将自己的业务暴露为接口，供其它微服务调用



![image-20210713210800950](http://qiniu.huangyihui.cn/doc/202511250126058.png)





在服务调用关系中，会有两个不同的角色：

* **服务提供者**：一次业务中，被其它微服务调用的服务。（提供接口给其它微服务）
* **服务消费者**：一次业务中，调用其它微服务的服务。（调用其它微服务提供的接口）

但是，服务提供者与服务消费者的角色并不是绝对的，而是相对于业务而言。服务既可以是服务提供者，也可以是服务消费者。



## Eureka 注册中心

### 作用

![image-20210713220104956](http://qiniu.huangyihui.cn/doc/202511250126181.png)





问题1：order-service如何得知user-service实例地址？

获取地址信息的流程如下：

- user-service服务实例启动后，将自己的信息注册到eureka-server（Eureka服务端）。这个叫服务注册
- eureka-server保存服务名称到服务实例地址列表的映射关系
- order-service根据服务名称，拉取实例地址列表。这个叫服务发现或服务拉取



问题2：order-service如何从多个user-service实例中选择具体的实例？

- order-service从实例列表中利用负载均衡算法选中一个实例地址
- 向该实例地址发起远程调用



问题3：order-service如何得知某个user-service实例是否依然健康，是不是已经宕机？

- user-service会每隔一段时间（默认30秒）向eureka-server发起请求，报告自己状态，称为心跳
- 当超过一定时间没有发送心跳时，eureka-server会认为微服务实例故障，将该实例从服务列表中剔除
- order-service拉取服务时，就能将故障实例排除了



注意：一个微服务，既可以是服务提供者，又可以是服务消费者，因此eureka将服务注册、服务发现等功能统一封装到了eureka-client端。



### 搭建eureka-server

注册中心服务端：eureka-server，这必须是一个独立的微服务。



1. 创建eureka-server服务。在父工程下，创建一个子模块：`eureka-server`

2. 引入SpringCloud为eureka提供的starter依赖

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
   </dependency>
   ```

3. 给eureka-server服务编写一个启动类，一定要添加一个 `@EnableEurekaServer` 注解，开启eureka的注册中心功能：

   ```java
   @SpringBootApplication
   @EnableEurekaServer     // 开启eureka的注册中心功能
   public class EurekaApplication {
       public static void main(String[] args) {
           SpringApplication.run(EurekaApplication.class, args);
       }
   }
   ```

4. 编写配置文件 `application.yml`

   ```yaml
   server:
     port: 10086
   spring:
     application:
       name: eureka-server
   eureka:
     client:
       service-url: 
         defaultZone: http://127.0.0.1:10086/eureka
   ```

5. 启动微服务，然后在浏览器访问：http://127.0.0.1:10086



### 服务注册

将user-service注册到eureka-server中去。



1. 在user-service的pom文件中，引入eureka-client依赖

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   </dependency>
   ```

   

2. 在user-service中，修改application.yml文件，添加服务名称、eureka地址：

   ```yaml
   spring:
     application:
       name: userservice
   eureka:
     client:
       service-url:	# eureka的地址信息
         defaultZone: http://127.0.0.1:10086/eureka
   ```

   

3. 启动多个user-service实例

   ![image-20210713222656562](http://qiniu.huangyihui.cn/doc/202511250126907.png)

   

   ![image-20210713222757702](http://qiniu.huangyihui.cn/doc/202511250126028.png)

   

4. 启动实例后，查看eureka-server管理页面，会发现有两个user-service已经注册到了eureka-server中



### 服务发现

将order-service的逻辑修改：向eureka-server拉取user-service的信息，实现服务发现。

之前说过，服务发现、服务注册统一都封装在eureka-client依赖，因此这一步与服务注册时一致。



1. 在order-service的pom文件中，引入eureka-client依赖

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   </dependency>
   ```

   

2. 在order-service中，修改application.yml文件，添加服务名称、eureka地址：

   ```yaml
   spring:
     application:
       name: orderservice
   eureka:
     client:
       service-url:
         defaultZone: http://127.0.0.1:10086/eureka
   ```

3. 服务拉取和负载均衡

   最后，我们要去eureka-server中拉取user-service服务的实例列表，并且实现负载均衡。

   不过这些动作不用我们去做，只需要添加一些注解即可。

   在order-service的OrderApplication中，给RestTemplate这个Bean添加一个 `@LoadBalanced` 注解：

   ```java
   @MapperScan("cn.demo.order.mapper")
   @SpringBootApplication
   public class OrderApplication {
   
       public static void main(String[] args) {
           SpringApplication.run(OrderApplication.class, args);
       }
   
       @Bean
       @LoadBalanced		// 实现负载均衡功能
       public RestTemplate restTemplate() {
           return new RestTemplate();
       }
   }
   
   ```

   

   修改Service中访问的url路径，用服务名代替ip、端口：

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
   
           // String url = "http://localhost:8081/user/" + order.getUserId();
         
         	// 2.服务名代替ip、端口
           String url = "http://userservice/user/" + order.getUserId();
           User user = restTemplate.getForObject(url, User.class);
           order.setUser(user);
   
           // 3.返回
           return order;
       }
   }
   ```

   spring会自动帮助我们从eureka-server端，根据userservice这个服务名称，获取实例列表，而后完成负载均衡。





## Ribbon负载均衡

添加了 `@LoadBalanced` 注解，即可实现负载均衡功能，这是什么原理呢？



SpringCloud底层其实是利用了一个名为Ribbon的组件，来实现负载均衡功能的。

![image-20210713224517686](http://qiniu.huangyihui.cn/doc/202511250127348.png)



### 源码跟踪

为什么我们只输入了service名称就可以访问了呢？之前还要获取ip和端口。

显然有人帮我们根据service名称，获取到了服务实例的ip和端口。它就是`LoadBalancerInterceptor`，这个类会在对RestTemplate的请求进行拦截，然后从Eureka根据服务id获取服务列表，随后利用负载均衡算法得到真实的服务地址信息，替换服务id。



#### 1）LoadBalancerIntercepor

![1525620483637](http://qiniu.huangyihui.cn/doc/202511250127208.png)



可以看到这里的intercept方法，拦截了用户的HttpRequest请求，然后做了几件事：

- `request.getURI()`：获取请求uri，本例中就是 http://user-service/user/8
- `originalUri.getHost()`：获取uri路径的主机名，其实就是服务id，`user-service`
- `this.loadBalancer.execute()`：处理服务id，和用户请求。

这里的`this.loadBalancer`是`LoadBalancerClient`类型，我们继续跟入。



#### 2）LoadBalancerClient

![1525620787090](http://qiniu.huangyihui.cn/doc/202511250127458.png)

代码是这样的：

- getLoadBalancer(serviceId)：根据服务id获取ILoadBalancer，而ILoadBalancer会拿着服务id去eureka中获取服务列表并保存起来。
- getServer(loadBalancer)：利用内置的负载均衡算法，从服务列表中选择一个。本例中，可以看到获取了8082端口的服务



放行后，再次访问并跟踪，发现获取的是8081：

![1525620835911](http://qiniu.huangyihui.cn/doc/202511250127567.png)

果然实现了负载均衡。



#### 3）负载均衡策略IRule

在刚才的代码中，可以看到获取服务使通过一个`getServer`方法来做负载均衡:

![1525620835911](http://qiniu.huangyihui.cn/doc/202511250129405.png)

![1544361421671](http://qiniu.huangyihui.cn/doc/202511250129841.png)

![1525622652849](http://qiniu.huangyihui.cn/doc/202511250129463.png)

![1525622699666](http://qiniu.huangyihui.cn/doc/202511250129427.png)



这里的rule默认值是一个`RoundRobinRule`，看类的介绍：

![1525622754316](http://qiniu.huangyihui.cn/doc/202511250130519.png)

这不就是轮询的意思嘛。

到这里，整个负载均衡的流程我们就清楚了。



#### 4）总结

SpringCloudRibbon的底层采用了一个拦截器，拦截了RestTemplate发出的请求，对地址做了修改。

![image-20210713224724673](http://qiniu.huangyihui.cn/doc/202511250130191.png)



基本流程如下：

- 拦截我们的RestTemplate请求http://userservice/user/1
- RibbonLoadBalancerClient会从请求url中获取服务名称，也就是user-service
- DynamicServerListLoadBalancer根据user-service到eureka拉取服务列表
- eureka返回列表，localhost:8081、localhost:8082
- IRule利用内置负载均衡规则，从列表中选择一个，例如localhost:8081
- RibbonLoadBalancerClient修改请求地址，用localhost:8081替代userservice，得到http://localhost:8081/user/1，发起真实请求





### 负载均衡策略

负载均衡的规则都定义在IRule接口中，而IRule有很多不同的实现类：

![image-20210713225653000](http://qiniu.huangyihui.cn/doc/202511250130718.png)



不同规则的含义如下：

| **内置负载均衡规则类**    | **规则描述**                                                 |
| ------------------------- | ------------------------------------------------------------ |
| RoundRobinRule            | 简单轮询服务列表来选择服务器。它是Ribbon默认的负载均衡规则。 |
| AvailabilityFilteringRule | 对以下两种服务器进行忽略：   （1）在默认情况下，这台服务器如果3次连接失败，这台服务器就会被设置为“短路”状态。短路状态将持续30秒，如果再次连接失败，短路的持续时间就会几何级地增加。  （2）并发数过高的服务器。如果一个服务器的并发连接数过高，配置了AvailabilityFilteringRule规则的客户端也会将其忽略。并发连接数的上限，可以由客户端的<clientName>.<clientConfigNameSpace>.ActiveConnectionsLimit属性进行配置。 |
| WeightedResponseTimeRule  | 为每一个服务器赋予一个权重值。服务器响应时间越长，这个服务器的权重就越小。这个规则会随机选择服务器，这个权重值会影响服务器的选择。 |
| **ZoneAvoidanceRule**     | 以区域可用的服务器为基础进行服务器的选择。使用Zone对服务器进行分类，这个Zone可以理解为一个机房、一个机架等。而后再对Zone内的多个服务做轮询。 |
| BestAvailableRule         | 忽略那些短路的服务器，并选择并发数较低的服务器。             |
| RandomRule                | 随机选择一个可用的服务器。                                   |
| RetryRule                 | 重试机制的选择逻辑                                           |



默认的实现就是`ZoneAvoidanceRule`，是一种轮询方案。



#### 自定义负载均衡策略

通过定义IRule实现可以修改负载均衡规则，有两种方式：

1. 代码方式：在order-service中的OrderApplication类中，定义一个新的IRule：

```java
@Bean
public IRule randomRule(){
    return new RandomRule();
}
```

代码方式：配置灵活，但修改时需要重新打包发布



2. 配置文件方式：在order-service的application.yml文件中，添加新的配置也可以修改规则：

```yaml
userservice: # 给某个微服务配置负载均衡规则，这里是userservice服务
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule # 负载均衡规则 
```

配置方式：直观，方便，无需重新打包发布，但是无法做全局配置



> **注意**，一般用默认的负载均衡规则，不做修改。



### 饥饿加载

Ribbon默认是采用懒加载，即第一次访问时才会去创建LoadBalanceClient，请求时间会很长。

而饥饿加载则会在项目启动时创建，降低第一次访问的耗时，在order-service的application.yml文件中通过下面配置开启饥饿加载：

```yaml
ribbon:
  eager-load:
    enabled: true # 开启饥饿加载
    clients: # 指定饥饿加载的服务名称
      - userservice
```



## Nacos注册中心

[Nacos](https://nacos.io/)是阿里巴巴的产品，现在是[SpringCloud](https://spring.io/projects/spring-cloud)中的一个组件。相比[Eureka](https://github.com/Netflix/eureka)功能更加丰富，在国内受欢迎程度较高。



### Nacos 安装

#### Windows安装

1. 下载安装包

   在Nacos的GitHub页面，提供有下载链接，可以下载编译好的Nacos服务端或者源代码：

   GitHub的Release下载页：https://github.com/alibaba/nacos/releases

   windows版本使用`nacos-server-1.4.1.zip`包即可。

   

2. 将这个包解压到任意非中文目录下。

   目录说明：

   - bin：启动脚本
   - conf：配置文件

   

3. 端口配置

   Nacos的默认端口是8848，如果你电脑上的其它进程占用了8848端口，请先尝试关闭该进程。

   **如果无法关闭占用8848端口的进程**，也可以进入nacos的conf目录，修改 `application.properties` 配置文件中的端口：`server.port=8848`

   

4. 启动。进入bin目录，执行命令 `startup.cmd -m standalone`

5. 在浏览器输入地址：http://127.0.0.1:8848/nacos 即可访问。默认的账号和密码都是nacos。



#### Linux安装

Linux或者Mac安装方式与Windows类似。

Nacos依赖于JDK运行，所以Linux上也需要安装JDK才行。



安装 JDK：

1. 将jdk安装包上传到某个目录，例如：`/usr/local/`

2. 解压缩：`tar -xvf jdk-8u144-linux-x64.tar.gz` ，然后重命名为java

3. 配置环境变量：

   ```sh
   export JAVA_HOME=/usr/local/java
   export PATH=$PATH:$JAVA_HOME/bin
   ```

4. 设置环境变量：`source /etc/profile`



安装 Nacos：

1. 上传Nacos压缩包到Linux服务器的某个目录，例如`/usr/local/src`目录下
2. 解压缩安装包 `tar -xvf nacos-server-1.4.1.tar.gz`
3. 删除安装包 `rm -rf nacos-server-1.4.1.tar.gz`
4. 端口配置，与windows中类似
5. 在nacos/bin目录中，输入命令启动Nacos：`sh startup.sh -m standalone`
6. 如果无法在外部访问nacos控制台，可以尝试关闭防火墙 `systemctl stop firewalld`





### 服务注册

Nacos是SpringCloudAlibaba的组件，而SpringCloudAlibaba也遵循SpringCloud中定义的服务注册、服务发现规范。因此使用Nacos和使用Eureka对于微服务来说，并没有太大区别。

主要差异在于：

- 依赖不同
- 服务地址不同



1. 引入依赖

   父工程：在cloud-demo父工程的pom文件中的`<dependencyManagement>`中引入SpringCloudAlibaba的依赖：

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-alibaba-dependencies</artifactId>
       <version>2.2.6.RELEASE</version>
       <type>pom</type>
       <scope>import</scope>
   </dependency>
   ```

   客户端：然后在user-service和order-service中的pom文件中引入nacos-discovery依赖：

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
   </dependency>
   ```

   **注意**：不要忘了注释掉eureka的依赖。

   

2. 配置nacos地址

   在user-service和order-service的application.yml中添加nacos地址：

   ```yaml
   spring:
     cloud:
       nacos:
         server-addr: localhost:8848  # nacos服务地址
   ```

   **注意**：不要忘了注释掉eureka的地址

   

3. 重启微服务后，登录nacos管理页面，可以看到微服务信息





### 服务分级存储模型

一个**服务**可以有多个**实例**，例如我们的user-service，可以有:

- 127.0.0.1:8081
- 127.0.0.1:8082
- 127.0.0.1:8083

假如这些实例分布于全国各地的不同机房，例如：

- 127.0.0.1:8081，在上海机房
- 127.0.0.1:8082，在上海机房
- 127.0.0.1:8083，在杭州机房

Nacos就将同一机房内的实例 划分为一个**集群**。

也就是说，user-service是服务，一个服务可以包含多个集群，如杭州、上海，每个集群下可以有多个实例，形成分级模型。`服务 > 集群 > 实例`。

微服务互相访问时，应该尽可能访问同集群实例，因为本地访问速度更快。当本集群内不可用时，才访问其它集群。

![image-20210713232522531](http://qiniu.huangyihui.cn/doc/202511250130596.png)





#### 配置集群

修改user-service的application.yml文件，添加集群配置：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```



我们再次复制一个user-service启动配置，添加属性：

```sh
-Dserver.port=8083 -Dspring.cloud.nacos.discovery.cluster-name=SH
```



启动全部user-service后再次查看nacos控制台，可以看到已经分成了多个集群。



#### 同集群优先的负载均衡

默认的`ZoneAvoidanceRule`并不能实现根据同集群优先来实现负载均衡。

因此Nacos中提供了一个`NacosRule`的实现，可以优先从同集群中挑选实例。本地集群找不到提供者，才去其它集群寻找，并且会报警告。确定了可用实例列表后，再采用随机负载均衡挑选实例。



1. 给order-service配置集群信息

   修改order-service的application.yml文件，添加集群配置：

   ```yaml
   spring:
     cloud:
       nacos:
         server-addr: localhost:8848
         discovery:
           cluster-name: HZ # 集群名称
   ```

2. 修改负载均衡规则

   修改order-service的application.yml文件，修改负载均衡规则：

   ```yaml
   userservice:
     ribbon:
       NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule # 负载均衡规则 
   ```





### 权重配置

服务器设备性能有差异，部分实例所在机器性能较好，另一些较差，我们希望性能好的机器承担更多的用户请求。

但默认情况下NacosRule是同集群内随机挑选，不会考虑机器的性能问题。

因此，Nacos提供了权重配置来控制访问频率，权重越大则访问频率越高。权重范围在0~1。

在nacos控制台，找到user-service的实例列表，点击编辑，即可修改权重。

**注意**：如果权重修改为0，则该实例永远不会被访问。



### 环境隔离

Nacos提供了namespace来实现环境隔离功能。

- nacos中可以有多个namespace
- namespace下可以有group、service等
- 不同namespace之间相互隔离，例如不同namespace的服务互相不可见



1. 创建namespace。

   默认情况下，所有service、data、group都在同一个namespace，名为public。

   我们可以点击页面新增按钮，添加一个namespace。

2. 给微服务配置namespace

   修改order-service的application.yml文件：

   ```yaml
   spring:
     cloud:
       nacos:
         server-addr: localhost:8848
         discovery:
           cluster-name: HZ
           namespace: 492a7d5d-237b-46a1-a99a-fa8e98e4b0f9 # 命名空间，填ID
   ```

3. 重启order-service后，再访问order-service，因为namespace不同，会导致找不到userservice，控制台会报错



### Nacos与Eureka的区别

Nacos的服务实例分为两种类型：

- 临时实例：如果实例宕机超过一定时间，会从服务列表剔除，默认的类型。

- 非临时实例：如果实例宕机，不会从服务列表剔除，也可以叫永久实例。



配置一个服务实例为永久实例：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false # 设置为非临时实例
```



Nacos和Eureka整体结构类似，服务注册、服务拉取、心跳等待，但是也存在一些差异：

![image-20210714001728017](http://qiniu.huangyihui.cn/doc/202511250130024.png)



- Nacos与eureka的共同点
  - 都支持服务注册和服务拉取
  - 都支持服务提供者心跳方式做健康检测

- Nacos与Eureka的区别
  - Nacos支持服务端主动检测提供者状态：临时实例采用心跳模式，非临时实例采用主动检测模式
  - 临时实例心跳不正常会被剔除，非临时实例则不会被剔除
  - Nacos支持服务列表变更的消息推送模式，服务列表更新更及时
  - Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式

































