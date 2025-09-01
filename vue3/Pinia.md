# Pinia

Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。



```js
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

```js
// stores/counter.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 通过 defineStore 定义 store，它的第一个参数要求是独一无二的名字
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

```vue
<script setup>
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>

<template>
  <div @click="counter.increment">Count: {{ counter.count }}</div>
</template>
```



## 定义 store

* defineStore() ：定义 store
  * 第一个参数要求是一个独一无二的名字
  * 第二个参数可接受两类值：Setup 函数或 Option 对象
  * 返回值最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。





```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { inject } from 'vue'

// setup 函数方式
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  
  // 注入属性
  const appProvided = inject('appProvided')

  return { count, doubleCount, increment }
})
```

```js
import { defineStore } from 'pinia'

// 选项式
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```



**storeToRefs() 解构：**

store 是一个用 reactive 包装的对象，这意味着不需要在 getters 后面写 `.value`，因此我们不能对它进行解构。

为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`。它将为每一个响应式属性创建引用。

```vue
<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const counter = useCounterStore();

// 直接解构会丢失相应性
// const { count } = counter;

const { count } = storeToRefs(counter);
// 作为 action 的 increment 可以直接解构
const { increment } = counter

setTimeout(() => {
  increment();
  console.log(counter.count);
  console.log(count);
}, 3000);
</script>
```





## state



* `$patch()` ：在同一时间更改多个属性。
* `$subscribe(calllback, opt)` ：侦听 state 及其变化。
  * 默认情况下，state subscription 会被绑定到添加它们的组件上。当该组件被卸载时，它们将被自动删除。如果想在组件卸载后依旧保留它们，请将 `{ detached: true }` 作为第二个参数，以将 state subscription 从当前组件中分离。



```vue
<script setup>
import { useCounterStore } from "@/stores/counter";
import { watch } from "vue";

const counter = useCounterStore();

setTimeout(() => {
  // 修改属性
  counter.$patch({
    count: 10
  })

  console.log(counter.count);
}, 3000);

setTimeout(() => {
  // 修改属性
  counter.$patch({
    count: 20
  })

}, 5000);

// 侦听 state 变化
counter.$subscribe((mutations, state)=> {
  console.log('count 更新了', state.count)
})
  
// 侦听整个 state
watch(
  counter,
  (state) => {
    console.log("new state", state);
  },
  { deep: true }
);
</script>
```



## action

* `$onAction(callback, boolean)` ：监听 action 和它们的结果，传递给它的回调函数会在 action 本身之前执行。
  * 如果你想在组件卸载后依旧保留它们，请将 true 作为第二个参数传递给 action 订阅器。

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    console.log("onAction")

    // 这将在 action 成功并完全运行后触发。它等待着任何返回的 promise
    after((result) => {
      console.log("after", result)
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn("err", error)
    })
  }
)

// 手动删除监听器
unsubscribe()
```





























