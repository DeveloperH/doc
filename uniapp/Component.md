# 自定义组件



## Tabbar

```html
<view class="cmn-tabbar">
	<view class="cmn-tabbar-item {{current===index?'tabbar-active':''}}" wx:for="{{list}}" wx:key="index" catchtap="changeTabbar" data-index="{{index}}">
		<image src="{{current===index?item.selectedIconPath:item.iconPath}}" mode="" />
		<text>{{item.text}}</text>
	</view>
</view>
```

```css
.cmn-tabbar {
	background-color: #FFF;
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: calc(env(safe-area-inset-bottom) + 5px);
	padding-top: 5px;
}

.cmn-tabbar-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	color: #555555;
}

.cmn-tabbar-item.tabbar-active {
	color: #10A7FF;
}

.cmn-tabbar-item image {
	width: 28px;
	height: 28px;
}
```

```js
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
	properties: {},
	data: {
		current: 0,
		list: [{
				"pagePath": "/pages/index/index",
				"text": "首页",
				"iconPath": "icon/icon01.png",
				"selectedIconPath": "icon/icon02.png"
			},
			{
				"pagePath": "/pages/classify/classify",
				"text": "分类",
				"iconPath": "icon/icon03.png",
				"selectedIconPath": "icon/icon04.png"
			},
			{
				"pagePath": "/pages/my/my",
				"text": "我的",
				"iconPath": "icon/icon05.png",
				"selectedIconPath": "icon/icon06.png"
			}
		]
	},
	lifetimes: {
		attached() {
			let route = '/' + getCurrentPages()[0].route
			this.data.list.forEach((item, index) => {
				if (item.pagePath === route) {
					this.setData({
						current: index
					})
				}
			})
		},
	},
	methods: {
		changeTabbar(e) {
			let index = e.currentTarget.dataset.index
			if (index === this.data.current) {
				return
			}

			wx.reLaunch({
				url: this.data.list[index].pagePath,
			})
		},
	},
})
```

```json
{
	"component": true,
	"styleIsolation": "apply-shared",
	"usingComponents": {}
}
```



## 异形 Tabbar

```
Component({
  properties: {},
  data: {
    tabbar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
          "pagePath": "/pages/book/book",
          "text": "预订",
          "iconPath": "/tabbarComponent/icon/icon_book.png",
          "selectedIconPath": "/tabbarComponent/icon/icon_book_HL.png"
        },
        {
          "pagePath": "/pages/store/store",
          "text": "商城",
          "iconPath": "/tabbarComponent/icon/icon_store.png",
          "selectedIconPath": "/tabbarComponent/icon/icon_store_HL.png"
        },
        {
          "pagePath": "/pages/index/index",
          "text": "扫码",
          "iconPath": "/tabbarComponent/icon/icon_ruyan.png",
          "selectedIconPath": "/tabbarComponent/icon/icon_ruyan.png",
          "isSpecial": true,
        },
        {
          "pagePath": "/pages/serve/serve",
          "text": "服务",
          "iconPath": "/tabbarComponent/icon/icon_serve.png",
          "selectedIconPath": "/tabbarComponent/icon/icon_serve_HL.png"
        },
        {
          "pagePath": "/pages/mine/mine",
          "text": "我的",
          "iconPath": "/tabbarComponent/icon/icon_mine.png",
          "selectedIconPath": "/tabbarComponent/icon/icon_mine_HL.png"
        }
      ]
    }
  },
  lifetimes: {
    attached() {
      let pages = getCurrentPages();
      let currentPageRoute = '/' + pages[pages.length - 1].route;
      this.data.tabbar.list.forEach(item => {
        item.selected = item.pagePath === currentPageRoute
      })
      this.setData({
        tabbar: this.data.tabbar
      })
    }
  },
  methods: {}
})
```

```
<view class="tabbar_box iphoneX-height" style="background-color:{{tabbar.backgroundColor}}">
  <block wx:for="{{tabbar.list}}" wx:key="index">
    <navigator wx:if="{{item.isSpecial}}" class="tabbar_nav" hover-class="none" url="{{item.pagePath}}" style="color:{{tabbar.selectedColor}}" open-type="switchTab">
      <view class='special-wrapper'>
        <image class="tabbar_icon" src="{{item.iconPath}}"></image>
      </view>
      <image class='special-text-wrapper'></image>
      <text>{{item.text}}</text>
    </navigator>
    <navigator wx:else class="tabbar_nav" hover-class="none" url="{{item.pagePath}}" style="color:{{item.selected ? tabbar.selectedColor : tabbar.color}}" open-type="switchTab">
      <image class="tabbar_icon" src="{{item.selected ? item.selectedIconPath : item.iconPath}}"></image>
      <text>{{item.text}}</text>
    </navigator>
  </block>
</view>
```

```
.tabbar_box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 98rpx;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
}

.tabbar_box.iphoneX-height {
  padding-bottom: env(safe-area-inset-bottom);
}

.tabbar_nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  height: 100%;
  position: relative;
}

.tabbar_icon {
  width: 44rpx;
  height: 44rpx;
}

.special-wrapper {
  position: absolute;
  left: 30rpx;
  top: -36rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  border-top: 2rpx solid #f2f2f3;
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  padding: 6rpx;
}

.special-wrapper .tabbar_icon {
  width: 84rpx;
  height: 84rpx;
}

.special-text-wrapper {
  width: 56rpx;
  height: 56rpx;
}
```

```
{
  "component": true,
  "usingComponents": {}
}
```



## navbar

```html
<view class="cmn-navbar" class="{{sticky?'cmn-navbar_sticky':''}}" style="background: {{background}}">
	<view class="cmn-navbar_inner" style="{{style}}">
		<block wx:if="{{useSlot}}">
			<slot name="default"></slot>
		</block>
		<block wx:else>
			<view class="cmn-navbar_left" style="{{leftWidth}}">
				<view class="cmn-navbar_btn_goback" bindtap="back" wx:if="{{back}}"></view>
			</view>
			<view class="cmn-navbar_center"><text>{{title}}</text></view>
		</block>
	</view>
</view>
```

```css
.cmn-navbar_sticky {
	position: sticky;
	left: 0;
	top: 0;
	z-index: 99;
}

.cmn-navbar_inner {
	width: 100%;
	box-sizing: border-box;
	display: flex;
}

.cmn-navbar_left {
	height: 100%;
	display: flex;
	align-items: center;
	padding-left: 10px;
	box-sizing: border-box;
}

.cmn-navbar_btn_goback {
	font-size: 12px;
	width: 12px;
	height: 24px;
	-webkit-mask: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='24' viewBox='0 0 12 24'%3E  %3Cpath fill-opacity='.9' fill-rule='evenodd' d='M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5 10 4.563 2.682 12 10 19.438z'/%3E%3C/svg%3E") no-repeat 50% 50%;
	mask: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='24' viewBox='0 0 12 24'%3E  %3Cpath fill-opacity='.9' fill-rule='evenodd' d='M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5 10 4.563 2.682 12 10 19.438z'/%3E%3C/svg%3E") no-repeat 50% 50%;
	-webkit-mask-size: cover;
	mask-size: cover;
	background-color: #000;
}

.cmn-navbar_center {
	height: 100%;
	flex: 1;
	width: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.cmn-navbar_center text {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 14px;
	color: #000;
}
```

```js
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
	properties: {
		title: {
			type: String,
			value: ''
		},
		back: {
			type: Boolean,
			value: true
		},
		background: {
			type: String,
			value: '#FFF'
		},
		useSlot: {
			type: Boolean,
			value: false
		},
		sticky: {
			type: Boolean,
			value: true
		},
	},
	data: {
		style: ''
	},
	lifetimes: {
		attached() {
			const rect = wx.getMenuButtonBoundingClientRect()
			const info = wx.getSystemInfoSync()

			let style = ''
			style += `padding-right: ${info.windowWidth - rect.left}px;`
			style += `padding-top: ${info.statusBarHeight}px;`
			style += `height: ${info.statusBarHeight + 44}px;`

			let leftWidth = `width: ${info.windowWidth - rect.left}px`

			this.setData({
				style,
				leftWidth
			})
		},
	},
	methods: {
		back() {
			wx.navigateBack({
				delta: 1,
				fail: () => {
					wx.reLaunch({
						url: '/pages/index/index'
					})
				}
			})
		}

	},
})
```

```json
{
	"component": true,
	"styleIsolation": "apply-shared",
	"usingComponents": {}
}
```



## 签名板



## 圆点连线





























