# 组件





## 全局组件和局部组件

```html
<div id="app">
  <quanju></quanju>
  <jubu></jubu>
</div>
<script>
  Vue.component('quanju', {
    template:"<h1>这个定义的是全局组件</h1>"
  })

  var vm = new Vue({
    el:'#app',
    components:{
      "jubu":{
        template:"<h1>这个定义的是局部组件</h1>"
      }
    }
  })
</script>
```





## 模板

当组件内的模板内容比较多，或者模板是通用的，那么就可以将模板单独封装起来。

注意：`template`模板内只能有一个根元素。

```html
<div id="app">
  <quanju></quanju>
  <jubu></jubu>
</div>

<template id="d1">
  <div>
    自定义模板封装
    <h1>哈哈哈哈</h1>
  </div>
</template>

<script>
  // 组件内通过模板ID来使用自定义的模板
  Vue.component('quanju', {
    template:"#d1"
  })

  var vm = new Vue({
    el:'#app',
    components:{
      "jubu":{
        template:"#d1"
      }
    }
  })
</script>
```



## 组件命名

在单文件组件中，推荐为子组件使用 `PascalCase` 的标签名，以此来和原生的 HTML 元素作区分。虽然原生 HTML 标签名是不区分大小写的，但 Vue 单文件组件是可以在编译中区分大小写的。我们也可以使用 `/>` 来关闭一个标签。

如果你是直接在 DOM 中书写模板 (例如原生 `<template>` 元素的内容)，模板的编译需要遵从浏览器中 HTML 的解析行为。在这种情况下，你应该需要使用 `kebab-case` 形式并显式地关闭这些组件的标签。

```vue
<ButtonCounter />

<button-counter></button-counter>
```



## 组件嵌套

组件中可以嵌套多个组件，会形成一对多的父子层级关系。

子组件和父组件不能够并列使用，如果要使用子组件，只能在父组件的`template`中调用子组件。

```html
<div id="app">
  <fuqin></fuqin>
</div>

<template id="t1">
  <div>
    我是父组件
    <!-- 在父组件的template中调用子组件 -->
    <erzi></erzi>
  </div>
</template>
<template id="t2">
  <div>我是子组件</div>
</template>

<script>
  var vm = new Vue({
    el:'#app',
    components:{
      "fuqin":{
        template:"#t1",
        components:{
          "erzi":{
            template:"#t2"
          }
        }
      }
    }
  })
</script>
```



## props属性

* 数组形式
* 对象形式
  * props 属性验证：`props: {属性名:限制传值的类型, age:Number}`
  * 类型可以有：Number、String、Boolean、Array、Object、Function、Date、Symbol、null（不限制类型），还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。
* 定制验证方式
  * 当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。
  * 注意那些 prop 会在一个组件实例创建**之前**进行验证，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。
* 给组件传prop，但组件内部没有设置props属性接收，那么会将这些prop添加到该组件的根元素上。并且不会覆盖根元素上原有的同名prop。
  * 如果**不**希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`。配合 `$attrs` 属性，决定传递过来的参数被赋予在组件内的哪个元素。注意 `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。



注意点：

* 在 JavaScript 中对象和数组是通过**引用传入**的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。
* 当向组件传递prop时，组件内部并没有使用props接收，那么该prop会添加到该组件的根元素上

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']

props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}


Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字, 如果该 prop 没有被传入，则换做用这个值
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数会将该 prop 的值作为唯一的参数代入
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    // 检测类型 + 其他验证
    age: {
      type: Number,
      default: 0,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    }
  }
})
```



### 传入一个对象的所有 property

如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。例如，对于一个给定的对象 `post`：

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```html
<blog-post v-bind="post"></blog-post>
```

等价于：

```html
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```





### 禁用 Attribute 继承

默认情况下，当向组件传递Attribute时，组件内部并没有使用props接收，那么该Attribute会添加到该组件的根元素上

* `inheritAttrs: false`  根元素不继承传递的Attribute
* `v-bind="$attrs"`  绑定传递过来的Attribute
* `$attrs` 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定

```js
Vue.component('custom-input', {
  inheritAttrs: false,
  props: ['value', 'label'],
  template: `
    <label>
      {{ label }}
      <input v-bind="$attrs" :value="value" @input="$emit('input', $event.target.value)">
    </label>
  `
})
```

```html
<custom-input v-model="text" label="username" placeholder="输入用户名" xxx="123"/>
```



#### functional 函数式组件

当一个组件只是一个接受一些 prop ，在这样的场景下，我们可以将组件标记为 `functional`，这意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。

因为函数式组件只是函数，所以渲染开销也低很多。

```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})


```



组件需要的一切都是通过 `context` 参数传递，它是一个包括如下字段的对象：

- `props`：提供所有 prop 的对象
- `children`：VNode 子节点的数组
- `slots`：一个函数，返回了包含所有插槽的对象
- `scopedSlots`：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- `data`：传递给组件的整个数据对象，作为 `createElement` 的第二个参数传入组件
- `parent`：对父组件的引用
- `listeners`：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 `data.on` 的一个别名。
- `injections`：(2.3.0+) 如果使用了 `inject` 选项，则该对象包含了应当被注入的 property。





> 注意：在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 `props` 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 `props` 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。
>
> 当使用函数式组件时，该引用将会是 HTMLElement，因为他们是无状态的也是无实例的。

在 2.5.0 及以上版本中，如果你使用了[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)，那么基于模板的函数式组件可以这样声明：

```html
<template functional>
</template>
```








## 组件间的数据通信

组件默认情况下，只能去调用自己的属性和方法，不能够跨组件调用。

子组件和父组件不能够并列使用，子组件只能够在父组件里面使用（也就是在父组件的template中使用）。



组件间通信的方式：

* props / $emit
* $children / $parent
* provide / inject
* ref
* eventBus
* vuex
* localStorage / sessionStorage
* $attrs / $listeners



### 父传子 props

1. 在父组件template中，给子组件绑定属性，用于传递数据给子组件。推荐属性名和数据的变量名相同。
2. 在子组件中使用`props`属性，接收父组件传递过来的数据。
3. 在子组件template中，可以用双花括号来使用`props`属性接收过来的数据。



```html
<div id="app">
  <fuqin></fuqin>
</div>

<template id="t1">
  <div>
    我是父组件
    <erzi :attr1="attr1"></erzi>
  </div>
</template>
<template id="t2" >
  <div>我是子组件 {{attr1}}</div>
</template>

<script>
  var vm = new Vue({
    el:'#app',
    components:{
      "fuqin":{
        template:"#t1",
        data(){
          return {
            attr1:"我是父组件的数据"
          }
        },
        components:{
          "erzi":{
            template:"#t2",
            props:["attr1"],
            data(){
              return {
                attr2:"我是子组件的数据"
              }
            }
          }
        }
      }
    }
  })
</script>
```





### 子传父 $emit()

1. 在子组件中，通过erzi组件的对象，调用`$emit()`方法，触发了一个自定义的事件fs，发送数据。

   如果要自动传递，可以在子组件的生命周期`mounted()`中调用`$emit()`方法触发自定义事件。

2. 在父组件的template中，在erzi子组件上监听第一步中的自定义事件fs，如果自定义事件fs触发，则响应父组件中自定义的getData方法。

3. 在父组件的methods中声明getData方法，设置参数接收自定义事件fs传递过来的参数

4. 在父组件的data中声明变量接收子组件传递的数据



在父组件中监听一个事件，在子组件中 `$emit()` 触发父组件监听的事件，并传值。

```html
<div id="app">
  <fuqin></fuqin>
</div>

<template id="t1">
  <div>
    我是父组件，{{ attr2 }}
    <erzi @fs="getData"></erzi>
  </div>
</template>
<template id="t2" >
  <div>
    我是子组件
    <button @click="send">将子组件的数据传递给父组件</button>
  </div>
</template>

<script>
  var vm = new Vue({
    el:'#app',
    components:{
      "fuqin":{
        template:"#t1",
        data(){
          return {
            attr1:"我是父组件的数据",
            attr2:""
          }
        },
        methods:{
          getData(attr2){
            this.attr2 = attr2
          }
        },
        components:{
          "erzi":{
            template:"#t2",
            data(){
              return {
                attr2:"我是子组件的数据"
              }
            },
            methods:{
              send(){
                // 通过erzi组件的对象，调用$emit()方法，触发了一个自定义的事件fs，发送数据
                this.$emit('fs', this.attr2)
              }
            },
            mounted() {
              // 子组件挂载完成后传递数据给父组件
              this.$emit('fs', this.attr2)
            }
          }
        }
      }
    }
  })
</script>
```



### `$children` / `$parent`

通过`$parent`和`$children`就可以访问组件的实例，则可以访问此组件的所有方法和`data`。

```js
this.$children[0].messageA = 'this is new value'

this.$parent.msg
```



### `provide` / `reject`

父组件中通过`provide`来提供变量, 然后再子组件中通过`reject`来注入变量。

```js
// 父组件
export default {
  provide: {
    for: "demo"
  },
}


// 子组件
export default {
  inject: ['for'],
  data() {
    return {
      demo: this.for
    }
  },
}
```



### `$attrs` / `$listeners`

子组件没有使用 props 接收父组件传递的属性时，这些属性可以在子组件中使用 `$attrs` 获取。

```vue
<child title="aa" />

// 子组件中获取
this.$attrs
```



### 事件总线

1. 创建一个空的Vue对象vm2

2. 在兄弟组件2中，通过vm2调用$emit()方法，触发自定义事件fs发送数据

   同理，**如果需要挂载后自动发送数据，可以在mounted()中调用$emit()**

3. 在兄弟组件1中，通过vm2调用$on()方法，监听fs事件并接收数据。

4. 在兄弟组件1的data中声明变量存储数据。



创建一个空的 Vue 对象 bus

使用 `$on(eventName)` 监听事件

使用 `$emit(eventName)` 触发事件并传值 

```html
<div id="app">
  <child1></child1>
  <child2></child2>
</div>

<script>
  var bus = new Vue()

  Vue.component('child1', {
    template: `
      <div>
        child1
        <button @click="handleClick">传值</button>  
      </div>
    `,
    methods:{
      handleClick() {
        bus.$emit('hlw', '来自child1的问候')
      }
    }
  })

  Vue.component('child2', {
    template: `<div>child2</div>`,
    mounted() {
      bus.$on('hlw', data=>{
        console.log('接收消息：', data)
      })
    }
  })

  var vm = new Vue({
    el: '#app'
  })
</script>
```



### ref

给标签绑定 `ref`属性后，可以通过vue实例的 `$refs` 获取到所有绑定了 ref 的标签。

**ref放在标签上，拿到的是原生节点**

**ref放在组件上，拿到的是组件对象**

```html
<div id="app">
  <input type="text" ref="mytext">
  <button @click="handleClick">click</button>

  <mycom ref="com"></mycom>
</div>

<script>
  Vue.component('mycom', {
    template: `<p>mycom组件</p>`,
    methods:{
      getData(data){
        console.log('获取到其他组件传递过来的值了：', data)
      }
    }
  })

  var vm = new Vue({
    el: '#app',
    mounted(){
      console.log(this.$refs.mytext)  // <input type="text">
      console.log(this.$refs.com)     // VueComponent {}
    },
    methods: {
      handleClick() {
        // 组件传值：调用组件对象中的方法，拿到另一个组件的值
        this.$refs.com.getData(this.$refs.mytext.value)
      }
    }
  })
</script>
```



如果一个子组件使用的是选项式 API ，被引用的组件实例和该子组件的 `this` 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易，当然也因此，应该只在绝对需要时才使用组件引用。大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互。

`expose` 选项可以用于限制对子组件实例的访问：

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

在上面这个例子中，父组件通过模板引用访问到子组件实例后，仅能访问 `publicData` 和 `publicMethod`。

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>
```

当父组件通过模板引用获取到了该组件的实例时，得到的实例类型为 `{ a: number, b: number }` (ref 都会自动解包，和一般的实例一样)。





### slot插槽

```html
<div id="app">
  <swiper>
    <p>{{title}}</p>
  </swiper>
</div>

<script>
  Vue.component('swiper', {
    template: `
      <div>
        <p>{{name}}子组件</p>
        <slot></slot>
      </div>
    `,
    data() {
      return {
        name: 'swiper'
      }
    },
    mounted() {
      console.log(this.$slots.default[0].context.title)   // 父组件作用域-title
    }
  })

  var vm = new Vue({
    el: '#app',
    data: {
      title: '父组件作用域-title'
    }
  })
</script>
```



### .sync update:

```vue
// 子组件在向父组件通信时，传递的事件名需要改为这样的格式：update:需要改变的变量名
<div @click='divClick'>{{title}}</div>
         ……
props: ['title'],
methods: {
 divClick() {
  this.$emit('update:title', '我是改变后的值')
 }
}         
```

```vue
// 父组件使用了子组件child-cpn
// 父组件只需要在传递给子组件变量时，在变量名后面加一个修饰符.sync，这样的话父组件中的origin_title就会直接改变成子组件传递过来的参数了。
<child-cpn :title.sync='{{origin_title}}'/>
  ……
data() {
 return {
  origin_title: '我是原始值'
 }
}
```

父组件在使用了修饰符`.sync`后，省去了`@changeValue='changeValue'` 和 `changeValue(info) {this.origin_title = info}`这两部分代码，变得十分的简洁。



**注意**：

1. 这里我还是要强调一遍哦，子组件在向父组件通信的时候，传递的事件参数必须是 `unpdate:需要改变的变量名` 这样的格式，这是规定好的。
2. 在我们使用了修饰符 `.sync`后，传递给子组件数据时，不能使用表达式的形式，例如这样 `:title.sync="origin_title + '哈哈' "`，这样是会报错的。



### 实例-组件1控制组件2显示或隐藏

重点：可以使用ref方式或者事件总线方式控制组件2中isShow状态的改变

```html
<div id="app">
  <child></child>
  <sidebar ref="bar"></sidebar>
</div>

<script>
  Vue.component('child', {
    template: `<button @click="handleClick">show/hide</button>`,
    methods: {
      handleClick() {
        vm.$refs.bar.isShow = !(vm.$refs.bar.isShow)
      }
    }
  })

  Vue.component('sidebar', {
    template: `
      <div style="width:200px; background-color:yellow;" v-show="isShow">
        <ul>
          <li>111</li>  
          <li>222</li>  
          <li>333</li>  
        </ul>
      </div>
    `,
    data() {
      return {
        isShow: true
      }
    }
  })

  var vm = new Vue({
    el: '#app'
  })
</script>
```

```html
<div id="app">
  <child></child>
  <sidebar></sidebar>
</div>

<script>
  var bus = new Vue()


  Vue.component('child', {
    template: `<button @click="handleClick">show/hide</button>`,
    methods: {
      handleClick() {
        bus.$emit('change')
      }
    }
  })

  Vue.component('sidebar', {
    template: `
      <div style="width:200px; background-color:yellow;" v-show="isShow">
        <ul>
          <li>111</li>  
          <li>222</li>  
          <li>333</li>  
        </ul>
      </div>
    `,
    data() {
      return {
        isShow: true
      }
    },
    mounted() {
      bus.$on('change',()=>{
        this.isShow = !this.isShow
      })
    }
  })

  var vm = new Vue({
    el: '#app'
  })
</script>
```







## Vue实例中的template

```html
<div id="app"></div>

<script>
  // 模板定义和注册分离
  var MyComp = {
    data() {
      return {
        title: "库存管理系统",
      };
    },
    template: `<h1>{{title}}</h1>`,
  };

  // 注册全局组件
  Vue.component("MyComp", MyComp);
  var vm = new Vue({
    el: "#app",
    // template中的内容自动绑定到el中。
    template: `<div><MyComp></MyComp></div>`,
  });
</script>
```



在模板中使用组件特别简单，把组件名当做HTML元素名使用即可。

但是要注意以下几点：

1. 组件必须有结束

   组件可以自结束，也可以用结束标记结束，但必须要有结束。

2. 组件的命名

   * 大驼峰命名法: 推荐，"MyComp"
   * 短横线命名法: "my-comp"

```vue
<MyComp></MyComp>
<MyComp/>

<MyComp> //ERROR
```



## 组件上使用 v-model

```html
<input v-model="searchText">

// v-model 等价于
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```



`v-model` 用在组件上时，这个组件内的 `<input>` 必须：

* 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
* 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input :value="value" @input="$emit('input', $event.target.value)">      
  `
})
```

```html
<custom-input v-model="msg" />
```





## 单向数据流

在组件中，属性是只读的，绝不可以更改，这叫做单向数据流。





## 组件之间的通讯方式

1.属性传值和自定义事件$emit触发

props

自定义事件$emit



2.

.$parent   父组件

.$children  数组 uid

ref="xxx" 类似id	this.$refs.xxx



3.事件总线

let Event = new Vue()

数据的发送: Event.$emit('接口', 数据)

数据的接收: Event.$on('接口', function(v){ //v表示发过来的数据} )



4.

插槽

插入插槽后，在组件内通过`$slots`属性可以获取到插入的节点，拿到节点就可以拿到节点内的所有内容，所以可以通过插槽来传递数据。



5.状态管理

vuex



6.

$attrs

$listeners





## `<component>` 动态组件

`<component>` 元素：动态地绑定多个组件到它的 `is属性` 。当不确定要显示哪个组件时，这个标签很有用。

`<keep-alive>` 元素：保留(组件)状态，避免重新渲染。

```html
<div id="app">
  <!-- keep-alive 保留组件中的状态 -->
  <keep-alive>
    <component :is="who"></component>
  </keep-alive>
  
  <div>
    <button @click="who = 'home'">首页</button>
    <button @click="who = 'listPage'">列表页</button>
    <button @click="who = 'shopping'">购物车</button>
  </div>
</div>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      who: 'home'
    },
    components: {
      home: {
        template: `<div>home<input type="text" /></div>`
      },
      listPage: {
        template: `<div>listPage</div>`
      },
      shopping: {
        template: `<div>shopping</div>`
      },
    }
  })
</script>
```



## `<keep-alive>` 组件

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

**主要用于保留组件状态或避免重新渲染。**

* **Props**：
  - `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
  - `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
  - `max` - 数字。最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。



当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

> 在 2.2.0 及其更高版本中，`activated` 和 `deactivated` 将会在 `<keep-alive>` 树内的所有嵌套组件中触发。
>
> `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。



```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
```

注意，`<keep-alive>` 是用在其一个直属的子组件被开关的情形。如果你在其中有 `v-for` 则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。









## slot插槽

在页面上使用组件时，如果在组件内想添加内容，会发现没有效果。这是因为在生成虚拟dom时，会将组件中的内容替换成template的内容。如果想保留使用时自定义的内容，可以使用插槽。



**插槽能够混合父组件的内容与子组件自己的模板(内容分发)。**

**父组件模板的内容在父组件作用域内编译，子组件模板的内容在子组件作用域内编译。**

https://cn.vuejs.org/v2/guide/components-slots.html



插槽：

* 单个slot `<slot></slot>  `
  * 组件标签内的内容都会放在slot中。
  * 组件内部的`<slot>`中有后备内容的话，内容会被渲染出来。但是在使用组件时，如果提供了插槽内容，原内容就会被取代。
* 具名插槽 `<slot name="xxx"></slot>`
  * name 属性：用来定义插槽的名字。一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。
  * 使用具名插槽 ：`<template v-slot:a>aaaa</template>`  `<template #c>ccc</template>`
    * 在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称。注意 `v-slot` 只能添加在 `<template>` 上 (组件上例外)，否则就会报错，并且不会被插入。
    * 两者的插槽名相同才会插入，两者插槽名不相同或者没有单个插槽则不会插入。
    * 如果插入时，没有设置插槽名，并且组件内template中有设置单个插槽，那么会插入到单个插槽中
* **插入位置以template中设置的插槽位置为准。**



```html
<div id="app">
  <swiper>haahha</swiper>
</div>

<script>
  Vue.component('swiper', {
    template: `
      <div>
        <slot></slot>
        <ul>
          <li>111</li>
          <li>222</li>
          <li>333</li>
        </ul>
      </div>
    `,
  })

  var vm = new Vue({
    el: '#app',
  })
</script>
```

```html
<div id="app">
  <swiper>
    <hello>   <!-- 插入到swiper组件的单个插槽中 -->
      <template v-slot:a>aaa</template>   <!-- 插入到template中name为a的slot中 -->
      <template #c>ccc</template>   <!-- 简写。插入到template中name为c的slot中 -->
      <template #b>bbb</template>   <!-- 插入到template中name为b的slot中 -->
      <template #x>xxx</template>   <!-- 不会插入，因为template中没有name为x的slot -->
      <div>hi</div>   <!-- 因为没有设置slot属性，并且template中有单个插槽，所以会插入到单个插槽中-->
      <template v-slot:[slotname]>动态插槽名</template>
    </hello>
  </swiper>
</div>

<script>
  Vue.component('swiper', {
    template: `
      <div style="background-color:yellow;">
        <p>swiper组件</p>
        <slot></slot>
      </div>
    `,
  })

  Vue.component('hello', {
    template: `
      <div>
        <slot name="a"></slot>
        <slot name="b"></slot>
        <slot name="c"></slot>
        <slot></slot>
      </div>  
    `,
  })

  var vm = new Vue({
    el: '#app',
  })
</script>
```



### 编译作用域

父组件模板的内容在父组件作用域内编译，子组件模板的内容在子组件作用域内编译。

```html
<div id="app">
  <swiper>
    <p>{{title}}</p>
  </swiper>
</div>

<script>
  Vue.component('swiper', {
    template: `
      <div>
        <p>{{name}}子组件</p>
        <slot></slot>
      </div>
    `,
    data() {
      return {
        name: 'swiper'
      }
    }
  })

  var vm = new Vue({
    el: '#app',
    data: {
      title: '父组件作用域-title'
    }
  })
</script>
```



### 作用域插槽

让插槽内容能够访问子组件中的数据。



为了让 `user` 在父级的插槽内容中可用，我们可以将 `user` 作为 `<slot>` 元素的一个 attribute 绑定上去：

```js
Vue.component('demo', {
  data() {
    return {
      user: {
        lastname: '李',
        firstname: '四'
      }
    }
  },
  template: `
    <span>
      <slot v-bind:user="user">{{ user.lastname }}</slot>
    </span>
  `
})
```

绑定在 `<slot>` 元素上的 attribute 被称为**插槽 prop**。现在在父级作用域中，我们可以使用带值的 `v-slot` 来定义我们提供的插槽 prop 的名字：

```html
<demo>
  <template v-slot:default="slotuser">
    {{slotuser.user.firstname}}
  </template>
</demo>

<!-- 独占默认插槽的缩写语法 -->
<demo>
  <template v-slot="slotuser">
    {{slotuser.user.firstname}}
  </template>
</demo>
```

只要出现多个插槽，请始终为所有的插槽使用完整的基于 `<template>` 的语法。



**解构插槽Prop**

可以使用ES6中的解构语法来传入具体的插槽prop

```html
<!-- 解构插槽 -->
<demo>
  <template v-slot="{ user }">
    {{user.firstname}}
  </template>
</demo>

<!-- 解构插槽-重命名 -->
<demo>
  <template v-slot="{ user: person }">
    {{person.firstname}}
  </template>
</demo>
```









### 废弃了的语法

自2.6.0起被废弃，但仍可以在vue2中使用。

* 名插槽 `<slot name="xxx"></slot>`
  * 使用插槽 `<div slot="xxx">aaa</div>` 
    * 两者的插槽名相同才会插入，两者插槽名不相同或者没有单个插槽则不会插入。
    * 如果插入时，没有设置插槽名，并且template中有设置单个插槽，那么会插入到单个插槽中



```html
<div id="app">
  <swiper>haahha</swiper>
</div>

<script>
  Vue.component('swiper', {
    template: `
      <div>
        <slot></slot>
        <ul>
          <li>111</li>
          <li>222</li>
          <li>333</li>
        </ul>
      </div>
    `,
  })

  var vm = new Vue({
    el: '#app',
  })
</script>
```

```html
<div id="app">
  <swiper>
    <hello>   <!-- 插入到swiper组件的单个插槽中 -->
      <div slot="a">aaa</div>   <!-- 插入到template中name为a的slot中 -->
      <div slot="c">bbb</div>   <!-- 插入到template中name为c的slot中 -->
      <div slot="b">ccc</div>   <!-- 插入到template中name为b的slot中 -->
      <div slot="x">xxx</div>   <!-- 不会插入，因为template中没有name为x的slot -->
      <div>hi</div>   <!-- 因为没有设置slot属性，并且template中有单个插槽，所以会插入到单个插槽中-->
    </hello>
  </swiper>
</div>

<script>
  Vue.component('swiper', {
    template: `
      <div style="background-color:yellow;">
        <p>swiper组件</p>
        <slot></slot>
      </div>
    `,
  })

  Vue.component('hello', {
    template: `
      <div>
        <slot name="a"></slot>
        <slot name="b"></slot>
        <slot name="c"></slot>
        <slot></slot>
      </div>  
    `,
  })

  var vm = new Vue({
    el: '#app',
  })
</script>
```



同样的，为了让插槽内容能够访问子组件中的数据，可以设置带有 slot-scope attribute 的作用域插槽。

```html
<demo>
  <div slot="default" slot-scope="slotuser">
    {{slotuser.user.firstname}}
  </div>
</demo>

<!-- 当插槽只有一个且没有命名使，slot="default" 也可以忽略 -->
<demo>
  <div slot-scope="slotuser">
    {{slotuser.user.firstname}}
  </div>
</demo>

<!-- 解构 -->
<demo>
  <div slot-scope="{ user}">
    {{user.firstname}}
  </div>
</demo>
```





## 封装swiper组件

### 组件方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>封装swiper组件</title>
  <link href="https://cdn.bootcdn.net/ajax/libs/Swiper/8.0.6/swiper-bundle.min.css" rel="stylesheet">
  <script src="https://cdn.bootcdn.net/ajax/libs/Swiper/8.0.6/swiper-bundle.min.js"></script>
  <script src="vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.0/axios.min.js"></script>
  <style>
    .swiper {
      width: 100%;
    }
    .swiper img {
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- :key 通过diff算法原理，当节点的key发生改变时重新渲染组件，实现拿到异步数据后重新渲染组件 -->
    <swiper :key="datalist.length">
      <div class="swiper-slide" v-for="data,index in datalist" :key="index">
        <img :src="data.imgUrl">
      </div>
    </swiper>
  </div>

  <script>
    Vue.component('swiper', {
      template:`
      <div class="swiper">
        <div class="swiper-wrapper">
          <slot></slot>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      `,
      mounted() {
        new Swiper ('.swiper', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
      }
    })

    var vm = new Vue({
      el: '#app',
      data: {
        datalist: []
      },
      mounted() {
        axios({
          url: 'https://m.maizuo.com/gateway?type=2&cityId=440100&k=1258263',
          headers: {
            'X-Host': 'mall.cfg.common-banner',
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16463022274224843364958209","bc":"440100"}'
          }
        }).then(res=>{
          this.datalist = res.data.data
        })
      }
    })
  </script>

</body>
</html>
```



除了可以设置key来初始化swiper，还可以在实例的mounted生命周期中初始化swiper。

```js
// 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
this.$nextTick(()=> {
  new Swiper ('.swiper', {
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    }
  })
})
```

这样就不用在组件的生命周期中初始化swiper。但是这样不利于组件的封装。





### 指令方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>封装swiper组件</title>
  <link href="https://cdn.bootcdn.net/ajax/libs/Swiper/8.0.6/swiper-bundle.min.css" rel="stylesheet">
  <script src="https://cdn.bootcdn.net/ajax/libs/Swiper/8.0.6/swiper-bundle.min.js"></script>
  <script src="vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.0/axios.min.js"></script>
  <style>
    .swiper {
      width: 100%;
    }
    .swiper img {
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="data,index in datalist" :key="index" v-swipe="{index:index, length:datalist.length}">
          <img :src="data.imgUrl">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>

  <script>
    // 通过指令封装swiper，并实现异步获取数据后初始化swiper
    Vue.directive('swipe', {
      inserted(el, bind,newvnode,old) {
        console.log(newvnode, old)
        // 在最后一次插入silde时初始化swiper
        if(bind.value.index === bind.value.length-1) {
          new Swiper ('.swiper', {
            loop: true,
            pagination: {
              el: '.swiper-pagination',
            }
          })
        }
      }
    })

    var vm = new Vue({
      el: '#app',
      data: {
        datalist: []
      },
      mounted() {
        axios({
          url: 'https://m.maizuo.com/gateway?type=2&cityId=440100&k=1258263',
          headers: {
            'X-Host': 'mall.cfg.common-banner',
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16463022274224843364958209","bc":"440100"}'
          }
        }).then(res=>{
          this.datalist = res.data.data
        })
      }
    })
  </script>

</body>
</html>
```







## 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染

```js
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```



```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```





## 依赖注入

当父组件的后代都需要访问父组件的某个状态/方法时，使用 `$parent` property 无法很好的扩展到更深层级的嵌套组件上，所以有了依赖注入的用武之地，它用到了两个新的实例选项：`provide` 和 `inject`。



`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法。

```js
provide() {
  return {
    getdata: this.f_data
  }
}
```

然后在任何后代组件里，我们都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的 property

```js
inject: ['getdata']
```



实际上，你可以把依赖注入看作一部分“大范围有效的 prop”，除了：

- 祖先组件不需要知道哪些后代组件使用它提供的 property
- 后代组件不需要知道被注入的 property 来自哪里



## 递归组件

当组件A中嵌套组件B，组件B中又嵌套组件A时，在渲染时就会产生悖论，当通过 `Vue.component` 全局注册组件的时候，这个悖论会被自动解开。

或者，在本地注册组件的时候，你可以使用 webpack 的异步 `import`：

```
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```









