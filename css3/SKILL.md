# 技巧

## 让文字水平+垂直居中对齐

要点：设置行高==容器的高度，即可垂直对齐

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background: gray;
    text-align: center;
    line-height: 100px;
  }
</style>

<body>
  <div>hello</div>
</body>
```



## 对齐问题

### 居中对齐

要点：设置左右外边距为auto，元素最好有设置width。`margin:0 auto;`

前提：元素是块元素，如果不是，可通过样式设置`display:block;`

```html
<style>
  div {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    background: gray;
  }
</style>

<body>
  <div>hello</div>
</body>
```



### 不同分辨率下的水平垂直居中

```css
.box {
  width: 100px;
  height: 100px;
  background-color: #FF0000;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);	/* 百分比是根据自身大小算的 100px*50%  */
}
```



### 水平垂直居中弹框

基于 vertical-align 属性的水平垂直居中弹框：

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
  background-color: rgba(0, 0, 0, .5);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}

.container::after {
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
  background-color: #fff;
  width: 200px;
  height: 200px;
}
</style>
```



### 绝对定位+margin auto+元素宽高



## CSS 样式重置

为了消除浏览器中的默认样式，我们可以用以下方式进行重置CSS。



### normalize.css

[文档地址](https://www.npmjs.com/package/normalize.css)

1、安装依赖

```sh
npm i normalize.css -S
```

2、使用

```js
import 'normalize.css/normalize.css'
```



### 自定义样式

```css
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
html, body {
  height: 100%;
}
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}
```





## 图片的大小设置

正常来说，控制图片大小用width和height属性即可。

但是，我们可以使用百分比控制图片宽高，让图片随着浏览器窗口的大小变化。

```css
img{ width: 50%; height: 50%;}
```

也可以单独控制图片的宽度/高度，让图片的大小随着自动变化。

```css
img{ width: 400px;}
```





## Logo图片优化

* Logo图片尽量小
* 一般情况下是作为背景插入的
* 加h1标签，提权
* 搜素引擎对文本链接最友好
* 一定给a标签添加title属性，提高用户体验
* 隐藏a标签中的字用text-indent

```html
<style>
  *{
    margin: 0;
    padding: 0;
  }
  #header{
    position:relative;
    height: 186px;
  }
  #logo{
    text-indent:-999px;
    position:absolute;
    left: 0;
  }
  .logoimg{
    display: block;
    width: 460px;
    height: 186px;
    background-image: url("Sport\ W205.png");
    background-repeat: no-repeat;
  }
  #content{
    width: 100px;
    height: 100px;
    background-color: red;
    position: relative;
    top: 10px;
    left: 500px;
  }
</style>

<body>
  <div id="header">
    <div id="logo">
      <h1><a href="#" title="logo" class="logoimg">LOGO</a></h1>
    </div>
    <div id="content">
      <p>购车</p>
    </div>
  </div>
</body>
```





## border属性设置小三角

`border-width` 属性指定小三角的大小。

`border-color` 用于将内容转换为小三角(箭头)。我们将上边框设置为黑色，其余设置为透明。如果所有面都是黑色，则最终将得到一个黑色的方形框。

```html
<style>
  /* 小三角 */
  .arrow {
    border-style: solid;
    border-width: 10px;
    border-color:black transparent transparent transparent;
    width: 0;
    height: 0;
  }
</style>
```

```html
<style>
  /* 旋转小三角 */
  .arrow {
    border-style: solid dashed dashed dashed;
    border-width: 10px;
    border-color:black transparent transparent transparent;
    width: 0;
    height: 0;
    display: inline-block;
    transition: transform 1s linear;
  }
  .arrow:hover {
    transform: rotate(180deg);
  }
</style>
```





## 分页



```html
<style>
  .pagination { display: inline-block;}

  .pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border: 1px solid #ddd;
  }

  .pagination a.active {
    background-color: #4CAF50;
    color: white;
  }

  .pagination a:hover:not(.active) {background-color: #ddd;}
</style>

<body>
  <div class="pagination">
    <a href="#">«</a>
    <a href="#" class="active">1</a>
    <a href="#">2</a>
    <a href="#">3</a>
    <a href="#">4</a>
    <a href="#">5</a>
    <a href="#">6</a>
    <a href="#">»</a>
  </div>
</body>
```



## 表格边框

```css
table{ border-collapse: collapse; }  /* 表格的细线边框 */
```





## rem

使用 rem 单位可以实现响应式效果。它是相对于根元素的字体大小。

只要在不同的设备宽度中设置根元素的字体大小，就可以控制整个页面的显示效果。

* 通过 `window.innerWidth` 获取视口宽度

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>rem</title>
  <script>
    // 计算根元素的字体大小
    document.documentElement.style.fontSize = window.innerWidth / 750 * 100 + 'px'
  </script>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    html {
      /* 通常会将值设置为100，方便换算 */
      font-size: 100px;
    }
    div {
      /* 也就是100*7.5 = 750px */
      width: 7.5rem;
      height: 1rem;
      background-color: red;
    }
  </style>
</head>
<body>
  <div></div>
</body>
</html>
```



```
window.innerWidth / 750 * 100 + 'px'
视口宽度 / 设计稿宽度 * 设置的换算比例(html的fontsize)

例如：iphone6的视口宽度 375 /  设计稿宽度 750 * 根元素fontSize 100
rem = 375/750*100 = 50px
设计稿换算的div宽度是7.5rem，则50*7.5rem = 375px
```







## 移动端1px问题

参考1：https://www.cnblogs.com/lunarorbitx/p/5287309.html

参考2：https://www.cnblogs.com/2050/p/3877280.html



## 绝对定位下的宽度问题

由于子元素设置绝对定位脱离文档流后，最大宽度受限于父元素宽度，可以通过设置`white-space: nowrap`来强制子元素变为一行。





## 去除select的三角

```css
select {
  width: 360px;
  height: 65px;
  font-size: 26px;
  color: #666;
  background: #fff;
  /*去掉边框*/
  border: 0;
  /*去掉点击时的外发光*/
  outline: none;
  /*以下三行是去掉select自带的小箭头*/
  appearance: none;
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari 和 Chrome */
}
```



## 移动端line-height不居中

可以在div内部添加一个span标签，并使用flex实现居中

```css
.agree_btn {
  height: 30px;
  width: 100px;
  background-color: #1fc2af;
  text-align: center;
  color: #fff;
  margin: 30px auto 0;
  span {
    display: flex;
    width: 100px;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
  }
}
```



## 任意高度元素的展开收起动画

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





## 深色模式

```css
@media screen and (prefers-color-scheme: dark) {
	body {
		background-color: #202124;
		color: #eee;
	}
}
```



## font-family设置方案

```css
@font-face {
	font-family: Emoji;
	src: local("Apple Color Emoji"),
		local("Segoe UI Emoji"),
		local("Segoe UI Symbol"),
		local("Noto Color Emoji");
}
body {
	font-family: system-ui, -apple-system, Segoe UI, Rototo, Helvetica, Arial, sans-serif, Emoji;
}
```





## 动画效果

### 语音输入效果

```html
<div>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>

<style>
div {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 2em;
}

span {
  width: 0.3em;
  height: 1em;
  background-color: #3cefff;
}

span:nth-of-type(1) {
  animation: grow 1s -0.45s ease-in-out infinite;
}

span:nth-of-type(2) {
  animation: grow 1s -0.3s ease-in-out infinite;
}

span:nth-of-type(3) {
  animation: grow 1s -0.15s ease-in-out infinite;
}

span:nth-of-type(4) {
  animation: grow 1s ease-in-out infinite;
}

@keyframes grow {

  0%,
  100% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(2);
  }
}
</style>
```



