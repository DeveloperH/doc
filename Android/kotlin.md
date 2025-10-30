# Kotlin



## 官方资料

官网：https://kotlinlang.org/

android kotlin：https://developer.android.com/kotlin?hl=zh-cn

文档版本：v2.2.21

* 初级：https://kotlinlang.org/docs/kotlin-tour-hello-world.html
* 中级：https://kotlinlang.org/docs/kotlin-tour-intermediate-extension-functions.html



| 版本 | 发布时间 |
| ---- | -------- |
| 1.9  | 2023-07  |
| 2.0  | 2024-05  |
| 2.1  | 2024-11  |
| 2.2  | 2025-06  |



## Hello

### main()

Kotlin 应用程序的入口点是 `main` 函数。

另一种形式的 `main` 接受可变数量的 `String` 参数。

```kotlin
fun main() {
    println("Hello world!")
}

fun main(args: Array<String>) {
    println(args.contentToString())  // []
}
```



### print()

`print` 将其参数打印到标准输出。

`println` 打印其参数并添加换行符。

```kotlin
print("Hello ")
print("world!")

println("Hello world!")
println(42)
```



### readln()

`readln()` 函数从标准输入读取。此函数将用户输入的整行读取为字符串。

```kotlin
val yourWord = readln()
print(yourWord)
```



### 注释

Kotlin 中的多行注释可以嵌套。

```kotlin
// 单行注释

/* 多行注释 */

/* 注释
/* 注释 */
注释 */
```



### val、var 变量

在 Kotlin 中，您可以声明一个以关键字 `val` 或 `var` 开头的变量，后跟变量的名称。

使用 `val` 关键字声明常量。

使用 `var` 关键字声明变量。

Kotlin 支持类型推断并自动识别声明变量的数据类型。声明变量时，可以省略变量名后面的类型。

只有在初始化变量后才能使用变量。您可以在声明时初始化变量，也可以先声明变量，然后再初始化它。在第二种情况下，您必须指定数据类型。



```kotlin
val x: Int = 5	// 常量

var y: Int = 5	// 变量
y += 1

// 省略数据类型
val z = 5

// 先声明变量，然后再初始化它。这时必须指定数据类型
val c: Int
c = 10
```



### 字符串模板

```kotlin
var a = 1
val s1 = "a is $a" 

a = 2
val s2 = "${s1.replace("is", "was")}, but now is $a"  // a was 1, but now is 2
```



### fun 定义函数

```kotlin
fun main() {
    println(sum(10, 5))		// 15
  	printSum(1,2)					// sum of 1 and 2 is 3
}

// 具有两个 Int 参数和 Int 返回类型的函数：
fun sum(a: Int, b: Int): Int {
    return a + b
}

// 函数体可以是一个表达式。推断其返回类型：
fun sum(a: Int, b: Int) = a + b

// 不返回任何有意义值的函数：
fun printSum(a: Int, b: Int): Unit {
    println("sum of $a and $b is ${a + b}")
}

// Unit 返回类型可以省略：
fun printSum(a: Int, b: Int) {
    println("sum of $a and $b is ${a + b}")
}
```



### 条件表达式

在 Kotlin 中，`if` 可以用作表达式。

```kotlin
fun maxOf(a: Int, b: Int): Int {
    if (a > b) {
        return a
    } else {
        return b
    }
}

fun maxOf(a: Int, b: Int) = if (a > b) a else b
```



`when` 表达式。

```kotlin
fun describe(obj: Any): String =
    when (obj) {
        1          -> "One"
        "Hello"    -> "Greeting"
        is Long    -> "Long"
        !is String -> "Not a string"
        else       -> "Unknown"
    }

fun main() {
    println(describe(1))				// One
    println(describe("Hello"))	// Greeting
    println(describe(1000L))		// Long
    println(describe(2))				// Not a string
    println(describe("other"))	// Unknown
}
```



### 循环

`for` 循环。

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
for (item in items) {
    println(item)
}

// items.indices ：返回集合的有效索引范围。对于 List，它返回从 0 到 size - 1 的整数范围。
val items = listOf("apple", "banana", "kiwifruit")
for (index in items.indices) {
  	// index：0 1 2
    println("item at $index is ${items[index]}")
}
```



`while` 循环。

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
var index = 0
while (index < items.size) {
    println("item at $index is ${items[index]}")
    index++
}
```



### in

使用 `in` 运算符检查数字是否在某个范围内。

```kotlin
// 迭代一个范围
for (x in 1..5) {
    print(x)	// 12345
}

val x = 10
val y = 9
// 范围 1~10
if (x in 1..y+1) {
    println("fits in range")
}

// 检查号码是否超出范围
val list = listOf("a", "b", "c")
if (-1 !in 0..list.lastIndex) {
    println("-1 is out of range")
}
if (list.size !in list.indices) {
    println("list size is out of valid list indices range, too")
}

// 或者在进展中：
for (x in 1..10 step 2) {
    print(x)	// 13579
}
println()
for (x in 9 downTo 0 step 3) {
    print(x)	// 9630
}
```



### 集合

```kotlin
// 迭代集合
val items = listOf("apple", "banana", "kiwifruit")
for (item in items) {
    println(item)
}

// 使用 in 运算符检查集合是否包含对象
val items = setOf("apple", "banana", "kiwifruit")
when {
    "orange" in items -> println("juicy")
    "apple" in items -> println("apple is fine too")
}
// apple is fine too

// 使用 lambda 表达式过滤和映射集合
val fruits = listOf("banana", "avocado", "apple", "kiwifruit")
fruits
    .filter { it.startsWith("a") }
    .sortedBy { it }
    .map { it.uppercase() }
    .forEach { println(it) }

// APPLE AVOCADO
```



### 类、实例

要定义类，请使用 `class` 关键字。

类的属性可以在其声明或正文中列出。具有类声明中列出的参数的默认构造函数会自动可用。

```kotlin
class Rectangle(val height: Double, val length: Double) {
    val perimeter = (height + length) * 2 
}

fun main() {
    val rectangle = Rectangle(5.0, 2.0)
    println("The perimeter is ${rectangle.perimeter}")
}
```



类之间的继承由冒号 （`:`） 声明。默认情况下，类是`final ` 的，要使类可继承，请将其标记为 `open ` 。

```kotlin
open class Shape

// 继承 Shape 类
class Rectangle(val height: Double, val length: Double): Shape() {
    val perimeter = (height + length) * 2
}
```



### 可为 null 值和 null 检查

当 `null` 值可能时，必须将引用显式标记为可为 null。可为 Null 的类型名称末尾有 `?` 。

```kotlin
// 如果 str 不包含整数，则返回 null。需要标记为 Int?
fun parseInt(str: String): Int? {
    return str.toIntOrNull()
}

fun printProduct(arg1: String, arg2: String) {
    val x = parseInt(arg1)
    val y = parseInt(arg2)

    if (x != null && y != null) {
        println(x * y)
    }
    else {
        println("'$arg1' or '$arg2' is not a number")
    }    
}

fun main() {
    printProduct("6", "7")	// 42
    printProduct("a", "7")	// 'a' or '7' is not a number
    printProduct("a", "b")	// 'a' or 'b' is not a number
}
```



### is 类型检查和自动转换

`is` 运算符检查表达式是否是类型的实例。如果检查了特定类型的不可变局部变量或属性，则无需显式强制转换它。

```kotlin
fun getStringLength(obj: Any): Int? {
    if (obj is String) {
        return obj.length
    }

    return null
}

fun main() {
    fun printLength(obj: Any) {
        println("Getting the length of '$obj'. Result: ${getStringLength(obj) ?: "Error: The object is not a string"} ")
    }
    printLength("Incomprehensibilities")
    printLength(1000)
    printLength(listOf(Any()))
}
```



## 学习路线

* **空安全**：**这是 Kotlin 的核心特性！** 
  * `?`（可空类型）、`?.`（安全调用）、`?:`（Elvis 操作符）、`!!`（非空断言）、`as?`（安全转换）。
* 协程：用于编写优雅且高效的异步代码。
* **Jetpack Compose**：Google 现代的 Android UI 工具包，
* **架构组件**：`ViewModel`, `Room`（数据库），`WorkManager` 等与 Kotlin 协程、Flow 的集成。
* [Compose Multiplatform](https://www.jetbrains.com/lp/compose-multiplatform/?_gl=1*1cd4xea*_gcl_au*MTk5ODAyMjQ2MS4xNzYxNzU4MTQ5*_ga*MTUwMDAxODgxMi4xNzYxNzU4MTQ5*_ga_9J976DJZ68*czE3NjE4MzMxMDEkbzIkZzEkdDE3NjE4MzQ1MzMkajYwJGwwJGgw) 是一个基于 Kotlin 和 [Jetpack Compose](https://developer.android.com/jetpack/compose) 的声明式框架，允许您实现一次界面，并在您定位的所有平台上共享它。





## Kotlin Multiplatform

简化跨平台项目的开发，减少为不同平台编写和维护相同代码所花费的时间。在 Android 和 iOS 间共享业务逻辑。

文档：https://www.jetbrains.com/help/kotlin-multiplatform-dev/get-started.html

https://kotlinlang.org/docs/multiplatform.html



## 其他

* kotlin 库推荐：https://github.com/Heapy/awesome-kotlin





## todo

https://kotlinlang.org/docs/basic-types.html



常用习惯：https://kotlinlang.org/docs/idioms.html#default-values-for-function-parameters











