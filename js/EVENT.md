# Event

## Window事件属性

​	针对window对象触发的事件(应用到`<body>`标签)：

* onload : 在所有资源和DOM完全加载后调用。当页面从缓存加载时不会被调用，例如使用后退按钮。
* onunload : 在关闭窗口资源和内容的时候触发。重载页面也会触发unload 事件（以及 onload 事件）。
* onresize : 当浏览器窗口被调整大小时触发。
* onbeforeprint : 设置页面打印之后立即触发，但是在打印对话框出现之前。
* onafterprint : 打印对话框已出现之后触发。
* onerror : 当资源加载失败或在运行时发生错误时调用
* onhashchange : 当一个窗口的 hash（URL 中 # 后面的部分）改变时就会触发(可参见 location.hash)
* onstorage : 当会话存储或本地存储发生更改时调用。该事件不在导致数据变化的当前页面触发。



注意事项：

* 某些浏览器会意外触发onresize事件，慎用。
* 某些浏览器对onbeforeprint和onafterprint触发条件有不相同，慎用。





## Form事件

由 HTML 表单内的动作触发的事件（应用到几乎所有 HTML 元素，但最常用在 form 元素中）：

* onfocus : 当元素获得焦点时运行的脚本。
* onblur : 当元素失去焦点时运行的脚本。
* onchange : 在元素值被改变时运行的脚本。
* onselect : 在文本框和文本域内选择文本后才会触发。
* oninput : 当元素获得用户输入时运行的脚本。
* onsubmit : 在提交表单时触发。
* onreset : 当表单中的重置按钮被点击时触发。

```html
<form action="form_action.asp" onsubmit="console.log('onsubmit')" onreset="console.log('onreset')" >
	用户名：<input type="text" onchange="console.log('onchange')" onselect="console.log('onselect')"><br>
	密码：<input type="text" onfocus="console.log('onfocus')" onblur="console.log('onblur')" oninput="console.log('oninput')"><br>
	<input type="submit" ><input type="reset" >
</form>
```



## Keyboard事件

​	相对于 onkeydown 事件的事件次序：onkeydown onkeypress onkeyup

​	IE 部分版本不支持。

* onkeydown : 在用户按下按键时触发。推荐。
* onkeypress : 在用户敲击按钮时触发。onkeypress 事件不会被所有按键触发。
* onkeyup : 当用户释放按键时触发。

```html
<body onkeydown="console.log('onkeydown')" onkeypress="console.log('onkeypress')" onkeyup="console.log('onkeyup')" >

</body>
```



## Mouse事件

​	由鼠标或类似用户动作触发的事件：

* onclick : 元素上发生鼠标点击时触发。
* ondblclick : 元素上发生鼠标双击时触发。
* onmousedown : 当元素上按下鼠标按钮时触发。
* onmouseup : 当在元素上释放鼠标按钮时触发。
* onmousemove : 当鼠标指针移动到元素上时触发。
* onmouseover : 当鼠标指针移动到元素上时触发。每次进入只触发一次。
* onmouseout : 当鼠标指针移出元素时触发。
* onmousewheel : 当鼠标滚轮正在被滚动时运行的脚本。
* ondrag : 元素被拖动时运行的脚本。
* ondragend : 元素结束拖动时运行的脚本。
* ondragenter : 当元素元素已被拖动到有效拖放区域时运行的脚本。
* ondragleave : 当元素离开有效拖放目标时运行的脚本。
* ondragover : 当元素在有效拖放目标上正在被拖动时运行的脚本。
* ondragstart : 在拖动操作开端运行的脚本。
* ondrop : 当被拖元素正在被拖放时运行的脚本。
* onscroll : 当元素滚动条被滚动时运行的脚本。
* onwheel : 当用户在相应元素上滚动滑轮时触发，IE不支持
* oncontentmenu : 当按下鼠标右键时触发

```html
<img src="aa.png" onclick="console.log('onclick')" ondblclick="console.log('ondblclick')" >
<img src="aa.png" onmousedown="console.log('onmousedown')" onmouseup="console.log('onmouseup')" onmousemove="console.log('onmousemove')" onmouseover="console.log('onmouseover')" onmouseout="console.log('onmouseout')" onmousewheel="console.log('onmousewheel')"><br>

<div contenteditable>可编辑区域</div>

<a href="#" ondrag="console.log('ondrag')" ondragend="console.log('ondragend')" ondragenter="console.log('ondragenter')" ondragleave="console.log('ondragleave')" ondragover="console.log('ondragover')" ondragstart="console.log('ondragstart')" ondrop="console.log('ondrop')">链接</a>

<textarea cols="30" rows="5" onscroll="console.log('onscroll')"></textarea>
```





## Media事件

​	由媒介（比如视频、图像和音频）触发的事件（适用于所有 HTML 元素，但常见于媒介元素中，比如 `<audio>`、`<embed>`、`<img>`、`<object>` 以及 `<video>`）:





## 常用事件

* onload : 页面加载完毕后，一般用于body元素
* onunload : 页面关闭后，一般用于body元素
* onfocus : 失去焦点
* onblur : 获得焦点
* onclick : 点击
* onmouseover : 当鼠标经过时
* onmouseout : 当鼠标离开时
* onmousedown : 当鼠标按下时
* onmouseup : 当鼠标抬起时
* onmousemove : 当鼠标移动时
* onchange : 当内容改变时
* onselect : 当内容被选择时
* onkeydown : 当键盘按下时
* onkeypress : 当键盘点击时
* onkeyup : 当键盘抬起时
* onsubmit : 当表单提交时
* onreset : 当表单重置时



## 事件监听

如果我们想为一个对象的某个事件指定多个事件处理，可以考虑使用事件监听。

事件目标可以是一个文档上的元素 `Element`,`Document`和`Window`或者任何其他支持事件的对象 (比如 `XMLHttpRequest`)。

W3C方法: addEventListener(type, callback [,capture]) `IE9支持`

* type : 事件名，没有"on"前缀。如：click、submit、change
* callback : 事件处理程序
* capture : 可选，事件模型
  * false : 默认，冒泡模型
  * true : 捕捉模型
* 触发顺序：先绑定，先触发



对于IE9以下版本：使用attachEvent(type, callback)方法

* type : 事件名，有"on"前缀。如：onclick、onsubmit、onchange
* callback : 事件处理程序
* 触发顺序：先绑定，后触发

```html
<script>
  function fn1(){
    console.log('fn1')
  }
  function fn2(){
    console.log('fn2')
  }

  window.onload = function(){
    document.getElementById('div1').addEventListener('click', fn1)
    document.getElementById('div1').addEventListener('click', fn2)

    // IE9 以下版本
    // document.getElementById('div1').attachEvent('onclick', fn1)
    // document.getElementById('div1').attachEvent('onclick', fn1)
  }
</script>
<div id="div1">事件监听</div>
```

```js
// 封装方法，通过window.attachEvent属性是否存在，判断出浏览器版本
function addEvent(obj, type, callback){
  if(window.attachEvent){
    // IE9 以下版本
    obj.attachEvent('on'+type, callback)
  }else{
    // W3C 
    obj.addEventListener(type, callback)
  }
}

addEvent(document.getElementById('div1'), 'click', fn1)
```



## 移除事件监听

removeEventListener() : 删除使用 `EventTarget.addEventListener()` 方法添加的事件。`IE9支持`

```
target.removeEventListener(type, listener[, useCapture])
```

* type : 一个字符串，表示需要移除的事件类型，如 `"click"`。
* listener : 需要从目标事件移除的 `EventListener` 函数。
* useCapture : 可选，指定需要移除的 `EventListener` 函数是否为捕获监听器。如果无此参数，默认值为 `false`。
  * 如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，这两次事件需要分别移除。两者不会互相干扰。移除捕获监听器不会影响非捕获版本的相同监听器，反之亦然。

注意: removeEventListener()中的参数要和addEventListener()一样，才能成功移除。



```js
window.onload = function(){
  document.getElementById('div1').addEventListener('click', fn1, false)
  document.getElementById('btn').onclick = function(){
    document.getElementById('div1').removeEventListener('click', fn1, false)
  }
}
function fn1(){
  console.log('fn1')
}
```







## 事件模型

事件模型分为两种：冒泡模型，捕捉模型。

* 冒泡模型：当嵌套元素都有相同事件，在事件触发时，会从底向上依次触发。
  * 取消冒泡的方式：
  * event.stopPropagation()
  * window.event.cancelBubble=true  //低版本IE也兼容
* 捕捉模型：当嵌套元素都有相同事件，在事件触发时，会从上到下依次触发。

```html
<!-- 冒泡模型 -->
<head>
	<style>
		#div1{ width: 300px; height: 300px; background-color: red;}
		#div2{ width: 200px; height: 200px; background-color: green;}
		#div3{ width: 100px; height: 100px; background-color: blue;}
	</style>
</head>
<body>
	<script>
		window.onload = function(){
			document.getElementById('div1').onclick = function(){
				console.log('div1')
			}
			document.getElementById('div2').onclick = function(){
				console.log('div2')
				// 取消冒泡
				window.event.cancelBubble=true
			}
			document.getElementById('div3').onclick = function(){
				console.log('div3')
         // 取消冒泡
				event.stopPropagation()
			}
		}
	</script>
	<div id="div1">
		<div id="div2">
			<div id="div3">
			</div>
		</div>
	</div>
</body>
```



## 默认行为

有些html元素，有自己的行为，如，提交按钮、超链接等。

有些时候，我们需要对默认行为进行取消，如表单按钮点击时，用户资料填写不完整，需要将按钮默认行为取消。

取消默认行为方式：

* return false
* event.preventDefault()
* window.event.returnValue = false  //低版本IE也兼容

```html
<script>
  window.onload = function(){
    document.getElementById('submit').onclick = function(){
      if(document.getElementById('username').value == ''){
        // 取消默认行为
        // return false
        // window.event.returnValue = false
        event.preventDefault()
      }
    }
  }
</script>
<form action="form_action.asp">
  <input type="text" id="username" name="username" >
  <input type="submit" value="提交" id="submit">
</form>

<a href="https://www.huangyihui.cn" onclick="return false;">跳转</a>
```



## 事件委托

事件委托就是自身不对事件进行处理，而是将事件交给父级处理。在事件处理中，判断触发事件的目标对象，再进行相应的处理。

```html
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>

<script>
  var ul = document.getElementById('list')
  ul.onclick = function(e) {
    var event = e || window.event   // 获取event对象
    var target = event.target || event.srcElement   // 获取触发事件的目标对象
    if(target.nodeName.toLowerCase() == 'li'){      // 判断目标对象是不是li
      console.log(target.innerText)
    }

    // 简写
    // if(e.target.nodeName.toLowerCase() == 'li') console.log(e.target.innerText)
  }
</script>
```







## 移动端事件

移动端事件会有300毫秒的延迟。

解决方案：

* 设置meta viewport
* fastclick库
* Zepto.js库
  * 轻量级js库。和jquery用法类似，不支持IE<10
  * 提供touch手势支持，解决300ms。（tap取代click）



* touchstart : 手指按下
* touchmove : 手指移动
* touchend : 手指抬起
* touchcanel : 触摸被取消(例如出现通知、电话、微信等)

```js
var div1 = document.getElementById('div1')
div1.addEventListener('touchstart', function(){
  div1.innerHTML += '按下' + '<br>'
})
div1.addEventListener('touchmove', function(){
  div1.innerHTML += '移动' + '<br>'
})
div1.addEventListener('touchend', function(){
  div1.innerHTML += '抬起' + '<br>'
})
```



## Hammer.js

触屏设备手势库。

hammer.js

vue touch

