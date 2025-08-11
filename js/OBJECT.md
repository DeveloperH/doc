# 对象

## 基于对象

JavaScript是基于对象的语言。

* 面向对象: 可以创建自定义的类型，很好的支持继承和多态。特征：封装、继承、多态。
* 基于对象: 无法创建自定义的类型，不能很好的支持继承和多态。但是可以`模拟`继承。



JS中的对象，就是无序属性的集合。

其属性可以包含基本值、对象或函数。对象就是一组没有数序的值。我们可以把JS中的对象想象成键值对，其中值可以是数据和函数。



函数和方法的区别: 

* 直接调用的是函数。例如alert()
* 通过对象调用的是方法。例如p1.say()





## Object类

在JS中，Object是所有类的基类，使用Object类来创建自定义对象时，可以无需定义构造函数。

```js
var obj = new Object()      // 定义一个对象
obj.name = 'zhangsan'       // 对象增加属性
obj.say = function(){
  console.log(this.name)
}
obj.say()     // 'zhangsan', 调用对象的方法
```



**为什么Object是所有类的父类?**

因为所有类在被系统加载之后，就会创建这个类的原型对象。`类名.prototype = new Object()`

Object类下的所有属性和方法会被这个原型对象所拥有。



Object类提供的几个属性:

* `constructor` : 返回构造器
* `prototype` : 返回原型对象
* `hasOwnProperty(property)` : 判断对象下是否有指定的属性，会忽略从原型链上继承到的属性
* `isPrototypeOf(object)` ：用于判断当前对象是否为另一个对象的原型
* `propertyIsEnumerable(propertyName)` ：用于判断给定的属性是否可以使用 `for-in` 语句枚举
* `toLocaleString()` ：返回对象的字符串表示
* `toString()` ：返回对象的字符串表示
* `valueOf()` ：返回对象对应的字符串、数值或布尔值表示。通常与 `toString()` 的返回值相同

```js
console.log(Object.constructor) // ƒ Function() { [native code] }  系统类的构造器内容是被隐藏的
console.log(Object.prototype)   // 获取Object类中的原型对象

function Person(p_name){
  this.name = p_name
}
var p = new Person('zhangsan')
console.log(Person.prototype)
console.log(p.hasOwnProperty('name'))   // true
```



## prototype 原型

原型是 function 对象的一个属性，它定义了构造函数制造出的对象的公共祖先。通过该构造函数产生的对象，可以继承该原型的属性和方法。原型也是对象。

需要注意的是，原型是共用的，原型中的属性一旦发生改变，会影响整个原型链。

利用原型特点和概念，可以提取共有属性。

```js
// 提取共有属性
Person.prototype.name = 'zhangsan'
Person.prototype.say = function() {
  console.log('hello')
}

function Person() {

}

var p1 = new Person()
var p2 = new Person()
console.log(p1.name)  // zhangsan
console.log(p2.say()) // hello
console.log(p1.__proto__ == Person.prototype)   // true
console.log(p1.__proto__ == p2.__proto__)       // true
```



`Person.prototype` : 原型属性

`p.__proto__` : 原型对象

两者有什么区别？

`__proto__` 是站在对象的角度讨论其原型对象，`prototype` 是站在构造函数的角度讨论原型属性，或构造函数创建的对象的原型对象



### 原型应用

当某些属性或方法是固定不变时，为了节约内存，可以把他们用`prototype`属性连接起来。

语法: `类名.prototype.属性 = 值`

```js
function Person(name){
  this.name = name
}
Person.prototype.num = 123
Person.prototype.say = function(){
  console.log('hello')
}

var p = new Person('zhangsan')
console.log(p.num)	// 123
p.say()	// 'hello'
```

在访问对象的某个属性或方法时，首先会在当前对象中查找有没有该属性。

如果当前对象没有，就在在构造函数的定义规则中查找。

如果还没有，就会到与该对象联系起来的构造函数的`prototype`属性中找。



![image-20210707233956125](https://www.huangyihui.cn/upload/gburlimg/d693255f7f52a.png)



### 原型链结构图

```
obj -> Object.prototype -> null
p -> Person.prototype -> Object.prototype -> null
```

![](https://www.huangyihui.cn/upload/gburlimg/9db4d7cb7705e.png)



![](https://www.huangyihui.cn/upload/gburlimg/6538ae5c3ef2f.png)



### 创建绝对空的对象

我们可以通过 `{}` 来创建空对象。 然而，通过方法中创建的对象，`proto`、`hasOwnProperty`等对象方法仍然是存在的，这是因为使用 `{}` 将创建一个继承自 `Object` 类的对象。

如果需要创建一个绝对空的对象，最好使用 `Object.create(null)`，它将创建一个不从任何对象继承且没有属性的对象。

```js
function Person() {

}

var o = {}	// 对象字面量，也会继承 Object.prototype

// 底层创建对象时调用的就是Object.create()
// var obj = Object.create(原型)
var p = Object.create(Person.prototype)   // 等于 var p = new Person()
var obj = Object.create(null)   // 创建空对象，里面不会有prototype属性
```

**undefined 和 null 也不会继承 `Object.prototype` 。**

![image-20220223173614025](https://www.huangyihui.cn/upload/gburlimg/4a97596905e2f.png)



## 构造函数

在JS中，每一个`function`，都可以认为它是同名类的构造函数。这种函数，也叫做构造器。

构造函数作用: 构造一个对象，并且返回的函数

声明对象: 使用new关键字 `var p1 = new Person()` 在实例化时，会直接执行Person构造函数。

执行过程:

1. 内存开辟空间，存储新创建的对象
2. 会把this设置为当前对象
3. 执行函数内部的代码，设置对象的属性和方法
4. 返回新创建的对象

```js
// Person类的构造函数。也叫做构造器
function Person(name, age){
  this.name = name
  this.age = age
  this.say = function(){
    console.log(this.name + ' : ' + this.age)
  }
}

var p1 = new Person('zs', 21)   // 通过调用构造函数，创建一个对象
p1.say()    // 'zs : 21'

// 可以通过对象.属性  或者 键值对[]方式获取和设置对象的属性值
console.log(p1['name'])   // 
p1.age = 24 // 调用p1对象中的属性
p1.say()    // 'zs : 24'
```



三个常用关键字：

* constructor : 返回对象的构造器，描述的是其构造函数
* typeof : 返回数据类型
* instanceof : 判断对象是否是某个类的实例

每一个对象都链接到其原型对象上，对象的constructor属性是由其原型对象提供的。

```js
function Person(id){
  this.id = id
}

var p1 = new Person(11)
p1.name = 'zhangsan'
p1.age = 30
console.log(`name:${p1.name}, age:${p1.age}, id:${p1.id}`)

console.log(p1.constructor) // [Function: Person]
console.log(typeof p1)  // object
console.log(p1 instanceof Person) //true
```







## 对象的字面量

对象的字面量就是可以用一对花括号来表示一个对象。对象中的多个属性用`,逗号`隔开，注意语法规范。

`var obj = {}  // 表示一个空的对象`

```js
var obj = {
  name: "张三",
  age: 21,
  data: {},
  arr: [],
  say: function(){
    console.log(this.name)
  }
}

obj.say()   // '张三'
console.log(obj.age)  // 21
```



## 对象不变性

对象不变性在任何编程语言中都是一个重要的概念。它会限制对象修改并防止不需要的更改。简而言之，对象的不变性就是将它的状态变为只读的。



### Object.freeze()

* Object.freeze(obj) ：使一个对象被冻结，返回传入的同一对象。它不会创建一个被冻结的副本。
  * 还可以冻结数组，使其不可变
  * 注意：不会影响嵌套对象，对于嵌套对象，冻结后仍然是可以操作的
* Object.isFrozen(obj) ：判断一个对象是否被冻结，返回布尔值。



```js
const user = {
  name: "zs",
  age: 24,
  info: {
    color: 'red'
  }
};

const freezeUser = Object.freeze(user);
freezeUser.age = 18;  // 在严格模式下报错
console.log(freezeUser.age); // 24
console.log(Object.isFrozen(user)); // true
console.log(Object.isFrozen(freezeUser)); // true

// 冻结不会影响嵌套对象
freezeUser.info.color = 'blue'
console.log(freezeUser.info.color); // blue

// 还可以冻结数组
const number = [1, 2, 3, 4, 5];
const freezeNumber = Object.freeze(number);
freezeNumber.push(6);
```



**使用循递归来逐级冻结**

```js
const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object") {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
};

const freezeUser = deepFreeze(user);
```



### Object.seal()

* Object.seal(obj) ：密封对象，返回传入的同一对象。
  * 相对于freeze()，Object.seal() 方法仅保护对象不能添加和删除属性，它允许更新现有的属性。
  * 对于嵌套的对象，是无法实现不可变的，如果想要实现，同样要使用递归来一层层来密封对象。
* Object.isSealed(obj) ：判断一个对象是否被密封，返回布尔值。

```js
const user = {
  name: "zs",
  age: 24
};

const sealUser = Object.seal(user);
console.log(Object.isSealed(user)); // true

sealUser.age = 18;
console.log(sealUser.age); // 18

delete sealUser.name  // 报错

console.log(Object.isFrozen(user)); // false
console.log(Object.isFrozen(sealUser)); // false
```



|         方法/操作          | 读取 | 创建 | 更新 | 删除 |
| :------------------------: | :--: | :--: | :--: | :--: |
|      Object.freeze()       |  ✓   |  ×   |  ×   |  ×   |
|       Object.seal()        |  ✓   |  ×   |  ✓   |  ×   |
| Object.preventExtensions() |  ✓   |  ×   |  ✓   |  ✓   |





## JSON

JSON是JavaScript Object Notation(JavaScript对象表示形式)的缩写，是一种轻量级的数据交换格式。它是JavaScript的子集。

JSON和对象字面量的区别，仅仅是属性需要使用双引号引起。对象字面量可以省略双引号。



**JSON是描述数据的一种标准规范。**

下面是 JSON 数据类型的完整列表：

- string：用引号括起来的文字。
- number：正整数或负整数或浮点数。
- object：用花括号括起来的键值对
- array：一个或多个 JSON 对象的集合。
- boolean：不带引号的 true 或 false 值。
- null：表示键值对没有数据，表示为null，不带引号。

```js
var json = {
  "name" : "zhangsan",
  "age" : 28,
  "say" : function(){
    console.log(this.name)
  }
}
```



### 方法

JSON 内置了两种方法：

- `JSON.parse(text, [reviver])` ：将数据转换为 JavaScript 对象。
  - text： 必需， 一个有效的 JSON 字符串。
  - reviver：可选，一个转换结果的函数， 将为对象的每个成员调用此函数。
- `JSON.stringify(value, replacer, space)` ：将 JavaScript 对象转换为字符串。
  - value ：要转换的 JavaScript 值（通常为对象或数组）
  - replacer ：可选。用于转换结果的函数或数组。
    - 如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。
    - 如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。
    - 当 value 参数也为数组时，将忽略 replacer 数组。
  - space ：可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 也可以使用非数字，如：`\t`。



```js
const json = '{"name": "zhangsan", "age": 18, "city": "beijing"}';

const myJSON = JSON.parse(json, (key, value) => {
  if(typeof value === "number") {
     return String(value).padStart(3, "0");
  }
  return value;
});
 
console.log(myJSON.name, myJSON.age);  // zhangsan 018
```

```js
// 隐藏属性
function stripKeys(...keys) {
  return (key, value) => {
    if (keys.includes(key)) {
       return;
    }
    return value;
  };
}

const user = {
  "name": "John",
  "password": "12345",
  "age": 30,
  "gender": "male"
};

console.log(JSON.stringify(user, stripKeys('password', 'gender')))
// 输出结果：{"name":"John","age":30}


// 过滤结果
const user = {
  "name": "John",
  "password": "12345",
  "age": 30
}

console.log(JSON.stringify(user, ['name', 'age']))
// 输出结果：{"name":"John","age":30}
```



### 异常处理

那如果 JSON 无效怎么办呢？比如缺少了逗号，引号等，上面的两种方法都会抛出异常。建议在使用这两个方法时使用`try...catch`来包裹，也可以将其封装成一个函数。

```js
let myJSON = {}
const json = '{"name": "zhangsan", "age": 18, "city": "beijing"}';

try {
  myJSON = JSON.parse(json);
} catch (e){
  console.error(e.message)
}
console.log(myJSON.name, myJSON.age);  // zhangsan 18
```

如果 JSON 操作时出现问题，这样就能确保应用程序不会因此中断。



## instanceof

用于判断是否是谁的对象，返回布尔值。

```
A对象  是不是  B构造函数构造出来的
本质上：看A对象的原型链上  有没有  B的原型
A instanceof B
```



typeof 和 instanceof的区别: 

* typeof可以获取任意变量的类型，在获取对象的类型时，不管什么对象，获取的结果都是object
* instanceof只能判断对象的类型，要精确判断对象的类型，使用instanceof



```js
var arr = []
console.log(typeof Array)           // object
console.log(arr instanceof Array)   // true
console.log(Array.isArray(arr))     // true

// 在程序中可以通过instanceof判断对象的具体类型
function check(arr){
  // 检测参数是否合法
  arr = arr || []
  // 检测arr是否是一个数组
  if(!(arr instanceof Array)){
    return 
  }
}
```



### 判断是数组还是对象

```js
console.log([] instanceof Array)    // true
console.log({} instanceof Array)    // false


console.log([].constructor)   // [Function: Array]
console.log({}.constructor)   // [Function: Object]


console.log(Object.prototype.toString.call([]))   // [object Array]
console.log(Object.prototype.toString.call({}))   // [object Object]
console.log(Object.prototype.toString.call(123))   // [object Number]
```





## in运算符

用于判断对象是否有某属性成员。语法: `属性名 in 对象`，返回布尔值，表示属性是否存在。

```js
var obj = { name: 'zhangsan'}
var v1 = 'name'
var v2 = 'age'
console.log(v1 in obj)    // true
console.log(v2 in obj)    // false
console.log('toString' in obj)  // true
```



开发中经常用来判断对象是否拥有某个属性，从而执行一些代码。还有其他方法也可以判断对象是否有某些属性。

```js
var obj = { name: 'zhangsan'}

if('name' in obj){
  // 当obj对象中有name属性时执行的代码
}

if(obj.age){
  // 当obj对象中有age属性时执行的代码
}

if(obj['name']){
  // 当obj对象中有name属性时执行的代码
}

var has = false
for(let key in obj){
  if(key == 'name'){
    has = true
    break
  }
}
```





## class

这里的 class 不是新的对象继承模型，它只是原型链的语法糖表现形式。

需要注意的是：

* 类的声明不会提升，如果需要使用某个 Class，就必须在使用之前定义它，否则会抛出错误
* 函数中使用 `static` 关键字定义构造函数的方法和属性
* 在类中定义函数不需要使用 `function` 关键字



```js
class Task {
  constructor() {
    console.log("task init");
  }

  showId() {
    console.log(20);
  }

  static loadAll() {
    console.log("loading all tasks...");
  }
}

console.log(typeof Task); // function
let task = new Task();    // task init
task.showId();  // 20
Task.loadAll(); // loading all tasks...
```



### 继承和超集

`extends` 允许一个子类继承父类，需要注意的是，子类的 `constructor` 函数中需要执行 `super()` 函数。

还可以在子类方法中调用父类的方法。



```js
class Car {
  constructor() {
    console.log("create a new car");
  }

  run() {
    console.log("car run");
  }
}

class BWM extends Car {
  constructor() {
    super();
    console.log("create BWM");
  }

  start() {
    super.run();
    console.log("car start");
  }
}

let c = new BWM();
// create a new car
// create BWM

c.start();
// car run
// car start
```





## super

ES6 允许在对象中使用 super 方法：

```js
var parent = {
  foo() {
    console.log("hello foo");
  },
};

var child = {
  foo() {
    super.foo();
    console.log("hello child");
  },
};

Object.setPrototypeOf(child, parent);
child.foo();
// hello foo
// hello child
```







## 包装类对象

### Object 对象

* parseInt(str, radix)：解析一个字符串并返回指定基数的十进制整数， `radix` 是2-36之间的整数，表示被解析字符串的基数。
  * 注意的是，该函数是先将判断str是不是radix进制格式的值，例如(3,2)，3不是2进制格式(0和1)的，所以结果为NaN
* Object.freeze(obj) ：使一个对象被冻结，返回传入的同一对象。它不会创建一个被冻结的副本。
  * 还可以冻结数组，使其不可变
  * 注意：不会影响嵌套对象，对于嵌套对象，冻结后仍然是可以操作的
* Object.isFrozen(obj) ：判断一个对象是否被冻结，返回布尔值。
* Object.seal(obj) ：密封对象，返回传入的同一对象。
  * 相对于freeze()，Object.seal() 方法仅保护对象不能添加和删除属性，它允许更新现有的属性。
  * 对于嵌套的对象，是无法实现不可变的，如果想要实现，同样要使用递归来一层层来密封对象。
* Object.isSealed(obj) ：判断一个对象是否被密封，返回布尔值。
* Object.preventExtensions(obj) ：让一个对象变的不可扩展，也就是永远不能再添加新的属性。
* Object.keys 、Object.values、Object.entries：它们都用来遍历对象，它会返回一个由给定对象的自身可枚举属性（**不含继承的和Symbol属性**）组成的数组，数组元素的排列顺序和正常循环遍历该对象时返回的顺序一致。
  * Object.keys(obj) ：返回包含对象键名的数组。不是字符串的key值会转化为字符串。
  * Object.values(obj) ：返回包含对象键值的数组
  * Object.entries(obj) ：返回包含对象键名和键值的数组
* Object.fromEntries(array) ：把键值对列表转换为一个对象。该方法相当于 Object.entries() 方法的逆过程。
* Object.hasOwn(obj, key) ：用于检查属性是否直接设置在对象上，返回布尔值
* Object.create(null) ：创建绝对空的对象



```js
console.log(parseInt(3, 8))   // 3
console.log(parseInt(2, 2))   // NaN
console.log(parseInt(3, 0))   // 3

const obj = {
  prop: 42
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// expected output: 42


let obj = { 
  id: 1, 
  name: 'hello', 
  age: 18 
};
console.log(Object.keys(obj));   // 输出结果: ['id', 'name', 'age']
console.log(Object.values(obj)); // 输出结果: [1, 'hello', 18]
console.log(Object.entries(obj));   // 输出结果: [['id', 1], ['name', 'hello'], ['age', 18]


const object = { key1: 'value1', key2: 'value2' }
const array = Object.entries(object)  // [ ["key1", "value1"], ["key2", "value2"] ]
Object.fromEntries(array)             // { key1: 'value1', key2: 'value2' }

// 将数组转成对象
const entries = [
  ['foo', 'bar'],
  ['baz', 42]
]
Object.fromEntries(entries)  //  { foo: "bar", baz: 42 }

// 将 Map 转成对象
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
])
Object.fromEntries(entries)  //  { foo: "bar", baz: 42 }


const example = {
  property: '123'
};
console.log(Object.prototype.hasOwnProperty.call(example, 'property'));	// true
console.log(Object.hasOwn(example, 'property'));	// true
```





### Math 数学对象

Math类下的方法都是静态方法，使用时要: `Math.方法名()` 调用

* ceil(num) : 返回大于或等于该数的最小整数(天花板数)
* floor(num) : 返回小于或等于该数的最大整数(地板数)
* min(n1, n2, ...) : 返回最小数
* max(n1, n2, ...) : 返回最大数
* pow(num1, num2) : 返回num1的num2次数
* random() : 返回随机数(0~1之间的小数)
* round(num) : 四舍五入
* sqrt(num) : 开平方根
* abs(num) : 绝对值
* trunc(value) ：去除一个数的小数部分，返回整数部分。
  * 对于非数值，`Math.trunc` 内部使用 `Number` 方法将其先转为数值。
  * 对于空值和无法截取整数的值，返回`NaN`。
* sign(value) ：判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。它会返回五种值。
  * 参数为正数，返回`1`；
  * 参数为负数，返回`-1`；
  * 参数为 0，返回`0`；
  * 参数为-0，返回`-0`;
  * 其他值，返回`NaN`。
* cbrt(value) ：计算一个数的立方根。
* clz32(value) ：将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
* Math.PI : 圆周率
* 

```js
console.log('天花板数：' + Math.ceil(5.0001))     // 6
console.log('天花板数：' + Math.ceil(-5.0001))		// -5
console.log('地板数：' + Math.floor(5.99999))     // 5
console.log('最小数：' + Math.min(2,14,1,41))     // 1
console.log('最大数：' + Math.max(12,21,32,11))   // 32
console.log('幂：' + Math.pow(3,3))               // 27, 3的3次方
console.log('随机数：' + Math.random())           // 生成0~1之间的随机浮点数
console.log('四舍五入：' + Math.round(5.4))       // 5
console.log('开平方根：' + Math.sqrt(4))          // 2, 4的平分根
console.log('绝对值: ' + Math.abs(-3.13))         // 3
console.log('圆周率: ' + Math.PI)                 // 3.141592653589793

// 当参数小数部分无限接近阀值的时候，结果会发生改变
console.log('地板数：' + Math.floor(1.9999999999999999))      // 2
console.log('四舍五入：' + Math.round(5.49999999999999999))   // 6

Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-0.1234) // -0
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

Math.sign(-5) // -1
Math.sign(5) // 1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
```





### Array 数组对象

![640](https://www.huangyihui.cn/upload/gburlimg/d844e6a822f75.png)



- 改变原数组的方法：fill()、pop()、push()、shift()、splice()、unshift()、reverse()、sort()；
- 不改变原数组的方法：concat()、every()、filter()、find()、findIndex()、forEach()、indexOf()、join()、lastIndexOf()、map()、reduce()、reduceRight()、slice()、some()。



属性和方法: 

* length : 返回数组的长度
* push(value) : 入栈，向数组的末尾添加一个或多个元素，并返回数组新的长度
* pop() : 出栈，删除并返回数组的最后一个元素
* shift() : 将数组的第一个元素删除，并返回被删除的元素
* unshift(value1 [,value...]) : 向数组的开头添加一个或更多元素，并返回数组新的长度
* toString() : 将数组转换为字符串，并返回结果。数组中的元素之间用逗号分隔。
* toLocaleString() ：返回一个字符串，表示数组中的所有元素。每个元素通过调用它们自己的 `toLocaleString` 方法转换为字符串，并且使用特定于语言环境的字符串（例如逗号“,”）分隔开。
* valueOf() ：返回的是数组本身。
* join(str) : 用于把数组中的所有元素放入一个字符串中返回，元素通过指定的分隔符str进行分隔。
* concat(value1 [,value...]) : 用于合并两个或多个数组，此方法**不会更改现有数组**，而是返回一个新数组。参数可以是数组或者值。
* flat([deep]) ：扁平化。创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。
  * 表示要打平的层级数。在不传参数时，flat()默认只会打平一级嵌套，如果想要打平更多的层级，就需要传给flat()一个数值参数。如果数组的嵌套层数不确定，最好直接使用 `Infinity` 。
* reverse() : 颠倒数组中元素的顺序。此方法**会改变原来的数组**。
* sort([callback]) : 用于对数组的元素进行排序并返回排序后的数组。此方法**会改变原来的数组**。
  * 如果没有使用参数，默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值**升序排序**
  * 在默认排序规则下，该方法不会对数组中的`number类型`元素进行大小排序，但是可以使用参数实现。
* slice(start, end) : 截取数组(从索引start开始，到索引end-1结束)，并返回一个新的数组。此方法**不会更改现有数组**。
  * start参数 : 数组的索引，从该索引开始提取原数组元素。
    * 如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取
    * 省略该参数则从索引0开始。如果参数超出原数组的索引范围，则返回空数组
  * end参数 : 数组的索引，在该索引处结束提取原数组元素(不包含end)。
    * 如果该参数为负数，则它表示在原数组中的倒数第几个元素结束抽取(还是不包含自己)。
    * 省略该参数则提取到原数组末尾(包括最后一个)
* splice(start, delCount [,item...]) : 通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。**此方法会改变原数组**。
  * start : 数组索引，用于指定修改的开始位置。
  * delCount : 要删除的元素个数，如果值为0表示不删除元素。
  * item... : 可选，要添加进数组的元素，从start位置开始。如果不指定，则表示只删除数组元素。
  * 返回值 : 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
* forEach(callback [,thisArg]) : 对数组的每个元素执行一次给定的函数。返回undefined。`IE9支持`
  * callback 为数组中每个元素执行的函数，该函数接收一至三个参数：
    * v 数组中正在处理的当前元素。
    * i 数组中正在处理的当前元素的索引。
    * a `forEach()` 方法正在操作的数组。
  * thisArg 可选参数。当执行回调函数 `callback` 时，用作 `this` 的值。
    * 如果 `thisArg` 参数有值，则每次 `callback` 函数被调用时，`this` 都会指向 `thisArg` 参数。如果省略了 `thisArg` 参数，或者其值为 `null` 或 `undefined`，`this` 则指向全局对象。
  * **注意: 因为 `forEach()`返回的是undefined，所以不可以链式调用。**
* filter(callback) : 创建一个新数组并返回, 其包含通过所提供函数实现的测试的所有元素。如果没有任何数组元素通过测试，则返回空数组。
  * callback 用来测试数组的每个元素的函数。返回 `true` 表示该元素通过测试，保留该元素，`false` 则不保留。它接受以下三个参数：
    * v 数组中当前正在处理的元素。
    * i 正在处理的元素在数组中的索引。
    * a 调用了 `filter()` 的数组本身。
* map(callback) : 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。可以进行链式调用。
  * callback 生成新数组元素的函数，使用三个参数：
    * v 数组中当前正在处理的元素。
    * i 正在处理的元素在数组中的索引。
    * a 调用了 `map()` 的数组本身。
  * 通过map遍历返回的数据形成新数组与原数组之间没有引用关系，并且返回的数组长度和原数组长度是完全相等的。
* flatMap(callback) : 和map()一样，返回一个新的数组，其中每个元素都是回调函数的结果，但它会将结果压缩成一个新数组(扁平化处理)。flatMap 通常在合并成一种方法的效率稍微高一些。
  * callback 生成新数组元素的函数，使用三个参数：同map()方法
  * IE不支持，且需要高版本的浏览器
* reduce(callback [,initialValue]) :  `reduce()` 方法对数组中的每个元素按序执行一个提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
  * callback 是执行数组中每个值(如果没有提供 `initialValue则第一个值除外`)的函数，使用四个参数：
    * accumulator : 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`
    * currentValue : 可选，数组中正在处理的元素。
    * currentIndex : 可选，数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。
    * array : 调用`reduce()`的数组
  * initialValue : 可选，作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
  * 回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：
    * 提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；
    * 没有提供`initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。
  * **注意：**如果没有提供`initialValue`，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。
* reduceRight(callback [,initialValue]) ：和`reduce()`用法几乎一致，只是该方法是对数组进行倒序查找的。而`reduce()`方法是正序执行的。
* every(callback) : every() 检测数组中的元素是否符合指定的条件，如果元素都满足则返回true，只要有一个没有满足则false
  * callback 用来测试每个元素的函数，可以接收三个参数: element，index，array
    * element : 用于测试的当前值
    * index : 可选，用于测试的当前值的索引 
    * array : 可选，调用every()的当前数组
  * 注意：若收到一个空数组，此方法在一切情况下都会返回 true。如果当前测试的元素不满足会立刻返回 false 并结束函数。
* some(callback) : some() 检测数组中的元素是否符合指定的条件，只要有一个元素符合条件，就返回 true
  * 参数同 some()
  * some() 不会对空数组进行检测
* find(callback) ：返回数组中满足提供的测试函数的**第一个元素的值**。否则返回 undefined。
* findIndex(callback) ：返回数组中满足提供的测试函数的**第一个元素的索引**。若没有找到对应元素则返回 -1。
* indexOf(value, formIndex) ：返回数组中第一次出现给定元素的下标，如果不存在则返回 -1。
* lastIndexOf(value, formIndex) ：和indexOf() 方法差不多，不过是从数组结尾开始向前搜索。
* includes(value, formIndex) ：判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。
* keys()、values()、entries() ：返回一个新的数组迭代器对象。keys() 返回数组的索引值；values() 返回数组元素；entries() 返回数组的键值对。
  * 可以通过 `Array.from(array.keys())`  直接转化为数组
* fill(value, start, end) ：用一个固定值填充一个数组中从起始索引（默认为 `0`）到终止索引（默认为 `array.length`）内的全部元素。它返回修改后的数组。
  * value：必需。填充的值；会覆盖原值；
  * start：可选。开始填充位置；
  * end：可选。停止填充位置 (默认为 `array.length`)。包前不包后。
* copyWithin(target, start, end) ：浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
  * target：必需。序列开始替换的目标位置，以 0 为起始的下标表示；
  * start：可选。要复制的元素序列的起始位置
  * end：可选要复制的元素序列的结束位置
* Array.from(origin, [fn, this]) ：从一个类似数组的可迭代对象中创建一个新的数组实例。只要一个对象有迭代器，Array.from 就能把它变成一个数组（注意：该方法会返回一个的数组，不会改变原对象）。
  * origin ：必选。类似数组的对象。
  * fn ：加工函数，新生成的数组会经过该函数的加工再返回。如果不确定返回值，则会返回 undefined
  * this ：this 作用域，表示加工函数执行时 this 的值



```js
var arr = ['zhangsan', 'li']
console.log(arr.length)             // 2
console.log(arr.push('xiaoming'))   // 3
console.log(arr.pop())              // 'xiaoming'
console.log(arr.toString())         // 'zhangsan,li'
console.log(arr.join('|'))          // 'zhangsan|li'
console.log(arr.shift())            // 'zhangsan'
console.log(arr.unshift('zs'))      // 2
console.log(arr.reverse())          // ["li", "zs"]
console.log(arr)

var arr2 = ['mike', 'john']
console.log(arr.concat(arr2))       // ["li", "zs", "mike", "john"]

var arr3 = ['abc', 'a', 'aa', 'a1']
console.log(arr3.sort())            // ["a", "a1", "aa", "abc"]

var arr4 = [12, 41, 12, 111, 33]
console.log(arr4.slice(1, 3))       // [41, 12]

var months = ['Jan', 'March', 'April', 'June']
console.log(months.splice(1, 0, 'Feb'))     // []  在索引1处不删除元素，并原地添加新的元素
console.log(months)                         // ["Jan", "Feb", "March", "April", "June"]
console.log(months.splice(4, 1, 'May'))     // ["June"] 在索引4处删除一个元素，并替换新的元素
console.log(months)                         // ["Jan", "Feb", "March", "April", "May"]
console.log(months.splice(2, 1))            // ["March"]  在索引2处删除1个元素
console.log(months)                         // ["Jan", "Feb", "April", "May"]

var arr = [31, 23, 21]
arr.forEach(function(v, i, a){
  console.log(v, i, a)
})
// 31 0 [31, 23, 21]
// 23 1 [31, 23, 21]
// 21 2 [31, 23, 21]


var arr = [12, 31, 23, 2, 5, 21]
var result = arr.filter(function(v){
  return v > 15
})
console.log(result)   // [31, 23, 21]

var res = arr.filter(v => v > 10)
console.log(res)  // [12, 31, 23, 21]

var arr = [2, 3, 5, 20]
var res = arr.map((v) => v * 2)
console.log(res)  // [4, 6, 10, 40]

[1, [2, 3]].flat()   // [1, 2, 3]
[1, [2, [3, 4]]].flat()   // [1, 2, [3, 4]]
[1, [2, [3, 4]]].flat(2)   // [1, 2, 3, 4]


// Array.from
var obj = {0: 'a', 1: 'b', 2:'c', length: 3};
Array.from(obj, function(value, index){
  console.log(value, index, this, arguments.length);
  return value.repeat(3);   //必须指定返回值，否则返回 undefined
}, obj);
Array.from('abc');                             // ["a", "b", "c"]
Array.from(new Set(['abc', 'def']));           // ["abc", "def"]
Array.from(new Map([[1, 'ab'], [2, 'de']]));   // [[1, 'ab'], [2, 'de']]
```



使用sort()从小到大排序:

```js
var nums1 = [12, 3, 42, 13, 11]
nums1.sort(function(a, b){
  return a- b
})
console.log(nums1)    // [3, 11, 12, 13, 42]

// 也可以写成
var nums2 = [12, 3, 42, 13, 11]
nums2.sort((a, b) => a - b)
console.log(nums2)    // [3, 11, 12, 13, 42]

let array = [0, 1, 5, 10, 15];
let array3 = array.sort((a, b) => b - a);  // 倒序排序
```



map():

```js
let arr = [1, 2, 3, 4, 5]
let arr2 = arr.map(function(item, index, arr) {
  // console.log(item, index, arr)
  return item
})

// 通过map遍历返回的数据形成新数组与原数组之间没有引用关系
// 并且返回的数组长度和原数组长度是完全相等的。
arr[0] = 99
console.log(arr)
console.log(arr2)
```

flatMap():

```js
let arr = [1, 2, 3, 4, 5]
let arr2 = arr.flatMap(function(item, index, arr) {
  // console.log(item, index, arr)
  return [item, item + 10]
})

// 和map()一样，返回一个新的数组，其中每个元素都是回调函数的结果，但它会将结果压缩成一个新数组(扁平化)。
console.log(arr)
console.log(arr2) // [1, 11, 2, 12, 3, 13, 4, 14, 5, 15]
```

reduce():

```js
let arr = [1, 2, 3, 4, 5]
let sum = arr.reduce(function(sum, currentValue, currentIndex, arr) {
  // console.log(sum, currentItem)
  return sum + currentValue
})
let res = arr.reduce(function(res, currentValue, currentIndex, arr) {
  // console.log(sum, currentItem)
  return res + currentValue
}, 10)

/**
 * 回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：
 * 如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；
 * 如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。
 * 
 * 注意: 如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。
 * 
*/
console.log(sum)  // 15
console.log(res)  // 25  因为15+初始值10
```

every():

```js
// 检测数组中的所有元素是否都小于 10。
var nums = [1, 3, 2, 21, 4, 6]

var result = nums.every(function(item){
  return item < 10
})
console.log(result)


var arr = [
  {id:1, check:true},
  {id:2, check:false},
  {id:3, check:false},
  {id:4, check:true},
  {id:5, check:false}
]

// 箭头函数写法
var res1 = arr.every(item=>{
  return item.check
})

var res2 = arr.every(item => item.id < 6)
console.log(res1, res2)
```



#### reduce()

* 数组求和
* 扁平化数组
* 数组分组
* 替代 `filter().map()`
* 统计数组元素出现次数
* 串行执行异步函数
* 反转字符串
* 数组去重



```js
// 数组求和
const total = [1, 2, 3, 4].reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  0
);
console.log(total); // 10


// 扁平化数组
const array = [[0, 1], [2, 3], [4, 5], [5, 6]];
const flattenedArray = array.reduce(
  (previousValue, currentValue) => previousValue.concat(currentValue),
  []
);
console.log(flattenedArray);  // [0, 1, 2, 3, 4, 5, 5, 6]


// 递归实现嵌套数组扁平化
const nestedArray = [[1, [2, 3]], [4, 5], [[6, 7], [8, 9]]];
function flattenArray(nestedArray) {
  return nestedArray.reduce(
    (accumulator, currentValue) => 
      accumulator.concat(
        Array.isArray(currentValue) ? flattenArray(currentValue) : currentValue
      ),
    []);
}
const flattenedArray = flattenArray(nestedArray);
console.log(flattenedArray)


// 数组分组
let countries = [
    {name: "Germany", continent: "Europe"},
    {name: "Brazil", continent: "South America"},
    {name: "India", continent: "Asia"},
    {name: "France", continent: "Europe"},
    {name: "South Korea", continent: "Asia"},
]
const groupedCountries = countries.reduce(
  (groupedCountries, country) => {
    if (!groupedCountries[country.continent]){
      groupedCountries[country.continent] = []
    }
    groupedCountries[country.continent].push(country)
    return groupedCountries
  },
  {}
);


// 数组过滤，替代 filter().map()。可以少遍历数组一次
// const newArray = numbers.filter(number => number > 30).map(number => number);
const numbers = [3, 21, 34, 121, 553, 12, 53, 5, 42, 11];
const newArray = numbers.reduce((previousValue, currentValue) => {
  if (currentValue > 30) {
    previousValue.push(currentValue)
  }
  return previousValue
}, []);



// 统计数组元素出现次数
const colors = ['green', 'red', 'red', 'yellow', 'red', 'yellow', 'green', 'green'];
const colorMap = colors.reduce((previousValue, currentValue) => {
    previousValue[currentValue] >= 1 ? previousValue[currentValue]++ : previousValue[currentValue] = 1;
    return previousValue;
  }, 
  {}
);


// 串行执行异步函数
const functions = [
  async function() { return 1; },
  async function() { return 2; },
  async function() { return 3; }
];
// 相当于执行了：Promise.resolve().then(fn1).then(fn2).then(fn3);
const res = await functions.reduce((promise, fn) => promise.then(fn), Promise.resolve());


// 反转字符串
const str = 'hello world';
[...str].reduce((a,v) => v + a);  // 输出结果：'dlrow olleh'
// 实现方式2 [...str].reverse().join('')


// 数组去重
const arr = ["🚀", "🚀", "🚀", "🌍"];
const dedupe = (acc, currentValue) => {
  if (!acc.includes(currentValue)) {
    acc.push(currentValue);
  }
  return acc;
};
const dedupedArr = arr.reduce(dedupe, []); // ["🚀", "🌍"];
// 推荐 [...new Set(array)]
```





### String 字符串类

属性和方法:

* length : 返回字符串的长度
* valueOf() ：返回某个字符串对象的原始值
* toString() ：返回字符串对象本身
* at(index) ：接受一个整数作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）。如果参数位置超出了字符串范围，`at()` 返回 `undefined`。
* indexOf(str [,position]) : 返回参数在字符串中第一次出现的位置。如果没有出现则返回-1
  * position : 可选参数，表示从哪个索引开始找起
* lastIndexOf(str [,position]) : 返回参数在字符串中最后一次出现的位置。如果没有出现则返回-1
* includes(str [,position]) : 用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。该方法是区分大小写的。`IE不支持`
  * str ：要在此字符串中搜索的字符串。
  * position ：可选，从当前字符串的哪个索引位置开始搜寻子字符串，默认值为 `0`。
* startsWith(str [,position]) ：该方法用于检测字符串**是否以指定的子字符串开始**。语法和 includes 方法一样
* endsWith(str [,position]) ：该方法用于检测字符串**是否以指定的子字符串结尾**。语法和 includes 方法一样
* replace(str1, str2) : 替换字符串，将str1替换成str2，只会替换一次
  * 还可以使用正则表达式来替换字符串。 如果 regexp 具有全局标志 g，那么 replace() 方法将替换所有匹配的子串。否则，它只替换第一个匹配子串。
* replaceAll(pattern, replacement) ：返回一个全新的字符串，所有符合匹配规则的字符都将被替换掉，替换规则可以是字符串或者正则表达式。
  * 在使用正则表达式的时候，如果非全局匹配（/g），会抛出异常
* match(regexp) ：用于在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。返回存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。
  * 该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。
* matchAll(regexp) ：返回一个迭代器，该迭代器包含了检索字符串与正则表达式进行匹配的所有结果（包括捕获组）。
* search(searchvalue) ：返回 str 中第一个与 regexp 相匹配的子串的起始位置。没有出现则返回-1
  * searchvalue ：字符串或正则。该方法不执行全局匹配，只会返回第一次匹配成功的结果
* toLowerCase() : 转换为小写
* toUpperCase() : 转换为大写
* concat(string1[, string2, ..., stringX]) ：连接两个或多个字符串，返回新的连接后的字符串。常用 `+号` 替代
* split(separator [,limit]) ：把一个字符串分割成字符串数组。
  * separator ：必须。字符串或正则表达式，从该参数指定的地方分割 string。
  * limit ：可选。该参数可指定返回的数组的最大长度。
  * 在将字符串分割成数组时，可以同时拆分多个分割符，使用正则表达式即可实现 `str.split(/[,;]/)`
* slice(start,end) ：用于提取字符串的某个部分，并以新的字符串返回被提取的部分。**包头不包尾**
  * start：必须。要截取的片断的起始下标，第一个字符位置为 0。如果为负数，则从尾部开始截取。
  * end：可选。要截取的片段结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。
* **已弃用。**substr(start,length) ：用于在字符串中抽取从开始下标开始的指定数目的字符。
  * start ：必须。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。
  * length：可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
* substring(from, to) ：用于提取字符串中介于两个指定下标之间的字符。**包头不包尾**
  * from：必须。一个非负的整数，规定要提取的子串的第一个字符在 string 中的位置。
  * to：可选。一个非负的整数，比要提取的子串的最后一个字符在 string 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。
  * 如果参数 from 和 to 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。如果 from 比 to 大，那么该方法在提取子串之前会先交换这两个参数。并且该方法不接受负的参数，如果参数是个负数，就会返回这个字符串。
* padStart(length, str)：当字符串长度不足指定length时，在字符串的左侧填充指定str来补足长度。常用于数值补位，例如日期、序号。
  * length: 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
  * str: 填充字符串。默认值为一个空格
  * 返回值：返回填充后的新字符串
* padEnd(length, str)：用于尾部补全。用法和 padStart 方法一样
* trim() ：从字符串的两端移除空白字符，并返回一个新的字符串。空白符包括：空格、制表符 tab、换行符等其他空白符等。
* trimStart() ：从字符串的开头移除空白字符，并返回一个新的字符串，
* trimEnd() ：从字符串的结尾移除空白字符，并返回一个新的字符串，
* charAt(index) : 从一个字符串中返回指定索引的字符
  * 一个介于 0 和字符串长度减 1 之间的整数。(0~length-1) 如果没有提供索引，charAt() 将使用 0。
  * 和 str[index] 索引值方式的区别：当index的取值不在str的长度范围内时，str[index]会返回undefined，而charAt(index)会返回空字符串
* charCodeAt(index) : 获取的是指定位置字符的Unicode值。返回值是 0 - 65535 之间的整数，表示给定索引处的 UTF-16 代码单元，如果指定位置没有字符，将返回 **NaN**：
* codePointAt(index) ：返回一个非负整数，该整数是从给定索引开始的字符的 Unicode 码位值。请注意，索引仍然基于 UTF-16 码元，而不是 Unicode 码位。
* repeat(n) ：返回一个新字符串，表示将原字符串重复n次。如果参数是小数，会向下取整。如果参数是负数或者Infinity，会报错。
* normalize() ：返回该字符串的 Unicode 标准化形式。用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
* `String.fromCharCode(numN)` ：返回由指定的 UTF-16 码元序列创建的字符串。
  * numN ：一个介于 `0` 和 `65535`（`0xFFFF`）之间的数字，表示一个 UTF-16 码元。大于 `0xFFFF` 的数字会被截断为最后的 16 位。不进行有效性检查。
* `String.fromCodePoint(numN)` ：将根据指定的码位序列返回一个字符串。
  * numN ：一个介于 `0` 和 `0x10FFFF`（包括两者）之间的整数，表示一个 Unicode 码位。
* `String.raw(str)` ：返回给定模板字符串的原始字符串。



```js
var str = 'hellojavasCRipt'

console.log(str.length)           // 15
console.log(str.indexOf('a'))     // 6
console.log(str.indexOf('a', 7))  // 8
console.log(str.substring(5, 9))  // 'java'
console.log(str.substr(2,5))      // 'lloja'
console.log(str.replace('a', '1'))  // 'helloj1vasCRipt'
console.log(str.toLowerCase())    // 'hellojavascript'
console.log(str.toUpperCase())    // 'HELLOJAVASCRIPT'
console.log(str)


var str = 'hellojs'
console.log(str.includes('js')) 	// true
console.log(str.includes('Js')) 	// false
console.log(str.includes('js',6)) // false

'8'.padStart(2, '0')	// '08'

console.log(str.charAt(1))				// 'h'

let str = "abcdef";
str.split("c");    // 输出结果：["ab", "def"]
str.split("", 4)   // 输出结果：['a', 'b', 'c', 'd'] 
str.split("");     // 输出结果：["a", "b", "c", "d", "e", "f"]

String.fromCharCode(0x20BB7) // "ஷ"
String.fromCodePoint(0x20BB7) // "𠮷"
String.raw`Hi\n${2+3}!` // 'Hi\\n5!'

const str = 'hello';
str.at(1) // "e"
str.at(-1) // "o"
```



```js
//ES6加强了对Unicode的支持，并且扩展了字符串对象。
//字符的Unicode表示法：JavaScript允许采用\uxxxx形式表示一个字符，其中“xxxx”表示字符的码点。
//但是，这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。
//ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

console.log("\u0061");	//a
console.log("\uD842\uDFB7");
console.log("\u20BB7");
console.log("\u{20BB7}");
console.log("\u{41}\u{42}\u{43}");	//ABC

//因为这个汉字Unicode码点超过0xFFFF，需要4个字节储存，所以长度会误判为2
//ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
var s = "𠮷";
console.log(s.length);	//2
console.log(s.codePointAt(0));	//134071 码点的十进制值
console.log(s.codePointAt(1));	//57271
console.log(s.codePointAt(0).toString(16));	//20bb7，转成十六进制
//codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
console.log(is32Bit("𠮷")); // true
console.log(is32Bit("a")); // false

//ES6提供了String.fromCodePoint方法，用于从码点返回对应字符,可以识别0xFFFF的字符
var s2 = String.fromCodePoint(0x20BB7);
console.log(s2);

//ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
//除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
for (let codePoint of 'foo'){
  console.log(codePoint);
}
var text = String.fromCodePoint(0x20BB7);
for (let i of text) {
  console.log(i);
}


//传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
var s = 'Hello world!';

console.log(s.startsWith('Hello')); // true
console.log(s.endsWith('!')); // true
console.log(s.includes('o')); // true
//这三个方法都支持第二个参数，表示开始搜索的位置。
console.log(s.startsWith('world', 6)); // true
console.log(s.endsWith('Hello', 5)); // true
console.log(s.includes('Hello', 6)); // true


//repeat()：repeat方法返回一个新字符串，表示将原字符串重复n次。
//参数如果是小数，会被向下取整。如果repeat的参数是负数或者Infinity，会报错。
//参数是0到-1之间的小数，会被取整变为0
//如果repeat的参数是字符串，则会先转换成数字。
console.log('x'.repeat(3)); 	//"xxx"
console.log('hello'.repeat(2));	 // "hellohello"
console.log('na'.repeat(0));	//""
console.log('na'.repeat(2.9));	//"nana"
// console.log('na'.repeat(-1));	//RangeError
console.log('na'.repeat('3'));	//"nanana"


//ES7推出了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart用于头部补全，padEnd用于尾部补全。
//padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
//如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
//如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
//如果省略第二个参数，则会用空格补全长度。

console.log('x'.padStart(5, 'ab'));	// 'ababx'
console.log('x'.padEnd(5, 'ab'));	// 'xabab'
console.log('xxx'.padStart(2, 'ab'));	// 'xxx'
console.log('xxx'.padEnd(2, 'ab'));	// 'xxx'
console.log('abc'.padStart(10, '0123456789'));	// '0123456abc'
console.log('x'.padStart(4)); // '   x'

//padStart的常见用途是为数值补全指定位数。
//另一个用途是提示字符串格式。
console.log('12'.padStart(10, '0'));	//"0000000012"
console.log('12'.padStart(10, 'YYYY-MM-DD'));	// "YYYY-MM-12"
console.log('09-12'.padStart(10, 'YYYY-MM-DD'));	//"YYYY-09-12"


//模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
//如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
//如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
//模板字符串中嵌入变量，需要将变量名写在${}之中。
//大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
//模板字符串之中还能调用函数。
//如果模板字符串中的变量没有声明，将报错。如果大括号内部是一个字符串，将会原样输出。
//模板字符串甚至还能嵌套。
//常用于通过模板字符串，生成正式模板的实例。
console.log(`In JavaScript '\n' is a line-feed.`);
console.log(`In JavaScript this is
not legal.`);
var sname = "小明"
console.log(`我是${sname}哦`);	//我是小明哦
console.log(`1+2=${1+2}`);	//1+2=3
function fn(){
  return "调用函数";
}
console.log(`开始调用函数哦：${fn()}`);

//它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。
//“标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。
//alert`123`;	//等同于alert(123)


//ES6还为原生的String对象，提供了一个raw方法。
//String.raw方法，返回给定模板字符串的原始字符串。也就是原样输出，不处理转义字符
var s1 = String.raw`Hi\n${2+3}!`;
console.log(s1);	//Hi\n5!
console.log(String.raw`Hi\u000A!`);
```





### Date 日期类

必须以Date类的实例化对象来调用Date中的方法。`var date = new Date()`

Date 对象基于 Unix Time Stamp，即自 1970 年 1 月 1 日（UTC）起经过的毫秒数。



方法:

* getFullYear() : 返回年份
* getMonth() : 返回月份(0-11)，月份从0开始，0代表1月，11代表12月
* getDate() : 返回每月的第几天
* getDay() : 返回星期几(0-6)，0代表星期天
* getHours() : 返回小时数
* getMinutes() : 返回分钟数
* getSeconds() : 返回秒数
* getMilliseconds() : 返回毫秒数
* getTime() ：获取当前时间戳
* Date.now() ：获取当前时间戳
* toTimeString() : 以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。



```js
const date = new Date()
console.log(date)   // Tue Jul 06 2021 23:50:18 GMT+0800 (中国标准时间)

console.log(date.getFullYear())     // 2021
console.log(date.getMonth())        // 6  (0-11)月份从0开始
console.log(date.getDate())         // 6  每月的第几天
console.log(date.getDay())          // 2  星期天为0
console.log(date.getHours())        // 23   小时数
console.log(date.getMinutes())      // 51   分钟数
console.log(date.getSeconds())      // 24   秒数
console.log(date.getMilliseconds()) // 毫秒数

console.log(date.toTimeString())		// 23:15:30 GMT+0800 (中国标准时间)

// 获取当前时间：24小时制，时分秒
new Date().toLocaleTimeString("zh-CN", {hour12: false})
```



### Number 数字类

* toFixed(digits) : 使用定点表示法来格式化一个数值，并返回格式化后的给定数字的字符串。也就是将数值保留多少位小数，该数值在必要时进行四舍五入，另外在必要时会用 0 来填充小数部分。
  * digits : 小数点后数字的个数；介于 0 到 20 （包括）之间。如果忽略该参数，则默认为 0。
* Number.isFinite(value) ：判断传入值是否是一个有限数。也就是说，它检查给定值是一个数字，且该数字既不是正的 Infinity，也不是负的 Infinity 或 NaN。对于非数值一律返回false。
* Number.isNaN(value) ：判断传入的值是否为 NaN，如果输入不是数字类型，则返回 false。
* Number.isInteger(value) ：判断一个数值是否为整数。如果参数不是数值，直接返回 false。如果对数据精度的要求较高，不建议使用。
* Number.isSafeInteger(value) ：判断提供的值是否是一个安全整数。
* Number.parseInt(str) ：解析一个字符串参数并返回一个指定基数的整数。
* Number.parseFloat(str) ：解析参数并返回浮点数。如果无法从参数中解析出一个数字，则返回 NaN。



静态属性：

* Number.MIN_SAFE_INTEGER ：代表在 JavaScript 中最小的安全整数 -(253 - 1)。
* Number.MAX_SAFE_INTEGER ：表示在 JavaScript 中最大的安全整数（253 – 1）。



```js
var num = 9.8
console.log(typeof num.toFixed(2))  // string
console.log(num.toFixed(2))         // '9.80'
console.log(num.toFixed())          // '10'  四舍五入
console.log(19.99.toFixed(1))       // '20.0'  四舍五入

// 它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false

// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false
// 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。
Number.isInteger(3.0000000000000002) // true

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

```js
// toFixed 四舍五入保留有误问题
console.log((1.575).toFixed(2));  // 1.57 -> 没有四舍五入
console.log((1.576).toFixed(2));  // 1.58

const getRoundeNumber = (num, digit) => {
  if (!Number.prototype._toFixed) {
    Number.prototype._toFixed = Number.prototype.toFixed;
  }
  Number.prototype.toFixed = function (n) {
    return (this + 1e-14)._toFixed(n);
  };
  return Number(num).toFixed(digit);
};

console.log(getRoundeNumber(1.575, 2)); // 1.58
console.log(getRoundeNumber(1.576, 2)); // 1.58
```



### BigInt

JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回`Infinity`。

`BigInt` 是一种内置对象，它提供了一种方法来表示大于 `2^53 - 1` 的整数。这原本是 Javascript 中可以用 `Number` 表示的最大数字。`BigInt` 可以表示任意大的整数。

* 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀`n`。
* BigInt 与普通整数是两种值，它们之间并不相等。
* `typeof` 运算符对于 BigInt 类型的数据返回 `bigint`。
* BigInt 可以使用负号（`-`），但是不能使用正号（`+`），因为会与 asm.js 冲突。



JavaScript 原生提供 `BigInt` 函数，可以用它生成 BigInt 类型的数值。转换规则基本与 `Number()` 一致，将其他类型的值转为 BigInt。

`BigInt()` 函数必须有参数，而且参数必须可以正常转为数值。没参数或者参数不能正常转为数值，就会报错。参数如果是小数，也会报错。



转换规则：

* 可以使用`Boolean()`、`Number()`和`String()`这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。
* 取反运算符（`!`）也可以将 BigInt 转为布尔值。



数学运算：

* BigInt 类型的 `+`、`-`、`*` 和 `**` 这四个二元运算符，与 Number 类型的行为一致。除法运算`/`会舍去小数部分，返回一个整数。
* 不带符号的右移位运算符`>>>` 和 一元的求正运算符 `+`  ，这两个运算符用在 BigInt 会报错。
* BigInt 如果与 `|0` 进行运算会报错。
* BigInt 不能与普通数值进行混合运算。
* BigInt 对应的布尔值，与 Number 类型一致，即`0n`会转为`false`，其他值转为`true`。
* 比较运算符（比如`>`）和相等运算符（`==`）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。
* BigInt 与字符串混合运算时，会先转为字符串，再进行运算。





```js
const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000

// BigInt 同样可以使用各种进制表示，都要加上后缀n。
0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制

42n === 42 // false
typeof 123n // 'bigint'

// 不能使用正号
-42n // 正确
+42n // 报错

let p = 1n;
for (let i = 1n; i <= 70n; i++) {
  p *= i;
}
console.log(p); // 11978571...00000000n


Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"
!0n // true
!1n // false

// 数学运算
9n / 5n  // 1n
1n + 1.3 // 报错
1n | 0 // 报错

// 错误的写法
Math.sqrt(4n) // 报错

// 正确的写法
Math.sqrt(Number(4n)) // 2

if (0n) {
  console.log('if');
} else {
  console.log('else'); // 执行
}

0n < 1 // true
0n < true // true
0n == 0 // true
0n == false // true
0n === 0 // false

'' + 123n // "123"
```

````js
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n

// 没参数或者参数不能正常转为数值，就会报错
new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError
BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError
````







### console 对象

`console` 对象提供了浏览器控制台调试的接口。

`console` 对象可以从任何全局对象中访问到，如浏览器作用域上的 `Window`，或者直接通过 `console` 引用。

方法: 

* console.log() : 向 Web 控制台输出一条消息。如果参数是对象，会以字符串的形式输出到控制台
* console.error() : 打印一条错误信息，这条信息会变成红色
* console.warn() : 打印一个警告信息，这条信息会变成黄色
* console.info() : 输出一个通知信息。
* console.dir() : 通过类似文件树样式的交互列表显示
* console.table(data) : 将数据以表格的形式显示。`data` 必须是一个数组或者是一个对象。`IE不支持`
* console.clear() : 清空控制台，并输出 `Console was cleared`
* console.time([timerName]) : 启动一个以形参作为特定名称的计时器，用来跟踪某一个操作的占用时长
* console.timeEnd([timerName]) : 结束特定的计时器并以`毫秒`打印其从开始到结束所用的时间
* console.assert(assertion, msg) : 如果第一个参数为 `false` ，则将消息和堆栈跟踪记录到控制台
* console.trace() : 输出一个堆栈跟踪。
* console.debug() : 输出"调试"级别的消息且仅仅控制台配置为显示调试输出时才显示该消息。

```js
var obj = {name: 'zhangsan', age: 21}
console.log(obj)
console.dir(obj)
console.error('123')
console.warn('123')
console.info('123')
console.table(obj)
console.clear()
console.assert(false, obj)
console.debug(obj)

console.time('test')
var arr = []
for(let i = 0; i < 10000; i++){
  arr.push(i)
}
console.dir(arr)
console.timeEnd('test') // test: 4.60400390625 ms

function foo() {
  function bar() {
    console.trace()
  }
  bar()
}
foo()
```



#### 占位符

可以在传递给 `console` 的方法的时候使用下面的字符进行参数的替换。

* `%o` 或 `%O` : 打印 JavaScript 对象
  * 当我们指定的对象是普通的object对象时，它们两个是没有区别的。
  * 如果是DOM节点，使用 `%o` 打印的是DOM节点的内容，包含其子节点。而`%O`打印的是该DOM节点的对象属性。
* `%d` 或 `%i` : 打印整数。如果传的是浮点数，小数部分会丢弃
* `%s` :打印字符串
* `%f` : 打印浮点数
* `%c` : css 样式

```js
var obj = {name: 'zhangsan', age: 21}

// 格式化输出
console.log('obj: %o end', obj)     // obj: {name: "zhangsan", age: 21} end
console.log('num: %d end', 123.66)  // num: 123 end
console.log('num: %s end', 123.66)  // num: 123.66 end
console.log('num: %f end', 123.66)  // num: 123.66 end
console.log('My Name is %c zs', 'color: skyblue; font-size: 30px;') 
```



严格地说，console.log()并不支持打印图片，但是可以使用CSS的背景图来打印图片，不过并不能直接打印，因为是不支持设置图片的宽高属性，所以就需要使用line-heigh和padding来撑开图片，使其可以正常显示出来。

```js
console.log('%c ','background-image:url("http://iyeslogo.orbrand.com/150902Google/005.gif");background-size:120% 120%;background-repeat:no-repeat;background-position:center center;line-height:60px;padding:30px 120px;');
```

可以使用字符画在线生成工具，将生成的字符粘贴到console.log()即可。在线工具：[IMG2TXT](https://www.degraeve.com/img2txt.php)





## Error

JavaScript 中的错误是一个对象，在发生错误时会抛出该对象以停止程序。

```js
const err = new Error('ErrorMsg')
const err = Error('ErrorMsg')

err.message   // 'ErrorMsg'
err.name      // 'Error'
```

Error 对象有三个属性：

- `message` : 带有错误消息的字符串；
- `name` : 错误的类型；
- `stack` : 函数执行的堆栈跟踪



### 错误类型

JavaScript 中有一系列预定义的错误类型。只要使用者没有明确处理应用程序中的错误，它们就会由 JavaScript 运行时自动选择和定义。

这些错误类型都是实际的构造函数，旨在返回一个新的错误对象。

JavaScript中的错误类型包括：

- `SyntaxError` ：表示语法错误
  - 缺少引号、缺少右括号、大括号或其他字符对齐不当
- `TypeError` ：某些值不是特定的预期类型
  - 调用不是方法的对象、试图访问 null 或未定义对象的属性
- `ReferenceError` ：表示引用错误
  - 在变量名中输入错误、试图访问其作用域之外的块作用域变量、在加载之前从外部库引用全局变量
- `RangeError` ：数值变量或参数超出其有效范围
  - 试图通过 Array 构造函数创建非法长度的数组、将错误的值传递给特定方法
- `URIError` ：表示 URI 的编码和解码出现问题
- `AggregateError` ：表示 Promise.any 的所有 Promise 都被拒绝
- `EvalError` ： 表示 `eval()` 函数调用发生错误
- `InternalError` ：表示 JavaScript 运行时引擎发生异常

**注意：现代 JavaScript 中不会抛出 EvalError 和 InternalError。**



JavaScript 提供了 `instanceof` 运算符可以用于区分异常类型：

```js
let x = -2;

try {
  if (typeof x !== "number") {
    throw TypeError("x 应是数字");
  } else if (x <= 0) {
    throw RangeError("x 应大于 0");
  } else {
    // ...
  }
} catch (err) {
  if (err instanceof TypeError) {
    // 处理 TypeError 错误
  } else if (err instanceof RangeError) {
    // 处理 RangeError 错误
  } else {
    // 处理其他类型错误
  }
}
```



### 自定义错误类型

可以通过扩展 Error 类以创建自定义错误类：

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("ValidationMsg");
} catch (e) {
  if (e instanceof ValidationError) {
    
  } else {
    
  }
}
```



### 抛出错误

Error 对象只有在被抛出时才会成为异常。

```js
throw TypeError("Expected number");
throw new TypeError("Expected number");
```

异常一旦抛出，就会在程序堆栈中冒泡，除非在某个地方被捕获。



### 错误处理

#### 同步

##### 常规函数的错误处理

```js
function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}

try {
  toUppercase(4);
} catch (error) {
  console.error(error);
} finally {
  console.log("finally");
}
```



##### 生成器函数的错误处理

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
go.throw(Error("Tired of iterating!"));	// 向生成器中注入异常
const secondStep = go.next().value; // undefined
```



```js
function* generate() {
  yield 33;
  yield 99;
  throw Error("Tired of iterating!");	// 向外部抛出异常
}

try {
  for (const value of generate()) {
    console.log(value);
  }
} catch (error) {
  console.error(error.message);
}
```



#### 异步

##### 使用 Promise 处理定时器错误

```js
function failAfterOneSecond() {
  setTimeout(() => {
    throw Error("Wrong!");
  }, 1000);
}

// 不生效
try {
  failAfterOneSecond();
} catch (error) {
  console.error(error.message);
}
```

```js
function failAfterOneSecond() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(Error("Error"));
    }, 1000);
  });
}

failAfterOneSecond().catch((reason) => console.error(reason.message));
```



##### 事件的错误处理

```js
const button = document.querySelector("button");

// 不生效
try {
  button.addEventListener("click", function () {
    throw Error("error");
  });
} catch (error) {
  console.error(error.message);
}
```

```js
const button = document.querySelector("button");

button.addEventListener("click", function () {
  try {
    throw Error("error");
  } catch (e) {
    console.log(e);
  }
});
```



##### async/await 的错误处理

```js
async function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}

// 通过 Promise 处理
toUppercase("hello")
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message))
  .finally(() => console.log("Always runs!"));
```

```js
async function toUppercase(string) {
  if (typeof string !== "string") {
    throw TypeError("Expected string");
  }

  return string.toUpperCase();
}

// 通过 try/catch 处理
async function consumer() {
  try {
    await toUppercase(98);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Finally");
  }
}

consumer();
```



##### 异步生成器的错误处理

```js
async function* asyncGenerator() {
  yield 33;
  yield 99;
  throw Error("Bad!");
}

const go = asyncGenerator();

go.next().then((value) => console.log(value));
go.next().then((value) => console.log(value));
go.next().catch((reason) => console.error(reason.message));
```

```js
async function* asyncGenerator() {
  yield 33;
  yield 99;
  throw Error("Bad!");
}

// 要使用异步迭代，需要用 async 函数包装 consumer
async function consumer() {
  try {
    for await (const value of asyncGenerator()) {
      console.log(value);
    }
  } catch (error) {
    console.error(error.message);
  }
}

consumer();
```

```js
async function* asyncGenerator() {
  yield 33;
  yield 99;
  yield 11;
}

const go = asyncGenerator();

go.next().then((value) => console.log(value));
go.next().then((value) => console.log(value));

// 外部抛出异常并处理
go.throw(Error("Let's reject!")).catch((reason) =>
  console.error(reason.message)
);

go.next().then((value) => console.log(value));
```

```js
async function* asyncGenerator() {
  try {
    yield 33;
    yield 99;
    yield 11;
  } catch (error) {
    console.error(error.message);
  }
}

const go = asyncGenerator();

go.next().then((value) => console.log(value));
go.next().then((value) => console.log(value));

// 外部抛出异常，内部处理
go.throw(Error("Reject!"));

go.next().then((value) => console.log(value));
```































