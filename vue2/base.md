# 基础使用

## 引入Vue

直接下载并用`<script>`标签引入，Vue会被注册为一个全局变量.

```html
<!-- 直接导入 -->
<script src="vue.js"></script>
<!-- cdn导入 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```



## 声明式渲染

* 文本插值

```html
<div id="app">
  {{ message }} <!-- 文本插值 -->
</div>

<script>
  // Vue实例对象
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue'
    }
  })
</script>
```

* 绑定元素属性attribute

```html
<div id="app">
  <!-- 通过v-bind指令绑定标签的title属性 -->
  <p v-bind:title="tip">
    鼠标悬停几秒查看tip信息
  </p>
  <p :title="tip">简写：鼠标悬停几秒查看tip信息</p>
</div>

<script>
  // Vue实例对象
  var app = new Vue({
    el: '#app',
    data: {
      tip: '页面加载于 ' + new Date().toLocaleString()
    }
  })
</script>
```

* 动态绑定多个值

如果你有像这样的一个包含多个 attribute 的 JavaScript 对象：

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

通过不带参数的 `v-bind`，你可以将它们绑定到单个元素上：

```html
<div v-bind="objectOfAttrs"></div>
```





## 条件与循环

* `v-if`指令

  * `v-else-if`
  * `v-else`
* `v-for`指令
  * 该指令需要以 `site in sites` 形式的特殊语法。sites是源数据数组，并且site是数组元素迭代的别名
  * 可以遍历 数组、对象、字符串、整数。整数的初值是从 `1` 开始而非 `0`。
  * 还可以使用 `site of sites` 形式
* `v-show`指令
* 特殊属性`key` : `v-for` 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊 attribute `key` 来提供一个排序提示：
  * 该属性可以干预`diff算法`，在同一层级，key值相同的节点会进行比较，key值不同的节点则不会
  * 为提高效率和避免问题，在循环生成的节点中，vue强烈建议给予每个节点**唯一且稳定**的key值
  

> 在v-for遍历的时候，如果是在div标签中遍历，会生成多个div标签包裹住div中的标签。如果不想要这些多余的div标签，可以在`<template>`标签中使用v-for。
>
> v-for 和 v-if 一起用时，v-if 优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名。**不推荐这样做**。如果只是为了过滤，请将 要遍历的值 替换为一个计算属性，让其返回过滤后的列表。

```html
<div id="app">
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else>Not A/B</div>
  <div v-show="ok">show</div>

  <ul>
    <li v-for="item,index in items" :key="index">
      {{index}}:{{item.message}}
    </li>
  </ul>
  <ul>
    <!-- 可以通过提供第二个参数表示属性名 (例如 key)，第三个参数表示位置索引 -->
    <li v-for="value,key,index in object" :key="key">
      {{key}}:{{value}}:{{index}}
    </li>
  </ul>
  <ul>
    <!-- 解构 -->
    <li v-for="({message}, index) in items" :key="index">
      {{index}}:{{message}}
    </li>
  </ul>
  <ul>
</div>
<script>
  var vm = new Vue({
    el : "#app",
    data : {
      type : 'B',
      ok : false,
      items : [
        {message:'CSS'},
        {message:'HTML'}
      ],
      object : {
        name : "张三",
        age : 18,
        score : 89
      }
    }
  })
</script>
```



**组件上使用 `v-for`**

我们可以直接在组件上使用 `v-for`，和在一般的元素上使用没有区别。

```vue
<MyComponent v-for="item in items" :key="item.id" />
```

但是，这不会自动将任何数据传递给组件，因为组件有自己独立的作用域。为了将迭代后的数据传递到组件中，我们还需要传递 props：

```vue
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```





## 指令

指令就是Vue内部提供的一些自定义属性，这些属性中封装好了Vue内部实现的一些功能，只要使用这些指令就可以使用Vue中实现的这些功能。

指令会影响元素的渲染行为，指令始终以`v-`开头

基础指令：

* `v-bind`：绑定动态属性
  * 该指令由于十分常用，因此提供了简写`:`
  * 赋值的数据还可以是任意一个合法的JS表达式。例如 `:title="1 + 2"`
  * `v-bind={key: value}`  赋值的数据还可以是一个对象，会将对象中的key当作属性绑定到元素上，值为对应的value。
    *   `v-bind="$attrs"`  绑定传递过来的Attribute
* `v-on`：注册事件，绑定监听事件。指定事件名称时不需要写on。例如 `@click="myFn"`
  * 该指令由于十分常用，因此提供了简写`@`

  * 赋值的时候必须赋值一个回调函数的名称，函数名后面可以带 `()` 也可以不带，带 `()` 则可以传递参数
    * 如果不带 `()` ，那么会自动传递事件对象 `event`
    * 如果带 `()` ，则不会自动传递事件对象。但是可以在 `()` 参数中设置 `$event` 属性，就可以传递事件对象 
    
  * 用在普通元素上时，只能监听**原生DOM事件**。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**

  * 事件支持一些指示修饰符，如`prevent`

  * 支持不带参数绑定一个事件/监听器键值对的对象。注意当使用对象语法时，是不支持任何修饰器的。

    ```html
    <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
    ```

* `v-show`：控制元素可见
* `v-if`、`v-else-if`、`v-else`：控制元素生成
* `v-for`：循环渲染元素
* `v-html`：设置元素的innerHTML，该指令会导致元素的模板内容失效
  * 当内容有换行`\n`时，会发现没有自动换行。这时只要给添加`v-html`的标签加上css样式 `white-space: pre-wrap;`
  * 注意：当使用该指令时，需要防止恶意的内容注入(XSS)，解决方法有前端过滤、后台转义(`< &lt;`)、给cookie加上属性http
  * 在单文件组件里，`scoped` 的样式不会应用在 `v-html` 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。
* `v-model`：数据双向绑定，常用于表单元素 `<input> <textarea> <select>` ，它会覆盖表单元素的初始值
  * 该指令是`v-on`和`v-bind`的复合版
  * 修饰符：
    * `.lazy` 懒赋值(状态不会实时更改，只有绑定的元素失去焦点时才赋值) 。默认情况下，`v-model` 会在每次 `input` 事件后更新数据，可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据
    * `.trim` 去除两端空白字符
    * `.number` 将字符串转为数字，效果差，还不如用`type="number"`
* `v-once` : 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
  
  * 让界面不要跟着数据变化，值只绑定一次，修改后不会再次渲染新值
* `v-cloak` : 数据渲染后才自动显示元素(同步)。用于当用户网络不好时，可能会发生页面中显示的是模板内容，造成用户体验不好，所以需要设置同步渲染显示
  
  * 需要配合 `[v-cloak] {display: none;}` 样式，默认先隐藏未渲染的界面
* `v-slot` : 具名插槽。缩写，即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。
  * 例如 `v-slot:header` 可以被重写为 `#header`
  * 该缩写只在其有参数的时候才可用
  * 只能用在 `<template>` 或 组件上



> 进阶指令
>
> * v-text 在标签中插入文本(更新元素的 `textContent`)	`v-text="msg"`
> * v-pre 不需要表达式。跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
> * 自定义指令





```html
<div id="app">
  <p v-bind:title="tip">绑定动态属性</p>
  <p :title="tip">简写：鼠标悬停几秒查看tip信息</p>

  <button v-on:click="hi">v-on绑定事件</button>
  <button @click="hi">v-on绑定事件</button>
  <p @click='fn("ok", $event)'>ppp</p>

  <input v-model="message" placeholder="edit it" >
  <p>message:{{message}}</p>

  <div v-html="html"></div>
  
  <p v-once>原始值: {{ msg }}</p>
  <p>当前值: {{ msg }}</p>
  <ul>
    <li v-once v-for="item in lists">{{ item }}</li>
  </ul>
  
  <!-- v-model修饰符 -->
  <input type="text" v-model.lazy="name">{{name}}
  <input type="text" v-model.trim="content">{{content}}
  <input type="number" v-model.number="num">{{num}}
</div>
<script>
  var vm = new Vue({
    el : "#app",
    data : {
      tip : "tip信息",
      message : "",
      html : `<p style="color:red">段落标签</p>`,
      msg: '张三',
      lists: ['张三', '李四', '王五'],
      name: '',
      content: '',
      num: ''
    },
    methods:{
      hi:function(e){
        console.log('hi', e)
      },
      fn(value, e){
        console.log(value, e)
      }
    }
  })
</script>
```

 

### 动态参数

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```vue
<a v-bind:[attributeName]="url"> ... </a>			<!-- 等价于<a :href="url"> ... </a> -->
<a v-on:[eventName]="doSomething"> ... </a>
<a :[attributeName]="url"> ... </a>						<!-- 简写 -->

new Vue({
	data: {
		attributeName: 'href'
	}
})
```

这里的 `attributeName / eventName` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 `data` property `attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。



约束

* 对动态参数的值的约束
  * 动态参数预期会求出一个字符串，异常情况下值为 `null`。这个特殊的 `null` 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。
* 对动态参数表达式的约束
  * 某些字符，如空格和引号，放在 HTML attribute 名里是无效的。变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。
* 避免使用大写字符来命名键名





## 表单输入绑定示例

* 存储选中内容时，多选框用数组，单选框用字符串
* 如果要关联多个选择，保持`v-model`值相同即可
* `v-model` 会忽略任何表单元素上初始的 `value`、`checked` 或 `selected` attribute。它将始终将当前绑定的 JavaScript 状态视为数据的正确来源。

```html
<div id="app">
  <!-- 输入框 -->
  <input v-model="message" placeholder="edit it" >
  <p>message:{{message}}</p>
  <textarea v-model="message2" placeholder="edit it" ></textarea>
  <p style="white-space: pre-line;">message2:{{message2}}</p>
  <br>
  
  <!-- 多选框 -->
  <div>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <br>
    <span>Checked names: {{ checkedNames}}</span>
  </div>

  <!-- 单选框 -->
  <div>
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="Two" v-model="picked">
    <label for="two">Two</label>
    <br>
    <span>Picked: {{ picked }}</span>
  </div>
  <button type="button" @click="submit">提交</button>
</div>

<script>
  var vm = new Vue({
    el : "#app",
    data : {
      message	: '',
      message2 : '',
      checkedNames : [],
      picked : ''
    },
    methods:{
      // 提交表单方法
      submit:function(){
        var postObj = {
          msg1 : this.message,
          msg2 : this.message2,
          checkval : this.checkedNames,
          picked : this.picked
        }
        console.log(postObj);
      }
    }
  })
</script>
```



`true-value` 和 `false-value` 是 Vue 特有的 attributes，仅支持和 `v-model` 配套使用。这里 `toggle` 属性的值会在选中时被设为 `'yes'`，取消选择时设为 `'no'`。

```vue
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```



### 全选效果

```html
<div id="app">
  <p>全选<input type="checkbox" v-model="isAllCheck" @change="handleAllCheck"></p>
  篮球<input type="checkbox" value="篮球" v-model="checklist" @change="handleChange">
  羽毛球<input type="checkbox" value="羽毛球" v-model="checklist" @change="handleChange">
  乒乓球<input type="checkbox" value="乒乓球" v-model="checklist" @change="handleChange">
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      datalist: ['篮球', '羽毛球', '乒乓球'],
      checklist: [],
      isAllCheck: false
    },
    methods: {
      handleAllCheck() {
        if(this.isAllCheck) {
          // 勾选全选
          this.checklist = this.datalist
        }else {
          this.checklist = []
        }
      },

      handleChange() {
        console.log(1)
        // 判断选中的个数是不是和设置的个数是否相同
        this.isAllCheck = this.checklist.length === this.datalist.length
      }
    }
  })
</script>
```





## 事件修饰符

在事件中有很多东西需要我们处理，例如事件冒泡、事件捕获、阻止默认行为等，这些都可以通过事件修饰符处理

修饰符一般跟在 `v-on` 指令的后面

* `.prevent`：阻止默认行为，即调用 `event.preventDefault()`
* `.stop`：停止后面的行为，常用于阻止单击事件继续传播(冒泡)，即调用 `event.stopPropagation()`
* `.capture`: 添加事件监听器时使用事件捕获模式，即内部元素触发的事件先在此处理，然后才交由内部元素进行处理
* `.self`: 只当在 event.target (事件源)是当前元素自身时触发处理函数，即事件不是从内部元素触发的
* `.once`: 只触发一次回调
* `.passive`: 事件的默认行为会立即触发
* `.native` : 监听组件根元素的原生事件。

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**元素及其子元素的所有点击事件的默认行为**，而 `v-on:click.self.prevent` 只会阻止**对元素本身的点击事件的默认行为**。

```html
<div id="app">
  <!-- 通过修饰符.prevent阻止默认的行为 -->
  <a href="https://www.huangyihui.cn" @click.prevent="test">点击我</a>

  <!-- 通过修饰符.stop停止后面的行为 -->
  <div @click="c1">
    <div @click.stop="c2">点击冒泡</div>
    <!-- 修饰符可以串联，也可以只有修饰符 -->
		<a @click.stop.prevent>跳转</a>
  </div>
  
  <!-- 点击事件将只会触发一次 -->
	<button @click.once="test">只会触发一次</button>
  
  <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
  <!-- 而不会等待 `onScroll` 完成  -->
  <!-- 这其中包含 `event.preventDefault()` 的情况 -->
  <div v-on:scroll.passive="onScroll">...</div>
  
  <!-- 组件中的原生事件 -->
  <my-component @click.native="onClick"></my-component>
</div>

<script>
  var vm = new Vue({
    el : "#app",
    data : {
    },
    methods : {
      test(){
        console.log("hello");
      },
      c1(){
        console.log("c1");
      },
      c2(){
        console.log("c2");
      }
    }
  })
</script>
```



### 事件解绑简单实现once

```html
<div id="app">
  <button @click="isActive && handleBind()">事件解绑</button>
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      isActive: true
    },
    methods: {
      handleBind() {
        console.log(1)
        this.isActive = false
      }
    }
  })
</script>
```





## 按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件(`keydown、keyup、keypress`)时添加按键修饰符：

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<!-- 也就是在按下enter键时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

<!-- 按下 A/a 键时触发 fn -->
<input type="text" @keyup.65="fn">
```

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的 `KeyCode` 按键码的别名：

- `.enter` : 只当按下enter键时触发
  - 例如输入密码后回车登录 `@keyup.enter="login"`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left` : 只当点击鼠标左键时触发
- `.right` : 只当点击鼠标右键时触发
- `.middle` : 只当点击鼠标中键时触发

> 有一些按键 (`.esc` 以及所有的方向键) 在 IE9 中有不同的 `key` 值, 如果你想支持 IE9，这些内置的别名应该是首选。

你还可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名：

```javascript
// 可以使用 `v-on:keyup.f2`
Vue.config.keyCodes.f2 = 113
```

`KeyCode大全` : https://www.cnblogs.com/daysme/p/6272570.html



## 系统修饰符

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```



`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```



鼠标按钮修饰符

- `.left`
- `.right`
- `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮。





## 计算属性

计算属性和方法的区别：

* 计算属性可以赋值，而方法不行
* 计算属性会进行缓存（**计算属性值会基于其响应式依赖被缓存**），如果依赖(使用到的状态)不变，则直接使用缓存结果，不会重新计算
* 凡是根据已有数据计算得到新数据的无参函数，都应该尽量写成计算属性，而不是方法
* 当需要对data中的数据操作时，推荐用计算属性
* 计算属性只能对属性进行操作，而方法可以对任何进行操作
* 计算属性会把结果进行缓存，如果下次要用，直接在缓存中调用，提高效率



如果你为一个计算属性使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

```js
computed: {
  aDouble: vm => vm.a * 2
}
```



```html
<div id="app">
  {{msg2}}
  <button type="button" onclick="fn1()">methods</button>
</div>
<script>
  var vm = new Vue({
    el:'#app',
    data:{
      msg:'hello world dear',
      num:9
    },
    methods:{
      changNum(){
        console.log(new Date())
        return this.num - 1
      }
    },
    computed:{
      msg2:function(){
        return this.msg.split(' ').reverse().join('-')
      },
      num2:function(){
        console.log(new Date())
        return this.num - 1
      }
    }
  })

  function fn1(){
    setInterval(()=>{
      // console.log(vm.changNum())
      console.log(vm.num2)
    }, 1000)
  }
</script>
```



由下面例子可知，使用methods时，当页面中一个值发生改变，页面中的方法都会执行。

但是，如果使用computed时，当页面中一个值发生改变，其他方法计算属性不会执行。

```html
<div id="app">
  <h1>Computed 计算属性</h1>
  <button @click="a++">Add to A</button>
  <button @click="b++">Add to B</button>
  <p>A - {{a}}</p>
  <p>B - {{b}}</p>
  <p>Age + A = {{addToA}}</p>
  <p>Age + B = {{addToB}}</p>
</div>
<script>
  var vm = new Vue({
    el:"#app",
    data:{
      a:0,
      b:0,
      age:20
    },
    methods:{
      // addToA:function(){
      // 	console.log("Add to A")
      // 	return this.a + this.age
      // },
      // addToB:function(){
      // 	console.log("Add to B")
      // 	return this.b + this.age
      // }
    },
    computed:{
      addToA:function(){
        console.log("Add to A")
        return this.a + this.age
      },
      addToB:function(){
        console.log("Add to B")
        return this.b + this.age
      }
    }
  })
</script>
```



### setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

计算属性的 getter 应只做计算而没有任何其他的副作用，**不要在 getter 中做异步请求或者更改 DOM**！



### 模糊查询

```html
<div id="app">
  <input type="text" v-model="text">
  <ul>
    <li v-for="data,index in computedlist" :key="index">
      {{data}}
    </li>
  </ul>
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      text: '',
      datalist: ['aaa', 'bbb', 'ccc', 'aab', 'cad', 'bae']
    },
    computed: {
      computedlist() {
        return this.datalist.filter(item=>item.indexOf(this.text)>-1)
      }
    }
  })
</script>
```



## Mixin 混入

mixin 是一种分发 Vue 组件中可复用功能的非常灵活的方式。

混入对象可以包含任意组件选项。

当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

如果vue实例中的状态或者方法与混入对象中的重名，**vue实例中的会覆盖混入对象的**

**同名钩子函数将合并为一个数组，因此都将被调用**。另外，混入对象的钩子将在组件自身钩子**之前**调用。

```html
<div id="app">
  <button @click="mymethod">传统方式</button>
  <button @click="methodA">同名方法：vue实例会覆盖Mixins</button>
  <button @click="methodB">mixins</button>
  <button @click="hi">obj2</button>
  {{objName}}
</div>

<script>
  function NB() {
    console.log('nb function')
  }

  // 混入对象可以包含任意组件选项(methods、data等等)
  var obj = {
    data:{
      objName: 'hlw'
    },
    methods: {
      methodA() {
        console.log('methodA')
      },
      methodB() {
        console.log('methodB')
      }
    }
  }
  var obj2 = {
    methods: {
      hi() {
        console.log('hi')
      }
    }
  }

  var vm = new Vue({
    el: '#app',
    methods: {
      mymethod: NB,  // 传统方式：使用单个外部代码
      // 如果vue实例中的状态或者方法与混入对象中的重名，vue实例中的会覆盖混入对象的
      methodA() {
        console.log('vue实例中的methodA')
      }
    },
    // 当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
    mixins: [obj, obj2]
  })
</script>
```



全局混入--不推荐

```
Vue.mixin({
  methods: {
    sayhello() {
      console.log('mixin sayhello')
    }
  }
})
```







## 组件化-自定义组件

值得注意的是，组件配置对象和vue实例有以下几点差异：

* 无`el`

* **`data`必须是一个函数**，该函数返回的对象作为数据

  * 因为组件可能被用来创建多个实例。如果 `data` 仍然是一个纯粹的对象，则所有的实例将**共享引用**同一个数据对象！

  * 如果你为 `data` property 使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

    ```
    data: vm => ({ a: vm.myProp })
    ```

* 由于没有`el`配置，组件的虚拟DOM树必须定义在`template`或`render`中，**并且只能有一个根元素**

* 组件中也可以有 data、methods、computed、watch、components等等



注册组件分为两种方式：一种是**全局注册**，一种是**局部注册**

```html
<div id="app">
  <!-- 使用自定义组件 -->
  <button-counter title="title1:"></button-counter>
  <test></test>
</div>
<script>
  // 自定义组件：组件名、组件属性props、组件data、组件模板
  Vue.component('button-counter', {
    props : ['title'],
    data : function(){
      return{
        count : 0
      }
    },
    // 模板中也可以设置组件事件等内容
    template: '<button v-on:click="count++">{{title}}点击了{{count}}次</button>'
  })
  var vm = new Vue({
    el : "#app",
    data : {					
    },
    // 自定义组件
    components:{
      test:{
        template:'<h1>h1....h3</h1>'
      }
    }
  })
</script>
```





## v-if和v-show区别

* 都可以用于控制元素的显示
* 如果一个元素频繁地显示和隐藏时，用`v-show`，因为它是`hidden`隐藏元素(display: none;)。
  * 为什么？因为可以减少虚拟DOM树的生成，提高效率。
* 如果一个元素是选择性显示和隐藏时，用`v-if`，因为它是移除和新增元素。





## 过滤器

Vue允许自定义过滤器，被用作一些常见的文本格式化。由"管道符"指示，格式如下：

* 当全局过滤器和局部过滤器重名时，会采用局部过滤器。
* 过滤器可以串联
* 过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。

```html
<!-- Vue允许自定义过滤器，被用作一些常见的文本格式化。 -->
<div id="app">
  <!-- 在两个大括号中 -->
  {{ message | capitalize }}
  {{ message | formatId }}
  <!-- 在v-bind指令中 -->
  <div v-bind:id="rawId | capitalize"></div>
  <!-- 过滤器可以串联 {{ message | filterA | filterB }} -->
</div>
<script>
  // 在创建 Vue 实例之前全局定义过滤器，返回已注册的过滤器
  Vue.filter("formatId", (str)=>{
    if(!str) return ""
    str = str.toString()
    return str.toUpperCase()
  })

  var vm = new Vue({
    el:'#app',
    data:{
      message:'hello',
      rawId:'gl'
    },
    // 过滤器，本地过滤器
    filters:{
      capitalize: function(str){
        if(!str) return ""
        str = str.toString()
        return str.charAt(0).toUpperCase()+str.slice(1)
      }
    }
  })
</script>
```



不能使用 this 问题：

filters 里面不能使用 this，可以通过声明全局变量方式获取 this。

```js
let that = null;
export default {
  created() {
    that = this;
  },
  filters: {
    changeName(e) {
      return that.name;
    },
  },
}
```





## 样式动态绑定

Vue中可以通过 `v-bind` 指令给class属性绑定值。Vue 专门为 `class` 和 `style` 的 `v-bind` 用法提供了特殊的功能增强。除了字符串外，表达式的值也可以是对象或数组。

当在一个自定义组件上使用 `class` property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class **不会被覆盖**。

企业应用场景: 从服务器动态获取样式后通过 `v-bind` 动态绑定类名，这样就可以让服务端来控制前端样式。(618  双十一 等)



### 绑定方式

* `:style="{color: 'red', 'font-size': '100px'}"` : 对象赋值方式，值必须用引号括起来

  * 直接绑定一个样式对象通常是一个好主意，这样可以使模板更加简洁：`:style="styleObject"`
  * 还可以给 `:style` 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上

* `:class="'类名'"` : 将类名用引号括起来，才会去 `<style>` 中查找

* `:class="['类名']"` : 将类名放到数组中，并将类名用引号括起来，才会去 `<style>` 中查找
  * 如果需要绑定多个类名，可以用逗号分隔  `:class="['类名1', '类名2']"`
  * 还可以通过三元表达式动态绑定值  `:class="[flag? 'active':'']"`
  * 也可以在数组中嵌套对象 `:class="[{ active: isActive }, errorClass]"`
  
* 常见的 `:class="{类名: 布尔值}"` : 在对象中设置类名和一个布尔值，通过布尔值选择是否绑定样式
  * 还可以直接传入一个对象，并在 Model 中设置对象的值 `:class="obj"`
    * obj: {size: true, color: true}
    * obj: {'size': true, 'color': true}
  
* 也可以绑定一个返回对象的**计算属性**。这是一个常见且很有用的技巧：

  ```js
  data() {
    return {
      isActive: true,
      error: null
    }
  },
  computed: {
    classObject() {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  }
  ```

  



注意点:

1. 如果CSS属性名称包含 `-` ，那么必须用引号括起来。
2. 如果需要绑定 Model 中的多个对象，可以放到一个数组中赋值
3. 对象语法常常结合返回对象的计算属性使用
4. 当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS property 时，如 transform，Vue.js 会自动侦测并添加相应的前缀。



错误的方式:

* 方式1 `:class="size"` : 默认情况下，`v-bind` 会去 Model 中查找数据，但是 Model 中没有对应的类名，所以无效，因此不能直接赋值。
* 方式2 `:class="[size]"` : 如果想让 `v-bind` 去 `<style>` 中查找类名，就必须把类名放到数组中，但是放到数组中之后，默认还是会去 Model 中查找



```css
<style>
  .css1{
    width: 100px; height: 100px; border: 1px solid red;
  }
  .css2{
    width: 100px; height: 100px; border: 1px solid green;
  }
  .bgc{
    background-color: gray;
  }
</style>
```

```html
<div id="app">
  <div class="css1">1</div><br>
  <!-- 绑定样式 -->
  <p :style="{color: 'red', 'font-size': '100px'}">p标签</p>
  <div v-bind:class="'css2'">2</div><br>
  <!-- 通过布尔值选择是否绑定样式 -->
  <div v-bind:class="{css2:flagno}">3</div><br>
  <div v-bind:class="{css2:flagyes}">4</div><br>
  <!-- 绑定多个样式，用数组 -->
  <div v-bind:class="['css2', 'bgc']">5</div>
  
  <!-- 通过对象方式绑定，对象还可以从服务端获取 -->
  <p :class="obj">p标签</p>
</div>
<script>
  new Vue({
    el:'#app',
    data:{
      flagyes:true,
      flagno:false,
      obj: {
        size: true,
        color: true
      }
    }
  })
</script>
```

```html
<div id="app">
  <div :class="classobj">class样式绑定-对象写法</div>
  <div :class="classarr">class样式绑定-数组写法</div>

  <div :style="styleobj">style样式绑定-对象写法</div>
  <div :style="stylearr">style样式绑定-数组写法</div>
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      classobj: {
        a: true,
        b: true,
        c: false
      },
      classarr: ['a', 'b'],
      styleobj: {
        backgroundColor: 'red'  // 驼峰写法
      },
      stylearr: [{backgroundColor: 'red'}, {fontSize: '40px'}]
    }
  })
  // vm.classobj.d = true   // 直接给对象添加属性，不会被监测到，视图不会发生改变
  Vue.set(vm.classobj, 'g', true)   // 使用Vue.set(要修改的值, key, value)
</script>
```



### 在组件上使用

对于只有一个根元素的组件，当你使用了 `class` attribute 时，这些 class 会被添加到根元素上，并与该元素上已有的 class 合并。

```html
<!-- 子组件模板MyComponent -->
<p class="foo bar">Hi!</p>

<!-- 在使用组件时添加一些 class -->
<MyComponent class="baz boo" />

<!-- 渲染出的 HTML 为 -->
<p class="foo bar baz boo">Hi!</p>
```



如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 `$attrs` 属性来实现指定：

```html
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>

<MyComponent class="baz" />

<!-- 渲染出的 HTML 为 -->
<p class="baz">Hi!</p>
<span>This is a child component</span>
```



### 自动前缀

当你在 :style 中使用了需要**浏览器特殊前缀**的 CSS 属性时，Vue 会自动为他们加上相应的前缀。Vue 是在运行时检查该属性是否支持在当前浏览器中使用。如果浏览器不支持某个属性，那么将尝试加上各个浏览器特殊前缀，以找到哪一个是被支持的。



**样式多值**

你可以对一个样式属性提供多个 (不同前缀的) 值，举例来说：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 `display: flex`。





## 为什么要var _this = this

因为如果要在其他方法中对vm对象里面的数据进行修改，在那个方法里直接this的话操作的是那个方法自身的this，而不是vm对象。所以需要在函数开头将vm的this引用传递给_this，才能操作vm中的数据。



## 生命周期钩子

生命周期钩子的 `this` 上下文指向调用它的 Vue 实例。因此你可以访问数据，对 property 和方法进行运算。这意味着**你不能使用箭头函数来定义一个生命周期方法** (例如 `created: () => this.fetchTodos()`)。这是因为箭头函数绑定了父上下文，因此 `this` 与你期待的 Vue 实例不同，`this.fetchTodos` 的行为未定义。



* beforeCreate(): 在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用。
* created(): 在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 `$el` property 目前尚不可用。
* beforeMount(): 在挂载开始之前被调用：相关的 `render` 函数首次被调用。**该钩子在服务器端渲染期间不被调用。**
* mounted(): 实例被挂载后调用，这时 `el` 被新创建的 `vm.$el` 替换了。
  * 在这里可以设置 ajax、事件监听、启动定时器、访问dom等
  * **数据创建完成不等于dom渲染完成**
  * 注意 `mounted` **不会**保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 `mounted` 内部使用 `vm.$nextTick`
* beforeUpdate(): 在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。
  * **该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。**
* updated(): 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
  * 当这个钩子被调用时，**组件 DOM 已经更新**，所以你现在可以执行依赖于 DOM 的操作。
  * beforeUpdate() 和 updated() **视图发生改变就会触发**。即使状态更改了，但是该状态没有用在视图，也不会触发。状态改成相同值也不会触发，因为视图没有发生更新。
  * 注意，`updated` **不会**保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 `updated` 里使用 `vm.$nextTick`
  * **该钩子在服务器端渲染期间不被调用。**
* activated(): 被 keep-alive 缓存的组件激活时调用。**该钩子在服务器端渲染期间不被调用。**
* deactivated(): 被 keep-alive 缓存的组件停用时调用。**该钩子在服务器端渲染期间不被调用。**
* beforeDestroy(): 实例销毁之前调用。在这一步，实例仍然完全可用。**该钩子在服务器端渲染期间不被调用。**
* destroyed(): 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
  * 调用 `vm.$destroy()` 删除实例或者组件的`v-if`为false。
  * 销毁父组件，子组件也会被销毁。
  * 如果之前设置了定时器或者滚动事件等，实例销毁后并不会把这些也销毁，所以需要手动清除定时器或事件。
  * **该钩子在服务器端渲染期间不被调用。**
* errorCaptured(): 当捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。

详细可见：https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90



```html
<div id="app">
  {{ msg }}
  <input type="text" v-model="msg" /><br>
  <button type="button" @click="del">销毁Vue实例</button>
</div>

<script>
  var vm = new Vue({
    el:'#app',
    data:{
      msg:'hello'
    },
    methods:{
      del() {
        this.$destroy(vm)
      }
    },
    beforeCreate() {
      console.log('beforeCreate')
    },
    created() {
      console.log('created')
    },
    beforeMount() {
      console.log('beforeMount')
    },
    mounted() {
      console.log('mounted')
    },
    beforeUpdate() {
      console.log('beforeUpdate')
    },
    updated() {
      console.log('updated')
    },
    beforeDestroy() {
      console.log('beforeDestroy')
    },
    destroyed() {
      console.log('destroyed')
    }
  })
</script>
```





声明周期图示：

![lifecycle](https://www.huangyihui.cn/upload/gburlimg/a332a02281b34.png)





## 自定义指令

当指令不能满足我们复杂的要求的时候，可以自定义指令来完成操作。主要用来操作dom

自定义指令分为**全局**自定义指令和**局部**自定义指令，它们的区别在于全局自定义指令可以在任何一个Vue实例绑定的 View 中使用，而局部自定义指令只可以在定义时的那个Vue实例绑定的 View 中使用。

全局自定义指令：`Vue.directive("自定义指令名称",Object)`

使用指令：`v-指令名`



指令可以在不同的生命周期阶段执行。指令生命周期方法: 

* `bind()` : 只调用一次，指令第一次绑定到元素上的时候调用。可在这里进行一次性的初始化设置
* `inserted()` : 绑定指令的元素被添加到父元素上的时候调用
* `update()` : 绑定指令的元素里面的值更新的时候调用，**但是可能发生在其子VNode更新之前**
* `componentUpdated()` : 指令所在组件的 VNode **及其子 VNode** 全部更新后调用
* `unbind()` : 只调用一次，指令与元素解绑时调用
* 钩子函数中的参数(即 `el、binding、vnode、oldvnode`)
  * `el` : 就是被绑定指令的那个元素，可以用来直接操作 DOM。
    * 除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。
  * `binding` : 指令对象，包含以下属性，还包含指令中定义的钩子函数。如果有传递参数，还可以 `binding.value` 得到传递过来的值
    * `name`：指令名，不包括 `v-` 前缀。
    * `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
    * `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
    * `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
    * `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
    * `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
  * vnode：创建好的虚拟节点，在inserted()中，可以通过`vnode.context`可以拿到实例上下文，在里面可以访问到定义的状态
  * oldvnode：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

自定义指令时一定要明确指令的业务逻辑代码更适合在哪个阶段执行。

例如: 指令业务逻辑代码中没有用到元素事件，那么可以在 bind 阶段执行。如果用到了元素事件，那么就需要在 inserted 阶段执行。



**注意: 定义指令时，不用在指令名称前加上 `v-` 。使用指令时，则必须要以 `v-指令名称` 方式来使用。**

```html
<div id="app">
  <div v-color v-size>{{msg}}</div>
  <input type="text" v-model="msg"><br>
  <div v-atm>{{msg2}}</div>
  <input type="text" v-model="msg2">
  
  <!-- 指令还可以传递参数，参数默认会去View Model中查找，如果不想去VM中找，则需要将值用引号括起来 -->
  <p v-bgcolor="'gray'">p标签</p>
</div>
<script>
  // 全局自定义指令，返回已注册的指令
  Vue.directive("color", {
    // el 就是被绑定指令的那个元素
    bind(el, binding){
      el.style.color = "#f00"
      console.log(binding)
    },
    inserted(el, bind, newvnode, oldvnode){
      console.log("被绑定自定义指令的元素插入到其父节点的时候调用")
      console.log(newvnode.context)	// vue实例上下文
    },
    update(){
      console.log("被绑定自定义指令的元素里面的值更新的时候调用")
    },
    unbind(){
    }
  })
  
  Vue.directive('bgcolor', {
    bind(el, binding){
      console.log(el, binding)
      // 通过 binding.value 获取指令传入的参数
      el.style.backgroundColor = binding.value
    }
  })

  // 简写方式，表示调用了bind和update
  Vue.directive("atm", function(el, binding){
    el.style.color = "#00aa00"
    console.log(binding)
  })

  var vm = new Vue({
    el:'#app',
    data:{
      msg:'aaa',
      msg2:'hello'
    },
    // 局部自定义指令
    directives: {
      'size': {
        bind(el){
          el.style.fontSize = '100px'
        }
      }
    }
  })
</script>
```





## 系统属性$的使用

除了数据属性，Vue实例还提供了一些有用的示例属性与方法。其中有`$开头`和`_开头`的属性，`$开头`的属性是提供给开发者使用的， `_属性`是不建议使用的。

为什么他们都有前缀$ ，是因为以便与用户定义的属性区分开。



* `$root` : 访问根实例。在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` property 进行访问。
* `$parent` : 访问父级组件实例。可以用来从一个子组件访问父组件的实例。通过这个可以替代将数据以 prop 的方式传入子组件的方式
* `$children` : 以数组形式返回所有子级组件。**注意 `$children` 并不保证顺序，也不是响应式的**
* `$refs` : 一个对象，获取绑定了ref属性的组件或元素。只能获取自己模板内绑定的。
  * `$refs` 只会在**组件渲染完成之后生效**，并且它们不是响应式的。
  * 当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。应该注意的是，ref 数组**并不**保证与源数组相同的顺序。
  * 绑定在原生元素上时，得到的是元素dom。绑定在组件上时，得到的是组件实例
* `$attrs` : 一个对象，存放给组件传递属性，但是组件内部并没有用props接收的属性。
  * 可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。
* `$data` : 实例创建之后，可以通过 `vm.$data` 访问原始数据对象。Vue 实例也代理了 data 对象上所有的 property，因此访问 `vm.a` 等价于访问 `vm.$data.a`。
  * 不同实例上的 `$data` 代理了其自身的data property ，所以不同实例不一样的 `$data`。 `this.$data`
* `$el` : 在实例挂载之后，根元素可以用 `vm.$el` 访问。
* `$props` : 当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问。
* `$slots` : 用来访问被**插槽分发**的内容。每个**具名插槽**有其相应的 property (例如：`v-slot:foo` 中的内容将会在 `vm.$slots.foo` 中被找到)。`default` property 包括了所有没有被包含在具名插槽中的节点，或 `v-slot:default` 的内容。
* `$listeners` : 包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。



```javascript
<script>
  var vm = new Vue({
    el:'#app',
    data:{
      msg: "hello"
    },
    methods:{
      add(){
        console.log('aaa')
      }
    }
  })

  //两种方式一样
  console.log(vm.msg)
  console.log(vm.$data.msg)
  console.log(vm.msg === vm.$data.msg)	//true

  // ===
  vm.add()
  vm.$options.methods.add()

vm.$el === document.getElementById('app') // => true
// $watch 是一个实例方法
vm.$watch('msg', function (newValue, oldValue) {
  // 这个回调将在 `vm.msg` 改变后调用
})
</script>
```





1. 为元素绑定ref属性
2. 使用$refs属性获取指定元素

```html
<h1 ref="title">aaa</h1>

vm.$refs.title
vm.$refs['属性名']
```











## 常用属性方法

### $nextTick()

当你更改响应式状态后，DOM 会自动更新。然而，你得注意 DOM 的更新并不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次状态更改，每个组件都只更新一次。

若要等待一个状态改变后的 DOM 更新完成，你可以使用 `nextTick()` 这个全局 API：



作用：处理Vue中DOM的异步更新。例如：在mounted()中异步获取数据后赋值，立刻拿到改变后的值。

将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 `Vue.nextTick` 一样，不同的是回调的 `this` 自动绑定到调用它的实例上。



可以使用该方法解决一些异步修改状态后，视图没有即时更新的问题。

**数据创建完成不等于dom渲染完成，如果想要在dom渲染之后，立刻对dom进行操作，就可以使用nextTick**

**简单理解：当数据更新时，在dom渲染之后，会自动执行callback函数。**

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```html
<div id="app">
  <div ref="title">{{msg}}</div>
</div>
<script>
  var vm = new Vue({
    el:'#app',
    data:{
      msg:'hello'
    }
  })

  vm.msg = 'tom'
  // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
  vm.$nextTick(function(){
    console.log(vm.$refs.title.textContent)	//tom
  })
  // 出现结果为hello的原因是，打印操作没等DOM元素更新就执行了，所以得到的是没有更新的值
  // console.log(vm.$refs.title.textContent)	//hello
</script>
```

mounted --> nexttick --> updated



因为 `$nextTick()` 返回一个 `Promise` 对象，所以你可以使用then() 或者 async/await 语法完成相同的事情

```js
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```





### $watch()监听

如果在对象内部写，用watch()，在外部则用$watch()

vue 实例将会在实例化时调用 `$watch()`，遍历 watch 对象的每一个 property。

当需要在数据变化时执行异步或开销较大的操作时，侦听器方式是最有用的。

```html
<div id="app">
  <input type="text" v-model="name">
  <input type="text" v-model="user.id">
</div>
<script>
  var vm = new Vue({
    el:'#app',
    data:{
      name:'aaa',
      user:{
        id:001
      }
    },
    watch:{
      // 想监听哪个状态，名字就是那个状态
      name:function(newValue, oldValue){
        console.log("修改之前的数据："+ oldValue + ", 修改之后的数据："+ newValue)
      },
      user:{
        handler:function(newValue, oldValue){
          console.log("修改之前的数据："+ oldValue.id + ", 修改之后的数据："+ newValue.id)
          // 注意：在嵌套的变更中，只要没有替换对象本身，那么这里的 `newValue` 和 `oldValue` 相同
          console.log(newValue===oldValue) //true
        },
        deep:true //深度监听，当对象的属性发生改变的时候也会监听
        // immediate: true // 该回调将会在侦听开始之后被立即调用
      }
    }
  })
</script>
```

注意：在变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。除非开启深度监听(数组不需要)。

深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。



`watch` 选项也支持把键设置成用 `.` 分隔的路径：

```vue
<template>
  <div>
    <input type="text" v-model="saveModel.obj.name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      saveModel: {
        obj: {
          name: "张三",
        },
      },
    };
  },
  watch: {
    "saveModel.obj.name"(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
  },
};
</script>
```



**回调的触发时机**

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项：

```js
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```



**this.$watch()**

我们也可以使用组件实例的 `$watch()` 方法来命令式地创建一个侦听器：

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```



`vm.$watch` 返回一个取消观察函数，用来停止触发回调：

```js
var unwatch = vm.$watch('a', cb)
// 之后取消观察
unwatch()
```



### $set()

在Vue中，直接给data中的对象添加属性时，不会被监测到，所以视图不会发生改变。这时就需要用 `set()` 方法，让Vue监测到对象增加属性。

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。

`$set(要修改的对象/数组, 索引, 新的值)` : Vue.set()的别名。给对象或者数组修改或新增属性，并且能响应式的触发状态更新。返回设置的值。



给数组直接push时，则不会发生这种现象。

```js
// vm.classobj.d = true   // 直接给对象添加属性，不会被监测到，视图不会发生改变
Vue.set(vm.classobj, 'g', true)   // 使用Vue.set(要修改的值, key, value)
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    obj: {
      name: 'lisi',
      age: 12
    }
  },
  methods: {
    add() {
      // this.obj.id = '101'  // 非响应式
      this.$set(this.obj, 'id', '101')  // 响应式
    }
  }
})
```



#### 数组更新检测：

* 以下方法操作数组，可以检测变动
  * `push() pop() shift() unshift() splice() sort() reverse()`
  * 不会对原数组有影响的方法 `filter() concat() slice() map() 新数组替换旧数组`
    * 替换一个数组：当遇到的是非变更方法时，我们需要将旧的数组替换为新的：`this.items = this.items.filter((item) => item.message.match(/Foo/))`
* 不能检测到变动
  * vm.arr[index] = newValue	// 通过数组索引修改值
  * 解决：Vue.set(vm.arr, index, newValue)  或者 splice(修改值的索引，项个数，新值)





### $delete()

Vue.delete(要修改的对象/数组, 要删除属性的key值或者索引)

vm.delete(要修改的对象/数组, 要删除属性的key值或者索引) : Vue.delete()的别名

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。



### $on() $emit()

`vm.$on(eventname, callback)` : 监听当前实例上的自定义事件。事件可以由 `vm.$emit` 触发。回调函数会接收所有传入事件触发函数的额外参数。

`vm.$emit(eventname, [...args])` : 触发当前实例上的事件。附加参数都会传给监听器回调。

```js
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// => "hi"
```



`vm.$once(eventname, callback)` : 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

`vm.$off([eventname, callback])` : 移除自定义事件监听器。

* 如果没有提供参数，则移除所有的事件监听器；
* 如果只提供了事件，则移除该事件所有的监听器；
* 如果同时提供了事件与回调，则只移除这个回调的监听器。



### 手动挂载$mount()

如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 `vm.$mount()` 手动地挂载一个未挂载的实例。返回实例自身

`vm.$mount(['元素/选择器'])` : 

```javascript
//手动挂载
var vm = new Vue({
  data:{

  }
}).$mount('#app')
```



### $forceUpdate()

`$forceUpdate()` : 强制更新。当数组或对象的变更没有被检测到时，页面不会发生变化。会迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

* 如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事。



例如：直接通过数组索引更改数组时，不会被Vue检测到变更，从而页面也不会发生变化，但又想要更新页面。

```js
this.arr[1] = 6
this.$forceUpdate()
```







### 手动销毁$destroy()

`vm.$destroy()` ：完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

触发 `beforeDestroy` 和 `destroyed` 的钩子。





## 双向绑定的实现

Vue为我们提供了`v-model`实现双向绑定，但我们还可以通过绑定`ref`和按键`keyup`事件实现双向绑定功能。

```html
<div id="app">
  <input ref="name" @keyup="logName"></input>{{name}}
</div>
<script>
  var vm = new Vue({
    el:"#app",
    data:{
      name:""
    },
    methods:{
      logName(){
        this.name = this.$refs.name.value
      }
    }
  })
</script>
```





## 方法调用、computed、watch的区别

方法: 页面数据每次重新渲染都会重新执行。性能消耗大。除非不希望有缓存的时候用。

computed: 是计算属性，依赖其他属性计算值，并且computed的值有缓存，只有当计算值变化才会返回内容。

watch: 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。



总结:

​	除非不希望缓存，一般都不会用方法。

​	一般来说，需要依赖别的属性来动态获得值的时候可以使用computed。

​	对于监听到值的变化需要做异步操作或开销较大的操作时用watch。







## transition 过渡效果

Vue在插入、更新或者移除DOM时，提供多种不同方式的应用过渡效果。

* `<transition>` ：节点下只能同时有一个根元素
  * name属性：设置动画效果样式
  * enter-active-class属性：进入时效果样式
  * leave-active-class属性：离开时效果样式
  * mode属性：过渡顺序
  * duration属性： 显性的过渡持续时间ms
    * `:duration="1000"` `:duration="{ enter: 500, leave: 800 }"`
  * appear属性 : boolean，是否在初始渲染时使用过渡。默认为 `false`。
  * 钩子函数
* `<transition-group>` ：节点下能有多个根元素
  * tag属性：包裹节点下所有元素的标签名
  * 除了mode，其他属性同上

animate.css动画库 https://animate.style/

```html
<link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
```





* 单元素/组件过渡
  * 过渡效果可以使用 css过渡、css动画、结合animate.css动画库
  * 过渡的class名：https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D
* 多个元素过渡(设置key)
  * **当有相同标签名的元素切换时，需要通过key特性设置唯一的值来标记**，以让Vue区分它们。否则Vue为了效率只会替换相同标签内部的内容，导致没有动画效果。原理：**diff算法**，比较层级节点，发现标签名一致，不做删除操作，只是改变里面内容
  * 设置不同key之后，会发现多个元素会同时在页面中出现过渡效果，可以给 `<trainsition>` 设置 mode属性
    * `mode: in-out` 等下个元素进来，自身再出去（两个同时在）
    * `mode: out-in` 前面元素先出来，后面的再进来
* 多个组件过渡
  * 和上面的多个元素过渡差不多，也可以设置mode属性，但是因为组件名本身就不同，所以不需要key
* 列表过渡(必须设置key)
  * `<transition-group>` 不同于 `<transition>` ，它会以一个真实元素呈现：默认为一个 `<span>` 。该元素会包裹节点下的所有元素。也可以通过 tag属性更换为其他元素。
  * 列表项必须提供唯一的key属性值





```html
<link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
<style>
  /* 样式名定义规则：前缀和<transition>的name属性一致，后面的固定写法 */
  .hlw-enter-active, .hlw-leave-active {
    transition: all 1.5s;
  }
  .hlw-enter, .hlw-leave-to {
    opacity: 0;
    transform: translateX(100px);
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: translateX(100px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;  /* 0透明  1不透明*/
    }
  }
</style>
```



### 单元素/组件过渡

```html
<button @click="isShow = !isShow">click</button>

<!-- css过渡 通过name属性设置动画效果 -->
<transition name="hlw">
  <p v-show="isShow">11111</p>
</transition>

<!-- css动画 -->
<transition name="bounce">
  <p v-show="isShow">11111</p>
</transition>

<!-- enter-active-class：进入时效果 leave-active-class：离开时效果  -->
<transition enter-active-class="animate__animated animate__flash" leave-active-class="animate__animated animate__backOutRight">
  <p v-show="isShow">11111</p>
</transition>
```



### 多元素/组件过渡

```html
<transition name="hlw" mode="out-in">
  <p v-if="isShow" :key="1">1111</p>
  <p v-else :key="2">2222</p>
</transition>

<transition name="hlw" mode="out-in">
  <one v-if="isShow"></one>
  <two v-else></two>
</transition>

<script>
Vue.component('one', {
  template: `<div>one组件</div>`
})
Vue.component('two', {
  template: `<div>two组件</div>`
})
</script>
```



### 列表过渡

```html
<!-- tag默认为span   -->
<transition-group name="hlw" tag="ul">
  <!-- 如果key为index，会发现都是删底下那个，只是因为diff算法通过比较key，
      发现key的最后一个没有了，删除了最后一个，修改了前面节点的内容
  -->
  <li v-for="data,index in datalist" :key="data">
    {{data}}--<button @click="handleDel(index)">del</button>
  </li>
</transition-group>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      datalist: ['111', '222', '333']
    },
    methods: {
      handleDel(index) {
        this.datalist.splice(index, 1)
      }
    }
  })
</script>
```



### 钩子函数

可以在 attribute 中声明 JavaScript 钩子。

当只用 JavaScript 过渡的时候，**在 `enter` 和 `leave` 中必须使用 `done` 进行回调**。否则，它们将被同步调用，过渡会立即完成。

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

```js
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
// ...
methods: {
  // --------
  // 进入中
  // --------

  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 离开时
  // --------

  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```



### 状态过渡

结合第三方库，对状态的变化实现动画效果

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/tween.js@16.3.4"></script>
  <title>状态过渡</title>
  <script src="vue.js"></script>
</head>
<body>
  <div id="app">
    <input v-model.number="firstNumber" type="number" step="20"> +
    <input v-model.number="secondNumber" type="number" step="20"> =
    {{ result }}
    <p>
      <animated-integer v-bind:value="firstNumber"></animated-integer> +
      <animated-integer v-bind:value="secondNumber"></animated-integer> =
      <animated-integer v-bind:value="result"></animated-integer>
    </p>
  </div>

  <script>
    Vue.component('animated-integer', {
      template: '<span>{{ tweeningValue }}</span>',
      props: {
        value: {
          type: Number,
          required: true
        }
      },
      data: function () {
        return {
          tweeningValue: 0
        }
      },
      watch: {
        value: function (newValue, oldValue) {
          this.tween(oldValue, newValue)
        }
      },
      mounted: function () {
        this.tween(0, this.value)
      },
      methods: {
        tween: function (startValue, endValue) {
          var vm = this
          function animate () {
            if (TWEEN.update()) {
              requestAnimationFrame(animate)
            }
          }

          new TWEEN.Tween({ tweeningValue: startValue })
            .to({ tweeningValue: endValue }, 500)
            .onUpdate(function () {
              vm.tweeningValue = this.tweeningValue.toFixed(0)
            })
            .start()

          animate()
        }
      }
    })

    var vm = new Vue({
      el: '#app',
      data: {
        firstNumber: 20,
        secondNumber: 40
      },
      computed: {
        result: function () {
          return this.firstNumber + this.secondNumber
        }
      }
    })
  </script>

</body>
</html>
```



## hookEvent

在 `Vue 2.X` 当中，`hooks` 可以作为一种 `Event`，在 `Vue` 的源码当中，称之为 `hookEvent`。利用它，我们可以模板声明式的监听子组件的生命周期钩子，从而可以给第三方组件添加生命周期处理函数

比如，我们调用了一个很耗费性能的第三方组件 `List`，这个组件可能需要渲染很久，为了更好的用户体验，我们想在 `List` 组件进行更新的时候添加一个 `loading` 的动画效果

这个时候，我们可能会想到直接修改这个组件的源码，利用 `beforeUpdate` 和 `updated` 来显示 `loading`，但是这种办法非常不好。第一修改成本比较大，第二无法享受开源社区对这个组件的升级与维护，你需要自己手动维护

这个时候就可以通过 `hookEvent` 模板声明式的注入声明周期钩子函数，类似如下：

```vue
<List @hook:updated="handleTableUpdated"></List>
```



另外，我们还可以通过下面的方式给一个 `Vue` 组件添加生命周期处理函数

```js
vm.$on('hooks:created', cb)
vm.$once('hooks:created', cb)
```



比如我们想在组件销毁的时候，去销毁之前调用的组件，一般我们会这么做：

```js
mounted() {
  this.thirdPartyPlugin = thirdPartyPlugin()
},
beforeDestroy() {
  this.thirdPartyPlugin.destroy()
},
```

可以修改成这样，优化我们代码的可读性，精简我们的代码

```js
mounted() {
  this.thirdPartyPlugin = thirdPartyPlugin()
  this.$on('hook:beforeDestroy', () => {
    this.thirdPartyPlugin.destroy()
  })
},
```




