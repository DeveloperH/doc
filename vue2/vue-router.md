# 路由

路由作用：通过不同的URL跳转到不同的组件。



## 引入

```
npm install vue-router -S
```

如果在一个模块化工程中使用它，必须要通过 `Vue.use()` 明确地安装路由功能：

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```



## 使用

* `<router-link>` ： 跳转路由，声明式导航。`<router-link to=路径>首页</router-link>`
  * to属性：字符串/对象。设置跳转的路径
  * tag属性：字符串。设置转换的标签，默认是a标签
  * active-class属性：字符串。设置链接激活时使用的 CSS 类名。默认是`.router-link-exact-active`
  * replace 属性 ：布尔值。 以`$router.replace()跳转`
  * append 属性：布尔值。设置 `append` 属性后，则在当前 (相对) 路径前添加基路径。例如，我们从 `/a` 导航到一个相对路径 `b`，如果没有配置 `append`，则路径为 `/b`，如果配了，则为 `/a/b`
  * `<router-link to="/center" tag="li" active-class replace >我的</router-link>`
* `<router-view>` ：根据路由path匹配到的组件将渲染在这里
  * name : string   设置命名视图名称



1. 定义组件
2. 配置路由
3. 实例化一个vuerouter的对象
4. 把路由对象挂载到vue对象上面

```html
<div id="app">
  <router-link to="/home">主页</router-link>
  <router-link to="/news">新闻</router-link>
  <div>
    <router-view></router-view>
  </div>
</div>
<script>
  // 定义组件
  var home = {
    template: "<h1>我是主页</h1>"
  }
  var news = {
    template: "<h1>我是新闻页</h1>"
  }

  // 配置路由
  var routes = [
    // 一级路由
    { path: "/home", meta: {authRequired: true}, component: home, name: 'home'},
    { path: "/news", component: news},
    { path: "/", redirect:"/home"} // 重定向，用于设置默认显示
  ]

  // 实例化一个vuerouter的对象
  var router = new VueRouter({
    routes,
    // mode:"history", //去掉URL上的#号
    linkActiveClass: 'className', // 全局配置 <router-link> 默认的激活的 class。默认值:"router-link-active"
  })

  // 把路由对象挂载到vue对象上面，从而让整个应用都有路由功能
  var vm = new Vue({
    el:'#app',
    router
  })
</script>
```

通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：

```js
// Home.vue
export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
```





## 嵌套路由

在需要嵌套路由的 path 中使用 `children` 配置。

**要注意，以 `/` 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

```html
<div id="app">
  <router-link to="/home">主页</router-link>
  <router-link to="/user">用户页面</router-link>
  <div>
    <router-view></router-view>
  </div>
</div>

<template id="user">
  <div>
    <h3>用户信息</h3>
    <div>
      <router-link to="/user/login">用户登录</router-link>
      <router-link to="/user/reg">用户注册</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  //定义组件
  var home = {
    template: "<h1>我是主页</h1>"
  }
  var user = {
    template:"#user"
  }
  var login = {
    template:"<h3>用户登录</h3>"
  }
  var reg = {
    template:"<h3>用户注册</h3>"
  }

  //配置路由，路由定义越早，优先级越高
  var routes = [
    { path: "/home", component: home},
    {
      path:"/user", component: user,
      // 二级路由
      children:[
        { path:"login", component: login},
        { path:"reg", component: reg},
        // 空的子路由
        { path: '', redirect: 'login'}
      ]
    }
  ]

  //实例化一个vuerouter的对象
  var router = new VueRouter({
    routes
  })

  //把路由对象挂载到vue对象上面
  var vm = new Vue({
    el:'#app',
    router
  })
</script>
```



## 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。

在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。`/reg/:name/:id`



### 响应路由参数的变化

当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 `beforeRouteUpdate` 导航守卫：

```js
const User = {
  template: '...',
  beforeRouteUpdate(to, from, next) {
    // 对路由变化作出响应...
    // 别忘了调用next()
  }
}
```



### 捕获所有路由或404

常规参数只会匹配被 `/` 分隔的 URL 片段中的字符。如果想匹配**任意路径**，我们可以使用通配符 (`*`)：

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

含有*通配符*的路由应该放在最后。路由 `{ path: '*' }` 通常用于客户端 404 错误。如果你使用了*History 模式*，请确保 **正确配置你的服务器**。



当使用一个*通配符*时，`$route.params` 内会自动添加一个名为 `pathMatch` 参数。它包含了 URL 通过*通配符*被匹配的部分：

```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```





## 路由传参

传参的两种方式：

* 问号传参 `/login?name=tom&id=123`
  * 接收时在template中用`$route.query.参数名`，例如：`{ {$route.query.name} }` 
* /传参 `/reg/tom/666`
  * 接收时需要先在配置路由的路径下**自定义变量名(`/:变量名`)**接收传递的参数 `/reg/:name/:id`
  * 然后在template中用`$route.params.变量名` 获取参数，例如：` { {$route.params.name} }`

```html
<div id="app">
  <router-link to="/login?name=tom&id=123">用户登录</router-link>
  <router-link to="/reg/tom/666">用户注册</router-link>
  <div>
    <router-view></router-view>
  </div>
</div>

<script>
  //定义组件
  var login = {
    template:"<div><h3>用户登录</h3> {{$route.query.name}}-{{$route.query.id}}-{{$route.query}}</div>"
  }
  var reg = {
    template:"<div><h3>用户注册</h3> {{$route.params.name}}-{{$route.params.id}}</div>"
  }

  //配置路由
  var routes = [
    { path: "/login", component: login},
    {
      path:"/reg/:name/:id", 
      component: reg,
      // 给路由设置名字，路由跳转的时候就可以通过这个名字跳转
      name: 'reg'		// this.$router.push({name: 'detail', params: {id: data}})
    }
  ]

  //实例化一个vuerouter的对象
  var router = new VueRouter({
    routes
  })

  //把路由对象挂载到vue对象上面
  var vm = new Vue({
    el:'#app',
    router
  })
</script>
```



## TDO路由跳转方式

* 编程式导航(js跳转)：通过全局路由对象 `$router` 的实例方法

  * this.$router.push(路径)

* 声明式导航(`<router-link>`)

  * `<router-link to=路径>首页</router-link>`
  
  

### $router

在vue组件中，可以通过 `this.$router` 获取到全局路由实例对象，实例对象中提供了各类方法操作路由。

* push(location, onComplete, onAbort) : 导航到不同的 URL
  * location : 可以是一个字符串路径，或者一个描述地址的对象。
    * 当跳转地址是当前地址时，会报错
  * onComplete : 可选。回调函数。在**导航成功**完成 (在所有的异步钩子被解析之后) 时自动调用。
  * onAbort : 可选。回调函数。在**导航终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由)** 时自动调用。
  * 返回值 : 如果支持 Promise，将返回一个 Promise。
  * 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。当点击 `<router-link>` 时，这个方法会在内部调用。
* replace(location, onComplete, onAbort) : 跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 : **替换掉当前的 history 记录**。
  * 参数同上
* go(n) : 参数是一个整数，意思是在 history 记录中向前或者后退多少步。类似 `window.history.go(n)`。
  * 如果 history 记录不够用，就会失败，但不会发生跳转和报错



**注意**： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，你需要使用 `beforeRouteUpdate` 来响应这个变化 (比如抓取用户信息)。

Vue Router 的导航方法 (`push`、 `replace`、 `go`) 在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致。



```js
// 字符串，加 / 时绝对路径，不加是相对路径
router.push('home')
router.push('/home')
this.$router.push(`/detail/${data}`)

// 对象
router.push({ path: 'home' })

// 命名的路由，通过路由name属性跳转并传值
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 如果提供了 path，params 会被忽略，这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```



```js
// 跳转到指定路径
this.$router.replace('reg')

// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，就会失败，但不会发生跳转和报错
router.go(-100)
router.go(100)

```



### $route



## `$router 和 $route` 区别

$router ：是全局的路由对象，包含所有配置的路径信息，有跳转push等方法

$route ：是当前的路由对象（信息），包含当前的url、以及url解析得到的数据(路径参数)等等





## 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      // 命名路由
      name: 'user',
      component: User
    }
  ]
})
```

这样就可以通过路由的name进行跳转。这两种方式都会把路由导航到 `/user/123` 路径。

```
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

router.push({ name: 'user', params: { userId: 123 } })
```







## 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。

如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```





## 重定向和别名

重定向是指当用户访问 `/home` 时，URL 会被 `/` 替换，然后匹配成 `/`。

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```





那么什么是别名呢？

**将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。**

上面对应的路由配置为：

```
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

访问地址：`localhost:8080/home` 时，地址栏不会变，但实际访问的是 `localhost:8080/`

“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。



## History模式

* hash模式  #/home
* history模式  /home

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

使用路由的 **history 模式**

```js
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
```



不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面。



### 后端配置

[更多后端配置例子](https://v3.router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

**nginx**

```
location / {
  try_files $uri $uri/ /index.html;
}
```

**原生 Node.js**

```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```



### 配置404页面

给个警告，因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 `index.html` 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后再给出一个 404 页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```



## 路由原理

* hash路由：location.hash 切换
  * window.onhashchange 监听路径的切换
* history路由：history.pushState 切换
  * window.onpopstate 监听路由的切换





# 导航守卫

“导航”表示路由正在发生改变(动词)。

`vue-router` 提供的导航守卫主要用来  **通过跳转或取消的方式**  守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过 **观察 `$route` 对象**来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。



**通过导航守卫，可以判断要跳转的地址，进而进行验证放行，达到路由拦截功能。**

例如，当要进入的路径需要用户登录时，对当前状态进行判断，不满足则跳转到登录页面

[官方文档](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html)



## 全局前置守卫

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

* `router.beforeEach((to, from, next) => {})` ：注册一个全局前置守卫
  *  `to : Route`  即将要进入的目标**路由对象**
  *  `from: Route` 当前导航正要离开的路由
  *  `next: Function` 一定要调用该方法来 resolve 这个钩子。执行效果依赖 `next` 方法的调用参数。
     *  **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
     *  **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
     *  **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 `router-link` 的 `to` prop 或 `router.push` 中的选项。
     *  **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()`注册过的回调。

**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**。

```js
const router = new VueRouter({ ... })
                              
router.beforeEach((to, from, next) => {
	// 路由拦截，当要进入的路径需要用户登录时，对当前状态进行判断，不满足则跳转到登录页面
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```



## 全局解析守卫

* `router.beforeResolve((to, from, next) => {})` ：注册一个全局守卫

这和 `router.beforeEach` 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

```js
router.beforeResolve((to, from, next) => {
	// ...
})
```

在 `beforeEach` next() 后才会被调用。



## 全局后置钩子

* `router.afterEach((to, from) => {})` : 注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身

```js
router.afterEach((to, from) => {
  // ...
})
```



## 路由独享的守卫

你可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

这些守卫与全局前置守卫的方法参数是一样的。



## 组件内的守卫

最后，你可以在路由组件内直接定义以下路由导航守卫：

- `beforeRouteEnter`
- `beforeRouteUpdate` 
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    if(验证登录状态) {
      next()
    }else {
      // 没登录，跳转到登录页
      next("/login")
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // 通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
    const answer = window.confirm('你确认离开吗？还有内容未保存！')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```





## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。





# 简易 vue-router 实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>简易 vue-router</title>
  </head>
  <body>
    <div id="router-view"></div>
  </body>

  <script>
    let routers = [
      { path: "/user/list", html: `列表页<a href="#/user/detail">去详情</a>` },
      { path: "/user/detail", html: `详情页<a href="#/user/list">去列表</a>` },
    ];

    function doRouter() {
      let currentPath = location.hash.slice(1);
      let target = routers.find((item) => {
        return item.path == currentPath;
      });
      let routerView = document.querySelector("#router-view");
      if (!target) {
        routerView.innerHTML = `<h3>404</h3>`;
        return;
      }
      routerView.innerHTML = target.html;
    }

    window.onhashchange = (e) => {
      doRouter();
    };

    doRouter();
  </script>
</html>
```





