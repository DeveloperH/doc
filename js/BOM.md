# BOM

BOM(`Browser Object Model`) : 是指浏览器对象模型，是用于描述这种对象与对象之间层次关系的模型。

BOM由多个对象组成，其中代表浏览器窗口的`window`对象是BOM的顶层对象，其他对象都是该对象的子对象。



## window 浏览器对象

window对象是一个全局对象，表示浏览器目前正打开的窗口。

window下的属性和方法可以省略 `window.`

### 属性

* self : 返回一个指向当前 window 对象的引用。指的就是window对象本身
* window : window对象的 `window` 属性指向这个window对象本身。
* name : 获取/设置窗口的名称。窗口的名字主要用于为超链接和表单设置目标(`targets`)。窗口不需要有名称。
* document : 只读属性，返回当前窗口内的文档节点(`document`)
* history : 只读属性，用来获取 `History` 对象的引用
* navigator : 只读属性，返回对 `Navigator` 对象的引用。
* location : 返回一个 `Location` 对象，其中包含有关文档当前位置的信息。
* screen : 返回当前window的`screen`对象。
* localStorage : 只读属性，返回一个可被用于访问当前源的本地存储空间的 `Storage` 对象的引用
* sessionStorage : 返回一个可被用于访问当前源的会话存储空间的 `Storage` 对象的引用
* opener : 返回对打开当前窗口的那个窗口的引用。在window A中打开了window B，B.opener 返回 A.
  * 如果当前窗口不是由其他窗口打开的, 则该属性返回 null.
* parent : 只读属性，返回当前窗口或子窗口的父窗口的引用。
  * 如果一个窗口没有父窗口,则它的 `parent` 属性为自身的引用.
  * 如果当前窗口是一个 `<iframe>`, `<object>`, 或者 `<frame>`,则它的父窗口是嵌入它的那个窗口
* top : 返回当前窗口最顶层的父窗口.
  *  `window.parent` 返回当前窗口的直接父对象，而 `window.top` 返回最顶层的窗口对象。
  *  当你在处理父窗口的子框架（subframe），而你想获取顶层框架时，这个属性相当有用。
* crypto : 只读属性，返回与全局对象关联的 `Crypto` 对象。此对象允许网页访问某些加密相关服务。

```js
var crypto = window.crypto || window.msCrypto  // for IE 11
var arr = new Uint32Array(1)        // 生成的随机数储存在数组上
window.crypto.getRandomValues(arr)  // 生成符合密码学要求的安全的随机值
console.log(arr)
```



* innerHeight : 获得浏览器窗口的内容区域的高度(px)，包含水平滚动条。不包含控制台占用位置。
* innerWidth : 获得浏览器窗口的内容区域的宽度(px)，包含垂直滚动条。
* outerHeight : 获得整个浏览器窗口的高度(px)，注:有偏差
* outerWidth : 获得整个浏览器窗口的宽度(px)，注:有偏差
* length : 返回当前窗口中包含的框架数量(框架包括`frame`和`iframe`两种元素)
* scrollX : 只读属性，返回文档/页面水平方向已滚动的像素值。IE9以下不支持
* scrollY : 只读属性，返回文档在垂直方向已滚动的像素值。IE9以下不支持
* pageXOffset : `scrollX` 的别名。推荐
* pageYOffset : `scrollY` 的别名。推荐
* screenX : 只读属性，返回浏览器左边框到左边屏幕边缘的 CSS 像素数。
* screenY : 只读属性，返回浏览器上边框到屏幕上边缘的 CSS 像素数。
* screenLeft : 只读属性，返回浏览器左边框到左边屏幕边缘的 CSS 像素数。`screenX`的别名。推荐
* screenTop : 只读属性，返回浏览器上边框到屏幕上边缘的 CSS 像素数。`screenY`的别名。推荐

```js
console.log(window.innerHeight)
console.log(window.innerWidth)
console.log(window.outerHeight)
console.log(window.outerWidth)

// 为了跨浏览器兼容，请使用 window.pageYOffset 代替 window.scrollY。
// 另外，旧版本IE（<9）两个属性都不支持，必须使用其他的非标准属性。完整的兼容性代码如下：
var x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
```



### 方法

* alert(message) : 消息框
* confirm(message) : 确认框(确认返回true,否则返回false)
* prompt(message [,value]) : 输入框，返回用户的输入。当用户点击"确定"按钮后，文本输入框中的文字被返回。如果文本输入框中为空,则返回一个空字符串。如果用户点击"取消"按钮，则返回null。
  * defstr : 可选，文本输入框中的默认值
* setTimeout(表达式, 毫秒) : 设置定时器，执行一次
* setInterval(表达式, 毫秒) : 设置定时器，反复执行
* clearTimeout(定时器对象) : 清除定时器，推荐
* clearInterval(定时器对象) : 清除定时器
* print() : 打开打印对话框以打印当前文档。
* close() : 关闭当前窗口
* stop() : 停止窗口加载。效果相当于点击了浏览器的停止按钮。由于脚本的加载顺序，该方法不能阻止已经包含在加载中的文档，但是它能够阻止图片、新窗口、和一些会延迟加载的对象的加载。
* scrollBy(x, y) : 页面相对滚动。`IE11支持`
* scrollTo(x, y) : 页面绝对滚动
* scroll(x, y) : 页面滚动，等同于scrollTo()
* scrollBy(options) : 页面滚动。options 是一个包含三个属性的对象。`IE不支持`
  * top : 等同于  y-coord
  * left : 等同于  x-coord
  * behavior : 表示滚动行为，支持参数：smooth (平滑滚动)，instant (瞬间滚动)，默认值 auto，效果等同于 instant
  * 同样适用于scrollTo()、scroll()
* blur() : 将焦点移出顶层窗口
* focus() : 获得焦点
* moveBy(x, y) : 相对移动浏览器位置
  * IE可用，Chrome不可用
  * Firefox中，依据下面的规则，不能再移动一个浏览器里的窗口。
    * 不能移动非 `window.open` 创建的窗口或 Tab。
    * 当一个窗口里有多于一个 Tab 时，不能移动该窗口。
* moveTo(x, y) : 绝对移动浏览器位置
  * 规则同moveBy()
* resizeBy(x, y) : 相对改变窗口尺寸
  * 规则同moveBy()
* resizeTo(x, y) : 绝对改变窗口尺寸
  * 规则同moveBy()
* atob(value) : 对经过 `base-64` 编码的字符串进行解码
* btoa(value) : 二进制数据字符串创建base-64编码的ASCII字符串。



```js
alert('hi')
confirm('确认提交吗？')
prompt('请输入您的意见：')

setTimeout('alert("hi")', 2000)
setTimeout(say, 2000)


function say(){
  console.log('hi')
}
function clear(){
  clearTimeout(timer, 10000)
  console.log('已清除定时器')
}

// setTimeout()/setInterval()都会返回一个定时器对象
var timer = setInterval(say, 2000)
setTimeout(clear, 10000)

scrollBy(100, 300)

scrollBy({
  top: 9999,
  left: 0,
  behavior: 'smooth'
})
```



#### open()

打开一个新窗口。浏览器可能会拦截打开

用指定的名称将指定的资源加载到浏览器上下文（窗口 window ，内嵌框架 iframe 或者标签 tab ）。如果没有指定名称，则一个新的窗口会被打开并且指定的资源会被加载进这个窗口的浏览器上下文中。

```js
let windowObjectReference = window.open(strUrl, strWindowName, [strWindowFeatures])
```

* WindowObjectReference : 打开的新窗口对象的引用。如果调用失败，返回值会是 `null` 。如果父子窗口满足"`同源策略`"，你可以通过这个引用访问新窗口的属性或方法。
* strUrl : 新窗口需要载入的url地址。strUrl可以是web上的html页面也可以是图片文件或者其他任何浏览器支持的文件格式。
  * 如果是一个空值，那么打开的窗口将会是带有默认工具栏的空白窗口（加载about:blank）。
* strWindowName : 新窗口的名称。该字符串可以用来作为超链接 `<a>` 或表单 `<form>` 元素的目标属性值。字符串中不能含有空白字符。注意：strWindowName 并不是新窗口的标题。
* strWindowFeatures : 可选参数。是一个字符串值，这个值列出了将要打开的窗口的一些特性(窗口功能和工具栏) 。 字符串中不能包含任何空白字符，特性之间用逗号分隔开。

注意：调用`window.open()`方法以后，远程 URL 不会被立即载入，载入过程是异步的。（实际加载这个URL的时间推迟到当前脚本块执行结束之后。窗口的创建和相关资源的加载异步地进行。）

```js
window.open('test.html')
```



#### fetch()

用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 `Response` 对象。`IE不支持`

缺点： 兼容性不好

解决方案 polyfill： https://github.com/camsong/fetch-ie8

```
Promise<Response> fetch(input[, init])
```

* input : 定义要获取的资源。这可能是：
  * 要获取资源的 URL。一些浏览器会接受 `blob:` 和 `data:` 作为 schemes.
  * 一个 `Request` 对象。
* init : 可选，一个配置项对象，包括所有对请求的设置。可选的参数有：
  * `method`: 请求使用的方法，如 `GET、POST。`
  * `headers`: 请求的头信息，形式为 `Headers` 的对象或包含 ByteString 值的对象字面量。
  * `body`: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
  * `mode`: 请求的模式，如 `cors、` `no-cors 或者` `same-origin。`
  * `credentials`: 请求的 credentials，如 `omit、``same-origin 或者` `include`。为了在当前域名内自动发送 cookie ， 必须提供这个选项
  * `cache`:  请求的 cache 模式: `default`、 `no-store`、 `reload` 、 `no-cache `、 `force-cache `或者 `only-if-cached` 。
  * `redirect`: 可用的 redirect 模式: `follow` (自动重定向), `error` (如果产生重定向将自动终止并且抛出一个错误）, 或者 `manual` (手动处理重定向). 
  * `referrer`: 可以是 `no-referrer、``client`或一个 URL。默认是 `client。`
  * `referrerPolicy`: 指定了HTTP头部referer字段的值。可能为以下值之一： `no-referrer、` `no-referrer-when-downgrade、` `origin、` `origin-when-cross-origin、` `unsafe-url 。`
  * `integrity`: 包括请求的`子资源完整性值` ，它通过验证获取文件的哈希值是否和你提供的哈希值一样来判断资源是否被篡改。（ 例如： `sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。`
* 返回值 : 一个 Promise，resolve 时回传 `Response` 对象。



```js
// get  res.json()转为json格式  res.text()转为文本
fetch(url).then(res=>res.json()).then(res=>{console.log(res)})
fetch(url).then(res=>res.text()).then(res=>{console.log(res)})
          
// post
fetch(url, {
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'name=hlw&age=100'
}).then(res=>res.text()).then(res=>{console.log(res)})

// 注意：fetch请求默认是不带cookie的，需要设置 credentials: 'include'
fetch(url, {
  // credentials: 'include',
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name: 'hlw', age: 18})
}).then(res=>res.text()).then(res=>{console.log(res)})
```



#### postMessage()

`window.postMessage()` 方法可以安全地实现跨源通信。`IE10支持`

为一个窗口向另一个窗口发送数据字符串提供了一种安全方法，该窗口不必与第一个窗口处于相同的域中。

```js
otherWindow.postMessage(message, targetOrigin, [transfer])
```

* otherWindow : 其他窗口的一个引用，比如iframe的`contentWindow`属性、执行`window.open`返回的窗口对象、或者是命名过或数值索引的`window.frames`。
  * 如果是使用open()返回的窗口对象并马上调用postMessage()会无效。因为是open()是异步载入的。
* message : 将要发送到其他 window的数据。
* targetOrigin : 通过窗口的`origin`属性来指定哪些窗口能接收到消息事件，其值可以是字符串`"*"`（表示无限制）或者一个`URI`。
  * 在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配`targetOrigin`提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。
* transfer : 可选，是一串和message 同时传递的 `Transferable` 对象。一般不会用到。



对于发送过来的消息，通过监听`message`事件进行处理。

```js
window.addEventListener('message', function(event){
  console.log(event)
}, false)
```

message的属性有:

* data : 从其他 window 中传递过来的对象。
* origin : 调用 `postMessage` 时消息发送方窗口的 `origin` . 这个字符串由 协议、“://“、域名、“ : 端口号”拼接而成。
* source : 对发送消息的`窗口对象`的引用; 可以使用此来在具有不同origin的两个窗口之间建立双向通信。



##### 安全问题

**如果您不希望从其他网站接收message，请不要为message事件添加任何事件侦听器。** 这是一个完全万无一失的方式来避免安全问题。

如果您确实希望从其他网站接收message，请**始终使用origin和source属性验证发件人的身份**。

**当您使用postMessage将数据发送到其他窗口时，始终指定精确的目标origin，而不是\*。** 恶意网站可以在您不知情的情况下更改窗口的位置，因此它可以拦截使用postMessage发送的数据。



##### 示例

```html
<!-- 主页面index.html -->
<script>
  window.onload = function(){
    document.getElementById('child').contentWindow.postMessage('父页面发送给子页面的消息', '*')
  }

  window.addEventListener('message', function(event){
    console.log(event)
    let msg = `收到${event.origin}消息:${event.data}`
    document.getElementById('message').innerHTML = msg
  }, false)

</script>

<body>
  <h1>主页面</h1>
  <iframe src="test.html" id="child" width="500"></iframe>
  <div>
    <h2>主页面接收消息区域</h2>
    <span id="message"></span>
  </div>
</body>
```

```html
<!-- 子页面test.html -->
<script>
  top.postMessage('子页面发送给父页面的消息', '*')
  window.addEventListener('message', function(event){
    console.log(event)
    // 如果您确实希望从其他网站接收message，请始终使用origin和source属性验证发件人的身份
    // if(event.origin != 'http://127.0.0.1:5500')
    //   return
    let msg = `收到${event.origin}消息:${event.data}`
    document.getElementById('message').innerHTML = msg
  }, false)
</script>

<body>
  <h3>子页面</h3>
  <span id="message"></span>
</body>
```











#### getComputerStyle()

* getComputerStyle(element, pseudoElt) : 获取指定元素的计算样式。计算样式表示元素的所有CSS属性的计算值。`IE9起支持`
  * element : 用于获取计算样式的元素。
  * pseudoElt : 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或`null`）。
  * 返回一个实时的 `CSSStyleDeclaration` 对象，当元素的样式更改时，它会自动更新本身。

```js
let elem = document.getElementById('pid')
let style = window.getComputedStyle(elem, null)	// 获取指定元素的计算样式
let res = style.getPropertyValue('color')		// 获取指定CSS属性的值

// getComputedStyle 可以从伪元素拉取样式信息 
let result = window.getComputedStyle(document.getElementById('h3'), '::after').content
```





## history 会话历史对象

`History` 对象提供了操作浏览器会话历史（浏览器地址栏中访问的页面，以及当前页面中通过框架加载的页面）的接口。

* length : 只读，返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回1。
* back() : 在会话历史记录中向后移动一页(`←`)。如果没有上一页，则此方法调用不执行任何操作
* forward() : 在会话历史中向前移动一页(`→`)。如果没有下一页，则此方法调用不执行任何操作
* go(delta) : 从会话历史记录中加载特定页面。你可以使用它在历史记录中前后移动，具体取决于`delta`参数的值。
  * delta : 相对于当前页面你要去往历史页面的位置。负值表示向后移动，正值表示向前移动
  * 如果未向该函数传参或`delta`相等于0，则该函数与调用`location.reload()`具有相同的效果。
  * 如果当前页为第一页，前面已经没有页面了，我传参的值为-1，那么这个方法没有任何效果也不会报错



```js
var result = window.history.length
window.history.back()			// 等价于 history.go(-1)
window.history.forward()	// 等价于 history.go(1)

history.go(2)		// 向前移动两页
history.go(-2)	// 向后移动两页
history.go()		// 重新加载当前页面
```





## location 地址栏对象

* href : 完整的URL信息
* protocol : URL对应的协议，最后有一个"`:`"
* host : 域名，可能在该串最后带有一个"`:`"并跟上URL的端口号。
* hostname : 域名，不会加端口号
* port : 端口号
* pathname : 路径部分地址，开头有个`/`
* search : 查询字符串(URL参数)，开头有个`?`。可以通过修改 `search` 属性向服务器发送字符串数据
* hash : 包含URL标识中的 '#' 和 后面URL片段标识符。开头有个`#`
* origin : 协议+域名。(不包含路径)
* assign(url) : 跳转到指定URL
* replace(url) : 用给定的URL替换掉当前的资源。与 `assign()` 方法不同的是用 `replace()`替换的新页面不会被保存在会话的历史 `History`中，这意味着用户将不能用后退按钮转到该页面。
* reload([forcedReload]) : 重新加载当前页面。
  * forcedReload : 可选参数，当取值为 `true` 时，将强制浏览器从服务器重新获取当前页面资源，而不是从浏览器的缓存中读取，如果取值为 `false` 或不传该参数时，浏览器则可能会从缓存中读取当前页面。
* toString() : 返回整个URL。和`location.href`值相同

```js
// https://www.huangyihui.cn/test/?q=abc#content
console.log(location.href)        // "https://www.huangyihui.cn/test/?q=abc#content"
console.log(location.protocol)    // "https:"
console.log(location.host)        // "www.huangyihui.cn"
console.log(location.hostname)    // "www.huangyihui.cn"
console.log(location.port)        // ""
console.log(location.pathname)    // "/test/"
console.log(location.search)      // "?q=abc"
console.log(location.hash)        // "#content"
console.log(location.origin)      // "https://www.huangyihui.cn"

// 页面跳转的方式
location = 'https://www.huangyihui.cn'
location.href = 'https://www.huangyihui.cn'
location.assign('https://www.huangyihui.cn')
location.replace('https://www.huangyihui.cn')

location.reload(true)
console.log(location.toString())

// 获取 URL 参数中的 type 参数
let type = new URLSearchParams(location.search).get('type');
```





## navigator 浏览器信息对象

`Navigator` 接口表示用户代理的状态和标识。可以用于请求运行当前代码的应用程序的相关信息。

* cookieEnabled : 只读属性，返回一个布尔值，来表示当前页面是否启用了cookie。当忽略 cookie 时返回 false，否则返回 true
* gelocation : 只读属性，返回一个 `Geolocation` 对象，据之可访问设备的地理位位置信息。
  * 详见: https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation
* hardwareConcurrency : 只读属性，返回可用的逻辑处理器CPU核心数。`IE不支持。`
* language : 只读属性，返回用户的首先语言，通常是浏览器用户界面的语言
* onLine : 返回浏览器的联网状态。正常联网（在线）返回 `true`，不正常联网（离线）返回 `false`。
* platform : 返回一个字符串，表示浏览器所在的系统平台类型
  * `platform` 可能是: "Win32", "Linux i686", "MacPPC", "MacIntel", 等.
* userAgent : 只读属性，返回当前浏览器的用户代理。尽量不要使用这一属性，用户可以修改浏览器的此属性(UA 欺骗)
* sendBeacon(url, data) : 可用于通过HTTP将少量数据异步传输到Web服务器。`IE不支持`
  * url : `url` 参数表明 `data` 将要被发送到的网络地址。
  * data : data参数是将要发送的 `ArrayBufferView` 或 `Blob`, `DOMString`或者`FormData` 类型的数据。
  * 返回值 : 当用户代理成功把数据加入传输队列时，该方法将会返回 `true`，否则返回 `false`。



## screen 屏幕信息对象

screen对象返回当前渲染窗口中和屏幕有关的属性。

* height : 屏幕高度px
* width : 屏幕宽度px
* availHeight : 可用高度，返回浏览器窗口在屏幕上可占用的垂直空间，即最大高度。不包括任务栏。
* availWidth : 可用宽度，返回浏览器窗口在屏幕上可占用的水平宽度
* colorDepth : 返回屏幕的色彩深度。根据CSSOM( CSS对象模型 )视图，为兼容起见，该值总为24。
* pixelDepth : 返回屏幕的位深度/色彩深度。根据CSSOM( CSS对象模型 )视图，为兼容起见，该值总为24
* orientation : 返回一个`ScreenOrientation`的实例，表示屏幕的方向。
  * 在更早的、有前缀的版本(`msOrientation`)中会返回一个字符串来表示屏幕方向

```js
document.write(screen.height+"<br>")
document.write(screen.width+"<br>")
document.write(screen.availHeight+"<br>")
document.write(screen.availWidth+"<br>")
document.write(screen.colorDepth+"<br>")
```







### gelocation属性

```js
// 获取位置信息
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function success(pos) {
  var crd = pos.coords

  console.log('Your current position is:')
  console.log('Latitude : ' + crd.latitude)
  console.log('Longitude: ' + crd.longitude)
  console.log('More or less ' + crd.accuracy + ' meters.')
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message)
}

navigator.geolocation.getCurrentPosition(success, error, options)
```

### sendBeacon()

这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（`unload`）文档之前向web服务器发送数据。然而用户代理通常会忽略在 `unload` 事件处理器中产生的异步 `XMLHttpRequest`。

```js
// 在卸载事件处理器中尝试通过一个同步的 XMLHttpRequest 向服务器发送数据。这导致了页面卸载被延迟。
window.addEventListener('unload', logData, false)

function logData() {
  var client = new XMLHttpRequest()
  client.open("POST", "/log", false)	// 第三个参数表明是同步的 xhr
  client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  client.send(analyticsData)
}
```

使用 **`sendBeacon() `**方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。

```js
// 通过使用 sendBeacon() 方法向服务器发送数据。
window.addEventListener('unload', logData, false)

function logData() {
  navigator.sendBeacon("/log", analyticsData)
}
```





## Storage 本地存储对象

作为 Web Storage API 的接口，`Storage` 提供了访问特定域名下的会话存储或本地存储的功能，例如，可以添加、修改或删除存储的数据项。

如果你想要操作一个域名的会话存储，可以使用 `Window.sessionStorage` 。如果想要操作一个域名的本地存储，可以使用 `Window.localStorage`。



不同之处在于 `localStorage` 里面存储的数据没有过期时间设置，而存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。



* length : 只读属性，返回一个整数，表示存储在 `Storage` 对象中的数据项数量。
* setItem(keyName, keyValue) : 接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。
* getItem(keyName) : 接受一个键名作为参数，返回键名对应的值。如果键名不存在，则返回 `null`。
* key(n) : 接受一个数值n作为参数，并返回存储中的第 n 个键名。索引从0开始。超出索引则返回`null`
  * 键的存储顺序是由用户代理定义的，所以尽可能不要依赖这个方法。
* removeItem(keyName) : 接受一个键名作为参数，并把该键名从存储中删除。
* clear() : 调用该方法会清空存储中的所有键值。

```js
console.log(localStorage.length)
localStorage.setItem('color', 'red')
localStorage.setItem('fontSize', '14px')

console.log(localStorage.getItem('color'))
console.log(localStorage.key(0))

localStorage.removeItem('color')
localStorage.clear()
```

```js
console.log(sessionStorage.length)
sessionStorage.setItem('color', 'red')
sessionStorage.setItem('fontSize', '14px')

console.log(sessionStorage.getItem('color'))
console.log(sessionStorage.key(0))

sessionStorage.removeItem('color')
sessionStorage.clear()
```

```html
<!-- 下面的示例会自动保存一个文本输入框的内容，如果浏览器因偶然因素被刷新了，文本输入框里面的内容会被恢复，因此写入的内容不会丢失。-->
<input type="text" id="content">
<script>
  let content = document.getElementById('content')
  if(sessionStorage.getItem('autosave')){
    content.value = sessionStorage.getItem('autosave')
  }
  content.onchange = function(){
    sessionStorage.setItem('autosave', content.value)
  }
</script>
```







## setTimeout和setInterval的区别

setInterval会反复执行，setTimeout只执行一次。

setTimeout语句执行时，会被反复编译。

setInterval语句执行时，只会编译一次。





## TODO Web API

[效果演示](https://web-api-examples.github.io/fullscreen.html)

[代码示例](https://mp.weixin.qq.com/s/e98Rhuc5GmuSO41rreHt9A)



### Web Audio API

Audio API 允许我们在 Web 上操作音频流，它可以用于 Web 上的音频源添加效果和过滤器。音频源可以来自`<audio>`、视频/音频源文件或音频网络流。



```html
<body>
    <header>
        <h2>Web APIs<h2>
    </header>
    <div class="web-api-cnt">

        <div class="web-api-card">
            <div class="web-api-card-head">
                Demo - Audio
            </div>
            <div class="web-api-card-body">
                <div id="error" class="close"></div>
                <div>
                    <audio controls src="./audio.mp3" id="audio"></audio>
                </div>

                <div>
                    <button onclick="audioFromAudioFile.init()">Init</button>
                    <button onclick="audioFromAudioFile.play()">Play</button>
                    <button onclick="audioFromAudioFile.pause()">Pause</button>
                    <button onclick="audioFromAudioFile.stop()">Stop</button>
                </div>
                <div>

                    <span>Vol: <input onchange="audioFromAudioFile.changeVolume()" type="range" id="vol" min="1" max="2" step="0.01" value="1" /></span>
                    <span>Pan: <input onchange="audioFromAudioFile.changePan()" type="range" id="panner" min="-1" max="1" step="0.01" value="0" /></span>
                </div>

            </div>
        </div>

    </div>
</body>

<script>
    const l = console.log
    let audioFromAudioFile = (function() {
        var audioContext
        var volNode
        var pannerNode
        var mediaSource

        function init() {
            l("Init")
        try {
                audioContext = new AudioContext()        
                mediaSource = audioContext.createMediaElementSource(audio)
                volNode = audioContext.createGain()
                volNode.gain.value = 1
                pannerNode = new StereoPannerNode(audioContext, { pan:0 })

                mediaSource.connect(volNode).connect(pannerNode).connect(audioContext.destination)
            }
            catch(e) {
                error.innerHTML = "此设备不支持 Web Audio API"
                error.classList.remove("close")
            }
        }

        function play() {
            audio.play()            
        }

        function pause() {
            audio.pause()
        }

        function stop() {
            audio.stop()            
        }

        function changeVolume() {
            volNode.gain.value = this.value
            l("Vol Range:",this.value)
        }

        function changePan() {
            pannerNode.gain.value = this.value
            l("Pan Range:",this.value)
        }

        return {
            init,
            play,
            pause,
            stop,
            changePan,
            changeVolume
        }
    })()
</script>
```

这个例子中将音频从 `<audio>` 元素传输到 `AudioContext`，声音效果（如平移）在被输出到音频输出（扬声器）之前被添加到音频源。

按钮 Init 在单击时调用 `init` 函数。这将创建一个 `AudioContext` 实例并将其设置为 `audioContext`。接下来，它创建一个媒体源 `createMediaElementSource(audio)`，将音频元素作为音频源传递。音量节点 `volNode` 由 `createGain` 创建，可以用来调节音量。接下来使用 `StereoPannerNode` 设置平移效果，最后将节点连接至媒体源。

点击按钮（Play、Pause、Stop）可以播放、暂停和停止音频。页面有一个音量和平移的范围滑块，滑动滑块就可以调节音频的音量和平移效果。



### Fullscreen API

Fullscreen API 用于在 Web 应用程序中开启全屏模式，使用它就可以在全屏模式下查看页面/元素。在安卓手机中，它会溢出浏览器窗口和安卓顶部的状态栏（显示网络状态、电池状态等的地方）。

Fullscreen API 方法：

- `requestFullscreen`：系统上以全屏模式显示所选元素，会关闭其他应用程序以及浏览器和系统 UI 元素。
- `exitFullscreen`：退出全屏模式并切换到正常模式。







## 主流浏览器

浏览器由两部分组成：shell 、内核。

shell 主要是浏览器的界面外观等功能。内核决定了浏览器的处理速度、优化等。



| 浏览器        | 内核         |
| ------------- | ------------ |
| Google Chrome | webkit/blink |
| Safari        | webkit       |
| Firefox       | Gecko        |
| IE            | trident      |
| Opera         | presto       |















































