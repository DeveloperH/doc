# webpack

## 概述

[webpack](https://webpack.js.org/) 是一个前端资源加载/打包工具，它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

在打包过程中，能够将多个js/css/jpg/...格式的文件压缩合并成一个或多个文件，这样可以减少http请求数，提升了效率。



能做什么:

1. 语法转换
   - less/sass/stylus转换成css
   - ES6转换成ES5
   - ...
2. html/css/js代码压缩合并(打包)
3. webpack可以在开发期间提供一个开发环境
   - 自动打开浏览器
   - 保存时自动刷新
4. 项目一般先打包再上线



**webpack 是基于入口的，webpack会自动递归解析入口所需要加载的所有资源文件，然后用不同的loader来处理不同的文件，用plugin来扩展webpack功能。**

webpack 支持所有符合es5标准的浏览器，但不包含ie8及以下版本。webpack的import() 和 require.ensure() 需要promise，如果想支持旧版本的浏览器，在使用这些表达式的时候，需要提前加载 `polyfill` 。





### 优缺点

* 专注于处理模块化的项目，能做到开箱即用，一步到位
* 可以通过plugin扩展，完整好用又不失灵活
* 使用场景不限于web开发
* 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展
* 良好的开发体验
* 缺点则是，只能用于采用模块化开发的项目



### 几个常用属性

* entry : 设置入口文件
* output : 设置打包输出的目录
* mode : 设置打包的模式
* module : 在里面配置不同的规则，让loader对不同的文件进行处理和转换。
  * loader有两个属性，test属性用于识别出哪些文件会被转换，use属性用于在进行转换时，应该使用哪个loader
* plugins : 配置扩展的插件。例如：打包优化，资源管理，注入环境变量。



### 几个常用的loader

* babel-loader : 将ES6语法转换为es5
* css-loader : 让webpack可以解析识别css文件
* style-loader : 通过动态的创建style标签的方式，让解析后的css内容，能够作用到页面中
* less-loader  sass-loader : 将less/sass转换为css
* file-loader : 把文件输出到一个文件夹中，在代码中通过相对url去引用输出的文件，v5已启用
* url-loader : 能够将比较小的文件转换为base64格式，并注入到代码中，v5已启用
* source-map-loader : 加载额外的sourceMap文件，以方便断点调试



### 几个常用的plugin

* DefinePlugin : 定义全局可用的环境变量
* html-webpack-plugin : 设置生成的html模板文件，为html文件中自动引入打包后的资源
* mini-css-extract-plugin : 分离css文件
* clean-webpack-plugin : 每次打包前删除之前的打包文件
* terser-webpack-plugin : 压缩



### webpack模块

webpack 模块 能以各种方式表达它们的依赖关系。下面是一些示例：

* ES2015 `import` 语句
* CommonJS `require()` 语句
* AMD `define` 和 `require` 语句
* css/sass/less 文件中的 `@import` 语句。
* stylesheet `url(...)` 或者 HTML `<img src=...>` 文件中的图片链接。







## 基本使用

1. 首先创建一个目录，初始化npm，然后在本地安装 `webpack` 和 `webpack-cli` ，并设置为开发依赖

   ```bash
   mkdir demo
   cd demo
   npm init -y
   npm install webpack webpack-cli -D
   ```

   

2. 创建入口文件目录 `/src/main.js` 和打包输出目录 `/dist`

3. 在 `package.json` 文件中，配置 scripts

   ```json
   "scripts": {
     "build": "webpack --config webpack.config.js"
   }
   ```

   

4. 创建 `webpack.config.js` 文件，并进行配置。配置文件中的路径是以`项目根目录`为基准。

   ```js
   const path = require('path')
   
   // 配置webpack的配置文件，需要将配置的对象导出，给webpack使用
   module.exports = {
     // entry: 配置入口文件(从哪个文件开始打包)
     entry: './src/main.js',
   
     // output: 配置输出(打包到哪去)
     output: {
       // 打包输出的目录(必须是绝对路径)
       path: path.join(__dirname, 'dist'),
       // 打包后生成的文件名
       filename: 'bundle.js'
       // 也可以将打包后的文件放在dist目录下的指定位置，目录会自动创建
       // filename: 'js/bundle.js'
     },
   
     // 打包模式 development 未压缩的 / production 压缩(上线选择)
     mode: 'development'
   }
   ```

   

5. 打包

   ```bash
   npm run build
   ```

   

## 插件

插件能够扩展webpack功能，webpack 附带了各种内置插件，可以通过 webpack.[plugin-name] 访问这些插件。



### html-webpack-plugin (自动生成html插件)

在 index.html 中手动引入打包后的资源，是有缺点的。

比如: `如果webpack配置文件中的输出文件名修改了，需要及时在index.html中同步更改`

通过 html-webpack-plugin 插件配置好了之后，public 目录的 index.html 就不需要引入打包后的文件了，会自动被插件生成 html 引入。



1. 下载

   ```bash
   npm install html-webpack-plugin -D
   ```

   

2. 在 `webpack.config.js` 文件中，引入这个模块

   ```js
   // 引入自动生成 html 的插件
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   ```

   

3. 配置

   ```js
   plugins: [
     new HtmlWebpackPlugin({ template: './public/index.html'})
   ]
   ```





### clean-webpack-plugin(清除dist目录插件)

使用该插件可以在每次打包前清除 dist 文件夹下的所有目录和文件。



1. 安装依赖

   ```bash
   npm install clean-webpack-plugin -D
   ```

   

2. 配置

   ```js
   // 导入清除插件
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')
   
   module.exports = {
   	// 其他配置
   	
   	plugins: [
   		// 调用清除打包目录插件
   		new CleanWebpackPlugin()
   	]
   }
   ```




在webpack v5.20.0+ 版本中，还可以通过配置 `output.clean` 实现打包之前清空 dist 目录功能。

```js
module.exports = {
  //...
  output: {
    clean: true, // 在生成文件之前清空 output 目录
  },
};
```





### 内置插件



#### DefinePlugin

`DefinePlugin` 允许在 **编译时** 将你代码中的变量替换为其他值或表达式。这在需要根据开发模式与生产模式进行不同的操作时，非常有用。

例如: 开发环境和生产环境的请求的服务器地址不同，这时就通过 DefinePlugin 设置变量，并在模块中使用。



传递给 `DefinePlugin` 的每个键都是一个标识符或多个以 `.` 连接的标识符。

- 如果该值为字符串，它将被作为代码片段来使用。
- 如果该值不是字符串，则将被转换成字符串（包括函数方法）。
- 如果值是一个对象，则它所有的键将使用相同方法定义。
- 如果键添加 `typeof` 作为前缀，它会被定义为 typeof 调用。

这些值将内联到代码中，从而允许通过代码压缩来删除冗余的条件判断。



请注意，由于本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个 **实际的引号** 。通常，可以使用类似 `'"production"'` 这样的替换引号，或者直接用 `JSON.stringify('production')`。



`webpack.config.js`

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // 定义
      SERVICE_URL: JSON.stringify('https://www.baidu.com'),
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ]
}
```

`模块中使用变量`

```js
console.log(SERVICE_URL)
console.log(TWO)		// 2
if(PRODUCTION){
  console.log('生产环境')
}
console.log(process.env.NODE_ENV)		// 直接获取mode
```





## loader

webpack 默认只认识js和json文件，但是webpack可以使用 `loader` 来加载预处理文件，允许webpack也可以打包js之外的静态资源。

所以，webpack如果要处理其他文件类型，**记得要先配置对应的 `loader`**



在更高层面，在 webpack 的配置中，`loader` 有两个属性：

1. `test` 属性，识别出哪些文件会被转换。
2. `use` 属性，定义出在进行转换时，应该使用哪个 loader。实际处理顺序: 从右往左



### 处理css文件

* `css-loader` : 让webpack能够识别解析css文件
* `style-loader` : 通过动态的创建style标签的方式，让解析后的css内容，能够作用到页面中

注意: 记得在要处理的js文件中引入css文件 `require('./css/base.css')`



1. 安装依赖

   ```bash
   npm install style-loader css-loader -D
   ```

   

2. 配置

   ```js
   // 配置module模块加载规则
   module: {
     rules: [
       {
         // 正则: 匹配所有以css结尾的文件
         test: /\.css$/,
         // 先用 css-loader 让webpack能够识别 css 文件的内容
         // 再用 style-loader 将样式，以动态创建style标签的方式添加到页面中去
         use: ['style-loader', 'css-loader']
       }
     ]
   }
   ```




### 分离css文件

将css放到了style标签中，虽然请求次数是少了，但是如果css文件太大的话，这样处理并不是很好。

* `mini-css-extract-plugin` : 分离css文件插件



1. 安装依赖，需要注意的是，它还需要 `css-loader` 依赖

   ```bash
   npm install mini-css-extract-plugin -D
   ```

   

2. 在 `webpack.config.js` 中引入模块

   ```js
   // 引入分离 css 文件的插件
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   ```

   

3. 配置 loader

   ```js
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           {
             loader: MiniCssExtractPlugin.loader,
             options: {
               publicPath: '../'
             }
           },
           'css-loader'
         ]
       }
     ]
   }
   ```

   

4. 插件的配置

   ```js
   plugins: [
     // 定义打包好的文件的存放路径和文件名
     new MiniCssExtractPlugin({
       filename: 'css/index.css'
     })
   ]
   ```

   

### 处理less文件

* `less` : 识别less语法
* `less-load` : 将less转换成css



1. 安装依赖

   ```bash
   npm install less less-loader -D
   ```

   

2. 配置规则

   ```js
   {
     test: /\.less$/,
     use: [
     	// 分离css文件
       {
         loader: MiniCssExtractPlugin.loader,
         options: {
           publicPath: '../'
         }
       },
       'css-loader',
       'less-loader'
     ]
     // 如果不需要分离css文件
     // use: ['style-loader', 'css-loader', 'less-loader']
   }
   ```

   

### 处理sass文件

加载 Sass/SCSS 文件并将他们编译为 CSS

* `sass` : 识别Sass/SCSS语法
* `sass-load` : 将Sass/SCSS转换成css



1. 安装依赖

   ```bash
   npm install sass sass-loader -D
   ```

   

2. 配置规则

   ```js
   {
     test: /\.s[ac]ss$/i,
     use: [
     	// 分离css文件
       {
         loader: MiniCssExtractPlugin.loader,
         options: {
           publicPath: '../'
         }
       },
       'css-loader',
       'sass-loader'
     ]
     // 如果不需要分离css文件
     // use: ['style-loader', 'css-loader', 'sass-loader']
   }
   ```

   

`main.js`

```js
import './style.scss';
```

`style.scss`

```scss
$body-color: red;

body {
  color: $body-color;
}
```

如果是在 `<style>` 标签中，使用 `@import './style.scss';` 引入。





### 处理图片等资源

#### v5版本

v5版本的webpack中，提供了资源模块。资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。



在 `webpack.config.js` 的 模块加载规则中配置以下信息

```js
{
  test: /\.(png|jpg|gif)$/i,
  // asset: 小于 8k 就转成 base64，超过 8k 就直接打包到目录中
  type: 'asset',
  // 以下为可选
  generator: {
    // 将文件发送到输出目录的static目录中，默认是发送到dist下的根目录
    filename: 'static/[hash][ext][query]'
    // 以原文件名输出到dist下的指定目录
    // filename: 'static/[name][ext]'
  }
}
```





#### v4版本

* `url-loader` : 处理图片，图片默认转成base64字符串
* `file-loader` : `url-loader` 中部分功能需要用到它



1. 安装依赖

   ```bash
   npm install url-loader file-loader -D
   ```

   

2. 配置loader

   ```js
   {
     test: /\.(png|jpg|gif)$/i,
     use: [
       { loader: 'url-loader' }
     ]
   }
   ```

   图片默认转成base64字符串了，

   * 好处就是浏览器不用发请求了，直接可以读取
   * 坏处就是如果图片太大，再转base64就会让图片的体积增大30%左右，得不偿失

   所以，需要通过options配置选项进行更详细的配置。

   

3. **可选**，通过options属性进行详细配置

   ```js
   {
     test: /\.(png|jpg|gif)$/i,
     use: [
       {
         loader: 'url-loader',
         // 以下为可选
         options: {
           // 临界值，小于 8k 就转成 base64，超过 8k 就直接打包到目录中
           limit: 8 * 1024,
           // 设置静态资源打包的名字和扩展为原名
           name: '[name].[ext]',
           // 配置静态资源的的引用路径，publicPath 目录名需要与outputPath 目录相同
           publicPath: '../images/',
           // 配置输出的文件目录，默认是直接输出到了dist根目录
           outputPath: 'images/'
         }
       }
     ]
   }
   ```



### babel

用于处理高版本的js语法



1. 安装依赖

   ```bash
   npm install babel-loader @babel/core @babel/preset-env -D
   ```

   

2. 配置规则

   ```js
   modules: {
   	rules: [
       {
         test: /\.js$/,
         // 配置排除项  bower_components 是旧的包管理器，可以省略
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: ['@babel/preset-env']
           }
         }
       }
   	]
   }
   ```











## webpack-dev-server开发服务器

开发服务器: 可以在开发期间提供一个开发环境，能够自动保存刷新，并且自动打开浏览器。

注意: `webpack-dev-server v4.0.0+` 要求 `node >= v12.13.0`

文档: https://webpack.docschina.org/configuration/dev-server/



1. 安装依赖

   ```bash
   npm install webpack-dev-server -D
   ```

   

2. 配置 scripts

   ```json
   "scripts": {
     "build": "webpack --config webpack.config.js",
     "dev": "webpack-dev-server --config webpack.config.js"
   }
   ```

   

3. 配置 `webpack.config.js`

   ```js
   module.exports = {
   	...
     // 配置开发服务器
     devServer: {
       port: 3000,   // 端口号
       open: true    // 自动打开浏览器
     }
   }
   ```

   



## 配置文件分离

因为开发环境和生产环境的不同，不能共用一份webpack配置文件，所以需要分别指定。

但是两个环境还是有很多配置可以公用的，比如entry、output、module等，因此可以把公共部分的配置抽离出来放到一个独立的文件然后进行合并。

可以使用 `webpack-merge` 工具进行合并。



1. 安装依赖

   ```bash
   npm install webpack-merge -D
   ```

   

2. 拆分 `webpack.config.js` 文件，拆分后这个文件就不要了

   新建 `config` 文件夹:

   ```js
   - 项目名demo
   	- config		// 存放配置文件的目录
   		- webpack.base.js		// 公共的配置
   		- webpack.dev.js		// 开发环境的配置
   		- webpack.pro.js		// 生产环境的配置
   ```

   

3. 根据不同环境进行配置(以下为示例)

   `webpack.base.js` 注意: 需要修改配置项中出现的绝对位置

   ```js
   const path = require('path')
   // 引入自动生成 html 的插件
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     entry: './src/main.js',
   
     output: {
       // 注意: 需要修改配置项中出现的绝对位置
       path: path.join(__dirname, '../dist'),
       filename: 'js/bundle.js'
     },
   
     module: {
       rules: [
   			// ...
       ]
     },
   
     // 插件配置
     plugins: [
       new HtmlWebpackPlugin({ template: './public/index.html'})
     ],
   
   }
   ```

   `webpack.dev.js`

   ```js
   // 引入公共配置文件
   const base = require('./webpack.base.js')
   // 引入用于合并webpack配置的插件
   const { merge } = require('webpack-merge')
   
   // 导出开发环境的配置
   // merge 可以接受多个参数，把多个参数合并成一个对象。如果有重复的属性名，后面的对象属性会覆盖前面的
   module.exports = merge(base, {
     devServer: {
       port: 3000,
       open: true
     },
     mode: 'development'   // 声明当前是开发环境
   })
   ```

   `webpack.pro.js`

   ```js
   const base = require('./webpack.base.js')
   const { merge } = require('webpack-merge')
   
   module.exports = merge(base, {
     mode: 'production'  // 声明当前是生产环境
   })
   ```

   

4. 修改 scripts，注意配置文件的路径变化

   ```json
   "scripts": {
     "build": "webpack --config config/webpack.pro.js",
     "dev": "webpack-dev-server --config config/webpack.dev.js"
   }
   ```

   



## 多入口多出口

如果有多个入口文件需要引入，就需要配置多入口。例如需要同时引入 `src/index.js` 和 `src/about.js`。

> 注意: index.js 和 about.js 没有任何关系，都是独立的不相互引用



`src/index.js`

```js
var element = document.createElement('span')
element.innerHTML = 'index'
document.body.appendChild(element)
```

`src/about.js`

```js
var element = document.createElement('div')
element.innerHTML = 'about'
document.body.appendChild(element)
```



### 配置

`config/webpack.base.js` 配置文件

```js
// 其他代码

module.exports = {
  // 用对象的方式配置多个入口
  entry: {
    index: './src/index.js',
    about: './src/about.js'
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].bundle.js'		// [name] 指代 entry中的对象的键名
  },
  
  // 其他代码
}
```

`output.filename` 输入文件名的占位符

* [name] : 使用 entry 中的对象的键名
* [id] : 使用内部 chunk id
* [contenthash] : 使用由生成的内容产生的 hash。长度可以用 [contenthash:16] (默认20) 来指定。

```js
module.exports = {
  //...
  output: {
    filename: '[name].[contenthash].bundle.js',		// 也可以混合使用
  },
}
```









### 提取公共模块

当在 index 和 about 这两个独立入口文件中，如果引入了相同的模块(例如jQuery)，这些模块会被重复打包。这样会增加打包后的文件体积，因此需要提取公共模块。



1. 将jquery库分别引入到 index.js 和 about.js中并打包。查看打包后的文件源码，会发现它们都把jquery.js打包进去了。所以我们需要把类似 `公共的依赖模块` 提取到一个单独的文件中。

   

2. 配置 `config/webpack.base.js`

   ```js
   module.exports = {
     // 其他代码
     
     // 提取公共模块配置
     optimization: {
       splitChunks: {
         chunks: 'all'   // 提取所有文件的共同模块
       }
     }
   }
   ```

   

3. 再次执行打包后发现，当前项目的公共模块jquery的内容已经被打包到一个独立的js文件中了。这个文件名可以通过配置进行修改。

   注意的是: 公共模块的大小必须大于 `30kb` 才会被独立打包。





## 处理vue

安装vue: `npm install vue`



### vue-loader

在入口文件中引入 `vue文件` ，在打包时会报错，因为webpack并不认识vue单文件组件，所以需要使用对应的 loader 来进行处理。

1. 安装依赖

   ```bash
   npm install vue-loader vue-template-compiler -D
   ```

   

2. 配置

   ```js
   const VueLoaderPlugin = require('vue-loader/lib/plugin')
   
   module.exports = {
   	module: {
   		rules: [
   			// 其他规则
         {
           test: /\.vue$/,
           loader: 'vue-loader'
         }
   		]
   	},
   	
   	plugins: [
   		new VueLoaderPlugin()
   	]
   }
   ```

   



### 路由配置

前提: 已经配置 `vue-loader`

1. 安装依赖

   ```bash
   npm install vue-router
   ```

   

2. 创建组件 `src/views/Home.vue` 和 `src/views/Login.vue`

3. 配置入口文件 `main.js`

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   import VueRouter from 'vue-router'
   import Home from './views/Home.vue'
   import Login from './views/Login.vue'
   
   Vue.use(VueRouter)
   
   const router = new VueRouter({
     routes: [
       { path: '/', redirect: '/Home'},
       { path: '/home', component: Home},
       { path: '/login', component: Login}
     ]
   })
   
   new Vue({
     el: '#app',
     // 使用vue底层的渲染方法
     // 作用: 使用App组件作为根组件，用来渲染视图
     // render: h => h(App)  // 简写
     render: function(createElement) {
       return createElement(App)
     },
     router
   })
   ```



如果把路由配置都放在 main.js 中，体积会变大，并且不方便管理，我们可以分离出路由的配置。

1. 创建 `src/router/index.js` 文件，这个文件就是路由的配置信息

   ```js
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   // 需要注意导入的组件的路径
   import Home from '../views/Home.vue'
   import Login from '../views/Login.vue'
   
   Vue.use(VueRouter)
   
   const router = new VueRouter({
     routes: [
       { path: '/', redirect: '/Home'},
       { path: '/home', component: Home},
       { path: '/login', component: Login}
     ]
   })
   
   // 导出路由配置
   export default router
   ```

   

2. 配置入口文件 `main.js`

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   import router from './router'
   
   new Vue({
     el: '#app',
     render: h => h(App),
     router
   })
   ```





### vue-cli 脚手架环境

创建vue项目: `vue create 项目名`



#### vue.config.js

在用vue脚手架搭建的环境中，并没有提供 `webpack.config.js` 配置文件，我们可以在根目录下创建 `vue-config.js` 配置文件，在这里面配置的内容，会覆盖默认的webpack配置。

```js
// vue.config.js
module.exports = {
  devServer: {
    port: 3000,
    open: true
  }
}
```

重新执行 `npm run serve` 就会以我们配置的方案运行。



#### rem 布局插件

插件 `postcss-pxtorem` 的配置

1. 安装插件

   ```bash
   npm install lib-flexible postcss-px2rem
   ```

   

2. 在 `public/index.html` 中删除 meta 标签

   flexible 会为页面根据屏幕自动添加 `<meta name="viewport">` 标签，动态控制其中的缩放属性的值。

   

3. 在 `src/main.js` 中导入插件包

   ```js
   // 导入rem 的js，动态的设置了不同屏幕的html根元素的 font-size
   import 'lib-flexible'
   ```

   

4. 配置 `vue.config.js`

   ```js
   module.exports = {
     // rem 的配置
     css: {
       loaderOptions: {
         css: {},
         postcss: {
           plugins: [
             require('postcss-px2rem')({
               // 适配 375 屏幕，设计图750中量出来的尺寸要 / 2
               // 配置成 37.5 是为了兼容 没有适配rem布局的第三方ui库
               remUnit: 37.5
             })
           ]
         }
       }
     }
   }
   ```

   

5. 重启项目，两个用于移动端适配的包就这样可以愉快的开始使用了

6. 在代码中，我们可以直接用px来写宽高。在浏览器上，就会自动从px转换成了rem

   ```css
   .box {
     width: 200px;
     height: 200px;
     background-color: pink;
     font-size: 20px;
   }
   ```

   

温馨提示： remUnit这个配置项的数值是多少呢？？？ 通常我们是根据设计图来定这个值，原因很简单，便于开发。假如设计图给的宽度是750，我们通常就会把remUnit设置为75，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。

那为什么你在这里写成了37.5呢？

之所以设为37.5，是为了引用像mint-ui这样的第三方UI框架，因为第三方框架没有兼容px2rem ，将remUnit的值设置为设计图宽度（这里为750px）75的一半，即可以1:1还原mint-ui的组件，否则会样式会有变化，例如按钮会变小。

既然设置成了37.5 那么我们必须在写样式时，也将值改为设计图的一半。





#### 反向代理

webpack的反向代理，可以起一个临时的代理服务器，帮助在开发过程中的跨域问题，就算跨域了也能拿到后台的数据。



1. 安装axios

   ```
   npm install axios
   ```

   

2. 发送请求

   ```js
   import axios from 'axios'
   export default {
     async created () {
       // 发送ajax请求，获取数据
       const url = '/hotkey/gethotkey.fcg?_=1635681604258&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=1&uin=0&g_tk_new_20200303=5381&g_tk=5381&hostUin=0'
       const res = await axios.get(url)
       console.log(res.data.data)
     }
   }
   ```

   

3. `vue.config.js` 中配置代理

   ```js
   module.exports = {
     devServer: {
       port: 3000,
       open: true,
       // 配置代理服务器
       proxy: {
         // 将来只要请求的路径，以 /hotkey 开头，都会被代理
         // 例如: /hotkey/getlist => https://c.y.qq.com/splcloud/fcgi-bin/getlist
         '/hotkey': {
           target: 'https://c.y.qq.com/splcloud/fcgi-bin/',  // 代理的基础路径
           pathRewrite: { '^/hotkey': '' }                   // 将"暗号"路径 置为空
         }
       }
     }
   }
   ```

4. 重启项目























