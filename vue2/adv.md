# 高级进阶

## render方法创建虚拟节点树

底层渲染

```js
// main.js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  // 使用vue底层的渲染方法
  // 作用: 使用App组件作为根组件，用来渲染视图
  // render: h => h(App)  // 简写
  render: function(createElement) {
    return createElement(App)
  }
})
```





```html
<div id="app">
	<!-- 当使用render()生成虚拟节点树时，该div中的模板失效不渲染 -->
	<h2>123</h2>
</div>
<script>
  var vm = new Vue({
    el: "#app",
    // 参数h是一个方法，通过调用h方法生成虚拟节点树。第一个参数是html标签，第二个参数是内容。
    render(h){
      return h("h1", "Hello")
    }
  })
</script>
```

也可以嵌套生成多个html元素，但必须是单根的。

```html
<div id="app">
</div>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      title: "标题内容"
    },
    // 参数h是一个方法，通过调用h方法生成虚拟节点树。第一个参数是html标签，第二个参数是内容。
    render(h){
      // 嵌套生成多个html元素，但必须是单根的
      return h("div", [h("h1", this.title), h("p", "p标签内容")])
    }
  })
</script>
```

不使用模板，生成h1-h6标题

```html
<div id="app">
</div>
<script>
  var vm = new Vue({
    el: "#app",
    // 参数h是一个方法，通过调用h方法生成虚拟节点树。第一个参数是html标签，第二个参数是内容。
    render(h){
      var titles = []
      for(let i = 1; i <= 6; i++) {
        titles.push(h(`h${i}`, `${i}级标题`))
      }
      return h("div", titles)
    }
  })
</script>
```





## 渲染函数

这里不写成箭头函数，是因为里面需要拿到组件的this，才能拿到组件内的属性

```js
Vue.component('demo', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

```html
<demo :level="1">hello</demo>
```



### createElement参数

```js
return createElement('h1', this.blogTitle)
```

createElement 返回的不是一个实际的dom元素，而是虚拟节点(virtual node)



```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中 attribute 对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```



#### 数据对象

有一点要注意：正如 `v-bind:class` 和 `v-bind:style` 在模板语法中会被特别对待一样，它们在 VNode 数据对象中也有对应的顶层字段。

该对象也允许你绑定普通的 HTML attribute，也允许绑定如 `innerHTML` 这样的 DOM property (这会覆盖 `v-html` 指令)。

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```





### JSX

`render` 函数写起来太痛苦了，所以，出现了一个Babel插件，用于在 Vue 中使用 JSX 语法，它可以让我们回到更接近于模板的语法上。

```js
import AnchoredHeading from './AnchoredHeading.vue'

new Vue({
  el: '#demo',
  render: function (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})
```







## 插件

插件通常用来为 Vue 添加全局功能。

通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成：

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})

// 也可以传入一个可选的选项对象：
Vue.use(MyPlugin, { someOption: true })
```

如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

`Vue.use` 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。



### 开发插件

Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```





## Vue.compile

Vue.compile(模板字符串) ：将一个模板字符串编译成 render 函数。**只在完整版时可用**。

```js
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```













































