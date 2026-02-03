# Demo



## 资源网站

* [自定义优惠券效果](https://coupon.codelabo.cn/)
* [开源免费UI素材](https://uiverse.io/)
* [500 多个纯 CSS 实现的 Loading 效果](https://css-loaders.com/) 
* [45个值得收藏的 CSS 形状](https://blog.itpub.net/1762/viewspace-2822689/) 
* [10个CSS在线生产力工具](https://cloud.tencent.com/developer/article/2218812) 
* [10个适合Web开发的最佳 CSS 生成器工具](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649133306&idx=1&sn=9d08fb9493ecbdb8e17692c2f3a61a90&chksm=be58b757892f3e413ccdee76f4374162b7bb1f74aa2062c7d267cc0ec44b90e4fb835855d95f&scene=27) 
* [12 个非常棒的CSS形状生成器](https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/124642177) 
* [CSS 实现Chrome标签栏](https://www.jb51.net/css/784321.html) 



## 截断文本(省略号)

```html
<div>
  白日依山尽，黄河入海流。欲穷千里目，更上一层楼
</div>
```



### 单行

```css
div {
	text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 200px;
  word-break: break-all;
}
```



### 多行

还可以使用 `-webkit-line-clamp` 属性将文本截断为特定的行数。文本将在截断的地方会显示省略号：

```css
div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 200px;
  overflow: hidden;
  word-break: break-all;
}
```



## flex: 1 省略号无效

在 CSS 中，`flex: 1; width: 0;` 是一种常见的布局技巧，主要用于 **控制 Flex 子项的尺寸分配**，特别是在 **文本溢出（ellipsis）** 或 **等分布局** 时非常有用。

在 `flex:1` 的盒子中，设置 `overflow: hidden;` 或 `width: 0;` 即可。

```scss
.box {
	display: flex;
}

.son {
	flex: 1;
	overflow: hidden;
	// width: 0;
  // min-width: 0; // 现代浏览器更推荐使用
}
```



## input 选择文件

```scss
.upload-file {
  position: relative;
  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
```



## input 修改 placeholder 颜色

```css
input {
  color: red;
}
input::-webkit-input-placeholder {
  color: blue;
}
input:-moz-placeholder {
  /* FF 4-18 */
  color: blue;
}
input::-moz-placeholder {
  /* FF 19+ */
  color: blue;
}
input:-ms-input-placeholder {
  /* IE 10+ */
  color: blue;
}
```



## 圆弧背景

```html
<div class="box"></div>

<style>
.box {
  position: relative;
}

/* 关键点：设置较大的宽度和圆角，并偏移位置 */
.box::after {
  content: '';
  width: 140%;
  height: 100%;
  background: red;
  border-radius: 0 0 50% 50%;
  position: absolute;
  left: -20%;
  top: 0;
  z-index: -1;
}
</style>
```



## 圆点数字标记

```css
.badge {
  min-width: 40px;
  line-height: 40px;
  text-align: center;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #FA5050;
  color: #fff;
  font-size: 22px;
  position: absolute;
  top: -10px;
  right: 40px;
}
```



## 渐变

### 渐变文字

```css
.text {
  background-image: linear-gradient(to right, red, #578aef);
  color: transparent;
  -webkit-background-clip: text;
}
```



### 渐变边框

```css
.box {
  border: 5px solid transparent;
  border-radius: 10px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #fff, #fff), linear-gradient(to right, red, #578aef);
}
```



### 圆形渐变边框

```html
<div class="box gradient-border">炫酷渐变边框</div>
```

```css
.gradient-border {
  border: solid 5px transparent;
  border-radius: 10px;
  background-image: linear-gradient(white, white),
    linear-gradient(315deg, #833ab4, #fd1d1d 50%, #fcb045);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.box {
  width: 350px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 100px auto;
}
```



### 图片炫彩阴影

```html
<div class="box">
  <img class="img" src="../assets/imgs/1.jpg" alt="">
</div>
```

```css
.box {
  width: 300px;
  height: 300px;
  position: relative;
}

.box .img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.box::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  left: 10px;
  top: 20px;
  background-image: conic-gradient(navy, purple, pink, purple, navy);
  border-radius: 20px;
  filter: blur(20px);
}
```



## 加载中...效果

```css
/* 定义动画：循环切换点点的数量 */
@keyframes dot-animation {
  0% {
    content: '';
  }

  33% {
    content: '.';
  }

  66% {
    content: '..';
  }

  100% {
    content: '...';
  }
}

.text::after {
  content: '';
  animation: dot-animation 2s infinite step-start;
}
```



## 打字效果

```html
<div class="wrapper">
  <div class="typing-demo">有趣且实用的 CSS 小技巧</div>
</div>
```

```css
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.typing-demo {
  width: 22ch;
  animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  font-family: monospace;
  font-size: 2em;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
```



js 方式：

```vue
<template>
  <div>
    <span id="text"></span>
  </div>
</template>

<script>
export default {
  mounted() {
    const text = "我是打手机电话卡蝴蝶卡时空对话"
    const el = document.getElementById('text')
    function showText(index) {
      if (index < text.length) {
        const char = text.charAt(index)
        el.innerHTML += char
        index++
        setTimeout(() => {
          showText(index)
        }, 200);
      }
    }

    showText(0)
  }
}
</script>
```





## 透明图片设置阴影

当使用透明图像时，可以使用 drop-shadow() 函数在图像上创建阴影，而不是使用 box shadow 属性在元素的整个框后面创建矩形阴影：

```html
<div class="wrapper">
  <div class="mr-2">
    <div class="mb-1 text-center">
      box-shadow
    </div>
    
    <img class="box-shadow" src="https://markodenic.com/man_working.png" alt="Image with box-shadow">
  </div>
    
  <div>
    <div class="mb-1 text-center">
      drop-shadow
    </div>
    
    <img class="drop-shadow" src="https://markodenic.com/man_working.png" alt="Image with drop-shadow">
  </div>
</div>
```

```css
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mr-2 {
  margin-right: 2em;
}

.mb-1 {
  margin-bottom: 1em;
}

.text-center {
  text-align: center;
}

.box-shadow {
  box-shadow: 2px 4px 8px #585858;
}

.drop-shadow {
  filter: drop-shadow(2px 4px 8px #585858);
}
```









## 图像填充文字效果

要想实现图像填充文字效果，可以设置 `background-clip: text` 以使文字背景作为整个区域的背景，文字之外的区域将被裁掉。配合透明的文字颜色，就可以实现图像填充文字效果了：

```css
h1 {
  background-image: url('./flower.jpg');
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-color: white;
}
```

![640](http://qiniu.huangyihui.cn/doc/202511250109209.png)



## 文字描边效果

```css
h1 {
  color: #fff;
  font-size: 80px;
  /* 宽度 文字描边的颜色 */
  -webkit-text-stroke: 2px crimson; 
  text-stroke: 2px crimson;
}
```

![640 (1)](http://qiniu.huangyihui.cn/doc/202511250109281.png)

## 文本强调效果

```css
h1 {
  text-emphasis: "⭐️";
}
```

![640 (3)](http://qiniu.huangyihui.cn/doc/202511250109874.png)

## 扩大点击范围

```css
.btn-text {
  position: relative;
}
/* 比 padding 副作用小 */
.btn-text::before {
  content: '';
  position: absolute;
  top: -6px;
  left: -8px;
  right: -8px;
  bottom: -6px;
}
```



## 虚线框

```html
<style>
  .dotted-line {
    width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px dashed transparent;
    background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-45deg, red 0, #ccc 0.25em, white 0, white 0.75em);
  }
</style>

<p class="dotted-line">庭院深深，不知有多深？杨柳依依，飞扬起片片烟雾，一重重帘幕不知有多少层></p>
```





## 毛玻璃

```css
.login {
  backdrop-filter: blur(5px);
}
```

![640 (2)](http://qiniu.huangyihui.cn/doc/202511250109093.png)



## 悬停缩放效果

```css
.img-container {
  height: 250px;
  width: 250px;
  overflow: hidden;
}

.img-container img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 200m ease-in;
}

img:hover {
  transform: scale(1.2);
}
```

![640](http://qiniu.huangyihui.cn/doc/202511250109034.png)



## 纵横比

我们可以通过CSS中的纵横比来实现一个正方形，这样只需要设置一个宽度即可：

```css
.square {
  background: #8A2BE2;
  width: 25rem;
  aspect-ratio: 1/1;
}
```



`aspect-ratio` 媒体属性可以用来测试视口的宽高比。这里通过媒体查询在页面视口不同纵横比时，显示不同的背景颜色。

```css
/* 最小宽高比 */
@media (min-aspect-ratio: 8/5) {
  div {
    background: #9af; /* blue */
  }
}

/* 最大宽高比 */
@media (max-aspect-ratio: 3/2) {
  div {
    background: #9ff;  /* cyan */
  }
}

/* 明确的宽高比, 放在最下部防止同时满足条件时的覆盖*/
@media (aspect-ratio: 1/1) {
  div {
    background: #f9a; /* red */
  }
}
```



## 网页变灰

* grayscale(数值/百分数) : 对图片进行灰度转换。数值越大灰度最大。最高为1 。

```css
html.gray-mode {
	filter: grayscale(100%);
}
```



```css
/* 兼容不同浏览器 */
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  -webkit-filter: gray;
  filter: gray;
  -webkit-filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
  filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
}
```





## tooltip 工具提示

可以使用 CSS 函数 `attr()` 来创建动态的纯 CSS 工具提示 。

```html
<h1>HTML/CSS tooltip</h1>
<p>
  Hover <span class="tooltip" data-tooltip="Tooltip Content">Here</span> to
  see the tooltip.
</p>
<p>
  You can also hover
  <span class="tooltip" data-tooltip="This is another Tooltip Content"
    >here</span
  >
  to see another example.
</p>
```

```css
.tooltip {
  position: relative;
  border-bottom: 1px dotted black;
}

.tooltip:before {
  content: attr(data-tooltip);
  position: absolute;
  width: 100px;
  background-color: #062b45;
  color: #fff;
  text-align: center;
  padding: 10px;
  line-height: 1.2;
  border-radius: 6px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.6s;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  font-size: 0.75em;
  visibility: hidden;
}

.tooltip:after {
  content: "";
  position: absolute;
  bottom: 75%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  opacity: 0;
  transition: opacity 0.6s;
  border-color: #062b45 transparent transparent transparent;
  visibility: hidden;
}

.tooltip:hover:before,
.tooltip:hover:after {
  opacity: 1;
  visibility: visible;
}
```





## 模态框

我们可以使用 CSS 中的 `:target` 伪元素来创建一个模态框。

```html
<div class="wrapper">
  <a href="#demo-modal">Open Modal</a>
</div>

<div id="demo-modal" class="modal">
  <div class="modal__content">
    <h1>CSS Modal</h1>
    <p>hello world</p>
    <a href="#" class="modal__close">&times;</a>
  </div>
</div>
```

```css
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #834d9b, #d04ed6);
}

.wrapper a {
  display: inline-block;
  text-decoration: none;
  padding: 15px;
  background-color: #fff;
  border-radius: 3px;
  text-transform: uppercase;
  color: #585858;
  font-family: "Roboto", sans-serif;
}

.modal {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, 0.7);
  transition: all 0.4s;
}

.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__content {
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 90%;
  background: #fff;
  padding: 1em 2em;
}

.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}
```





## 自定义选中样式

CSS 伪元素 `::selection`，可以用来自定义用户选中文档的高亮样式。

```html
<div class="wrapper">
  <div>
    <p>默认高亮</p>
    <p class="custom-highlighting">自定义高亮</p>
  </div>
</div>
```

```css
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 2rem;
  font-family: sans-serif;
}

.custom-highlighting::selection {
  background-color: #8e44ad;
  color: #fff;
}
```



## 自定义滚动条

* 整体部分：`::-webkit-scrollbar`
* 两端按钮：`::-webkit-scrollbar-button`
* 外层轨道：`::-webkit-scrollbar-track`
* 内层轨道：`::-webkit-scrollbar-track-piece`
* 滚动滑块：`::-webkit-scrollbar-thumb`
* 边角：`::-webkit-scrollbar-corner`



```css
/* 滚动条宽度 */
::-webkit-scrollbar {
  width: 8px;
	height: 8px;
}

/* 滚动条背景轨道 */
::-webkit-scrollbar-track {
  border-radius: 6px;
  background-color: #ddd;
}

/* 拖动条 */
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: rgba(0,0,0,.3);
}
```





```html
<div class="wrapper">
  <div>
    <div class="tile mr-1">
      <div class="tile-content">默认滚动条</div>
    </div>

    <div class="tile tile-custom-scrollbar">
      <div class="tile-content">自定义滚动条</div>
    </div>
  </div>
</div>
```

```css
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mr-1 {
  margin-right: 1em;
}

.tile {
  overflow: auto;
  display: inline-block;
  background-color: #ccc;
  height: 200px;
  width: 180px;
}

/* 滚动条 */
.tile-custom-scrollbar::-webkit-scrollbar {
  width: 12px;
  background-color: #eff1f5;
}

/* 滚动条轨道 */
.tile-custom-scrollbar::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: transparent;
}

/* 滚动条手柄 */
.tile-custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #515769;
  border: 2px solid #eff1f5;
}

.tile-content {
  padding: 20px;
  height: 500px;
}
```



## 九宫格

### Flex 实现

```html
<div class="box">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
  height: 600px;
}

.box div {
  width: 30%;
  height: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
  border-radius: 20px;
  background: #3476ff;
}

.box div:nth-of-type(3n) {
  margin-right: 0;
}

.box div:nth-of-type(n + 7) {
  margin-bottom: 0;
}
```



### Grid 实现

```css
.box {
  display: grid;
  grid-template-columns: 30% 30% 30%; 
  grid-template-rows: 30% 30% 30%; 
  grid-gap: 5%; 
}
```



### 九宫格图片自适应

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>微信朋友圈图片九宫格排版自适应（改编版）</title>
    <style>
      .pictures-adaptive {
        display: flex;
        flex-wrap: wrap;
      }

      .wrap {
        position: relative;
        overflow: hidden;
        margin-bottom: 2%;
      }

      /*  3张图片  */
      .wrap:nth-child(1):nth-last-child(3),
      .wrap:nth-child(2):nth-last-child(2),
      .wrap:nth-child(3):nth-last-child(1) {
        width: 32%;
        padding-bottom: 32%;
      }

      /*  间隔  */
      .wrap:nth-child(2):nth-last-child(2),
      .wrap:nth-child(3):nth-last-child(1) {
        margin-left: 2%;
      }

      .wrap:not(:nth-child(1):nth-last-child(1)) img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /*  2张图片  */
      .wrap:nth-child(1):nth-last-child(2),
    .wrap:nth-child(2):nth-last-child(1),
    /*  4张图片  */
    .wrap:nth-child(1):nth-last-child(4),
    .wrap:nth-child(2):nth-last-child(3),
    .wrap:nth-child(3):nth-last-child(2),
    .wrap:nth-child(4):nth-last-child(1) {
        width: 49%;
        padding-bottom: 49%;
      }

      /* 每行的两张图片中间间隔2%的宽度 */
      /*  2张图片  */
      .wrap:nth-child(2):nth-last-child(1),
    /*  4张图片  */
    .wrap:nth-child(2):nth-last-child(3),
    .wrap:nth-child(4):nth-last-child(1) {
        margin-left: 2%;
      }

      /*  5张以上图片  */
      .wrap:nth-child(n + 5),
      .wrap:nth-child(1):nth-last-child(n + 5),
      .wrap:nth-child(1):nth-last-child(n + 5) ~ .wrap {
        width: 32%;
        padding-bottom: 32%;
      }

      .wrap:nth-child(n + 5):not(:nth-child(3n + 1)),
      .wrap:nth-child(1):nth-last-child(n + 5) ~ .wrap:not(:nth-child(3n + 1)) {
        margin-left: 2%;
      }
    </style>
  </head>
  <body>
    <div class="pictures-adaptive">
      <div class="wrap">
        <img
          src="data:image/jpeg;base64,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" />
        <!-- More imgs -->
      </div>
    </div>
  </body>
</html>
```



## 骰子布局

### Flex 实现

```html
<div class="dice-box">
  <div class="dice first-face">
    <span class="dot"></span>
  </div>
  <div class="dice second-face">
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="dice third-face">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="dice fourth-face">
    <div class="column">
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div class="column">
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  <div class="fifth-face dice">
    <div class="column">
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div class="column">
      <span class="dot"></span>
    </div>
    <div class="column">
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  <div class="dice sixth-face">
    <div class="column">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div class="column">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
</div>
```

```scss
.dice {
  width: 200px;
  height: 200px;
  padding: 20px;
  background-color: tomato;
  border-radius: 10%;
}

.dot {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
}

.first-face {
  display: flex;
  justify-content: center;
  align-items: center;
}

.second-face {
  display: flex;
  justify-content: space-between;

  .dot:nth-of-type(2) {
    align-self: flex-end;
  }
}

.third-face {
  display: flex;
  justify-content: space-between;
  .dot:nth-of-type(1) {
    align-self: flex-end;
  }
  .dot:nth-of-type(2) {
    align-self: center;
  }
}

.fourth-face {
  display: flex;
  justify-content: space-between;
  .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.fifth-face {
  display: flex;
  justify-content: space-between;
  .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .column:nth-of-type(2) {
    justify-content: center;
  }
}

.sixth-face {
  display: flex;
  justify-content: space-between;
  .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
```



### Grid 实现

```html
<div class="dice-box">
  <div class="dice first-face">
    <span class="dot"></span>
  </div>
  <div class="dice second-face">
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="dice third-face">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="dice fourth-face">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="fifth-face dice">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="dice sixth-face">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</div>
```

```scss
.dice {
  width: 200px;
  height: 200px;
  padding: 20px;
  background-color: tomato;
  border-radius: 10%;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";
}

.dot {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
}

.dot:nth-child(2) {
  grid-area: b;
}

.dot:nth-child(3) {
  grid-area: c;
}

.dot:nth-child(4) {
  grid-area: d;
}

.dot:nth-child(5) {
  grid-area: e;
}

.dot:nth-child(6) {
  grid-area: f;
}

.dot:nth-child(odd):last-child {
  grid-area: g;
}
```



### 3D 旋转效果

```html
<div class="dice-box">
  <div class="dice first-face">
    <span class="dot"></span>
  </div>
  <div class="dice second-face">
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="dice third-face">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="dice fourth-face">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="fifth-face dice">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="dice sixth-face">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</div>
```

```scss
.dice-box {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(185deg) rotateX(150deg) rotateZ(315deg);
  animation: rotate 5s linear infinite;
}

.dice {
  width: 200px;
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
  background-color: tomato;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";
  opacity: 0.7;
  position: absolute;
}

.dot {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
}

.dot:nth-child(2) {
  grid-area: b;
}

.dot:nth-child(3) {
  grid-area: c;
}

.dot:nth-child(4) {
  grid-area: d;
}

.dot:nth-child(5) {
  grid-area: e;
}

.dot:nth-child(6) {
  grid-area: f;
}

.dot:nth-child(odd):last-child {
  grid-area: g;
}

// 调整六个面的位置
.first-face {
  transform: translateZ(100px);
}
.second-face {
  transform: translateX(-100px) rotateY(-90deg);
}
.fourth-face {
  transform: translateY(-100px) rotateX(90deg);
}
.third-face {
  transform: translateY(100px) rotateX(90deg);
}
.fifth-face {
  transform: translateX(100px) rotateY(90deg);
}
.sixth-face {
  transform: translateZ(-100px);
}

@keyframes rotate {
  from {
    transform: rotateY(0) rotateX(45deg) rotateZ(45deg);
  }
  to {
    transform: rotateY(360deg) rotateX(45deg) rotateZ(45deg);
  }
}
```





## 布局

### 固定宽度，左右自适应

```html
<div class="wrapper">
  <div class="content"></div>
</div>
```

```css
.wrapper {
  background-color: gray;
}

.content {
  width: 1200px;
  height: 60px;
  background-color: green;
  margin: 0 auto;
}
```



### 图片瀑布流

核心：通过 `column-count  ` 将一个元素的内容分成指定数量的列。

```html
<div class="list">
  <img src="../assets/imgs/1.jpg" alt="">
  <img src="../assets/imgs/2.jpg" alt="">
  <img src="../assets/imgs/3.jpg" alt="">
  <img src="../assets/imgs/4.jpg" alt="">
  
  <!-- 更多图片 -->
</div>
```

```css
.list {
  column-count: 6;  
}

.list img {
  display: block;
  width: 100%;
  margin: 15px;
  border-radius: 10px;
  transition: 0.2s;
}

.list img:hover {
  cursor: pointer;
  transform: scale(1.02);
  box-shadow: 0 0 20px black;
}
```



## 目录循环上下滚动效果

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>原生JS实现目录滚动特效</title>
    <style>
        body {
            font-size: 12px;
            line-height: 24px;
            text-align: center;
        }

        * {
            margin: 0px;
            padding: 0px;
        }

        ul {
            list-style: none;
        }

        a img {
            border: none;
        }

        a {
            color: #333;
            text-decoration: none;
        }

        a:hover {
            color: #ff0000;
        }

        #mooc {
            width: 399px;
            border: 5px solid #ababab;
            -moz-border-radius: 15px;
            -webkit-border-radius: 15px;
            border-radius: 15px;
            box-shadow: 2px 2px 10px #ababab;
            margin: 50px auto 0;
            text-align: left;
        }

        #moocTitle {
            height: 62px;
            overflow: hidden;
            font-size: 26px;
            line-height: 62px;
            padding-left: 30px;
            /* Firefox */
            background-image: -moz-linear-gradient(top, #f05e6f, #c9394a);
            /* Saf4+, Chrome */
            background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f05e6f), color-stop(1, #c9394a));
            /* IE*/
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#8fa1ff', endColorstr='#f05e6f', GradientType='0');
            border: 1px solid ##f05e6f;
            /* Gecko browsers */
            -moz-border-radius: 8px 8px 0 0;
            /* Webkit browsers */
            -webkit-border-radius: 8px 8px 0 0;
            border-radius: 8px 8px 0 0;
            color: #fff;
            position: relative;
        }

        #moocTitle a {
            position: absolute;
            right: 10px;
            bottom: 10px;
            display: inline;
            color: #fff;
            font-size: 12px;
            line-height: 24px;
        }

        #moocBot {
            width: 399px;
            height: 10px;
            overflow: hidden;
        }

        #moocBox {
            height: 144px;
            width: 335px;
            margin-left: 25px;
            margin-top: 10px;
            overflow: hidden;
        }

        #mooc ul li {
            height: 24px;
        }

        #mooc ul li a {
            width: 180px;
            float: left;
            display: block;
            overflow: hidden;
            text-indent: 15px;
            height: 24px;
        }

        #mooc ul li span {
            float: right;
            color: #999;
        }
    </style>
</head>

<body>
    <div id="mooc">
        <h3 id="moocTitle">
            最新课程<a href="#" target="_self">更多>></a>
        </h3>

        <div id="moocBox">
            <ul id="con1">
                <li>
                    <a href="#">1.绝对的屌丝逆袭</a>
                    <span>2013-09-18</span>
                </li>
                <li>
                    <a href="#">2.tab页面切换效果</a>
                    <span>2013-10-09</span>
                </li>
                <li>
                    <a href="#">3.圆角水晶按钮制作</a>
                    <span>2013-10-21</span>
                </li>
                <li>
                    <a href="#">4.HTML+CSS基础课程</a>
                    <span>2013-11-01</span>
                </li>
                <li>
                    <a href="#">5.分页页码制作</a>
                    <span>2013-11-06</span>
                </li>
                <li>
                    <a href="#">6.导航条菜单的制作</a>
                    <span>2013-11-08</span>
                </li>
                <li>
                    <a href="#">7.信息列表制作</a>
                    <span>2013-11-15</span>
                </li>
                <li>
                    <a href="#">8.下拉菜单制作</a>
                    <span>2013-11-22</span>
                </li>
                <li>
                    <a href="#">9.如何实现“新手引导”效果</a>
                    <span>2013-12-06</span>
                </li>
            </ul>
            <ul id="con2"></ul>
        </div>
    </div>
    <script type="text/javascript">
        //获取滚动列表容器
        var area = document.getElementById('moocBox');
        //获取列表1
        var con1 = document.getElementById('con1');
        //获取空列表2
        var con2 = document.getElementById('con2');
        //设定定时器执行时间间隔
        var speed = 50;

        //设定向上滚动变量
        area.scrollTop = 0;

        //复制列表1的内容给列表2
        con2.innerHTML = con1.innerHTML;

        //向上滚动函数
        function scrollUp() {
            //当滚动列表向滚动的高度大于等于列表自身的高度时
            if (area.scrollTop >= con1.scrollHeight) {
                //将列表滚动高度归零，重新开始滚
                area.scrollTop = 0;
                //否则
            } else {
                //继续滚
                area.scrollTop++;
            }
        }

        //存储定时器
        var myScroll = setInterval("scrollUp()", speed);

        //当鼠标移入的时候，清除定时器
        area.onmouseover = function () {
            clearInterval(myScroll);
        }
        //当鼠标移开的时候，启动定时器
        area.onmouseout = function () {
            myScroll = setInterval("scrollUp()", speed);
        }
    </script>
</body>

</html>
```



## TODO 聊天气泡框





## TODO 0.5px 线条



## 盒子缺角动画

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>盒子缺角效果</title>
  </head>
  <body>
    <style>
      @keyframes folding {
        0% {
          transform: rotate3d(1, 1, 0, 180deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        10% {
          transform: rotate3d(1, 1, 0, 160deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        20% {
          transform: rotate3d(1, 1, 0, 140deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        30% {
          transform: rotate3d(1, 1, 0, 120deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        40% {
          transform: rotate3d(1, 1, 0, 100deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        50% {
          transform: rotate3d(1, 1, 0, 80deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        60% {
          transform: rotate3d(1, 1, 0, 60deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        70% {
          transform: rotate3d(1, 1, 0, 40deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        90% {
          transform: rotate3d(1, 1, 0, 20deg);
          box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
        }

        100% {
          transform: rotate3d(1, 1, 0, 0deg);
          box-shadow: 0 0 0 0;
        }
      }
      .folding {
        margin: 0 auto;
        position: relative;
        width: 200px;
        height: 80px;
        border-radius: 10px;
        color: #fff;
        line-height: 80px;
        text-align: center;
        background: linear-gradient(-135deg, transparent 1.5em, #58a 0);
        cursor: pointer;
      }
      .folding:hover:before {
        transform: rotate3d(1, 1, 0, 0deg);
        animation: folding 0.5s ease;
        box-shadow: 0 0 0 0;
        border-bottom-left-radius: inherit;
      }
      .folding::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        background: linear-gradient(to left bottom, #58a 50%, transparent 50%) 100% 0 no-repeat;
        width: 2.12134em;
        height: 2.12134em;
        transform: rotate3d(1, 1, 0, 180deg);
        transform-origin: bottom right;
        border-top-right-radius: inherit;
        box-shadow: 0.05em -0.05em 0.1em rgba(0, 0, 0, 0.15);
      }
    </style>
    <div class="folding">折叠动画</div>
  </body>
</html>
```



## 故障风格的文字

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>故障风格的文字</title>
    <style>
      body {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: black;
      }
      .txt {
        display: inline-block;
        font-size: 65px;
        font-weight: 600;
        padding: 0 4px;
        color: white;
        position: relative;
      }
      .txt::before {
        /* 获取文本 */
        content: attr(data-text);
        position: absolute;
        /* 向左侧移2px */
        left: -2px;
        width: 100%;
        /* 将背景色设为与主背景同样的颜色，用于遮挡我们的标签元素 */
        background: black;
        /* 给before伪元素的文本添加左侧2px大小的红色文字阴影 */
        text-shadow: 2px 0 red;
        /* 应用蒙版垂直变化动画，并一直循环 */
        animation: animation-before 3s infinite linear alternate-reverse;
      }
      .txt::after {
        /* 获取文本 */
        content: attr(data-text);
        position: absolute;
        /* 向左侧移2px */
        left: 2px;
        width: 100%;
        /* 将背景色设为与主背景同样的颜色，用于遮挡我们的标签元素 */
        background: black;
        /* 给before伪元素的文本添加右侧2px大小的蓝色文字阴影 */
        text-shadow: -2px 0 blue;
        /* 应用蒙版垂直变化动画，并一直循环 */
        animation: animation-after 3s infinite linear alternate-reverse;
      }

      @keyframes animation-before {
        0% {
          clip-path: inset(0 0 0 0);
        }

        5% {
          clip-path: inset(0.8em 0 0.4em 0);
        }

        10% {
          clip-path: inset(0.4em 0 0.8em 0);
        }

        15% {
          clip-path: inset(0.1em 0 1em 0);
        }

        20% {
          clip-path: inset(0.3em 0 0.6em 0);
        }

        25% {
          clip-path: inset(0.6em 0 0.3em 0);
        }

        30% {
          clip-path: inset(0.8em 0 0.5em 0);
        }

        35% {
          clip-path: inset(1em 0 0.1em 0);
        }

        40% {
          clip-path: inset(0.7em 0 0.35em 0);
        }

        45% {
          clip-path: inset(0.5em 0 0.2em 0);
        }

        50% {
          clip-path: inset(0.2em 0 0.5em 0);
        }

        55% {
          clip-path: inset(0.35em 0 0.7em 0);
        }

        60% {
          clip-path: inset(0.1em 0 0.9em 0);
        }

        65% {
          clip-path: inset(0.8em 0 0.46em 0);
        }

        70% {
          clip-path: inset(0.66em 0 0.33em 0);
        }

        75% {
          clip-path: inset(0.48em 0 0.23em 0);
        }

        80% {
          clip-path: inset(0.23em 0 0.48em 0);
        }

        85% {
          clip-path: inset(0.39em 0 0.79em 0);
        }

        90% {
          clip-path: inset(0.33em 0 0.66em 0);
        }

        95% {
          clip-path: inset(1em 0 0.3em 0);
        }

        100% {
          clip-path: inset(0.62em 0 0.29em 0);
        }
      }
      @keyframes animation-after {
        0% {
          clip-path: inset(0 0 0 0);
        }

        5% {
          clip-path: inset(0.4em 0 0.8em 0);
        }

        10% {
          clip-path: inset(0.8em 0 0.4em 0);
        }

        15% {
          clip-path: inset(1em 0 0.1em 0);
        }

        20% {
          clip-path: inset(0.6em 0 0.3em 0);
        }

        25% {
          clip-path: inset(0.3em 0 0.6em 0);
        }

        30% {
          clip-path: inset(0.5em 0 0.8em 0);
        }

        35% {
          clip-path: inset(0.1em 0 1em 0);
        }

        40% {
          clip-path: inset(0.35em 0 0.7em 0);
        }

        45% {
          clip-path: inset(0.2em 0 0.5em 0);
        }

        50% {
          clip-path: inset(0.5em 0 0.2em 0);
        }

        55% {
          clip-path: inset(0.7em 0 0.35em 0);
        }

        60% {
          clip-path: inset(0.9em 0 0.1em 0);
        }

        65% {
          clip-path: inset(0.46em 0 0.8em 0);
        }

        70% {
          clip-path: inset(0.3em 0 0.66em 0);
        }

        75% {
          clip-path: inset(0.23em 0 0.48em 0);
        }

        80% {
          clip-path: inset(0.48em 0 0.23em 0);
        }

        85% {
          clip-path: inset(0.79em 0 0.39em 0);
        }

        90% {
          clip-path: inset(0.66em 0 0.33em 0);
        }

        95% {
          clip-path: inset(0.3em 0 1em 0);
        }

        100% {
          clip-path: inset(0.29em 0 0.62em 0);
        }
      }
    </style>
  </head>
  <body>
    <div class="txt" data-text="我是故障风格的文字">我是故障风格的文字</div>
  </body>
</html>
```



## 图片悬停文字叠加效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>图片悬停文字叠加效果</title>
    <style>
      .image__img {
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover;
      }
      .image {
        position: relative;
        width: 30%;
      }

      .image__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        color: #ffffff;
        font-family: "Quicksand", sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: opacity 0.25s;
      }
      .image__overlay {
        opacity: 0;
      }

      .image__overlay:hover {
        opacity: 1;
      }
      .image__overlay--blur {
        backdrop-filter: blur(5px);
      }

      .image__overlay--solid {
        background: #c51f5d;
      }
    </style>
  </head>
  <body>
    <div class="image">
      <img class="image__img" src="https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072__340.jpg" alt="Bricks" />
      <div class="image__overlay">
        <div class="image__title">Ocean</div>
        <p class="image__description">Enjoy the blue color of ocean.</p>
      </div>
    </div>
  </body>
</html>
```



## 按钮动效

### 发送效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      #send-btn {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button {
        background: #5f55af;
        border: 0;
        border-radius: 5px;
        padding: 10px 30px 10px 20px;
        color: white;
        text-transform: uppercase;
        font-weight: bold;
      }

      button svg {
        display: inline-block;
        vertical-align: middle;
        padding-right: 5px;
      }

      button:hover svg {
        animation: fly 2s ease 1;
      }

      @keyframes fly {
        0% {
          transform: translateX(0%);
        }

        50% {
          transform: translateX(300%);
        }

        100% {
          transform: translateX(0);
        }
      }
    </style>
  </head>
  <body>
    <div id="send-btn">
      <button>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"></svg>
        Send
      </button>
    </div>
  </body>
</html>
```



### 霓虹发光

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      #neon-btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 100vh;
        background: #031628;
      }

      .btn {
        border: 1px solid;
        background-color: transparent;
        text-transform: uppercase;
        font-size: 14px;
        padding: 10px 20px;
        font-weight: 300;
      }

      .one {
        color: #4cc9f0;
      }

      .two {
        color: #f038ff;
      }

      .three {
        color: #b9e769;
      }

      .btn:hover {
        color: white;
        border: 0;
      }

      .one:hover {
        background-color: #4cc9f0;
        -webkit-box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
        -moz-box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
        box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
      }

      .two:hover {
        background-color: #f038ff;
        -webkit-box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
        -moz-box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
        box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
      }

      .three:hover {
        background-color: #b9e769;
        -webkit-box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
        -moz-box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
        box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
      }
    </style>
  </head>
  <body>
    <div id="neon-btn">
      <button class="btn one">Hover me</button>
      <button class="btn two">Hover me</button>
      <button class="btn three">Hover me</button>
    </div>
  </body>
</html>
```



### 边框加载效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      #draw-border {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      button {
        border: 0;
        background: none;
        text-transform: uppercase;
        color: #4361ee;
        font-weight: bold;
        position: relative;
        outline: none;
        padding: 10px 20px;
        box-sizing: border-box;
      }

      button::before,
      button::after {
        box-sizing: inherit;
        position: absolute;
        content: "";
        border: 2px solid transparent;
        width: 0;
        height: 0;
      }

      button::after {
        bottom: 0;
        right: 0;
      }

      button::before {
        top: 0;
        left: 0;
      }

      button:hover::before,
      button:hover::after {
        width: 100%;
        height: 100%;
      }

      button:hover::before {
        border-top-color: #4361ee;
        border-right-color: #4361ee;
        transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
      }

      button:hover::after {
        border-bottom-color: #4361ee;
        border-left-color: #4361ee;
        transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
      }
    </style>
  </head>
  <body>
    <div id="draw-border">
      <button>Hover me</button>
    </div>
  </body>
</html>
```



### 圆角进度加载效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      #circle-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      .btn-container {
        position: relative;
      }

      button {
        border: 0;
        border-radius: 50px;
        color: white;
        background: #5f55af;
        padding: 15px 20px 16px 60px;
        text-transform: uppercase;
        background: linear-gradient(to right, #f72585 50%, #5f55af 50%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: all 2s ease;
      }

      svg {
        background: #f72585;
        padding: 8px;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0%;
      }

      button:hover {
        background-position: left bottom;
      }
    </style>
  </head>
  <body>
    <div id="circle-btn">
      <div class="btn-container">
        <svg></svg>
        <button>Hover me</button>
      </div>
    </div>
  </body>
</html>
```



### 圆角变化效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      #border-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      button {
        border: 0;
        border-radius: 10px;
        background: #2ec4b6;
        text-transform: uppercase;
        color: white;
        font-size: 16px;
        font-weight: bold;
        padding: 15px 30px;
        outline: none;
        position: relative;
        transition: border-radius 3s;
        -webkit-transition: border-radius 3s;
      }

      button:hover {
        border-bottom-right-radius: 50px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    </style>
  </head>
  <body>
    <div id="border-btn">
      <button>Hover me</button>
    </div>
  </body>
</html>
```



### 冰冻效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      #frozen-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      button {
        border: 0;
        margin: 20px;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: bold;
        padding: 15px 50px;
        border-radius: 50px;
        color: white;
        outline: none;
        position: relative;
      }

      button:before {
        content: "";
        display: block;
        background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
        background-size: 210% 100%;
        background-position: right bottom;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        border-radius: 50px;
        transition: all 1s;
        -webkit-transition: all 1s;
      }

      .green {
        background-image: linear-gradient(to right, #25aae1, #40e495);
        box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
      }

      .purple {
        background-image: linear-gradient(to right, #6253e1, #852d91);
        box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
      }

      .purple:hover:before {
        background-position: left bottom;
      }

      .green:hover:before {
        background-position: left bottom;
      }
    </style>
  </head>
  <body>
    <div id="frozen-btn">
      <button class="green">Hover me</button>
      <button class="purple">Hover me</button>
    </div>
  </body>
</html>
```



### 闪亮效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      #shiny-shadow {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: #1c2541;
      }

      button {
        border: 2px solid white;
        background: transparent;
        text-transform: uppercase;
        color: white;
        padding: 15px 50px;
        outline: none;
        overflow: hidden;
        position: relative;
      }

      span {
        z-index: 20;
      }

      button:after {
        content: "";
        display: block;
        position: absolute;
        top: -36px;
        left: -100px;
        background: white;
        width: 50px;
        height: 125px;
        opacity: 20%;
        transform: rotate(-45deg);
      }

      button:hover:after {
        left: 120%;
        transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
        -webkit-transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
      }
    </style>
  </head>
  <body>
    <div id="shiny-shadow">
      <button><span>Hover me</span></button>
    </div>
  </body>
</html>
```



### 加载效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      #loading-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      button {
        background: transparent;
        border: 0;
        border-radius: 0;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 20px;
        padding: 15px 50px;
        position: relative;
      }

      button:before {
        transition: all 0.8s cubic-bezier(0.7, -0.5, 0.2, 2);
        content: "";
        width: 1%;
        height: 100%;
        background: #ff5964;
        position: absolute;
        top: 0;
        left: 0;
      }

      button span {
        mix-blend-mode: darken;
      }

      button:hover:before {
        background: #ff5964;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div id="loading-btn">
      <button><span>Hover me</span></button>
    </div>
  </body>
</html>
```



## 优惠券样式

```html
<style>
  .coupon {
    width: 300px;
    height: 100px;
    line-height: 100px;
    margin: 50px auto;
    text-align: center;
    position: relative;
    /* 设置四个径向渐变背景，每个渐变位于不同的角落，用于创建特定的视觉效果 */
    background: radial-gradient(circle at right bottom, transparent 10px, #ffffff 0) top right / 50% 51px no-repeat,
      radial-gradient(circle at left bottom, transparent 10px, #ffffff 0) top left / 50% 51px no-repeat,
      radial-gradient(circle at right top, transparent 10px, #ffffff 0) bottom right / 50% 51px no-repeat,
      radial-gradient(circle at left top, transparent 10px, #ffffff 0) bottom left / 50% 51px no-repeat;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
  }
  .coupon span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    color: red;
    font-size: 50px;
    font-weight: 400;
  }
</style>

<p class="coupon"><span>200</span>优惠券</p>
```



























