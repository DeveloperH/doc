## ES6 新特性



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

// test2()会报错，不能在函数内部重新声明参数
function test2(arg){
  let arg
}
```



#### var和let的区别

1. 作用域: var是全局变量，全局内都可以使用。let声明的变量只在声明的代码块内有效。
2. 变量提升: var声明的变量在预解析时发生变量提升，而let不存在变量提升。
3. 重复声明: var可以重复声明用一个变量，而let不可以，也不能在函数内部重新声明参数。



#### 作用域

1. JS中有全局作用域、函数作用域和块级作用域。
2. 全局变量: 定义在`<script>`标签中或者不属于某个函数的变量。多个`<script>`标签的全局变量互通。
3. 局部变量: 定义在函数内部的变量。
4. 函数内部可以访问到该函数外所属的外部作用域的变量（作用域链，高级）
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



### 暂时性死区TDZ

暂时性死区(temporal dead zone，简称TDZ)

只要块级作用域存在`let`命令，它所声明的变量就绑定这个区域，不再受外部的影响。

ES6明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

**总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为"暂时性死区"。**

```js
var tmp = 10
if(true){
  tmp = 'abc'   // 报错，Cannot access 'tmp' before initialization
  let tmp
}
```





### 常量const

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







### 解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构(Destructuring)。

解构赋值不仅适用于var命令，也适用于let和const命令。



#### 数组的解构赋值

* 从数组中提取值，按照对应位置，对变量赋值。`var [a, b, c] = [1, 2, 3]`
  * 本质上，这种写法属于"模式匹配"，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
* 如果解构不成功，变量的值就等于`undefined`
* 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组，这样解构仍可以成功
* 如果等号的右边不是数组(或者严格地说，不是可遍历的解构)，那么将会报错
  * `Uncaught TypeError: xx is not iterable`
  * 事实上，只要某种数据结构具有`Iterator`接口，都可以采用数组形式的解构赋值。
* 对于Set结构，也可以使用数组的解构赋值。`var [x, y, z] = new Set(['a', 'b', 'c'])`
* 解构赋值允许指定默认值。`var [foo = true] = []`
  * 注意: ES6内部使用严格相等运算符(===)，判断一个位置是否有值。所以，如果一个数组成员不严格等于`undefined`，默认值是不会生效的。
* 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。`var [x = 1, y = x] = []`



```js
var [a, b, c] = [1, 2, 3]   // a=1, b=2, c=3
let [n1, n2] = [1]          // n1=1, n2=undefined
var [x, y] = [1, 2, 3]      // x=1, y=2
// var [n] = 1              // 报错，1 is not iterable
var [x, y, z] = new Set(['a', 'b', 'c'])  // x='a', y='b', z='c'
var [foo = true] = []       // foo=true
var [bar = true] = [null]   // bar=null
var [x = 1, y = x] = []     // x=1, y=1
```



#### 对象的解构赋值

* 解构不仅可以用于数组，还可以用于对象。`var {name, age} = { age: 18, name: 'lisi'}`
* 对象的解构与数组有一个重要的不同。
  * 数组的元素是按次序排列的，变量的取值由它的位置决定
  * 对象的属性没有次序，变量必须与属性同名，才能取到正确的值
* 如果变量名与属性名不一致，必须写成这样。`var {foo:baz} = { foo:'a', bar:'b'}  // baz='a'`
  * 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
* 和数组一样，解构也可以用于嵌套结构的对象。
* 对象的解构也可以指定默认值。默认值生效的条件是，对象的属性值严格等于undefined。
* 解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
  * `({} = [])`  虽然毫无意义，但是语法是合法的，可以执行。
* **对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。**
  * 将Math对象的方法赋值到对于的变量上，使用起来可以比较方便 `let { min, max} = Math`
* 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
  * `var arr = [1, 2, 3]  var {0:first, [arr.length-1]:last } = arr  // first=1, last=3`

```js
var {name, age} = { age: 18, name: 'lisi'}  // name='lisi', age=18
//var {x, y} = { x:1, z:2}      // x=1, y=undefined
var {foo:baz} = { foo:'a', bar:'b'}   // baz='a'
var {x, y=5} = { x:1};           // x=1, y=5
({} = [])
let { min, max} = Math
console.log(min(4,2,7)) // 2

var arr = [1, 2, 3]
var {0:first, [arr.length-1]:last } = arr   // first=1, last=3
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
var [a, b, c] = 'OPQ'   // a='O', b='P', c='Q'
var {length:len} = 'hello'  // len=5

var {toString: s} = 123
var flag = s === Number.prototype.toString  // true

function add([x, y]){
  return x + y
}
console.log(add([1, 2]))  // 3

function move({x=0, y=0}={}){
  return [x, y]
}
let res1 = move({x:3, y:8})   // [3, 8]
let res2 = move({y:3})        // [0, 3]
let res3 = move()             // [0, 0]
```



#### 作用

1. 交换变量的值
2. 从函数返回多个值
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

模板字符串中还可以任意换行，并且会按原格式输出。

```js
var name = 'zhangsan'
var age = 15

// 使用模板字符串``(反引号)，使用${变量名} 得到变量值
var str = `my name is ${name}, age is ${age}`
```

