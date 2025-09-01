# Vue3



## 基础示例

```sh
# 已安装 18.0 或更高版本的 Node.js
# 这一指令将会安装并执行 create-vue，它是 Vue 官方的项目脚手架工具
npm create vue@latest

# 创建 vue2 项目
npm create vue@legacy
```



每个 Vue 应用都是通过 `createApp` 函数创建一个新的 **应用实例**。

我们传入 `createApp` 的对象实际上是一个组件，每个应用都需要一个“根组件”，其他组件将作为其子组件。

如果使用的是单文件组件，可以直接从另一个文件中导入根组件。

```js
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```



非单文件组件：

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')


// 应用实例并不只限于一个。createApp API 允许你在同一个页面中创建多个共存的 Vue 应用，而且每个应用都拥有自己的用于配置和全局资源的作用域。
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')
```

```html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

当根组件没有设置 `template` 选项时，Vue 将自动使用容器的 `innerHTML` 作为模板。



IDE：

推荐的 IDE 配置是 Visual Studio Code + Vue-Official 扩展。





## API 风格

### 选项式 API

使用选项式 API，我们可以用**包含多个选项的对象**来描述组件的逻辑，例如 `data`、`methods` 和 `mounted`。选项所定义的属性都会暴露在函数内部的 `this` 上，它会指向当前的组件实例。

```vue
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      this.count++
    }
  },

  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```



### 组合式 API

通过组合式 API，我们可以使用**导入的 API 函数**来描述组件逻辑。在单文件组件中，组合式 API 通常会与 `<script setup>` 搭配使用。这个 `setup` attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。比如，`<script setup>` 中的导入和顶层变量/函数都能够在模板中直接使用。

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```



### 选择

两种 API 风格都能够覆盖大部分的应用场景。它们只是同一个底层系统所提供的两套不同的接口。**实际上，选项式 API 是在组合式 API 的基础上实现的！**

组合式 API 的核心思想是**直接在函数作用域内定义响应式状态变量**，并将从多个函数中得到的状态组合起来处理复杂问题。这种形式更加自由，相应的，它的灵活性也使得组织和重用逻辑的模式变得更加强大。





## ref()

在组合式 API 中，推荐使用 `ref()` 函数来声明响应式状态。`ref()` 接收参数，并将其包裹在一个带有 `.value` 属性的 ref 对象中返回。

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```



当你在模板中使用了一个 ref，然后改变了这个 ref 的值时，Vue 会自动检测到这个变化，并且相应地更新 DOM。这是通过一个基于依赖追踪的响应式系统实现的。当一个组件首次渲染时，Vue 会**追踪**在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会**触发**追踪它的组件的一次重新渲染。

另一个 ref 的好处是，与普通变量不同，你可以将 ref 传递给函数，同时保留对最新值和响应式连接的访问。当将复杂的逻辑重构为可重用的代码时，这将非常有用。



### 深层响应性

Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 `Map`。

Ref 会使它的值具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到：

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

非原始值将通过 `reactive()` 转换为响应式代理。



ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性：

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref，需要通过 .value 取值，但它会保持响应性
callSomeFunction(obj.foo)

// 仍然是响应式的
const { foo, bar } = obj

// 响应式
setTimeout(() => {
  obj.foo.value = 3
  bar.value = 66
}, 3000);
```

简言之，`ref()` 让我们能创造一种对任意值的 “引用”，并能够在不丢失响应性的前提下传递这些引用。



### 解包

**一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。**换句话说，它的行为就像一个普通的属性。

只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为浅层响应式对象的属性被访问时不会解包。

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0
state.count = 1
console.log(count.value) // 1


// 如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1
```



与 reactive 对象不同的是，当 ref 作为响应式数组或原生集合类型 (如 Map) 中的元素被访问时，它不会被解包：

```js
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```



在模板渲染上下文中，只有顶级的 ref 属性才会被解包。

如果 ref 是文本插值的最终计算值，那么它也会被解包。

```vue
<script setup>
import { ref, reactive } from "vue";

const count = ref(0)
const object = { id: ref(1) }

// 解构为一个顶级属性
const { id } = object

</script>

<template>
  <div>
    <!-- 显示 1 -->
    {{ count + 1 }}

    <!-- 显示 [object Object]1 -->
    {{ object.id + 1 }}

    <!-- 显示 2 -->
    {{ id + 1 }}

    <!-- 显示 1  等价于 {{ object.id.value }} -->
    {{ object.id }}
  </div>
</template>
```





## reactive()

与将内部值包装在特殊对象中的 ref 不同，reactive() 将使对象本身具有响应性。

`reactive()` 将深层地转换对象：当访问嵌套对象时，它们也会被 `reactive()` 包装。当 ref 的值是一个对象时，`ref()` 也会在内部调用它。

```vue
<script setup>
import { reactive } from "vue";

const state = reactive({ count: 0 });
</script>

<template>
  <button @click="state.count++">
    {{ state.count }}
  </button>
</template>
```



### reactive() 代理和原始对象区别

值得注意的是，reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的。

只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用 Vue 的响应式系统的最佳实践是**仅使用你声明对象的代理版本**。

为保证访问代理的一致性，对同一个原始对象调用 `reactive()` 会总是返回同样的代理对象，而对一个已存在的代理对象调用 `reactive()` 会返回其本身。

```js
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false

// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```



这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理：

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```



### 局限性

* 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。
* 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失。
* 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接。



```js
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 })


// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++


// 该函数接收到的是一个普通的数字，并且无法追踪 state.count 的变化，我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```





## DOM 更新时机

当你修改了响应式状态时，DOM 会被自动更新。但是需要注意的是，DOM 更新不是同步的。Vue 会在“next tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。

要等待 DOM 更新完成后再执行额外的代码，可以使用 `nextTick()` 全局 API：

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```





## 计算属性

`computed()` 方法期望接收一个 getter 函数，返回值为一个**计算属性 ref**。

计算属性的 getter 应只做计算而没有任何其他的副作用，**不要改变其他状态、在 getter 中做异步请求或者更改 DOM**。

```vue
<script setup>
import { reactive, computed } from "vue";

const author = reactive({
  books: ["vue", "javascript"],
});

// 一个计算属性 ref
const booksMessage = computed(() => {
  return author.books.length ? "yes" : "no";
});
</script>

<template>
  <div>{{ booksMessage }}</div>
</template>
```



### 可写计算属性

计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：

```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});

fullName.value = "Mike Lea";
</script>
```





## 类与样式绑定

```vue
<script setup>
import { ref } from "vue";

const isActive = ref(true)
const hasError = ref(false)

const classObject = reactive({
  active: true,
  'text-danger': false
})

const activeClass = ref('active')
const errorClass = ref('text-danger')
</script>

<template>
  <div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>

	<!-- 绑定对象 -->
	<div :class="classObject"></div>

	<!-- 绑定数组 -->
	<div :class="[activeClass, errorClass]"></div>
	<div :class="[isActive ? activeClass : '', errorClass]"></div>
	<div :class="[{ active: isActive }, errorClass]"></div>
</template>
```



也可以绑定一个返回对象的**计算属性**。这是一个常见且很有用的技巧：

```vue
<script setup>
import { ref, computed } from "vue";

const isActive = ref(true);
const error = ref(null);

const classObject = computed(() => {
  return {
    active: isActive.value && !error.value,
    "text-danger": error.value,
  };
});
</script>

<template>
	<!-- 绑定计算属性 -->
  <div :class="classObject"></div>
</template>
```



对于只有一个根元素的组件，当你使用了 `class` attribute 时，这些 class 会被添加到根元素上并与该元素上已有的 class 合并。

如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 `$attrs` 属性来指定接收的元素。

```vue
<MyComponent class="baz" />
```

```vue
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```



**style 绑定**

```vue
<script setup>
import { ref, reactive } from "vue";

const activeColor = ref('red')
const fontSize = ref(30)

const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
</script>

<template>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">12312</div>
  
  <div :style="{ 'font-size': fontSize + 'px' }"></div>

  <div :style="styleObject"></div>

  <div :style="[baseStyles, overridingStyles]"></div>
</template>
```





## 生命周期

每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新 DOM。在此过程中，它也会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码。



生命周期钩子：

* onMounted ：在组件挂载完成后执行。
* onUpdated ：在组件因为响应式状态变更而更新其 DOM 树之后调用。
* onUnmounted ：在组件实例被卸载之后调用。
* onBeforeMount ：在组件被挂载之前被调用。
* onBeforeUpdate ：在组件即将因为响应式状态变更而更新其 DOM 树之前调用。
* onBeforeUnmount ：在组件实例被卸载之前调用。
* onErrorCaptured ：在捕获了后代组件传递的错误时调用。
* onActivated ：若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件被插入到 DOM 中时调用。
* onDeactivated ：若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件从 DOM 中被移除时调用。



```vue
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("onMounted");
  
  // 获取当前 vue 实例对象
  console.log(getCurrentInstance());
});
</script>
```





## watch 侦听器

计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

在组合式 API 中，我们可以使用 `watch` 函数在每次响应式状态发生变化时触发回调函数：



`watch` 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：

```js
import { ref, watch } from "vue";

const name = ref("");
const x = ref(0);
const y = ref(0);

// 单个 ref
watch(name, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```



注意，你不能直接侦听响应式对象的属性值，而是需要用一个返回该属性的 getter 函数：

```js
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
// watch(obj.count, (count) => {
//   console.log(`count is: ${count}`)
// })

// 提供一个 getter 函数	
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```



### 深层监听器

直接给 `watch()` 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```

相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调：

```js
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)
```

你也可以给上面这个例子显式地加上 `deep` 选项，强制转成深层侦听器：

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // 除非 state.someObject 被整个替换了
  },
  { deep: true }
)
```



### 即时回调的侦听器

`watch` 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。

我们可以通过传入 `immediate: true` 选项来强制侦听器的回调立即执行：

```js
watch(source, (newValue, oldValue) => {
  // 立即执行，且当 `source` 改变时再次执行
}, { immediate: true })
```



### 一次性侦听器

每当被侦听源发生变化时，侦听器的回调就会执行。如果希望回调只在源变化时触发一次，请使用 `once: true` 选项。3.4+ 版本可用。

```js
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)
```



### watchEffect()

侦听器的回调使用与源完全相同的响应式状态是很常见的。例如下面的代码，在每当 `todoId` 的引用发生变化时使用侦听器来加载一个远程资源：

```js
const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
}, { immediate: true })
```

特别是注意侦听器是如何两次使用 todoId 的，一次是作为源，另一次是在回调中。

我们可以用 `watchEffect` 函数 来简化上面的代码。`watchEffect()` 允许我们自动跟踪回调的响应式依赖，类似于计算属性。上面的侦听器可以重写为：

```js
const todoId = ref(1)
const data = ref(null)

watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

这个例子中，回调会立即执行，不需要指定 `immediate: true`。**在执行期间，它会自动追踪 `todoId.value` 作为依赖（和计算属性类似）**。每当 `todoId.value` 变化时，回调会再次执行。有了 `watchEffect()`，我们不再需要明确传递 `todoId` 作为源值。



对于这种只有一个依赖项的例子来说，`watchEffect()` 的好处相对较小。但是对于有多个依赖项的侦听器来说，使用 `watchEffect()` 可以消除手动维护依赖列表的负担。此外，如果你需要侦听一个嵌套数据结构中的几个属性，`watchEffect()` 可能会比深度侦听器更有效，**因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。**

`watchEffect` 仅会在其**同步**执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪。



### watch vs. watchEffect

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。



### 回调的触发时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项：

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`：

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```



你还可以创建一个同步触发的侦听器，它会在 Vue 进行任何更新之前触发：

```js
watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})

// 同步触发的 watchEffect() 有个更方便的别名 watchSyncEffect()
import { watchSyncEffect } from 'vue'
watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
})
```

同步侦听器不会进行批处理，每当检测到响应式数据发生变化时就会触发。可以使用它来监视简单的布尔值，但应避免在可能多次同步修改的数据源 (如数组) 上使用。



### 停止侦听器

在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

一个关键点是，侦听器必须用**同步**语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：

```js
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

要手动停止一个侦听器，请调用 `watch` 或 `watchEffect` 返回的函数：

```js
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：

```js
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```





## ref 模板引用

虽然 Vue 的声明性渲染模型为你抽象了大部分对 DOM 的直接操作，但在某些情况下，我们仍然需要直接访问底层 DOM 元素。要实现这一点，我们可以使用特殊的 `ref` attribute。

它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。这可能很有用，比如说在组件挂载时将焦点设置到一个 input 元素上，或在一个元素上初始化一个第三方库。

```html
<input ref="input">
```



### 访问模板引用

为了通过组合式 API 获得该模板引用，我们需要声明一个同名的 ref：

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```



注意，你只可以**在组件挂载后**才能访问模板引用。如果你想在模板中的表达式上访问 `input`，在初次渲染时会是 `null`。这是因为在初次渲染前这个元素还不存在呢！

如果你需要侦听一个模板引用 ref 的变化，确保考虑到其值为 `null` 的情况：

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
})
```



### v-for 中的模板引用

需要 v3.2.25 及以上版本

当在 `v-for` 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素。

应该注意的是，ref 数组**并不**保证与源数组相同的顺序。

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```



### 函数模板引用

除了使用字符串值作名字，`ref` attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：

```vue
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```

注意我们这里需要使用动态的 `:ref` 绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的 `el` 参数会是 `null`。你当然也可以绑定一个组件方法而不是内联函数。



### 组件上的 ref

模板引用也可以被用在一个子组件上。这种情况下引用中获得的值是组件实例：

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```

如果一个子组件使用的是选项式 API 或没有使用 `<script setup>`，被引用的组件实例和该子组件的 `this` 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易，当然也因此，应该只在绝对需要时才使用组件引用。大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互。



有一个例外的情况，使用了 `<script setup>` 的组件是**默认私有**的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露：

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



## 单文件组件

### 注册

全局注册：可以使用 Vue 应用实例的 `.component()` 方法，让组件在当前 Vue 应用中全局可用。

```js
import { createApp } from 'vue'
const app = createApp({})

import MyComponent from './App.vue'
app.component('MyComponent', MyComponent)

// 链式调用
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

全局注册虽然很方便，但有以下几个问题：

1. 全局注册，但并没有被使用的组件无法在生产打包时被自动移除 (也叫“tree-shaking”)。如果你全局注册了一个组件，即使它并没有被实际使用，它仍然会出现在打包后的 JS 文件中。
2. 全局注册在大型项目中使项目的依赖关系变得不那么明确。在父组件中使用子组件时，不太容易定位子组件的实现。和使用过多的全局变量一样，这可能会影响应用长期的可维护性。



局部注册：局部注册的组件在后代组件中不可用。

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```



### 传递 props

一个组件需要显式声明它所接受的 props，props 可以使用 `defineProps()` 宏来声明。

`defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。`defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 props。

一个组件可以有任意多的 props，默认情况下，所有 prop 都接受任意类型的值。

```vue
<!-- BlogPost.vue -->
<script setup>
// 使用字符串数组来声明 
defineProps(['title'])
  
const props = defineProps(['title'])
console.log(props.title)

// 使用对象的形式声明
defineProps({
  title: String,
  likes: Number
})
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

```vue
<script setup>
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
</script>

<template>
  <BlogPost title="My journey with Vue" />

	<BlogPost v-bind="post" />
	<!-- 等价于 -->
	<BlogPost :id="post.id" :title="post.title" />
</template>
```



如果你没有使用 `<script setup>`，props 必须以 `props` 选项的方式声明，props 对象会作为 `setup()` 函数的第一个参数被传入：

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```



prop 校验：

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值，必须从一个工厂函数返回。该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数，在 3.4+ 中完整的 props 作为第二个参数传入
  propF: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```

另外，`type` 也可以是自定义的类或构造函数，Vue 将会通过 `instanceof` 来检查类型是否匹配。例如下面这个类：

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

```js
defineProps({
  author: Person
})
```



### 监听事件

通过 `defineEmits` 宏来声明需要抛出的事件，它声明了一个组件可能触发的所有事件，还可以对事件的参数进行验证。同时，这还可以让 Vue 避免将它们作为原生事件监听器隐式地应用于子组件的根元素。

和 `defineProps` 类似，`defineEmits` 仅可用于 `<script setup>` 之中，并且不需要导入，它返回一个等同于 `$emit` 方法的 `emit` 函数。它可以被用于在组件的 `<script setup>` 中抛出事件，因为此处无法直接访问 `$emit`。

如果一个原生事件的名字 (例如 `click`) 被定义在 `emits` 选项中，则监听器只会监听组件触发的 `click` 事件而不会再响应原生的 `click` 事件。



* 父组件可以通过 `v-on` 或 `@` 来选择性地监听子组件上抛的事件。
* 子组件可以通过调用内置的 `$emit` 方法，通过传入事件名称来抛出一个事件：

```vue
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])

const emit = defineEmits(['enlarge-text'])
emit('enlarge-text')
</script>

<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```



如果你没有在使用 `<script setup>`，你可以通过 `emits` 选项定义组件会抛出的事件。你可以从 `setup()` 函数的第二个参数，即 setup 上下文对象上访问到 `emit` 函数：

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```



事件校验：

和对 props 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。

要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 `emit` 的内容，返回一个布尔值来表明事件是否合法。

```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```



### 组件 v-model

`v-model` 可以在组件上使用以实现双向绑定。从 Vue 3.4 开始，推荐的实现方式是使用 `defineModel()` 宏。

`defineModel()` 返回的值是一个 ref。它可以像其他 ref 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：

- 它的 `.value` 和父组件的 `v-model` 的值同步；
- 当它被子组件变更了，会触发父组件绑定的值一起更新。

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

// 可选：使 v-model 必填
const model = defineModel({ required: true })
// 可选：提供一个默认值。如果父组件没有为该 prop 提供任何值，会导致父组件与子组件之间不同步。
const model = defineModel({ default: 0 })

function update() {
  model.value++
}
</script>

<template>
  <div @click="update">parent bound v-model is: {{ model }}</div>
</template>
```

```vue
<!-- Parent.vue -->
<Child v-model="count" />
```



用 `v-model` 把这个 ref 绑定到一个原生 input 元素上，在提供相同的 `v-model` 用法的同时轻松包装原生 input 元素：

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```



#### 底层机制

在 3.4 版本之前，一般按照如下的方式来实现上述相同的子组件：

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```



#### v-model 的参数

组件上的 `v-model` 也可以接受一个参数：

```vue
<MyComponent v-model:title="bookTitle" />
```

在子组件中，我们可以通过将字符串作为第一个参数传递给 `defineModel()` 来支持相应的参数：

```vue
<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')

const title = defineModel('title', { required: true })
</script>

<template>
  <input type="text" v-model="title" />
</template>
```



#### 多个 v-model 绑定

可以在单个组件实例上创建多个 `v-model` 双向绑定，组件上的每一个 `v-model` 都会同步不同的 prop，而无需额外的选项。

```vue
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

```vue
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```



#### 自定义修饰符

可以给 `defineModel()` 传入 `get` 和 `set` 这两个选项。这两个选项在从模型引用中读取或设置值时会接收到当前的值，并且它们都应该返回一个经过处理的新值。

```vue
<MyComponent v-model.capitalize="myText" />
```

```vue
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})

console.log(modifiers) // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```



在使用多个不同参数的 `v-model` 时使用修饰符：

```vue
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

```vue
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true}
</script>
```



### attribute 透传

“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 `props` 或 `emits` 的 attribute 或者 `v-on` 事件监听器。最常见的例子就是 `class`、`style` 和 `id`。

当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。

如果一个子组件的根元素已经有了 `class` 或 `style` attribute，它会和从父组件上继承的值合并。



同样的规则也适用于 `v-on` 事件监听器。

`click` 监听器会被添加到子组件的根元素，即那个原生的 `<button>` 元素之上。当原生的 `<button>` 被点击，会触发父组件的 `onClick` 方法。同样的，如果原生 `button` 元素自身也通过 `v-on` 绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发。



#### $attrs

透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到。

这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，例如 `class`，`style`，`v-on` 监听器等等。

有几点需要注意：

- 和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 `foo-bar` 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问。
- 像 `@click` 这样的一个 `v-on` 事件监听器将在此对象下被暴露为一个函数 `$attrs.onClick`。

```vue
<span>Fallthrough attribute: {{ $attrs }}</span>

<button class="btn" v-bind="$attrs">click me</button>
```

没有参数的 `v-bind` 会将一个对象的所有属性都作为 attribute 应用到目标元素上。



#### JS 中访问透传 Attributes

如果需要，你可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传 attribute：

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

如果没有使用 `<script setup>`，`attrs` 会作为 `setup()` 上下文对象的一个属性暴露：

```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

需要注意的是，虽然这里的 `attrs` 对象总是反映为最新的透传 attribute，但它并不是响应式的 (考虑到性能因素)。你不能通过侦听器去监听它的变化。如果你需要响应性，可以使用 prop。或者你也可以使用 `onUpdated()` 使得在每次更新时结合最新的 `attrs` 执行副作用。



#### 禁用继承

禁用 Attributes 继承，可以在组件选项中设置 `inheritAttrs: false`。

最常见的需要禁用 attribute 继承的场景就是 attribute 需要应用在根节点以外的其他元素上。通过设置 `inheritAttrs` 选项为 `false`，你可以完全控制透传进来的 attribute 被如何使用。

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```



#### 多根节点的 Attributes 继承

和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。如果 `$attrs` 没有被显式绑定，将会抛出一个运行时警告。

```vue
<CustomLayout id="custom-layout" @click="changeValue" />
```

```vue
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```



### slot 插槽

`<slot>` 元素是一个**插槽出口** (slot outlet)，标示了父元素提供的**插槽内容** (slot content) 将在哪里被渲染。

父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。

在外部没有提供任何内容的情况下，可以为插槽指定默认内容。如果我们提供了插槽内容，那么被显式提供的内容会取代默认内容。



```vue
<template>
  <div type="submit">
    <slot>
      Submit 默认内容
    </slot>
  </div>
</template>
```

```vue
<script setup>
const count = ref(0)
</script>

<template>
  <Child>msg {{count}}</Child>
</template>
```



**具名插槽：**

`<slot>` 元素可以有一个特殊的 attribute `name`，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容。

这类带 `name` 的插槽被称为具名插槽 (named slots)。没有提供 `name` 的 `<slot>` 出口会隐式地命名为“default”。

`v-slot` 有对应的简写 `#`，因此 `<template v-slot:header>` 可以简写为 `<template #header>`。

当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。

```vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```vue
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
  
  <!-- 隐式的默认插槽 -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  
  <template #footer>
    <!-- header 插槽的内容放这里 -->
  </template>
  
  <!-- 动态插槽名 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</BaseLayout>
```



**作用域插槽：**

插槽的内容无法访问到子组件的状态，但有些情况下想要同时使用父组件域内和子组件域内的数据，就需要子组件在渲染时将一部分数据提供给插槽。

* 可以像对组件传递 props 那样，向一个插槽的出口上传递 attributes
* 当需要接收插槽 props 时，通过子组件标签上的 `v-slot` 指令，直接接收到了一个插槽 props 对象

子组件传入插槽的 props 作为了 `v-slot` 指令的值，可以在插槽内的表达式中访问。

可以将作用域插槽类比为一个传入子组件的函数。子组件会将相应的 props 作为参数传给它。

```vue
<div class="container">
  <header>
    <!-- name 是特别保留的 attribute，不会作为 props 传递给插槽 -->
    <slot name="header" message="hello"></slot>
  </header>
  <main>
    <slot :text="greetingMessage" :count="1"></slot>
  </main>
</div>
```

```vue
<BaseLayout>
  <!-- 默认插槽 -->
  <template v-slot="slotProps">
		{{ slotProps.text }} {{ slotProps.count }}
  </template>
  
  <!-- 解构 -->
  <template v-slot="{ text, count }">
		{{ text }} {{ count }}
  </template>
  
  <template #header="headerProps">
    {{ headerProps }}
  </template>
</BaseLayout>
```



### 依赖注入

当父组件需要向孙子组件传递数据时，需要使用 props 一层一层往下传，非常麻烦。`provide` 和 `inject` 可以帮助我们解决这一问题。一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。



#### Provide (提供)

要为组件后代提供数据，需要使用到 provide() 函数。

* provide(key, value) ：提供注入数据。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。
  * key ：注入名。可以是一个字符串或是一个 `Symbol`
  * value ：注入值。值可以是任意类型，包括响应式的状态，比如一个 ref。提供的响应式状态使后代组件可以由此和提供者建立响应式的联系。

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

// provide(注入名, 注入值)
provide('myKey', "hello")

const count = ref(0)
provide('key', count)

// 如果想确保提供的数据不能被注入方的组件更改，可以使用 readonly() 来包装提供的值。
provide('read-only-count', readonly(count))

</script>
```



除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖：

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

在应用级别提供的数据在该应用内的所有组件中都可以注入。这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来提供值。



#### Inject (注入)

要注入上层组件提供的数据，需使用 inject() 函数：

* inject(key [, defalut] [,isFn]) ： 注入数据
  * key ：注入名
  * defalut ：可选，如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值。
  * isFn ：可选，布尔值。表示默认值应该被当作一个工厂函数。

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')

const value = inject('message', '这是默认值')

// 默认值可能需要通过调用一个函数或初始化一个类来取得
const value = inject('key', () => new ExpensiveClass(), true)
</script>
```

如果提供的值是一个 ref，注入进来的会是该 ref 对象，而**不会**自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。



#### 在提供方修改响应式数据

当提供 / 注入响应式的数据时，**建议尽可能将任何对响应式状态的变更都保持在供给方组件中**。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。

有的时候，我们可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数：

```vue
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```



#### 使用 Symbol 作注入名

我们通常推荐在一个单独的文件中导出这些注入名 Symbol：

```js
// keys.js
export const myInjectionKey = Symbol()
```

```js
// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, { /*
  要提供的数据
*/ });
```

```js
// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```



### 异步组件

`defineAsyncComponent` 方法接收一个返回 Promise 的加载函数。这个 Promise 的 `resolve` 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败。

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

```js
// 全局组件
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```



异步操作不可避免地会涉及到加载和错误状态，因此 `defineAsyncComponent()` 也支持在高级选项中处理这些状态：

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```











### 动态组件

有些场景会需要在两个组件间来回切换，比如 Tab 界面。

`:is` 的值可以是以下几种：

- 被注册的组件名
- 导入的组件对象

当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过 `<KeepAlive>` 组件强制被切换掉的组件仍然保持“存活”的状态。

```vue
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```





## 组合式函数

在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。

组合式函数约定用驼峰命名法命名，并以“use”作为开头。

组合式函数只能在 `<script setup>` 或 `setup()` 钩子中被调用。在这些上下文中，它们也只能被**同步**调用。在某些情况下，你也可以在像 `onMounted()` 这样的生命周期钩子中调用它们。



### 鼠标跟踪器

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}
```

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```



### 带参数的组合式函数

`toValue()` 是一个在 3.3 版本中新增的 API。它的设计目的是将 ref 或 getter 规范化为值。如果参数是 ref，它会返回 ref 的值；如果参数是函数，它会调用函数并返回其返回值。否则，它会原样返回参数。



```js
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

```vue
<script setup>
import { useFetch } from './fetch.js'

const url = ref('/initial-url')

const { data, error } = useFetch(url)

// 这将会重新触发 fetch
url.value = '/new-url'

</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```





## 自定义组件

自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令。

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。

在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以被用作一个自定义指令。

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />

	<!-- 传递多个值，可以用对象来传递 -->
	<div v-demo="{ color: 'white', text: 'hello!' }"></div>
</template>
```

```js
// 全局自定义指定
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})

app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```



当在组件上使用自定义指令时，它会始终应用于组件的根节点。当应用到一个多根组件时，指令将会被忽略且抛出一个警告，所以**不推荐**在组件上使用自定义指令。



### 指令钩子

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```



指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevVnode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

除了 el 外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，推荐通过元素的 `dataset` attribute 实现。



```vue
<!-- 自定义指令的参数也可以是动态的 -->
<div v-example:[arg]="value"></div>
```



### 简化形式

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令。

```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

```vue
<div v-color="color"></div>
```





## 插件

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。

一个插件可以是一个拥有 `install()` 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的应用实例和传递给 `app.use()` 的额外选项作为参数。

```js
import { createApp } from 'vue'

const app = createApp({})

const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}

app.use(myPlugin, {
  /* 可选的选项 */
})
```

插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：

* 通过 `app.component()` 和 `app.directive()` 注册一到多个全局组件或自定义指令。
* 通过 `app.provide()` 使一个资源可被注入进整个应用。
* 向 `app.config.globalProperties` 中添加一些全局实例属性或方法。
* 一个可能上述三种都包含了的功能库 (例如 vue-router)。



### i18n 插件

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 在这里编写插件代码
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    // 通过 provide 来为插件用户供给一些内容
    app.provide('i18n', options)
  }
}
```

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>

<template>

	<h1>{{ $translate('greetings.hello') }}</h1>

</template>
```





## Transition 组件

`<Transition>` 会在一个元素或组件进入和离开 DOM 时应用动画。

进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

`<Transition>` 仅支持**单个元素**或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。

```vue
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```css
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

当一个 `<Transition>` 组件中的元素被插入或移除时，会发生下面这些事情：

* Vue 会自动检测目标元素是否应用了 CSS 过渡或动画。如果是，则一些 CSS 过渡 class 会在适当的时机被添加和移除。
* 如果有作为监听器的 JavaScript 钩子，这些钩子函数会在适当时机被调用。
* 如果没有探测到 CSS 过渡或动画、也没有提供 JavaScript 钩子，那么 DOM 的插入、删除操作将在浏览器的下一个动画帧后执行。



`<Transition>` 也可以作用于动态组件之间的切换。

```vue
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```



### CSS 过渡 class

![transition-classes.2BufuvZR](https://www.huangyihui.cn/upload/gburlimg/98efaf57215a2.png)



一共有 6 个应用于进入与离开过渡效果的 CSS class。

* `v-enter-from`：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
* `v-enter-active`：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
* `v-enter-to`：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 `v-enter-from` 被移除的同时)，在过渡或动画完成之后移除。
* `v-leave-from`：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
* `v-leave-active`：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
* `v-leave-to`：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 `v-leave-from` 被移除的同时)，在过渡或动画完成之后移除。

`v-enter-active` 和 `v-leave-active` 给我们提供了为进入和离开动画指定不同速度曲线的能力。



可以给 `<Transition>` 组件传一个 `name` prop 来声明一个过渡效果名，对于一个有名字的过渡效果，对它起作用的过渡 class 会以其名字而不是 `v` 作为前缀。

```vue
<Transition name="fade">
  ...
</Transition>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```



### 自定义过渡 class

可以向 `<Transition>` 传递以下的 props 来指定自定义的过渡 class：

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

传入的这些 class 会覆盖相应阶段的默认 class 名。这个功能在你想要在 Vue 的动画机制下集成其他的第三方 CSS 动画库时非常有用，比如 [Animate.css](https://animate.style/)。

```vue
<!-- 假设你已经在页面中引入了 Animate.css -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```



### 钩子函数

你可以通过监听 `<Transition>` 组件事件的方式在过渡过程中挂上钩子函数。这些钩子可以与 CSS 过渡或动画结合使用，也可以单独使用。

```vue
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

```js
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) {}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {}

// 当进入过渡在完成之前被取消时调用
function onEnterCancelled(el) {}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {}
```





### 其他属性

* type ：在同一个元素上同时使用 transition 和 animation 时，需要显式地传入 type prop 来声明，告诉 Vue 需要关心哪种类型，传入的值是 animation 或 transition。
* duration ：显式指定过渡的持续时间 (以毫秒为单位)。如果有必要的话，可以用对象的形式传入，分开指定进入和离开所需的时间。
* css : 在使用仅由 JavaScript 执行的动画时，最好是添加一个 `:css="false"` prop。这显式地向 Vue 表明可以跳过对 CSS 过渡的自动探测。除了性能稍好一些之外，还可以防止 CSS 规则意外地干扰过渡效果。
* appear ：在某个节点初次渲染时应用一个过渡效果。
* mode ：过渡模式。默认是，进入和离开的元素都是在同时开始动画的。
  * out-in ：先执行离开动画，然后在其完成之后再执行元素的进入动画。
  * in-out ：先执行进来动画，再执行离开动画。
* key ：用于解决只有某个节点内容更新，但不执行过渡的问题。

```vue
<Transition type="animation">...</Transition>

<Transition :duration="550">...</Transition>

<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>

<Transition :css="false">...</Transition>

<Transition appear>...</Transition>

<Transition mode="out-in">...</Transition>
```

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);

setInterval(() => count.value++, 1000);
</script>

<template>
	<!-- 如果不使用 key，则只有文本节点会被更新，因此不会发生过渡。 -->
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```



## TransitionGroup 组件

`<TransitionGroup>` 是一个内置组件，用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

`<TransitionGroup>` 支持和 `<Transition>` 基本相同的 props、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：

- 默认情况下，它不会渲染一个容器元素。但你可以通过传入 `tag` prop 来指定一个元素作为容器元素来渲染。
- 过渡模式在这里不可用，因为我们不再是在互斥的元素之间进行切换。
- 列表中的每个元素都**必须**有一个独一无二的 `key` attribute。
- CSS 过渡 class 会被应用在列表内的元素上，**而不是**容器元素上。



进入 / 离开动画 ：

```vue
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
```





## KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

默认情况下，一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。

要解决这个问题，我们可以用 `<KeepAlive>` 内置组件将这些动态组件包装起来，这样组件的状态就能被保留下来了。

```vue
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```



### prop

* include 、exclude ：`<KeepAlive>` 默认会缓存内部的所有组件实例，可以使用这两个 prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组。
  * include ：只有符合的组件被缓存
  * exclude ：只有符合的组件不被缓存
  * 它会根据组件的 name 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项。在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明。
* max ：限制可被缓存的最大组件实例数。如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。



```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>

<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```



### 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。

一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 注册相应的两个状态的生命周期钩子：

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

请注意：

- `onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用。
- 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。





## Teleport 组件

`<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

这类场景最常见的例子就是全屏的模态框，我们需要将打开模态框的按钮和模态框放在同个组件，但模态框显示在其他元素上，例如 body 元素。

`<Teleport>` 只改变了渲染的 DOM 结构，它不会影响组件间的逻辑关系。也就是说，如果 `<Teleport>` 包含了一个组件，那么该组件始终和这个使用了 `<teleport>` 的组件保持逻辑上的父子关系。传入的 props 和触发的事件也会照常工作。



* to ：指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。`<Teleport>` 挂载时，传送的 `to` 目标必须已经存在于 DOM 中。
  * 多个 `<Teleport>` 组件可以将其内容挂载在同一个目标元素上，而顺序就是简单的顺次追加，后挂载的将排在目标元素下更后面的位置上。
* disabled ：是否禁用 Teleport。例如在桌面端将一个组件当做浮层来渲染，但在移动端则当作行内组件。

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>

	<!-- 把以下模板片段传送到 body 标签下 -->
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

```vue
<Teleport :disabled="isMobile">
  ...
</Teleport>

<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>

<!-- 渲染结果为 -->
<!-- 
  <div id="modals">
    <div>A</div>
    <div>B</div>
  </div> 
-->
```



















## 与 Vue2 不同点

### 响应式代理 vs. 原始值

在 Vue 3 中，数据是基于 **JavaScript Proxy（代理）** 实现响应式的。使用过 Vue 2 的用户可能需要注意下面这样的边界情况：

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // Vue3: false
    console.log(newObject === this.someObject) // Vue2: true
  }
}
```

当你在赋值后再访问 `this.someObject`，此值已经是原来的 `newObject` 的一个响应式代理。**与 Vue 2 不同的是，这里原始的 `newObject` 不会变为响应式：请确保始终通过 `this` 来访问响应式状态。**





## 组件库

* [Element Plus ](https://element-plus.org/zh-CN/)
* [Ant Design Vue](https://antdv.com/components/overview)
* [Vant](https://vant-contrib.gitee.io/vant/#/zh-CN)   有赞移动端支持vue2、vue3、微信小程序
* [NutUI](https://nutui.jd.com/#/)  京东移动端支持vue2、vue3、uniapp
* [Arco Design](https://arco.design/vue/docs/start) 字节跳动
* [Naive UI](https://www.naiveui.com/)
* [VARLET](https://varlet.gitee.io/varlet-ui/#/zh-CN/index)











































