# 高级

## JS的解析过程

### 变量提升和函数提升

JS解析器会对`<script>`标签中的内容进行预解析。

1. 首先预解析: 全局作用域，先找var全局变量、function和参数，找到后会把它们提前。注意，这里找的是var变量名和函数，`并不包括=等号右边的表达式`。**(变量提升和函数提升)**
2. 再从上到下执行代码
3. 执行到function函数后，进入局部作用域，还是预解析得到var和函数，再从上到下执行代码



**函数内部获取变量的时候，会先在当前作用域下找有没有变量声明，如果有就返回当前作用域中变量的值。**

**如果当前作用域中没有对应变量的声明，会去上一级作用域找变量的值。**



### 面试题1

```js
var num = 10
fn()    // undefined
function fn(){
  console.log(num)
  var num = 20
}
/* 
  解析: 通过JS预解析，fn()函数已经被提升，所以可以在定义函数代码前调用该函数。
  执行到fn()函数后，会进入该函数的局部作用域中，同样会提升函数内的var变量，接着从上往下继续执行。
  执行到第一行代码，这时局部作用域的num变量已经声明，但是并没有赋值，所以输出undefined

  拆解函数:
  function fn(){
    var num
    console.log(num)
    num = 20
  }
*/
```



### 面试题2

```js
var a = 10
fn()    // undefined  20
function fn(){
  var b = 20
  console.log(a)
  console.log(b)
  var a = 99
}
/* 
  解析: 解析过程参考面试题1
  因为变量a被提升后，还没有赋值就输出所以是undefined。代码从上往下执行后，变量b被赋值后才输出，所以是20

  拆解函数:
  function fn(){
    var b
    var a
    b = 20
    console.log(a)
    console.log(b)
    a = 99
  }
*/
```



### 面试题3

```js
function fn(){
  var a = b = c = 9
  console.log(a)
  console.log(b)
  console.log(c)
}
fn()  // 9  9  9

console.log(b)  // 9
console.log(c)  // 9
console.log(a)  // 报错: a is not defined
/* 
  解析: var a = b = c 被解释成 var a 为局部变量，b,c因为没有用var声明，所以变成了全局变量
  因为a是局部变量，在作用域外调用就变成未定义的，所以报错

  拆解函数:
  function fn(){
    var a
    c = 9
    b = c
    a = b
    console.log(a)
    console.log(b)
    console.log(c)
  }
*/
```



### 多个script标签的解析

JS的`<script>`是分段执行的。也就是一个script标签，一个script标签地顺序执行。

执行过程:

* 读入下一个代码段
* 编译(包括声明变量，声明函数，语义检查，代码优化，分析得到代码树等...)
* 执行
* 读入下一个代码段
* 编译
* 执行
* ...重复



**如果代码中出现编译错误，代码中所有声明全部无效。**

**当出现编译错误或运行错误时，会结束当前script代码段，执行下一个script代码段。**

编译错误: 比如漏写括号、引号等等这些语法错误

运行错误: 变量未声明就使用、变量名/方法名写错等等

```html
<script>
  var num = 10
  function fn(){
    console.log('fn run')
  }
  console.log(i   // 报错，编译错误，代码块中的声明全部无效，执行下一个script
</script>
<script>
  console.log('script2 ' + num)   // 报错，num is not defined，程序停止
  fn()
</script>
```

```html
<script>
  console.log(i)  // 报错，运行错误，执行下一个script
  var num = 10
  function fn(){
    console.log('fn run')
  }
</script>
<script>
  console.log('script2 ' + num)   // 'script2 undefined', 因为num在编译阶段已经被提升了
  fn()    // 'fn run'
</script>
```



## 模拟静态属性

语法: `类名.属性名`

```js
function Person(){
  // 每次实例化Person对象时，静态属性值自增
  Person.count++
}

Person.count = 0      // 创建静态属性
var p1 = new Person()
var p2 = new Person()
console.log(Person.count) // 2  调用静态属性
```





## 闭包

所谓闭包，指的是一个拥有许多变量和绑定了这些变量的环境的表达式(通常是一个函数)，因而这些变量也是该表达式的一部分。**也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。**

通俗来讲，**闭包其实就是一个可以访问其他函数内部变量的函数。即一个定义在函数内部的函数，或者说闭包是个内嵌函数。**

当内部函数被保存到外部时，将会生成闭包。闭包会导致原有作用域链不释放，造成内存泄露。



闭包的功能:

* 可以访问局部变量
* 使变量所占的内存不被释放

在全局中，不能访问局部变量，因为作用域不同。另外，函数在执行完毕后，局部变量会被回收。

所以，如果想在全局中访问到局部变量，可以使用闭包实现。

因此，闭包产生的本质就是：**当前环境中存在指向父级作用域的引用**。



```js
function display(){
  var i = 10
}
display()
// 下面代码会报错。在全局中，不能访问局部变量i。
console.log(i)  
```



### 实现闭包

原理: 可以使用一个局部函数包含要访问的局部变量，这样局部变量的内存就不会被回收，然后将该局部函数作为返回值返回，并在全局中声明变量接收该返回值。

```js
// 闭包实现
function f1(){
  var i = 10
  function f2(){
    console.log(i)  // f2函数中包含变量i
  }
  return f2   // 返回f2函数的首地址
}

var test = f1()   // test也指向了f2函数的首地址
test()  // 10


// 并不是只有返回函数才算是产生了闭包。回到闭包的本质，只需要让父级作用域的引用存在即可
var fun3;
function fun1() {
  var a = 2
  fun3 = function() {
    console.log(a);
  }
}
fun1();
fun3();	// 2
```

解析: 通过作用域链，f2函数可以范围f1函数中的变量i，这时在f2函数中包含了变量i后，在f1函数中返回f2函数。当全局变量test调用f1函数后，test也指向了f2函数的首地址，所以f2函数不会被回收。又因为f2函数中需要用到变量i，所以变量i也不会被回收。执行test函数后，就可以访问到局部变量i了。



![](https://www.huangyihui.cn/upload/gburlimg/531ef39c98756.png)



**作用域链：当访问一个变量时，代码解释器会首先在当前的作用域查找，如果没找到，就去父级作用域去查找，直到找到该变量或者不存在父级作用域中，这样的链路就是作用域链。**



在定时器、事件监听、Ajax 请求、Web Workers 或者任何异步中，只要使用了回调函数，实际上就是在使用闭包：

```js
// 定时器
setTimeout(function handler(){
  console.log('1');
}，1000);

// 事件监听
document.getElementById(app).addEventListener('click', () => {
  console.log('Event Listener');
});

// IIFE（立即执行函数）：IIFE 是一种自执行匿名函数，这个匿名函数拥有独立的作用域。这不仅可以避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。
var a = 2;
(function IIFE(){
  console.log(a);  // 输出2
})();


// 作为函数参数传递的形式
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这是闭包
  fn();
}
foo();  // 输出2，而不是1
```



### 闭包应用

* 实现公有变量（函数累加器）
* 可以做缓存（存储结构）
* 可以实现封装，属性私有化
* 模块化开发，防止污染全局变量

```js
// 属性私有化
function Deng(name, wife) {
  var prepareWife = 'xiaozhang'   // 预备役

  this.name = name
  this.wife = wife
  this.divorce = function() {
    this.wife = prepareWife
  }
  // 提供get方法和set方法对私有属性进行操作
  this.changePrepareWife = function(target) {
    prepareWife = target
  }
  this.sayPrepareWife = function() {
    console.log(prepareWife)
  }
}

var deng = new Deng('deng', 'xiaoliu')
console.log(deng.prepareWife)   // undefined  属性私有化，无法直接访问到
```

```js
// 结果缓存（备忘模式）
function memorize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    return cache[key] || (cache[key] = fn.apply(fn, args));
  };
}

function add(a) {
  return a + 1;
}

const adder = memorize(add);

adder(1); // 输出: 2    当前: cache: { '[1]': 2 }
adder(1); // 输出: 2    当前: cache: { '[1]': 2 }
adder(2); // 输出: 3    当前: cache: { '[1]': 2, '[2]': 3 }
```



### 面试题

```js
for(var i = 1; i <= 5; i ++){
  setTimeout(function() {
    console.log(i)
  }, 0)
}
// 输出的结果是 5 个 6
```



那如何按顺序依次输出 1、2、3、4、5 呢？

```js
// 解决方案1：let
for(let i = 1; i <= 5; i++){
  setTimeout(function() {
    console.log(i);
  },0)
}


// 解决方案2：IIFE（立即执行函数）
for(var i = 1;i <= 5;i++){
  (function(j){
    setTimeout(function timer(){
      console.log(j)
    }, 0)
  })(i)
}


// 定时器第三个参数：这个参数会作为回调函数的附加参数存在
for(var i=1;i<=5;i++){
  setTimeout(function(j) {
    console.log(j)
  }, 0, i)
}
```







## 模拟私有属性

在面向对象思想中，对于有些敏感的，不想公开的成员可以定义为私有，在JS中可以模拟这个功能。



公有成员和私有成员怎么定义

* var : 私有
* this : 公有

```js
function Person(p_name, p_age){
  this.name = p_name  // 公有
  var age = p_age     // 私有
}

var p1 = new Person('张三', 21)
console.log(p1.name)  // '张三'
console.log(p1.age)   // undefined，因为Person构造函数执行完毕后，age会被回收
```



如上所述，虽然定义了私有属性，但是无法通过`对象.私有属性名`去调用。这时可以通过闭包原理来实现访问私有属性。

```js
function Person(p_name, p_age){
  this.name = p_name  // 公有
  var age = p_age     // 私有
  this.getAge = function(){   // 用于返回age的值
    return age
  }
  this.setAge = function(a){  // 用于设置age的值
    age = a
  }
}

var p1 = new Person('张三', 21)
console.log(p1.name)  // '张三'
p1.setAge(18)
console.log(p1.getAge())  // 18
```

如果只有set方法，说明该属性是只写属性。

如果只有get方法，说明该属性是只读属性。



## 属性表示方法

* obj.prop
* obj['prop']  属性名需要用引号包起来

```js
var obj = {
  name: 'laowang'
}
console.log(obj.name, obj['name'])


Object.prototype.color = 'red'
var person = {
  name: 'xiaoming',
  age: 12,
  height: 166,
  __proto__: {
    lastName: 'wang'
  }
}

for(var prop in person) {
  // for in 会遍历所有的属性，包括原型链上的属性
  console.log(prop, person[prop], typeof prop)
}

for(var prop in person) {
  // hasOwnProperty() 会判断对象下是否有指定的属性，会忽略从原型链上继承到的属性
  if(person.hasOwnProperty(prop)) {
    console.log(person[prop])
  }
}
```



## 模拟继承

继承发展史：

* 传统模式（原型链）
  * 过多的继承了没用的属性
* 借用构造函数
  * 不能继承借用构造函数的原型
  * 每次构造函数都要多走一个函数
* 共享原型
  * 不能随便改动自己的原型
* 圣杯模式（推荐）



```js
Father.prototype.lastName = 'Wang'
Father.prototype.card = 'xx'
function Father() {
  this.wife = 'xiaohua'
}

function Son() {

}

// 继承方式：原型链
Son.prototype = new Father()
var son = new Son()
var father = new Father()
// 缺点：过多的继承了没用的属性
console.log(son.wife)   // xiaohua
```



```js
Father.prototype.lastName = 'Wang'
function Father(name, age) {
  this.name = name
  this.age = age
  this.wife = 'xiaohua'
}

function Son(name, age) {
  // 继承方式：借用构造函数
  Father.call(this, name, age)
}

var son = new Son('xiaowang', 16)
// 缺点：不能继承借用构造函数的原型
console.log(son.card)   // undefined
```



```js
Father.prototype.lastName = 'Wang'
Father.prototype.card = 'xx'
function Father() {
  this.wife = 'xiaohua'
}

function Son() {

}

// 继承方式：共享原型
Son.prototype = Father.prototype
// 缺点：不能随便改动自己的原型
Son.prototype.card = 'ms'
console.log(Father.prototype.card)  // ms
var son = new Son()
var father = new Father()
```



```js
// 圣杯模式
function inherit(target, origin) {
  function F() {}
  F.prototype = origin.prototype
  target.prototype = new F()
  target.prototype.constuctor = target
  target.prototype.uber = origin.prototype
}

Father.prototype.lastName = 'wang'
function Father() {}
function Son() {}

inherit(Son, Father)
var son = new Son()
var father = new Father()
```

```js
// 圣杯模式高级版
var inherit = (function () {
  var F = function () {}
  return function (Target, Origin) {
    F.prototype = Origin.prototype
    Target.prototype = new F()
    Target.prototype.constuctor = Target
    Target.prototype.uber = Origin.prototype
  }
}())

Father.prototype.lastName = 'wang'
function Father() {}
function Son() {}

// 继承之后，Son就有了Father的prototype，但两者并不是共享关系，修改原型时互不影响。
inherit(Son, Father)
Son.prototype.lastName = 'zhang'

var son = new Son()
var father = new Father()
```





有以下几种实现方式:

* 扩展Object方法
* 使用call、apply方法
* 原型继承(推荐)



### 扩展Object方法

核心代码: 为`Object.prototype`添加一个方法，当子类对象需要继承父类属性时，将父类的实例化对象中的属性全部添加到子类对象中。

```js
// ext是自定义的函数名，parObject参数是父类的实例化对象
Object.prototype.ext = function(parObject){
  // 循环遍历父类对象的所有属性
  for(let i in parObject){
    // 为子类对象添加这个遍历到的属性，它的值是父类对象这个属性的属性值
    // 谁调用这个ext方法，这个this就指向那个对象
    this[i] = parObject[i]
  }
}
```



```js
// ext是自定义的函数名，parObject参数是父类的实例化对象
Object.prototype.ext = function(parObject){
  // 循环遍历父类对象的所有属性
  for(let i in parObject){
    // 为子类对象添加这个遍历到的属性，它的值是父类对象这个属性的属性值
    // 谁调用这个ext方法，这个this就指向那个对象
    this[i] = parObject[i]
  }
}

function Person(p_name, p_age){
  this.name = p_name
  this.age = p_age
  this.speak = function(){
    console.log(this.name + ' : ' + this.age)
  }
}

function Student(p_no){
  this.no = p_no
  this.say = function(){
    console.log(this.no + ' : ' + this.name + ' : ' + this.age)
  }
}

var stu = new Student(1002)
stu.ext(new Person('zhangsan', 12))		// 子类调用ext方法，传进父类的实例化对象
stu.speak()   // 调用父类方法
stu.say()     // 调用子类方法
```





### 使用call、apply方法

核心代码: 通过在子类中调用父类的构造器，将父类构造器中的this指向自己

```
父类构造器.call(this[,args...])
```



```js
function Person(p_name, p_age){
  this.name = p_name
  this.age = p_age
  this.speak = function(){
    console.log(this.name + ' : ' + this.age)
  }
}

function Student(p_no, p_name, p_age){
  this.no = p_no
  this.say = function(){
    console.log(this.no + ' : ' + this.name + ' : ' + this.age)
  }
  // 在子类中调用父类的构造器，将父类构造器中的this指向自己
  Person.call(this, p_name, p_age)
}

var stu = new Student(1001, 'lisi', 22)
stu.speak()   // 调用父类方法
stu.say()     // 调用子类方法
```





### 原型继承

核心代码: 在子类原型对象中实例化父类对象，这样子类原型对象中就会拥有父类的所有属性。当子类对象要调用父类的方法时，会先在自己里面找，找不到再去原型对象中找

```
子类.prototype = new 父类()
```



```js
function Person(p_name, p_age){
  this.name = p_name
  this.age = p_age
  this.speak = function(){
    console.log(this.name + ' : ' + this.age)
  }
}

function Student(p_no){
  this.no = p_no
  this.say = function(){
    console.log(this.no + ' : ' + this.name + ' : ' + this.age)
  }
}

// 在子类原型对象中实例化父类对象，这样子类原型对象中就会拥有父类的所有属性，
// 当子类对象要调用父类的方法时，会先在自己里面找，找不到再去原型对象中找
Student.prototype = new Person('wangwu', 24)
var stu = new Student(1003)
stu.speak()   // 调用父类方法
stu.say()     // 调用子类方法
```



![](https://www.huangyihui.cn/upload/gburlimg/d7b0fce2fa469.png)





## this指向

### 执行上下文

在执行上下文中，包含了变量环境、词法环境、外部环境、this。实际上，this 是和执行上下文绑定的，也就是说每个执行上下文都有一个this。

执行上下文是评估和执行 JavaScript 代码的环境的抽象概念，当 JavaSciprt 代码在运行时，其运行在执行上下文中。JavaScript 中有三种执行上下文类型:

* 全局执行上下文： 任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文。
  * this 是指向 window 对象的
* 函数执行上下文：当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个。
  * 默认情况下调用一个函数，其执行上下文的 this 也是指向 window 的。
* eval函数执行上下文：执行在eval函数中的代码会有属于它自己的执行上下文。



浏览器中的JavaScript解释器是单线程的，也就是说浏览器同⼀时间只能做⼀个事情。代码中只有⼀个全局执行上下⽂和⽆数个函数执行上下文，这些组成了**执行上下文栈**（Execution Stack）。⼀个函数的执行上下文，在函数执行完毕后，会被移出执行上下文栈。



### 函数的 this 指向

this 是 JavaScript 的一个关键字，多数情况下 this 指向调用它的对象。**谁调用这个方法，这个方法的this就指向谁。**

this 是在函数被调用时确定的，它的指向取决于函数调用的地方，而不是它被声明的地方（除箭头函数外，在箭头函数中，没有this）。当函数被调用时，会创建一个执行上下文，它包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息，this 就是这个记录的一个属性，它会在函数执行的过程中被用到。

this 在函数的指向绑定形式有四种：**默认绑定、隐式绑定、显式绑定、new绑定**。



#### 默认绑定 (全局环境)

函数在浏览器全局环境中直接使用不带任何修饰的函数引用进行调用，非严格模式下 `this` 指向 `window`；在 `use strict` 指明严格模式的情况下就是 `undefined`（严格模式不允许 this 指向全局对象）。

注意：在浏览器环境下，全局对象是window；在Node.js环境下，全局对象是global。



```js
function fn1() {
  console.log(this);
}
function fn2() {
  "use strict";
  console.log(this);
}
fn1(); // window
fn2(); // undefined


// 谁调用这个方法，这个方法的this就指向谁。
var num = 1;
var foo = {
  num: 10,
  fn: function () {
    console.log(this);      // window
    console.log(this.num);  // 1
  },
};
var fn1 = foo.fn;
fn1();
```



#### 隐式绑定 (上下文对象)

如果函数在某个上下文对象中调用，那么 this 绑定的是那个上下文对象。

```js
var a = "hello";

var obj = {
  a: "world",
  fn: function () {
    console.log(this.a);  // world
  },
};

obj.fn();
```



如果嵌套了多个对象，那么指向**「最后一个」**调用这个方法的对象。

```js
const obj1 = {
  text: 1,
  fn: function () {
    return this.text;
  },
};
const obj2 = {
  text: 2,
  fn: function () {
    return obj1.fn();
  },
};
const obj3 = {
  text: 3,
  fn: function () {
    var fn = obj1.fn;
    return fn();	// => window.fn()
  },
  fn2: obj1.fn
};
console.log(obj1.fn());   // 1
console.log(obj2.fn());   // 1
console.log(obj3.fn());   // undefined
console.log(obj3.fn2());  // 3
```



#### 显式绑定 (apply、call、bind)

显式绑定是指需要引用一个对象时进行强制绑定调用，显式绑定可以使用`apply、call、bind`方法来绑定`this`值，使其指向我们指定的对象。

call、apply 和 bind三个方法都可以改变函数 `this` 指向，但是 call 和 apply 是直接进行函数调用；`bind` 不会执行函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 `this` 指向，需要我们手动调用。call 和 apply 的区别：call 方法接受的是参数列表，而 apply 方法接受的是一个参数数组。

需要注意，如果把 null 或 undefined 作为 this 的绑定对象传入 call、apply、bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。

```js
const target = {}
fn.call(target, 'arg1', 'arg2')
fn.apply(target, ['arg1', 'arg2'])
fn.bind(target, 'arg1', 'arg2')()

const foo = {
  name: "hello",
  logName: function () {
    console.log(this.name);
  },
};
const bar = {
  name: "world",
};
console.log(foo.logName.call(bar)); // world
```



不管给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定。

```js
let a = {}
let fn = function () { 
  console.log(this) 
}
fn.bind().bind(a)() 
```



#### new 绑定 (构造函数)

函数作为构造函数使用 new 调用时， this 绑定的是新创建的构造函数的实例：

```js
function Person(name，age){
  this.name = name;
  this.age = age;
  this.say = function(){
    console.log(this.name + ":" + this.age);
  }
}
var person = new Person("zs",18);
console.log(person.name); // zs
console.log(person.age);  // 18
person.say(); // zs:18
```



### this 的优先级

优先级：**new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定**

```js
function foo(a) {
  console.log(this.a);
}
const obj1 = {
  a: 1,
  foo: foo,
};
const obj2 = {
  a: 2,
  foo: foo,
};
obj1.foo.call(obj2);  // 2
obj2.foo.call(obj1);  // 1
```

```js
function foo (a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a)	// 2  obj1 对象为：{a: 2}

var baz = new bar(3)
console.log(baz.a)	// 3
```



## call() 和 apply()

`call()`和`apply()`的作用都是：改变函数中的this指向并执行该函数。区别：传参列表不同。

在JS中，函数的调用形式:

* Person()				// this-->window
* var p1 = new Person()   // this-->p1
* per.Person()            // this-->per

可以看出，JS中内部的this会随着程序运行指向不同的对象，那么我们也可以使用`call()`或`apply()`手动修改这个this的指向。



语法:

* call(thisObj [,arg1 [,arg2 [,argN]]])
  * 第一个参数: 函数执行时，this指向谁
  * 后面的参数：需要把实参按照形参的个数传进去(顺序指定)
* apply(thisObj [,argArray])
  * 第一个参数: 函数执行时，this指向谁
  * 后面的参数：需要传一个 arguments(数组)，表示参数集合



call和apply在执行时做了两件事:

1. 将函数内部this指向了第一个参数
2. 调用函数



```js
function Person(name, age){
  this.name = name
  this.age = age
}

function speak(){
  // this = p1
  console.log(this.name + " : " + this.age)
}

var p1 = new Person('张三', 21)
// speak()  这样调用this指向window
// p1.speak()  p1对象没有speak属性

// 使用call() 或者 apply
speak.call(p1)    // '张三 : 21'
speak.apply(p1)   // '张三 : 21'

var obj = {}
Person.call(obj, 'laowang', 25)   // obj = {name: 'laowang', age: 25}
```

上面的例子中，假设大神写了个非常牛逼的speak()，你想拿过来用，但是直接调用speak()的话，函数内的this指向的是window。如果想改变this的指向，可以使用call() 或 apply() 来指定p1对象调用当前函数。



另一种方法:

```js
p1.say = speak
p1.say()
```

这样解决和上面的解决方法有本质上的区别，这样会为p1对象增加属性，p1对象的"体积"会变大。而使用call或者apply，是直接调用speak函数，只不过函数内部this的指向发生改变。



### 实例

```js
function Person(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}

function Student(name, age, sex, tel, stuid) {
  // 通过 call() 调用能够满足功能的代码
  Person.call(this, name, age, sex)
  this.tel = tel
  this.stuid = stuid
}

var student = new Student('ls', 12, 'male', '10086', '102')
```



```html
<script>
  function changeColor(color){
    this.style.color = color
  }
  function changeSize(size){
    this.style.fontSize = size + 'px'
  }
  window.onload = function(){
    document.getElementById('btn').onclick = function(){
      var div1 = document.getElementById('div1')
      changeColor.call(div1, 'red')
      changeSize.call(div1, 40)
    }
  }
</script>

<div id="div1">hello</div>
<button id="btn">更改样式</button>
```



## bind()

语法：`fun.bind(obj)(arg)`

- bind的第一个参数：传入的是this需要指向的对象
- 因为函数bind返回的是一个函数，即将 fun 的 this 指向 obj 后不进行自身调用， 我们需要自己进行一次调用， 所以要在函数bind后面再加一个小括号进行自身调用， 而小括号里则可以输出传给 fun 函数的参数， 输入的可以是数组形式的，也可以是逐个传入的。



```js
let obj1 = {
  my_favorite: "banana",
  add: function (...fruit) {
    console.log("我喜欢的水果是" + fruit + ",但是我最爱的水果是" + obj2.my_favorite);
  },
};

let obj2 = {
  my_favorite: "orange",
};

obj1.add.bind(obj2)("apple", "Watermelon");
obj1.add.bind(obj2)(["apple", "Watermelon"]);
//输出结果为：我喜欢的水果是apple,Watermelon,但是我最爱的水果是orange
//输出结果为：我喜欢的水果是apple,Watermelon,但是我最爱的水果是orange
```



## apply、call、bind 区别

1. apply、call、bind 三者都是可以改变函数的this指向的
2. apply 和 call 都是改变函数this指向，并传入参数后立即调用执行该函数
3. bind 是在改变函数this指向，并传入参数后返回一个新的函数，不会立即调用执行
4. apply 传入的参数是数组形式的；call 传入的参数是按顺序的逐个传入并以逗号隔开；bind 传入的参数既可以是数组形式，也可以是按顺序逐个传入。





## 函数防抖

在一定时间内，一个函数如果被触发多次，但只会执行最后一次，这就叫做函数防抖。

原理: 设置一个定时器，并将要执行的函数放在定时器中。当函数短时间内被调用，清除上一次的定时器，并设置下一次定时器，让这个函数在一定时间内，不会重复执行，只执行最后的一次。

好处: 在一定时间内，函数被多次调用，但只会执行最后一次的调用，大大节约了内存。



应用场景:

* 百度搜索框中，输入文本时会通过AJAX请求，在下拉框中显示联想的内容。当输入文本比较快时，没有必要每个字符都去发送请求，只在用户最后一次输入完，再发送请求。
* 页面的onscroll事件
* 重复点击事件等...

```js
function debounce (callback, delay) {
  let timer = null
  return function (e) {
    if clearTimeout(t)
    timer = setTimeout(() => {
      callback.call(e)
    }, delay);
  }
}

window.onscroll = debounce(function () {
  console.log('调用了1次')
}, 500)

// window.onscroll = function(){
//   console.log('调用了1次')
// }
```

```js
function debounce(func, wait) {
  let timeout;
  return function () {
    // 这个返回的函数是每次用户输入值后的回调
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}
// 监听输入框
const input = document.querySelector(".input");
input.addEventListener(
  "input",
  debounce(() => {
    console.log("input"); // 这里可以做一些异步请求
  }, 500)
);
```







![image-20210828210030914](https://www.huangyihui.cn/upload/gburlimg/c8a07791fd7d.png)



## 函数节流

在一定时间内，一个函数被触发多次，只执行第一个，不执行后面的。当一定时间过去后，如果这个函数又被多次触发，还是像上面一样，只执行第一个，不执行后面的。以此类推。



原理: 记录现在触发的时间和最后一次触发的时间，当一定时间内，多次触发时，比较现在触发的时间和最后一次触发的时间，如果两次触发的时间还在一定时间内，则不执行这次的触发。



好处: 降低触发频率。和防抖的用途一样

```js
function throttle (callback, duration) {
  // 记录最后一次执行的时间
  let lasttime = new Date().getTime()
  return function () {
    // 记录现在执行的时间
    let now = new Date().getTime()
    if (now - lasttime > duration) {
      // 如果两次执行的时间大于设置的持续时间，才会执行callback方法
      // 并把最后一次执行的时间设置为当前执行的时间
      lasttime = now
      callback()
    }
  }
}

window.onscroll = throttle(function () {
  console.log('调用了1次')
}, 500)
```



![image-20210828214230407](https://www.huangyihui.cn/upload/gburlimg/d35af40e0bf96.png)



## 函数防抖和函数节流的区别

防抖是删除前一个，节流是不执行下一个。

防抖: 当函数在短时间内连续触发多次，则立即结束上一次的执行，开始执行最新触发的这次。

节流: 当函数在短时间内连续触发多次，则判断上次开始执行的时间和最新触发这次的时间是否还在特定时间区间内，如果还在时间段内，则不执行最新的这次触发。



## 柯里化

柯里化（Currying）是将一个接受多个参数的函数转化为一系列每次接受单一参数的函数的技术。换句话说，柯里化将一个多参数的函数转换为一组嵌套的单参数函数。这使得你可以通过逐步传递参数来调用函数，而不是一次性传递所有参数。

**柯里化的优势：**

1. **部分应用**：你可以提前部分传递参数，创建一个特定的函数版本（如 `add5`）。
2. **更简洁的函数调用**：可以通过逐步提供参数来调用函数，而不需要一次性提供所有的参数。
3. **函数组合**：在函数式编程中，柯里化常与其他概念（如高阶函数、函数组合等）配合使用，以提供更高的抽象层次和灵活性。

```js
// 假设有一个普通的函数：
function add(a, b) {
  return a + b;
}

// 在柯里化之后，add 函数将变成一系列逐步接受单个参数的函数。例如：
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

// 现在你可以逐步调用这个函数，首先传入 a，然后返回一个接受 b 的函数：
const add5 = curriedAdd(5); // 返回一个新的函数
console.log(add5(3)); // 输出 8
```



手动实现：

```js
function curry(fn) {
  // 获取函数的参数个数
  const numArgs = fn.length;

  // 返回一个新的函数来处理柯里化
  function curried(...args) {
    // 如果传递的参数已经足够，执行函数
    if (args.length >= numArgs) {
      return fn(...args);
    } else {
      // 否则，继续收集参数
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  }

  return curried;
}

// 使用柯里化函数
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```



## 垃圾回收机制GC

编程语言中常用的几种垃圾回收机制:

* 引用计数法 (js)
* 复制整理法 (java)
* 标记清除法
* 标记整理法





## 深浅拷贝

浅拷贝: 可以将对象的最外层属性(基本数据类型)全部复制，里层属性(引用数据类型)仍然是引用关系

深拷贝: 完全将对象复制一份，并且新对象中的所有属性和原对象都没有关系



### 浅拷贝

浅拷贝是指，一个新的对象对原始对象的属性值进行精确地拷贝，如果拷贝的是基本数据类型，拷贝的就是基本数据类型的值；如果拷贝的是引用数据类型，拷贝的就是内存地址。如果其中一个对象的引用内存地址发生改变，另一个对象也会发生变化。

**缺点：引用数据类型的属性仍然是引用关系，一个对象修改，另一个对象也会受到影响**



#### 扩展运算符

使用扩展运算符可以在构造字面量对象的时候，进行属性的拷贝。

如果属性都是基本类型的值，使用扩展运算符进行浅拷贝会更加方便。

```js
let obj1 = {a:1,b:{c:1}}
let obj2 = {...obj1};
obj1.a = 2;
console.log(obj1); //{a:2,b:{c:1}}
console.log(obj2); //{a:1,b:{c:1}}
obj1.b.c = 2;
console.log(obj1); //{a:2,b:{c:2}}
console.log(obj2); //{a:1,b:{c:2}}
```



#### Object.assign()

`Object.assign()` 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。也就是可以用于 JS 对象的合并。

该方法的参数 target 指的是目标对象，sources指的是源对象。使用形式如下：

```js
Object.assign(target, ...sources)
```

- 如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性；
- 如果该函数只有一个参数，当参数为对象时，直接返回该对象；当参数不是对象时，会先将参数转为对象然后返回；
- 因为`null` 和 `undefined` 不能转化为对象，所以第一个参数不能为`null`或 `undefined`，否则会报错；
- 它不会拷贝对象的继承属性，不会拷贝对象的不可枚举的属性，可以拷贝 Symbol 类型的属性。

实际上，Object.assign 会循环遍历原对象的可枚举属性，通过复制的方式将其赋值给目标对象的相应属性。



```js
let target = { a: 1 };
let object2 = { b: { d: 2 } };
let object3 = { c: 3 };
Object.assign(target, object2, object3);

object2.b.d = 666;
console.log(target); // {a: 1, b: {d: 666}, c: 3}
```



#### 手动实现

```js
var obj = {
  a: 1,
  b: 2,
  c: [20, 30, 50],
  d: {
    n: 10,
    m: 20
  }
}

var newObj = {}
// 浅拷贝
for (var key in obj) {
  newObj[key] = obj[key]
}

newObj.c[0] = 99
obj.d.n = 0
console.log(obj, newObj)


// 浅拷贝的实现;
function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== "object") return;
  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};
  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }
  return newObject;
}
```



#### 数组浅拷贝

* Array.prototype.slice(start, end) ：该方法可以从已有数组中返回选定的元素，不会改变原始数组。两个参数都可选：
  * start: 规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
  * end：规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
* Array.prototype.concat() ：用于合并两个或多个数组，此方法不会更改原始数组，而是返回一个新数组。



```js
let arr = [1,2,3,4];
console.log(arr.slice()); // [1,2,3,4]
console.log(arr.slice() === arr); //false

let arr = [1,2,3,4];
console.log(arr.concat()); // [1,2,3,4]
console.log(arr.concat() === arr); //false
```





## 深拷贝

深拷贝是指，对于简单数据类型直接拷贝他的值，对于引用数据类型，在堆内存中开辟一块内存用于存放复制的对象，并把原有的对象类型数据拷贝过来，这两个对象相互独立，属于两个不同的内存地址，修改其中一个，另一个不会发生改变。



#### JSON.stringify()

这个方法虽然简单粗暴，但也存在一些问题，在使用该方法时需要注意：

- 虽然可以快速完成深拷贝，但是对于get,set方法和不可遍历属性，是复制不了的
- 拷贝的对象中如果有函数，undefined，symbol，当使用过`JSON.stringify()`进行处理之后，都会消失。
- 无法拷贝不可枚举的属性；
- 无法拷贝对象的原型链；
- 拷贝 Date 引用类型会变成字符串；
- 拷贝 RegExp 引用类型会变成空对象；
- 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
- 无法拷贝对象的循环应用，即对象成环 (`obj[key] = obj`)。



```js
var obj = {
  a: 1,
  b: 2,
  c: [20, 30, 50],
  d: {
    n: 10,
    m: 20
  },
  set f(value) {
    this.a = value
  },
  get f() {
    return this.a
  }
}

// JSON方式虽然可以快速完成深拷贝，但是对于get,set方法和不可遍历属性，是复制不了的
Object.defineProperty(obj, 'z', {value:10})

// 深拷贝可以使用JSON的方式，因为将obj转换成JSON格式的字符串后，变成了基本数据类型，就没有引用关系
// 接着将字符串又转换成JSON对象，完成了深拷贝
var newObj = JSON.parse(JSON.stringify(obj))

// 深拷贝后，一个对象属性的修改不会影响到另一个对象
newObj.c[0] = 99
obj.d.n = 0
console.log(obj, newObj)
```



#### 函数库lodash

该函数库也有提供`_.cloneDeep`用来做深拷贝，可以直接引入并使用：

```js
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false
```



源码：

```js
/**
* value：需要拷贝的对象
* bitmask：位掩码，其中 1 是深拷贝，2 拷贝原型链上的属性，4 是拷贝 Symbols 属性
* customizer：定制的 clone 函数
* key：传入 value 值的 key
* object：传入 value 值的父对象
* stack：Stack 栈，用来处理循环引用
*/

function baseClone(value, bitmask, customizer, key, object, stack) {
    let result
 
    // 标志位
    const isDeep = bitmask & CLONE_DEEP_FLAG  // 深拷贝，true
    const isFlat = bitmask & CLONE_FLAT_FLAG  // 拷贝原型链，false
    const isFull = bitmask & CLONE_SYMBOLS_FLAG // 拷贝 Symbol，true
 
    // 自定义 clone 函数
    if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value)
    }
    if (result !== undefined) {
        return result
    }
 
    // 非对象  
    if (!isObject(value)) {
        return value
    }
    
    const isArr = Array.isArray(value)
    const tag = getTag(value)
    if (isArr) {
        // 数组
        result = initCloneArray(value)
        if (!isDeep) {
            return copyArray(value, result)
        }
    } else {
        // 对象
        const isFunc = typeof value == 'function'
 
        if (isBuffer(value)) {
            return cloneBuffer(value, isDeep)
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
            result = (isFlat || isFunc) ? {} : initCloneObject(value)
            if (!isDeep) {
                return isFlat
                    ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
                 : copySymbols(value, Object.assign(result, value))
            }
        } else {
            if (isFunc || !cloneableTags[tag]) {
                return object ? value : {}
            }
            result = initCloneByTag(value, tag, isDeep)
        }
    }
    // 循环引用
    stack || (stack = new Stack)
    const stacked = stack.get(value)
    if (stacked) {
        return stacked
    }
    stack.set(value, result)
 
    // Map
    if (tag == mapTag) {
        value.forEach((subValue, key) => {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
        })
        return result
    }
 
    // Set
    if (tag == setTag) {
        value.forEach((subValue) => {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
        })
        return result
    }
 
    // TypedArray
    if (isTypedArray(value)) {
        return result
    }
 
    // Symbol & 原型链
    const keysFunc = isFull
     ? (isFlat ? getAllKeysIn : getAllKeys)
     : (isFlat ? keysIn : keys)
 
    const props = isArr ? undefined : keysFunc(value)
    
    // 遍历赋值
    arrayEach(props || value, (subValue, key) => {
        if (props) {
            key = subValue
            subValue = value[key]
        }
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    
    // 返回结果
    return result
}
```



#### 完善手写实现

```js
var obj = {
  a: 1,
  b: 2,
  c: [20, 30, 50],
  d: {
    n: 10,
    m: 20
  },
  set f(value) {
    this.a = value
  },
  get f() {
    return this.a
  }
}

var newObj = {}

Object.defineProperty(obj, 'z', {value:10})

cloneObject(newObj, obj)
function cloneObject(target, source) {
  // 获取对象下的所有属性，包括不可遍历属性
  var names = Object.getOwnPropertyNames(source)

  for (var i = 0; i < names.length; i++) {
    var desc = Object.getOwnPropertyDescriptor(source, names[i])
    if (typeof(desc.value) === 'object' && desc.value !== null) {
      // 如果属性是引用类型，则判断是数组还是对象并设置为空的数组或对象
      var obj
      if (Array.isArray(desc.value)) {
        obj = []
      } else {
        obj = {}
      }

      Object.defineProperty(target, names[i], {
        configurable: desc.configurable,  // 不可删除
        enumerable: desc.enumerable,      // 是否可遍历
        value: obj,                       // 值
        writable: desc.writable           // 是否可修改
      })
      cloneObject(obj, desc.value)
    } else {
      Object.defineProperty(target, names[i], desc)
    }
  }
}

// 深拷贝后，一个对象属性的修改不会影响到另一个对象
newObj.c[0] = 99
obj.d.n = 0
console.log(obj, newObj)
```





## Proxy 代理

对象只需关注于核心逻辑，一些非核心逻辑可以让Proxy来做。从而达到关注点分离，降低对象复杂度的目的。

例如:

* 读取或设置对象的某些属性前记录日志;
* 设置对象的某些属性前，需要验证; 
* 某些属性的访问控制等



```js
var obj = {a:1, b:2}
var handler = {
  // 代理set方法
  set: function (target, key, value) {
    console.log("这里设置了属性")
    target[key] = value
  },
  // 代理get方法
  get: function (target, key) {
    console.log("这里获取了属性")
    return target[key]
  },
  // 代理has方法
  has: function (target, key) {
    return key in target
  }
}

var p = new Proxy(obj, handler)
p.a = 20
console.log(obj, p.a) // {a: 20, b: 2} 20
```





## 事件循环 EventLoop

JS是事件驱动程序，因此最底层都是以事件驱动完成函数的回调执行。例如当有触发某个事件的启动因素时，就会抛出事件，调用回调函数，但是这个过程并不是函数可以自己去回调，而是抛出事件后，将在任务队列中等待下一个执行时间，立即调用函数。



**任务队列**

即使在同一个任务队列中，也有先后执行的顺序，主要分为宏观任务和微观任务。

* 宏观任务: setTimeout、setInterval
  * 是在当前任务队列的尾部抛出事件，等待下一次任务队列执行时间开始的时候执行
* 微观任务: process、nextTick、Promise
  * 一般是在当前任务队列的尾部，下一次任务队列执行时间之前执行

这样任务队列就在一个个时间段内不停的循环执行下去。

```js
console.log('a')

setTimeout(() => {
  console.log('b')
}, 0)

new Promise((res, rej) => {
  res()
}).then(() => {
  console.log('c')
})

console.log('d')
//结果是a d c b
```

为什么结果是a d c b 呢?

因为a, d是同步队列，会第一时间执行，c是异步中的微观任务，在同步任务队列执行完毕后，就接着执行。而b是异步中的宏观任务，需要在下一次任务队列开始的时候执行。





## Web Workers

### 介绍

Web Workers 旨在提供一种在后台执行 JavaScript 代码的方法，与网页的主执行线程分离，以提高性能和响应能力。

由于 JavaScript 是单线程的，当执行比较耗时的任务时，就会阻塞主线程并导致页面无法响应，这就是 Web Workers 发挥作用的地方。它允许在一个单独的线程（称为**工作线程**）中执行耗时的任务。这使得 JavaScript 代码可以在后台执行，而不会阻塞主线程并导致页面无响应。

Web Worker 是一个作为后台线程运行的脚本，具有自己的引擎实例和事件循环。它与主执行线程并行运行，并且不会阻塞事件循环。

主线程（或工作线程本身）可以启动任意数量的工作线程。生成 worker 脚本：

1. 主线程（或另一个工作线程）向新工作线程发送一条消息，其中包含所有必要的数据。
2. 工作线程中的事件处理程序执行并开始处理数据。
3. 完成（或失败）时，工作线程将一条带有计算结果的消息发送回主线程。
4. 主线程中的事件处理程序执行、解析传入结果并运行必要的操作（例如显示值）。



Web Workers 与主线程有什么区别呢？

Web Workers 和主线程之间的一个关键区别是**Web Workers 没有访问 DOM 或 UI 的权限**。这意味着它不能直接操作页面上的 HTML 元素或与用户交互。实际上，**Web Workers 被设计用于执行不需要直接访问 UI 的任务，例如数据处理、图像操作或计算。**

另一个区别是，**Web Workers 被设计为在与主线程分离的沙箱环境中运行**，这意味着它们对系统资源的访问受到限制，并且不能访问某些 API，如`localStorage`或`sessionStorage` API。不过，它可以通过消息传递系统与主线程进行通信，从而允许两个线程之间交换数据。



好处：

* 更有效地利用系统资源：允许耗时任务在后台执行，例如涉及大量数据处理或图像操作
* 增加稳定性和可靠性：将耗时任务隔离到单独的 worker 线程中，减少主线程在处理时发生崩溃和错误
* 增强安全性：Web Workers 在隔离环境中运行，隔离防止恶意代码访问或修改主线程或其他 Web Workers 中的数据，降低数据泄露或其他安全漏洞的风险。



使用时需注意的问题：

* 消息批处理：将多个消息组合成一个批处理消息，这比单独发送个别消息更有效。这种方法减少了主线程和 Web Worker 之间往返的数量，它有助于最小化通信开销并提高应用的整体性能。
* 注意内存使用情况：Web Workers 有自己的内存空间，这个空间根据用户的设备和浏览器设置可能是有限的。请避免不必要地创建大对象。
* 避免同步方法
* 浏览器兼容性：IE10 起支持。在使用前，应该检查当前浏览器是否支持 Web Workers



许多库和工具可帮助开发人员使用 Web Workers。例如，[Comlink](https://github.com/GoogleChromeLabs/comlink) 和 [Workerize](https://github.com/developit/workerize) 提供了与 Web Workers 通信的简化 API。这些库抽象了一些管理 Web Workers 的复杂性，使利用它们变得更容易。



### 客户端示例

```js
// worker.js 该文件不应包含对 DOM 的引用，因为在工作线程中无法访问 DOM。

// 使用self对象的onmessage属性添加一个事件监听器来处理从主线程发出的消息。可以使用event.data属性访问发送的消息数据。
self.onmessage = function(event) {
  console.log('Main: ' + event.data);
  self.postMessage('Hello, Main!');
};

// 可以使用importScripts()函数将库或文件导入到工作线程中，该函数可以接受多个文件。
importScripts('script1.js','script2');
```

```js
// main.js

// 使用 Worker 构造函数创建一个新的worker对象。此构造函数接收一个参数，即 worker.js 文件的 URL。
const worker = new Worker('worker.js');

// 向worker对象添加事件侦听器以处理主线程和工作线程之间发送的消息。onmessage 用于处理从工作线程发送来的消息，postMessage 用于向工作线程发送消息。
worker.onmessage = function(event) {
  console.log('Worker: ' + event.data);
};

worker.onerror = function(err) {
  console.log("遇到错误")
}

worker.postMessage('Hello, worker!');
```

```js
// 从应用中终止一个工作线程
worker.terminate();
// 让一个工作线程自行终止
self.close();


// 检查当前浏览器是否支持 Web Workers
if (typeof Worker !== 'undefined') {
  const worker = new Worker('worker.js');
} else {
  console.log('Web Workers are not supported in this browser.');
}
```



### 应用场景

#### 处理 CPU 密集型任务

假设有一个应用需要执行大量的 CPU 密集型计算。如果在主线程中执行这些计算，用户界面可能会变得无响应，用户体验将受到影响。为了避免这种情况，可以使用 Web Worker 在后台执行这些计算。

```js
// 创建一个新的 Web Worker
const worker = new Worker('worker.js');

// 定义一个函数来处理来自Web Worker的消息
worker.onmessage = function(event) {
  const result = event.data;
  console.log(result);
};

// 向Web Worker发送一个消息，以启动计算
worker.postMessage({ num: 1000000 });
```

```js
// 定义一个函数来执行计算
function compute(num) {
  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += i;
  }
  return sum;
}

// 定义一个函数来处理来自主线程的消息
onmessage = function(event) {
  const num = event.data.num;
  const result = compute(num);
  postMessage(result);
};
```



#### 处理网络请求

假设有一个应用需要发起大量的网络请求。如果在主线程中执行这些请求，可能会导致用户界面无响应，用户体验差。为了避免这个问题，可以利用 Web Worker 在后台处理这些请求。通过这样做，主线程可以同时执行其他任务，而 Web Worker 负责处理网络请求，从而提高性能和改善用户体验。

```js
// 创建一个新的 Web Worker
const worker = new Worker('worker.js');

// 定义一个函数来处理来自Web Worker的消息
worker.onmessage = function(event) {
  const response = event.data;
  console.log(response);
};

// 向Web Worker发送一个消息，以启动计算
worker.postMessage({ urls: ['https://api.example.com/foo', 'https://api.example.com/bar'] });
```

```js
// 定义一个函数来执行网络请求
function request(url) {
  return fetch(url).then(response => response.json());
}

// 定义一个函数来处理来自主线程的消息
onmessage = async function(event) {
  const urls = event.data.urls;
  const results = await Promise.all(urls.map(request));
  postMessage(results);
};
```



#### 并行处理

假设应用需要执行大量独立计算。 如果在主线程中依次执行这些计算，用户界面将变得无响应，用户体验将受到影响。 为了避免这种情况，可以实例化多个 Web Worker 来并行执行计算。

```js
// 创建三个新的 Web Worker
const worker1 = new Worker('worker.js');
const worker2 = new Worker('worker.js');
const worker3 = new Worker('worker.js');


// 定义三个处理来自 worker 的消息的函数
worker1.onmessage = handleWorkerMessage;
worker2.onmessage = handleWorkerMessage;
worker3.onmessage = handleWorkerMessage;

function handleWorkerMessage(event) {
  const result = event.data;
  console.log(result);
}

// 将任务分配给不同的 worker 对象，并发送消息启动计算
worker1.postMessage({ num: 1000000 });
worker2.postMessage({ num: 2000000 });
worker3.postMessage({ num: 3000000 });
```

```js
// 定义一个函数来执行单个计算
function compute(num) {
  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += i;
}
  return sum;
}

// 定义一个函数来处理来自主线程的消息
onmessage = function(event) {
  const result = compute(event.data.num);
  postMessage(result);
};
```





## 浏览器渲染原理及流程

先来看看 Chrome 浏览器的多进程架构：

![640](https://www.huangyihui.cn/upload/gburlimg/541693e00228f.png)



通常，我们打包出来的 HTML、CSS、JavaScript 等文件，经过浏览器运行之后就会显示出页面，这个过程就是浏览器的渲染进程来操作实现的，渲染进程的主要任务就是**将静态资源转化为可视化界面。**

由于渲染机制比较复杂，所以渲染模块在执行过程中会被划分为很多子阶段，输入的静态资源经过这些子阶段，最后输出页面。我们将一个处理流程称为渲染流水线，其大致流程如下图所示：

![640 (1)](https://www.huangyihui.cn/upload/gburlimg/ca342e147c063.png)



这里主要包含五个过程：

- **DOM树构建**：渲染引擎使用HTML解析器（调用XML解析器）解析HTML文档，将各个HTML元素逐个转化成DOM节点，从而生成DOM树；
- **CSSOM树构建**：CSS解析器解析CSS，并将其转化为CSS对象，将这些CSS对象组装起来，构建CSSOM树；
- **渲染树构建**：DOM 树和 CSSOM 树都构建完成以后，浏览器会根据这两棵树构建出一棵渲染树；
- **页面布局**：渲染树构建完毕之后，元素的位置关系以及需要应用的样式就确定了，这时浏览器会计算出所有元素的大小和绝对位置；
- **页面绘制**：页面布局完成之后，浏览器会将根据处理出来的结果，把每一个页面图层转换为像素，并对所有的媒体文件进行解码。

对于这五个流程，每一阶段都有对应的产物：**DOM树、CSSOM树、渲染树、盒模型、界面。**

下图为渲染引擎工作流程中各个步骤所对应的模块：

![640 (2)](https://www.huangyihui.cn/upload/gburlimg/54665594894e8.png)



从图中可以看出，渲染引擎主要包含的模块有：

- **HTML 解析器**：解析HTML文档，主要作用是将HTML文档转换成DOM树；
- **CSS 解析器**：将DOM中的各个元素对象进行计算，获取样式信息，用于渲染树的构建；
- **JavaScript 解释器**：使用JavaScript可以修改网页的内容、CSS规则等。JavaScript解释器能够解释JavaScript代码，并通过DOM接口和CSSOM接口来修改网页内容、样式规则，从而改变渲染结果；
- **页面布局**：DOM创建之后，渲染引擎将其中的元素对象与样式规则进行结合，可以得到渲染树。布局则是针对渲染树，计算其各个元素的大小、位置等布局信息。
- **页面绘制**：使用图形库将布局计算后的渲染树绘制成可视化的图像结果。



### 渲染流程

**整个渲染流程的过程总结如下：**

1. 将HTML内容构建成DOM树；
2. 将CSS内容构建成CSSOM树；
3. 将DOM 树和 CSSOM 树合成渲染树；
4. 根据渲染树进行页面元素的布局；
5. 对渲染树进行分层操作，并生成分层树；
6. 为每个图层生成绘制列表，并提交到合成线程；
7. 合成线程将图层分成不同的图块，并通过栅格化将图块转化为位图；
8. 合成线程给浏览器进程发送绘制图块指令；
9. 浏览器进程会生成页面，并显示在屏幕上。



### 重排和重绘

我们知道，渲染树是动态构建的，所以，DOM节点和CSS节点的改动都可能会造成渲染树的重新构建。渲染树的改动就会造成页面的重排或者重绘。下面就来看看这两个概念，以及它们触发的条件和减少触发的操作。



#### 重排

当我们的操作引发了 DOM 树中几何尺寸的变化（改变元素的大小、位置、布局方式等），这时渲染树里有改动的节点和它影响的节点都要重新计算。这个过程就叫做重排，也称为回流。在改动发生时，要重新经历页面渲染的整个流程，所以开销是很大的。

以下操作都会导致页面重排：

- 页面首次渲染；
- 浏览器窗口大小发生变化；
- 元素的内容发生变化；
- 元素的尺寸或者位置发生变化；
- 元素的字体大小发生变化；
- 激活CSS伪类；
- 查询某些属性或者调用某些方法；
- 添加或者删除可见的DOM元素。

在触发重排时，由于浏览器渲染页面是基于流式布局的，所以当触发回流时，会导致周围的DOM元素重新排列，它的影响范围有两种：

- 全局范围：从根节点开始，对整个渲染树进行重新布局；
- 局部范围：对渲染树的某部分或者一个渲染对象进行重新布局。



#### 重绘

当对 DOM 的修改导致了样式的变化、但未影响其几何属性（比如修改颜色、背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（会跳过重排环节），这个过程叫做重绘。简单来说，重绘是由对元素绘制属性的修改引发的。

当我们修改元素绘制属性时，页面布局阶段不会执行，因为并没有引起几何位置的变换，所以就直接进入了绘制阶段，然后执行之后的一系列子阶段。相较于重排操作，重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些。

下面这些属性会导致回流：

- color、background 相关属性：background-color、background-image 等；
- outline 相关属性：outline-color、outline-width 、text-decoration；
- border-radius、visibility、box-shadow。

注意：**当触发重排时，一定会触发重绘，但是重绘不一定会引发重排。**



相对来说，重排操作的消耗会比较大，所以在操作中尽量少的造成页面的重排。为了减少重排，可以通过以下方式进行优化：

- 在条件允许的情况下尽量使用 CSS3 动画，它可以调用 GPU 执行渲染。
- 操作DOM时，尽量在低层级的DOM节点进行操作
- 不要使用`table`布局， 一个小的改动可能会使整个`table`进行重新布局
- 使用CSS的表达式
- 不要频繁操作元素的样式，对于静态页面，可以修改类名，而不是样式。
- 使用 absolute 或者 fixed，使元素脱离文档流，这样他们发生变化就不会影响其他元素
- 避免频繁操作DOM，可以创建一个文档片段`documentFragment`，在它上面应用所有DOM操作，最后再把它添加到文档中
- 将元素先设置`display: none`，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。
- 将DOM的多个读操作（或者写操作）放在一起，而不是读写操作穿插着写。这得益于**浏览器的渲染队列机制**。

浏览器针对页面的回流与重绘，进行了自身的优化——**渲染队列，** 浏览器会将所有的回流、重绘的操作放在一个队列中，当队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会对队列进行批处理。这样就会让多次的回流、重绘变成一次回流重绘。



[引用](https://mp.weixin.qq.com/s/9GMk0kFTHyTW_UrL0svNpQ)





## 性能优化

### 常见内存泄漏

* 意外的全局变量。可以通过使用严格模式 `use strict` 来避免，对于临时存储大量信息的全局变量，当不再需要是，就手动将其设置为 null
  * 为未声明的变量赋值
  * 使用指向全局对象的 this
* 计时器 setTimeout 或 setInterval
* 闭包
* 事件监听器：活动事件侦听器将防止在其范围内捕获的所有变量被垃圾收集。
* 缓存
* 分离的 DOM 元素：将无需使用的引用设置为 null



```js
// 为未声明的变量赋值
function foo(arg) {
  bar = "hello world";
}
foo()		// window.bar


// 使用指向全局对象的 this
function foo() {
  this.bar = "hello world";
}
foo();


// 闭包
function outer() {
  const potentiallyHugeArray = [];

  return function inner() {
    potentiallyHugeArray.push('Hello');  
    console.log('Hello');
  };
};
const sayHello = outer();
function repeat(fn, num) {
  for (let i = 0; i < num; i++){
    fn();
  }
}
repeat(sayHello, 10);


// 事件监听器
const hugeString = new Array(100000).join('x');
document.addEventListener('keyup', function() { // 匿名内联函数，无法删除它
  doSomething(hugeString); // hugeString 将永远保留在回调的范围内
});

// 创建指向事件侦听器的引用并将其传递给 removeEventListener() 来注销事件侦听器
function listener() {
  doSomething(hugeString);
}
document.addEventListener('keyup', listener); 
document.removeEventListener('keyup', listener);


// 分离的 DOM 元素
const div = document.createElement('div');
div = null
```

```js
// 缓存
let user_1 = { name: "Peter", id: 12345 };
let user_2 = { name: "Mark", id: 54321 };

//const mapCache = new Map();
const mapCache = new WeakMap();	// 使用 WeakMap 替换

function cache(obj){
  if (!mapCache.has(obj)){
    const value = `${obj.name} has an id of ${obj.id}`;
    mapCache.set(obj, value);

    return [value, 'computed'];
  }

  return [mapCache.get(obj), 'cached'];
}

cache(user_1); // ['Peter has an id of 12345', 'computed']
cache(user_1); // ['Peter has an id of 12345', 'cached']
cache(user_2); // ['Mark has an id of 54321', 'computed']

console.log(mapCache); // {{…} => 'Peter has an id of 12345', {…} => 'Mark has an id of 54321'}
user_1 = null;

console.log(mapCache); // {{…} => 'Peter has an id of 12345', {…} => 'Mark has an id of 54321'}
```



### 常见 GC 算法

在JavaScript中，对象会保存在堆内存中，可以根据引用链从根访问它们。垃圾收集器 (Garbage Collector) 是 JavaScript 引擎中的一个后台进程，用于识别无法访问的对象、删除它们并回收内存。

* 引用计数
  * 可以即时回收垃圾对象
  * 减少程序卡顿时间
  * 无法回收循环引用的对象
  * 资源消耗较大
* 标记清理（js垃圾回收策略）
  * 可以回收循环引用的对象
  * 容易产生碎片化空间，浪费空间
  * 不会立即回收垃圾对象
* 标记整理
  * 减少碎片化空间
  * 不会立即回收垃圾对象
* 分代回收



### 优化工具

* 浏览器-任务管理器
  * 可以查看浏览器内各任务占用内存情况。使用 `shift + esc` 调起
* 浏览器-performance
  * 可以录制查看网页内存资源使用情况。
* 浏览器-Memory
  * 可以在不同时段生成快照，并在中间的搜索栏目输入 `Detached` 来过滤结果以找到分离的DOM节点







