# 脚手架vue-cli

* 脚手架是通过webpack搭建的开发环境
* 使用ES6语法
* 打包和压缩JS为一个文件
* 项目文件在环境中编译，而不是浏览器
* 实现页面自动刷新





## 脚手架vue-cli的安装

* 前提：已经安装好`npm`
* 使用下面的命令安装`vue-cli`工具。command-line interface，cli 命令行界面
* 检查是否安装成功

```shell
npm install -g @vue/cli
vue -V
vue --version

# 安装vue2
npm install vue@2 -S
```



选择一个目录，该目录将放置你的工程文件夹。并在终端中进入该目录

* 搭建工程，使用vue-cli提供的命令搭建工程

```shell
vue create 工程名

# or  UI界面
vue ui  
```

> 注意：工程名只能出现英文、数字和短横线



## 启动端口

```
"serve": "vue-cli-service serve --port 9999 --open"
```

* `--port 端口号` : 设置端口
* `--open` : 项目启动自动在浏览器中打开



## 组件嵌套

在App.vue中如何引入并使用其他组件呢？

首先需要新建一个Users组件：

```vue
<template>
  <div class="users">
    <h1>Hello Users</h1>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```



然后在App.vue中引入Users组件并使用

```vue
<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <!-- 3. 使用组件 -->
    <Users></Users>
  </div>
</template>

<script>
// 1. 引入Users组件
import Users from './components/Users'

export default {
  name: 'App',
  data(){
    return {
      title: "这是我的第一个Vue脚手架项目！"
    }
  },
  // 2. 声明组件
  components: {
    Users
  }
}
</script>

<style scoped>
</style>
```





## 组件CSS作用域 scoped

在组件文件的style中写样式时，如果没有使用`scoped`，那么子组件的样式会覆盖父组件的样式内容。

如果需要样式只在自身组件内有效，并且不会被其他组件的样式覆盖，则需要在style后面加上`scoped`。

`scoped`: CSS样式只作用于当前组件。scoped会自动生成一串字符用于表示不同组件的样式。

对于性能来说，最好使用class或者id，而不是使用标签选择器。

```vue
<style scoped>
h1{
  color:purple;
}
</style>
```

![image-20210524182713498](https://www.huangyihui.cn/upload/gburlimg/f5d37f45dedaa.png)



使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。



## 样式穿透

```css
::v-deep .el-table {

}

.table >>> .el-table {

}
```



## 属性传值Props

父传子

1. 在父组件App.vue中给子组件Users.vue绑定属性`<Users :users="users"></Users>`
2. Users.vue中使用props接收 `props:["users"]`
3. 接收后，在Users.vue中可以直接使用`{{users}}`来获取内容

```vue
// props:["users"],
// 推荐用以下这种，users表示要接收的名称，type表示接受的数据类型
props:{
  users:{
    type:Array,	//约束该属性的类型是array
    required:true, //约束该属性必须要传递
		default:[]	//设置默认值
  }
}
```



子传父

1. 在子组件Header.vue中绑定一个点击事件，用于向父组件App.vue传递数据。需要调用`$emit`方法。
2. 在App.vue中给子组件绑定一个监听事件，用于监听子组件中$emit()触发的自定义方法。
3. 在自定义的updateTitle()中可以获取到子组件传递过来的数据。

```vue
<header @click="changeTitle"></header>
...
methods:{
  changeTitle:function(){
    this.$emit('titleChange',"子向父组件传值")
  }
}
```

```vue
<app-header :title="title" @titleChange="updateTitle"></app-header>
...
methods:{
  updateTitle(title){
    this.title = title
  }
}
```

注意：父组件中绑定的监听事件名称要和子组件$emit()中的方法名相同。



## 传值和传引用

传值：String, Number, Boolean

引用：Array, Object

在组件中传递数据时，一样存在传值和传引用。如果传的是引用类型，一个发生改变另一个也会改变。





## 路由

为什么要使用路由呢？

在传统网页中，通常使用a标签进行页面跳转，但是每次跳转都会发送http请求，并且刷新页面。

而路由，点击后不会进行http请求和刷新，可以直接到指定的页面，提高效率。



安装路由模块

```shell
npm install vue-router -S
```



在main.js中引入路由模块，并使用

```js
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 配置路由
const router = new VueRouter({
  routes:[
    {path:"/", component:Home},
    {path:"/helloworld", component:HelloWorld}
  ],
  mode:'history'  //去掉URL的#号
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
```



注意：配置路由的`Component`也需要在main.js中引入

```js
import HelloWorld from './components/HelloWorld'
import Home from './components/Home'
```



在App.js中设置导航，和最重要的`<router-view/>`

```vue
<template>
  <div id="app">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/helloworld">HelloWorld</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
```





## HTTP请求 vue-resource

vue-resource是vue原生的HTTP请求插件。推荐用axios

数据接口：http://jsonplaceholder.typicode.com

安装vue-resource

```shell
npm install vue-resource -S
```



在main.js中引入vue-resource

```js
import VueResource from 'vue-resource'
Vue.use(VueResource)
```



在任意组件中通过`$http.get()`获取数据

```vue
// 生命周期钩子created()
created(){
  this.$http.get("http://jsonplaceholder.typicode.com/users")
    .then(data => {
      this.users = data.body
    })
}
```



## 路径

### @符号

路径中的@符号，表示src路径



### /符号

路径中的/符号，表示public路径

任何放置在 `public` 文件夹的静态资源都会被简单的复制，而不经过 webpack。你需要通过绝对路径来引用它们。



资源URL的路径以 `/ ` 绝对路径开头时，不会被当成模块依赖。以 `.` 相对路径 、`@` src目录、`~` node_module目录 开头时，会被当成模块依赖。



## vue.config.js

### proxy 代理

```js
devServer: {
  port: 8000, // 随便改端口号
  proxy: {
    '/v4': {
      target: 'https://m.maizuo.com',
      // host: 'm.maizuo.com',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/v4/api': '/v4/api'
      // }
    }
  }
}
```



```js
// 代理会将请求地址替换成 https://m.maizuo.com/v4/getinfo
axios.get('/v4/getinfo').then(res=>res.data)
```



### 引入 scss 全局变量

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/css/common.scss";`
      }
    }
  }
})
```

```scss
// src/assets/ccss/common.scss
$myColor: red;
```

```vue
<style lang="scss">
.name {
  font-size: 28px;
  color: $myColor;
}
</style>
```



### 关闭eslint

eslint：代码检测工具

```
vue.config.js  lintOnSave: false
.eslintrc.js 删除 `@vue/standard`
```







## MPA(多页面)应用配置

https://cli.vuejs.org/zh/config/#pages





## .env 配置文件

* `.env` ：全局默认配置文件，不论什么环境都会加载合并
* `.env.development` ：开发环境下的配置文件
* `.env.production` ：生产环境下的配置文件



存放路径：项目根目录

命名规则：属性名必须以 `VUE_APP_` 开头，比如 VUE_APP_XXX。值都会被转成字符串。

```
VUE_APP_BASE_API = 'https://huangyihui.cn/api/'
VUE_APP_UPLOAD = 'https://huangyihui.cn/api/attach/upload'
```



文件加载：根据启动命令 vue 会自动加载对应的环境，vue 是根据文件名进行加载。比如执行 `npm run serve` 命令，会自动加载 `.env.development` 文件。修改 env 配置文件后需重启项目才能生效。

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test": "vue-cli-service serve --mode production"
  },
}
```

还可以通过 `--mode production` 指定运行环境，这样就可以在开发时使用生产环境下的配置文件。



```
// 使用
process.env['VUE_APP_BASE_API']

process.env.VUE_APP_BASE_API
```



[参考](https://www.jb51.net/javascript/2927484vv.htm)



## vue-devtools

浏览器调试插件，以下以Chrome浏览器为例。

由于版本问题，这里使用的是vue-devtools V5.1.1版本。

步骤如下：

1. 从GitHub克隆vue-devtools到本地

   `git clone -b v5.1.1 https://github.com/vuejs/vue-devtools.git`

2. 进入shells->chrome文件夹中，修改`mainifest.json`中的persistant为true

3. 安装依赖

   `npm install`

4. 构建

   `npm run bulid`

5. 构建完成后，将chrome文件夹拖进Chrome浏览器中的扩展程序即可。

![image-20210515173709952](https://www.huangyihui.cn/upload/gburlimg/2a0481a2dcd32.png)







## awesome-vue

https://github.com/vuejs/awesome-vue



