# CSS3新增

## 圆角

* border-radius : 定义元素角的半径，也就是圆角边框。`IE9起支持。`
  * 四个值 - border-radius: 15px 50px 30px 5px;（左上角、右上角、右下角、左下角）
  * 三个值 - border-radius: 15px 50px 30px;（左上角，右上角和左下角，右下角）
  * 两个值 - border-radius: 15px 50px;（左上角和右下角，右上角和左下角）
  * 一个值 - border-radius: 15px;（该值用于所有四个角，圆角都是一样的）
* border-top-left-radius / border-top-right-radius / border-bottom-right-radius / border-bottom-left-radius : 四个边的圆角

```html
<style>
  div {
    width: 100px;
    height: 100px; 
    /* border-radius: 50%; */
    border-top-left-radius: 50px;
    border: 1px solid black;
    background: lightblue;
  }
</style>
```

```html
<!-- 圆角头像 -->
<style>
  img{
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid black;
    box-sizing: border-box;
  }
  img:hover {
    width: 130px;
    height: 130px;
  }
</style>
```



## 阴影效果

通过使用 CSS，您可以在文本和元素上添加阴影。



### 文字阴影

* text-shadow : 文本阴影效果，如果同时添加多个阴影，用逗号分隔。
  * 只指定水平阴影和垂直阴影 `text-shadow: 2px 2px;`
  * 可选，给阴影添加颜色 `text-shadow: 2px 2px red;`
  * 可选，给阴影添加5px模糊效果 `text-shadow: 2px 2px 5px red;`



### 元素阴影

* box-shadow : 应用阴影于元素。
  * 只指定水平阴影和垂直阴影 `box-shadow: 10px 10px;`
  * 可选，给阴影添加颜色 `box-shadow: 10px 10px gray;`
  * 可选，给阴影添加5px模糊效果 `box-shadow: 10px 10px 5px gray;`

```
box-shadow: h-shadow v-shadow blur spread color inset;
box-shadow: 10px 10px 5px 5px pink inset;
```

* h-shadow : 必需。水平阴影的位置。允许负值
* v-shadow : 必需。垂直阴影的位置。允许负值
* blur : 可选。模糊距离。
* spread : 可选。阴影的尺寸。
* color : 可选。阴影的颜色。
* inset : 可选。将外部阴影 (outset) 改为内部阴影。





## 2D转换 transform

CSS 转换（transforms）允许您移动、旋转、缩放和倾斜元素。



`transform`属性中的的2D转换方法：

* translate(x, y) : 从其当前位置移动元素（根据为 X 轴和 Y 轴指定的参数）
  * 如果值为百分比，则代表**自身大小**的百分比
* rotate(deg) : 根据给定的角度顺时针或逆时针旋转元素。
* scale(宽度倍数, 高度倍数) : 增加或减少元素的大小（根据给定的宽度和高度参数）。
* scaleX(宽度倍数) : 增加或减少元素的宽度。
* scaleY(高度倍数) : 增加或减少元素的高度。
* skew(X轴度数, Y轴度数) : 使元素沿 X 和 Y 轴倾斜给定角度。如果未指定第二个参数，则值为零。
* skewX(deg) : 使元素沿 X 轴倾斜给定角度。
* skewY(deg) : 使元素沿 Y 轴倾斜给定角度。
* matrix() : 把所有 2D 变换方法组合为一个。
  * 可接受六个参数，其中包括数学函数，这些参数使您可以旋转、缩放、移动（平移）和倾斜元素。
  * matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: red;
    
    transform: translate(50px, 100px);
    transform: rotate(-20deg);
    transform: scale(0.5, 0.5); /* 为其原始宽度和高度的一半 */
    transform: scaleX(2);
    transform: scaleY(0.5);
    
    transform: skew(20deg, 40deg);
    transform: skewX(20deg);
    transform: skewY(20deg);
    transform: matrix(1, -0.3, 0, 1, 0, 0);
  }
</style>
```

```html
<!-- 为支持不同浏览器，请加前缀 -->
<style>
  div {
    transform:rotate(7deg);
    -ms-transform:rotate(7deg); 	/* IE 9 */
    -moz-transform:rotate(7deg); 	/* Firefox */
    -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
    -o-transform:rotate(7deg); 	/* Opera */
  }
</style>
```



* transform-origin 属性：允许您改变被转换元素的位置。该属性必须与 transform 属性一同使用。
  * x-axis : 定义视图被置于 X 轴的何处。值：left / center / right / length / %
  * y-axis : 定义视图被置于 Y 轴的何处。值：top / center / bottom / length / %
  * z-axis : 定义视图被置于 Z 轴的何处。值：length

2D 转换元素能够改变元素 x 和 y 轴。3D 转换元素还能改变其 Z 轴。

```
transform-origin: x-axis y-axis z-axis;
transform-origin: 20% 40%;
```





## 3D转换 transform

`transform`属性中的的3D转换方法：

* rotateX() : 使元素绕其 X 轴旋转给定角度
* rotateY() : 使元素绕其 Y 轴旋转给定角度(可实现图片翻转效果)
* rotateZ() : 使元素绕其 Z 轴旋转给定角度
* rotate3d(x,y,z,angle) : 定义 3D 旋转。
* 更多...



其他转换属性：

* transform-style : 规定被嵌套元素如何在 3D 空间中显示。
  * flat(默认。子元素将不保留其 3D 位置) / preserve-3d(子元素将保留其 3D 位置)
* perspective : 规定 3D 元素的透视效果。
  * none(默认值。与 0 相同。不设置透视) / number(元素距离视图的距离，以像素计)
* perspective-origin : 规定 3D 元素的底部位置。
  * x-axis : 定义该视图在 x 轴上的位置。默认值：50%。值：left / center / right / length / %
  * y-axis : 定义该视图在 y 轴上的位置。默认值：50%。值：top / center / bottom / length / %
* backface-visibility : 定义元素在不面对屏幕时是否可见。
  * visible(默认，背面是可见的) / hidden(背面是不可见的)



```html
<style>
  div {
    margin: 100px auto;
    width: 100px;
    height: 100px;
    background-color: red;

    transform: rotateX(150deg);
    transform: rotateY(150deg);
    transform: rotateZ(90deg);
  }
</style>
```





## 过渡 transition

CSS 过渡允许您在给定的时间内平滑地改变属性值。通常搭配`:hover`使用。

如需创建过渡效果，必须明确两件事：要添加效果的 CSS 属性、效果的持续时间(默认值为0)。

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: red;
    transition: width 2s;
  }
  /* 当指定的 CSS 属性（width）值发生变化时，将开始过渡效果。 */
  div:hover {
    width: 300px;
  }
</style>
```

```html
<!-- 多个过渡效果用逗号分开，还可以配合transform转换属性使用 -->
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: red;
    transition: width 2s, height 2s, transform 2s;
  }
  div:hover {
    width: 300px;
    height: 400px;
    transform: rotate(360deg);
  }
</style>
```





* transition : 过渡效果。简写属性，用于将四个过渡属性设置为单一属性。
  * transition: property duration [timing-function delay];
    * 变化的属性名称  花费的时间  [运动方式  何时开始时间]
  * transition: width 2s;
  * transition: width 2s linear 1s;
* transition-delay : 规定过渡效果何时开始（以秒计）。
* transition-duration : 规定过渡效果要持续多少秒或毫秒。默认值是 0，意味着不会有效果。
* transition-property : 规定过渡效果所针对的 CSS 属性的名称。
  * all(默认，所有属性都将获得过渡效果) / CSS属性名 / none(没有属性会获得过渡效果)
* transition-timing-function : 规定过渡效果的速度曲线。
  * `ease` - 规定过渡效果，先缓慢地开始，然后加速，然后缓慢地结束（默认）
  * `linear` - 规定从开始到结束具有相同速度的过渡效果(匀速)
  * `ease-in` -规定缓慢开始的过渡效果(起步慢，逐渐加快)
  * `ease-out` - 规定缓慢结束的过渡效果(起步快，逐渐变慢)
  * `ease-in-out` - 规定开始和结束较慢的过渡效果(先加速后减速)
  * `cubic-bezier(n,n,n,n)` - 允许您在三次贝塞尔函数中定义自己的值



可视化贝塞尔函数：https://cubic-bezier.com/

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: red;

    transition-property: all;
    transition-duration: 2s;
    transition-timing-function: linear;
    transition-delay: 1s;
  }
  div:hover {
    width: 300px;
    height: 300px;
  }
</style>
```



## 动画 animation

CSS 可实现 HTML 元素的动画效果，而不使用 JavaScript。动画使元素逐渐从一种样式变为另一种样式。

如需使用 CSS 动画，您必须首先为动画指定一些关键帧。关键帧包含元素在特定时间所拥有的样式。



```html
<style>
  /* 动画代码 */
  @keyframes example {
    from { background-color: red;}
    to { background-color: yellow;}
  }

  /* 要使动画生效，必须将动画绑定到某个元素 */
  div {
    width: 100px;
    height: 100px;
    background-color: red;
    animation-name: example;
    animation-duration: 4s;
  }
</style>
```

**当动画结束后，会变回最初的样式。**



* `@keyframes` 规则：指定了 CSS 样式，动画将在特定时间逐渐从当前样式更改为新样式。
  * form : 代表开始，0%
  * to : 代表完成，100%
  * 也可以使用百分比值。通过使用百分比，您可以根据需要添加任意多个样式更改。
* animation : 设置动画属性的简写属性。用于设置六个动画属性：
  * animation : 名称 完成时间 [速度曲线 延迟 次数 播放方向]
  * animation: example 4s linear 0s infinite reverse;
  * animation: example 5s infinite;
* animation-name : 规定 @keyframes 动画的名称。
* animation-duration : 规定动画完成一个周期应花费的时。默认值是 0s。
* animation-delay : 规定动画开始的延迟时间。如果使用负值，则动画将开始播放，如同已播放 N 秒。
* animation-iteration-count : 指定动画应运行的次数。
  * number(次数) / infinite(永远持续下去)
* animation-direction : 指定是向前播放、向后播放还是交替播放动画。
  * normal : 动画正常播放（向前）。默认值
  * reverse : 动画以反方向播放（向后）
  * alternate : 动画先向前播放，然后向后
  * alternate-reverse : 动画先向后播放，然后向前
* animation-timing-function : 规定动画的速度曲线。
  * `ease` - 规定过渡效果，先缓慢地开始，然后加速，然后缓慢地结束（默认）
  * `linear` - 规定从开始到结束具有相同速度的过渡效果
  * `ease-in` -规定缓慢开始的过渡效果
  * `ease-out` - 规定缓慢结束的过渡效果
  * `ease-in-out` - 规定开始和结束较慢的过渡效果
* animation-fill-mode : 规定元素在不播放动画时的样式（在开始前、结束后，或两者同时）。
  * CSS 动画不会在第一个关键帧播放之前或在最后一个关键帧播放之后影响元素，该属性会覆盖这种行为
  * none - 默认值。动画在执行之前或之后不会对元素应用任何样式。
  * forwards - 元素将保留由最后一个关键帧设置的样式值
    * （依赖 animation-direction 和 animation-iteration-count）。
  * backwards - 元素将获取由第一个关键帧设置的样式值，并在动画延迟期间保留该值。
    * （取决于 animation-direction）
  * both - 动画会同时遵循向前和向后的规则，从而在两个方向上扩展动画属性。
* animation-play-state : 规定动画正在运行还是暂停。可以在js中控制动画暂停。
  * running(默认。动画正在播放) / paused(暂停)

```html
<style>
  @keyframes example {
    /* 改变多个样式 */
    0%   {background-color:red; left:0px; top:0px;}
    25%  {background-color:yellow; left:200px; top:0px;}
    50%  {background-color:blue; left:200px; top:200px;}
    75%  {background-color:green; left:0px; top:200px;}
    100% {background-color:red; left:0px; top:0px;}
  }

  div {
    width: 100px;
    height: 100px;
    background-color: red;
    position: relative;
    animation-name: example;
    animation-duration: 4s;
  }
</style>
```

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: red;
    position: relative;
    
    animation: example 4s linear 0s infinite reverse;
    animation-name: example;
    animation-duration: 4s;
    animation-delay: 2s;
    animation-iteration-count:infinite;
    animation-direction: reverse;
    animation-timing-function: linear;
    animation-fill-mode: backwards;
    animation-play-state: paused;
  }
</style>
```



## 过渡和动画的区别

* 过渡关注两个状态的柔和变化，动画关注过程中间的每一步操作(关键帧)。也就是过渡不能设置中间位置的变化，而动画中间的每一个细致操作都可以自己实现
* 过渡需要触发条件，比如鼠标悬停。动画不需要触发条件，浏览器加载好后就可以立即执行
* 过渡只能执行一次，事件生效后，还会原路返回。动画可以通过设定次数来执行。



## 多重背景

CSS 允许您通过 `background-image` 属性为一个元素添加多幅背景图像。

不同的背景图像用逗号隔开，并且图像会彼此堆叠，其中的第一幅图像最靠近观看者。

```html
<style>
  #example1 {
    background: url(flower.gif) right bottom no-repeat, url(paper.gif) left top repeat;
  }
</style>
```



* background-size : 规定背景图像的大小。还可以接受多个设置背景尺寸的值（使用逗号分隔的列表）
  * auto(默认) / px / % 
  * contain : 将背景图像缩放为尽可能大的尺寸（但其宽度和高度都必须适合内容区域）
    * 这样，取决于背景图像和背景定位区域的比例，可能存在一些未被背景图像覆盖的背景区域。
  * cover : 缩放背景图像，以使内容区域完全被背景图像覆盖（其宽度和高度均等于或超过内容区域）
    * 这样，背景图像的某些部分可能在背景定位区域中不可见。



```html
<style>
  div {
    border: 1px solid black;
    background: url(pic.png);
    /* background-size: 100px 80px; */
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
```

```html
<style>
  /* 覆盖整个浏览器窗口的背景图片 */
  body {
    background: url(img_man.jpg) no-repeat center fixed; 
    background-size: cover;
  }
</style>
```





## 渐变

参考来源URL: https://www.w3school.com.cn/css/css3_gradients.asp

CSS 渐变使您可以显示两种或多种指定颜色之间的平滑过渡。

CSS 定义了两种渐变类型：

* 线性渐变（向下/向上/向左/向右/对角线）
* 径向渐变（由其中心定义）



### 线性渐变

如需创建线性渐变，您必须定义至少两个色标。色标是您要呈现平滑过渡的颜色。您还可以设置起点和方向（或角度）以及渐变效果。

```
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```



默认是从上到下的(to bottom)，也可以定义一个角度，来取代预定义的方向。

值 0deg 等于向上（to top）。值 90deg 等于向右（to right）。值 180deg 等于向下（to bottom）。

```html
<style>
  div {
    height: 200px;
    background-color: red; /* 针对不支持渐变的浏览器 */
    
    background-image: linear-gradient(red, yellow);
    background-image: linear-gradient( to right, red, yellow);	/* 从左到右线性渐变 */
    background-image: linear-gradient(to bottom right, red, yellow);	/* 从左上角到右下角 */
    
    background-image: linear-gradient(-90deg, red, yellow); /* -90度==向左渐变 */
    
    background-image: linear-gradient(red, yellow, green); /* 使用多个色标 */
    /* 多色标配合方向 */
    background-image: linear-gradient(to bottom, red,orange,yellow,green,blue,indigo,violet);
    
    /* 透明度的渐变效果，0表示全透明，1表示无透明 */
    background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
    
    /* 重复的线性渐变，如果不规定百分百，则会均匀分布色标。 */
    background-image: repeating-linear-gradient(red, yellow 10%, green 20%);
  }
</style>
```



### 径向渐变

径向渐变由其中心定义。如需创建径向渐变，您还必须定义至少两个色标。

```
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
```

默认地，shape 为椭圆形，size 为最远角，position 为中心。



* shape : 定义形状。可接受 circle 或 ellipse 值。默认值为 ellipse（椭圆）。
* size : 定义渐变的大小。可接受四个值：
  * farthest-corner : 默认。最远角。
  * closest-corner : 最近角。
  * farthest-side : 最远面。
  * closest-side : 最近面。

```html
<style>
  div {
    height: 200px;
    background-image: radial-gradient(red, yellow, green);	/* 径向渐变-均匀间隔的色标（默认） */
		background-image: radial-gradient(red 5%, yellow 15%, green 60%);	/* 不同间距的色标 */
		background-image: radial-gradient(circle, red, yellow, green); /* 圆形的径向渐变 */

    background-image: radial-gradient(closest-corner at 60% 55%, red, yellow, black); /* 最近角 */
    background-image: repeating-radial-gradient(red, yellow 10%, green 15%); /* 重复径向渐变*/
  }
</style>
```



### 锥形渐变

渐变的颜色围绕一个中心点旋转（而不是从中心辐射）进行过渡。锥形渐变的例子包括饼图和色轮。	

锥形渐变语法与径向渐变语法类似，但色标放置在渐变圆弧（圆的周长）周围，而不是从渐变中心出现的渐变线上。使用锥形渐变时，颜色会围绕圆心旋转，从顶部开始顺时针旋转。在径向渐变中，颜色从椭圆中心向各个方向向外过渡。



```scss
background-image: conic-gradient(red, pink, red);
background: conic-gradient(red, green, blue, red);

// 饼图
background: conic-gradient(red 36deg, orange 36deg 170deg, yellow 170deg);
// 色轮
background: conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);

background: conic-gradient(from 90deg at 100px 100px, navy 90deg, purple 180deg);
background: repeat-conic-gradient(from 90deg at 100px 100px, navy 90deg, purple 180deg);
```







## 边框图像

通过使用 CSS `border-image` 属性，可以设置图像用作围绕元素的边框。`IE11起支持。`

该属性有三部分：

* 用作边框的图像 `border-image-source`
* 在哪里裁切图像 `border-image-slice`
* 定义中间部分应重复还是拉伸 `border-image-repeat`

`border-image` 属性接受图像，并将其切成九部分，就像井字游戏板。然后，将拐角放置在拐角处，并根据您的设置重复或拉伸中间部分。

**注意：为了使 border-image 起作用，该元素还需要设置 border 属性！**

```html
<style>
  #borderimg {
    border: 10px solid transparent;
    padding: 15px;
    border-image: url(border.png) 30 round;
  }
</style>
```



* border-image : 用于设置所有 border-image-* 属性的简写属性。
* border-image-source : 规定用作边框的图像的路径。
* border-image-slice : 规定如何裁切边框图像。不同的裁切值会完全改变边框的外观。
* border-image-width : 规定边框图像的宽度。
* border-image-outset : 规定边框图像区域超出边框盒的量。
* border-image-repeat : 规定边框图像应重复、圆角、还是拉伸。
  * stretch(拉伸) / repeat(重复) / round(铺满)



## filter 滤镜

`filter` 属性将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染。[更多](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)



### 函数

当单个 `filter` 属性具有多个函数时，滤镜将按顺序依次应用。

* grayscale(数值/百分数) : 对图片进行灰度转换。数值越大灰度最大。最高为1 。常用于网页置灰。
* blur(长度值) ：设置元素高斯模糊效果。常用于毛玻璃效果。
* opacity(数值/百分数) ：调整不透明度。值为 `0%` 是完全透明的，值为 100% 会保留原来的效果。值在 0% 与 100% 之间效果为线性变化的，参数的最小差值为 1。
* brightness(数值/百分数) ：调整亮度。低于`100%` 的值会使图片变暗，超过`100%`的值将会使其变亮。当值为`0%`时将会创建一个**全黑**的图像，当值为`100%`时不会有任何变化。该值为空时默认为`1`。
* contrast(数值/百分数) ：调整对比度。低于 `100%` 的值会降低对比度，高于 `100%` 的值会增加对比度。值为 `0%` 将创建**完全灰色**的图像，值为 `100%` 时不会有任何变化。该值为空时默认为 `1`。
* saturate(数值/百分数) ：调整饱和度。饱和元素的颜色比较鲜艳；对于曝光不足的图像可以增加饱和度，反之亦然。值为 `0%` 则是完全不饱和，值为 `100%` 则图像无变化。超过 `100%` 则增加饱和度。
* sepia(数值/百分数) ：为图像添加柔和的**褐色**色调，使图像看起来更温暖、更复古。它类似于使用灰度滤镜，但色调为褐色。它接受 0 到 1 之间的小数值，或最大为 100% 的百分比值。值为 0 会使图像保持不变。值为 100% 或 1 会将图像完全变为棕褐色，而介于 0% 和 100% 之间的值会使图像的色调介于其原始颜色和完全棕褐色之间。
* drop-shadow() ：用于增加图像的阴影，和 box-shadow 的作用类似，使图像看起来更加立体。接受四个参数：
  * `<offset-x>`：长度值，指定元素和投影之间的水平距离。正值将阴影置于元素右侧，负值将阴影置于左侧。
  * `<offset-y>`：长度值，指定元素和投影之间的垂直距离。正值将阴影置于元素下方，负值将阴影置于其上方。
  * `<blur-radius>`: 阴影的模糊半径指定为 CSS 长度单位。值越大，阴影变得越模糊。如果未指定，则默认为 0，产生清晰且不模糊的阴影。不允许使用负值。
  * `<color>`：阴影的颜色。如果未指定，则默认为黑色。
* hue-rotate(角度) ：应用色相旋转。`<angle>` 值设定图像会被调整的色环角度值。值为 `0deg`，则图像无变化。可以用来设置不同颜色。
  * `hue-rotate(90deg)` 90度旋转
  * `hue-rotate(.5turn)` 180度旋转，1turn就是1圈
  * `hue-rotate(3.142rad)` 3.142弧度旋转，近似1圈，也就是360度
* invert(数值/百分数) ：反转颜色。值为 `100%` 则图像完全反转，值为 `0%` 则图像无变化。值在 `0%` 和 `100%` 之间，则是该效果的线性乘数。也就是白底黑字变成黑底白字。
* initial ：默认值，会解析为 `none`。
* inherit ：从元素的直接父级计算的 `filter` 属性的值。



```css
filter: grayscale(0.20);
filter: grayscale(60%);

filter: blur(2px);
filter: blur(1.5rem);

filter: brightness(1.75);
filter: brightness(0);

filter: contrast(1.75);
filter: contrast(50%);

filter: opacity(1);	/* 不透明 */
filter: opacity(50%);

filter: sepia(50%);

filter: drop-shadow(4px 4px 10px yellow);

filter: saturate(4);
```





## object-fit属性

这个属性指定可替换元素（例如：`<img>` 或 `<video>`）的内容以不同的方式填充容器。比如"保留长宽比"或者"展开并占用尽可能多的空间"。

* object-fit : 用于指定应如何调整 `<img>` 或 `<video>` 的大小以适合其容器。
  * fill : 默认值。调整替换后的内容大小，以填充元素的内容框。如有必要，将拉伸或挤压物体以适应该对象。
  * cover : 推荐，调整替换内容的大小，以在填充元素的整个内容框时保持其长宽比。该对象将被裁剪以适应。
  * contain : 缩放替换后的内容以保持其纵横比，同时将其放入元素的内容框。
  * none : 不对替换的内容调整大小。
  * scale-down : 调整内容大小就像没有指定内容或包含内容一样（将导致较小的具体对象尺寸）
* object-position ：规定了可替换元素的内容，在其内容框中的位置。可替换元素的内容框中未被对象所覆盖的部分，则会显示该元素的背景。属性接受两个值：
  * 水平定位：使用关键字 `left`、`center` 或 `right`，或者使用百分比或长度值来指定水平方向上的位置。
  * 垂直定位：使用关键字 `top`、`center` 或 `bottom`，或者使用百分比或长度值来指定垂直方向上的位置。
  * [更多取值方式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)

```html
<style>
  img {
    width: 150px;
    height: 200px;
    border: 1px solid black;
    object-fit: cover;
  }
  
  .op {
    object-position: 50% 50%;
    object-position: right top;
    object-position: left bottom;
    object-position: 250px 125px;
  }
</style>

<body>
  <img src="pic.png" alt="" >
</body>
```



## column-count 多列

CSS 多列布局允许我们轻松定义多列文本 - 就像报纸那样。



* column-count : 规定元素应被划分的列数。
* column-gap : 规定列之间的间隔。
* column-rule-style : 规定列之间的分割线样式。
* column-rule-width : 规定列之间的分割线宽度。
* column-rule-color : 规定列之间的分割线颜色。
* column-rule : 用于设置上面所有 column-rule-* 属性的简写属性。
* column-span : 规定元素应跨越多少列。常用于标题设置。
  * all / none
* column-width : 为列指定建议的最佳宽度。
* columns : 用于设置 column-width 和 column-count 的简写属性。

```html
<style>
  div {
    column-count: 3;
    column-gap: 50px;
    column-rule-style: solid;
    column-rule-width: 1px;
    column-rule-color: cornflowerblue;
    column-rule:1px solid seagreen;
    
    column-width:  500px; 
    column-fill:balance;
    columns: 300px 3;
  }
  h2 {
    column-span: all;
  }
</style>
```



## perspective

perspective 指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。

```css
transform: perspective(800px) translate3d(0, -50px, 50px);
```





## 变量 var()

var() 函数用于插入 CSS 变量的值。

CSS 变量可以访问 DOM，这意味着您可以创建具有局部或全局范围的变量，使用 JavaScript 来修改变量，以及基于媒体查询来修改变量。

使用CSS变量的好处：对于需要多次使用的颜色，可以把它们放进变量中，不必重复粘贴，代码易读且更改容易。



### 创建变量

语法：var(name [,value])

* name : 必需。变量名。变量名称必须以两个减号（`--`）开头，且区分大小写！
* value : 可选。回退值（在未找到变量时使用）。

```css
--main-bg-color: #C92E33;
background-color: var(--main-bg-color);
```





CSS 变量可以有全局或局部作用域。

全局变量可以在整个文档中进行访问/使用，而局部变量只能在声明它的选择器内部使用。

* 创建具有全局作用域的变量，请在 `:root` 选择器中声明它。 `:root` 选择器匹配文档的根元素。
* 创建具有局部作用域的变量，请在将要使用它的选择器中声明它。



```html
<style>
  :root {
    /* 1.声明全局变量，变量名大小写敏感 */
    --blue: #6495ed;
    --white: #faf0e6;
  }
  div {
    /* 局部 */
    --red: #ee2222;
    background-color: var(--blue); /* 2.使用变量 */
    color: var(--white);
  }
  span{
    color: var(--red);
  }
  p {
    /* var(--red) 不会生效，因为它是局部的，只能在div下使用。 */
    color: var(--red);
  }
</style>

<body>
  <div>
    hello <span>good</span>
  </div>
  <p>nice</p>
</body>
```



### 局部变量覆盖全局变量

```html
<style>
  :root {
    --blue: #6495ed;
    --white: #faf0e6;
  }
  p {
    --blue: green;  /* 局部变量覆盖全局变量 */
    color: var(--blue);
  }
  span {
    --my-color: orange;  /* 或者添加一个新的局部变量 */
    color: var(--my-color);
  }
</style>
```



### 使用JS更改变量

```html
<style>
  :root {
    --blue: #6495ed;
    --white: #faf0e6;
  }
  div {
    background-color: var(--blue);
    color: var(--white);
  }
</style>

<script>
  // 获取根元素
  var r = document.querySelector(':root')

  // 获取变量值
  function fun_get() {
    // 获取根的样式(属性和值)
    var rs = getComputedStyle(r)
    alert('--white : ' + rs.getPropertyValue('--white'))
  }

  // 设置变量值
  function fun_set() {
    r.style.setProperty('--white', 'orange')
  }
</script>

<body>
  <div>hello</div>
  <button onclick="fun_get()">获取变量</button>
  <button onclick="fun_set()">更改变量</button>
</body>
```



### 在媒体查询中使用/更改变量

```html
<style>
  :root {
    --bg: #6495ed;
    --fontcolor: #faf0e6;
  }
  div {
    --fontsize: 25px;
    background-color: var(--bg);
    color: var(--fontcolor);
    font-size: var(--fontsize);
  }

  /* 媒体查询，width大于等于600px时执行 */
  @media screen and (min-width: 600px) {
    :root {
      --fontcolor: orange;
    }
    div {
      --fontsize: 40px;
    }
  }
</style>
```



### 通过行内样式赋值var

```html
<div class="f2" style="--f-color: #3476ff;">文字文字</div>

<style>
.f2 {
  color: var(--f-color);
}
</style>
```





## 视口

视口（viewport）是用户在网页上的可见区域。

HTML5 引入了一种方法，使 Web 设计者可以通过 `<meta>` 标签来控制视口。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
```

它为浏览器提供了关于如何控制页面尺寸和缩放比例的指令。

* `width=device-width` 将页面的宽度(视口)设置为跟随设备的屏幕宽度(视设备而定，苹果6变为了375)
* `initial-scale=1.0` 设置视口的初始缩放倍数为1.0倍。
* `maximum-scale=1.0` 设置最大缩放倍数为1.0倍。
* `minimum-scale=1.0` 设置最小缩放倍数为1.0倍。
* `user-scalable=no` 设置不允许被用户缩放。
* `viewport-fit=cover` 设置为 cover值可以解决刘海屏的留白问题



通过以下JS代码查看页面的宽度。

```html
<script>
	// 当屏幕变化尺寸的时候，随时输出浏览器窗口的宽度
  window.onresize = function(){
    var mywidth = document.getElementById('mywidth')
    // 获取浏览器窗口的宽度
    mywidth.innerText = document.documentElement.clientWidth
  }
</script>
```







## 媒体查询

媒体查询旨在为不同的设备（显示器、平板电脑、手机等）定义不同的样式规则。

媒体查询可用于检查许多事情，例如：

* 视口的宽度和高度
* 设备的宽度和高度
* 方向（平板电脑/手机处于横向还是纵向模式）
* 分辨率



注意事项:

* `and` 后面需要加空格
* 多个媒体查询的顺序。如果使用 `max-width` 则需要从大到小，如果使用 `min-width` 则需要从小到大。



### 查询视口宽度

```css
@media not|only mediatype and (expressions) {
  CSS-Code;
}

/* 视口宽度大于等于800px时应用的样式 */
@media screen and (min-width: 800px) {
  body {
    background:deepskyblue;
  }
}

/* 浏览器的宽度在 600 到 900 像素之间时 应用的样式 */
@media screen and (max-width: 900px) and (min-width: 600px) {
  div.example {
    font-size: 50px;
    padding: 50px;
    border: 8px solid black;
    background: yellow;
  }
}

/* 当宽度在 600 像素到 900 像素之间或大于 1100 像素时 - 更改 <div> 的外观 */
/* 逗号, 就类似于OR运算符 */
@media screen and (max-width: 900px) and (min-width: 600px), (min-width: 1100px) {
  div.example {
    font-size: 50px;
    padding: 50px;
    border: 8px solid black;
    background: yellow;
  }
}
```





通过媒体查询，更换样式表: 

当宽度大于等于800px时，使用1.css样式文件

当宽度小于等于799px时，使用2.css样式文件

```html
<link rel="stylesheet" href="css/1.css" media="(min-width:800px)">
<link rel="stylesheet" href="css/2.css" media="(max-width:799px)">
```



兼容IE8

因为 IE8 不支持 HTML5 和 媒体查询功能，所以需要加载两个 JS 文件，来保证我们的代码实现兼容效果。

```html
<!--[if lt IE 9]>
  <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
<![endif]-->
```



### 分界点区间

超小屏幕 手机(<768px)

小屏幕 平板(>=768px)

中等屏幕 桌面显示器(>=992px)

大屏幕 大桌面显示器(>=1200px)



* 屏幕宽度小于1024px → 移动设备
* 



### 检测主题色为亮色/暗色

`prefers-color-scheme` CSS 媒体特性用于检测用户是否有将系统的主题色设置为亮色或者暗色。

* light ：浅色
* dark ：暗色
* no-preference ：表示系统未得知用户在这方面的选项。在布尔值上下文中，其执行结果为 false。

```css
@media (prefers-color-scheme: dark) {
  #page::after {
    content: 'dark';
  }
}

@media (prefers-color-scheme: light) {
  #page::after {
    content: 'light';
  }
}
```





## TODO @layer





## @support

在 CSS 中可以使用 `@support` 规则来检测对 CSS 特性的支持：

```CSS
@supports (accent-color: #74992e) {
  blockquote {
    color: crimson;
  }
}

/* 判断浏览器是否支持该选择器 */
@supports selector(:has(*)) {
  
}
```

如果支持该属性将运行内容定义的样式。



https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports





## @container 容器查询

容器查询中的“容器”就是被查询的元素，但是容器查询中规则仅影响后代元素。容器查询将允许定义这些元素如何在容器大小之间变化的规则。



要想设置容器查询，需要给被查询的元素设置 `container-type` 属性来指定容器的类型。

```css
container-type: inline-size; 
```

`container-type` 属性有以下属性值：

- size：创建一个查询容器，支持内联轴和块轴维度上进行查询。
- inline-size：创建一个查询容器，支持在内联轴（文本流方向）维度上进行查询，这是最常用的选项。
- block-size：创建一个查询容器，支持在块轴维度上维度查询。
- style：允许通过定义查询容器进行样式查询。
- state：允许通过定义查询容器进行状态查询。



```css
.card-layout {
  container-type: inline-size;
}
 
@container (min-width: 768px) {
  .card {
    display: grid;
    font-size: 3rem;
    color: blue;
  }
}
```

- `min-width`：当容器的大于或等于指定的宽度时，`min-width` 定义的样式会生效；
- `max-width`：当容器的小于或等于指定的宽度时，`max-width` 定义的样式会生效；
- `@container`：检测元素的父元素何时更改宽度，并指定每次宽度更改时要在子元素中进行哪些更改。



我们可以使用 `container-name` 属性为容器指定一个名称，以区分具有唯一名称的容器。

```css
.card-layout {
  container-type: inline-size;
  container-name: card;
  
  /* 简写属性 */
  container: card / inline-size;
}

@container card (min-width: 480px) {
  .card{
    display: grid;
    font-size: 2rem;
    color: gray;
  }
}
```



**容器查询长度单位**

除此之外，容器查询还引入了几个专用的长度单位，当使用容器查询将样式应用于容器时，可以使用**容器查询长度单位**。这些单位指定相对于查询容器尺寸的长度。使用相对于其容器的长度单位的组件可以更灵活地用于不同的容器，而无需重新计算具体的长度值。



容器查询长度单位包含：

- `cqw`：查询容器宽度的 1%
- `cqh`：查询容器高度的 1%
- `cqi`：查询容器内联大小的 1%
- `cqb`：查询容器块大小的 1%
- `cqmin`：`cqi` 或 `cqb` 中较小的值
- `cqmax`：`cqi` 或 `cqb` 中较大的值

```css
@container (min-width: 600px) {
  .card h2 {
    font-size: max(1.5em, 1.2em + 2cqi);
  }
}
```



**容器元素选择器规则**

容器本身是不能在容器查询中设置样式的（除非它是嵌套容器并响应其祖先容器的查询）。但是，**容器可以用作其子项的 CSS 选择器的一部分**。

这有什么作用吗？这样的话，就可以保留对可能需要源自容器的 CSS 伪类和选择器的访问，例如 `:nth-child`。

```css
@container (min-width: 60ch) {
  .container:nth-child(odd) > article {
    border: 1px solid grey;
  }
} 
```



































