# 路由



## 使用

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// 引入 router 配置文件
import router from './router'

const app = createApp(App)

// 使用 router
app.use(router)
app.mount('#app')
```

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 定义路由
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // 懒加载
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  // 使用 history 模式
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

```vue
<!-- App.vue -->
<p>
  <!-- 使用 router-link 组件进行导航 -->
  <router-link to="/">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>
</p>

<!-- 路由出口 -->
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>
```

```vue
<script setup>
// 访问路由和当前路由
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

console.log(router);
console.log(route);

// 路由跳转
function goPath() {
  router.push({path: '/about'})
}
</script>
```



## 动态路由匹配

路径参数用冒号 `:` 表示。当一个路由被匹配时，它的 params 的值将在每个组件中以 `this.$route.params` 的形式暴露出来。

可以在同一个路由中设置有多个路径参数，它们会映射到 `$route.params` 上的相应字段。

```js
const routes = [
  {
    // 路径参数以冒号开始
    // 当一个路由被匹配时，它的 params 的值将在每个组件中以 this.$route.params 的形式暴露出来。
    path: '/user/:id',
    component: ()=> import('../views/User.vue')
  },
  {
    // 多个路径参数。跳转时的参数个数、顺序需要和路由中配置的一致
    // router.push('/other/223/name/niko')
    path: '/other/:id/name/:name',
    component: ()=> import('../views/Other.vue')
  }
]
```

| 匹配模式                       | 匹配路径                 | $route.params                            |
| :----------------------------- | :----------------------- | :--------------------------------------- |
| /users/:username               | /users/eduardo           | `{ username: 'eduardo' }`                |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | `{ username: 'eduardo', postId: '123' }` |



### 响应路由参数的变化

使用带有参数的路由时需要注意的是，当用户从 `/users/johnny` 导航到 `/users/jolyne` 时，**相同的组件实例将被重复使用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会被调用**。

要对同一个组件中参数的变化做出响应的话，你可以简单地 watch `$route` 对象上的任意属性，或者使用 `onBeforeRouteUpdate` 导航守卫。

```vue
<script setup>
import { useRouter, useRoute，onBeforeRouteUpdate } from "vue-router";
import { onMounted, watch } from "vue";
const router = useRouter();
const route = useRoute();

onMounted(() => {
  console.log("onMounted", route.params.id);
});

watch(
  () => route.params,
  (newValue, oldValue) => {
    // 对路由变化做出响应...
    console.log("watch", newValue, oldValue);
  }
);

// 导航守卫
onBeforeRouteUpdate((to, from) => {
  console.log("onBeforeRouteUpdatet", to, from);
});
</script>

<template>
  <div @click="router.push('/user/223')">User: {{ route.params.id }}</div>
</template>
```



### 捕获所有路由或 404 Not found 路由

常规参数只匹配 url 片段之间的字符，用 `/` 分隔。如果我们想匹配**任意路径**，我们可以使用自定义的路径参数正则表达式，在路径参数后面的括号中加入正则表达式 :

```js
const routes = [
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

```js
this.$router.push({
  name: 'NotFound',
  // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
  params: { pathMatch: this.$route.path.substring(1).split('/') },
  // 保留现有的查询和 hash 值，如果有的话
  query: this.$route.query,
  hash: this.$route.hash,
})
```



### 在参数中自定义正则

两个路由 `/:orderId` 和 `/:productName`，两者会匹配完全相同的 URL，所以我们需要一种方法来区分它们。最简单的方法就是在路径中添加一个静态部分来区分它们：

```js
const routes = [
  // 匹配 /o/3549
  { path: '/o/:orderId' },
  // 匹配 /p/books
  { path: '/p/:productName' },
]

// 在括号中为参数指定一个自定义的正则，来从 URL 中提取参数
const routes = [
  // /:orderId -> 仅匹配数字
  { path: '/:orderId(\\d+)' },
  // /:productName -> 匹配其他任何内容
  { path: '/:productName' },
]
```

现在，转到 `/25` 将匹配 `/:orderId`，其他情况将会匹配 `/:productName`。`routes` 数组的顺序并不重要!



### 可重复的参数

如果你需要匹配具有多个部分的路由，如 `/first/second/third`，你应该用 `*`（0 个或多个）和 `+`（1 个或多个）将参数标记为可重复：

```js
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: '/:chapters+' },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: '/:chapters*' },
]
```

这将为你提供一个参数数组，而不是一个字符串，并且在使用命名路由时也需要你传递一个数组：

```js
// 给定 { path: '/:chapters*', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// 产生 /
router.resolve({ name: 'chapters', params: { chapters: ['a', 'b'] } }).href
// 产生 /a/b

// 给定 { path: '/:chapters+', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// 抛出错误，因为 `chapters` 为空
```

这些也可以通过在**右括号后**添加它们与自定义正则结合使用：

```js
const routes = [
  // 仅匹配数字
  // 匹配 /1, /1/2, 等
  { path: '/:chapters(\\d+)+' },
  // 匹配 /, /1, /1/2, 等
  { path: '/:chapters(\\d+)*' },
]
```



### 可选参数

你也可以通过使用 `?` 修饰符(0 个或 1 个)将一个参数标记为可选：

```js
const routes = [
  // 匹配 /users 和 /users/posva
  { path: '/users/:userId?' },
  // 匹配 /users 和 /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

请注意，`*` 在技术上也标志着一个参数是可选的，但 `?` 参数不能重复。





## 嵌套路由、路由命名

在父路由中配置 `children` 来设置子路由。

**注意，以 `/` 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL。**

```js
const routes = [
  {
    path: '/user/:id',
    name: 'user',		// 给父路由命名
    component: User,
    // 嵌套路由
    children: [
      // 空的嵌套路径。当 /user/:id 匹配成功
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { path: '',
      	component: UserHome
      },
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
        name: 'userProfile'	// 给子路由命名
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

所有路由的命名**都必须是唯一的**。如果为多条路由添加相同的命名，路由器只会保留最后那一条。



## 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```vue
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 **s**)：

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 的缩写
        LeftSidebar,
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        RightSidebar,
      },
    },
  ],
})
```



嵌套命名视图：

```vue
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar />
  <router-view />
  <router-view name="helper" />
</div>
```

```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```



## 重定向和别名

使用 redirect 设置路由的重定向地址。

```js
const routes = [{ path: '/home', redirect: '/' }]

// 重定向的目标也可以是一个命名的路由：
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]

// 甚至是一个方法，动态返回重定向目标：
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]

// 重定向到相对位置：
const routes = [
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: '/users/:id/posts',
    redirect: to => {
      // 该函数接收目标路由作为参数
      // 相对位置不以`/`开头
      // 或 { path: 'profile'}
      return 'profile'
    },
  },
]
```



使用 alias设置路由的别名。

将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。

通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制。使别名以 `/` 开头，以使嵌套路径中的路径成为绝对路径。

```js
const routes = [{ path: '/', component: Homepage, alias: '/home' }]

// 用一个数组提供多个别名：
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]

// 如果你的路由有参数，请确保在任何绝对别名中包含它们：
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // 为这 3 个 URL 呈现 UserDetails
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```



## 将 props 传递给路由组件

在你的组件中使用 `$route` 会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的 URL。虽然这不一定是件坏事，但我们可以通过 `props` 配置来解除这种行为：

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const routes = [{ path: '/user/:id', component: User 

                 
// 替换成
const User = {
  // 请确保添加一个与路由参数完全相同的 prop 名
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
// 当 props 设置为 true 时，route.params 将被设置为组件的 props。
const routes = [{ path: '/user/:id', component: User, props: true }]


// 当 props 是一个对象时，它将原样设置为组件 props。
// 组件接收 defineProps(['newsletterPopup'])
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]

```



对于有命名视图的路由，你必须为每个命名视图定义 `props` 配置：

```js
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```





## router 和 route

因为我们在 `setup` 里面没有访问 `this`，所以我们不能再直接访问 `this.$router` 或 `this.$route`。作为替代，我们使用 `useRouter` 和 `useRoute` 函数。请注意，在模板中我们仍然可以访问 `$router` 和 `$route`。

`route` 对象是一个响应式对象，所以它的任何属性都可以被监听，但你应该**避免监听整个 `route`** 对象。



* router.push() ：导航到不同的 URL。注意：如果提供了 path，params 会被忽略。
  * 当指定 `params` 时，可提供 `string` 或 `number` 参数。任何其他类型（如对象、布尔等）都将被自动字符串化
  * 对于可选参数]，你可以提供一个空字符串（`""`）或 `null` 来移除它。
* router.replace() ：替换当前位置，它在导航时不会向 history 添加新记录。
  * 也可以直接在传递给 `router.push` 的 `to` 参数中增加一个属性 `replace: true` 。
* router.go() ：该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步。

```vue
<script setup>
// 访问路由和当前路由
import { useRouter, useRoute } from "vue-router";
const router = useRouter();	// 路由器实例
const route = useRoute();		// 当前路由对象

// 字符串路径
router.push('/users/eduardo')
// 带有路径的对象
router.push({ path: '/users/eduardo' })
// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })
// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })
// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })


router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })


// 向前移动一条记录，与 router.forward() 相同
router.go(1)
// 返回一条记录，与 router.back() 相同
router.go(-1)
// 前进 3 条记录
router.go(3)
// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)
</script>
```







## 路由配置



### Sensitive 与 strict 路由配置

默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。例如，路由 `/users` 将匹配 `/users`、`/users/`、甚至 `/Users/`。这种行为可以通过 `strict` 和 `sensitive` 选项来修改，它们既可以应用在整个全局路由上，又可以应用于当前路由上：

```js
import { createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // sensitive：敏感的。将匹配 /users/posva 而非：
    // - /users/posva/ 当 strict: true
    // - /Users/posva 当 sensitive: true
    { path: '/users/:id', sensitive: true },
    // 将匹配 /users, /Users, 以及 /users/42 而非 /users/ 或 /users/42/
    { path: '/users/:id?' },
  ],
  strict: true, // 适用于所有 routes
})
```



### 历史模式

* createWebHistory() ：HTML5 模式，推荐使用这个模式。
* createWebHashHistory() ：哈希模式。

```js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```



## 导航守卫

### 全局前置守卫

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于**等待中**。

* router.beforeEach((to, from)=> {}) ：全局前置守卫。每个守卫方法接收两个参数：
  * `to` ：即将要进入的目标
  * `from` ：当前导航正要离开的路由
  * 可以返回的值如下：
    * `false` ：取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
    * 一个路由地址 ：通过一个路由地址重定向到一个不同的地址，如同调用 `router.push()`，且可以传入诸如 `replace: true` 或 `name: 'home'` 之类的选项。它会中断当前的导航，同时用相同的 `from` 创建一个新导航。
    * 如果什么都没有，`undefined` 或返回 `true`，**则导航是有效的**，并调用下一个导航守卫

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})

router.beforeEach(async (to, from) => {
 if (
   // 检查用户是否已登录
   !isAuthenticated &&
   // ❗️ 避免无限重定向
   to.name !== 'Login'
 ) {
   // 将用户重定向到登录页面
   return { name: 'Login' }
 }
})
```



### 全局解析守卫

你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，因为它在**每次导航**时都会触发，不同的是，解析守卫刚好会在导航被确认之前、**所有组件内守卫和异步路由组件被解析之后**调用。

`router.beforeResolve` 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

```js
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```



### 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身。

它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

```js
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})

// 第三个参数 failure 表示导航的结果
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```



### 在守卫内的全局注入

从 Vue 3.3 开始，你可以在导航守卫内使用 `inject()` 方法。这在注入像 pinia stores 这样的全局属性时很有用。在 `app.provide()` 中提供的所有内容都可以在 `router.beforeEach()`、`router.beforeResolve()`、`router.afterEach()` 内获取到：

```js
// main.js
const app = createApp(App)
app.provide('global', 'hello injections')

// router.js
router.beforeEach((to, from) => {
  const global = inject('global') // 'hello injections'
  // a pinia store
  const userStore = useAuthStore()
  // ...
})
```



### 路由独享的守卫

你可以直接在路由配置上定义 `beforeEnter` 守卫，`beforeEnter` 守卫 **只在进入路由时触发**，不会在 `params`、`query` 或 `hash` 改变时触发。

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

你也可以将一个函数数组传递给 `beforeEnter`，这在为不同的路由重用守卫时很有用：

```js
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]
```



### 组件内的守卫

* onBeforeRouteUpdate ：在当前路由改变，但是该组件被复用时调用。
* onBeforeRouteLeave ：在导航离开渲染该组件的对应路由时调用。 通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回 `false` 来取消。

```vue
<script setup>
import { useRouter, useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";

onBeforeRouteUpdate((to, from) => {
  console.log("onBeforeRouteUpdatet", to, from);
});

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    "你真的想要离开吗？你有未保存的修改!"
  );
  // 取消导航并停留在同一页面上
  if (!answer) return false;
});
</script>
```



### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。



## 路由元信息

有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象 的 `meta` 属性来实现，并且它可以在路由地址和导航守卫上都被访问到。

```js
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: { requiresAuth: false },
      }
    ]
  }
]

router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
})
```





## 动态路由

* router.addRoute() ：添加路由。
* router.removeRoute() ：删除路由，当路由被删除时，**所有的别名和子路由也会被同时删除**。
* router.hasRoute() ：检查路由是否存在。
* router.getRoutes() ：获取一个包含所有路由记录的数组。



动态路由主要通过两个函数实现。`router.addRoute()` 和 `router.removeRoute()`。它们**只**注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要你用 `router.push()` 或 `router.replace()` 来**手动导航**，才能显示该新路由。

记住，如果你需要等待新的路由显示，可以使用 `await router.replace()`。

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:articleName', component: Article }],
})

router.addRoute({ path: '/about', component: About })
// 手动重定向到新增加的路由中
router.replace(router.currentRoute.value.fullPath)

// 删除路由
router.removeRoute('about')
```



要将嵌套路由添加到现有的路由中，可以将路由的 *name* 作为第一个参数传递给 `router.addRoute()`，这将有效地添加路由，就像通过 `children` 添加的一样。

```js
// 添加嵌套路由
router.addRoute({ name: 'admin', path: '/admin', component: Admin })
router.addRoute('admin', { path: 'settings', component: AdminSettings })

// 这等效于：
router.addRoute({
  name: 'admin',
  path: '/admin',
  component: Admin,
  children: [{ path: 'settings', component: AdminSettings }],
})
```









