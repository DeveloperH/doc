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
  var t = null
  return function (e) {
    clearTimeout(t)
    t = setTimeout(() => {
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



![image-20210828210030914](https://www.huangyihui.cn/upload/gburlimg/c8a07791fd7d.png)



## 函数节流

在一定时间内，一个函数被触发多次，只执行第一个，不执行后面的。当一定时间过去后，如果这个函数又被多次触发，还是像上面一样，只执行第一个，不执行后面的。以此类推。



原理: 记录现在触发的时间和最后一次触发的时间，当一定时间内，多次触发时，比较现在触发的时间和最后一次触发的时间，如果两次触发的时间还在一定时间内，则不执行这次的触发。



好处: 降低触发频率。和防抖的用途一样

```js
function throttle (callback, duration) {
  // 记录最后一次执行的时间
  var lasttime = new Date().getTime()
  return function () {
    // 记录现在执行的时间
    var now = new Date().getTime()
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



