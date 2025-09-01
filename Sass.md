# Sass

## css 预处理器

**为什么会出现 css 预处理器**

css 不是一种编程语言，仅仅只能用来编写网站样式，在 web 初期时，网站的搭建还比较基础，所需要的样式往往也很简单。但是随着用户需求的增加以及网站技术的升级，css 一成不变的的写法也渐渐不再满足于需求。没有类似 js 这样的编程语言所有的变量、常量以及其他的编程语法，css 的代码难免会显得臃肿以及难以维护。但是又没有 css 的替代品，于是 css 预处理器就作为 css 的扩展，出现在了前端技术中。



**css  预处理器（Sass/Scss、Less、Stylus）是什么**

css 预处理器的概念：

​	css 预处理器用一种专门的编程语言，进行 web 页面样式设计，然后再编译成正常的 css 文件，以供项目使用。css 预处理器为 css 增加一些编程的特性，无需考虑浏览器的兼容性问题。

​	比较优秀的css 预处理器有：Sass/Scss、Less、Stylus





## Sass 与 Scss 的关系

Sass 英文单词(Syntactically Awesome Stylesheets) 的简写，可翻译为 "语法上很棒的样式表"。



官网：https://sass-lang.com/

中文网：https://www.sass.hk/



Sass 是一种动态样式语言，由 Ruby 开发者设计和开发，Sass 语法属于编排语法。

比 css 多出好些功能（如变量、嵌套、运算、混入(Mixin)、继承、指令、颜色处理、函数等），更容易阅读。

Sass 的工作方式是，在 Sass 源文件中写代码，然后由 Sass 程序（Sass 编译器/转译器）将其转换为最终浏览器能认识的 css 文件。



**Sass 与 Scss 的关系**

Sass 的编排语法，对于写惯 css 的前端开发者来说很不直观，也不能将 css 代码加入到 Sass 里面，因此 Sass 语法进行了改良，**Sass3 就变成了 Scss(sassy css)**。与原来的语法兼容，只是用 `{}` 取代了原来的缩进。



Sass 输出样式的风格可以有四种选择：

* nested ：**默认**。嵌套缩进的 css 代码
* expanded ：展开的多行 css 代码
* compact ：简洁格式的 css 代码
* compressed ：**打包**。压缩后的 css 代码





## Live Sass Compiler 插件

Live Sass Compiler 是 VSCode 中的扩展，可以实时地将 Sass/Scss 文件编译/转换为 css 文件。

这里使用的是 **v5.4.0** 版本。



安装扩展之后，需要在对拓展进行配置。

更多配置项：https://github.com/glenn2223/vscode-live-sass-compiler/blob/HEAD/docs/settings.md

```json
// settings.json
{
    "liveSassCompile.settings.formats": [
        {
            "format": "expanded",       // 输出的格式。expanded 展开格式，compressed 压缩格式
            "extensionName": ".css",
            "savePath": "~/../css",     // 输出文件位置。null 表示当前目录，~ 表示当前sass文件目录
        }
    ],
    // 排除目录
    "liveSassCompile.settings.excludeList": [
        "/**/node_modules/**",
        "/.vscode/**"
    ],
    // 是否生成对应的 map
    "liveSassCompile.settings.generateMap": true,
    // 是否添加兼容前缀，例如：-webkit- -moz- 等等
    "liveSassCompile.settings.autoprefix": [
        "> 1%",
        "last 2 versions"
    ],
    "explorer.confirmDelete": false
}
```



创建好 scss 文件后，在 VSCode 编辑器中启动 live sass compiler ,会自动生成对应的 css 文件。

使用快捷键 `ctrl + shift + p`，输入 `Live Sass: Watch Sass` ，点击运行即可。



![image-20220702164648767](https://www.huangyihui.cn/upload/gburlimg/9ac50c7c5504b.png)





## 语法扩展

### 选择器嵌套、父选择器 &

使用选择器嵌套的方式，避免了重复输入父选择器，使复杂的 css 结构更易于管理。但是需注意不要嵌套太深。

在嵌套 css 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 hover 样式时，或者当 body 元素有某个 classname 时，可以使用 `&` 代表嵌套规则外层的父选择器。

![2022-07-03_131153](https://www.huangyihui.cn/upload/gburlimg/090fe8b574ec9.png)



### 属性嵌套

有些 css 属性遵循相同的命名空间，比如 font-family、font-size、font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免重复输入，Sass 允许将属性嵌套在命名空间中。

注意的是，属性嵌套的后面需要加一个空格。

![image-20220703132221028](https://www.huangyihui.cn/upload/gburlimg/41ae2fa4c9051.png)



### 占位符选择器 %foo 和 @extend

有时，需要定义一套样式并不是给某个元素用，而是只通过 `@extend` 指令使用，尤其是在制作 Sass 样式库的时候，希望 Sass 能够忽略用不到的样式。

**占位符选择器 `%foo` 必须通过 `@extend` 使用。**

![image-20220703134006472](https://www.huangyihui.cn/upload/gburlimg/5d88c62a524af.png)



占位符选择器在没有使用时，会被自动忽略。

![image-20220703134146967](https://www.huangyihui.cn/upload/gburlimg/1255fa1ce63b2.png)



### 注释

Sass 支持两种注释方式：

* `//` ：单行注释。不会编译到生成的 css 文件中。
* `/* */` ：多行注释。会编译到生成的 css 文件中。





## 变量

### 定义规则

* 变量以美元符号 `$` 开头，后面跟变量名
* 变量名可包含字母、数字、短横线（连接符）、下划线，但不能以数字开头
  * 通过短横线与下划线定义的同名变量为同一变量，建议使用短横线
* 写法同 css，即变量名和值之间用冒号 `:` 分隔
* 变量一定要先定义，后使用



![image-20220704010644732](https://www.huangyihui.cn/upload/gburlimg/e355ab591161.png)



### 作用域与 !global

* 局部变量：在选择器内定义的变量，只能在选择器范围内使用
* 全局变量：在全局范围内都可以使用
* `!global` ：通过在局部变量中添加 `!global` 可以将其提升为全局变量



![image-20220704011329663](https://www.huangyihui.cn/upload/gburlimg/953b0ec8764e6.png)



### 变量值类型

Sass 支持 6 种主要的数据类型：

* 数字：1，2，13，10px
* 字符串：有引号字符串与无引号字符串，"foo"，"bar"，baz
* 颜色：blue，#fff，rgba(255, 0, 0, 0.5)
* 布尔型：true，false
* 空值：null，值 null 是其类型的唯一值。它表示缺少值，通常由函数返回以指定缺少结果
* 数组(list)：用空格或逗号作分隔符，10px 20px，Arial, san-serif
* 对象(maps)：相当于 JavaScript 的 object，(key1: value1, key2: value2)



![image-20220704013548846](https://www.huangyihui.cn/upload/gburlimg/6ff188333e2d6.png)



### 默认值 !default

![image-20220704014010702](https://www.huangyihui.cn/upload/gburlimg/c0a99a74c6c3e.png)



## 导入 @import

Sass 扩展了 `@import` 的功能，允许其导入 scss 或 sass 文件。被导入的文件将合并编译到同一个 css 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

```scss
@import 'public.scss';  // 导入 scss 文件
@import 'public';       // 导入 scss 文件，可省略文件后缀
```



同时还支持嵌套使用，在选择器中导入的内容只能在该选择器内使用。

```scss
.container {
  @import 'public'; 
  color: $base-color;
}

// 报错：Error: Undefined variable.
p {
  color: $base-color;
}
```



如下几种方式，都将作为普通的 css 语句，不会导入任何 Sass 文件：

* 文件扩展名是 `.css`
* 文件名以 `http://` 开头
* 文件名是 `url()`
* `@import` 包含 `media queries`

```scss
@import 'public.css';
@import url(public);
@import "http://xxx.com/xxx";
@import 'landscape' screen and (orientation: landscape);
```



**文件名是下划线_开头**

当一个公共的 scss 文件需要被导入时，会发现这个文件也会被编译成 css 文件。如果不需要这样，可以将这个 scss 文件名以下划线 `_` 开头，这个文件就不会再被编译成 css 文件了。

```scss
// _public.scss

@import '_public';		// 导入
@import 'public';			// 导入，可省略 _ ,但必须确保目录中没有相同名字的 scss 文件
```



## 导入模块 @use

当多个 scss 文件在同个 scss 文件中使用 `@import` 导入时，所有变量、mixin 等都可以全局访问，因为一切都是全局的。为了避免命名冲突，使用 `@use` 来代替。

```scss
@use 'normalize';

content {
  max-width:660px;
}
```

使用 `@use` 导入的文件称为模块。要使用这些模块的 mixin 或变量，必须使用命名空间来调用它们。默认情况下，命名空间是文件名（不带扩展名）。

```scss
@use 'src/colors';
@use 'src/colors' as c;	// 使用 as 来使用自定义命名空间
body {
  color: colors.$accent-color;
  color: c.$accent-color;
}
.dark-region {
  @include colors.dark-background;
}
```





## 混入 Mixin

混合指令 (Mixin) 用于定义可重复使用的样式。混合指令可以包含所有的 css 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

**很多地方都会用到，却能根据不同场景灵活使用的样式。**



### 定义和使用

* 通过 @mixin 定义混合
* 通过 @include 引入



![image-20220705002237757](https://www.huangyihui.cn/upload/gburlimg/3b4b77282665e.png)



![image-20220705002813866](https://www.huangyihui.cn/upload/gburlimg/36f4059a2d2a7.png)



### 通过参数引入变量

* 单个参数
* 多个参数
* 默认值，使用参数时建议加上默认值
* 按顺序指定参数值
* 给指定参数指定值
* 可变参数：在参数不固定的情况下使用

注意：Mixin 中有设置参数时，在使用时必须赋值，否则报错。有默认值除外。



![image-20220705004525729](https://www.huangyihui.cn/upload/gburlimg/80d4cb1ad77ef.png)

![image-20220705005124115](https://www.huangyihui.cn/upload/gburlimg/eebecab13cbe.png)

![image-20220705005706107](https://www.huangyihui.cn/upload/gburlimg/018366dfd2a0f.png)



### 总结

* mixin 是可以重复使用的一组 css 声明
* mixin 有助于减少重复代码，只需声明一次，就可在文件中引用
* 混合指令可以包含所有的 css 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式
* 使用参数时建议加上默认值





## 继承 @extend

在设计网页的时候，通常遇到这样的情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。通常会在 HTML 中定义两个 class，一个通用样式，一个特殊样式。例如：elementui 中的 button 组件。



### 使用

* 支持多继承
* 支持多层继承



![image-20220708001640755](https://www.huangyihui.cn/upload/gburlimg/cb0cc448623f7.png)



![image-20220708003452244](https://www.huangyihui.cn/upload/gburlimg/91332f2c6701b.png)



### 占位符 %

从上面的继承示例可以发现，被继承的 css 父类并没有被实际应用，也就是说 html 代码中没有使用该类，它的唯一目的就是拓展其他选择器。对于该类，可能不希望被编译输出到最终的 css 文件中，它只会增加 css 文件的大小，永远不会被使用。

这就是占位符选择器的作用。

占位符选择器类似于类选择器，但是，它们不是以点开头，而是以百分比开头。

当在 Sass 文件中使用占位符选择器时，它可以用于扩展其他选择器，**但不会被编译成最终的 css**。



![image-20220708002533187](https://www.huangyihui.cn/upload/gburlimg/cc0c680d075fd.png)

对比上面的继承示例，可以看到使用占位符选择器后，该选择器不会以类的形式编译到 css 代码中。





## 运算符

### 等号运算符

* `==` 等于
* `!=` 不等于

所有数据类型都支持等号运算符。

![image-20220708004350360](https://www.huangyihui.cn/upload/gburlimg/ab5ec5ecc358e.png)



### 比较运算符

* `<` 小于
* `>` 大于 
* `<=` 小于等于 
* `>=` 大于等于

![image-20220708004752604](https://www.huangyihui.cn/upload/gburlimg/4de3f4ef1c066.png)



### 逻辑运算符

* `and` 逻辑与
* `or` 逻辑或
* `not` 逻辑非

![image-20220708005211236](https://www.huangyihui.cn/upload/gburlimg/ed78c0178b04b.png)



### 算术运算符

* `+` 加
* `-` 减
* `*` 乘：乘法运算只能有一边是单位或百分比
* `/` 除：以下情况才会被视为除法运算符号
  * 如果值或值的一部分，是变量或者函数的返回值
  * 如果值被圆括号包裹
  * 如果值是算术表达式的一部分
* `%` 取余

数字类型包括：纯数字、百分号、css部分单位（px、pt...）

`%` 与单位不能一起运算。

纯数字与百分号或单位运算时，会自动转化成相应的百分比与单位值。



![image-20220708011811645](https://www.huangyihui.cn/upload/gburlimg/9cbc1e784ef5e.png)



### 字符串运算

* `+` 号可用于连接字符串

注意：如果有引号字符串（位于 + 左侧）连接无引号字符串，运算结果是有引号的。相反，无引号字符串（位于 + 左侧）连接有引号字符串，运算结果则没有引号。

然而，如果一个值是函数返回的，情况可能不一样。



![image-20220708012914582](https://www.huangyihui.cn/upload/gburlimg/c7e4b76c40a38.png)



## 插值语句

如果需要使用变量，同时又要确保 `/` 字符不做除法运算，而是完整的编译到 css 文件中，只需使用 `#{}` 插值语句将变量包裹。

插值语句能有用于：选择器、属性名、属性值、注释...



![image-20220710142241770](https://www.huangyihui.cn/upload/gburlimg/c7979b399e3f6.png)





## 常见函数

查看更多：https://sass-lang.com/documentation/modules



### Color 颜色函数

* `lighten($color, $amount)` : 让颜色变亮。$amount 的取值在 0% ~ 100% 之间。
* `darken($color, $amount)` : 让颜色变暗。$amount 的取值在 0% ~ 100% 之间。
* `opacify($rgba, $value)` : 让颜色透明度减少。rgba 中透明度 + value 不能超过 1
* `transparent($rgba, $value)` : 让颜色透明度增加。
* `mixin()` : 用来混合两种颜色。



```scss
background-color: lighten(#5c7a29, 30%);
background-color: darken(#5c7a29, 15%);
// 通常使用 color.scale() 代替该方案
background-color: opacify(rgba(#5c7a29, 0.1), 0.5);
```



### String 字符串函数

* `quote(str)` : 给字符串添加引号
* `unquote(str)` : 去除字符串的引号
* `str-length(str)` : 获取字符串的长度
* `str-insert(str, substr, index)` : 将内容插入到字符串中给定位置。从1开始。
* `str-index(str, key)` : 计算子字符串在字符串中第一次出现的位置。从1开始，没有则返回 null
* `str-slice(str, start, end)` : 截取字符串。从1开始。未指定 end 则默认截取到字符串末尾。
* `to-lower-case(str)` : 将字符串转为小写。
* `to-upper-case(str)` : 将字符串转为大写。



![image-20220710175706468](https://www.huangyihui.cn/upload/gburlimg/13efc62739d4f.png)



### Math 数值函数

* `abs(num)` : 绝对值
* `ceil(num)` : 向上取整，天花板数
* `floor(num)` : 向下取整，地板数
* `min(list)` : 取最小值
* `max(list)` : 取最大值
* `random([num])` : 随机数。默认是0~1之间的小数。可选参数 num 可以设置随机数范围。
* `percentage(num)` : 将无单位的数值转换为百分比
* `round(num)` : 将数字四舍五入为最接近的整数

![image-20220711230702477](https://www.huangyihui.cn/upload/gburlimg/4d618aac11e5.png)



### List 函数

* `length(list)` : 返回列表长度

* `nth(list, index)` : 返回列表中的指定索引的值

* `set-nth(list, n, value)` : 将列表中第 n 项的值为 value

* `index(list, value)` : 返回列表中指定值的索引

* `join(list1, list2)` : 将两个列表连接在一起

* `append(list, value)` : 在列表末尾添加一个值

* `list-separator(list)` : 返回列表的分隔符类型。空格为 space，逗号为 comma

* `zip(lists)` : 将多个列表按照以相同索引值为一组，重新组成一个新的多维度列表

  

![image-20220711231507589](https://www.huangyihui.cn/upload/gburlimg/bf6d21f51474.png)



### Map 函数

* `map-get(map, key)` : 根据键获取 map 中的对应值
* `map-has-key(map, key)` : 判断 map 中是否有指定键
* `map-keys(map)` : 映射 map 中的所有键
* `map-values(map)` : 映射 map 中的所有值
* `map-merge(map1, map2)` : 将两个 map 合并成一个新的 map
* `map-remove(map, keys)` : 移除 map 中的 keys，多个 key 使用逗号隔开



![image-20220711233201459](https://www.huangyihui.cn/upload/gburlimg/81c8a2e788e12.png)



### Selector 函数

* `selector-append(selector1, selector2, ...)` : 可以把一个选择符附加到另一个选择符
* `selector-unify(selector1, selector2)` : 将两组选择器合成一个复合选择器

![image-20220711234034451](https://www.huangyihui.cn/upload/gburlimg/6f55daa3e08d8.png)



### 自检函数

* `variable-exists(name)` : 检查当前作用域中是否存在某个变量
* `mixin-exists(name)` : 检查某个 mixin 是否存在
* `feature-exists(name)` : 检查当前 Sass 版本是否存在某个特性

![image-20220711234640472](https://www.huangyihui.cn/upload/gburlimg/c113865f1d129.png)





## 流程控制指令

### @if 指令

```scss
$theme: 'green';

.container {
  @if 5 > 2 {
    content: 'yes';
  }

  @if 5 > 7 {
    content: 'yes';
  } @else {
    content: 'no';
  }

  @if $theme == 'red' {
    color: red;
  }
  @else if $theme == 'green' {
    color: green;
  }
  @else {
    color: blue;
  }

}
```



### @for 指令

 有以下两种格式：

* `@for $var from <start> through <end>`
* `@for $var from <start> to <end>`

区别在于 `through` 和 `to` 的含义：

* `through` 包含 `<end>`
* `to` 不包含 `<end>`
* 另外，`$var` 可以是任何变量，比如 `$i` 。`<start>` 和 `<end>` 必须是整数。



```scss
@for $i from 1 to 4 {
  // 输出 p1 ~ p3
  .p#{$i} {
    width: 10px * $i;
    height: 30px;
    background-color: red;
  }
}

@for $i from 1 through 4 {
  // 输出 p1 ~ p4
  .p#{$i} {
    width: 10px * $i;
    height: 30px;
    background-color: red;
  }
}
```



### @each 指令

* `$var in <list>` : `$var` 可以是任何变量，`<list>` 是值列表
  * `#{$变量名}` 表示法用于使用变量制作动态属性名称和选择器，这称为插值。

```scss
$color-list: red blue green turquoise;

@each $color in $color-list {
  $index: index($color-list, $color);
  .p#{$index} {
    background-color: $color;
  }
}
```



### @while 指令

```scss
$column: 5;

@while $column > 0 {
  p#{$column} {
    width: $column;
  }
  $column: $column - 1;
}
```







## 小案例

### 画三角

```scss
@mixin triangle($direction: top, $size: 30px, $border-color: black) {
  width: 0px;
  height: 0px;
  display: inline-block;
  border-width: $size;
  border-#{$direction}-width: 0;
  @if ($direction == top) {
    border-color: transparent transparent $border-color transparent;
    border-style: dashed dashed solid dashed;
  }
  @else if ($direction == right) {
    border-color: transparent transparent transparent $border-color;
    border-style: dashed dashed dashed solid;
  }
  @else if ($direction == bottom) {
    border-color: $border-color transparent transparent transparent;
    border-style: solid dashed dashed dashed;
  }
  @else if ($direction == left) {
    border-color: transparent $border-color transparent transparent;
    border-style: dashed solid dashed dashed;
  }
}

.p0 {
  @include triangle();
}
.p1 {
  @include triangle(right, 20px, red);
}
.p2 {
  @include triangle(bottom, 40px, green);
}
.p3 {
  @include triangle(left, 30px, blue);
}
```



![image-20220712002054129](https://www.huangyihui.cn/upload/gburlimg/0d0b4f469a895.png)



### 动态波浪小球

```scss
@keyframes loading {
  0% {
    opacity: 0.3;
    transform: translateY(0px);
  }
  50% {
    opacity: 1;
    transform: translateY(-20px);
    background: green;
  }
  100% {
    opacity: 0.3;
    transform: translateY(0px);
  }
}

#loading {
  position: fixed;
  top: 200px;
  left: 46%;
}

#loading span {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #3498db;
  opacity: 0.5;
  border-radius: 50%;
  animation: loading 1s infinite ease-in-out;
}

@for $i from 1 to 6 {
  #loading span:nth-child(#{$i}) {
    left: 20 * ($i - 1) + px;
    // animation-delay: 20 * ($i - 1) / 100 + s;
    animation-delay: unquote('0.' + ($i - 1) * 2 + s);
  }
}
```



![image-20220712004025330](https://www.huangyihui.cn/upload/gburlimg/92e0cebdf0c35.png)









































