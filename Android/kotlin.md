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

// 安全读取标准输入
val wrongInt = readln().toIntOrNull()
println(wrongInt)
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

// 只读 list
val list = listOf("a", "b", "c")

// 只读 map
val map = mapOf("a" to 1, "b" to 2, "c" to 3)

// 交换两个变量
var a = 1
var b = 2
a = b.also { b = a }

// lazy 懒属性。该值仅在第一次访问时计算
val p: String by lazy {
    // 计算这个 string
}
```



### 字符串模板

```kotlin
// 插值
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

// 单表达式函数
fun theAnswer() = 42
fun theAnswer(): Int {
    return 42
}

// 函数参数的默认值
fun foo(a: Int = 0, b: String = "") { }

// 扩展 functions
fun String.spaceToCamelCase() { ... }
"Convert this to camelcase".spaceToCamelCase()
```



#### `TODO()`

Kotlin 的标准库有一个 `TODO()` 函数，该函数将始终抛出 `NotImplementedError`。它的返回类型是 `Nothing`，因此无论预期类型如何，都可以使用它。还有一个接受 reason 参数的重载。

IntelliJ IDEA 的 kotlin 插件理解 `TODO()` 的语义，并自动在 TODO 工具窗口中添加代码指针。

```kotlin
// TODO() 将代码标记为不完整
fun calcTaxes(): BigDecimal = TODO("Waiting for feedback from accounting")
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


var x = 1
val y = if (x == 1) {
    "one"
} else if (x == 2) {
    "two"
} else {
    "other"
}
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

// Return on when 语句
fun transform(color: String): Int {
    return when (color) {
        "Red" -> 0
        "Green" -> 1
        "Blue" -> 2
        else -> throw IllegalArgumentException("Invalid color param value")
    }
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

// 遍历 map 或 list。k 和 v 可以是任何方便的名称
for ((k, v) in map) {
    println("$k -> $v")
}

// 在一定范围内迭代
for (i in 1..100) { ... }  // 闭区间：包含100
for (i in 1..<100) { ... } // 开放式范围：不包括100
for (x in 2..10 step 2) { ... }
for (x in 10 downTo 1) { ... }
(1..10).forEach { ... }
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



#### list

```kotlin
// filter 筛选列表
val positives = list.filter { x -> x > 0 }
val positives = list.filter { it > 0 }

// 检查集合中是否存在元素
if ("john@example.com" in emailsList) { }
if ("jane@example.com" !in emailsList) { }
```



#### map

```kotlin
// 通过 key 访问
println(map["key"])
map["key"] = value
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



实例检查：

```kotlin
when (x) {
    is Foo -> ...
    is Bar -> ...
    else   -> ...
}
```



#### data class

`data class` 提供具有以下功能的类：

* 所有属性的 getter（如果是 var，则还包括 setter）
* `equals()`
* `hashCode()`
* `toString()`
* `copy()`
* `component1（）`， `component2（）`， ...，适用于所有属性



```kotlin
data class Customer(val name: String, val email: String)
```



#### abstract class 抽象类

```kotlin
// 定义抽象类
abstract class MyAbstractClass {
    abstract fun doSomething()
    abstract fun sleep()
}

fun main() {
  	// 实例化抽象类
    val myObject = object : MyAbstractClass() {
      	// 重写抽象类中的所有方法
        override fun doSomething() {
            // ...
        }

        override fun sleep() {
        }
    }
    myObject.doSomething()
}
```



#### 单例

```kotlin
// 创建单例
object Resource {
    val name = "Name"
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



### `?.` `?:`

`?.` ：If-not-null 简写﻿。

```kotlin
val files = File("Test").listFiles()

println(files?.size) // 如果files不是null，则打印size

val value = ...
value?.let {
    //如果不是空，则执行
}
```



`?:` ：If-not-null-else 简写﻿。

```kotlin
val files = File("Test").listFiles()

println(files?.size ?: "empty") // 如果files是空的，这将打印“empty”

// 在代码块中计算更复杂的备用值，请使用 `run`
val filesSize = files?.size ?: run {
    val someSize = getSomeSize()
    someSize * 2
}
println(filesSize)

// 如果为空，则执行表达式
val values = ...
val email = values["email"] ?: throw IllegalStateException("Email is missing!")

// 获取可能为空的集合的第一项
val emails = ... // 可能为空
val mainEmail = emails.firstOrNull() ?: ""
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



### try catch

```kotlin
fun test() {
    val result = try {
        count()
    } catch (e: ArithmeticException) {
        throw IllegalStateException(e)
    }
}
```



## 数据类型

在 Kotlin 中，一切都是一个对象，因为您可以调用任何变量的成员函数和属性。

基本类型：

* Number
* Boolean
* Characters
* String
* Arrays



其他类型：

* Any
* Nothing
* Unit



### Number

#### 整数

对于整数，有四种类型，具有不同的大小和值范围：

| 类型    | 大小（位） | 最小值                                                       | 最大值                                                       |
| ------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `Byte`  | 8          | -128                                                         | 127                                                          |
| `Short` | 16         | -32768                                                       | 32767                                                        |
| `Int`   | 32         | -2,147,483,648 (-231) -2,147,483,648 （-231）                | 2,147,483,647 (231 - 1) 2,147,483,647 （231 - 1）            |
| `Long`  | 64         | -9,223,372,036,854,775,808 (-263) -9,223,372,036,854,775,808 （-263） | 9,223,372,036,854,775,807 (263 - 1) 9,223,372,036,854,775,807 （263 - 1） |



当您初始化没有显式类型规范的变量时，编译器会自动推断具有足够小范围的类型，以表示从 `Int` 开始的值。如果不超过 `Int` 的范围，则类型为 `Int`。如果确实超出该范围，则类型为 `Long`。要显式指定 `Long` 值，请将后缀 `L` 附加到该值。若要使用 `Byte` 或 `Short` 类型，请在声明中显式指定它。显式类型规范会触发编译器检查值是否超出指定类型的范围。

```kotlin
val one = 1 // Int
val threeBillion = 3000000000 // Long
val oneLong = 1L // Long
val oneByte: Byte = 1

// Kotlin 不支持八进制字面量
val num1 = 0x0F	// 十六进制
val num2 = 0b00001011	// 二进制

// 使用下划线使数字常量更具可读性
val oneMillion = 1_000_000
val creditCardNumber = 1234_5678_9012_3456L

// 整数之间的除法始终返回整数。任何小数部分都将被丢弃。对于任意两种整数类型之间的除法，情况都是如此。
val x = 5 / 2
val y = 5L / 2
println(x == 2.5) // 报错 Operator '==' cannot be applied to 'Int' and 'Double'
println(x == 2)   // true

// 要返回带有小数部分的除法结果，请显式地将其中一个参数转换为浮点类型：
val x = 5 / 2.toDouble()
println(x == 2.5)
```



#### 浮点数

对于实数，Kotlin 提供了符合 IEEE 754 标准的浮点类型 `Float` 和 `Double`。

对于使用小数初始化的变量，编译器推断 `Double` 类型。

若要显式指定值的 `Float` 类型，请添加后缀 `f` 或 `F`。如果以这种方式提供的值包含超过 7 位十进制数字，则将其四舍五入。

| 类型     | 大小（位） | 有效位 | 指数 | 十进制数字 |
| -------- | ---------- | ------ | ---- | ---------- |
| `Float`  | 32         | 24     | 8    | 6-7        |
| `Double` | 64         | 53     | 11   | 15-16      |



```kotlin
val pi = 3.14          // Double

// 报错：初始化器类型不匹配
val one: Double = 1    // 被推断为Int类型

val oneDouble = 1.0    // Double

val e = 2.7182818284          // Double
val eFloat = 2.7182818284f    // Float, 实际值是2.7182817
```



#### 显式数字转换

由于表示形式不同，数字类型不是彼此的子类型 。因此，较小的类型不会隐式转换为较大的类型，反之亦然。例如，将 `Byte` 类型的值分配给 `Int` 变量需要显式转换。

所有数字类型都支持转换为其他类型：

* `toByte(): Byte` （Float 和 Double 已弃用）
* `toShort(): Short`
* `toInt(): Int`
* `toLong(): Long`
* `toFloat(): Float`
* `toDouble(): Double`



```kotlin
val byte: Byte = 1

// 报错：初始化器类型不匹配
val intAssignedByte: Int = byte 

val intConvertedByte: Int = byte.toInt()
println(intConvertedByte)

// 在许多情况下，不需要显式转换，因为类型是从上下文中推断出来的，并且算术运算符重载以自动处理转换。例如：
val l = 1L + 3       // Long + Int => Long
println(l is Long)   // true
```



#### 无符号整数类型

除了整数类型外，Kotlin 还为无符号整数提供了以下类型：

| 类型     | 大小（位） | 最小值 | 最大值                                                       |
| -------- | ---------- | ------ | ------------------------------------------------------------ |
| `UByte`  | 8          | 0      | 255                                                          |
| `UShort` | 16         | 0      | 65,535                                                       |
| `UInt`   | 32         | 0      | 4,294,967,295 (232 - 1) 4,294,967,295 （232 - 1）            |
| `ULong`  | 64         | 0      | 18,446,744,073,709,551,615 (264 - 1) 18,446,744,073,709,551,615 （264 - 1） |



为了使无符号整数更易于使用，您可以在整数文字中附加后缀表示特定的无符号类型。

* `u` 和 `U` 字母表示无符号文字，但不指定确切类型。如果未提供预期类型，则编译器将根据文字的大小使用 `UInt` 或 `ULong`：
* `uL` 和 `UL` 明确指定文字应该是一个无符号 `Long`

```kotlin
val b: UByte = 1u  // UByte, 提供预期类型
val s: UShort = 1u // UShort, 提供预期类型
val l: ULong = 1u  // ULong, 提供预期类型

val a1 = 42u // UInt: 没有提供预期的类型，常量适合UInt
val a2 = 0xFFFF_FFFF_FFFFu // ULong: 没有提供预期的类型，常量不适合UInt

val a = 1UL // ULong
```



### Boolean

类型 `Boolean` 表示可以具有两个值的布尔对象：`true` 和 `false`。`Boolean` 有一个可为 null 的对应项，声明为 `Boolean?`。

在 JVM 上，存储为原始 `boolean` 类型的布尔值通常使用 8 位。

```kotlin
val myTrue: Boolean = true
val myFalse: Boolean = false
val boolNull: Boolean? = null

println(myTrue || myFalse)
// true
println(myTrue && myFalse)
// false
println(!myTrue)
// false
println(boolNull)
// null
```



### 强制转换

与其他一些语言不同，Kotlin 中的数字没有隐式加宽转换。例如，具有 `Double` 参数的函数只能对 `Double` 值调用，而不能对 `Float`、`Int` 或其他数值调用。

要将数值转换为不同类型，请使用显式转换 。

```kotlin
fun printDouble(x: Double) { print(x) }

val x = 1.0
val xInt = 1    
val xFloat = 1.0f 

printDouble(x)

printDouble(xInt)   
//  参数类型不匹配

printDouble(xFloat)
//  参数类型不匹配
```



### char

字符由 `Char` 类型表示。字符文字用单引号括起来：`'1'`。

在 JVM 上，存储为原始类型：`char` 的字符表示 16 位 Unicode 字符。

若要对任何其他字符进行编码，请使用 Unicode 转义序列语法：`'\uFF00'`。

如果字符变量的值是数字，则可以使用 `digitToInt()` 函数将其显式转换为 `Int` 数字。

```kotlin
val aChar: Char = 'a'

println(aChar)
println('\n') // 打印一个额外的换行符
println('\uFF00')
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

https://kotlinlang.org/docs/strings.html#string-formatting













