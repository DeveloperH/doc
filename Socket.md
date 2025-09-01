# Socket



## socket.io

### 什么是 Socket.IO

[Socket.IO](https://socket.io/) 是一个库，可用于在浏览器和服务器之间进行实时，双向和基于事件的通信。其主要特点是：



#### 可靠性

即使存在以下情况，也会建立连接：

* 代理和负载平衡器
* 个人防火墙和防病毒软件

为此，它依赖于 `Engine.IO` ，该引擎首先建立长轮询连接，然后尝试升级到侧面进行"测试"的更好传输，例如 `WebSocket` 。



#### 自动重新连接支持

除非另有指示，否则断开连接的客户端将尝试永久重新连接，直到服务器再次可用为止。



#### 断线检测

心跳机制在 Engine.IO 级别上实现，使服务器和客户端都可以知道对方何时不再响应。

通过在服务器和客户端上设置定时器，并在连接握手期间共享超时值 (pingInterval 和 pingTimeout参数)，可以实现该功能。这些定时器要求将任何后续客户端调用都定向到同一服务器，因此使用多个节点时需要执行粘性会话。



#### 二进制支持

可以发出任何可序列化的数据结构，包括：

* 浏览器中的 `ArrayBuffer` 和 `Blob`
* Node.js 中的 `ArrayBuffer` 和 `Buffer`



#### 多路传输支持

为了在应用程序内创建关注点分离 (例如，每个模块或基于权限)，Socket.IO 允许您创建多个 `Namespaces` ，它们将充当单独的通信通道，但将共享相同的基础连接。



#### 客房支援

在每个 Namespaces 中，您可以定义套接字可以加入和离开的任意通道，成为 `Rooms` 。然后，您可以广播到任何给定的房间，到达已加入该房间的每个插槽。例如 群聊。

这是有用的功能，用于向一组用户或连接到多个设备的给定用户发送通知。

这些功能附带一个简单便捷的 API，如下所示：

```js
io.on("connection", function (socket) {
  socket.emit("request" /* */); // 向套接字发出事件
  io.emit("broadcast" /* */); // 向所有连接的套接字发出事件
  socket.on("reply", function () {
    /* */
  }); // 监听事件
});
```



#### 什么不是 Socket.IO

Socket.IO 不是 WebSocket 实现。尽管 Socket.IO 确实是在可能的情况下使用 WebSocket 作为传输工具，但它会向每个数据包添加一些元数据：当需要消息确认时，数据包类型，名称空间和数据包 ID。这就是为什么 WebSocket 客户端将无法成功连接到 Socket.IO 服务器，而 Socket.IO 客户端也将无法连接到 WebSocket 服务器的原因。



### 安装

#### 服务器

```shell
npm install --save socket.io
```



#### JavaScript 客户端

* 默认情况下，服务器会公开客户端的独立版本 `/socket.io/socket.io.js`
* 也可以从 CDN 提供服务
* 还可以安装 NPM 包 `npm install --save socket.io.client`



### 与 Node http 服务器一起使用

#### 服务器 (app.js)

```js
var app = require("http").createServer(handler);
var io = require("socket.io")(app, { cors: true }); // { cors: true } 配置跨域
var fs = require("fs");

app.listen(80);

function handler(req, res) {
  fs.readFile(__dirname + "/index.html", function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }

    res.writeHead(200);
    res.end(data);
  });
}

// 实时通讯的连接

// io.on("connection", 事件的回调函数)  监听socket的连接事件
io.on("connection", function (socket) {
  // socket.emit() 发送客户端数据
  socket.emit("news", { hello: "world" });
  // socket.on() 监听客户端发送过来的内容
  socket.on("my other event", function (data) {
    console.log(data);
  });
});
```



#### 客户端 (index.html)

```html
<script src="js/socket.io.min.js"></script>
<script>
  var socket = io("http://localhost");
  socket.on("connect", function (data) {
    console.log("连接事件");
    console.log(data);
  });

  socket.on("news", function (data) {
    console.log(data);
  });

  socket.emit("my other event", { name: "张三" });
</script>
```



#### express

```js
var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server, { cors: true });

server.listen(80);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function (data) {
    console.log(data);
  });
});
```













































