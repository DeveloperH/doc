# Nuxt2

官网：https://nuxt.com

v2 官网：https://v2.nuxt.com

建议安装 nodejs 16.x 或14.x。



## SSR

Server-side rendering 服务器端渲染 （SSR） 是应用程序通过在服务器上显示网页而不是在浏览器中渲染网页。服务器端将完全渲染的页面发送到客户端，客户端的 JavaScript 接管，然后允许 Vue.js 应用程序进行补充 。

注意：需要 Node.js 服务器。



### 服务器与浏览器环境

由于您处于 Node.js 环境中，因此您可以访问 Node.js 对象，例如 `req` 和 `res`。您无权访问 `window` 或 `document` 对象，因为它们属于浏览器环境。但是，您可以通过使用 `beforeMount` 或 `mounted` 钩子来使用 `window` 或 `document`。

```js
beforeMount () {
  window.alert('hello');
}
mounted () {
  window.alert('hello');
}
```



### 使用 Nuxt 的服务器端渲染步骤

**第 1 步：浏览器到服务器**

当浏览器发送初始请求时，它将命中 Node.js 内部服务器。Nuxt 将生成 HTML 并将其与执行函数的结果（例如 `asyncData`、`nuxtServerInit` 或 `fetch`）一起发送回浏览器。钩子函数也会被执行。



**第 2 步：服务器到浏览器**

浏览器从服务器接收呈现的页面以及生成的 HTML。内容显示出来，Vue.js 开始发挥作用，使其具有响应性。完成此过程后，页面将变为交互式页面。



**第 3 步：浏览器到浏览器**

页面之间的导航 `<NuxtLink>` 是在客户端完成的，因此除非您硬刷新浏览器，否则无需再次访问服务器。



### 基础实现

```sh
npm init -y
npm i vue@2 vue-server-renderer express -S

node server.js
```

```js
// server.js
const Vue = require('vue')
const server = require('express')();

server.get('/', (req, res) => {
  const app = new Vue({
    template: `<div>hello</div>`
  })

  const renderer = require('vue-server-renderer').createRenderer()

  renderer.renderToString(app).then(html => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
      `)
  }).catch(err => {
    console.log(err)
  })
})

server.listen(3001)
```



## SSG

通过静态站点生成 Static Site Generation，您可以在构建阶段渲染您的应用程序并将其部署到任何静态托管服务，例如 Netlify、GitHub 页面、Vercel 等。这意味着不需要服务器即可部署您的应用程序。

使用 `target：static` 部署站点时，所有 `.vue` 页面都将生成为 HTML 和 JavaScript 文件。对 API 的所有调用都将进行并缓存在生成内容中名为 static 的文件夹中，因此无需在客户端导航时调用 API。



**步骤 1：浏览器到 CDN**

当浏览器发送初始请求时，它将访问 CDN。



**步骤 2：CDN 到浏览器**

CDN 会将已生成的 HTML、JavaScript 和静态资源发送回浏览器。内容显示出来，Vue.js 开始发挥作用，使其具有响应性。完成此过程后，页面将变为交互式页面。



**步骤 3：浏览器到浏览器**

页面之间的导航 `<NuxtLink>` 是在客户端完成的，因此您无需再次访问 CDN，并且即使您硬刷新浏览器，所有 API 调用也将从已缓存的静态文件夹中加载。



**SPA 回退**

通过使用 `generate.exclude` 属性从生成中排除的页面将回退到单页应用程序。因此，这些页面将不存在于 CDN 中，一旦用户导航到该页面，这些页面就会呈现在浏览器中的客户端。



## 开始

```sh
npx create-nuxt-app <project-name>
// or
npm init nuxt-app <project-name>
```

接下来会询问配置项，完成后就会自动安装所有依赖项。

`/pages/index.vue` 是应用程序打开时 Nuxt 显示的默认主页。



遇到错误：

```
Error: Failed to download template from registry: Failed to download https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json: TypeError: fetch failed
```

修改 `C:\Windows\System32\drivers\etc`下的 hosts 文件，在最下面添加以下内容后保存即可。

```
185.199.108.133 raw.githubusercontent.com
```







## 路由

Nuxt 会根据 `pages` 目录中提供的 Vue 文件自动生成 `vue-router` 配置。Nuxt 还为你的所有路由提供自动代码拆分。



```
文件树：
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue


自动生成：
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```



### 动态路由

要创建动态路由，你需要在 `.vue` 文件名或目录名称前添加下划线 （`_`）。您可以将文件或目录命名为所需的任何名称，但必须在其前面加上下划线。



```
文件树：
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue


自动生成：
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',		// /users/123
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',		// /666aaa
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',	// /a/comments
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```



如你所见，名为 `users-id` 的路由的路径为 `:id?`，这使得它是可选的，如果你想让它成为必需的，请在 `users/_id` 目录中创建一个 `index.vue` 文件。

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/

-----| _id
-------| index.vue

-----| _id.vue
--| index.vue
```



### 嵌套路由

Nuxt 允许你使用 vue-router 的子路由创建嵌套路由。要定义嵌套路由的父组件，你需要创建一个与包含子视图的目录同名的 Vue 文件。

注意：不要忘记将 `<NuxtChild>` 组件 包含在父组件（`.vue` 文件）中。



```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue


router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```



### 动态嵌套路由

这不是一个常见的情况，但 Nuxt 可以在 dynamic parents 中拥有动态 children。

```
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue


router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```



### 未知动态嵌套路由

如果你不知道 URL 结构的深度，你可以使用 `_.vue` 来动态匹配嵌套路径。这将处理与更具体的路由不匹配的请求。

处理 404 页面现在取决于 `_.vue` 页面的逻辑。



```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue


将处理如下请求：
/ -> index.vue
/people -> people/index.vue
/people/123 -> people/_id.vue
/about -> _.vue
/about/careers -> _.vue
/about/careers/chicago -> _.vue
```



### router 属性

在 `nuxt.config.js` 中的 router 属性允许你自定义 Nuxt 路由器 （vue-router）。



* base：应用程序的基 URL。默认值： `'/'` 。例如，如果整个单页应用程序在 `/app/` 下提供，则 base 应使用值 `'/app/'` 。

* extendRoutes：扩展路由，可以添加自定义路由

  * 如果你想对路由进行排序，你可以使用 `@nuxt/utils` 中的 `sortRoutes(routes)` 函数

* fallback：布尔值。默认值：`false` 。控制当浏览器不支持 history.pushState 但 mode 设置为 history 时，路由器是否应回退到哈希模式。

* mode：配置 router 模式，由于服务端渲染，不建议更改。默认值： `history` 。

* parseQuery / stringifyQuery：提供自定义查询字符串 parse / stringify 函数。

* trailingSlash：尾随斜杠。默认值：`undefined` 。如果此选项设置为 true，则尾部斜杠将附加到每个路由。如果设置为 false，它们将被删除。

* routeNameSplitter：更改 Nuxt 使用的路由名称之间的分隔符。默认值： `'-'` 。

  * 有页面文件 `pages/posts/_id.vue` ，Nuxt 将以编程方式生成路由名称 `posts-id`。将 `routeNameSplitter` 配置更改为 `/` 名称将更改为 `posts/id`。

* scrollBehavior：允许您为路由之间的滚动位置定义自定义行为。每次呈现页面时，都会调用此方法。

  * 在 Nuxt 中，您可以使用文件覆盖路由器 scrollBehavior。此文件应放置在名为 app 的文件夹中。

    ```js
    // ~/app/router.scrollBehavior.js
    // 将每个路由的滚动位置强制置于顶部的示例：
    export default function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
    ```

* middleware：为应用程序的每个页面设置默认中间件。

  ```js
  export default {
    router: {
      // 在每个页面上运行中间件 user-agent.js
      middleware: 'user-agent'
    }
  }
  ```

  ```js
  export default function (context) {
    // 在上下文中添加 userAgent 属性（在 `asyncData` 和 `fetch` 中可用）
    context.userAgent = process.server
      ? context.req.headers['user-agent']
      : navigator.userAgent
  }
  ```

  



```js
import { sortRoutes } from '@nuxt/utils'

export default {
  router: {
  	base: '/',
    routeNameSplitter: '/',
  	
  	// 添加自定义路由
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'root',
        path: '/index',
        component: resolve(__dirname, 'pages/index.vue')
      })
      
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
      
      // 添加使用 Named Views 的路由时，不要忘记添加命名组件的相应 chunkNames。
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users'), // or routes[index].component
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
      
      // 对路由进行排序
      sortRoutes(routes)
    }
  }
}
```



### linkActiveClass

`linkActiveClass` 的工作方式与活动链接的 `vue-router` 类相同。如果我们想显示哪些链接处于活动状态，您所要做的就是为类 `nuxt-link-active` 创建一些 css 。

此 css 可以添加到导航组件中，也可以添加到特定页面或布局中，也可以添加到 main.css 文件中。

```css
.nuxt-link-active {
  color: red;
}
```



如果需要，您还可以将类名配置为其他名称。您可以通过修改 nuxt.config.js 文件中 router 属性中的 `linkActiveClass` 来实现此目的。

```js
export default {
  router: {
    linkActiveClass: 'my-custom-active-link'
  }
}
```



### linkExactActiveClass

`linkExactActiveClass` 的工作原理与 `vue-router` 类相同，用于精确活动链接。如果我们想通过完全匹配显示哪些链接处于活动状态，您只需为类 `nuxt-link-exact-active` 创建一些 css 即可。

此 css 可以添加到导航组件中，也可以添加到特定页面或布局中，也可以添加到 main.css 文件中。

```css
.nuxt-link-exact-active {
  color: green;
}
```



如果需要，您还可以将类名配置为其他名称。您可以通过修改 nuxt.config.js 文件中 router 属性中的 `linkExactActiveClass` 来实现此`目的`。

```js
export default {
  router: {
    linkExactActiveClass: 'my-custom-exact-active-link'
  }
}
```



### linkPrefetchedClass

linkPrefetchedClass 将允许你为已预取的所有链接添加样式。这对于测试在修改默认行为后正在预取哪些链接非常有用。默认情况下，linkPrefetchedClass 处于禁用状态。如果要启用它，则需要将其添加到 `nuxt-config.js` 文件中的 router 属性中。

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'		// 类名可以随意命名
  }
}
```

然后，您可以添加该类的样式。

```css
.nuxt-link-prefetched {
  color: orangeRed;
}
```



### prefetchLinks 预取链接

Nuxt 自动包含智能预取。这意味着它会检测链接何时可见，无论是在视口中还是在滚动时，并预取这些页面的 JavaScript，以便在用户点击链接时准备就绪。Nuxt 仅在浏览器不忙时加载资源，如果您的连接处于离线状态或您只有 2g 连接，则跳过预取。



#### 禁用特定链接的预取

如果您的页面包含大量 JavaScript，或者您有很多不同的页面需要预取，或者您有很多需要加载的第三方脚本，则有时您可能希望禁用某些链接的预取。要禁用特定链接上的预取，你可以使用 `no-prefetch` 属性。从 Nuxt v2.10.0 开始，你也可以使用设置为 `false` 的 `prefetch` 属性。

```vue
<NuxtLink to="/about" no-prefetch>About page not pre-fetched</NuxtLink>
<NuxtLink to="/about" :prefetch="false">About page not pre-fetched</NuxtLink>
```



#### 全局禁用预取

要禁用所有链接上的预取，请将 `prefetchLinks` 设置为 `false`：

```js
export default {
  router: {
    prefetchLinks: false
  }
}
```

从 Nuxt v2.10.0 开始，如果你已经将 `prefetchLinks` 设置为 `false`，但你想预取一个特定的链接，你可以使用 `prefetch` 属性：

```vue
<NuxtLink to="/about" prefetch>About page pre-fetched</NuxtLink>
```



### prefetchPayloads

随 v2.13.0 添加，仅适用于  [static target ](https://v2.nuxt.com/docs/features/deployment-targets#static-hosting)。默认值：`true` 。此选项取决于要启用的 prefetchLinks 选项。

当使用 `target： 'static'` 的 `nuxt generate` 时，Nuxt 将为每个页面生成一个 `payload.js`。

启用此选项后，当 `<nuxt-link>` 在视口中可见时，Nuxt 将自动预取链接页面的有效负载，从而进行**即时导航**。

可以通过将 `prefetchPaylods` 设置为 `false` 来禁用此行为：

```js
export default {
  router: {
    prefetchPayloads: false
  }
}
```



### 访问路由参数

如果你有一个动态用户页面 （`users/_id.vue`） 并希望访问 `id` 参数来加载用户或流程信息，你可以像这样访问变量：`this.$route.params.id`。



### NuxtLink 导航组件

此组件包含在 Nuxt 中，因此不必像导入其他组件一样导入它。可以把 `<NuxtLink>` 看作是 `<RouterLink>` 的替代品。

对于指向网站内页面的所有链接，请使用 `<NuxtLink>`。如果有指向其他网站的链接，则应使用 `<a>` 标签。

```vue
<template>
  <div>
    <NuxtLink to="/" exact-active-class="app-link--active">Home page</NuxtLink>
    <NuxtLink to="/about" active-class="app-link--active">About page</NuxtLink>
    <NuxtLink to="/goods/1?a=1&b=2">商品1</NuxtLink>
    <NuxtLink to="/goods/2?a=11&b=22">商品2</NuxtLink>
    
    <!-- 声明式跳转 name: 目录名-其他目录-文件名; params：key 要对等文件名 -->
    <NuxtLink :to="{name: 'goods-id', params: {id:3}, query: {a:111, b:222}}">商品3</NuxtLink>
    <a href="https://v2.nuxt.com">外部链接</a>
  </div>
</template>

<style scoped>
.app-link--active {
  color: green;
  background: red;
}
</style>
```



### 路由守卫

* 前置：依赖 middleware，plugins
  * 全局守卫：nuxt.config.js router.middleware，匹配 layout 的 middleware
  * 组件独享守卫 middleware
  * 插件全局前置守卫
* 后置
  * 使用 vue 的 `beforeRouteLeave` 钩子
  * 插件全局后置守卫



```js
plugins: [
  '~/plugins/router'
],
```

```js
// /plugins/router.js
export default ({ app, redirect }) => {
  console.log('插件')

  app.router.beforeEach((to, from, next) => {
    console.log('插件全局前置守卫')
    if (to.name === 'login') {
      next()
    } else {
      redirect({ name: 'login' })
    }
  })

  app.router.afterEach((to, from) => {
    console.log('插件全局后置守卫')
  })
}
```

```js
<script>
// /pages/login.vue
export default {
  beforeRouteLeave(to, from, next) {
    let bl = window.confirm('是否要离开')
    next(bl)
  }
}
</script>
```



### @nuxtjs/router

1. 安装依赖 `npm i @nuxtjs/router -S`

2. 在 nuxt.config.js 配置

   ```js
   export default {
   	modules: ['@nuxtjs/router']
   }
   ```

3. 把 vue-cli 中的 router 文件拷贝到 nuxt 项目根目录

4. 修改最后返回

   ```js
   // 原 router 文件内容...
   
   export function createRouter() {
   	return new Router({
   		mode: 'history',
   		routes
   	})
   }
   ```

   



## 目录结构

```
/pages
/components
/assets
/static

nuxt.config.js
package.json
```



* `pages` 目录包含应用程序的视图和路由。Nuxt 读取这个目录下的所有 `.vue` 文件，并使用它们来创建应用程序路由器。
* `components` 目录是放置所有 Vue.js 组件的位置。 将 `nuxt.config.js` 中的 components 设置为 true，Nuxt 将扫描并自动导入这些组件。
* `assets` 目录包含未编译的资源，例如样式、图像或字体。
* `static` 目录直接映射到服务器根目录，包含必须保留其名称（例如`robots.txt`）或可能不会改变（例如网站图标）的文件。
* `nuxt.config.js` 文件是 Nuxt 的单点配置。如果您想要添加模块或覆盖默认设置，则可以在此处应用更改。
* `package.json` 文件包含应用程序的所有依赖项和脚本。



### 命令

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
},
```



* `nuxt` - 启动开发服务器。
* `nuxt build` - 使用 webpack 构建和优化应用程序以进行生产。
* `nuxt start` - 启动生产服务器（运行 `nuxt build` 后）。
* `nuxt generate` - 构建应用程序（如果需要），将每个路由生成为 HTML 文件并静态导出到 `dist/` 目录（用于静态托管）。



### 部署

Nuxt 允许您在 Server 或 Static 部署之间进行选择：修改 `nuxt.config.js` 中的 `target` 属性值。

部署 SSR 应用程序，我们使用 `target： 'server'`，其中 server 是默认值。Nuxt 将创建一个 `.nuxt` 目录，其中包含所有内容，可以部署到您的服务器托管中。

部署静态生成的站点，请确保你的 `nuxt.config.js` 中有 `target： 'static'` 。Nuxt 将创建一个 `dist/` 目录，其中包含所有内容，以便部署到静态托管服务上。



```js
export default {
  // ...
  
  target: 'static',		// 默认为 server
}
```



1. 执行 `npm run build`

2. 将打包好的以下文件放到服务器某个文件夹中，并且在服务器安装node环境

   ```
   /.nuxt
   /static
   nuxt.config.js
   package.json
   package-lock.json
   ```

3. 在服务器上执行 `npm install`

4. 在服务器上运行项目  `npm run start` ，打开的也是 `localhost:3000`

5. 使用 nginx 做代理 `www.xxx.com`



### app.html

应用程序模板用于为您的 Nuxt 应用程序创建文档的实际 HTML 框架，该框架注入 head 和 body 的内容和变量。此文件是自动为您创建的，通常很少需要修改。您可以通过在项目的源目录（默认情况下为根目录）中创建 `app.html` 文件来自定义 Nuxt 使用的 HTML 应用程序模板，以包含脚本或条件 CSS 类。

虽然可以在 `app.html`中添加 JavaScript 和 CSS 文件，但建议改用 `nuxt.config.js` 来完成这些任务！



Nuxt 使用的默认模板是：

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```



使用自定义应用程序模板的一个用例是为 IE 添加条件 CSS 类：

```html
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```



### pages 目录

`pages` 目录包含您的 Application View 和 Routes。Nuxt 会读取此目录中的所有 `.vue` 文件，并自动为你创建路由器配置。

每个 Page 组件都是一个 Vue 组件，但 Nuxt 添加了特殊的属性和函数，以使您的通用应用程序的开发尽可能简单。

您可以通过 nuxt.config.js 设置选项将 `pages/` 目录重命名为不同的目录。 

```js
export default {
  dir: {
    // 将 `pages` 目录重命名为 `routes` 目录
    pages: 'routes'
  }
}
```



#### 动态页面

当您由于页面来自 API 而不知道页面名称，或者您不想一遍又一遍地创建相同的页面时，可以创建动态页面。要创建动态页面，你需要在 .vue 文件名之前添加下划线，或者如果你想让目录是动态的，则需要在目录名称之前添加下划线。您可以将文件或目录命名为所需的任何名称，但必须在其前面加上下划线。

如果你在 pages 文件夹中定义了一个名为 `_slug.vue` 的文件，你可以使用 params.slug 的上下文来访问该值。

```vue
<template>
  <h1>{{ slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const slug = params.slug // When calling /abc the slug will be "abc"
      return { slug }
    }
  }
</script>
```



如果你在名为 _book 的文件夹中定义了一个名为 `_slug.vue` 的文件`，`你可以使用 `params.slug` 和 `params.book` 的上下文来访问该值。

```vue
<template>
  <h1>{{ book }} / {{ slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const book = params.book
      const slug = params.slug
      return { book, slug }
    }
  }
</script>
```



#### 忽略页面

如果要忽略页面，以便它们不包含在生成的 `router.js` 文件中，则可以通过在它们前面加上 `-` 来忽略它们。

例如，`pages/-about.vue` 将被忽略。



#### 属性

##### asyncData

asyncData 在加载组件之前每次调用。它可以是异步的，并接收上下文作为参数。返回的对象将与你的 data 对象合并。

```js
export default {
  asyncData(context) {
    return { name: 'World' }
  }
}
```



##### fetch

每次需要获取异步数据时，都可以使用 fetch。Fetch 在渲染路由时在服务器端调用，在客户端导航时调用。

```vue
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```



##### head

为当前页面设置特定标签。Nuxt 使用 `vue-meta` 来更新应用程序的文档 head 和 meta 属性。

```js
export default {
  head() {
    // 为本页面设置 meta 标签
  }
}
```



##### layout

指定在 layouts 目录中定义的布局。

```js
export default {
  layout: 'blog'
}
```



##### loading

如果设置为 false，则阻止页面在您输入时自动调用 `this.$nuxt.$loading.finish（）` 和在您离开时自动调用 `this.$nuxt.$loading.start（`），从而允许您手动控制行为。

仅当 nuxt.config.js 中还设置了加载时才适用。

```js
export default {
  loading: false
}
```



##### transition

定义页面的特定过渡。

```js
export default {
  transition: 'fade'
}
```



##### scrollToTop

`scrollToTop` 属性允许您告诉 Nuxt 在呈现页面之前滚动到顶部。默认情况下，当您转到另一个页面时，Nuxt 会滚动到顶部，但对于子路由，Nuxt 会保留滚动位置。如果你想告诉 Nuxt 在渲染子路由时滚动到顶部，请将 `scrollToTop` 设置为 `true` 。

```js
export default {
  scrollToTop: true
}
```

相反，您也可以在父路由上手动将 `scrollToTop` 设置为 `false`。

如果要覆盖 Nuxt 的默认滚动行为，请查看 [scrollBehavior 选项 ](https://v2.nuxt.com/docs/configuration-glossary/configuration-router#scrollbehavior)。



##### middleware

定义此页面的中间件。中间件将在渲染页面之前调用。

```js
export default {
  middleware: 'auth'
}
```



##### watchQuery

使用 `watchQuery` 键设置查询字符串的观察程序。如果定义的字符串发生变化，将调用所有组件方法（asyncData、fetch（context）、validate、layout 等）。默认情况下，监视处于禁用状态以提高性能。

```js
export default {
  watchQuery: ['page'],
  // watchQuery: true
}
```

**警告**： 2.12 中引入的新 `fetch` 钩子不受 `watchQuery` 的影响。



您还可以使用该函数 `watchQuery(newQuery, oldQuery)` 来拥有更精细的 watchers。

```js
export default {
  watchQuery(newQuery, oldQuery) {
    // 仅执行组件方法，如果旧查询字符串包含bar，并且新的查询字符串包含foo
    return newQuery.foo && oldQuery.bar
  }
}
```



##### key

与模板中 Vue 组件上可以作为虚拟 DOM 的提示的 `key` 属性相同，此属性允许从页面本身（而不是父组件）定义 key 值。

默认情况下，在 Nuxt 中，此值将为 `$route.path`，这意味着导航到不同的路由将确保创建干净的页面组件。逻辑上等同于：

```vue
<router-view :key="$route.path" />
```

该属性可以是 `String` 或将 route 作为第一个参数的 `Function`。



### 构建目录

`.nuxt` 目录就是所谓的 build 目录。默认情况下，它是动态生成和隐藏的。在该目录中，您可以找到使用 `nuxt dev` 时自动生成的文件，或者在使用 `nuxt build` 时找到您的构建工件。修改这些文件非常适合调试，但请记住，它们是生成的文件，一旦您再次运行 `dev` 或 `build` 命令，此处保存的任何内容都将重新生成。

`.nuxt` 目录不应提交到您的版本控制系统，并且应该通过 `.gitignore` 忽略它，因为它将在执行 `nuxt dev` 或 `nuxt build` 时自动生成。

`.nuxt` 文件夹是部署 SSR 应用程序所需文件的一部分。不过，部署静态 Nuxt 应用程序不需要它，因为我们使用 `dist` 文件夹来实现此目的。



默认情况下，许多工具都假定 `.nuxt` 是一个隐藏目录，因为它的名称以点开头。您可以使用 buildDir 选项来防止这种情况。如果你确实更改了名称，请记住将新名称添加到你的 `.gitignore` 文件中。

```js
export default {
  buildDir: 'nuxt-dist'
}
```



在 `.nuxt` 文件夹中：

* `router.js` 文件是 Nuxt 在将 `.vue` 文件放入 pages 文件夹时生成的路由文件。当你想查找为 vue-router 生成的路由并找出特定路由的名称时，你可以使用此文件进行调试。
* `router.scrollBehavior.js`，即您的 Router ScrollBehavior
* `/components` 文件夹包含您的所有 Nuxt 组件，例如 NuxtChild 和 NuxtLink。它还包含 nuxt-build-indicator，它是我们在构建应用程序时看到的页面，以及 nuxt-loading，它是当我们等待页面加载时看到的加载组件。您还可以在此处找到 nuxt-error 页面，其中包含 Nuxt 默认错误页面。
* `/mixins` 文件夹包含 Nuxt `$fetch` 方法所需的文件。
* `/views` 文件夹包含您的应用程序模板和服务器错误页面。
* `app.js` 是您的主要应用程序文件。
* `client.js` 文件是客户端发生的所有事情都需要的客户端文件。
* `server.js` 文件是在服务器上运行的所有代码
* `index.js` 文件引导您的应用程序。
* `loading.html` 是加载页面时使用的文件。
* middleware 文件是保存中间件的地方



### dist 目录

`dist` 文件夹是 distribution folder （分发文件夹） 的缩写，是在使用 `nuxt generate` 命令时动态生成的，包括生成的生产就绪 HTML 文件和资产，这些文件和资产是部署和运行静态生成的 Nuxt 应用程序所必需的。

#### dir 属性

dist 文件夹默认命名为 dist，但可以在 nuxt.config 文件中进行配置。

```js
generate: {
  dir: 'my-site'
}
```

如果你确实更改了你的 dist 文件夹，那么你需要将其添加到你的版本控制中，以便 git 会忽略它。



#### subFolders 属性

默认情况下，Nuxt 会将所有生成的页面放在一个文件夹中，但是如果需要，您可以通过修改 nuxt.config 并将 subFolders 更改为 false 来更改此设置。

```js
generate: {
  subFolders: false
}
```



#### fallback 属性

部署站点时，您需要确保正确设置了回退 HTML 路径。应将其设置为错误页面，以便通过 Nuxt 呈现未知路由。如果未设置，Nuxt 将使用默认值，即 200.html。

当运行单页应用程序时，使用 200.html 更有意义，因为它是唯一需要的文件，因为不会生成其他路由。

使用静态生成的页面时，建议对错误页面使用 404.html。

```js
export default {
  generate: {
    fallback: '404.html'
  }
}
```

根据您托管网站的位置，您可能必须使用 200.html 或 404.html。请咨询您的托管服务提供商。



#### exclude 属性

您可以使用 generate excludes 属性从生成页面中排除页面。它不会生成为静态页面，而是回退为单页应用程序页面，并且仅在客户端呈现。

```js
generate: {
  exclude: [/admin/]
}
```



### assets 目录

`assets` 目录包含未编译的资源，例如 Stylus 或 Sass 文件、图像或字体。



#### images

在你的 `vue` 模板中，如果你需要链接到你的 `assets` 目录，请使用 `~/assets/your_image.png` 并在 assets 前加上斜杠。

```vue
<template>
  <img src="~/assets/your_image.png" />
</template>
```

在你的 `css` 文件中，如果你需要引用你的 `assets` 目录，请使用 `~assets/your_image.png`（不带斜杠）

```css
background: url('~assets/banner.svg');
```

使用动态图像时，您需要使用 require

```vue
<img :src="require(`~/assets/img/${image}.jpg`)" />
```



#### fonts

您可以通过将本地字体添加到您的 assets 文件夹来使用它们。添加它们后，您可以使用 `@font-face` 通过 css 访问它们。

CSS 文件不会自动加载。使用 nuxt.config.js 中的 css 属性添加它们 。

```
-| assets
----| fonts
------| DMSans-Regular.ttf
------| DMSans-Bold.ttf
```

```css
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Bold.ttf') format('truetype');
}
```



#### Webpack assets

默认情况下，Nuxt 使用 webpack 的 vue-loader、file-loader 和 url-loader 来提供资源。您还可以将 static 目录用于不应通过 webpack 运行的资源。

[vue-loader ](http://vue-loader.vuejs.org/)使用 `css-loader` 和开箱即用的 Vue 模板编译器自动处理你的样式和模板文件。在此编译过程中，所有资产 URL（如 `<img src=“...”>`、`background： url（...）` 和 CSS `@import`）都被解析为模块依赖项。

例如，我们有这个文件树：

```
-| assets/
----| image.png
-| pages/
----| index.vue
```

如果你在 CSS 中使用 `url（'~assets/image.png'），`它将被转换为 `require（'~/assets/image.png'）。`

注意：在 CSS 文件中无法正确解析 `~/` 别名。您必须在 `url` CSS 引用中使用 `~assets`（**不带斜杠**），即 `background: url("~assets/banner.svg")`



如果你在 `pages/index.vue` 中引用了该图像：

```vue
<template>
  <img src="~/assets/image.png" />
</template>
```

它将被编译成：

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

因为 `.png` 不是 JavaScript 文件，所以 Nuxt 将 webpack 配置为使用 [file-loader ](https://github.com/webpack/file-loader)和 [url-loader ](https://github.com/webpack/url-loader)为你处理它们。



这些加载器的优点是：

`file-loader` 允许您指定复制和放置资源文件的位置，以及如何使用版本哈希对其进行命名以获得更好的缓存。在生产环境中，默认情况下，您将受益于长期缓存！

`url-loader` 允许您有条件地将文件内联为 base64 数据 URL（如果它们小于给定阈值）。这可以减少对普通文件的 HTTP 请求数。如果文件大于阈值，它会自动回退到 file-loader。

对于这两个 loader，默认配置为：

```js
// https://github.com/nuxt/nuxt/blob/2.x-dev/packages/webpack/src/config/base.js#L382-L411
{
  test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
  use: [{
    loader: 'url-loader',
    options: {
      esModule: false,
      limit: 1000, // 1kB
      name: 'img/[name].[contenthash:7].[ext]'
    }
  }]
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  use: [{
    loader: 'url-loader',
    options: {
       esModule: false,
       limit: 1000, // 1kB
       name: 'fonts/[name].[contenthash:7].[ext]'
    }
  }]
},
{
  test: /\.(webm|mp4|ogv)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      esModule: false,
      name: 'videos/[name].[contenthash:7].[ext]'
    }
  }]
}
```

这意味着每个小于 1 kB 的文件都将被内联为 base64 数据 URL。否则，图像/字体将被复制到其相应的文件夹（在 `.nuxt` 目录内），其名称包含版本哈希，以便更好地缓存。

使用 `nuxt` 启动应用程序时，`pages/index.vue` 中的模板：

```html
<template>
  <img src="~/assets/your_image.png" />
</template>
```

将转换为：

```vue
<img src="/_nuxt/img/your_image.0c61159.png" />
```

如果要更改 loader 配置，请使用 `build.extend` 。



#### 别名

默认情况下，源目录 （srcDir） 和根目录 （rootDir） 相同。您可以将别名 `~` 用于源目录。而不是编写像 `../assets/your_image.png` 中，您可以使用 `~/assets/your_image.png`。

两者都会达到相同的结果。

```vue
<template>
  <div>
    <img src="../assets/your_image.png" />
    <img src="~/assets/your_image.png" />
  </div>
</template>
```

建议使用 `~` 作为别名。`@` 仍受支持，但并非在所有情况下都有效，例如 CSS 中的背景图像。

您可以将别名 `~~` 或 `@@` 用于根目录。



### static 目录

`static` 目录直接映射到服务器根目录 ，并包含可能不会更改的文件。所有包含的文件都将由 Nuxt 自动提供，并可通过您的项目根 URL 访问。

```
/static/robots.txt 将在 http://localhost:3000/robots.txt
/static/favicon.ico 将在 http://localhost:3000/favicon.ico
```

此选项对 `robots.txt`、`sitemap.xml` 或 `CNAME` 等文件（这对 GitHub Pages 部署很重要）很有帮助。



如果不想使用 `assets` 目录中的 Webpack 资源，可以将图片添加到 static 目录下。然后，在代码中，您可以相对于根 （`/`） 引用这些文件：

```vue
<!-- static目录中的静态图像 -->
<img src="/my-image.png" />

<!-- 来自assets目录的WebPack Image -->
<img src="~/assets/my-image-2.png" />
```

Nuxt 不会更改此路径，因此如果您自定义 `router.base`，则需要确保手动将其添加到路径中。例如：

```vue
<img :src="`${yourPrefix}/my-image.png`" />
```



如果需要，您可以在 `nuxt.config.js` 文件中配置 `static/` 目录行为。

如果你将 Nuxt 部署到一个子文件夹，例如 `/blog/`，则默认情况下，路由器库将被添加到静态资源路径中。如果要禁用此行为，可以在 `nuxt.config.js` 中将 `static.prefix` 设置为 false。

```js
export default {
  static: {
    prefix: false
  }
}
```

默认值：`/blog/my-image.png`

禁用 `static.prefix` 时：`/my-image.png`



### store 目录

`store` 目录包含你的 Vuex Store 文件。Vuex Store 自带 Nuxt，但默认是禁用的。在此目录中创建 `index.js` 文件将启用 store。

使用 store 来管理 state 对于每个大型应用程序都很重要。这就是 Nuxt 在其核心中实现 Vuex 的原因。



#### 激活 store

Nuxt 将查找 `store` 目录。如果它包含的文件不是隐藏文件或 `README.md` 文件，则将激活 store。这意味着 Nuxt 将：

1. 导入 Vuex
2. 将 `store` 选项添加到根 Vue 实例中



默认情况下，严格模式在 dev 模式下启用，在 production 模式下关闭。要在 dev 中禁用严格模式，请按照 `store/index.js` 中的以下示例进行作：

```js
export const strict = false
```



#### Modules

`store` 目录中的每个 `.js` 文件都被转换为[一个指定命名的子模块 ](http://vuex.vuejs.org/en/modules.html)（`index` 是根模块）。你的 `state` 值应该始终是一个`函数`，以避免服务器端出现不需要的共享状态。

首先，将 state 导出为函数，并将 getter、mutation 和 actions 导出为对象。

```js
// store/index.js
export const state = () => ({
  counter: 0
})

export const getters = {
  getCounter(state) {
    return state.counter
  }
}

export const mutations = {
  increment(state, payload) {
    state.counter++
  }
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}
```

然后，再写一个 `store/todos.js` 文件：

```js
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
```



store 将按如下方式创建：

```js
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  mutations: {
    increment(state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      namespaced: true,
      state: () => ({
        list: []
      }),
      mutations: {
        add(state, { text }) {
          state.list.push({
            text,
            done: false
          })
        },
        remove(state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1)
        },
        toggle(state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```



在你的 `pages/todos.vue` 中，使用 `todos` 模块：

```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.text">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      // 模块名/mutations
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
```



module 方法也适用于顶级定义，而无需在 store 目录中实现子目录。

state 示例：您创建一个文件`store/state.js`并添加以下内容。

```js
export default () => ({
  counter: 0
})
```

相应的 getter 可以在 `store/getters.js`

```js
export default {
  getCounter(state) {
    return state.counter
  }
}
```

相应的 mutation 可以在 `store/mutations.js`

```js
export default {
  increment(state) {
    state.counter++
  }
}
```

相应的 actions 可以在 `store/actions.js`

```js
export default {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}
```



复杂的 store 设置文件/文件夹结构可能如下所示：

```
 store/
--| index.js
--| ui.js
--| shop/
----| cart/
------| actions.js
------| getters.js
------| mutations.js
------| state.js
----| products/
------| mutations.js
------| state.js
------| itemsGroup1/
--------| state.js
```



#### 使用 vue-cli 的 vuex

把 vue-cli 的 store 引入到 nuxt 项目中，修改 store 的返回：

```js
// 导入user等module

const store = ()=> new Vuex.Store({
	modules: {
		user,
		order
	}
})

export default store;
```



####  store 中的插件

你可以通过将其他插件放入 `store/index.js` 文件来将它们添加到 store 中：

```js
import myPlugin from 'myPlugin'

export const plugins = [myPlugin]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```



#### nuxtServerInit 

如果在 store 中定义了 `nuxtServerInit` action，并且模式是 `universal` （通用）的，Nuxt 将使用上下文调用它（仅从服务器端调用）。当我们在服务器上有一些数据想要直接提供给客户端时，它很有用。

例如，假设我们在服务器端有会话，我们可以通过 `req.session.user` 访问连接的用户。要将经过身份验证的用户添加到我们的 store，我们将 `store/index.js` 更新为以下内容：

```js
actions: {
  // 参数1：vuex上下文；参数2：nuxt上下文
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

只有主模块 `store/index.js` 会收到此 action。您需要从那里链接您的 module action。



`content` 作为 `asyncData` 方法中的第二个参数提供给 `nuxtServerInit`。

如果运行 `nuxt generate`，则将为每个生成的动态路由执行 `nuxtServerInit`。

异步 `nuxtServerInit` action 必须返回 Promise 或利用 async/await 来允许 nuxt 服务器等待它们。

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```



#### cookie-universal-nuxt

可以使用 `cookie-universal-nuxt` 在客户端和服务器端 nuxt 应用程序中设置、获取和删除 cookie。

文档：https://www.npmjs.com/package/cookie-universal-nuxt

服务端不能使用 localStorage 和 cookie 的解决方案：

```sh
npm i cookie-universal-nuxt -S
```

```js
export default {
	modules: ['cookie-universal-nuxt']
}
```

```js
this.$cookies.set('token', '123')
this.$cookies.get('token')
```



### plugins 目录

`plugins` 目录包含要在实例化根 Vue.js Application 之前运行的 Javascript 插件。

在初始化主应用程序之前，将导入 `plugins` 属性中定义的所有路径。

这是添加 Vue 插件和注入函数或常量的地方。每次你需要使用 `Vue.use()` 时，你应该在 `plugins/` 中创建一个文件，并在 `nuxt.config.js` 中添加其 `plugins` 的路径。



####  外部软件包

您可能希望在应用程序中使用外部包/模块（一个很好的例子是 [axios ](https://axios.nuxtjs.org/)）来向服务器和客户端发出 HTTP 请求。

首先，通过 npm 或 Yarn 安装它。

```sh
npm install @nuxtjs/axios
```



例如，您可以配置 axios 拦截器，以对整个应用程序中的 API 调用可能出现的错误做出反应。在此示例中，当我们从 API 收到 500 status 错误时，我们将用户重定向到名为 sorry 的自定义错误页面。

```js
export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
```

最后但同样重要的一点是，将模块和新创建的插件添加到项目配置中。

```js
// nuxt.config.js
module.exports = {
  modules: ['@nuxtjs/axios'],
  plugins: ['~/plugins/axios.js']
}
```

然后我们可以直接在你的页面组件中使用它：

```vue
<template>
  <h1>{{ post.title }}</h1>
</template>

<script>
export default {
    async asyncData ({ $axios, params }) {
      const  post  = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
}
</script>
```



另一种在不安装模块的情况下使用 `axios` 的方法是在 `<script>` 标签中直接导入 `axios`。

```vue
<script>
import axios from 'axios'

export default {
    async asyncData ({ params }) {
      const { data: post }  = await axios.get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
}
</script>
```

如果你收到 *Cannot use import statement outside a module* 错误，你可能需要将你的包添加到 `nuxt.config.js` for webpack loader 中的 `build` > `transpile` 选项中，以使你的插件可用。

```js
build: {
  // 您可以在此处扩展 webpack 配置
  transpile: ['npm-package-name'],
},
```



#### Vue plugins

如果我们想使用 Vue 插件，比如 [v-tooltip ](https://akryum.github.io/v-tooltip)在你的应用程序中显示工具提示，我们需要在启动应用程序之前设置插件。

```sh
npm install v-tooltip
```

然后我们创建文件 `plugins/vue-tooltip.js`

```js
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
```

然后我们在 `nuxt.config.js` 的 `plugins` 键中添加文件路径。plugins 属性允许您轻松地将Vue.js插件添加到主应用程序中。在初始化主应用程序之前，将导入 `plugins` 属性中定义的所有路径。

```js
export default {
  plugins: ['~/plugins/vue-tooltip.js']
}
```



如果插件位于 `node_modules` 中并导出 ES6 模块，则可能需要将其添加到 `transpile` 构建选项中

```js
module.exports = {
  build: {
    transpile: ['vue-tooltip']
  }
}
```



#### 仅限客户端或服务器端

某些插件可能仅在浏览器中工作，因为它们缺乏 SSR 支持。



**名称约定插件：**

如果假定插件仅在客户端或服务器端运行，则可以将 `.client.js` 或 `.server.js` 应用为插件文件的扩展。该文件将仅自动包含在相应的 （客户端或服务器端） 中。

```js
export default {
  plugins: [
    '~/plugins/foo.client.js', // only in client side
    '~/plugins/bar.server.js', // only in server side
    '~/plugins/baz.js' // both client & server
  ]
}
```



 **对象语法：**

你也可以在`plugins`中使用带有 `mode` 属性（`'client'` 或 `'server'`）的对象语法。

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' }, // only on client side
    { src: '~/plugins/server-only.js', mode: 'server' } // only on server side
  ]
}
```



#### 在 `$root` 和上下文中注入

有时，您希望在整个应用程序中提供函数或值。你可以将这些变量注入到 Vue 实例（客户端）、上下文（服务器端）甚至 Vuex store 中。惯例是给这些函数加上 `$` 前缀。

Nuxt 为你提供了一个 `inject(key， value)` 方法来轻松做到这一点。Inject 在导出函数时作为第二个参数给出。`$` 将自动添加到键的前面。

重要的是要知道，在任何 Vue 实例生命周期中，只有 `beforeCreate` 和 `created` 钩子在客户端和服务器端被同时调用。所有其他钩子仅从客户端调用。

```js
// plugins/hello.js
export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('hello', msg => console.log(`Hello ${msg}!`))
}
```

```js
// nuxt.config.js
export default {
  plugins: ['~/plugins/hello.js']
}
```

现在，可以在 pages、components、plugins、store actions 中通过上下文访问 `$hello` 服务。

```js
// example-component.vue
export default {
  mounted() {
    this.$hello('mounted')
    // will console.log 'Hello mounted!'
  },
  asyncData({ app, $hello }) {
    $hello('asyncData')
    // If using Nuxt <= 2.12, use 👇
    app.$hello('asyncData')
  }
}
```

```js
// store/index.js
export const state = () => ({
  someValue: ''
})

export const actions = {
  setSomeValueToWhatever({ commit }) {
    this.$hello('store action')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

注意：不要使用`Vue.use()`、`Vue.component()`，也不要对插件导出的函数**内的**Vue 原型或全局 Vue 对象进行更改。（这会导致服务器端内存泄漏。）



#### extendPlugins 属性

你可能想要扩展插件或更改 Nuxt 创建的插件顺序。此函数接受一个 [plugin ](https://v2.nuxt.com/docs/configuration-glossary/configuration-plugins)对象数组，并应返回一个 plugin 对象数组。

更改插件顺序的示例 nuxt.config.js：

```js
export default {
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(
      ({ src }) => src === '~/plugins/shouldBeFirst.js'
    )
    const shouldBeFirstPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    return plugins
  }
}
```



#### 全局 mixin 

全局 mixin 可以很容易地添加 Nuxt 插件，但如果处理不当，可能会导致麻烦和内存泄漏。每当向应用程序添加全局 mixin 时，都应该使用标志以避免多次注册它：

```js
// plugins/my-mixin-plugin.js
import Vue from "vue"

// 一定要选择一个独特的名称标志
// 因此不会与其他 mixin 冲突。
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({ ... }) // 然后设置您的 mixin
}
```

```js
export default {
  plugins: [
    '~/plugins/mixins'
  ],
}
```

```js
// //plugins/mixins.js
import Vue from 'vue'
let show = () => console.log('show')
Vue.prototype.$show = show; // 服务端钩子内部不可以使用，this不会执行vue实例
```



#### element-ui

1. 安装依赖

   ```sh
   npm i element-ui -S
   ```

   

2. 创建文件 `/plugins/element-ui.js`

   ```js
   import Vue from 'vue'
   
   // 整体引入
   import ElementUI from 'element-ui';
   Vue.use(ElementUI)
   
   // 按需引入
   import { Button } from 'element-ui';
   Vue.use(Button)
   ```

   

3. nuxt.config.js 配置

   ```js
   export default {
   	// 引入全局css文件
     css: [
       'element-ui/lib/theme-chalk/index.css'
     ],
   
   	// 配置插件
     plugins: [
       {
         src: '~/plugins/element-ui',
         ssr: true,  //不支持ssr的插件只会在客户端运行，不要给true
       }
     ],
   
     build: {
       transpile: [/^element-ui/],
     },
   }
   ```

   

4. 组件中使用

   ```vue
   <el-button type="primary">主要按钮</el-button>
   ```

   



### middleware 中间件目录

`middleware` 目录包含您的应用程序中间件。中间件允许您定义自定义函数，这些函数可以在渲染一个页面或一组页面（布局）之前运行。



共享中间件应放在 `middleware/` 目录中。filename 将是中间件的名称（`middleware/auth.js` 将是 `auth` 中间件）。您还可以直接使用函数定义特定于页面的中间件，请参阅 [anonymous middleware ](https://v2.nuxt.com/examples/middlewares/anonymous)。



中间件接收上下文作为第一个参数。`middleware/user-agent.js`

```js
export default function (context) {
  // 在上下文中添加 userAgent 属性
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```



在通用模式下，中间件将在服务器端（在对 Nuxt 应用程序的第一个请求时，例如，当直接访问应用程序或刷新页面时）和在客户端导航到更多路由时调用一次。使用 `ssr： false`，在这两种情况下都会在客户端调用中间件。

中间件将按以下顺序串联执行：

1. `nuxt.config.js`（按文件中的顺序）
2. Matched layouts  匹配的布局
3. Matched pages  匹配的网页



#### router 中间件

中间件可以是异步的。为此，请返回 `Promise` 或使用 async/await。

```js
// middleware/stats.js
import http from 'http'

export default function ({ route }) {
  return http.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

然后，在您的 `nuxt.config.js` 中使用 `router.middleware` 键。

```js
export default {
  router: {
    middleware: 'stats'
  }
}
```

现在，每次路由更改都会调用 `stats` 中间件。

您也可以将中间件（甚至多个）添加到特定的布局或页面。`pages/index.vue 或者 layouts/default.vue`

```js
export default {
  middleware: ['auth', 'stats']
}
```



#### 命名中间件

你可以通过在 `middleware/` 目录中创建一个文件来创建命名中间件，文件名将是中间件名称。

```js
// middleware/authenticated.js
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```vue
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```



####  匿名中间件

如果你只需要为特定页面使用 middleware，你可以直接为它使用一个函数（或一个函数数组）：

```vue
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```



### Modules 目录

Nuxt 提供了一个更高阶的模块系统，可以扩展内核。模块是在启动 Nuxt 时按顺序调用的函数。

Nuxt 团队和社区创建的 Nuxt Modules 列表：https://nuxt.com/modules



在使用 Nuxt 开发生产级应用程序时，您可能会发现该框架的核心功能不够用。Nuxt 可以通过配置选项和插件进行扩展，但在多个项目中维护这些自定义内容非常繁琐、重复且耗时。另一方面，开箱即用地支持每个项目的需求会使 Nuxt 非常复杂且难以使用。

这就是 Nuxt 提供更高阶模块系统的原因之一，这使得扩展内核成为可能。模块是在启动 Nuxt 时按顺序调用的函数。框架会等待每个模块完成，然后再继续。通过这种方式，模块几乎可以自定义项目的任何方面。由于 Nuxt 的模块化设计（基于 webpack 的 [Tapable](https://github.com/webpack/tapable)），模块可以轻松地为某些入口点（如构建器初始化）注册钩子。模块还可以覆盖模板、配置 webpack 加载器、添加 CSS 库以及执行许多其他有用的任务。

最重要的是，Nuxt 模块可以合并到 npm 包中。这使得跨项目重用并与社区共享成为可能，从而有助于创建高质量附加组件的生态系统。



#### modules 属性

模块是 Nuxt 扩展，可以扩展框架的核心功能并添加无限的集成。安装模块后，您可以将它们添加到 modules 属性下的 nuxt.config.js 文件中。

```js
export default {
  modules: [
    // 使用package名称
    '@nuxtjs/axios',

    // 相对于您的项目 srcDir
    '~/modules/awesome.js',

    // 提供选择
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // 内联定义
    function () {}
  ]
}
```

Nuxt 尝试使用 node require path（在 `node_modules` 中）解析 modules 数组中的每个项目，如果使用 `@` 别名，则从项目 `srcDir` 解析。

模块是按顺序执行的，因此顺序很重要。

模块应该导出一个函数来增强构建/运行时，并选择性地返回一个 promise，直到它们的工作完成。请注意，它们是在运行时导入的，因此如果使用现代 ES6 功能，它们应该已经被转译了。



#### 编写自己的模块

模块是函数。它们可以打包为 npm 模块，也可以直接包含在您的项目源代码中。

```js
export default {
  exampleMsg: 'hello',
  modules: [
    // 简单用法
    '~/modules/example',
    // 直接传递选项
    ['~/modules/example', { token: '123' }]
  ]
}
```

```js
// modules/example.js
export default function ExampleModule(moduleOptions) {
  console.log(moduleOptions.token) // '123'
  console.log(this.options.exampleMsg) // 'hello'

  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt is ready')
  })
}

// 如果以 npm 包的形式发布模块，则必填
module.exports.meta = require('./package.json')
```



##### moduleOptions

`moduleOptions`：这是用户使用 `modules` 数组传递的对象。我们可以使用它来自定义它的行为。

有时，如果我们可以在 `nuxt.config.js` 中注册模块时使用顶级选项会更方便。这允许我们组合多个期权来源。

```js
export default {
  modules: [['@nuxtjs/axios', { anotherOption: true }]],

  // axios 模块通过使用 `this.options.axios` 得到这一点
  axios: {
    option1,
    option2
  }
}
```



##### this.options

`this.options`： 您可以使用此引用直接访问 Nuxt 选项。这是用户`nuxt.config.js`的内容，并为其分配了所有默认选项。它可以用于模块之间的共享选项。

```js
export default function (moduleOptions) {
  // options 将包含option1，option2和另一个选项
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```



如果您的模块将提供 CSS 库，请确保检查用户是否已包含该库以避免重复，并添加一个选项以在模块中禁用 CSS 库。

```js
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // 添加字体
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```



我们可以注册 webpack 插件，以便在构建过程中发出资源。

```js
export default function (moduleOptions) {
    const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

    this.options.build.plugins.push({
        apply(compiler) {
            compiler.hooks.emit.tap('info-plugin', (compilation) => {
                compilation.assets['info.txt'] = {
                    source: () => info,
                    size: () => info.length
                }
            })
        }
    })
}
```



##### this.nuxt

`this`：模块的上下文。所有模块都将在 ModuleContainer 实例的上下文中调用。

`this.nuxt`：这是对当前 Nuxt 实例的引用。我们可以在某些生命周期事件上注册钩子。

* Ready ： Nuxt 已准备好工作（ModuleContainer 和 Renderer 准备就绪）。
* Error：调用 hook 时出现未处理的错误。
* Close：Nuxt 实例正在正常关闭。
* Listen：Nuxt 内部服务器开始监听。（使用 nuxt start 或 nuxt dev）



```js
nuxt.hook('ready', async nuxt => {

})

nuxt.hook('error', async error => {

})

nuxt.hook('close', async nuxt => {

})

nuxt.hook('listen', async (server, { host, port }) => {

})
```



##### 在特定 hook 上运行任务

你的模块可能只需要在特定条件下做一些事情，而不仅仅是在 Nuxt 初始化期间。我们可以使用强大的 Nuxt 钩子来对特定事件执行任务（基于 [Hookable](https://github.com/nuxt-contrib/hookable)）。如果函数返回 Promise 或定义为 async，Nuxt 将等待你的函数。

```js
// modules/myModule.js
export default function myModule() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // 当所有模块加载完毕后，将调用该函数
  })

  this.nuxt.hook('render:before', renderer => {
    // 在创建渲染器后调用
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // 在编译器（默认值：webpack）启动前调用
  })

  this.nuxt.hook('generate:before', async generator => {
    // 这将在 Nuxt 生成页面之前调用
  })
}
```



#####  提供插件

模块在添加时提供一个或多个插件是很常见的。例如，[bootstrap-vue ](https://bootstrap-vue.js.org/)模块需要将自己注册到 Vue 中。在这种情况下，我们可以使用 `this.addPlugin` 帮助程序。

```js
// plugin.js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

```js
// module.js
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // 注册 plugin.js 模板
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

**注意：**模块注入的任何插件都会被添加到插件列表的开头。您的选项是：

* 手动将插件添加到插件列表 （ `this.nuxt.options.plugins.push(...` ） 的末尾
* 如果模块依赖于另一个模块，则反转模块的顺序



##### 模板插件

已注册的模板和插件可以利用 [lodash 模板](https://lodash.com/docs/4.17.4#template)有条件地更改已注册的插件输出。

```js
// plugin.js
// 设置Google Analytics（分析）UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// 仅开发代码
<% } %>
```

```js
// module.js
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // 注册 plugin.js 模板
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // 将插件复制到项目时，Nuxt 会用 `123` 替换 `options.ua
      ua: 123,

      // 带有开发条件的部分将从生产版本的插件代码中删除
      debug: this.options.dev
    }
  })
}
```



##### 注册自定义 webpack 加载程序

我们可以在 `nuxt.config.js` 中使用 `this.extendBuild` 执行与 `build.extend` 相同的操作。

```js
// module.js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // 自定义已有的 loaders
      // 有关 Nuxt 内部结构，请参阅源代码：
      // https://github.com/nuxt/nuxt/blob/2.x-dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```



#### Async Modules   异步模块

并非所有模块都会同步执行所有操作。例如，你可能想开发一个模块，它需要获取一些 API 或进行异步操作。为此，Nuxt 支持异步模块，这些模块可以返回 Promise 或调用回调。

使用 async/await：

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // 您可以使用 async/await 在此处执行异步工作
  const pages = await fse.readJson('./pages.json')
}
```



返回 Promise：

```js
export default function asyncModule($http) {
  return $http
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Do something by extending Nuxt routes
    })
}
```



#### 发布模块

`module.exports.meta`：如果要将模块发布为 npm 包，则需要此行。Nuxt 内部使用 meta 来更好地处理您的包。

```js
// modules/myModule.js
module.exports.meta = require('./package.json')
```



#### buildModules 构建模块

某些模块仅在开发和构建时导入。使用 `buildModules` 有助于加快生产启动速度，并显著减小用于生产部署的 `node_modules` 的大小。请参阅每个模块的文档，看看是否建议使用 `modules` 或 `buildModules`。

用法的区别是：

* 不要添加到 `nuxt.config.js` 中的`modules`，使用 `buildModules`

  ```js
  export default {
    buildModules: ['@nuxtjs/eslint-module']
  }
  ```

  

* 不要添加到 `package.json` 内部的`依赖项`，使用 `devDependencies`

  ```
  npm install --save-dev @nuxtjs/eslint-module
  ```

  如果您是模块作者，强烈建议用户将您的包安装为 `devDependency`，并使用 `buildModules` 而不是 `modules` 进行`nuxt.config.js`。



你的模块是 `buildModule`，除非：

* 它提供了一个 serverMiddleware
* 它必须注册一个 Node.js 运行时钩子（如 sentry）
* 它影响了 vue-renderer 的行为或使用来自 `server：` 或 `vue-renderer：` 命名空间的钩子
* 超出 webpack 范围的任何其他内容（提示：插件和模板已编译并在 webpack 范围内）



#### modulesDir

定义 Nuxt 应用程序的 modules 目录。

modulesDir 属性用于设置用于路径解析的 modules 目录。例如：Webpack 的 resolveLoading、nodeExternals 和 postcss。配置路径是相对于 `options.rootDir` 的（默认：`process.cwd()` ）

如果您的项目组织为 Yarn 工作区样式的 mono-repository，则可能需要设置此字段。

```js
export default {
  modulesDir: ['../../node_modules']
}
```



#### 开源库

* [cookie-universal-nuxt](https://github.com/microcipcip/cookie-universal) ：在客户端和服务器端 nuxt 应用程序中设置、获取和删除 cookie。



### content 目录

使用 `@nuxt/content` 模块增强您的 Nuxt 应用程序，您可以在其中写入 `content/` 目录并通过类似 MongoDB 的 API 获取 Markdown、JSON、YAML 和 CSV 文件，充当**基于 Git 的无头 CMS**。



#### 开发中的热重载

在开发中，内容模块（content module）的热重载速度非常快，因为当你对 markdown 文件进行更改时，不必通过 webpack。您还可以监听 `content：update` 事件并创建一个插件，以便每次更新 content 目录中的文件时，它都会调度一个 fetchCategories 方法。



#### `<nuxt-content>` 显示内容

可以直接在模板中使用 `<nuxt-content>` 组件来显示页面正文。

```vue
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```



#### 设置内容样式

根据你用来设计应用程序的内容，你可能需要编写一些样式来正确显示 Markdown。

`<nuxt-content>` 组件会自动添加一个 `.nuxt-content` 类，你可以用它来自定义你的样式。

```html
<style>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
</style>
```



#### 处理 Markdown、CSV、YAML、JSON

此模块将您的 `.md` 文件转换为 JSON AST 树结构，存储在 body 变量中。您还可以将 YAML front matter 块添加到您的 markdown 文件中，或者将注入到文档中的 `.yaml` 文件。您还可以添加 json/json5 文件，该文件也可以注入到文档中。你可以使用 `.csv` 文件，其中的 rows 将被分配给 body 变量。

```
---
title: My first Blog Post
description: Learning how to use @nuxt/content to create a blog
---
```



#### Markdown 中的 Vue 组件

可以直接在 Markdown 文件中使用 Vue 组件。但是，您需要将组件用作 kebab 大小写，并且不能使用自闭合标签。

```vue
<template>
  <div class="p-4 mb-4 text-white bg-blue-500">
    <p><slot name="info-box">default</slot></p>
  </div>
</template>
```

```markdown
<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>
```



#### `$content()` 完全可搜索的 API

您可以使用 `$content()` 轻松列出、过滤和搜索您的内容。

```vue
<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content('articles', params.slug)
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
```



#### 上一篇文章和下一篇文章

content 模块包括一个 `.surround（slug），`以便你轻松获取上一篇文章和下一篇文章。

```js
async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  },
```

```vue
<prev-next :prev="prev" :next="next" />
```



#### 全文搜索

内容模块带有全文搜索，因此您可以轻松地搜索 Markdown 文件，而无需安装任何内容。

```vue
<script>
  export default {
    data() {
      return {
        searchQuery: '',
        articles: []
      }
    },
    watch: {
      async searchQuery(searchQuery) {
        if (!searchQuery) {
          this.articles = []
          return
        }
        this.articles = await this.$content('articles')
          .limit(6)
          .search(searchQuery)
          .fetch()
      }
    }
  }
</script>
```



#### 语法高亮显示

此模块自动包装代码块并应用 [Prism ](https://prismjs.com/)类。您还可以添加不同的 Prism 主题或完全禁用它。

```sh
npm install prism-themes
```



`nuxt.config.js`

```js
content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-oceanic.css'
    }
  }
}
```



#### 扩展 Markdown 解析

最初 markdown 不支持高亮代码块内的行或文件名。content 模块允许使用自己的自定义语法。行号被添加到 data-line 属性中的 `pre` 标签中，文件名将被转换为具有 `filename` 类的 `span`，因此您可以设置它的样式。



#### 目录生成

toc（Table of Contents） 数组属性将被注入到你的文档中，列出所有标题及其标题和 ID，以便你可以链接到它们。

```vue
<nav>
  <ul>
    <li v-for="link of article.toc" :key="link.id">
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</nav>
```



#### 强大的查询构建器 API（类似于 MongoDB）

内容模块附带一个强大的查询生成器 API，类似于 MongoDB，它允许您轻松查看每个目录的 JSON。 `http://localhost:3000/_content/` 终端节点可通过 GET 和 POST 请求访问，因此您可以使用查询参数。

```
http://localhost:3000/_content/articles?only=title&only=description&limit=10
```



#### 使用钩子扩展

你可以使用 hook 来扩展模块，以便在存储文档之前将数据添加到文档中。



#### 与 @nuxtjs/feed 集成

对于文章，内容可用于使用 [@nuxtjs/feed ](https://www.npmjs.com/package/@nuxtjs/feed)模块生成新闻源。



#### 支持静态站点生成

content 模块使用 `nuxt generate` 进行静态站点生成。由于 nuxt crawler 功能，所有路由都将自动生成。



## 布局

当您想要更改 Nuxt 应用的外观和感觉时，布局会非常有帮助。例如，您想要添加侧边栏或为移动设备和桌面设备设置不同的布局。

注意：确保在创建布局时添加 `<Nuxt/>` 组件，以实际包含页面组件。



```
layouts 目录

/layouts
	default.vue
	blog.vue
	error.vue
```



### 默认布局

你可以通过在 layouts 目录中添加 `default.vue` 文件来定义默认布局。这将用于所有未指定布局的页面。布局中唯一需要包含的是 `<Nuxt />` 组件，该组件用于呈现页面组件。

```vue
<template>
  <div>
    <h1>default layout</h1>

    <!-- 需要在布局中包含 <Nuxt /> 渲染页面组件 -->
    <Nuxt />
  </div>
</template>
```



### 自定义布局

layouts 目录中的每个文件（顶级）都将创建一个自定义布局，可通过页面组件中的 `layout` 属性进行访问。

您可以通过将 `.vue` 文件添加到 layouts 目录来创建自定义布局。要使用自定义布局，您需要在要使用该布局的页面组件中设置 `layout` 属性。该值将是您创建的自定义布局的名称。

```vue
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```



然后，在希望使用该布局的页面中使用值为 'blog' 的 layout 属性：

```vue
<template>
  <div>about</div>
</template>

<script>
export default {
  layout: 'blog',
  // 或者
  layout (context) {
    return 'blog'
  }
}
</script>
```

如果你没有向页面添加布局属性，例如 `layout: 'blog'`，那么将使用 `default.vue` 布局。



### 错误页面

错误页面是一个页面组件，在发生错误时始终显示（服务器端渲染时不会发生）。

可以通过添加 `layouts/error.vue` 文件来自定义错误页面。尽管此文件位于 `layouts` 文件夹中，但应将其视为页面。

此布局很特殊，因为您不应在其模板中包含 `<Nuxt/>` 组件。您必须将此布局视为发生错误（`404`、`500` 等）时显示的组件。与其他页面组件类似，您也可以以通常的方式为错误页面设置自定义布局。



```vue
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
  // 可以为错误页面设置自定义布局
  export default {
    props: ['error'],
  }
</script>
```



## 生命周期

Nuxt 生命周期描述了构建阶段之后发生的情况，此时您的应用程序被捆绑、分块和最小化。此阶段之后发生的情况取决于您是否启用了服务器端渲染。如果启用了，则进一步取决于您选择的服务器端渲染类型：动态 SSR ( `nuxt start`) 或静态站点生成（`nuxt generate`）。



### 服务器

对于SSR，将对您应用的每个初始请求执行这些步骤。

* 服务器启动 （`nuxt start`）
  * 使用静态站点生成时，服务器步骤仅在构建时执行，但对将生成的每个页面执行一次
* 生成过程开始 （`nuxt generate`）
*  Nuxt 钩子
* serverMiddleware 服务器中间件
* 服务器端 Nuxt 插件
  * 按照 nuxt.config.js 中定义的顺序
* nuxtServerInit
  * 仅在服务器端调用的 Vuex 操作，用于预填充 store
  * 第一个参数是 Vuex 上下文，第二个参数是 Nuxt 上下文
    * 从这里 dispatch 其他 action → 服务器端后续 store action 的 “entry point”
  * 只能在 `store/index.js` 中定义
* Middleware  中间件
  * Global middleware  全局中间件
  * Layout middleware  布局中间件
  * Route middleware  路由中间件
* asyncData  异步数据
* beforeCreate （Vue 生命周期方法）
* created （Vue 生命周期方法）
* 新的 fetch （从上到下，兄弟 = 并行）
* 状态的序列化 （`render：routeContext` Nuxt hook）
* HTML 渲染发生 （`render：route` Nuxt 钩子）
* `render:routeDone` HTML 发送到浏览器后执行的钩子
* `generate:before` Nuxt 钩子
* 生成 HTML 文件
  * 完全静态生成
  * `generate:page`（HTML 可编辑）
  * `generate:routeCreated`（路由已生成）
* `generate：done` 当所有 HTML 文件都已生成时



### 客户端

无论你选择哪种 Nuxt 模式，这部分生命周期都会在浏览器中完全执行。

* 接收 HTML
* 加载资源（例如 JavaScript）
* 客户端 Nuxt 插件
  * 按照 nuxt.config.js 中定义的顺序
* Vue Hyration（Vue 水合）
* 中间件
  * Global middleware  全局中间件
  * Layout middleware  布局中间件
  * Route middleware  路由中间件
* asyncData  异步数据（阻塞）
* beforeCreate （Vue 生命周期方法）
* created （Vue 生命周期方法）
* 新的 fetch （从上到下， 兄弟 = 并行） （非阻塞）
* beforeMount （Vue 生命周期方法）
* mounted （Vue 生命周期方法）



### 使用 NuxtLink 组件导航

与客户端部分相同，一切都在浏览器中发生，但仅在通过 `<NuxtLink>` 导航时发生。此外，在完成所有阻塞任务之前，不会显示任何页面内容。

* 中间件 （阻塞）
  * Global middleware  全局中间件
  * Layout middleware  布局中间件
  * Route middleware  路由中间件
* asyncData（阻塞）或完全静态有效负载加载
* beforeCreate & created （Vue 生命周期方法）
* fetch （非阻塞）
* beforeMount 和 mounted



### 顺序

* nuxtServerInit：适用场景是对 vuex store 操作。
* middleware：执行顺序是：nuxt.config.js router.middleware → 匹配布局 middleware → 匹配页面/子页面 middleware。
* validate：参数校验。校验失败则自动跳转到错误页面。
* asyncData() & fetch()
* Render
* vue 生命周期
  * 服务端和客户端共有：beforeCreate、created
  * 客户端独有：beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed



```js
// /store/index.js
export const actions = {
  nuxtServerInit(store, context) {
    // 初始化东西到store中
    console.log('nuxtServerInit')
  }
}
```

```js
// nuxt.config.js
export default {
  router: {
    // 配置路由中间件
    middleware: 'auth'
  },
}
```

```js
// /middleware/auth.js
export default ({ store, route, redirect, params, query, req, res }) => {
  // context 上下文
  // 全局守卫业务
  console.log('middleware')
}
```

```vue
<script>
// /layout/default.vue
export default {
  // 定义布局层级中间件
  // middleware: "auth",
  middleware(context) {
    console.log("middleware layout");
  },
};
</script>
```

```vue
<script>
// /pages/index.vue
export default {
  // 定义页面层级中间件
  // middleware: "auth",
  middleware(context) {
    console.log("middleware pages");
  },

  // 参数校验。校验失败则自动跳转到错误页面
  validate({ params, query }) {
    console.log("validate");
    // return /^\d+$/.test(query.id);	// 校验id是否为数字
    return true;
  },

  fetch(context) {
    // 异步业务逻辑，读取服务器端数据提交给vuex
    console.log("fetch");
  },

  asyncData(context) {
    // 异步业务逻辑，读取服务器端数据返回给组件
    console.log("asyncData");
    return {
      b: 5,
    };
  },

  // SSR && CSR
  beforeCreate() {
    // SRR 中不能访问 window、document
    console.log("beforeCreate");
  },

  created() {
    console.log("created");
  },

  // CSR
  beforeMount() {
    console.log("beforeMount");
  },

  mounted() {
    console.log("mounted");
  },

  beforeUpdate() {
    console.log("beforeUpdate");
  },

  updated() {
    console.log("updated");
  },

  beforeDestroy() {
    console.log("beforeDestroy");
  },

  destroyed() {
    console.log("destroyed");
  },

  activated() {
    console.log("activated");
  },

  deactivated() {
    console.log("deactivated");
  },

  data: () => ({
    a: 1,
    b: 2,
  }),
};
</script>
```



## Context 上下文

context 上下文对象在特定的 Nuxt 函数中可用，例如 asyncData、fetch、plugins、middleware 和 nuxtServerInit。它向应用程序提供有关当前请求的附加信息（通常是可选信息）。

首先，上下文用于提供对 Nuxt 应用程序其他部分的访问，例如 Vuex store 或底层 `connect` 实例。因此，我们在服务器端的上下文中有 `req` 和 `res` 对象可用，并且 `store` 始终可用。但随着时间的推移，上下文扩展了许多其他有用的变量和快捷方式。现在我们可以在`开发`模式下访问 HMR（热模块重新加载/替换）功能、当前 `route` 、页面 `params` 和 `query`，以及通过上下文访问环境变量的选项。此外，模块函数和帮助程序可以通过上下文公开，以便在客户端和服务器端都可用。



通用属性：

* app：包含所有插件的根 Vue 实例选项。例如，在使用 `i18n` 时，您可以通过 `context.app.i18n` 访问 `$i 18n`。

* store：Vuex Store 实例。**仅当设置了vuex store时可用**。

* route：查看 Router 路由实例。

* params：`route.params` 的别名。

* query：`route.query` 的别名。

* env：在 `nuxt.config.js` 中设置的环境变量，请参阅 [env API ](https://v2.nuxt.com/docs/configuration-glossary/configuration-env)。

* isDev：布尔值。让您知道您是否处于开发模式，这对于在生产中缓存某些数据非常有用。

* isHMR：布尔值。让你知道方法/中间件是否是从 webpack 热模块替换中调用的（仅在开发模式下的客户端为 true）。

* redirect：使用此方法将用户重定向到另一条路由，状态码在服务器端使用，默认为 `302`。 `redirect([status,] path [, query])` 。

  ```js
  redirect(302, '/login')
  redirect({ name: 'slug', params: { slug: mySlug } })
  redirect('https://vuejs.org')
  ```

* error：使用此方法显示错误页面： `error(params)`。`params` 应具有属性 `statusCode` 和 `message`。

* `$config` ：实际的[运行时配置 ](https://v2.nuxt.com/docs/configuration-glossary/configuration-runtime-config)。



服务端可用：

* req：来自 Node.js 服务器的请求。如果 Nuxt 用作中间件，则请求对象可能会有所不同，具体取决于您使用的框架。

* res：来自 Node.js 服务器的响应。如果 Nuxt 用作中间件，则 res 对象可能会有所不同，具体取决于您使用的框架。

* beforeNuxtRender：使用此方法更新在客户端渲染`__NUXT__`变量，`fn`（可以是异步的）使用 `{ Components， nuxtState }` 调用。

* beforeSerialize：使用此方法更新在客户端渲染`__NUXT__`变量，使用 `nuxtState` 作为参数调用 `fn`（必须是同步的）。这个方法在 Vue SSR 的 `rendered` 方法中被调用，允许你在组件中使用它。

  ```js
  // 注意：这种用法是高级的，主要用于 Nuxt 模块。
  export default {
    // Using asyncData
    asyncData({ beforeSerialize }) {
      if (process.server) {
        beforeSerialize(nuxtState => {
          nuxtState.hello = 'world'
        })
      }
    },
    // Using fetch
    fetch() {
      if (process.server) {
        this.$root.context.beforeSerialize(nuxtState => {
          nuxtState.hello = 'world'
        })
      }
    }
  }
  ```

  



客户端可用：

* from：导航route的起点。
* nuxtState：Nuxt 状态，对于使用 `beforeNuxtRender` 在激活之前在客户端获取 nuxt 状态的插件很有用。**仅在 `universal` 模式下可用**。



```js
function (context) { // 可以是 asyncData, nuxtServerInit, ...
  // 始终可用
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
    $config
  } = context

  // 仅在服务器端可用
  if (process.server) {
    const { req, res, beforeNuxtRender, beforeSerialize } = context
  }

  // 仅在客户端上可用
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```



### 示例

context 通过 `context.params` 直接暴露路由可能的动态参数。在以下示例中，我们使用动态页面参数作为 URL 的一部分，通过 `nuxt/http` 模块调用 API 模块。

```js
export default {
  async asyncData(context) {
    // 使用查询参数可以使用 context.query.id。
    const id = context.params.id
    
    try {
      // 在这里使用通过 context.app 公开的 nuxtjs/http 模块
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (e) {
      context.error(e) // 显示 nuxt 错误页，与抛出错误
    }
  }
}

// 解构方式
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id
    try {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e)
    }
  }
}
```



通过上下文访问 Vuex store（当你通过 `store` 目录设置它时）。它提供了一个 `store` 对象，在 Vue 组件中可以将其视为 `this.$store`。此外，我们使用 `redirect` 方法（通过上下文公开的帮助程序）来重定向。

```js
export default {
  middleware({ store, redirect }) {
    // retrieving keys via object destructuring
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```



## helper

### $nuxt

`$nuxt` 是一个帮助程序，旨在改善用户体验，并在某些情况下充当逃生舱口。在 Vue 组件中可以通过 `this.$nuxt` 访问它，也可以通过 `window.$nuxt` 在客户端访问。



* `isOffline` ：检查网络连接是否离线。
* `isOnline` ：检查网络连接是否在线。
* `refresh()` ：刷新页面数据。当您只想刷新 asyncData 或 fetch 提供的数据时很有用。
* `$loading.start()` ：开启加载栏。
* `$loading.finish()` ：结束加载栏。



```vue
<template>
  <div>
    <!-- 在用户离线后立即显示消息 -->
    <div v-if="$nuxt.isOffline">You are offline</div>
    <Nuxt />
  </div>
</template>
```

```vue
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        // 刷新页面，但不重新加载页面
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```



### onNuxtReady()

如果您想在 Nuxt 应用程序加载并准备就绪*后*运行一些脚本，您可以使用 `window.onNuxtReady` 函数。当您想在客户端执行函数而不增加站点的交互时间时，这可能很有用。

```js
window.onNuxtReady(() => {
  console.log('Nuxt is ready and mounted')
})
```



### process

Nuxt 将三个布尔值（`client`、`server` 和 `static`）注入到全局 `process` 对象中，这将帮助您确定您的应用程序是在服务器上呈现还是完全在客户端上呈现，以及检查静态站点的生成。这些帮助程序在您的应用程序中可用，并且通常用于 `asyncData` 用户空间代码。

```vue
<template>
  <h1>I am rendered on the {{ renderedOn }} side</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'server' }
    }
  }
</script>
```

在此示例中，`renderedOn` 在使用服务器端渲染时将计算结果为 `'server'`，并且用户直接访问页面。当用户从应用程序的其他部分导航到页面时，例如，通过单击 `<NuxtLink>`，它将评估为 client。



如果需要指定只在客户端导入某个资源，则需要使用 `process.client` 变量。

```js
if (process.client) {
  require('external_library')
}
```



## 数据获取

在 Nuxt 中，我们有两种从 API 获取数据的方法。我们可以使用 fetch 方法或 asyncData 方法。

Nuxt 支持传统的 Vue 模式在客户端应用程序中加载数据，例如在组件的 `mounted()` 钩子中获取数据。但是，通用应用程序需要使用特定于 Nuxt 的钩子才能在服务器端渲染期间渲染数据。这样，您的页面就可以呈现所有需要的数据。



Nuxt 有两个用于异步数据加载的钩子：

* `asyncData` 此钩子只能放置在**页面组件**上。与 `fetch` 不同，这个钩子在客户端渲染期间不显示加载占位符。相反，这个钩子会阻止路由导航，直到它被解决，如果失败，则显示页面错误。
* `fetch`  此钩子可以放在任何组件上，并提供渲染加载状态（在客户端渲染期间）和错误的快捷方式。
  * **在 Nuxt 2.12 之前，有一个不同的 `fetch` 钩子，它仅适用于页面组件，无权访问组件实例。**如果你的 `fetch()` 接受一个 `context` 参数，它将被当作一个传统的 fetch 钩子。此功能已弃用，应替换为 `asyncData` 或匿名中间件。

这些钩子可以与您选择的任何数据获取库一起使用。建议使用 `@nuxt/http` 或 `@nuxt/axios` 向 HTTP API 发出请求。

如果您在 mixin 中定义了 `fetch` 或 `asyncData`，并且还在组件/页面中定义了它，则 mixin 函数将被覆盖而不是调用。



### fetch

`fetch` 是在创建组件实例后的服务器端渲染期间调用的钩子，也是在导航时在客户端调用的钩子。fetch 钩子应该返回一个将被解析的 promise（无论是显式的还是隐式的 `async/await`）：

* 在服务器上，在呈现初始页面之前
* 在客户端上，在挂载组件后的一段时间内



对于静态托管，仅在页面生成期间调用 fetch 钩子，然后缓存结果以供在客户端上使用。为避免缓存冲突，可能需要为组件指定一个名称，或者提供唯一的 fetchKey 实现。



在 fetch 钩子中，可以通过 `this` 访问组件实例。确保你想要修改的所有属性都已在 `data()` 中声明。然后，可以将来自 fetch 的数据分配给这些属性。



#### 更改 fetch 行为

* `fetchOnServer`：布尔值或函数（默认值：true），在服务器渲染页面时调用 fetch()
  * 当 `fetchOnServer` 为 falsy（`false` 或返回 `false`）时，将仅在客户端调用 `fetch`，并且 `$fetchState.pending` 将在服务器渲染组件时返回 `true`。
* `fetchKey`：字符串或函数（默认为组件范围 ID 或组件名称），标识此组件的获取结果的键（或生成唯一键的函数）（在 Nuxt 2.15+ 上可用）。在激活服务器渲染的页面时，此键用于将服务器端 `fetch()` 的结果映射到客户端组件数据。
* `fetchDelay`： 整数（默认：200），设置最小执行时间（以毫秒为单位）（以避免快速闪烁）



```js
export default {
  data: () => ({
    posts: []
  }),
  async fetch() {
    this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts')
  },
  
  fetchOnServer: false,
  
  // 多个组件可以返回相同的fetchKey，Nuxt 将分别跟踪它们
  fetchKey: 'site-sidebar',
  
  // 或者，为了实现更多控制，可以通过一个函数来访问组件实例，它将在 created 中被调用，且不得依赖于获取的数据
  fetchKey(getCounter) {
    // getCounter 是一种方法，调用该方法可以获取序列中的下一个数字，作为生成唯一 fetchKey 的一部分。
    return this.someOtherData + getCounter('sidebar')
  }
}
```



#### 访问 fetch 状态

`fetch` 钩子在组件级别公开 `this.$fetchState` 具有以下属性：

* `pending` 是一个布尔值，允许您在客户端调用 `fetch` 时显示占位符。
* `error` 为 null 或 fetch 钩子抛出的 Error
* `timestamp` 是上次获取的时间戳，可用于使用 keep-alive 进行缓存

除了 Nuxt 调用 fetch 之外，您还可以通过调用 `this.$fetch（）` 在组件中手动调用 fetch（例如重新加载其异步数据）。

可以使用 `this.$nuxt.context` 在 fetch 钩子中访问 Nuxt 上下文。



```vue
<template>
  <div>
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <h1>Nuxt Mountains</h1>
      <ul>
        <li v-for="mountain of mountains">{{ mountain.title }}</li>
      </ul>
      <button @click="$fetch">Refresh</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```



#### 侦听查询字符串更改

默认情况下，在查询字符串更改时不调用 `fetch` 钩子。要监视查询更改，您可以在 `$route.query` 上添加观察程序并调用 `$fetch`：

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // query 更改时调用
  }
}
```



#### 缓存

可以在 `<nuxt/>` 和 `<nuxt-child/>` 组件中使用 `keep-alive` 指令来保存您已访问的页面上的 `fetch` 调用：

```vue
// /layout/default.vue
<template>
  <nuxt keep-alive />
</template>
```



您还可以通过将 prop `keep-alive-props` 传递给 `<nuxt>` 组件来指定传递给 `<keep-alive>` 的 props。

```vue
// /layout/default.vue
<nuxt keep-alive :keep-alive-props="{ max: 10 }" />
```

在内存中仅保留 10 个页面组件。



#### 错误处理

如果在获取数据时出现错误，则不会加载正常的 Nuxt 错误页面 - 并且您不应该在 `fetch()` 中使用 Nuxt `redirect` 或 `error` 方法。相反，您需要在 `$fetchState.error` 中在您的组件中处理它。

我们可以检查 `$fetchState.error`，如果获取数据时出错，则显示错误消息。

```vue
<template>
  <div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching mountains</p>
    <ul v-else>
      <li v-for="(mountain, index) in mountains" :key="index">
        {{ mountain.title }}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```



#### 使用 activated 钩子

Nuxt 将直接填充上次 `fetch` 调用（包括 ssr）的 `this.$fetchState.timestamp` （timestamp）。你可以将此属性与 `activated` hook 结合使用，以添加 30 秒的缓存来 `fetch`：

```vue
<template> ... </template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    activated() {
      // 如果距离上次的请求超过30秒，就在请求一次
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```

如果上次 `fetch` 调用在 30 秒前，则导航到同一页面将不会调用 `fetch`。



### asyncData

`asyncData` 是另一个用于通用数据获取的钩子。与 `fetch` 不同，fetch 需要你在组件实例上设置属性（或调度 Vuex 操作）来保存你的异步状态，`asyncData` 只是将其返回值合并到组件的本地状态中。

与 `fetch` 不同，`asyncData` hook 返回的 promise 在路由转换期间解析。这意味着在客户端过渡期间看不到加载占位符（尽管加载栏可用于向用户指示加载状态）。Nuxt 将等待 `asyncData` 钩子完成，然后再导航到下一页或显示错误页面。

此 hook 只能用于页面级组件。与 `fetch` 不同，`asyncData` 无法访问组件实例 （`this`）。相反，它接收 `context` 作为其参数。你可以使用它来获取一些数据，Nuxt 会自动将返回的对象与组件数据进行浅层合并。



```vue
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
  </div>
</template>

<script>
  export default {
    async asyncData({ params, $http }) {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
  }
</script>
```



#### 组件中的 asyncData

由于组件没有 `asyncData` 方法，因此您不能直接在组件中获取异步数据服务器端。为了绕过此限制，您有三个基本选项：

1. 使用 Nuxt 2.12 及更高版本中提供的新 `fetch` 钩子。
2. 在 `mounted` 中进行 API 调用，并在加载时设置 data 属性。缺点：不适用于服务器端渲染。
3. 在页面组件的 `asyncData` 方法中进行 API 调用，并将数据作为 props 传递给子组件。服务器渲染将正常工作。缺点：页面的 `asyncData` 可能不太可读，因为它正在为其他组件加载数据。



### axios

```sh
npm i @nuxtjs/axios @nuxtjs/proxy -S
```

插件社区：https://github.com/nuxt-community

@nuxtjs/axios：https://github.com/nuxt-community/axios-module

@nuxtjs/proxy：https://github.com/nuxt-community/proxy-module



```js
export default {
  modules: [
    "@nuxtjs/axios"
  ],
  axios: {
    proxy: true,  // 开启axios跨域
    // prefix: '/api', // baseUrl
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:3006',  // 代理转发的地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
}
```

```vue
<template>
  <div>
    <h1>首页</h1>
    <p v-for="item in list" :key="item.id">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [],
  }),

  async asyncData({ $axios }) {
    let res = await $axios({
      url: "http://jsonplaceholder.typicode.com/posts",
    });
    
    let res2 = await $axios({
      // url: "http://localhost:3006/",
      url: "/api/",
      params: {
        limit: 1
      }
    });
    console.log(res2.data);
    
    return {
      list: res.data,
    };
  },

  async fetch() {
    let res = await this.$axios.get(
      "http://jsonplaceholder.typicode.com/posts"
    );
    this.list = res.data;
  },
};
</script>
```

```js
// server.js
const express = require('express')
const app = express()

// 处理get请求
app.get('/', function(req, res) {
  res.send('HOME')
})

// 监听端口
app.listen(3006, '127.0.0.1', function() {
  console.log('服务已启动')
})
```



#### 拦截器

```js
export default {
  modules: [
    "@nuxtjs/axios"
  ],
  plugins: [
    {
      src:'~/plugins/axios',
      ssr: true,  // 服务端
    }
  ],
}
```

```js
// /plugins/axios.js
export default function ({ $axios, redirect, route, store }) {
  // 基本配置
  $axios.defaults.timeout = 10000

  // 请求拦截
  $axios.onRequest(config => {
    console.log('请求拦截');
    config.headers.token = '123aa'
    return config
  })

  // 相应拦截
  $axios.onResponse(res => {
    console.log('相应拦截', res);
    return res
  })

  // 错误处理
  $axios.onError(err => {
    console.log('错误处理', err)
    return error
  })

}
```



#### api封装

1. api请求封装

   ```js
   // /api/index.js
   export default ({$axios}, inject)=> {
     // 注入
   	inject('getBanner', ()=> $axios({
   		url: '/api/getBanner',
   		method: 'GET'
   	}))
   	
   	inject('login', (data)=> $axios({
   		url: '/api/login',
   		method: 'POST',
       params: data,
       data: data
   	}))
   })
   ```

   

2. nuxt.config.js 配置

   ```js
   export default {
   	plugins: [
   		'~/plugins/axios',
   		'~/api/index'
   	]
   }
   ```

   

3. 页面或组件发起请求

   ```js
   async asyncData(app) {
     // 注入的api可以通过 app.注入名称 调用
   	let res = await app.$getBanner();
   	return {
   		banner: res.data
   	}
   }
   ```

   



## meta 和 SEO

Nuxt 为您提供了 3 种不同的方法将元数据添加到您的应用程序中：

* 全局使用 nuxt.config.js
* 在本地将 head 用作对象
* 在本地使用 head 作为函数，以便您可以访问数据和计算属性



### 全局设置

Nuxt 允许您使用 head 属性在 nuxt.config.js 文件中为您的应用程序定义所有默认的 `<meta>` 标签。这对于添加默认标题和描述标签以用于 SEO 目的或设置视口或添加网站图标非常有用。

```js
export default {
  head: {
    title: 'my website title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
}
```



### 本地设置

还可以通过在每个页面的 script 标签中设置 `head` 属性来为每个页面添加 titles 和 meta：

```vue
<script>
export default {
  head: {
    title: 'Home page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  }
}
</script>
```



此示例将使用 `head` 作为函数来仅为主页设置标题和描述。通过使用函数，您可以访问数据和计算属性

```vue
<template>
  <h1>{{ title }}</h1>
</template>
<script>
  export default {
    data() {
      return {
        title: 'Home page'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Home page description'
          }
        ]
      }
    }
  }
</script>
```



### vue-meta

Nuxt 使用 [vue-meta ](https://vue-meta.nuxtjs.org/)来更新应用程序的文档 head 和 meta 属性。

为避免在子组件中使用时出现任何重复，请为元描述提供带有 `hid` 键的唯一标识符。这样 `vue-meta` 就会知道它必须覆盖 default 标签。



### 外部资源

可以将脚本和字体等外部资源全局添加到 nuxt.config.js，或本地添加到 head 对象或函数中。

您还可以为每个资源传递一个可选的 `body： true`，以在结束 `</body>` 标记之前包含资源。



全局设置：

```js
export default {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  }
}
```



本地设置：

```vue
<template>
  <h1>About page with jQuery and Roboto font</h1>
</template>

<script>
  export default {
    head() {
      return {
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```



## 配置

默认情况下，Nuxt 的配置可满足大多数用例。可以使用 nuxt.config.js 文件覆盖此默认配置。

注意：修改 nuxt.config.js 后需要重新运行程序。



### devtools

使用 Vue.js devtools 5.1.1 不需要以下配置。

```js
export default {  
  vue: {
    config: {
      devtools: true, // 启用 Vue Devtools
      productionTip: false,
    },
  },
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: false, // 不移除 console.log
        },
      },
    },
  },
}
```



### alias 别名

Nuxt 允许您使用别名来访问 JavaScript 和 CSS 中的自定义目录。

默认：

```js
{
  '~~': `<rootDir>`,
  '@@': `<rootDir>`,
  '~': `<srcDir>`,
  '@': `<srcDir>`,
  'assets': `<srcDir>/assets`, // (unless you have set a custom `dir.assets`)
  'static': `<srcDir>/static`, // (unless you have set a custom `dir.static`)
}
```



此选项允许您定义项目中目录的别名（除了上面的目录之外）。这些别名可以在 JavaScript 和 CSS 中使用。

```js
import { resolve } from 'path'
export default {
  alias: {
    'images': resolve(__dirname, './assets/images'),
    'style': resolve(__dirname, './assets/style'),
    'data': resolve(__dirname, './assets/other/data')
  }
}
```

```vue
<template>
  <img src="~images/main-bg.jpg">
</template>

<script>
import data from 'data/test.json'

// etc.
</script>

<style>
@import '~style/variables.scss';
@import '~style/utils.scss';
@import '~style/base.scss';

body {
  background-image: url('~images/main-bg.jpg');
}
</style>
```

在 Webpack 上下文（图像源、CSS 但不是 JavaScript）中，您必须在别名前加上 `~` （如上例所示）。

如果你正在使用 TypeScript 并想使用你在 TypeScript 文件中定义的别名，你需要将别名添加到 `tsconfig.json` 中的 `paths` 对象。



### build 构建

Nuxt 允许您自定义 webpack 配置，以便根据需要构建 Web 应用程序。

此选项允许您为 `build` 步骤配置各种设置，包括 `loaders`、`filenames`、`webpack` config 和 `transpilation`。

```js
export default {
  build: {
    // 您可以在此处扩展 webpack 配置
    extend(config, ctx) {}
  }
}
```



#### analyze 分析

Nuxt 使用 [webpack-bundle-analyzer ](https://github.com/webpack-contrib/webpack-bundle-analyzer)让你可视化你的 bundle 以及如何优化它们。

类型：`Boolean` 或 `Object`

```js
export default {
  build: {
    analyze: true,
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

可以使用命令 `yarn nuxt build --analyze` 或 `yarn nuxt build -a` 来构建您的应用程序并在 [http://localhost:8888 ](http://localhost:8888/)上启动 bundle 分析器。如果你没有使用 `yarn`，你可以使用 `npx` 运行命令。



#### core-js

从 Nuxt@2.14 开始，Nuxt 会自动检测项目中 `core-js` 的当前版本，您也可以指定要使用的版本。

类型：`number` |`string`（有效值为 `'auto'`、`2` 和 `3`）

默认值： `'auto'`



#### TODO 更多选项

文档：https://v2.nuxt.com/docs/configuration-glossary/configuration-build



### buildDir

为您的 Nuxt 应用程序定义 dist 目录。

默认情况下，许多工具都假定 `.nuxt` 是一个隐藏目录，因为它的名称以点开头。您可以使用此选项来防止这种情况。

Type: `String`

Default: `.nuxt`

```js
export default {
  buildDir: 'nuxt-dist'
}
```



### cli

Nuxt 允许您自定义 CLI 配置。

* badgeMessages：向 CLI 横幅添加消息。类型为 `Array`

* bannerColor：更改 CLI 横幅中 'Nuxt' 标题的颜色。类型为 `String` ，默认 green

  ```
  可选颜色：
  black, red, green, yellow, blue, magenta, cyan, white, gray, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright
  ```

  

```js
cli: {
  badgeMessages: ['Hello World!'],
  bannerColor: 'yellow'
}
```



### head

此选项允许您为应用程序定义所有默认 meta 标记。Type: `Object` or `Function` 。

要了解你可以给 `head` 的选项列表，请查看 [vue-meta 文档 ](https://vue-meta.nuxtjs.org/api/#metainfo-properties)。

您也可以在组件中使用 `head` 作为函数，通过 `this` 访问组件数据 （[阅读更多 ](https://v2.nuxt.com/docs/components-glossary/head)）。

```js
export default {
  head: {
    title: 'Nuxt',
    titleTemplate: '%s - Nuxt',
    title: process.env.npm_package_name || '统一标题', // 使用package.json中的name
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid 用作唯一标识符。请勿使用`vmid`，否则将不起作用
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

为避免在子组件中使用时出现重复的 meta 标记，请使用 `hid` 键为 meta 元素设置唯一标识符（[阅读更多 ](https://vue-meta.nuxtjs.org/api/#tagidkeyname)）。



### css 属性

Nuxt 允许您定义要全局设置的 CSS 文件/模块/库（包含在每个页面中）。

如果您想使用 `sass`，请确保您已经安装了 `sass` 和 `sass-loader` 软件包。

```sh
npm install --save-dev sass sass-loader@10
```



在 `nuxt.config.js` 中，添加 CSS 资源：

```js
export default {
  css: [
    // 直接加载node.js模块（这是一个sass文件）
    'bulma',
    
    // 项目中的CSS文件
    '~/assets/css/main.css',
    
    // 项目中的SCSS文件
    '~/assets/css/main.scss'
  ]
}
```

Nuxt 会自动根据文件扩展名猜测文件类型，并使用适合 webpack 的预处理器加载器。如果需要使用，您仍需要安装所需的加载器。



#### 样式扩展style-resources

您可以省略 nuxt 配置文件中的 css 数组中列出的 CSS/SCSS/Postcss/Less/Stylus/... 文件的文件扩展名。

通过省略扩展名，如果您有一个 css 文件并决定更改为使用 sass，则无需更新 nuxt.config，因为一旦文件名保持不变，它将使用新的扩展名。

```js
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

默认顺序：`['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`

如果你有两个同名的文件，例如 `main.scss` 和 `main.css`，并且没有在 css 数组条目中指定扩展名，例如 `css： ['~/assets/css/main']`，那么根据 `styleExtensions` 的顺序，将只加载一个文件。在这种情况下，将仅加载 `css` 文件，而忽略 `scss` 文件，因为 `css` 在默认的 `styleExtension` 数组中排在第一位。



#### @nuxtjs/style-resources

文档地址：https://github.com/nuxt-modules/style-resources

Nuxt.js样式资源模块（@nuxtjs/style-resources）是一个Nuxt.js的官方模块，它允许开发者共享变量、混入（mixins）和函数等样式资源，而无需在每个样式文件中重复导入。通过该模块，可以简化项目的样式管理，提高开发效率。该模块支持SASS、LESS和Stylus等流行的CSS预处理器，并且与Nuxt的构建和样式资源系统兼容。



```sh
npm install -D @nuxtjs/style-resources
```

```js
export default {
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['~/assets/vars/*.scss']
  }
}
```

```scss
// assets/vars/_colors.scss
$gray: #333;
```

```vue
<template>
  <div class="ymca">
    Test
  </div>
</template>

<style lang="scss">
  .ymca {
    color: $gray; // will be resolved to #333
  }
</style>
```



### 预处理器

多亏了 Vue Loader ，你可以为你的 `<template>` 或 `<style>` 使用任何类型的预处理器：使用 `lang` 属性。

我们使用 Pug 和 Sass 的 `pages/index.vue` 示例：

```vue
<template lang="pug">
  h1.red Hello {{ name }}!
</template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```



要使用这些预处理器，我们需要安装它们的 webpack loader：

```sh
npm install --save-dev pug pug-plain-loader
npm install --save-dev sass sass-loader@10
```



### PostCSS 插件

如果存在，请重命名或删除项目目录中的`postcss.config.js`。然后，在 `nuxt.config.js` 文件中添加以下内容：

```js
export default {
  build: {
    postcss: {
      // 添加插件名称作为键，参数作为值，使用 npm 或 yarn 将它们安装为依赖项
      plugins: {
        // 通过 false 作为值禁用插件
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // 更改 postcss-preset-env 设置
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
```



### ssr

更改默认 nuxt ssr 值。默认值：`true` 。

* `true`：启用服务器端渲染
* `false`：无服务器端渲染（仅客户端渲染）

```js
export default {
  ssr: false // 禁用服务器端渲染
}
```



### target

更改默认 nuxt 部署目标。默认值：`server` 。

* `'server'`：用于服务器端渲染
* `'static'`：对于静态网站

```js
export default {
  target: 'server'
}
```



### dev

此选项允许您定义 Nuxt 的 `development` 或 `production` 模式。

类型：`Boolean` 。默认 true。

此属性将被 nuxt 命令覆盖：

* `dev` 在 `nuxt` 中被强制为 `true`
* `dev` 在 `nuxt build`、`nuxt start` 和 `nuxt generate` 中被强制为 `false`



以编程方式使用 Nuxt 时，应使用此属性：

```js
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

```js
// server.js
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// 使用以下选项实例化 Nuxt
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// 仅在开发模式下构建
if (config.dev) {
  new Builder(nuxt).build()
}

// 监听服务器
app.listen(port, '0.0.0.0').then(() => {
  console.log(`Server is listening on port: ${port}`)
})
```

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "NODE_ENV=production node server.js"
  }
}
```





### env

Nuxt 允许你在客户端创建环境变量，也可以从服务器端共享。

env 属性定义客户端可用的环境变量。可以使用服务器端环境变量、[dotenv 模块](https://github.com/nuxt-community/dotenv-module)变量或类似变量来分配它们。

此选项允许您定义在构建时（而不是运行时）所需的环境变量，例如 `NODE_ENV=staging` 或 `VERSION=1.2.3`。但是，对于运行时环境变量，需要 `runtimeConfig` 属性。

```js
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

这样，您就可以创建一个 `baseUrl` 属性，该属性将等于 `BASE_URL` 服务器端环境变量（如果可用或已定义）。否则，客户端中的 `baseUrl` 将等于 `'http://localhost:3000'`。因此，服务器端变量 BASE_URL 将通过 `nuxt.config.js` 中的 `env` 属性复制到客户端。或者，定义另一个值 （http://localhost:3000）。

然后，我可以通过 2 种方式访问我的 `baseUrl` 变量：

* 通过 `process.env.baseUrl` 获取。
* 通过 `context.env.baseUrl`

```js
// plugins/axios.js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```



由于 `serverMiddleware` 与主 Nuxt 构建是解耦的，因此 `nuxt.config.js` 中定义的 `env` 变量在那里不可用。



#### 自动注入

如果您在构建阶段（例如， `NUXT_ENV_COOL_WORD=freezing nuxt build` 或 `SET NUXT_ENV_COOL_WORD=freezing & nuxt build` Windows 控制台）定义以 `NUXT_ENV_` 开头的环境变量，它们将自动注入到流程环境中。请注意，它们可能会优先于`nuxt.config.js`中具有相同名称的已定义变量。



#### process.env == {}

请注意，Nuxt 使用 webpack 的 `definePlugin` 来定义环境变量。这意味着 Node.js 中的实际 `process` 或 `process.env` 既不可用，也未定义。nuxt.config.js 中定义的每个 `env` 属性都会单独映射到 `process.env.xxxx` 并在编译期间进行转换。

这意味着，`console.log（process.env）` 将输出 `{}`，但 `console.log(process.env.your_var)` 仍然会输出你的值。当 webpack 编译你的代码时，它会用你设置的值替换 `process.env.your_var` 的所有实例，例如：`env.test = 'testing123'`。如果你在代码中的某个位置使用 `process.env.test`，它实际上会被翻译成 'testing123'。

```
before
if (process.env.test == 'testing123')

after
if ('testing123' == 'testing123')
```





### runtimeConfig

运行时配置具有内置的 [dotenv ](https://github.com/motdotla/dotenv)支持，可提供更好的安全性和更快的开发速度。运行时配置已添加到 Nuxt 有效负载中，因此在开发中工作或使用服务器端渲染或仅客户端应用程序时，无需重新构建即可更新运行时配置。对于静态站点，您仍需要重新生成站点才能看到更改。

运行时配置允许将动态配置和环境变量传递给 nuxt 上下文。



####  .env 支持

如果你的项目根目录中有一个 `.env` 文件，它将自动加载到 `process.env` 中，并在你的 `nuxt.config`/`serverMiddleware` 和它们导入的任何其他文件中访问。

您可以使用 `--dotenv <file>` 自定义路径，也可以使用 `--dotenv false` 完全禁用路径。例如，您可以在生产、暂存或开发环境中指定不同的 `.env` 文件。



#### publicRuntimeConfig

* 应包含所有 public 的 env 变量，因为这些变量将在前端公开。例如，这可能包括对公有 URL 的引用。
* 此对象的值可通过 `$config` **从客户端和服务器访问**。

```js
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://v2.nuxt.com'
  }
}
```



#### privateRuntimeConfig

* 应保存所有私有且不应在前端公开的 env 变量。例如，这可能包括对 API 密钥令牌的引用。
* 此对象的值只能使用 `$config` 从**服务器**访问。覆盖 server 的 `publicRuntimeConfig`。

```js
export default {
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
```



#### 使用 config 值

然后，您可以通过使用 `this.$config` 或 `context.$config` 在页面、商店、组件和插件中使用上下文在任何地方访问这些值。

```vue
<script>
  asyncData ({ $config: { baseURL } }) {
    const posts = await fetch(`${baseURL}/posts`)
      .then(res => res.json())
  }
</script>
```

在模板中，您可以使用 $config 直接访问 runtimeConfig`。`

```vue
<template>
  <p>Our Url is: {{ $config.baseURL}}</p>
</template>
```

如果您在仅限服务器的上下文之外使用 `$config`（例如，如果您在 `fetch`、`asyncData` 或直接在模板中使用 `$config`），则您的私有配置可能会暴露。



### generate 生成

将通用 Web 应用程序的生成配置为静态 Web 应用程序。

调用 `nuxt.generate()` 时，Nuxt 将使用 `generate` 属性中定义的配置。

此选项允许您为应用程序中的每个动态路由设置参数值，这些路由将被 Nuxt 转换为 HTML 文件。

```js
export default {
  generate: {
    dir: 'gh_pages', // gh_pages/代替dist/
    subFolders: false // 根据路由路径生成 HTML 文件
  }
}
```



#### 属性

* `dir` ：使用 `nuxt generate` 命令构建 Web 应用程序时创建的目录名称。默认 dist。
* `subFolders` ：子文件夹。默认 true。默认情况下，当运行`nuxt generate`时，Nuxt将为每个路由创建一个目录并提供一个 `index.html` 文件。当设置为 false 时，将根据路由路径生成 HTML 文件：
* `fallback` ：回退 HTML 文件的路径。它应该被设置为 error 页面，这样 Nuxt 也会渲染未知的路由。如果未设置或设置为 falsy 值，则将`200.html`回退 HTML 文件的名称。如果设置为 `true`，则文件名将为 `404.html`。如果您提供字符串作为值，则将改用它。Type: `String` or `Boolean`。Default: `200.html`
* `exclude` ：它接受字符串或正则表达式数组，并阻止生成匹配它们的路由。使用 `generate.fallback` 时，路由仍可访问。
* `devtools ` ：配置是否允许 [vue-devtools ](https://github.com/vuejs/vue-devtools)检查。默认 false。如果您已经通过 nuxt.config.js 或其他方式激活，则无论标志如何，devtools 都会启用。
* `interval` ：两个渲染周期之间的间隔（以毫秒为单位），以避免来自 Web 应用程序的调用淹没潜在的 API。默认 0。
* `cache` ：使用 static target  `nuxt generate`  使用此选项，以避免在没有更改跟踪文件时重新构建。
* `concurrency` ：并发，默认 500。路由的生成是并发的，`generate.concurrency` 指定在一个线程中运行的路由数量。
* `crawler` ：爬虫。从 Nuxt >= v2.13 开始，Nuxt 预装了一个爬虫，它可以爬取您的相对链接并根据这些链接生成您的动态链接。如果要禁用此功能，可以将值设置为 `false`



```js
export default {
  generate: {
    dir: 'gh_pages', // gh_pages/代替dist/
    
    subFolders: false, // 根据路由路径生成 HTML 文件
    
    fallback: '404.html', // 回退 HTML 文件的路径
    
    // 阻止生成路由
    exclude: [
      /^\/admin/ // 路径以 /admin开头
    ],
    exclude: ['/my-secret-page'],

    
  	// 如果你想避免在更改配置文件时重新构建，只需通过提供 cache.ignore 选项将其添加到列表中
    cache: {
      ignore: ['renovate.json'] // 忽略在此文件上应用的更改
    },
    
    devtools: true,
    crawler: false,
  }
}
```



#### routes

从 Nuxt v2.13 开始，安装了一个爬虫，它将在运行 `nuxt generate` 时爬取您的链接标签并生成您的路由。如果您有未链接的页面（例如秘密页面），并且希望也生成这些页面，则可以使用 `generate.routes` 属性。

使用 `Nuxt <= v2.12` 时，`generate` 命令会忽略动态路由。



如果你希望 Nuxt 生成带有动态参数的路由，你需要将 `generate.routes` 属性设置为一个动态路由数组。

```js
export default {
  generate: {
    // 为 /users/:id 添加路由
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```



如果有动态参数：

* 使用返回 `Promise` 的 `Function`。
* 使用带有 `callback(err， params)` 的 `Function`。



```js
// 返回 Promise 的函数
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

```js
// 具有回调的函数
import axios from 'axios'

export default {
  generate: {
    routes(callback) {
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```



**使用 payload 加快动态路由生成**

在上面的示例中，我们使用来自服务器的 `user.id` 来生成路由，但丢弃了其余数据。通常，我们需要从 `/users/_id.vue` 中再次获取它。虽然我们可以做到这一点，但我们可能需要将 `generate.interval` 设置为类似于 `100` 的值，以免服务器被调用淹没。因为这会增加 generate 脚本的运行时间，所以最好将整个 `user` 对象传递给 `_id.vue` 中的上下文。我们通过将上面的代码修改为以下内容来做到这一点：

```js
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return {
            route: '/users/' + user.id,
            // 设置 payload
            payload: user
          }
        })
      })
    }
  }
}
```

```js
// 访问 payload
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```



### plugins

此选项允许您定义应在实例化根 Vue.js 应用程序之前运行的 JavaScript 插件。

```js
export default {
  plugins: ['~/plugins/url-helpers.js']
}
```



### extendPlugins

extendPlugins 属性允许您自定义 Nuxt 插件。Type: `Function` 。Default: `undefined` 。

您可能希望扩展插件或更改 Nuxt 创建的插件顺序。此函数接受 plugin 对象数组，并应返回 plugin 对象数组。

```js
export default {
  // 更改插件顺序的示例
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(
      plugin => (typeof plugin === 'string' ? plugin : plugin.src) === '~/plugins/shouldBeFirst.js'
    )
    const shouldBeFirstPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    return plugins
  }
}
```







### router

使用 `router` 选项，你可以覆盖 Vue Router 的默认 Nuxt 配置。

```js
export default {
  router: {
    linkExactActiveClass: 'text-primary'
  }
}
```



### server

此选项允许您为 Nuxt 应用程序的服务器实例配置连接变量。

默认情况下，Nuxt 开发服务器主机是 `localhost`，它只能从主机内部访问。为了在另一台设备上查看您的应用程序，您需要修改主机。您可以在 nuxt.config.js 文件中修改主机。

主机 `'0.0.0.0'` 被指定告诉 Nuxt 解析主机地址，该地址可由主机外部的连接（例如 LAN）访问。如果为主机分配了字符串值 `'0'` （不是 0，这是假的） 或 `'0.0.0.0'` ，则您的本地 IP 地址将被分配给您的 Nuxt 应用程序。

如果为端口分配了字符串值 `'0'` （不是 0，这是假的），则会为您的 Nuxt 应用程序分配一个随机端口号。

* port：端口
* host：主机
* https：https配置
* socket： socket 配置
* time：启用选项会添加一个中间件来测量服务器端渲染期间经过的时间，并将其作为 'Server-Timing' 添加到标头中。类型： `Object` or `Boolean` 。默认 false。



```js
import path from 'path'
import fs from 'fs'

export default {
  server: {
    // 指定 Nuxt 服务器实例的主机和端口。
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false,
    
    // 使用 HTTPS 配置的示例
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    },
    
    // 使用 sockets 配置的示例
    socket: '/tmp/nuxt.socket'
  }
}
```



尽管您可以在 nuxt.config.js 文件中对其进行修改，但不建议这样做，因为这可能会导致您在托管站点时出现问题。最好在 dev 命令中修改 host 和 port direct。

```sh
HOST=0 PORT=8000 npm run dev
```

或在 package.json 中创建脚本

```js
"scripts": {
  "dev:host": "nuxt --hostname '0' --port 8000"
}
```



### serverMiddleware

用于定义服务器端中间件。可以使用 serverMiddleware 扩展服务器，使用 middleware 控制路由。

Nuxt 在内部创建了一个 [connect ](https://github.com/senchalabs/connect)实例，您可以将自己的自定义中间件添加到该实例中。这允许我们注册额外的路由（通常是 `/api` 路由），**而无需外部服务器**。

这允许您单独使用 Nuxt 创建客户端 API/服务器 API 模式。这意味着从浏览器（例如，在 Vue 组件中）你可以向服务器中间件中的路由发出请求。

这种模式的一个好处是服务器中间件存在于服务器上（就像大多数中间件一样），而不是客户端上。这意味着您可以在服务器中间件中处理环境变量和密钥，而无需向用户公开该信息。

因为 connect 本身是一个中间件，所以注册的中间件既可以与 `nuxt start` 一起使用，也可以用作具有编程用法的中间件，如 [express-template ](https://github.com/nuxt-community/express-template)。Nuxt [Modules ](https://v2.nuxt.com/docs/directory-structure/modules)还可以使用 [this.addServerMiddleware（） ](https://v2.nuxt.com/docs/internals-glossary/internals-module-container#addservermiddleware-middleware)提供 `serverMiddleware`

除了它们之外，我们还引入了一个 `prefix` 前缀选项，默认为 `true`。它会将 router base 添加到您的服务器中间件中。

例如：

* 服务端中间件路径: `/server-middleware`
* Router base: `/admin`
* `prefix: true` (默认): `/admin/server-middleware`
* `prefix：false`：`/server-middleware`



不要将它与 routes middleware  [路由中间件 ](https://v2.nuxt.com/docs/directory-structure/middleware)混淆，后者是 Vue 在客户端和服务器端在每个路由之前调用的。`serverMiddleware` 属性中列出的中间件在 `vue-server-renderer` **之前**运行在服务器上，可用于服务器特定的任务，例如处理 API 请求或提供资产。

注意：不要将 serverMiddleware 添加到 middleware/ 目录下。中间件被 webpack 捆绑到你的生产包中，并在 beforeRouteEnter 上运行。如果你将 serverMiddleware 添加到 middleware/ 目录，它会被 Nuxt 错误地作为中间件拾取，并将错误的依赖项添加到你的 bundle 中或产生错误。



#### 用法

如果 middleware 是 String ，Nuxt 将尝试自动解析并需要它。

如果你不希望中间件注册所有路由，请使用具有特定路径的 Object 表单。如果你不这样做，nuxt 默认处理程序将不起作用！

```js
import serveStatic from 'serve-static'

export default {
  serverMiddleware: [
    // 将注册 redirect-ssl npm 软件包
    'redirect-ssl',

    // 将注册项目 /server-middleware 目录下的文件，以处理 /server-middleware/* 要求
    { path: '/server-middleware', handler: '~/server-middleware/index.js' },

    // 还可以创建自定义实例
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```



#### 自定义服务器中间件

```js
// 中间件 （server-middleware/logger.js）：
export default function (req, res, next) {
  // req是Node.js http请求的对象
  console.log(req.url)

  // res 是 Node.js http 响应对象

  // next 是调用下一个中间件的函数
  // 如果中间件不是终点，不要忘记在最后调用 next！
  next()
}
```

```js
// nuxt.config.js
export default {
  serverMiddleware: ['~/server-middleware/logger']
}
```



#### 自定义 API 端点

服务器中间件还可以扩展 Express。这允许创建 REST 端点。

```js
// server-middleware/rest.js
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.all('/getJSON', (req, res) => {
  res.json({ data: 'data' })
})

module.exports = app
```

```js
serverMiddleware: [
  { path: "/server-middleware", handler: "~/server-middleware/rest.js" },
],
```



#### 对象语法

如果您的服务器中间件由映射到 paths 的函数列表组成：

```js
export default {
  serverMiddleware: [
    { path: '/a', handler: '~/server-middleware/a.js' },
    { path: '/b', handler: '~/server-middleware/b.js' },
    { path: '/c', handler: '~/server-middleware/c.js' }
  ]
}
```

您也可以传递一个对象来定义它们，如下所示：

```js
export default {
  serverMiddleware: {
    '/a': '~/server-middleware/a.js',
    '/b': '~/server-middleware/b.js',
    '/c': '~/server-middleware/c.js'
  }
}
```



### srcDir

此选项允许您定义 Nuxt 应用程序的源目录。

如果指定了相对路径，它将是相对于 `rootDir` 的。

```js
export default {
  srcDir: 'client/'
}
```

项目结构示例，其中包含 `Client` 目录中的 Nuxt 应用程序。

```
**-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/**
```



### dir

此选项允许您定义 Nuxt 目录的自定义名称。

```js
export default {
  dir: {
    pages: 'views', // Nuxt 将查找 views/ 而不是 pages/ 文件夹
    
    layouts: 'custom-layouts',
    middleware: 'custom-middleware',
    static: 'custom-static',
    store: 'custom-store'
  }
}
```



默认值：

```js
{
  assets: 'assets',
  app: 'app',
  layouts: 'layouts',
  middleware: 'middleware',
  pages: 'pages',
  static: 'static',
  store: 'store'
}
```



### vue.config

Vue.config 的 config 对象。vue.config 属性为 `Vue.config` 提供了直接的配置桥。

默认: `{ silent: !isDev, performance: isDev }` 。

```js
export default {
  vue: {
    config: {
      productionTip: true,
      devtools: false
    }
  }
}
```

此配置将导致以下 Vue.config：

```js
Vue.config.productionTip // true
Vue.config.devtools // false
Vue.config.silent // !isDev [default value]
Vue.config.performance // isDev [default value]
```



### globalName

Nuxt 允许你自定义主 HTML 模板中使用的全局 ID，以及主 Vue 实例名称和其他选项。

```js
{
  globalName: 'myCustomName', // 默认 nuxt
}
```

`globalName` 需要是一个有效的 JavaScript 标识符，更改它可能会破坏对某些依赖于 Nuxt 命名函数的插件的支持。如果您只想更改可见`的 __nuxt` HTML ID，请使用 `globals` 属性。



### globalName

自定义默认基于 `globalName` 的特定全局名称。

```js
// 默认值
globals: {
  id: globalName => `__${globalName}`,
  nuxt: globalName => `$${globalName}`,
  context: globalName => `__${globalName.toUpperCase()}__`,
  pluginPrefix: globalName => globalName,
  readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
  loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
},
```







### JSX

Nuxt 使用 [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt/tree/2.x-dev/packages/babel-preset-app)，它基于官方的 [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) 作为 babel 默认配置，因此你可以在组件中使用 JSX。

你也可以在组件的 `render` 方法中使用 JSX：

```js
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
```

将 `createElement` 别名为 `h` 是 Vue 生态系统中常见的约定，但实际上对于 JSX 来说是可选的，因为它会自动注入 `const h = this.$createElement` 在任何具有 JSX 的 ES2015 语法中声明的 getter（不是函数或箭头函数），因此您可以删除 （h） 参数。



### components 自动导入

Nuxt 2.13+ 可以使用 [**@nuxt/components** ](https://github.com/nuxt/components)模块扫描并自动导入您的组件。要激活此功能，请在配置中设置 `components： true`：

```js
export default {
  // 这将自动从 `~/components` 中加载组件
  components: true
}
```

 components 目录中创建 components 后，它们将在整个应用程序中可用，而无需导入它们。

可以在 Nuxt 2.10 - 2.12 中使用此功能。只需手动安装 `@nuxt/components` 并将其添加到 `nuxt.config` 中的 `buildModules` 中即可。



Type: `Boolean` or `Array`

Default: `false`

当设置为 `true` 或 options 对象时，Nuxt 将包含 [@nuxt/components ](https://github.com/nuxt/components)并自动导入组件，无论您在页面、布局（和其他组件）中的任何位置使用它们。



#### 配置

使用 `components： true`，默认情况下将包含 `~/components` 目录。

但是，您可以通过提供要扫描的其他目录来自定义自动发现行为：

```js
export default {
  components: [
    // 等同于 { path: '~/components' }
    '~/components',
    { path: '~/components/other', extensions: ['vue'] }
  ]
}
```







`path` ：每个项可以是 string 或 object。字符串值是 `{ path }` 的快捷方式。

* path：字符串，必填。包含组件的目录的路径 （绝对或相对）。可以使用 Nuxt 别名（`~` 或 `@`）来引用项目内的目录，也可以直接使用 npm 包路径（类似于在项目中使用 `require`）。
* extensions：扩展名。类型: `Array<string>` 。可以选择只扫描某些扩展名的文件。
* pattern：在指定的 `path` 中，将仅包含与此模式匹配的文件。字符串类型，默认值：`**/*.${extensions.join（'，'）}`
* ignore：用于排除指定 `path` 内文件的模式。类型 `Array<string>` ，默认 `[]`
* prefix：为所有匹配的组件添加前缀。默认值：`''` （无前缀）
* pathPrefix：按路径为组件名称添加前缀。默认值：`true`
* watch：观察指定 `path` 中的更改，包括文件添加和文件删除。默认值：`true`
* transpile：使用 [`build.transpile` ](https://v2.nuxt.com/docs/configuration-glossary/configuration-build#transpile)转译指定 `path`。默认情况下 （`'auto'`） 。如果 `node_modules/` 在 `path` 中，它将设置 `transpile： true`。
* level：用于定义允许覆盖两个不同目录中具有相同名称的组件。这对于希望允许用户覆盖其组件的库作者或自定义主题非常有用。默认0。最低值优先。
* 





```js
export default {
  components: [
    // 等同于 { path: '~/components' }
    '~/components',
    { path: '~/components/other', extensions: ['vue'] }
  ],
  
  
  //level: ~/components 中的组件将覆盖 my-theme/components 中的同名组件。最低值优先。
  components: [
    '~/components', // 默认 level 是 0
    { path: 'my-theme/components', level: 1 }
  ]
  
}
```



组件前缀示例：

```js
// nuxt.config.js
export default {
  components: [
    '~/components',
    { path: '~/components/awesome/', prefix: 'awesome' }
  ]
}
```

```bash
| components/
---| awesome/
------| Button.vue
---| Button.vue
```

```html
<template>
  <div>
    <AwesomeButton>Click on me 🤘</AwesomeButton>
    <button>Click on me</button>
  </div>
</template>
```











#### 组件名称

如果组件位于嵌套目录中，例如：

```
| components/
--| base/
----| foo/
------| Button.vue
```

组件名称将基于其自己的 path 目录和 filename。因此，该组件将为：`<BaseFooButton />`

为清楚起见，建议组件文件名与其名称匹配。（因此，在上面的示例中，您可以将 `Button.vue` 重命名为 `BaseFooButton.vue`。



如果要使用不应包含在组件名称中的自定义目录结构，则可以显式指定以下目录：

```
| components/
--| base/
----| foo/
------| Button.vue
```

```js
components: {
  dirs: [
    '~/components',
    '~/components/base'
  ]
}
```

现在，在模板中，您可以使用 `FooButton` 而不是 `BaseFooButton`。



#### 动态导入

要动态导入组件（也称为延迟加载组件），您需要做的就是在组件名称中添加 `Lazy` 前缀。

```vue
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <LazyTheFooter />
  </div>
</template>
```

如果并不总是需要组件，这将特别有用。通过使用 `Lazy` 前缀，您可以将组件代码加载延迟到正确的时间，这有助于优化 JavaScript 捆绑包大小。

```vue
<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
```







### 忽略文件

#### .nuxtignore

您可以使用 `.nuxtignore` 文件让 Nuxt 在构建阶段忽略项目根目录 （`rootDir`） 中的 `layout`、`page`、 `store` 和 `middleware` 文件。`.nuxtignore` 文件与 `.gitignore` 和 `.eslintignore` 文件遵循相同的规范，其中每一行都是一个 glob 模式，指示应忽略哪些文件。

```sh
# 忽略 layout foo.vue
layouts/foo.vue

# 忽略layouts下名称以-ignore.vue结尾的布局文件
layouts/*-ignore.vue

# 忽略 page bar.vue
pages/bar.vue

# 忽略pages/ignore下的所有vue文件
pages/ignore/*.vue

# 忽略 store baz.js
store/baz.js

# 忽略匹配 _.test._ 名称的文件
store/ignore/_.test._

# 忽略 middleware/foo/下的所有js文件（foo/bar.js 除外）
middleware/foo/*.js !middleware/foo/bar.js
```

注意：如果您在 `nuxt.config` 中指定了不同的 `srcDir`，则需要将 `.nuxtignore` 文件移动到该位置才能正常工作。



#### ignorePrefix 属性

如果 pages/、layout/、middleware/ 或 store/ 中的任何文件文件名以 ignorePrefix 指定的前缀开头（默认值： `'-'`），则在构建过程中将被忽略。

默认情况下，所有以 `-` 开头的文件都将被忽略，例如 `store/-foo.js` 和 `pages/-bar.vue`。这允许将测试、实用程序和组件与它们的调用者放在一起，而不会将它们本身转换为 routes、stores 等。



#### ignore 属性

Type: `Array` 。Default: `['**/*.test.*', '**/*.spec.*']` 。

比 ignorePrefix 更具可定制性：在构建中将忽略所有与 ignore 中指定的 glob 模式匹配的文件。

```js
export default {
  ignore: 'pages/bar.vue'
}
```



#### nuxtignore

`nuxtignore` 在后台使用了 `node-ignore`，`ignoreOptions` 可以配置为 `node-ignore` `的选项`。

```js
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```



### 扩展 webpack 配置

可以通过 `nuxt.config.js` 中的 `extend` 选项扩展 nuxt 的 webpack 配置。`build` 属性的 `extend` 选项是一个接受两个参数的方法。第一个参数是从 nuxt 的 webpack 配置中导出的 webpack `配置`对象。第二个参数是具有以下布尔属性的 context 对象： `{ isDev, isClient, isServer, loaders }` .

`extend` 方法被调用两次：一次用于客户端捆绑包，另一次用于服务器捆绑包。

```js
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // 如果 `isDev` 为 true，则将 webpack 设置为开发模式。
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```



#### 自定义 chunks 配置

您可能希望稍微调整优化配置，以避免重写 default 对象。

```js
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```



#### 检查 webpack 配置

对于复杂的项目和调试，检查最终的 webpack 配置有时是有用的。幸运的是，您可以从项目中运行 `nuxt webpack` 命令来输出配置。



#### 添加 webpack 插件

在 `nuxt.config.js` 文件中的 `build` 选项下，您可以传递 webpack `plugins`，就像在 `webpack.config.js` 文件中一样。

在此示例中，我们添加了 webpack 内置的 [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)，用于自动加载 JavaScript 模块（lodash 和 jQuery），而不必在任何地方 `import` 或 `require` 它们。

```js
import webpack from 'webpack'

export default {
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // 全局模块
        $: 'jquery',
        _: 'lodash'
      })
    ]
  }
}
```

使用 Nuxt，您还可以控制插件执行上下文：如果它们打算在`client`或 `server` 构建（或区分`dev` 和 `prod` 构建）中运行 `build.extend`，您也可以手动传递 webpack 插件。



#### 扩展 Webpack 以加载音频文件

音频文件应由 `file-loader` 处理。此加载程序已包含在默认 Webpack 配置中，但它未设置为处理音频文件。您需要在 `nuxt.config.js` 中扩展其默认配置：

```js
export default {
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
```

您现在可以导入如下所示 `<audio :src="require('@/assets/water.mp3')" controls></audio>` 的音频文件。



如果你只想写 ： `<audio src="@/assets/water.mp3" controls></audio>` ，你需要告诉 `vue-loader` 当你使用 `src` 属性引用音频文件时，它会自动要求它们：

```js
export default {
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
```



### 异步配置

虽然最好使用普通配置 `export default {}`，但您可以通过导出返回 config 对象的 async 函数来获得异步配置。

```js
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: {
      title: data.title
      //... 其余的配置
    }
  }
}
```

axios-module 不能在 `nuxt.config.js` 中使用。您需要导入 axios 并再次配置它。



### 其他配置文件

除了 `nuxt.config.js` 之外，您的项目根目录中可能还有其他配置文件，例如 [.eslintrc ](https://eslint.org/)、 [prettier.config.json ](https://prettier.io/)或 [.gitignore ](https://git-scm.com/docs/gitignore)。这些用于配置其他工具，例如 linter、代码格式化程序或 git 存储库，并与 `nuxt.config.js`分离。

在 .gitignore 文件中，您需要添加以下内容，以便它们被忽略并且不会添加到版本控制中。`node_modules`这是您安装的所有模块所在的位置。`nuxt` 文件夹，这是在运行 dev 或 build 命令时创建的文件夹。`dist` 文件夹是在运行 generate 命令时创建的文件夹。

```
node_modules .nuxt dist
```



### TODO hooks

https://v2.nuxt.com/docs/configuration-glossary/configuration-hooks



### TODO render

https://v2.nuxt.com/docs/configuration-glossary/configuration-render



## Loading

Nuxt 开箱即用，为您提供了在路由之间显示的加载进度条组件。您可以自定义它、禁用它，甚至可以创建自己的加载组件。



### 自定义进度条

除其他属性外，还可以自定义进度条的颜色、大小、持续时间和方向，以满足应用程序的需要。这是通过使用相应的属性更新 `nuxt.config.js` 的 `loading` 属性来完成的。

例如，要设置高度为 5px 的蓝色进度条，我们将`nuxt.config.js`更新为以下内容：

```js
export default {
  loading: {
    color: 'blue',
    height: '5px'
  }
}
```

如果在路由之间移动时看不到加载栏，则加载页面的时间足够短，用户可以忽略。如果您希望加载栏在时间很短时也出现，请尝试 `throttle： 0`。



用于自定义进度条的属性列表：

| Key         | Type    | Default | Description                                                  |
| ----------- | ------- | ------- | ------------------------------------------------------------ |
| color       | String  | black   | 进度条的 CSS 颜色                                            |
| failedColor | String  | red     | 在渲染路由时附加错误时进度条的 CSS 颜色（例如，如果 data 或 fetch 发回错误）。 |
| height      | String  | 2px     | 进度条的高度（用于进度条的 style 属性）                      |
| throttle    | String  | 200     | 以毫秒为单位，等待指定的时间，然后显示进度条。用于防止条形闪烁。 |
| duration    | Number  | 5000    | 以毫秒为单位，进度条的最大持续时间，Nuxt 假设路由将在 5 秒之前渲染。 |
| continuous  | Boolean | false   | 当加载时间超过持续时间时，保持进度条动画。                   |
| css         | Boolean | true    | 设置为 false 可删除默认进度条样式（并添加您自己的样式）。    |
| rtl         | Boolean | false   | 将进度条的方向从右向左设置。                                 |



### 禁用进度条

如果您不想在路由之间显示进度条，请在 `nuxt.config.js` 文件中添加 `loading： false`：

```js
export default {
  loading: false
}
```



loading 属性提供了在特定页面上禁用默认加载进度条的选项。

```vue
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```



### 以编程方式启动加载栏

加载栏也可以在组件中以编程方式启动，方法是调用 `this.$nuxt.$loading.start()` 来启动加载栏，调用 `this.$nuxt.$loading.finish()` 来完成加载栏。

`$loading` 属性可能无法在页面组件的挂载过程中立即使用。要解决此问题，如果要在 `mounted ` 方法中启动加载程序，请确保将 `$loading` 方法调用包装在 `this.$nextTick` 中，如下所示。

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```



### 循环进度

遗憾的是，Loading 组件无法提前知道加载新页面需要多长时间。因此，无法将进度条的动画效果精确地设置为加载时间的 100%。

Nuxt 的加载组件通过让您设置 `duration` 来部分解决这个问题，这应该设置为加载过程将需要多长时间的估计值。除非使用自定义加载组件，否则进度条的 `duration` 将始终从 0% 移动到 100%（无论实际进度如何）。当加载时间超过 `duration` 时，进度条将保持在 100%，直到加载完成。

您可以通过将 `continuous` 设置为 true 来更改默认行为。然后在达到 100% 后，进度条将在 `duration` 内再次开始收缩回 0%。当加载达到 0% 后仍未完成时，它会再次从 0% 增长到 100%。该过程将重复，直到加载完成。

```js
export default {
  loading: {
    continuous: true
  }
}
```



### 使用自定义加载组件

您还可以创建自己的组件，Nuxt 将调用该组件，而不是默认的加载进度条组件。为此，您需要在 `loading` 选项中提供组件的路径。然后，你的组件将由 Nuxt 直接调用。

您的组件必须公开以下一些方法：

| Method        | Required | Description                                          |
| ------------- | -------- | ---------------------------------------------------- |
| start()       | 必填     | 当路由更改时调用，这是您显示组件的位置。             |
| finish()      | 必填     | 在加载路由（并获取数据）时调用，这是隐藏组件的地方。 |
| fail(error)   | 非必填   | 在无法加载路由时调用 （例如，无法获取数据） 。       |
| increase(num) | 非必填   | 在加载路由组件时调用，num 是一个整数 < 100。         |



可以在 `components/LoadingBar.vue` 中创建自定义组件：

```vue
<template>
  <div v-if="loading" class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        // 效果不明显可以加setTimeout
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
```



然后，您更新`nuxt.config.js`以告诉 Nuxt 使用您的组件：

```js
export default {
  loading: '~/components/LoadingBar.vue'
}
```



其他 loading 效果：

```vue
<template>
  <div v-if="loading" class="spinner"></div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      setTimeout(() => {
        this.loading = false;
      }, 20000);
    },
  },
};
</script>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  background-color: #67cf22;

  /* margin: 100px auto; */
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px);
  }
  50% {
    -webkit-transform: perspective(120px) rotateY(180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
```



### 加载指示器属性

在 SPA 模式下运行 Nuxt 时，第一次页面加载时服务器端没有内容。因此，Nuxt 不会在页面加载时显示空白页面，而是为您提供了一个加载指示器，您可以自定义它以添加自己的颜色或背景，甚至更改指示器。

```js
export default {
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  }
}
```



#### 内置指示器

要使用这些微调器之一，您所要做的就是将其名称添加到 name 属性中。无需导入或安装任何东西。以下是您可以使用的内置指标列表。

这些指标是从很棒的 [SpinKit ](http://tobiasahlin.com/spinkit)项目导入的。您可以使用其演示页面预览微调器。

- circle  圈
- cube-grid  cube-grid （立方体网格）
- fading-circle  淡入淡出圈
- folding-cube  折叠立方体
- chasing-dots  追逐点
- nuxt  努斯特
- pulse  脉冲
- rectangle-bounce  矩形弹跳
- rotating-plane  旋转平面
- three-bounce  三次弹跳
- wandering-cubes  流浪立方体

内置指示器支持 `color` 和 `background` 选项。



#### 自定义指标

如果您需要自己的特殊指标，String 值或 Name 键也可以是指标源代码的 HTML 模板的路径！所有选项也都传递给模板。

如果您需要基础，也可以使用 Nuxt 的内置[源代码](https://github.com/nuxt/nuxt/tree/2.x-dev/packages/vue-app/template/views/loading)！



## transition 过渡

Nuxt 使用 transition 组件让你在路由之间创建令人惊叹的过渡/动画。

要为特定路由定义自定义过渡，请将`transition` 添加到页面组件。

```js
export default {
  // 可以是字符串
  transition: ''
  // 或者对象
  transition: {}
  // 或者函数
  transition (to, from) {}
}
```



### 字符串

如果 `transition` 设置为字符串，则它将用作 `transition.name`。

```js
export default {
  transition: 'home'
}
```

Nuxt 将使用这些设置来设置组件，如下所示：

```vue
<transition name="home"></transition>
```

此作会自动为您完成，您无需将 `<transition>` 组件添加到您的页面或布局中。

现在，您所要做的就是为您的过渡创建新类。

```css
<style>
  .home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave { opacity: 0; }
</style>
```



### 对象

如果 `transition` 设置为对象：

```js
export default {
  transition: {
    name: 'home',
    mode: 'out-in'
  }
}
```

Nuxt 将使用这些设置来设置组件，如下所示：

```vue
<transition name="home" mode="out-in"></transition>
```



你也可以在 page `transition` 属性中定义方法。

```js
export default {
  transition: {
    afterLeave(el) {
      console.log('afterLeave', el)
    }
  }
}
```



**过渡模式**

页面的默认过渡模式与 Vue.js 的默认模式不同。默认情况下，过渡模式设置为 out-in。如果要同时运行 leaving 和 entering transitions，则必须将 mode 设置为空字符串模式。

```js
export default {
  transition: {
    name: 'home',
    mode: ''
  }
}
```



### 函数

如果 `transition` 设置为函数：

```js
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    
    // / 到 /posts => 向左滑动，/posts 到 /posts？page=3 => 向左滑动，
    // /posts？page=3 到 /posts？page=2 => 向右滑动。
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
```

导航时应用的过渡：

`/` 至 `/posts` => `slide-left`，`/posts` 至 `/posts?page=3` => `slide-left`，`/posts?page=3` 至 `/posts?page=2` => `slide-right`。



### 全局设置

Nuxt 的默认过渡名称为 `“page”。`要向应用程序的每个页面添加淡化过渡，您只需要一个在所有路由之间共享的 CSS 文件。

我们的全局 CSS 为 `assets/main.css`：

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave {
  opacity: 0;
}
```

然后，我们将它的路径添加到 `nuxt.config.js` 文件中的 `css` 数组中：

```js
export default {
  css: ['~/assets/main.css']
}
```



### layoutTransition 布局过渡

layoutTransition 用于设置布局过渡的默认属性。

布局过渡的默认设置为：

```js
{
  name: 'layout',
  mode: 'out-in'
}
```

```css
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
```



如果要更改布局过渡的默认设置，可以在 nuxt.config.js 文件中执行此作。

```js
export default {
  layoutTransition: 'my-layouts'
  // or
  layoutTransition: {
    name: 'my-layouts',
    mode: 'out-in'
  }
}
```

```css
.my-layouts-enter-active,
.my-layouts-leave-active {
  transition: opacity 0.5s;
}c
.my-layouts-enter,
.my-layouts-leave-active {
  opacity: 0;
}
```



### pageTransition 页面过渡

此选项允许您定义页面过渡的默认属性。

页面过渡效果的默认设置为：

```js
{
  name: 'page',
  mode: 'out-in'
}
```



如果您想修改默认设置，可以在 nuxt.config.js

```js
export default {
  pageTransition: 'my-page'
  // or
  pageTransition: {
    name: 'my-page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

如果您确实修改了 pageTransition name，您还必须重命名 css 类。

```css
.my-page-enter-active,
.my-page-leave-active {
  transition: opacity 0.5s;
}
.my-page-enter,
.my-page-leave-to {
  opacity: 0;
}
```



## 内置组件

### `<Nuxt>`

`<Nuxt>` 组件是用于显示页面组件的组件。基本上，此组件会替换为页面组件中的内容，具体取决于所显示的页面。因此，将 `<Nuxt>` 组件添加到布局中非常重要。

`<Nuxt>` 组件只能在 layouts 中使用。

```vue
<template>
  <div>
    <div>My nav bar</div>
    <Nuxt />
    <div>My footer</div>
  </div>
</template>
```



`<Nuxt>` 组件可以采用 `nuxt-child-key` 的 prop。这个 prop 将被传递给 `<RouterView>`，这样你的过渡就可以在动态页面中正常工作。

有两种方法可以处理 `<RouterView>` 的内部 `key` 属性。

1. 在 `<Nuxt>` 组件上使用 `nuxtChildKey` 属性

   ```vue
   <template>
     <div>
       <Nuxt :nuxt-child-key="someKey" />
     </div>
   </template>
   ```

2. 在页面组件中将 `key` 选项添加为 `string` 或 `function`

   ```js
   export default {
     key(route) {
       return route.fullPath
     }
   }
   ```

   

### `<NuxtChild>`

该元件用于显示嵌套 route 中的子元件。



```
-| pages/
---| parent/
------| child.vue
---| parent.vue


[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```



要显示 `child.vue` 组件，你必须在 `pages/parent.vue` 中插入 `<NuxtChild>` 组件：

```vue
<template>
  <div>
    <h1>I am the parent view</h1>
    <NuxtChild :foobar="123" />
  </div>
</template>
```



`<NuxtChild>` 组件也可以像普通的 Vue 组件一样接收 property。

```vue
<template>
  <div>
    <NuxtChild :key="$route.params.id" />
  </div>
</template>
```





### `<KeepAlive >`

`<Nuxt>` 组件和 `<NuxtChild/>` 组件都接受 `keep-alive` 和 `keep-alive-props`。

```vue
<template>
  <div>
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- 将被转换成如下内容 -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

```vue
<template>
  <div>
    <NuxtChild keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- 将被转换成如下内容 -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```



### `<client-only>`

此组件用于特意仅在客户端呈现组件。要仅在客户端上导入组件，请在仅限客户端的插件中注册该组件。

```vue
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- 该组件仅在客户端渲染 -->
      <comments />
    </client-only>
  </div>
</template>
```



使用插槽作为占位符，直到 `<client-only />` 挂载到客户端。

```vue
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- 该组件仅在客户端渲染 -->
      <comments />

      <!-- 加载指示器，在服务器端渲染 -->
      <template #placeholder>
        <comments-placeholder />        
      </template>
    </client-only>
  </div>
</template>
```



有时，在服务器渲染的页面 `$refs` 内部，即使 `$nextTick`，`<client-only>` 也可能没有准备好，诀窍可能是调用 `$nextTick` 几次：

```js
mounted(){
  this.initClientOnlyComp()
},
methods: {
  initClientOnlyComp(count = 10) {
    this.$nextTick(() => {
      if (this.$refs.myComp) {
        //...
      } else if (count > 0) {
        this.initClientOnlyComp(count - 1);
      }
    });
  },
}
```



## 预览模式

使用预览模式对 target static 进行实时预览。

借助 Nuxt 和完全静态，您现在可以使用开箱即用的实时预览，它将调用您的 API 或 CMS，以便您可以在部署之前实时查看更改。

**注意：仅在使用 `target：static` 时可用**



预览模式会自动刷新页面数据，因为它在后台使用 `$nuxt.refresh`，因此会在客户端调用 nuxtServerInit、asyncData 和 fetch。

要激活实时预览，您需要添加以下插件：

```js
// /plugins/preview.client.js
export default function ({ query, enablePreview }) {
  if (query.preview) {
    enablePreview()
  }
}
```

`enablePreview` 仅在插件的 context 对象中可用。预览在客户端处理，因此插件应该在客户端上运行：preview.client.js

```js
export default {
  plugins: ['~/plugins/preview.client.js']
}
```

添加插件后，您现在就可以生成您的网站并提供服务。

```sh
npx nuxt generate
npx nuxt start
```

然后，您可以通过将查询参数添加到您想要查看的页面末尾来查看预览页面：

```
?preview=true
```



您可以将数据传递给 `enablePreview` 函数。然后，该数据将在 `$preview` 上下文帮助程序和 `this.$preview` 上可用。



**预览尚未生成的页面**

对于尚未生成的页面，SPA 回退仍将在显示 404 页面之前调用 API，因为这些页面存在于 API 上，但尚未生成。

如果你已经设置了一个 validate 钩子，你可能需要修改它，这样它就不会在预览模式下重定向到 404 页面。

```js
validate({ params, query }) {
  if (query.preview) {
    return true
  }
}
```









## 图示

### 视图

![Nuxt 中的视图组成](https://v2.nuxt.com/_nuxt/image/f55faf.png)





### 上下文

![img](https://v2.nuxt.com/_nuxt/image/c12c33.svg)



### 生命周期

![img](https://v2.nuxt.com/_nuxt/image/de48ca.svg)



### 组件发现

![img](https://v2.nuxt.com/_nuxt/image/e6923a.png)



### content 模块

![img](https://v2.nuxt.com/_nuxt/image/7d701f.svg)



### Nuxt Modules

![img](https://v2.nuxt.com/_nuxt/image/baa865.svg)



### Nuxt Plugins

![img](https://v2.nuxt.com/_nuxt/image/5d7783.svg)



