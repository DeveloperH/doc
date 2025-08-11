# 面试

## 不用第三方变量交换两个变量的值

```js
var n1 = 10
var n2 = 20
n1 = n1 + n2
n2 = n1 - n2
n1 = n1 - n2
console.log(n1)   // 20
console.log(n2)   // 10
```

```js
var n1 = 10
var n2 = 20;
[n1, n2] = [n2, n1]
console.log(n1)   // 20
console.log(n2)   // 10
```

```js
var n1 = 10
var n2 = 20
n1 = n1 ^ n2
n2 = n1 ^ n2
n1 = n1 ^ n2
console.log(n1)   // 20
console.log(n2)   // 10
```





## 99乘法表

```js
document.write("<table border='1px' cellpadding='0' cellspacing='0'> ")
for(var i=1; i<=9; i++){
  //外循环，控制行
  document.write("<tr>")
  for(var j=1;j<=i;j++){
    //内循环，控制列
    document.write("<td>"+j+"*"+i+"="+j*i+"</td>")
  }
  document.write("</tr>")
}
document.write("</table>")
```



## 冒泡排序

```js
for (var i = 0; i < array.length - 1; i++) {
  for (var j = 0; j < array.length - 1 - i; j++) {
    // 从小到大
    if (array[j] > array[j + 1]) {
      var tmp = array[j]
      array[j] = array[j + 1]
      array[j + 1] = tmp
    }
  }
}
```



## 原型

原型是什么？

原型是 function 对象的一个属性，它定义了构造函数制造出的对象的公共祖先。通过该构造函数产生的对象，可以继承该原型的属性和方法。

```js
var bar = {a: '002'}
function print() {
  bar.a = 'a'
  Object.prototype.b = 'b'
  return function inner() {
    console.log(bar.a)
    console.log(bar.b)
  }
}
print()()   // a b
// 解析：原型是共用的，原型中的属性一旦发生改变，会影响整个原型链。
```





## 闭包

### 十个数组存放十个函数，并且每个函数输入自己的索引

```js
// 问题
function test1() {
  var arr = []
  for(var i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i)  // 结果全部为10
    }
  }
  return arr
}

var myArr = test3()
for(var j = 0; j < 10; j++) {
  myArr[j]()
}

// 解决方案1
function test2() {
  var arr = []
  // 使用 let
  for(let i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i)  // 结果为0-9
    }
  }
  return arr
}

// 解决方案2
function test3() {
  var arr = []
  for(var i = 0; i < 10; i++) {
    // 通过立即执行函数和闭包，将参数套现(绑定在对应的函数中)
    (function (j) {
      arr[j] = function () {
        console.log(j)  // 结果为0-9
      }
    }(i))
  }
  return arr
}
```



## 合并两个数组并扁平化

```js
var a = [1,2,3]
var b = [4,5,6]

// 通过展开运算符完成
var result = [...a, ...b]		// [1,2,3,4,5,6]
```

合并两个对象同理。





## 面试题大全

### No.1

考察点：变量提升、arguments与实参的映射关系

```js
// 面试题1
a = 100;
function demo(e) {
  function e() {}
  arguments[0] = 2;
  console.log(e);
  if (a) {
    var b = 123;
    function c() {}
  }
  var c;
  a = 10;
  var a;
  console.log(b);
  f = 123;
  console.log(c);
  console.log(a);
}

var a;
demo(1);
console.log(a);
console.log(f);

// 结果为 2  undefined undefined 10  100  123
/*
  解析：因为实参和arguments是映射关系，他变我就变，所以e被修改为2
  执行到if时，a虽然被定义但还没赋值，所以a的值为undefin，if不会执行，所以b和c为undefined
  因为作用域链，函数内的a和全局的a都会先找最近的，所以一个为10，一个为100
  因为f没有用var声明，所以自动提升为全局，所以在外部也能访问到
*/

```



### No.2

考察点：this指向

```js
var name = '222'
var a = {
  name: '111',
  say: function() {
    console.log(this.name)
  }
}
var fun = a.say
fun()     // 222  解析：因为fun()是被window调用的，所以函数中的this指向window
a.say()   // 111  解析：函数中的this指向a

var b = {
  name: '333',
  say: function(fun) {
    fun()
  }
}
b.say(a.say)  // 222  解析：这里的fun()是被window调用的。
b.say = a.say
b.say()       // 333  解析：函数中的this指向b
```



### No.3

考察点：this指向、作用域链

```js
var foo = 123
function print() {
  // console.log(foo)  // 123  如果在覆盖foo之前，先访问foo，结果是123
  this.foo = 234
  console.log(foo)	// 234
  console.log(bar)  // 报错，bar is not defined
}
print()
// 解析：print()是由window调用的，所以函数中的this指向window，接着又通过this.foo覆盖了全局的foo
// 通过作用域链，最终访问到了window的foo，结果为234
```



```js
var a = 5
function test() {
  a = 0
  console.log(a)
  console.log(this.a)
  var a
  console.log(a)
}

test()  // 0  5  0
new test()  // 0 undefined 0
```





## 求和

### 不用循环求和

```js
// 数组求和，不允许使用循环，不允许使用标准库的函数
function sum(nums) {
  function f(i) {
    return i >= nums.length ? 0 : nums[i] + f(i + 1)
  }
  return f(0)
}

console.log(sum([2, 4, 3, 6]))  // 15
```





## 查找

### 找出只出现一次的数字

```js
function uniqueNumber(nums) {
  let result = 0;	
  for (let i = 0; i < nums.length; i++) {
    result = result ^ nums[i]
  }
  return result


  // return nums.reduce((a, b) => a ^ b, 0);
}

console.log(uniqueNumber([2, 3, 4, 2, 4, 6, 3]))
```



## 填空

### a==1&&a==2&&a==3

```js
let a = {
  n: 1,
  valueOf: function () {
    return this.n++
  }
}

console.log(a == 1 && a == 2 && a == 3)
```



























