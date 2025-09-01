# Vue.js 设计与实现



## 框架设计

### 命令式与声明式

从范式上来看，视图层框架通常分为命令式和声明式，它们各有优缺点。

* 命令式：关注过程。描述”做事的过程“，符合我们的逻辑直觉。
* 声明式：关注结果。关心结果，不关心实现的过程。

**声明式代码的性能不优于命令式代码的性能。**毕竟框架本身就是封装了命令式代码才实现了面向用户的声明式，所以要做的就是：**在保持可维护性的同时让性能损失最小化。**



需求：获取 id 为 app 的 div 标签，它的文本内容为 hello world，为其添加点击事件，点击时弹出提示 ok

```js
// 命令式
const div = document.querySelector("#app")
div.innerText = 'hello world'
div.addEventListener('click', () => { alert('ok') })
```

```vue
// 声明式
<div @click="() => alert('ok')">hello world</div>
```



### 运行时和编译时

* 运行时：由于它没有编译的过程，因此没办法分析用户提供的内容，性能可能会较差，灵活性好。
* 编译时：直接编译用户提供的内容成可执行的 JavaScript 代码，性能可能会更好，但缺少灵活。
* 运行时 + 编译时：可以在编译时提取用户提供的内容，并可以做进一步的优化，灵活性好。

Vue.js 3 就是 运行时 + 编译时的架构，在保持灵活性的基础上能够尽可能地去优化。  



例子：一个简单的 Render 函数，为该函数提供一个树形结构的数据对象，就可以将数据渲染成 DOM 元素。

```js
const obj = {
	tag: 'div',
	children: [
		{ tag: 'span', children: 'hello world' }
	]
}

Render(obj, document.body)

function Render(obj, root) {
	const el = document.createElement(obj.tag)
	if (typeof obj.children === 'string') {
		const text = document.createTextNode(obj.children)
		el.appendChild(text)
	} else if (obj.children) {
		obj.children.forEach((child) => Render(child, el))
	}

	root.appendChild(el)
}
```



### 虚拟 DOM

虚拟 DOM 就是用 JavaScript 对象来描述真实的 DOM 结构。

* tag 用来描述标签名称。
* props 是一个对象，用来描述标签的属性、事件等内容。
* children 用来描述标签的子节点。



```js
// 一个简单的虚拟 DOM
const vnode = {
	tag: 'div',
	props: {
		onClick: () => alert('hello')
	},
	children: 'click me'
}
```



### 渲染器

渲染器的作用是，把虚拟 DOM 对象渲染为真实 DOM 元素。它的工作原理是，递归地遍历虚拟 DOM 对象，并调用原生 DOM API 来完成真实 DOM 的创建。

组件其实就是一组虚拟 DOM 元素的封装，它可以是一个返回虚拟 DOM 的函数，也可以是一个对象，但这个对象下必须要有一个函数用来产出组件要渲染的虚拟 DOM。

Vue.js 的模板会被一个叫做**编译器**的程序编译为渲染函数。

所以，无论是是使用模板还是直接手写渲染函数，对于一个组件来说，它要渲染的内容最终都是通过渲染函数产生的，然后渲染器再把渲染函数返回的虚拟 DOM 渲染为真实 DOM，这就是模板的工作原理，也是 Vue.js 渲染页面的流程。



```js
// 渲染器
const vnode = {
	tag: 'div',
	props: {
		onClick: () => alert('hello')
	},
	children: 'click me'
}

function renderer(vnode, container) {
  // 使用 vnode.tag 作为标签名称创建 DOM 元素
	const el = document.createElement(vnode.tag)

  // 遍历 vnode.props，将属性、事件添加到 DOM 元素
	for(const key in vnode.props) {
		if(/^on/.test(key)) {
			el.addEventListener(
				key.substr(2).toLowerCase(),
				vnode.props[key]
			)
		}
	}

  // 处理 children
	if(typeof vnode.children === 'string') {
		el.appendChild(document.createTextNode(vnode.children))
	} else if(Array.isArray(vnode.children)) {
		vnode.children.forEach(child => renderer(child, el))
	}

  // 将元素添加到挂载点下
	container.appendChild(el)
}

renderer(vnode, document.body)
```



































