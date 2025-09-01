## 深浅拷贝

浅拷贝: 可以将对象的最外层属性(基本数据类型)全部复制，里层属性(引用数据类型)仍然是引用关系

深拷贝: 完全将对象复制一份，并且新对象中的所有属性和原对象都没有关系



### 浅复制

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

// 浅拷贝的缺点: 引用数据类型的属性仍然是引用关系，一个对象修改，另一个对象也会受到影响
newObj.c[0] = 99
obj.d.n = 0
console.log(obj, newObj)
```



### 深拷贝

JSON方式虽然可以快速完成深拷贝，但是对于get,set方法和不可遍历属性，是复制不了的

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



**实现终极深拷贝**

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



