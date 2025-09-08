# 技巧



## 日期处理

### 当前时间

```js
const nowTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
    const hour = now.getHours() >= 10 ? now.getHours() : ('0' + now.getHours());
    const miu = now.getMinutes() >= 10 ? now.getMinutes() : ('0' + now.getMinutes());
    const sec = now.getSeconds() >= 10 ? now.getSeconds() : ('0' + now.getSeconds());
    return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
}
```



### 格式化时间

```js
const dateFormater = (formater, time) => {
    let date = time ? new Date(time) : new Date(),
        Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g, Y)
        .replace(/YY|yy/g, Y.substr(2, 2))
        .replace(/MM/g,(M<10 ? '0' : '') + M)
        .replace(/DD/g,(D<10 ? '0' : '') + D)
        .replace(/HH|hh/g,(H<10 ? '0' : '') + H)
        .replace(/mm/g,(m<10 ? '0' : '') + m)
        .replace(/ss/g,(s<10 ? '0' : '') + s)
}
// dateFormater('YYYY-MM-DD HH:mm:ss')
// dateFormater('YYYYMMDDHHmmss')


// 将时间转化为hour:minutes:seconds的格式：
const timeFromDate = date => date.toTimeString().slice(0, 8);
timeFromDate(new Date(2021, 11, 2, 12, 30, 0));  // 12:30:00
timeFromDate(new Date());  // 返回当前时间 09:00:00
```



### 计算日期相差天数

```js
const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
    
dayDif(new Date("2021-11-3"), new Date("2022-2-1"))  // 90
```



### 查找日期位于一年中的第几天

```js
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

dayOfYear(new Date());   // 307
```



### 检查日期是否有效

```js
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

isDateValid("December 17, 1995 03:24:00");  // true
```





## 字符串处理

### 字符串首字母大写

```js
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

capitalize("hello world")  // Hello world
```



### 翻转字符串

```js
const reverse = str => str.split('').reverse().join('');

reverse('hello world');   // 'dlrow olleh'
```



### 生成随机字符串

```js
const randomString = () => Math.random().toString(36).slice(2);
randomString();		// 示例：fhm8rcbh1o

// or
const randomString = (len) => {
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
    let strLen = chars.length;
    let randomStr = '';
    for (let i = 0; i < len; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * strLen));
    }
    return randomStr;
};
```



### 生成随机颜色

```js
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

console.log(randomColor());

let color = "#" + Math.random().toString(16).substring(2, 8);
console.log(color);
```



### 截断字符串

```js
const truncateString = (string, length) => string.length < length ? string : `${string.slice(0, length - 3)}...`;

truncateString('because I am too loooong!', 18)		// 'because I am to...'
```



### 去除字符串中的HTML

```js
const stripHtml = html => (new DOMParser().parseFromString(html, 'text/html')).body.textContent || '';

console.log(stripHtml('<p>hi</p>'))  // 'hi'
```



### 手机号中间四位变成*

```js
export const telFormat = (tel) => {
   tel = String(tel); 
    return tel.substr(0,3) + "****" + tel.substr(7);
};
```



### 全角转换为半角

```js
const toCDB = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}
```



### 半角转换为全角

```js
const toDBC = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    } else if (code == 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}
```





## 数字处理

### 去除小数

```js
// ~~ 运算符
~~3.1415926			// 3

// | 按位与运算符
23.9 | 0   			// 23
-23.9 | 0   		// -23

// Math 方法
Math.floor(3.156)	// 3
Math.ceil(3.156)	// 4
Math.round(3.156)	// 3
```



### 随机数

```js
// 获取两个整数之间的随机整数
// +1 是为了包含最大值
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
random(1, 50);

// 随机布尔值
const randomBoolean = () => Math.random() >= 0.5;
randomBoolean();
```



### 指定位数四舍五入

```js
const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d)

round(1.005, 2) //1.01
round(1.555, 2) //1.56
```



### 判断奇数偶数

```js
const isEven = num => num % 2 === 0;

isEven(996); 
```



### 数字千分位分隔

```js
const format = (n) => {
    let num = n.toString();
    let len = num.length;
    if (len <= 3) {
        return num;
    } else {
        let temp = '';
        let remainder = len % 3;
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
        } else { // 3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp; 
        }
    }
}
```



### 数字转化为大写金额

```js
const digitUppercase = (n) => {
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};
```



### 数字转化为中文数字

```js
const intToChinese = (value) => {
 const str = String(value);
 const len = str.length-1;
 const idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
 const num = ['零','一','二','三','四','五','六','七','八','九'];
 return str.replace(/([1-9]|0+)/g, ( $, $1, idx, full) => {
    let pos = 0;
    if($1[0] !== '0'){
      pos = len-idx;
      if(idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
        return idxs[len-idx];
      }
      return num[$1[0]] + idxs[len-idx];
    } else {
      let left = len - idx;
      let right = len - idx + $1.length;
      if(Math.floor(right / 4) - Math.floor(left / 4) > 0){
        pos = left - left % 4;
      }
      if( pos ){
        return idxs[pos] + num[$1[0]];
      } else if( idx + $1.length >= len ){
        return '';
      }else {
        return num[$1[0]]
      }
    }
   });
}
```





## 数组处理

### 移除重复项

```js
const removeDuplicates = (arr) => [...new Set(arr)];

console.log(removeDuplicates([1, 2, 2, 3, 3, 4, 4, 5, 5, 6]));
```



### 扁平化

```js
const flatten = (arr) => {
  let result = [];

  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
```



### 数组乱序

```js
const arrScrambling = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}
```



### 随机元素

```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
```



### 初始化数组

```js
// 初始化一个指定长度的一维数组，并指定默认值
const array = Array(6).fill('');

// 初始化一个指定长度的二维数组，并指定默认值
const matrix = Array(6).fill(0).map(() => Array(5).fill(0));
```



### 求和、最大值、最小值、平均数

```js
const array  = [5,4,7,8,9,2];

// 求和
array.reduce((a,b) => a+b);

// 最大值，二选一
Math.max(...array)
array.reduce((a,b) => a > b ? a : b);

// 最小值，二选一
Math.min(...array)
array.reduce((a,b) => a < b ? a : b);

// 平均数
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
average(1, 2, 3, 4, 5);   // 3
```



### 过滤错误值

```js
// 过滤数组中的false、0、null、undefined等值
const array = [1, 0, undefined, 6, 7, '', false]
array.filter(Boolean);	// [1, 6, 7]
```



### 数组元素转为数字

```js
const array = ['12', '1', '3.1415', '-10.01'];
array.map(Number);  // [12, 1, 3.1415, -10.01]
```



### 拼接数组

```js
const start = [1, 2] 
const end = [5, 6, 7] 

// 扩展运算符
const numbers = [9, ...start, ...end, 8] // [9, 1, 2, 5, 6, 7 , 8]

// concat()
start.concat(end);	// [1, 2, 3, 4, 5, 6, 7]
```



### 判断数组是否为空

```js
const isNotEmpty = arr => Array.isArray(arr) && arr.length > 0;

isNotEmpty([1, 2, 3]);  // true
```





## 对象处理

### 对象验证方式

```js
const parent = {
  child: {
    child1: {
      child2: {
        key: 10
      }
    }
  }
}

parent?.child?.child1?.child2		// 10

// parent && parent.child && parent.child.child1 && parent.child.child1.child2
```



### 检查对象是否为空

```js
Object.keys({}).length  // 0
Object.keys({key: 1}).length  // 1

const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
```



### 复制对象

```js
const initialVehicle = { brand: 'BWM', year: 2022, type: 'suv'};
const secondaryVehicle = Object.assign({}, initialVehicle);

// or
var secondaryVehicle = JSON.parse(JSON.stringify(initialVehicle));
```





## 浏览器操作

### 下载文件

```js
let fileName = "test.txt";
let blob = new Blob(["Hello World"], {type: "text/plain"});
const a = document.createElement("a");
a.style.display = "none";
a.href = URL.createObjectURL(blob);
a.download = fileName;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
```



### 滚动

```js
// 滚动到页面顶部
const goToTop = () => window.scrollTo(0, 0);

// 滚动到页面底部
const scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);  
}

// 滚动到指定元素区域
const smoothScroll = (element) => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
};
```



### 复制内容到剪切板

```js
const copyToClipboard = (text) => navigator.clipboard.writeText(text);

copyToClipboard("Hello World");
```



### 获取选中的文本

```js
const getSelectedText = () => window.getSelection().toString();

getSelectedText();
```



### 检测是否是黑暗模式

```js
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

console.log(isDarkMode)
```



### 判断页面是否已经底部

```js
const scrolledToBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
```



### 判断当前标签页是否激活

```js
const isTabInView = () => !document.hidden; 
```



### 获取可视窗口宽高

```js
// 获取高度
const getClientHeight = () => {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}


// 获取宽度
const getPageViewWidth = () => {
    return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}
```



### 全屏

```js
// 打开全屏
const toFullScreen = () => {
    let element = document.body;
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
}

// 退出全屏
const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
}
```



### 判断设备

```js
// 判断当前是否是苹果设备
const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.platform);


// 判断是否是安卓移动设备
const isAndroidMobileDevice = () => {
  return /android/i.test(navigator.userAgent.toLowerCase());
}


// 判断是移动还是PC设备
const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  // 常见的移动设备检测
  const mobileRegex = /(iphone|ipod|android|ios|ipad|blackberry|webos|symbian|windows phone|phone|mobile)/i;

  // 如果检测到匹配的移动设备
  if (mobileRegex.test(userAgent)) {
    return 'mobile';
  }

  // 可以通过检测桌面设备的平台来更精确地判断
  // 比如，如果是Windows、Mac、Linux等平台，直接判断为desktop
  if (platform.indexOf('win') !== -1 || platform.indexOf('mac') !== -1 || platform.indexOf('linux') !== -1) {
    return 'desktop';
  }

  // 其他无法分类的设备，默认返回desktop
  return 'desktop';
}


// 判断是Windows还是Mac系统
const osType = () => {
    const agent = navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
   const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
    if (isWindows) {
        return "windows";
    }
    if(isMac){
        return "mac";
    }
}


// 判断是否是微信/QQ内置浏览器
const broswer = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "weixin";
    } else if (ua.match(/QQ/i) == "qq") {
        return "QQ";
    }
    return false;
}


// 浏览器型号和版本
const getExplorerInfo = () => {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}

// 判断是否为移动端，并跳转网址
function urlredirect() {
  let sUserAgent = navigator.userAgent.toLowerCase(); 
  if ((sUserAgent.match(/(ipod|iphone os|midp|ucweb|android|windows ce|windows mobile)/i))) {
      window.location.href = 'http://m.xx.com';
  }
}
urlredirect();
```



### 重定向

```js
const redirect = url => location.href = url

redirect("https://www.google.com/")
```



### 打开浏览器打印框

```js
const showPrintDialog = () => window.print()
```



## url 处理

### 将Url参数转换成对象

```js
function formateParamsToObject() {
  let search = window.location.search, // 获取url的参数部分
    obj = {};
  if (!search) return obj;
  let params = search.split('?')[1]; // 获取参数
  let paramsArr = params.split('&');
  // 遍历数组
  for (let i of paramsArr) {
    let arr = i.split('=');
    obj[arr[0]] = arr[1] // 设置对象key,value
  }
  return obj
}

// www.baidu.com?id=1&type=2
formateParamsToObject() // {id: "1", type: "2"}
```



### 将对象转换成Url需要的参数

```js
function formateObjToParamStr(obj, tag = true) {
  let data = [],
    dStr = '';
  for (let key in obj) {
    data.push(`${key}=${obj[key]}`);
  }
  dStr = tag ? '?' + data.join('&') : data.join('&');
  return dStr
}

formateObjToParamStr({id:1,type:2}) // "?id=1&type=2"
```



### 通过参数名获取url中的参数值

```js
function getUrlParam(name, url) {
  let search = url || window.location.search,
    reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
    r = search.substr(search.indexOf('\?') + 1).match(reg);
  return r != null ? r[2] : '';
}

getUrlParam('id','www.baidu.com?id=1&type=2') // 1
```







## 存储

### 操作 localStorage

```js
// 存储
const loalStorageSet = (key, value) => {
    if (!key) return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};

// 获取
const loalStorageGet = (key) => {
    if (!key) return;
    return window.localStorage.getItem(key);
};

// 删除
const loalStorageRemove = (key) => {
    if (!key) return;
    window.localStorage.removeItem(key);
};
```



### 操作 sessionStorage

```js
// 存储
const sessionStorageSet = (key, value) => {
   if (!key) return;
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    window.sessionStorage.setItem(key, value)
};

// 获取
const sessionStorageGet = (key) => {
   if (!key) return;
    return window.sessionStorage.getItem(key)
};

// 删除
const sessionStorageRemove = (key) => {
   if (!key) return;
    window.sessionStorage.removeItem(key)
};
```



### 操作 cookie

```js
// 设置 cookie
const setCookie = (key, value, expire) => {
    const d = new Date();
    d.setDate(d.getDate() + expire);
    document.cookie = `${key}=${value};expires=${d.toUTCString()}`
};

// 读取
const getCookie = (key) => {
    const cookieStr = unescape(document.cookie);
       const arr = cookieStr.split('; ');
       let cookieValue = '';
       for (let i = 0; i < arr.length; i++) {
           const temp = arr[i].split('=');
           if (temp[0] === key) {
               cookieValue = temp[1];
               break
       }
    }
    return cookieValue
};

// 删除
const delCookie = (key) => {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
};

// 全部删除
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));
```





## 其他

### 获取变量的类型

```js
const trueTypeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

trueTypeOf('');     // string
trueTypeOf(0);      // number
trueTypeOf();       // undefined
trueTypeOf(null);   // null
trueTypeOf({});     // object
trueTypeOf([]);     // array
trueTypeOf(0);      // number
trueTypeOf(() => {});  // function


// 可以判断对象的类型
const getType = (value) => {
  if (value === null) {
    return value + "";
  }
  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}
```



### 阻止冒泡事件

```js
const stopPropagation = (e) => { 
    e = e || window.event; 
    if(e.stopPropagation) {    // W3C阻止冒泡方法 
        e.stopPropagation(); 
    } else { 
        e.cancelBubble = true; // IE阻止冒泡方法 
    } 
}
```



### 防抖函数

```js
const debounce = (fn, wait) => {
  let timer = null;

  return function() {
    let context = this,
        args = arguments;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
```



### 节流函数

```js
const throttle = (fn, delay) => {
  let curTime = Date.now();

  return function() {
    let context = this,
        args = arguments,
        nowTime = Date.now();

    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```



### 对象深拷贝

```js
const deepClone = (obj, hash = new WeakMap()) => {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date){
   return new Date(obj);
  } 
  //正则对象直接返回一个新的正则对象     
  if (obj instanceof RegExp){
   return new RegExp(obj);     
  }
  //如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)){
   return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  
  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) { 
    if(typeof obj[key] === 'object' && obj[key] !== null){
     cloneObj[key] = deepClone(obj[key], hash);
    } else {
     cloneObj[key] = obj[key];
    }
  }
  return cloneObj
}
```



### 将RGB转化为十六机制

```js
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(255, 255, 255);  // '#ffffff'
```



### 获取随机十六进制颜色

```js
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;

randomHex();
```

```js
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
console.log(randomColor());

let color = "#" + Math.random().toString(16).substring(2, 8);
console.log(color);

for(let i = 0; i<999;i++) {
  let color = "#" + Math.random().toString(16).substring(2, 8);
	console.log(color);
}
```





### 计算代码耗时

```js
const startTime = performance.now(); 
// 某些程序
for(let i = 0; i < 1000; i++) {
    console.log(i)
}
const endTime = performance.now();
const totaltime = endTime - startTime;
console.log(totaltime); // 耗时结果ms
```



### 华氏度和摄氏度之间的转化

```js
const celsiusToFahrenheit = (celsius) => celsius * 9/5 + 32;
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

celsiusToFahrenheit(15);    // 59
celsiusToFahrenheit(0);     // 32
celsiusToFahrenheit(-20);   // -4
fahrenheitToCelsius(59);    // 15
fahrenheitToCelsius(32);    // 0
```



### 动画调试

1. `F12` 打开控制台
2. `Ctrl + Shift + P` ，调起命令输入窗口
3. 输入 `disable JavaScript` 禁用 JS
4. 输入 `enable JavaScript` 启用 JS
5. 如果是监听了 Blur 事件，选中元素后，在 Elements 下的 Event Listeners 中找到对应的事件，删除即可



### 表单过滤空值

```js
const cleanedData = {
  ...this.data.detail
};
for (const key in cleanedData) {
  if (cleanedData[key] === null || cleanedData[key] === undefined) {
    cleanedData[key] = '';
  }
}
```





## 水印

### div 明水印

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>element-watermark</title>
  </head>

  <body>
    <div class="app">
      <h1>水印</h1>
      <p>hello</p>
    </div>
    <script>
      // 样式辅助函数，用于批量设置元素样式
      function cssHelper(el, prototype) {
        for (let i in prototype) {
          el.style[i] = prototype[i]
        }
      }
      // 创建一个用于承载水印的固定定位的div元素
      const waterWrapper = document.createElement("div")
      cssHelper(waterWrapper, {
        position: "fixed",
        top: "0px",
        right: "0px ",
        bottom: "0px",
        left: "0px",
        overflow: "hidden",
        display: "flex",
        "flex-wrap": "wrap",
        "pointer-events": "none",
      })
      // 定义水印块的高度和宽度
      const waterHeight = 100
      const waterWidth = 180
      // 获取页面的宽度和高度
      const { clientWidth, clientHeight } = document.documentElement || document.body
      // 计算页面可以容纳的水印列数和行数
      const column = Math.ceil(clientWidth / waterWidth)
      const rows = Math.ceil(clientHeight / waterHeight)

      // 创建单个水印元素的函数
      function createItem() {
        const item = document.createElement("div")
        item.innerHTML = "水印水印"
        cssHelper(item, {
          position: "absolute",
          top: `50px`,
          left: `50px`,
          fontSize: `16px`,
          color: "#000",
          lineHeight: 1.5,
          opacity: 0.1,
          transform: `rotate(-15deg)`,
          transformOrigin: "0 0",
          userSelect: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
        })
        return item
      }
      // 根据计算的列数和行数生成相应数量的水印块并添加到页面中
      for (let i = 0; i < column * rows; i++) {
        const wrap = document.createElement("div")
        cssHelper(
          wrap,
          Object.create({
            position: "relative",
            width: `${waterWidth}px`,
            height: `${waterHeight}px`,
            flex: `0 0 ${waterWidth}px`,
            overflow: "hidden",
          })
        )
        wrap.appendChild(createItem())
        waterWrapper.appendChild(wrap)
      }
      // 将承载水印的div元素添加到页面主体中
      document.body.appendChild(waterWrapper)

      // waterWrapper 被删除时，重新添加到页面中
      // 观察器的配置（需要观察什么变动）
      const config = { attributes: true, childList: true, subtree: true }
      // 当观察到变动时执行的回调函数
      const callback = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (let mutation of mutationsList) {
          mutation.removedNodes.forEach(function (item) {
            if (item === waterWrapper) {
              document.body.appendChild(waterWrapper)
            }
          })
        }
      }
      // 监听元素
      const targetNode = document.body
      // 创建一个观察器实例并传入回调函数
      const observer = new MutationObserver(callback)
      // 以上述配置开始观察目标节点
      observer.observe(targetNode, config)
    </script>
  </body>
</html>
```



### canvas 明水印

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>element-watermark</title>
    <style>
      /* 定义水印样式，固定位置，透明不可点击，背景重复 */
      .watermark {
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        pointer-events: none;
        background-repeat: repeat;
      }
    </style>
  </head>

  <body>
    <div class="app">
      <h1>水印</h1>
      <p>hello</p>
    </div>
    <script>
      /* 创建水印图像的函数 */
      function createWaterMark() {
        const angle = -20
        const txt = "水印"
        const canvas = document.createElement("canvas")
        canvas.width = 180
        canvas.height = 100
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, 180, 100)
        ctx.fillStyle = "#000"
        ctx.globalAlpha = 0.1
        ctx.font = `16px serif`
        ctx.rotate((Math.PI / 180) * angle)
        ctx.fillText(txt, 0, 50)
        return canvas.toDataURL()
      }
      /* 创建水印容器并设置其背景图像为水印 */
      const watermakr = document.createElement("div")
      watermakr.className = "watermark"
      watermakr.style.backgroundImage = `url(${createWaterMark()})`
      document.body.appendChild(watermakr)
    </script>
  </body>
</html>
```



### svg 明水印

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>element-watermark</title>
    <style>
      .watermark {
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        pointer-events: none;
        background-repeat: repeat;
      }
    </style>
  </head>

  <body>
    <div class="app">
      <h1>水印</h1>
      <p>hello</p>
    </div>
    <script>
      // 创建水印的 SVG 图像，并返回 base64 编码的字符串
      function createWaterMark() {
        const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="180px" height="100px">
                <text x="0px" y="30px" dy="16px"
                    text-anchor="start"
                    stroke="#000"
                    stroke-opacity="0.1"
                    fill="none"
                    transform="rotate(-20)"
                    font-weight="100"
                    font-size="16"
                    >
                    水印
                </text>
            </svg>`
        return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`
      }
      // 创建一个 div 元素作为水印容器
      const watermakr = document.createElement("div")
      watermakr.className = "watermark"
      // 设置水印背景图像为 createWaterMark 函数生成的 base64 字符串
      watermakr.style.backgroundImage = `url(${createWaterMark()})`
      // 将水印容器添加到页面 body 中
      document.body.appendChild(watermakr)
    </script>
  </body>
</html>
```



### 给图片加水印

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    <div id="info">
      <img />
    </div>
    <script>
      ;(function () {
        // 定义一个函数 __picWM，用于在图像上添加水印
        function __picWM({
          url = "",
          textAlign = "center",
          textBaseline = "middle",
          font = "20px Microsoft Yahei",
          fillStyle = "rgba(184, 184, 184, 0.8)",
          content = "水印",
          cb = null,
          textX = 100,
          textY = 30,
        } = {}) {
          const img = new Image()
          img.src = url
          img.crossOrigin = "anonymous"
          img.onload = function () {
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext("2d")

            ctx.drawImage(img, 0, 0)
            ctx.textAlign = textAlign
            ctx.textBaseline = textBaseline
            ctx.font = font
            ctx.fillStyle = fillStyle
            ctx.fillText(content, img.width - textX, img.height - textY)

            const base64Url = canvas.toDataURL()
            cb && cb(base64Url)
          }
        }

        // 判断模块环境并导出函数 __picWM
        if (typeof module != "undefined" && module.exports) {
          //CMD
          module.exports = __picWM
        } else if (typeof define == "function" && define.amd) {
          // AMD
          define(function () {
            return __picWM
          })
        } else {
          window.__picWM = __picWM
        }
      })()

      // 调用 __picWM 函数，添加水印到指定的图像并处理回调
      __picWM({
        url: "logo.png",
        content: "水印水印",
        cb: (base64Url) => {
          document.querySelector("img").src = base64Url
        },
      })
    </script>
  </body>
</html>
```



### TODO 暗水印





## 放大镜

```vue
<template>
  <div class="bruce flex-ct-x" data-title="放大镜">
    <div class="magnifier"></div>
  </div>
</template>

<style lang="scss" scoped>
$ratio: 2;
$box-w: 600px;
$box-h: 400px;
$box-bg: "https://jowayyoung.github.io/static/img/icss/gz.jpg";
$outbox-w: $box-w * $ratio;
$outbox-h: $box-h * $ratio;
.magnifier {
  --x: 0;
  --y: 0;
  overflow: hidden;
  position: relative;
  width: $box-w;
  height: $box-h;
  background: url($box-bg) no-repeat center/100% 100%;
  cursor: pointer;
  &::before {
    --size: 0;
    $scale-x: calc(var(--size) / #{$ratio} - #{$ratio} * var(--x));
    $scale-y: calc(var(--size) / #{$ratio} - #{$ratio} * var(--y));
    position: absolute;
    left: var(--x);
    top: var(--y);
    border-radius: 100%;
    width: var(--size);
    height: var(--size);
    background: #333 url($box-bg) no-repeat $scale-x $scale-y/$outbox-w $outbox-h;
    box-shadow: 1px 1px 3px rgba(#000, 0.5);
    content: "";
    will-change: left, top;
    transform: translate(-50%, -50%);
  }
  &:hover::before {
    --size: 100px;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const magnifier = document.getElementsByClassName("magnifier")[0];
    magnifier.addEventListener("mousemove", (e) => {
      e.target.style.setProperty("--x", `${e.offsetX}px`);
      e.target.style.setProperty("--y", `${e.offsetY}px`);
    });
  },
  methods: {},
};
</script>
```



## 直播间点赞动效

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>点赞动画</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no" />
    <meta name="format-detection" content="telephone=no" />
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <style>
      .container {
        display: inline-block;
        vertical-align: top;
      }
    </style>
  </head>
  <body ontouchstart>
    <div class="container">
      <h2>CSS3:</h2>
      <div class="praise_bubble" id="praise_bubble"></div>
    </div>
    <div class="container">
      <h2>Canvas:</h2>
      <canvas id="thumsCanvas" width="200" height="400" style="width: 100px; height: 200px"></canvas>
    </div>
    <script src="./index.js"></script>
    <script src="./canvas.js"></script>
    <script>
      const thumbsUpAni = new ThumbsUpAni()
      setInterval(() => {
        thumbsUpAni.start()
      }, 300)
    </script>
  </body>
</html>
```

```js
let praiseBubble = document.getElementById("praise_bubble");
let last = 0;
function addPraise() {
    const b = Math.floor(Math.random() * 6) + 1;
    const bl = Math.floor(Math.random() * 11) + 1; // bl1~bl11

    let d = document.createElement("div");
    d.className = `bubble b${b} bl${bl}`;
    d.dataset.t = String(Date.now());
    praiseBubble.appendChild(d);
}
setInterval(() => {
    addPraise();
}, 300)
```

```js

/**
 * >=min && <=max
 * @param min 
 * @param max 
 */
function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
}
class ThumbsUpAni {
    imgsList = [];
    context;
    width = 0;
    height = 0;
    scanning = false;
    renderList = [];
    scaleTime = 0.1;// 百分比
    constructor() {
        this.loadImages();
        const canvas = document.getElementById('thumsCanvas');
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }
    loadImages() {
        const images = [
            'jfs/t1/93992/8/9049/4680/5e0aea04Ec9dd2be8/608efd890fd61486.png',
            'jfs/t1/108305/14/2849/4908/5e0aea04Efb54912c/bfa59f27e654e29c.png',
            'jfs/t1/98805/29/8975/5106/5e0aea05Ed970e2b4/98803f8ad07147b9.png',
            'jfs/t1/94291/26/9105/4344/5e0aea05Ed64b9187/5165fdf5621d5bbf.png',
            'jfs/t1/102753/34/8504/5522/5e0aea05E0b9ef0b4/74a73178e31bd021.png',
            'jfs/t1/102954/26/9241/5069/5e0aea05E7dde8bda/720fcec8bc5be9d4.png'
        ];
        const promiseAll = [];
        images.forEach((src) => {
            const p = new Promise(function (resolve) {
                const img = new Image;
                img.onerror = img.onload = resolve.bind(null, img);
                img.src = 'https://img12.360buyimg.com/img/' + src;
            });
            promiseAll.push(p);
        });
        Promise.all(promiseAll).then((imgsList) => {
            this.imgsList = imgsList.filter((d) => {
                if (d && d.width > 0) return true;
                return false;
            });
            if (this.imgsList.length == 0) {
                dLog('error', 'imgsList load all error');
                return;
            }
        })
    }
    createRender() {
        if (this.imgsList.length == 0) return null;
        const basicScale = [0.6, 0.9, 1.2][getRandom(0, 2)];

        const getScale = (diffTime) => {
            if (diffTime < this.scaleTime) {
                return +((diffTime / this.scaleTime).toFixed(2)) * basicScale;
            } else {
                return basicScale;
            }
        };
        const context = this.context;
        // 随机读取一个图片来渲染
        const image = this.imgsList[getRandom(0, this.imgsList.length - 1)]
        const offset = 20;
        const basicX = this.width / 2 + getRandom(-offset, offset);
        const angle = getRandom(2, 10);
        let ratio = getRandom(10, 30) * ((getRandom(0, 1) ? 1 : -1));
        const getTranslateX = (diffTime) => {
            if (diffTime < this.scaleTime) {// 放大期间，不进行摇摆位移
                return basicX;
            } else {
                return basicX + ratio * Math.sin(angle * (diffTime - this.scaleTime));
            }
        };

        const getTranslateY = (diffTime) => {
            return image.height / 2 + (this.height - image.height / 2) * (1 - diffTime);
        };

        const fadeOutStage = getRandom(14, 18) / 100;
        const getAlpha = (diffTime) => {
            let left = 1 - +diffTime;
            if (left > fadeOutStage) {
                return 1;
            } else {
                return 1 - +((fadeOutStage - left) / fadeOutStage).toFixed(2);
            }
        };

        return (diffTime) => {
            // 差值满了，即结束了 0 ---》 1
            if (diffTime >= 1) return true;
            context.save();
            const scale = getScale(diffTime);
            // const rotate = getRotate();
            const translateX = getTranslateX(diffTime);
            const translateY = getTranslateY(diffTime);
            context.translate(translateX, translateY);
            context.scale(scale, scale);
            // context.rotate(rotate * Math.PI / 180);
            context.globalAlpha = getAlpha(diffTime);
            context.drawImage(
                image,
                -image.width / 2,
                -image.height / 2,
                image.width,
                image.height
            );
            context.restore();
        };
    }
    scan() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = "#f4f4f4";
        this.context.fillRect(0, 0, 200, 400);
        let index = 0;
        let length = this.renderList.length;
        if (length > 0) {
            requestFrame(this.scan.bind(this));
            this.scanning = true;
        } else {
            this.scanning = false;
        }
        while (index < length) {
            const child = this.renderList[index];
            if (!child || !child.render || child.render.call(null, (Date.now() - child.timestamp) / child.duration)) {
                // 结束了，删除该动画
                this.renderList.splice(index, 1);
                length--;
            } else {
                // continue
                index++;
            }
        }
    }
    start() {
        const render = this.createRender();
        const duration = getRandom(1500, 3000);
        this.renderList.push({
            render,
            duration,
            timestamp: Date.now(),
        });
        if (!this.scanning) {
            this.scanning = true;
            requestFrame(this.scan.bind(this));
        }
        return this;
    }
}
function requestFrame(cb) {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    )(cb);
}
```

```css
body {
  --bubble_time: 3s;
  --bubble_scale: 0.8s;
}
.praise_bubble {
  width: 100px;
  height: 200px;
  position: relative;
  background-color: #f4f4f4;
}
.bubble {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 30px;
  bottom: 0px;
  background-repeat: no-repeat;
  background-size: 100%;
  transform-origin: bottom;
}
.b1 {
  background-image: url(./images/bg1.png);
  // 可以使用雪碧图
  // background-position: -42px -107px;
  // background-size: 188.5px 147px;
}
.b2 {
  background-image: url(./images/bg2.png);
  // background-position: -84px -107px;
  // background-size: 188.5px 147px;
}
.b3 {
  background-image: url(./images/bg3.png);
  // background-position: 0 -107px;
  // background-size: 188.5px 147px;
}
.b4 {
  background-image: url(./images/bg4.png);
  // background-position: -45px -62px;
  // background-size: 188.5px 147px;
}
.b5 {
  background-image: url(./images/bg5.png);
  // background-position: -107px -42px;
  // background-size: 188.5px 147px;
}
.b6 {
  background-image: url(./images/bg6.png);
  // background-position: -107px 0;
  // background-size: 188.5px 147px;
}
.bl1 {
  animation: bubble_1 var(--bubble_time) linear 1 forwards,
    bubble_big_1 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl2 {
  animation: bubble_2 var(--bubble_time) linear 1 forwards,
    bubble_big_2 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl3 {
  animation: bubble_3 var(--bubble_time) linear 1 forwards,
    bubble_big_1 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl4 {
  animation: bubble_4 var(--bubble_time) linear 1 forwards,
    bubble_big_2 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl5 {
  animation: bubble_5 var(--bubble_time) linear 1 forwards,
    bubble_big_1 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl6 {
  animation: bubble_6 var(--bubble_time) linear 1 forwards,
    bubble_big_3 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl7 {
  animation: bubble_7 var(--bubble_time) linear 1 forwards,
    bubble_big_1 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl8 {
  animation: bubble_8 var(--bubble_time) linear 1 forwards,
    bubble_big_3 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl9 {
  animation: bubble_9 var(--bubble_time) linear 1 forwards,
    bubble_big_2 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl10 {
  animation: bubble_10 var(--bubble_time) linear 1 forwards,
    bubble_big_1 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
.bl11 {
  animation: bubble_11 var(--bubble_time) linear 1 forwards,
    bubble_big_2 var(--bubble_scale) linear 1 forwards,
    bubble_y var(--bubble_time) linear 1 forwards;
}
@keyframes bubble_11 {
  0% {
  }
  25% {
    margin-left: -10px;
  }
  50% {
    margin-left: -10px;
  }
  100% {
    margin-left: -18px;
  }
}
@keyframes bubble_10 {
  0% {
  }
  25% {
    margin-left: -20px;
  }
  50% {
    margin-left: -20px;
  }
  100% {
    margin-left: -20px;
  }
}
@keyframes bubble_9 {
  0% {
  }
  25% {
    margin-left: 10px;
  }
  50% {
    margin-left: 10px;
  }
  100% {
    margin-left: 10px;
  }
}
@keyframes bubble_8 {
  0% {
  }
  25% {
    margin-left: 20px;
  }
  50% {
    margin-left: 20px;
  }
  100% {
    margin-left: 20px;
  }
}
@keyframes bubble_7 {
  0% {
  }
  25% {
    margin-left: 3px;
  }
  50% {
    margin-left: 1px;
  }
  75% {
    margin-left: 2px;
  }
  100% {
    margin-left: 3px;
  }
}
@keyframes bubble_6 {
  0% {
  }
  25% {
    margin-left: -3px;
  }
  50% {
    margin-left: -1px;
  }
  75% {
    margin-left: -2px;
  }
  100% {
    margin-left: -3px;
  }
}
@keyframes bubble_5 {
  0% {
  }
  25% {
    margin-left: 5px;
  }
  50% {
    margin-left: -5px;
  }
  75% {
    margin-left: -10px;
  }
  100% {
    margin-left: -20px;
  }
}
@keyframes bubble_4 {
  0% {
  }
  25% {
    margin-left: -5px;
  }
  50% {
    margin-left: -5px;
  }
  75% {
    margin-left: 20px;
  }
  100% {
    margin-left: 10px;
  }
}
@keyframes bubble_3 {
  0% {
  }
  25% {
    margin-left: -20px;
  }
  50% {
    margin-left: 10px;
  }
  75% {
    margin-left: 20px;
  }
  100% {
    margin-left: -10px;
  }
}
@keyframes bubble_2 {
  0% {
  }
  25% {
    margin-left: 20px;
  }
  50% {
    margin-left: 25px;
  }
  75% {
    margin-left: 10px;
  }
  100% {
    margin-left: 5px;
  }
}
@keyframes bubble_1 {
  0% {
  }
  25% {
    margin-left: -8px;
  }
  50% {
    margin-left: 8px;
  }
  75% {
    margin-left: -15px;
  }
  100% {
    margin-left: 15px;
  }
}
@keyframes bubble_big_1 {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1.2);
  }
}
@keyframes bubble_big_2 {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(0.9);
  }
}
@keyframes bubble_big_3 {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(0.6);
  }
}
@keyframes bubble_y {
  0% {
    margin-bottom: 0;
  }
  10% {
    margin-bottom: 0;
  }
  75% {
    opacity: 1;
  }
  100% {
    margin-bottom: 200px;
    opacity: 0;
  }
}
```



源码：https://github.com/antiter/praise-animation



















