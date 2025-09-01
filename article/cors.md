# 跨域

在开发过程中，经常会出现需要访问别人的服务器，从第三方拉取数据，但是受到W3C的同源策略影响，并不能正常获取到数据。

为了解决这个问题，就产生了以下这几种方案。



## 同源策略

同源策略（Same origin policy）是一个重要的安全策略，它用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

同源是指**"协议+域名+端口"三者相同**，即便两个不同的域名指向同一个 ip 地址，也非同源。

同源策略是浏览器的行为，是为了保护本地数据不被JavaScript代码获取回来的数据污染，因此拦截的是客户端发出的请求回来的数据接收，即请求发送了，服务器响应了，但是无法被浏览器接收。



## JSONP

JSONP(JSON with Padding)是JSON的一种"使用模式"，理解为一个包裹着的json，可用于解决主流浏览器的跨域数据访问的问题。

原理: 利用`<script>`标签的`src属性`可以请求一个非同源的地址的特性，请求成功后会将响应的内容当成js代码直接运行。因为`<script>`标签本来就是加载后会自动运行的。

所以，可以在服务端的响应中填充需要获取的数据，并通过在URL中指定处理数据的方法。当响应成功后，就可以通过这个方法拿到需要的数据了。

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



## CORS

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
// NodeJS服务端
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



## 第三方插件

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


