# vuex

## 为什么要使用vuex？

Vuex是一个专为vue.js应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

* 状态共享 -- 非父子组件通信
* 数据快照 -- 缓存后端数据，避免重复请求，影响用户体验
* 时光旅行 -- devtools调试，只有提交 mutation 才可以检测到状态变化

Vuex 中的数据缓存在内存中，页面一刷新就没有了。



注意：

* 应用层级的状态应该集中到单个 store 对象中
* 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
* 异步逻辑都应该封装到 action 里面



## store实例

* state : 单一状态树，每个应用将仅仅包含一个 store 实例。

  * 组件获取vuex中状态的方式
    * `this.$store.state.状态名字`
    * `...mapState(["状态名字"])`

* getters : 可以从 store 中的 state 中派生出一些状态(例如对列表进行过滤等)，getters 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。可以认为是 store 的计算属性

  * 组件获取vuex中状态的方式
    * `this.$store.getters.计算属性名字`
    * `...mapGetters(["计算属性名字"])`

* mutations : 同步方法。**更改 Vuex 的 store 中的状态的唯一方法是提交 mutation**。

  * `this.$store.commit('mutations方法名', 参数)`

  * mutation 常量的设计风格 : 方便函数名重名管理

    ```
    [SOME_MUTATION] (state) {
    	// mutate state
    }
    ```

* actions : 异步方法。**在action 提交的是 mutation，而不是直接变更状态**。可以包含任意异步操作

  * Action 函数接受一个与 store 实例具有相同方法和属性的 `context` 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。
  * context 对象不是 store 实例本身。
  * `this.$store.dispatch('actions方法名', 参数)`
  * `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：`store.dispatch('actionA').then(() => { })`
  
* modules : 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿，所以 Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。



![vuex](http://qiniu.huangyihui.cn/doc/202511190059977.png)





需求：2个页面传参的方式？

* 一般用 本地存储
* vue 路由、父子组件、兄弟组件
* vuex 公共数据仓库

当多个组件的层级关系复杂时，要传递参数非常混乱困难，这时可以使用vuex，将数据存储在公共数据仓库中，其他组件或页面需要数据时，直接在仓库中取。





## 开始使用vuex

**store/index.js** vuex配置文件

```js
import Vue from 'vue'
import Vuex from 'vuex'

// use 用于使用插件  自定义插件中必须要有install()
Vue.use(Vuex)

// Store -- 存储状态以及提供状态访问接口
export default new Vuex.Store({
  // 共享状态
  state: {
    num: 1
  },
  // 获取状态，状态的计算属性
  getters: {
    getMyNum(state) {
      return state.num
    },
    // Getter 也可以接受其他 getter 作为第二个参数：
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // 也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
    // 调用：store.getters.getTodoById(2)  注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  // 突变，修改状态，同步
  mutations: {
    syncIncre(state, payload) {
      state.num += payload
    },
    syncMinus(state, payload) {
      state.num -= payload
    }
  },
  // 异步，修改状态
  actions: {
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    increment (context) {
      context.commit('syncIncre')
    },
    // 解构 context
    asyncIncre({commit, dispatch}, payload) {
      setTimeout(()=> {
        // 调用同步中的方法
        commit("syncIncre", payload)
      }, 1000)
    },
    asyncMinus({commit, dispatch}, payload) {
      setTimeout(()=> {
        commit("syncMinus", payload)
      }, 1000)
    }
  },
  modules: {
  }
})
```





**App.vue** 调用store中的数据

```html
<template>
  <div id="app">
    num:{{ $store.state.num }}
    getNum:{{ $store.getters.getMyNum }}
    <button @click="syncIncre">增加</button>
    <button @click="syncMinus">减少</button>
    <button @click="asyncIncre">异步增加</button>
    <button @click="asyncMinus">异步减少</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    syncIncre() {
      // commit()去调用store中mutations对象内的指定名称方法
      this.$store.commit("syncIncre", 1)
    },
    syncMinus() {
      this.$store.commit("syncMinus", 1)
    },
    asyncIncre() {
      // dispatch()去调用store中actions对象内的指定名称方法
      this.$store.dispatch("asyncIncre", 2)
    },
    asyncMinus() {
      this.$store.dispatch("asyncMinus", 2)
    }
  }
}
</script>
```





## mapState/mapGetters

在组件中不想每次都要通过 `$store.state.属性` 方式获取状态，那么可以通过计算属性访问 vuex 中的状态，有以下几种方式：

```js
// 第一种写法：不够高级
computed: {
  computedShow() {
    return this.$store.state.isTabbar
  }
}

// 访问 
{{computedShow}}
```

```js
// 第二种写法：致命缺点：不能写自己的计算属性了
import {mapState} from 'vuex'

...
computed: mapState(['isTabbar'])
// === {isTabbar() {return 它的值}}

// 访问
{{isTabbar}}
```

```js
// 第三种写法：完美。结合第二种写法，并通过展开运算符，将 vuex 中的状态添加到 computed 对象中
import {mapState} from 'vuex'

...
computed: {
  ...mapState(['isTabbar']),
  // 这里可以写组件自己的计算属性
  a() {return 'a'}
}

// 访问
{{isTabbar}}
```



mapGetters同理

```js
import {mapState, mapGetters} from 'vuex'

computed: {
  ...mapState(['comingSoonDatalist']),
  ...mapGetters(['filterComingSoonData'])
},

// 访问
{{filterComingSoonData}}
```



mapMutations

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}

// 调用：this.increment()
```



mapActions

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}

// 调用：this.increment()
```







## 常量设计风格

在多人开发中，难免会出现函数名重名情况发生。常量设计风格就是为了更好的处理重名现象。

当出现重名时，只要修改该文件中的值，并不需要一个个更改调用该方法时的文件。



1. 创建专门存放函数名的js文件，并导出

   ```js
   // 常量命名文件 type/index.js
   const SHOW_TABBAR_MUTATION = 'showTabbarMutation'
   const HIDE_TABBAR_MUTATION = 'hideTabbarMutation'
   
   export {
     SHOW_TABBAR_MUTATION, 
     HIDE_TABBAR_MUTATION
   }
   ```

   

2. 在组件中导入该文件，并使用该文件提供的属性作为函数名

   ```js
   import {SHOW_TABBAR_MUTATION, HIDE_TABBAR_MUTATION} from '@/type'
   
   ...
   mutations: {
     [SHOW_TABBAR_MUTATION] (state, payload) {
       state.isTabbar = payload
     },
     [HIDE_TABBAR_MUTATION](state, payload) {
       state.isTabbar = payload
     },
     comingSoonMutation(state, payload) {
       state.comingSoonDatalist = payload
     }
   }
   ```

   

3. 调用方法

   ```js
   import {SHOW_TABBAR_MUTATION, HIDE_TABBAR_MUTATION} from '@/type'
   
   ...
   this.$store.commit(HIDE_TABBAR_MUTATION, false)
   ```

   

## module

Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



**模块的局部状态**

* 对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**
* 对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`
* 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来

```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    // 接收的第一个参数是 模块的局部状态对象
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  actions: {
    // 局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  },
  getters: {
    // 接收的第一个参数是 模块的局部状态对象
    doubleCount (state) {
      return state.count * 2
    },
    // 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```



## 源码剖析

```js
let Vue

// 用于将new Vuex.Store()中的配置信息全部提取出来
class Store {
  // 构造函数，options为配置对象
  constructor(options){
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    // getters
    let getters = options.getters
    this.getters = {}
    // 提取options中的getters，并通过Object.defineProperty绑定到this.getters中
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state)
        }
      })
    })
    // actions
    let actions = options.actions
    this.actions = {}
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] = (payload) => {
        actions[actionName](this, payload)
      }
    })
    // mutations
    let mutations = options.mutations
    this.mutations = {}
    Object.keys(mutations).forEach(mutationName => {
      this.mutations[mutationName] = (payload) => {
        mutations[mutationName](this.state, payload)
      }
    })
  }
  dispatch(type, payload) {
    this.actions[type](payload)
  }
  commit = (type, payload) => {
    this.mutations[type](payload)
  }
  get state() {
    return this.vm.state
  }
}

// 为所有组件添加$store属性
const install = (v)=>{
  Vue = v
  Vue.mixin({
    beforeCreate(){
      // 组件名字，$options时vue实例中所有组件的集合
      console.log(this.$options.name)
      if (this.$options && this.$options.store) {
        // root，将组件下的store提取到$store中
        this.$store = this.$options.store
      } else {
        // child，子组件从父组件中获取到$store
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default { install, Store }
```















