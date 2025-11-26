# 开发

API文档(MDN)：https://developer.mozilla.org/zh-CN/



## URI 编码

* `encodeURI(URI)` ：对统一资源标识符 (URI  UniformResourceIdentifier) 进行编码，但不会对属于 URL 组件的特殊字符进行编码，例如  
  * 保留字符：`; , / ? : @ & = + $`
  * 非转义的字符：字母 数字 `- _ . ! ~ * ' ( )`
  * 数字符号：`#`
* `encodeURIComponent(URI)` ：对统一资源标识符 (URI) 进行编码
* `decodeURI(URI)` ：解码统一资源标识符，但不能解码那些不会被 encodeURI 编码的内容（例如 "#"）。
* `decodeURIComponent(URI)` ：解码统一资源标识符



包含中文的URL问题：

```js
var s1 = encodeURI('你好')  // 把字符串作为 URI 进行编码
console.log(s1)
var s2 = decodeURI(s1)  // 解码 URI
console.log(s2)
```



## 获取输入框中选中的文本

```js
window.onload = function(){
  elem = document.getElementById('p2')
  elem.addEventListener('select', function(){
    var res = elem.value.substring(elem.selectionStart, elem.selectionEnd)
    console.log(res)
  })
}
```







## 跨域

在开发过程中，经常会出现需要访问别人的服务器，从第三方拉取数据，但是受到W3C的同源策略影响，并不能正常获取到数据。

为了解决这个问题，就产生了以下这几种方案。



### 同源策略

同源策略（Same origin policy）是一个重要的安全策略，它用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

同源是指**"协议+域名+端口"三者相同**，即便两个不同的域名指向同一个 ip 地址，也非同源。

同源策略是浏览器的行为，是为了保护本地数据不被JavaScript代码获取回来的数据污染，因此拦截的是客户端发出的请求回来的数据接收，即请求发送了，服务器响应了，但是无法被浏览器接收。



### JSONP

JSONP(JSON with Padding)是JSON的一种"使用模式"，理解为一个包裹着的json，可用于解决主流浏览器的跨域数据访问的问题。



原理: 利用`<script>`标签的`src属性`可以请求一个非同源的地址的特性，请求成功后会将响应的内容当成js代码直接运行。因为`<script>`标签本来就是加载后会自动运行的。

所以，可以在服务端的响应中填充需要获取的数据，并通过在URL中指定处理数据的方法。当响应成功后，就可以拿到需要的数据了。



缺点：

- 只能发送 get 请求 不支持 post、put、delete；
- 不安全，容易引发 xss 攻击，别人在返回的结果中返回了恶意代码。



```html
<!-- 客户端index.html -->
<script>
  // 创建方法用来接受和处理返回的数据
  function getData(data){
    console.log(data)
  }
</script>
<script src="http://localhost:8080/api/data?cb=getData"></script>
```

```js
// 服务端server.js
const http  = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  let urlStr = req.url
  let urlObj = url.parse(urlStr, true)  // 将请求的URL解析成对象
  // console.log(urlObj)
  switch(urlObj.pathname){
    case '/api/data':
      // 客户端会把返回的内容当成js代码直接运行
      res.write(`${urlObj.query.cb}("hello")`)	// 等同于运行getData()
      break
    default:
      res.write('page not found')
  }
  res.end()
})

server.listen(8080, ()=>{
  console.log('localhost:8080')
})
```





### CORS

CORS是一个W3C标准，全称是"跨域资源共享"(Cross-origin resource sharing)。CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

实现CORS通信的关键是服务器，只要服务器实现了CORS接口，就可以跨源通信。



浏览器禁止非同源访问，如果在头信息中设置了哪些源可以访问，浏览器检测到则不阻拦，解决同源策略。

原理: 在服务端设置响应头为 `'Access-Control-Allow-Origin' : '*'` 

```html
<!-- 客户端index.html -->
<script>
  fetch('http://localhost:8080/api/data')
    .then(response => response.json())
    .then(result => console.log(result))
</script>
```

```js
// 服务端server.js
const http  = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  let urlStr = req.url
  let urlObj = url.parse(urlStr, true)  // 将请求的URL解析成对象
  console.log(urlObj)
  switch(urlObj.pathname){
    case '/api/data':
      // 设置响应头
      res.writeHead(200, {
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin' : '*'
      })
      res.write('{"ret": true, "data": "hello"}')
      break
    default:
      res.write('page not found')
  }
  res.end()
})

server.listen(8080, ()=>{
  console.log('localhost:8080')
})
```



CORS请求默认不发送Cookie和HTTP认证信息，如果要把Cookie发到服务器，一方面要服务器同意，指定 `Access-Control-Allow-Credentials` 字段。另一方面，开发者必须在AJAX请求中打开 `withCredentials` 属性。否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。

```js
// 服务端
res.writeHead(200, {
	// 设置可以资源共享的路径是谁(访问-控制-允许-来源)，*表示允许全部来源地址
  'Access-Control-Allow-Origin' : '*',
  // 设置认证信息，作用:携带Cookie
  'Access-Control-Allow-Credentials' : 'true'
})
```

```js
// 浏览器
// 如果服务器已经让携带Cookie，浏览器还是不会携带必须添加认证信息。浏览器再次访问才会携带Cookie
xhrFields: {
	withCredentials: true
}
```





### 第三方插件

在NodeJS中可以通过中间件 `http-proxy-middleware` 实现正向代理。

1、安装 `http-proxy-middleware` 

```bash
npm install http-proxy-middleware
```

2、配置正向代理

```js
const http  = require('http')
const { createProxyMiddleware} = require('http-proxy-middleware')

const server = http.createServer((req, res) => {
  let url = req.url

  if(/\/api/.test(url)){
    const proxy = createProxyMiddleware('/api', {
      target: 'https://www.huangyihui.cn:',
      changeOrigin: true
    })

    proxy(req, res)
  }else{
    console.log('error')
  }
  
})

server.listen(8080, ()=>{
  console.log('localhost:8080')
})
```



## 数据存储

常见的浏览器数据存储方案：localStorage、sessionStorage、IndexedDB、Cookies。



### localStorage / sessionStorage

Web Storage 提供了两个 API 来获取和设置纯字符串的键值对：

- `localStorage`：用于存储持久数据，除非用户手动将其从浏览器中删除，否则数据将终身存储。即使用户关闭窗口或选项卡，它也不会过期；
- `sessionStorage`：用于存储临时会话数据，页面重新加载后仍然存在，关闭浏览器选项卡时数据丢失。不同选项卡中的数据不互通。



Web Storage 使用了同源策略，也就是说，存储的数据只能在同一来源上可用。如果域和子域相同，则可以从不同的选项卡访问 localStorage 数据，而无法访问 sessionStorage 数据，即使它是完全相同的页面。

**另外：**

- 无法在 web worker 或 service worker 中访问 Web Storage；
- 如果浏览器设置为隐私模式，将无法读取到 Web Storage；
- Web Storage 很容易被 XSS 攻击，敏感信息不应存储在本地存储中；
- 它是同步的，这意味着所有操作都是一次一个。对于复杂应用，它会减慢应用的运行时间。



#### 方法和属性

Web Storage API 由 4 个方法 `setItem()`、`getItem()`、`removeItem()` 、`clear()`、`key()`和一个 `length` 属性组成，以 localStorage 为例：

- `setItem()` ：用于存储数据，它有两个参数，即`key`和`value`。使用形式：`localStorage.setItem(key, value)`；
- `getItem()`：用于检索数据，它接受一个参数 key，即需要访问其值的键。使用形式：`localStorage.getItem(key)`;
- `removeItem()`：用于删除数据，它接受一个参数 key，即需要删除其值的键。使用形式：`localStorage.removeItem(key)`;
- `clear()` ：用于清除其中存储的所有数据，使用形式：`localStorage.clear()`;
- `key()`：该方法用于获取 localStorage 中数据的所有key，它接受一个数字作为参数，该数字可以是 localStorage 项的索引位置。



```js
console.log(typeof window.localStorage); // Object

// 存储数据
localStorage.setItem("colorMode", "dark");
localStorage.setItem("username", "zhangsan");
localStorage.setItem("favColor", "green");

console.log(localStorage.length); // 3

// 检索数据
console.log(localStorage.getItem("colorMode")); // dark

// 移除数据
localStorage.removeItem("colorMode");
console.log(localStorage.length); // 2
console.log(localStorage.getItem("colorMode")); // null

// 检索键名
console.log(localStorage.key(0)); // username

// 清空本地存储
localStorage.clear();
console.log(localStorage.length); // 0
```

localStorage 和 sessionStorage 都非常适合缓存非敏感应用数据。可以在需要存储少量简单值并不经常访问它们是使用它们。它们本质上都是**同步**的，并且会阻塞主 UI 线程，所以应该谨慎使用。



#### 存储事件

我们可以在浏览器上监听 localStorage 和 sessionStorage 的存储变化。storage 事件在创建、删除或更新项目时触发。侦听器函数在事件中传递，具有以下属性：

- `newValue`：当在存储中创建或更新项目时传递给 setItem() 的值。当从存储中删除项目时，此值设置为 null。
- `oldValue`：创建新项目时，如果该键存在于存储中，则该项目的先前的值。
- `key`：正在更改的项目的键，如果调用 .clear()，则值为 null。
- `url`：执行存储操作的 URL。
- `storageArea`：执行操作的存储对象（localStorage 或 sessionStorage）。

通常，我们可以使用 `window.addEventListener("storage", func)` 或使用 `onstorage` 属性（如 `window.onstorage = func`）来监听 `storage` 事件：



```js
window.addEventListener("storage", (e) => {
  console.log(e.key);
  console.log(e.oldValu);
  console.log(e.newValue);
});

window.onstorage = (e) => {
  console.log(e.key);
  console.log(e.oldValu);
  console.log(e.newValue);
};
```

注意，该功能不会在发生更改的同一浏览器选项卡上触发，而是由同一域的其他打开的选项卡或窗口触发。此功能用于同步同一域的所有浏览器选项卡/窗口上的数据。因此，要对此进行测试，**需要打开同一域的另一个选项卡**。



#### 存储限制

localStorage 和 sessionStorage 只能存储 5 MB 的数据，因此需要确保存储的数据不会超过此限制。

```js
// 报错：超出配额 Uncaught DOMException: Failed to execute 'setItem' on 'Storage': Setting the value of `a` exceeded the quota.
localStorage.setItem('a', Array(1024 * 1024 * 5).join('a'))
localStorage.setItem('b', 'a')
```



localStorage 和 sessionStorage 只接受字符串。可以通过 `JSON.stringify` 和 `JSON.parse` 来解决这个问题。

如果我们直接将一个对象存储在 localStorage 中，那将会在存储之前进行隐式类型转换，将对象转换为字符串，再进行存储：

```js
const user = {
  name : "zhangsan",
  age : 28,
  gender : "male"
};

localStorage.setItem("user", JSON.stringify(user));
localStorage.getItem("user");   // '{"name":"zhangsan","age":28,"gender":"male"}'
JSON.parse(localStorage.getItem("user"))  // {name: 'zhangsan', age: 28, gender: 'male'}


localStorage.setItem("user", user);
localStorage.getItem("user");  // '[object Object]'
```



### Cookie

Cookie 主要用于身份验证和用户数据持久性。Cookie 与请求一起发送到服务器，并在响应时发送到客户端；因此，cookies 数据在每次请求时都会与服务器交换。服务器可以使用 cookie 数据向用户发送个性化内容。严格来说，cookie 并不是客户端存储方式，因为服务器和浏览器都可以修改数据。它是唯一可以在一段时间后自动使数据过期的方式。



每个 HTTP 请求和响应都会发送 cookie 数据。存储过多的数据会使 HTTP 请求更加冗长，从而使应用比预期更慢：

- 浏览器限制 cookie 的大小最大为4kb，特定域允许的 cookie 数量为 20 个，并且只能包含字符串；
- cookie 的操作是同步的；
- 不能通过 web workers 来访问，但可以通过全局 window 对象访问；
- 不应该在cookie中存储用户ID或者任何个人信息。



Cookie 通常用于会话管理、个性化以及跨网站跟踪用户行为。我们可以通过服务端和客户端设置和访问 cookie。Cookie 还具有各种属性，这些属性决定了在何处以及如何访问和修改它们，

Cookie 分为两种类型：

- **会话 Cookie**：没有指定 Expires 或 Max-Age 等属性，因此在关闭浏览器时会被删除；
- **持久性 Cookie**：指定 Expires 或 Max-Age 属性。这些 cookie 在关闭浏览器时不会过期，但会在特定日期 (Expires) 或时间长度 (Max-Age) 后过期。



#### 客户端（浏览器）

客户端 JavaScript 可以通过 `document.cookie` 来读取当前位置可访问的所有 cookie。它提供了一个字符串，其中包含一个以分号分隔的 cookie 列表，使用 key=value 格式。

设置cookie也是用key=value格式的字符串，属性用分号隔开。

```js
document.cookie;
document.cookie = "hello=world;cookie1=zhangsan;";
```



#### 服务器（Node.js）

服务端可以通过 HTTP 请求的请求头和响应头来访问和修改 cookie。每当浏览器向服务端发送 HTTP 请求时，它都会使用 cookie 头将所有相关 cookie 都附加到该站点。请求标头是一个分号分隔的字符串。

这样就可以从请求头中读取这些 cookie。如果在服务端使用 Node.js，可以像下面这样从请求对象中读取它们，将获得以分号分隔的 key=value 对：

```js
http.createServer(function (request, response) {
  const cookies = request.headers.cookie;
  // "cookie1=value1; cookie2=value2"
  ...
}).listen(8124);
```

如果想要设置 cookie，可以在响应头中添加 Set-Cookie 头，其中 cookie 采用 key=value 的格式，属性用分号分隔：

```js
response.writeHead(200, {
  'Set-Cookie': 'mycookie=test; domain=example.com; Secure'
});
```



通常我们不会直接编写 Node.js，而是与 `ExpressJS` 这样的 Node.js 框架一起使用。使用 Express 可以更轻松地访问和修改 cookie。只需添加一个像 `cookie-parser` 这样的中间件，就可以通过 req.cookies 以 JavaScript 对象的形式获得所有的 cookie。还可以使用 Express 内置的 res.cookie() 方法来设置 cookie：

```js
const express = require('express')
const cookieParser = require('cookie-parser')
    
const app = express()
app.use(cookieParser())
    
app.get('/', function (req, res) {
  console.log('Cookies: ', req.cookies)
  // Cookies: { cookie1: 'value1', cookie2: 'value2' }

  res.cookie('name', 'tobi', { domain: 'example.com', secure: true })
})
    
app.listen(8080)
```



#### 属性

* Domain ：告诉浏览器允许哪些主机访问 cookie。如果未指定，则默认为设置 cookie 的同一主机。因此，当使用客户端 JavaScript 访问 cookie 时，只能访问与 URL 域相同的 cookie。同样，只有与 HTTP 请求的域共享相同域的 cookie 可以与请求头一起发送到服务端。
  * 此属性存在的唯一原因就是**减少域的限制并使 cookie 在子域上可访问**。例如，如果当前的域是 abc.xyz.com，并且在设置 cookie 时如果不指定 Domain 属性，则默认为 abc.xyz.com，并且 cookie 将仅限于该域。但是，可能希望相同的 cookie 也可用于其他子域，因此可以设置 Domain=xyz.com 以使其可用于其他子域，如 def.xyz.com 和主域 xyz.com。
* Path ：指定访问 cookie 必须存在的请求 URL 中的路径。除了将 cookie 限制到域之外，还可以通过路径来限制它。路径属性为 Path=/store 的 cookie 只能在路径 /store 及其子路径 /store/cart、/store/gadgets 等上访问。
* Expires/Max-size ：用来设置 cookie 的过期时间。若设置其值为一个时间，那么当到达此时间后，cookie 就会失效。不设置的话默认值是 Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页) 后，cookie 就会失效。
  * 除此之外，它还可以通过将过期日期设置为过去来删除 cookie。
* Secure ：具有 Secure 属性的 cookie 仅可以通过安全的 HTTPS 协议发送到服务器，而不会通过 HTTP 协议。这有助于通过使 cookie 无法通过不安全的连接访问来防止中间人攻击。除非网站实用不安全的 HTTP 连接，否则应该始终将此属性与所有 cookie 一起使用。
* HTTPOnly ：此属性使 cookie 只能通过服务端访问。因此，只有服务端可以通过响应头设置它们，然后浏览器会将它们与每个后续请求的头一起发送到服务器，并且它们将无法通过客户端 JavaScript 访问。



#### 工具库

* [js-cookie](https://www.npmjs.com/package/js-cookie) 浏览器
* [cookie](https://www.npmjs.com/package/cookie) NodeJS



### IndexedDB

IndexedDB 提供了一个类似 NoSQL 的 key/value 数据库，它可以存储大量结构化数据，甚至是文件和 blob。每个域至少有 1GB 的可用空间，并且最多可以达到剩余磁盘空间的 60%。[查看文档](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)



#### 术语

- **数据库：** 一个域可以创建任意数量的 IndexedDB 数据库，只有同一域内的页面才能访问数据库。
- **object store**：相关数据项的 key/value 存储。它类似于 MongoDB 中的集合或关系数据库中的表。
- **key**：用于引用 object store 中每条记录（值）的唯一名称。它可以使用自动增量数字生成，也可以设置为记录中的任何唯一值。
- **index**：在 object store 中组织数据的另一种方式。搜索查询只能检查 key 或 index。
- schema：事务。用于创建object store、key 和 index 的定义。
- **version**：分配给 schema 的版本号（整数）。IndexedDB 提供自动版本控制，因此可以将数据库更新到最新 schema。
- **操作**：数据库活动，例如创建、读取、更新或删除记录。



#### 特点及使用场景

**indexedDB 特点如下：**

- 可以将任何 JavaScript 类型的数据存储为键值对，例如对象（blob、文件）或数组等。
- IndexedDB API 是异步的，不会在数据加载时停止页面的渲染。
- 可以存储结构化数据，例如 Date、视频、图像对象等。
- 支持数据库事务和版本控制。
- 可以存储大量数据。
- 可以在大量数据中快速定位/搜索数据。
- 数据库是域专用的，因此任何其他站点都无法访问其他网站的 IndexedDB 存储，这也称为同源策略。

**IndexedDB 使用场景：**

- **存储用户生成的内容：** 例如表单，在填写表单的过程中，用户可以离开并稍后再回来完成表单，存储之后就不会丢失初始输入的数据。
- **存储应用状态：** 当用户首次加载网站或应用时，可以使用 IndexedDB 存储这些初始状态。可以是登录身份验证、API 请求或呈现 UI 之前所需的任何其他状态。因此，当用户下次访问该站点时，加载速度会增加，因为应用已经存储了状态，这意味着它可以更快地呈现 UI。
- **对于离线工作的应用：** 用户可以在应用离线时编辑和添加数据。当应用程序来连接时，IndexedDB 将处理并清空同步队列中的这些操作。



#### 操作

不同浏览器的 IndexedDB 可能使用不同的名称。可以使用以下方法检查 IndexedDB 支持：

```js
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("不支持 IndexedDB");
}
```



可以使用 `indexedDB.open()` 来连接数据库：

```js
// 连接数据库
const dbOpen = indexedDB.open('performance', 1);
```

`indexedDB.open` 的第一个参数是数据库名称，第二个参数是可选的版本整数(版本不存在则报错)。

可以使用以下三个事件处理函数监听 indexedDB 的连接状态：



* onerror ：在无法建立 IndexedDB 连接时，将触发该事件。
  * 如果在无痕模式、隐私模式下运行浏览器，可能不支持 IndexedDB，需要禁用这些模式。
* onupgradeneeded ：当你创建一个新的数据库或者增加已存在的数据库的版本号时就会触发。事件可用于创建 object store（表）。
* onsuccess ：在连接建立并且所有升级都完成时，将触发该事件。可以在onsuccess 中添加、查询数据。



```js
// 连接失败
dbOpen.onerror = e => {
  reject(`IndexedDB error: ${ e.target.errorCode }`);
};
```



keyPath是 IndexedDB 将用来识别对象字段名称，通常是一个唯一的编号，也可以通过 `autoIncrement: true` 来自动为 store 设置唯一递增的 ID。除了普通的索引，还可以创建复合索引，使用多个关键词的组合进行查询。

```js
// 数据库连接打开
dbOpen.onupgradeneeded = (e) => {
  const db = dbOpen.result;

  // 创建 object store(表/数据集合)
  const store = db.createObjectStore("cars", { keyPath: "id" });
  // autoIncrement: true 使用自动递增的id
  // const store = db.createObjectStore('cars', { autoIncrement: true });

  // 创建索引
  store.createIndex("cars_colour", ["colour"], {
    unique: false, // 如果为true，索引将不允许单个键有重复的值。默认为false。
  });

  // 创建复合索引
  store.createIndex("colour_and_make", ["colour", "make"], {
    unique: false,
  });
};
```



```js
// 连接成功
dbOpen.onsuccess = () => {
  let db = dbOpen.result;

  // 1 为了对数据库执行操作，我们必须创建一个 schema(事务)，一个 schema 可以是单个操作，也可以是多个必须全部成功的操作，否则都不会成功；
  const transaction = db.transaction("cars", "readwrite");

  // 2.1 获取 cars 表的引用
  const store = transaction.objectStore("cars");
  // 2.2 获取对应的索引
  const colourIndex = store.index("cars_colour");
  const makeModelIndex = store.index("colour_and_make");

  // 3 put 方法用于将数据添加到数据库中
  store.put({ id: 1, colour: "Red", make: "Toyota" });
  store.put({ id: 2, colour: "Red", make: "Kia" });
  store.put({ id: 3, colour: "Blue", make: "Honda" });
  store.put({ id: 4, colour: "Silver", make: "Subaru" });

  // 4.1 使用 keyPath 的值直接查询项目
  const idQuery = store.get(4);
  // 4.2 根据 cars_colour 索引来搜索 Red，将返回一个包含它找到的每个结果的数组
  const colourQuery = colourIndex.getAll(["Red"]);
  // 4.3 根据复合索引查找颜色为Blue，并且品牌为 Honda 的结果
  const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]);

  idQuery.onerror = function (e) {
    console.log("err", e);
  };

  // 5 搜索成功的事件处理函数，它们将在查询完成时触发。
  idQuery.onsuccess = function () {
    console.log("idQuery", idQuery.result);
  };
  colourQuery.onsuccess = function () {
    console.log("colourQuery", colourQuery.result);
  };
  colourMakeQuery.onsuccess = function () {
    console.log("colourMakeQuery", colourMakeQuery.result);
  };

  // 6 最后，在事务完成时关闭与数据库连接。无需使用 IndexedDB 手动触发事务，它会自行运行。
  transaction.oncomplete = function () {
    db.close();
  };
};
```



更新数据：首先使用个 get 来获取需要更新的数据，然后使用 store 上的 put 方法更新现有数据。put 是一种“插入或更新”方法，它要么覆盖现有数据，要么在新数据不存在时插入新数据。

```js
let store = dbOpen.result.transaction("cars", "readwrite").objectStore("cars")

// 更新数据
let row = store.get(4)
row.onsuccess= ()=> {
  row.result.colour = "Green";
  store.put(row.result);
}


// 删除数据
let deleteCar = store.delete(3) // 根据主键的值删除
deleteCar.onsuccess= ()=> {
  console.log('Removed')
}

// 先通过对应数据，再根据这个数据的主键值删除
const colourIndex = store.index("cars_colour");
const redCarKey = colourIndex.getKey(["Red"]);
redCarKey.onsuccess = function () {
  const deleteCar = store.delete(redCarKey.result);

  deleteCar.onsuccess = function () {
    console.log("Removed");
  };
};
```





### 存储空间分析

可以使用基于 Promise 的 Storage API 检查 Web Storage、IndexedDB 和 Cache API 的剩余空间。异步 `.estimate()` 方法返回：

- `quota` 属性：可用的空间；
- `usage` 属性：已用的空间。

需在 HTTPS 下才能访问 `navigator.storage`

```js
(async () => {
  if (!navigator.storage) return;

  const storage = await navigator.storage.estimate();

  console.log(`可用大小: ${ storage.quota / 1024 } Kb`);
  console.log(`已用大小: ${ storage.usage / 1024 } Kb`);
  console.log(`已用占比: ${ Math.round((storage.usage / storage.quota) * 100) }%`);
  console.log(`剩余大小: ${ Math.floor((storage.quota - storage.usage) / 1024) } Kb`);
})();
```



## HTTP 状态码

当我们在浏览器输入URL并按下Enter键时，浏览器就会向站点的服务器发送一个HTTP请求，服务器接收并处理请求，然后将相关资源和HTTP标头一起返回。

状态码就是让我们知道 HTTP 请求是成功、失败还是其他。HTTP状态码通常分为五类：

| **类别** | **定义**                        | **描述**                   |
| :------- | :------------------------------ | :------------------------- |
| 1xx      | Informational(信息性状态码)     | 接受的请求正在处理         |
| 2xx      | Success(成功状态码)             | 请求正常处理完毕           |
| 3xx      | Redirection(重定向状态码)       | 需要进行附加操作来完成请求 |
| 4xx      | Client Error (客户端错误状态码) | 服务器无法处理请求         |
| 5xx      | Server Error(服务器错误状态码)  | 服务器处理请求出错         |



### 1xx Informational

1XX的状态码是在HTTP/1.1 中引入的，它们是信息性的状态码，是临时的，表示请求已被接受，需要继续处理。这些状态码并没有提供太多有用的信息，我们可能永远看不到1XX相关的状态码。

* 100 Continue ：服务器已收到浏览器的请求标头，并且现在已准备好发送请求正文。这使得请求过程更加高效，因为它可以防止浏览器发送正文请求，即使标头已被拒绝。
* 101 Switching Protocols ：服务器已经接受了客户端的请求，并将通过`Upgrade`消息头通知客户端采用不同的协议来完成这个请求。在发送完这个响应最后的空行后，服务器将会切换到在Upgrade消息头中定义的协议。
* 102 Processing ：服务器已经收到并正在处理请求，目前还没有响应。这样可以防止客户端超时，并假设请求丢失。
* 103 Early hints ：在服务器响应的HTTP消息之前返回一些响应头。该状态码用于允许用户代理预加载资源，同时服务器准备响应。



### 2xx Success

2xx 状态码表示客户端的请求被成功接收、理解和接受。

* **200 OK** ：表示客户端发来的请求被服务器端正常处理了。
* 201 Created ：服务器完成了浏览器的请求，因此创建了一个或多个新资源。
* 202 Accepted ：服务器已接受浏览器的请求，但仍在处理中。该请求最终可能会也可能不会进行响应。
* 203 Non-authoritative Information ：使用代理时可能会出现此状态代码。这意味着代理服务器从源服务器收到了 200 状态代码，但在将响应传递给浏览器之前已对其进行了修改。
* 204 No Content ：该状态码表示客户端发送的请求已经在服务器端正常处理了，但是没有返回的内容，响应报文中不包含实体的主体部分。一般在只需要从客户端往服务器端发送信息，而服务器端不需要往客户端发送内容时使用。
* 205 Reset Content ：服务器端成功处理了请求，且没有返回任何内容。但是与204响应不同，返回此状态码的响应要求请求者重置文档视图。该响应主要是被用于接受用户输入后，立即重置表单，以便用户能够轻松地开始另一次输入。
* 206 Partial Content ：该状态码表示客户端进行了范围请求，而服务器端执行了这部分的 GET 请求。响应报文中包含由 `Content-Range` 指定范围的实体内容。
* 226 IM Used ：服务器已成功处理浏览器的 GET 方法，以检索已缓存资源的更新版本。通常，当请求的资源有一个或多个轻微修改时返回响应。



### 3xx Redirection

3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请求。

* 300 Multiple Choices ：有时，服务器可能会响应多种可能的资源来满足浏览器的请求。300 状态码意味着浏览器现在需要在它们之间进行选择。当有多个可用的文件类型扩展名时，可能会发生这种情况。
* **301 Moved Permanently** ：**永久重定向**。已为目标资源分配了一个新的永久 URI。新的 URI 会在 HTTP 响应头中的 Location 首部字段指定。若用户已经把原来的URI保存为书签，此时会按照 Location 中新的URI重新保存该书签。同时，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址。
* **302 Found** ：**临时重定向**。请求的资源被分配到了新的 URI，希望用户（本次）能使用新的 URI 访问资源。和 301 Moved Permanently 状态码相似，但是 302 代表的资源不是被永久重定向，只是临时性质的。也就是说已移动的资源对应的 URI 将来还有可能发生改变。
* 303 See Other ：由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。
* **304 Not Modified** ：浏览器缓存相关。状态码304并不是一种错误，而是告诉客户端有缓存，直接使用缓存中的数据。返回页面的只有头部信息，是没有内容部分的，这样在一定程度上提高了网页的性能。
* 305 Use Proxy ：服务器需要代理才能返回请求的资源。此响应代码当前未使用，因为当前大多数浏览器由于安全问题不支持它。
* 307 Temporary Redirect ：临时重定向。
* 308 Permanent Redirect ：永久重定向，当前及未来的请求重定向到了新的 URL。



### 4xx Client errors

* **400 Bad Request** ：请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。
* **401 Unauthorized** ：用户身份未认证
* 402 Payment Required ：为数字支付系统保留的。不过，它并没有被广泛使用。
* **403 Forbidden** ：客户端请求已被拒绝，因为客户端无权访问内容。
* **404 Not Found** ：服务器上无法找到请求的资源。
* **405 Method Not Allowed** ：服务器识别到浏览器使用的 HTTP 请求方法，但需要使用不同的方法才能提供所需的资源。客户端可以通过 OPTIONS 方法（预检）来查看服务器允许的访问方法, 如下
  * `Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE`
* 406 Not Acceptable ：服务器通知客户端没有资源符合浏览器请求的标准。
* 407 Proxy Authentication Required ：客户端必须首先通过代理进行身份验证。
* 408 Request Timeout ：当服务器在等待来自浏览器的完整请求时超时时会生成此状态码。换句话说，服务器没有收到浏览器发送的完整请求。一种可能的原因就是网络拥塞导致浏览器和服务器之间的数据包丢失。
* 409 Conflict ：服务器无法处理浏览器的请求，因为与相关资源存在冲突。这有时是由于多个同时编辑而发生的。
* 410 Gone ：请求的资源将来将不再可用。
* 411 Length Required ：请求的资源需要客户端指定一定的长度，通过 Content-Length 来定义。
* 412 Precondition Failed ：服务器不满足请求头字段中指示的一个或多个先决条件。
* 413 Payload Too Large ：服务器拒绝处理请求，因为请求的负载大于服务器能够或愿意处理的。
* **414 Request-URI Too Long** ：浏览器发出的请求无法被服务器处理，因为客户端将太多数据编码为查询字符串，然后作为 GET 方法发送。
* **415 Unsupported Media Type** ：请求已被服务器拒绝，因为它不支持请求数据的媒体格式。
* 416 Requested Range Not Satisfiable ：请求的 Range 头中指定的范围无法满足。原因可能是给定范围超出了目标 URI 数据的大小。
* 417 Expectation Failed ：服务器无法满足请求的请求头的 Expect 字段中指定的要求。
* 421 Misdirected Request ：浏览器的请求已被重定向到其他服务器，该服务器无法产生响应。
* 422 Unprocessable Entity ：浏览器发出的请求中存在语义错误，服务器无法处理。
* 423 Locked ：对所需资源的访问被拒绝，因为它已被锁定。
* 424 Failed Dependency ：浏览器发出的请求失败，因为它依赖于另一个请求，而该请求失败了。
* 426 Upgrade Required ：当服务器拒绝使用当前协议执行给定的请求时，它可能愿意在客户端升级到不同的协议后这来执行请求。
* 428 Precondition Required ：服务器要求在处理请求之前指定条件。
* **429 Too Many Requests** ：用户在给定的时间内发送了太多请求（速率限制）时，这是由服务器生成的。这有时可能是由于机器人或脚本试图访问站点而造成的。
* 431 Request Header Fields Too Large ：服务器无法处理请求，因为标头字段太大。这可能是单个标头字段或所有标头字段存在问题。
* 451 Unavailable For Legal Reasons ：服务器的运营商收到了禁止访问请求的资源的要求。
* 499 Client closed request ：当 nginx 正在处理请求时，客户端关闭了连接，nginx 就会返回此状态码。



### 5xx Server Error

5XX 的响应结果表明服务器本身发生错误。

* **500 Internal Server Error** ：服务器端在执行请求时发生了错误。也有可能是应用存在 bug 或某些临时的故障。
* 501 Not Implemented ：请求无法处理，因为服务器不支持。
* **502 Bad Gateway** ：该扮演网关或代理角色的服务器从上游服务器中接收到的响应是无效的。注意，502 错误通常不是客户端能够修复的，而是需要由途经的服务器或者代理服务器对其进行修复
* 503 Service Unavailable ：服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。使用场景：
  * 服务器停机维护时，主动用503响应请求；
  * nginx 设置限速，超过限速，会返回503。
* 504 Gateway Timeout ：网关或者代理的服务器无法在规定的时间内获得想要的响应。它是HTTP 1.1中新加入的。
* 505 HTTP Version Not Supported ：请求中使用的 HTTP 版本不受服务器支持。
* 506 Variant Also Negotiates ：服务器内部配置错误。
* 507 Insufficient Storage ：服务器无法存储完成请求所必须的内容。
* 508 Loop Detected ：服务器在处理请求时检测到无限循环。
* 510 Not Extended ：服务器需要进一步扩展才能满足请求。
* 511 Network Authentication Required ：客户端需要进行身份验证才能获得访问权限。



## session、cookie、token 

### session 和 cookie 的特征

Session 和 cookie 都是由服务器生成的，都是用来存储特定的值(键值对)。引用了 session 和 cookie 机制是用来实现状态的记录。



**Session 是存储在服务器的，而 cookie 是会返回给客户端的。**

**SessionID** : 一般来说，SessionID 会以类似于 cookie 的方式返回给客户端。SessionID 是服务器用来识别、操作存储 Session 值的对象的。**SessionID 并不是 Session 值。**

在服务端，Session 的存储方式与文件方式、数据库方式，SessionID 就是用来识别这个文件的(文件名相关)、识别数据库的某一条记录。

`形式：响应信息头：set-cookie`



**客户端(浏览器)在发送请求的时候，会自动将存活、可用的 cookie 封装在请求头中和请求一起发送。**

`形式：请求信息头：Cookie`



**cookie 和 session 都是有生命周期的。**

* cookie 的生命周期，一般来说，会受到两个因素的影响
  * cookie 自身的存活时间：是服务器生成 cookie 时去设定的
  * 客户端是否保留了 cookie 。这只对客户端自身有影响，对其他封包工具是没有影响的。(也就是封包工具在 cookie 过期前，拿到了 cookie，依然有效)
* session 的生命周期，一般来说，也会受到两个因素的影响
  * 服务器对于 session 对象设置的最大保存时间
  * 客户端进程是否关闭。这只对客户端自身有影响，对其他封包工具是没有影响的。(因为 session 会将 SessionID 发送给客户端，而 SessionID 是保存在内存中，客户端进程关闭，内存也会销毁。但如果在客户端进程关闭前，拿到了 SessionID，依然有效)



**cookie 和 session 都是有其作用域的。**



**为什么 session 比 cookie 安全？**

* cookie 是存储在客户端的，是可见的，是可以改变的
* session 是存储在服务器端的，是不可见的，是不可改变的



![session 和 cookie](http://qiniu.huangyihui.cn/doc/202511262242395.png)

### token

往往会将 SessionID 封装在 token对象中，token中还可以有多个自定义的属性。





## 插件、库、框架的区别

* 插件: 实现某一个单一类功能
* 库: 封装了各种的功能和你需要的工具。例如jQuery库
* 框架: 有自己的完整的生态系统。例如Vue



## 重定向到移动端

通过浏览器的 user-agent 判断设备类型，进行相应的重定向。

```js
function urlredirect() {
  var sUserAgent = navigator.userAgent.toLowerCase(); 
  if ((sUserAgent.match(/(ipod|iphone os|midp|ucweb|android|windows ce|windows mobile)/i))) {
      window.location.href = 'http://baidu.com';
  }
}

urlredirect();
```



## JS 二进制

JavaScript 提供了一些 API 来处理文件或原始文件数据，例如：File、Blob、FileReader、ArrayBuffer、base64 等。



![640](http://qiniu.huangyihui.cn/doc/202511262242125.png)





### Blob

Blob 全称为 binary large object ，即二进制大对象，它是 JavaScript 中的一个对象，表示原始的类似文件的数据。下面是 MDN 中对 Blob 的解释：

> Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。

实际上，Blob 对象是包含有只读原始数据的类文件对象。简单来说，Blob 对象就是一个不可修改的二进制文件。



#### Blob 创建

可以使用 Blob() 构造函数来创建一个 Blob：

```js
new Blob(array, options);
```

其有两个参数：

- `array`：由 `ArrayBuffer`、`ArrayBufferView`、`Blob`、`DOMString` 等对象构成的，将会被放进 `Blob`；

- `options`：可选的 `BlobPropertyBag` 字典，它可能会指定如下两个属性

- - `type`：默认值为 ""，表示将会被放入到 `blob` 中的数组内容的 MIME 类型。
  - `endings`：默认值为"`transparent`"，用于指定包含行结束符`\n`的字符串如何被写入，不常用。

常见的 MIME 类型如下：

![640 (1)](http://qiniu.huangyihui.cn/doc/202511262243859.png)



```js
const blob = new Blob(["Hello World"], {type: "text/plain"});

console.log(blob.size); // 11 字符串"Hello World"是 UTF-8 编码的，因此它的每个字符占用 1 个字节
console.log(blob.type); // "text/plain"
```

这个 blob 对象上有两个属性：

- `size`：Blob对象中所包含数据的大小（字节）；
- `type`：字符串，认为该Blob对象所包含的 MIME 类型。如果类型未知，则为空字符串。



那该如何使用 Blob 对象呢？可以使用 URL.createObjectURL() 方法将将其转化为一个 URL，并在 Iframe 中加载：

```js
<iframe></iframe>

const iframe = document.getElementsByTagName("iframe")[0];

const blob = new Blob(["Hello World"], {type: "text/plain"});

iframe.src = URL.createObjectURL(blob);	// 页面会显示"Hello World"。
```



#### Blob 分片

除了使用`Blob()`构造函数来创建blob 对象之外，还可以从 blob 对象中创建blob，也就是将 blob 对象切片。Blob 对象内置了 slice() 方法用来将 blob 对象分片，其语法如下：

```js
const blob = instanceOfBlob.slice([start [, end [, contentType]]]};
```

其有三个参数：

- `start`：设置切片的起点，即切片开始位置。默认值为 0，这意味着切片应该从第一个字节开始；
- `end`：设置切片的结束点，会对该位置之前的数据进行切片。默认值为`blob.size`；
- `contentType`：设置新 blob 的 MIME 类型。如果省略 type，则默认为 blob 的原始值。



```js
const iframe = document.getElementsByTagName("iframe")[0];

const blob = new Blob(["Hello World"], {type: "text/plain"});

const subBlob = blob.slice(0, 5);

iframe.src = URL.createObjectURL(subBlob);	// 页面会显示"Hello"。
```



### File

文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。实际上，File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。Blob 的属性和方法都可以用于 File 对象。

注意：File 对象中只存在于浏览器环境中，在 Node.js 环境中不存在。



在 JavaScript 中，主要有两种方法来获取 File 对象：

- `<input>` 元素上选择文件后返回的 FileList 对象；
- 文件拖放操作生成的 `DataTransfer` 对象；



#### input

当点击上传文件时，控制台就会输出一个 FileList 数组，这个数组的每个元素都是一个 File 对象，一个上传的文件就对应一个 File 对象。

```
<input type="file" id="fileInput" multiple="multiple">

const fileInput = document.getElementById("fileInput");

fileInput.onchange = (e) => {
  console.log(e.target.files);
};
```

每个 `File` 对象都包含文件的一些属性，这些属性都继承自 Blob 对象：

- `lastModified`：引用文件最后修改日期，为自1970年1月1日0:00以来的毫秒数；
- `lastModifiedDate`：引用文件的最后修改日期；
- `name`：引用文件的文件名；
- `size`：引用文件的文件大小；
- `type`：文件的媒体类型（MIME）；
- `webkitRelativePath`：文件的路径或 URL。

通常，我们在上传文件时，可以通过对比 size 属性来限制文件大小，通过对比 type 来限制上传文件的格式等。



#### 文件拖放

另一种获取 File 对象的方式就是拖放 API，这个 API 很简单，就是将浏览器之外的文件拖到浏览器窗口中，并将它放在一个成为拖放区域的特殊区域中。拖放区域用于响应放置操作并从放置的项目中提取信息。这些是通过 `ondrop` 和 `ondragover` 两个 API 实现的。

```
<div id="drop-zone"></div>

const dropZone = document.getElementById("drop-zone");

dropZone.ondragover = (e) => {
  e.preventDefault();
};

dropZone.ondrop = (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  console.log(files);
};
```

**注意**：这里给两个 API 都添加了 `e.preventDefault()`，用来阻止默认事件。它是非常重要的，可以用来阻止浏览器的一些默认行为，比如放置文件将显示在浏览器窗口中。

当拖放文件到拖放区域时，控制台就会输出一个  FileList 数组，该数组的每一个元素都是一个 File 对象。这个 FileList 数组是从事件参数的 dataTransfer 属性的 files 获取的。

这里得到的 `File` 对象和通过 `input` 标签获得的 `File` 对象是完全一样的。



### FileReader

FileReader 是一个异步 API，用于读取文件并提取其内容以供进一步使用。FileReader 可以将 Blob 读取为不同的格式。

> 注意：FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容，不能用于从文件系统中按路径名简单地读取文件。



#### 基本使用

可以使用 FileReader 构造函数来创建一个 FileReader 对象：

```js
const reader = new FileReader();
```

这个对象常用属性如下：

- `error`：表示在读取文件时发生的错误；
- `result`：文件内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
- `readyState`：表示`FileReader`状态的数字。取值如下：

| 常量名  | 值   | 描述                 |
| ------- | ---- | -------------------- |
| EMPTY   | 0    | 还没有加载任何数据   |
| LOADING | 1    | 数据正在被加载       |
| DONE    | 2    | 已完成全部的读取请求 |

FileReader 对象提供了以下方法来加载文件：

- `readAsArrayBuffer()`：读取指定 Blob 中的内容，完成之后，`result` 属性中保存的将是被读取文件的 `ArrayBuffer` 数据对象；
- `FileReader.readAsBinaryString()`：读取指定 Blob 中的内容，完成之后，`result` 属性中将包含所读取文件的原始二进制数据；
- `FileReader.readAsDataURL()`：读取指定 Blob 中的内容，完成之后，`result` 属性中将包含一个`data: URL` 格式的 Base64 字符串以表示所读取文件的内容。
- `FileReader.readAsText()`：读取指定 Blob 中的内容，完成之后，`result` 属性中将包含一个字符串以表示所读取的文件内容。
- `FileReader.abort()`：中止读取操作。

可以看到，上面这些方法都接受一个要读取的 blob 对象作为参数，读取完之后会将读取的结果放入对象的 `result` 属性中。



#### 事件处理

FileReader 对象常用的事件如下：

- `abort`：该事件在读取操作被中断时触发；
- `error`：该事件在读取操作发生错误时触发；
- `load`：该事件在读取操作完成时触发；
- `loadend` ：该事件在读取操作完成时触发（无论成功或失败）；
- `progress`：该事件在读取 Blob 时触发。
- `loadstart` ：该事件在读取开始时触发。

当然，这些方法可以加上前置 on 后在HTML元素上使用，比如`onload`、`onerror`、`onabort`、`onprogress`。除此之外，由于`FileReader`对象继承自`EventTarget`，因此还可以使用 `addEventListener()` 监听上述事件。



```js
<input type="file" id="fileInput">

const fileInput = document.getElementById("fileInput");

const reader = new FileReader();

fileInput.onchange = (e) => {
  reader.readAsText(e.target.files[0]);     // 读取文本文件
  // reader.readAsDataURL(e.target.files[0]);  // 读取二进制文件
};

reader.onload = (e) => {
  console.log(e.target.result);
};

reader.onprogress = (e) => {
  if (e.loaded && e.total) {
    const percent = (e.loaded / e.total) * 100;
    console.log(`上传进度: ${Math.round(percent)} %`);
  }
};
```

当上传大文件时，可以通过 `progress` 事件来监控文件的读取进度：

`progress` 事件提供了两个属性：`loaded`（已读取量）和`total`（需读取总量）。



### Object URL

Object URL（MDN定义名称）又称Blob URL（W3C定义名称），是HTML5中的新标准。它是一个用来表示File Object 或Blob Object 的URL。

其实 Blob URL/Object URL 是一种伪协议，允许将 Blob 和 File 对象用作图像、二进制数据下载链接等的 URL 源。

对于 Blob/File 对象，可以使用 URL构造函数的 `createObjectURL()` 方法创建将给出的对象的 URL。这个 URL 对象表示指定的 File 对象或 Blob 对象。我们可以在`<img>`、`<script>` 标签中或者 `<a>` 和 `<link>` 标签的 `href` 属性中使用这个 URL。



* createObjectURL() ：可以将Blob/File对象转化为URL，通过这个URL 就可以实现文件下载或者图片显示等。
* revokeObjectURL() ：从内存中清除 `createObjectURL()` 来释放内存。接受一个Data URL 作为其参数，返回`undefined`。浏览器会在文档卸载时自动释放 Data URL。



```js
<input type="file" id="fileInput" />
<img id="preview" />

const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.onchange = (e) => {
  preview.src = URL.createObjectURL(e.target.files[0]);
  console.log(preview.src);
};

const objUrl = URL.createObjectURL(new File([""], "filename"));
console.log(objUrl);
URL.revokeObjectURL(objUrl);
```



### Base64

Base64 是一种基于64个可打印字符来表示二进制数据的表示方法。Base64 编码普遍应用于需要通过被设计为处理文本数据的媒介上储存和传输二进制数据而需要编码该二进制数据的场景。这样是为了保证数据的完整并且不用在传输过程中修改这些数据。

在 JavaScript 中，有两个函数被分别用来处理解码和编码 *base64* 字符串：

- `atob()`：解码，解码一个 Base64 字符串；
- `btoa()`：编码，从一个字符串或者二进制数据编码一个 Base64 字符串。

```js
btoa("JavaScript")       // 'SmF2YVNjcmlwdA=='
atob('SmF2YVNjcmlwdA==') // 'JavaScript'
```



那 base64 的实际应用场景有哪些呢？其实多数场景就是基于Data URL的。比如，使用`toDataURL()`方法把 canvas 画布内容生成 base64 编码格式的图片：

```js
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext("2d");
const dataUrl = canvas.toDataURL();
```







### ArrayBuffer

ArrayBuffer 对象用来表示通用的、固定长度的**原始二进制数据缓冲区**。ArrayBuffer 的内容不能直接操作，只能通过 DataView 对象或 TypedArrray 对象来访问。这些对象用于读取和写入缓冲区内容。

ArrayBuffer 本身就是一个黑盒，不能直接读写所存储的数据，需要借助以下视图对象来读写：

- **TypedArray**：用来生成内存的视图，通过9个构造函数，可以生成9种数据格式的视图。
- **DataViews**：用来生成内存的视图，可以自定义格式和字节序。

![640 (2)](http://qiniu.huangyihui.cn/doc/202511262243137.png)



TypedArray视图和 DataView视图的区别主要是**字节序**，前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。

那 ArrayBuffer 与 Blob 有啥区别呢？根据 ArrayBuffer 和 Blob 的特性，Blob 作为一个整体文件，适合用于传输；当需要对二进制数据进行操作时（比如要修改某一段数据时），就可以使用 ArrayBuffer。



#### 常用方法/属性

**new ArrayBuffer()**

ArrayBuffer 可以通过以下方式生成：

```js
new ArrayBuffer(bytelength)
```

`ArrayBuffer()`构造函数可以分配指定字节数量的缓冲区，其参数和返回值如下：

- **参数**：它接受一个参数，即 bytelength，表示要创建数组缓冲区的大小（以字节为单位。）；
- **返回值**：返回一个新的指定大小的ArrayBuffer对象，内容初始化为0。



**ArrayBuffer.prototype.byteLength**

ArrayBuffer 实例上有一个 byteLength 属性，它是一个只读属性，表示 ArrayBuffer 的 byte 的大小，在 ArrayBuffer 构造完成时生成，不可改变。

```js
const buffer = new ArrayBuffer(16); 
console.log(buffer.byteLength);  // 16
```



**ArrayBuffer.prototype.slice()**

ArrayBuffer 实例上还有一个 slice 方法，该方法可以用来截取 ArrayBuffer 实例，它返回一个新的 ArrayBuffer ，它的内容是这个 ArrayBuffer 的字节副本，从 begin（包括），到 end（不包括）。

```js
const buffer = new ArrayBuffer(16); 
console.log(buffer.slice(0, 8));  // 8
```

这里会从 buffer 对象上将前8个字节生成一个新的ArrayBuffer对象。这个方法实际上有两步操作，首先会分配一段指定长度的内存，然后拷贝原来ArrayBuffer对象的置顶部分。



**ArrayBuffer.isView()**

ArrayBuffer 上有一个 isView()方法，它的返回值是一个布尔值，如果参数是 ArrayBuffer 的视图实例则返回 true，例如类型数组对象或 DataView 对象；否则返回 false。简单来说，这个方法就是用来判断参数是否是 TypedArray 实例或者 DataView 实例：

```js
const buffer = new ArrayBuffer(16);
ArrayBuffer.isView(buffer)   // false

const view = new Uint32Array(buffer);
ArrayBuffer.isView(view)     // true
```



#### TypedArray

TypedArray 对象一共提供 9 种类型的视图，每一种视图都是一种构造函数。如下：

| **元素** | **类型化数组**    | **字节** | **描述**        |
| :------- | :---------------- | :------- | :-------------- |
| Int8     | Int8Array         | 1        | 8 位有符号整数  |
| Uint8    | Uint8Array        | 1        | 8 位无符号整数  |
| Uint8C   | Uint8ClampedArray | 1        | 8 位无符号整数  |
| Int16    | Int16Array        | 2        | 16 位有符号整数 |
| Uint16   | Uint16Array       | 2        | 16 位无符号整数 |
| Int32    | Int32Array        | 4        | 32 位有符号整数 |
| Uint32   | Uint32Array       | 4        | 32 位无符号整数 |
| Float32  | Float32Array      | 4        | 32 位浮点       |
| Float64  | Float64Array      | 8        | 64 位浮点       |

来看看这些都是什么意思：

- **Uint8Array：** 将 ArrayBuffer 中的每个字节视为一个整数，可能的值从 0 到 255 （一个字节等于 8 位）。 这样的值称为“8 位无符号整数”。
- **Uint16Array**：将 ArrayBuffer 中任意两个字节视为一个整数，可能的值从 0 到 65535。 这样的值称为“16 位无符号整数”。
- **Uint32Array：**将 ArrayBuffer 中任何四个字节视为一个整数，可能值从 0 到 4294967295，这样的值称为“32 位无符号整数”。

这些构造函数生成的对象统称为 TypedArray 对象。它们和正常的数组很类似，都有`length` 属性，都能用索引获取数组元素，所有数组的方法都可以在类型化数组上面使用。



**那类型化数组和数组有什么区别呢？**

- 类型化数组的元素都是连续的，不会为空；
- 类型化数组的所有成员的类型和格式相同；
- 类型化数组元素默认值为 0；
- 类型化数组本质上只是一个视图层，不会存储数据，数据都存储在更底层的 ArrayBuffer 对象中。



TypedArray 常用的方法和属性：

**new TypedArray()**

TypedArray 的语法如下（TypedArray只是一个概念，实际使用的是那9个对象）：

```js
new Int8Array(length);
new Int8Array(typedArray);
new Int8Array(object);
new Int8Array(buffer [, byteOffset [, length]]);
```



* TypedArray(length) ：通过分配指定长度内容进行分配
* TypedArray(typeArray) ：接收一个视图实例作为参数
* TypedArray(object) ：参数可以是一个普通数组。
  * TypedArray视图会开辟一段新的内存，不会在原数组上建立内存。当然，这里创建的类型化数组也能转换回普通数组。`Array.prototype.slice.call(view);`
* TypeArray(buffer [, byteOffset [, length]]) ：其中第一个参数是一个ArrayBuffer对象；第二个参数是视图开始的字节序号，默认从0开始，可选；第三个参数是视图包含的数据个数，默认直到本段内存区域结束。
* BYTES_PER_ELEMENT ：表示这种数据类型占据的字节数
* TypedArray.prototype.buffer：只读属性。返回内存中对应的 ArrayBuffer对象。
* TypedArray.prototype.slice() ：返回一个指定位置的新的 TypedArray实例。
* byteLength ：返回 TypedArray 占据的内存长度，单位为字节
* length ：返回 TypedArray 元素个数



```js
let view = new Int8Array(16);
const view = new Int8Array(new Uint8Array(6));
const view = new Int8Array([1, 2, 3, 4, 5]);

view[0] = 10;
view[3] = 6;
console.log(view);


const buffer = new ArrayBuffer(8);
const view1 = new Int32Array(buffer); 
const view2 = new Int32Array(buffer, 4); 
console.log(view1, view2);

Int8Array.BYTES_PER_ELEMENT // 1
Uint8Array.BYTES_PER_ELEMENT // 1

const a = new Uint32Array(8);
const b = new Int32Array(a.buffer); 

const view = new Int16Array(8);
view.length;      // 8
view.byteLength;  // 16
console.log(view.slice(0, 5));
```



#### DataView

**DataView** 视图是一个可以从 二进制 ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。

DataView视图提供更多操作选项，而且支持设定字节序。本来，在设计目的上，ArrayBuffer对象的各种TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。



**new DataView()**

DataView视图可以通过构造函数来创建，它的参数是一个ArrayBuffer对象，生成视图。

```js
new DataView(buffer [, byteOffset [, byteLength]])
```

其有三个参数：

- `buffer`：一个已经存在的 ArrayBuffer 对象，DataView 对象的数据源。
- `byteOffset`：可选，此 DataView 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始。
- `byteLength`：可选，此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配 buffer 的长度。



DataView 实例有以下常用属性：

- `buffer`：返回对应的ArrayBuffer对象；
- `byteLength`：返回占据的内存字节长度；
- `byteOffset`：返回当前视图从对应的ArrayBuffer对象的哪个字节开始。

```js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
console.log(view);
view.buffer;
view.byteLength;
view.byteOffset;
```



DataView 实例提供了以下方法来读取内存，它们的参数都是一个字节序号，表示开始读取的字节位置：

- getInt8：读取1个字节，返回一个8位整数。
- getUint8：读取1个字节，返回一个无符号的8位整数。
- getInt16：读取2个字节，返回一个16位整数。
- getUint16：读取2个字节，返回一个无符号的16位整数。
- getInt32：读取4个字节，返回一个32位整数。
- getUint32：读取4个字节，返回一个无符号的32位整数。
- getFloat32：读取4个字节，返回一个32位浮点数。
- getFloat64：读取8个字节，返回一个64位浮点数。

```js
const buffer = new ArrayBuffer(24);
const view = new DataView(buffer);

// 从第1个字节读取一个8位无符号整数
const view1 = view.getUint8(0);

// 从第2个字节读取一个16位无符号整数
const view2 = view.getUint16(1);

// 从第4个字节读取一个16位无符号整数
const view3 = view.getUint16(3);
```



DataView 实例提供了以下方法来写入内存，它们都接受两个参数，第一个参数表示开始写入数据的字节序号，第二个参数为写入的数据：

- setInt8：写入1个字节的8位整数。
- setUint8：写入1个字节的8位无符号整数。
- setInt16：写入2个字节的16位整数。
- setUint16：写入2个字节的16位无符号整数。
- setInt32：写入4个字节的32位整数。
- setUint32：写入4个字节的32位无符号整数。
- setFloat32：写入4个字节的32位浮点数。
- setFloat64：写入8个字节的64位浮点数。



### 格式转化

* ArrayBuffer → blob
* ArrayBuffer → base64
* base64 → blob
* blob → ArrayBuffer
* blob → base64
* blob → Object URL
* 字符串 ↔ ArrayBuffer



```js
// ArrayBuffer → blob
const blob = new Blob([new Uint8Array(buffer, byteOffset, length)]);

// ArrayBuffer → base64
const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));

// base64 → blob
const base64toBlob = (base64Data, contentType, sliceSize) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

// blob → ArrayBuffer
function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject;
    reader.readAsArrayBuffer(blob);
  });
}

// blob → base64
function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

// blob → Object URL
const objectUrl = URL.createObjectURL(blob);


// 字符串转 ArrayBuffer
let str = "123456789012345678901234567890";
const encoder = new TextEncoder();
const uint8Array = encoder.encode(str);
const arrayBuffer = uint8Array.buffer;
console.log("arrayBuffer", arrayBuffer);

// ArrayBuffer 转字符串
const decoder = new TextDecoder();
const res = decoder.decode(arrayBuffer);
console.log("res", res);

// 分组切割 ArrayBuffer
const chunkSize = 20;
const chunks = [];
for (let i = 0; i < uint8Array.length; i += chunkSize) {
  const chunk = uint8Array.slice(i, i + chunkSize);
  chunks.push(chunk);
}
console.log("chunks", chunks);
```

















































