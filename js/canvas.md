# Canvas

## 基础

`<canvas>` 元素可被用来通过 JavaScript（[Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) API 或 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) API）绘制图形及图形动画。

属性：

* height : 设置 canvas 的高度。单位为 px。默认 150 px。
* width : 设置 canvas 的宽度。单位为 px。默认 300 px。
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
    canvas.width = canvas.width
  }
</script>
```



注意：

1. 在 canvas 标签中写入文字，如果浏览器支持就不会显示文字，不支持的话就会显示文字
2. 指定画布大小：直接在标签中指定 width 和 height
3. 对于 canvas 来说，默认是行内元素，不能直接使用 `margin: 0 auto;` 进行居中！如果需要居中，可以将他设置为块元素 `display: block;`



## Canvas API

* 文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API
* [深入 HTML5 Canvas](https://joshondesign.com/p/books/canvasdeepdive/title.html) ：一个手把手的、长度与书本相当的 Canvas API 和 WebGL 介绍。
* [Canvas 手册](https://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html) ：Canvas API 的便捷参考。



### HTMLCanvasElement

文档：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement



* `getContext()` : 返回 canvas 的上下文，如果上下文没有定义则返回 null。



```js
// 获取 HTML <canvas> 元素的引用
var canvas = document.getElementById("tutorial");
// 获取这个元素的上下文
var ctx = canvas.getContext("2d");
```

```js
// 检查支持性
var canvas = document.getElementById("tutorial");

if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
  // drawing code here
} else {
  // canvas-unsupported code here
}
```



### CanvasRenderingContext2D

文档：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D

由 CanvasRenderingContext2D 接口完成实际的绘制。

`<canvas>` 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。



#### 绘制矩形

* `fillRect(x, y, width, height)` ：绘制一个填充的矩形
  * x 与 y 指定了在 canvas 画布上所绘制的矩形的左上角（相对于原点）的坐标。
  * width 和 height 设置矩形的尺寸。
* `strokeRect(x, y, width, height)` ：绘制一个矩形的边框
* `clearRect(x, y, width, height)` ：清除指定矩形区域，让清除部分完全透明。
* `rect(x, y, width, height)` ：绘制一个左上角坐标为（x,y），宽高为 width 以及 height 的矩形。
  * 当该方法执行的时候，moveTo() 方法自动设置坐标参数（0,0）。也就是说，当前笔触自动重置回默认坐标。



```js
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}
```



#### 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你需要创建路径起始点。
2. 然后你使用画图命令去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。



* `beginPath()` ：新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
* `closePath()` ：闭合路径之后图形绘制命令又重新指向到上下文中。
* `stroke()` ：通过线条来绘制图形轮廓。
* `fill()` ：通过填充路径的内容区域生成实心的图形。调用后，所有没有闭合的形状都会自动闭合，所以不需要调用 closePath() 函数。
* `moveTo(x, y)` ：将笔触移动到指定的坐标 x 以及 y 上。
* `lineTo(x, y)` ：绘制一条从当前位置到指定 x 以及 y 位置的直线。
* `arc(x, y, radius, startAngle, endAngle, anticlockwise)` ：画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。
  * `x,y`为绘制圆弧所在圆上的圆心坐标。`radius`为半径。
  * `startAngle`以及`endAngle`参数用弧度定义了开始以及结束的弧度。
  * `anticlockwise`为一个布尔值。为 true 时，是逆时针方向，否则顺时针方向。
  * `arc()` 函数中表示角的单位是弧度，不是角度。角度与弧度的 js 表达式：`弧度=(Math.PI/180)*角度`





```js
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

		// 绘制三角形
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
    
  	// 绘制笑脸
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // 口 (顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
    ctx.stroke();
  }
}
```



#### 贝塞尔曲线

二次及三次贝塞尔曲线都十分有用，一般用来绘制复杂有规律的图形。

* `quadraticCurveTo(cp1x, cp1y, x, y)` ：绘制二次贝塞尔曲线，`cp1x,cp1y` 为一个控制点，`x,y` 为结束点。
* `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` ：绘制三次贝塞尔曲线，`cp1x,cp1y`为控制点一，`cp2x,cp2y`为控制点二，`x,y`为结束点。



```js
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    //三次贝塞尔曲线绘制心形
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();
  }
}
```



#### 样式

* `fillStyle = color` ：设置图形的填充颜色。默认是 `#000000` 。
  * `color` 可以是表示 CSS 颜色值的字符串，渐变对象或者图案对象。
  * 如果要给每个图形上不同的颜色，你需要重新设置 `fillStyle` 或 `strokeStyle` 的值。
* `strokeStyle = color` ：设置图形轮廓的颜色。
* `globalAlpha` ：这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0（完全透明）到 1.0（完全不透明），默认是 1.0。
* `lineWidth` ：设置当前绘线的粗细。属性值必须为正数。默认值是 1.0。在路径的两边各绘制线宽的一半。
* `lineCap` ：设置线条末端样式。值：`butt`，`round` 和 `square`。默认是 `butt`。
  * `butt` ：与辅助线齐平。
  * `round` ：端点处加上了半径为一半线宽的半圆。
  * `square` ：端点处加上了等宽且高度为一半线宽的方块。
* `lineJoin` ：设定线条与线条间接合处的样式。值：`round`、`bevel` 和 `miter`。默认是 `miter`。、
  * `miter` ：线段会在连接处外侧延伸直至交于一点，延伸效果受到 `miterLimit` 属性的制约。
  * `round` ：边角处被磨圆了，圆的半径等于线宽。
  * `bevel` ：边角处被切掉。
* `miterLimit` ：限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
* `getLineDash()` ：返回一个包含当前虚线样式，长度为非负偶数的数组。
* `setLineDash(segments)` ：设置当前虚线样式。
* `lineDashOffset` ：设置虚线样式的起始偏移量。
* `` ：
* `` ：



```js
// 调色板
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.fillStyle = "orange"
  ctx.fillStyle = "#FFA500"
  ctx.fillStyle = "rgb(255,165,0)"
  ctx.fillStyle = "rgba(255,165,0,1)"

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      ctx.fillStyle = "rgb(" + Math.floor(255 - 42.5 * i) + "," + Math.floor(255 - 42.5 * j) + ",0)"
      ctx.fillRect(j * 25, i * 25, 25, 25)
    }
  }
}
```

```js
// 不同颜色的圆
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      ctx.strokeStyle =
        "rgb(0," +
        Math.floor(255 - 42.5 * i) +
        "," +
        Math.floor(255 - 42.5 * j) +
        ")";
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
      ctx.stroke();
    }
  }
}
```

```js
// lineCap示例，为round时可以有半圆效果
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  var lineCap = ["butt", "round", "square"];

  // 创建路径
  ctx.strokeStyle = "#09f";
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(140, 10);
  ctx.moveTo(10, 140);
  ctx.lineTo(140, 140);
  ctx.stroke();

  // 画线条
  ctx.strokeStyle = "black";
  for (var i = 0; i < lineCap.length; i++) {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap[i];
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
  }
}
```





### Path2D

为了简化代码和提高性能，Path2D对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。









### 开源库

- [EaselJS](https://www.createjs.com/easeljs)：使制作游戏、创作类艺术和其他侧重图形化的项目更容易的开源 canvas 库。
- [Fabric.js](http://fabricjs.com/)：具有 SVG 解析功能的开源 canvas 库。
- [heatmap.js](https://www.patrick-wied.at/static/heatmapjs/)：基于 canvas 的数据热力图的开源库。
- [JavaScript InfoVis Toolkit](https://philogb.github.io/jit/)：创建交互式数据可视化。
- [Konva.js](https://konvajs.org/)：用于桌面端和移动端应用的 2D canvas 库。
- [p5.js](https://p5js.org/)：包含给艺术家、设计师、教育者、初学者使用的完整的 canvas 绘制功能。
- [Paper.js](http://paperjs.org/)：运行于 HTML Canvas 上的开源矢量图形脚本框架。
- [Phaser](https://phaser.io/)：用于基于 Canvas 和 WebGL 的浏览器游戏的快速、自由、有趣的开源框架。
- [Pts.js](https://ptsjs.org/)：用于 canvas 和 SVG 的创意编码和可视化的库。
- [Rekapi](https://github.com/jeremyckahn/rekapi)：用于 Canvas 动画关键帧的 API。
- [Scrawl-canvas](https://scrawl.rikweb.org.uk/)：用于创建和操控 2D canvas 元素的开源 JavaScript 库。
- [ZIM](https://zimjs.com/)：为在 canvas 上进行创意代码编写提供便利性以及相关组件和控件的框架，包括无障碍和数百个色彩缤纷的教程。
- [Sprig](https://github.com/hackclub/sprig)：使用 Canvas 实现的基于图块的游戏的开发库，适合初学者并且开源





`getContext('2d')` 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。











## 示例



### 画直线

步骤：

1. 获取画布
2. 获取画布的上下文
3. 开始一条路径 `beginPath()`
4. 确定起始点 `moveTo(x, y)`
5. 确定结束点 `lineTo(x, y)`
6. 着色 `stroke()`
7. 结束路径 `closePath()`



`strokeStyle` 属性：设置或返回用于笔触的颜色、渐变或模式。颜色值可以是十六进制、颜色名称、rgb()

`lineWidth` 属性：设置或返回线宽。值为数字

`lineCap` 属性：设置或返回线条形状。值可以设置为 round变圆

**需要在着色前设置属性才生效。如果需要绘制不同样式的线条，需要结束前一条再重新绘制**

```js
// 获取 canvas 标签
var canvas = document.getElementById('canvas')
// 获取上下文对象
var context = canvas.getContext('2d')

// 开启一条路径
context.beginPath()
// 确定起始点
context.moveTo(100, 100)
// 到哪去(可以多次调用) / 确定结束点
context.lineTo(200, 200)
context.lineTo(100, 300)

// 可选，设置笔触颜色
context.strokeStyle = '#00FF00'
// 可选，设置线宽
context.lineWidth = 20

// 上色
context.stroke()
// 关闭路径
context.closePath()
```



### 画虚线

* setLineDash(arr) ：在填充线时使用虚线模式，[线段长度, 间距]

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// setLineDash() 在填充线时使用虚线模式，[线段长度, 间距]
context.setLineDash([5, 5])
drawLine(0, 0, 500, 500, 'red')
drawLine(0, 500, 500, 0, 'red')

function drawLine(x1, y1, x2, y2, color) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.strokeStyle = color || '#000'
  context.stroke()
  context.closePath()
}
```



画虚线其实就是画多个直线，并且两个直线之间有相同的间距。

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// drawLine(100, 100, 105, 100, 'red', 2)
// drawLine(110, 100, 115, 100, 'red', 2)
// 由以上得知规律，画虚线只需要给起始位置和结束位置的值递增相同的数值即可

// 直虚线
for(let i = 0; i < 30; i++) {
  drawLine(100+10*i, 100, 105+10*i, 100, 'red', 2)
}

// 斜虚线
for(let i = 0; i < 30; i++) {
  drawLine(100+10*i, 100+10*i, 105+10*i, 105+10*i, 'red', 2)
}

function drawLine(mx, my, lx, ly, color, width) {
  context.beginPath()
  context.moveTo(mx, my)
  context.lineTo(lx, ly)
  context.strokeStyle = color
  context.lineWidth = width
  context.stroke()
  context.closePath()
}
```



### 画矩形

* `rect(x, y, width, height)` ：绘制矩形(即可以填充也可以描边)
  * x ：矩形左上角的 x 坐标
  * y ：矩形左上角的 y 坐标
  * width ：矩形的宽度，以像素计
  * height ：矩形的高度，以像素计
  * **可以多次填充和描边**
* `fillRect(x, y, width, height)` ：绘制实心矩形
  * 会继承之前设置的 `fillStyle` 填充颜色，如果不想要这个，可以先重新设置填充颜色再绘制。默认黑色
* `strokeRect(x, y, width, height)` ：绘制空心矩形
  * 会继承之前设置的 `strokeStyle` 线条颜色，如果不想要这个，可以先重新设置线条颜色再绘制。默认黑色

**`fillRect()` 和 `strokeRect()` 绘制完成就结束了，如果后面有 `fill()` 或者 `stroke()` 也不受影响。**



`fillStyle` 属性：设置或返回填充的颜色。颜色值可以是十六进制、颜色名称、rgb()

`fill()` 方法：填充颜色。所有没有闭合的形状都会自动闭合，不需要再调用 closePath()。

**如果同时需要描边和填充时，先填充再描边**

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// 绘制矩形
context.rect(100, 100, 200, 200)

// 如果同时需要描边和填充时，先填充再描边
// 可选，填充
context.fillStyle = 'green'
context.fill()

// 可选，描边
context.strokeStyle = 'blue'
context.lineWidth = 4
context.stroke()

// 会继承前面设置的填充颜色，如果不想要这个颜色，可以重新设置
context.fillStyle = 'pink'
// 绘制实心矩形
context.fillRect(100, 350, 100, 100)

// 会继承前面设置的线条颜色，如果不想要这个颜色，可以重新设置
context.strokeStyle = 'red'
// 绘制空心矩形
context.strokeRect(250, 350, 100, 100)


// rect() 可以多次填充和描边
context.fill()
context.stroke()
```



![Canvas 矩形](https://www.huangyihui.cn/upload/gburlimg/dc4d894dfaf39.png)



### 画圆

* `arc(x, y, radius, startAngle, endAngle, counterclockwise)` ：使用一个中心点和半径，为一个画布的当前子路径添加一条弧
  * x, y ：描述圆心的坐标
  * radius ：圆形的半径
  * startAngle, endAngle ：沿着圆指定弧的开始点和结束点的一个角度。这个角度用弧度来衡量。沿着X轴正半轴的三点钟方向的角度为0，角度沿着逆时针方向而增加
  * counterclockwise ：弧沿着圆周的逆时针方向(true)，还是顺时针方向(默认false)遍历



![画圆示意图](https://www.huangyihui.cn/upload/gburlimg/9517ee079aeab.png)

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

context.arc(200, 200, 150, 0, 2*Math.PI)      // 全圆
context.arc(200, 200, 150, 0, Math.PI, true)  // 半圆，而且是逆时针画
context.arc(200, 200, 150, 0.5*Math.PI, Math.PI)  // 1/4圆弧，从6点方向画到9点方向
context.stroke()
```

注意的是，arc()可以连续调用，但是会在**上一次弧的结束点和新的弧的开始点**之间绘制一条直线。

如果不需要两点之间的直线，可以使用 `beginPath()` 开启新的路径。

```js
context.arc(200, 200, 150, 0, Math.PI, true)
context.stroke()      // 在开始新路径后，绘制已设置的图案

context.beginPath()   // 开始新的路径，之前已经设置但未绘制的图案将被取消
context.arc(200, 200, 150, 0, Math.PI, false)
context.stroke()
```



画圆也可以填充和描边，注意的是，要先填充再描边

```js
context.arc(200, 200, 150, 0, 2*Math.PI)
context.fillStyle = 'gold'
context.fill()
context.lineWidth = 5
context.strokeStyle = 'red'
context.stroke()
```





### 画文字

* `fillText(text, x, y, maxWidth)` ：绘制**填色**(实心)的文本，默认黑色。默认是在坐标点的**右上方**绘制
  * text : 绘制的文本
  * x y : 开始绘制文本的x坐标、y坐标(相对于画布)
  * maxWidth : 可选，允许的最大文本宽度(像素)。当文字过大时往往会超出画布大小，设置该值后当文字绘制宽度过大时，会压缩文字宽度为maxWidth。绘制文字宽度小于maxWidth时，也**不会拉伸文字宽度**
* `strokeText(text, x, y, maxWidth)` ：绘制**描边**(空心)的文本，默认黑色
* `font` 属性：设置或返回画布上下文内容的当前字体属性。语法和 CSS font 属性相同
  * `context.font = 'italic small-caps bold 12px arial'`
  * `context.font = '字体样式 字体变形 字体粗细 字号/行高 字体'`
  * **font-weight 字体粗细**
  * **font-size / line-height 规定字号和行高**
  * **font-family 规定字体**
  * font-style 规定字体样式：normal、italic、oblique
  * font-variant 规定字体变形：normal、small-caps
  * 默认值 `10px sans-serif`
* `textAlign` 属性：根据锚点，设置或返回文本内容的当前水平对齐方式
  * 默认文本在描点的右上角(左对齐 start/left)，左上角(右对齐 end/right)，**正上方(center)**
* `textBaseline` 属性：设置或返回在绘制文本时的当前文本基线。
  * 默认在基线正上方(alphabetic)，正上方(bottom有间距)，**(正中(middle)**，正下方(hanging)，正下方(top有间距)



![textAlign](https://www.huangyihui.cn/upload/gburlimg/ab9d0b35ed468.png)

![textBaseline](https://www.huangyihui.cn/upload/gburlimg/15e81721c95be.png)

```js
// 设置字体属性
context.font = '100px 微软雅黑'
context.fillStyle = 'gold'
context.fillText('Hello', 250, 250)   // 绘制填充(实心)文字
context.fillText('Hello123', 250, 500, 250)  // 文字最大宽度

context.strokeStyle = 'red'
context.strokeText('Hello', 0, 250)   // 绘制描边(空心)文字
```

```js
context.font = '20px 微软雅黑'
context.textAlign = 'center'    // 水平对齐方式
context.textBaseline = 'middle'	// 垂直对齐方式
context.fillText('Hello', 250, 250)
```





### 画图片

* `drawImage(img, x, y)` ：绘制图片
* `drawImage(img, x, y, width, height)` ：绘制图片，并规定图片的宽度和高度
* `drawImage(img, sx, sy, swidth, sheight, x, y, width, height)` ：剪切图片，并在画布上绘制被剪切的部分
  * img : 规定要使用的图像、画布或视频
  * sx sy : 可选，开始剪切的 x 坐标和 y 坐标
  * swidth sheight : 可选，被剪切图像的宽度和高度
  * x y : 在画布上放置图像的 x 坐标和 y 坐标
  * width height : 可选，要使用的图像的宽度和高度(伸展或缩小图像)

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var img = new Image()
img.src = 'pic.jpeg'
img.onload = function () {
  // 图片原始宽高
  // console.log(img.width, img.height)

  // 绘制图片
  // context.drawImage(img, 0, 0)
  // context.drawImage(img, 0, 0, 250, 250)

  context.drawImage(img, 130, 210, 140, 70, 100, 150, 280, 140)
}
```



### 画图片-像素点

* `getImageData(x, y, width, height)` ：返回 `ImageData` 对象，该对象拷贝了画布指定矩形的像素信息。
  * x y : 开始复制的左上角位置的 x 坐标和 y 坐标
  * width height ：要复制的矩形区域大小
* `putImageData(imgData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)` ：绘制像素信息
  * imgData ：规定要放回画布的 ImageData 对象
  * dx dy ：源图像数据在目标画布中绘制时的位置偏移量（x 坐标 和 y坐标）。
  * dirtyX dirtyY ：可选，在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角。**会影响绘制时的位置**
  * dirtyWidth dirtyHeight ：可选，在源图像数据中，矩形区域的宽高。默认是图像数据的宽高。**当该值大于(获取到的像素信息宽高-源图像偏移量)时，就没有东西可绘制了**
  * 注意：4个可选参数要不都不写，要么都要写。如果在 `getImageData` 设置了宽高属性，并且 `putImageData` 绘制时也设置了源图像的宽高，就会根据获取到的像素点宽高进行对应修改
* `ImageData对象` ：该对象中的每个像素，都存着4方面的信息，即 RGBA 值。它们以数组格式存在与对象的data属性中。
  * R - 红色(0-255)  G - 绿色(0-255)  B - 蓝色(0-255)
  * A - alpha通道(0-255)。0是透明的，255是完全可见的



```js
context.fillStyle = '#f00'
context.fillRect(0, 0, 100, 100)

var imgData = context.getImageData(0, 0, 10, 10)
console.log(imgData)
```

```js
var img = new Image()
img.src = 'pic.jpeg'
img.onload = function() {
  context.drawImage(img, 0, 0)
  var imgData = context.getImageData(0, 0, 200, 200)
  context.putImageData(imgData, 400, 400)
  
  // 在画布(400, 400)的位置绘制
  // imgData对象的(100, 100)位置为左上角(截取点)
  // 在imgDate截取点截取的大小(100, 100)
  // context.putImageData(imgData, 400, 400, 100, 100, 100, 100)
}
```

![像素点](https://www.huangyihui.cn/upload/gburlimg/a87d3d841334.png)







### 渐变效果

* `createLinearGradient(x0, y0, x1, y1)` : 创建线性的渐变对象。渐变可用于填充矩形、圆形、线条、文本等。**使用该对象作为 `strokeStyle` 或者 `fillStyle` 属性的值**
  * x0 y0 ：渐变开始点的 x 坐标和 y 坐标
  * x1 y1 ：渐变结束点的 x 坐标和 y 坐标
* `渐变对象.addColorStop(point, color)` ： 规定不同的颜色，以及在 `gradient` 对象中的何处定位颜色。
  * point ：位置点，字符串(值从0到1)
  * color : 颜色

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// 创建渐变对象
var gradient = context.createLinearGradient(0, 0, 500, 0)
// 设置渐变点和颜色，可以有多个点、不同颜色
gradient.addColorStop('0', 'yellow')
gradient.addColorStop('0.5', 'blue')
gradient.addColorStop('1', 'red')
context.fillStyle = gradient
context.fillRect(0, 0, 500, 200)

context.font = '100px 宋体'
context.strokeStyle = gradient
context.strokeText('今天天气好好，出去happy', 0, 400, 500)
```

![image-20220228220522428](https://www.huangyihui.cn/upload/gburlimg/2e91f348f8377.png)





### 清除画布

* `clearRect(x, y, width, height)` ：清除画布
  * x ：矩形左上角的 x 坐标
  * y ：矩形左上角的 y 坐标
  * width ：矩形的宽度，以像素计
  * height ：矩形的高度，以像素计

```js
context.clearRect(200, 200, 100, 100)
```



### 中心点

* `translate(x, y)` ：平移中心点到指定锚点

```js
context.translate(w/2, h/2)		// 中心点移到画布中心
```





## WebGL API

文档：https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API



## 解决方案

### vscode 中没有 Canvas 智能提示

```js
/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('canvas')
var c = canvas.getContext('2d')
```

在获取 canvas dom 对象前一行加入一串代码，提示 vscode 接下来使用的 dom 对象类型。







## 案例

### 动态百分比圆形

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// 从12点方向开始的圆形
var deg = Math.PI * 2 / 360
var count = 0
var timer = setInterval(() => {
  count++
  context.beginPath()
  context.arc(250, 250, 200, -Math.PI/2, count*deg-Math.PI/2, false)
  context.stroke()
  if(count == 360) {
    clearInterval(timer)
  }
}, 10);
```



### 小球碰撞检测

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// 画布大小
var w = 500
var h = 500

// 小球类
function Ball() {
  this.x = r(5) + 60
  this.y = r(3) + 60
  this.r = r(30) + 10     // [10, 40]之间
  this.color = `rgb(${r(256)},${r(256)},${r(256)})`
  // 小球横向和纵向运动速度，只要两个运动速度不同，就会折线运动
  this.xSpeed = r(8) + 1
  this.ySpeed = r(8) + 2
}
// 小球显示
Ball.prototype.show = function() {
  this.run()  // 更新坐标
  context.beginPath()
  context.arc(this.x, this.y, this.r, 0, Math.PI*2)
  context.fillStyle = this.color
  context.fill()
}
// 小球运动和碰撞检测
Ball.prototype.run = function() {
  if(this.x-this.r<=0 || this.x+this.r>=w) {
    this.xSpeed = -this.xSpeed
  }
  if(this.y-this.r<=0 || this.y+this.r>=h) {
    this.ySpeed = -this.ySpeed
  }
  this.x+=this.xSpeed
  this.y+=this.ySpeed
}

// 随机数
function r(num) {
  return parseInt(Math.random() * num)
}

// 存放小球的数组
var ballArr = []

for(var i = 0; i < 10; i++) {
  var ball = new Ball()
  ballArr.push(ball)
  ball.show()
}

// 小球运动
setInterval(() => {
  context.clearRect(0, 0, w, h)
  for(var i = 0; i < ballArr.length; i++) {
    var ball = ballArr[i]
    ball.show()
  }
}, 10);
```









































































































