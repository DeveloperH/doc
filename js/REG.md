# 正则表达式

## 简介

正则表达式本身就是一种语言，这在其他语言是通用的。

正则表达式(regular expression)描述了一种`字符串匹配的模式`，可以用来检查一个串是否含有`某种子串`、将匹配的子串做替换或者从某个串中取出符合某个条件的子串等。



## 为什么使用正则表达式

* 表单验证输入：验证邮箱、手机号、银行卡号...
* 采集器
* 中奖信息  `137****2133`
* 屏蔽特殊词汇
* ...



## 快速入门

一般是以这种格式创建一个正则表达式对象: `/匹配模式/gim`

其中g代表全局匹配；i代表忽略大小写；m代表多行模式，强制 $ 和 ^ 分别匹配每个换行符。

```js
var str = 'hello,java8script'
var reg1 = /8/gi      // 查找一个字符串中是否具有数字8
var reg2 = /\d/gi     // 查找一个字符串中是否具有数字
var reg3 = /\D/gi     // 查找一个字符串中是否具有非数字

console.log(reg1.test(str))   // true  test()用来判断指定的模式是否出现在字符串中
console.log(reg2.test(str))   // true
console.log(reg3.test(str))   // true
```



## 正则对象

要使用正则表达式，必须要在程序创建正则对象。



创建正则对象，也就是需要得到一个RegExp类的实例。

* 隐式创建(推荐)	`var 对象 = /匹配模式/匹配标志`
* 直接实例化 `var 对象 = new RegExp(匹配模式, 匹配标志)`



匹配标志: `g`代表全局匹配，`i`代表忽略大小写。

```js
var reg1 = /\d/gi
console.log(typeof reg1)        // object
console.log(reg1.constructor)   // reg1对象的构造器

var reg2 = new RegExp('abcd', 'gi')
console.log(typeof reg2)        // object
console.log(reg2.constructor)
```



这两种用法区别:如果使用直接实例化，那么像`\d`这样的字符，需要转义为`\\d`

```js
var reg = /\d/gi
var reg = new RegExp('\\d', 'gi')
```





## 使用正则对象

在JS中，使用正则对象主要有两种用法:

* RegExp类
  * test(str) : 匹配指定的模式是否出现在字符串中，返回布尔值
  * exec(str) : 返回匹配模式的字符串，一次只会返回一个。如果需要返回全部匹配的，需在循环中使用
* String类
  * search(reg) : 匹配符合匹配模式的字符串出现的位置，没有匹配到则返回-1
  * match(reg) : 以数组形式返回匹配模式的字符串，没有匹配到则返回null
  * replace(reg, content) : 使用指定的内容替换匹配模式的字符串
  * split(reg) : 使用匹配模式的字符串作为分隔符对字符串进行分隔，返回数组
  * matchAll(reg) ：返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。因为返回的是遍历器，所以通常使用`for...of`循环取出。
  * replaceAll(reg) ：替换字符，该函数会替换所有匹配到的子字符串



```js
var str = 'hello123java32a1s666c23ipt'

var reg1 = /\d\d\d/gi         // 查找连续的三个数字
console.log(reg1.test(str))   // true

var reg2 = /\d\d\d/gi
var result
while(result = reg2.exec(str)){   // 只要exec()返回的结果不为空就一直往下匹配
  console.log(result)   // [123]   [666]
}

var reg3 = /\d\d\d/gi
console.log(str.search(reg3))   // 5
console.log('ada'.search(reg3)) // -1
console.log(str.match(reg3))    // ["123", "666"]
console.log(str.split(reg3))    // ["hello", "java32a1s", "c23ipt"]

var reg4 = /\d/gi
console.log(str.replace(reg4, '*'))   // 将匹配到的数字全部替换成*

for (const match of 'abcabc'.matchAll(/a/g)) {
  console.log(match)
}
```



不同的情况使用不同的方法:

* 想知道邮箱格式、手机格式、IP格式合不合法，用test()
* 想抓取网页中所有的手机号，用exec()或match()
* 想替换掉网页中敏感词汇，用replace()



## 子表达式、捕获、反向引用

一般情况下，后面的内容要求与前面的一致，就会用到子表达式、捕获和反向引用的概念。

* 子表达式 : 在正则匹配模式中，使用一对括号括起来的内容是一个子表达式
* 捕获 : 在正则匹配模式中，子表达式匹配到的内容会被系统捕获至系统的缓冲区中
* 反向引用 : 捕获之后，可以在匹配模式中，使用`\n`(n表示数字)来引用系统的第n号缓冲区内容



![](https://www.huangyihui.cn/upload/gburlimg/ae9c4c5464029.png)

```js
var str = 'hell421lleajs445sj541xjnnaa9472aaend323endax1'
var reg = /(\w+)\d\d\d\1/gi     // 匹配多个字符后面是三个数组，后面的内容和前面多个字符相同
console.log(str.match(reg))     // ["ll421ll", "s445s", "end323end"]
```



例子:

* 查找连续的四个数字，如 4783
  * `var reg = /\d\d\d\d/gi`
* 查找连续的相同的四个数字，如 1111
  * `var reg = /(\d)\1\1\1/gi`
* 查找数字，如 1221,3443
  * `var reg = /(\d)(\d)\2\1/gi`
* 查找字符，如 AABB,TTMM
  * `var reg = /(\w)\1(\w)\2/gi`
* 查找连续相同的四个数字或四个字符，如2222,cccc
  * `var reg = /(\w)\1\1\1/gi`

```js
// 在一个字符串中，查找一对html标记以及中间的内容
var str = 'aaa<div>sadfsa</div>adasjif<p>hello</p>12sa'
var reg = /<(\w+)>.+<\/\1>/gi
console.log(str.match(reg))   // ["<div>sadfsa</div>", "<p>hello</p>"]
```



## 子表达式和exec方法

`exec()`每一次匹配结果都放到一个数组中，如果有子表达式，会将子表达式的捕获结果放到数组对应的数组元素中

```js
var str = 'hell421lleajs445sj541xjnnaa9472aaend323endax1'
var reg = /(\w+)(\d)\d\d\1/gi     // 匹配多个字符后面是三个数组，后面的内容和前面多个字符相同
var result
while(result = reg.exec(str)){
  console.log(result)
}
/* exec()每一次匹配结果都放到一个数组中，如果有子表达式，会将子表达式的捕获结果放到数组对应的数组元素中
["ll421ll", "ll", "4", ...]
result[0] ==> "ll421ll"
result[1] ==> 第一个子表达式匹配的结果是 ll
result[2] ==> 第一个子表达式匹配的结果是 4

["s445s", "s", "4", ...]
["end323end", "end", "3", ...]
*/
```



exec方法和match方法的比较:

1. exec方法是RegExp类下的方法，match方法是String类下的方法
2. match方法直接返回一个数组，exec方法需要使用循环反复调用
3. 如果有子表达式，exec方法会将子表达式的捕获结果放到数组对应的数组元素中





## 正则语法

正则表达式是由普通字符(例如字符a到z)以及特殊字符(元字符)组成的文字模式。正则表达式作为一个模板，将某个字符模式与所搜索的字符串进行匹配。



在写正则表达式的时候，需要确定这几件事: 要查什么，从哪查，查多少



正则表达式的构成:

* 普通字符 : a b c d 1 2 3 4 ...
* 特殊字符(元字符) : \d \D \w * + | ^ ...
  * 限定符、字符匹配符、定位符、转义符、选择匹配符



### 限定符

限定符可以指定正则表达式的一个给定组件必须要出现多少次才能满足匹配。



* `*` : 匹配前面的组件零次或多次，`{0,}`
* `+` : 匹配前面的组件一次或多次，`{1,}`
* `?` : 匹配前面的组件零次或一次，`{0,1}`
* `{n}` : 匹配确定的n次
* `{n,}` : 至少匹配n次
* `{n,m}` : 最少匹配n次且最多匹配m次
  * 默认会按照正则的贪婪匹配原则，会自动匹配多的那一种
  * 如果在表达式的后面使用'?'，表示非贪婪匹配原则，就会尽可能匹配少的。`{3,5}?`



```js
var str = 'asd173823dsa41213212dajd83dji2144df'
var reg = /\d{3}/gi           // 匹配三个数字
console.log(str.match(reg))   // ["173", "823", "412", "132", "214"]

var reg2 = /\d{3,}/gi         // 至少匹配三个数字
console.log(str.match(reg2))  // ["173823", "41213212", "2144"]

var reg3 = /\d{3,5}/gi        // 至少匹配三个，最多匹配五个数字，正则的贪婪匹配原则会匹配多的那一种
console.log(str.match(reg3))  // ["17382", "41213", "212", "2144"]

var reg3 = /\d{3,5}?/gi       // 如果在表达式的后面使用'?',表示非贪婪匹配原则，就会尽可能匹配少的
console.log(str.match(reg3))  // ["173", "823", "412", "132", "214"]
```



### 字符匹配符

字符匹配符用于匹配某个或某些字符。

字符簇:

* `[a-z]` : 表示a-z任意一个字符
* `[A-Z]` : 表示A-Z任意一个字符
* `[0-9]` : 表示0-9任意一个数字
* `[0-9a-z]` : 表示0-9 a-z任意一个字符
* `[0-9a-zA-Z]` : 表示0-9 a-z A-Z任意一个字符
* `[abcd]` : 表示a 或 b 或 c 或 d 其中一个字符
* `[1234]` : 表示1 或 2 或 3 或 4 其中一个数字
* `[^a-z]` : 表示匹配除了a-z之间任意一个字符
* `[^0-9]` : 表示匹配除了0-9之间任意一个字符
* `[^abcd]` : 表示匹配除了a b c d 之外的任意一个字符
* `\d` : 表示匹配一个数字字符，`[0-9]`
* `\D` : 表示匹配一个非数字字符，`[^0-9]`
* `\w` : 表示匹配包括下划线的任何单词/数字字符，`[0-9a-zA-Z_]`
* `\W` : 表示匹配任何非单词字符，`[^\w]`
* `\s` : 表示匹配任何空白字符(空格、制表符、换行符)
* `\S` : 表示匹配任何非空白字符
* `.` : 表示匹配除`\n`(反向引用)之外的任何单个字符，如果想匹配任意字符`[.\n]`



```js
var str = 'ho,js281!jk_GOOD1A319dsa2'
var reg1 = /[a-z]/g
var reg2 = /[A-Z]/g
var reg3 = /[0-9]/g
var reg4 = /[ojs12]/g
var reg5 = /[^0-9a-z]/gi
var reg6 = /\D/g
var reg7 = /\w/gi
var reg8 = /./gi

console.log(str.match(reg1))    // ["h", "o", "j", "s", "j", "k", "d", "s", "a"]
console.log(str.match(reg2))    // ["G", "O", "O", "D", "A"]
console.log(str.match(reg3))    // ["2", "8", "1", "1", "3", "1", "9"]
console.log(str.match(reg4))    // ["o", "j", "s", "2", "1", "j", "1", "1", "s"]
console.log(str.match(reg5))    // [",", "!", "_"]
console.log(str.match(reg6))    // 匹配非数字字符串
console.log(str.match(reg7))    // 匹配大小写字母、数字、下划线
console.log(str.match(reg8))    // 匹配所有字符，除了\n
```



### 定位符

定位符可以将一个正则表达式固定在一行的开始或结束。也可以创建只在单词内或只在单词的开始或结尾处出现的正则表达式。

定位符会经常出现在正则表达式中，因为会用来校验字符串是否以某些格式开头和结束的。例如，年龄，邮箱...



* `^` : 匹配输入字符串的开始位置
* `$` : 匹配输入字符串的结束位置
* `\b` : 匹配一个单词边界
* `\B` : 匹配非单词边界

单词边界也就是空格。



```js
var str = 'h123ello, my name is zh123angsan'
var reg1 = /^h123/gi      // 匹配字符串开始位置的'h123'
var reg2 = /an$/gi        // 匹配字符串结束位置的'an'
var reg3 = /\Ban\B/gi     // 匹配前后都不是单词边界的'an'
var reg4 = /\Ban\b/gi     // 匹配前面不是单词边界，后面是单词边界的'an'

console.log(str.match(reg1))
console.log(str.match(reg2))
console.log(str.match(reg3))
console.log(str.match(reg4))

var age = '21'
var reg = /^\d\d$/g   // 验证年龄
console.log(reg.test(age))
```



### 转义符

`\`用于匹配某些特殊字符，比如需要转义的字符。

需要转义的字符:

* `( ) [ ] { } \ . / * + ? ^ $ | `

这些字符在正则表达式中都具有特殊的含义。



```js
var str = 'hello.good.ye?s.ok'
var reg = /\./gi    // 如果只使用.则表示匹配任意一个字符，所以需要\.进行转义
console.log(str.match(reg))   // [".", ".", "."]
```



### 选择匹配符

`|`可以匹配多个规则

```js
var str = 'hello,js.hello,h5'
var reg1 = /hello,js|h5/gi
var reg2 = /hello,(js|h5)/gi

console.log(str.match(reg1))    // ["hello,js", "h5"]
console.log(str.match(reg2))    // ["hello,js", "hello,h5"]
```



## 特殊用法 ?= ?! ?:

* `(?=)` 正向预查
* `(?!)` 负向预查
* `(?:)` 匹配内容，但是结果不被捕获

```js
var str = '张三好人，张三坏人，张三大侠'
var reg1 = /张三(?=坏人)/gi     // 查询'坏人'前面的名字
var reg2 = /张三(?!坏人)/gi     // 查询不是 '坏人'前面的名字
console.log(str.match(reg1))
console.log(str.match(reg2))
```

```js
var str = 'hellojs,helloh5,hellojava,hellocss'
var reg = /hello(?:js|java)/gi    // 使用?: 让系统不去捕获子表达式匹配的内容
var result
while(result = reg.exec(str)){
  console.log(result)
}
```



## 常见正则验证

```js
// 6-16位数字和字母
/^[0-9A-Za-z]{6,16}$/

// 检查密码的格式，其包含至少一个大写字母、小写字母、数字、符号，长度为8-12位
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/g

// 匹配邮箱
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[ a-zA-Z0-9-]+)*$/g
/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
   
// 匹配整数
/^\d+$

// 匹配小数
/^\d*\.\d+$

// 匹配金额：整数或带两位小数的数值
/^\d+(.\d{2})?$

// 匹配国内手机号
/^1[3-9]\d{9}$/
  
// 匹配固定电话号码
/^((\d{3,4}-)|\d{3,4})?\d{5,14}$/

// 校验身份证号码
/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 校验是否包含中文
/[\u4e00-\u9fa5]/

// 校验是否为中国大陆的邮政编码
/^[1-9][0-9]{5}$/



  
 
  
  
  

  
  
  
  
  
  
  
  
  
  
 
```



```js
// 校验是否为IPv6地址
const isIPv6 = (str) => {
    return Boolean(str.match(/:/g)?str.match(/:/g).length<=7:false && /::/.test(str)?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str):/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}

// 校验是否包含emoji表情
const isEmojiCharacter = (value) => {
   value = String(value);
    for (let i = 0; i < value.length; i++) {
        const hs = value.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (value.length > 1) {
                const ls = value.charCodeAt(i + 1);
                const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (value.length > 1) {
            const ls = value.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                    || hs == 0x2b50) {
                return true;
            }
        }
    }
   return false;
}


// 获取所有img的URL
const getImgs = (domContent) => {
  const imgs = [];
  const imgPattern = /<img[^>]+src=['"]((?!.*\.svg).+?)['"]/g;

  let match = null;
  while ((match = imgPattern.exec(domContent)) !== null) {
    imgs.push(match[1]);
  }

  return imgs;
};

// 获取所有a标签的href
const html = '<a href="https://www.example.com">Link 1</a> <a href="https://www.google.com">Link 2</a>';

const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
const links = [];
let match;

while ((match = linkRegex.exec(html)) !== null) {
  const link = match[2];
  links.push(link);
}
console.log(links);
```







## 实用工具

* [Regex101](https://regex101.com/)
* [RegExr](https://regexr.com/)





































