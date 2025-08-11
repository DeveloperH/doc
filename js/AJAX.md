# AJAX

AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。

AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>AJAX</title>
	<script>
		function loadXMLDoc(){
			var xmlhttp
			if(window.XMLHttpRequest){
				// 现代浏览器执行代码
				xmlhttp = new XMLHttpRequest()
			}else{
				// IE6, IE5 浏览器执行代码
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
			}

			// onreadystatechange响应事件：当请求被发送到服务器后，readyState会发生改变，就会触发该事件
			// onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。
			xmlhttp.onreadystatechange = function(){
				// 当 readyState 等于 4 且状态为 200 时，表示响应已就绪：
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					// 获取到服务器的响应
					document.getElementById('myDiv').innerText = xmlhttp.responseText
				}
			}
			// 发送请求
			xmlhttp.open('GET', "ajax_info.txt", true)
			xmlhttp.send()
		}
	</script>
</head>
<body>
	<div id="myDiv">Hello AJAX</div>
	<button type="button" onclick="loadXMLDoc()">AJAX</button>
</body>
</html>
```





## XMLHttpRequest对象

`XMLHttpRequest`（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。

`XMLHttpRequest` 是 AJAX 的基础。所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 `ActiveXObject` 对象）。

要启用跨站脚本，推荐的做法是对 XMLHttpRequest 的响应使用 `Access-Control-Allow-Origin `的 HTTP 头。



### 构造函数

通过构造函数创建XMLHttpRequest对象

```js
var xhr
if(window.XMLHttpRequest){
  // 现代浏览器执行代码
  xhr = new XMLHttpRequest()
}else{
  // IE6, IE5 浏览器执行代码
  xhr = new ActiveXObject("Microsoft.XMLHTTP")
}
```



### 属性

* onreadystatechange : 当 `readyState` 属性发生变化时，会调用的事件处理程序
  * 当一个XMLHttpRequest请求被 `abort()` 方法取消时，其对应的`readystatechange事件`不会被触发。
* readState : 只读，返回一个数字，代表请求的状态码。
  * 0 : 代理被创建，但尚未调用 `open()` 方法。
  * 1 : `open()` 方法已经被调用。
  * 2 : `send()` 方法已经被调用，并且头部和状态已经可获得。
  * 3 : 下载中； `responseText` 属性已经包含部分数据。
  * 4 : 下载操作已完成。
* status : 只读，返回一个数字，代表请求的响应状态。
  * 在请求完成前，或者请求出错，则返回0
  * `status 200` 代表一个成功的请求。如果服务器响应中没有明确指定status码，将默认返回`200`。
* statusText : 只读，返回一个字符串。不同于使用一个数字来指示状态码的status，这个属性包含了返回状态对应的文本信息，如果服务器未明确指定一个状态文本信息，则`statusText`的值将会被自动赋值为"OK"。
* responseText : 只读，返回字符串，包含对请求的响应。如果请求未成功或尚未发送，则返回 `null`。
* responseXML : 只读，返回一个 `Document`，其中包含该请求的响应。如果请求未成功、尚未发送或时不能被解析为 XML 或 HTML，则返回 `null`。
* response : 只读，返回一个 `ArrayBuffer`、`Blob`、`Document`，或 `DOMString`，具体是哪种类型取决于 `XMLHttpRequest.responseType` 的值。其中包含整个响应实体。`IE10支持`
* responseType : 获取或设置响应类型的枚举值。`IE10支持，并且需要在open()后面写`
  * '' 、 'text' : 空的字符串与默认类型"text"相同。响应是文本字符串。
  * 'json' : 响应是一个JavaScript对象，通过将接收到的数据内容解析为`JSON`而创建。IE不支持
  * 'arraybuffer' : 响应是一个包含二进制数据的JavaScript `ArrayBuffer`。
  * 'blob' : 响应是一个包含二进制数据的`Blob`对象
  * 'document' : 根据所接收数据的MIME类型，响应是`HTML Document`或`XML XMLDocument`
  * 注意1: 需要确保设置的类型和服务器返回的类型是一致的，否则response的值为null
  * 注意2: 设置该属性为其他值后，responseText和responseXML可能会不可用。
* responseURL : 只读，返回经过序列化的响应 URL，如果该 URL 为空，则返回空字符串。`IE不支持`
  * 如果URL有锚点，则位于URL `#` 后面的内容会被删除。如果URL有重定向， `responseURL` 的值会是经过多次重定向后的最终 URL 。
* timeout : 一个整型数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。
  * 默认值为 0，意味着没有超时。
  * 在IE中，超时属性可能只能在调用 `open()` 方法之后且在调用 `send()` 方法之前设置。
* withCredentials : 一个布尔值，用来指定跨域 `Access-Control` 请求是否应当带有授权信息，如 cookie 或授权 header 头。默认为false。



### 方法

* abort() : 如果请求已被发出，则立刻中止请求。
  * 当一个请求被终止，它的 `readyState` 将被置为0，并且请求的 `status` 置为 0。
* open(method, url [,async ,user ,password]) : 初始化一个请求。
  * method : 要使用的HTTP方法，比如`GET`、`POST`、`PUT`、`DELETE`等。对于非HTTP(S) URL被忽略。
  * url : 一个字符串，表示要向其发送请求的URL。
  * async : 可选，一个布尔值，表示是否异步执行操作。true(默认，异步) / false(同步)
    * 如果`true`，已完成事务的通知可供事件监听器使用。对服务器的响应需要在`onreadystatechange`事件中处理。
    * 如果值为`false`，`send()`方法直到收到答复前不会返回。对服务器的响应在`send()`后面处理。
  * user : 可选的用户名用于认证用途；默认为`null`。
  * password : 可选的密码用于认证用途，默认为`null`。
* send([body]]) : 发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。
  * body : 可选，在XHR请求中要发送的数据体. 可以是:
    * 如果body没有指定值，则默认值为 `null` .
    * 如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 `null`。
    * 可以是 `Blob`, `BufferSource`, `FormData`, `URLSearchParams`, 或者 `USVString` 对象.
    * 可以为 `Document`, 在这种情况下，需要在发送之前将其序列化。
  * 如果没有使用`setRequestHeader()`方法设置Accept头部信息，则会发送带有`"* / *"`的Accept 头部。
* setRequestHeader(header, value) : 设置 HTTP 请求头的值。必须在open()之后、send()之前调用。
  * 如果没有设置 `Accept` 属性，则此发送出send() 的值为此属性的默认值`*/*` 。
  * 如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
* getResponseHeader(name) : 返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回 null。搜索的报文名是不区分大小写的。
  * 如果在返回的响应头中有多个一样的名称，那么返回的值就会是用逗号和空格将值分隔的字符串。
* getAllResponseHeaders() : 以字符串的形式返回所有用 `CRLF` 分隔的响应头，如果没有收到响应，则返回 null。
* overrideMimeType(mimeType) : 覆写由服务器返回的MIME类型。此方法必须在send()之前调用才有效。`IE11支持`
  * 如果服务器没有指定类型，那么 `XMLHttpRequest` 将会默认为 `"text/xml"`.





### 事件

作为 `XMLHttpRequest` 实例的属性之一，所有浏览器都支持 `onreadystatechange`。

更多现代浏览器，除了可以设置 `on*` 属性外，也提供标准的监听器 `addEventListener()` 来监听`XMLHttpRequest` 事件。

* abort : 当 request 被停止时触发，例如当程序调用 `XMLHttpRequest.abort()` 时。
  * 也可以使用 `onabort` 属性。
* error : 当 request 遭遇错误时触发。也可以使用 `onerror` 属性
* load : XMLHttpRequest请求成功完成时触发。也可以使用 `onload` 属性.
* loadend : 当请求结束时触发, 无论请求成功 (`load`) 还是失败 (`abort` 或 `error`)。也可以使用 `onloadend` 属性。
* loadstart : 接收到响应数据时触发。也可以使用 `onloadstart` 属性。
* progress : 当请求接收到更多数据时(请求完成前)，周期性地触发。也可以使用 `onprogress` 属性。
  * progress 事件在使用 `file:` 协议的情况下是无效的。
* timeout : 在预设时间内没有接收到响应时触发。也可以使用 `ontimeout` 属性。

注意: 以上除了load事件是在IE9支持，其他都是在IE10支持。



```js
xhr.onreadystatechange = function(){
  // 事件处理程序
  if(xmlhttp.readyState==4 && xmlhttp.status==200){
  	console.log(xhr.responseText)
  }
}
```







## 向服务器发送请求

如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 open() 和 send() 方法：

* open(method, url, async) : 规定请求的类型、URL 以及是否异步处理请求。
  * method : 请求的类型；GET 或 POST
  * url : 文件在服务器上的位置
  * async : true（异步）或 false（同步）
    * 推荐值为true，对服务器的响应需要在onreadystatechange事件中处理。
    * false，对服务器的响应在send()后面处理。
* send(string) : 将请求发送到服务器。
  * string : 仅用于 POST 请求

```js
xmlhttp.open('GET', "ajax_info.txt", true)
xmlhttp.send()
```



## GET请求

```js
// 简单的GET请求
xmlhttp.open("GET","demo_get.asp",true)

// 一般地，如果缓存中有相应内容， XMLHttpRequest 会试图从缓存中读取内容。
// 绕过缓存: 为URL添加一个唯一ID(或者时间戳)以获取数据
// 因为本地缓存都是以 URL 作为索引的，这样就可以使每个请求都是唯一的，也就可以这样来绕开缓存。
xmlhttp.open("GET", "demo_get.asp?t=" + Math.random(), true)

// 通过GET方法发送消息，需要在URL中添加数据
xmlhttp.open("GET", "demo_get2.asp?fname=Henry&lname=Ford", true)
xmlhttp.send()
```



## POST请求

```js
// 简单的POST请求
xmlhttp.open("POST", "demo_post.asp", true)
xmlhttp.send()
```



如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：

* setRequestHeader(header, value) : 向请求添加 HTTP 头。
  * header : 规定头的名称
  * value : 规定头的值

```js
xmlhttp.open("POST","demo_post.asp",true)
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
xmlhttp.send("fname=Henry&lname=Ford")
```



## onreadystatechange事件

当请求被发送到服务器时，我们需要执行一些基于响应的任务。

每当 readyState 改变时，就会触发 onreadystatechange 事件。

下面是 XMLHttpRequest 对象的三个重要的属性：

* onreadystatechange : 函数名，每当 readyState 属性改变时，就会调用该函数。
* readyState : 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
  * 0: 请求未初始化
  * 1: 服务器连接已建立
  * 2: 请求已接收
  * 3: 请求处理中
  * 4: 请求已完成，且响应已就绪
* status : 状态码
  * 200: "OK"
  * 404: 未找到页面



注意： onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。

在 onreadystatechange 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。

```js
// onreadystatechange响应事件：当请求被发送到服务器后，readyState会发生改变，就会触发该事件
// onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。
xmlhttp.onreadystatechange = function(){
  // 当 readyState 等于 4 且状态为 200 时，表示响应已就绪：
  if(xmlhttp.readyState==4 && xmlhttp.status==200){
    // 获取到服务器的响应
    document.getElementById('myDiv').innerText = xmlhttp.responseText
  }
}
```





## 服务器响应

如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。

* responseText : 获得字符串形式的响应数据。
* responseXML : 获得 XML 形式的响应数据。





## 使用回调函数

回调函数是一种以参数形式传递给另一个函数的函数。

如果网站中存在多个AJAX任务，可以通过回调函数方式处理不同的AJAX任务。

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      var xmlhttp;
      function loadXMLDoc(url, cfunc) {
        if (window.XMLHttpRequest) {
          // IE7+, Firefox, Chrome, Opera, Safari 代码
          xmlhttp = new XMLHttpRequest();
        } else {
          // IE6, IE5 代码
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = cfunc;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
      }
      function myFunction() {
        loadXMLDoc("ajax_info.txt", function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
          }
        });
      }
    </script>
  </head>
  <body>
    <div id="myDiv"><h2>使用 AJAX 修改文本内容</h2></div>
    <button type="button" onclick="myFunction()">修改内容</button>
  </body>
</html>
```





## readyState 和 status详解

**XMLHttpRequest.readyState的值及解释：**

0：请求未初始化（还没有调用 `open()`）。

1：请求已经建立，但是还没有发送（还没有调用 `send()`）。

2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。

3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。

4：响应已完成；您可以获取并使用服务器的响应了。





**XMLHttpRequest.status的值及解释：**

100——客户必须继续发出请求

101——客户要求服务器根据请求转换HTTP协议版本

200——交易成功

201——提示知道新文件的URL

202——接受和处理、但处理未完成

203——返回信息不确定或不完整

204——请求收到，但返回信息为空

205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件

206——服务器已经完成了部分用户的GET请求

300——请求的资源可在多处得到

301——删除请求数据

302——在其他地址发现了请求数据

303——建议客户访问其他URL或访问方式

304——客户端已经执行了GET，但文件未变化

305——请求的资源必须从服务器指定的地址得到

306——前一版本HTTP中使用的代码，现行版本中不再使用

307——申明请求的资源临时性删除

400——错误请求，如语法错误

401——请求授权失败

402——保留有效ChargeTo头响应

403——请求不允许

404——没有发现文件、查询或URl

405——用户在Request-Line字段定义的方法不允许

406——根据用户发送的Accept拖，请求资源不可访问

407——类似401，用户必须首先在代理服务器上得到授权

408——客户端没有在用户指定的饿时间内完成请求

409——对当前资源状态，请求不能完成

410——服务器上不再有此资源且无进一步的参考地址

411——服务器拒绝用户定义的Content-Length属性请求

412——一个或多个请求头字段在当前请求中错误

413——请求的资源大于服务器允许的大小

414——请求的资源URL长于服务器允许的长度

415——请求资源不支持请求项目格式

416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段

417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求

合起来

500——服务器产生内部错误

501——服务器不支持请求的函数

502——服务器暂时不可用，有时是为了防止发生系统过载

503——服务器过载或暂停维修

504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长

505——服务器不支持或拒绝支请求头中指定的HTTP版本

1xx:信息响应类，表示接收到请求并且继续处理

2xx:处理成功响应类，表示动作被成功接收、理解和接受

3xx:重定向响应类，为了完成指定的动作，必须接受进一步处理

4xx:客户端错误，客户请求包含语法错误或者是不能正确执行

5xx:服务端错误，服务器不能正确执行一个正确的请求

`xmlhttp.readyState==4 && xmlhttp.status==200的解释：请求完成并且成功返回`





## 封装 Ajax

```js
let $ = {
  // 动态生成XHR对象的方法
  createXHR: function () {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest()
    } else {
      return new ActiveXObject()
    }
  },
  get: function (url, data, callback, dataType) {
    // 避免dataType大小写的问题
    dataType = dataType.toLowerCase()
    // 如果有传入data，则在url后面跟上参数
    if (data) {
      url += '?'
      Object.keys(data).forEach(key => url += `${key}=${data[key]}&`)
      url = url.slice(0, -1)
    }
    // 调用我们封装的方法生成XHR对象
    let xhr = this.createXHR()
    // 创建get请求
    xhr.open('get', url)
    // 发送请求
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          // 若dataType为json，则将返回的数据通过JSON.parse格式化
          let res = dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
          // 调用回调函数，并把参数传进去
          callback(res, xhr.status, xhr)
        }
      }
    }
  },
  post: function (url, data, callback, dataType) {
    // 避免dataType大小写的问题
    dataType = dataType.toLowerCase()
    // 调用我们封装的方法动态生成XHR对象
    let xhr = this.createXHR()

    let str = ''
    // 若传入参数，则将参数序列化
    if (data) {
      Object.keys(data).forEach(key => str += `${key}=${data[key]}&`)
      str = str.slice(0, -1)
    }
    xhr.open("post", url)
    // 设置头部信息
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // 发送请求，并携带参数
    xhr.send(str)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          // 若dataType为json，则将返回的数据通过JSON.parse格式化
          let res = dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
          // 调用回调函数，把对应参数传进去
          callback(res, xhr.status, xhr)
        }
      }
    }
  },
  ajax: function (params) {
    // 初始化参数
    let type = params.type ? params.type.toLowerCase() : 'get'
    let isAsync = params.isAsync ? params.isAsync : 'true'
    let url = params.url
    let data = params.data ? params.data : {}
    let dataType = params.dataType.toLowerCase()
    // 用我们封装的方法动态生成XHR对象
    let xhr = this.createXHR()

    let str = ''

    // 拼接字符串
    Object.keys(data).forEach(key => str += `${key}=${data[key]}&`)
    str = str.slice(0, -1)
    // 如果是get请求就把携带参数拼接到url后面
    if (type === 'get') url += `?${str}`;
    // 返回promise对象，便于外部then和catch函数调用
    return new Promise((resolve, reject) => {
      // 创建请求
      xhr.open(type, url, isAsync)

      if (type === 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-rulencoded')
        xhr.send(str)
      } else {
        xhr.send()
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            let res = dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
            resolve(res) // 请求成功，返回数据
          } else {
            reject(xhr.status) // 请求失败，返回状态码
          }
        }
      }
    })
  }
}


$.get('https://jsonplaceholder.typicode.com/comments', { postId: 1 }, function (res, status, xhr) {
  console.log(res, status, xhr)
}, 'json')

$.post('https://jsonplaceholder.typicode.com/posts', null, function (res, status, xhr) {
  console.log(res, status, xhr)
}, 'json')

$.ajax({
  url: 'https://jsonplaceholder.typicode.com/comments', // 请求的URL
  type: 'get', //请求类型,若为post,则表示发送post请求
  data: { postId: 1 },     // 请求携带数据
  dataType: 'json',  // 接收的数据类型
  isAsync: true
}).then(res => {
  console.log(res) // 请求成功，返回数据
}).catch(status => {
  console.log(status) // 请求失败，返回状态码
})
```











