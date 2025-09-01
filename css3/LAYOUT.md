# 布局

## 盒子模型

CSS布局主要是通过盒子模型来实现-->将网页内容放置在一些盒子中，对这个盒子的一些属性进行控制。

一个盒子是由以下几部分构成的：

* 盒子中的内容content
* 盒子的边框border
* 盒子的边框与内容之间的距离，称为填充--padding（内边距）
* 多个盒子存在，盒子和盒子之间的距离，称为边界--margin（外边距）

**整个盒模型在页面中所占的宽度由：左右外边距+左右边框+左右内边距+内容宽度组成**

**注意：如果增加了内边距，那么整个盒子的宽度要减去增加的内边距值。**





## 布局方式

* 默认文档流方式: 以默认的html元素的结构顺序显示
* 浮动布局方式: 通过设置html元素的float属性显示
* 定位布局方式: 通过设置html元素的position属性显示
* 弹性盒布局方式: 通过设置display:flex





## 浮动布局

浮动是将块元素的独占一行行为取消，允许别人与其一行。包括div在内的任何元素都可以以浮动的方式进行显示。

也就是将这个块从原来的文档流模式中分离出来，它后面的对象就当它不存在，从而顶上去。

如果想让多个块显示在同一行中，可以将这些块都设置为浮动，并且浮动方向相同。

* float : 浮动方式
  * none(默认不浮动) / left(左浮动) / right(右浮动)

```html
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
    float: left;
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

设置浮动后，原本在同一行的两个块，会因为浏览器窗口的大小而改变其原来的位置。

解决方法：将一行中的多个块放在一个父div中，并设置父div的宽高即可。如果没有指定高度，父div的高度不会自动增加。



## 清除浮动

当元素有浮动属性时，会对其父元素或后面的元素产生影响，会出现一个布局错乱现象，可以通过清除浮动的方法来解决。

就是可以去掉前面对象浮动对后面对象的影响。

设置为both后，会清除前面对象左右浮动对自己的影响，也就是不会跑上去。

* clear : 清除浮动
  * none(默认，允许两边都可以有浮动对象)
  * both(左右两边不允许有浮动对象)
  * left(不允许左边有浮动对象)
  * right(不允许右边有浮动对象)

```html
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



**通过伪元素 + clear 属性清除浮动**

```html
<div class="bg">
  <img class="img" src="" />
  <div class="clear"></div>
</div>

<style>
.bg {
  padding: 30px;
  background: red;
}

.img {
  width: 200px;
  height: 200px;
  float: left;
}

// 由于块级元素具有换行特性，因此理论上它都可以配合 clear 属性来清除浮动带来的影响 
.clear:after {
  content: '';
  display: block;	// 或者 table
  clear: both;
}
</style>
```





## 浮动布局的问题

当父元素没有指定高度时，并且它的子元素有浮动，这时这个父元素的高度不会自动增加，从而导致父元素后面的元素会顶上来。

这个时候可以通过以下任意方法来让父容器强制装下它们：

* 额外标签法：在容器的末尾增加一个空的div，并设置样式为`"clear:both"`，强迫容器适应它的高度以便装下所有float元素。
* 给父元素增加样式`"overflow:hidden/auto"`
  * 这个是最简单的清除浮动方法，但如果子元素使用了定位布局，就会很难实现。
* 利用伪对象after方法，控制浮动元素的影响。网上最流行的清除浮动代码。

```html
<!-- 额外标签法 -->
<style>
  .clear{
    clear: both;
  }
</style>

<body>
  <div id="main">
    <div id="diva">1</div>
    <div id="divb">2</div>
    <div class="clear"></div>
  </div>
</body>
```

```html
<!-- 给父元素增加样式"overflow:hidden" -->
<style>
  #main{
    width: 800px;
    margin: 0 auto;
    overflow: hidden;
  }
</style>

<body>
  <div id="main">
    <div id="diva">1</div>
    <div id="divb">2</div>
  </div>
</body>
```

```html
<!-- 利用伪对象after方法，控制浮动元素的影响 -->
<!-- 由于块级元素具有换行特性，因此理论上它都可以配合 clear 属性来清除浮动带来的影响 -->
<!-- 所以，这里 display 的值可以是 block、table 或者 list-item -->
<style>
  #main{
    width: 800px;
    margin: 0 auto;
  }
  .clearFix::after{
    clear:both;
    display:block;
    visibility:hidden;
    height:0;
    line-height:0;
    content:".";
  }
  .clearFix{ zoom:1; } /* 解决IE6/7兼容问题 */
  
  /* 或者 */
  .clearfix2::after {
    content: "";
    clear: both;
    display: table;
  }
</style>

<body>
  <div id="main" class="clearFix">
    <div id="diva">1</div>
    <div id="divb">2</div>
  </div>
</body>
```





## 定位布局

* position : 定位方式
  * absolute : 绝对定位，将对象从文档流中分离出来，并设置四个方向来进行绝对定位。
    * left / right / top / bottom
  * relative : 相对定位，对象不从文档流中分离，并设置四个方向相对于自身进行相对定位。发生位置变化后，元素当初自己的位置，是不会释放的。并且层级会变化。
    * left / right / top / bottom
  * static : 静态定位



使用绝对定位的两个条件：

1. 必须给父元素加定位属性，一般建议使用`"position:relative"`，如果不存在父对象，则依据body对象。
2. 给子元素加绝对定位属性时，同时要加方向属性。

绝对定位实质上也就是在屏幕上固定位置。不管你的父元素是谁，都一样定位在屏幕的绝对位置上。



相对定位和绝对定位区别：

绝对定位是父元素为基准点进行定位---会脱离文档流。

相对定位是根据其自身为基准点进行定位---离开原位置，但还占着原来的空间。



```html
<style>
  #main{
    position: relative;
    top: 100px;
  }
  #diva{
    width: 200px;
    height: 100px;
    background-color: red;
    position:absolute;
    top: 50px;
    left: 50px;
  }
</style>

<body>
  <div id="main">
    <div id="diva">1</div>
  </div>
</body>
```

```html
<style>
  .box1 {
    width: 100px;
    height: 100px;
    background: red;
    /* 原来的位置不会被释放 */
    position: relative;
    left: 120px;
    top: 50px;
  }

  .box2 {
    width: 100px;
    height: 100px;
    background: blue;
  }
</style>

<body>
  <div class="wrapper">
    <div class="box1"></div>
    <div class="box2"></div>
  </div>
</body>
```





## overflow溢出

设置当对象的内容超过其指定高度及宽度时如何管理内容。一般会给父元素添加该属性。

* overflow : 溢出
  * visible : 默认值，不剪切内容也不添加滚动条
  * auto : 看内容来显示上下或左右滚动条
  * hidden : 不显示超过对象尺寸的内容
  * scroll : 总是显示滚动条

```html
<style>
  #main{
    width: 400px;
    height: 100px;
    overflow:hidden ;
  }
</style>

<body>
  <div id="main">
    <!-- 图片尺寸：460 * 186 -->
    <img src="Sport W205.png" alt="">
  </div>
</body>
```



## 圣杯布局、双飞翼布局

**圣杯和双飞翼的区别：** 双飞翼给中间块套了一个容器，通过设置该容器内部的中间块`margin`属性从而使中间块两侧的内容不被左右块遮挡。



* 圣杯布局

```html
<style>
  body {
    min-width: 550px;
    font-weight: bold;
    font-size: 20px;
  }

  #header, #footer {
    background: rgba(29, 27, 27, 0.726);
    text-align: center;
    height: 60px;
    line-height: 60px;
  }
  #footer {
    clear: both;
  }

  #container {
    /* 使用padding留出两边的宽度 */
    padding-left: 200px;
    padding-right: 150px;
    overflow: hidden;
  }
    
  #container .column {
    /* 左右两边通过相对定位向两边移动 */
    position: relative;
    float: left;
    text-align: center;
    height: 300px;
    line-height: 300px;
  }

  #center {
    width: 100%;
    background: rgb(206, 201, 201);
  }

  #left {
    width: 200px;
    right: 200px;
    margin-left: -100%;
    background: rgba(95, 179, 235, 0.972);
  }
    
  #right {
    width: 150px;
    margin-left: -150px;
    right: -150px;
    background: rgb(231, 105, 2);
  }
</style>
  
<body>
  <div id="header">#header</div>
  <div id="container">
    <div id="center" class="column">#center</div>
    <div id="left" class="column">#left</div>
    <div id="right" class="column">#right</div>
  </div>
  <div id="footer">#footer</div>
</body>
```



* 双飞翼布局

```html
<style>
  header {
    height: 100px;
    background-color: pink;
  }
  .first,.second,.third {
    height: 100px;
    float: left;
  }
  /* 用这个div把主内容包起来之后,主内容就可使用margin空出两边的区域了 */
  .first {
    width: 100%;
    background-color: purple;
  }
  .content {
    margin: 0 100px;
  }
  .second {
    width: 100px;
    background-color: red;
    /* margin-left为负是子元素相对于父元素的最右侧位置 */
    margin-left: -100%;
  }
  .third {
    width: 100px;
    background-color: grey;
    margin-left: -100px;
  }
  .footer {
    height: 120px;
    background-color: pink;
    clear: both;
  }
</style>

<body>
  <header></header>
  <div class="first">
    <div class="content"></div>
  </div>
  <div class="second"></div>
  <div class="third"></div>
  <div class="footer"></div> 
</body>
```





## Flexbox 布局

弹性盒子布局，可以更轻松地设计灵活的响应式布局结构，而无需使用浮动或定位。

弹性布局中必须有一个 display 属性设置为 flex 的父元素。弹性容器的直接子元素会自动成为弹性项目。

```css
display: flex;
display: inline-flex;
```



### flex容器属性

* flex-direction : 定义容器要在哪个方向上堆叠 flex 项目。
  * row(默认从左到右) / row-reverse(从右到左) / column(从上到下) / column-reverse(从下到上)
* flex-wrap : 规定是否应该对 flex 项目换行。
  * nowrap(默认，不换行) / wrap(换行) / wrap-reverse(换行，第一行在下面)
* flex-flow : 用于同时设置 flex-direction 和 flex-wrap 属性的简写属性。
* justify-content : 用于水平对齐 flex 项目。
  * flex-start : 默认，在容器的开头对齐（左对齐/上对齐）
  * flex-end : 在容器的末端对齐（右对齐/下对齐）
  * center : 在容器的中心对齐
  * space-around : 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
  * space-between : 元素在主轴上两端对齐，元素之间间隔相等
  * 技巧：可以通过 `margin-*` 来置底/左右 实现元素在最下面/最左右边
* align-items : 用于垂直对齐 flex 项目。
  * stretch : 默认，拉伸 flex 项目以填充容器
  * flex-start : 将 flex 项目在容器顶部对齐
  * flex-end : 将 flex 项目在容器底部对齐
  * center : 将 flex 项目在容器中间对齐
  * baseline : 使 flex 项目基线对齐
* align-content : 用于对齐弹性线。该属性对单行弹性盒子模型无效。（即：带有 `flex-wrap: nowrap`）。
  * stretch : 默认，拉伸弹性线以占据剩余空间
  * space-between : 弹性线之间有相等的间距
  * space-around : 弹性线在其之前、之间和之后带有空格
  * center : 在容器中间显示弹性线
  * flex-start : 在容器开头显示弹性线
  * flex-end : 在容器末尾显示弹性线

```html
<style>
  .flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    flex-flow: row wrap;
    justify-content:space-around;
    align-items: baseline;
    align-content: flex-end;

    background-color:cornflowerblue;
    height: 600px;
  }
  .flex-container > div {
    background-color:lightgray;
    margin: 10px;
    padding: 20px;
    font-size: 30px;
    width: 80px;
    box-sizing: border-box;
    text-align: center;
  }
</style>

</head>
<body>
  <div class="flex-container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</body>
```

```html
<style>
  /* 完美的居中 */
  .flex-container {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
```





### 子元素(项目)

flex 容器的直接子元素会自动成为弹性（flex）项目。



用于弹性项目的属性有：

* order : 规定 flex 项目的顺序。值必须是数字，默认值是 0。数值越小，排列越靠前。
* flex-grow : 规定某个 flex 项目相对于其余 flex 项目将增长多少。该值必须是数字，默认值是 0。
* flex-shrink : 规定某个 flex 项目相对于其余 flex 项目将收缩多少。该值必须是数字，默认值是 0。
* flex-basis : 规定 flex 项目的初始长度。默认值是 auto。
* flex : 是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。
  * `flex: 0 0 200px;`  使弹性项目不可增长（0），不可收缩（0），且初始宽度为 200 像素：
  * `flex: 50%;`  表示占父容器的一半宽度。
  * `flex: 1;` 表示平均分宽度
* align-self : 允许单个项目有与其他项目不一样的对齐方式，将覆盖父元素`align-items`属性。
  * stretch : 默认，拉伸 flex 项目以填充容器
  * flex-start : 将 flex 项目在容器顶部对齐
  * flex-end : 将 flex 项目在容器底部对齐：
  * center : 将 flex 项目在容器中间对齐
  * baseline : 使 flex 项目基线对齐



```html
<!-- order 属性可以改变 flex 项目的顺序 -->
<div class="flex-container">
  <div style="order: 3">1</div>
  <div style="order: 2">2</div>
  <div style="order: 4">3</div> 
  <div style="order: 1">4</div>
</div>

<!-- 使第三个弹性项目的增长速度比其他弹性项目快八倍 -->
<div class="flex-container">
  <div style="flex-grow: 1">1</div>
  <div style="flex-grow: 1">2</div>
  <div style="flex-grow: 8">3</div> 
</div>

<!-- 不要让第三个弹性项目收缩得与其他弹性项目一样多： -->
<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div style="flex-shrink: 0">3</div>
  <div>4</div>
  <div>5</div>
</div>

<!-- flex-basis 属性规定 flex 项目的初始长度 -->
<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div style="flex-basis: 200px">3</div>
  <div>4</div>
</div>

<!-- 使第三个弹性项目不可增长（0），不可收缩（0），且初始长度为 200 像素 -->
<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div style="flex: 0 0 200px">3</div>
  <div>4</div>
</div>

<!-- align-self 属性规定弹性容器内所选项目的对齐方式 -->
<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div style="align-self: center">3</div>
  <div>4</div>
</div>
```





## Grid 布局

网格布局中必须有一个 display 属性设置为 grid的父元素。网格容器的直接子元素就是网格项。

```css
display: grid;
display: inline-grid;
```



### 属性

* grid-template-columns ：指定网格容器中所需的列数以及每列的宽度。该属性接受一个或多个非负 CSS 长度值，这些值的个数就是网格容器的列数，每个值表示每列（即每个网格轨道）的宽度。网格项超过列数会换行。
  * 使用方括号来指定每一条网格线的名字，方便引用。`grid-template-columns: [one] 40px [two] auto;` 
* grid-template-rows ：指定网格容器中每一行的高度。该属性接受一个或多个非负CSS 长度值，其中每个值表示网格容器中每一行的高度，从第一行到最后一行。没指定行的高度由其内容决定。
  * `grid-template-rows: [one] 40px [two] auto;` 
* grid-template-areas ：定义网格区域。该属性有以下三个属性值：
  * `grid-area-name`：使用`grid-area`属性设置的网格区域的名称
  * `.` ：空网格单元
  * `none`：没有定义网格区域
  * 如果每个区域的个数不同，该属性不生效
* grid-auto-columns / grid-auto-rows ：当我们设置的网格不足以放下所有的网格项时，就会自动出现一些网格轨道，这些多出来的行的高度是`auto`的，可以使用`grid-auto-columns`和 `grid-auto-rows` 属性来指定**自动生成的网格轨道**（又称为隐式网格轨道）的大小。
* grid-auto-flow ：控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。
  * row ：默认值。自动生成的按行排列，也就是换行
  * column ：自动生成的按列排列，也就是新增列
  * dense ：“稠密”堆积算法，如果后面出现了稍小的元素，则会试图去填充网格中前面留下的空白。这样做会填上稍大元素留下的空白，但同时也可能导致原来出现的次序被打乱
* column-gap ：设置每列之间的间距
* row-gap ：设置每行之间的间距
* justify-items ：设置所有**网格项**沿水平方向的对齐方式
  * stretch ：默认值。将拉伸网格项目以填充其单元格的整个宽度
  * start ：将网格项对齐到所有列的开头，即其单元格的左边缘
  * end ：将网格项对齐到所有列的末尾，即其单元格的右边缘
  * center ：将所有网格项目放在其单元格的中心
* justify-content ：设置网格在**网格容器**内沿着水平方向的对齐方式。类似 flex 的 justify-content 属性
  * stretch：默认值。调整网格项大小，让宽度填充整个网格容器。设置了列宽，则列宽优先。
  * start ：将网格与网格容器的左边对齐
  * end ：将网格与网格容器的右边对齐
  * center ：将整个网格水平放置在网格容器的中心
  * space-around ：在网格项之间设置均等宽度的空白间隙，其外边缘间隙大小为中间空白间隙宽度的一半
  * space-between ：在网格项之间设置均等宽度空白间隙，其外边缘无间隙
  * space-evenly：在每个网格项之间设置均等宽度的空白间隙，包括外边缘
* align-items ：设置所有**网格项**沿垂直方向的对齐方式
  * stretch ：默认值。将拉伸所有网格项目以填充其单元格的整个高度
  * start ：将所有网格项放在所有行的顶部
  * end ：将所有网格项放在所有行的底部
  * center ：将所有网格项目放在其单元格的中心
* align-content ：设置网格在**网格容器**内沿着垂直方向的对齐方式。
  * stretch：默认值。网格项目拉伸以填充容器网格的整个高度。设置了列高，则列高优先。
  * start ：将整个网格对齐到网格容器的顶部
  * end ：将整个网格与网格容器的底部对齐
  * center ：将整个网格垂直放置在网格容器的中心
  * space-around ：在网格项之间设置均等宽度的空白间隙，其外边缘间隙大小为中间空白间隙宽度的一半
  * space-between ：在网格项之间设置均等宽度空白间隙，其外边缘无间隙
  * space-evenly：在每个网格项之间设置均等宽度的空白间隙，包括外边缘



```css
.container {
  display: grid;
  /* 2列 每列400px */
  grid-template-columns: 400px 400px;
  /* 第1行100px 第2行300px */
  grid-template-rows: 100px 300px;
  column-gap: 30px;
  row-gap: 50px;
  justify-items: center;
  justify-content: center;
  
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
  
   /* 以网格线名称设置宽高 */
  grid-template-columns: [one] 40px [two] 50px [three] auto [four];
  grid-template-rows: [five] 25% [six] 100px [seven] auto [eight];
}
```



### 速记属性

* gap ：`column-gap` 和 `row-gap` 属性用来设置网格之前的距离，即网格线的宽度。可以通过 `gap` 属性简写这两个属性。

  * `gap: <row-gap> <column-gap>`

* place-items ：`place-items` 用来设置 `align-items` 和 `justify-items` 属性的值，它能够同时控制所有网格项目的水平和垂直对齐。

  * `place-items: <align-items> <justify-items>`

* place-content ：`place-content` 用来设置网格属性 `align-content` 和 `justify-content` 的值，它能够同时控制网格容器内整个网格的水平和垂直对齐方式。

  * `place-content: <align-content> <justify-content>`

* grid-template ：`grid-template-columns`、`grid-template-rows`、`grid-template-areas`这三个属性可以简写在`grid-template`属性中。它的属性值有：

  * `none`：将三个属性都设置为其初始值，即一行一列一个单元格；
  * `grid-template-rows/grid-template-columns`：将`grid-template-columns`和`grid-template-rows`设为指定值，而`grid-template-areas`设置为`none`。

* grid ：`grid` 属性可以为每个显式网格容器属性（例如 `grid-template-rows`、`grid-template-columns` 和 `grid-template-areas`）以及每个隐式网格容器属性设置一个值（例如 `grid-auto-rows`、`grid-auto-columns` 和 `grid-auto-flow`）在一个声明中。

  * ```css
    grid: <grid-template> | <grid-template-rows> / [ auto-flow && dense? ] <grid-auto-columns>? | [ auto-flow && dense? ] <grid-auto-rows>? / <grid-template-columns>
    ```

* place-self ：`place-items` 可以设置 `align-self` 和 `justify-self` 属性的值。它能够控制单个网格项目在其网格区域内的水平和垂直对齐方式。

  * `place-self: <align-self> <justify-self>`

* grid-column ：`grid-column` 是 `grid-column-start` 和 `grid-column-end` 属性的简写属性。它可以指定网格项沿网格容器内的列网格线的水平起始位置以及网格项应该结束的位置。

  * `grid-column: column-start / column-end;`

* grid-row ：`grid-row` 是 `grid-row-start` 和 `grid-row-end` 属性的简写属性。它可以指定网格项沿网格容器中的行网格线的垂直起始位置，以及网格项应该在网格中的何处结束。

  * `grid-row: row-start / row-end;`
  * `grid-column` 和 `grid-row` 属性中也可以使用 `span` 关键字

* grid-area ：`grid-area` 属性指定网格元素在网格布局中的大小和位置，它是`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`属性的合并简写形式

  * `grid-area: <row-start> / <column-start> / <row-end> / <column-end>;`
  * 还可以对网格元素进行命名 `grid-area: header;`



```css
.container {
  display: grid;
  gap: 20px;
  place-items: center;
  place-content: center;
  grid-template: 100px 150px / 200px 300px;
}

.container div:nth-of-type(1) {
  place-self: end center;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  grid-row: 1 / span 2;
  grid-area: 2 / 1 / 4 / 3;
}
```





### 测量单位

* fr 单位：fr单位是“fractional”的缩写，是 CSS 网格布局中引入的长度单位。它代表网格容器中可用空间的一部分。
* min-content ：是一个用于调整大小的关键字，它将网格项的宽度设置为最小宽度，通常是网格项中最小内容或文本的大小。
* max-content ：与`min-content`相反，当应用于列或行时，轨道将变得尽可能宽，以便网格项中的所有内容都显示在一条完整的长行中。
  * 好处：可以让网格项中的内容扩展，而不是将它们包装成新行，这会导致垂直文本溢出。



```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  grid-template-columns: 1fr min-content 3fr;
}
```



### CSS 函数

在使用 CSS Grid 进行布局时，一些CSS数学函数可以帮助我们提高效率。比如 `repeat()` 、`minmax()`、`fit-content()`。



#### repeat()

repeat() 表示轨道列表的重复片段，允许以更紧凑的形式写入大量显示重复模式的列或行。例如，在使用`grid-template-columns`和`grid-template-rows`这两个属性时，可以使用 `repeat()` 函数更简洁地声明这些重复模式。

*  第一个参数用来指定行或列的重复模式重复的次数，有三种取值方式：
  * `<number>`：整数，确切的重复次数。
  * `<auto-fill>`：以网格项为准自动填充。
  * `<auto-fit>`：以网格容器为准自动填充。
* 第二个参数用来指定行或列的重复模式重复的内容，有以下取值方式：
  * `<length>`：非负长度。
  * `<percentage>`：相对于列轨道中网格容器的内联大小的非负百分比，以及行轨道中网格容器的块长宽。
  * `<flex>`：单位为`fr`的非负长度，指定轨道弹性布局的系数值。
  * `max-content`：表示网格的轨道长度自适应内容最大的那个单元格。
  * `min-content`：表示网格的轨道长度自适应内容最小的那个单元格。
  * `auto`：作为最大值时，等价于`max-content`。作为最小值时，它表示轨道中单元格最小长宽(`min-width`/`min-height)`的最大值。



```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: repeat(6, 1fr);
}


/* 不固定列数, 利用auto-fit / auto-fill自动适配 */
/* 不固定网格的宽度，用minmax(最小值，1fr)。 */
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 8px;
}

.item {
  border: 2px solid #aaa;
  box-sizing: border-box;
  min-height: 128px;
}
```



#### minmax()

定义响应式网格布局时，我们可能希望为每个网格轨道指定最小和最大宽度，以确保它们在视口调整大小时上下缩放以适应其内容。这时 `minmax()` 就派上用场了。

`minmax()` 函数允许我们指定网格轨道的最小和最大尺寸，它是一个长宽范围的闭区间。当网格在视口中调整大小时，网格轨道将在该范围内增长和缩小。在较小的屏幕上，它会缩小直到达到最小尺寸。在更大的屏幕上，它会拉伸直到达到最大尺寸。

`minmax()` 函数接受 CSS Grid 大小单位、关键字、长度和百分比值。其有两个参数：

- `min`：轨道的最小尺寸。
- `max`：轨道的最大尺寸。



`minmax()` 函数的一个显著优点就是它减少了对媒体查询的需要。它不依靠媒体查询来控制跨视口的网格轨道（列和行）的大小，而是允许在一定程度上设置网格轨道值的响应式转换。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 两行的最小高度设置为 100px，将最大高度设置 max-content */
  grid-template-rows: repeat(2, minmax(100px, max-content));
}
```



#### fit-content()

`fit-content()` 函数的操作类似于 `minmax()` 函数。不同之处在于，使用` fit-content()` 时，最小值是网格项中内容的大小，最大值是我们传递给它的值。这样就可以将内容设置为最小值，并根据需要将其放大到某个值。

当应用于网格轨道时，它将网格轨道的大小设置为最小宽度，这是其网格项目中最小的内容或文本的大小。需要注意的是，最小的内容或文本大小不大于函数中指定的值。

但是，如果最小宽度的值超过了提供给函数的值，则网格轨道的大小将设置为传递给 `fit-content()` 函数的值，并且网格项的内容将换行。



```css
.container {
  display: grid;
  grid-template-columns: fit-content(200px) fit-content(300px) fit-content(400px);
}
```



### 网格项属性

在网格容器中，每条网格线都根据其在网格上的位置给出一个编号。第一条网格线（行或列）的编号为 1，第二条为 2，依此类推。

浏览器使用这些网格线来控制网格中项目的布局和位置。CSS Grid 提供了一些属性来控制网格项目沿这些网格线的位置，以及它们在水平和垂直方向上跨越的宽度。

可用于控制网格项的位置以及它们如何跨越这些行的属性是：

* grid-column-start ：指定网格项沿网格容器内的列网格线的水平起始位置。这个开始位置定义了网格项目左边缘的开始。
* grid-column-end ：设置网格项的水平结束位置。
  * 使用 `grid-column-start` 和 `grid-column-end` 属性，可以有效地控制网格的水平起始位置以及它跨越网格的宽度。
* grid-row-start ：指定网格项沿网格容器内水平（行）网格线的垂直起始位置。它用于设置网格项开始的行。
* grid-row-end ：指定网格项沿网格容器内水平（行）网格线的垂直结束位置。
  * 使用 `grid-row-start` 和 `grid-row-end` 属性，可以有效地控制网格项的垂直起始位置及其在网格中的高度。
* justify-self ：此属性定义在网格项上，用来设置单元格内容的水平位置。值同 justify-items 属性值。
* align-self ：此属性定义在网格项上，用来设置单元格内容的垂直位置。值同 align-items 属性值。



```css
.container div:nth-of-type(1) {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;
}
```



上面的四个属性使用特定的网格线来确定网格项在网格内的位置，它们的属性值有以下几种：

- `<line>`：可以是一个数字来指代相应编号的网格线，也可使用名称指代相应命名的网格线；
- `span <number>`：网格项将跨越指定数量的网格轨道；
- `span <name>`：网格项将跨越一些轨道 ，直到遇到指定命名的网格线；
- `auto`：自动布局，或者自动跨越，或者跨越一个默认的轨道。



```css
.container div:nth-of-type(1) {
  grid-column-start: span 2;
}
```



### grid 生成器

通过这些生成器，可以可视化得调整 Grid 布局，最终会拿到生成的 Grid 布局代码。

* [CSS Grid Generator](https://cssgrid-generator.netlify.app/)
* [CSS Layout Generator](https://layout.bradwoods.io/customize)
* [Grid LayoutIt](https://grid.layoutit.com/)



### 教程

* [阮一峰 Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html) 



























