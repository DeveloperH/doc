# 支付宝小程序

文档：https://opendocs.alipay.com/mini/component



## ACSS

### 样式导入

```
@import "./button.acss"; /*相对路径*/
@import "/button.acss"; /*项目绝对路径*/
@import "third-party/page.acss"; /*第三方 npm 包路径*/
```



### 动态样式

```
<view style="color:{{color}};" />
```



### 选择器

* `.a-`，`.am-` 开头的类选择器为系统组件占用，不可使用。
* 不支持属性选择器。



### 本地资源引用

ACSS 文件里的本地资源引用请使用绝对路径的方式，不支持相对路径引用。

```
/* 支持 */
background-image: url('/images/ant.png');
/* 不支持 */
background-image: url('./images/ant.png');
```



### 页面样式隔离 styleIsolation

默认情况下，页面的样式将对外产生影响。从基础库版本 2.7.2 开始，可以在页面的 .json 文件中配置 `styleIsolation`，避免页面的样式影响到外部。

```
{
  "styleIsolation": "apply-shared"
}
```

该选项支持以下取值：

- `apply-shared` 表示 app.acss 样式以及其他（设置了 `shared` 的其他页面和自定义组件）的样式将影响到当前页面，但当前页面 acss 中指定的样式不会影响外部。
- `shared`（默认）表示 app.acss 样式以及其他（设置了 `shared` 的其他页面和自定义组件）的样式将影响到当前页面，当前页面 acss 中指定的样式也会影响到外部。



## AXML

### 列表渲染

数组当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item`。

```
<view a:for="{{list}}"> {{ item }} </view>
```

```
<view a:for="{{array}}">
  {{index}}: {{item.message}}
</view>
```



使用 `a:for-item` 可以指定数组当前元素的变量名。使用 `a:for-index` 可以指定数组当前下标的变量名。

```
<view a:for="{{array}}" a:for-index="idx" a:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```



`a:for` 支持嵌套。

```
<view a:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" a:for-item="i">
  <view a:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" a:for-item="j">
    <view a:if="{{i <= j}}">
      {{i}} * {{j}} = {{i * j}}
    </view>
  </view>
</view>
```



 `a:key` 的值以两种形式来提供：

- 字符串：代表列表项某个属性，属性值需要是列表中唯一的字符串或数字，例如 ID，并且不能动态改变。

- 保留关键字 `*this`，代表列表项本身，并且它是唯一的字符串或者数字，例如当数据改变触发重新渲染时，会校正带有 `key` 的组件，框架会确保数据重新被排序，而不是重新创建，这可以使组件保持自身状态，提高列表渲染效率。

```
<view class="container">
  <view a:for="{{list}}" a:key="*this">
    <view onTap="bringToFront" data-value="{{item}}">
      {{item}}: click to bring to front
    </view>
  </view>
</view>
```

```
Page({
  data:{
    list:['1', '2', '3', '4'],
  },
  bringToFront(e) {
    const { value } = e.target.dataset;
    const list = this.data.list.concat();
    const index = list.indexOf(value);
    if (index !== -1) {
      list.splice(index, 1);
      list.unshift(value);
      this.setData({ list });
    }
  },
});
```



`key` 是比 `a:key` 更通用的写法，里面可以填充任意表达式和字符串。
 **注意：** `key` 不能设置在 block 上。

```
<view class="container">
  <view a:for="{{list}}" key="{{item}}">
    <view onTap="bringToFront" data-value="{{item}}">
      {{item}}: click to bring to front
    </view>
  </view>
</view>
```





### 条件渲染

```
<view a:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>
<view a:elif="{{view == 'APP'}}"> APP </view>
<view a:else> ALIPAY </view>
```

```
<block a:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```

`<block/>` 并不是一个组件，只是一个包装元素，不会在页面中做任何渲染，只接受控制属性。



### 模板

AXML 提供模板 `template`，可以在模板中定义代码片段，然后在不同地方调用。 建议使用 `template` 方式引入模板片段，因为 `template` 会指定其作用域，只使用 `data` 传入的数据，如果 `template` 的 `data` 没有改变，该片段 UI 不会重新渲染。

使用 **is** 属性，声明需要的模板，然后将需要的 **data** 传入。`is` 属性可以使用 Mustache 语法，来动态决定具体渲染哪个模板。

```
<template name="taskTpl">
  <view class="task-item">
    <text class="desc">{{taskDescription}}</text>
    <text class="time">{{deadline}}</text>
  </view>
</template>

<template is="taskTpl" data="{{ ...taskA }}"></template>
<template is="taskTpl" data="{{ ...taskB }}"></template>
```

```
Page({
  data: {
    taskA: {
      taskDescription: "学习支付宝小程序",
      deadline: "2022-09-15",
    },
    taskB: {
      taskDescription: "读完三国演义",
      deadline: "2022-10-15",
    },
  },
});
```



模板有其作用域，只能使用 `data` 传入的数据。除了直接由 `data` 传入数据外，也可以通过 onXX 事件绑定页面逻辑进行函数处理。如下代码所示：

```
<!-- templ.axml -->
<template name="msgItem">
  <view>
    <view>
      <text> {{index}}: {{msg}} </text>
      <text> Time: {{time}} </text>
    </view>
    <button onTap="onClickButton">onTap</button>
  </view>
</template>
```

```
<!-- index.axml -->
<import src="./templ.axml"/>
<template is="msgItem" data="{{...item}}" />
```

```
Page({
  data: {
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2019-04-22'
    }
  },
  onClickButton(e) {
    console.log('button clicked', e)
  },
});
```





## 文档

* [原生微信小程序转支付宝小程序问题](https://www.jianshu.com/p/931d12303cbe) 















