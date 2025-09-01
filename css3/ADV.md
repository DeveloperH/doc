# 进阶



## 网络字体 @font-face规则

Web 字体允许 Web 设计人员使用用户计算机上未安装的字体。

当您找到了想要使用的字体后，只需将字体文件包含在您的 Web 服务器上，它将在需要时自动下载给用户。

您的"自有"字体在 CSS `@font-face` 规则中进行定义。



不同的字体格式：

* TTF : TrueType字体。是最常用的字体格式。
* OTF : OpenType字体。是可缩放计算机字体的格式。
* WOFF : Web开放字体格式。是用于网页的字体格式。W3C推荐标准，本质上是具有压缩和其他元数据的TTF/OTF。
* WOFF 2.0 : Web开放字体格式。比 WOFF 1.0 提供更好的压缩。
* SVG : 字体/形状。允许在显示文本时将 SVG 用作字形。
* EOT : 嵌入式 OpenType 字体。

**大多浏览器都支持TTF/OTF、WOFF、WOFF2。**



### 使用字体

在 @font-face 规则中：首先定义字体的名称（例如 myFirstFont），然后指向该字体文件。

如需将字体用于 HTML 元素，请通过 font-family 属性引用字体名称（myFirstFont）。

```html
<style>
  @font-face {
    font-family: "myFont";
    src: url(myfont.ttf);
  }
  
  /* 使用粗体文本，需要添加另一条@font-face规则，其中包含粗体文本的描述符 */
  /* 当文本的字体是myFont并且是粗体时，就会调用myfont-bold.ttf 中的字体 */
  @font-face {
    font-family: "myFont";
    src: url(myfont_bold.ttf);
    font-weight: bold;
  }
  
  div{
    font-family: "myFont";
    font-weight: bold;
  }
</style>

<body>  
  <div>
    ABCDEFG
  </div>
</body>
```



@font-face规则中的字体描述符：

* font-family : 必需，定义字体名称。
* src : 必需，定义字体文件的URL。
* font-weight : 可选，定义字体的粗细。默认值是normal
* font-style : 可选，定义字体的样式。默认值是normal
* font-stretch : 可选。定义应如何拉伸字体。默认值是normal
* unicode-range : 可选。定义字体支持的 UNICODE 字符范围。默认值是 "U+0-10FFFF"





## 字体图标

向 HTML 页面添加图标的最简单方法是使用图标库，比如 Font Awesome。

将指定的图标类的名称添加到任何行内 HTML 元素（如 `<i>` 或 `<span>`）。

图标库中的所有图标都是可缩放矢量，可以使用 CSS进行自定义（大小、颜色、阴影等）。且IE6完全支持。



### Font Awesome图标

如需使用 Font Awesome 图标，请访问fontawesome.com，登录并获取代码添加到 HTML 页面的`<head>`部分：

```html
<script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
```

然后就可以在`<body>`中添加图标了。

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://kit.fontawesome.com/c7c26e62f8.js" crossorigin="anonymous"></script>
    
    <style>
      i {
        font-size: 40px;
        color: blue;
      }
    </style>
  </head>
  <body>
    <i class="fas fa-cloud"></i>
    <i class="fas fa-heart" style="color: red;"></i>
    <i class="fas fa-car"></i>
    <i class="fas fa-file"></i>
    <i class="fas fa-bars"></i>
    <i class="fab fa-alipay"></i>
  </body>
</html>
```



### Bootstrap Icons

URL: https://icons.getbootstrap.com/#icon-font

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    
    <style>
      i{
        font-size: 40px;
        color: blue;
      }
    </style>
  </head>
  <body>
    <i class="bi-alarm"></i>
    <i class="bi bi-upc-scan"></i>
    <i class="bi bi-trash"></i>
    <i class="bi bi-translate"></i>
    <i class="bi bi-tag-fill"></i>
  </body>
</html>
```



### 自定义字体图标

1. 先从网上下载字体
   1. https://icomoon.io/  
   2. https://www.iconfont.cn/  阿里巴巴字体库
2. 拷贝项目下面生成的 `@font-face`
3. 定义使用 `iconfont` 的样式
4. 挑选相应图标并获取字体编码，应用于页面 `<i class="iconfont size">&#xe6f9;</i>`



```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		@font-face {
			font-family: 'iconfont';
			src: url('font/iconfont.eot');
			src: url('font/iconfont.eot?#iefix') format('embedded-opentype'),
			url('font/iconfont.woff2') format('woff2'),
			url('font/iconfont.woff') format('woff'),
			url('font/iconfont.ttf') format('truetype'),
			url('font/iconfont.svg#iconfont') format('svg');
		}
		.iconfont {
			font-family: "iconfont" !important;
			font-size: 16px;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}
		.size {
			font-size: 80px;
		}
	</style>
</head>
<body>
	<i class="iconfont size">&#xe6f9;</i>
	<i class="iconfont size">&#xe741;</i>
	<i class="iconfont size">&#xe746;</i>
	<i class="iconfont size" style="color:red;">&#xe753;</i>
	<i class="iconfont size" style="color:green;">&#xe764;</i>
</body>
</html>
```



### 使用彩色字体图标 svg

1、第一步：引入项目下面生成的 symbol 代码

2、第二步：加入通用 CSS 代码（引入一次就行）

3、第三步：挑选相应图标并获取类名，应用于页面



```html
<script src="./iconfont.js"></script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-xxx"></use>
</svg>
```



### 开源图标库

* [Iconfont](https://www.iconfont.cn/)
* [IconPark](https://iconpark.oceanengine.com/official)
* [Font Awesome](https://fontawesome.com/)
* [Ionicons](https://ionic.io/ionicons)
* [Bootstrap Icons](https://icons.getbootstrap.com/)
* [Unicons](https://iconscout.com/unicons)
* [Tabler Icons](https://tabler.io/icons)
* [icomoon](https://icomoon.io/)



## CSS组合器

组合器是解释选择器之间关系的某种机制。

CSS 选择器可以包含多个简单选择器。在简单选择器之间，我们可以包含一个组合器。

CSS 中有四种不同的组合器：

* 后代选择器 (空格) : 匹配属于指定元素后代的所有元素。
  * `div p` : 选择 `<div>` 元素内的所有 `<p>` 元素。
* 子选择器 (`>`) : 匹配属于指定元素子元素的所有元素。
  * `div > p` : 选择其父元素是 `<div>` 元素的所有 `<p>` 元素。
* 相邻兄弟选择器 (`+`) : 匹配所有作为指定元素的相邻同级的元素。也就是同级并且最接近的指定元素。
  * `div + p` : 选择所有紧随 `<div>` 元素之后的 `<p>` 元素。
* 通用兄弟选择器 (`~`) : 匹配属于指定元素的同级元素的所有元素。
  * `p ~ ul` : 选择前面有 `<p>` 元素的每个 `<ul>` 元素。



```html
<!-- 后代选择器 -->
<style>
  div p{
    background-color: yellow;
  }
</style>

<body>
  <div>
    <p>这是div里的p标签</p>
    <p>这是div里的p标签</p>
    <article>
      <p>这是div->article下的p标签</p>
    </article>
  </div>
  <p>这是div外的p标签</p>
</body>
```

```html
<!-- 子选择器 -->
<style>
  div > p{
    background-color: yellow;
  }
</style>

<body>
  <div>
    <p>这是div里的p标签</p>
    <p>这是div里的p标签</p>
    <article>
      <p>这是div->article下的p标签</p>
    </article>
  </div>
  <p>这是div外的p标签</p>
</body>
```

```html
<!-- 相邻兄弟选择器 -->
<style>
  div + p{
    background-color: yellow;
  }
</style>

<body>
  <div>
    <p>这是div里的p标签</p>
    <p>这是div里的p标签</p>
    <article>
      <p>这是div->article下的p标签</p>
    </article>
  </div>
  <p>这是div外的p标签</p>
  <p>这是div外的p标签</p>
</body>
```

```html
<!-- 通用兄弟选择器 -->
<style>
  div ~ p{
    background-color: yellow;
  }
</style>

<body>
  <div>
    <p>这是div里的p标签</p>
    <p>这是div里的p标签</p>
    <article>
      <p>这是div->article下的p标签</p>
    </article>
  </div>
  <p>这是div外的p标签</p>
  <p>这是div外的p标签</p>
</body>
```



## 下拉菜单

核心代码：

```html
<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
</style>

<body>
  <h1>可悬停的下拉菜单</h1>

  <p>请把鼠标移到文本上，已查看下拉内容。</p>

  <div class="dropdown">
    <span>把鼠标移到我上面</span>
    <div class="dropdown-content">
      <p>Hello World!</p>
    </div>
  </div>
</body>
```



## 全尺寸背景图片

背景图像始终覆盖整个浏览器窗口。具体要求如下：

* 用图像填充整个页面（无空白）
* 根据需要缩放图像
* 在页面上居中图像
* 不引发滚动条



核心：使用html或body元素（始终至少是浏览器窗口的高度），然后在其上设置固定且居中的背景。最后使用 background-size 属性调整其大小。

```html
<style>
  /* 覆盖整个浏览器窗口的背景图片 */
  body {
    background: url(img_man.jpg) no-repeat center fixed; 
    background-size: cover;
  }
</style>
```









## CSS计数器

CSS 计数器是由 CSS 保持的“变量”，其值可以通过 CSS 规则递增（以跟踪其使用次数）。



### 属性和方法

如需使用 CSS 计数器，我们将使用以下属性：

* `counter-reset` : 创建或重置计数器
  * `counter-reset: count 1; ` ：创建一个命名为 count 的计数器，并设置起始值为1。起始值默认为0，起始值可以是正负整数。还可以同时设置多个计数器  `counter-reset: count count2 3;`
  * 还可以设置为 none 和 inherit ，取消重置以及继承重置。
* `counter-increment` : 递增递减计数器值
  * 值为 counter-reset 的 1 个或多个关键字，后面可以跟随数字，表示每次递增的次数，默认为1，可以是正负整数。`counter-increment: count count2 2;`
  * 和 counter-reset 一样，也可以设置为 none 和 inherit 。
* `content` : 插入生成的内容
* `counter()` 或 `counters()` 函数 : 将计数器的值添加到元素
  * `counter(name [,style])` ：name 就是 counter-reset 的名称。style 为可选参数，作用是：递增递减可以不一定是数字，还可以是英文字母或者罗马文等，支持的关键字值就是 `list-style-type` 中的值。
  * 一个 content 属性值可以有多个 counter() 方法：`content: counter(count) '--' counter(count2);`
  * `counters(name, string [,style])` ：显示子序号。string 表示子序号的连接字符串。style 参数同 counter() 。



**计数规则：普照源 (counter-reset) 唯一，每普照 (counter-increment) 一次，普照源增加一次计数值。**

计数器的数值变化遵循 HTML 渲染顺序，遇到一个 increment 计数器就变化，什么时候 counter 输出就输出此时的计数值。

注意：显示 counter 计数器值的那个 DOM 元素在文档流中的位置一定要在 counter-increment 元素的后面，否则是没有计数效果的。

如需使用 CSS 计数器，必须首先使用 counter-reset 创建它。

```html
<style>
  body {
    counter-reset: section;
  }

  /* 每次出现h1标签都会重置subsection值 */
  h1 {
    counter-reset: subsection;
  }

  h1::before {
    counter-increment: section;
    content: "Section " counter(section) ". ";
  }

  h2::before {
    counter-increment: subsection;
    content: counter(section) "." counter(subsection) " ";
  }
</style>

<body>
  <h1>HTML 教程：</h1>
  <h2>HTML 教程</h2>
  <h2>CSS 教程</h2>

  <h1>Scripting 教程:</h1>
  <h2>JavaScript</h2>
  <h2>VBScript</h2>

  <h1>XML 教程：</h1>
  <h2>XML</h2>
  <h2>XSL</h2>
</body>
```



### 目录嵌套Demo

要点：要想实现嵌套，必须让每一个列表容器拥有一个"普照源"，通过子辈对父辈的 counter-reset 重置、配合 counters() 方法才能实现计数器的嵌套。

```html
<div class="reset">
  <div class="counter">目录
    <div class="reset">
      <div class="counter">目录</div>
      <div class="counter">目录</div>
      <div class="reset">
        <div class="counter">目录</div>
      </div>
    </div>
  </div>
  <div class="counter">目录</div>
  <div class="counter">目录
    <div class="reset">
      <div class="counter">目录</div>
    </div>
  </div>
</div>


<style>
  .reset {
    counter-reset: no;
    padding-left: 20px;
  }
  
  .counter::before {
    content: counters(no, '-') '. ';
    counter-increment: no;
  }
</style>
```





## 工具提示

当用户将鼠标指针移到元素上时，工具提示通常用于提供关于某内容的额外信息。

```html
<style>
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }
  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    position: absolute;
    z-index: 1;
  }
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
</style>

<body>
  <div class="tooltip">
    鼠标移到这里
    <span class="tooltiptext">提示信息</span>
  </div>
</body>
```



### 定位工具提示

可以通过left / right / top / bottom 属性改变工具提示的位置。

```html
<style>
  /* 右侧工具提示，-5px是因为设置了工具提示的上下padding是5px，为了可以垂直居中需要top设置为-5px */
  .tooltip .tooltiptext {
    top: -5px;
    left: 105%; 
  }
  
  /* 左侧工具提示 */
  .tooltip .tooltiptext {
    top: -5px;
    right: 105%; 
  }

  /* 顶部工具提示 */
  .tooltip .tooltiptext {
    width: 120px;
    bottom: 100%;
    left: 50%;
    /* 为了工具提示和可悬停文本进行水平居中，值为工具提示宽度的一半 */
    margin-left: -60px; 
  }
  
  /* 底部工具提示 */
  .tooltip .tooltiptext {
    width: 120px;
    top: 100%;
    left: 50%;
    /* 为了工具提示和可悬停文本进行水平居中，值为工具提示宽度的一半 */
    margin-left: -60px; 
  }
</style>
```



### 工具提示箭头

通过::after属性在工具提示的后面添加空的content，接着通过边框创建箭头，并设置箭头的位置就行了。

```html
<style>
  /* 箭头 */
  .arrow {
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
</style>
```

```html
<style>
  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    bottom: 100%; /* 在工具提示的顶部 */
    left: 50%;	/* 和工具提示水平对齐 */
    margin-left: -5px; /* 和工具提示水平对齐，值为箭头大小的负数 */
    border-width: 5px;	/* 箭头大小 */
    border-style: solid;
    border-color: transparent transparent black transparent; /* 上箭头 */
  }
</style>
```



### 完整的工具提示

```html
<style>
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }
  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    position: absolute;
    z-index: 1;
    /* 设置工具提示显示的位置 */
    top: 120%;
    left: 50%;
    margin-left: -60px; /* 为了工具提示和可悬停文本进行水平居中，值为工具提示宽度的一半 */

    /* 淡入动画效果 */
    opacity: 0;
    transition: opacity 1s;
  }
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  /* 小箭头 */
  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    bottom: 100%; /* 在工具提示的顶部 */
    left: 50%;
    margin-left: -5px; /* 和工具提示水平对齐 */
    border-width: 5px;	/* 箭头宽度 */
    border-style: solid;
    border-color: transparent transparent black transparent; /* 上箭头 */
  }
</style>

<body>
  <div class="tooltip">
    鼠标移到这里
    <span class="tooltiptext">提示信息</span>
  </div>
</body>
```



## CSS 函数

### 基础

* var() ：用于访问CSS变量的值。可以接受一个可选的第二个参数，作为变量未定义时的回退值。
* calc() ：用于在 CSS 表达式中进行计算，允许在 CSS 的属性值中使用基本的数学运算。**运算符两边必须有空格**。`calc()` 函数也可以和其他 CSS 函数一起使用。
* min() ：接受两个或更多参数，并返回其中的最小值。
* max() ：接受两个或更多参数，并返回其中的最大值。
* clamp() ： 用于将一个值限制在一个特定的范围内。这个函数接受三个参数：最小值（MIN）、首选值（VAL）和最大值（MAX）。
  * 如果首选值（VAL）在最小值（MIN）和最大值（MAX）之间，那么 `clamp()` 函数将返回首选值。
  * 如果首选值（VAL）小于最小值（MIN），那么函数将返回最小值。
  * 如果首选值（VAL）大于最大值（MAX），那么函数将返回最大值。
* attr() ：用于获取被选中元素的某个 HTML 属性值，并在样式文件中使用该值。HTML 属性需以 `data-` 开头。`attr()` 函数总是返回一个字符串，所以不是所有的 CSS 属性都支持 `attr()` 函数，它通常用于那些可以接受字符串值的属性。
* url() ：用于引用或包含外部资源，如图像、字体或其他媒体文件。值可以是网络地址或者相对路径。
* image-set() ：允许为不同的设备像素比提供不同的图像资源，从而确保图像在各种设备上都能以适当的分辨率显示。也可以用于 `<img>` 标签的 `srcset` 属性，以实现类似的功能，
* counter() ：用于获取指定计数器的当前值。
* counters() ：用于获取多个嵌套计数器的值，并将它们连接成一个字符串。常用于嵌套列表，以显示子序号。
* minmax() ：用于定义一个长度范围，表示网格容器中的网格项可以使用的最小和最大尺寸。接受两个参数：最小值和最大值。常用在  Grid 布局中。
* repeat() ：用于重复一个或多个值指定的次数。常用在 Grid 布局和 Flexbox 布局中。
* element() ：可以将指定的 HTML 元素渲染为 CSS 背景图像。参数为 id 选择器 `#id` 。`实验性`
* fit-content() ：用于根据内容自动调整元素的尺寸。它接受一个参数，该参数可以是一个长度值（如 px、%、em 等）或百分比值，用于定义元素的最小或最大尺寸。当元素的内容超过指定尺寸时，`fit-content()` 函数可以确保元素的大小适应内容，但不会超过其最大限制。`实验性`



```css
div {  
  background-color: attr(data-color);  
  background-image: url('images/background.jpg');
  color: var(--main-color);
  background-image: element(#myElement);  
}

.element {  
  width: calc(50% - 50px);
  
  /* 高度始终在 100px 和 200px 之间 */
  height: calc(min(max(100px, 20vw), 200px));
  
  width: calc(min(50%, 300px));
  height: calc(max(100px, 10vh));
  
  font-size: clamp(12px, 2vw, 24px);  
}

.img-responsive {  
  background-image: image-set(  
    url('image-320w.jpg') 1x,  
    url('image-640w.jpg') 2x  
  );  
}

selector::before {  
  content: counter(counter-name);  
}

.grid-container {  
  display: grid;  
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));  
  grid-gap: 10px;  
}

.grid-container {  
  display: grid;  
  grid-template-columns: repeat(3, 100px);  
  grid-gap: 10px;  
}
```



### 颜色

* rgb() ：用于定义一个颜色。
* rgba() ：用于定义一个带有透明度的颜色效果。
* hsl() ：根据色相、饱和度、亮度定义颜色。
* hsla() ：根据色相、饱和度、亮度、透明度定义颜色。
* color-mix() ：用于混合两种颜色。该函数允许指定颜色空间（如 srgb、lch、lab 等）以及每种颜色混合的比例。
* hwb() ：根据色调（Hue）、白度（Whiteness）和黑度（Blackness）来定义颜色。
* lab() ：基于 CIELAB 色彩空间的颜色函数。CIELAB 是一种颜色空间，旨在更贴近人眼对颜色的感知。LAB 色彩空间由三个分量组成：L（亮度）、a（从绿色到红色的分量）、b（从蓝色到黄色的分量）。LAB 色彩空间更接近人眼对颜色的视觉感知。
* lch() ：基于 CIELCH 色彩空间的颜色函数。CIELCH 色彩空间是 CIELAB 色彩空间的扩展，其中 L 表示亮度，C 表示色度（即色彩的饱和度），H 表示色调（色相）。
* oklab() ：用于在 OKLab 色彩空间中定义颜色。



```css
div {
	color: rgb(255, 0, 0);
	color: rgba(255, 0, 0, 0.5);
  
  color: hsl(0, 100%, 50%);
  color: hsla(0, 100%, 50%, 0.5);
  
  background-color: color-mix(in srgb, 70%, blue);  
  
  color: hwb(0, 0%, 30%);
  color: lab(50% -10 20);
  color: lch(50% 60 120deg);
  color: oklab(0.5 0.3 0.2);
}
```



### 渐变

* linear-gradient() ：用于生成线性渐变背景。
* repeating-linear-gradient() ：与 `linear-gradient()` 类似，但是它创建的渐变会无限地重复。这意味着渐变模式会在容器内重复填充，直到填满整个容器。
* radial-gradient() ：用于生成径向渐变背景。
* repeating-radial-gradient() ：与 `radial-gradient()` 类似，但它创建的渐变会无限地重复。
* conic-gradient() ：用于生成锥形渐变背景。
* repeating-conic-gradient() ：与 `conic-gradient()` 类似，但是它创建的渐变会无限地重复。



```css
background: linear-gradient(to right, red, yellow);
background: repeating-linear-gradient(to right, red, yellow 10px);

background: radial-gradient(circle, red, yellow);
background: repeating-radial-gradient(circle, red, yellow 10%);

background: conic-gradient(red 0%, yellow 100%);
background: repeating-conic-gradient(red 0% 25%, yellow 25% 50%);
```







### 滤镜

* blur() ： 用于给图像或元素添加模糊效果。可以在不影响布局的情况下应用各种视觉效果。
* grayscale() ：用于将图像或元素转换为灰度图像。
* drop-shadow() ：用于给图像或元素添加阴影效果。
* brightness() ：用于调整图像或元素的亮度。这个函数允许增加或减少图像或元素的整体亮度，使其看起来更亮或更暗。
* contrast() ：用于调整图像或元素的对比度。通过增加或减少对比度，可以改变图像的色彩鲜明度和清晰度。
* saturate() ：用于调整图像或颜色的饱和度。
* sepia() ：用于将图像或元素的颜色转换为棕褐色（或称为“褐色”）效果，模仿老照片或复古风格。
* invert() ：用于反转图像或元素的颜色。它会将图像或元素中的每个颜色值取反，从而得到相应的反色。
* hue-rotate() ：用于调整图像或元素的色调。



```css
filter: blur(5px);
filter: grayscale(50%);
filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
filter: brightness(0.7);  
filter: contrast(1.5);
filter: saturate(2);
filter: sepia(75%);
filter: invert(1);  
filter: hue-rotate(90deg);
```



### 图形

* circle() ：用于定义一个圆形区域，并可以用于多种 CSS 属性中，如`shape-outside`或`clip-path`。这个函数允许指定一个圆形的半径和位置，以创建特定的布局或剪裁效果。
  * 在 `shape-outside` 属性中，为环绕效果
  * 在 `clip-path` 属性中，为裁剪效果
* ellipse() ：用于定义一个椭圆形区域。
* inset() ：用于定义图形剪裁区域。它允许创建一个矩形或带有圆角的矩形剪裁区域，该区域定义了元素内容应该显示的部分。
* polygon() ：用于定义一个由直线段组成的多边形剪裁区域。注意，`polygon()` 函数定义的顶点顺序很重要，它决定了多边形的形状和方向。
* path() ：用于定义图形剪裁区域。该函数允许指定一个SVG路径来定义剪裁的形状，能够实现更精确的图像或文本剪裁效果。



```css
shape-outside: circle(100px at 50px 50px);
clip-path: circle(50%);

shape-outside: ellipse(100px 50px at 50px 50px);
clip-path: ellipse(50% 75%);

/* 创建一个从边框向内偏移10px的矩形剪裁区域 */  
clip-path: inset(10px);  
/* 创建一个从顶部边框向内偏移20px，从右侧和左侧边框向内偏移30px，从底部边框向内偏移40px的矩形剪裁区域 */  
clip-path: inset(20px 30px 40px);  
/* 创建一个从顶部边框向内偏移10%，从右侧和左侧边框向内偏移20%，从底部边框向内偏移30%，并带有50px圆角的矩形剪裁区域 */  
clip-path: inset(10% 20% 30% round 50px);  
/* 创建一个带有四个不同圆角的矩形剪裁区域 */  
clip-path: inset(20px round 10px 20px 30px 40px);

/* 定义一个三角形剪裁区域 */  
clip-path: polygon(50% 0%, 0% 100%, 100% 100%);  
/* 定义一个四边形（矩形）剪裁区域 */  
clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);  
/* 定义一个五边形剪裁区域 */  
clip-path: polygon(0% 0%, 25% 100%, 50% 0%, 75% 100%, 100% 0%);  
/* 使用 fill-rule */  
clip-path: polygon(nonzero, 50% 0%, 0% 100%, 100% 100%);

clip-path: path('M0,0 L1,0 L1,1 L0,1 Z');  
```



### 变换

* scale()、scaleX()、scaleY()、scaleZ()、scale3d() ：缩放函数，用于调整元素的大小。
* rotate()、rotateX()、rotateY()、rotateZ()、rotate3d() ：旋转函数，用于调整元素的旋转角度。
* translate()、translatex()、translatey()、translateZ()、translate3d() ：平移函数，用于移动元素的位置。
* skew()、skewX()、skewY() ：倾斜函数，用于对元素进行倾斜变换。
* perspective() ：用于设置 3D 变换元素的透视效果。
* matrix()、matrix3d() ：通过矩阵来定义元素的 2D 和 3D 变换。



```css
transform: scale(2); /* 元素在水平和垂直方向上放大两倍 */  
transform: scale(1.5, 0.5); /* 元素在水平方向上放大1.5倍，垂直方向上缩小到一半 */
transform: scaleX(2);
transform: scaleY(0.5);
transform: scaleZ(0.5);
transform: scale3d(1, 2, 0.5);

transform: rotate(45deg); /* 元素顺时针旋转 45 度 */
transform: rotateX(90deg);
transform: rotateY(-45deg);
transform: rotateZ(180deg);
transform: rotate3d(1, 0, 0, 60deg);

transform: translate(50px, 100px); /* 元素在 X 轴上移动 50px，在 Y 轴上移动 100px */
transform: translateX(30px);
transform: translateY(-50px);
transform: translateZ(20px);
transform: translate3d(10px, 20px, 30px);

transform: skew(30deg, 20deg); /* 元素在 X 轴上倾斜 30 度，在 Y 轴上倾斜 20 度 */
transform: skewX(45deg);
transform: skewY(-30deg);

transform: perspective(500px) rotateX(45deg);  
```



### 动画

* cubic-bezier() ： 用于定义自定义的缓动曲线，让动画或过渡效果可以具有非线性的速度变化。这个函数基于贝塞尔曲线来工作，允许通过指定四个点（两个端点和两个控制点）来定义动画的速度曲线。
* steps() ：用于在动画或过渡中创建一种阶跃式（步进式）的变化效果，而不是平滑的过渡。当使用 `steps()` 函数时，属性会在指定的段数内突然改变，而不是在两个状态之间平滑地过渡。这种效果在模拟数字时钟、步进式进度条或某些类型的用户界面动画时特别有用。



```css
/* 使用自定义的 cubic-bezier 缓动函数 */  
div {  
  transition: width 2s cubic-bezier(0.25, 0.1, 0.25, 1.0);  
}

/* 或者在关键帧动画中使用 */  
@keyframes example {  
  0% { background-color: red; }  
  100% { background-color: blue; }  
}

div {  
  animation: example 3s cubic-bezier(0.42, 0, 1, 1);  
}


div {  
  width: 100px;  
  height: 100px;  
  background-color: red;  
  animation: jump 2s steps(2, end) infinite;  
}  
  
@keyframes jump {  
  0% { transform: translateX(0); }  
  100% { transform: translateX(100px); }  
}
```















