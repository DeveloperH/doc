# 基础

CSS 全称是 Cascading Style Sheets 层叠样式表，顾名思义，就是样式可以层层累加。



* 1996年12月17日：CSS 1
* 1998年5月12日：CSS 2
* 2007年：CSS 2.1



## CSS使用方式

* 使用`<link>`标签链入外部CSS样式表（链接式）（推荐）
* 在标签中使用`style属性`加入CSS样式（行内样式）
* 在`<style>`标签中加入CSS样式（内嵌式）
* 在`<style>`标签中使用`@import`导入样式

```html
<link rel="stylesheet" href="mycss.css" type="text/css" >

<p style="color: green;">hello</p>

<style type="text/css">
  p { color: pink;}
</style>

<style type="text/css">
  @import url(mycss.css);
</style>
```

**样式优先级问题：无论使用哪种方式，都遵循--就近原则。**



## CSS的注释

CSS中的注释符：`/* 注释内容 */`

HTML中的注释符：`<!-- 注释内容 -->`

```html
<!-- <link rel="stylesheet" href="style.css"> -->

<style>
  p {
    color: gray;
    /* font-size: 40px; */
  }
</style>
```



## CSS 选择器



### 选择器

* 标签选择器: 为所有相同的标签使用样式
* 类选择器: 为`class属性`相同的标签使用样式
* ID选择器: 为`id属性`相同的标签使用样式
* 全局选择器: 为HTML中所有标签使用样式
* 组合选择器: 标签选择器与类选择器/ID选择器的组合
* 继承选择器: 为相同层次结构的标签使用样式
* 属性选择器: 为带有特定属性或属性值的标签使用样式 `input[type="text"]{ }`
* 选择符
  * 表示后代关系的空格
  * 表示父子关系的 `>` ：只选择某个元素的直接子元素，不包括孙子元素  `.content > div {}`
  * 表示相邻兄弟关系的 `+` ：只选择某个元素`向下相邻`的同级元素(`一个`)，如果中间有其他元素隔开则无效 `h1+li {}`
  * 表示兄弟关系的 `~` ：选择某个元素`向下`查询的同级元素(`多个`) `h1~li {}`
  * 表示列关系的 `||` ：`.col || td {}`

**集体声明：如果多个选择器使用相同的样式，可以写在一起，用逗号分隔开。**

**优先级：行内>id>class>标签选择器>*>body。**

```html
<style>
  p { color: green;}
  
  .mycolor { color: red;}
  
  #content { color: gray;}
  
  * { color: blue;}
  
  p.one { color: red;}
  
  div p.content span{ color: orange;}
  
	p, .mycolor, #one { color: green;}
  
  input[type="text"] { background-color: #dddddd;}
  
  .first>li { color: gold;}
  h1+li { color:red;}
  h1~li { color:yellow;}
</style>
```







### 属性选择器

作用：可以为带有特定属性的 HTML 元素设置样式。(可以为不同表单类型设置不同样式)

* [attribute] : 属性选择器，用于选取带有指定属性的元素。`a[target]{ }`
* [attribute="value"] : 用于选取带有指定属性和值的元素。`input[type="text"]{ }`
* [attribute~="value"] : 用于选取属性值包含指定词的元素。`[title~="flower"]{ }`
  * 会匹配以下属性的元素：title="flower"、title="summer flower" 以及 title="flower new"
  * 不匹配：title="my-flower" 或 title="flowers"。
* [attribute|="value"] : 用于选取指定属性以指定值开头的元素。`[class|="top"]{ }`
  * 值必须是完整或单独的单词，比如 class="top" 或者后跟连字符的，比如 class="top-text"。
* [attribute^="value"] : 用于选取指定属性以指定值开头的元素。`[class^="top"] { }`
  * 值不必是完整单词！
* [attribute$="value"] : 用于选取指定属性以指定值结尾的元素。`[class$="test"]{ }`
  * 值不必是完整单词！
* [attribute*="value"] : 用于选取属性值包含指定词的元素。`[class*="test"]{ }`
  * 值不必是完整单词！

```html
<style>
  [id] { color: red;}
  a[target] { background: yellow;}
  a[target="_blank2"] { background: yellow;}
  [title~="flower"] { background: pink;}
  [class|="top"] { background: red;}
  [class^="top"] { background: yellow;}
  [class$="test"] { background: red;}
  [class*="test"]{ background: red;}
</style>

<body>
  <a href="#">网址1</a>
  <a href="#" target="_blank">网址2</a>

  <p title="flower">玫瑰花</p>
  <p title="flowers">花露水</p>
  <p title="meigui flower">玫瑰花</p>

  <p class="top-header">top-header</p>
  <p class="toptext">toptext</p>
  <p class="text-top">texttop</p>
  
  <p class="re-test">test</p>
  <p class="actest">actest</p>
  <p class="ttestt">ttestt</p>
</body>
```

```html
<!-- 带有图标/图像的输入框 -->
<style>
  input[type=text] {
    background-color: white;
    background-image: url('searchicon.png');
    background-position: 10px 10px; 
    background-repeat: no-repeat;
    padding-left: 40px;
  }
</style>
```





### 伪类

伪类也是选择器的一种，作用于标签的状态上，用于添加特殊的效果。比较常见的有: 超链接`<a>`的伪类。伪类的特征是其前面有一个冒号 `:`

* a:link : 超链接未被访问的效果:
* a:visited : 超链接已被访问的效果
* a:hover : 超链接在鼠标悬停时的效果
* a:active : 超链接在激活时的效果

**注意：超链接伪类的排列顺序一定要按以下顺序 link-> visited-> hover-> active **

```html
<style>
  /* 设置超链接未被访问时文字颜色为绿色 */
  a:link{ color: green;}
  /* 设置超链接已被访问时文字的颜色为红色 */
  a:visited{ color: red;}
  /* 设置超链接鼠标悬停时文字颜色为粉色 */
  a:hover{ color: pink;}
  /* 设置超链接在被用户激活时文字颜色为橘色 */
  a:active{ color: orange;}
  
  /* 设置超链接没有下划线 */
	a{ text-decoration: none;}
</style>
```



**参考资料URL: https://www.w3school.com.cn/css/css_pseudo_classes.asp**

* :focus : 当元素获得焦点时的效果。
* :active : 当鼠标按下时的效果。支持非焦点元素。
* :hover : 当鼠标悬停在元素上的效果。
* :root : 选择元素的根元素。在 HTML 中，根元素始终是 html 元素。优先级比 html 选择器高
* :disabled : 当元素被禁用时的效果。大多用在表单上。
* :enabled : 当元素启用时的效果。大多用在表单上。
* :required : 选择带 `required` 属性的表单元素。仅适用于input、select 和 textarea。
* :optional : 选择不带 `required` 属性的表单元素。仅适用于input、select 和 textarea。
* :read-only : 选择带 `readonly` 属性的表单元素。
* :read-write : 选择不带 `readonly` 属性的表单元素。
* :in-range : 选择具有指定范围内的值的所有元素。仅适用于带有min和/或 max 属性的 input 元素！
* :out-of-range : 选择值在指定范围之外的所有元素。仅适用于带有min和/或 max 属性的 input 元素！
* :valid : 选择拥有有效值的表单元素，该值根据元素设置得到验证。例如合法的email等
* :invalid : 选择值无效的表单元素，其值根据元素设置未通过验证。例如不合法email等
* :empty : 匹配没有子元素（包括文本节点）的每个元素。
* :not(selector) : 匹配非指定元素/选择器的每个元素。前提要设置非指定元素/选择器的样式。
* :target : 突出显示活动的 HTML 锚。
* :first-child : 匹配元素的第一个指定子元素。`ul li:first-child{}` 如果第一个元素不是li，则无效
* :last-child : 匹配元素的最后一个指定子元素。
* :first-of-type : 匹配属于其父元素的特定类型的首个子元素的每个元素。等同于 `:nth-of-type(1)`。
* :last-of-type : 匹配属于其父元素的特定类型的最后一个子元素的每个元素。等同于 `:nth-last-of-type(1)`。
* `:nth-of-type(n)` : 匹配属于父元素的特定类型的第 N 个子元素的每个元素。`推荐使用`
  * n 可以是数字、关键词或公式。
  * 关键词：odd(奇数) / even(偶数) ，`第一个子元素的下标是 1`
  * 公式(*an* + *b*)：表示周期的长度，n 是计数器（从 0 开始），b 是偏移值。
  * `li:nth-of-type(2n) 可以表示为偶数` `li:nth-of-type(2n+1) 可以表示为奇数` `li:nth-of-type(3n) 可以表示为3的倍数`
* :nth-last-of-type(n) : 匹配属于父元素的特定类型的第 N 个子元素的每个元素，从最后一个子元素开始计数。
  * n 可以是数字、关键词或公式。同上
* :nth-child(n) : 匹配属于其父元素的第 N 个子元素，`顺序不论元素的类型，如果第n个元素类型不是:前的元素类型，则无事发生`。可以通过`nth-child(even)`选择器，选择所有偶数/奇数表行。从1开始。
  * n 可以是数字、关键词或公式。同上
  * 正方向范围：`li:nth-child(n+3)`  选中从第3个开始的子元素。
  * 负方向范围：`li:nth-child(-n + 5)`  选中从第1个到第5个子元素
  * 前后范围限制：`li:nth-child(n+2):nth-child(-n+4)`  选中第2个到第4个之间的子元素
* :nth-last-child(n) : 匹配属于父元素的特定类型的第 N 个子元素的每个元素，从最后一个子元素开始计数。
  * n 可以是数字、关键词或公式。同上
* :only-of-type : 匹配属于其父元素的特定类型的唯一子元素的每个元素。
* :only-child : 匹配属于其父元素的唯一子元素的每个元素。
* :where : 选择所有能被该选择器列表中任何一条规则选中的元素。
* :has() ：可以检查父元素是否包含至少一个元素，或者一个条件，例如输入是否获取到焦点。





```html
<style>
  input:focus { background-color: yellow;}
  input:hover { background-color: pink;}
  :root { background-color: red;}
  input:disabled { background-color: gray;}
  input[type="text"]:disabled { background-color: #dddddd;}
  input[type="text"]:enabled { background-color: green;}
  
  input:required { border: 1px solid red;}
  input:optional { border: 1px solid red;}
  input:read-only { background-color: gray;}
  input:read-write { background-color: orange;}
  input:in-range { border: 1px solid green;}
  input:out-of-range { border: 1px solid red;}
  input:valid { border: 1px solid green;}
  input:invalid { border:1px solid red;}
  p:empty {
    width: 100px;
    height: 20px;
    background-color: red;
  }
  p { color: red;} 
  :not(p) { color: green;}
  :target { background-color: red;}
  
  .card:has(.card-image) {
    display: flex;
    align-items: center;
  }
  
  form:has(input:focused) {
    background-color: lightgrey;
  }
</style>

<body>
  <input type="text" >
  <input type="button" value="按钮" disabled>
  <input type="number" min="0" max="10">
  <input type="email">
  
  <a href="#mubiao">跳转到锚点</a>
  <p id="mubiao">锚点位置</p>
</body>
```



```html
<style>
  ul li:first-child {
    background-color: yellow;
  }
  ul li:last-child {
    background-color: orange;
  }
  p:first-of-type{ background-color: red;}
  p:last-of-type{ background-color: green;}
  
  p:nth-of-type(2) { background-color: red;}
  p:nth-last-of-type(2) { background-color: blue;}
  p:nth-of-type(odd) { background-color: red;}
  
  p:nth-child(2) { color: red;}
  p:nth-last-child(even) { color: green;}
  
  .parent .title, .parent #article {
    color: red;
  }

  .parent :where(.title, #article) {
    color: red;
  }
</style>

<body>
  <ul>
    <li>张三</li>
    <li>李四</li>
    <li>王五</li>
  </ul>
  <ul>
    <li>篮球</li>
    <li>足球</li>
    <li>羽毛球</li>
  </ul>
	
</body>
```



```css
/* 根据项目数更改网格 */
.wrapper {
  --item-size: 200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--item-size), 1fr));
  gap: 1rem;
}

.wrapper:has(.item:nth-last-child(n + 5)) {
  --item-size: 120px;
}
```





### 伪元素

CSS 伪元素用于设置元素指定部分的样式。伪元素的特征是其前面有两个冒号 `::` 。例如，它可用于：

* 设置元素的首字母、首行的样式
* 在元素的内容之前或之后插入内容
* 可以组合多个伪元素



* ::after : 指定元素后面插入内容，字体图标原理就是通过在::after设置样式，从而插入的。
  * content : 添加的内容，可以是文字也可以是图片等等...
* ::before : 指定元素前面插入内容
  * content : 添加的内容，可以是文字也可以是图片等等...
* ::first-letter : 选择每个指定元素的首字母。
* ::first-line : 选择每个指定元素的首行。、
* ::selection : 匹配被用户选取的部分。(使被选中的文本成为红色)
  * 只能应用少量 CSS 属性：color、background、cursor 以及 outline

```html
<style>
  p::before{ content: "hi"; }
  p::after{ content: url("Sport\ W205.png");}
  p:after {
    content: "插入的内容";
    background-color: yellow;
    color: red;
    font-weight: bold;
  }
  
  p::first-letter{ color: red;}
  p::first-line{ color: red;}
  p::selection{ color: red;}
</style>

<body>
  <p>Good</p>
</body>
```



### CSS 选择器的优先级

#### 规则概览

CSS  优先级有着明显的不可逾越的等级制度。可以分为以下几个等级：

* 0级：通配选择器 `*` 、选择符 `+ > ~ 空格 ||` 和逻辑组合伪类 `：not() :is() :where` 。这些伪类本身并不影响 CSS 优先级，影响优先级的是括号里面的选择器。
* 1级：标签选择器 `p {}`
* 2级：类选择器 `.foo` 、属性选择器 `[foo]` 和伪类 `:hover`
* 3级：ID 选择器 `#foo`
* 4级：style 属性内联 `<span style=""></span>`
* 5级：`!important`



#### 计算规则

对于 CSS 选择器优先级的计算，业界流传最广的是数值记数法。

每一段 CSS 语句的选择器都可以对应一个具体的数值，数值越大优先级越高，其中的 CSS 语句将被优先渲染。

* 出现一个0级选择器，优先级数值+0
* 出现一个1级选择器，优先级数值+1
* 出现一个2级选择器，优先级数值+10
* 出现一个3级选择器，优先级数值+100



**"后来居上"原则：当 CSS 选择器的优先级数值一样的时候，后渲染的选择器的优先级更高。**

**CSS 选择器的优先级与 DOM 元素的层级位置没有任何关系。**



| 选择器          | 计算值 | 计算细则               |
| --------------- | ------ | ---------------------- |
| * { }           | 0      | 一个0级选择器，数值为0 |
| ul > li { }     | 2      | 1+0+1                  |
| a:not([id]) { } | 11     | 1+0+10                 |
| #foo .bar p { } | 111    | 100+0+10+1             |



### CSS 权重

| 类型                    | 值       |
| ----------------------- | -------- |
| !important              | Infinity |
| 行内样式                | 1000     |
| id                      | 100      |
| class、属性选择器、伪类 | 10       |
| 标签选择器、伪元素      | 1        |
| 通配符                  | 0        |



(x, y, z) 记数法：

* x ：id 选择器的数量
* y ：class 选择器、伪类、属性选择器的数量
* z ：元素选择器、伪元素的属性

依次比较每个位置的总数，越大的优先级越高。

图文示意：https://specifishity.com



```
#list {}    (1, 0, 0)
div {}      (0, 0, 1)
.box {}     (0, 1, 0)

.box #list::before{}              (1, 1, 1)
.box #list a::before{}            (1, 1, 2)
.box .form input[type='text']{}   (0, 3, 1)
.box ul a:hover{}                 (0, 2, 2)
```







### !important 最高优先级

!important，作用是提高指定样式规则的应用优先权（优先级）。

写在CSS样式定义的最后面，使该条样式的优先级最高。

```html
<style>
  div { color: green !important; font-size: 20px !important; }
</style>
```



超越 `!important` 指的是 max-width 会覆盖 width，而且这种覆盖不是普通的覆盖，是超级覆盖。

```html
<img src="1,jpg" style="width:400px !important;" />

img {
	max-width: 250px;
}
```

图片最后的宽度是 250px。



### 命名习惯

* 短命名
* 组合命名。使用前缀组合，或者统一的前缀，能够减少命名冲突带来的问题。
* 基于 CSS 属性的命名



```
.some-intro { }		// 短命名
.some-introduction { }	// bad

.dialog-title { }	// 前缀组合
.cs-main { }	// 统一的前缀
.title { }	// bad

// 基于 CSS 属性的命名
.db { display: block; }
.ml20 { margin-left: 20px; }
```



### 最佳实践

* 不要使用 ID 选择器
  * 优先级太高，重置不方便。
  * 替代方案：使用属性选择器。`[id="card"] `
* 不要嵌套选择器
  * 渲染性能糟糕：CSS 选择器是从右往左进行匹配渲染的。当 `.foo > div` 时，需要匹配页面所有的 div 再匹配 .foo 元素
  * 优先级混乱：嵌套太深，重置不方便，可能会遇到优先级覆盖无效的问题
  * 样式布局脆弱：当调整 HTML 后，整个样式可能匹配不上结构从而挂掉
* 使用无嵌套的纯类名选择器，易于重置样式。`.cs-nav` `.cs-nav-a`
* 使用面向属性的命名，可以减少命名冲突和耦合性。`.ml20 { margin-left: 20px; }`
* 正确使用状态类名。.active 类名自身无样式，就是一个状态标识符，用来与其他类名发生关系，让其他类名的样式发生变化
  * **`.active` 状态类名自身绝对不能有 CSS 样式。** `.cs-content.active { height: auto; }`
* 无标签、无层级：性能高、易重置。



### 实用技巧

hover改变兄弟元素样式：可以使用兄弟选择器 `.bro1:hover+.bro2 { display:none; }`







## 颜色

在CSS中，指定颜色是通过使用预定义的颜色名称，或 RGB、HEX、HSL、RGBA、HSLA 值。

`transparent` : 透明色



### HEX十六进制颜色

`"#rrggbb"` : 其中 rr（红色）、gg（绿色）和 bb（蓝色）是介于 00 和 ff 之间的十六进制值（与十进制 0-255 相同）。



### RGB颜色

**`rgb(red, green, blue)`**

每个参数 (red、green 以及 blue) 定义了 0 到 255 之间的颜色强度。例如：

* 红色: rgb(255, 0, 0)
* 黑色: rgb(0, 0, 0)
* 白色: rgb(255, 255, 255)



### RGBA颜色

**`rgba(red, green, blue, alpha)`**

RGBA 颜色值是具有 alpha 通道的 RGB 颜色值的扩展 - 它指定了颜色的不透明度。

alpha 参数是介于 0.0（完全透明）和 1.0（完全不透明）之间的数字。



### HSL颜色

**`hsla(hue, saturation, lightness)`**

在 CSS 中，可以使用色相、饱和度和明度（HSL）来指定颜色。

色相（hue）是色轮上从 0 到 360 的度数。0 是红色，120 是绿色，240 是蓝色。

饱和度（saturation）是一个百分比值，0％ 表示灰色阴影，而 100％ 是全色。

亮度（lightness）也是百分比，0％ 是黑色，50％ 是既不明也不暗，100％是白色。



### HSLA颜色

**`hsla(hue, saturation, lightness, alpha)`**

HSLA 颜色值是具有 alpha 通道的 HSL 颜色值的扩展 - 它指定了颜色的不透明度。

alpha 参数是介于 0.0（完全透明）和 1.0（完全不透明）之间的数字。



```html
<!-- RGB 混合颜色 -->
<style>
  #main {
    width: 500px;
    margin: 0 auto;
  }
  #colorpanel {
    width: 100%;
    height: 100px;
    background-color: rgb(0, 0, 0);
  }
  #colortext {
    margin-top: 10px;
    text-align: center;
  }
  #slidebox {
    overflow: hidden;
  }
  .slide {
    float: left;
    margin-left: 25px;
  }
</style>

<body>
  <div id="main">
    <div id="colorpanel"></div>
    <div id="colortext">rgb(0, 0, 0)</div>
    <div id="slidebox">
      <div class="slide">
        <h4>RED</h4>
        <input type="range" id="slideRed" value="0" max="255" min="0" onchange="changeRGB()" oninput="changeRGB()">
        <div id="valueRed">0</div>
      </div>
      <div class="slide">
        <h4>GREEN</h4>
        <input type="range" id="slideGreen" value="0" max="255" min="0" onchange="changeRGB()" oninput="changeRGB()">
        <div id="valueGreen">0</div>
      </div>
      <div class="slide">
        <h4>BLUE</h4>
        <input type="range" id="slideBlue" value="0" max="255" min="0" onchange="changeRGB()" oninput="changeRGB()">
        <div id="valueBlue">0</div>
      </div>
    </div>
  </div>

  <script>
    var slideR = document.getElementById('slideRed')
    var valueR = document.getElementById('valueRed')
    var slideG = document.getElementById('slideGreen')
    var valueG = document.getElementById('valueGreen')
    var slideB = document.getElementById('slideBlue')
    var valueB = document.getElementById('valueBlue')
    var cText = document.getElementById('colortext')
    var panel = document.getElementById('colorpanel')

    function changeRGB(){
      valueR.innerHTML = slideR.value
      valueG.innerHTML = slideG.value
      valueB.innerHTML = slideB.value
      cText.innerHTML = `rgb(${slideR.value}, ${slideG.value}, ${slideB.value})`
      panel.style.backgroundColor = cText.innerHTML
    }
  </script>
</body>
```



## 背景样式

* background : 背景简写，可以同时设置背景颜色、图片、重复方式、固定方式、位置
  * 可以指定多个背景层，使用逗号分隔每个背景层。
  * 背景不会被打印。
* background-color : 背景颜色
* background-image : 背景图片，默认是进行水平和垂直方向上的平铺，从元素的左上方开始。
* background-repeat : 背景图片的重复方式
  * repeat(默认铺满) / no-repeat(只一张) / repeat-x(横向铺满) / repeat-y(纵向铺满)
* background-attachment : 背景图片的依附方式
  * scroll(默认，跟随画布滚动) / fixed(固定不动)
* background-position : 背景图片的起始平铺位置，默认是左上角铺起。
  * x轴 y轴 (center / top / left / right / bottom) 例如：right bottom;（右下角）
  * x坐标点 y坐标点 (100px 100px)
* background-clip : 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。
  * border-box : 默认，背景被裁剪到边框盒。
  * padding-box : 背景被裁剪到内边距框。
  * content-box : 背景被裁剪到内容框。
  * text : 背景被裁剪成文字的前景色。可以用来设置图像填充文字效果。
* background-origin : 规定 background-position 属性相对于什么位置来定位。
  * padding-box : 默认，背景图像相对于内边距框来定位。
  * border-box : 背景图像相对于边框盒来定位。
  * content-box : 背景图像相对于内容框来定位。
  * 如果背景图像的 background-attachment 属性为 "fixed"，则该属性没有效果。
* background-size : 规定背景图像的尺寸。
  * length : 设置背景图像的高度和宽度。第一个值设置宽度，第二个值设置高度。如果只设置一个值，则第二个值会被设置为 "auto"。
  * parcentage : 以父元素的百分比来设置背景图像的宽度和高度。第一个值设置宽度，第二个值设置高度。如果只设置一个值，则第二个值会被设置为 "auto"。
  * cover : 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
    * 在移动端中，可能会出现背景图虽然覆盖整个屏幕，但是显示不全问题，这是因为某些浏览器不会给body添加高度，所以增加 `height: 100vh;` 即可。
  * contain : 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。
* backdrop-filter : 可以让你为一个元素后面区域添加滤镜效果（如模糊或颜色偏移）。因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。
  * 毛玻璃：`backdrop-filter: blur(5px);`
  * [更多效果](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter)

```html
<style>
  body{
    margin: 0 ;
    padding: 0;
    background: red url(pic.png) no-repeat scroll center center;
    
    background-color: pink;
    background-image: url("pic.png");
    background-repeat:repeat;
    background-position:center center;
    /* background-position: 100px 100px; */
    background-attachment:fixed;
    
    background: url('cool-1.jpg'), url('cool-2.jpg');
  }
</style>
```

```html
<style>
  .divclip{
    width: 100px;
    height: 100px;
    background-color: rgb(0, 255, 0);
    padding: 20px;
    border: black 5px dotted;
    background-clip:content-box;
  }

  .divorigin{
    width: 100px;
    height: 100px;
    background-image: url("icon.png");
    background-repeat: no-repeat;
    background-position: left;
    padding: 20px;
    border: black 5px dotted;
    background-origin: border-box;
  }
  
  /* 图像填充文字效果 */
  h1 {
    background-image: url('./flower.jpg');
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-color: white;
  }
  
  /* 毛玻璃效果 */
  .login {
    backdrop-filter: blur(5px);
  }
</style>
```



## 边框样式

* border : 边框简写，可以同时设置边框的宽度、样式(必需)和颜色。
* border-width : 边框宽度，也可以设置一到四个值（用于上边框、右边框、下边框和左边框）。默认是 3px。
* border-style : 边框样式，也可以设置一到四个值（用于上边框、右边框、下边框和左边框）
  * solid(实线) / dashed(虚线) / dotted(点线) / double(双线) / ridge(突起) / none(无边框)
* border-color : 边框颜色，也可以设置一到四个值（用于上边框、右边框、下边框和左边框）
  * border-color 默认颜色就是 color 色值。类似特性的 CSS 属性还有 `outline、box-shadow、text-shadow`
* border-top / border-right / border-bottom / border-left : 某一条边框的样式
* border-top-width / border-top-style / border-top-color : 设置某一条边框的单个效果
* border-radius : 定义元素角的半径，也就是圆角边框
  * 四个值 - border-radius: 15px 50px 30px 5px;（左上角、右上角、右下角、左下角）
  * 三个值 - border-radius: 15px 50px 30px;（左上角，右上角和左下角，右下角）
  * 两个值 - border-radius: 15px 50px;（左上角和右下角，右上角和左下角）
  * 一个值 - border-radius: 15px;（该值用于所有四个角，圆角都是一样的）
* border-top-left-radius / border-top-right-radius / border-bottom-right-radius / border-bottom-left-radius : 四个边的圆角
* border-collapse : 设置表格的边框是否被合并为一个单一的边框
  * separate(默认，边框会被分开) / collapse(边框会合并为一个单一的边框)

```html
<style>
  div{
    width: 100px;
    height: 100px;
    border: 2px solid red;
    border-radius: 20px;
    
    border-width: 3px;
    border-style: solid;
    border-color: #999;
    
    border-top: 2px solid red;
    border-bottom: 1px dotted green;
    
    border-top-width: 3px;
    border-top-style: double;
    border-top-color: pink;
  }
</style>
```



### hover 变色

利用 border-color 默认颜色就是 color 色值实现文件上传框 hover 变色

```html
<div class="add"></div>

<style>
.add {
  display: inline-block;
  width: 76px;
  height: 76px;
  color: #ccc;
  border: 2px dashed;
  transition: color .25s;
  position: relative;
  overflow: hidden;
}

.add:hover {
  color: #34538b;
}

.add::before,
.add::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
}

.add::before {
  width: 20px;
  border-top: 4px solid;
  margin: -2px 0 0 -10px;
}

.add::after {
  height: 20px;
  border-left: 4px solid;
  margin: -10px 0 0 -2px;
}
</style>
```



### 绘制三角

```css
.box {
  width: 10px;
  height: 10px;
  border: 10px solid;
  border-color: #f30 #00f #396 #0f0;
}
```

原理：如果将4个方向的其他几个方向边框颜色为透明，就会变成一个梯形。再进一步，宽度设置为0，就变成了三角形。

```css
div {
  width: 0;
  border: 10px solid;
  border-color: #f30 transparent transparent;
}
```



![](http://qiniu.huangyihui.cn/202506120141086.png)



## 轮廓样式

轮廓是在元素周围绘制的一条线，在边框之外，以凸显元素。

* outline : 轮廓简写，可以同时设置轮廓的宽度、样式(必需)和颜色。
* outline-style : 轮廓样式
  * solid(实线) / dashed(虚线) / dotted(点线) / double(双线) / ridge(突起) / none(无轮廓)
* outline-color : 轮廓颜色
  * invert(颜色反转，可以确保无论颜色背景如何，轮廓都是可见的) / HEX / RGB / HSL...
* outline-width : 轮廓宽度
* outline-offset : 轮廓偏移，指定元素的轮廓与边框之间的间距。元素及其轮廓之间的空间是透明的。



**轮廓和边框的不同:**

轮廓是在元素边框之外绘制的，并且可能与其他内容重叠。同样，轮廓也不是元素尺寸的一部分；元素的总宽度和高度不受轮廓线宽度的影响。

```html
<style>
  div{
    width: 500px;
    height: 100px;
    border: 2px solid black;
    outline: 10px solid cornflowerblue;

    outline-style:solid;
    outline-color: cornflowerblue;
    outline-width: 10px;
    margin: 50px;
    outline-offset: 25px;
  }
</style>
```





## 边距样式

* margin : 外边距，也可以通过参数的个数不同，设置各条边的外边距。**margin的背景色永远是透明的。**
  * margin : 10px 20px		上下10，左右20
  * margin : 10px 20px 30px	上 左右 下
  * margin : 10px 20px 30px 40px  上 右 下左
  * margin : auto; 使元素在其容器中水平居中。如果未设置 width 属性（或将其设置为 100％），则居中对齐无效。
* margin-top : 上外边距
  * auto ：在flex中，会根据盒子剩余空间设置边距，也就是会在盒子的最底部
* margin-right : 右外边距
* margin-bottom : 下外边距
* margin-left : 左外边距
* padding : 内边距，同样可以通过参数的个数不同，设置各边的内边距。某个方向没有值，就到对面找。padding会拉升盒子的大小
* padding-top / padding-right / padding-bottom / padding-left



**注意点:**

* margin允许负值，padding不允许负值。
* padding 的百分比值无论是水平方向还是垂直方向都是相对于宽度计算的。
* 由于每个浏览器的内外边距默认值不同，我们需要将所有内外边距都设置为0 `*{ margin: 0; padding: 0; }`
* 使用padding时，会改变原设置的width，这是我们不希望看到的。可以使用`box-sizing`属性，使元素保持其宽度。如果增加内边距，则可用的内容空间会减少。



```html
<style>
  div{
    width: 200px;
    height: 100px;
    border: black solid 1px;
    margin: 20px;
    
    margin: 25px 50px 75px 100px;
    margin-top: 20px;
    margin: auto;    
  }
</style>
```

```html
<style>
  div{
    width: 200px;
    height: 100px;
    border: black solid 1px;
    padding: 20px;

    padding: 5px 10px 30px 50px;
    padding-top: 10px;
    box-sizing: border-box;
  }
  
  div{
    padding: 50%; /* 实现一个正方形 */
  }
</style>
```



### margin 合并

块级元素的上外边距与下外边距有时会合并为单个外边距，这样的现象成为 “margin” 合并。注意：它只发生在块级元素和在垂直方向。

* 相邻兄弟元素 margin 合并
  * 第一行的 margin-bottom 和 第二行的 margin-top 合并在一起了
* 父级和第一个/最后一个子元素
  * 对于 margin-top 合并，可以进行如下操作(满足一个条件即可)
    * 父元素设置为块状格式化上下文元素  `overflow:hidden`
    * 父元素设置 border-top 值
    * 父元素设置 padding-top 值
    * 父元素和第一个子元素之间添加内联元素进行分隔
  * 对于 margin-bottom 合并，可以进行如下操作(满足一个条件即可)
    * 父元素设置为块状格式化上下文元素  `overflow:hidden`
    * 父元素设置 border-bottom 值
    * 父元素设置 padding-bottom 值
    * 父元素和最后一个子元素之间添加内联元素进行分隔
    * 父元素设置 height、min-height或max-height
* 空块级元素的 margin 合并
* **margin-top 的百分比是根据父元素宽度计算的**



**margin 合并的计算规则：正正取大值、正负值相加、负负最负值。**



### margin: auto

margin: auto 的填充规则：

* 如果一侧定值，一侧 auto，则 auto 为剩余空间大小
* 如果两侧均是 auto，则平分剩余空间



实现垂直居中

```css
.father {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.son {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
   width: 200px;
  height: 100px;
  margin: auto;
}
```



## 尺寸样式

* width : 宽度
* height : 高度。如果父元素的高度为 auto，只要子元素在文档流中，其百分比值完全就被忽略了。如果需要让元素支持百分比值的高度，有以下两种方法
  * 设置显式的高度值。例如 `height: 600px;`
  * 使用绝对定位。需要注意的是，绝对定位元素的百分比计算和非绝对定位元素的百分比计算是有区别的，区别在于**绝对定位的宽高百分比计算是相对于 padding box 的**，也就是说会把 padding 大小值计算在内。**非绝对定位元素则是相对于 content box 计算的**。
* max-width : 最大宽度，当窗口尺寸小于该值时，不会出现滚动条。它的初始值是 none。
* min-width : 最小宽度
  * 当 min-width 和 max-width 同时存在时，min-width 会覆盖 max-width
* max-height : 最大高度
* min-height : 最小高度
* aspect-ratio : 纵横比 https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio

注意：height 和 width 属性不包括内边距、边框或外边距。



```html
<style>
  div{
    background-color: cornflowerblue;
    width: 800px;
    height: 200px;
    
    max-width: 980px;
    min-width: 600px;

    max-height: 1000px;
    min-height: 800px;
  }
  
  /* 实现一个正方形，这样只需要设置一个宽度 */
  .square {
    background: #8A2BE2;
    width: 25rem;
    aspect-ratio: 1/1;
  }
</style>
```



width/height 的默认值是 auto。max- 系列的初始值是 none。min- 系列的初始值 auto。

这些属性之间有着一套相互覆盖的规则。例如 max-width 会覆盖 width，并且这种覆盖比 `!important` 的权重还大。min-width 会覆盖 max-width，常发生在 min-width 和 max-width 冲突的时候。

规则：`min-* > max-* > w/h !important > w/h`

```html
<div class="box"></div>

<style>
.box {
  min-width: 250px;  /* 会超越 max-width */
  max-width: 200px;
  width: 300px !important;
  height: 100px;
  background: red;
}
</style>
```

这个 `div` 元素最终的宽度是多少呢？是 `250px` 。



通过 max-height 实现任意高度元素的展开收起动画。max-height 推荐使用足够安全的最小值，以此避免收起时动画 "效果延迟" 的问题。

为什么不使用 auto 呢？auto 是个关键字值，并非数值。从 0px 到 auto 是无法计算的，因此无法形成过渡或动画效果。

```css
.box {
  max-height: 0;
  overflow: hidden;
  transition: max-height 1s;
}

.box:active {
  max-height: 666px;
}
```



保持宽高比：例如4/3

```html
<article class="card">
  <div class="card__thumb">
    <img src="thumb.jpg" alt="" />
  </div>
  <div class="card__content">
    <h3>Muffins Recipe</h3>
    <p>Servings: 3</p>
  </div>
</article>


/* 通过 padding 实现 */
.card__thumb {
  position: relative;
  padding-top: 75%;
}

/* 使用 aspect-ratio 属性 */
.card__thumb {
  position: relative;
  aspect-ratio: 4/3;
}

.card__thumb img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```





## 字体样式

* font : 字体简写，可以同时设置font-style、font-variant、font-weight、font-size/line-height、font-family属性。其中font-size和font-family是必须的。
* font-family : 字体，字体顺序应该是英文在前，中文在后。
* font-size : 字体大小，默认大小为 16px（16px = 1em）。
  * px / em / rem / 百分比 / smaller(小一号) / larger(大一号)
  * 可以使用这个公式从像素到 em 来计算大小：
    * pixels/16=em。font-size: 2.5em; /* 40px/16=2.5em */
  * vw : 响应式字体大小，视口宽度（"viewport width"）。文本大小将遵循浏览器窗口的大小。
    * 视口（Viewport）是浏览器窗口的大小。 1vw = 视口宽度的 1％。如果视口为 50 厘米宽，则 1vw 为 0.5 厘米。
* font-weight : 字体粗细
  * bold(粗体) / normal(正常) / bolder / lighter / 100-500 / 600-900
* font-style : 字体样式
  * normal(正常直立) / italic(斜体，推荐) / oblique(斜体)
  * `<em>`标签和`<i>`标签也可以将文字倾斜
* color : 文字颜色
  * 百分比rgb(10%,10%,10%) / 数字rgb(0,0,255) / 十六进制#FF0000 / 颜色名green / 具有alpha 通道的RGB rgba()
* font-variant : 指定是否以 small-caps 字体（小型大写字母）显示文本。
  * normal / small-caps
  * 在 small-caps 字体中，所有小写字母都将转换为大写字母。但是，转换后的大写字母的字体大小小于文本中原始大写字母的字体大小。

```html
<style>
  body {
    font-family: "Arial","黑体","宋体";
    font-size: 16px;
    font-weight: bold;
    font-style: italic;
    color: rgb(0,231,66);
  }
  p.small {
    font-variant: small-caps;
  }
  h1{ font-size: 10vw;}
  p{ font: italic small-caps bold 12px/30px serif, "宋体";}
</style>
```

```css
{
  font-family: 
    system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,
    Helvetica,Arial,
    sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
}
```

1. system-ui，使用各个支持平台上的默认系统字体
2. -apple-system， 在一些稍低版本 Mac OS X 和 iOS 上，它针对旧版上的 Neue Helvetica 和 Lucida Grande 字体，升级使用更为合适的 San Francisco Fonts
3. BlinkMacSystemFont，针对一些 Mac OS X 上的 Chrome 浏览器，使用系统默认字体
4. segoe ui，在 Windows 及 Windows Phone 上选取系统默认字体
5. Roboto，面向 Android 和一些新版的的 Chrome OS
6. Helvetica,Arial，在针对不同操作系统不同平台设定采用默认系统字体后，针对一些低版本浏览器的降级方案
7. sans-serif，兜底方案，保证字体风格统一，至少也得是无衬线字体

上述 5 个字体族定义，优先级由高到底，可以看到，它们 5 个都并非某个特定字体，基本的核心思想都是选择对应平台上的默认系统字体。





## 文本样式

* text-align : 水平对齐方式
  * center(居中) / left(左对齐) / right(右对齐) / start / end / justify(两端对齐)
* text-decoration : 文本的修饰线，多个修饰线可以同时使用，还可以设置修饰线类型和颜色
  * none(无) / underline(下划线) / overline(顶划线) / line-through(删除线)
    * 修饰线类型: solid(实线) / dashed(虚线) / dotted(点线) / double(双线) / wavy(波浪线)
    * color: 修饰线颜色
* text-shadow : 文本阴影效果
  * 只指定水平阴影和垂直阴影 `text-shadow: 2px 2px;`
  * 可选，给阴影添加颜色 `text-shadow: 2px 2px red;`
  * 可选，给阴影添加5px模糊效果 `text-shadow: 2px 2px 5px red;`
* text-transform : 文本转换，用于处理英文字母的大小写
  * none / capitalize(首字母大写,空格分隔有效) / uppercase(全部大写) / lowercase(全部小写)
* text-indent : 文本首行缩进，可以用一个超出屏幕宽度的超大值(负数也行)来隐藏文字
  * em(推荐) / px(推荐) / rem / 百分比% / cm / ...
* text-overflow : 文字溢出，指定应如何向用户示意未显示的溢出内容。
  * clip(默认，修剪文本) / ellipsis(显示省略符号来代表被修剪的文本)
* text-justify ：用于设置文本的对齐方式，当 `text-align` 属性的值设置为 `justify` 时生效。可以控制文本在行内的分布方式，以填充行内的空白空间，从而实现文本的自动调整和对齐。浏览器暂未适配。
  * auto：默认值，由浏览器根据当前文本内容和容器宽度自动选择适合的对齐方式。
  * none：取消文本的对齐方式，文本将保持左对齐或右对齐，取决于 text-align 属性的值。
  * inter-word：使文本在单词之间进行自动调整，填充行内的空白空间。
  * inter-character：使文本在字符之间进行自动调整，填充行内的空白空间。
* text-stroke : 向文本添加轮廓效果。
  * `text-stroke: 2px crimson;`  第一部分是文字描边的宽度，第二部分是文字描边的颜色。
* text-emphasis : 将强调标记应用于文本元素。可以指定包括表情符号在内的任何字符串作为强调标记。
  * `text-emphasis: "⭐️";`
* word-wrap : 当一个单词比容器还长时，允许长单词被打断并换到下一行。
  * normal(默认，正常显示) / break-word(在长单词或 URL 地址内部进行换行。)
* word-break : 指定换行规则。
  * normal(默认，正常) / keep-all(允许在单词内换行) / break-all(只能在半角空格或连字符处换行)
* writing-mode : 规定文本行是水平放置还是垂直放置。**IE12起支持。**
  * `horizontal-tb`：水平方向自上而下的书写方式。即 left-right-top-bottom
  * `vertical-rl`：垂直方向自右而左的书写方式。即 top-bottom-right-left
  * `vertical-lr`：垂直方向内内容从上到下，水平方向从左到右
  * `sideways-rl`：内容垂直方向从上到下排列
  * `sideways-lr`：内容垂直方向从下到上排列
* line-height : 行间距/行高
* letter-spacing : 字符间距
* word-spacing : 文本中单词之间的间距
* white-space : 指定元素内部空白的处理方式。
  * normal(默认，自动换行) / pre(按原格式，可能会超出界限) / pre-wrap(按原格式，并且不够一行时自动换号)/ nowrap(禁用换行，强制在同一行显示)
* vertical-align : 垂直对齐方式。只能作用在 display 计算值为 `inline、inline-block、inline-table、inline-cell` 元素上。
  * top / middle / bottom / sub / super / baseline / text-top / text-bottom
* direction : 文本方向
  * ltr(默认，左向右) / rtl(右向左)
* unicode-bidi : 配合direction使用，更改元素的文本方向：
  * bidi-override(反转文本) / ...
* text-align-last : 规定如何对齐文本的最后一行。
  * auto / center / left / right
* user-select ：控制用户是否能够选择文本
  * auto默认值，表示用户可以选择文本 / none  禁止用户选择文本 / text 只允许用户选择文本 / all 允许用户选择元素内的所有内容，包括文本、背景和边框。



```html
<style>
  body {
    text-align: center;
    text-indent: 2em;
    line-height: 30px;
    letter-spacing: 10px;
    word-spacing: 5px;
    /* text-decoration: underline; */
    text-decoration: underline overline wavy red;
    text-transform: capitalize;
    white-space: nowrap;
    word-wrap: break-word;
  }
  .ex1 {
    direction: rtl;
    unicode-bidi:bidi-override;
  }
  h1 {
    text-shadow: 2px 2px 5px red;
  }
</style>
```

```html
<style>
  div{
    width: 200px;
    border: 1px solid green;
    white-space: nowrap;
    overflow: hidden;
  }
  .clip{ text-overflow: clip;}
  .ellipsis{ text-overflow: ellipsis;}
</style>

<body>
  <div class="clip">好的哈岁的几乎达到打孔大宋大苏打撒旦阿达大苏打阿萨的</div><br>
  <div class="ellipsis">好的哈岁的几乎达到打孔大宋大苏打撒旦阿达大苏打阿萨的</div>
</body>
```



## 列表样式

* list-style : 列表样式简写，属性值顺序为type->position->image
* list-style-type : 列表项目符号
  * none(不使用项目符号) / disc(实心圆) / circle(空心圆) / square(实心方块)
  * 更多...
* list-style-image : 列表项目符号设置为图片
* list-style-position : 列表项目符号位置
  * outside(默认，外面) / inside(里面)

```html
<style>
  ul{
    list-style: none inside url("right.png");
    list-style-type: lower-roman;
    list-style-image: url("right.png");
    list-style-position: outside;
  }
</style>
```



## 表格样式

* border : 边框
* border-collapse : 设置表格的边框是否被合并为一个单一的边框
  * separate(默认，边框会被分开) / collapse(边框会合并为一个单一的边框)
* border-bottom : 下边框，实现水平线
* border-spacing : 规定相邻单元格之间的边框的距离。只有在`border-collapse: separate;`时有效。
  * 在指定的两个长度值中，第一个是水平间距，第二个是垂直间距。如果只定义一个参数，那么表示水平边距和垂直边距。
* empty-cells : 规定是否在表格中的空白单元格上显示边框和背景。只有在`border-collapse: separate;`时有效。
  * show(默认，在空单元格周围绘制边框) / hide(不在空单元格周围绘制边框)
* caption-side : 表格标题位置
  * top(默认，上面) / bottom(底下)
* table-layout : 设置用于表格的布局算法。
  * auto(默认。列宽度由单元格内容设定) / fixed(列宽由表格宽度和列宽度设定)

```html
<style>
  table {
    width: 50%;
    border-collapse: collapse;
  }
  th, td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
  }
  tr:nth-child(even) { background-color: #f2f2f2;}
  th {
    background-color: #4CAF50;
    color: white;
  }
  caption { caption-side: bottom;}
</style>
```







## 布局样式

* display : 将元素设置为块级元素或内联元素
  * block(块级元素) / inline(行内元素) / none(隐藏对象，不保留物理空间) / inline-block(行内块元素，可以设置宽高且不独占一行) / flex(弹性盒)
  * 更多...
* visibility : 规定元素是否可见。
  * visible(默认，可见) / hidden(不可见) / collapse(当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。)
* float : 浮动方式
  * none(默认不浮动) / left(左浮动) / right(右浮动)
* clear : 清除浮动
  * none(默认允许两边都可以有浮动对象)
  * both(左右两边不允许有浮动对象)
  * left(不允许左边有浮动对象)
  * right(不允许右边有浮动对象)
* position : 定位方式。可以通过top、bottom、left 和 right 属性设置元素的位置。
  * static : 静态定位。元素不受 top、bottom、left 和 right 属性的影响。
  * relative : 相对定位，对象不从文档流中分离，并设置四个方向的偏移值相对于自身进行相对定位。
    * left / right / top / bottom
  * absolute : 绝对定位，将对象从文档流中分离出来，并设置四个方向的偏移值来进行绝对定位。
    * left / right / top / bottom
  * fixed : 相对于视口定位的，这意味着即使滚动页面，它也始终位于同一位置。
  * sticky : 粘性定位。粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。起先它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其"粘贴"在适当的位置。
  * 粘性布局 sticky 不起作用大概率只有两个原因：
    * 某个父级存在 overflow 不等于 visible 的情况
    * 其父元素也完全滚出屏幕了
* left : 设置定位框的左侧外边距边缘。
* right : 设置定位框的右侧外边距边缘。
* top : 设置定位框的顶部外边距边缘。
* bottom : 设置定位框的底部外边距边缘。
* z-index : 指定元素的堆栈顺序。
  * 在对元素进行定位时，它们可以与其他元素重叠。通过该属性可以设置元素显示的顺序。
  * 元素可以设置正或负的堆叠顺序，值越大优先级越高。
  * 如果两个定位的元素重叠而未指定 `z-index`，则位于 HTML 代码中最后的元素将显示在顶部。
* isolation ：允许创建一个新的层叠上下文，而无需设置 z-index。这就可以保证某些高优先级元素（例如模态框、下拉菜单、tooltip）将始终显示在应用中的其他元素之上。`isolation: isolate;`
* clip : 剪裁绝对定位元素。
  * 定义一个剪裁矩形。对于一个绝对定义元素，在这个矩形内的内容才可见。超出部分按overflow处理。
  * 唯一合法的形状值是：rect (*top*, *right*, *bottom*, *left*) / auto(默认，不应用任何剪裁)
* overflow : 溢出，设置当对象的内容超过其指定高度及宽度时如何管理内容。一般会给父元素添加该属性。
  * visible : 默认值，不剪切内容也不添加滚动条
  * auto : 看内容来显示上下或左右滚动条
  * hidden : 不显示超过对象尺寸的内容
  * scroll : 总是显示滚动条
* overflow-x : 指定如何处理溢出内容的左/右边缘。
* overflow-y : 指定如何处理溢出内容的上/下边缘。
* box-sizing : 盒子尺寸
  * border-box(包含边框和内边距在内) / content-box(默认，不包含边框和内边距)
  * 设置了border-box后，如果内部空间不够，会向外扩展(例如设置的内边距大于总大小)
* column-count ：将一个元素的内容分成指定数量的列。



```html
<!-- display属性示例 -->
<style>
  p{ display: inline;}
  a{
    width: 300px;
    display: block;
  }  
</style>
```

```html
<!-- float属性和clear属性示例 -->
<style>
  div{
    width: 100px;
    height: 100px;
  }
  #diva{
    background-color: red;
    float: right
  }
  #divb{
    background-color: green;
    clear: both;
  }
  #divc{
    background-color: blue;
    float: right;
  }
</style>

<body>
  <div id="diva">1</div>
  <div id="divb">2</div>
  <div id="divc">3</div>
</body>
```

```html
<!-- box-sizing属性示例 -->
<style>
  div{
    width: 200px;
    height: 100px;
    border: black solid 1px;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
```

```html
<!-- sticky粘性定位属性示例 -->
<style>
  div.sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    background-color: green;
    border: 2px solid #4CAF50;
  }
</style>
```

```html
<!-- z-index属性和clip属性示例 -->
<style>
  img {
    position:absolute;
    top: 0;
    left: 0;
    z-index: -1;
    clip: rect(0, 100px, 200px, 0);
  }
</style>

<body>
  <h1>这是标题</h1>
  <img src="pic.png" alt="">
  <p>这是段落</p>
</body>
```



## 平滑滚动

可以用于页面锚点之间的滚动或者返回顶部等功能。

```css
html {
  scroll-behavior: smooth;
}
```





## 光标样式

* cursor : 指定要显示的光标类型
  * auto (默认，浏览器设置的光标)
  * default (默认光标，通常是个箭头)
  * pointer (一只手)
  * help (指示可用的帮助，通常是个问号)
  * wait (在忙，通常是个圈圈)
  * text (指示文本)
  * move (可移动指示)
  * crosshair (十字线)
  * ...
  * not-allowed(禁停标志)
  * 自定义光标：`cursor: url("path-to-image.png"), auto;` 只需要指定自定义光标的图片路径即可

详见：https://www.w3school.com.cn/cssref/pr_class_cursor.asp



## 裁剪

可以使用 `clip-path` 属性来创建各种有趣的视觉效果，例如将元素剪裁成自定义形状，如三角形或六边形。

```css
.clip {
  height: 150px;
  width: 150px;
  background-color: crimson;
  /* 三角形 */
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  /* 六边形 */
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}
```

https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path



## 进阶功能

* pointer-events ：控制元素对指针事件的反应，也就是能不能响应鼠标事件等。还可以用于控制某层才可以响应事件
  * auto ：元素按照默认方式响应指针事件。
  * none ：元素不响应指针事件，事件将向下传递到下一层元素。
  * visiblePainted ：元素响应指针事件，但只有在元素的背景颜色或图片已经被绘制时才会响应。
  * visibleFill ：元素响应指针事件，但只有在元素的填充区域内部时才会响应，对于描边无效。
  * visibleStroke ：元素响应指针事件，但只有在元素的描边区域内部时才会响应，对于填充无效。
  * visible ：元素响应指针事件，只要它可见且鼠标事件发生在元素的边框框线上或内部。
* accent-color ：更改输入的默认颜色。可以应用于很多元素，例如按钮、链接、输入框、选择框等等
* caret-color ：更改 `input` 或 `textarea` 元素的文本光标颜色
* image-rendering ：控制缩放图像的渲染方式并优化质量。不过，该属性不会影响未经缩放的图像。
  * auto ：浏览器默认的图像渲染方式。
  * crisp-edges ：通过强调图像边缘来实现清晰的渲染效果，适用于像素风格的图像。
  * pixelated ：通过像素化的方式来渲染图像，适用于放大图像时保持像素风格的效果。
* mix-blend-mode ：用于控制元素内容与其背景之间的混合模式。
  * normal：默认值，没有混合效果。
  * multiply：将元素的颜色与背景进行相乘。
  * screen：将元素的颜色与背景进行屏幕模式混合。
  * overlay：根据元素和背景的亮度进行混合。
  * darken：选择较暗的颜色作为最终混合结果。
  * lighten：选择较亮的颜色作为最终混合结果。
  * color-dodge：通过减少对比度来混合颜色。
  * color-burn：通过增加对比度来混合颜色。
  * difference：计算颜色之间的差异。
  * exclusion：排除两种颜色的共同部分。
  * hue：保留元素的色调，应用背景的饱和度和亮度。
  * saturation：保留元素的饱和度，应用背景的色调和亮度。
  * color：保留元素的色调和饱和度，应用背景的亮度。
  * luminosity：保留元素的亮度，应用背景的色调和饱和度。





## 单位

![](http://qiniu.huangyihui.cn/202506120143489.png)



### 相对单位

* em : 根据当前元素的最近的已设置字体大小的父级盒子的字体大小
  * **如果自身元素是没有设置字体大小的，那么就会根据其父元素的字体大小作为参照去计算，如果元素本身已经设置了字体，那么就会基于自身的字体大小进行计算**。
  * em会影响嵌套
* rem : 推荐，根据根元素`<html>`的字体大小
  * 单位以rem计算的属性，不管是line-height/padding/height等，都还是以根元素的字体大小来变化。
  * 如果浏览器设置了最小字号，如果rem后的值小于最小字号，则会以浏览器设置的最小字号为准
  * 开发中，可以给`<html>的font-size`设置为62.5%，便于rem换算(16px*62.5%=10px)
* 百分比% : 百分比。相对于父元素
* vw : 相对于视口宽度的 1%，IE11支持
* vh : 相对于视口高度的 1%，IE11支持
  * 使用100vh时出现滚动条，是因为body中的某个块元素中添加了margin(包括浏览器自带样式)，从而产生`塌陷现象`，这时可以给body添加 `overflow:hidden;` ，但这样会隐藏超出视口部分内容
  * 全屏下相比 100%，100vw 更容易产生滚动条
* vmin : 相对于视口较小尺寸的 1％
* vmax : 相对于视口较大尺寸的 1％
* smaller(小一号) / larger(大一号)

**视口（Viewport）= 浏览器窗口的尺寸。如果视口为 50 厘米宽，则 1vw = 0.5 厘米。**



### 绝对单位

* px : 像素
* pt : 磅。常用于软件设计和排版印刷行业
* pc : 点
* in : 英寸
* cm : 厘米
* mm : 毫米
* xx-small / x-small / small / medium(中等的) / large / x-large / xx-large。
* 换算关系 `1in = 25.4mm = 2.54cm = 6pc = 72pt =96px`



### 时间单位

时间单位主要用于**过度和动画**中，用于定义持续时间或延迟时间。

* s：秒
* ms：毫秒 `1s = 1000ms`

```css
a[href] {
 transition-duration: 2.5s;
}

a[href] {
 transition-duration: 2500s;
}
```



### 角度单位

* deg：全称为 Degress，表示度，一个圆总共360度。
* grad：全称为 Gradians，表示梯度，一个圆总共400梯度。
* rad：全称为 Radians，表示弧度，一个圆总共2π弧度。
* turn：全称为 Turns，表示圈（转），一个圆总共一圈（转）。

```css
transform: rotate(2deg);
transform: rotate(2grad);
transform: rotate(2rad);
transform:rotate(.5turn);
```



一般这些角度单位用于元素的**旋转操作，**包括2D旋转、3D旋转等。

- 当旋转值为正值时，元素会顺时针旋转；
- 当旋转值为负值时，元素会逆时针旋转。

除了旋转会使用角度之外，线性渐变也会经常使用角度值：



###  分辨率单位

CSS中的分辨率单位有三个：dpi、dpcm、dppx。他们都是正值，不允许为负值。主要用于**媒体查询**等操作。

* dpi：全称为 dots per inch，表示每英寸包含的点的数量。普通屏幕通常包含 72或96个点，大于 192dpi 的屏幕被称为高分屏。
* dpcm：全称为 dots per centimeter，表示每厘米包含的点的数量。
* dppx：dppx 全称为 dots per pixel，表示每像素（px）包含点的数量。由于CSS px的固定比率为1:96，因此1dppx相当于96dpi。它对应于由图像分辨率定义的CSS中显示的图像的默认分辨率。

```
1dppx = 96dpi
1dpi ≈ 0.39dpcm
1dpcm ≈ 2.54dpi

@media screen and (min-resolution: 96dpi) { ... }
@media print and (min-resolution: 300dpi) { ... }
@media screen and (min-resolution: 2dppx) { ... }
```



### 频率单位

通常情况下，频率单位使用在听或说级联样式表中。频率可以被用来改变一个语音阅读文本的音调。低频率就是低音，高频率就是高音。

* Hz：赫兹
* kHz：千赫兹 `1kHz = 1000Hz`

```css
.low { 
  pitch: 105Hz; 
} 

.squeal { 
  pitch: 135Hz; 
}
```

需要注意，当数值为0时，单位对值没有影响，但是单位是不能省略的。也就是说0、0Hz、0kHz是不一样的。所以，在使用频率单位时，不要直接写0。另外，这两个单位是不区分大小写的。







## 属性的缩写法

同一个属性下，可以不写属性名，而是直接写属性值，多个值之间用空格隔开。

```html
<style>
  body {
    font: 20px bold;
  }
</style>
```



## 块级元素和行内元素

行内元素: `<a>` 、`<span>` 、`<img>` ...

* 能和其他内联元素位于一行显示，只能容纳文本或其他行内元素
* 设置宽高无效，如果需要让行内元素宽高起作用，需要将行内元素设置为块级元素。
* 对 margin 仅设置左右方向有效，上下无效。padding 上下左右都有效
* 不会自动换行



块级元素: `div` 、`<p>` 、`<h1>-<h6>` 、`<ul>` 、`<header>` ...

* 独占一行，可以容纳行内元素和其他块级元素
* 设置宽高有效，设置margin和padding的上下左右都有效





## 精灵图Sprites

作用：主要是为了减少http请求。

核心思想：就是将多张图片，合成为一张，然后通过背景属性中的`position`定位来控制要显示图片的哪部分。

例子：当鼠标经过时，将背景向下或向上移动响应的像素，形成切换图片的效果。

```html
<style>
  a{
    width: 103px;
    height: 32px;
    display: block;
    background-image: url("download.png");
  }
  a:hover{
    background-position: 0 -32px;
  }
</style>
```



## calc()计算属性

CSS变量具有计算性，所以可以使用`calc()`来动态计算出最终的属性值。

```css
div {
	width: calc(200+100px);
	height: calc(var(--myheight + 100px));
}
```



## attr()

通过 `attr()` 可以获取到绑定在元素上的属性的值。目前支持的仅有伪元素的 `content` 属性。

注意：里面的属性值名称不要加引号，否则无效。

```html
<div class="attr" data-str="world"></div>
<div class="attr" str="hello"></div>
<img src="1.jpg" alt="cat" />

<style>
.attr::after {
  content: attr(data-str);
}

.attr::before {
  content: attr(str);
}
  
img::after {
  content: attr(alt);
}
</style>
```



## env()

env() 函数以类似于 var() 函数的方式将 user-agent 定义的环境变量值插入你的 CSS 中。区别在于，环境变量除了由 user-agent 定义而不是由用户定义外，还被全局作用在文档中，而自定义属性则限定在声明它们的元素中。

该函数的使用前提是，网页设置 `viewport-fit=cover` 的时候才生效。

```html
<meta name="viewport" content="viewport-fit=cover" />
```

在IOS11.2系统以前，可以使用 constant() 函数，但是在IOS11.2系统以后，这个函数就被废弃了，被 env() 函数替代了。



ios 安全区域：

* safe-area-inset-bottom ：底部安全区高度
* safe-area-inset-top ：顶部安全区高度
* safe-area-inset-right ：右侧安全区高度
* safe-area-inset-left ：左侧安全区高度

```css
.box {
	height: env(safe-area-inset-bottom);
}

/* not 表示不支持括号内的属性 */
@supports not(env(safe-area-inset-bottom)){
  .box{
    height: 100px;
	}
}
```





## 隐藏元素方式

* `"display: none;"` : 隐藏的元素会让出自己的位置，让底下的元素顶上去。
  * 可替换元素不会被浏览器阻止加载
  * 除非使用 position:absolute 将元素移出文档流，或者采用contain属性，否则它的隐藏过程无法设置动画，并将触发页面重新布局。
* `"visibility: hidden;"` : 元素自己会隐藏，但不会让出自己的位置。
* 通过标签的全局属性`"hidden"`隐藏。
* opacity 和 filter: opacity() ：会占据位置
* color alpha 透明度 ：可以将元素的color、background-color 和 border-color 等属性设置为rgba(0,0,0,0)，这样就会使元素完全透明
* transform ：可以使用 scale(0) 或者 translate(-9999px, 0px)  属性值来将元素隐藏
*  clip-path ：clip-path 属性可以创建一个剪辑区域，用于确定元素的哪些部分是可见的。使用 `clip-path: circle(0)` 可以将元素进行隐藏。
* z-index ：可以通过将元素的 z-index 属性设置为负值，以实现元素的隐藏。
* position ：position属性允许使用top、bottom、left、right 从页面中的默认位置移动元素。因此，绝对定位的元素可以通过左键：-9999px 等值移出屏幕。
* 缩小尺寸 ：可以通过使用width、height、padding、border-width 或 font-size 来缩小元素的尺寸以实现元素的隐藏。可能还需要应用 overflow: hidden; 来确保内容不会溢出。



注意：透明的元素仍占据位置的话，它依然能触发事件。

```html
<style>
  img{
    /* 二选一 */
    display: none;
    visibility: visible;
  }
</style>

<body>
  <img src="Sport W205.png" alt="">
  <p>Hello</p>
</body>
```





## 不常用属性

* opacity : 不透明度。为元素的背景添加透明度时，其所有子元素都继承相同的透明度。
  * 值为0~1的小数或百分比。介于 0.0（完全透明）和 1.0（完全不透明）之间的数字。
  * 推荐用rgba()替代。
* unicode-bidi : 配合direction使用，更改元素的文本方向：
  * bidi-override(反转文本) / ...
* resize : 元素是否可以（以及如何）被用户调整大小，`IE不支持`
  * none(禁用调整大小) / horizontal(水平调整) / vertical(垂直调整) / both(任意调整)
* filter : 滤镜。定义元素（通常是 `<img>`）的视觉效果（如模糊和饱和度）。
  * grayscale(100%) : 把所有图像的颜色更改为黑白（100％ 灰色）
  * 详见：https://www.w3school.com.cn/cssref/pr_filter.asp



```html
<style>
  div {
    background-color: green;
    opacity: 0.3;
  }
  p {
    direction: rtl;
    unicode-bidi: bidi-override;
  }
  textarea { resize: none;}
</style>
```





## 修改原生样式

### input

```html
<style>
  /* 占位符的样式 */
  input::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: red;
  }
  input::-moz-placeholder {
    /* Firefox 19+ */
    color: red;
  }
  input:-ms-input-placeholder {
    /* IE 10+ */
    color: red;
  }
  input:-moz-placeholder {
    /* Firefox 18- */
    color: red;
  }
  
  
  /* 聚焦时的样式 */
  input:focus {   
    background-color: red;
  }
  
  
  /* 取消边框 */
  input {
    border: none;
    outline: none;
  }
</style>

<input type="text" placeholder="请设置用户名" />
```



### select

```css
select {
  width: 360px;
  height: 65px;
  font-size: 26px;
  color: #666;
  
  /*去掉边框*/
  border: 0;
  /*去掉点击时的外发光*/
  outline: none;
  /*以下三行是去掉select自带的小箭头*/
  appearance: none;
}
```







## 盒模型

盒模型由 `content + padding + border + margin` 组成。

* 标准盒模型：width = content
* IE 怪异盒模型：width = content + padding + border



可以通过 `box-sizing` 属性改变盒模型宽高的计量方式。

`outline` 和 `box-shadow` 不属于盒模型的一部分，不占空间。





## BFC、IFC

### BFC

BFC - Block format context（块级格式化上下文）



具有BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不受外部元素影响。

**BFC特性：**

1. BFC内部的BOX会垂直方向，一个一个放置。
2. box处置方向之间距离，由margin决定，属于同一个BFC内的连个相邻BOX的margin会重叠。如：第一个容器设置下外边距为100px , 第一个容器下面的第二个容器设置上外边距为200px。当出现这种情况时，2个容器之间距离只有200px.
3. BFC的区域不会与float box发生重叠。如 ：自适应两栏布局
4. 计算BFC的高度时，浮动元素也参与计算。如：浮动造成的高度塌陷
5. BFC就是页面上的一个独立容器，容器里面的元素不会影响到外面的元素
6. 每个元素的margin box的左边会与包含块border box的左边相接触（对于从左到右的格式化，否则相反），即使存在浮动也会如此。

**触发BFC条件：**

1. `display`属性值为`inline-block`、`table-cell`、`flex`
2. `float`属性不为`none`
3. `position`属性值为`absolute`、`fixed`
4. `overflow`属性值不为`visible`

**常见的利用BFC解决问题：**

1. `margin`塌陷
2. 自适应布局（float+overflow）
3. 清除浮动



### IFC

IFC - inline format context （内联格式化上下文）



**IFC特性：**

1. 水平方向根据`direction`依次布局。
2. 不会在元素前后换行。
3. 受`white-space`属性的影响。
4. `margin/padding` 在竖直方向无效，水平方向有效的。
5. `white/height` 对非替换行内元素无效，宽度由元素内容决定。（替换元素在下面解释）
6. 非替换行内元素的行框高由`line-height`决定而替换行内元素的行框高则是由`height`，`padding`，`border`，`margin`决定
7. 浮动或者绝对定位会转化为block
8. `vertical-align`属性生效

**触发条件：**

1. `display`为`inline`或者行内元素





## CSS 方法论

CSS 方法论是一种面向 CSS、由个人和组织设计、已被诸多项目检验且公认有效的最佳实践。**这些方法论都会涉及结构化的命名约定**，并且在组织 CSS 时可提供相应的指南，从而提升代码的性能、可读性以及可维护性。

目前使用最多的五种分别为：BEM、ACSS、OOCSS、SMACSS、ITCSS。



### BEM

BEM 全称为 Block Element Modifier，分别表示块（Block）、元素（Element）、修饰符（Modifier），它是由 Yandex 团队提出的一种 CSS 命名方法。这种命名方法让 CSS 便于统一团队开发规范和方便维护。该方法论由以下三部分组成：

- **Block：** 尽量以元素的性质来命名对象，例如：`.list`、`.card`、`.navbar`；
- **Element：** 使用 `__` 两个下划线来连接 Block 对象，例如：`.list__item`、`.card__img`、`.navbar__brand`；
- **Modifier：** 使用 `--` 两个连字符连接 Block 或 Element 对象，例如：`.list__item--active`、`.card__img--rounded`、`.navbar--dark`。



在 BEM 中并没有那些抽象的规则，它是基于功能为导向（Function-Oriented Programming, FOP）而设计的，不存在像是 `.pl-3` 这种难以理解的 `class` 名称，为了保证 BEM 能够合理的将元素模块化，需要遵守以下规则：

- 不能使用 `class` 以外的选择器来编写样式；
- 不要过度模块化，应该适当控制元素的模组化深度。



**(1) Block 块**

所谓的 Block 就是指应用中可独立存在的元素，需要遵守以下规范：

- Block 名称需要清楚的表达其用途、功能、意义，且具有唯一性；
- Block 可以放在页面上的任何位置，也可以相互嵌套；
- 单词之间可以使用驼峰形式或者使用 `-` 将其分隔。



**(2) Element 元素**

如果把块描述为一个元素，那就可以将 Element 描述为此元素的子元素。参考以下规则：

- Element 名称需要清楚的表达元素的用途及意义；
- Element 和 Element 之间可以相互嵌套；
- Element 与Block 之间使用 `__` 两个下划线连接；
- 单词之间可以使用驼峰式或者使用 `-` 将其分隔。



**(3) Modifier 修饰符**

Modifier 主要用来表示 Block 或 Element 的行为及样式。参考以下规范：

- Modifier 名称需要清楚的表达元素样式、状态或行为；
- Modifier 与 Block 或 Element 之间使用 `--` 两个连字符连接；
- 单词之间可以使用驼峰式或者使用 - 将其分隔。



```css
.list { /* ... */ }
.list__item { /* ... */ }
.list__item--active { /* ... */ }
```



### ACSS

ACSS 的全称为 Atomic CSS，意为原子CSS。它专注于创建很多小型的 CSS 样式类，以便在 HTML 上使用。这种方法旨在提供高度精细和可重用的样式，而不是为每个组件提供规则。这可以减少特异性（优先级）冲突并以可预测的方式使样式更具可变性。这种方法有助于减少代码冗余和覆盖 CSS 样式的混淆。

```css
.mb-sm { margin-bottom: 16px; }
.mb-lg { margin-bottom: 32px; }
.color-blue { color: #1e90ff; }
```



### OOCSS

OOCSS 是 Object Oriented CSS 的缩写，意为面向对象的CSS。它是所有 CSS 方法论中最早提出的一个，由 Nicole Sullivan 提出。可以把它理解为将 **CSS 模块化**。

OOCSS 提倡样式可重用性，在编写 CSS 样式时需要遵循以下规则：

- 应尽量避免使用后代选择器(`.navbar ul`) 或 id 选择器(`#list`)；
- 应尽量避免样式依赖于结构，尝试使用 `class` 替代标签选择器。



OOCSS 有两个主要原则：**结构与样式分离**和**容器与内容分离**。



**(1) 结构与样式分离**

在 OOCSS 的概念中，表现型的 `style` 就属于样式，封装型的 `style` 就属于结构，如下所示：

- 样式(skin)：`color`、`background-color`、`border-color`；
- 结构(structure)：`display`、`box-sizing`、`padding`。



```html
<style>
.btn {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  color: black;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.btn-primary {
  color: #fff;
  background-color: blue;
  border: 1px solid blue;
}
</style>

<button class="btn btn-primary"> Primary </button>
```

这样就可以很明确的知道这个元素的结构与样式，以后如果想要增加不同主题的按钮，就只需要编写像`.btn-success`、`.btn-danger`这样的样式类即可，而无需再编写按钮的结构。

如果以 OOCSS 中的 OO (Object Oriented) 来描述的话，这里的结构(Structure)就是所指的元素。以上面例子来说，我们封装了 button 元素，以后如果要使用 button 的话，只需要编写 `.btn` 结构样式名称与对应的样式（skin)即可。



**(2) 容器与内容分离**

容器与内容分离旨在将两个不同的父子元素给分离出来，借此达到父子元素不相互依赖的目的。

```css
.card .btn { }

.card { }
.btn { }
```























































