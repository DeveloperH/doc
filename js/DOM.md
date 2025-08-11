# DOM

`DOM(Document Object Model)` : 文档对象模型，又称为文档树模型，是一套操作HTML和XML文档的`API`。

DOM可以把HTML和XML描述为一个文档树，树上的每一个分支都可以视作一个对象，通过DOM可以添加、修改和移除文档上的某一部分。



**概念点:**

* `DOM`就是把HTML视为一个层次结构(树形结构)的文档。
* `文档(Document)`: 就是指HTML或者XML文件。
* `节点(Node)`: HTML文档中的所有内容都可以称之为节点。
* `元素(Element)`: HTML文档中的标签可以称为元素。
* `文档根元素(root)`: 文档中的第一个元素，HTML文档根元素就是`<html>`。
* 文本节点: 像是`<br>`换行，或者两个标签中间的文字内容。
* 属性节点
* 父节点`parent`、子节点`child`、兄弟节点`silbing`



**DOM可以做什么?**

1. 找对象(元素)
2. 设置元素的属性
3. 设置元素的样式
4. 动态创建和删除元素
5. 事件-->触发响应



简单的DOM操作例子:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>DOM</title>
  <script>
    window.onload = function(){
      var login = document.getElementById('login')
      login.onclick = function(){
        var uname = document.getElementById('uname')
        var pwd = document.getElementById('pwd')

        if(uname.value.length == 0 || pwd.value.length == 0){
          alert('请输入用户名和密码')
          return
        }
        if(uname.value == 'admin' && pwd.value == '123456'){
          alert('登录成功')
          return
        } else{
          alert('用户名或密码不正确')
          return
        }
      }
    }
  </script>
</head>
<body>
  <input type="text" id="uname" placeholder="用户名"><br>
  <input type="password" id="pwd" placeholder="密码"><br>
  <button id="login">登录</button>
</body>
</html>
```



## document 文档对象

### 属性

* body : 返回当前文档中的`<body>元素`或者`<frameset>元素`.
* head : 返回当前文档的 `<head>` 元素。如果有多个 `<head>` 元素，则返回第一个。IE9支持
* documentElement : 只读，返回文档对象的根元素。对于HTML文档，则代表该文档的`<html>`元素
* forms : 只读，返回一个包含当前文档中所有表单元素 `<form>` 的列表。
* images : 只读，返回当前文档中所包含的图片的列表。
* links : 只读，返回一个包含文档中所有超链接的列表。
* scripts : 只读，返回文档中所有的 `<script>` 元素。
* location : 只读，返回一个 `Location` 对象，包含有文档的 URL 相关的信息，并提供了改变该 URL 和加载其他 URL 的方法。
* title : 获取或设置文档的标题。
* URL : 只读，返回当前文档的URL地址
* documentURI : 只读，以字符串的类型，返回当前文档的路径。
* referrer : 只读，返回来源页面的 URI。如果用户直接打开了这个页面（不是通过页面跳转，而是通过地址栏或者书签等打开的），则该属性为空字符串。
* characterSet : 只读，返回文档正在使用的字符集。等同于document.charset
* cookie : 返回一个使用分号分隔的 cookie 列表，或设置（写入）一个 cookie。
* contentType : 只读，返回当前文档的Content-Type(MIME)类型.`IE不支持`
* doctype : 只读，返回当前文档的文档类型定义（DTD）。如果当前文档没有DTD，则该属性返回`null`。
* defaultView : 只读，返回当前 document 对象所关联的 `window` 对象，如果没有则返回null。IE9支持
* lastModified : 只读，返回一个字符串，其中包含了当前文档的最后修改日期和时间.
* embeds : 只读，以列表(list)的类型，返回当前文档的嵌入式的元素 `<embed>` 。
* plugins : 只读，返回一个可用插件列表。
* hidden : 只读，返回一个布尔值，表明当前页面是否隐藏。IE10支持
* visibilityState : 返回 `string` 表明当前文档的可见性。可能的取值有 `visible`, `hidden`, `prerender`, and `unloaded`。  IE10支持。可以用来判断用户是否离开当前页面。
  * `visible` : 此时页面内容至少是部分可见. 即此页面在前景标签页中，并且窗口没有最小化.
  * `hidden` : 此时页面对用户不可见. 即文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于 '锁屏状态' 
  * `prerender` : 页面此时正在渲染中, 因此是不可见的 
  * 当此属性的值改变时, 会递交 `visibilitychange` 事件给Document.
* readyState : 只读，返回当前文档的加载状态。IE慎用
  * loading : 正在加载
  * interactive : 可交互。文档已被解析，"正在加载"状态结束，但是诸如图像，样式表和框架之类的子资源仍在加载。
  * complete : 完成。文档和所有子资源已完成加载。表示 load 状态的事件即将被触发。
  * 当该属性值发生变化时，会在 document 对象上触发 `readystatechange`事件。
* activeElement : 返回当前获得焦点的 `Element` ，如果没有焦点元素，会返回 `<body>` 或者 null 。
  * 焦点元素一般是`<input>`、`<textarea>`
* styleSheets : 只读，返回显式链接到或嵌入到文档中的样式表的`CSSStyleSheet`对象的`StyleSheetList`。
* designMode：控制整个文档是否可编辑。有效值为 `"on"` 和 `"off"` 。开启后可以编辑网页内容。



不推荐使用的属性:

* all : 只读，返回一个 `HTMLAllCollection`，包含了页面上的所有元素。
* bgColor : 获取/设置当前文档的背景颜色
* fgColor : 获取或设置当前文档的前景色或者文本颜色.
* linkColor : 获取和设置文档内超链接元素的颜色
* alinkColor : 返回或设置文档体内的活动链接的颜色。
* vlinkColor : 返回或设置文档体内的访问过的链接的颜色。
* anchors : 只读，返回文档中所有锚点元素的列表。(只返回那些拥有`name属性的a元素`)
* fullscreenElement : 只读，回当前文档中正在以全屏模式显示的Element节点,如果没有使用全屏模式,则返回null。注意，各浏览器的前缀不同。



### 方法

* getElementById(id) : 返回一个匹配特定 ID的元素，没找到则返回null
* getElementsByName(name) : 通过name属性值获取某些元素，返回的一个实时更新的 `NodeList` 集合
  * IE返回一个 HTMLCollection
* getElementsByTagName(tagName) : 通过标签名获取某些元素，返回的 `HTML集合`是动态的, 意味着它可以自动更新自己来保持和 DOM 树的同步而不用再次调用 `document.getElementsByTagName()` 。
  * tagName 为 `*` 代表所有元素。
  * 也可以在指定元素上调用，它的搜索被限制为指定元素的后代。
* getElementsByClassName(classNames) : 返回一个包含了所有指定类名的子元素的类数组对象。IE9支持
  * classNames : 表示要匹配的类名列表；类名通过空格分隔
  * 当在document对象上调用时，会搜索整个DOM文档，包含根节点。
  * 也可以在任何元素上调用，不仅仅是 document。 调用这个方法的元素将作为本次查找的根元素.
* querySelector(selectors) : 返回文档中与指定选择器或选择器组匹配的第一个 `HTMLElement`对象。 如果找不到匹配项，则返回null。IE9支持
  *  匹配是使用深度优先先序遍历，从文档标记中的第一个元素开始，并按子节点的顺序依次遍历。
* querySelectorAll(selectors) : 返回与指定的选择器组匹配的文档中的元素列表 (使用深度优先的先序遍历文档的节点)。返回的对象是 `NodeList` 。在没有匹配的情况下返回为空的`NodeList`
* createElement(tagName) : 用给定标签名 tagName 创建一个新的元素并返回
* createTextNode(data) : 创建一个文档节点并返回
* createAttribute(name) : 创建并返回一个新的属性`Attr`节点
* getAttribute(name) : 获取元素中的指定属性值，没有那个属性则返回null
* createComment(data) : 创建一个新的注释节点并返回。如果data字符串包含了 "--" 则会抛出异常
* createDocumentFragment() : 创建并返回一个新的空白的文档片段`DocumentFragment`
  * `DocumentFragments` 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。
  * 因为文档片段存在于**内存中**，并不在DOM树中，因此，使用文档片段通常会带来更好的性能。
* open() : 打开一个要写入的文档。这将会有一些连带的影响。例如：
  * 此时已注册到文档、文档中的节点或文档的window的所有事件监听器会被清除。
  * 文档中的所有节点会被清除。
* close() : 结束由 对文档的`Document.write()`写入操作，这种写入操作一般由`Document.open()`打开。
* write(data) : 将一个文本字符串写入一个由 document.open() 打开的文档流
  * 会自动调用 document.open()，这将清空该文档的内容
* writeln(data) :  document.write 一样，但是会添加一个换行符。
* hasFocus : 返回一个 Boolean，表明当前文档或者当前文档内的节点是否获得了焦点。



```js
// 获取所有 class 为 'test' 的元素:
document.getElementsByClassName('test')

// 获取所有 class 同时包括 'red' 和 'test' 的元素.
document.getElementsByClassName('red test')

// 在id 为'main'的元素的子节点中，获取所有class为'test'的元素
document.getElementById('main').getElementsByClassName('test')

// 获取所有p元素
document.getElementsByTagName('p')

// 获取id为test的元素
document.getElementById('test')

// 获取name属性值为'login'的元素
document.getElementsByName('login')

// 获取文档中第一个类名为'a1'的元素
document.querySelector('.a1')
// 获取文档中所有类名为'a1'的元素
document.querySelectorAll('.a1')
// 复杂的选择器 <div class="user-panel main"><input name="login"></div>
document.querySelector("div.user-panel.main input[name='login']")
```

```js
// 创建一个元素并添加到DOM中
window.onload = function(){
  // 创建一个新的 div 元素
  let newDiv = document.createElement("div")
  // 给它一些内容
  let newContent = document.createTextNode("这是新创建的div元素内容")
  // 添加文本节点 到这个新的 div 元素
  newDiv.appendChild(newContent)

  // 将这个新的元素和它的文本添加到 DOM 中
  let currentDiv = document.getElementById("div1")
  currentDiv.appendChild(newDiv)
}
```



```js
// 创建一个属性节点并添加到div1元素中
window.onload = function(){
  var node = document.getElementById("div1")
  var a = document.createAttribute("my_attrib")
  a.value = "newVal"
  node.setAttributeNode(a)
  console.log(node.getAttribute("my_attrib"))	// "newVal"
}
```

```js
// 创建文档片段，再将文档片段添加到元素中
window.onload = function(){
  var element  = document.getElementById('ul')
  var fragment = document.createDocumentFragment()
  var browsers = ['Firefox', 'Chrome', 'Internet Explorer']

  browsers.forEach(function(browser) {
      var li = document.createElement('li')
      li.textContent = browser
      fragment.appendChild(li)
  })

  element.appendChild(fragment)
}
```

```js
// 设置标签的属性值
document.title = 'title'
document.querySelector('meta[name="keywords"]').setAttribute("content", '内容');
```





## Node 接口

以下接口都从 `Node` 继承其方法和属性：

`Document`, `Element`, `Attr`, `DocumentFragment`, `DocumentType`, `CharacterData`, `ProcessingInstruction`



属性:

* childNodes : 只读，返回一个包含了该节点所有子节点的实时的`NodeList`。
  * 空白符、换行符、制表符都会充当为一个文本节点，返回`#text`
* firstChild : 只读，返回该节点的第一个子节点`Node`，如果该节点没有子节点则返回null。
  * 空白符、换行符、制表符都会充当为一个文本节点，返回`#text`
* lastChild : 只读，返回该节点的最后一个子节点`Node`，如果该节点没有子节点则返回null。
* nextSibling : 只读，返回与该节点同级的下一个节点 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)，如果没有返回`null`。
  * 空白符、换行符、制表符都会充当为一个文本节点，返回`#text`
* previousSibling : 只读，返回当前节点的前一个兄弟节点,没有则返回`null.`
  * 空白符、换行符、制表符都会充当为一个文本节点，返回`#text`
* parentNode : 只读，返回一个当前节点 Node的父节点。找不到则返回null
* parentElement : 只读，返回一个当前节点的父节点 `Element`。如果该元素没有父节点，或者父节点不是一个 DOM 元素，则返回 null。IE9支持
* textContent : 返回或设置一个元素内所有子节点及其后代的文本内容。IE9支持
  * 如果节点是一个 `document`，或者一个 `DOCTYPE` ，则 textContent 返回 `null`
* nodeValue : 返回或设置当前节点的值。如果`nodeValue的值为null`,则对它赋值也不会有任何效果.
  * 对于文档节点来说, `nodeValue`返回`null`.
  * 对于text, comment, 和 CDATA 节点来说, `nodeValue返回该节点的文本内容`
  * 对于 attribute 节点来说, 返回该属性的属性值.
* nodeName : 返回当前节点的节点名称
  * HTMLElement的名字跟它所关联的标签对应，`<div>`节点对应返回DIV
  * Document节点对应的是 '#document'。
  * Text节点对应的是 '#text'
* baseURI : 只读，返回一个节点的绝对基址 URL。如果无法获取则可能返回 `null` 。



方法: 

* appendChild(child) : 将参数作为最后一个子节点添加到当前节点。
  * 如果将被插入的节点已经存在于当前文档的文档树中，那么 `appendChild()` 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。这意味着，一个节点不可能同时出现在文档的不同位置。
* removeChild(child) : 移除当前节点的一个子节点。返回删除的节点。这个子节点必须存在于当前节点中。如果`child节点`不是`node`节点的子节点,则该方法会抛出异常.
* replaceChild(newChild, oldChild) : 用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点。
  * newChild : 用来替换 `oldChild` 的新节点。如果该节点已经存在于 DOM 树中，则它首先会被从原始位置删除。
  * oldChild : 被替换掉的原始节点。
* cloneNode([deep]) : 克隆一个 Node，并且可以选择是否克隆这个节点下的所有内容。默认情况下，节点下的内容会被克隆。
  * deep : 可选，默认为false。是否采用深度克隆,如果为true,则该节点的所有后代节点也都会被克隆,如果为false,则只克隆该节点本身.
  * 克隆一个元素节点会拷贝它所有的属性以及属性值,当然也就包括了属性上绑定的事件(比如`onclick="alert(1)"`),但不会拷贝那些使用`addEventListener()`方法或者`node.onclick = fn`这种用JavaScript动态绑定的事件.
* contains(otherNode) : 返回一个布尔值，来表示传入的节点是否为该节点的后代节点。IE9支持
* hasChildNodes() : 返回一个Boolean 布尔值，来表示该元素是否包含有子节点。
* insertBefore(newNode, refNode) : 在当前节点下增加一个子节点 `Node`，并使该子节点位于参考节点的前面。返回被插入的子节点
  * newNode : 用于插入的节点
  * refNode : 参考节点，如果为 null 则 newNode 将被插入到子节点的末尾。
* isEqualNode(otherNode) : 返回一个 Boolean值。当两个 node 节点为相同类型的节点且定义的数据点匹配时（即属性和属性值相同，节点值相同）返回 true，否则返回 false。IE9支持
* normalize() : 对该元素下的所有文本子节点进行整理，合并相邻的文本节点并清除空文本节点。IE9支持





## Element

`Element` 是一个通用性非常强的基类，所有 `Document` 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。



属性: 所有属性继承自它的祖先接口 `Node`，并且扩展了 `Node` 的父接口 `EventTarget`

* attributes : 只读，返回该元素所有属性节点的一个实时集合。该集合是一个 `NamedNodeMap` 对象
* classList : 只读，返回该元素包含的 class 属性，是一个实时 `DOMTokenList` 集合。
  * 虽然 element.classList 本身是只读的，但是你可以使用 `add()` 和 `remove()` 方法修改它。
* className : 获取或设置指定元素的class属性的值。返回的是一个字符串。多个值用空格分隔
* clientHeight : 只读，返回元素内部的高度(px)，包含内边距，但不包括水平滚动条、边框和外边距。
  * 此属性会将获取的值四舍五入取整数。
  * 可以通过 CSS `height` + CSS `padding` - 水平滚动条高度 (如果存在)来计算.
* clientWidth : 只读，返回元素内部的宽度(px)，包含内边距，但不包括垂直滚动条、边框和外边距。
  * 此属性会将获取的值四舍五入取整数。
* clientLeft : 只读，返回一个元素的左边框的宽度
* clientTop : 只读，返回一个元素的上边框的宽度
* scrollHeight : 只读，返回元素内容高度的度量，包括由于溢出导致的视图中不可见内容。
  * 此属性会将获取的值四舍五入取整数。包括内边距，但不包括边框、外边距或水平滚动条
* scrollWidth : 只读，返回元素内容宽度的度量，包括由于溢出导致的视图中不可见内容。
  * 此属性会将获取的值四舍五入取整数。包括内边距，但不包括边框、外边距或垂直滚动条
* scrollLeft : 读取或设置元素滚动条到元素左边的距离。
  * 如果元素的内容是从左到右排列的，那么滚动条会位于最左侧（内容开始处），并且`scrollLeft`值为0。
* scrollTop : 读取或设置元素滚动条到元素上边的距离。
* id : 返回元素的 ID 属性值。
* innerHTML : 设置或获取元素中的内容，以HTML语法表示
* innerText : 设置或获取元素渲染的文本内容
* outerHTML : 设置或获取元素的内容(包括自己)，以HTML语法表示
* tagName : 只读，返回当前元素的标签名。在HTML文档中, `tagName`会返回其大写形式.
* localName : 只读，返回这个元素名称本地化的部分。可以看做返回元素的标签名
* nextElementSibling : 只读，返回该元素下一个兄弟节点`Element`, 如果为null表示不存在。IE9支持
* previousElementSibling :只读，返回该元素上一个兄弟节点`Element`, 如果为null表示不存在。IE9支持



方法:

* getAttribute(name) : 获取元素中的指定属性值，没有那个属性则返回null
* getAttributeNames() : 返回一个`Array`，该数组包含指定元素（`Element`）的所有属性名称，如果该元素不包含任何属性，则返回一个空数组。IE不支持
* hasAttribute(name) : 返回一个布尔值，指示该元素是否包含有指定的属性。IE8支持
* removeAttribute(name) : 从指定的元素中删除一个属性。
* setAttribute(name, value) : 设置指定元素上的某个属性值。如果属性已经存在，则更新该值
* insertAdjacentElement(position, element) : 将一个给定的元素节点插入到相对于被调用的元素的给定的一个位置。
  * position : 表示相对于该元素的位置；必须是以下字符串之一：
    * 'beforebegin': 在该元素本身的前面.
    * 'afterbegin': 只在该元素当中, 在该元素第一个子孩子前面.
    * 'beforeend': 只在该元素当中, 在该元素最后一个子孩子后面.
    * 'afterend': 在该元素本身的后面.
  * element : 要插入到树中的元素.
  * 返回值 : 插入的元素，插入失败则返回null.
* insertAdjacentHTML(position, text) : 将指定的文本解析为 `Element` 元素，并将结果节点插入到DOM树中的指定位置。
  * position : 同上
  * text : 是要被解析为HTML或XML元素，并插入到DOM树中的字符串。
* insertAdjacentText(position, text) : 将一个给定的文本节点插入在相对于被调用的元素给定的位置。
  * position : 同上
  * text : 表示要插入到树中的文本
* toggleAttribute(name) : 切换给定元素的某个布尔值属性的状态（如果属性不存在则添加属性，属性存在则移除属性）。IE不支持。各浏览器支持的版本不同。
  * 该方法可用于切换`<input>`的readonly、disabled属性

* getBoundingClientRect() : 返回元素的大小及其相对于视口的位置。
  * 不同浏览器返回的结果可能不同
* 





## 事件

* readystatechange : 当文档的 `readyState` 属性发生改变时触发
* onvisibilitychange : 当文档的 `visibilityState` 属性发生改变时触发，可用来判断用户是否离开当前页面了
  * IE需要这样写 ``document.addEventListener('visibilitychange', function() {})`



```js
document.addEventListener('visibilitychange',
function() {
  if (document.visibilityState == 'hidden') {
    console.log('离开页面');
  } else {
    console.log('回到页面');
  }
})
```





## 事件三要素

1. 事件源-->事件触发者
2. 事件名称-->click
3. 事件处理程序-->onclick





## 取消标签的默认行为

例如取消`<a>`标签的跳转行为: 给`<a>`标签绑定一个点击事件`onclick="return false;"`

```html
<a href="https://www.huangyihui.cn" onclick="return false;">跳转到首页</a>
```



设置a标签无效跳转

```html
<a :href="link? link: 'javascript:void(0)'"></a>
```





## 拖放事件

默认情况下，网页中的图像、链接和文本是可以拖动的，而其余的元素若想要被拖动，必须将 `draggable` 属性设置为 `true`，这是HTML5规定的新属性，用于设置元素是否能被拖动。

在实现拖放功能时有这样两个概念，分别是**被拖动元素**和**目标元素**，它们都有各自支持的事件。



### 被拖动元素

被拖动元素所支持的事件：

* dragstart ：准备拖动被拖动元素时触发
* drag ：拖动的过程中触发（频繁触发）
* dragend ：拖动结束时触发



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: lightgreen;
      }
    </style>
  </head>
  <body>
    <div class="box" draggable="true"></div>
    <script>
      let box = document.querySelector(".box")
      // 绑定dragstart事件
      box.addEventListener("dragstart", function () {
        console.log("拖拽开始了")
      })
      // 绑定drag事件
      box.addEventListener("drag", function () {
        console.log("元素被拖动")
      })
      // 绑定dragend事件
      box.addEventListener("dragend", function () {
        console.log("拖拽结束")
      })
    </script>
  </body>
</html>
```



### 目标元素

在实现拖放功能的过程中，目标元素上的事件：

* dragenter ：被拖放元素进入目标元素时触发
  * dragenter事件与 `mouseover` 事件类似，那怎样才算被拖放元素进入目标元素呢？经过测试发现，当被拖放元素的一半以上面积在目标元素内才算进入了目标元素
* dragover ：被拖放元素在目标元素内时触发（频繁触发）
  * dragover事件比较特殊，当拖放元素进入目标元素以后就会一直触发，就跟你设置了一个无限循环的定时器一样，即使你不移动元素也会触发，除非拖放事件结束或者被拖放元素离开目标元素
* dragleave ：被拖动元素离开目标元素时触发
  * dragleave事件的其触发条件正好与 `dragenter` 事件相反，它是当被拖放元素离开目标元素时触发，经过测试，离开目标元素的条件是：被拖放元素一半以上的面积离开目标元素
* drop ：当被拖动元素被放到了目标元素中时触发
  * drop事件可以叫做放置目标事件，它是当被拖放元素放置到了目标元素中时触发。虽然任何元素都支持该事件，但是所有元素默认都是不允许被放置的，所以在不做任何处理的情况下，该事件是不会触发的
  * 触发 drop事件，只需要阻止 dragenter事件和 dragover事件的默认行为即可
  * 在我们没有对 drop 事件做处理之前，将被拖放元素拖动到目标元素中时，鼠标样式会变成禁止的样式；处理后，鼠标样式会变成可放置的样式



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: lightgreen;
      }
      .location {
        width: 100px;
        height: 100px;
        background-color: lightpink;
      }
    </style>
  </head>
  <body>
    <div class="box" draggable="true"></div>
    <div class="location"></div>
    <script>
      let located = document.querySelector(".location")
      // 绑定dragenter事件
      located.addEventListener("dragenter", function () {
        console.log("元素进入了目标元素")
      })
      // 绑定dragover事件
      located.addEventListener("dragover", function () {
        console.log("元素在目标元素内")
      })
      // 绑定dragleave事件
      located.addEventListener("dragleave", function () {
        console.log("元素离开了目标元素")
      })
    </script>
  </body>
</html>
```



触发 drop事件：

```js
let located = document.querySelector(".location")
located.addEventListener("dragenter", function (e) {
  e.preventDefault()
})
located.addEventListener("dragover", function (e) {
  e.preventDefault()
})
// 触发 drop事件，只需要阻止 dragenter事件 和 dragover事件 的默认行为即可
located.addEventListener("drop", function () {
  console.log("元素被放置")
})
```



### dataTransfer 对象

拖放事件中事件对象上有一个特别重要的属性 `dataTransfer` ，通过 `event.dataTransfer` 来获取该对象，其主要的作用就是从被拖放元素向目标元素传递一个字符串数据。

* setData(type, value) ：设置字符串，并设置数据类型
  * 第一个参数表示的是字符串的数据类型，HTML5规定了两种数据类型，分别是 `text/plain` 和 `text/uri-list`，前者表示普通字符串，后者表示URL字符串；
  * 第二个参数就是用于存放的字符串
* getData(type) ：获取对应数据类型的字符串。type 是需要接收的字符串类型
* dropEffect ：被拖放元素的放置行为。该属性必须在 **dragenter事件** 中设置，否则无效。
  * none ：默认值。不能把拖动的元素放在这里
  * move ：应该把拖动的元素移动到该目标元素
  * copy ：应该把拖动元素复制到该目标元素
  * link ：表示目标元素会打开被拖放进来的元素对应的链接
* effectAllowed ：目标元素支持的放置行为。该属性必须在 **dragstart事件** 中设置，否则无效
  * uninitialized ：被拖放元素没有设置放置行为
  * none ：被拖放元素不能有放置行为
  * copy ：只允许值为 'copy' 的 dropEffect 目标元素
  * link ：只允许值为 'link' 的 dropEffect 目标元素
  * move ：只允许值为 'move' 的 dropEffect 目标元素
  * copyLink ：只允许值为 'copy' 和 'link' 的 dropEffect 目标元素
  * copymove ：只允许值为 'copy' 和 'move' 的 dropEffect 目标元素
  * linkMove ：只允许值为 'link' 和 'move' 的 dropEffect 目标元素
  * all ：只允许任意值的 dropEffect 目标元素

dropEffect 属性和effectAllowed 属性需要搭配使用，它们决定了**被拖放元素**和**目标元素**之间的关系的，当设定好两者的关系后，在进行拖动操作的时候，鼠标会根据不同的关系显示不同的样式，除此之外，没有别的特别的作用。



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: lightgreen;
      }
      .location {
        width: 100px;
        height: 100px;
        background-color: lightpink;
      }
    </style>
  </head>
  <body>
    <div class="box" draggable="true"></div>
    <div class="location"></div>
    <script>
      let box = document.querySelector(".box")
      // 为被拖放元素绑定 dragstart 事件
      box.addEventListener("dragstart", function (e) {
        // 设置类型为 text/plain 的字符串
        e.dataTransfer.setData("text/plain", "我是拖放开始时被设置的字符串")
      })

      let located = document.querySelector(".location")

      located.addEventListener("dragenter", function (e) {
        e.preventDefault()
      })
      located.addEventListener("dragover", function (e) {
        e.preventDefault()
      })
      located.addEventListener("drop", function (e) {
        // 将被拖放元素放置到目标元素时获取字符串
        let res = e.dataTransfer.getData("text/plain")
        console.log(res)
      })
    </script>
  </body>
</html>
```



示例：将一段文本拖放到一个元素中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .location {
        width: 100px;
        height: 100px;
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <div class="box">我是一段测试文字</div>
    <div class="location"></div>
    <script>
      let located = document.querySelector(".location")

      located.addEventListener("dragenter", function (e) {
        e.dataTransfer.dropEffect = "copy"
        e.preventDefault()
      })
      located.addEventListener("dragover", function (e) {
        e.preventDefault()
      })
      located.addEventListener("drop", function (e) {
        e.target.innerHTML = e.dataTransfer.getData("text/plain")
      })
    </script>
  </body>
</html>
```



## 获取页面宽度

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





## cookie

超文本传输协议(HTTP)cookie是在客户端(通常是浏览器)和服务器之间来回发送的一些数据。

它被用来跟踪所有的事情，从一个应用程序的状态，到回话信息，再到你的有关访问信息。

**注意: 不应该在cookie中存储用户ID或者任何个人信息。**



一个cookie可以包含几个不同的元素，但是从本质上说，它是一组名/值对，由网站管理员或开发人员设置，并且是可选的。



### 创建cookie

可以使用`document.cookie`属性来获取或创建cookie。

一旦创建成功，浏览器在访问者的计算机存储这个cookie直到它过期。



```js
// 设置cookie的name 和 value
var cookieName = 'mycookie'
var cookieVal = 'abc123'

// 设置cookie的过期日期
var date = new Date()
date.setTime(date.getTime() + 604800000)  // 7天后
var expireDate = date.toUTCString()
console.log(expireDate)

var path = ';path=/'                // 设置cookie的路径
var domain = ';domain=127.0.0.1'    // 设置cookie的域，可以是域名
var secure = ';secure'              // 使用安全cookie

// 拼接cookie配置信息后，设置cookie
// 相当于 'mycookie=abc123;expires=Tue, 20 Jul 2021 13:48:13 GMT;path=/;domain=127.0.0.1;secure'
document.cookie = `${cookieName}=${cookieVal};expires=${expireDate}${path}${domain}${secure}`
```

**cookie的值中不允许出现空格、标点和其他非字母数字字符。**



`document.cookie` 存储的是cookie名字和cookie数据。

```js
console.log(document.cookie)  // mycookie=abc123; mycookie1=abc123
```



如果要删除cookie，可以只清空它的值并将过期时间设置为过去的某个时间。

```js
var cookieName = 'mycookie1'

// 设置cookie的过期日期
var date = new Date()
date.setTime(date.getTime() - 60)
var expireDate = date.toUTCString()

var path = ';path=/'                // 设置cookie的路径
var domain = ';domain=127.0.0.1'    // 设置cookie的域，可以是域名
var secure = ';secure'              // 使用安全cookie

document.cookie = `${cookieName}="";expires=${expireDate}${path}${domain}${secure}`
```





## DOMParser

`DOMParser` 可以将存储在字符串中的 XML 或 HTML 源代码解析为一个 DOM `Document`。`IE9支持`

```js
let domparser = new DOMParser()
let doc = domparser.parseFromString(string, mimeType)
```

* DOMParser.parseFromString(string, mimeType)
  * string : 要解析的 DOMString。它必须包含 HTML、xml、xhtml+xml 或 svg 文档。
  * mimeType : 这个字符串确定了方法返回值的类。可能的值如下所示
    * text/html  返回`Document`
    * text/xml  返回`XMLDocument`
    * application/xml  返回`XMLDocument`
    * application/xhtml+xml  返回`XMLDocument`
    * image/svg+xml  返回`XMLDocument`
  * 返回值 : 基于 `mimeType` 参数，返回 `Document` 或 `XMLDocument` 或其他文档类型。

```js
let xhr = new XMLHttpRequest()
xhr.open('get', 'demo.html', false)
xhr.send()
let str = xhr.responseText

let domparse = new DOMParser()
let res = domparse.parseFromString(str, 'text/html')
console.log(typeof res)   // object
```





## Image()

`Image()`函数将会创建一个新的`HTMLImageElement`实例。它的功能等价于 `document.createElement('img')`

```js
Image(width, height)
```

* width : 图片的宽度 (即 `width` 属性).
* height : 图片的高度 (即 `height` 属性).



```js
var myImage = new Image(200, 200)
myImage.src = 'pic.jpg'
document.body.appendChild(myImage)
```

相当于在`<body>`中定义了  `<img width="200" height="200" src="pic.jpg">`





## Option()

用于创建`HTMLOptionElement`的构造函数。可以通过脚本给`<select>`创建`<option>`元素。

```js
var optionElement = new Option(text, value, defaultSelected, selected)
```

* text : 表示元素显示的文本，如果没有指定，则使用默认值""(空字符串)。
* value : 表示元素的`value属性值`。如果未指定，则将文本的值用作值。
* defaultSelected : 布尔值，设置元素的`selected属性值`
* selected : 布尔值，设置元素的选择状态。默认false(未选中)

设置defaultSelected为true时，只会在`<option>`标签中添加了`selected`属性，但是视图上并不会被选中。

设置selected为true时，不会在`<option>`标签中添加`selected`属性，但是视图上会被选中。



```html
<select id="s"></select>
<script>
  var s = document.getElementById('s')
  var options = ['Four', 'Five', 'Six']

  options.forEach(function(element, key) {
      // s[key] = new Option(element, key)    // 方式1 通过下标方式给下拉列表添加option元素
      s.options.add(new Option(element, key)) // 方式2 给下拉列表添加option元素
  })
</script>
```

```html
<select id="s"></select>
<script>
  var s = document.getElementById('s')
  var options = ['zero', 'one', 'two']

  options.forEach(function(element, key) {
    if (element == 'zero') {
      s[s.options.length] = new Option(element, s.options.length, true, false)
    }
    if (element == 'one') {
      // 会添加"selected"属性
      s[s.options.length] = new Option(element, s.options.length, true, false)
    }
    if (element == 'two') {
      // 会在视图中有选中效果
      s[s.options.length] = new Option(element, s.options.length, false, true)
    }
  })
</script>
```





## 示例

### 动态加载脚本

```js
let script = document.createElement('script')
script.src = 'demo.js'
script.async = false
document.head.appendChild(script)
```



### 锚点

```html
<a name="111"></a>

<h2 id="222">标题</h2>
```



### 编辑网页内容

```js
document.designMode = 'on'

// 使 <iframe> 的文档可编辑
iframeNode.contentDocument.designMode = "on";
```

































































