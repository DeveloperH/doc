## 什么是Promise

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



## 用法

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



## 示例1

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



## 示例2

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





## 执行顺序

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



## Promise.prototype.then()

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



## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

当 promise 链中的任何内容失败并引发错误或拒绝 promise 时，则控制权会转到链中最近的 `catch()` 语句。



注意:

* 如果Promise状态已经变成`Resolved`，再抛出错误是无效的。
* 如果已经在`then`中处理了错误，那么就不会再执行`catch`
* `catch`方法返回的还是一个Promise对象，因此后面还可以接着调用`then`方法。

```js
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

```js
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



## 链式Promise示例

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

```js
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



## 其他方法

### Promise.finally()

`finally`方法用于指定不管Promise对象最后状态如何，都会执行的操作。常用来释放资源。

```js
new Promise((resolve, reject) => {
	resolve()
})
.finally(() => {
	console.log('finally')
})
```



### Promise.all()

Promise.all() 中可以传递一个数组作为参数，数组中放入要执行的Promise异步函数。

当all()中的异步全部完成后，会以数组的形式，统一返回其Promise中resolve()第一个参数的内容。

```js
Promise.all([
  getImage("images/1.jpg"),
  getImage("images/2.jpg"),
  getImage("images/3.jpg"),
]).then(function (list) {
  console.log(list);	// [img, img, img]
});
```



### Promise.race()

race()用于同时执行多个异步，如果哪个先完成就直接结束，处理这个先完成的。

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



### all() 和 race() 区别

all 和 race 异步组都是并列开跑，all是所有的都跑完了才执行then，race谁第一个跑完就执行谁，后面的就不执行了。







## 常见的错误

### Uncaught TypeError: undefined is not a promise

如果在控制台中收到 `Uncaught TypeError: undefined is not a promise` 错误，则请确保使用 `new Promise()` 而不是 `Promise()`。

******

### UnhandledPromiseRejectionWarning

这意味着调用的 promise 被拒绝，但是没有用于处理错误的 `catch`。 在 `then` 之后添加 `catch` 则可以正确地处理。



## 总结

Promise 是异步编程的一种解决方案，其实就是一个构造函数，自身上有all、resolve、reject这几个方法，原型上有then、catch等方法。

Promise 对象有三种状态，pending、resolved、rejected。对象的状态不受外界影响，且一旦状态改变，就不会再变。

在then方法中接受两个回调函数来处理Promise的结果，第一个函数是处理成功的回调，第二个函数是处理失败的回调(可选)。还可以在回调中返回一个新的Promise对象，并在下一个then方法中进行处理，形成多个then方法的链式操作。

## 参考

[阮一峰-ES6入门](https://es6.ruanyifeng.com/#docs/promise)







