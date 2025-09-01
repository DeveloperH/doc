# HTML5 

## 了解H5

2014年10月，H5标准制定完成。

要使用H5，需要在HTML文件的第一行声明：`<!DOCTYPE html>`



## 标签

###  `<html>` 

属性：

* lang : 声明网页内容所用语言。常用值为"zh-CN"，前两个字符定义语言代码，后两个字符定义国家代码。



### `<head>`

​	用于定义文档的头部，它是所有头部元素的容器。`<head>` 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等等。



### `<body>`

​	用于定义文档的主体，包含文档的所有内容(比如文本、超链接、图像、表格和列表等等)。



### `<meta>`

​	用于提供有关页面的元信息(meta-information)，例如设置编码、关键字、描述和网站SEO等。

​	`<meta>`标签的属性定义了与文档相关联的名称/值对。

属性：

* charset : 设置编码。常用值为UTF-8
* name : 把content属性关联到一个名称。
  * author : 作者信息
  * keywords : 网站关键字信息
  * description : 网站描述信息
  * viewport : 视口信息
  * 自定义名称...
* content : 定义与http-equiv属性或name属性相关的元信息(关键字或描述内容等)。
* http-equiv : 把content属性关联到HTTP头部。使用带有 http-equiv 属性的 `<meta>` 标签时，服务器将把名称/值对添加到发送给浏览器的内容头部，以帮助正确的显示网页内容。
  * X-UA-Compatible : 指定网页的兼容性模式设置。
  * Content-Type : 文档类型
  * Refresh : 重定向
  * ...
  * 上述值都不区分大小写

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
<meta name="keywords" content="HTML5,JAVASCRIPT,CSS" />
<meta name="description" content="这是介绍HTML5基础的页面" />
<meta name="renderer" content="webkit" />

<!-- IE8以下无效，效果是如果安装了GCF，则使用GCF来渲染页面，如果没安装GCF，则使用最高版本的IE内核进行渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- 重定向，其中5表示5秒后跳转 -->
<meta http-equiv="Refresh" content="5;url=https://www.huangyihui.cn" />

<!-- 禁止页面缓存 -->
<meta http-equiv="Cache-Control" content="no-cache">

<!-- 忽略自动识别电话和邮箱 -->
<meta name="format-detection" content="telephone=no, email=no">
```



### `<link>`

​	用于引入css样式、引入网站icon图标、引入dns预解析等。

属性：

* rel : 规定当前文档与被链接文档之间的关系。
  * stylesheet : 样式表
  * icon : 图标
  * dns-prefetch ：dns预解析
  * 更多...
* href : 规定被链接文档的位置/路径。
* type : 规定被链接文档的 MIME 类型(非必填)。

```html
<link rel="stylesheet" type="text/css" href="/html/csstest1.css" >
<link rel="stylesheet" href="style.css" >
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="dns-prefetch" href="//s1.hdslb.com" >
```



### `<title>`

​	用于定义文档的标题。



### `<style>`

​	用于为 HTML 文档定义样式信息。style 元素位于 head 部分中。

属性：

* type : 规定样式表的 MIME 类型。唯一可能的值是 "text/css"。
* media : 用于为不同的媒介类型规定不同的样式(非必填)。
  * screen : 计算机屏幕（默认值）。
  * print : 打印预览模式 / 打印页。
  * all : 适合所有设备。
  * 更多...

```html
<!-- 针对两种不同媒介类型的两种不同的样式(计算机屏幕和打印) -->
<style type="text/css">
	h1 {color:#FF0000;}
</style>

<style type="text/css" media="print">
	h1 {color:#000000;}
</style>
```



### `<script>`

​	用于定义客户端脚本，比如 JavaScript。

​	script 元素可以选择包含脚本语句，或通过 src 属性指向外部脚本文件。所有 `<script>` 元素会依照它们在网页中出现的次序被解释。

​	可以把 `<script>` 元素放到页面末尾，让文档渲染完毕后再执行。

属性：

* src : 规定外部脚本文件的 URL。
* async : 规定异步执行脚本（仅适用于外部脚本）。一旦脚本可用，则会异步执行。且并不保证能按照它们出现的次序执行。
* defer : 表示脚本可以延迟到文档完全被解析和显示之后执行（仅适用于外部脚本）。当脚本需要依赖于页面加载完成，就可以使用该属性。
* type : 指示脚本的 MIME 类型。值一般为"text/javascript"。如果这个值是 module，则代码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。建议省略这个属性。

```html
<script type="text/javascript">
	document.write("Hello World!")
</script> 

<script src="vue.js"></script>
<script type="text/javascript" src="myscripts.js" charset="UTF-8"></script>

<!-- async 和 defer属性 可以不用写值，值默认是它们本身 -->
<script type="text/javascript" defer src="demo_defer.js" ></script>
<script type="text/javascript" async src="demo_async.js" ></script>
```

**有多种执行外部脚本的方法：**

* 如果使用 async：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
* 如果使用 defer：脚本将在页面完成解析时执行
* 如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本



### `<noscript>`

​	用于定义在脚本未被执行时的替代内容（文本）。此标签可被用于可识别 `<script>` 标签但无法支持其中的脚本的浏览器。

​	如果浏览器支持脚本，那么它不会显示出 noscript 元素中的文本。

```html
<body>
  <script type="text/javascript">
    <!--
    document.write("Hello World!")
    //-->
  </script>
  
  <noscript>Your browser does not support JavaScript!</noscript>
</body>
```



### `<base>`

​	用于定义页面中所有链接的默认地址或默认目标。该标签必须位于 head 元素内部。

​	浏览器将不再使用当前文档的 URL，而使用指定的基本 URL 来解析所有的相对 URL。这其中包括 `<a>`、`<img>`、`<link>`、`<form>` 标签中的 URL。

属性：

* href : 规定页面中所有相对链接的基准 URL。如有多个href，只有第一个声明的href才有效。
* target : 在何处打开页面中所有的链接。
  * _self(默认) / _blank / _top / _parent / framename

```html
<head>
  <base href="https://www.huangyihui.cn/i/" />
  <base target="_blank" />
</head>
<body>
  <img src="eg_smile.gif" alt="图片加载失败" /><br />
	<p>请注意，我们已经为图像规定了一个相对地址。由于我们已经在 head 部分规定了一个基准 URL，浏览器将在如下地址寻找图片：</p>
	<p>"https://www.huangyihui.cn/i/eg_smile.gif"</p>

	<br /><br />
	<p><a href="https://www.huangyihui.cn">首页</a></p>
	<p>请注意，链接会在新窗口中打开，即使链接中没有 target="_blank" 属性。这是因为 base 元素的 target 属性已经被设置为 "_blank" 了。</p>
</body>
```



### `<div>`

​	用于定义文档中的节。`<div>` 是一个块级元素。

可选属性：

* align : 规定div元素中内容的排列。不推荐使用。请使用样式`text-align`替代它。
  * left : 左对齐内容。
  * right : 右对齐内容。
  * center : 居中对齐内容。
  * justify : 对行进行伸展，这样每行都可以有相等的长度（就像在报纸和杂志中）。

```html
<div align="center">
  This is some text!
</div>

<div style="text-align:center">
  This is some text!
</div>
```



### `<h1> to <h6>`

​	用于定义 HTML 标题。其中有六个不同的 HTML 标题。

可选属性：

* align : 规定标题中文本的排列。不推荐使用。请使用样式`text-align`替代它。
  * left
  * center
  * right
  * justify

```html
<h2 align="center">
  This is some text!
</h2>

<h2 style="text-align:center">
  This is some text!
</h2>
```



### `<p>`

​	用于定义段落。

可选属性：

* align : 规定段落中文本的排列。不推荐使用。请使用样式`text-align`替代它。
  * left
  * center
  * right
  * justify



### `<a>`

​	用于定义超链接。

属性：

* href : 规定链接指向的页面的 URL。如果不使用 href 属性，则不可以使用如下属性：download, hreflang, media, rel, target 以及 type 属性。
  * 超链接 `href="https://www.huangyihui.cn"`
  * 锚点 `href="#chapter1"`
  * 打电话 `href="tel:10086"`
  * 发邮件 `href="mailto:zhangsan@qq.com"`
  * 发短信 `href="sms:10086"`
* target : 规定在何处打开链接文档。
  * _self : 默认。在当前窗口或相同的框架中打开被链接文档。
  * _blank : 在新窗口中打开被链接文档。
  * _parent : 在父框架集中打开被链接文档。
  * _top : 在整个窗口中打开被链接文档。
  * framename : 在指定的框架中打开被链接文档。
* download : 规定被下载的超链接目标。值为文件名。如果没有值，则和目标文件名一样。
* type : 规定被链接文档的 MIME 类型。
* rel : 规定当前文档与被链接文档之间的关系。
* media : 规定被链接文档是为何种媒介/设备优化的。
* hreflang : 规定被链接文档的语言。主流的浏览器几乎都不支持 hreflang 属性。

```html
<a href="https://www.huangyihui.cn">首页</a>
<a href="https://www.huangyihui.cn" target="_blank">新窗口打开</a>
<a href="/images/myimage.jpg" download="logo">
<a href="https://www.huangyihui.cn" type="text/html">博客</a>
<a href="javascript:alert('hi')" >跳转</a>

<a href="https://www.huangyihui.cn" hreflang="zh">博客</a>
<a rel="friend" href="http://www.w3.org/">w3c</a>

<!-- 使用图像作链接 -->
<a href="/example/html/nextpage.html">
	<img border="0" src="/imgs/next.gif" />
</a>
```

```html
<!-- 锚点 -->
<a href="#here">跳到页面指定位置</a>
...
...
<h2><a name="here">我在这里</a></h2>
```

在所有浏览器中，链接的默认外观是：

- 未被访问的链接带有下划线而且是蓝色的
- 已被访问的链接带有下划线而且是紫色的
- 活动链接带有下划线而且是红色的

**可以使用CSS伪类为`<a>`标签添加样式。**



唤醒原生应用：

通过`location.href`与原生应用建立通讯渠道，这种页面与客户端的通讯方式称为**「URL Scheme」**，其基本格式为`scheme://[path][?query]` 。

- **「scheme」**：应用标识，表示应用在系统里的唯一标识
- **「path」**：应用行为，表示应用某个页面或功能
- **「query」**：应用参数，表示应用页面或应用功能所需的条件参数

`URL Scheme`一般由前端与客户端共同协商。唤醒原生应用的前提是必须在移动设备里安装了该应用，有些`移动端浏览器`即使安装了该应用也无法唤醒原生应用，因为它认为`URL Scheme`是一种潜在的危险行为而禁用它，像`Safari`和`微信浏览器`。还好`微信浏览器`可开启白名单让`URL Scheme`有效。

若在页面引用第三方原生应用的`URL Schema`，可通过抓包第三方原生应用获取其`URL`。

```css
<!-- 打开微信 -->
<a href="weixin://">打开微信</a>

<!-- 打开支付宝 -->
<a href="alipays://">打开支付宝</a>

<!-- 打开支付宝的扫一扫 -->
<a href="alipays://platformapi/startapp?saId=10000007">打开支付宝的扫一扫</a>

<!-- 打开支付宝的蚂蚁森林 -->
<a href="alipays://platformapi/startapp?appId=60000002">打开支付宝的蚂蚁森林</a>
```



### `<img>`

​	用于向网页中嵌入一副图像。

属性：

* src : 规定显示图像的 URL。
* alt : 规定图像的替代文本。
* height : 整数，定义图像的高度。单位为px或元素的百分比。
* width :整数， 定义图像的宽度。单位为px或元素的百分比。
* title : 鼠标移动到元素上时显示的文本信息。
* srcset ：以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像。
  * `<img src="small.jpg" srcset="medium.jpg 500w, large.jpg 800w" alt="">`
* align : 不推荐使用。规定如何根据周围的文本来排列图像。(可以使用float实现文本包围图片效果)
  * top : 把图像与顶部对齐
  * bottom : 把图像与底部对齐，默认
  * middle : 把图像与中央对齐
  * left : 把图像对齐到左边
  * right : 把图像对齐到右边
* border : 不推荐使用。定义图像周围的边框宽度。单位为px，值为0时可以去掉边框。
* hspace : 不推荐使用。定义图像左侧和右侧的空白。单位为px。
* vspace : 不推荐使用。定义图像顶部和底部的空白。单位为px。
* ismap : 将图像定义为服务器端图像映射。
* usemap : 将图像定义为客户器端图像映射。
* longdesc : 指向包含长的图像描述文档的 URL。

```html
<img src="./bingo.png" alt="bingo头像" title="bingo">
<img src="https://www.huangyihui.cn/bingo.png">

<img src="./bingo.png" height="200" width="200">
<img src="./bingo.png" algin="middle" border="5">
<a><img src="./bingo.png" border="0"></a>
<img src="./a.png" hspace="30" vspace="30">


<!-- 当屏幕的 dpr = 1 时，使用 images/illustration-small.png 这张图 -->
<!-- 当屏幕的 dpr = 2 时，使用 images/illustration-big.png 这张图 -->
<img
  src="illustration-small.png"
  srcset="images/illustration-small.png 1x, images/illustration-big.png 2x"
  style="max-width: 500px"
/>
```



### `<ul>`

​	用于定义无序列表。

可选属性：

* type : 规定列表的项目符号的类型。不赞成使用。请使用样式取代它(`list-style-type`)。
  * disc : 默认值，实心圆。
  * square : 实心方块。
  * circle : 空心圆。

```html
<ul type="circle">
  <li>HTML</li>
  <li>XHTML</li>
  <li>CSS</li>
</ul>

<ul style="list-style-type:circle">
  <li>HTML</li>
  <li>XHTML</li>
  <li>CSS</li>
</ul>

<ul style="list-style-type:none">
  <li>HTML</li>
  <li>XHTML</li>
  <li>CSS</li>
</ul>
```



### `<ol>`

​	用于定义有序列表。

可选属性：

* type : 规定在列表中使用的标记类型。推荐使用样式取代它(`list-style-type`)。
  * 1 : 默认值。数字有序列表。（1、2、3、4）
  * A : 按字母顺序排列的有序列表，大写。（A、B、C、D）
  * a : 按字母顺序排列的有序列表，小写。（a、b、c、d）
  * I : 罗马字母，大写。（I, II, III, IV）
  * i : 罗马字母，小写。（i, ii, iii, iv）
* start : 规定有序列表的起始值。默认为1。
* reversed : 规定列表顺序为降序。(9,8,7...)

```html
<ol type="I">
  <li>HTML</li>
  <li>CSS</li>
</ol>
<ol style="list-style-type:upper-roman">
  <li>HTML</li>
  <li>CSS</li>
</ol>

<ol start="5">
  <li>HTML</li>
  <li>CSS</li>
</ol>
<ol reversed>
  <li>HTML</li>
  <li>CSS</li>
</ol>
```



### `<li>`

​	用于定义列表的项目。

可选属性：

* type : 规定使用哪种项目符号。推荐使用样式取代它(`list-style-type`)。
  * 值可为：A/a/I/i/1/disc/square/circle
* value : 规定列表项目的数字。值为数字。

```html
<ol>
  <li>Coffee</li>
  <li type="a">Tea</li>
  <li>Milk</li>
</ol>

<ol>
  <li>Coffee</li>
  <li value="100">Water</li>
  <li>Juice</li>
  <li>Beer</li>
</ol>
```



### `<dl>` `<dt>` `<dd>`

​	用于定义自定义列表。例如京东商品分类列表。

​	dl>dt标题>多个dd项

```html
<dl>
   <dt>计算机</dt>
   <dd>用来计算的仪器 ... ...</dd>
   <dt>显示器</dt>
   <dd>以视觉方式显示信息的装置 ... ...</dd>
</dl>
```



### `<table>`

​	用于定义表格。简单的 HTML 表格由 table 元素以及一个或多个 tr、th 或 td 元素组成。

​	tr 元素定义表格行，th 元素定义表头，td 元素定义表格单元。th 元素内部的文本通常会呈现为居中的粗体文本，而 td 元素内的文本通常是左对齐的普通文本。

可选属性：

* border: 规定表格边框的宽度。单位为px。默认为0没有边框。推荐使用CSS `border`属性添加边框。
* width : 规定表格的宽度。单位为px或%。推荐使用CSS `width`属性添加宽度。
* cellpadding : 规定单元边沿与其内容之间的空白。也就是内边距。单位为px或%。推荐使用CSS `padding`属性添加内边距。
* cellspacing : 规定单元格之间的空白。也就是外边距。单位为px或%。
* frame : 规定外侧边框的哪个部分是可见的。
  * void : 不显示外侧边框。
  * above : 显示上部的外侧边框。
  * below : 显示下部的外侧边框。
  * hsides : 显示上部和下部的外侧边框。
  * vsides : 显示左边和右边的外侧边框。
  * lhs : 显示左边的外侧边框。
  * rhs : 显示右边的外侧边框。
  * box : 在所有四个边上显示外侧边框。
  * border : 在所有四个边上显示外侧边框。
* rules : 规定内侧边框的哪个部分是可见的。
  * none : 没有线条。
  * all : 位于行和列之间的线条。
  * rows : 位于行之间的线条。
  * cols : 位于列之间的线条。
  * groups : 位于行组和列组之间的线条。
* align : 规定表格相对周围元素的对齐方式。不赞成使用。请使用样式`float`代替。
  * left左对齐/right右对齐/center居中对齐
* bgcolor : 规定表格的背景颜色。不赞成使用。请使用样式`background-color`代替。
  * rgb() / #HEX / colorname
* summary : 规定表格的摘要。不会产生视觉效果。

```html
<table border="1" width="200" cellpadding="20" cellspacing="10" frame="box" rules="all" align="center" bgcolor="#ccc" summary="信息表" >
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>18</td>
  </tr>
</table>

<!-- 设置单元格间有细线分割 -->
<table frame="box" rules="all" >
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>18</td>
  </tr>
</table>
```



### `<tr>`

​	用于定义表格中的行。tr 元素包含一个或多个 th 或 td 元素。

可选属性：

* align : 定义表格行的内容对齐方式。
  * left : 左对齐内容（默认值）。
  * right : 右对齐内容。
  * center : 居中对齐内容（th 元素的默认值）。
  * justify : 对行进行伸展，这样每行都可以有相等的长度（就像在报纸和杂志中）。
  * char : 将内容对准指定字符。几乎没有浏览器能够正确地处理 "char" 值。
* valign : 规定表格行中内容的垂直对齐方式。
  * middle : 对内容进行居中对齐（默认值）。
  * top : 对内容进行上对齐。
  * bottom : 对内容进行下对齐。
  * baseline : 与基线对齐。
* bgcolor : 规定表格行的背景颜色。不赞成使用。请使用样式`background-color`代替。
  * rgb() / #HEX / colorname

```html
<table width="100%" border="1">
  <tr align="right" bgcolor="#ccc">
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr valign="bottom" align="center" height="60">
    <td>张三</td>
    <td>28</td>
  </tr>
</table>
```



### `<th>` `<td>`

​	th用于定义表格内的表头单元格。th 元素内部的文本通常会呈现为居中的粗体文本。

​	td用于定义表格内的标准单元格。td 元素内部的文本一般显示为正常字体且左对齐。

可选属性：

* align : 规定单元格内容的水平对齐方式。
  * left : 左对齐内容（td 元素的默认值）。
  * right : 右对齐内容。
  * center : 居中对齐内容（th 元素的默认值）。
  * justify : 对行进行伸展，这样每行都可以有相等的长度（就像在报纸和杂志中）。
  * char : 将内容对准指定字符。几乎没有浏览器能够正确地处理 "char" 值。
* valign : 规定单元格内容的垂直对齐方式。
  * middle : 对内容进行居中对齐（默认值）。
  * top : 对内容进行上对齐。
  * bottom : 对内容进行下对齐。
  * baseline : 与基线对齐。
* colspan : 设置单元格可横跨的列数。
* rowspan : 规定单元格可横跨的行数。
* nowrap : 规定单元格中的内容是否折行。不推荐使用。请使用样式`white-space: nowrap`替代。
* height : 规定表格单元格的高度。单位为px或%。推荐使用CSS `height`属性添加高度。
* width : 规定表格单元格的宽度。单位为px或%。推荐使用CSS `width`属性添加宽度。
* bgcolor : 规定表格单元格的背景颜色。不赞成使用。请使用样式`background-color`代替。
  * rgb() / #HEX / colorname

```html
<table width="100%" frame="box" rules="all">
  <tr>
    <th align="right">姓名</th>
    <th height="60" width="70" valign="top">年龄</th>
    <th colspan="2">住址</th>
    <th rowspan="2" bgcolor="#ccc">头像</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>28</td>
    <td>广东省</td>
    <td>广州市</td>
  </tr>
</table>
```

```html
<table width="100%" frame="box" rules="all">
  <caption align="bottom">信息表</caption>
  <tr>
    <td align="right">姓名</th>
    <td height="60" width="70" valign="top">年龄</th>
    <td colspan="2">住址</th>
    <td rowspan="2" bgcolor="#ccc">头像</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>28</td>
    <td>广东省</td>
    <td>广州市</td>
  </tr>
</table>
```



### `<caption>`

​	用于定义表格标题。该标签最好紧随table标签之后，并且一个表格只设置一个标题。

可选属性：

* align : 规定标题的对齐方式。不推荐使用，各浏览器支持的值不同。
  * top / bottom / left / right



### `<thead>` `<tbody>` `<tfoot>`

* thead 元素用于对 HTML 表格中的表头内容进行分组；
* tbody 元素用于对 HTML 表格中的主体内容进行分组；
* tfoot 元素用于对 HTML 表格中的表注（页脚）内容进行分组。

​	如果您使用 thead、tfoot 以及 tbody 元素，您就必须使用全部的元素。它们的出现次序是：thead、tfoot、tbody，这样浏览器就可以在收到所有数据前呈现页脚了

可选属性：

* align : 定义元素中内容的对齐方式。
  * right / left默认 / center / justify / char
* valign : 定义元素中内容的垂直对齐方式。
  * top / middle默认 / bottom / baseline

```html
<table border="1">
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>

  <tfoot>
    <tr>
      <td>Sum</td>
      <td>$180</td>
    </tr>
  </tfoot>

  <tbody align="right" valign="top">
    <tr height="60">
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>
</table>
```



### `<col>` `<colgroup>`

​	只能在 table 或 colgroup 元素中使用 `<col>` 标签。只能在 table 元素中使用 `<colgroup>` 标签。

​	col标签用于为表格中一个或多个列定义属性值。

​	colgroup标签用于定义表格中供格式化的列组。

属性：

* span : 规定列组应该横跨的列数。默认为1。
* width : 规定列组合的宽度。单位为px或%。

```html
<table width="100%" border="1">
  <!-- <col span="2" width="200" /> -->
  <colgroup span="2" width="250"></colgroup>
  <tr>
    <th>编号</th>
    <th>标题</th>
    <th>价格</th>
  </tr>
  <tr>
    <td>1231</td>
    <td>HTML5</td>
    <td>$66</td>
  </tr>
</table>
```





### `<form>`

​	用于为用户输入创建 HTML 表单。表单用于向服务器传输数据。

​	表单能够包含 input 元素，比如文本字段、复选框、单选框、提交按钮等等。

属性：

* action :  规定当提交表单时向何处发送表单数据。(必填)
* method : 规定用于发送 form-data 的 HTTP 方法。
  * get默认 / post
* name : 规定表单的名称。可以在脚本中通过name属性引用表单。
* target : 规定在何处打开 action URL。
  * _self : 默认。在相同的框架中打开。
  * _blank : 在新窗口中打开。
  * _parent在父框架集中打开。 / _top在整个窗口中打开。 / framename在指定的框架中打开。
* accept-charset : 规定服务器用哪种字符集处理表单数据。如需规定一个以上的字符集，使用逗号分隔。
  * UTF-8 / gb2312 / ...
* enctype : 规定在发送表单数据之前如何对其进行编码。默认地，表单数据会编码为 "`application/x-www-form-urlencoded`"。就是说，在发送到服务器之前，所有字符都会进行编码（空格转换为 "+" 加号，特殊符号转换为 ASCII HEX 值）。
  * application/x-www-form-urlencoded : 在发送前编码所有字符（默认）
  * multipart/form-data : 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
  * text/plain : 空格转换为 "+" 加号，但不对特殊字符编码。
* autocomplete : 规定是否启用表单的自动完成功能。也就是允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。
  * 适用于 `<form>`，以及下面的 `<input>` 类型：text, search, url, telephone, email, password, datepickers, range 以及 color。
  * on : 默认。规定启用自动完成功能。
  * off : 规定禁用自动完成功能
* novalidate : 如果使用该属性，则提交表单时不进行验证。默认会验证，例如邮箱输入验证。
  * 适用于 `<form>`，以及下面的 `<input>` 类型：text, search, url, telephone, email, password, datepickers, range 以及 color。
* rel : 规定链接资源和当前文档之间的关系。

```html
<form action="form_action.asp" method="get"  autocomplete="on" novalidate >
  <p>First name: <input type="text" name="fname" /></p>
  <p>Last name: <input type="text" name="lname"  autocomplete="off" /></p>
  <input type="submit" value="Submit" />
</form>
```



### `<input>`

​	用于定义输入控件。根据不同的 type 属性值，输入字段拥有很多种形式。输入字段可以是文本字段、复选框、掩码后的文本控件、单选按钮、按钮等等。

属性：

* type : 规定 input 元素的类型。
  * text : 定义单行的输入字段，用户可在其中输入文本。
  * password : 定义密码字段。该字段中的字符被掩码。
  * radio : 定义单选按钮。
  * checkbox : 定义复选框。
  * file : 定义输入字段和 "浏览" 按钮，供文件上传。
  * button : 定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）。
  * image : 定义图像形式的提交按钮。需要结合src属性和alt属性使用。
  * submit : 定义提交按钮。提交按钮会把表单数据发送到服务器。
  * reset : 定义重置按钮。重置按钮会清除表单中的所有数据。
  * hidden :  定义隐藏的输入字段。
  * search : 定义搜索框。
  * url : 定义网址输入框。自动验证内容为 `英文字符:` 开头的字符串。
  * email : 定义邮箱输入框。自动验证内容是否有`@`符号。
  * telephone : 定义文本输入框。
  * number : 定义数字输入框。自动验证是否为数字。
  * date : 定义日期选择框。
  * range : 范围滚动条。
  * datetime-local ： 日期选择框+时间。
  * month : 年月选择器。
  * time : 时分选择器。
  * week : 周数选择器。
  * color : 颜色选择器。IE不支持。
* name : 定义 input 元素的名称。
  * 只有设置了 name 属性的表单元素才能在提交表单时传递它们的值。
  * 如果需要将多个radio设为一组，它们的name值必须一致。
* placeholder : 规定帮助用户填写输入字段的提示。适用于以下的 `<input>` 类型：text, search, url, telephone, email 以及 password。
* value : 规定 input 元素的值。checkbox和radio中必须设置value属性。
  * type="button", "reset", "submit" - 定义按钮上的显示的文本
  * type="text", "password", "hidden" - 定义输入字段的初始值
  * type="checkbox", "radio", "image" - 定义与输入相关联的值
* required : 指示输入字段的值是必需的。
* readonly : 规定输入字段为只读。
* disabled : 当 input 元素加载时禁用此元素。
* autocomplete : 规定是否使用输入字段的自动完成功能。
  * on默认 / off
* autofocus : 规定输入字段在页面加载时是否获得焦点。（不适用于 type="hidden"）
* checked : 规定此 input 元素首次加载时应当被选中。通常配合checkbox和radio使用。
* maxlength : 规定输入字段中的字符的最大长度。
* size : 定义输入框的宽度。推荐用样式`style="width:100px"`替换。
  * 对于type为text/password的，size 属性定义的是可见的字符数。
  * 对于其他类型，size 属性定义的是以像素为单位的输入字段宽度。
* max : 规定输入字段的最大值。和min搭配使用，创建合法值的范围。
  * max 和 min 属性适用于以下 `<input>` 类型：number, range, date, datetime, datetime-local, month, time 以及 week。
* min : 规定输入字段的最小值。
* step : 规定输入字的的合法数字间隔。（假如 step="3"，则合法数字应该是 -3、0、3、6，以此类推）。
* accept : 规定通过文件上传提交的文件的类型。（只适用于 type="file"）
  * 值为`mime_type` ，多个值用逗号分开。请避免使用该属性。应该在服务器端验证文件上传。
  * image/gif , image/jpeg , 如果不限制图像的格式，可以写为：accept="image/*"。
* multiple : 如果使用该属性，则可选择多个值。也就是可以选择多个文件。（只适用于 type="file"）
* form : 规定输入字段所属的一个或多个表单。form 属性的值必须是其所属表单的 id。
* list : 引用包含输入字段的预定义选项的 datalist 。
* pattern : 规定用于验证输入字段的模式。
  * 模式指的是正则表达式。
  * 例如 pattern="[0-9]" 表示输入值必须是 0 与 9 之间的数字。
  * 例如 pattern="[A-z]{3}" 表示输入值必须是A-z大小写英文字母，并且要3个。
* formnovaliadate : 覆盖表单的 novalidate 属性。如果使用该属性，则提交表单时不进行验证。



只适用于 type="image" 的属性：

* width : 定义 input 字段的宽度。单位为px或%。
* height : 定义 input 字段的高度。单位为px或%。
* src : 定义以提交按钮形式显示的图像的 URL。
* alt : 定义图像输入的替代文本。
* align : 规定图像输入的对齐方式。不赞成使用。
  * left默认 / right / top / middle / bottom 只有 "left" 和 "right" 值得到所有浏览器的支持。



适用于 type="submit" 和 type="image" 的属性：

* formaction : 覆盖表单的 action 属性。规定当提交表单时向何处发送表单数据。
* formenctype : 覆盖表单的 enctype 属性。规定在发送表单数据之前如何对其进行编码。
* formmethod : 覆盖表单的 method 属性。规定用于发送 form-data 的 HTTP 方法。
  * get / post
* formtarget : 覆盖表单的 target 属性。规定在何处打开 action URL。
  * _self / _blank / _parent / _top / framename



```html
<form action="form_action.asp" id="form1" >
  <p>用户名：<input type="text" name="username" placeholder="用户名" required value="张三" autofocus maxlength="20"></p>
  <p>密码：<input type="password" name="pwd" placeholder="密码" ></p>
	<p>国家：<input type="text" name="country" value="china" readonly ></p>
  <p>
  	<input type="radio" value="male" name="sex" checked>男
  	<input type="radio" value="female" name="sex" >女
  </p>
  <p>
  	<input type="checkbox" value="apple" name="fruit">苹果
  	<input type="checkbox" value="banana" name="fruit" checked>香蕉
  	<input type="checkbox" value="orange" name="fruit" checked disabled>橙子
  </p>
  <p><input type="file" name="pic" accept="image/jpeg, image/png" multiple ></p>
  <p><input type="hidden"></p>
  <p><input type="button" value="按钮" disabled ></p>
  <p><input type="image" src="submit.png" alt="提交按钮" height="50" width="50" align="right"></p>
  <p><input type="submit" value="确定" ><input type="reset"></p>
  <p><input type="search" name="search" autocomplete>搜索</p>
  <p>网址：<input type="url" disabled></p>
  <p>邮箱：<input type="email" style="width:100px" ></p>
  <p>手机：<input type="telephone" size="50"></p>
  <p>数字：<input type="number" name="age" min="1" max="130"   ></p>
  <p>日期：<input type="date" name="bridate" min="2020-01-01" max="2021-12-18"></p>
  <p>范围滚动条：<input type="range" name="range"></p>
  <p>日期选择器+时间：<input type="datetime-local"></p>
  <p>年月选择器：<input type="month"></p>
  <p>时分选择器：<input type="time"></p>
  <p>周数选择器：<input type="week" name="week"></p>
  <p>Country code: <input type="text" name="country_code" pattern="[A-z]{3}"
  title="只能输入三个字母的国家代码" /></p>
  <p>间隔数：<input type="number" name="points" step="3" /></p>
</form>
	<p><input type="text" name="test" form="form1"></p>

<form action="demo_form.asp">
	Webpage: <input type="url" list="url_list" name="link" />
	<datalist id="url_list">
		<option label="W3Schools" value="http://www.w3schools.com" />
		<option label="Google" value="http://www.google.com" />
		<option label="Microsoft" value="http://www.microsoft.com" />
	</datalist>
	<input type="submit"/>
</form>

<!-- 纯数字带#和* -->
<input type="tel">

<!-- 纯数字 -->
<input pattern="\d*">

<!-- 禁止首字母大写纠正 -->
<input autocapitalize="off" autocorrect="off">
```



### `<select>`

​	用于定义选择列表（下拉列表）。select 元素可创建单选或多选菜单。

属性：

* autofocus : 规定在页面加载后文本区域自动获得焦点。
* disabled : 规定禁用该下拉列表。
* name : 规定下拉列表的名称。只有设置了name属性才可以在表单提交时传递值。
* size : 规定下拉列表中可见选项的数目。
* multiple : 规定允许选择多个选项。为了用户体验，最好使用复选框。
  * 对于 windows：按住 Ctrl 按钮来选择多个选项
  * 对于 Mac：按住 command 按钮来选择多个选项
* form : 规定文本区域所属的一个或多个表单。form 属性的值必须是其所属表单的 id。

```html
<form action="form_action.asp" id="form1">
	<select autofocus name="city" size="2" multiple >
	  <option value ="广州">广州</option>
	  <option value ="深圳">深圳</option>
	  <option value="佛山">佛山</option>
	</select>
	<input type="submit">
</form>
<select name="city2" form="form1" >
  <option value ="广州">广州</option>
  <option value ="深圳">深圳</option>
  <option value="佛山">佛山</option>
</select>
```



### `<datalist>`

​	用于定义下拉列表。请使用 input 元素的 list 属性来绑定 datalist。

​	datalist 及其选项不会被显示出来，它仅仅是合法的输入值列表。

```html
<form action="form_action.asp">
	<input list="cars" name="car" />
	<datalist id="cars">
		<option value="BMW">
		<option value="Ford">
		<option value="Volvo">
	</datalist>
	<input type="submit">
</form>
```



### `<option>`

​	用于定义列表中的可用选项。option 元素位于 select 元素内部。

属性：

* value : 定义送往服务器的选项值。如果没有指定value属性，选项的值将设置为`<option>`标签中的内容。
* selected : 规定选项（在首次显示在列表中时）表现为选中状态。也就是默认选中。
* disabled : 规定此选项应在首次加载时被禁用。

```html
<form action="form_action.asp" >
	<select name="city">
	  <option value="省会">广州</option>
	  <option value="深圳" selected>深圳</option>
	  <option disabled>佛山</option>
	</select>
	<input type="submit">
</form>
```



### `<optgroup>`

​	用于定义选择列表中相关选项的组合（选项组）。

属性：

* label : 为选项组规定描述。(必选）
* disabled : 规定禁用该选项组。

```html
<select>
	<optgroup label="广东" disabled>
		<option value="广州">广州</option>
		<option value="深圳">深圳</option>
	</optgroup>
	<optgroup label="广西">
		<option value="南宁">南宁</option>
		<option value="柳州">柳州</option>
	</optgroup>
</select>
```



### `<textarea>`

​	用于定义多行的文本输入控件。文本区中可容纳无限数量的文本，其中的文本的默认字体是等宽字体（通常是 Courier）。在文本输入区内的文本行间，用 "`%OD%OA`" （回车/换行）进行分隔。

属性：

* cols : 规定文本区内的可见宽度。更好的办法是使用 CSS 的 height 和 width 属性。
* rows : 规定文本区内的可见行数。
* wrap : 规定当在表单中提交时，文本区域中的文本如何换行。
  * soft : 当在表单中提交时，textarea 中的文本不换行。默认值。
  * hard : 在表单中提交时，textarea 中的文本换行（包含换行符）。当使用 "hard" 时，必须规定 cols 属性。
* maxlength : 规定文本区域的最大字符数。
* autofocus : 规定在页面加载后文本区域自动获得焦点。
* disabled : 规定禁用该文本区。
* form : 规定文本区域所属的一个或多个表单。form 属性的值必须是其所属表单的 id。
* name : 规定文本区的名称。只有设置了name属性才可以在表单提交时传递值。
* placeholder : 规定描述文本区域预期值的简短提示。
* readonly : 规定文本区为只读。
* required : 规定文本区域是必填的。

```html
<form action="form_action.asp" id="form1">
	<textarea rows="3" cols="20" name="txt" wrap="soft" maxlength="10" autofocus placeholder="简介" required></textarea>
	<input type="submit">
</form>

</textarea>
<textarea form="form1" name="txt2" readonly style="height:200px; width: 300px;" ></textarea>
```



### `<fieldset>`

​	用于定义围绕表单中元素的边框。可将表单内的相关元素分组。

可选属性：

* disabled : 规定禁用一组表单元素（一个 fieldset）。
* name : 规定 fieldset 的名称。
* form : 规定 fieldset 所属的一个或多个表单。form 属性的值必须是其所属表单的 id。

```html
<form>
  <fieldset name="info" disabled>
    <legend>健康信息</legend>
    身高：<input type="text" />
    体重：<input type="text" />
  </fieldset>
</form>
```



### `<legend>`

​	用于定义 fieldset 元素的标题。



### `<article>`

​	用于定义文章。



### `<aside>`

​	用于定义页面内容之外的内容。`<aside>` 的内容可用作文章的侧栏。



### `<audio>`

​	用于定义声音内容。比如音乐或其他音频流。

​	可以在开始标签和结束标签之间放置文本内容，这样老的浏览器就可以显示出不支持该标签的信息。

属性：

* src : 要播放的音频的 URL。(必选)
* controls : 如果出现该属性，则向用户显示控件，比如播放按钮。（必选，没有则看不见控件）
* autoplay : 如果出现该属性，则音频在就绪后马上播放。
* preload : 规定是否在页面加载后载入音频。如果设置了 autoplay 属性，则忽略该属性。
  * auto - 当页面加载后载入整个音频
  * meta - 当页面加载后只载入元数据
  * none - 当页面加载后不载入音频
* loop : 规定当音频结束后将重新开始播放。
* muted : 规定音频输出应该被静音。

```html
<audio src="music.mp3" controls autoplay loop muted >
  您的浏览器不支持 audio 标签。
</audio>
```



### `<video>`

​	用于定义视频。比如电影片段或其他视频流。

​	可以在开始标签和结束标签之间放置文本内容，这样老的浏览器就可以显示出不支持该标签的信息

属性：

* src : 要播放的视频的 URL。(必选)
* controls : 如果出现该属性，则向用户显示控件，比如播放按钮。（必选，没有则看不见控件）
* height : 设置视频播放器的高度。单位为px。
* width : 设置视频播放器的宽度。单位为px。
* autoplay : 如果出现该属性，则视频在就绪后马上播放。
* poster : 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。如果未设置该属性，则使用视频的第一帧来代替。
* preload : 规定是否在页面加载后载入视频。如果设置了 autoplay 属性，则忽略该属性。
  * auto - 当页面加载后载入整个视频
  * meta - 当页面加载后只载入元数据
  * none - 当页面加载后不载入视频
* loop : 规定当视频结束后将重新开始播放。
* muted : 规定视频输出应该被静音。

```html
<video src="video.mp4" controls height="490" width="960" autoplay loop muted poster="aa.png">
  您的浏览器不支持 video 标签。
</video>
```



### `<picture>`

​	通过包含零或多个 `<source>` 元素和一个 `<img>` 元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `<source>` 元素，如果没有匹配的，就选择 `<img>` 元素的 src 属性中的 URL。然后，所选图像呈现在`<img>`元素占据的空间中。IE不支持。



要决定加载哪个 URL，user agent 检查每个 `<source>` 的 srcset、media 和 type 属性，来选择最匹配页面当前布局、显示设备特征等的兼容图像。

```html
<picture>
  <source srcset="large.jpg" media="(min-width: 800px)" />
  <source srcset="medium.jpg" media="(min-width: 500px)" />
  <img src="small.jpg" />
</picture>
```



### `<source>`

​	用于为媒介元素（比如 `<video>` 和 `<audio>`）定义媒介资源。

​	该标签允许您规定可替换的视频/音频文件供浏览器根据它对媒体类型或者编解码器的支持进行选择。

属性：

* src : 规定媒体文件的 URL。
* type : 规定媒体资源的 MIME 类型。
  * 用于视频: video/ogg , video/mp4 , video/webm
  * 用于音频: audio/ogg , audio/mpeg (也就是mp3)
  * 更多可见-->资料查询-->完整的标准 MIME 类型列表

```html
<audio controls>
  <source src="music.ogg" type="audio/ogg">
  <source src="music.mp3" type="audio/mpeg">
  您的浏览器不支持 audio 标签。
</audio>

<video controls>
  <source src="video.ogg" type="video/ogg">
  <source src="video.mp4" type="video/mp4">
  您的浏览器不支持 video 标签。
</video>
```



### `<button>`

​	用于定义按钮 。在 button 元素内部，您可以放置内容，比如文本或图像。

​	当定义在form中时，一样具有提交表单功能。

​	注意：如果在 HTML 表单中使用 button 元素，不同的浏览器会提交不同的值。IE 将提交 `<button>` 与 `</button>`之间的文本，而其他浏览器将提交 value 属性的内容。请在 HTML 表单中使用 input 元素来创建按钮。

属性：

* type : 规定按钮的类型。最好为按钮规定该属性。
  * submit : 该按钮是提交按钮（除了 Internet Explorer，该值是其他浏览器的默认值）。
  * button : 该按钮是可点击的按钮（Internet Explorer 的默认值）。
  * reset : 该按钮是重置按钮（清除表单数据）。
* name : 规定按钮的名称。不同的button元素可以共享相同的名称，以便可以提交不同的值。(慎用)
* value : 规定按钮的初始值。可由脚本进行修改。
* disabled : 规定应该禁用该按钮。
* autofocus : 规定当页面加载时按钮应当自动地获得焦点。
* form : 规定按钮属于一个或多个表单。



只适用于 type="submit" 的属性：

* formaction : 覆盖 form 元素的 action 属性。规定当提交表单时向何处发送表单数据。
* formenctype : 覆盖 form 元素的 enctype 属性。规定在发送表单数据之前如何对其进行编码。
* formmethod : 覆盖 form 元素的 method 属性。规定用于发送 form-data 的 HTTP 方法。
* formnovalidate : 覆盖 form 元素的 novalidate 属性。如果使用该属性，则提交表单时不进行验证。
* formtarget : 覆盖 form 元素的 target 属性。规定在何处打开 action URL。

```html
<form action="form_action.asp" id="form1">
	<input type="text" name="str">
	<button type="submit" name="btn" value="anniu" autofocus>提交按钮</button>
	<button type="reset" disabled >重置按钮</button>
	<button type="button">普通按钮</button>
</form>

<button name="outbtn" value="outbtn" form="form1">外置按钮</button>
<button><img src="aa.png" alt="按钮图片"></button>

<!-- 只适用于 type="submit" 的属性： -->
<form action="form_action.asp" method="get" >
	<input type="email"  >
	<button type="submit" value="submit" name="btn" formaction="form_action.html" formmethod="post" formtarget="_blank" formnovalidate >提交按钮</button>
</form>
```



### `<canvas>`

​	用于定义图形，比如图表和其他图像。该标签只是图形容器，您必须使用脚本来绘制图形。

属性：

* height : 设置 canvas 的高度。单位为px。默认 150 px。
* width : 设置 canvas 的宽度。单位为px。默认 300 px。
* 可以通过重设 width 或 height 属性来清空画布。

```html
<canvas id="myCanvas">你的浏览器不支持canvas标签</canvas>
<script>
  var canvas = document.getElementById("myCanvas")
  var ctx = canvas.getContext("2d")
  ctx.fillStyle = "#FF0000"
  ctx.fillRect(0, 0, 80, 100)
</script>
```

```html
<canvas id="myCanvas" width="200" height="200" style="border:1px solid" >你的浏览器不支持canvas标签</canvas>
<button onclick="clearCanvas()">清空画布</button>
<script>
  var canvas = document.getElementById("myCanvas")
  var ctx = canvas.getContext("2d")
  ctx.fillStyle = "#FF0000"
  ctx.fillRect(50, 50, 100, 100)

  // 通过重设 width 或 height 属性来清空画布
  function clearCanvas(){
    // console.log(canvas.height)	//200
    // canvas.height = canvas.height
    canvas.width = canvas.width
  }
</script>
```



### `<details>` `<summary>`

​	details 标签用于描述文档或文档某个部分的细节。

​	summary 标签包含 details 元素的标题。标题是可见的，当用户点击标题时会显示出详细信息。

​	如果没有设置summary，默认标题显示为"详细信息"

details的属性：

* open : 定义 details 展开显示。

```html
<details open>
  <summary>标题信息</summary>
  <p>这是详细内容</p>
  <img src="aa.png" alt="">
</details>
```



### `<embed>`

​	用于定义嵌入的内容，比如插件。

属性：

* src : 嵌入内容的 URL。必选
* type : 定义嵌入内容的类型。MIME_type。设置type后，如果和src的内容类型不符则不会正常显示。
* width : 设置嵌入内容的宽度。单位为px。
* height : 设置嵌入内容的高度。单位为px。

```html
<embed src="video.mp4" type="video/mp4" height="100" width="200">
```



### `<figure>` `<figcaption>`

​	figure定义媒介内容(图像/代码...)的分组，以及它们的标题。figcaption定义 figure 元素的标题。

```html
<figure>
	<figcaption>标题</figcaption>
	<img src="aa.png" alt="">
</figure>
```



### `<frameset>`

​	用于定义一个框架集。它被用来组织多个窗口（框架）。每个框架存有独立的文档。在其最简单的应用中，frameset 元素仅仅会规定在框架集中存在多少列或多少行。您必须使用 cols 或 rows 属性。

​	注意：**该标签不能和body标签一起使用**。H5中不推荐使用。

属性：

* cols : 定义框架集中列的数目和尺寸。推荐用%。
  * px / %百分比 / *(自动分配剩下的空间)
* rows : 定义框架集中行的数目和尺寸。推荐用%。
  * px / %百分比 / *(自动分配剩下的空间)

```html
<frameset cols="50%,*,400">
	<frame src="https://www.huangyihui.cn">
	<frame src="https://www.baidu.com">
	<frame src="a.html">
</frameset>
```

```html
<!-- 混合框架 -->
<frameset rows="50%,50%">
	<frame src="https://www.huangyihui.cn">

	<frameset cols="25%,75%">
		<frame src="a.html">
		<frame src="https://www.baidu.com">
	</frameset>

</frameset>
```



### `<frame>`

​	用于定义 frameset 中的一个特定的窗口（框架）。H5中不推荐使用。

属性：

* src : 规定在框架中显示的文档的 URL。
* name : 规定框架的名称。用于在 JavaScript 中引用元素，或者作为链接的目标。
* noresize : 规定无法调整框架的大小。
* scrolling : 规定是否在框架中显示滚动条。默认地，如果内容大于框架，就会出现滚动条。
  * auto : 在需要的时候显示滚动条。
  * yes : 始终显示滚动条。
  * no : 从不显示滚动条。
* marginwidth : 定义框架的左侧和右侧的边距。单位为px。
* marginheight : 定义框架的上方和下方的边距。单位为px。

```html
<frameset cols="25%,50%,*">
	<frame src="https://www.huangyihui.cn" name="frame_a" noresize   >
	<frame src="https://www.baidu.com" scrolling="no" >
	<frame src="a.html" marginwidth="50">
</frameset>
```



### `<noframes>`

​	用于定义针对不支持框架的用户的替代内容。H5中不推荐使用。

​	noframes要在frameset内部，noframes中的内容要在body内部。

```html
<frameset rows="50%,*,200">
	<frame src="https://www.huangyihui.cn">
	<frame src="https://www.baidu.com">
	<frame src="a.html">

	<noframes>
		<body>您的浏览器无法处理框架！</body>
	</noframes>
</frameset>
```



### `<iframe>`

​	用于定义内联框架。该元素会创建包含另外一个文档的内联框架（即行内框架）。

​	常用于后台管理界面，现推荐div方式。

属性：

* src : 规定在 iframe 中显示的文档的 URL。
* name : 规定 iframe 的名称。用于在 JavaScript 中引用元素，或者作为链接的目标。
* width : 定义 iframe 的宽度。单位为px或%。
* height : 定义 iframe 的高度。单位为px或%。
* frameborder : 规定是否显示框架周围的边框。推荐用CSS `border`替代。
  * 值为1(默认，有边框) 或0 (无边框)
* scrolling : 规定是否在 iframe 中显示滚动条。默认地，如果内容大于iframe，就会出现滚动条。
  * auto : 在需要的时候显示滚动条。
  * yes : 始终显示滚动条。
  * no : 从不显示滚动条。
* marginwidth : 定义iframe的左侧和右侧的边距。单位为px。
* marginheight : 定义iframe的顶部和底部的边距。单位为px。
* sandbox : 启用一系列对iframe中内容的额外限制(沙箱)。如果有多个值用空格分隔。不设置该属性不会有限制。
  * "" : 应用以下所有的限制。
  * allow-scripts : 允许脚本执行。
  * allow-forms : 允许表单提交。
  * allow-same-origin : 允许 iframe 内容被视为与包含文档有相同的来源。
  * allow-top-navigation : 允许 iframe 内容从包含文档导航（加载）内容。
  * allow-modals : 在允许脚本提交情况下，某些浏览器可能出现：`The document is sandboxed, and the 'allow-modals' keyword is not set.` ，同时设置该值即可。
* align : 规定如何根据周围的元素来对齐此框架。推荐用样式替代。
  * left / right / middle / top / bottom

```html
<iframe src="a.html" frameborder="1"  name="iframe_a" width="400" height="300" scrolling="no" marginheight="50" marginwidth="50" sandbox="allow-scripts allow-modals allow-forms allow-same-origin" align="middle"    >
  您的浏览器不支持iframe标签
</iframe>
<!-- 在指定的框架中打开被链接文档。 -->
<a href="https://www.baidu.com" target="iframe_a">baidu</a>
```



### `<meter>`

​	用于定义已知范围或分数值内的标量测量。也被称为 gauge（尺度）。例如：磁盘用量、查询结果的相关性

​	不应用于指示进度（在进度条中）。如果标记进度条，请使用 `<progress>` 标签。IE不支持该标签。

属性：

* value : 必需。规定度量的当前值。可以是整数或浮点数。
* min : 规定范围的最小值。未规定默认为0。
* max : 规定范围的最大值。未规定默认为1。
* high : 规定被视作高的值的范围。当前value大于该值，颜色会变成黄色。
* low : 规定被视作低的值的范围。当前value小于该值，颜色会变成黄色。
* optimum : 规定测量范围的最佳值。
  * high 和 low 将一个meter分为了三个区域, 如 high='0.7' low='0.3' , 区域则为 0～0.2 , 0.3～0.6, 0.7～1
  * optimum为最佳度量, optimum的值所在的区域可以看做为最佳区域
  * 若value的值落在最佳区域(0.7~1), 则颜色为**绿色**
  * 若value的值落在最佳区域的隔壁区域(0.3~0.6), 则颜色为**黄色**
  * 若value的值落在最佳区域的隔壁区域的隔壁区域(0~0.2), 则颜色为**红色**
* form : 规定meter元素所属的一个或多个表单。任何浏览器都不支持。

```html
<p>显示度量值：</p>
<meter value="1" min="0" max="10" low="2" high="9" >3/10</meter><br>
<meter value="0.6">60%</meter>

<p>high 和 low 将一个meter分为了三个区域, 如 high='0.7' low='0.3' , 区域则为 0～0.2 , 0.3～0.6, 0.7～1</p>
<p>optimum为最佳度量, optimum的值所在的区域可以看做为最佳区域</p>
<p>若value的值落在最佳区域(0.7~1), 则颜色为绿色</p>
<p>若value的值落在最佳区域的隔壁区域(0.3~0.6), 则颜色为黄色</p>
<p>若value的值落在最佳区域的隔壁区域的隔壁区域(0~0.2), 则颜色为红色</p>
<meter value="0.9" max="1" optimum="0.9" high="0.7" low="0.3"></meter>
<meter value="0.5" max="1" optimum="0.9" high="0.7" low="0.3"></meter>
<meter value="0.1" max="1" optimum="0.9" high="0.7" low="0.3"></meter>
<p>
	动态理解最佳区域划分：
	<meter id="bar" value="0" min="0" max="10" low="3" high="7" optimum="8" >进度条</meter>
</p>

<p><b>注释：</b>Internet Explorer 不支持 meter 标签。</p>

<script>
window.onload = function (){
	var bar = document.getElementById("bar")

	var timer = setInterval(function(){
		bar.value++
		console.log(bar.value)
		if(bar.value>=10){
			clearInterval(timer)
		}
	},1000)
}
</script>
```



### `<progress>`

​	用于标示任务的进度（进程）。经常与 JavaScript 一同使用，来显示任务的进度。	

​	不同浏览器显示的进度条样式效果不同。

属性：

* value : 规定已经完成多少任务。
* max : 规定任务一共需要多少工作。

```html
<progress></progress><br>
<progress value="20" max="50">您的浏览器不支持progress标签</progress><br>

<p>动态进度条</p>
<progress id="bar" value="0" max="20"></progress>

<script>
  window.onload = function (){
    var bar = document.getElementById("bar")

    var timer = setInterval(function(){
      bar.value++
      console.log(bar.value)
      // console.log(bar.max+1)
      if(bar.value==bar.max){
       setTimeout(() => {
        alert("下载完成")
       }, 500)
       clearInterval(timer)
      }
    },500)
  }
  </script>
```



### `<template>`

​	用于定义用作容纳页面加载时隐藏内容的容器。

```html
<button onclick="showContent()">显示被隐藏的内容</button>

<template>
  <h2>图片</h2>
  <img src="aa.png" alt="">
</template>

<script>
function showContent() {
  var temp = document.getElementsByTagName("template")[0]
  var clon = temp.content.cloneNode(true)
  document.body.appendChild(clon)
}
</script>
```





### `<label>`

​	推荐使用 label 元素为某个表单控件定义标签。这样点击文本标记也可以触发相关控件。

属性：

* for : 规定 label 绑定到哪个表单元素。值为表单元素的id。
* form : 规定 label 字段所属的一个或多个表单。值为表单的id。

```html
<!-- 显式的联系： -->
<form>
  <label for="male">Male</label>
  <input type="radio" name="sex" id="male" />
  <br />
  <label for="female">Female</label>
  <input type="radio" name="sex" id="female" />
</form>

<!-- 隐式的联系： -->
<label>Date of Birth: <input type="text" name="DofB" /></label>

<label for="male" form="nameform">Male</label>
```



### `<hr>`

​	用于定义水平线。

属性：

* width : 不赞成使用。请使用样式取代它。规定 hr 元素的宽度。单位为px或%。
* size : 不赞成使用。请使用样式取代它。规定 hr 元素的高度(厚度)。单位为px。
* noshade : 不赞成使用。请使用样式取代它。规定 hr 元素的颜色呈现为纯色。值为noshade。
* align : 不赞成使用。请使用样式取代它。规定 hr 元素的对齐方式。width属性小于100%才有效。
  * center : 居中对齐水平线。
  * left : 左对齐水平线。
  * right : 右对齐水平线。

```html
<hr width="50%" />
<hr size="50" />
<hr noshade="noshade" />
<hr align="right" width="50%" />

<hr style="width:50%" />
<hr style="height:30px" />
<hr style="height:2px;border-width:0;color:gray;background-color:gray" />
<hr style="text-align:right;margin-right:0" />
```



### `<br>`

​	换行符。



### `<span>`

​	文本节标签，用来组合文档中的行内元素。行内标签。

```html
<!-- CSS -->
p.tip span {
	font-weight:bold;
	color:#ff9955;
}

<p class="tip"><span>提示：</span>... ... ...</p>
```



### `<em>`

​	用于把文本定义为强调的内容。这段文字会用斜体来显示。



### `<strong>`

​	用于把文本定义为语气更强的强调的内容。文本加粗显示。



### `<mark>`

​	用于定义有记号的文本。默认背景色为黄色。



### `<sub>`

​	用于定义下标文本。



### `<sup>`

​	用于定义上标文本。

```html
这段文本包含 <sub>下标</sub>
这段文本包含 <sup>上标</sup>
```



### `<del>` `<s>`

​	用于定义删除线。推荐用del标签。



### `<ins>` `<u>`

​	用于定义下划线。不推荐使用`<u>`



### `<i>`

​	显示斜体文本效果。



### `<b>`

​	显示粗体文本效果。



### `<big>`

​	呈现大号字体效果。不推荐使用`<big>`



### `<small>`

​	呈现小号字体效果。



### `<code>`

​	用于表示计算机源代码或者其他机器可以阅读的文本内容。会改变原有文字样式。



### `<pre>`

​	用于定义预格式文本。包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体。

​	最常见应用就是用来表示计算机的源代码。

​	pre标签中的特殊符号被转换为`符号主体`，比如 `"&lt;` 代表 "<"，`&gt;` 代表 ">"。

注意事项：

* 不能被包含在pre标签内: 可以导致段落断开的标签(p,标题等)
* 可以被包含在pre标签内: (a,img,hr等)，会正常显示标签的效果。
* 制表符(tab)在pre标签中占据的的字符数在不同浏览器中不相同，推荐用空格代替。
* 可以和code标签搭配使用，以获得更加精确的语义。



### `<kdb>`

​	用于定义键盘文本。它表示文本是从键盘上键入的。它经常用在与计算机相关的文档或手册中。

​	浏览器通常用等宽字体来显示该标签中包含的文本。

```html
键入 <kbd>quit</kbd> 来退出程序，或者键入 <kbd>menu</kbd> 来返回主菜单。
```



### `<abbr>`

​	用于定义缩写。用来指示简称或缩写，比如 "WWW" 或 "NATO"。

​	可以使用全局的 title 属性，这样就能够在鼠标指针移动到`<abbr>`元素上时显示出简称/缩写的完整版本。

```html
The <abbr title="People's Republic of China">PRC</abbr> was founded in 1949.
```



### `<bdo>`

​	 用于定义文字方向。bdo 元素可覆盖默认的文本方向。

属性：

* dir : 定义文字的方向
  * ltr(默认，左向右) / rtl(右向左)

```html
<p>如果您的浏览器支持 bi-directional override (bdo)，下一行会从右向左输出 (rtl)；</p>

<bdo dir="rtl">Here is some Hebrew text</bdo>
```



### `<blockquote>`

​	用于定义长的引用。

​	浏览器在 blockquote 元素前后添加了换行，并增加了外边距。

```html
Here comes a long quotation:

<blockquote>
This is a long quotation. This is a long quotation. This is a long quotation. This is a long quotation. This is a long quotation.
</blockquote>

请注意，浏览器在 blockquote 元素前后添加了换行，并增加了外边距。
```



### `<q>`

​	用于定义短的引用。浏览器经常在引用的内容周围添加引号。

```html
<p>Here comes a short quotation: <q>This is a short quotation</q></p>

<p>请注意，浏览器在引用的周围插入了引号。</p>
```



### `<cite>`

​	用于定义引用。可使用该标签对参考文献的引用进行定义，比如书籍或杂志的标题。引用的文本将以斜体显示。还可以把引用包括在一个 `<a>` 标签中，从而把一个超链接指向该联机版本。

```html
<cite><a href="https://www.huangyihui.cn">引用作者</a></cite>
```



### `<center>`

​	用于定义居中文本。不推荐使用，请使用CSS替代。

```html
<center>你好</center>
<center><img src="aa.png" alt=""></center>
```



### `<header>` `<footer>` `<main>`

​	header定义文档的页眉（介绍信息）。footer定义文档的页脚。页脚通常包含文档的作者、版权信息、使用条款链接、联系信息等等。main定义文档的主要内容。

```html
<header>
	<h1>欢迎来到主页</h1>
</header>

<main>
	<h1>标题</h1>
  <p>内容</p>
</main>

<footer>
	<p>Copyright 2021</p>
</footer>
```



### `<nav>`

​	用于定义导航链接的部分。



### `<section>`

​	用于定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。



### `<output>`

​	用于定义不同类型的输出。IE浏览器不支持。

属性：

* name : 定义对象的唯一名称。（表单提交时使用）
* for : 定义输出域相关的一个或多个元素。
* form : 定义输入字段所属的一个或多个表单。

```html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
  <input type="range" id="a" value="50">100+
  <input type="number" id="b" value="50">=
  <output name="x" for="a b"></output>
</form>
```



### `<svg>`

SVG 最大的优势是在不影响质量的情况下进行缩放。此外，借助 SVG，可以嵌入 JPG、PNG 或 SVG 图像：

```html
<svg width="200" height="200">
  <image href="cheesecake.jpg" height="100%" width="100%" preserveAspectRatio="xMidYMid slice" />
</svg>
```

这里我们添加了一个 `preserveAspectRatio` 属性，这是使图像保持 SVG 的宽度和高度，而不会被拉伸或压缩。当 `<image>` 宽度较大时，它将填充其父级（SVG）宽度而不会被拉伸。

这和 CSS 中的 `object-fit: cover` 或 `background-size: cover` 非常相似。





## HTML5 全局属性

全局属性是可与所有HTML元素一起使用的属性。

* id : 规定元素的唯一 id。
* class : 规定元素的一个或多个类名（引用样式表中的类）。
* style : 规定元素的行内 CSS 样式。style 属性将覆盖任何全局的样式设定。
* title : 规定有关元素的额外信息。当鼠标移到元素上时显示一段工具提示文本。
* accesskey : 规定激活（使元素获得焦点）元素的快捷键。
  * 使用alt+accesskey 或 alt+shift+accesskey 来访问带有快捷键的元素
  * 支持的元素：a,button,input,label,textarea等等
* contenteditable : 规定元素内容是否可编辑。
  * true规定元素可编辑。 / false规定元素不可编辑。
  * 如果元素未设置 contenteditable 属性，那么元素会从其父元素继承该属性。
* dir : 规定元素中内容的文本方向。
  * ltr(默认。从左向右的文本方向) / rtl(从右向左的文本方向)
* draggable : 规定元素是否可拖动。链接和图像默认是可拖动的。
  * auto(使用浏览器的默认行为) / true(可拖动) / false(不可拖动)
* hidden : 规定元素隐藏。如果元素还设置了`display`样式，该属性会被覆盖，从而失效。
* tabindex : 规定元素的 tab 键次序。值为number，1是第一个。
* data-* : 用于存储页面或应用程序的私有定制数据。
  * 属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
  * 属性值可以是任意字符串
* lang : 规定元素内容的语言。zh/en/...
* spellcheck : 规定是否对元素进行拼写和语法检查。值为true/false

```html
<head>
  <style>
    #myid{
      font-size: 20px;
    }
    .myclass{
      background-color: yellow;
      color: green;
    }
  </style>
</head>
<body>
  <div contenteditable>
    <p id="myid" class="myclass" style="color:red;" title="这是title属性提示文本" lang="zh">全局属性</p>
    <a href="https://www.huangyihui.cn" accesskey="n">使用alt+accesskey 或 alt+shift+accesskey 来访问带有快捷键的元素</a>
    <button onclick="alert('hi')" accesskey="m">按钮</button>
    <input type="radio" accesskey="b" />
    <p dir="rtl">dir 属性规定元素内容的文本方向。</p>
  </div>

  <p draggable="true" >可拖动的元素</p>
  <p hidden>隐藏这个p标签</p>
  <a href="#" tabindex="2">W3School</a>
  <a href="#" tabindex="1">baidu</a>
  <a href="#" tabindex="3">jd</a>
</body>
```

```html
<head>
	<script>
	function showDetails(animal) {
		var animalType = animal.getAttribute("data-animal-type");
	 	alert(animal.innerHTML + "是一种" + animalType + "。");
	}
	</script>
</head>
<body>
  <p>点击某个物种来查看其类别：</p>
  <ul>
    <li onclick="showDetails(this)" id="owl" data-animal-type="鸟类">喜鹊</li>
    <li onclick="showDetails(this)" id="salmon" data-animal-type="鱼类">金枪鱼</li>  
    <li onclick="showDetails(this)" id="tarantula" data-animal-type="蜘蛛">蝇虎</li>  
  </ul>
</body>
```





## HTML5 新特性

* 新增标签，常用的有:
  * `<header>` 、 `<footer>` 、 `<main>` 、 `<nav>` 、 `<audio>` 、 `<video>` 、 `<article>` 、 `<aside>` 、 `<section>` 、 `<meter>` 、 `<progress>` 、 `<mark>` 、 `<canvas>` 、 `<source>` 
* 新增元素内容可编辑 `contenteditable` 属性
* 新增 `Geolocation` 地理定位、`localStorage` 和 `sessionStorage` 本地存储。





## HTML标签参考手册



| 标签           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| `<!-- -->`     | 定义注释。                                                   |
| `<!DOCTYPE>`   | 定义文档类型。                                               |
| `<html>`       | 定义HTML文档。                                               |
| `<head>`       | 定义关于文档的信息。                                         |
| `<body>`       | 定义文档的主体。                                             |
| `<meta>`       | 定义关于 HTML 文档的元信息。                                 |
| `<link>`       | 定义文档与外部资源的关系。                                   |
| `<title>`      | 定义文档的标题。                                             |
| `<style>`      | 定义文档的样式信息。                                         |
| `<script>`     | 用于定义客户端脚本，比如 JavaScript。                        |
| `<noscript>`   | 定义针对不支持客户端脚本的用户的替代内容。                   |
| `<base>`       | 定义页面中所有链接的默认地址或默认目标。                     |
| `<h1> to <h6>` | 定义 HTML 标题。                                             |
| `<p>`          | 定义段落。                                                   |
| `<a>`          | 定义超链接。                                                 |
| `<img>`        | 定义图像。                                                   |
| `<ul>`         | 定义无序列表。样式默认为实心圆点。                           |
| `<ol>`         | 定义有序列表。样式默认为数字1。                              |
| `<li>`         | 定义列表的项目。                                             |
| `<dl>`         | 定义自定义列表。                                             |
| `<dt>`         | 定义自定义列表中的项目标题。                                 |
| `<dd>`         | 定义自定义列表中的项目的项(描述)。                           |
| `<table>`      | 定义表格。                                                   |
| `<tr>`         | 定义表格中的行。                                             |
| `<td>`         | 定义表格行中的单元格。                                       |
| `<th>`         | 定义表格中的表头单元格。                                     |
| `<caption>`    | 定义表格标题。                                               |
| `<thead>`      | 定义表格中的表头内容                                         |
| `<tbody>`      | 定义表格中的主体内容。                                       |
| `<tfoot>`      | 定义表格中的表注内容（脚注）。                               |
| `<col>`        | 定义表格中一个或多个列的属性值。                             |
| `<colgroup>`   | 定义表格中供格式化的列组。                                   |
| `<form>`       | 定义供用户输入的 HTML 表单。                                 |
| `<input>`      | 定义输入控件。                                               |
| `<select>`     | 定义选择列表（下拉列表）。                                   |
| `<datalist>`   | 定义下拉列表。                                               |
| `<option>`     | 定义选择列表中的选项。                                       |
| `<optgroup>`   | 定义选择列表中相关选项的组合。                               |
| `<textarea>`   | 定义多行的文本输入控件。                                     |
| `<fieldset>`   | 定义围绕表单中元素的边框。                                   |
| `<legend>`     | 定义 fieldset 元素的标题。                                   |
| `<article>`    | 定义文章。                                                   |
| `<aside>`      | 定义页面内容之外的内容。                                     |
| `<audio>`      | 定义声音内容。                                               |
| `<video>`      | 定义视频。                                                   |
| `<source>`     | 定义媒介源。                                                 |
| `<button>`     | 定义按钮 (push button)。                                     |
| `<canvas>`     | 定义图形。                                                   |
| `<details>`    | 定义元素的细节。                                             |
| `<summary>`    | 为 `<details>` 元素定义可见的标题。                          |
| `<embed>`      | 定义外部交互内容或插件。                                     |
| `<figure>`     | 定义媒介内容的分组，以及它们的标题。                         |
| `<figcaption>` | 定义 figure 元素的标题。                                     |
| `<frameset>`   | 定义框架集。                                                 |
| `<frame>`      | 定义框架集的窗口或框架。                                     |
| `<noframes>`   | 定义针对不支持框架的用户的替代内容。                         |
| `<iframe>`     | 定义内联框架。                                               |
| `<meter>`      | 定义预定义范围内的度量。IE不支持。                           |
| `<progress>`   | 定义任何类型的任务的进度。                                   |
| `<template>`   | 定义用作容纳页面加载时隐藏内容的容器。                       |
| `<div>`        | 定义文档中的节。                                             |
| `<hr>`         | 定义水平线。                                                 |
| `<br>`         | 换行符。                                                     |
| `<span>`       | 定义文档中的节。                                             |
| `<em>`         | 定义强调文本。斜体显示。                                     |
| `<strong>`     | 定义加强强调文本。加粗显示。                                 |
| `<mark>`       | 定义有记号的文本。默认背景色为黄色。                         |
| `<sub>`        | 定义下标文本。                                               |
| `<sup>`        | 定义上标文本。                                               |
| `<del>`        | 定义删除线。                                                 |
| `<s>`          | 定义加删除线的文本。推荐用`<del>`                            |
| `<ins>`        | 定义被插入文本(下划线)。                                     |
| `<u>`          | 定义下划线文本。推荐                                         |
| `<i>`          | 定义斜体字。                                                 |
| `<b>`          | 定义粗体字。                                                 |
| `<big>`        | 定义大号文本。                                               |
| `<small>`      | 定义小号文本。                                               |
| `<code>`       | 定义计算机代码文本。                                         |
| `<pre>`        | 定义预格式文本。                                             |
| `<kdb>`        | 定义键盘文本。                                               |
| `<abbr>`       | 定义缩写。                                                   |
| `<bdo>`        | 定义文字方向。                                               |
| `<blockquote>` | 定义长的引用。                                               |
| `<q>`          | 定义短的引用。                                               |
| `<cite>`       | 定义引用。可使用该标签对参考文献的引用进行定义，比如书籍或杂志的标题。 |
| `<center>`     | 定义居中文本。                                               |
| `<header>`     | 定义文档的页眉（介绍信息）。                                 |
| `<footer>`     | 定义文档的页脚。                                             |
| `<main>`       | 定义文档的主要内容。                                         |
| `<nav>`        | 定义导航链接。                                               |
| `<section>`    | 定义文档中的节。                                             |
| `<output>`     | 定义不同类型的输出。IE不支持。                               |



## 特殊符号

> `>号` : `&gt;`
>
> `<号` : `&lt;`
>
> `&号` : `&amp;`
>
> `空格` : `&nbsp;`
>
> `"双引号` : `&quot;`
>
> `©版权号` : `&copy;`
>
> `R注册商标` : `&reg;`
>
> `￥人民币` : `&yen;`
>
> `摄氏度` : `&deg;`
>
> `±正负号` : `&plusmn;`
>
> `×乘号` : `&times;`
>
> `÷除号` : `&divide;`
>
> `平分²` : `&sup2;`
>
> `立方³` : `&sup3;`





## 块级元素和行内元素

行内元素: `<a>` 、`<span>` 、`<img>` ...

* 能和其他内联元素位于一行显示，只能容纳文本或其他行内元素
* 设置宽高无效，如果需要让行内元素宽高起作用，需要将行内元素设置为块级元素。
* 对 margin 仅设置左右方向有效，上下无效。padding 上下左右都有效
* 不会自动换行



块级元素: `div` 、`<p>` 、`<h1>-<h6>` 、`<ul>` 、`<header>` ...

* 独占一行，可以容纳行内元素和其他块级元素
* 设置宽高有效，设置margin和padding的上下左右都有效





## 低版本IE问题 html5shiv

在 IE8 以及更早的版本中，不支持 H5 的某些特性。例如，媒体查询、H5新增的标签、给自定义标签添加样式等等...

幸运的是，Sjoerd Visscher 创造了 "HTML5 Enabling JavaScript", `"the shiv"`：



```html
<!--[if lt IE 9]>
  <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
<![endif]-->
```

以上代码是一段注释，但是 IE9 的早期版本会读取它（并理解它）。通过这种方式，可以实现低版本IE 也可以使用H5的新特性。





## 资料查询

### 完整的标准 MIME 类型列表

链接: https://www.iana.org/assignments/media-types/media-types.xhtml



### w3school

链接: https://www.w3school.com.cn/











































































