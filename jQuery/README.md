# 基础

## 介绍

jQuery 是一个 JavaScript 函数库。主要内容是封装了各种dom操作。

jQuery 库包含以下功能：

* HTML 元素选取
* HTML 元素操作
* CSS 操作
* HTML 事件函数
* JavaScript 特效和动画
* HTML DOM 遍历和修改
* AJAX
* Utilities



## 引入jQuery

引入方式：CDN 或 本地JS文件

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<script src="jquery-3.6.0.min.js"></script>
```

当引入成功后，会向全局暴露两个变量名: `jQuery 和 $ `





## 版本区别

我们可以在浏览器的 Console 窗口中使用 `$.fn.jquery` 命令查看当前 jQuery 使用的版本。

* 1.x: 兼容IE678，使用最为广泛的，官方只做BUG维护，功能不再新增。一般项目来说，使用1.x版本就可以了，最终版本: 1.12.4
* 2.x: 不兼容IE678，很少有人使用。
* 3.x: 不兼容IE678，只支持最新的浏览器。除非特殊要求，一般不会使用3.x版本，很多老的jQuery插件不支持这个版本。





## 语法

jQuery 语法是通过选取 HTML 元素，并对选取的元素执行某些操作。

基础语法： `$(selector).action()` 

* 美元符号定义 jQuery
* 选择符（selector）"查询"和"查找" HTML 元素
* jQuery 的 action() 执行对元素的操作

例子：`$("p").hide()` - 隐藏所有 `<p>` 元素



## jQuery对象和js对象

jQuery的本质是一个元素集合，集合中包含了多个dom对象。`[dom对象, dom对象, ...]`

**jQuery对象不能使用dom对象中的属性和方法，dom对象也不能使用jQuery对象中的属性和方法。**

但是两者可以相互转换:

* dom对象转 jQuery 对象: 穿马甲
  * `$(dom对象)`
* jQuery 对象转 dom 对象: 脱马甲，取出jQuery数组中的dom对象
  * `jQuery对象[索引]` 或者 `jQuery对象.get(索引)`







## 文档就绪事件

$(document).ready() : 事件触发是在当前的document加载完成以后执行。

```js
$(document).ready(function(){
  // jQuery 代码...
})

// 简写
$(function(){
  // jQuery 代码...
})
```

为什么所有 jQuery 函数位于一个 document ready 函数中?

这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码，即在 DOM 加载完成后才可以对 DOM 进行操作。



### jQuery入口函数与JavaScript入口函数的区别

```js
$(function(){
  // 执行代码...
})

window.onload = function(){
  // 执行代码...
}
```

* jQuery 的入口函数是在 html 所有标签(DOM)都加载之后，就会去执行。
* JavaScript 的 `window.onload` 事件是等到所有内容，包括外部图片之类的文件加载完后，才会执行。
* js中的页面加载事件只能写一个，写多个，后面的会覆盖前面的。而jQuery中的页面加载事件写多个，都会被执行。



### $(window).load和$(window).ready的区别

这两个方法都是加载后执行，但是有先后顺序(ready是先执行)

加载顺序:

* html结构
* 加载外部样式表和执行文件
* 解析执行脚本代码
* 构造DOM模型(样式应用) --> ready执行
* 加载图片文件等等
* 页面加载完毕 --> load执行



也就是说，ready不必等图片媒体进来之前就可以运行代码了，而load需要等待全部完成后才执行代码。



## jQuery选择器

jQuery 选择器允许您对 HTML 元素组或单个元素进行操作。

jQuery 选择器基于元素的 id、类、类型、属性、属性值等"查找"（或选择）HTML 元素。 它基于已经存在的 CSS 选择器，除此之外，它还有一些自定义的选择器(`:first`)等。

jQuery 中所有选择器都以美元符号开头：`$()`。

**满足条件的所有元素(id选择器除外)，都会放在一个数组里面，以集合的形式返回，所以管这个集合叫做jQuery元素集合。**



### 元素选择器

jQuery 元素选择器基于元素名选取元素。`$('p')`

```js
// 给所有<p>元素绑定单击事件，点到的<p>元素会被隐藏
$(function(){
  $('p').click(function(){
    $(this).hide()
  })
})
```



### #id选择器

jQuery #id 选择器通过 HTML 元素的 id 属性选取指定的元素。`$('#test')`

id选择器只会选择第一个符合条件的元素。

```js
// 点击按钮后，id="test" 属性的元素将被隐藏
$(function(){
  $('button').click(function(){
    $('#test').hide()
  })
})
```



### .class选择器

Query 类选择器可以通过指定的 class 查找元素。`$('.test')`

```js
// 点击按钮后，所有带有 class="test" 属性的元素都隐藏
$(function(){
  $('button').click(function(){
    $('.test').hide()
  })
})
```



### 层级选择器

* $('A B'): 后代选择器(包含子孙)，获得A元素内部的所有的B元素
* $('A > B'): 只有儿子，没有孙子。获得A元素下面的所有B子元素
* $('A + B'): 下一个兄弟，获得A元素同级下一个B元素
* $('A ~ B'): 后边的所有兄弟，获得A元素同级所有后面B元素
* $('A').siblings('B'): 获取A元素的同级B元素



### 属性选择器

* $('A[属性名]'): 获得有指定属性名的元素
* $('A[属性名=值]'): 获得属性名 `等于` 值的元素
* $('A[属性名=值]...[属性名!=值]'): 复合属性选择器，多个属性同时过滤
  * `$('div[id][title*="es"]')` 选取带有id属性，并且title属性值含有'es'的div元素
* $('A[属性名!=值]'): 获得属性名 `不等于` 值的元素
* $('A[属性名^=值]'): 获得属性名`以值开头`的元素
* $('A[属性名$=值]'): 获得属性名`以值结尾`的元素
* $('A[属性名*=值]'): 获得属性名`含有值`的元素



### 基本过滤选择器

* `:first` : 获得选择的元素中的第一个元素
* `:last` : 获得选择的元素中的最后一个元素
* `:not(selector)` : 获取选择的元素中不包括指定selector的元素
* `:even` : 选取索引为偶数的元素，从0开始计数
* `:odd` : 选取索引为奇数的元素，从0开始计数
* `:eq(index)` : 选取指定索引(index)的元素
* `:gt(index)` : 选取大于指定索引的元素
* `:lt(index)` : 选取小于指定索引的元素
* `:header` : 获得标题元素(h1这些)
* `:animated` : 获得正在执行的动画



### 表单属性选择器

* `:enabled` : 获得可用元素
* `:disabled` : 获得不可用元素
* `:checked` : 获得单选radio /复选框checkbox 选中的元素
* `:selected` : 获得下拉列表select 选中的元素



### 更多选择器

* `$('*')` : 选取所有元素
* `$(this)` : 选取当前 HTML 元素
* `$('p.intro')` : 选取 class 为 intro 的 `<p>` 元素
* `$('p:first')` : 选取第一个 `<p>` 元素
* `$('p:last')` : 选取最后一个 `<p>` 元素
* `$('ul li:first')` : 选取第一个 `<ul>` 元素的第一个 `<li>` 元素
* `$('ul li:first-child')` : 选取每个 `<ul>` 元素的第一个 `<li>` 元素
* `$('[href]')` : 选取带有 href 属性的元素
* `$('a[target="_blank"]')` : 选取所有 target 属性值等于 "_blank" 的 `<a>` 元素
* `$('a[target!="_blank"]')` : 选取所有 target 属性值不等于 "_blank" 的 `<a>` 元素
* `$(':button')` : 选取所有 type="button" 的 `<input>` 元素 和 `<button>` 元素
* `$('tr:even')` : 选取偶数位置的 `<tr>` 元素，索引从0开始
* `$('tr:odd')` : 选取奇数位置的 `<tr>` 元素，索引从0开始
* `$('div p span')` : 层级选择器，选择div下的p元素中的span元素
* `$('div>p')` : 父子选择器，选择div下的所有p元素。等同于`$('div p')`
* `$('div+p')` : 相邻元素选择器，选择div后面的p元素(仅一个p)，如果相邻的不是p则无效
* `$('div~p')` : 兄弟选择器，选择div后面的所有同级别的p元素
* `$('div p:eq(2)')` : 索引选择器，选择div下的第三个p元素，索引从0开始(不包含非p元素)
* `$('input:checked')` : 获取所有选中的复选/单选按钮。等同于`$('input[checked]')`



```js
// 点击按钮后，奇数位置的tr元素的背景色变成黄色，注意：索引从0开始
$(function(){
  $('button').click(function(){
    $('tr:odd').css('background-color','yellow')
  })
})
```

更多选择器：https://www.runoob.com/jquery/jquery-ref-selectors.html







## jQuery事件

jQuery 是为事件处理特别设计的。



事件方法语法：

```js
$('p').click(function(){
	// 动作触发后执行的代码!!
})


// 事件触发时，可以传递参数给event事件
var eventdata = ['a','b']
$(window).keypress(eventdata, function(event){
  // 传递过来的参数eventdata，会被映射到event.data中
  console.log(event.data)
  // event 事件对象，里面包含各种有用的信息
  console.log(event)
})


$('input').keypress(function(event){
  // event 事件对象，里面包含各种有用的信息
  console.log(event)
})
```



### 常见的DOM事件

* 鼠标事件
  * click / dblclick
  * mouseenter 鼠标移动到元素上 / mouselever 鼠标离开元素 
  * mousedown 鼠标移动到元素上面并按下 / mouseup 在元素上松开鼠标按键
  * hover 用于模拟光标悬停事件。当鼠标移动到元素上时，会触发指定的第一个函数(mouseenter);当鼠标移出这个元素时，会触发指定的第二个函数(mouseleave)。
* 键盘事件
  * keypress(不包含功能键) / keydown / keyup
* 表单事件
  * submit / change / focus / blur
* 文档/窗口事件
  * load / resize / scroll / unload



### 常用的jQuery事件方法

```js
$(function(){
  $('p').hover(
    function(){
      console.log('mouseenter')
    },
    function(){
      console.log('mouseleave')
    }
  )
  
  $('input').focus(function(){
    $(this).css('background-color', 'yellow')
  })
  $('input').blur(function(){
    $(this).css('background-color', 'white')
  })
})
```



### on()

* on(events, handler) : 添加事件绑定
  * events : 事件名，多个事件之间可以用空格隔开
  * handler : 事件处理函数

```js
// 1、给一个事件添加一个函数
$('#div1').on('click', function(){
  console.log('hello')
})

// 2、同时给多个事件添加一个函数，多个事件之间可以用空格隔开
var i = 0
$('#div1').on('click mouseover', function(){
  $(this).html(i++)
})

// 3、给不同的事件添加不同的函数
$('#div1').on({
  click: function(){
    console.log('点击')
  },
  mouseover: function(){
    $(this).css('backgroundColor', 'yellow')
  },
  mouseout: function(){
    $(this).css('backgroundColor', 'red')
  }
})

// 4、事件委托
// 第二个参数，是触发对象的选择器。选择器元素必须是元素集合内元素的后代元素
$('ul').on('click', 'li', function(){
  $(this).css('backgroundColor', 'red')
})

// 普通的事件绑定不会对绑定时还不存在于DOM中的元素生效
// $('li').click(function(){
//   $(this).css('backgroundColor', 'red')
// })


// 5、触发时传递参数
// on(事件类型, 复杂数据类型, 事件处理函数)
$('li').on('click', { test: 'abc'}, function(e){
  console.log(e.data)	// {test: "abc"}
})

// 6、事件委托，并且触发时传递参数
// on(事件类型, 选择器, 复杂数据类型, 事件处理函数)
$('ul').on('click', 'li', { test: 'abc'}, function(e){
  console.log(e.data) 
})

var i = 5
$('#btn1').click(function(){
  // 新增li节点
  $(`<li>${i++ * 1111}</li>`).appendTo($('ul'))
})
```



### off()

移除元素上的事件绑定

```js
var myhover = function(){
  console.log('myhover')
}
var myclick = function(){
  console.log('myclick')
}

$('#div1').on({
  click: myclick,
  mouseover: myhover
})

$('#div1').click(function(){
  console.log('click2')
})

$('#cancel').click(function(){
  // $('#div1').off()    // 取消所有事件上的所有函数
  // $('#div1').off('click')   // 取消某一个事件下的所有函数
  $('#div1').off('click', myclick)  // 取消某一个事件下指定的函数
})
```



### one()

one()同样是用于事件绑定，用法和on()一样，不同在于，one()绑定后**只能执行一次**。

```js
// on()中的不同参数格式，在one()中一样都可以

$('li').one('click', function(){
  console.log('click')
})

// 看起来是委托到li上，并且点击li也能触发，但是实际上是绑定在ul上，并且无论点击ul还是li，都只会执行一次
$('ul').one('click', 'li', function(){
  console.log('click')
})

$('ul').one('click', 'li', { test: 'hello'}, function(e){
  console.log(e.data) // {test: "hello"}
})
```





### 事件委托

为什么要用事件委托？

在对一类元素进行添加事件绑定时，只会对当前DOM中存在的元素进行绑定，而后添加进行的元素则不会被绑定。

事件委托就可以实现，即使元素是在事件绑定后才生成的，也能够自动绑定事件。



### 事件默认参数event

event中的属性和方法都是兼容后的。

```js
$(document).click(function(e){
  console.log(e)
})
```



#### 属性

* pageX : 带滚动距离的鼠标位置
* pageY : 带滚动距离的鼠标位置
* clientX : 可视窗口为原点的鼠标位置
* clientY : 可视窗口为原点的鼠标位置
* which : 返回按键值。不同事件下返回的值不同
  * 鼠标事件mousedown/click，返回数字 1(左键) 2(滚动) 3(右键)
  * 键盘事件keydown，返回keyCode键码。大小写字母的键码是一样的，并且可以返回功能键的键码。
  * 键盘事件keypress，返回charCode字符码。大小写字母的字符码不同，并且不能返回功能键的字符码。
* data : 事件触发时传递过来的参数，会被映射到event.data中
* target : 触发对象
* type : 输出事件类型



```js
$(document).click(function(e){
  console.log(e.pageX + ':' + e.pageY)      // 带滚动距离的鼠标点击位置
  console.log(e.clientX + ':' + e.clientY)  // 可视窗口为原点的鼠标点击位置
})

$(document).mousedown(function(e){
  console.log(e.which)
})

$(window).keydown(function(e){
  console.log(e.which)
})

$(window).keypress(function(e){
  console.log(e.which)
})

$('#div1').click('hello', function(ev){
  console.log(ev.data)    // 'hello'
  console.log(ev.target)  // 返回的是div1节点
  console.log(ev.type)    // click
})

$('#div1').on('click', {user: 'zs', age: 23}, function(ev){
  console.log(ev.data)    // {user: "zs", age: 23}
  console.log(ev.target)  // 返回的是div1节点
  console.log(ev.type)    // click
})
```





#### 取消冒泡和默认行为

stopPropagation() : 取消冒泡

preventDefault() : 取消默认行为

```js
$('div').click(function(ev){
  alert(this.id)
  ev.stopPropagation()
})
$('a').click(function(ev){
  // ev.preventDefault()
  // ev.stopPropagation()

  // 既阻止事件冒泡，又阻止默认行为
  return false
})
```





### trigger() 触发事件

trigger(eventName) 可以触发官方定义的事件以外，还可以触发我们自定义的事件。

```js
$('#div1').click(function(){
  console.log('click')
})
$('#div1').on('play', function(){
  console.log('play')
})

$('#div1').trigger('click')
$('#div1').trigger('play')
```







## jQuery效果

### 隐藏/显示

通过 jQuery，您可以使用 `hide()` 和 `show()` 方法来隐藏和显示 HTML 元素：

还可以使用 `toggle()` 方法来切换 `hide()` 和 `show()` 方法。

这些方法实际是操作元素的`display:none`属性

语法：

```js
$(selector).hide([duration ] [, easing ] [,	callback ] )
$(selector).show([duration ] [, easing ] [, callback ] )
$(selector).toggle([duration ] [, easing ] [, callback ] )
```

可选的 duration 参数规定隐藏/显示的持续时间，可以取以下值："slow"、"fast" 或毫秒。

可选的 easing 参数表示过渡使用哪种缓动函数，可以取以下值："swing"(默认，快慢快) / "linear(匀速)"

可选的 callback 参数是隐藏或显示完成后所执行的函数名称。

**注意：$(selector)选中的元素的个数为n个，则callback函数会执行n次；**

* hide() : 隐藏
  * duration : 毫秒(默认400) / slow(600) / fast(200)
  * easing : swing(默认) / linear
* show() : 显示
  * 同上
* toggle() : 切换 hide() 和 show() 方法
  * 同上

动画效果是，从左上角收起和从左上角展开。



```js
$('#hide').click(function(){
  $('p').hide()
})
$('#show').click(function(){
  $('p').show()
})
$('#toggle').click(function(){
  $('p').toggle()
})

$('#hide').click(function(){
  $('p').hide(1000, 'linear', function(){
    console.log('已隐藏')
  })
})
```





### 淡入/淡出

通过 jQuery，您可以实现元素的淡入淡出效果。

语法：

```js
$(selector).fadeIn([duration ] [, easing ] [,	callback ])
$(selector).fadeOut([duration ] [, easing ] [, callback ])
$(selector).fadeToggle([duration ] [, easing ] [, callback ])
$(selector).fadeTo(duration, opacity [, easing ] [, complete ])
```

可选的 duration 参数规定效果的持续时间，可以取以下值："slow"、"fast" 或毫秒。

可选的 easing 参数表示过渡使用哪种缓动函数，可以取以下值："swing"(默认) / "linear"

可选的 callback 参数是效果完成后所执行的函数名称。

**注意：$(selector)选中的元素的个数为n个，则callback函数会执行n次；**

* fadeIn() : 淡入已隐藏的元素
  * duration : 毫秒(默认400) / slow(600) / fast(200)
  * easing : swing(默认) / linear
* fadeOut() : 淡出可见元素
  * 同上
* fadeToggle() : 可以在 fadeIn() 与 fadeOut() 方法之间进行切换
  * 同上
* fadeTo() : 允许渐变为给定的不透明度，值介于 0(透明) 与 1(不透明) 之间。
  * duration : 毫秒(默认400) / slow(600) / fast(200)
  * opacity : 值介于 0(透明) 与 1(不透明) 之间。



```js
$('#fadein').click(function(){
  $('#div1').fadeIn()
})
$('#fadeout').click(function(){
  $('#div1').fadeOut()
})
$('#fadetoggle').click(function(){
  $('#div1').fadeToggle()
})
$('#fadeto').click(function(){
  $('#div1').fadeTo('slow', 0.3)
})

$('#fadein').click(function(){
  $('#div1').fadeIn(2000, 'linear', function(){
    console.log('fadeIn() 已完成')
  })
})
```





### 滑动

通过 jQuery，您可以在元素上创建滑动效果(卷闸效果)。

语法：

```js
$(selector).slideDown([duration ] [, easing ] [,	callback ])
$(selector).slideUp([duration ] [, easing ] [, callback ])
$(selector).slideToggle([duration ] [, easing ] [, callback ])
```

可选的 duration 参数规定效果的持续时间，可以取以下值："slow"、"fast" 或毫秒。

可选的 easing 参数表示过渡使用哪种缓动函数，可以取以下值："swing"(默认) / "linear"

可选的 callback 参数是效果完成后所执行的函数名称。

**注意：$(selector)选中的元素的个数为n个，则callback函数会执行n次；**

* slideDown() : 用于向下滑动元素
  * duration : 毫秒(默认400) / slow(600) / fast(200)
  * easing : swing(默认) / linear
* slideUp() : 用于向上滑动元素
  * 同上
* slideToggle() : 可以在 slideDown() 与 slideUp() 方法之间进行切换
  * 同上



```js
$('#slideup').click(function(){
  $('#panel').slideUp()
})
$('#slidedown').click(function(){
  $('#panel').slideDown()
})
$('#slidetoggle').click(function(){
  $('#panel').slideToggle()
})

$('#slideup').click(function(){
  $('#panel').slideUp(2000, 'linear', function(){
    console.log('slideUp() 已完成')
  })
})
```



### 动画

jQuery `animate()` 方法用于创建自定义动画。

```
$(selector).animate({params} [,duration ] [, easing ] [, callback ]);
```

> 当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名。FontSize
>
> 同时，色彩动画并不包含在核心 jQuery 库中。需要从 jquery.com 下载 颜色动画 插件。
>
> CSS3 的 2D 和 3D 动画效果也运动不了。

必需的 params 参数定义形成动画的 CSS 属性。

可选的 duration 参数规定效果的持续时间，可以取以下值："slow"、"fast" 或毫秒。

可选的 easing 参数表示过渡使用哪种缓动函数，可以取以下值："swing"(默认) / "linear"

可选的 callback 参数是效果完成后所执行的函数名称。

**注意：$(selector)选中的元素的个数为n个，则callback函数会执行n次；**



* animate() : 用于创建自定义动画
  * params : 定义形成动画的 CSS 属性。
  * duration : 毫秒(默认400) / slow(600) / fast(200)
  * easing : swing(默认) / linear

```js
$('#animate').click(function(){
  $('#panel').animate({left:'250px', fontSize:'30px'})
})

$('#animate').click(function(){
  $('#panel').animate({left:'250px', fontSize:'30px'}, 2000, 'linear', function(){
    console.log('animate() 已完成')
  })
})
```



#### 使用相对值

可以定义相对值（该值相对于元素的当前值）。需要在值的前面加上 `+=` 或 `-=`

```js
$('#animate').click(function(){
  $('#panel').animate({
    left: '250px',
    height: '+=150px',
    width: '+=150px'
  })
})
```



#### 使用预定义的值

可以把属性的动画值设置为 "show"、"hide" 或 "toggle"

```js
$('#animate').click(function(){
  $('#panel').animate({height: 'toggle'})
})
```



#### 队列功能

默认地，jQuery 提供针对动画的队列功能。

如果编写多个 animate() 调用，jQuery 会创建包含这些方法调用的"内部"队列。然后逐一运行这些 animate 调用。

```js
$('#animate').click(function(){
  $('#panel').animate({left: '250px'}, 'slow')
  $('#panel').animate({fontSize: '3em'}, 'slow')
})
```





### 停止和延迟动画

jQuery `stop()` 方法用于在动画或效果完成前对它们进行停止。

可以在每次调用animate之前先去调用一次stop()，关闭上一次定时器。

stop() 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

```
stop( [clearQueue ] [, jumpToEnd ] )
```

可选的 clearQueue 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

可选的 jumpToEnd 参数规定是否立即完成当前动画。默认是 false。



`finish()` : 停止所有动画，并且将所有的动画都到达目的值

`delay(duration)` : 设置一个延时来推迟执行队列中后续的项。



```js
$('#animate').click(function(){
  $('#panel').animate({left: '250px'}, 5000)
  $('#panel').animate({fontSize: '3em'}, 5000)
})
$('#stop').click(function(){
  $('#panel').stop()      // 默认，停止第一个动画，继续第二个动画
  $('#panel').stop(true)  // 停止所有动画
  $('#panel').stop(true, true)  // 立即完成当前动画，并清除后面的动画队列
  $('#panel').stop(false, true) //立即完成当前动画，并接着执行后面的动画
  $('#panel').finish() //停止所有动画，并且将所有的动画都到达目的值
})
```





### jQuery-UI

可以通过引入jQuery-UI实现多种easing变化方式。

参考: https://www.jqueryui.org.cn/demo/5735.html





### animatecss动画插件

官网: https://animate.style/

其中包含了各种动画效果，可以在官网中查看。

使用方法:

* 引入css文件: `animate.min.css`
* 给标签添加不同的class属性值，以实现不同的动画效果
  * 类名必须要有`animate__animated`，后面跟动画效果以及动画配置信息。

```html
<link rel="stylesheet" href="animate.min.css">

<div class="animate__animated animate__backInRight">我是一段文本</div>
```





## jQuery链式操作

通过链，可以在一条语句中运行多个 jQuery 方法（在相同的元素上）。

```js
$('p').css('color', 'red').slideUp(2000).slideDown(2000)
```





## jQueryDOM操作

### 获取/设置元素内容

* text([textstring]) : 设置或返回所选元素的文本内容。可以获取所有符合条件元素的值，并拼接在一起
* html([htmlstring]) : 设置或返回所选元素的内容(包括 HTML 标记)。只能获取第一个符合条件元素的值
* val([value]) : 设置或返回表单字段的值。只能获取第一个符合条件元素的值
* length : 获取网页元素的个数
* each(callback(index, item)) : 遍历获取到的元素
  * index : 被选元素列表中当前元素的下标
  * item : 返回的是当前`Element`对象，可以使用原生的方法



text()是获取设置所有。html()是获取第一个，设置所有。



**JQuery取值只能获取第一个符合条件元素的值，而赋值批量操作，会对所有获取到的元素进行赋值(隐式迭代)。**

`css() attr() html() ` 等都是批量操作



注意：text()和html()设置元素内容时，会覆盖掉元素的原有内容。

```js
// 获取
$(function(){
  console.log($('p').text())      // hello jquery
  console.log($('p').html())      // hello <b>jquery</b>
  console.log($('#name').val())       // 张三
  console.log($('a').attr("href"))    // https://www.baidu.com
  console.log($('a').prop("title"))   // 首页
  console.log($('a').attr("myattr2"))  // 自定义属性
  console.log($('a').prop("myattr2"))  // undefined
})
```

```js
// 设置
$(function(){
  $('p').text('<b>hi</b>')
  $('p').html('<b>hi</b>')
  $('#name').val('李四')
  $('a').attr('title', 'Home')
  $('a').prop('title', 'Home2')
  $('a').attr('myattr', 'test')
  // $('a').prop('myattr', 'test2')

  // 一次性设置多个属性
  $('a').attr({
    'href': '#',
    'title': '空链接'
  })
})

$('div').each(function(index, item){
  // item.innerHTML = index   // item是Element对象，所以可以使用原生写法
  $(item).html(index)
})
```

```html
<p>hello <b>jquery</b></p>
<a href="https://www.baidu.com" title="首页" myattr="自定义属性">链接</a>
<input type="text" id="name" value="张三">
```



#### 回调函数

回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

```js
$(function(){
  $('p').text(function(index, text){
    console.log(index)  // 被选元素列表中当前元素的下标
    console.log(text)   // 原始（旧的）值
    return index + ':' + text // 将返回值设置为元素的文本内容
  })
  
  $('a').attr('title', function(index, origValue){
    console.log(index)  // 被选元素列表中当前元素的下标
    console.log(origValue)   // 原始（旧的）值
    return index + ':' + origValue // 将返回值设置为元素的指定属性的值
  })
})
```





### 操作元素属性

属性分为:

* 原生属性: id, class, src ...
* 自定义属性: getAttribute()
* H5 自定义属性: dataset  data-xxx



jQuery中有三种操作属性的方法:

* attr() 和 removeAttr()
* prop() 和 removeProp()
* data() 和 removeData()



#### attr() 和 removeAttr()

* attr(属性名) : 获取元素的指定属性值，`主要用来获取标签自定义属性`，但也可以获取原生属性
  * 如果没有找到属性则返回undefined
* attr(属性名[, 属性值]) : 设置元素的标签属性，只是把属性设置在标签上，当做一个自定义属性
  * 设置原生属性有些有用，有些没用。如 checked, selected 等设置无效 `(实际有效)`
  * 设置的不管是什么数据类型，都会变成字符串类型
* removeAttr(属性名) : 删除元素身上的自定义属性。id, class等属性也可以删除。

```js
console.log($('div').attr('id'))
console.log($('div').attr('class'))
console.log($('div').attr('test'))

$('div').attr('id', 'two')
$('div').attr('name', 'hlw')

// 有效
$('input:eq(0)').attr('checked', true)
$('input[type=text]').attr('value', 123)

$('div').removeAttr('test')
$('div').removeAttr('id')
```





#### prop() 和 removeProp()

* prop(属性名) : 获取元素的指定属性值，`主要用来获取标签原生属性`
  * 如果没有找到属性则返回undefined
  * 无法获取到不是通过prop()添加的自定义属性，原本就存在的自定义属性也获取不到
* prop(属性名[, 属性值]) : 设置元素的原生属性
  * 也可以设置自定义属性，但设置的自定义属性不会显示在标签上，而是存储在元素身上
  * 常用于设置表单类标签的原生属性。如 checked, selected 或者 disabled 使用prop()
  * 设置的时候是什么数据类型，获取到的时候还是什么数据类型
* removeProp(属性名) : 只能删除由prop()设置的自定义属性。原生属性(id, class...)不能删除

```js
console.log($('div').prop('id'))
console.log($('div').prop('test'))  // prop()无法获取或设置自定义属性

// $('div').prop('id', 'two')
$('div').prop('class', '1bc')
$('div').prop('test', '1c')
$('div').prop('hello', 123)   // 设置自定义属性
console.log($('div').prop('hello'))

// 设置input中的原生属性时，它的值会通过隐式布尔转换为true或false
$('input:eq(0)').prop('checked', 'false') // 选中
$('input[type=text]').prop('value', 123)

$('div').removeProp('test')
$('div').removeProp('id')   // 不能删除原生属性
```





#### data() 和 removeData()

* data(属性名) : 获取使用data()存储的数据，获取元素身上 data-xxx 的属性
  * 如果没有找到属性则返回undefined
  * 无法获取原生属性和自定义属性
* data(属性名[, 属性值]) : 设置元素属性
  * 设置的时候，只是把数据存储在元素身上的某一个对象空间内。
  * 设置的属性不会出现在标签上，也不会以 data-xxx 的属性出现
  * 可以获取元素标签上 data-xxx 的属性，但是不能设置标签上 data-xxx 的属性
* removeData(属性名) : 只能删除由data()设置的属性，不能删除元素身上的data-xxx的属性

```js
$('div').data('age', 123)
$('div').data('msg', 'hello msg')

console.log($('div').data('id'))
console.log($('div').data('abc'))
console.log($('div').data('age'))
console.log($('div').data('msg'))

$('div').removeData('age')
console.log($('div'))
```



#### attr 和 prop 的区别

对于 HTML 元素本身就带有的固有属性，在处理时，使用 **prop** 方法。

对于 HTML 元素我们自己自定义的 DOM 属性，在处理时，使用 **attr** 方法。

具有 true 和 false 两个属性的属性，如 checked, selected 或者 disabled 使用 prop()





### 操作CSS

* addClass(className) : 向被选元素添加一个或多个类
* removeClass(className) : 从被选元素删除一个或多个类
* hasClass(className) : 判断元素有没有指定类名
* toggleClass(className) : 对被选元素进行添加/删除类的切换操作
* css() : 设置或返回样式属性。设置样式时，如果值为px的，可以不写px。
  * css("propertyname") : 获取**首个**匹配元素指定的CSS属性值
  * css("propertyname","value") : 为所有匹配元素设置CSS属性
  * css({"propertyname1":"value", "propertyname2":"value",...}) : 设置多个CSS属性
  * 样式的属性名可以是驼峰式'backgroundColor'，也可以是短横线式'background-color'，但不能混着写



```html
<style>
  .red { color: red;}
  .size { font-size: 3em;}
</style>
<script>
  $(function(){
    $('h1, p').addClass('red size')
    $('p').removeClass('size')

    $('button').click(function(){
      $('h1, p').toggleClass('red')
    })
  })
</script>
```

```js
console.log($('.red').css('color'))   // 获取首个匹配元素指定的CSS属性值
$('.red').css('color', 'green')   // 为所有匹配元素设置CSS属性

$('h1').css('backgroundColor', 'red')
$('h2').css('background-color', 'red')
$('h3').css('background-Color', 'red')  // 无效

// 设置多个CSS属性
$('.red').css({
  color: 'green',
  fontSize: '40px'
})
```





### 尺寸

jQuery 提供多个处理尺寸的重要方法：

* width() 和 height() : 设置或返回元素内容位置的尺寸（不包括内边距、边框或外边距）。
* innerWidth() 和 innerHeight() : 设置或返回元素内容的尺寸（包括内边距）。
* outerWidth() 和 outerHeight() : 设置或返回元素内容的尺寸（包括内边距和边框）。
* outerWidth([flag]) 和 outerHeight([flag]) : 设置或返回元素内容的尺寸（包括内边距和边框）。
  * flag : 可选，布尔值。默认为false。如果为true，则宽度还包括外边距



注意事项:

* 如果是获取尺寸，返回的是数字(尺寸大小)
* 如果是设置尺寸，返回的是设置后的元素集合
* 使用innerWidth()或outerWidth()等方法设置元素尺寸时，并不会改变内边距、外边距和边框的大小。只会通过改变元素的width和height来达到指定的尺寸，width和height最小为0。
* 设置了 `box-sizing` 后，`width()` 获取的是 css 设置的 width 减去 padding 和 border 的值。



```js
$(function(){
  console.log($('div').width())           // 100
  console.log($('div').innerWidth())      // 140
  console.log($('div').outerWidth())      // 146
  console.log($('div').outerWidth(true))  // 206
  
  console.log($('div').width(200))
})
```

```html
<div style="width: 100px; height: 100px; padding: 20px; margin: 30px; border: 3px black solid;"></div>
```



### 滚动

* scrollTop : 滚动高度
* scrollLeft : 滚动宽度

```html
<body style="height: 3000px; width: 2000px;">
  <script>
    $(function(){
      $(document).click(function(){
        console.log($(window).scrollTop())
        console.log($(window).scrollLeft())
      })
    })
  </script>
</body>
```



### 距离

* offset() : 获取当前元素相对于页面左上角的绝对坐标
  * 返回的是一个对象，里面包含一个top信息，一个left信息。例如`{top: 50, left: 50}`
* offset({top:30, left: 30}) : 设置元素相对于页面左上角的绝对坐标。
  * 返回的是改变位置后的元素集合
  * 设置的时候，如果父子元素都要动，需要考虑先后顺序。每次父元素动的时候，都会带着子元素移动。
* position() : 只读，获取当前元素，距离第一个有定位父节点的距离，从margin处算起。
  * 返回的是一个对象，里面包含一个top信息，一个left信息。
  * 如果定位的是right和bottom，那么会自动计算成left和top



```js
console.log($('div').offset())		// {top: 50, left: 50}
console.log($('div').offset().top)
console.log($('div').offset().left)

$('div').offset({left: 30, top: 30})	// 会将这个div放在距离页面左上角 30 30 的位置

console.log($('div').position())
console.log($('p').position())
```



### 遍历元素集合

* 使用 for 循环
* 使用$(selector).each(function(index, element){})方法
* 使用全局方法 $.each(要遍历的jQuery元素集合, function(index, element){})
* 使用jQuery3.0 新特性，for of 语句遍历

```js
for (var i = 0; i < $('p').length; i++) {
  console.log($('p')[i])
}

// index 是 当前元素在jQuery元素集合中的索引
// element 是 dom对象，所以可以使用原生的属性和方法
$('p').each(function(index, element){
  console.log(index)
  console.log(element)
  console.log(element.innerHTML)
})

$.each($('p'), function(index, element){
  console.log(index, element)
})

// 变量 ele 是 dom对象
for (var ele of $('p')) {
  console.log(ele)
}
```









## 节点操作

节点操作有: 创建节点、插入节点、删除节点、替换节点、克隆节点



### 创建节点

语法: `$(html结构字符串)`

* 当 $() 里面传递一个选择器的时候，就是获取元素
* 当 $() 里面传递一个html结构字符串的时候，就是创建元素节点
* 当 $() 里面传递一个DOM元素节点的时候，就是转换成jQuery元素节点 `$(this)`



```js
var node = $('<p>这是jQuery创建的节点</p>')
```





### 插入节点

用于添加新内容的四个 jQuery 方法：

* append() : 在被选元素的结尾插入内容(仍然在该元素的内部)
* prepend() : 在被选元素的开头插入内容(仍然在该元素的内部)
* after() : 在被选元素之后插入内容
* before() : 在被选元素之前插入内容



```js
$('p').append('<b>good</b>')
$('p').prepend('hi ')
$('p').after('hahh')
$('p').before('hehe')

// 这里的变量p是一个jQuery创建的元素节点，但是是一个复杂数据类型的变量，存储的是一个地址
// 只要使用p，就是在使用堆里面的那个空间
var p = $('<p>这是jQuery创建的元素节点</p>')
$('div').append(p)
$('div').prepend(p) // 结果是: 上面一个，下面没有
```

以上方法都可以一次添加若干个新元素：

```js
var txt1 = '<p>文本1</p>'   // 使用HTML标签创建文本
var txt2 = $('<p></p>').text('文本2')   // 使用jQuery创建文本
var txt3 = document.createElement('p').innerHTML = '文本3'  // 使用DOM创建文本
$('body').append(txt1, txt2, txt3)    // 追加多个新元素
```



* insertBefore() : 将被选元素插入到指定元素前面
* insertAfter() : 将被选元素插入到指定元素后面
* appendTo() : 将被选元素插入到指定元素子节点的末尾
* prependTo() : 将被选元素插入到指定元素子节点的首位

```html
<span>span标签</span>
<div>div标签</div>

<script>
  $(function(){
    $('span').insertBefore($('div'))
    $('span').insertAfter($('div'))

    $('span').prependTo($('div'))
    $('span').appendTo($('div'))
  })
</script>
```



#### 两种方式的区别

实际上，after() 和 insertAfter() 的效果是一样的，那为什么会有两种方式呢？

两者的区别在于:

* 主谓语不同
  * after() 是在被选元素的后面插入指定元素
  * insertAfter() 是将被选元素插入到指定元素的后面
* 返回值都是调用这些方法的元素，但是，如果想通过在链式中使用被插入的元素时，insertAfter()很有用





### 删除节点

用于删除元素和内容的 jQuery 方法：

* remove() : 删除被选元素(及其子元素)。返回值就是我们删除的这个节点
  * 也可接受一个参数，允许您对被删元素进行过滤。该参数可以是任何 jQuery 选择器的语法。
  * 注意: 并不会保留这个元素节点上之前的事件和行为
* detach() : 删除被选元素节点。返回值就是我们删除的这个节点
  * 注意: 会保留这个元素节点上之前的事件和行为
* empty() : 从被选元素中删除子元素。返回被选元素节点。(把自己变成空标签)



```js
$('#div1').remove()
$('#div1').empty()

// 请注意：这里删除的是class=nop 的所有p元素，而不是p元素下的class=nop的任意元素。
$('p').remove('.nop')
// 删除div下类名为nop的所有p元素
$('div p').remove('.nop')
```



### 替换节点

* replaceWith() : 换下节点.replace(换上节点)
* replaceAll() : 换上节点.replaceAll(换下节点)

功能一样，只是主语不同。

```js
var p = $('<p>这是jQuery创建的元素节点</p>')
$('div > p').replaceWith(p)
p.replaceAll($('div > p'))
```



### 克隆节点

* clone() : 克隆节点本身，及它的后代节点。
  * 可选，第一个参数默认是false，表示是否克隆元素本身的事件。如果为true，则也会克隆元素本身的事件。
  * 可选，第二个参数默认是跟随第一个，表示是否克隆元素后代节点的事件。
  * 注意: 当第一个参数是false的时候，第二个参数没有意义。

```js
$('button').eq(0).click(function(){
  var node = $('#content').clone(true)
  node.appendTo($('.box'))
})

$('#box').clone(true, false).insertAfter($('hr'))
```







## DOM树遍历

### 向上遍历

* parent() : 返回每个被选元素的直接父元素。该方法只会向上一级对 DOM 树进行遍历
* parents([selector]) : 返回每个被选元素的所有祖先元素，它一路向上直到文档的根元素 (`<html>`)。
  * 也可以使用可选参数来过滤对祖先元素的搜索。
* parentsUntil(selector) : 返回介于两个给定元素之间的所有祖先元素。不包括选择器
* closest(selector) : 返回每个被选元素父节点中第一个符合条件的元素，从自己开始去查找的。
* offsetParent() : 查找第一个有定位的父节点并返回。如果父节点没有定位就继续往上找，最终找到html节点并返回。

```js
console.log($('span').parent())
console.log($('span').parents())
console.log($('span').parents('p'))  // 过滤祖先元素的搜素，只限定p元素
console.log($('span').parentsUntil('div'))  // 返回介于 <span> 与 <div> 元素之间的所有祖先元素

$('span').closest('.box').css('backgroundColor', 'blue')
$('p').offsetParent().css('backgroundColor', 'yellow')
```



### 向下遍历

* children([selector]) : 返回每个被选元素的所有直接子元素。该方法只会向下一级对DOM树进行遍历。
  * 也可以使用可选参数来过滤对子元素的搜索。
* find(selector) : 返回每个被选元素的后代元素，一路向下直到最后一个后代。



```js
console.log($('div').children())
console.log($('div').children('ul'))	// 限定子元素是ul

console.log($('div').find('*'))		// 返回div下所有后代元素
console.log($('div').find('li'))	// 限定div下所有li元素
```



### 同级遍历

* siblings([selector]) : 返回每个被选元素的所有同胞元素。（不包括自己）
  * 也可以使用可选参数来过滤对同胞元素的搜索。
* next() : 返回每个被选元素的下一个同胞元素。
* nextAll([selector]) : 返回每个被选元素的所有跟随的同胞元素。
* nextUntil([selector]) : 返回介于两个给定参数之间的所有跟随的同胞元素，不包括选择器
* prev() : 返回每个被选元素的上一个同胞元素。
* prevAll([selector]) : 返回每个被选元素的前面的所有同胞元素。
* prevUntil([selector]) : 返回介于两个给定参数之间的所有前面的同胞元素，不包括选择器

上面所有方法都可以添加一个参数selector，用于二次筛选指定的选择器。



```js
console.log($('p').siblings())      // 返回p标签的所有同级元素
console.log($('p').siblings('ul'))  // 限定返回p标签同级元素中的ul元素
console.log($('p').next())    // 返回每个p标签的下一个同级元素
console.log($('p').nextAll()) // 返回每个p标签的后面的所有同级元素
console.log($('h2').nextUntil('h6'))  // 返回介于 <h2> 与 <h6> 元素之间的所有同胞元素

console.log($('ul').prev())  // 返回每个ul元素的上一个同级元素
console.log($('ul').prevAll())   // 返回每个ul元素的前面的所有同级元素
console.log($('h6').prevUntil('h1'))   // 返回 h6 到 h1 之间的所有同级元素
```



### 过滤

过滤是为了缩小搜索元素的范围。

三个最基本的过滤方法是：first(), last() 和 eq()，它们允许您基于其在一组元素中的位置来选择一个特定的元素。

其他过滤方法，比如 filter() 和 not() 允许您选取匹配或不匹配某项指定标准的元素。



* first() : 返回被选元素集合的首个元素，等同于`$('p:first')`
* last() : 返回被选元素集合的最后一个元素，等同于`$('p:last')`
* eq(index) : 返回被选元素集合中带有指定索引的元素，索引从0开始。等同于`$('li:eq(索引)')`
* filter(selector) : 允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。
  * `$('p').filter('.myp')` 等同于 `$('p.myp')`
* not(selector) : 返回不匹配标准的所有元素。等同于`$('p:not(.myp)')`
* has(selector) : 直接判定子节点中是否拥有符合条件的元素

```js
$('div').first().css('backgroundColor', 'red')    // 第一个div
$('div').last().css('backgroundColor', 'yellow')  // 最后一个div
// 选择指定索引的li元素
$('li').eq(2).css('backgroundColor', 'red')
$('li:eq(1)').css('backgroundColor', 'yellow')

$('div').filter('.box').css('backgroundColor', 'red') // 过滤出类名带有box的所有div元素
$('div').not('.box').css('backgroundColor', 'red')    // 过滤出类名不带有box的所有div元素
$('div').has('.box').css('backgroundColor', 'green')  // 过滤出子节点的类名带有box的所有div元素

$('div').not(':eq(1)').css('background-color', 'yellow')	// 反选，选取索引值不为 1 的 div 元素
```

```html
<div class="box">div1</div>
<div>div2 <span class="box"></span></div>
<div>div3</div>
```





## index()

获取到的就是该元素在其父元素里面的索引位置。索引从0开始

```js
console.log($('h2').index())
```

```html
<input type="text" disabled>
<p>p</p>
<h2>h2</h2>
```





## wrap() 包装方法

包装，就好像在礼物的外面加上一层包装。也就是在节点的外面加上一个父节点，将该节点包裹在里面。

* wrap(element) : 给每一个获取到的元素节点单独包装
  * element参数可以是string、`Element`、JQuery
* wrapAll(element) : 整体包装，将每一个获取到的元素节点包装到一个element中。
* wrapInner(element) : 内部包装，将element包装到每一个获取到的节点中。
* unwrap() : 删除上面一层包装，不包括body节点



```js
$('span').wrap('<p class="box" title="hello"></p>')
$('span').wrapAll('<p class="box" title="hello"></p>')
$('span').wrapInner('<p class="box" title="hello"></p>')
$('span').unwrap()
```

```html
<body>
  <div>
    <span>span</span>
  </div>
  <span>span</span>
  <span>span</span>
</body>
```





## add()

* add(selector) : 添加元素到匹配的元素集合。也就是将多个选择器拼接在一起。

```js
// 效果等同于 $('div, p, ul li')
$('div').add('p').add('ul li')
  .css('backgroundColor', 'red')
  .click(function(){
    console.log('click')
  })

// $('div')
//   .css('backgroundColor', 'red')
//   .click(function(){
//     console.log('click')
//   })

// $('p')
// .css('backgroundColor', 'red')
// .click(function(){
//   console.log('click')
// })

// $('ul li')
// .css('backgroundColor', 'red')
// .click(function(){
//   console.log('click')
// })
```



## slice()

* slice(start[, end]) : 根据指定的下标范围，过滤匹配的元素集合，并生成一个新的 jQuery 对象。
  * start : 开始的索引，索引从0开始。如果指定的下标是一个负数，那么代表从末尾开始计数。
  * end : 结束的索引，截取到end-1的位置。如果忽略该参数，则从start开始，一直到最后

```js
$('ul li').slice(1, 4).css('backgroundColor', 'red')
```



## 数据串联化

* serialize() : 将表单中的数据拼接成querystring(查询字符串)
  * `name1=value1&name2=value2`
  * 前提是 input 标签有 name 属性
* serializeArray() : 将表单数据拼接成数组
  * `[{name: "a", value: "1"}, {name: "b", value: "2"}]`

```js
var res1 = $('input').serialize()   // a=1&b=2&c=3
var res2 = $('input').serializeArray()  // [{name: "a", value: "1"}, {name: "b", value: "2"}]
```

```html
<input type="text" name="a" value="1">
<input type="text" name="b" value="2">
<input type="text" name="c" value="3">
```





## jQuery的工具方法

JQ的工具方法和我们自己封装的js方法没有任何区别。

JQ的方法调用: 必须使用JQ对象调用 `$().方法名()`

JQ的工具方法调用: 使用`$.方法名()`调用

常用方法:

* type(data) : 输出当前的数据类型。相当于typeof，但是可以精确判断数据的类型。
* trim() : 去除字符串中的前后空格。相当于js中的trim()
* inArray(value, array) : 返回指定值在数组中出现的索引位置。相当于js中的indexOf()
* parseJSON(jsonStr) : 将json字符串转换为JSON对象。相当于js中的JSON.parse()
* proxy() : 功能类似于js中的bind()
* noConflict() : 释放对 `$ 标识符`的控制
* makeArray() : 将伪数组转成数组。相当于js中的Array.form()

```js
var arr = [1, 2, 3]
var str = 'hello'
var d = new Date()
console.log($.type(arr))  // array
console.log($.type(str))  // string
console.log($.type(d))    // date

var s = '  he l lo  '
console.log('|' + s + '|')          // |  he l lo  |
console.log('|' + $.trim(s) + '|')  // |he l lo|
console.log('|' + s.trim() + '|')   // |he l lo|

var nums = [31, 21, 2]
console.log($.inArray(2, nums)) // 2
console.log(nums.indexOf(21))   // 1

var obj = '{"ret": true, "data": "hello1"}'
console.log(obj)
console.log($.parseJSON(obj))
console.log(JSON.parse(obj))
```



### noConflict() 方法

jQuery 使用 `$` 符号作为 jQuery 的简写。

如果项目中其他框架也使用$符号作为简写的话，可能会导致脚本停止运行。

所以使用 `noConflict()` 方法会释放对 $ 标识符的控制，这样其他脚本就可以使用它了。

注意: 需要把 jQuery 引入在最后面。

```js
$.noConflict()			// 交出 $ 的控制权
$.noConflict(true)	// 交出 $ 和 jQuery 的控制权

jQuery('p').click(function(){
  jQuery(this).hide()
})
```

也可以创建自己的简写

```js
var jq = $.noConflict()
jq('p').click(function(){
  jq(this).hide()
})
```



## jQuery的插件方法

如果想要给JQ新增函数，可以通过以下两个插件方法拓展函数库。

* $.extend() : 拓展工具方法。拓展到 jQuery 本身，作为全局方法调用
  * 语法: `$.extend({ 扩展的方法 })`
  * 调用方式: `$.xxx()`
* $.fn.extend() : 拓展JQ方法。拓展到 jQuery 的原型上，给 jQuery 的元素集合使用
  * 语法: `$.fn.extend({ 扩展的方法 })`
  * 调用方式: `$().xxx()`
* 还有一种常用的语法，`$.extend($.fn, { 拓展的方法 })` ，这样相当于将拓展的方法拷贝被`$.fn对象`上
  * 调用方式: `$().xxx()`

如果需要在拓展方法后面进行链式操作，只要在方法最后`return this` 即可

```js
$.extend({
  aaa: function(){
    console.log('这是一个工具方法')
  }
})

$.fn.extend({
  aaa: function(){
    console.log('这是一个JQ方法')
  }
})

$.extend($.fn, {
  test(){
    console.log('test')
  }
})

// 调用
$.aaa()
$().aaa()
$('html').aaa()
$().test()
```

```js
// 通过拓展方法实现元素拖拽，注意元素的position属性要设置为absolute
$(function(){
  $.fn.extend({
    drag: function(){
      $(this).mousedown(function(ev){
        var offsetX = ev.clientX - $(this).offset().left
        var offsetY = ev.clientY - $(this).offset().top

        var _this = this
        $(document).mousemove(function(ev){
          $(_this).css({
            left: ev.clientX - offsetX,
            top: ev.clientY - offsetY
          })
        })
      })

      $(document).mouseup(function(){
        $(document).off('mousemove')
      })
      
      return this
    }
  })

	$('div, p, span').drag().css('backgroundColor', 'orange')
})
```



## 深浅拷贝

深浅拷贝有三个词，描述对象和对象之前的关系

* 赋值
  * 把一个对象的地址赋值给另一个变量，两个变量操作同一个空间
* 浅拷贝
  * 把对象里面的每一个成员，复制一份一模一样的内容，放到另一个对象里面
  * 当某一个对象成员是复杂数据类型时，这个成员的内存地址依旧是一样的，修改时会互相影响
  * 缺陷: 只是操作对象里面一层可以没有关系，如果再深层次就会出现问题
* 深拷贝
  * 对象空间里面不管多少层，都是相对独立的，没有关系
  * 方案1: 递归思想
  * 方案2: json

深拷贝可以使用 `for in` 遍历赋值，只要碰到某一个是复杂数据类型(对象或者数组)时，再次进入到这个数据类型里面进行二次遍历。



```js
// 赋值
var o1 = {
  name: 'zs',
  age: 18
}

var o2 = o1
o2.name = 'ls'
console.log(o1)	// o1 的 name 也会变成 'ls'
```

```js
// 浅拷贝
var o1 = {
  name: 'zs',
  age: 18,
  info: {
    class: 'js',
    score: 100
  }
}

var o2 = {}

for(let key in o1){
  o2[key] = o1[key]
}

// 浅拷贝中，修改基本数据时不会改变原对象的值，
// 但是修改复杂数据类型时，操作的还是一个内存地址，所以同样会改变原对象的值
o2.name = 'ls'
o2.info.score = 90
console.log(o1, o2)
```

```js
// 深拷贝方案1: 递归
var o1 = {
  name: 'zs',
  age: 18,
  info: {
    class: 'js',
    score: 100,
    time: {
      createTime: 100,
      times: [1, 2, 3, 4, 5]
    }
  }
}

var o2 = {}

// 利用递归思想实现深拷贝
// 把第一遍遍历放在一个函数里面，如果遍历的时候，发现有一个数据是数组或者对象，就重新调用函数
function deep(o2, o1) {
  for (var key in o1) {
    if (o1[key].constructor === Array) {
      o2[key] = []
      deep(o2[key], o1[key])
    } else if (o1[key].constructor === Object) {
      o2[key] = {}
      deep(o2[key], o1[key])
    } else {
      o2[key] = o1[key]
    }
  }
}

deep(o2, o1)
// 无论在o2中如何修改，都不会影响到o1的数据
o2.info.score = 90
o2.info.time.times[0] = 99
console.log(o1, o2)
```

```js
// 深拷贝方案2: json
var o1 = {
  name: 'zs',
  age: 18,
  info: {
    class: 'js',
    score: 100,
    time: {
      createTime: 100,
      times: [1, 2, 3, 4, 5]
    }
  }
}

// 不管多复杂的数据类型，转换成json以后就是字符串，字符串的赋值是基本数据类型，赋值以后再转换回来
var o2 = JSON.parse(JSON.stringify(o1))

// 无论在o2中如何修改，都不会影响到o1的数据
o2.info.score = 90
o2.info.time.times[0] = 99
console.log(o1, o2)
```



## jQuery 中的深浅拷贝

jQuery 里面提供了一个进行深浅拷贝的方法: `$.extend()`

* $.extend(对象1, 对象2, 对象3, ...)
  * 浅拷贝: 把从第二个参数开始的每一个对象的数据拷贝到第一个对象中。
* $.extend(true, 对象1, 对象2, 对象3, ...)
  * 深拷贝: 把从第三个参数开始的每一个对象的数据拷贝到第二个对象中。

注意: 如果要进行拷贝，不管是深拷贝还是浅拷贝，至少传递两个参数。传递一个参数时，不是进行拷贝。

```js
$.extend(o2, o1)				// 浅拷贝
$.extend(true, o2, o1)	// 深拷贝
```

```js
var o1 = {
  name: 'zs',
  age: 18,
  info: {
    class: 'js',
    score: 100,
    time: {
      createTime: 100,
      times: [1, 2, 3, 4, 5]
    }
  }
}

var o2 = {}

// $.extend(o2, o1)  // 浅拷贝
$.extend(true, o2, o1)  // 深拷贝

o2.info.score = 90
o2.info.time.times[0] = 99
console.log(o1, o2)
```







## jQuery cookie

如果要使用JQ创建cookie，还需要引入一个`jquery-cookie.js`文件

* $.cookie(name) : 通过name取值
* $.cookie(name, value) : 设置name和value
* $.cookie(name, value, {可选项}) : 设置cookie的信息
  * 可选项，更多可查阅资料
    * expires : 过期时间。值为整数，表示几天后过期
    * raw : 默认为false，value不进行编码。如果为true，则value要进行编码
* $.cookie(name, null) : 删除cookie

```html
<script src="jquery-3.6.0.min.js"></script>
<script src="jquery-cookie-1.4.1.js"></script>
<script>
  $(function(){
    $.cookie('hlw', 'dawa')
    
    // 7天后过期
    $.cookie('chaoren', 'atm', {
      expires: 7,
      raw: true
    })

    console.log($.cookie('hlw'))  // 'dawa'

    $.cookie('hlw', null)
  })
</script>
```





## jQuery AJAX

### $.ajax()

语法: `$.ajax(options)`

options: 就是本次请求的配置信息，是一个对象数据类型。

配置信息里面可以填写的内容：

* url: 请求地址，必填
* async: 是否异步，默认是异步(true)，可以选填非异步(false)
* type / method: 表示请求发送，默认是GET，可以选填其他请求方式。大小写无所谓
* data: 传递给后端的参数
  * 可以是查询字符串的形式
  * 可以是对象的形式
* dataType: 期望后端返回的数据类型，是否进行 `JSON.parse()` 解析
  * 值可以是 'string'默认, 'json', 'jsonp'
* success: 接收一个函数数据类型，表示成功的回调
* error: 接收一个函数数据类型，表示失败的回调
  * 不光是请求失败会走失败的回调，当你解析失败的时候，也会走失败的回调
* timeout: 设置一个超时时间(毫秒)
  * 从发送请求开始计时，到达超时时间还没有接收到响应，会直接取消本次请求，到失败的回调函数
* cache: 是否缓存。对于ajax请求默认缓存的(true)，可以选填(false)
  * 如果你选择缓存，那么不会由最后一个时间戳参数
  * 如果选择不缓存，那么jQuery 会在本次请求的末尾添加一个时间戳作为参数传递
  * 对于 jsonp 请求，默认不缓存(false)，可以选填(true)。当发送jsonp请求时，会默认带有一个时间戳参数
* context: 上下文。指定回调函数的this指向。
  * jQuery 默认回调函数的this指向 jQuery 封装的 xhr 对象
  * context 传递的是谁，回调函数的this就指向谁

```js
$('button').eq(0).click(function(){
  var obj = { name: 'zs'}
  $.ajax({
    url: 'https://query.asilu.com/weather/baidu',
    type: 'get',
    async: true,
    data: {
      city: '湛江'
    },
    dataType: 'jsonp',  // 跨域
    timeout: 1000,
    cache: false,
    context: obj,
    success: function(res, statusText, xhr){
      // res 就是响应体，会根据dataType 填写的内容来解析
      // statusText的值: success  error
      // xhr : ajax对象
      console.log(res)
      console.log(statusText)
      console.log(xhr)
      console.log(this)
    },
    error: function(xhr, info, err){
      // xhr 是 jQuery 封装的 ajax 对象
      // info 是本次失败的错误信息
      // err 错误的详细信息，但不是很详细(有的错误发生详细，有的错误方式不详细)
      console.log('error')
      console.log(xhr)
      console.log(info)
      console.log(err)
    }
  })
})
```



#### promise 方式

jQuery 对于 ajax 的封装，除了回调函数的形式接收结果，还封装了 promise 的形式接收结果。

一个 `$.ajax()` 方法，可以选择书写回调函数的形式，也可以选择 promise 的形式，但不要都使用。

```js
$.ajax({
  url: './server/get.php',
  success(res){
    console.log(res)
  }
})

$.ajax({
  url: './server/get.php'
}).then((res) => console.log(res))
```



#### 发送 jsonp 请求专用的配置项:

* jsonp: 表示携带函数名的那个key
* jsonpCallback: 表示你自主定义的函数名
  * 默认值是 jQuery 自己组装的 jQuery-版本号随机数_时间戳
  * 当你需要运行自定义方法时，修改这个值为方法名会很有用

```js
$.ajax({
  url: 'http://127.0.0.1:5501/get',
  dataType: 'jsonp',
  success(res){
    console.log(res)
  },
  cache: true,
  jsonp: 'cb',
  jsonpCallback: 'fn'
})
```



当设置 dataType 为 jsonp，并发送跨域请求时，浏览器在发送请求时，会在请求地址中添加一个callback和时间戳参数传递给服务器。

```
http://127.0.0.1:5501/get?callback=jQuery36008246206679948069_1630135661130&_=1630135661131
```

服务器端需要把要响应的数据包裹在callback参数中返回。



```js
// 浏览器
$.ajax({
  url: 'http://127.0.0.1:5501/get',
  dataType: 'jsonp',
  success(data){
    console.log(data)
  },
  error(){
    console.log('请求失败')
  }
})
```

```js
// 服务器
const http = require('http')
const url = require('url')

const hostname = '127.0.0.1'
const port = 5501

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json;charset=utf-8')

  // 拿到url中查询字符串部分，并解析成对象。
  //console.log(url.parse(req.url, true).query)

  // 拿到通过 url.parse() 解析过的路径中的查询字符串部分
  var cb = url.parse(req.url, true).query.callback

  // 使用传递过来的callback中的方法名包裹住要返回的数据 'cb(数据)'
  res.write(`${cb}({name: "hello2"})`)
  res.end()
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在http://${hostname}:${port}`)
})
```







### 为什么GET请求会自动缓存？

因为你两次发送同一个请求(也就是请求地址一模一样)，浏览器就有可能会存储下来。

不想进行缓存，需要让每一次的请求地址不一样。每次请求的时候，在最后携带一个没有用的参数，值设置成时间戳，这样每次请求的地址就不一样了。





### 全局钩子函数

也叫做全局 ajax 函数，出现在 ajax 的不同阶段。

在一个 ajax 的整个周期中，会在不同的位置执行的函数。

我们管这种在一个事情的生命周期各个不同时期触发的函数叫做 钩子函数，也叫做生命周期函数。

它不是自主触发的函数，而是挂钩在其他的事情上，由其他的事情发生过程中被触发



* ajaxStart() : 表示在同一个作用域下多个ajax请求的时候，第一个ajax请求之前触发
* ajaxSend() : 表示在每一个请求发送之前触发，只要有一个请求执行send方法了，就会先触发钩子函数
* ajaxSuccess() : 表示在每一个请求成功之后触发，只要有一个请求成功了，就会触发一次
* ajaxError() : 表示在每一个请求失败之后触发，只要有一个请求失败了，就会触发一次
  * 根据 jQuery 判断的失败
* ajaxComplete() : 表示在每一个请求完成之后触发
  * 只要有一个请求完成了，不管成功还是失败，只要完成了就会触发
* ajaxStop() : 表示在同一个作用域下，最后一个ajax请求结束以后触发。
  * 当有多个请求的时候，会在最后一个结束以后触发这个钩子



```js
// 需要在发送请求之前，把钩子函数挂载
$(window).ajaxStart(function(){
  console.log('第一个请求开始')
})

$(window).ajaxSend(function(){
  console.log('有一个请求要发送出去了')
})

$(window).ajaxSuccess(function(){
  console.log('有一个请求成功了')
})

$(window).ajaxError(function(){
  console.log('有一个请求失败了')
})

$(window).ajaxComplete(function(){
  console.log('有一个请求完成了')
})

$(window).ajaxStop(function(){
  console.log('请求全部结束了')
})

$.ajax({
  url: './server/get.php',
  success(res){
    console.log(res)
  }
})
```





### load()

load() 方法从服务器加载数据，并把返回的数据放入被选元素的innerHTML中。

注意：返回的数据会覆盖掉被选元素原有的内容。

```
$(selector).load(URL [,data, callback])
```

* URL : 必需，规定您希望加载的 URL。
* data : 可选，规定与请求一同发送的查询字符串键/值对集合。
* callback : 可选， load() 方法完成后所执行的回调函数。回调函数可以设置不同的参数：
  * responseTxt : 包含调用成功时的结果内容
  * statusTXT : 包含调用的状态信息。值为success / error
  * xhr : 包含 XMLHttpRequest 对象



```js
$('#div1').load('test.txt')

// 也可以把 jQuery 选择器添加到 URL 参数。
// 把 "test.txt" 文件中 id="p1" 的元素的内容，加载到指定的 <div> 元素中
$('#div1').load('test.txt #p1')

$('#div1').load('test.txt', function(responseText, statusText, xhr){
  console.log(responseText)   // 响应内容
  console.log(statusText)   // 状态信息 success / error
  console.log(xhr)          // XMLHttpRequest对象
})
```



### $.get() 和 $.post()

两种在客户端和服务器端进行请求-响应的常用方法是：GET 和 POST。

* $.get(地址, 传递给后端的数据, 回调函数, 期望返回的数据类型) : 从指定的资源请求数据
  * 地址: 请求地址 (也可以自主拼接参数，但不推荐)
  * 数据: 给后端的数据，可以写成`'key=value&key=value'` ，也看可以写 `{ ... }`
  * 回调: 请求成功的回调，请求成功后触发。里面可以有三个参数
    * data: 响应内容
    * statusText: 请求的状态信息
    * xhr: XMLHttpRequest对象
  * 期望返回的数据类型: 是不是执行解析响应体的操作
    * 'text' : 不解析
    * 'json' : 会执行一步 `JSON.parse()`
    * xml, html, script
* $.post(地址, 传递给后端的数据, 回调函数, 期望返回的数据类型) : 向指定的资源提交要处理的数据
  * 四个参数的意义和$.get() 一模一样

get()和post()都可以向服务器获取数据，但是，GET方法可能返回缓存数据，而POST方法不会缓存数据。



```
$.get(url, [data], [callback], [type])
$.post(url, [data], [callback], [type])
```



第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

```js
$.get('test.txt', function(data, status){
  // 第一个参数是响应内容， 第二个参数是请求的状态
  console.log(`数据：${data}, 状态：${status}`)
})

$('button').eq(0).click(function(){
 $.get('1.txt', function(data, statusText, xhr){
  console.log(data)
 })
})

$('button').eq(1).click(function(){
  $.post('post.php', {user:'zs', age: 21}, function(data, statusText, xhr){
    console.log(data)
  })
})
```



```js
$.get('./server/get.php?a=100&b=200', function(res){
  console.log(res)
}, 'json')

$.get('./server/get.php', 'c=300&d=400', function(res){
  console.log(res)
}, 'json')

$.get('./server/get.php', { e: 500, f: 600}, function(res){
  console.log(res)
}, 'json')


$.post('./server/post.php', 'a=100&b=200', function(res){
  console.log(res)
}, 'json')

$.post('./server/post.php', { c: 300, d: 400}, (res) => {
  console.log(res)
}, 'json')
```



### $.getJSON()

简化的 ajax 的 jsonp 格式

```
$.getJSON(url, [data], [callback])
```

```js
// getJSON的请求方式，url没有携带callback数据，需要我们自己添加一个
// callback=?  ?表示jQuery会自动给我们添加一个值
$.getJSON('http://127.0.0.1:5501/get?callback=?', 'name=张三', function(data){
  console.log(data)
})
```







## 实用插件

### jQuery Validate 表单验证插件

jQuery Validate 插件为表单提供了强大的验证功能，让客户端表单验证变得更简单，同时提供了大量的定制选项，满足应用程序各种需求。

官网地址: https://jqueryvalidation.org/

参考地址: https://www.runoob.com/jquery/jquery-plugin-validate.html



使用方法

1. 下载插件
2. 导入文件
   1. 先导入 jquery.js
   2. 再导入 jquery.validate.js
   3. 可以选择导入中文提示信息文件 messages_zh.js 
3. 正式使用
   1. 获取 form 标签
   2. 调用 validata() 方法，传递参数为一个对象
   3. 在 validata() 的参数对象中可以书写 rules(校验规则)、message(自定义提示信息)、submitHandler(表单验证通过的提交事件) 等
4. 可以在 ` $.validator.addMethod()` 中添加自定义校验规则，并在 rules 中使用



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form action="" class="cmxform" id="login" method="get">
    <p>
      <label for="username">用户名</label>
      <input type="text" id="username" name="username">
    </p>
    <p>
      <label for="password">密码</label>
      <input type="text" id="password" name="password">
    </p>
    <p>
      <label for="email">邮箱</label>
      <input type="text" id="email" name="email">
    </p>
    <p>
      <label for="gender">性别</label>
      <input type="radio" id="gender" name="gender" value="male">男
      <input type="radio" id="gender" name="gender" value="female">女
      <!-- 如果出现提示信息没有显示在末尾，只需将显示提示信息的label复制到末尾并隐藏 -->
      <label id="gender-error" class="error" for="gender" hidden>必填</label>
    </p>
    <button>提交</button>
  </form>

  <script src="../jquery-3.6.0.min.js"></script>
  <script src="../jqueryvalidate/jquery.validate.js"></script>
  <script src="../jqueryvalidate/localization/messages_zh.js"></script>
  <script>
    $(function(){
      // 添加一个自定义校验规则
      $.validator.addMethod('email163', function (val, ele) {
        const reg = /^[a-zA-Z0-9]\w{5,11}@(163|qq)\.(com|cn)$/
        return reg.test(val)
      }, $.validator.format('只能支持 163 和 qq 邮箱，请更换后重试'))

      $('#login').validate({
        // 规则: 成员表示的意义就是校验规则
        rules: {
          // key 是匹配 form 标签中的 name 属性，value 是匹配到的表单的验证规则
          username: 'required',
          // value 也可以是对象的形式，用来书写多个规则
          password: {
            required: true,
            maxlength: 10,
            minlength: 5
          },
          email: 'email163',
          gender: 'required'
        },
        // 消息: 表示自定义的提示消息
        messages: {
          // key 是匹配 form 标签中的 name 属性，value 就是验证不通过的时候的提示文本
          username: '请填写该字段',
          password: {
            required: '这个字段还没有填写',
            maxlength: '别超过 10 个',
            minlength: '还不到 5 个'
          },
          gender: '必填'
        },
        // 表单验证通过的提交事件
        submitHandler (form) {
          // form 参数就是表单标签
          console.log(form)
          // serialize() 会将表单中的数据拼接成querystring(查询字符串)
          console.log($(form).serialize())
          console.log('我要发送 ajax 请求到后端')
        }
      })
    })
  </script>
</body>
</html>
```



#### 提示信息显示位置问题

当遇到单选或多选按钮不满足验证规则时，默认的会出现提示信息显示在单选或多选按钮中间。这时需要将提示信息显示在最后面。

1. 首先在浏览器控制台中找到显示该条提示信息的 label 标签
2. 将该标签复制到 input 标签的末尾，并将该标签设置为隐藏

```html
<!-- 伪代码 -->
<p>
  <label for="gender">性别</label>
  <input type="radio" id="gender" name="gender" value="male">男
  <input type="radio" id="gender" name="gender" value="female">女
  <!-- 如果出现提示信息没有显示在末尾，只需将显示提示信息的label复制到末尾并隐藏 -->
  <label id="gender-error" class="error" for="gender" hidden>必填</label>
</p>
```



#### 添加自定义校验规则

```js
$.validator.addMethod(校验规则名称, function(value, element, params){}, $.validator.format(自定义提示信息))
```

* value: 当前校验的 input 标签的 value 属性值
* element: 当前校验的 input 标签对象
* params: 自定义规则传递的参数
* $.validator.format(): 可选，用于设置验证失败时的提示信息。validate() 中的 messages 更优先。



**注意: function() 中需要返回一个布尔值，用于判断是否验证成功。**

* return true : 验证成功，放行，继续调用下一个规则或者提交服务器
* return false: 验证失败，阻止表单提交服务器，给用户显示错误信息

```html
<p>
  <label for="code">邀请码</label>
  <input type="text" id="code" name="code">
</p>
```

```js
$.validator.addMethod('checkcode', function(value, element, params) {
  console.log(value, element, params)
  if (value == '888') return true
  return false
})

$('#login').validate({
  rules: {
    code: {
      required: true,
      checkcode: [1, 2]
    }
  },
  messages: {
    code: {
      required: '必填',
      checkcode: '邀请码不正确'
    }
  }
})
```



### jQuery Mobile

jQuery Mobile 是用于创建移动 Web 应用的前端开发框架。

通过使用jQuery Mobile 可以 "写更少的代码，做更多的事情" : 它可以通过一个灵活及简单的方式来布局网页，且兼容所有移动设备。

官网: https://jquerymobile.com/

菜鸟教程: https://www.runoob.com/jquerymobile/jquerymobile-tutorial.html



## 引入

```html
<head>

<!-- meta使用viewport以确保页面可自由缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- 引入 jQuery Mobile 样式 -->
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">

<!-- 引入 jQuery 库 -->
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>

<!-- 引入 jQuery Mobile 库 -->
<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>

</head>
```



## 技巧

排他操作

```js
// 自己添加样式，并让同级的其他元素去掉样式
$(this).addClass('active').siblings().removeClass('active')
```





## 参考手册

URL: https://www.runoob.com/jquery/jquery-ref-selectors.html









































































