# CSS 世界

**核心：CSS 世界的诞生就是为图文信息展示服务的。**

https://www.cssworld.cn/

问题简单化，让构建的页面向水一样平淌自由，自适应的流起来。



## 无宽度、无图片、无浮动

编写 CSS 的 "鑫三无准则" : 无宽度、无图片、无浮动。

无宽度：布局会更灵活，容错性会更强。表现为 "外部尺寸" 的块级元素一旦设置了 width，流动性就丢失了。





## 焦点元素、非焦点元素

像 `<a>` 、`<button>` 这样的元素，当我们使用键盘进行 Tab 键切换时，是可以被 focus 的，表现为虚框或者外发光，这类元素称为焦点元素。

非焦点元素指没有设置 tabindex 属性的 `<div>` 、`<span>` 等普通元素。在 IE6 / IE7 浏览器下，非焦点元素对 `:active` 置若罔闻。在 IE8 及以上浏览器，则支持非焦点元素。





## 元素的内在本质

每个元素都有两个盒子，**外在盒子和内在盒子(容器盒子)。**

外在盒子负责元素是可以一行显示，还是只能换行显示。

内在盒子负责宽高、内容呈现什么的，所以，`width/height` 是作用与内在盒子上的。



于是，根据 `display` 属性值不同，值为 `block` 的元素的盒子实际由外在的 "块级盒子" 和内在的 "块级容器盒子" 组成，可以脑补成 `display: block block;` 。

值为 `inline-block` 的元素则由外在的 "内联盒子" 和内在的 "块级容器盒子" 组成，可以脑补成 `display: inline block;` 。

值为 `inline` 的元素则内外均是 "内联盒子"，可以脑补成 `display: inline inline;` 。

所以，我们平时的写法实际上是一种简写。



现在明白为何 `display` 的属性值是 `inline-block` 的元素既能和图文一行显示，又能直接设置 `width/height` 了吧！因为有两个盒子，外面的盒子是 inline 级别，里面的盒子是 block 级别。



## 替换元素

替换元素，顾名思义，内容可以被替换。

例如：`<img src="1.jpg" />` 如果把 1.jpg 换成 2.jpg，是不是图片就会替换了？
这种通过修改某个属性值，呈现的内容就可以被替换的元素就称为替换元素。有：`<img>、<object>、<video>、<iframe>、<input>、<textarea>` 等都是典型的替换元素。



### 特性

替换元素除了内容可替换这一特性以外，还有以下一些特性。

* 内容的外观不受页面上的 CSS 的影响
  * 也就是样式表现在 CSS 作用域之外。
* 有自己的尺寸
  * 在 Web 中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸(不包括边框)是 300像素 * 150像素，如 `<video>、<iframe>、<canvas>` 等。`<img>` 则为 0像素。而表单元素的替换元素的尺寸则和浏览器有关，没有明显的规律。
* 在很多 CSS 属性上有自己的一套表现规则
  * 例如 `vertical-align` 属性，对于替换元素和非替换元素，它的属性值的解释是不一样的。对于它的默认值 `baseline` ，基线之意，被定义为字符 x 的下边缘，但对于替换元素来说，替换元素的内容往往不可能含有字符 x，于是替换元素的基线就被硬生生定义成了元素的下边缘。



### 尺寸计算规则

替换元素的尺寸可以从内而外分为3类：固有尺寸、HTML 尺寸和 CSS 尺寸。

* 固有尺寸：指的是替换内容原本的尺寸
  * 例如，图片、视频作为独立文件存在时，都是有自己的宽度和高度的，这就是这里的固有尺寸
* HTML 尺寸：只能通过 HTML 原生属性改变
  * 例如，`<img>` 的 width 和 height属性。`<input>` 的 size属性。`<textarea>` 的 cols 和 rows属性等
* CSS 尺寸：特指可以通过 CSS 的 width 和 height，或者 max-* 等设置的尺寸，对应盒模型中的 `content box`



计算规则如下：

* 如果没有 CSS 尺寸和 HTML 尺寸，则使用固有尺寸作为最终的宽高
* 如果没有 CSS 尺寸，则使用 HTML 尺寸作为最终的宽高
* 如果有 CSS 尺寸，则最终尺寸由 CSS 属性决定
* 如果固有尺寸含有固定的宽高比例，同时仅设置了宽度或者高度，则元素按照固有的宽高比例显示
* 如果上面的条件都不符合，则最终宽度表现为300像素，高度为150像素，宽高比2:1。`<img>` 例外。
* 内联替换元素和块级替换元素使用上面同一套尺寸计算规则





## 格式化宽度

格式化宽度仅出现在 “绝对定位模型” 中，也就是出现在 position 属性值为 absolute 或 fixed 的元素中。在默认情况下，绝对定位元素的宽度表现是 “包裹性”，宽度由内部尺寸决定。

但是对于非替换元素，当 left / top 或 top / bottom 对立方位的属性值同时存在的时候，元素的宽度表现为 “格式化宽度”，其宽度大小相对于最近的具有定位特性（postion 属性值不是 static ）的祖先元素计算。

格式化宽度和普通的流一样，具有完全的流动性，也就是 margin、border、padding 和 content 内容区域同样会自动分配水平（和垂直）空间。



```css
.father {
	width: 100px;
	position: relative;
}

/* 宽度是60：100-20-20 */
.son {
	position: absolute;
	left: 20px;
	right: 20px;
}
```







## Demo

### 文字少时居中，超过一行居左

利用的 `inline-block` 的包裹性：文字越多宽度越宽(包裹，内部尺寸特性)，但不会超过容器宽度(自适应性)。

```html
<div class="box">
  <p class="content">文字内容</p>
</div>
```

```css
.box {
  text-align: center;
}
.content {
  display: inline-block;
  text-align: left;
}
```



### 凹凸效果

利用 `首选最小宽度` 实现。

首选最小宽度，指的是元素最适合的最小宽度。当外部容器的宽度为 0 时，里面的 `inline-block` 元素所表现的宽度就是首选最小宽度。表现规则如下。

* 东亚文字（如中文）最小宽度为每个汉字的宽度
* 西方文字的最小宽度由连续的英文字符单位决定。一般会止于空格、短横线、问号以及其他非英文字符等



```html
<div class="ao"></div>
<div class="tu"></div>

<style>
.ao {
  display: inline-block;
  width: 0;
}

.ao::after {
  content: 'love我love';
  outline: 2px solid #000;
  color: #FFF;
}

.tu {
  display: inline-block;
  width: 0;
}

.tu::after {
  content: '我love我';
  outline: 2px solid #000;
  color: #FFF;
}
</style>
```



### 任意高度的元素展开收起动画

```css
.box {
  max-height: 0;
  overflow: hidden;
  transition: max-height 1s;
}

.box:active {
  max-height: 666px; /* 一个比内容高度大的值。应该设置合理的最大高度，不然动画会造成视觉延迟 */
}
```



### 正在加载中文字动画

```html
正在加载中<dot>...</dot>

<style>
dot {
  display: inline-block;
  height: 1em;
  line-height: 1;
  text-align: left;
  vertical-align: -.25em;
  overflow: hidden;
}

dot::before {
  display: block;
  content: '...\A..\A.';   /* \A 换行符，不区分大小写 */
  white-space: pre-wrap;
  animation: dot 3s infinite step-start both;
}

@keyframes dot {
  33% {
    transform: translateY(-2em);
  }

  66% {
    transform: translateY(-1em);
  }
}</style>
```





### 让元素支持height:100%效果

* 设定显式的高度值。例如：height:600px，或者可以生效的百分比值高度。html, body { height: 100%; }
* 使用绝对定位。例如：div { height:100%; position:absolute; }



### 宽度自适应

网页宽度在 1200~1400像素自适应。

```css
.container {
	min-width: 1200px;
	max-width: 1400px;
}
```



`height: auto` 是必需的，否则，如果原始图片有设定 height，max-height 生效时，图片就会被水平压缩。

```css
img {
	max-width: 100%;
	height: auto !important; 
}
```



### 基于 vertical-align 属性的水平垂直居中弹框

```html
<div class="container">
	<div class="dialog"></div>
</div>

<style>
.container {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0,0,0, .5);
	text-align: center;
	font-size: 0;
	white-space: nowrap;
	overflow: auto;
}

.container:after{
	content: '';
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}

.dialog {
	display: inline-block;
	vertical-align: middle;
	text-align: left;
	font-size: 14px;
	white-space: normal;
}
</style>
```



### 水平垂直居中

利用绝对定位元素的流体特性和 margin 的自动分配特性实现居中。

```css
.container {
	width: 300px;
	height: 200px;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
```



### 让页面滚动条不发生晃动

```css
html {
	overflow-y: scroll; /* for IE8 */
}
:root {
	overflow-y: auto;
	overflow-x: hidden;
}
:root body {
	position: absolute;
}
body {
	width: 100vw;
	overflow: hidden;
}
```



