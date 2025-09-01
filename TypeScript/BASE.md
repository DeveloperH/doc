# 基础





## 数据类型

* 布尔值
* 数值
* 字符串
* 数组：如果指定了数组类型，那么数组中的值必须是该类型下的
* 元组：值必须和定义时的顺序、个数一致
* 枚举值：使用关键字 `enum` 声明
* any：任意类型
* void：可以表示方法没有返回值，它的值可以是 `undefined` 或者 `null` ，在 **strict 严格模式**下，值不能为 `null`
* null 和 undefined：非严格模式下，两者可以互传
* never：表示方法永远没有返回结果
* object
* 类型断言
  * 方式1：`<type>value`
  * 方式2：`value as type`	推荐
* unknown：表示未知类型，未赋值时访问不会报错，返回 undefined



**变量必须赋值后才能使用**

```typescript
let bool1: boolean
bool = true
let bool2: boolean = false

let num: number
num = 123
num = 0b1111011 // 2进制
num = 0o173     // 8进制
num = 0x7b      // 16进制

let str: string
str = 'abc'
str = `value: ${num}`

let arr1: number[]        // 数组内只能是 number
let arr2: Array<number>   // 写法2：数组内只能是 number
let arr3: (number | string)[]   // 数组内可以是 number 或者 string
let arr4: any[] = [1, 'abc']		// 数组内可以是任意类型
arr1 = [1, 2]
// arr2 = [1, 'abc']      // 报错：数组内只能是 number
arr3 = [1, 'abc']


let tuple: [string, number] // 值必须和定义时的顺序、个数一致
tuple = ['a', 1]

enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}
// Roles.SUPER_ADMIN  返回该值的索引 0
// Roles.USER	返回该值的索引 2
// Roles[0]   返回索引的值 SUPER_ADMIN，没有则返回 undefined

enum Status {
  ONLINE = 1, // 设置起始索引，后面枚举值索引跟着会自增
  OFFLINE,
  BUSY = 6    // 自定义索引
}

let value: any  // 任意类型
let arr: any[] = [1, 'abc']
value = 'abc'
value = 123
value = [1, 'abc', true]

// 方法如果没有返回值，可以用 void 表示
const consoleText = (text: string): void => {
  console.log(text)
}
consoleText('abc')

// 方法如果有返回值，则可以指名返回值类型
const getNumber = (num: number): number => {
  return num + 1
}
let res = getNumber(123)	// 124

let v: void
v = undefined
v = null  // 严格模式下，void 不能赋值为 null

let u: undefined
u = undefined

let n: null
n = null

const errFunc = (message: string): never => {
  throw new Error(message)
}

const infiniteFunc = (): never => {
  while(true) {}
}

let obj: object
obj = {
  name: 'hlw'
}

function getObject(obj: object): void {
  console.log(obj)
}
getObject(obj)	// {name: 'hlw'}

// 类型断言
const getLength = (target: string | number): number => {
  if ((<string>target).length || (target as string).length === 0) {
    return (<string>target).length
  } else {
    return target.toString().length
  }
}


let un: unknown
console.log(un) // undefined
```



### enum 原理

```typescript
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}
```

```javascript
var Roles;
(function (Roles) {
    Roles[Roles["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
    Roles[Roles["ADMIN"] = 1] = "ADMIN";
    Roles[Roles["USER"] = 2] = "USER";
})(Roles || (Roles = {}));

// Roles["SUPER_ADMIN"] = 0		会将 Roles.SUPER_ADMIN 赋值为0，并且该语句返回 0
// Roles[0] = "SUPER_ADMIN"		而后，再将Roles[0] 赋值为 SUPER_ADMIN
```



### 类型断言

```typescript
// 因为 number 类型没有 length 属性，所以会报错
const getLength = (target: string | number): number => {
  if (target.length || target.length === 0) {
    return target.length
  } else {
    return target.toString().length
  }
}
```

```typescript
// 类型断言
// 方式1：<type>value
// 方式2：value as type	推荐
const getLength = (target: string | number): number => {
  if ((<string>target).length || (target as string).length === 0) {
    return (<string>target).length
  } else {
    return target.toString().length
  }
}

getLength(123)  // 3
```





## Symbol

* 两个 `Symbol()` 不相等，`Symbol.for()` 例外
* `Symbol()` 中的参数可以是 string | number | undefined
* `Symbol()` 是真值
* 可以用作对象的属性
  * 只能通过 `对象[属性名]` 的方式修改属性
  * `Symbol` 类型的属性不会被 `for in` 、`Object.keys()` 、`Object.getOwnPropertyNames()` 、`JSON.stringify()` 返回
  * 如果想要返回 `Symbol` 类型的属性，可以使用 `Object.getOwnPropertySymbols()` 、`Reflect.ownKeys()`
* 属性或方法
  * `Symbol.keyFor()` ：获取 `Symbol.for()` 的值，如果没有则返回 undefined
  * `Symbol.hasInstance`
  * `Symbol.isConcatSpreadable`
  * `Symbol.species`
  * `Symbol.toStringTag`
  * `toPrimitive`





```typescript
// Symbol()	  string | number | undefined
// typeof Symbol()	=> 'symbol'


const s1 = Symbol()
const s2 = Symbol()
// s1 === s2		false

const s3 = Symbol('hlw')
const s4 = Symbol('hlw')
// s3 === s4		false
console.log(Boolean(s3))  // true
console.log(!s3)          // false

// 可以用作对象的属性
const s5 = Symbol('name')
const info = {
  [s5]: 'hlw',
  age: 18,
  sex: 'man'
}
console.log(info) // {Symbol(name): 'hlw'}
info[s5] = 'hhh'	// 只能通过对象[属性名]的方式修改属性
// info.s5 = 'abc'

for (let key in info) {
  console.log(key)  // age sex
}
Object.keys(info)		//  ['age', 'sex']
Object.getOwnPropertyNames(info)		// ['age', 'sex']
JSON.stringify(info)		// {"age":18,"sex":"man"}
Object.getOwnPropertySymbols(info)	// [Symbol(name)]
Reflect.ownKeys(info)		// ['age', 'sex', Symbol(name)]

// 获取 Symbol.for 的key
const s6 = Symbol.for('hlw')
const s7 = Symbol.for('hlw')
// s6 === s7	true
Symbol.keyFor(s6)		// hlw
```





## interface

在定义方法时，需要给参数限制类型，可以用接口进行限制。当参数的类型和接口中的类型不一致，或者参数不一致时会提示错误。

定义属性时也可以使用接口进行限制。



* 可选属性：属性名后面加上 `?`
* 多余属性检查：当传递了接口中没有定义的属性，会进行多余属性检查，并提示错误
  * 绕开多余属性检查的方式
  * 方式1：使用类型断言 `as interface`
  * 方式2：给接口添加任意类型的属性 `[prop: string]: any`
  * 方式3：使用外部对象的方式
* 只读属性：属性名前面加上 `readonly`，修改只读属性会报错
* 属性名类型限制：`[prop: string]: any`  参数名不一定是 prop，可以是任意属性名
* 接口中的类型
  * 属性类型
  * 函数类型
  * 索引类型
* 继承接口 extends ：`interface interfaceName1 extends interfaceName2 `
* 混合类型接口



```typescript
// 在定义方法时，需要给参数限制类型，可以用接口进行限制
const getFullName = ({firstName, lastName}) => {
  return `${firstName} ${lastName}`
}

console.log(getFullName({
  firstName: 'zhang',
  lastName: 'san'
}))


// 定义接口
interface NameInfo {
  firstName: string,
  lastName: string
}

const getFullName = ({firstName, lastName}: NameInfo): string => {
  return `${firstName} ${lastName}`
}

// 当参数的类型和接口中的类型不一致，或者参数不一致时会提示错误
console.log(getFullName({
  firstName: 'zhang',
  lastName: 'san'
  // lastName: 123,  
}))
```



```typescript
interface Vegetable {
  color?: string,   // ?可选属性
  type: string,
  [prop: string]: any   // 添加任意类型的属性
}

const getVegetable = ({color, type}: Vegetable) => {
  return `A ${color ? (color + ' ') : ''}${type}`
}

// 当传递了接口中没有定义的属性，会进行多余属性检查，并提示错误
console.log(getVegetable({
  // color: 'red',
  type: 'tomato',
  size: 2
} as Vegetable))  // 使用类型断言来绕开多余属性检查

// 使用外部对象的方式
const vegetableInfo = {
  type: 'tomato',
  color: 'red',
  size: 2
}

console.log(getVegetable(vegetableInfo))

interface Vegetable {
  readonly type: string,  // 只读属性
}

let vegetableObj: Vegetable = {
  type: 'tomato'
}

vegetableObj.type = 'carrot'	// 修改只读属性会报错
```



```typescript
// 属性类型
interface NameInfo {
  firstName: string,
  lastName: string
}

// 索引类型
interface ArrInter {
  0: number,
  1: string
}

let arr: ArrInter = [1, 'abc']
// let arr2: ArrInter = [1, true]  // 索引对应的类型不一致会报错

// 函数类型，两种语法的效果是一样的
interface AddFunc {
  (num1: number, num2: number): number
}

type AddFunc2 = (num1: number, num2: number) => number

const add: AddFunc = (n1, n2) => n1 + n2
console.log(add(2, 3))


interface RoleDic {
  [id: string]: string  // 还可以给属性名设置类型
}

const role1: RoleDic = {
  1: 'super_admin'  // number类型不会报错是因为会默认将属性转成字符串
}

const role2: RoleDic = {
  a: 'super_admin',
  2: 'admin',
}


interface Vegetables {
  color: string
}
// 继承接口
interface Tomato extends Vegetables {
  radius: number
}

const obj: Tomato = {
  radius: 2,
  color: 'red'
}
```











