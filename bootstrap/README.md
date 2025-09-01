# 基础

## 介绍

Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。

文档地址: https://v3.bootcss.com/



当前文档中所用的是v3.4.1版本。v3版本支持IE8-11。



## 引入和使用

需要引入Bootstrap的css和js文件，因为Bootstrap插件是依赖于jQuery的，还需要引入jQuery的js文件

```html
<link rel="stylesheet" href="css/bootstrap.css">
<script src="js/jquery-3.6.0.js"></script>
<script src="js/bootstrap.js"></script>
```



在引入后，在html文件中的标签会自动按照Bootstrap的CSS样式进行设置。

如果需要使用Bootstrap中已经设置好的样式，可以通过给标签添加指定类名。

```html
<a href="#" class="btn btn-default">Bootstrap</a>
```



当然，还可以使用CDN的方式引入。

```html
<!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>

<!-- HTML5 shim 和 Respond.js 是为了让 IE8 支持 HTML5 元素和媒体查询（media queries）功能 -->
<!-- 警告：通过 file:// 协议（就是直接将 html 页面拖拽到浏览器中）访问页面时 Respond.js 不起作用 -->
<!--[if lt IE 9]>
  <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
<![endif]-->
```



## 移动设备优先

为了确保适当的绘制和触屏缩放，需要在 `<head>` 之中**添加 viewport 元数据标签**。

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```



在移动设备浏览器上，通过为视口（viewport）设置 meta 属性为 `user-scalable=no` 可以禁用其缩放功能。

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```



## 布局容器

Bootstrap 需要为页面内容和栅格系统包裹一个 `.container` 容器。

注意，由于 `padding` 等属性的原因，这两种 容器类不能互相嵌套。



`.container` 类用于固定宽度并支持响应式布局的容器。

```html
<div class="container">
  ...
</div>
```

`.container-fluid` 类用于 100% 宽度，占据全部视口（viewport）的容器。

```html
<div class="container-fluid">
  ...
</div>
```





## 全局 CSS 样式

Bootstrap 将设置全局的 CSS 样式。HTML 的基本元素均可以通过 class 设置样式并得到增强效果。还有先进的栅格系统。

Bootstrap 将全局 `font-size` 设置为 **14px**，`line-height` 设置为 **1.428**。这些属性直接赋予 `<body>` 元素和所有段落元素。另外，`<p>` （段落）元素还被设置了等于 1/2 行高（即 10px）的底部外边距（margin）。





### 排版

#### 标题 .h1-.h6

Bootstrap 提供了 `.h1` 到 `.h6` 类，为的是给内联（inline）属性的文本赋予标题的样式。

```html
<h1>Bootstrap</h1>
<h2>Bootstrap</h2>
<h3>Bootstrap</h3>
<p class="h1">Bootstrap</p>
<div class="h3">Bootstrap</div>
```



#### 小号文本 .small

在标题内还可以包含 `<small>` 标签或赋予 `.small` 类的元素，可以用来标记副标题。

```html
<h1>Boot<small>strap</small></h1>
<h2>Boot<span class="small">strap</span></h2>
<p>Boot<span class="small">strap</span></p>
```



#### 段落突出显示 .lead

```html
<p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>

<p class="lead">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.</p>

<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
```



#### 文本对齐类

通过文本对齐类，可以简单方便的将文字重新对齐。

```html
<p class="text-left">左对齐</p>
<p class="text-center">居中对齐</p>
<p class="text-right">右对齐</p>
<p class="text-nowrap">文本强制一行显示</p>
<p class="text-justify">两端对齐，Bootstrap是美国Twitter公司的设计师Mark Otto和Jacob Thornton合作基于HTML、CSS、JavaScript 开发的简洁、直观、强悍的前端开发框架，使得 Web 开发更加快捷。</p>
```



#### 内联文本元素

* `<mark>` : 高亮标记。显示为淡黄色背景和黑字
* `<del>` `<s>` : 删除线
* `<ins>` `<u>` : 下划线
* `<small>` : 小号文本。其内的文本将被设置为父容器字体大小的 85%。标题元素中嵌套的 `<small>` 元素被设置不同的 `font-size` 。还可以为行内元素赋予 `.small` 类以代替任何 `<small>` 元素。
* `<strong>` : 加粗，通过增加 font-weight 值强调一段文本。
* `<em>` : 用斜体强调一段文本。
* `<code>` : 内联代码片段
* `<kbd>` : 标记用户通过键盘输入的内容。
* `<pre>` : 代码块。多行代码可以使用 `<pre>` 标签。为了正确的展示代码，注意将尖括号做转义处理。
  * 可以使用 `.pre-scrollable` 类，其作用是设置 max-height 为 350px ，并在垂直方向展示滚动条。
* `<var>` : 标记变量。
* `<samp>` : 标记程序输出的内容。默认会改变文字的字体。

```html
<p>这是<mark>标记</mark>噢</p>
<del>删除</del>
<s>删除</s>
<ins>下划线</ins>
<u>下划线</u>
<p>Boot<span class="small">strap</span></p>
<p>The following snippet of text is <strong>rendered as bold text</strong> .</p>
<p>The following snippet of text is <em>rendered as bold text</em> .</p>

For example, <code>&lt;section&gt;</code> should be wrapped as inline.

To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>

<pre class="pre-scrollable">
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
</pre>

<var>y</var> = <var>m</var><var>x</var> + <var>b</var>

<samp>This text is meant to be treated as sample output from a computer program.</samp>
```



#### 略缩语

当鼠标悬停在缩写和缩写词上时就会显示完整内容，Bootstrap 实现了对 HTML 的 `<abbr>` 元素的增强样式。缩略语元素带有 `title` 属性，外观表现为带有较浅的虚线框，鼠标移至上面时会变成带有“问号”的指针。

```html
<abbr title="attribute">attr</abbr>

<!-- 为缩略语添加 .initialism 类，可以让 font-size 变得稍微小些。 -->
<abbr title="HyperText Markup Language" class="initialism">HTML</abbr>
```



#### 引用

将任何 HTML 元素包裹在 `<blockquote>` 中即可表现为引用样式。

```html
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>
```



添加 `<footer>` 用于标明引用来源。来源的名称可以包裹进 `<cite>`标签中。

通过赋予 `.blockquote-reverse` 类可以让引用呈现内容右对齐的效果。

```html
<blockquote class="blockquote-reverse">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
```



#### 列表

Bootstrap 修改了默认列表标签的样式，让列表显示更加美观。

* `.list-unstyled` 类: 无列表样式。移除了默认的 `list-style` 样式和左侧外边距的一组元素（只针对直接子元素）。**这是针对直接子元素的**，也就是说，你需要对所有嵌套的列表都添加这个类才能具有同样的样式
* `.list-inline` 类: 内联列表。通过设置 `display: inline-block;` 并添加少量的内补（padding），将所有元素放置于同一行。

```html
<ul class="list-unstyled">
  <li>...</li>
</ul>

<ul class="list-inline">
  <li>...</li>
</ul>
```



* `.dl-horizontal` 类: 让 `<dl>` 内的短语及其描述排在一行。开始是像 `<dl>` 的默认样式堆叠在一起，随着导航条逐渐展开而排列在一行。

```html
<!-- 当dl中的内容排在一行时，dt右对齐，dd左对齐 -->
<dl class="dl-horizontal">
  <dt>关键字</dt>
  <dd>描述文字</dd>
  <dt>关键字</dt>
  <dd>描述文字</dd>
</dl>
```





### 表格

为任意 `<table>` 标签添加 `.table` 类可以为其赋予基本的样式:少量的内补（padding）和水平方向的分隔线。

如果设置了 `<thead>` 标签，则会将 `<thead>` 底下的水平方向的分割线加粗。



可以添加的类:

* `.table-striped` 类: 可以给 `<tbody>` 之内的每一行增加斑马条纹样式。也就是隔行换色。
  * 条纹状表格是依赖 `:nth-child` CSS 选择器实现的，而这一功能不被 Internet Explorer 8 支持。
* `.table-bordered` 类: 为表格和其中的每个单元格增加边框。
* `.table-hover` 类: 可以让 `<tbody>` 中的每一行对鼠标悬停状态作出响应。悬停时该行变色。
* `.table-condensed` 类: 可以让表格更加紧凑，单元格中的内补（padding）均会减半。

注意: 如果 `<tr>` 不是写在 `<thead>` 或者 `<tfoot>` 中，则默认是在 `<tbody>` 中。

```html
<table class="table table-striped table-bordered table-hover table-condensed">
  <thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>性别</th>
    </tr>
  </thead>
  <tr>
    <td>小明</td>
    <td>21</td>
    <td>男</td>
  </tr>
  <tr>
    <td>小红</td>
    <td>13</td>
    <td>女</td>
  </tr>
  <tr>
    <td>小赵</td>
    <td>31</td>
    <td>男</td>
  </tr>
  <tr>
    <td>小李</td>
    <td>41</td>
    <td>男</td>
  </tr>
</table>
```





#### 状态类

通过状态类可以为行或单元格设置颜色:

* `.active` : 鼠标悬停在行或单元格上时所设置的颜色
* `.success` : 标识成功或积极的动作
* `.info` : 标识普通的提示信息或动作
* `.warning` : 标识警告或需要用户注意
* `.danger` : 标识危险或潜在的带来负面影响的动作



![image-20210902225140879](https://www.huangyihui.cn/upload/gburlimg/a525877dbe125.png)



```html
<table class="table table-bordered">
  <thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>性别</th>
    </tr>
  </thead>
  <tr class="active">
    <td>小明</td>
    <td>21</td>
    <td>男</td>
  </tr>
  <tr class="success">
    <td>小红</td>
    <td>13</td>
    <td>女</td>
  </tr>
  <tr>
    <td class="info">小赵</td>
    <td class="warning">31</td>
    <td class="danger">男</td>
  </tr>
</table>
```



#### 响应式表格

将任何 `.table` 元素包裹在 `.table-responsive` 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失。



> #### 垂直方向的内容截断
>
> 响应式表格使用了 `overflow-y: hidden` 属性，这样就能将超出表格底部和顶部的内容截断。特别是，也可以截断下拉菜单和其他第三方组件。



```html
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```



### 表单

单独的表单控件会被自动赋予一些全局样式。

所有设置了 `.form-control` 类的 `<input>`、`<textarea>` 和 `<select>` 元素都将被默认设置宽度属性为 `width: 100%;`。

将 `label` 元素和前面提到的控件包裹在 `.form-group` 中可以获得最好的排列。



* `.form-group` : 给div添加下外边距
* `.form-group label`元素 : 加粗
* `.checkbox label` : 外观更好看
* `.form-inline` : 内联表单。为 `<form>` 元素添加 `.form-inline` 类可使其内容左对齐并且表现为 `inline-block` 级别的控件。
  * **只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）。**
* `.sr-only` : 隐藏元素，只有屏幕阅读器可以正确识别



```html
<form class="form-inline">
  <div class="form-group">
    <label for="username"  class="sr-only">用户名</label>
    <input type="text" class="form-control" placeholder="用户名" id="username" >
  </div>
  <div class="form-group"  class="sr-only">
    <label for="pwd">密码</label>
    <input type="password" class="form-control" placeholder="密码" id="pwd" >
  </div>
  <div class="checkbox">
    <label><input type="checkbox">同意</label>
  </div>
  <button type="submit" class="btn btn-default">提交</button>
</form>
```



#### 带图标的输入框

使用 `.input-group` 将整个 `<input>` 包裹起来，并对要放进去的内容添加 `.input-group-addon` 。

![image-20210903121740991](https://www.huangyihui.cn/upload/gburlimg/54bd944585b84.png)

```html
<form class="form-inline">
  <div class="input-group">
    <div class="input-group-addon">￥</div>
    <input type="text" class="form-control" placeholder="金额">
    <div class="input-group-addon">.00</div>
  </div>
  <button type="submit" class="btn btn-primary">确定</button>
</form>
```



#### 水平排列的表单

通过为表单添加 `.form-horizontal` 类，并联合使用 Bootstrap 预置的栅格类，可以将 `label` 标签和控件组水平并排布局。这样做将改变 `.form-group` 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 `.row` 了。



如果需要在表单中将一行纯文本和 `label` 元素放置于同一行，为 `<p>` 元素添加 `.form-control-static` 类即可。

**只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）。**



![image-20210903172655007](https://www.huangyihui.cn/upload/gburlimg/79b50993fb63c.png)



```html
<form class="form-horizontal">
  <div class="form-group">
    <label for="username" class="col-sm-2 control-label">用户名</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="username" placeholder="用户名">
    </div>
  </div>
  <div class="form-group">
    <label for="pwd" class="col-sm-2 control-label">密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="pwd" placeholder="密码">
    </div>
  </div>
  <div class="form-group">
    <label for="email" class="col-sm-2 control-label">邮箱</label>
    <div class="col-sm-10">
      <p class="form-control-static">email@example.com</p>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label><input type="checkbox">记住密码</label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">登录</button>
    </div>
  </div>
</form>
```



#### 输入框

包括大部分表单控件、文本输入域控件，还支持所有 HTML5 类型的输入控件： `text`、`password`、`datetime`、`datetime-local`、`date`、`month`、`time`、`week`、`number`、`email`、`url`、`search`、`tel` 和 `color`。

只有正确设置了 `type` 属性的输入控件才能被赋予正确的样式。

如需在文本输入域 `<input>` 前面或后面添加文本内容或按钮控件，请选择`输入控件组`



#### 单选和多选

* `.checkbox` : 让多选框更好看，搭配 `<label>` 使用
* `.radio` : 让单选框更好看，搭配 `<label>` 使用
* `.disabled` : 将样式设置为 `cursor: not-allowed` ，鼠标移动到上面显示红色的禁止符号。
* `.checkbox-inline` 或 `.radio-inline` : 应用到一系列的多选框或单选框控件上，可以使这些控件排列在一行。



```html
    <div class="checkbox">
      <label>
        <input type="checkbox">选项1
      </label>
    </div>
    <div class="checkbox disabled">
      <label>
        <input type="checkbox" disabled>选项2
      </label>
    </div>

    <div class="radio">
      <label>
        <input type="radio" name="options">选项1
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" name="options">选项2
      </label>
    </div>
    <div class="radio disabled">
      <label>
        <input type="radio" name="options" disabled>选项3
      </label>
    </div>
```



```html
<!-- 多个多选框或单选框排列在一行 -->
<div>
  <label class="checkbox-inline">
    <input type="checkbox">选项1
  </label>
  <label class="checkbox-inline">
    <input type="checkbox">选项2
  </label>
  <label class="checkbox-inline">
    <input type="checkbox">选项3
  </label>
</div>

<div>
  <label class="radio-inline">
    <input type="radio" name="options">选项1
  </label>
  <label class="radio-inline">
    <input type="radio" name="options">选项2
  </label>
  <label class="radio-inline">
    <input type="radio" name="options">选项3
  </label>
</div>
```



#### 校验状态

Bootstrap 对表单控件的校验状态，如 error、warning 和 success 状态，都定义了样式。

使用时，添加 `.has-warning`、`.has-error` 或 `.has-success` 类到这些控件的父元素即可。任何包含在此元素之内的 `.control-label`、`.form-control` 和 `.help-block` 元素都将接受这些校验状态的样式。

`.checkbox` 和 `.radio` 中的元素也会收到影响。



![image-20210903183459234](https://www.huangyihui.cn/upload/gburlimg/7879bdca731d9.png)



```html
<div class="form-group has-success">
  <label class="control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess1">
  <span id="helpBlock2" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
</div>
<div class="form-group has-warning">
  <label class="control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control" id="inputWarning1">
</div>
<div class="form-group has-error">
  <label class="control-label" for="inputError1">Input with error</label>
  <input type="text" class="form-control" id="inputError1">
</div>
<div class="has-success">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxSuccess" value="option1">
      Checkbox with success
    </label>
  </div>
</div>
<div class="has-warning">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxWarning" value="option1">
      Checkbox with warning
    </label>
  </div>
</div>
<div class="has-error">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxError" value="option1">
      Checkbox with error
    </label>
  </div>
</div>
```



#### 针对校验状态的输入框图标

可以针对校验状态为输入框添加额外的图标。只需设置相应的 `.has-feedback` 类并添加正确的图标即可。

**反馈图标（feedback icon）只能使用在文本输入框 `<input class="form-control">` 元素上。**



![image-20210903191936454](https://www.huangyihui.cn/upload/gburlimg/227414477141c.png)



```html
<div class="form-group has-success has-feedback">
  <label for="success" class="control-label">校验状态为 success 的输入框</label>
  <input type="text" class="form-control" id="success">
  <!-- glyphicon: 字体图标库  glyphicon-ok: 指定的图标  form-control-feedback：将图标放在输入框中 -->
  <span class="glyphicon glyphicon-ok form-control-feedback"></span>
</div>
<div class="form-group has-warning has-feedback">
  <label for="warning" class="control-label">校验状态为 warning 的输入框</label>
  <input type="text" class="form-control" id="warning">
  <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
</div>
<div class="form-group has-error has-feedback">
  <label for="error" class="control-label">校验状态为 error 的输入框</label>
  <input type="text" class="form-control" id="error">
  <span class="glyphicon glyphicon-remove form-control-feedback"></span>
</div>

<div class="form-group has-success has-feedback">
  <label for="success1" class="control-label">校验状态为 error，并且前面也有图标的输入框</label>
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input type="text" class="form-control" id="success1">
  </div>
  <span class="glyphicon glyphicon-ok-circle form-control-feedback"></span>
</div>
```



**为水平排列的表单和内联表单设置可选的图标**

![image-20210903192855175](https://www.huangyihui.cn/upload/gburlimg/21bac8f76e98e.png)



```html
<form class="form-horizontal">
  <div class="form-group has-success has-feedback">
    <label for="success" class="control-label col-sm-3">success</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="success">
      <span class="glyphicon glyphicon-ok form-control-feedback"></span>
    </div>
  </div>

  <div class="form-group has-success has-feedback">
    <label for="success1" class="control-label col-sm-3">success</label>
    <div class="col-sm-9">
      <div class="input-group">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" id="success1">
      </div>
      <span class="glyphicon glyphicon-ok-circle form-control-feedback"></span>
    </div>
  </div>
</form>
```



#### 控件尺寸

通过 `.input-lg` 类似的类可以为控件设置高度，通过 `.col-lg-*` 类似的类可以为控件设置宽度。

* `.input-lg` : 设置控件高度大一些
* `.input-sm` : 设置控件高度小一些

```html
<input type="text" class="form-control">
<input type="text" class="form-control input-lg">
<input type="text" class="form-control input-sm">
<select class="form-control input-lg"></select>
```



通过添加 `.form-group-lg` 或 `.form-group-sm` 类，为 `.form-horizontal` 包裹的 `label` 元素和表单控件快速设置尺寸。

```html
<form class="form-horizontal">
  <div class="form-group form-group-lg">
    <label class="col-sm-2 control-label" for="formGroupInputLarge">Large label</label>
    <div class="col-sm-10">
      <input class="form-control" type="text" id="formGroupInputLarge" placeholder="Large input">
    </div>
  </div>
  <div class="form-group form-group-sm">
    <label class="col-sm-2 control-label" for="formGroupInputSmall">Small label</label>
    <div class="col-sm-10">
      <input class="form-control" type="text" id="formGroupInputSmall" placeholder="Small input">
    </div>
  </div>
</form>
```



**用栅格系统中的列（column）包裹输入框或其任何父元素，都可很容易的为其设置宽度。**

```html
<div class="row">
  <div class="col-xs-2">
    <input type="text" class="form-control" placeholder=".col-xs-2">
  </div>
  <div class="col-xs-3">
    <input type="text" class="form-control" placeholder=".col-xs-3">
  </div>
  <div class="col-xs-4">
    <input type="text" class="form-control" placeholder=".col-xs-4">
  </div>
</div>
```



### 按钮

可作为按钮使用的标签或元素: 为 `<a>`、`<button>` 或 `<input>` 元素添加按钮类（button class）即可使用 Bootstrap 提供的样式。



注意事项:

* 虽然按钮类可以应用到 `<a>` 和 `<button>` 元素上，但是，导航和导航条组件只支持 `<button>` 元素。
* 如果 `<a>` 元素被作为按钮使用 -- 并用于在当前页面触发某些功能 -- 而不是用于链接其他页面或链接当前页面中的其他部分，那么，务必为其设置 `role="button"` 属性。
* **强烈建议尽可能使用 `<button>` 元素**来获得在各个浏览器上获得相匹配的绘制效果。

```html
<a class="btn btn-default" href="#" role="button">Link</a>
<button class="btn btn-default" type="submit">Button</button>
<input class="btn btn-default" type="button" value="Input">
<input class="btn btn-default" type="submit" value="Submit">
```



#### 预定义样式

使用下面列出的类可以快速创建一个带有预定义样式的按钮。



![image-20210903212222117](https://www.huangyihui.cn/upload/gburlimg/89883f148dc49.png)



```html
<button type="button" class="btn btn-default">（默认样式）Default</button>
<button type="button" class="btn btn-primary">（首选项）Primary</button>
<button type="button" class="btn btn-success">（成功）Success</button>
<button type="button" class="btn btn-info">（一般信息）Info</button>
<button type="button" class="btn btn-warning">（警告）Warning</button>
<button type="button" class="btn btn-danger">（危险）Danger</button>
<button type="button" class="btn btn-link">（链接）Link</button>
```



#### 尺寸

使用 `.btn-lg`、`.btn-sm` 或 `.btn-xs` 就可以获得不同尺寸的按钮。

通过给按钮添加 `.btn-block` 类可以将其拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素。



![image-20210903212657369](https://www.huangyihui.cn/upload/gburlimg/07f7ec7d55e7b.png)

```html
<p>
  <button type="button" class="btn btn-primary btn-lg">（大按钮）Large button</button>
  <button type="button" class="btn btn-default btn-lg">（大按钮）Large button</button>
</p>
<p>
  <button type="button" class="btn btn-primary">（默认尺寸）Default button</button>
  <button type="button" class="btn btn-default">（默认尺寸）Default button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-sm">（小按钮）Small button</button>
  <button type="button" class="btn btn-default btn-sm">（小按钮）Small button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-xs">（超小尺寸）Extra small button</button>
  <button type="button" class="btn btn-default btn-xs">（超小尺寸）Extra small button</button>
</p>

<button type="button" class="btn btn-primary btn-lg btn-block">（块级元素）Block level button</button>
```



#### 激活状态

为按钮添加 `.active` ，可以让按钮显示为激活状态的样式。

```html
<button type="button" class="btn btn-primary active">Primary button</button>
<a href="#" class="btn btn-primary active" role="button">Primary link</a>
```



### 图片

响应式图片: 通过为图片添加 `.img-responsive` 类可以让图片支持响应式布局。其实质是为图片设置了 `max-width: 100%;`、 `height: auto;` 和 `display: block;` 属性，从而让图片在其父元素中更好的缩放。

如果需要让使用了 `.img-responsive` 类的图片水平居中，请使用 `.center-block` 类，不要用 `.text-center`。



通过为 `<img>` 元素添加以下相应的类，可以让图片呈现不同的形状。IE8 不支持 CSS3 中的圆角属性。



![image-20210903215903174](https://www.huangyihui.cn/upload/gburlimg/03662d68894d6.png)

```html
<div class="myimg center-block">
  <img src="pic/1.jpg" alt="" class="img-responsive">
</div>

<img src="pic/1.jpg" alt="" class="img-rounded">
<img src="pic/2.jpg" alt="" class="img-circle">
<img src="pic/3.jpg" alt="" class="img-thumbnail">
```



### 辅助类

#### 情境文本颜色

通过颜色来展示意图，Bootstrap 提供了一组工具类。这些类可以应用于链接，并且在鼠标经过时颜色可以还可以加深，就像默认的链接一样。



![image-20210903220728060](https://www.huangyihui.cn/upload/gburlimg/7779c4e7d00f7.png)

```html
<p>默认文本颜色</p>
<p class="text-muted">text-muted</p>
<p class="text-primary">text-primary</p>
<p class="text-success">text-success</p>
<p class="text-info">text-info</p>
<p class="text-warning">text-warning</p>
<p class="text-danger">text-danger</p>
<a href="#">默认超链接颜色</a>
<a href="#" class="text-success">超链接text-success</a>
```



#### 情境背景色

和情境文本颜色类一样，使用任意情境背景色类就可以设置元素的背景。链接组件在鼠标经过时颜色会加深，就像上面所讲的情境文本颜色类一样。



![image-20210903221207040](https://www.huangyihui.cn/upload/gburlimg/de45ad54b4fd9.png)

```html
<p class="bg-primary">bg-primary</p>
<p class="bg-success">bg-success</p>
<p class="bg-info">bg-info</p>
<p class="bg-warning">bg-warning</p>
<p class="bg-danger">bg-danger</p>
<a href="#" class="bg-success">超链接</a>
```



#### 符号

```html
<!-- 关闭 x符号 -->
<button type="button" class="close"><span>&times;</span></button>

<!-- 倒小三角 -->
<span class="caret"></span>
```



#### 浮动

* `.pull-left` : 左浮动。实际上就是 `float: left !important;`
* `.pull-right` : 右浮动
* `.clearfix` : 清除浮动

```html
<div class="pull-left" style="width: 100px; height: 100px; background: red;"></div>
<div class="pull-right" style="width: 100px; height: 100px; background: green;"></div>
<div class="clearfix"></div>
<div style="width: 200px; height: 200px; background: blue;"></div>
```



#### 显示或隐藏

`.show` 和 `.hidden` 类可以强制任意元素显示或隐藏(**对于屏幕阅读器也能起效**)。这些类通过 `!important` 来避免 CSS 样式优先级问题

另外，`.invisible` 类可以被用来仅仅影响元素的可见性，也就是说，元素的 `display` 属性不被改变，并且这个元素仍然能够影响文档流的排布。

```html
<div class="show" style="width: 100px; height: 100px; background: red;"></div>
<div class="hidden" style="width: 100px; height: 100px; background: green;"></div>
<img src="pic/1.jpg" alt="" class="invisible">
<div style="width: 200px; height: 200px; background: blue;"></div>
```



#### 屏幕阅读器和键盘导航

`.sr-only` 类可以对**屏幕阅读器以外**的设备隐藏内容。`.sr-only` 和 `.sr-only-focusable` 联合使用的话可以在元素有焦点的时候再次显示出来（例如，使用键盘导航的用户）

```html
<a class="sr-only sr-only-focusable" href="#content">Skip to main content</a>
```



### 样式类

* `.help-block` : 设置为块级元素，并添加上下外边距，颜色改成灰色。会用于在输入框下提示帮助信息。
* `.sr-only` :  隐藏元素。可以对**屏幕阅读器以外**的设备隐藏内容，只有屏幕阅读器才看得到
* `.center-block` : 让内容块居中。实际是设置 `display: block` 属性并通过 `margin` 属性让其中的内容居中



```html
<label for="inputHelpBlock">Input with help text</label>
<input type="text" id="inputHelpBlock" class="form-control" aria-describedby="helpBlock">
<span id="helpBlock" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
```





## 栅格系统

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。



 Bootstrap 栅格系统的工作原理：

* “行（row）”必须包含在 `.container` （固定宽度）或 `.container-fluid` （100% 宽度）中，以便为其赋予合适的排列（aligment）和内补（padding）。
* 通过“行（row）”在水平方向创建一组“列（column）”。
* 你的内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为行（row）”的直接子元素。
* 类似 `.row` 和 `.col-xs-4` 这种预定义的类，可以用来快速创建栅格布局。
* 通过为“列（column）”设置 `padding` 属性，从而创建列与列之间的间隔（gutter）。通过为 `.row` 元素设置负值 `margin` 从而抵消掉为 `.container` 元素设置的 `padding`，也就间接为“行（row）”所包含的“列（column）”抵消掉了`padding`。
* 栅格系统中的列是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个 `.col-xs-4` 来创建。
* 如果一“行（row）”中包含了的“列（column）”大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。
* 在元素上应用任何 `.col-md-*` 栅格类适用于与屏幕宽度大于或等于分界点大小的设备 ， 并且针对小屏幕设备覆盖栅格类。也就是说，如果屏幕宽度小于`.col-md-*` 栅格类的宽度时，`.col-md-*` 会堆叠起来。



![image-20210904003155461](https://www.huangyihui.cn/upload/gburlimg/159737795614c.png)



```html
<div class="container">
  <div class="row">
    <!-- 超小屏幕下显示1列，小屏幕下显示2列，中等屏幕下显示3列，大屏幕下显示4列 -->
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><img src="pic/1.jpg" alt=""></div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><img src="pic/2.jpg" alt=""></div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><img src="pic/3.jpg" alt=""></div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><img src="pic/2.jpg" alt=""></div>
  </div>
</div>
```



### 通过媒体查询设置分界点阀值

在栅格系统中，我们在 Less 文件中使用以下媒体查询（media query）来创建关键的分界点阈值。

```css
/* 超小屏幕（手机，小于 768px） */
/* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */

/* 小屏幕（平板，大于等于 768px） */
@media (min-width: @screen-sm-min) { ... }

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: @screen-md-min) { ... }

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: @screen-lg-min) { ... }
```





### 多余的列将另起一行排列

如果在一个 `.row` 内包含的列（column）大于12个，包含多余列（column）的元素将作为一个整体单元被另起一行排列。

![image-20210904005529942](https://www.huangyihui.cn/upload/gburlimg/3690ddfa84447.png)

```html
<div class="row">
  <div class="col-xs-9">.col-xs-9</div>
  <div class="col-xs-4">.col-xs-4<br>9+4大于12了，所以这列将另起一行排列</div>
  <div class="col-xs-6">.col-xs-6<br>4+6小于12，这列还能在这一行</div>
</div>
```



### 响应式列重置

在某些阈值时，某些列可能会出现比别的列高的情况。为了克服这一问题，建议联合使用 `.clearfix` 和 响应式工具类。

![image-20210904010457463](https://www.huangyihui.cn/upload/gburlimg/e7768b88e2e1.png)

![image-20210904010604279](https://www.huangyihui.cn/upload/gburlimg/7ebb935ebb5bc.png)

```html
<div class="row">
  <div class="col-xs-6 col-sm-3">列1  这列很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长内容</div>
  <div class="col-xs-6 col-sm-3">列2</div>

  <!-- 仅为所需的视口添加额外的clearfix -->
  <div class="clearfix visible-xs-block"></div>

  <div class="col-xs-6 col-sm-3">列3</div>
  <div class="col-xs-6 col-sm-3">列4</div>
</div>
```



### 清除沟槽

使用`.row-no-gutters`类删除行和列中的沟槽。也就是去除行中的负margin，和去除列中的padding。

```html
<div class="row row-no-gutters">
  <div class="col-xs-12 col-md-8">.col-xs-12 .col-md-8</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>
<div class="row row-no-gutters">
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>
<div class="row row-no-gutters">
  <div class="col-xs-6">.col-xs-6</div>
  <div class="col-xs-6">.col-xs-6</div>
</div>
```



### 列偏移

使用 `.col-md-offset-*` 类可以将列向右侧偏移。

这些类实际是通过使用 `*` 选择器为当前元素增加了左侧的边距（margin）。例如，`.col-md-offset-4` 类将 `.col-md-4` 元素向右侧偏移了4个列（column）的宽度。

```html
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
</div>
<div class="row">
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
</div>
<div class="row">
  <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
</div>
```



### 列排序

通过使用 `.col-md-push-*` 和 `.col-md-pull-*` 类就可以很容易的改变列（column）的顺序。

```html
<div class="row">
  <div class="col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
  <div class="col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
</div>
```



### 嵌套列

为了使用内置的栅格系统将内容再次嵌套，可以通过添加一个新的 `.row` 元素和一系列 `.col-sm-*` 元素到已经存在的 `.col-sm-*` 元素内。被嵌套的行（row）所包含的列（column）的个数不能超过12

```html
<div class="row">
  <div class="col-sm-9">
    Level 1: .col-sm-9
    <div class="row">
      <div class="col-xs-8 col-sm-6">
        Level 2: .col-xs-8 .col-sm-6
      </div>
      <div class="col-xs-4 col-sm-6">
        Level 2: .col-xs-4 .col-sm-6
      </div>
    </div>
  </div>
</div>
```



## 响应式工具

利用媒体查询功能并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容。



![image-20210904135255835](https://www.huangyihui.cn/upload/gburlimg/e19a70f0ae49b.png)

```html
<div class="container">
  <!-- 只有在超小屏幕下可见 -->
  <img src="pic/1.jpg" alt="" class="visible-xs">
  <!-- 在超小屏幕下隐藏 -->
  <img src="pic/2.jpg" alt="" class="hidden-xs">
</div>
```





## 组件

Bootstrap 自带了大量可复用的组件，包括字体图标、下拉菜单、导航、警告框、弹出框等更多功能。

除了字体图标需要依赖 `fonts` 文件夹外，其他组件都依赖 `bootstrap.js`



### Glyphicons 字体图标

使用:

* 出于性能的考虑，所有图标都需要一个基类和对应每个图标的类。
* 注意，为了设置正确的内补（padding），务必在图标和文本之间添加一个空格。
* 不能在同一个元素上与其他类共同存在，并且只对内容为空的元素起作用



可以把它们应用到按钮、工具条中的按钮组、导航或输入框等地方。

```html
<button class="btn btn-default">
  <!-- 如果需要修改字体图标的样式，请不要直接修改 .glyphicon 中的样式 -->
  <span class="glyphicon glyphicon-heart" style="color: red;"></span> 关注
</button>

<div class="alert alert-danger">
  <span class="glyphicon glyphicon-exclamation-sign"></span>
  输入的邮箱地址不合法
</div>
```



### 下拉菜单

用于显示链接列表的可切换、有上下文的菜单。



将下拉菜单触发器和下拉菜单都包裹在 `.dropdown` 里，或者另一个声明了 `position: relative;` 的元素。然后加入组成菜单的 HTML 代码。

* `.dropdown` : 菜单默认向下弹出
* `.dropup` : 让菜单向上弹出
* `.dropdown-toggle` : 是为了清除按下按钮后，按钮四边一直出现黑框的点击样式效果。
* `.dropdown-menu` : 下拉菜单。默认是 `display: none;`
* `.dropdown-header` : 标题。在任何下拉菜单中均可通过添加标题来标明一组动作。
* `.divider` : 分割线。为下拉菜单添加一条分割线，用于将多个链接分组。

```html
<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
    下拉菜单
    <span class="caret"></span> <!-- 小三角 -->
  </button>
  <ul class="dropdown-menu">
    <li class="dropdown-header">分类一</li>
    <li><a href="#">菜单1</a></li>
    <li><a href="#">菜单菜单2</a></li>
    <li><a href="#">菜单菜单菜单3</a></li>
    <li class="divider"></li> <!-- 分割线 -->
    <li class="dropdown-header">分类二</li>
    <li><a href="#">菜单4</a></li>
  </ul>
</div>
```



**对齐**

默认情况下，下拉菜单自动沿着父元素的上沿和左侧被定位为 100% 宽度。

为 `.dropdown-menu` 添加 `.dropdown-menu-right` 类可以让菜单右对齐。

为 `.dropdown-menu` 添加 `.dropdown-menu-left` 类可以让菜单右对齐。

```html
<ul class="dropdown-menu dropdown-menu-right">
  ...
</ul>
```





### 按钮组

通过按钮组容器 `.btn-group` 把一组按钮放在同一行里。



![image-20210904212931029](https://www.huangyihui.cn/upload/gburlimg/db3e2a883f0d1.png)



* `.btn-group-lg` `.btn-group-sm` `.btn-group-xs` : 给 `.btn-group` 中所有按钮都设置尺寸
* `.btn-group-vertical` : 垂直排列。让一组按钮垂直堆叠排列显示而不是水平排列。

```html
<div class="btn-group btn-group-lg">
  <button type="button" class="btn btn-default">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>
```



#### 按钮工具栏

把一组 `<div class="btn-group">` 组合进一个 `<div class="btn-toolbar">` 中就可以做成更复杂的组件。

```html
<div class="btn-toolbar">
  <div class="btn-group">
    <button type="button" class="btn btn-default">1</button>
    <button type="button" class="btn btn-default">2</button>
    <button type="button" class="btn btn-default">3</button>
    <button type="button" class="btn btn-default">4</button>
  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-default">5</button>
    <button type="button" class="btn btn-default">6</button>
    <button type="button" class="btn btn-default">7</button>
  </div>
</div>
```



#### 嵌套

把下拉菜单混合到一系列按钮中，只须把 `.btn-group` 放入另一个 `.btn-group` 中。

```html
<div class="btn-group">
  <button type="button" class="btn btn-default">1</button>
  <button type="button" class="btn btn-default">2</button>

  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      下拉菜单
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a href="#">菜单1</a></li>
      <li><a href="#">菜单2</a></li>
    </ul>
  </div>
</div>
```



#### 两端对齐排列的按钮组

让一组按钮拉长为相同的尺寸，填满父元素的宽度。对于按钮组中的按钮式下拉菜单也同样适用。

为了将 `<button`> 元素用于两端对齐的按钮组中，必须将每个按钮包裹进一个按钮组中。

`.btn-group-justified` : 两端对齐排列的按钮组

```html
<div class="btn-group btn-group-justified">
  <div class="btn-group">
    <button type="button" class="btn btn-default">Left</button>
  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-default">Middle</button>
  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-default">Right</button>
  </div>
</div>
```





### 按钮式下拉菜单

把任意一个按钮放入 `.btn-group` 中，然后加入适当的菜单标签，就可以让按钮作为菜单的触发器了。

看起来和普通下拉菜单很相似，只是它最外层是 `.dropdown`。但最大区别在于，按钮式下拉菜单可以实现分裂式



![image-20210904214938487](https://www.huangyihui.cn/upload/gburlimg/bb05e70343403.png)



* `.btn-lg` `.btn-sm` `.btn-xs` : 按钮尺寸。按钮式下拉菜单适用所有尺寸的按钮。
* `.dropup` : 给父元素添加 `.dropup` 类就能使触发的下拉菜单朝上方打开。

```html
<div class="btn-group dropup">
  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
    按钮式下拉菜单 <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
    <li><a href="#">菜单1</a></li>
    <li><a href="#">菜单2</a></li>
    <li><a href="#">菜单3</a></li>
    <li class="divider"></li>
    <li><a href="#">菜单4</a></li>
  </ul>
</div>
```



#### 分裂式按钮下拉菜单

相似地，分裂式按钮下拉菜单也需要同样的改变一些标记，但只是多一个分开的按钮。

哪个 `<button>` 有 `data-toggle="dropdown"` ，那这个按钮才能触发下拉菜单。

```html
<div class="btn-group">
  <button type="button" class="btn btn-primary">分裂式下拉菜单</button>
  <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a href="#">菜单1</a></li>
    <li><a href="#">菜单2</a></li>
    <li><a href="#">菜单3</a></li>
    <li class="divider"></li>
    <li><a href="#">菜单4</a></li>
  </ul>
</div>
```





### 输入框组

通过在文本输入框 `<input>` 前面、后面或是两边加上文字或按钮，可以实现对表单控件的扩展。

为 `.input-group` 赋予 `.input-group-addon` 或 `.input-group-btn` 类，可以给 `.form-control` 的前面或后面添加额外的元素。

注意: 不要将表单组或栅格列（column）类直接和输入框组混合使用。而是将输入框组嵌套到表单组或栅格相关元素的内部。



![image-20210905150214384](https://www.huangyihui.cn/upload/gburlimg/8c8149d97568c.png)



* `.input-group-lg` `.input-group-sm` : 可以为 `.input-group` 添加的尺寸类

使用 `.input-group` 将整个 `<input>` 包裹起来，并对要放进去的内容添加 `.input-group-addon` 。

```html
<div class="input-group">
  <div class="input-group-addon">￥</div>
  <input type="text" class="form-control" placeholder="金额">
  <div class="input-group-addon">.00</div>
</div>

<div class="input-group input-group-sm">
  <input type="text" class="form-control" placeholder="邮箱">
  <span class="input-group-addon">@qq.com</span>
</div>
```





#### 添加额外元素

可以将多选框或单选框作为额外元素添加到输入框组中。

```html
<div class="row">
  <div class="col-md-6">
  	<!-- 将输入框组嵌套在栅格相关的元素内部 -->
    <div class="input-group">
      <div class="input-group-addon">
        <!-- 输入框组内部添加多选框 -->
        <input type="checkbox">
      </div>
      <input type="text" class="form-control">
    </div>
  </div>

  <div class="col-md-6">
    <div class="input-group">
      <div class="input-group-addon">
        <input type="radio">
      </div>
      <input type="text" class="form-control">
    </div>
  </div>
</div>
```



为输入框组添加按钮需要使用 `.input-group-btn` 来包裹按钮元素。分裂式按钮同理。

虽然每边只能有一个附加组件，但在一个 `.input-group-btn` 中可以有多个按钮。

```html
<div class="input-group">
  <input type="text" class="form-control" placeholder="关键词">
  <div class="input-group-btn">
    <button class="btn btn-info"><span class="glyphicon glyphicon-search"></span> 搜索</button>
  </div>  
</div>
```



为输入框组添加下拉菜单。

```html
<div class="input-group">
  <div class="input-group-btn">
    <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      百度
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a href="#">百度</a></li>
      <li><a href="#">谷歌</a></li>
      <li><a href="#">搜狗</a></li>
    </ul>
  </div>
  <input type="text" class="form-control">
</div>
```





### 路径导航

在一个带有层次的导航结构中标明当前页面的位置。

各路径间的分隔符已经自动通过 CSS 的 `:before` 和 `content` 属性添加了。

![image-20210906120207757](https://www.huangyihui.cn/upload/gburlimg/efe7300496137.png)

```html
<ol class="breadcrumb">
  <li><a href="#">Home</a></li>
  <li><a href="#">Library</a></li>
  <li class="active">Data</li>
</ol>
```





### 分页

可以给当前页添加 `.active` 类，给不能点击的链接添加 `.disabled` 类。

建议在向前/向后的箭头处，不使用 `<a>` 标签。

`.pagination-lg` 或 `.pagination-sm` 类提供了额外可供选择的尺寸。



![image-20210906121601139](https://www.huangyihui.cn/upload/gburlimg/81f5501e7e43d.png)

```html
<ul class="pagination">
  <li><span>&laquo;</span></li>
  <li class="active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
  <li><span>&raquo;</span></li>
</ul>
```



 ### 简单翻页

![image-20210906121852171](https://www.huangyihui.cn/upload/gburlimg/aa3799884b9d7.png)

在默认的翻页中，链接居中对齐。但是可以添加 `.previous` 和 `.next` 让链接向两端对齐。

```html
<ul class="pager">
  <li class="previous"><a href="#">上一页</a></li>
  <li class="next"><a href="#">下一页</a></li>
</ul>
```



### 标签

![image-20210906122350212](https://www.huangyihui.cn/upload/gburlimg/8e28174bd5962.png)

用下面的任何一个类即可改变标签的外观。

```html
<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
```



### 徽章(信息数)

给链接、导航等元素嵌套 `<span class="badge">` 元素，可以很醒目的展示新的或未读的信息条目。

如果徽章中不包含任何内容，徽章组件能够自动隐藏。

![image-20210906123026309](https://www.huangyihui.cn/upload/gburlimg/0afba05dc8796.png)

```html
<a href="#">未读 <span class="badge">12</span></a>
<button class="btn btn-primary">未读消息 <span class="badge">99</span></button>
<button class="btn btn-danger">未读消息 <span class="badge">99</span></button>
```





### 巨幕

![image-20210906124312420](https://www.huangyihui.cn/upload/gburlimg/469c69849f39f.png)

```html
<div class="container">
  <div class="jumbotron">
    <h1 class="text-center">hello, world</h1>
    <button class="btn btn-primary center-block">更多</button>
  </div>
</div>
```



如果需要让巨幕组件的宽度与浏览器宽度一致并且没有圆角，请把此组件放在所有 `.container` 元素的外面，并在组件内部添加一个 `.container` 元素。

```html
<div class="jumbotron">
  <div class="container">
    <h1 class="text-center">hello, world</h1>
    <button class="btn btn-primary center-block">更多</button>
  </div>
</div>
```





### 页头

页头组件 `.page-header` 能够为 `h#` 标签增加适当的空间，并且与页面的其他部分形成一定的分隔。它支持 `h1` 标签内内嵌 `small` 元素的默认效果，还支持大部分其他组件（需要增加一些额外的样式）。



![image-20210906124811108](https://www.huangyihui.cn/upload/gburlimg/6cb37c41a9277.png)

```html
<div class="page-header">
  <h1>标题 <small>副标题</small></h1>
</div>

<div class="page-header">
  <h1>标题 <small><span class="label label-info">副标题</span></small></h1>
</div>
```





### 缩略图

```html
<div class="row">
  <div class="col-xs-6 col-md-3">
    <a href="#" class="thumbnail"><img src="pic/1.jpg" alt=""></a>
  </div>
	...
</div>
```



**自定义内容**

添加一点点额外的标签，就可以把任何类型的 HTML 内容，例如标题、段落或按钮，加入缩略图组件内。

```html
<div class="row">
  <div class="col-sm-6 col-md-4">
    <div class="thumbnail">
      <img src="pic/1.jpg" alt="...">
      <div class="caption">
        <h3>标题</h3>
        <p>详细介绍</p>
        <p><a href="#" class="btn btn-primary">Button</a> <a href="#" class="btn btn-default">Button</a></p>
      </div>
    </div>
  </div>
</div>
```





### 警告框

警告框组件通过提供一些灵活的预定义消息，为常见的用户动作提供反馈消息。

将任意文本和一个可选的关闭按钮组合在一起就能组成一个警告框，`.alert` 类是必须要设置的，另外我们还提供了有特殊意义的4个类（例如，`.alert-success`），代表不同的警告信息。



![image-20210906145835408](https://www.huangyihui.cn/upload/gburlimg/181852646ea55.png)

```html
<div class="alert alert-success">成功</div>
<div class="alert alert-info">消息</div>
<div class="alert alert-warning">警告</div>
<div class="alert alert-danger">危险</div>

<!-- 可以关闭的警告框 -->
<div class="alert alert-warning alert-dismissible">
  <!-- 务必给 <button> 元素添加 data-dismiss="alert" 属性 -->
  <button class="close" data-dismiss="alert">&times;</button>
  警告
</div>

<!-- 用 .alert-link 工具类，可以为链接设置与当前警告框相符的颜色。 -->
<div class="alert alert-success">
  成功! 将跳转回
  <a href="#" class="alert-link">首页</a>
</div>
```





### 进度条

进度条组件使用了 CSS3 的 transition 和 animation 属性来完成一些特效。IE9及以下版本不支持。



![image-20210906152239718](https://www.huangyihui.cn/upload/gburlimg/2b10c2bf77ad9.png)

```html
<div class="progress">
  <div class="progress-bar" style="width: 60%">60%</div>
</div>
<div class="progress">
  <!-- 在展示很低的百分比时，如果需要让文本提示能够清晰可见，可以为进度条设置 min-width 属性。 -->
  <div class="progress-bar" style="min-width: 2em">0%</div>
</div>
```



#### **不同样式的进度条**

* `.progress-bar-success` `.progress-bar-info` `.progress-bar-warning` `.progress-bar-danger`

```html
<div class="progress">
  <div class="progress-bar progress-bar-success" style="width: 20%"></div>
</div>
<div class="progress">
  <div class="progress-bar progress-bar-info" style="width: 40%"></div>
</div>
<div class="progress">
  <div class="progress-bar progress-bar-warning" style="width: 80%"></div>
</div>
<div class="progress">
  <div class="progress-bar progress-bar-danger" style="width: 60%"></div>
</div>
```



#### **条纹效果 **

`.progress-bar-striped`

```html
<div class="progress">
  <div class="progress-bar progress-bar-success progress-bar-striped" style="width: 60%"></div>
</div>
```



#### **动画效果 **

为 `.progress-bar-striped` 添加 `.active` 类，使其呈现出由右向左运动的动画效果。

```html
<div class="progress">
  <div class="progress-bar progress-bar-success progress-bar-striped active" style="width: 40%"></div>
</div>
```



#### **堆叠效果 **

把多个进度条放入同一个 `.progress` 中

```html
<div class="progress">
  <div class="progress-bar progress-bar-success" style="width: 35%"></div>
  <div class="progress-bar progress-bar-warning progress-bar-striped active" style="width: 25%"></div>
  <div class="progress-bar progress-bar-danger" style="width: 10%"></div>
</div>
```





### 媒体对象

这是一个抽象的样式，用以构建不同类型的组件，这些组件都具有在文本内容的左或右侧对齐的图片（就像博客评论）。



![image-20210906155535370](https://www.huangyihui.cn/upload/gburlimg/a4db5b795dabe.png)



默认样式的媒体对象组件允许在一个内容块的左边或右边展示一个多媒体内容（图像、视频、音频）。

* `.media-left` `.media-right` : 在左边或者右边显示。不同的是，在 html 结构中， `.media-right` 应当放在 `.media-body` 的后面。
* `.media-middle` `.media-bottom` : 可选，图片或其他媒体类型可以顶部、中部或底部对齐。默认是顶部对齐



```html
<div class="media">
  <div class="media-left media-middle">
    <a href="#"><img src="pic/T1.png" class="media-object" alt=""></a>
  </div>
  <div class="media-body">
    <h4 class="media-heading">小红</h4>
    <p>Bootstrap是美国Twitter公司的设计师Mark Otto和Jacob Thornton合作基于HTML、CSS、JavaScript 开发的简洁、直观、强悍的前端开发框架，使得 Web 开发更加快捷。Bootstrap提供了优雅的HTML和CSS规范，它即是由动态CSS语言Less写成。Bootstrap一经推出后颇受欢迎，一直是GitHub上的热门开源项目，包括NASA的MSNBC（微软全国广播公司）的Breaking News都使用了该项目。</p>
  </div>
</div>
```



#### **媒体对象列表 `.media-list`**

用一点点额外的标记，就能在列表内使用媒体对象组件（对评论或文章列表很有用）。

```html
<ul class="media-list">
  <li class="media">
    <div class="media-left">
      <a href="#"><img src="pic/T1.png" class="media-object" alt=""></a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">小红</h4>
      <p>Bootstrap是美国Twitter公司的设计师Mark Otto和Jacob Thornton合作基于HTML、CSS、JavaScript 开发的简洁、直观、强悍的前端开发框架，使得 Web 开发更加快捷。Bootstrap提供了优雅的HTML和CSS规范，它即是由动态CSS语言Less写成。Bootstrap一经推出后颇受欢迎，一直是GitHub上的热门开源项目，包括NASA的MSNBC（微软全国广播公司）的Breaking News都使用了该项目。</p>

      <div class="media">
        <div class="media-left">
          <a href="#"><img src="pic/T2.png" class="media-object" alt=""></a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">小明</h4>
          <p>顶一个</p>
        </div>
      </div>
    </div>
  </li>

  <li class="media">
    <div class="media-left">
      <a href="#"><img src="pic/Bingo.png" class="media-object" alt=""></a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">Bingo</h4>
      <p>说得好</p>
    </div>
  </li>
</ul>
```





### 列表组

![image-20210906161611659](https://www.huangyihui.cn/upload/gburlimg/c62404a334a85.png)

```html
<ul class="list-group">
  <li class="list-group-item">列表项1</li>
  <!-- 给列表组加入徽章组件，它会自动被放在右边。 -->
  <li class="list-group-item"><span class="badge">51</span>列表项2</li>
  <li class="list-group-item">列表项3</li>
  <li class="list-group-item">列表项4</li>
</ul>
```

当然，还可以在列表项中嵌套更多内容。



#### 链接式列表组

用 `<a>` 标签代替 `<li>` 标签可以组成一个全部是链接的列表组（还要注意的是，我们需要将 `<ul>` 标签替换为 `<div>` 标签）。没必要给列表组中的每个元素都加一个父元素。

```html
<div class="list-group">
  <a href="#" class="list-group-item active"><span class="badge">11</span>链接式列表项1</a>
  <a href="#" class="list-group-item">链接式列表项2</a>
  <a href="#" class="list-group-item">链接式列表项3</a>
</div>
```



#### 按钮式列表组

列表组中的元素也可以直接就是按钮（也同时意味着父元素必须是 `<div>` 而不能用 `<ul>` 了），并且无需为每个按钮单独包裹一个父元素。**注意不要使用标准的 `.btn` 类！**

```html
<div class="list-group">
  <button class="list-group-item"><span class="badge">999</span>按钮式列表项1</button>
  <button class="list-group-item">按钮式列表项2</button>
  <button class="list-group-item">按钮式列表项3</button>
</div>
```



#### 情境类

为列表中的条目添加情境类，默认样式或链接列表都可以。还可以为列表中的条目设置 `.active` 状态。

* `.list-group-item-success` `.list-group-item-info` `.list-group-item-warning` `.list-group-item-danger`

```html
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-success">列表项1</a>
  <a href="#" class="list-group-item list-group-item-info">列表项2</a>
  <a href="#" class="list-group-item list-group-item-warning">列表项3</a>
  <a href="#" class="list-group-item list-group-item-danger">列表项3</a>
</div>
```





### 面板

![image-20210906164220077](https://www.huangyihui.cn/upload/gburlimg/b2782ce4e6051.png)

如果需要将某些 DOM 内容放到一个盒子里。对于这种情况，可以试试面板组件。

面板中还可以嵌套表格，列表组等。

```html
<div class="panel panel-default">
  <div class="panel-body">
    面板中的内容
  </div>
</div>
```



面板拓展

通过 `.panel-heading` 可以很简单地为面板加入一个标题容器。

通过 `.panel-footer` 为面板添加脚注容器。注意，面版的脚注**不会**从情境效果中继承颜色。

```html
<div class="panel panel-default">
  <div class="panel-heading">标题</div>
  <div class="panel-body">
    面板中的内容
  </div>
  <div class="panel-footer">脚注</div>
</div>
```



情境效果

像其他组件一样，可以简单地通过加入有情境效果的状态类，给特定的内容使用更针对特定情境的面版。

```html
<div class="panel panel-primary">
  <div class="panel-heading">标题</div>
  <div class="panel-body">
    面板中的内容
  </div>
  <div class="panel-footer">脚注</div>
</div>

<div class="panel panel-primary">...</div>
<div class="panel panel-success">...</div>
<div class="panel panel-info">...</div>
<div class="panel panel-warning">...</div>
<div class="panel panel-danger">...</div>
```









### 具有响应式特性的嵌入内容

根据被嵌入内容的外部容器的宽度，自动创建一个固定的比例，从而让浏览器自动确定视频或 slideshow 的尺寸，能够在各种设备上缩放。

这些规则被直接应用在 `<iframe>`、`<embed>`、`<video>` 和 `<object>` 元素上。如果你希望让最终样式与其他属性相匹配，还可以明确地使用一个派生出来的 `.embed-responsive-item` 类。

**超级提示：** 不需要为 `<iframe>` 元素设置 `frameborder="0"` 属性，因为我们已经替你这样做了！



```html
<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>

<!-- 4:3 aspect ratio -->
<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.huangyihui.cn"></iframe>
</div>
```







### well 嵌入效果

把 Well 用在元素上，就能有嵌入（inset）的简单效果。



![image-20210906162537792](https://www.huangyihui.cn/upload/gburlimg/062f4ac9a048b.png)

* `.well` : 嵌入效果
* `.well-lg` `.well-sm` : 控制此组件的内补（padding）和圆角的设置。

```html
<div class="well">well</div>
<div class="well well-sm">well</div>
```







## 导航

Bootstrap 中的导航组件都依赖同一个 `.nav` 类，状态类也是共用的。改变修饰类可以改变样式。



* `.nav` : 导航组件基类
* `.nav-tabs` `.nav-pills` : 导航样式类
* `.active` : 选中状态类
* `.nav-stacked`  : 导航条垂直方向堆叠排列
* `.nav-justified` : 两端对齐的标签页。在大于 768px 的屏幕上，通过 `.nav-justified` 类可以很容易的让标签页或胶囊式标签呈现出同等宽度。在小屏幕上，导航链接呈现堆叠样式。



![image-20210905153440222](https://www.huangyihui.cn/upload/gburlimg/612d06ad53672.png)

```html
<ul class="nav nav-tabs">
  <li class="active"><a href="#">主页</a></li>
  <li><a href="#">导航条2</a></li>
  <li><a href="#">导航条3</a></li>
</ul>

<ul class="nav nav-pills">
  <li class="active"><a href="#">主页</a></li>
  <li><a href="#">导航条2</a></li>
  <li><a href="#">导航条3</a></li>
</ul>

<ul class="nav nav-pills nav-stacked">
	<!-- 垂直排列 -->
</ul>

<ul class="nav nav-pills nav-justified">
  <!-- 两端对齐 -->
</ul>
```



**带下拉菜单的胶囊式标签页**

```html
<ul class="nav nav-pills">
  <li class="active"><a href="#">主页</a></li>
  <li><a href="#">导航条2</a></li>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">导航条3
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li><a href="#">下拉菜单1</a></li>
      <li><a href="#">下拉菜单2</a></li>
      <li><a href="#">下拉菜单3</a></li>
    </ul>
  </li>
</ul>
```





## 导航条

默认情况下，当屏幕宽度大于或等于 `768px` 时，导航条会展开。否则导航条内部的元素会折叠排列。



* `.navbar-default` `.navbar-inverse` : 导航条样式。 inverse是反色的导航条。
* `.navbar-nav` : 将导航条中的链接选项放在里面。
* `.navbar-form` : 将表单放置于 `.navbar-form` 之内可以呈现很好的垂直对齐，并在较窄的视口中呈现折叠状态。
* `.navbar-left` `.navbar-right` : 让导航链接、表单、按钮或文本对齐，规定其在导航条上出现的位置。
* `.navbar-btn` : 对于不包含在 `<form>` 中的 `<button>` 元素，加上 `.navbar-btn` 后，可以让它在导航条里垂直居中。
* `.navbar-text` : 把文本包裹在 `.navbar-text`中时，为了有正确的行距和颜色，通常使用 `<p>` 标签。
* `.navbar-link` : 让非导航链接有正确的颜色和反色设置。



```html
<nav class="navbar navbar-default">
  <div class="container">

    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!-- 品牌图标位置，可以在里面放置 <img> -->
      <a class="navbar-brand" href="#">Bingo</a>
    </div>

    <!-- 导航条部分 -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link</a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <!-- 将表单放置于 .navbar-form 之内可以呈现很好的垂直对齐，并在较窄的视口（viewport）中呈现折叠状态 -->
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
```





### 固定导航条

添加 `.navbar-fixed-top` 类可以让导航条固定在顶部。

添加 `.navbar-fixed-bottom` 类可以让导航条固定在底部。



注意: 固定的导航条会遮住页面的其他内容，需要为 body 元素设置 padding

```html
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    ...
  </div>
</nav>
```





## JavaScript插件

JavaScript 插件可以单个引入（使用 Bootstrap 提供的单个 `*.js` 文件），或者一次性全部引入（使用 `bootstrap.js` 或压缩版的 `bootstrap.min.js`）。

建议使用压缩版的 JavaScript 文件。





### 模态框

模态框弹出时会为 `<body>` 元素添加 `.modal-open` 类，从而覆盖页面默认的滚动行为，并且还会自动生成一个 `.modal-backdrop` 元素用于提供一个可点击的区域，点击此区域就即可关闭模态框。



![image-20210909153716183](https://www.huangyihui.cn/upload/gburlimg/4c3c95f0d753b.png)



实例: 点击按钮即可通过 JavaScript 启动一个模态框。此模态框将从上到下、逐渐浮现到页面前。

```html
<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  弹出模态框
</button>

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">标题</h4>
      </div>
      <div class="modal-body">
        <p>内容</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary">保存更改</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```



* `.fade` : 模态框弹出时的动画效果（淡入淡出效果）。如果不需要可以删除。
* `.modal-lg` `.modal-sm` : 可选，模态框大小。在 `.modal-dialog` 位置增加。



#### 用法

可以通过 data 属性或 JavaScript 调用模态框插件，可以根据需要动态展示隐藏的内容。

方式1: 通过 data 属性。通过在一个起控制器作用的元素（例如：按钮）上添加指定的 `data-` 属性，用于指向被控制的模态框。

```html
<button type="button" data-toggle="modal" data-target="#myModal">弹出模态框</button>
```



方式2: 通过 JavaScript 调用。

```js
$('#myModal').modal()
```





#### 方法

* `.modal()` : 激活显示模态框
* `.modal('toggle')` : 手动打开或关闭模态框。
  * **在模态框显示或隐藏之前返回到主调函数中**（也就是，在触发 `shown.bs.modal` 或 `hidden.bs.modal` 事件之前）。
* `.modal('show')` : 手动打开模态框。
  * **在模态框显示之前返回到主调函数中** （也就是，在触发 `shown.bs.modal` 事件之前）。
* `.modal('hide')` : 手动隐藏模态框。
  * **在模态框隐藏之前返回到主调函数中** （也就是，在触发 `hidden.bs.modal` 事件之前）。

```js
$('#myModal').modal()
$('#myModal').modal('toggle')
$('#myModal').modal('show')
$('#myModal').modal('hide')
```



#### 事件

Bootstrap 的模态框类提供了一些事件用于监听并执行你自己的代码。

所有模态事件都是针对模态本身触发的。



事件类型:

* `show.bs.modal` : `show` 方法调用之后立即触发该事件。
  * 如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 `relatedTarget` 属性进行访问。
* `shown.bs.modal` : 此事件在模态框已经显示出来（并且同时在 CSS 过渡效果完成）之后被触发。
  * 如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 `relatedTarget` 属性进行访问。
* `hide.bs.modal` : `hide` 方法调用之后立即触发该事件。
* `hidden.bs.modal` : 此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。

```js
$('#myModal').on('show.bs.modal', function(e){
  console.log(e.relatedTarget)
  console.log('模态框准备触发')
})

$('#myModal').on('shown.bs.modal', function(e){
  console.log(e.relatedTarget)
  console.log('模态框已经显示后触发')
})

$('#myModal').on('hide.bs.modal', function(){
  console.log('模态框准备隐藏')
})

$('#myModal').on('hidden.bs.modal', function(){
  console.log('模态框已经隐藏')
})
```





### 下拉菜单

使用js方式。不推荐

```js
$('.dropdown-menu').toggle()	// 这种方式不会触发下拉菜单中的事件
```



事件: 所有下拉菜单事件都是在 `.dropdown-menu` 的父元素处触发的。

* `show.bs.dropdown` : 当调用show实例方法时，此事件立即触发。
* `shown.bs.dropdown` : 当下拉菜单对用户可见时触发此事件(将等待CSS转换完成)。
* `hide.bs.dropdown` : 当hide实例方法被调用时，该事件立即被触发。
* `hidden.bs.dropdown` : 当下拉菜单完成对用户的隐藏(将等待CSS转换完成)时，将触发此事件。

```js
$('#myDropdown').on('show.bs.dropdown', function(e){
  console.log(e.relatedTarget)
  console.log('当调用show实例方法时，此事件立即触发')
})
$('#myDropdown').on('shown.bs.dropdown', function(){
  console.log('当下拉菜单对用户可见时触发此事件(将等待CSS转换完成)')
})
$('#myDropdown').on('hide.bs.dropdown', function(){
  console.log('当hide实例方法被调用时，该事件立即被触发')
})
$('#myDropdown').on('hidden.bs.dropdown', function(){
  console.log('当下拉菜单完成对用户的隐藏(将等待CSS转换完成)时，将触发此事件')
})
```





### 滚动监听

滚动监听插件是用来根据滚动条所处的位置来自动更新导航项的。



无论何种实现方式，滚动监听都需要被监听的组件是 `position: relative;` 即相对定位方式。大多数时候是监听 `<body>` 元素。

```css
body {
  position: relative;
}
```



通过 data 属性调用

`data-offset` : 可选参数，计算滚动位置时相对于顶部的偏移量（像素数）。默认为10。

```html
<body data-spy="scroll" data-target="#mynav" data-offset="100">
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <a href="#" class="navbar-brand">滚动监听</a>
      </div>
      <div class="collapse navbar-collapse" id="mynav">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#p1">导航1</a></li>
          <li><a href="#p2">导航2</a></li>
          <li><a href="#p3">导航3</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <div id="p1">
      <h1>导航1</h1>
			<p>更多内容</p>
    </div>
    <div id="p2">
      <h1>导航2</h1>
			<p>更多内容</p>
    </div>
    <div id="p3">
      <h1>导航3</h1>
			<p>更多内容</p>
    </div>
  </div>
</body>
```



通过 JS 调用

在 CSS 中添加 `position: relative;` 后，就不需要为 `<body>` 添加上面这些 `data-*` 属性了。之后，通过 JavaScript 代码启动滚动监听插件：

`offset` : 可选参数，计算滚动位置时相对于顶部的偏移量（像素数）。默认为10。

```js
$('body').scrollspy({target: '#mynav', offset: 100})
```



事件:

`activate.bs.scrollspy` : 每当一个新条目被激活后都将由滚动监听插件触发此事件。

```js
$('body').on('activate.bs.scrollspy', function(){
  ...
})
```



方法:

`scrollspy('refresh')` : 当使用滚动监听插件的同时在 DOM 中添加或删除元素后，你需要像下面这样调用此刷新（ refresh） 方法：

```js
$('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh')
})
```





### 标签页/选项卡

用于添加快速，动态选项卡功能，通过窗格的本地内容过渡，甚至通过下拉菜单。不支持嵌套的选项卡。



使用 data 属性方式

需要为选项卡中的每一个 `<a>` 标签添加 `data-toggle="tab"` 或 `data-toggle="pill"` 属性。

```html
<div class="container">
  <ul class="nav nav-tabs" id="myTabs">
    <li class="active"><a href="#p1" data-toggle="tab">选项卡1</a></li>
    <li><a href="#p2" data-toggle="tab">选项卡2</a></li>
    <li><a href="#p3" data-toggle="tab">选项卡3</a></li>
  </ul>

  <div class="tab-content">
<!--要使选项内容淡入，请在每个 .tab-pane 中添加 .fade 。第一个选项卡窗格也必须有 .in 以使初始内容可见-->
    <div id="p1" class="tab-pane active fade in">选项卡1选项卡1选项卡1</div>
    <div id="p2" class="tab-pane fade">选项卡2选项卡2选项卡2选项卡2选项卡2</div>
    <div id="p3" class="tab-pane fade">选项卡3选项卡3选项卡3选项卡3选项卡3</div>
  </div>
</div>
```



使用JS方式

不需要添加 `data-*` 属性。

```js
$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
```

`tab('show')` : 选择给定的选项卡并显示其相关内容。以前选中的任何其他选项卡将被取消选中，其相关内容将被隐藏。在选项卡面板实际显示之前(即在shown.bs.tab事件发生之前)返回给调用者。



当显示一个新标签时，事件按以下顺序触发:

1. `hide.bs.tab` (在当前活动选项卡上触发)
2. `show.bs.tab` (在待显示选项卡上触发)
3. `hidden.bs.tab` (在上一个活动选项卡上触发，与 `hide.bs.tab` 事件的活动选项卡相同)
4. `shown.bs.tab` (在新激活的刚刚显示的选项卡上触发，与`show.bs.tab`事件相同)

如果没有活动的选项卡，那么hide.bs.tab和hidden.bs.tab事件将不会被触发。

![image-20210909214753054](https://www.huangyihui.cn/upload/gburlimg/b034b69ce0e17.png)



```js
$('a[data-toggle="tab"]').on('hide.bs.tab', function(){
  console.log($(this).html(), 'hide.bs.tab')
})
$('a[data-toggle="tab"]').on('show.bs.tab', function(){
  console.log($(this).html(),'show.bs.tab')
})
$('a[data-toggle="tab"]').on('hidden.bs.tab', function(){
  console.log($(this).html(),'hidden.bs.tab')
})
$('a[data-toggle="tab"]').on('shown.bs.tab', function(){
  console.log($(this).html(),'shown.bs.tab')
})
```





### 工具提示

工具提示有四种选择:上对齐、右对齐、下对齐和左对齐。

零长度标题的工具提示永远不会显示。所以必须设置不为空的 `title` 属性。



```html
<button class="btn btn-default" data-toggle="tooltip" data-placement="left" title="工具提示在左边" data-original-title="Tooltip on left">工具提示在左边</button>
<button class="btn btn-default" data-toggle="tooltip" data-placement="right" title="工具提示在右边">工具提示在右边</button>
<button class="btn btn-default" data-toggle="tooltip" data-placement="top" title="工具提示在上面">工具提示在上面</button>
<button class="btn btn-default" id="btn" data-placement="bottom" title="工具提示在下面">工具提示在下面</button>

<script>
  // 处于性能原因，必须需要手动初始化 tooltip 功能，否则无效
  // 一种初始化页面上所有工具提示的方法是通过data-toggle属性选择它们:
  $('[data-toggle="tooltip"]').tooltip()
  
  // 如果不想使用 data-toggle属性方式，也可以通过id等方式获取到需要使用工具提示的元素，并调用tooltip()
  $('#btn').tooltip()
</script>
```



选项

选项可以通过数据属性或JavaScript传递。对于数据属性，将选项名附加到`data-`，如`data-animation=""`。

* `placement` : string(默认'top')。工具提示要显示的位置。
  * 值可以是 top | bottom | left | right | auto.
* `delay` : number|object。默认0。延迟显示和隐藏工具提示(毫秒)-不适用于 manual 触发类型(JS触发)
  * `delay: 1000` : 如果提供了一个数字，则对hide/show都应用延迟
  * `delay: { 'show': 500, 'hide': 1000}` : 对象写法
* `animation` : 布尔值(默认true)。对工具提示应用一个CSS渐变过渡
* `container` : string|false(默认false)。将工具提示附加到特定元素。默认是在触发器元素的后面。
  * 值可以写成 `container: '#mydiv'` ，这样工具提示就会放在 #mydiv 容器中，但是显示的位置不变
  * `container: 'body'` ，推荐放在body中。这样如果在小的栅格列中显示，不会被压缩宽度。
* `html` : 布尔值(默认false)。在工具提示中插入HTML。如果为false，将使用jQuery的text方法将内容插入到DOM中。如果您担心XSS攻击，请使用文本。
* `trigger` : string。默认是'hover focus'。如何触发提示。
  * 值可以是 click | hover | focus | manual  。可以使用多个触发器，之间用空格隔开。

```js
$('[data-toggle="tooltip"]').tooltip({
  animation: true,
  container: '#mydiv',
  delay: { 'show': 500, 'hide': 1000},
  trigger: 'click'
})
```



方法

* `$().tooltip([options])` : 将工具提示处理程序附加到元素集合。
* `tooltip('show')` : 显示元素的工具提示。在工具提示实际显示之前返回给调用者(即在shown.bs.tooltip事件发生之前)。
* `tooltip('toggle')` : 切换元素的工具提示。在工具提示实际显示或隐藏之前返回给调用者(即在shown.bs.tooltip或hidden.bs.tooltip事件发生之前)。
* `tooltip('destroy')` : 隐藏并破坏一个元素的工具提示。使用委托(使用选择器选项创建)的工具提示不能在后代触发器元素上单独销毁。

```js
$('[data-toggle="tooltip"]').tooltip()
$('#btn').tooltip('show')
$('#btn').tooltip('toggle')
$('#btn').tooltip('destroy')
```



事件:

* `show.bs.tooltip` : 当调用show实例方法时，此事件立即触发。
* `shown.bs.tooltip` : 当工具提示对用户可见时触发此事件(将等待CSS转换完成)。
* `hide.bs.tooltip` : 当hide实例方法被调用时，该事件立即被触发。
* `hidden.bs.tooltip` : 当工具提示完成对用户的隐藏(将等待CSS转换完成)时触发此事件。
* `inserted.bs.tooltip` : 当将工具提示模板添加到DOM中时，此事件在show.bs.tooltip事件之后触发。

```js
$('#btn').on('show.bs.tooltip', function(){
  console.log('准备显示了')
})
$('#btn').on('inserted.bs.tooltip', function(){
  console.log('添加到DOM中了')
})
$('#btn').on('shown.bs.tooltip', function(){
  console.log('显示完毕')
})
$('#btn').on('hide.bs.tooltip', function(){
  console.log('准备隐藏了')
})
$('#btn').on('hidden.bs.tooltip', function(){
  console.log('已经隐藏了')
})
```





### 弹出框

弹出框的用法和工具提示差不多。

弹出框的标题和内容的长度都是零的话将永远不会被显示出来。

```html
<button class="btn btn-info mypopover" data-toggle="popover" title="标题" data-content="弹出框内容">弹出框</button>

<!-- 如果不想使用 data-toggle="popover"，那么可以自定义类名或者id，并在JS中初始化 -->
<button class="btn btn-info mypopover" title="标题" data-content="弹出框内容">弹出框</button>
```



由于性能的原因，工具提示和弹出框的 data 编程接口（data api）是必须要**手动初始化的**。

```js
$('[data-toggle="popover"]').popover()

$('.mypopover').popover()
```



按钮组、输入组和表格中的弹出窗口需要特殊设置:

必须指定选项`container: 'body'`，以避免不必要的副作用(如元素变宽和/或失去其圆角时弹出窗口被触发)。



参数

可以通过data属性或JavaScript传递。对于data属性，将参数名附加到`data-` 后面，如`data-animation=""`。

* `placement` : string(默认'right')。弹出框要显示的位置。
  * 值可以是 top | bottom | left | right | auto.
* `delay` : number|object。默认0。延迟显示和隐藏弹出框(毫秒)-不适用于manual触发类型(JS触发)
  * `delay: 1000` : 如果提供了一个数字，则对hide/show都应用延迟
  * `delay: { 'show': 500, 'hide': 1000}` : 对象写法
* `animation` : 布尔值(默认true)。为弹出框赋予淡出的 CSS 动画效果。
* `container` : string|false(默认false)。将弹出框附加到特定元素。默认是在触发器元素的后面。
  * 值可以写成 `container: '#mydiv'` ，这样弹出框就会放在 #mydiv 容器中，但是显示的位置不变
  * `container: 'body'` ，推荐放在body中。这样如果在小的栅格列中显示，不会被压缩宽度。
* `html` : 布尔值(默认false)。在弹出框中插入HTML，也就是能识别弹出框内容中的HTML符号。如果为false，将使用jQuery的text方法将内容插入到DOM中。如果您担心XSS攻击，请使用文本。
* `trigger` : string。默认是'click'。如何触发弹出框。
  * 值可以是 click | hover | focus | manual  。可以使用多个触发器，之间用空格隔开。
  * 可以通过使用 `focus` 触发器可以在用户点击弹出框是让其消失。

```html
<button class="btn btn-info" data-toggle="popover" title="标题" data-content="弹出框内容" data-placement="bottom" data-container="body" data-trigger="focus">弹出框</button>
```



![image-20210911100110615](https://www.huangyihui.cn/upload/gburlimg/04dd83f1abbd6.png)



方法

* `$().popover([options])` : 将弹出框处理程序附加到元素集合。
* `popover('show')` : 显示元素的弹出框。在弹出框实际显示之前返回给调用者(即在shown.bs.popover事件发生之前)。
* `popover('hide')` : 隐藏元素的弹出框。在弹出框实际隐藏之前返回给调用者(即在hidden.bs.popover事件发生之前)。
* `popover('toggle')` : 切换元素的弹出框。在弹出框实际显示或隐藏之前返回给调用者(即在shown.bs.popover或hidden.bs.popover事件发生之前)。
  * 当弹出框是被直接点击按钮而显示，且没有关闭时，toggle方式无效
* `popover('destroy')` : 隐藏并破坏一个元素的弹出框。使用委托(使用选择器选项创建)的弹出框不能在后代触发器元素上单独销毁。

```js
$('[data-toggle="popover"]').tooltip()
$('#mypopover').tooltip('show')
$('#mypopover').tooltip('hide')
$('#mypopover').tooltip('toggle')
$('#mypopover').tooltip('destroy')
```



事件:

* `show.bs.popover` : 当调用show实例方法时，此事件立即触发。
* `shown.bs.popover` : 当弹出框对用户可见时触发此事件(将等待CSS转换完成)。
* `hide.bs.popover` : 当hide实例方法被调用时，该事件立即被触发。
* `hidden.bs.popover` : 当弹出框完成对用户的隐藏(将等待CSS转换完成)时触发此事件。
* `inserted.bs.popover` : 当将弹出框模板添加到DOM中时，此事件在show.bs.popover事件之后触发。

```js
$('.mypopover').on('show.bs.popover', function(){
  console.log('准备显示了')
})
$('.mypopover').on('inserted.bs.popover', function(){
  console.log('添加到DOM中了')
})
$('.mypopover').on('shown.bs.popover', function(){
  console.log('显示完毕')
})
$('.mypopover').on('hide.bs.popover', function(){
  console.log('准备隐藏了')
})
$('.mypopover').on('hidden.bs.popover', function(){
  console.log('已经隐藏了')
})
```





### 警告信息

和组件中的警告框是一样东西。通过此插件可以为警告信息添加点击并消失的功能。

当使用 `.close` 按钮时，它必须是 `.alert-dismissible` 的第一个子元素，并且在它之前不能有任何文本内容。



为关闭按钮添加 `data-dismiss="alert"` 属性就可以使其自动为警告框赋予关闭功能。关闭警告框也就是将其从 DOM 中删除。

```html
<div class="alert alert-warning">
  <button class="close" data-dismiss="alert">&times;</button>
  警告信息
</div>
```

为了让警告框在关闭时表现出动画效果，请确保为其添加了 `.fade` 和 `.in` 类。



JS方式关闭警告框

```js
$('#myalert').alert('close')
```



事件

* `close.bs.alert` : 当 `close` 方法被调用后立即触发此事件。
* `closed.bs.alert` : 当警告框被关闭后（也即 CSS 过渡效果完毕之后）立即触发此事件。

```js
$('#myalert').on('close.bs.alert', function(){
  console.log('准备关闭')
})
$('#myalert').on('closed.bs.alert', function(){
  console.log('已经关闭')
})
```





### 按钮



#### 按钮状态

通过添加 `data-loading-text="Loading..."` 可以为按钮设置正在加载的状态。

从 v3.3.5 版本开始，此特性不再建议使用，并且已经在 v4 版本中删除了。

```html
<button class="btn btn-primary" id="mybtn" data-loading-text="加载中...">按钮</button>

<script>
  $('#mybtn').on('click', function(){
    var $btn = $(this).button('loading')

    setTimeout(() => {
      $btn.button('reset')
    }, 2000)
  })
</script>
```





#### 单选和复选框设置成按钮样式

将`data-toggle="buttons"`添加到包含复选框或单选输入的`.btn-group`中，以启用各自样式的切换。

对于默认选中项，需要添加 `.active` 。

如果复选框按钮的选中状态在没有触发按钮点击事件的情况下被更新(例如通过`<input type="reset">`或通过设置输入的`checked`属性)，你需要自己切换输入标签上的`.active`类。



```html
<div class="btn-group" data-toggle="buttons">
  <label class="btn btn-primary active">
    <input type="checkbox" checked>多选1(默认选中)
  </label>
  <label class="btn btn-primary">
    <input type="checkbox">多选2
  </label>
  <label class="btn btn-primary">
    <input type="checkbox">多选3
  </label>
</div>
```





#### 方法

* `button('toggle')` : 切换状态。赋予按钮已激活的外观。
* `button('reset')` : 重置按钮状态 - 将按钮上的文本还原回原始的内容。**此为异步方法，此方法在内容被重置完成之前即返回。**
* `button(string)` : 将按钮中的文本内容转换为 `data-string-text` 中的内容。例如
  * `button('loading')`   -->  `data-loading-text`
  * `button('自定义内容')` -->  `data-自定义内容-text`

```html
<button class="btn btn-primary mybtn" data-demo-text="演示效果">JS</button>

<script>
  $('.mybtn').on('click', function(){
    var $btn = $(this).button('demo')

    setTimeout(() => {
      $btn.button('reset')
    }, 2000);
  })
</script>
```





### 折叠效果



#### 简单折叠实例

点击下面的按钮，通过类的改变显示和隐藏另一个元素:

* `.collapse` : 隐藏的内容
* `.collapsing` : 在转换期间应用
* `.collapse .in` : 显示内容

可以使用带有`href`属性的链接，也可以使用带有`data-target`属性的按钮。它们都指向要折叠内容的CSS选择器。

在这两种情况下，`data-toggle="collapse"`都是必需的。

```html
<a class="btn btn-primary"  data-toggle="collapse" href="#collapseExample">
  链接搭配 href 属性
</a>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample">
  按钮搭配 data-target 属性
</button>
<div class="collapse" id="collapseExample">
  <div class="well">
    要折叠的内容
  </div>
</div>
```



#### 手风琴实例

扩展默认的折叠行为以使用面板组件创建手风琴。

![image-20210912122144180](https://www.huangyihui.cn/upload/gburlimg/18e1375810b08.png)

```html
<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading" id="headingOne">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
          折叠面板1
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in">
      <!-- 也可以用 .list-groups 替换 .panel-body。 -->
      <div class="panel-body">
        折叠面板1的内容
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
          折叠面板2
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse">
      <div class="panel-body">
        折叠面板2的内容
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
          折叠面板3
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse">
      <div class="panel-body">
        折叠面板3的内容
      </div>
    </div>
  </div>
</div>
```



#### 方法

* `collapse()` : 将内容作为可折叠元素激活(显示)。
* `collapse('toggle')` : 将可折叠元素切换为显示或隐藏。
* `collapse('show')` : 显示可折叠元素。
* `collapse('hide')` : 隐藏可折叠元素。



#### 事件

* `show.bs.collapse` : 当调用`show`实例方法时，此事件立即触发。
* `shown.bs.collapse` : 当一个折叠元素对用户可见时触发此事件(将等待CSS转换完成)。
* `hide.bs.collapse` : 当`hide`方法被调用时，这个事件立即被触发。
* `hidden.bs.collapse` : 当一个折叠元素对用户隐藏时触发此事件(将等待CSS转换完成)。





### 轮播图

![image-20210912124831767](https://www.huangyihui.cn/upload/gburlimg/7023f6d83e98d.png)

```html
<!-- 需要在最外层的 .carousel 中添加一个 id 。以便carousel控件能够正常工作 -->
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- 指示器：小圆点 -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- 轮播内容 -->
  <div class="carousel-inner">
    <div class="item active">
      <img src="holder.js/800x400" alt="...">
      <!-- 使用.item中的.carousel-caption元素可以轻松地为幻灯片添加标题。它将自动对齐和格式化 -->
      <div class="carousel-caption">
        <h3>介绍信息</h3>
        <p>详细内容</p>
      </div>
    </div>
    <div class="item">
      <img src="holder.js/800x400" alt="...">
      <div class="carousel-caption">
        介绍信息
      </div>
    </div>
    <div class="item">
      <img src="holder.js/800x400" alt="...">
      <div class="carousel-caption">
        介绍信息
      </div>
    </div>
  </div>

  <!-- 左右控制器 -->
  <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
  </a>
</div>
```



#### 参数

通过数据属性或JavaScript传递。对于数据属性，将参数名附加到`data-`，如`data-interval=""`。

* `interval` : 毫秒数(默认5000)。自动循环一个项目之间的延迟时间。如果为false，旋转木马将不会自动循环。
* `pause` : string|null。默认'hover'。
  * 如果设置为'hover'，则鼠标进入时暂停旋转木马的循环，鼠标离开时恢复旋转木马的循环。
  * 如果设置为null，悬停在旋转木马上不会暂停它。
* `warp` : 布尔值(默认true)。设置轮播是否应连续循环(默认)或只循环一次。
* `keyboard` : 布尔值(默认true)。轮播是否应该对键盘事件作出反应。

```html
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="2000">
...
</div>
```



#### 方法

* `carousel([options])` : 初始化轮播，并开始遍历项。
* `carousel('cycle')` : 从左到右循环轮播。
* `carousel('pause')` : 暂停轮播
* `carousel(number)` : 将轮播循环到特定的帧(基于0，类似于数组)。
* `carousel('prev')` : 上一项
* `carousel('next')` : 下一项

```js
$('#carousel-example-generic').carousel('prev')
```



#### 事件

所有的事件都触发在 `<div class="carousel">` 上。

* `slide.bs.carousel` : 准备轮播一项时触发
* `slid.bs.carousel` : 这项轮播结束后触发





### 侧栏导航



```css
ul.nav-tabs{
    width: 100px;
    margin-top: 20px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);
}
ul.nav-tabs li{
    margin: 0;
    border-top: 1px solid #ddd;
}
ul.nav-tabs li:first-child{
    border-top: none;
}
ul.nav-tabs li a{
    margin: 0;
    padding: 8px 16px;
    border-radius: 0;
}
ul.nav-tabs li.active a, ul.nav-tabs li.active a:hover{
    color: #fff;
    background: #0088cc;
    border: 1px solid #0088cc;
}
ul.nav-tabs li:first-child a{
    border-radius: 4px 4px 0 0;
}
ul.nav-tabs li:last-child a{
    border-radius: 0 0 4px 4px;
}
ul.nav-tabs.affix{
    top: 30px; /* Set the top position of pinned element */
}
```

```html
<body data-spy="scroll" data-target="#myScrollspy">
  <div class="container">
    <div class="row">
      <div class="col-md-2" id="myScrollspy">
        <ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">
          <li class="active"><a href="#p1">p1</a></li>
          <li><a href="#p2">p2</a></li>
          <li><a href="#p3">p3</a></li>
        </ul>
      </div>

      <div class="col-md-10">
        <div id="p1">
          <h2>p1</h2>
          <img src="holder.js/600x1400" alt="">
        </div>
        <div id="p2">
          <h2>p2</h2>
          <img src="holder.js/600x1400" alt="">
        </div>
        <div id="p3">
          <h2>p3</h2>
          <img src="holder.js/600x1400" alt="">
        </div>
      </div>
    </div>
  </div>
</body>
```















































































