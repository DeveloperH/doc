# uniapp

## 介绍

uniapp 一套代码适配 ios/Android/H5/各种小程序平台。

官网：https://uniapp.dcloud.net.cn/

组件示例：https://hellouniapp.dcloud.net.cn/pages/component/view/view

原生开发者支持文档：https://nativesupport.dcloud.net.cn/

HTML5 产业联盟： https://www.html5plus.org/



* 常见问题：https://uniapp.dcloud.net.cn/faq.html

  



快捷键：

* `Alt + 鼠标单击` 或 `F12` ：转到定义



优点:

* 学习成本低，基于vue，微信小程序api
* 开发成本低，一套代码多端应用
* 按需编译，通过注释写法，即可保留平台特点(微信卡包)，又不增加其他平台发布资源包大小



## 创建项目并运行

### HBuilderX 

1. HBuilderX -> 创建项目 -> 选择uniapp空模板
2. 微信开发者工具 -> 设置 -> 安全设置 -> 打开服务端口
3. HBuilderX -> 运行 -> 小程序模拟器 —> 运行设置 -> 设置微信小程序开发者工具路径
4. 运行 -> 小程序模拟器 -> 启动



### vue-cli

```sh
# 创建 vue2 项目，需要全局安装 vue-cli 
npm install -g @vue/cli
# 使用正式版
vue create -p dcloudio/uni-preset-vue my-project
# 使用alpha版
vue create -p dcloudio/uni-preset-vue#alpha my-alpha-project

# 使用Vue3/Vite版，要求 node 版本 18+、20+
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
npx degit dcloudio/uni-preset-vue#vite-alpha my-vue3-project

# 创建以 typescript 开发的工程
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project

# 运行、发布uni-app
npm run dev:%PLATFORM%
npm run build:%PLATFORM%
```



### vscode

```sh
npm init -y

# uniapp语法提示、组件语法提示
npm i @dcloudio/types @dcloudio/uni-helper-json -D
```

或者安装 vscode 插件：uni-helper。



## 目录介绍

* `unpackage` : 启动项目时，自动生成目录。会自动生成多版本代码
* `pages` : 业务页面文件存放目录，可被用于添加路由、配置页面、配置系统底部导航等
* `static` : 存放应用引用静态资源(如图片、视频等) 的地方
* `uni.scss` : 全局通用scss样式库。不需要引入，使用时在 `<style>` 加 `lang="scss"` ，且需要安装scss编译插件
* `pages.json` : 通用部分配置项(页面路由、导航条、选项卡等页面类信息)
* `manifest.json` : 项目常用配置，例如微信小程序appid
* `main.js` : 项目入口文件
* `App.vue` : 用来配置App全局样式以及监听应用的生命周期
* `自定义 components目录` : 用于存放自定义组件。组件间的通信可以使用vue的方式，也可以使用uniapp提供的事件订阅
  * `$on` 注册事件，可以被调用多次
  * `$once` 注册事件，只能被调用一次
  * `$emit` 触发事件



## pages.json配置项

* pages : 设置页面的所有路径
* tabBar : 设置底部tab导航



## App.vue配置项

这个文件的作用包括：调用应用生命周期函数、配置全局样式、配置全局的存储globalData

```js
// 声明全局变量，globalData支持vue和nvue共享数据。
globalData: {
  text: 'text'
},
// 可以设置 option 属性，该属性中包含路径信息和场景值
onLaunch: function(option) {
  console.log('App Launch')
  console.log(option)
},
onShow: function() {
  console.log('App Show')
}
```



```js
// 通过api访问全局变量
getApp().globalData.text = 'test'
console.log(getApp().globalData.text) // 'test'
```





## 视图模板进阶使用

```html
<!-- 在 uniapp 的视图模板中可以使用更加复杂的表达式，而小程序不支持 -->
<text>{{title}}</text>
<text>{{"zhangsan".indexOf('san')!=-1?"yes":"no"}}</text>
<text>{{"我爱北京天安门".slice(0,1)}}</text>
<text>{{false||""||"结果"}}</text>
```

当然，尽量避免在视图模板中写过多的逻辑，因为视图中主要负责显示。



## 样式

* 使用 `@import` 语句可以导入外联样式表，需要使用相对路径来导入，并且 `;` 结尾。
* 支持基本常用的选择器 `class、id、element` 等。非H5端不支持使用 `*` 选择器。
* `page` 相当于 `body` 节点。body的元素选择器请改为page，同样，div和ul和li等改为view、span和font改为text、a改为navigator、img改为image。
* 非H5端默认并未启用 scoped，如需要隔离组件样式可以在 style 标签增加 scoped 属性。
*  定义在 `App.vue` 中的样式为全局样式。
* 支持使用字体图标，不过需要注意以下几点：
  * 字体文件小于40kb，`uni-app` 会自动将其转换为base64格式
  * 字体文件大于40kb，需开发者自己转换，否则使用将不生效
  * 字体文件的引用路径推荐以 `~@` 开头的绝对路径



```css
@import url('./a.css');

@font-face {
	font-family: "myfont";
	src: url('~@/static/iconfont.ttf');
}
```



### `--window-top` 和 `--window-bottom`

APP 和小程序的导航栏和 `tabbar` 均是原生控件，元素区域坐标是不包含原生导航栏和 `tabbar` 的；而 H5 里导航栏和 `tabbar` 是 div 模拟实现的，所以元素坐标会包含导航栏和tabbar的高度。为了优雅的解决多端高度定位问题，`uni-app` 新增了2个css变量：`--window-top` 和 `--window-bottom`，这代表了页面的内容区域距离顶部和底部的距离。举个实例，如果你想在原生`tabbar` 上方悬浮一个菜单，之前写 `bottom:0`。这样的写法编译到 h5 后，这个菜单会和 `tabbar` 重叠，位于屏幕底部。而改为使用 `bottom:var(--window-bottom)`，则不管在 app 下还是在h5下，这个菜单都是悬浮在 `tabbar` 上浮的。这就避免了写条件编译代码。当然仍然也可以使用 H5 的条件编译处理界面的不同。

CSS 內使用 `vh` 单位的时候注意 `100vh` 包含导航栏，使用时需要减去导航栏和 `tabBar` 高度，部分浏览器还包含浏览器操作栏高度，使用时请注意。



## 组件间传值

和vue一样，组件中可以相互传递数据。



父组件

```vue
<template>
	<view>
		<Test :msg="msg" @testShowName="testEvent" />
	</view>
</template>

<script>
	import Test from '../../components/test.vue'
	export default {
		data() {
			return {
				msg: '消息'
			}
		},
		components:{
			Test
		},
		methods: {
      // 当 testShowName 被触发后执行
			testEvent(res){
				console.log(res)
			}
		}
	}
</script>
```



子组件

```vue
<template>
	<view>
		<text>test组件{{ msg }}</text>
		<button type="primary" @click="sendName">Event</button>
	</view>
</template>

<script>
	export default {
		name: "test",
		data() {
			return {
			};
		},
		props: ['msg'],	// 接收父组件直接传递的属性
		methods: {
      // 触发父组件中监听的方法testShowName，并传递数据
			sendName() {
				this.$emit('testShowName', {
					'name': 'hlw'
				})
			}
		}
	}
</script>
```



uniapp 还提供了事件监听的api。`uni.$on()  uni.$once()  uni.$emit()`

```js
// 父组件中只要在生命周期中监听事件，不再需要在子组件上绑定事件
onLoad() {
  uni.$on('testEmit', (res)=>{
    console.log(res)
  })
}
```

```vue
// 子组件中触发 父组件监听的事件
<button type="primary" @click="sendName">Event</button>

// ...

methods: {
  sendName() {
    uni.$emit('testEmit', {
      name: 'zs'
    })
  }
}
```



## 生命周期

### 应用生命周期

* onLaunch : 当`uni-app` 初始化完成时触发（全局只触发一次）
* onShow : 当 `uni-app` 启动，或从后台进入前台显示
* onHide : 当 `uni-app` 从前台进入后台
* ...



**注意**

* 应用生命周期仅可在`App.vue`中监听，在其它页面监听无效。
* 在生命周期函数中可以设置 option 属性，该属性中包含路径信息和场景值



### 页面生命周期

* onLoad : 监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）。只执行一次
* onShow : 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回到当前页面
* onReady : 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发。只执行一次
* onHide : 监听页面隐藏
* onUnload : 监听页面卸载
* onResize : 监听窗口尺寸变化
* onPullDownRefresh: 监听用户下拉动作，一般用于下拉刷新
  * 需要在 `pages.json` 里，找到的当前页面的pages节点(或者globalStyle)，并在 `style` 选项中开启 `enablePullDownRefresh`。
* onTabItemTap: 点击 tab 时触发，参数为Object
* onShareAppMessage: 用户点击右上角分享
* ...



```js
onShareAppMessage(){
  console.log('分享')
  // 设置分享内容
  return {
    title: "最靓仔",
    path: 'pages/index/index',
    imageUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }
}
```



### 组件生命周期

`uni-app` 组件支持的生命周期，与vue标准组件的生命周期相同。

* beforeCreate : 在实例初始化之后被调用。
* created : 在实例创建完成后被立即调用。
* beforeMount : 在挂载开始之前被调用。
* mounted : 挂载到实例上去之后调用。
* beforeUpdate : 数据更新时调用，发生在虚拟 DOM 打补丁之前。
* updated : 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
* beforeDestroy : 实例销毁之前调用。在这一步，实例仍然完全可用。
* destroyed : Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。





## 路由跳转

* uni.switchTab() : 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
* uni.navigateTo() : 保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack`可以返回到原页面。
  * 页面跳转路径有层级限制，不能无限制跳转新页面
* uni.navigateBack() : 关闭当前页面，返回上一页面或多级页面。
* uni.redirectTo() : 关闭当前页面，跳转到应用内的某个页面。
* uni.reLaunch() : 关闭所有页面，打开到应用内的某个页面。



注意: 跳转到 tabBar 页面只能使用 switchTab 跳转。

```js
uni.navigateTo({
  url:"../../components/one/one?name=zs&age=11"
})

uni.navigateTo({
  url:"../../components/one/one",
  success(){
    console.log('ok')
  },
  fail(){
    console.log('error')
  }
})
```



## 网络请求

### uni.request()

```js
uni.request({
  url:'http://jsonplaceholder.typicode.com/comments',
  data: {
    id: 5
  },
  success:(res)=>{
    console.log(res)
  }
})
```





## uniapp中使用Vuex

1. 在根目录创建 `store文件夹` ,并在里面创建 `index.js`

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   Vue.use(Vuex)
   export default new Vuex.Store({
   	// 全局属性变量
   	state: {
   		num: 0,
   		name: '苹果',
   		price: 10,
   		list: []
   	},
   	// 全局同步方法  调用方式: this.$store.commit('xxx')
   	mutations: {
   		add(state) {
   			state.num++
   			console.log(state.num)
   		}
   	},
   	// Vuex属性计算，在视图里面当变量使用。当属性发送变化时会自动计算
   	getters: {
   		money(state) {
   			// 这个函数的执行依赖一个可变的变量
   			return state.num * state.price
   		}
   	},
   	// 异步方法  调用方式: this.$store.dispatch('xxx')
   	actions: {
   		// 执行一些异步操作，比如ajax
   		testActions(context) {
   			// context 上下文，里面包含了 state、getters、commit、dispatch
   			setTimeout(() => {
   				context.state.list = ['张三', '李四', '王五']
   			}, 2000)
   		}
   	}
   })
   ```

   

2. 在 `main.js` 中引入vuex配置信息

   ```js
   ...
   import store from 'store/index.js'
   Vue.prototype.$store = store
   ...
   ```

   

3. 使用vuex，通过computed计算属性解决vuex数据改变但视图不更新问题

   ```vue
   <template>
   	<view class="content">
   		<view>{{name}}</view>
   		<view>数量: {{num}}</view>
   		<view>总价: {{money}}</view>
   		<button type="primary" @click="add">add</button>
   		<button type="primary" @click="testActions">testActions</button>
   
   		<view>学生</view>
   		<view v-for="(item,index) in list" :key="index">
   			{{item}}
   		</view>
   	</view>
   </template>
   
   <script>
   	export default {
   		data() {
   			return {
   				name: this.$store.state.name
   			}
   		},
   		// 解决数据改变但视图不更新
   		computed: {
   			num() {
   				return this.$store.state.num
   			},
   			money() {
   				return this.$store.getters.money
   			},
   			list() {
   				console.log(this.$store.state.list)
   				return this.$store.state.list
   			}
   		},
   		methods: {
   			add() {
   				this.$store.commit('add')
   			},
   			testActions() {
   				this.$store.dispatch('testActions')
   			}
   		}
   	}
   </script>
   
   <style lang="scss">
   
   </style>
   ```

   



## 弹窗

文档: https://uniapp.dcloud.io/api/ui/prompt



### uni.showToast()

```js
uni.showToast({
  icon: 'none',
  title: '位置授权不成功，部分功能将不可用',
  duration: 2000
})
```



### uni.showLoading()

```js
uni.showLoading({
  title: '加载中',
  mask: true	// 可选，是否显示透明蒙层，防止触摸穿透(滑动)
})
```



### uni.hideLoading()

隐藏加载框



### uni.showModal

显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。

```js
uni.showModal({
	title: '提示',
	content: '检测到您还未登录，是否立即登录？',
	cancelText: '取消',
	confirmText: '确认',
	success: function (res) {
		if (res.confirm) {
			console.log('用户点击确定');
		} else if (res.cancel) {
			console.log('用户点击取消');
		}
	}
});
```









## api

### 用户授权 uni.authorize()

```js
// 提前向用户发起授权请求。
uni.authorize({
  scope:"scope.userLocation",		// 需要获取权限的 scope
  success(){
    console.log('ok')
  },
  fail(err){
    console.log(err);
  }
})
```

文档: https://uniapp.dcloud.io/api/other/authorize



### 获取位置 uni.getLocation

前提是，已经向用户获得位置授权。

位置坐标系统一为国测局坐标系`gcj02`，这种坐标系可以被多端支持。

```js
uni.getLocation({
  type: 'gcj02',
  success: function (res) {
    console.log('当前位置的经度：' + res.longitude)
    console.log('当前位置的纬度：' + res.latitude)
  }
})
```



### 跨页面传递数据 getCurrentPages()

```js
let pages = getCurrentPages(); //当前页面
let prevPage = pages[pages.length - 2]; //上一页面

//直接给上一个页面赋值
prevPage.name = 'abc'
// 原生小程序 
prevPage.setData({name: 'abc'})

uni.navigateBack({
  delta: 1,
})
```



调用其他页面的方法

```js
let pages = getCurrentPages(); //当前页面
let prevPage = pages[pages.length - 2]; //上一页面

prevPage.onLoad()	// 生命周期函数或其他函数
```





## 内置组件

### swiper 轮播图



### scroll-view 可滚动视图区域

横向滚动

```html
<scroll-view :scroll-x="true" style="white-space: nowrap">
  <view style="display:inline-block;width: 200px;height: 100px;background-color: red;"></view>
  <view style="display:inline-block;width: 200px;height: 100px;background-color: yellow;"></view>
  <view style="display:inline-block;width: 200px;height: 100px;background-color: green;"></view>
</scroll-view>
```











## 插件市场组件

插件市场：https://ext.dcloud.net.cn



### uni-rate 评星

1. 在插件市场下载该插件，并将插件文件导入到项目中(或者一键导入到HBuilder中)

2. 符合 easycom 组件规范的，无需引用、注册，可以直接使用

   ```html
   <uni-rate value="2"></uni-rate>
   ```

   

### ucharts 秋云图表

uCharts 支持 H5 及 APP 用 ucharts echarts 渲染图表，uniapp可视化首选组件。也支持原生微信小程序。

插件地址：https://ext.dcloud.net.cn/plugin?id=271



### uQRCode 全端二维码生成插件

uQRCode是一款基于Javascript环境开发的二维码生成插件，适用所有Javascript运行环境的前端应用和Node.js。

插件地址：https://ext.dcloud.net.cn/plugin?id=1287



### wx-charts 微信图表

兼容性：微信小程序

地址：https://github.com/xiaolin3303/wx-charts



### lb-picker选择器

支持app、nvue、h5、各小程序，支持单选、理论任意级数多级联动、非联动及日期选择。

地址：https://ext.dcloud.net.cn/plugin?id=1111



## 组件库

### uView

地址：https://www.uviewui.com/components/intro.html



1. 安装依赖

   ```sh
   npm init -y
   npm install uview-ui -S
   ```

2. `main.js` 引入

   ```js
   import uView from 'uview-ui'
   Vue.use(uView)
   ```

3. `uni.scss` 引入主题文件

   ```scss
   @import 'uview-ui/theme.scss';
   ```

4. `App.vue` 引入基础样式

   ```css
   <style lang="scss">
   	@import "uview-ui/index.scss";
   </style>
   ```

5. `pages.json` 配置 easycom 组件模式 

   ```json
   "easycom": {
     "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
   },
   ```




#### swipeAction 滑动单元格点击关闭

```vue
<u-swipe-action ref="swipeAction">
  <u-swipe-action-item :options="actionOptions" v-for="(item, index) in list" :key="index" :name="index" @click="onClickAction">
    </view>
  </u-swipe-action-item>
</u-swipe-action>
```

```vue
<script>
	export default {
		data() {
			return {
				actionOptions: [{
					text: '标记已读',
					style: {
						backgroundColor: '#4A4A4A'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#DF3A31'
					}
				}],
				list: []
			}
		},
		methods: {
			onClickAction(e) {
				console.log(e)
				this.$refs.swipeAction.closeOther();
			},
		}
	}
</script>
```



#### u-datetime-picker 最低只能1970年

```
<u-datetime-picker mode="date" :minDate="minDate"></u-datetime-picker>

this.minDate = Number(new Date('1900-01-01'))
```



### Lime Ui

文档地址：https://limeui.qcoon.cn



### 图鸟UI

文档地址：https://vue2.tuniaokj.com/



## 功能

### 全局页面挂载组件

文档：https://blog.csdn.net/weixin_47284756/article/details/127603103



### 隐藏 H5 的头部导航栏

* 全局隐藏：在 App.vue 的公共样式代码中添加

  ```
  /* #ifdef H5 */ 
  uni-page-head { display: none; } 
  /* #endif */
  ```

  

* 单个页面隐藏：在 pages.json 中添加代码

  ```
  "navigationStyle":"custom"
  
  {
    "path": "pages/order/order",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle":"custom"
    }
  }
  ```






### 导航栏

https://ask.dcloud.net.cn/article/34921

https://ext.dcloud.net.cn/plugin?id=1765



### 全局变量

https://ask.dcloud.net.cn/article/35021



### 离线本地存储方案

https://ask.dcloud.net.cn/article/166



### 更多

* App权限状态判断及引导：https://ext.dcloud.net.cn/plugin?id=594
* App打包前端代码进行加密：https://ask.dcloud.net.cn/article/36437
* uni-app中如何使用5+的原生界面控件（包括map、video、livepusher、barcode、nview）：https://ask.dcloud.net.cn/article/35036
* **App分享到微信时分享为小程序：**[使用plus.share，设置分享类型为miniProgram](https://www.html5plus.org/doc/zh_cn/share.html#plus.share.WeixinMiniProgramOptions)
* **App启动微信小程序：**[使用plus.share的launchMiniProgram](https://www.html5plus.org/doc/zh_cn/share.html#plus.share.ShareService.launchMiniProgram)
* app启动引导图：https://ext.dcloud.net.cn/plugin?id=1103
* **iOS平台适配暗黑模式（DarkMode）：**https://ask.dcloud.net.cn/article/36995
* mpvue项目（组件）迁移指南、示例及资源汇总：https://ask.dcloud.net.cn/article/34945
* uniapp案例：https://uniapp.dcloud.net.cn/case.html
* 



## Native.js

Native.js 示例汇总：https://ask.dcloud.net.cn/article/114



* [uniapp项目调用外部jar包](https://kouss.com/2022-3-31.html) 



## renderjs

这是一种运行在视图层的js，vue页面通过renderjs可以操作浏览器对象，进而可以让基于浏览器的库直接在uni-app的App端运行，诸如echart、threejs。

文档：https://uniapp.dcloud.net.cn/tutorial/renderjs.html

renderjs的使用：

* https://blog.csdn.net/dabaooooq/article/details/129272111
* https://blog.csdn.net/dai556688/article/details/123986098



## HTML5+ API

文档地址：https://www.html5plus.org/doc/



## 获取DOM元素

```js
const query = uni.createSelectorQuery().in(this)
// 查找元素，并获取元素的位置
query.selectAll('.title').boundingClientRect().exec((res) => {
  console.log(res)
})
```





## 开发服务器

需要在 `manifest.json` 文件中配置，如果在uniapp中打开则不会以文本形式展示，这时需要在其他编辑器中(VSCode或其他)打开。



添加以下配置:

```json
"h5": {
	"devServer": {
		"port": 8899,
		"disableHostCheck": true,
		"proxy": {
			"/doc": {
				"target": "http://localhost:3000",
				"changeOrigin": true,
				"secure": false,
				"pathRewrite": {
					"^/doc": ""
				}
			}
		}
	}
}
```



h5 表示只在h5平台下生效，在h5平台下的请求地址就可以这样 `/doc/index` 写了。





## 微信小程序

### 双向绑定

```vue
<input model:value="{{value}}" />
```



```vue
// custom-component.js
Component({
  properties: {
    myValue: String
  }
})

<!-- custom-component.wxml -->
<input model:value="{{myValue}}" />

<custom-component model:my-value="{{pageValue}}" />
```



### 自定义组件

组件类似于页面，一个自定义组件由 `json` `wxml` `wxss` `js` 4个文件组成。要编写一个自定义组件，首先需要在 `json` 文件中进行自定义组件声明（将 `component` 字段设为 `true` 可将这一组文件设为自定义组件）：

```
{
  "component": true
}
```



在自定义组件的 `js` 文件中，需要使用 `Component()` 来注册组件，并提供组件的属性定义、内部数据和自定义方法。

组件的属性值和内部数据将被用于组件 `wxml` 的渲染，其中，属性值是可由组件外部传入的。

```js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})
```



使用已注册的自定义组件前，首先要在页面的 `json` 文件中进行引用声明。

```json
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}
```

这样，在页面的 `wxml` 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，节点属性即传递给组件的属性值。

在 app.json 中声明 usingComponents 字段，则视为全局自定义组件，在小程序内的页面或自定义组件中可以直接使用而无需再声明。

```vue
<view>
  <!-- 以下是对一个自定义组件的引用 -->
  <component-tag-name inner-text="Some text"></component-tag-name>
</view>
```



注意事项：

- 因为 WXML 节点标签名只能是小写字母、中划线和下划线的组合，所以自定义组件的标签名也只能包含这些字符。
- 自定义组件也是可以引用自定义组件的，引用方法类似于页面引用自定义组件的方式（使用 `usingComponents` 字段）。
- 自定义组件和页面所在项目根目录名不能以“wx-”为前缀，否则会报错。
- 在组件wxss中不应使用ID选择器、属性选择器和标签名选择器。



注意，是否在页面文件中使用 `usingComponents` 会使得页面的 `this` 对象的原型稍有差异，包括：

- 使用 `usingComponents` 页面的原型与不使用时不一致，即 `Object.getPrototypeOf(this)` 结果不同。
- 使用 `usingComponents` 时会多一些方法，如 `selectComponent` 。
- 出于性能考虑，使用 `usingComponents` 时， `setData` 内容不会被直接深复制，即 `this.setData({ field: obj })` 后 `this.data.field === obj` 。（深复制会在这个值被组件间传递时发生。）



#### 组件 slot

在组件的 wxml 中可以包含 `slot` 节点，用于承载组件使用者提供的 wxml 结构。

默认情况下，一个组件的 wxml 中只能有一个 slot 。需要使用多 slot 时，可以在组件 js 中声明启用。

```js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { /* ... */ },
  methods: { /* ... */ }
})
```

此时，可以在这个组件的 wxml 中使用多个 slot ，以不同的 `name` 来区分。

```vue
<!-- 组件模板 -->
<view class="wrapper">
  <slot name="before"></slot>
  <view>这里是组件的内部细节</view>
  <slot name="after"></slot>
</view>
```

使用时，用 `slot` 属性来将节点插入到不同的 slot 上。

```vue
<!-- 引用组件的页面模板 -->
<view>
  <component-tag-name>
    <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
    <view slot="before">这里是插入到组件slot name="before"中的内容</view>
    <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
    <view slot="after">这里是插入到组件slot name="after"中的内容</view>
  </component-tag-name>
</view>
```



#### 组件样式

组件对应 `wxss` 文件的样式，只对组件wxml内的节点生效。编写组件样式时，需要注意以下几点：

- 组件和引用组件的页面不能使用id选择器（`#a`）、属性选择器（`[a]`）和标签名选择器，请改用class选择器。
- 组件和引用组件的页面中使用后代选择器（`.a .b`）在一些极端情况下会有非预期的表现，如遇，请避免使用。
- 子元素选择器（`.a>.b`）只能用于 `view` 组件与其子节点之间，用于其他组件可能导致非预期的情况。
- 继承样式，如 `font` 、 `color` ，会从组件外继承到组件内。
- 除继承样式外， `app.wxss` 中的样式、组件所在页面的的样式对自定义组件无效（除非更改组件样式隔离选项）。



除此以外，组件可以指定它所在节点的默认样式，使用 `:host` 选择器

```css
#a { } /* 在组件中不能使用 */
[a] { } /* 在组件中不能使用 */
button { } /* 在组件中不能使用 */
.a > .b { } /* 除非 .a 是 view 组件节点，否则不一定会生效 */

/* 组件 custom-component.wxss */
:host {
  color: yellow;
}
```



**组件样式隔离**

默认情况下，自定义组件的样式只受到自定义组件 wxss 的影响。除非以下两种情况：

- 指定特殊的样式隔离选项 `styleIsolation` 。
- webview 渲染下，在 `app.wxss` 或页面的 `wxss` 中使用标签名选择器（或一些其他特殊选择器）来直接指定样式会影响到页面和全部组件。通常情况下这是不推荐的做法。

```json
{
  "styleIsolation": "isolated"
}
```

自定义组件 JSON 中的 `styleIsolation` 选项支持以下取值：

- `isolated` 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
- `apply-shared` 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
- `shared` 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 `apply-shared` 或 `shared` 的自定义组件。（这个选项在插件中不可用。）

**使用后两者时，请务必注意组件间样式的相互影响。**



如果这个 **Component 构造器用于构造页面**，则默认值为 `shared` ，且还有以下几个额外的样式隔离选项可用：

- `page-isolated` 表示在这个页面禁用 app.wxss ，同时，页面的 wxss 不会影响到其他自定义组件；
- `page-apply-shared` 表示在这个页面禁用 app.wxss ，同时，页面 wxss 样式不会影响到其他自定义组件，但设为 `shared` 的自定义组件会影响到页面；
- `page-shared` 表示在这个页面禁用 app.wxss ，同时，页面 wxss 样式会影响到其他设为 `apply-shared` 或 `shared` 的自定义组件，也会受到设为 `shared` 的自定义组件的影响。



**外部样式类**

有时，组件希望接受外部传入的样式类。此时可以在 `Component` 中用 `externalClasses` 定义段定义若干个外部样式类。

```
/* 组件 custom-component.js */
Component({
  externalClasses: ['my-class']
})
```

```
<!-- 页面的 WXML -->
<custom-component my-class="red-text" />
```



#### Component 构造器

`Component` 构造器可用于定义组件，调用 `Component` 构造器时可以指定组件的属性、数据、方法等。

详细的参数含义和使用请参考 [Component 参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)。

```js
Component({

  behaviors: [],

  properties: {
    myProperty: { // 属性名
      type: String,
      value: ''
    },
    myProperty2: String // 简化的定义方式
  },
  
  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    onMyButtonTap: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function(){
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function(newVal, oldVal) {

    }
  }

})
```



**使用 Component 构造器构造页面**

事实上，小程序的页面也可以视为自定义组件。因而，页面也可以使用 `Component` 构造器构造，拥有与普通组件一样的定义段与实例方法。但此时要求对应 json 文件中包含 `usingComponents` 定义段。

此时，组件的属性可以用于接收页面的参数，如访问页面 `/pages/index/index?paramA=123&paramB=xyz` ，如果声明有属性 `paramA` 或 `paramB` ，则它们会被赋值为 `123` 或 `xyz` 。

页面的生命周期方法（即 `on` 开头的方法），应写在 `methods` 定义段中。

```json
{
  "usingComponents": {}
}
```

```js
Component({

  properties: {
    paramA: Number,
    paramB: String,
  },

  methods: {
    onLoad: function() {
      this.data.paramA // 页面参数 paramA 的值
      this.data.paramB // 页面参数 paramB 的值
    }
  }

})
```



使用 `Component` 构造器来构造页面的一个好处是可以使用 `behaviors` 来提取所有页面中公用的代码段。

例如，在所有页面被创建和销毁时都要执行同一段代码，就可以把这段代码提取到 `behaviors` 中。

##### behaviors

```js
// page-common-behavior.js
module.exports = Behavior({
  attached: function() {
    // 页面创建时执行
    console.info('Page loaded!')
  },
  detached: function() {
    // 页面销毁时执行
    console.info('Page unloaded!')
  }
})
```

```js
// 页面 A
var pageCommonBehavior = require('./page-common-behavior')
Component({
  behaviors: [pageCommonBehavior],
  data: { /* ... */ },
  methods: { /* ... */ },
})
```

```js
// 页面 B
var pageCommonBehavior = require('./page-common-behavior')
Component({
  behaviors: [pageCommonBehavior],
  data: { /* ... */ },
  methods: { /* ... */ },
})
```



#### 父子组件通信

```js
// 子组件
Component({
	// 接收父组件传递过来的值
	properties: {
		name: {
			type: String,
			value: 'hello'
		}
	},
	methods: {
		send() {
			// hi 就是传递给父组件的自定义事件名称
			this.triggerEvent('hi', 'hhhh');
		},
	},
})
```

```html
<!-- 子组件 -->
<view bindtap="send">{{name}}</view>
```



```html
<!-- 父组件中自定义接收事件 -->
<child name="zs" bind:hi="handleReceive" />
```

```js
Page({
	handleReceive(e) {
		console.log('接收', e.detail)
	},
})
```





### debounce

```js
function debounce(func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
```

```js
Page({
  data: {},
  
  onLoad: function (options) {
    this.debounceFunc = debounce(this.handleDebouncedFunction, 300);
  },

  handleDebouncedFunction: function() {
    // 在这里编写需要防抖的逻辑
  },

  onInput: function(e) {
    this.debounceFunc();
  }
});
```



```js
// uniapp + uview
handleInput() {
  uni.$u.debounce(this.getData, 500)
},
```











