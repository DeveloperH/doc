# Vue介绍

Vue是前端的一种开发框架，能够提升开发效率，它主要解决前端开发中的核心痛点--复杂的DOM操作。

主要特点：

* 渐进式 : 可以选择按需引入需要的模块
* 组件化 : 可以将网页拆分成一个个独立的组件来编写，将来再通过封装好的组件拼接成一个完整的网页
* 响应式 : 绑定的数据一旦发生变化，页面也会自动改变



优势:

* 通过数据驱动界面更新，无需操作DOM来更新界面
  * 只需关心如何获取数据，如何处理数据，如何编写业务逻辑代码。将处理好的数据交给Vue，Vue就会自动将数据渲染到模板中(界面上)
* 组件化开发，可以将网页拆分成一个个独立的组件来编写，将来再通过封装好的组件拼接成一个完整的网页



## MVVM

* M : Model 数据模型(保存数据，处理数据业务逻辑)
* V : View  视图(展示数据，与用户交互)
* VM : View Model  数据模型和视图的桥梁



MVVM设计模式最大的特点就是支持数据的双向传递。View的变动，映射在ViewModel，反之一样

数据可以从 M -> VM -> V

也可以从  V -> VM -> M



默认情况下，Vue只支持数据的单向传递

我们把"数据"交给"Vue实例对象"，Vue实例对象再将数据交给"界面"。`Model -> View Model -> View`

但是由于Vue其实是基于MVVM设计模式的，所以它也支持数据的双向传递，例如使用 `v-model` 指令。

* 被控制的区域  -> View
* Vue实例对象  -> View Model
* 实例对象中的 data -> Model

```html
<!-- 这里就是 MVVM 中的 View -->
<div id="app">
  <p>{{ name }}</p>
  <input type="text" v-model="msg">
</div>

<script>
  // 这里就是 MVVM 中的 View Model
  let vm = new Vue({
    el: '#app',
    // 这里就是 MVVM 中的 Model
    data: {
      name: '张三',       // 数据的单向传递
      msg: '输入框内容'   // 数据的双向传递
    }
  })
</script>
```



![image-20220118213418610](https://www.huangyihui.cn/upload/gburlimg/4b64b97b480cf.png)





## Vue数据绑定过程

1. 会先将未绑定数据的界面显示给用户
2. 然后再根据模型中的数据和控制的区域生成绑定数据之后的HTML代码
3. 最后再将绑定数据之后的HTML渲染到界面上



正是在最终的HTML被生成渲染之前会先显示模板内容，所以如果用户的网络比较慢或者网页性能比较差，那么用户会看到模板内容，造成不好的用户体验。

解决方案:

* 利用 `v-cloak` 指令，配合 `[v-cloak] {display: none;}` 样式，默认先隐藏未渲染的界面。
* 将 vue.js 放在 `<head>` 中先引入，再往下加载页面。



```html
<style>
  [v-cloak] { display: none;}
</style>
  
<div id="app">
  <p v-cloak>{{ msg }}</p>
</div>

<script>
  let vm = new Vue({
    el: '#app',
    data: {
      msg: '张三',
    }
  })
</script>
```





## 注入

配置对象中的部分内容会被提取到Vue实例中：

* data
* methods

该过程称之为**注入**。

注入目的有两个：

* 完成数据响应式

  Vue是怎么知道数据被更改了？

  ​	`Vue2.0`通过`Object.defineProperty`方法完成了数据响应式。缺陷：无法感知到数据的变化(新增/修改)，所以无法完成数据响应式。

* 绑定`this`

值得注意的是只有当实例被创建时就已经存在于 `data` 中的 property 才是**响应式**的。



## 数据响应原理

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些 property 全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更。

每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。



(1) 数据通过 `Object.defineProperty` 进行 get set 拦截

(2) 通知 watcher，观察者模式，订阅发布模式，触发组件重新渲染，创建新的虚拟dom(js对象模式dom)，对比旧的虚拟dom，找到不同的地方，以最小的代价更新节点

```js
var obj = {}
var box = document.getElementById('box')

// Object.defineProperty() ：定义属性
// myname 被拦截
Object.defineProperty(obj, "myname", {
  get() {
    console.log('get调用')
  },
  set(data) {
    console.log('set调用', data)
    box.innerHTML = data
  }
})
```





![data](https://www.huangyihui.cn/upload/gburlimg/4ac769e114ad9.png)



### 检测变化注意事项-对象

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。

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

```js
Vue.set(object, propertyName, value)
vm.$set(object, propertyName, value)	// $set() 时 Vue.set()的别名，功能一致
```

有时你可能需要为已有对象赋值多个新 property，比如使用 `Object.assign()` 或 `_.extend()`。但是，这样添加到对象上的新 property 不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```





### 检测变化注意事项-数组

Vue 不能检测以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：

```js
// Vue.set(vm.items, indexOfItem, newValue)
Vue.set(vm.items, 1, 'x')

//vm.items.splice(indexOfItem, 1, newValue)
vm.items.splice(1, 1, 'x')
```

为了解决第二类问题，你可以使用 `splice`：

```
vm.items.splice(newLength)
```



### 异步更新队列

Vue在更新DOM时是异步操作的。当数据变化时，组件不会立即重新渲染，而是会在下一个事件循环“tick”中更新。如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。

所以，为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。

* Vue.nextTick(callback) ：全局上使用
* this.$nextTick(callback) ：在组件内使用 `vm.$nextTick()` 实例方法特别方便，因为它不需要全局 `Vue`，并且回调函数中的 `this` 将自动绑定到当前的 Vue 实例上



```html
<div id="example">{{message}}</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```





## 虚拟DOM树

**为了提高渲染效率**，Vue会把模板编译成为虚拟DOM树，然后再生成真实的DOM。

`diff算法`

对于Vue而言，提升效率重点着眼于两个方面：

* 减少新的虚拟DOM的生成
* 保证对比之后，只有必要的节点有变化

Vue提供了多种方式生成虚拟DOM树：

1. 在挂载的元素内部直接书写，此时将使用元素的`outerHTML`作为模板
2. 在`template`配置中书写
3. 在`render`配置中用函数直接创建虚拟节点树，此时，完全脱离模板，将省略编译步骤

这些步骤从上到下，优先级逐渐提升。如果在同一个页面有不同优先级，低优先级无效。

**注意：虚拟节点树必须是单根的。**



## 挂载

将生成的真实DOM树，放置到某个元素位置，称之为**挂载**

挂载的方式：

1. 通过`el:"css选择器"`进行配置
2. 通过`vue实例.$mount("css选择器")`进行配置



## 完整流程

* 实例被创建
* 注入
* 编译生成虚拟DOM树
* 挂载

当有**数据变动**时，响应式来了，需要重新渲染

* 重新生成虚拟DOM树
* 对比新旧两树的差异
* 将差异应用到真实DOM
* 完成渲染





## diff算法

1. 把树按照层级分解
2. 同key对比
3. 同组件对比





























