# 基础

## 认识JavaScript

JavaScript 的组成部分: 

* ECMAScript : JavaScript的语法规范(标准)
* 文档对象模型 DOM：提供与网页内容交互的方法和接口
* 浏览器对象模型 BOM：提供与浏览器交互的方法和接口



使用JavaScript的方式: 

1. 在HTML的`<script>`标签中书写JS代码
2. 通过`<script>`标签引入外部JS文件

```html
<script>
  console.log('Hello World')
</script>

<script src="main.js"></script>
```



## 注释

* 单行注释 : `//`
* 多行注释 : `/* */`

```js
// console.log('Hello World')

/*
function fn(){
  console.log('fn')
}
*/
```



## 数据类型

简单数据类型：

* string : 字符串类型，值用单引号、双引号或者反引号包围
  * 字符串的不可变性: 字符串一旦创建，它们的值就不能改变。
* number : 数值类型，包括(整数、小数、正数、负数、NaN)
  * 二进制字面量：前缀为0b
  * 八进制字面量：前缀为0o，然后是相应的八进制数字（数值0~7）。如果字面量中包含的数字超出了应有的范围，就会忽略前缀的零，后面的数字序列会被当成十进制数
  * 十六进制字面量：前缀为0x，然后是十六进制数字（0~9以及A~F）
  * 科学记数法：3.12e7，等于31200000（10的7次幂）。默认情况下，会将小数点后至少包含6个零的浮点值转换为科学记数法
* boolean : 布尔类型，值为true / false。
* undefined : 未定义类型，表示变量声明了但没有赋值，或者对象中未声明的属性的值
* null : 空。null 被认为是一个空对象的引用
* Symbol : 独一无二的值
* BigInt ：表示任意大的整数



```js
// ES2021，允许 JavaScript 的数值使用下划线（_）作为分隔符。
let budget = 1_000_000_000_000;
0.000_001
1e10_000

// 除了十进制，其他进制的数值也可以使用分隔符。
// 二进制
0b1010_0001_1000_0101

// 下面三个将字符串转成数值的函数，不支持数值分隔符。
Number('123_456') // NaN
parseInt('123_456') // 123
parseFloat('123_456') // 123
```







复杂数据类型：

* object:对象类型



### typeof

`typeof()` 方法用于获取数据的类型，并以字符串形式返回对应的数据类型。会返回以下字符串：

* undefined: 表示值未定义
* boolean: 表示值为布尔值
* string: 表示值为字符串
* number: 表示值为数值
* object: 表示值为对象(而不是函数)、数组或 null
* function: 表示值为函数
* symbol: 表示值为符号
* bigint ：表示值为 BigInt 类型



```js
console.log(typeof('abc'))  // string
console.log(typeof 123)     // number
console.log(typeof NaN)     // number
console.log(typeof ('abc' - 12))	// number, 因为小括号内的运算结果是NaN，而NaN是number类型
console.log(typeof undefined)	// undefined
console.log(typeof 10n)	// bigint

console.log(typeof null)		// object
console.log(typeof {})			// object
console.log(typeof [])      // object
console.log(typeof String)  // function，能new的说明是构造函数，也就是function
console.log(typeof Date)  	// function，能new的说明是构造函数，也就是function
console.log(typeof new String)	// object
console.log(typeof Math)    // object
```





### NaN 是什么

NaN(not a number) : 运算出错时出现的数据格式，用来表示数值的不正常状态。

只要无法进行运算的都返回NaN，其中有未定义变量除外。

**请注意: NaN 自己不等于自己。**

```js
console.log('abc' - 66)   // NaN
console.log(NaN === NaN)  // false
console.log(0/0)					// 0除任何数都会返回 NaN
```



### isNaN()

`isNaN()` 方法用于判断当前的数据是否是NaN，结果是非数字则true，结果是数字则false。

该函数接收一个参数，可以是任意数据类型，然后判断这个参数是否"不是数值"。把一个值传给 isNaN() 后，该函数会尝试把它转换为数值。某些非数值的值可以直接转换成数值，如字符串”10“或布尔值。任何不能转换为数值的值都会导致这个函数返回true。

```js
console.log(isNaN('abc' - 21))	// true
console.log(isNaN(13 + 12))     // false
console.log(isNaN(NaN))       	// true
console.log(isNaN('abc'))				// true
console.log(isNaN(10))					// false
console.log(isNaN('10'))				// false
console.log(isNaN(true))				// false
```



### undefined 是什么

undefined表示变量声明了但没有赋值，或者对象中未声明的属性的值。

请注意: 使用未声明的变量会报错：`is not defined`

```js
var a
console.log(a)  // undefined, 因为a声明了但没有赋值

var obj = { name: '张三'}
console.log(obj.name) // '张三'
console.log(obj.age)  // undefined, 因为obj对象中没有定义age属性

// 下面这条代码会报错: Uncaught ReferenceError: b is not defined
console.log(b)  // 报错，因为b并没有声明

console.log(null == undefined) // true
```

undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 `void 0`。



### Number取值范围

```js
console.log(Number.MIN_VALUE) 	// 最小值5e-324
console.log(Number.MAX_VALUE) 	// 最大值1.7976931348623157e+308
console.log(5 / 0)              // 无穷大Infinity
console.log(-5 / 0) 	          // 无穷小-Infinity
console.log(isFinite(22))				// 判断一个值是否在最大值和最小值之间，返回布尔值
```



### 0.1+0.2 != 0.3

注意: 永远不要测试某个特定的浮点数值(如判断两个浮点数相加是否相等)，如果一定要测试，则要把他们乘以一下100，变成一个整数再判断相等。

```js
var n1 = 0.1
var n2 = 0.2
console.log(n1 + n2 == 0.3) // false
console.log(n1 + n2)        // 0.30000000000000004

console.log(n1 * 100 + n2 * 100 == 0.3 * 100) // true
```

之所以存在这种舍入错误，是因为使用了 IEEE754 数值，这种错误并非 ECMAScript 所独有，其他使用相同格式的语言也有这个问题。



## 类型转换

### 自动类型转换

1. 在纯数字的字符串前面加上`+`号，可以转换为number类型。注意，是在引号外面加。
2. 在对纯数字的字符串进行算数运算时(`+号除外`)，也会自动将字符串转换为数字进行运算。
3. 运算时的`+`号不会自动转换为数字，因为它起到连接的作用，也就是如果一个是字符串，则将另一个转换为字符串
4. 隐式转换为boolean：!变量名或!!变量名，一般用2个!!。用一个是取反。

```js
var str = '10'
console.log(typeof +'123')  // number
console.log(10 + +str)      // 20
console.log(10 + str)       // '1010'
console.log('256' * 2)      // 512
console.log('112.5' - 12)   // 100.56
console.log('123' + 12)     // '12312', 因为前面是字符串，所以这里的+号是拼接的意思
console.log(+'123' + 12)    // 135, 因为在字符串前加上了+号，将字符串转换为数字了，所以可以进行加法运算
console.log('123a' - 12)    // NaN

// false，"" 空字符串，0，NaN，undefined，null会转成false。
console.log(!0)   	// true, 因为0是false
console.log(!!1)  	// true
console.log(!!null) // false

console.log(false + undefined)    // NaN
// 如果其中任何一个是对象，则先将其转换为原始类型
{} + {}          // '[object Object][object Object]'
[] + []          // ''
[] + new Date()  // 'Mon Aug 15 2022 00:18:18 GMT+0800 (中国标准时间)'
```



### 强制转换为数字

下列方法会自动忽略字符串前面的空格，直至找到第一个非空字符。

* Number(value)
  * 如果是数字，返回本身。如果包含有效的浮点格式，转换为浮点数值
  * 如果包含非数字，则返回NaN。如果为空字符串或空格，则返回0。如果是有效的八进制或十六进制格式，则会转换为与该进制对应的十进制整数值。
  * 布尔值转数字，true转为1，false转为0
  * null，返回0
  * undefined，返回NaN
  * 对象：调用 valueOf() 方法，并按照上诉规则转换返回的值。如果转换结果是  NaN，则调用 toString() 方法，再按照转换字符串的规则转换
* parseInt(value，[ 进制数 ])
  * 如果是数字，返回本身。如果包含浮点类型，则会去掉小数。
  * 如果为空字符串或第一个字符非数字，则返回NaN。
  * 如果开头字符串为数字后面为字母，则从数字开头解析到字母停。
  * 能识别不同的整数格式（十进制、八进制、十六进制）
  * 接收的第二个参数，用于指定进制数。
* parseFloat(value)
  * 如果是数字，返回本身。如果包含浮点类型，则保留小数。
  * 如果为空字符串或第一个字符非数字，则返回NaN。
  * 如果开头字符串为数字后面为字母，则从数字开头解析到字母停。
  * 它始终忽略字符串开头的零，所以八进制或十六进制数值始终会返回 0。

```js
console.log(Number('  123'))    // 123
console.log(Number('-123.12'))  // -123.12
console.log(Number('a123.12'))  // NaN
console.log(Number(''))         // 0
console.log(Number(true))       // 1

console.log(parseInt(' 56'))      // 56
console.log(parseInt('-56.123'))  // -56
console.log(parseInt(''))         // NaN
console.log(parseInt('a123'))     // NaN
console.log(parseInt('123a3'))    // 123
console.log(parseInt('123.2a2'))  // 123
console.log(parseInt('0xf'))  		// 15

console.log(parseFloat(' 56'))      // 56
console.log(parseFloat('-56.123'))  // -56.123
console.log(parseFloat(''))         // NaN
console.log(parseFloat('a123'))     // NaN
console.log(parseFloat('123a3'))    // 123
console.log(parseFloat('123.2a2'))  // 123.2
console.log(parseFloat('0xf'))  		// 0
```



* parseInt(string, radix) ：解析一个字符串并返回指定基数的十进制整数
  * string ：要被解析的值。如果参数不是一个字符串，则将其转换为字符串。字符串开头的空白符将会被忽略。
  * radix ：从 `2` 到 `36` 的整数，表示进制的基数。例如指定 `16` 表示被解析值是十六进制数。如果超出这个范围，将返回 `NaN`。假如指定 `0` 或未指定，基数将会根据字符串的值进行推算。

```js
console.log(parseInt('A'))      // NaN
console.log(parseInt('A', 16))  // 以十六进制对A进行转换。结果为10, 'A'的十六进制数
console.log(parseInt('11', 2))  // 3, '11'的二进制数
```



### 转换为字符串

* String(value)
* 变量名.toString()
  * 在对数值调用这个方法时，可以接收一个进制参数，即以什么进制来输出数值的字符串表示。默认为十进制。
* 用加号操作符给一个值加上一个空字符串也可以将其转换为字符串

String()存在的意义：undefined和null没有toString()，可以用String()转成字符串。

```js
var num = 10
console.log(String(num))        // '10'
console.log(String(123.13))     // '123.13'
console.log(String(null))       // 'null'
console.log(String(undefined))  // 'undefined'
console.log(10+"")							// '10'
```



数值类型的`toString()`可以携带一个参数，即以什么进制来输出数值的字符串表示。默认是10进制。

```js
var num = 10
console.log(num.toString(10))   // '10'
console.log(num.toString(8))    // '12'  10的八进制表示字符串
console.log(num.toString(16))	  // 'a'
console.log(num.toString(2))    // '1010'
```





### 转换为布尔类型

* Boolean(value)
  * false，null，空字符串，0，NaN，undefined会转成false。

```js
console.log(Boolean(' '))     // true, 因为有一个空格
console.log(Boolean(''))      // false, 因为是空字符串
console.log(Boolean(0))       // false
console.log(Boolean(-132))    // true
console.log(Boolean(null))    // false
console.log(Boolean(undefined)) // false
console.log(Boolean('false'))   // true
```



[类型转换参考链接](https://mp.weixin.qq.com/s/anFhJa5FCzSBeCCtQEFVUA)



### 加法运算规则

![未命名绘图 (5)](http://qiniu.huangyihui.cn/doc/202511262248327.png)



```js
console.log([1, 2] + { n: 1 })  // 1,2[object Object]

console.log([1, 2].valueOf())   // [1, 2]
console.log([1, 2].toString())  // 1,2

console.log(({ n: 1 }).valueOf())   // {n: 1}
console.log(({ n: 1 }).toString())  // [object Object]
```



### == 隐式转换规则

![未命名绘图 (6)](http://qiniu.huangyihui.cn/doc/202511262248017.png)





* [JS数据类型转换规则](https://blog.csdn.net/Y0admin/article/details/121582777) 



## 运算符

* 算数运算符: `+ - * / % += -= *= /= %=`
* 自增自减运算符: `++ --`
* 逻辑运算符: `&&  ||   !`
  * 优先级: ! > && > ||
* 比较运算符: `> < <= >= == ===(判断是否全等) != !==(判断是否全不等)`
* 逻辑赋值操作符 ：`||=  &&=  ??=`
* 位运算符：`~ | & ^ << >>>`

```js
console.log(5 / 0)          // Infinity
console.log(-5 / 0)         // -Infinity
console.log(Infinity % 5)   // NaN

// 等同于 a = a || b
a ||= b;
// 等同于 c = c && d
c &&= d;
// 等同于 e = e ?? f
e ??= f;
```



### 运算符的优先级

从高到低

1. ()括号
2. 一元运算符 ++ -- !
3. 算数运算符 先* / % 后+ -
4. 关系运算符 > >= < <=
5. 相等运算符 ==  !=  ===   !===
6. 逻辑运算符 先&& 后||

文档：https://www.cnblogs.com/ygyy/p/12688701.html



### 短路操作

`||` : 如果第一个为真，就返回第一个表达式，如果为假，就返回第二个表达式
`&&` : 如果第一个为假，就返回第一个表达式，如果为真，就返回第二个表达式

```js
// && 短路操作例子
// 如果两个操作数都不是布尔类型，会先自动将它们转为布尔类型。
// 如果两个值转换成布尔类型都是true，返回第二个操作数
// 如果有一个操作数转换成布尔类型是false，返回这个数

var str = 'abc' && 'zxc'
console.log(str)    // 'zxc'
```



进阶: `表达式1 && 表达式2 && 表达式1`

* 先验证是否满足表达式1，如果满足，就执行表达式2的验证
* 验证如果失败返回假
* 验证如果成功，返回表达式1



开发中经常用短路操作来对数据进行初步验证。

```js
function check(sex){
  var res = sex || '男'
  return res
}
var res = check('')
console.log(res)
```



### === 和 !===

`==` 判断的仅仅只是数据的内容，没有判断数据的类型。

`===` 则既判断数据内容，也判断数据的类型。`!===` 同理。

```js
var a = 3
var b = '3'
console.log(a == b)   // true, '3'会自动转换为数字3
console.log(a === b)  // false

var x = true
var y = 1
console.log(x == y)   // true, 因为true的本质是1
console.log(x === y)  // false

console.log(null == undefined)  // true
console.log(NaN == NaN)   // false

console.log(null === undefined)  // false
console.log(NaN === NaN)  // false, NaN不等于自己

// 如果一个是对象，另一个是数字或字符串，将对象转换为原始类型，再次比较
[1] == 1             // true
['1'] == '1'         // true
```



### 关系操作符

* 如果操作数都是数值，则执行数值比较。
* 如果操作数都是字符串，则逐个比较字符串中对应字符的编码。
* 如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较。
* 如果有任一操作数是对象，则调用其 ValueOf() 方法，取得结果后再根据前面的规则执行比较。如果没有 ValueOf() 操作符，则调用 toString() 方法，取得结果后再根据前面的规则执行比较。
* 如果有任一操作数是布尔值，则将其转换为数值再执行比较。



###  递增和递减

递增和递减操作符遵循如下规则：

* 对于字符串，如果是有效的数值形式，则转换为数值再应用改变。如果不是有效的数值形式，则将变量的值设置为 NaN。变量类型从字符串变成数值。
* 对于布尔值，false 转换为0，true 转换为1再应用改变。数值类型从布尔值变成数值。
* 对于浮点值，加1或减1。
* 如果是对象，则调用其 valueOf() 方法取得可以操作的值。对得到的值应用上述规则。如果是 NaN，则调用 toString() 并再次应用其他规则。变量类型从对象变成数值。

```js
let a1 = '2'
let s2 = 's'
let b = false
let f = 1.1
let o = {
  valueOf() {
    return -1
  }
}

console.log(++a1)   // 3
console.log(++s2)   // NaN
console.log(++b)    // 1
console.log(--f)    // 0.10000000000000009
console.log(--o)    // -2
```



### 位运算符

注意：会先将数值转换为二进制后再运算。



* `~ 按位非` ：返回数值的补数（对数值取反并减1）
* `& 按位与` ：将两个数的每一个位对齐，然后基于规则，对每一位执行相应的与操作
  * 在两个位都是1时返回1，在任何一位是0时返回0
* `| 按位或` ：将两个数的每一个位对齐，然后基于规则，对每一位执行相应的与操作
  * 两位有一位是1时返回1，都是0时返回0
* `^ 按位异或` ：将两个数的每一个位对齐，然后基于规则，对每一位执行相应的与操作
  * 只在一位是1时返回1，两位都是1或0则返回0
* `<< 左移` ：按照指定的位数将数值的所有位向左移动，左移会以0填充空位，让结果是完整的32位数值
* `>>> 无符号右移` ：将数值的所有32位都向右移，无符号右移会给空位补0



```js
let num1 = 25;
let num2 = ~num1;
console.log(num2);	// -26

let num3 = 25 & 3;
console.log(num3);	// 1

let num4 = 25 | 3;
let num5 = 25 ^ 3;

let num5 = 2 << 5;
let num6 = 64 >>> 5;
```



### void

void 是一元运算符，它可以出现在任意类型的操作数之前执行操作数，会忽略操作数的返回值，返回一个 undefined。

void 常用于 HTML 脚本中执行 JavaScript 表达式，但不需要返回表达式的计算结果。比如对于链接标签，我们并不想让它发生跳转，就可以设置`href="javascript:void(0)`。



```js
let a = b = c = 2;  // 定义并初始化变量的值
d = void (a -= (b *= (c += 5)));  // 执行void运算符，并把返回值赋予变量d
console.log(a);  // -12
console.log(b);  // 14
console.log(c);  // 7
console.log(d);  // undefined
```

由于 void 运算符的优先级比较高，高于普通运算符的优先级，所以在使用时应该使用小括号明确 void 运算符操作的操作数，避免引发错误。



### !!

`!!` 可以将一个值转化为布尔值。相当于调用了转型函数 `Boolean()` 。

```js
!!undefined // false
!!"996"     // true
!!null      // false
!!NaN       // false

Boolean(null)
```



### ~~

`~~` 运算符的作用有很多，通常是用来将变量转化为数字类型的，不同类型的转化结果不一样：

- 如果是数字类型的字符串，就会转化为纯数字；
- 如果字符串包含数字之外的值，就会转化为0；
- 如果是布尔类型，true会返回1，false会返回0；

```js
~~3.587		// 3
~~ '52a'	// 0
~~ true		// 1
~~ ''			// 0
```



### ** 指数运算符

`**` 指数运算符，相当于 `Math.pow()` 。

```js
3 ** 2;		// 3的2次幂，等于 3*3 = 9
Math.pow(3, 2);
```



## 变量

在JavaScript中，一切都区分大小写。声明变量可以用 `var` 和 `let` ，也可以省略 `var` 直接赋值(不推荐)。

命名规则: 可以由字母，数字，下划线和$符号组成，数字不能开头。不能使用关键字和保留字。

ES5 只有两种声明变量的方法：`var` 命令和 `function` 命令。ES6 除了添加`let`和`const`命令，还有 `import`命令和`class`命令。所以，ES6 一共有 6 种声明变量的方法。



### var

如果不使用var关键字声明变量，这个变量也会提升为全局变量。但是不推荐不使用var。

```js
var num = 123
str = 'abc'
console.log(num)         // 123
console.log(window.num)  // 123, 因为脚本是在浏览器下运行的，会自动将var声明的变量提取到window对象下
console.log(this.num)    // 123, 这里的this 指向了window
console.log(num == window.num && num == this.num) // true
console.log(str)				// 'abc'
```



### let

`let`关键字用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。

`let`不像`var`那样会发生"变量提升"现象。所以，变量一定要在声明后使用，否则报错。

`let`不允许在相同作用域内，重复声明同一个变量，会报错。因此，不能在函数内部重新声明参数。

```js
let num = 123;
console.log(num)         // 123
console.log(window.num)  // undefined, 因为let声明的变量不会被提取到window对象下，而访问对象中不存在的属性的值为undefined

// for循环的计数器就很适合使用let命令
for(let i = 0; i < 10; i++){
  console.log(i)
}

// 作用域
{
  let a = 10
  var b = 20
}
console.log(b)  // 20
// console.log(a)  // 报错: a is not defined

// test()会报错，let不允许在相同作用域内，重复声明同一个变量
function test(){
  var n = 10
  let n = 10
}

// test2()会报错，不能在函数内部用let重新声明参数
function test2(arg){
  let arg
}
```



### var和let的区别

1. 作用域: var是全局变量，全局内都可以使用。let声明的变量只在声明的代码块内有效。
2. 变量提升: var声明的变量在预解析时发生变量提升，而let不存在变量提升。
3. 重复声明: var可以重复声明用一个变量，而let不可以，也不能在函数内部重新声明参数。



### 作用域

1. JS中有全局作用域、函数作用域和块级作用域。
2. 全局变量: 定义在`<script>`标签中或者不属于某个函数的变量。多个`<script>`标签的全局变量互通。
3. 局部变量: 定义在函数内部的变量。
4. 函数内部可以访问到该函数外所属的外部作用域的变量（作用域链）
5. 不使用`var`声明的变量是全局变量，但不推荐使用。
6. 变量退出作用域之后会销毁，全局变量关闭网页或浏览器才会销毁。

```html
<script>
  // 全局作用域，用var声明的变量是全局变量
  var a1 = 10

  // 块级作用域，用var声明的变量是全局变量
  for(var i = 0; i < 5; i++){

  }

  // 函数作用域，函数里面声明的变量是局部变量
  function fn(){
    var a2 = 20		// a2是局部变量，只在这个函数中有效
    a3 = 30   // a3没有使用var声明，提升为全局变量
    console.log('fn: ' + i)   // 'fn: 5'
  }

  console.log(a1)   // 10
  console.log(i)    // 5
  fn()
  // console.log(a2)   // 报错: a2 is not defined
  console.log(a3)   // 30
</script>
<script>
  console.log('a1: ' + a1)  // 'a1: 10'
</script>
```



| **特性**       | **var** | **let** | **const** |
| :------------- | :------ | :------ | :-------- |
| 变量提升       | ✔️       | ×       | ×         |
| 全局变量       | ✔️       | ×       | ×         |
| 重复声明       | ✔️       | ×       | ×         |
| 重新赋值       | ✔️       | ✔️       | ×         |
| 暂时性死区     | ×       | ✔️       | ✔️         |
| 块作用域       | ×       | ✔️       | ✔️         |
| 只声明不初始化 | ✔️       | ✔️       | ×         |



### 暂时性死区TDZ

暂时性死区(temporal dead zone，简称TDZ)

只要块级作用域存在`let`命令，它所声明的变量就绑定这个区域，不再受外部的影响。

ES6明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。**凡是在声明之前就使用这些变量，就会报错。**

**总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为"暂时性死区"。**

```js
var tmp = 10
if(true){
  tmp = 'abc'   // 报错，Cannot access 'tmp' before initialization
  let tmp
}


// “暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
typeof x; // ReferenceError
let x;
```



### 顶层对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是 `window`，但 Node 和 Web Worker 没有 `window`。
- 浏览器和 Web Worker 里面，`self` 也指向顶层对象，但是 Node 没有 `self`。
- Node 里面，顶层对象是 `global`，但其他环境都不支持。



获取顶层对象的方法：

```js
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```



[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。



## 常量const

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。

这也意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值。



* 作用域: 与`let`命令相同，只在声明所在的块级作用域内有效。
* 提升: 不会发生提升，同样存在暂时性死区，只能在声明的位置后面使用。
* 声明: 与`let`一样不可重复声明。

```js
const NUM = 2021
console.log(NUM)  //2021

// 下面这行代码会报错: Uncaught TypeError: Assignment to constant variable.
NUM = 2022        // 报错，因为常量不允许重新赋值

if(true){
  const MAX = 5
}
console.log(MAX)  // 报错，MAX只在声明所在的块级作用域内有效

if(true){
  console.log(MAX)  // 报错，暂时性死区，要先声明后使用
  const MAX = 5
}

const N = 10
const N = 20	// 报错，const变量不允许重复声明
```



对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

但对象本身是可变的，所以依然可以为其添加新属性。

```js
const arr = []
arr[0] = 12
arr[1] = 22
console.log(arr)  // [12, 22]
```

**注意: 其实const声明的常量只是不允许改变它的内存地址，里面的内容却是可以改变的。**



设置不允许更改内容:

如果真的想将对象冻结，应该使用`Object.freeze`方法。

```js
const obj = Object.freeze({})
// 常规模式时，下面一行不起作用；严格模式时，该行会报错
obj.age = 10    // 无效
console.log(obj)  // {}
```





## 关键字和保留字

|   关键字   |      |      |      |      |      |      |      |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| break | case | catch | continue | default | delete | do | else |
| finally | for | function | if | in | instanceof | new | return |
| switch | this | throw | try | typeof | var | void | while |
| with |  |  |  |  |  |  |  |



|  保留字  |           |         |              |         |           |            |        |
| :------: | :-------: | :-----: | :----------: | :-----: | :-------: | :--------: | :----: |
| abstract |  boolean  |  byte   |     char     |  class  |   const   |  debugger  | double |
|   enum   |  export   | extends |    final     |  float  |   goto    | implements | import |
|   int    | interface |  long   |    native    | package |  private  | protected  | public |
|  short   |  static   |  super  | synchronized | throws  | transient |  volatile  |        |



## 严格模式

ECMAScript 5 增加了严格模式（strict mode）的概念。严格模式是一种不同的 Js 解析和执行模型，ECMAScript 3 的一些不规范写法在这种模式下会被处理，对于不安全的活动将抛出错误。

要对整个脚本启用严格模式，在脚本开头加上这一行：`"use strict";`

也可以单独指定一个函数在严格模式下执行，只要把这个预处理指令放到函数体开头即可：

```js
function test() {
	"use strict";
	// 函数体
}
```



## 转义字符

> `\n` : 换行
>
> `\t` : 缩进
>
> `\b` : 空格
>
> `\r` : 回车，不等于换行
>
> `\\`：斜杠
>
> `\'`：单引号
>
> `\"`：双引号





## 判断语句

### if语句

```js
var num = 20
if(num > 10){
  console.log('num > 10')
}else {
  console.log('num < 10')
}

var fiuit = 'banana'
if(fiuit == 'apple'){
  console('水果是苹果')
}else if(fiuit == 'banana') {
  console.log('水果是香蕉')
}else {
  console.log('其他水果')
}
```



### switch语句

switch 语句可以用于所有数据类型，因此可以使用数值、字符串甚至对象。其次，条件的值不需要是常量，也可以是变量或表达式。

switch 语句在比较每个条件的值时会使用全等操作符，因此不会强制转换数据类型。

```js
var fruit = 'orange'
switch(fruit){
  case 'apple': 
    console.log('苹果')
    break
  case 'banana':
    console.log('香蕉')
    break
  default: 
    console.log('其他水果')
}
```



## 循环语句

### while循环

```js
var count = 0
while(count < 10){
  console.log(count)
  count++
}
```



### do while循环

不管条件是否满足，都先执行一次。

```js
var count = 0
do{
  console.log(count)
  count++
}while(count < 0)
```



### for循环

```js
for(let i = 0; i < 10; i++){
  console.log(i)
}


// for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```



### for in循环

for-in 语句是一种严格的迭代语句，用于枚举对象中的非符号键属性。

有些系统提供的对象的属性和方法无法遍历，原因是属性和方法被设置为不可遍历。

```js
var arr = [12, 31, 41, 87, 2]
for(let i in arr){
  console.log(arr[i])
}

var obj = {name: '张三', age: 21, sex: '男'}
for(let key in obj){
  console.log(obj[key])
}
```

ECMAScript 中对象的属性是无序的，因此 for-in 语句不能保证返回对象属性的顺序。

如果 for-in 循环要迭代的变量是 null 或 undefined，则不执行循环体。



for-in 语句中对象的遍历顺序：

* 当属性名可以被转为整数时，则将这些属性名升序排序并放在前面
* 属性名不能被转为整数时，则按照书写的顺序遍历

```js
let obj = {
  p2: 'aaa',
  2: 'aaa',
  1: 'aaa',
  p1: 'aaa',
}
for (let key in obj) {
  console.log(key)  // 遍历顺序 1 2 p2 p1
}
```





### for of循环

for-of 语句是一种严格的迭代语句，用于遍历可迭代对象的元素。

for-of 循环会按照可迭代对象的 next() 方法产生值的顺序迭代元素。如果尝试迭代的变量不支持迭代，则 for-of 语句抛出异常。

任何部署了`Iterator`接口的对象，都可以用`for...of`循环遍历。比如`Map`结构。

```js
// 遍历Map结构
var map = new Map()
map.set('first', 'hello')
map.set('second', 'world')


for(let item of map) {
  console.log(item)   // ['first', 'hello']  ['second', 'world']
}

for(let [k,v] of map) {
  console.log(k,v)    // first hello   second world
}

//如果只想获取键名，或者只想获取键值，可以写成下面这样。
// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [,value] of map) {
  // ...
}
```



### for in 和 for of区别

for in 遍历的是索引(key)，for of 遍历的是值(value)

for in 能够遍历数组和对象，for of 只能够遍历部署了`Iterator`接口的对象(普通对象不行)，比如Map

```js
var arr = ['111', '222', '333']
for(var i in arr){
  console.log(i)  // 0 1 2
}
for(var i of arr){
  console.log(i)  // 111 222 333
}

var obj = {
  name: 'hlw',
  age: 16
}
for(var i in obj){
  console.log(i)  // name age
}
for(var i of obj){
  console.log(i)  // 报错 obj is not iterable
}
```



### 遍历方法



#### 其他遍历

##### for

for循环由三个表达式组成，分别是声明循环变量、判断循环条件、更新循环变量。这三个表达式用分号分隔。可以使用临时变量将数组的长度缓存起来，避免重复获取数组长度，当数组较大时优化效果会比较明显。

```js
const arr = [1,2,3,4,5]
for(let i = 0, len = arr.length; i < len; i++ ){
  console.log(arr[i])
}
```



##### while

`while`循环中的结束条件可以是各种类型，但是最终都会转为布尔值，转换规则如下。

- Boolean：true为真，false为假；
- String：空字符串为假，所有非空字符串为真；
- Number：0为假，非0数字为真；
- null/Undefined/NaN：全为假；
- Object：全为真。

```js
let num = 1;

while (num < 10) {
  console.log(num);
  num++;
}
```



##### do / while

- 该方法会先执行再判断，即使初始条件不成立，`do/while`循环也至少会执行一次。

```js
let num = 10;

do {
  console.log(num);
  num--;
} while (num >= 0);

console.log(num); //-1
```



##### for await of

`for await...of` 方法被称为**异步迭代器**，该方法是主要用来遍历异步对象。

`for await...of` 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括 String，Array，类数组，Map， Set和自定义的异步或者同步可迭代对象。这个语句只能在 `async function`内使用：

```js
function Gen (time) {
  return new Promise((resolve,reject) => {
    setTimeout(function () {
       resolve(time)
    },time)
  })
}

async function test () {
   let arr = [Gen(2000),Gen(100),Gen(3000)]
   for await (let item of arr) {
      console.log(Date.now(),item)
   }
}
test()
```





#### 数组遍历

##### forEach()

* `forEach()` ：用于调用数组的每个元素，并将元素传递给回调函数。数组中的每个值都会调用回调函数。
  * `array.forEach(function(currentValue, index, arr), thisValue)`
  * currentValue ：必需。当前元素
  * index ：当前元素的索引值
  * arr ：当前元素所属的数组对象
  * thisValue ：绑定回调函数内部this变量（前提是回调函数不能是箭头函数，因为箭头函数没有this）



注意：

- forEach 方法不会改变原数组，也没有返回值；
- forEach 无法使用 break，continue 跳出循环，使用 return 时，效果和在 for 循环中使用 continue 一致；
- forEach 方法无法遍历对象，仅适用于数组的遍历。
- forEach 本身无法跳出循环，如果需要跳出循环可以通过抛出异常的方式结束循环。



```js
let arr = [1,2,3,4,5]
arr.forEach((item, index, arr) => {
  console.log(index+":"+item)
})


let arr = [1,2,3,4,5]
let arr1 = [9,8,7,6,5]
arr.forEach(function(item, index, arr){
  // 相当于 arr1[index]
  console.log(this[index])  //  9 8 7 6 5
}, arr1)


let arr = [1, 2, 3, 4, 5]
arr.forEach((item, index, arr) => {
  if (index >= 2) {
    throw new Error("跳出循环")
  }

  console.log(item)
})
```



##### map()

* `map()` ：会返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。该方法按照原始数组元素顺序依次处理元素。
  * `array.map(function(currentValue,index,arr), thisValue)`
  * 参数同 forEach



注意：

- map 方法不会对空数组进行检测；
- map 方法遍历数组时会返回一个新数组，**不会改变原始数组**；
- map 方法有返回值，可以return出来，map的回调函数中支持return返回值；
- map 方法无法遍历对象，仅适用于数组的遍历。



```js
let arr = [1, 2, 3];
arr.map(item => {
    return item + 1;	// [2, 3, 4]
})

// 该方法还可以进行链式调用
arr.map(item => item + 1).map(item => item + 1)	// [3, 4, 5]
```



##### filter()

* `filter()` ：用于过滤数组，满足条件的元素会被返回。它的参数是一个回调函数，所有数组元素依次执行该函数，返回结果为true的元素会被返回，如果没有符合条件的元素，则返回空数组。
  * `array.filter(function(currentValue,index,arr), thisValue)`
  * 参数同 forEach



- 注意：
  - filter 方法会返回一个新的数组，不会改变原数组；
  - filter 方法不会对空数组进行检测；
  - filter 方法仅适用于检测数组。



```js
const arr = [1, 2, 3, 4, 5]
arr.filter(item => item > 2) // [3, 4, 5]

// 可以使用filter()方法来移除数组中的undefined、null、NAN等值：
let arr = [1, undefined, 2, null, 3, false, '', 4, 0]
arr.filter(Boolean)	// [1, 2, 3, 4]
```



##### some()、every()

* `some()` ：对数组中的每一项进行遍历，只要有一个元素符合条件，就返回true，且剩余的元素不会再进行检测，否则就返回false。
  * `array.some(function(currentValue,index,arr), thisValue)`
  * 参数同 forEach
* `every()` ：对数组中的每一项进行遍历，只有所有元素都符合条件时，才返回true，如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
  * `array.every(function(currentValue,index,arr), thisValue)`
  * 参数同 forEach



注意：

- 两个方法都不会改变原数组，会返回一个布尔值；
- 两个方法都不会对空数组进行检测；
- 两个方法都仅适用于检测数组。



```js
let arr = [1, 2, 3, 4, 5]

arr.some(item => item > 4) 	// true
arr.every(item => item > 0) // true
```



##### find()、findIndex()

* `find()` ：返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
  * `array.find(function(currentValue,index,arr), thisValue)`
  * 参数同 forEach
* `findIndex()` ：返回的是第一个符合条件的值的索引值。
  * `array.findIndex(function(currentValue,index,arr), thisValue)`
  * 参数同 forEach



- 注意：
  - 两个方法对于空数组，函数是不会执行的；
  - 两个方法都不会改变原数组。



```js
let arr = [5, 12, 8, 130, 44]
arr.find(item => item > 10) // 12
arr.findIndex(item => item > 10) // 1
```



##### reduce()、reduceRight()

* `reduce()` ：对数组中的每个元素按序执行一个提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
  * `array.reduce(function(total,currentValue,currentIndex,arr), initialValue)`
  * total ：上一次调用回调返回的值，或者是提供的初始值（initialValue）
  * currentValue ：当前被处理的元素
  * currentIndex ：当前元素的索引
  * arr ：当前元素所属的数组对象
  * initialValue ：表示传递给函数的初始值 （作为第一次调用 callback 的第一个参数）
* `reduceRight()` ：该方法是对数组进行倒序遍历的，而`reduce()`方法是正序遍历的。
  * `array.reduceRight(function(total,currentValue,currentIndex,arr), initialValue)`
  * 参数同 reduce()



- 注意：
  - 两个方法都不会改变原数组；
  - 两个方法对于空数组是不会执行回调函数的。



```js
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
  console.log(prev, cur, index);
  return prev + cur;
})
console.log(sum); // 10
```



##### keys()、values()、entries()

三个方法都返回一个数组的迭代对象，对象的内容不太相同：

- keys() 返回数组的索引值；
- values() 返回数组的元素；
- entries() 返回数组的键值对。



```js
let arr = ["Banana", "Orange", "Apple", "Mango"];
const iterator1 = arr.keys();
const iterator2 = arr.values() 
const iterator3 = arr.entries() 

for (let item of iterator1) {
  console.log(item);
}
// 输出结果： 0 1 2 3

for (let item of iterator2) {
  console.log(item);
}
// 输出结果： Banana Orange Apple Mango

for (let item of iterator3) {
  console.log(item);
}
// 输出结果：[0, 'Banana'] [1, 'Orange'] [2, 'Apple'] [3, 'Mango']
```





##### for of

`for...of` 语句创建一个循环来迭代可迭代的对象。

```js
let arr = [
    {id:1, value:'hello'},
    {id:2, value:'world'},
    {id:3, value:'JavaScript'}
]
for (let item of arr) {
  console.log(item); 
}
```



注意：

- for of 方法只会遍历当前对象的属性，不会遍历其原型链上的属性；
- for of 方法适用遍历 **数组/ 类数组/字符串/map/set** 等拥有迭代器对象的集合；
- for of 方法不支持遍历普通对象，因为其没有迭代器对象。如果想要遍历一个对象的属性，可以用 for in 方法；
- 可以使用break、continue、return来中断循环遍历；



#### 对象遍历

##### for in

`for...in` 语句用于遍历对象属性。返回元素的key。不仅会遍历当前的对象所有的可枚举属性，还会遍历其原型链上的属性。

```js
let obj = { a: 1, b: 2, c: 3 };

for (var i in obj) {
  console.log("键名：", i);
  console.log("键值：", obj[i]);
}
```



##### Object.keys()、Object.values()、Object.entries()

这三个方法都用来遍历对象，它会返回一个由给定对象的自身可枚举属性（不含继承的和Symbol属性）组成的数组，数组元素的排列顺序和正常循环遍历该对象时返回的顺序一致，这个三个元素返回的值分别如下：

- Object.keys()：返回包含对象键名的数组；
- Object.values()：返回包含对象键值的数组；
- Object.entries()：返回包含对象键名和键值的数组。



```js
let obj = { 
  id: 1, 
  name: 'hello', 
  age: 18 
};
console.log(Object.keys(obj));   // 输出结果: ['id', 'name', 'age']
console.log(Object.values(obj)); // 输出结果: [1, 'hello', 18]
console.log(Object.entries(obj));   // 输出结果: [['id', 1], ['name', 'hello'], ['age', 18]
```



注意：

- Object.keys()方法返回的数组中的值都是字符串，也就是说不是字符串的key值会转化为字符串。
- 结果数组中的属性值都是对象本身**可枚举的属性**，不包括继承来的属性。



##### Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()

`Object.getOwnPropertyNames()`方法与`Object.keys()`类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但它能返回**不可枚举的属性。**

这两个方法都可以用来计算对象中属性的个数：

```js
let a = ['Hello', 'World'];
 
Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]

Object.keys(obj).length // 3
Object.getOwnPropertyNames(obj).length // 3
```



`Object.getOwnPropertySymbols()` 方法返回对象自身的 Symbol 属性组成的数组，不包括字符串属性：

```js
let obj = {a: 1}

// 给对象添加一个不可枚举的 Symbol 属性
Object.defineProperties(obj, {
 [Symbol('baz')]: {
  value: 'Symbol baz',
  enumerable: false
 }
})
 
// 给对象添加一个可枚举的 Symbol 属性
obj[Symbol('foo')] = 'Symbol foo'
 
Object.getOwnPropertySymbols(obj).forEach((key) => {
  console.log(obj[key]) // Symbol baz Symbol foo
})
```



##### Reflect.ownKeys()

Reflect.ownKeys() 返回一个数组，包含对象自身的所有属性。它和Object.keys()类似，Object.keys()返回属性key，但不包括不可枚举的属性，而Reflect.ownKeys()会返回所有属性key：

```js
var obj = {
  a: 1,
  b: 2,
};
Object.defineProperty(obj, "method", {
  value: function () {
    alert("Non enumerable property");
  },
  enumerable: false,
});

console.log(Object.keys(obj));  // ["a", "b"]
console.log(Reflect.ownKeys(obj));  // ["a", "b", "method"]
```



注意：

- Object.keys() ：相当于返回对象属性数组；
- Reflect.ownKeys() :相当于 `Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)`。





## 数组

1. JS中的数组可以存放任意数量的不同类型元素。
2. 元素下标从0开始，可以通过`数组名.length`获取数组的长度
3. 数组中的项，如果没有赋值，则为undefined
4. 字符串也可以看做是一个数组



### 创建数组

```js
var arr1 = []		// 空数组
var arr2 = [1, 2, 3]
var arr3 = ['aa', 123, false]

var arr4 = new Array()    // 创建一个空数组
var arr5 = new Array(10)  // 创建一个长度为10的数组
var arr6 = new Array(2, 'a', 23.12)

// 使用逗号创建空位，ECMAScript会将逗号之间相应索引位置的值当成空位，也就是1个逗号表示1位
// 由于不同方法对空位数组的处理方式不同，因此尽量避免使用空位数组。确实需要可以用undefined值代替。
let array = [,,,,,];
console.log(array.length);	// 5
console.log(array)
```

注意: 只有`new Array()`参数里面只有一个数字时是设置数组的长度，有字符串或多个元素则是设置数组元素。

虽然指定了数组的长度，但是数组的长度还是可以被改变的。

```js
var arr = new Array(2)  // 创建一个长度为2的数组
arr[0] = 1
arr[1] = 2
arr[2] = 3
console.log(arr)    // [1, 2, 3]
```



* Array.of() ：用于将参数依次转化为数组项，然后返回这个新数组。它基本上与 Array 构造器功能一致，唯一的区别就在单个数字参数的处理上。
* Array.from(arrayLike, mapFn, thisArg) ：从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
  * 类似数组的对象，必选；
  * 加工函数，新生成的数组会经过该函数的加工再返回；
  * this 作用域，表示加工函数执行时 this 的值。在箭头函数中不受用。



```js
Array.of(8.0); // [8]
Array(8.0); // [empty × 8]
console.log(Array.of('foo', 2, 'bar', true));	// ["foo", 2, "bar", true]

var obj = {0: 'a', 1: 'b', 2:'c', length: 3};

Array.from(obj, function(value, index){
  console.log(value, index, this, arguments.length);
  return value.repeat(3);   //必须指定返回值，否则返回 undefined
}, obj);

Array.from('abc');                             // ["a", "b", "c"]
Array.from(new Set(['abc', 'def']));           // ["abc", "def"]
Array.from(new Map([[1, 'ab'], [2, 'de']]));   // [[1, 'ab'], [2, 'de']]

function f() {
  return Array.from(arguments);
}
```



### 数组的赋值和遍历

带有文本下标的数组元素，不计入数组长度。需要使用`for-in`语句进行遍历。

通过观察，后添加的first和second是以属性形式添加到数组对象中的。

```js
var arr = []
arr[0] = 28           // 通过数组下标方式赋值
arr[1] = '11'
arr[3] = true
console.log(arr[1])   // '11'
console.log(arr[2])   // undefined
console.log(arr)      // [28, '11', undefined, true]
console.log(arr.length)   // 4, 通过length属性获取数组的长度
arr.length = 10				// 将数组长度扩充为10

// 通过for循环遍历数组
for(let i = 0; i < arr.length; i++){
  console.log(arr[i])
}
```

```js
var arr = [1, 2, 3]
arr['first'] = 'zhangsan'
arr['second'] = 'lisi'
console.log(arr)        // [1, 2, 3, first: "zhangsan", second: "lisi"]
console.log(arr.length) // 3

for(let i in arr){
  console.log(arr[i])
}
```



### length属性妙用

length 属性不是只读的，通过修改 length 属性，可以从数组末尾删除或添加元素。

```js
// 为一个数组添加1~10的整数
var arr = []

for(let i = 1; i <= 10; i++){
  arr[arr.length] = i
}

console.log(arr)  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 清空数组
arr.length = 0 	// []

arr.length = 3
```



### 常见操作

#### 判断数组

```js
let arr = [1, 2, 3];

console.log(Array.isArray(arr)); // 推荐，兼容IE9+
console.log(Object.prototype.toString.call(arr) === "[object Array]"); // 推荐，兼容IE8
console.log(arr instanceof Array); // 在跨窗口/iframe 时可能失效（不同全局对象导致）
console.log(arr.constructor === Array); // 若原型链被修改，可能导致误判。
console.log(arr.__proto__ === Array.prototype); // 通过对象的原型方式来判断
console.log(Object.getPrototypeOf(arr) === Array.prototype);
console.log(Array.prototype.isPrototypeOf(arr));
```



#### 数组扁平化

所谓扁平化，其实就是将一个嵌套多层的数组 array（嵌套可以是任何层数）转换为只有一层的数组。

* flat() 实现
* 递归实现
* reduce 函数迭代
* 扩展运算符实现



```js
let arr = [1, [2, [3, 4, 5]]];

// flat() 实现
console.log(arr.flat(Infinity));

// 递归实现
function flatten(array) {
  let result = [];
  array.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  });
  return result;
}
console.log(flatten(arr));

// reduce 函数迭代
function flatten2(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten2(next) : next);
  }, []);
}
console.log(flatten2(arr));

// 扩展运算符实现
function flatten3(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten3(arr));
```



#### 数组去重

```js
let array = [1, 2, 2, 3, 4, 4, 5];

// Set 方式
console.log([...new Set(array)]);
console.log(Array.from(new Set(array)));

// Map 方式
let map = new Map();
array.forEach((item) => {
  if (!map.has(item)) {
    map.set(item, true);
  }
});
console.log(Array.from(map.keys()));

// 遍历方式
let uniqueArray = [];
array.forEach((item) => {
  if (!uniqueArray.includes(item)) {
    uniqueArray.push(item);
  }
});
console.log(uniqueArray);

// filter 方式
let filterArray = array.filter((item, index) => {
  return array.indexOf(item) === index;
});
console.log(filterArray);
```



#### 数组乱序

主要的实现思路就是：

1. 取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换；
2. 第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与该索引值对应的元素进行交换；
3. 按照上面的规律执行，直到遍历完成。

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (var i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr)
```



### 类数组对象

JavaScript 中一直存在一种类数组的对象，它们不能直接调用数组的方法，但是又和数组比较类似，在某些特定的编程场景中会出现。

* 函数里面的参数对象 arguments；
* 用 getElementsByTagName/ClassName/Name 获得的 HTMLCollection；
* 用 querySelector 获得的 NodeList。



```js
function foo(name, age, sex) {
  console.log(arguments);
  console.log(typeof arguments); // object
  console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
  console.log(arguments.callee); // 输出的就是函数自身，如果在函数内部直接执行调用 callee，那它就会不停地执行当前函数，直到执行到内存溢出。
}
foo("jack", "18", "male");
```



**转为数组：**

```js
function sum(a, b) {
  let args = Array.prototype.concat.apply([], arguments);
	let args = Array.from(arguments);
	let args = [...arguments];
}
```



## function函数

### 函数语法

1. 在JS中，实参的个数可以和形参个数不一致。当函数中需要将形参进行运算时，如果形参不够，会返回`NaN`。
2. JS中没有重载，当函数名相同时，最后的函数会覆盖前面的函数。(重载:函数名相同，但是参数个数不同)
3. 函数的返回值: 如果函数没有`return`，默认返回`undefined`。如果`return`后面没有跟内容，返回`undefined`



**函数的三要素: 函数的功能、函数的参数、函数的返回值。**

```js
// 声明函数
function add(n1, n2){
  return n1 + n2
}

// 调用函数
var res1 = add(10, 20)
var res2 = add(10)
console.log(res1)		// 30
console.log(res2)		// NaN
```



### 函数定义方式

* 函数声明。调用: 在函数声明代码前后都可以调用。
* 函数表达式。调用: 只能在函数表达式的后面调用。
* 匿名函数，一般用在绑定事件的时候。`function(){ }`
* 自调用函数，只能执行一次。`(function(){ })()`

```js
console.log(add(4, 3))  // 7
// 1、函数声明
function add(n1, n2){
  return n1 + n2
}
console.log(add(1, 2))  // 3


// 下面这条代码会报错： Uncaught TypeError: fname is not a function
// console.log(fname(1, 2))  // 报错，函数表达式的函数只能在表达式后面调用
// 2、函数表达式
var fname = function(n1, n2){
  return n1 * n2
}
console.log(fname(1, 2));  // 2

// 3、匿名函数
// function(){ }

// 4、自调用函数，注意: 自调用函数的前一行代码必须有;分号结束
(function(){ alert(1)})()   // 自调用函数只能执行一次
```



### 立即执行函数

作用：针对初始化功能的函数。或者需要经过复杂计算并只需要得到最终结果的函数。

```js
(function() {
  console.log('初始化...')
}())

var num = (function (a, b, c){
  var d = a + b + c * 2 - 2
  return d
}(1, 2, 3))
```



应用

```js
// 点击li时输出索引
function test() {
  var liCollection = document.getElementsByTagName('li')

  for(var i = 0; i < liCollection.length; i++) {
    (function (j) {
      liCollection[j].onclick = function () {
        console.log(j)
      }
    }(i))
  }
}

test()
```





#### 立即执行函数出现的问题

**根据JS的语法，自调用函数是(开头的，所以它上一行代码的后面必须要加(`;`)分号，否则会报错**

```js
/* 以下代码会报错，原因是根据JS的语法，自调用函数是(开头的，所以它上一行代码的后面必须要加(;)分号
console.log()
(function(){ alert(1)}())		// 报错: console.log(...) is not a function
*/

console.log();
(function(){ alert(1)}())		// 自调用函数，只能执行一次
```

```js
// 立即执行函数的两种写法
(function(){ alert(1)}());  // 推荐
(function(){ alert(1)})();
```



### 函数作为参数传递

函数是一种数据类型，并且函数可以作为另一个函数的参数。就像变量一样。

```js
var myFun = function(){
  console.log('hello')
}
console.log(typeof myFun)   // function

// 函数可以作为另一个函数的参数
function getResult(n1, n2, fn){
  return fn(n1, n2)
}
// 注意: 传递的函数中的参数要和声明的一样
var res = getResult(2, 4, function(n1, n2){
  return n1 + n2
})
console.log(res)    // 6

function add(n1, n2){
  return n1 + n2
}
var count = getResult(23, 12, add)
console.log(count)  // 35
```



### 函数声明在代码块中

在ES6中，函数可以声明在代码块中，不会报错。

```js
if(true){
  console.log(1)
  function f1(){
    console.log('f1')
  }
  console.log(2)
}

f1()  // 'f1'
```



### arguments属性

当函数不确定参数个数时，可以不定义形参，那么所有形参会自动存放到`arguments`这个属性数组中。

```js
function display(){
  console.log(arguments)
  for(let i = 0; i < arguments.length; i++){
    document.write(arguments[i] + '<br>')
  }
}
display('张三', '李四', '王五')


function add(){
  let sum = 0
  for(let i = 0; i < arguments.length; i++){
    sum += arguments[i]
  }
  return sum
}
console.log(add(1, 2, 3, 5))  // 11
```



**function 中的实参和 arguments 是映射关系，他变我就变，虽然不是同个人。**

```js
function test(n) {
  console.log(n, arguments[0])  // 2  2

  arguments[0] = 99

  console.log(n, arguments[0])  // 99  99

  n = 88

  console.log(n, arguments[0])  // 88  88
}

test(2)
```

引用类型和值类型都会变。



### callee、caller

* `arguments.callee` ：返回自身函数的方法体
* `func.caller` ：返回调用该函数时所处的方法体

```js
// 'use strict'
// caller 在严格模式下报错
function test() {
  var x = 13
  demo()
}

function demo() {
  // arguments.caller 返回自身函数的方法体
  console.log(arguments.callee)		// function demo() { ... }
  // 函数名.caller 返回调用该函数时所处的方法体
  console.log(demo.caller)    		// function test() { ... }
}

test()

function a() {
  function b() {
    demo()
  }
  b()
}
a()
```



### 函数默认参数

只有不传入参数时才会触发默认值。

```js
function getPoint(x = 0, y = 0) {
  console.log(x, y);
}

getPoint(1, 2);   // 1  2
getPoint()        // 0  0 
getPoint(1)       // 1  0

// 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```



当使用函数默认值时，需要注意以下几点：

* 函数length属性值：当引入函数默认值之后，length表示的就是第一个有默认值参数之前的普通参数个数。
* 参数作用域：当给函数的参数设置了默认值之后，参数在被初始化时将形成一个独立作用域，初始化完成后作用域消解。

```js
const funcA = function(x, y) {};
console.log(funcA.length);  // 输出结果：2 

const funcB = function(x, y = 1) {};
console.log(funcB.length);  // 输出结果：1

const funcC = function(x = 1, y) {};
console.log(funcC.length);  // 输出结果 0 


let x = 1;
function func(x, y = x) {
  console.log(y);
}
func(2); // 输出2 在函数调用时，参数 x, y 将形成一个独立的作用域，所以参数中的y会等于第一个参数中的x，而不是上面定义的1。
```





## 基本数据类型和引用数据类型

* 基本数据类型: string, number, boolean, undefined, null，Symbol (ES6新增，表示独一无二的值)。这些也被称为值类型
* 引用数据类型: function, object, array
  * 包装类类型: Date, Math, RegExp, Number, String, Boolean, ...



不同点:

* 内存存放位置
  * 基本数据类型是存在栈里面的
  * 引用数据类型是存在堆中的
* 传递方式
  * 基本数据类型是按值传递: 将变量中的数据完整的拷贝一份，赋值给新的变量。
  * 引用数据类型是传递存储数据的内存地址(引用)，多个对象可以指向同一个引用。

```js
var n1 = 10
var n2 = n1		// 值传递
console.log(`n1: ${n1}, n2: ${n2}`)   // 'n1: 10, n2: 10'
n2 = 99
console.log(`n1: ${n1}, n2: ${n2}`)   // 'n1: 10, n2: 99'

var arr1 = [1, 2, 3]
var arr2 = arr1		// 引用传递
console.log(`arr1: ${arr1}, arr2: ${arr2}`)   // 'arr1: 1,2,3, arr2: 1,2,3'
arr2[1] = 99
console.log(`arr1: ${arr1}, arr2: ${arr2}`)   // 'arr1: 1,99,3, arr2: 1,99,3'
```



**基本数据类型和引用数据类型作为函数的参数:** 

* 当基本数据类型作为函数的参数的时候，函数内部对参数的修改，`不会修改`外部的变量。因为在函数中传递参数的时候，在内存中把变量复制了一份，所以修改复制的对原数据没有影响。
* 引用数据类型作为函数的参数的时候，函数内部对参数的修改，`会影响`外部变量。因为在函数传递参数的时候，内存中把该引用地址在栈中复制了一份，修改属性也会影响到其他相同引用的属性

```js
// 基本数据类型传递
function f1(a){
  a = 100
}
var a = 1
f1(a)
console.log(a)  // 1


// 引用数据类型传递
function Person(name, age){
  this.name = name
  this.age = age
}
function f2(obj){
  obj.name = 'hlw'
}
var p1 = new Person('zs', 21)
console.log(p1.name)  // 'zs'
f2(p1)
console.log(p1.name)  // 'hlw'


// Array也是引用类型
function f3(arr){
  arr[0] = -1
}
var arr = [21, 31, 33]
console.log(arr[0])   // 21
f3(arr)
console.log(arr[0])   // -1
```



## 递归

递归就是方法自身调用，一般还要有结束的条件。

如果没有结束条件，超过浏览器分配的内存时会报错： `Maximum call stack size exceeded`

```js
// 求n个数的累加
function getSum(n){
  if(n == 1){
    return 1
  }
  return n + getSum(n-1)
}
console.log(getSum(3))  // 6  3+2+1


//求斐波那契数列的第n个数
function getF(n){
  if(n<=0){
    return -1;
  }
  if(n==1||n==2){
    return 1;
  }
  return getF(n-1) + getF(n-2);
}
console.log(getF(4));
```



## delete关键字

用于在当前作用域上删除数据。语法: `delete 数据`，返回布尔值，表示是否删除成功。

用法:

1. 删除数组中的一个元素，删除后数组长度不会改变，被删的元素值变成`undefined`
2. 删除一个对象的属性或方法，只能删除自定义对象属性，不能删除系统对象的属性。
3. 删除一个没有用`var`声明的变量



```js
var arr = [1, 2, 3, 4]
delete arr[2]
console.log(arr)  // [1, 2, undefined, 4]

var obj = {name: 'zhangsan', age: 22}
delete obj.name
console.log(obj)  // {age: 22}

var n = 1
m = 2
console.log(delete n)   // false
console.log(delete m)   // true
console.log(n)          // 1
console.log(m)          // 报错，m is not defined
```



## 编解码



* UTF-8 ：URL 只能包含标准的 ASCII 字符，所以必须对其他特殊字符进行编码。
  * `encodeURI(str)` ：将每个字符转为统一资源标识符 (URI) 并返回。
    * 不转义以下字符  `字母 数字 - _ . ! ~ * ' ( )` 、 `; , / ? : @ & = + $` 、`#`
  * `decodeURI(str)` ：解码
  * `encodeURIComponent(str)` ：将每个字符转为统一资源标识符 (URI) 并返回。与 encodeURI() 相比，此函数会编码更多的字符，常用于转义查询字符串。
    * 不转义以下字符  `字母 数字 - _ . ! ~ * ' ( )` 
  * `decodeURIComponent(str)` ：解码
* Base64 ：将二进制数据编码为 ASCII 文本。
  * `btoa(str)` ：binary to ASCII。对经过 base-64 编码的字符串进行解码。如果传入字符串不是有效的 base64 字符串，则抛出异常。
  * `atob(str)` ：ASCII to binary。



```js
// https://domain.com/test.pdf
encodeURI('https://domain.com/test.pdf')

// http%3A%2F%2Fdomain.com%2Fsearch%3Fage%3D19
encodeURIComponent('http://domain.com/search?age=19')


let str1 = '你好'
let str2 = '%E4%BD%A0%E5%A5%BD'
// 通常会在网址上看到这些，将带有中文字符URL转为这种格式
console.log(encodeURI(str1))    // '%E4%BD%A0%E5%A5%BD'
console.log(decodeURI(str2))    // '你好'
```



```js
let str1 = 'abc123'     // 要进行编码的字符串不能包含中文
let str2 = 'YWJjMTIz'
// 一般会用 btoa() 编码一个可能在传输过程中出现问题的数据，然后再 atob() 转回来
console.log(btoa(str1))
console.log(atob(str2))


// 由于ASCII 无法表示中文，因此要先做 UTF-8 编码，然后再做Base64 编码
const encodedData = btoa(encodeURI('你好')); //  "JUU0JUJEJUEwJUU1JUE1JUJE"
const decodedData = decodeURI(atob(encodedData)); // "你好"
```





## 调试

1. 在浏览器中F12打开开发人员选项
2. 找到Sources选项，选择里面文件，在旁边行数列点击数字打上断点
3. F5刷新后，按F11逐行调试，小眼睛逐语句调试。



## debugger

**debugger 语句**调用任何可用的调试功能，例如设置断点。 如果没有调试功能可用，则此语句不起作用。

```js
console.log(1)
debugger
console.log(2)

function fun() {
  debugger
  console.log('fun')
}
fun()
```







## 异常处理

当程序报错时，会结束代码的运行。

使用`try catch`来捕获并处理异常，使用`throw`来抛出异常。

```js
try{
  // 可能出现错误的代码
} catch(e){
  // 如果出现错误才会执行的代码，e是报错信息
} finally {
  // 无论是否出现异常，都会最后执行的代码
}

// catch 可以不带参数
try {
   ...
} catch {
   ...
}
```

```js
try{
  console.log(num)
} catch(e){
  console.log(e)  // 'ReferenceError: num is not defined'
} finally {
  console.log('finally')
}


// 也可以手动抛出异常，可以抛出任何数据
function myError(){
  // throw new Error('报错了')
  throw [1, 2, 3]
}

try{
  myError()
} catch(e){
  console.log(e)
}
```

try...catch语句还可以用于解决浏览器兼容问题。

```js
try{
  var xhr = new XMLHttpRequest()
} catch(e){
  var xhr = new ActiveXObject()
}
```



**注意： JavaScript 允许使用 throw 命令抛出任何内容。**

```js
throw Symbol();
throw 33;
throw "Error!";
throw null;
```



## eval()

`eval()`可以将字符串当成表达式进行运算。

```js
var res = eval('2+4')
console.log(res)          // 6
console.log(typeof res)   // number

var reg = eval('/' + '[0-9]' + '/gi')
console.log(typeof reg)             // object
console.log(reg instanceof RegExp)  // true
```

注意的是，使用 `eval()` 时，可能会被执行恶意脚本代码。

```js
eval('alert("123")')
eval('window.location.href = "https://www.huangyihui.cn"')
```





## ES6 改动





### 解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构(Destructuring)。

解构赋值不仅适用于var命令，也适用于let和const命令。



#### 数组的解构赋值

* 从数组中提取值，按照对应位置，对变量赋值。`let [a, b, c] = [1, 2, 3]`
  * 本质上，这种写法属于"模式匹配"，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
* 如果解构不成功，变量的值就等于`undefined`
* 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组，这样解构仍可以成功
* 如果等号的右边不是数组(或者严格地说，不是可遍历的解构)，那么将会报错
  * `Uncaught TypeError: xx is not iterable`
  * 事实上，只要某种数据结构具有`Iterator`接口，都可以采用数组形式的解构赋值。
* 对于 Set 结构，也可以使用数组的解构赋值。`let [x, y, z] = new Set(['a', 'b', 'c'])`
* 解构赋值允许指定默认值。`let [foo = true] = []`
  * 注意: ES6内部使用严格相等运算符(===)，判断一个位置是否有值。所以，如果右边的一个数组成员不严格等于`undefined`，默认值是不会生效的。
* 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。`let [x = 1, y = x] = []`



```js
let [a, b, c] = [1, 2, 3]   // a=1, b=2, c=3
let [n1, n2] = [1]          // n1=1, n2=undefined
let [x, y] = [1, 2, 3]      // x=1, y=2
// let [n] = 1              // 报错，1 is not iterable
let [x, y, z] = new Set(['a', 'b', 'c'])  // x='a', y='b', z='c'
let [foo = true] = []       // foo=true
let [bar = true] = [null]   // bar=null
let [x = 1, y = x] = []     // x=1, y=1

const [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo, bar, baz) // 输出结果：1  2  3

const [x, , z] = [1, 2, 3]  // 提取第一三个值
const [x, ...y] = [1, 2, 3];   // x=1 y=[2,3]
```



#### 对象的解构赋值

* 解构不仅可以用于数组，还可以用于对象。`let {name, age} = { age: 18, name: 'lisi'}`
* 对象的解构与数组有一个重要的不同。
  * 数组的元素是按次序排列的，变量的取值由它的位置决定
  * 对象的属性没有次序，变量必须与属性同名，才能取到正确的值
* 如果变量名与属性名不一致，必须写成这样。`let {foo:baz} = { foo:'a', bar:'b'}  // baz='a'`
  * 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。**真正被赋值的是后者**，而不是前者。
* 和数组一样，解构也可以用于嵌套结构的对象。
* 对象的解构也可以指定默认值。默认值生效的条件是，对象的属性值**严格等于** undefined。
* 解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
  * `({} = [])`  虽然毫无意义，但是语法是合法的，可以执行。
* **对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。**
  * 将Math对象的方法赋值到对于的变量上，使用起来可以比较方便 `let { min, max} = Math`
* 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
  * `var arr = [1, 2, 3]; var {0:first, [arr.length-1]:last } = arr  // first=1, last=3`
* 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
  * `let {foo: {bar}} = {baz: 'baz'};` 报错，因为foo这时等于undefined，再取子属性就会报错。

```js
var {name, age} = { age: 18, name: 'lisi'}  // name='lisi', age=18
var {x, y} = { x:1, z:2}      // x=1, y=undefined
var {foo:baz} = { foo:'a', bar:'b'}   // baz='a'
var {x, y=5} = { x:1};           // x=1, y=5
var {x: y = 3} = {};	// y=3
({} = [])
let { min, max} = Math
console.log(min(4,2,7)) // 2
const { log } = console;
log('hello') // hello

var arr = [1, 2, 3]
var {0:first, [arr.length-1]:last } = arr   // first=1, last=3

// 嵌套结构解构
const student = {
  name: 'ZhangSan',
  age: 18,
  scores: {
    math: 19,
    english: 85,
    chinese: 100
  }
};
// scores 是模式，不是变量，因此不会被赋值
const { name, scores: {math, english, chinese} } = student;


// 注意，对象的解构赋值可以取到继承的属性。
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);
const { foo } = obj1;
foo // "bar"


// 如果要将一个已经声明的变量用于解构赋值，必须非常小心。
// 错误的写法
let x;
{x} = {x: 1}; // SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1});
```



#### 其他类型的解构赋值

* 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。`var [a, b, c] = 'OPQ'`
  * 类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。
  * `var {length:len} = 'hello'`
* 数值和布尔值的解构赋值
  * 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
  * 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。
* 函数的参数也可以使用解构赋值。函数参数的解构也可以使用默认值。

```js
let [a, b, c] = 'OPQ'   // a='O', b='P', c='Q'
let {length:len} = 'hello'  // len=5

let {toString: s} = 123
let flag = s === Number.prototype.toString  // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError

function add([x, y]){
  return x + y
}
console.log(add([1, 2]))  // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]

function move({x=0, y=0}={}){
  return [x, y]
}
let res1 = move({x:3, y:8})   // [3, 8]
let res2 = move({y:3})        // [0, 3]
let res3 = move()             // [0, 0]


// undefined就会触发函数参数的默认值。
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```



#### 功能示例

1. 交换变量的值
2. 当函数返回多个值，可以用解构来取值
3. 函数参数的定义
4. 提取`JSON`数据，解构赋值对提取`JSON`对象中的数据，尤其有用。
5. 指定函数参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo'`
6. 遍历`Map`结构。任何部署了`Iterator`接口的对象，都可以用`for...of`循环遍历。`Map`结构原生支持`Iterator`接口，配合变量的解构赋值，获取键名和键值就非常方便。
7. 输入模块的指定方法。加载模块时，往往需要指定输入那些方法。



```js
// 交换变量的值
var x = 10
var y = 20;
[x, y] = [y, x]   // x=20, y=10

function fn(){
  // 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。
  // 有了解构赋值，取出这些值就非常方便。
  return [1, 2, 3]
}
var [a, b, c] = fn()  // a=1, b=2, c=3


// 解构赋值可以方便地将一组参数与变量名对应起来
function f1([x, y, z]){ }   // 参数是一组有次序的值
f1([1, 2, 3])
function f2({x, y, z}){ }   // 参数是一组无次序的值
f2({z:3, x:1, y:2})

// 提取JSON数据
var json = { id:42, status:'ok', data:[23, 33]}
var { id, status, data:number } = json
console.log(id, status, number)   // 42, "ok", [23, 33]

// 指定函数参数的默认值
var obj = {name:'hlw'}
function test({name="noname", age=-1}) {
  console.log(name,age)
}
test(obj)   // // 'hlw -1'

// 遍历Map结构
var map = new Map()
map.set('first', 'hello')
map.set('second', 'world')
for (let [key, value] of map) {
  console.log(key + "  is " + value)  //first is hello... second is world
}

// 输入模块的指定方法。加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。
const { SourceMapConsumer, SourceNode } = require("source-map")
```





### 速写方法、速写属性

```js
var Person = {
  sayHello: function(){
    console.log('hello')
  },

  // 速写方法 省略了 :function
  sayHi(){
    console.log('hi')
  }
}
```

```js
var name = 'zhangsan'
var age = 13
var Person = {
  // name: name
  // 当属性名和变量名相同时，可以使用速写属性
  name,
  age
}
```



### 模板字符串

* 模板字符串中还可以任意换行，并且会按原格式输出。模板字符串支持嵌套。
* 字符串插值：所有插入的值都会使用 `toString()` 强制转换为字符串，而且任何 JavaScript 表达式都可以用于插值。
* 所有模板字符串的空格和换行，都是被保留的，但是可以使用 `trim` 方法消除它。



```js
var name = 'zhangsan'
var age = 15

// 使用模板字符串``(反引号)，使用${变量名} 得到变量值
var str = `my name is ${name}, age is ${age}`

// 将表达式转换为字符串时会调用 toString()
let foo = { toString: () => 'World'}
console.log(`hello ${foo}`)		// hello World

// 在插值表达式中可以调用函数和方法
console.log(`1+1=${1+1}`)			// 1+1=2
console.log(`${fn()}`)			// 调用方法

$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());
```



### 箭头函数

任何可以书写匿名函数的位置均可以书写箭头函数。

箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。也就是箭头函数将会绑定`this`为函数书写位置的`this`值。

```js
var fn1 = function(a, b){
  return a + b
}

var fn2 = (a, b) => { return a + b }
var fn3 = (a, b) => a + b

console.log(fn1(1,2))
console.log(fn2(2,2))
console.log(fn3(4,2))
```



#### 不绑定 this

箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。

```js
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};
obj.a();    // 'OBJ'
obj.b();    // 'GLOBAL'
new obj.a()  // undefined
new obj.b()  // Uncaught TypeError: obj.b is not a constructor
```

对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。需要注意，定义对象的大括号`{}`是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。

同样，使用call()、apply()、bind()等方法也不能改变箭头函数中this的指向：

```js
var id = 'Global';
let fun1 = () => {
    console.log(this.id)
};
fun1();                     // 'Global'
fun1.call({id: 'Obj'});     // 'Global'
fun1.apply({id: 'Obj'});    // 'Global'
fun1.bind({id: 'Obj'})();   // 'Global'
```



#### 不可作为构造函数

构造函数 new 操作符的执行步骤如下：

1. 创建一个对象
2. 将构造函数的作用域赋给新对象（也就是将对象的__proto__属性指向构造函数的prototype属性）
3. 指向构造函数中的代码，构造函数中的this指向该对象（也就是为这个对象添加属性和方法）
4. 返回新的对象

实际上第二步就是将函数中的this指向该对象。但是由于箭头函数时没有自己的this的，且this指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。



#### 不绑定 arguments

箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是它外层函数的arguments值。



#### 普通函数和箭头函数的区别

* 普通函数中的this指向是运行时绑定的 ; 箭头函数中的this指向是定义时绑定的
* 普通函数有属于自己的this ; 箭头函数没有属于自己的this , 因此箭头函数中的this会自动向上找一个最近的this进行绑定
* 普通函数内有 `arguments` 对象 ; 箭头函数内没有 `arguments` 对象



```js
window.name = '我是外部'

let obj = {
    'name': '我是内部',
    fn: function() {
        console.log(this.name);
    }
}

obj.fn()	// 我是内部
let fn = obj.fn
fn()	// 我是外部
```

**关键：** 普通函数内的 `this` 是运行时绑定的，所以 `this` 指向与函数的所处环境有关



```js
window.name = '我是外部'

let obj = {
    'name': '我是内部',
    fn: () => {
        console.log(this.name);
    }
}

obj.fn()	// 我是外部
let fn = obj.fn
fn()	// 我是外部
```

**关键：** 箭头函数中的 `this` 是定义时绑定的，并且其没有自己的 `this`，所以它会向上寻找一个最近的 `this` 进行绑定。

先来看 `obj` 中的 `fn` 箭头函数 ，其调用了 `this` ，但因其没有属于自己的 `this` ，所以就向上寻找，我们都知道，在JS中，普通函数和对象都有属于自己的 `this` ，因此 `fn` 中的 `this` 就和离它最近的 `obj` 中的 `this` 绑定了



### ...展开运算符

展开运算符本质上是将Map对象转换成数组。

```js
// 拷贝数组
var arr1 = [1, 2, 3]
var arr2 = arr1						// 直接赋值，arr1和arr2指向同一个引用
arr2[1] = 99
console.log(arr1===arr2)  // true
console.log(arr1)         // [1, 99, 3]


var arr1 = [1, 2, 3]
var arr2 = [...arr1]			// 使用展开运算符，就等于新开辟内存来存储arr2
arr2[1] = 99
console.log(arr1===arr2)  // false
console.log(arr1)         // [1, 2, 3]
console.log(arr2)         // [1, 99, 3]
```

```js
// 合并数组
var arr1 = [1, 2, 3]
var arr2 = [6, 7, 8]
arr1 = [...arr1, ...arr2]
console.log(arr1)   // [1, 2, 3, 6, 7, 8]
```



### ?? 空值合并操作符

只有 ?? 左边为 null 或 undefined时才返回右边的值：

```js
const dogName = false; 
const name =  dogName ?? 'default';  // name = false;
```



### ?. 可选链操作符

可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，**不同之处在于，在引用为null 或 undefined 的情况下不会引起错误**，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

```js
const name = (system && system.user && system.user.addr && system.user.addr.province && system.user.addr.province.name) || 'default';

const name = system?.user?.addr?.province?.name || 'default';

// 同样适用于数组
const array = [1, 2, 3];
array?.[5]	// undefined
```



当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链操作符也是很有帮助的。

```js
a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()
```



### BigInt

在 JavaScript 中，数值类型 Number 是 64 位浮点数，所以计算精度和表示范围都有一定限制。而BigInt 可以表示任意大的整数。

```js
let a = BigInt('10');	// 参数可以是字符串或者整数
let b = 10n;
typeof b; // 'bigint'

// 判断变量是否为BigInt类型
typeof 1n === 'bigint'; // true 
Object.prototype.toString.call(10n) === '[object BigInt]';    // true

let max = BigInt(Number.MAX_SAFE_INTEGER);
let max1 = max + 1n
let max2 = max + 2n
max1 === max2   // false
```



注意，BigInt 和 Number 不是严格相等的，但是宽松相等：

```js
10n === 10 // false 
10n == 10  // true 

1n < 2;    // true 
2n > 1;    // true 
2 > 2;     // false 
```





## 模块化

由于代码之间会发生大量交互，如果结构不合理，这些代码就会变得难以维护、难以测试、难以调试。而使用模块化就解决了这些问题，模块化的**特点**如下：

- **可重用性：** 当应用被组织成模块时，可以方便在其他地方重用这些模块，避免编写重复代码，从而加快开发流程；
- **可读性：** 当应用变得越来越复杂时，如果在一个文件中编写所有功能，代码会变得难以阅读。如果使用模块设计应用，每个功能都分布在各自的模块中，代码就会更加清晰、易读；
- **可维护性：** 软件的美妙之处在于进化，从长远来看，我们需要不断为应用增加新的功能。当应用被结构化为模块时，可以轻松添加或删除功能。除此之外，修复错误也是软件维护的一部分，使用模块就可以更快速地定位问题。

模块化是一种将系统分离成独立功能部分的方法，可以将系统分割成独立的功能部分，严格定义模块接口，模块间具有透明性。通过将代码进行模块化分隔，每个文件彼此独立，开发者更容易开发和维护代码，模块之间又能够互相调用和通信，这就是现代化开发的基本模式。



模块化的贯彻执行离不开相应的约定，即规范。这是能够进行模块化工作的重中之重。实现模块化的规范有很多，比如：AMD、RequireJS、CMD、SeaJS、UMD、CommonJS、ES6 Module。除此之外，IIFE（立即执行函数）也是实现模块化的一种方案。

模块化方案：

- **IIFE：** 立即调用函数表达式
- **CommonJS：** Node.js 采用该规范
- **ES 模块：** JavaScript 内置模块系统
- **AMD：** 异步模块加载机制
- **CMD：** 通用模块定义
- **UMD：** 统一模块定义



###  IIFE

在 ECMAScript 6 之前，模块并没有被内置到 JavaScript 中，因为 JavaScript 最初是为小型浏览器脚本设计的。这种模块化的缺乏，导致在代码的不同部分使用了共享全局变量。

```
(function () {
  // 声明私有变量和函数

  return {
      // 声明公共变量和函数
  }
})();
```

上面的代码就是一个返回对象的闭包，这就是我们常说的IIFE（Immediately Invoked Function Expression），即立即调用函数表达式。在该函数中，就创建了一个局部范围。这样就避免了使用全局变量（IIFE 是匿名函数），并且代码单元被封装和隔离。



```js
var module = (function(){
  var age = 20;
  var name = 'JavaScript'
  
  var fn1 = function(){
    console.log(name, age)
  };
  
  var fn2 = function(a, b){
    console.log(a + b)
  };
  
  return {
    age,
    fn1,
    fn2,
  };
})();

module.age;           // 20
module.fn1();         // JavaScript 20
module.fn2(128, 64);  // 192
```



### CommonJS

CommonJS 是社区提出的一种 JavaScript 模块化规范，它是为浏览器之外的 JavaScript 运行环境提供的模块规范，Node.js 就采用了这个规范。

> 注意：
>
> - 浏览器不支持使用 CommonJS 规范；
> - Node.js 不仅支持使用 CommonJS 来实现模块，还支持最新的  ES 模块。

CommonJS 规范加载模块是同步的，只有加载完成才能继续执行后面的操作。不过由于 Node.js 主要运行在服务端，而所需加载的模块文件一般保存在本地硬盘，所以加载比较快，而无需考虑使用异步的方式。



#### 语法

CommonJS 规范规定每个文件就是一个模块，有独立的作用域，对于其他模块不可见，这样就不会污染全局作用域。在 CommonJS 中，可以分别使用 `export` 和 `require` 来导出和导入模块。在每个模块内部，都有一个 `module` 对象，表示当前模块。通过它来导出 API，它有以下属性：

- `exports`：模块导出值。
- `filename`：模块文件名，使用绝对路径；
- `id`：模块识别符，通常是使用绝对路径的模块文件名；
- `loaded`：布尔值，表示模块是否已经完成加载；
- `parent`：对象，表示调用该模块的模块；
- `children`：数组，表示该模块要用到的其他模块；



#### 导出导入

在 CommonJS 中，可以通过 require 函数来导入模块，它会读取、执行 JavaScript 文件，并返回该模块的 exports 对象，该对象只有在模块脚本运行完才会生成。

```js
module.exports.TestModule = function() {
    console.log('exports');
}

exports.TestModule = function() {
    console.log('exports');
}
```

则合两种方式的导出结果是一样的，`module.exports`和`exports`的区别可以理解为：`exports`是`module.exports`的引用，如果在`exports`调用之前调用了`exports=...`，那么就无法再通过`exports`来导出模块内容，除非通过`exports=module.exports`重新设置`exports`的引用指向。

```
const module = require('./MyModule');
```

注意，如果 `require` 的路径没有后缀，会自动按照`.js`、`.json`和`.node`的顺序进行补齐查找。



```js
// 导出
function testModule() {
    console.log('exports');
}
module.exports = testModule;


// 导入
testModule = require('./MyModule');
testModule();
```



```js
// 导出
function testModule() {
    console.log('exports');
}

let name = 'zs';

module.exports = {
  	testModule,
 		name
}


// 导入
const {testModule, name} = require('./MyModule');
testModule();
console.log(name)
```





#### 加载过程

在  CommonJS 中，`require` 的加载过程如下：

1. 优先从缓存中加载；
2. 如果缓存中没有，检查是否是核心模块，如果是直接加载；
3. 如果不是核心模块，检查是否是文件模块，解析路径，根据解析出的路径定位文件，然后执行并加载；
4. 如果以上都不是，沿当前路径向上逐级递归，直到根目录的`node_modules`目录。



#### 特点和优缺点

CommonJS 规范具有以下特点：

- 文件即模块，文件内所有代码都运行在独立的作用域，因此不会污染全局空间；
- 模块可以被多次引用、加载。第一次被加载时，**会被缓存**，之后都从缓存中直接读取结果。
- 加载某个模块，就是引入该模块的 `module.exports` 属性，该属性**输出的是值拷贝**，一旦这个值被输出，模块内再发生变化不会影响到输出的值。
- 模块加载顺序按照代码引入的顺序。



CommonJS 的优点：

- 使用简单
- 很多工具系统和包都是使用 CommonJS 构建的；
- 在 Node.js 中使用，Node.js 是流行的 JavaScript 运行时环境。

CommonJS 的缺点

- 可以在 JavaScript 文件中包含一个模块；
- 如果想在 Web 浏览器中使用它，则需要额外的工具；
- 本质上是同步的，在某些情况下不适合在 Web 浏览器中使用。



###  ES 模块

ES Module把一个文件当作一个模块，每个模块有自己的独立作用域。

模块和经典 JavaScript 脚本略有不同：

* 模块默认启用**严格模式，**比如分配给未声明的变量会报错
* 模块有一个词法顶级作用域。
* 模块中的 this 并不引用全局 this，而是 undefined。（如果需要访问全局 this，可以使用 globalThis)
* 新的静态导入和导出语法仅在模块中可用，并不适用于经典脚本。
* 顶层 await 在模块中可用，但在经典 JavaScript 脚本中不可用；
* await 不能在模块中的任何地方用作变量名，经典脚本中的变量可以在异步函数之外命名为 await；
* JavaScript 会提升 import 语句。因此，可以在模块中的任何位置定义它们。

CommonJS 和 AMD 都是在运行时确定依赖关系，即运行时加载，CommonJS 加载的是拷贝。而 ES 模块是在编译时就确定依赖关系，所有加载的其实都是引用，这样做的好处是可以执行静态分析和类型检查。



#### 导入导出

当导出模块代码时，需要在其前面添加 export 关键词。导出内容可以是变量、函数或类。任何未导出的代码都是模块私有的，无法在该模块之被外访问。ES 模块支持两种类型的导出：

* export default
  * 返回的是一个对象，该对象中包含模块要导出的属性和方法。通过`对象.属性/方法` 来调用导入的方法或属性
  * `export default` 在一个模块文件中只能使用一次。
* export
  * 导入时需要通过对象解构赋值方式来导入，调用时直接使用导入的方法名或属性名。
  * 可以只选择需要导入的模块，就不会将不需要的内容也引入进来，优化体积



```js
// 模块A.js
function mapState() {
  console.log('111---mapState')
}

function mapFilter() {
  console.log('222---mapFilter')
}

var obj = {
  mapState,
  mapFilter
}

export default obj


// -----------------------------------
// main.js
import obj from '@/module/a'	// 导入
console.log(obj)	// 返回值：是一个对象
obj.mapState()		// 调用属性或方法：通过对象.方法名/属性名 调用
```



```js
// 模块A.js
function mapState() {
  console.log('111---mapState')
}

function mapFilter() {
  console.log('222---mapFilter')
}

export {
  mapState,
  mapFilter
}


// -----------------------------------
// main.js
import {mapFilter, mapState} from '@/module/a'	// 导入，可以只选择需要的属性和方法
console.log(mapState, mapFilter)	// 返回值：就是通过对象解构得到的属性或方法
mapState()												// 调用：直接通过名字调用
```



可以使用 as 关键字来重命名需要暴露出的变量或方法，经过重命名后同一变量可以多次暴露出去：

```js
const first = 'test';
export {first as second};
```

可以使用 as 关键字来将导入的变量/函数重命名：

```js
import { fn as fn1 } from './profile';
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

**注意：** `import *` 会忽略default输出



#### 示例







```js
// utils.js

// 1. 默认导出（只能有一个）
export default function mainFunc() {
  console.log("默认导出的函数");
}

// 2. 命名导出（可以有多个）
export const PI = 3.14159;

export function helper() {
  console.log("命名导出的辅助函数");
}
```

```js
// 导入默认导出（可以任意命名）
import mainFunc from './utils';  // 默认导出的名称可以自定义
mainFunc();  // 输出："这是默认导出的函数"
```

```js
// 导入命名导出（必须用原名或别名）
import { PI, helperFunction } from './utils';
console.log(PI);  // 3.14159
helperFunction();  // 输出："这是一个命名导出的辅助函数"
```

```js
// 同时导入默认导出和命名导出
import mainFunc, { PI, helperFunction } from './utils';
mainFunc();  // 默认导出
console.log(PI);  // 命名导出
helperFunction();  // 命名导出
```

```js
import * as tool from './utils';

// 必须用 tool.default 访问默认导出，不能直接 tool.mainFunc。
tool.default();  // 调用默认导出的函数
console.log(tool.PI);  // 3.14159
tool.helper();  // 调用命名导出的函数

// 如果觉得 tool.default 不够直观，可以解构
import * as tool from './utils';
const mainFunc = tool.default;  // 单独提取默认导出
mainFunc();
```



* **默认导出** → `tool.default`（因为 `export default` 会被挂载到 `default` 属性上）
* **命名导出** → `tool.PI`、`tool.helper()`（直接访问）

如果模块既有 `export default` 又有 `export`，`import * as tool` 会这样组织：

```js
tool = {
  default: mainFunc,  // 默认导出
  PI: 3.14159,       // 命名导出
  helper: helper     // 命名导出
}
```



总结：

* `import * as tool from './utils'` 可以导入所有导出
* 默认导出 → `tool.default`，命名导出 → `tool.xxx`
* 适用于动态访问或批量导入，但通常更推荐显式导入（`import { PI }`）以提高可读性





## Promise

Promise 是一种处理异步代码（而不会陷入回调地狱）的方式。

Promise 对象的特点:

* 对象的状态不受外界影响。`Promise` 对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Resolved`（已完成）和`Rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
* 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise` 对象的状态改变，只有两种可能：
  * 从 `Pending` 变为 `Resolved`
  * 从 `Pending` 变为 `Rejected`。



`Promise` 的缺点:

* 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。
* 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。
* 当处于`Pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）



### 用法

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。作用如下:

* `resolve()` 将Promise对象的状态从Pending变为Resolved，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
* `reject()` 将Promise对象的状态从Pending变为Rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

```js
new Promise(function (resolve, reject) {})
```



```js
var promise = new Promise(function(resolve, reject) {
  // 异步操作，例如从服务器获取数据

  if (/* 判断异步操作是否成功 */){
    resolve(value);		// 成功
  } else {
    reject(error);		// 失败
  }
});

// Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
promise.then(function(value) {
  // 成功的回调
}, function(error) {
  // 失败的回调
});
```



`then` 方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。其中，第二个函数是可选的，不一定要提供。

**注意: 只有当Promise的状态变为resolved或者rejected时，then方法才会被调用。**



### 示例1

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);	// 'done'
});
```

上面代码中，`timeout`方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（`ms`参数）以后，Promise实例的状态变为Resolved，就会触发`then`方法绑定的回调函数。



### 示例2

```js
function getImage(src) {
	// 在函数中返回一个 Promise 对象
  return new Promise(function (resolve, reject) {
    let img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject("这是错误的内容");
    };
    img.src = src;
  });
}

// then(执行成功时的处理函数， 执行失败时的处理函数)
// then(执行成功时的处理函数).catch(执行失败时的处理函数)

getImage("images/1.jpg").then(
  function (img) {
    console.log(img);
  },
  function (error) {
    console.log(error);
  }
);

getImage("images/11.jpg")
  .then(function (img) {
    console.log(img);
  })
  .catch(function (error) {
    console.log(error);
  });
```





### 执行顺序

Promise 被创建后就会立即执行，并且调用resolve或reject后不会终结Promise中参数函数的执行。

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise1');
  resolve('完成');
  console.log('Promise2');
});

promise.then(function(value) {
  console.log(value);
});

console.log('Hi!');

// 输出结果:
// Promise1
// Promise2
// Hi!
// Resolved
```

需要记住，任何传递给 then/catch/finally 的回调都是由微任务队列异步处理的。 它们是微任务，优先于事件和计时器等宏任务。



### Promise.prototype.then()

Promise实例具有`then`方法，也就是说，`then`方法是定义在原型对象Promise.prototype上的。它的作用是为Promise实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

`then`方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。



```js
let promise = new Promise(resolve => {
	resolve('abc')
}).then(value => {
	// 返回一个新的Promise
	return new Promise(resolve => {
		resolve(value.toUpperCase())
	})
})
.then(value => {
	console.log(value)	// ABC
})
```



### Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

当 promise 链中的任何内容失败并引发错误或拒绝 promise 时，则控制权会转到链中最近的 `catch()` 语句。



注意:

* 如果Promise状态已经变成`Resolved`，再抛出错误是无效的。
* 如果已经在`then`中处理了错误，那么就不会再执行`catch`
* `catch`方法返回的还是一个Promise对象，因此后面还可以接着调用`then`方法。

```javascript
new Promise((resolve, reject) => {
  throw new Error('错误')
}).catch(err => {
  console.error(err)
})

// 或

new Promise((resolve, reject) => {
  reject('错误')
}).catch(err => {
  console.error(err)
})
```

**级联错误**：如果在 `catch()` 内部引发错误，则可以附加第二个 `catch()`来处理，依此类推。

```javascript
new Promise((resolve, reject) => {
  throw new Error('错误')
})
  .catch(err => {
    throw new Error('错误')
  })
  .catch(err => {
    console.error(err)
  })
```



### 链式Promise示例

Promise 可以返回另一个 promise，从而创建一个 promise 链。

```js
getImage("images/1.jpg")
  .then(function (img) {
    console.log(img);
    return getImage("images/2.jpg");
  })
  .then(function (img) {
    console.log(img);
    return getImage("images/3.jpg");
  })
  .then(function (img) {
    console.log(img);
  });
```



链式 promise 的一个很好的示例是 Fetch API，可以用于获取资源，且当资源被获取时将 promise 链式排队进行执行。

Fetch API 是基于 promise 的机制，调用 `fetch()` 相当于使用 `new Promise()` 来定义 promsie。

```javascript
// 链式 promise 的示例
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))
}

const json = response => response.json()

fetch('/todos.json')
  .then(status)    // 注意，`status` 函数实际上在这里被调用，并且同样返回 promise，
  .then(json)      // 这里唯一的区别是的 `json` 函数会返回解决时传入 `data` 的 promise，
  .then(data => {  // 这是 `data` 会在此处作为匿名函数的第一个参数的原因。
    console.log('请求成功获得 JSON 响应', data)
  })
  .catch(error => {
    console.log('请求失败', error)
  })
```



### 其他方法

#### Promise.finally()

`finally`方法用于指定不管Promise对象最后状态如何，都会执行的操作。常用来释放资源。

```js
new Promise((resolve, reject) => {
	resolve()
})
.finally(() => {
	console.log('finally')
})
```



#### Promise.all()

Promise.all() 中可以传递一个数组作为参数，数组中放入要执行的Promise异步函数。

当all()中的异步全部完成后，会以数组的形式，统一返回其Promise中resolve()第一个参数的内容。

Promise.all 如果某一个失败，就会抛出第一个失败的错误。

```js
Promise.all([
  getImage("images/1.jpg"),
  getImage("images/2.jpg"),
  getImage("images/3.jpg"),
]).then(function (list) {
  console.log(list);	// [img, img, img]
});
```



#### Promise.any()

Promise.any() 中可以传递一个数组作为参数，数组中放入要执行的Promise异步函数。

Promise.any 总是返回第一个成功的 Promise，无论是否发生任何拒绝。相反，如果传递给 Promise.any 的所有 Promise 都被拒绝，那就返回 AggregateError 对象。 

```js
Promise.any ([
  getImage("images/1.jpg"),
  getImage("images/2.jpg"),
  getImage("images/3.jpg"),
]).then(function (res) {
  console.log(res);
});
```



#### Promise.allSettled()

Promise.allSettled() 的语法及参数和 Promise.all() 类似，可以传递一个数组作为参数，数组中放入要执行的Promise异步函数。

唯一的不同在于，执行完之后不会失败，也就是说当 Promise.allSettled 全部处理完成后，我们可以拿到每个 Promise 的状态，而不管其是否处理成功。

```js
Promise.allSettled([
  getImage("images/1.jpg"),
  getImage("images/2.jpg"),
  getImage("images/3.jpg"),
]).then(function (list) {
  console.log(list);	// [] 最后返回的是一个数组，记录传进来的参数中每个 Promise 的返回值，
});
```



#### Promise.race()

race()用于同时执行多个异步，如果哪个先完成就直接结束，处理这个先完成的。无论完成的第一个promise是成功还是失败。

```js
Promise.race([
  getImage("images/2.jpg"),
  getImage("images/1.jpg"),
  getImage("images/3.jpg"),
]).then(function (img) {
  // race 就是赛跑，这里只返回最先加载的数据
  // 谁的异步最先完成，就返回最先完成的异步
  console.log(img); // <img src="images/2.jpg">
});
```



#### 区别

all 和 race 异步组都是并列开跑，all是所有的都跑完了才执行then，race谁第一个跑完就执行谁，后面的就不执行了。

Promise.all 如果某一个失败，就会抛出第一个失败的错误。而 Promise.any 总是返回第一个成功的 Promise，无论是否发生任何拒绝。







### 常见的错误

#### Uncaught TypeError: undefined is not a promise

如果在控制台中收到 `Uncaught TypeError: undefined is not a promise` 错误，则请确保使用 `new Promise()` 而不是 `Promise()`。

******

#### UnhandledPromiseRejectionWarning

这意味着调用的 promise 被拒绝，但是没有用于处理错误的 `catch`。 在 `then` 之后添加 `catch` 则可以正确地处理。



### 总结

Promise 是异步编程的一种解决方案，其实就是一个构造函数，自身上有all、resolve、reject这几个方法，原型上有then、catch等方法。

Promise 对象有三种状态，pending、resolved、rejected。对象的状态不受外界影响，且一旦状态改变，就不会再变。

在then方法中接受两个回调函数来处理Promise的结果，第一个函数是处理成功的回调，第二个函数是处理失败的回调(可选)。还可以在回调中返回一个新的Promise对象，并在下一个then方法中进行处理，形成多个then方法的链式操作。



### TODO 实现 Promise



### 参考

[阮一峰-ES6入门](https://es6.ruanyifeng.com/#docs/promise)



## TODO async/await

只需在 function 前加上 async 前缀，就可以让函数返回一个 Promise。

```js
async function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}

toUppercase("hello")
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message))
  .finally(() => console.log("Always runs!"));
```









## Symbol

Symbol（符号）是 ES6 新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

符号就是用来创建唯一记号，进而用作非字符串形式的对象属性。

* `Symbol()` ：初始化符号
* `Symbol.for(str)` ：创建全局符号
* `Symbol.keyFor(symbol)` ：查询全局注册表
* description 属性：用来直接访问描述



### 基本用法

符号需要使用 `Symbol()` 函数初始化。

调用 Symbol() 函数时，也可以传入一个字符串参数作为对符号的描述，将来可以通过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全无关。

```js
let sym = Symbol()
console.log(typeof sym) // symbol

let otherSymbol = Symbol()
console.log(sym == otherSymbol) // false

let fooSymbol = Symbol('foo')
console.log(fooSymbol)  // Symbol(foo)

fooSymbol.description;  // foo
```



Symbol() 函数不能与 new 关键字一起作为构造函数使用。这样做是为了避免创建符号包装对象。

如果你确实想使用符号包装对象，可以借用 Object() 函数：

```js
// 会报错
// let newSym = new Symbol() // TypeError: Symbol is not a constructor

let mySymbol = Symbol()
let symObj = Object(mySymbol)
console.log(typeof symObj)  // object
```



### 全局符号注册表

如果运行时的不同部分需要共享和重用符号实例，那么可以用一个字符串作为键，在全局符号注册表中创建并重用符号。

为此，需要使用 `Symbol.for()` 方法。全局注册表中的符号必须使用字符串键来创建，因此作为参数传给 Symbol.for() 的任何值都会被转换为字符串。此外，注册表中使用的键同时会被用作符号描述。

```js
let sym = Symbol.for('foo') // 创建新符号
let fooSymbol = Symbol.for('foo') // 重用已有符号
console.log(sym == fooSymbol) // true

let otherSymbol = Symbol.for()
console.log(otherSymbol)  // Symbol(undefined)
console.log(sym)  // Symbol(foo)
```

Symbol.for() 对每个字符串键都执行幂等操作。第一次使用某个字符串调用时，它会检查全局运行时注册表，发现不存在对应的符号，于是就会生成一个新符号实例并添加到注册表中。后续使用相同字符串的调用同样会检查注册表，发现存在与该字符串对应的符号，然后就会返回该符号实例。



即使采用相同的符号描述，在全局注册表中定义的符号跟使用 Symbol() 定义的符号也并不相同。

```js
let sym = Symbol('foo')
let fooSymbol = Symbol.for('foo')
console.log(sym == fooSymbol) // false
```



可以使用 `Symbol.keyFor()` 来查询全局注册表，这个方法接收符号，返回该全局符号对应的字符串键。如果查询的不是全局符号，则返回 undefined。

如果传给 Symbol.keyFor() 的不是符号，则该方法会抛出 TypeError。

```js
let s = Symbol.for('foo')
console.log(Symbol.keyFor(s)) // foo

let s2 = Symbol('bar')
console.log(Symbol.keyFor(s2))  // undefined

let s3 = Symbol.for()
console.log(Symbol.keyFor(s3))  // undefined

// 报错
//Symbol.keyFor(123)  // TypeError: 123 is not a symbol
```



### 使用符号作为属性

凡是可以使用字符串或数值作为属性的地方，都可以使用符号。

```js
let s1 = Symbol('foo'),
  s2 = Symbol('bar'),
  s3 = Symbol('baz'),
  s4 = Symbol('other');

let o = {
  [s1]: 'foo val'
}
o[s2] = 'bar val'

console.log(o)  // { [Symbol(foo)]: 'foo val', [Symbol(bar)]: 'bar val' }

Object.defineProperty(o, s2, {value: 'bar2 value'})
console.log(o)  // {Symbol(foo): 'foo val', Symbol(bar): 'bar2 value'}

Object.defineProperties(o, {
  [s3]: {value: 'baz value'},
  [s4]: {value: 'other value'}
})
console.log(o)  // {Symbol(foo): 'foo val', Symbol(bar): 'bar2 value', Symbol(baz): 'baz value', Symbol(other): 'other value'}

```



Symbol定义的对象属性不能使用for...in遍历循环，但是可以使用Reflect.ownKeys 来获取对象的所有键名。

* `Object.getOwnPropertySymbols()` ：返回对象实例的符号属性数组
* `Object.getOwnPropertyNames()` ：返回对象实例的常规属性数组
* `Object.getOwnPropertyDescriptors()` ：返回同时包含常规和符号属性描述符的对象
* `Reflect.ownKeys()` ：返回两种类型的键

```js
let s1 = Symbol('foo'),
  s2 = Symbol('bar');

let o = {
  [s1]: 'foo val',
  [s2]: 'bar val',
  baz: 'baz val',
  qux: 'qux val',
}

console.log(Object.getOwnPropertySymbols(o))  // [ Symbol(foo), Symbol(bar) ]

console.log(Object.getOwnPropertyNames(o))    // [ 'baz', 'qux' ]

console.log(Object.getOwnPropertyDescriptors(o))  // {baz: {…}, qux: {…}, Symbol(foo): {…}, Symbol(bar): {…}}

console.log(Reflect.ownKeys(o)) // [ 'baz', 'qux', Symbol(foo), Symbol(bar) ]
```



因为符号属性是对内存中符号的一个引用，所以直接创建并用作属性的符号不会丢失。但是，如果没有显式的保存对这些属性的引用，那么必须遍历对象的所有符号属性才能找到相应的属性键：

```js
let o = {
  [Symbol('foo')]: 'foo val',
  [Symbol('bar')]: 'bar val'
}

let barSymbol = Object.getOwnPropertySymbols(o).find(symbol=> 
  symbol.toString().match(/bar/)
)

console.log(o)  // { [Symbol(foo)]: 'foo val', [Symbol(bar)]: 'bar val' }
console.log(barSymbol)  // Symbol(bar)
```





## 集合 Set

ES6提供了新的数据结构 Set（集合）。它类似于数组，但是成员的值都是唯一的，集合实现了 iterator 接口，所以可以使用扩展运算符和 for…of 进行遍历。

Set的属性和方法：

| **属性和方法** | **概述**                             |
| :------------- | :----------------------------------- |
| size           | 返回集合的元素个数                   |
| add(value)     | 增加一个新的元素，返回当前的集合     |
| delete(value)  | 删除元素，返回布尔值                 |
| has(value)     | 检查集合中是否包含某元素，返回布尔值 |
| clear()        | 清空集合，返回undefined              |



```js
//创建一个空集合
let s = new Set();
//创建一个非空集合
let s1 = new Set([1,2,3,1,2,3]);
//返回集合的元素个数
console.log(s1.size);       // 3
//添加新元素
console.log(s1.add(4));     // {1,2,3,4}
//删除元素
console.log(s1.delete(1));  //true
//检测是否存在某个值
console.log(s1.has(2));     // true
//清空集合
console.log(s1.clear());    //undefined
```



由于集合中元素的唯一性，所以在实际应用中，可以使用set来实现数组去重：

```js
let arr = [1,2,3,2,1]
Array.from(new Set(arr))  // {1, 2, 3}
```



可以通过set来求两个数组的交集和并集：

```js
// 模拟求交集 
let intersection = new Set([...set1].filter(x => set2.has(x)));

// 模拟求差集
let difference = new Set([...set1].filter(x => !set2.has(x)));
```



用以下方法可以进行数组与集合的相互转化：

```js
// Set集合转化为数组
const arr = [...mySet]
const arr = Array.from(mySet)

// 数组转化为Set集合
const mySet = new Set(arr)
```





## WeakSet

类似于 WeakMap，WeakSet 对象可以让你在一个集合中保存对象的弱引用，在 WeakSet 中的对象只允许出现一次。

```js
let ws = new WeakSet();
let obj = {};

ws.add(obj);
ws.has(obj);
ws.delete(obj);
```





## Map

ES6提供了Map数据结构，它类似于对象，也是键值队的集合，但是它的键值的范围不限于字符串，可以是任何类型（包括对象）的值，也就是说， Object 结构提供了“ 字符串—值” 的对应， Map 结构提供了“ 值—值” 的对应， 是一种更完善的 Hash 结构实现。如果需要“ 键值对” 的数据结构， Map 比 Object 更合适。Map也实现了iterator接口，所以可以使用扩展运算符和 for…of 进行遍历。

Map的属性和方法：

| **属性和方法**  | **概述**                            |
| :-------------- | :---------------------------------- |
| size            | 返回Map的元素个数                   |
| set(key, value) | 增加一个新的元素，返回当前的Map     |
| get(key)        | 返回键名对象的键值                  |
| has(key)        | 检查Map中是否包含某元素，返回布尔值 |
| clear()         | 清空Map，返回undefined              |



```js
//创建一个空 map
let m = new Map();
//创建一个非空 map
let m2 = new Map([
 ['name', 'hello'],
]);
//获取映射元素的个数
console.log(m2.size);          // 1
//添加映射值
console.log(m2.set('age', 6)); // {"name" => "hello", "age" => 6}
//获取映射值
console.log(m2.get('age'));    // 6
//检测是否有该映射
console.log(m2.has('age'));    // true
//清除
console.log(m2.clear());       // undefined
```



需要注意， 只有对同一个对象的引用， Map 结构才将其视为同一个键：

```js
let map = new Map(); 
map.set(['a'], 555); 
map.get(['a']) // undefined
```

上面代码的set和get方法， 表面是针对同一个键， 但实际上这是两个值， 内存地址是不一样的， 因此get方法无法读取该键， 所以会返回undefined。

由上可知， Map 的键实际上是跟内存地址绑定的， 只要内存地址不一样， 就视为两个键。这就解决了同名属性碰撞的问题，在扩展库时， 如果使用对象作为键名， 就不用担心自己的属性与原来的属性同名。

如果 Map 的键是一个简单类型的值（ 数字、 字符串、 布尔值）， 则只要两个值严格相等， Map 将其视为一个键， 包括0和 - 0。另外， 虽然NaN不严格相等于自身， 但 Map 将其视为同一个键。

```js
let map = new Map(); 
map.set(NaN, 123); 
map.get(NaN) // 123 
map.set(-0, 123); 
map.get(+0) // 123 
```



## WeakMap

WeakMap 就是一个 Map，只不过它的所有 key 都是弱引用，意思就是 WeakMap 中的东西垃圾回收时不考虑，使用它不用担心内存泄漏问题。

需要注意的是，WeakMap 的所有 key 必须是对象。

属性和方法：

| **属性和方法**  | **概述**                                        |
| :-------------- | :---------------------------------------------- |
| set(key, value) | 增加一个新的元素，返回当前 WeakMap 对象         |
| get(key)        | 返回指定元素                                    |
| has(key)        | 是否包含某元素，返回布尔值                      |
| delete(key)     | 删除指定元素，成功删除返回 true，否则返回 false |



```js
let w = new WeakMap();
let o1 = {};

w.set(o1, 50);
w.get(o1);  // 50
w.has(o1);  // true
w.delete(o1); // true
```





## 迭代器/生成器

迭代器通过一次消费一个项目列表来提高效率，类似于数据流。生成器是一种能够暂停执行的特殊函数。调用生成器允许以块的形式（一次一个）生成数据，而无需先将其存储在列表中。

**如果需要为封装良好的自定义数据结构提供原生迭代功能，就考虑使用迭代器。**



### 迭代器和可迭代对象

数组、字符串、映射、集合是 JavaScript 中的可迭代对象。普通对象是不可迭代的。

迭代器允许每次访问数据集合的一个元素，当指针指向数据集合最后一个元素时，迭代器便会退出。



可以通过 `Symbol.iterator` 给对象设置默认的遍历器，无论什么时候对象需要被遍历，执行它的 `@@iterator` 方法便可以返回一个获取值的迭代器。

```js
let arr = [11, 22, 33];
var itr = arr[Symbol.iterator]();

itr.next();
itr.next();
```



#### 定义迭代器

```js
const favouriteMovies = {
  a: "哈利波特",
  b: "指环王",
  c: "尖峰时刻",
  d: "星际穿越",
  e: "速度与激情",
};

// 这里使用 Symbol.iterator() 来定义迭代器。任何具有 Symbol.iterator 键的结构都是可迭代的。
favouriteMovies[Symbol.iterator] = function () {
  const ordered = Object.values(this).sort((a, b) => a - b);
  let i = 0;
  return {
    next: () => ({
      done: i >= ordered.length,
      value: ordered[i++],
    }),
  };
};

for (const v of favouriteMovies) {
  console.log(v);
}
```



可迭代对象具有以下行为：

1. 当 `for..of` 循环开始时，它首先查找错误。如果未找到，则它会访问方法和定义该方法的对象。
2. 以 `for..of` 循环方式迭代该对象。
3. 使用该输出对象的 `next()` 方法来获取要返回的下一个值。
4. 返回的值的格式为 `done:boolean`, `value: any`。返回 `done:true` 时循环结束。



**修改数组为迭代器对象**

```js
const favourtieMovies = [
  "哈利波特",
  "指环王",
  "尖峰时刻",
  "星际穿越",
  "速度与激情",
];

const iterator = favourtieMovies[Symbol.iterator]();

iterator.next();  // { value: '哈利波特', done: false }
iterator.next();  // { value: '指环王', done: false }
iterator.next();  // { value: '尖峰时刻', done: false }
iterator.next();  // { value: '星际穿越', done: false }
iterator.next();  // { value: '速度与激情', done: false }
iterator.next();  // { value: undefined, done: true }
```

next() 方法将返回迭代器的结果。它包括两个值：**集合中的元素**和**完成状态**。可以看到，当遍历完成后，即使访问数组外的元素，也不会抛出错误。它只会返回一个具有 `undefined` 值和完成状态为 `true` 的对象。



#### 例子

创建一个 LeapYear 对象，该对象返回范围为 (start, end) 的闰年列表，并在后续闰年之间设置间隔。

```js
class LeapYear {
  constructor(start = 2020, end = 2040, interval = 4) {
    this.start = start;
    this.end = end;
    this.interval = interval;
  }
  [Symbol.iterator]() {
    let nextLeapYear = this.start;
    return {
      next: () => {
        if (nextLeapYear <= this.end) {
          let result = { value: nextLeapYear, done: false };
          nextLeapYear += this.interval;
          return result;
        }
        return { value: undefined, done: true };
      },
    };
  }
}

let leapYears = new LeapYear();
for (const leapYear of leapYears) {
  console.log(leapYear);	// 2020 2024 ... 2040
}
```



####  异步迭代器

JavaScript 中的异步迭代对象是实现 `Symbol.asyncIterator` 的对象：

```js
const asyncIterable = {
  [Symbol.asyncIterator]: function() {
 
  }
};
```

我们可以将一个函数分配给 `[Symbol.asyncIterator]` 以返回一个迭代器对象。迭代器对象应符合带有 `next()` 方法的迭代器协议（类似于同步迭代器）。



```js
const asyncIterable = {
  [Symbol.asyncIterator]: function() {
    let count = 0;

    return {
      next() {
        count++;
        if (count <= 3) {
          return Promise.resolve({ value: count, done: false });
        }

        return Promise.resolve({ value: count, done: true });
      }
    };
  }
};

const go = asyncIterable[Symbol.asyncIterator]();
go.next().then(iterator => console.log(iterator.value));
go.next().then(iterator => console.log(iterator.value));


// 也可以使用 for await...of 来对异步迭代对象进行迭代：
async function consumer() {
  for await (const asyncIterableElement of asyncIterable) {
    console.log(asyncIterableElement);
  }
}

consumer();
```





### 生成器函数

JavaScript 中的生成器函数是一种特殊类型的函数。它可以随意暂停和恢复，它返回一个可迭代 `Generator` 对象。为了创建一个生成器函数，需要在 function 关键字后面加上一个 `*`：

```js
function* generate() {

}

function *generate() { }

const generatorFunction = function* () {}
```



#### 迭代器对象

生成器函数的返回值是一个迭代器对象。迭代器对象方法和状态：

下面是迭代器对象的**方法**：

- `next()`：返回生成器中的后面的值；
- `return()`：在生成器中返回一个值并结束生成器；
- `throw()`：抛出错误并结束生成器。

下面是迭代器对象的**状态**：

- `suspended`：生成器已停止执行但尚未终止。
- `closed`：生成器因遇到错误、返回或遍历所有值而终止。



要从生成器中提取值，可以使用两种方法：

- 在迭代器对象上调用 `next()` ，该方法返回一个对象，其包含两个属性：
  - `value`：当前步骤的值；
  - `done`：布尔值，指示生成器中是否有更多值
- 使用 `for...of` 进行迭代

```js
function* generate() {
  // yield 可以暂停生成器函数并返回 yield 之后的值
  yield 33;
  yield 99;
}
const go = generate();	// go 就是生成的迭代器对象

const firstStep = go.next().value;  // 33
const secondStep = go.next().value; // 99
const threeStep = go.next().value;  // undefined

// for of 进行迭代
for (const value of go) {
  console.log(value)
}

// 扩展运算符也可用于将生成器的值分配给数组
const values = [...go]  // // [33, 99]

// 还可以从迭代结果中解构值
const [a, b]= go;
console.log(a); // 33
console.log(b); // 99
```



#### 关闭生成器

生成器可以通过遍历其所有值将其 `done` 属性设置为 `true` 并将其状态设置为 `closed` 。除此之外，还有两种方法可以立即关闭生成器：使用 `return()` 方法和使用 `throw()` 方法。

```js
function* generatorFunction() {
  yield 'One'
  yield 'Two'
  yield 'Three'
}

const generator = generatorFunction()

generator.next()	// {value: "Neo", done: false}
generator.return('Return！')	// {value: "Return！", done: true}
generator.next()	// {value: undefined, done: true}
```

使用 `return()`，生成器可以在任何时候终止，就像在函数体中的 `return` 语句一样。可以将参数传递给 `return()`，或将其留空以表示未定义的值。



#### 在生成器中传递值

除了产生值之外，生成器还可以使用 `next()` 中的值。在这种情况下，`yield` 将包含一个值。

需要注意，调用的第一个 `next()` 不会传递值，而只会启动生成器。为了证明这一点，可以记录 `yield` 的值并使用一些值调用 `next()` 几次。

```js
function* generatorFunction() {
  console.log(yield)
  console.log(yield)

  return 'End'
}

const generator = generatorFunction()

generator.next()
generator.next(100)
generator.next(200)
```



除此之外，也可以为生成器提供初始值。

```js
function* generatorFunction(value) {
  while (true) {
    value = yield value * 10
  }
}

const generator = generatorFunction(0)

for (let i = 0; i < 5; i++) {
  console.log(generator.next(i).value)
}
```

处理启动生成器的另一种方法是将生成器包装在一个函数中，该函数将会在执行任何其他操作之前调用 `next()` 一次。



#### 异步生成器

同步生成器函数和异步生成器函数的区别在于，后者从迭代器对象返回一个异步的、基于 Promise 的结果。

要想创建异步生成器函数，需要声明一个带有星号 * 的生成器函数，前缀为 `async` 。



异步生成器函数不会像常规函数那样在一步中计算出所有结果。相反，它会逐步提取值。我们可以使用两种方法从异步生成器解析 Promise：

- 在迭代器对象上调用 `next()`；
- 使用 `for await...of` 异步迭代。`for await...of` 非常适合提取非有限数据流。

```js
async function* asyncGenerator() {
  yield 'One';
  yield 'Two';
}

const go = asyncGenerator();
go.next().then(iterator => console.log(iterator.value));
go.next().then(iterator => console.log(iterator.value));

async function consumer() {
  for await (const value of asyncGenerator()) {
    console.log(value);
  }
}
consumer();
```





### 异常处理

生成器也可以接受来自调用者的值和异常。除了 next()，从生成器返回的迭代器对象还有一个 throw() 方法。使用这种方法，就可以通过向生成器中注入异常来停止程序：

```js
function* generate() {
  yield 33;
  yield 99;
}
const go = generate();

const firstStep = go.next().value;  // 33
go.throw(Error("Tired of iterating!"));
const secondStep = go.next().value; // 不会执行
```



要捕获此类错误，可以使用 try/catch 将代码包装在生成器中：

```js
function* generate() {
  try {
    yield 33;
    yield 99;
  } catch (error) {
    console.error(error.message);
  }
}
const go = generate();

const firstStep = go.next().value; // 33
go.throw(Error("Tired of iterating!"));
const secondStep = go.next().value; // undefined
```



**生成器函数也可以向外部抛出异常：**

```js
function* generate() {
  yield 33;
  yield 99;
  throw Error("Tired of iterating!");
}

try {
  for (const value of generate()) {
    console.log(value);
  }
} catch (error) {
  console.error(error.message);
}
```



### yield 委托

除了常规的 `yield` 运算符之外，生成器还可以使用 `yield*` 表达式将更多值委托给另一个生成器。当在生成器中遇到 `yield*` 时，它将进入委托生成器并开始遍历所有 `yield` 直到该生成器关闭。这可以用于分离不同的生成器函数以在语义上组织代码，同时仍然让它们的所有 `yield` 都可以按正确的顺序迭代。

```js
function* delegate() {
  yield 3
  yield 4
}

function* begin() {
  yield 1
  yield 2
  yield* delegate()
}

const generator = begin()

for (const value of generator) {
  console.log(value)  // 1 2 3 4
}
```

`yield*` 还可以委托给任何可迭代的对象，例如 Array 或 Map。`yield` 委托有助于组织代码，因为生成器中任何想要使用 `yield` 的函数也必须是一个生成器。



### 使用场景

很多开发人员认为生成器函数视为一种奇特的 JavaScript 功能，在现实中几乎没有应用。在大多数情况下，确实用不到生成器。

**生成器的优点：**

- **惰性求值**：除非需要，否则不计算值。它提供按需计算。只有需要它时，`value` 才会存在。
- **内存效率高**：由于惰性求值，生成器的内存效率非常高，因为它不会为预先生成的未使用值分配不必要的内存位置。
- **更简洁的代码**：生成器提供更简洁的代码，尤其是在异步行为中。

生成器在对性能要求高的场景中有很大的用处。特别是，它们适用于以下场景：

- 处理大文件和数据集。
- 生成无限的数据序列。
- 按需计算昂贵的逻辑。





## 异步编程

同步和异步的概念：

- **同步：** 在执行某段代码时，在没有得到返回结果之前，其他代码暂时是无法执行的，但是一旦执行完成拿到返回值，即可执行其他代码。也就是说，在此段代码执行完未返回结果之前，会阻塞之后的代码执行，这样的情况称为同步。
- **异步：** 当某一代码执行异步过程调用发出后，这段代码不会立刻得到返回结果。而是在异步调用发出之后，一般通过回调函数处理这个调用之后拿到结果。异步调用发出后，不会影响阻塞后面的代码执行，这样的情况称为异步。



JavaScript 是单线程的，如果代码同步执行，就可能会造成阻塞；而如果使用异步则不会阻塞，不需要等待异步代码执行的返回结果，可以继续执行该异步任务之后的代码逻辑。

那为什么单线程的JavaScript还能实现异步呢？它只是把一些操作交给了其他线程处理，然后采用了事件循环的机制来处理返回结果。



实现异步的方式：

* 回调函数：例如：定时器、事件监听、网络请求、读取文件等
* Promise：可以减少出现回调地狱，比回调函数更容易处理错误
* Generator 生成器：可以控制函数的执行与暂停
* async/await ：能够使用同步代码实现异步访问资源的能力，以 try/catch 方式更好的处理错误





## 事件循环

JavaScript是一种**单线程**语言，它主要用来与用户互动，以及操作DOM。

**那单线程有什么好处呢？**

- 在 JS 运行的时候可能会阻止 UI 渲染，这说明了两个线程是互斥的。这是因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI。
- 得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间的好处。



JS 是单线程的，在同一个时间只能做一件事情，**那为什么浏览器可以同时执行异步任务呢？**

这是因为浏览器是多线程的，当 JS 需要执行异步任务时，浏览器会另外启动一个线程去执行该任务。也就是说，JavaScript是单线程的指的是执行JavaScript代码的线程只有一个，是浏览器提供的JavaScript引擎线程（主线程）。除此之外，浏览器中还有定时器线程、 HTTP 请求线程等线程，这些线程主要不是来执行 JS 代码的。

例如：Chrome不仅拥有多个进程，还有多个线程。以渲染进程为例，就包含GUI渲染线程、JS引擎线程、事件触发线程、定时器触发线程、异步HTTP请求线程。这些线程为 JS 在浏览器中完成异步任务提供了基础。



JavaScript的任务分为两种同步和异步：

- **同步任务：** 在主线程上排队执行的任务，只有一个任务执行完毕，才能执行下一个任务，
- **异步任务：** 不进入主线程，而是放在任务队列中，若有多个异步任务则需要在任务队列中排队等待，任务队列类似于缓冲区，任务下一步会被移到执行栈然后主线程执行调用栈的任务。



### 执行栈与任务队列

**执行栈**：从名字可以看出，执行栈使用到的是数据结构中的栈结构， 它是一个存储函数调用的栈结构，遵循**先进后出**的原则。**它主要负责跟踪所有要执行的代码。** 每当一个函数执行完成时，就会从堆栈中弹出（pop）该执行完成函数；如果有代码需要进去执行的话，就进行 push 操作。

JavaScript在按顺序执行执行栈中的方法时，每次执行一个方法，都会为它生成独有的执行环境（上下文)，当这个方法执行完成后，就会销毁当前的执行环境，并从栈中弹出此方法，然后继续执行下一个方法。



**任务队列：** 从名字中可以看出，任务队列使用到的是数据结构中的队列结构，它用来保存异步任务，遵循**先进先出**的原则。**它主要负责将新的任务发送到队列中进行处理。**

JavaScript在执行代码时，会将同步的代码按照顺序排在执行栈中，然后依次执行里面的函数。当遇到异步任务时，就将其放入任务队列中，等待当前执行栈所有同步代码执行完成之后，就会从异步任务队列中取出已完成的异步任务的回调并将其放入执行栈中继续执行，如此循环往复，直到执行完所有任务。

**在事件驱动的模式下，至少包含了一个执行循环来检测任务队列中是否有新任务。通过不断循环，去取出异步任务的回调来执行，这个过程就是事件循环，每一次循环就是一个事件周期。**



### 宏任务和微任务

任务队列其实不止一种，根据任务种类的不同，可以分为**微任务（micro task）队列**和**宏任务（macro task）队列**。常见的任务如下：

- **宏任务：** script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)
- **微任务：** Promise、MutaionObserver、process.nextTick(Node.js 环境)；



任务队列执行顺序如下：

1. JavaScript 引擎首先从宏任务队列中取出第一个任务；
2. 执行完毕后，再将微任务中的所有任务取出，按照顺序分别全部执行（这里包括不仅指开始执行时队列里的微任务），如果在这一步过程中产生新的微任务，也需要执行，**也就是说在执行微任务过程中产生的新的微任务并不会推迟到下一个循环中执行，而是在当前的循环中继续执行。**
3. 然后再从宏任务队列中取下一个，执行完毕后，再次将 microtask queue 中的全部取出，循环往复，直到两个 queue 中的任务都取完。

**也是就是说，一次 Eventloop 循环会处理一个宏任务和所有这次循环中产生的微任务。**



```js
console.log("同步代码1");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

new Promise((resolve) => {
  console.log("同步代码2");
  resolve();
}).then(() => {
  console.log("promise.then");
});

console.log("同步代码3");

// "同步代码1"
// "同步代码2"
// "同步代码3"
// "promise.then"
// "setTimeout"
```

从上面的宏任务和微任务的工作流程中，可以得出以下结论：

- 微任务和宏任务是绑定的，每个宏任务在执行时，会创建自己的微任务队列。
- 微任务的执行时长会影响当前宏任务的时长。比如一个宏任务在执行过程中，产生了 10 个微任务，执行每个微任务的时间是 10ms，那么执行这 10 个微任务的时间就是 100ms，也可以说这 10 个微任务让宏任务的执行时间延长了 100ms。
- 在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论什么情况下，微任务都早于宏任务执行（优先级更高）。



**为什么要将任务队列分为微任务和宏任务呢，他们之间的本质区别是什么呢？**

JavaScript在遇到异步任务时，会将此任务交给其他线程来执行（比如遇到setTimeout任务，会交给定时器触发线程去执行，待计时结束，就会将定时器回调任务放入任务队列等待主线程来取出执行），主线程会继续执行后面的同步任务。

对于微任务，比如promise.then，当执行promise.then时，浏览器引擎不会将异步任务交给其他浏览器的线程去执行，而是将任务回调存在一个队列中，当执行栈中的任务执行完之后，就去执行promise.then所在的微任务队列。

所以，宏任务和微任务的本质区别如下：

- 微任务：不需要特定的异步线程去执行，没有明确的异步任务去执行，只有回调；
- 宏任务：需要特定的异步线程去执行，有明确的异步任务去执行，有回调；





## 不能使用圆括号的情况

* 变量声明语句中，不能带有圆括号。
* 函数参数中，模式不能带有圆括号。
* 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。

```js
// 以下代码都会报错
var [(a)] = 1
function f([(z)]) { return z }
([a]) = [5]
```



## 一定要加分号结束的情况

* 语句后面有立即执行函数











