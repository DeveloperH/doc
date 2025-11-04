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



#### `Nothing`

`Nothing` 是 Kotlin 中的一种特殊类型，用于表示永远不会成功完成的函数或表达式，因为它们总是抛出异常或进入无限循环等无限执行路径。您可以使用 `Nothing` 来标记尚未实现的函数或设计为始终引发异常的函数，从而向编译器和代码阅读器清楚地表明您的意图。如果编译器在函数签名中推断出 `Nothing` 类型，它会警告你。显式定义 `Nothing` 作为返回类型可以消除此警告。

```kotlin
class Person(val name: String?)

fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
    // 此函数永远不会成功返回。它总是会抛出一个异常
}

fun main() {
    val person = Person(name = null)
    
    val s: String = person.name ?: fail("Name required")

    println(s)
}
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


// if 表达式中的每个分支都可以是一个块，其中最后一个表达式的值成为结果
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

就像 `if` 一样，每个分支都可以是一个块，它的值是块中最后一个表达式的值。如果使用 `when` 作为表达式，则必须涵盖所有可能的情况。第一个匹配分支的值将成为整个表达式的值。如果未涵盖所有情况，编译器会引发错误。

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

// 使用逗号将多个条件分组到一个分支中
val ticketPriority = "High"
when (ticketPriority) {
    "Low", "Medium" -> print("Standard response time")
    else -> print("High-priority handling")
}

// 使用计算结果为 true 或 false 的表达式作为分支条件
val storedPin = "1234"
val enteredPin = 1234
when (enteredPin) {
    storedPin.toInt() -> print("PIN is correct")
    else -> print("Incorrect PIN")
}

// 使用 in 或 !in 关键字检查值是否包含在范围或集合中
val x = 7
val validNumbers = setOf(15, 16, 17)
when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
}

// 使用 is 或 !is 关键字检查值的类型。由于智能强制转换 ，您可以直接访问该类型的成员函数和属性
fun hasPrefix(input: Any): Boolean = when (input) {
    is String -> input.startsWith("ID-")
    else -> false
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

do {
    println("good")
} while (false)
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
class Person(val name: String) {
    var age: Int = 0
}

class Rectangle(val height: Double, val length: Double) {
    val perimeter = (height + length) * 2 
}

fun main() {
  	// 创建实例
    val person = Person("Alice")
    println(person.name) // Alice
    println(person.age)  // 0
  
    val rectangle = Rectangle(5.0, 2.0)
    println("The perimeter is ${rectangle.perimeter}")
}
```



#### 构造函数

主构造函数可以将参数声明为属性。这些构造函数参数属性存储为实例的一部分，可从类外部访问。

也可以声明不是属性的主构造函数参。这些参数前面没有 `val` 或 `var`，因此它们不存储在实例中，并且仅在类体中可用。

```kotlin
class Person(val name: String, var age: Int) { }

class PersonWithAssignment(name: String) {
    // 必须分配给属性以便稍后使用
    val displayName: String = name

    fun greet() {
        println("Hello, $displayName")
    }
}

// 设置默认值，如果在实例创建过程中没有将任何值传递给构造函数，则属性使用其默认值
class Person(val name: String = "John", var age: Int = 30) { }

// 使用 init 关键字后跟大括号 {} 声明初始值设定项块，可以添加多个，它们将按照出现的顺序运行
class Person(val name: String, var age: Int) {
    init {
        // 初始化块在实例创建时运行。可以在初始值设定项块中使用主构造函数参数
        println("Person created: $name, age $age.")
    }
  
     init {
       	// init 块的一个常见用例是数据验证。例如，通过调用 require 函数
        require(age > 0, "age must be positive")
    }
}
```



不声明任何构造函数（主构造函数或辅助构造函数）的类具有没有参数的隐式主构造函数。这个隐式主构造函数的可见性是公开的，这意味着它可以从任何地方访问。如果您不希望您的类具有公共构造函数，请声明一个具有非默认可见性的空主构造函数。

```kotlin
class Person {  }

// private constructor 声明没有默认空主构造函数
class Person private constructor() {  }
```



#### 辅助构造函数

要声明辅助构造函数，请在类体中使用 `constructor` 关键字，并在括号 `()` 中使用构造函数参数。在大括号 `{}` 中添加构造函数逻辑。



```kotlin
class Person(val name: String, var age: Int) {
  	// 辅助构造函数通过 this 关键字委托给主构造函数，传递 name 和转换为整数的 age 值。
    constructor(name: String, age: String) : this(name, age.toIntOrNull() ?: 0) {
        println("$name created with converted age: $age")
    }
}
```



在 Kotlin 中，辅助构造函数必须委托给主构造函数。此委托确保在任何辅助构造函数逻辑运行之前执行所有主构造函数初始化逻辑。

构造函数委托可以是：

* 直接，其中辅助构造函数立即调用主构造函数。
* 间接 ，其中一个辅助构造函数调用另一个辅助构造函数，后者又委托给主构造函数。

```kotlin
class Person(
    val name: String,
    var age: Int
) {
    // 直接委托 
    constructor(name: String) : this(name, 0) {
        println("Person created with default age: $age and name: $name.")
    }

    // 间接委托
  	// this("Bob") -> constructor(name: String) -> 主构造函数
    constructor() : this("Bob") {
        println("New person created with default age: $age and name: $name.")
    }
}

fun main() {
    Person("Alice")
    // Person created with default age: 0 and name: Alice.

    Person()
    // Person created with default age: 0 and name: Bob.
    // New person created with default age: 0 and name: Bob.
}
```



在具有初始值设定项块 （`init {}`） 的类中，这些块中的代码成为主构造函数的一部分。鉴于辅助构造函数首先委托给主构造函数，则所有初始值设定项块和属性初始值设定项都在辅助构造函数的正文之前运行。即使类没有主构造函数，委托仍然隐式发生：

```kotlin
class Person {
    init {
        println("1. First initializer block runs")
    }

    constructor(i: Int) {
        println("2. Person $i is created")
    }
}

fun main() {
    Person(1)
    // 1. First initializer block runs
    // 2. Person 1 created
}
```





#### 继承

类之间的继承由冒号 （`:`） 声明。默认情况下，类是`final ` 的，要使类可继承，请将其标记为 `open ` 。

```kotlin
open class Shape

// 继承 Shape 类
class Rectangle(val height: Double, val length: Double): Shape() {
    val perimeter = (height + length) * 2
}
```



如果派生类具有主构造函数，则可以 （并且必须） 根据其参数在该主构造函数中初始化基类。

如果派生类没有主构造函数，则每个辅助构造函数必须使用 `super` 关键字初始化基类型，或者它必须委托给另一个构造函数。请注意，在这种情况下，不同的辅助构造函数可以调用基类型的不同构造函数。

```kotlin
class MyView : View {
    constructor(ctx: Context) : super(ctx)

    constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
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



#### open

在 Kotlin 中，`open` 关键字表示可以在子类中覆盖类或成员（函数或属性）。默认情况下，Kotlin 类及其成员是最终的 ，这意味着它们不能继承自（对于类）或覆盖（对于成员），除非您明确将它们标记为 `open` 。

Kotlin 需要对可覆盖的成员和覆盖使用显式修饰符 `override` 。

```kotlin
open class Person(
    val name: String
) {
    // open 标记：可以在子类中重写的函数
    open fun introduce() {
        println("Hello, my name is $name.")
    }
}

class Student(
    name: String,
    val school: String
) : Person(name) {
  	// 重写父类的 introduce() 函数
    override fun introduce() {
        println("Hi, I'm $name, and I study at $school.")
    }
}
```



如果重写基类的成员，则默认情况下，重写成员也会打开。如果要更改此设置并禁止类的子类覆盖实现，则可以显式将覆盖成员标记为 `final`：

```kotlin
open class Person(val name: String) {
    open fun introduce() {
        println("Hello, my name is $name.")
    }
}

class Student(name: String, val school: String) : Person(name) {
    // 标记为 final 后，Student 的子类就不能重写这个方法了
    final override fun introduce() {
        println("Hi, I'm $name, and I study at $school.")
    }
}
```



重写机制对属性的工作方式与对方法的工作方式相同。在超类上声明的属性，然后在派生类上重新声明的属性必须以 `override` 为开头，并且它们必须具有兼容的类型。每个声明的属性都可以由具有初始值设定项的属性或具有 `get` 方法的属性重写。

您还可以使用 `var` 属性覆盖 `val` 属性，但反之则不行。这是允许的，因为 `val` 属性本质上声明了一个 `get` 方法，并且将其重写为 `var` 还声明了派生类中的 `set` 方法。	

```kotlin
open class Shape {
    open val vertexCount: Int = 0
}

class Rectangle : Shape() {
  	// 覆盖属性
    override val vertexCount = 4
}
```



请注意，可以在主构造函数中使用 `override` 关键字作为属性声明的一部分：

```kotlin
interface Shape {
    val vertexCount: Int
}

class Rectangle(override val vertexCount: Int = 4) : Shape // 始终有4个vertices

class Polygon : Shape {
    override var vertexCount: Int = 0  // 以后可以设置为任何数字
}
```



覆盖规则：

在 Kotlin 中，实现继承受以下规则的约束：如果一个类从其直接超类继承同一成员的多个实现，它必须覆盖该成员并提供自己的实现（也许使用继承的实现之一）。

要表示从中获取继承实现的超类型，请在尖括号中使用超类型名称的 `super` qualed，例如 `super<Base>` 。

```kotlin
open class Rectangle {
    open fun draw() { /* ... */ }
}

interface Polygon {
    fun draw() { /* ... */ } // 默认情况下，接口成员是 open 的
}

class Square() : Rectangle(), Polygon {
    // 要求重写 draw()
    override fun draw() {
        super<Rectangle>.draw() // 调用 Rectangle.draw()
        super<Polygon>.draw() // 调用 Polygon.draw()
    }
}
```

继承自 `Rectangle` 和 `Polygon` 是可以的，但它们都有自己的 `draw()` 实现，因此您需要在 `Square` 中覆盖 `draw()` 并为其提供单独的实现以消除歧义。



#### 派生类初始化顺序

在构造派生类的新实例期间，基类初始化作为第一步完成（之前仅评估基类构造函数的参数），这意味着它发生在运行派生类的初始化逻辑之前。

这意味着在执行基类构造函数时，派生类中声明或重写的属性尚未初始化。在基类初始化逻辑中使用任何这些属性 （直接或间接通过另一个重写的 `open` 成员实现） 可能会导致不正确的行为或运行时失败。因此，在设计基类时，应避免在构造函数、属性初始值设定项或 `init` 块中使用 `open` 成员。

```kotlin
open class Base(val name: String) {

    init { println("Initializing a base class") }

    open val size: Int = 
        name.length.also { println("Initializing size in the base class: $it") }
}

class Derived(
    name: String,
    val lastName: String,
) : Base(name.replaceFirstChar { it.uppercase() }.also { println("Argument for the base class: $it") }) {

    init { println("Initializing a derived class") }

    override val size: Int =
        (super.size + lastName.length).also { println("Initializing size in the derived class: $it") }
}

fun main() {
    println("Constructing the derived class(\"hello\", \"world\")")
    Derived("hello", "world")
  
  	/*
  	运行结果：
  	Constructing the derived class("hello", "world")
    Argument for the base class: Hello
    Initializing a base class
    Initializing size in the base class: 5
    Initializing a derived class
    Initializing size in the derived class: 10
  	*/
 
}
```



#### super

派生类中的代码可以使用 `super` 关键字调用其超类函数和属性访问器实现。

```kotlin
open class Rectangle {
    open fun draw() { println("Drawing a rectangle") }
    val borderColor: String get() = "black"
}

class FilledRectangle : Rectangle() {
    override fun draw() {
        super.draw()
        println("Filling the rectangle")
    }

    val fillColor: String get() = super.borderColor
}
```



在内部类中，访问外部类的超类是使用外部类名称限定的 `super` 关键字完成的：`super@Outer` 。

```kotlin
class FilledRectangle: Rectangle() {
    override fun draw() {
        val filler = Filler()
        filler.drawAndFill()
    }

    inner class Filler {
        fun fill() { println("Filling") }
        fun drawAndFill() {
            super@FilledRectangle.draw() // Calls Rectangle's implementation of draw()
            fill()
            println("Drawn a filled rectangle with color ${super@FilledRectangle.borderColor}") // Uses Rectangle's implementation of borderColor's get()
        }
    }
}
```



#### data class

Kotlin 中的数据类主要用于保存数据。`data class` 提供具有以下功能的类：

* 所有属性的 getter（如果是 var，则还包括 setter）
* `equals()` ：仅比较计算主构造函数的属性
* `hashCode()`
* `toString()`
* `copy()` ：创建实例的浅层副本，对实例内其他对象的引用是共享的。
* `component1（）`， `component2（）`， ...，适用于所有属性



为了确保生成代码的一致性和有意义的行为，数据类必须满足以下要求：

* 主构造函数必须至少有一个参数。
* 所有主构造函数参数都必须标记为 `val` 或 `var`。
* 数据类不能是抽象的、开放的、密封的或内部的。



```kotlin
data class Customer(val name: String, val email: String)

// 编译器仅使用主构造函数中定义的属性来自动生成的函数。要从生成的实现中排除属性，请在类体中声明它：
data class Person(val name: String) {
    var age: Int = 0
}

// copy()
fun copy(name: String = this.name, age: Int = this.age) = User(name, age)
val jack = User(name = "Jack", age = 1)
val olderJack = jack.copy(age = 2)

// 为数据类生成的组件函数可以在解构声明中使用它们
val jane = User("Jane", 35)
val (name, age) = jane
println("$name, $age years of age")
// Jane, 35 years of age

// 在 JVM 上，如果生成的类需要具有无参数构造函数，则必须指定属性的默认值
data class User(val name: String = "", val age: Int = 0)
```



此外，数据类成员的生成遵循以下有关成员继承的规则：

* 如果数据类体中有 `equals()` 、`hashCode()` 或 `toString()` 的显式实现，或者在超类中有 `final` 实现，则不会生成这些函数，而是使用现有实现。
* 如果超类型具有 `open` 的 `componentN()` 函数并返回兼容类型，则会为数据类生成相应的函数并覆盖超类型的函数。如果由于签名不兼容或由于签名是最终签名而无法覆盖超类型的函数，则会报告错误。
* 不允许为 `componentN()` 和 `copy()` 函数提供显式实现。



#### sealed class 密封类和接口

密封的类和接口提供类层次结构的受控继承。密封类的所有直接子类在编译时都是已知的。在定义密封类的模块和包之外，不得出现其他子类。同样的逻辑也适用于密封接口及其实现：一旦编译了具有密封接口的模块，就无法创建新的实现。

直接子类是立即继承其超类的类。间接子类是从其超类的多个级别向下继承的类。

将密封的类和接口与 `when` 表达式组合在一起时，可以涵盖所有可能的子类的行为，并确保不会创建新的子类来对代码产生不利影响。

密封类最适合在以下情况下使用：

* 需要有限的类继承： 你有一组预定义的有限子类，用于扩展一个类，所有这些子类在编译时都是已知的。
* 需要类型安全设计： 安全性和模式匹配在您的项目中至关重要。特别是对于状态管理或处理复杂的条件逻辑。
* 使用封闭的 API： 您需要为库提供强大且可维护的公共 API，以确保第三方客户端按预期使用 API。



要声明密封的类或接口，请使用 `sealed` 修饰符：

```kotlin
// 创建一个密封接口
sealed interface Error

// 创建一个实现密封接口Error的密封类
sealed class IOError(): Error

// 定义继承密封类 IOError 的子类
class FileReadError(val file: File): IOError()
class DatabaseError(val source: DataSource): IOError()

// 创建一个实现Error密封接口的单例对象
object RuntimeError : Error
```



密封类本身始终是一个抽象类 ，因此无法直接实例化。但是，它可能包含或继承构造函数。这些构造函数不是用于创建密封类本身的实例，而是用于其子类。

```kotlin
sealed class Error(val message: String) {
    class NetworkError : Error("Network failure")
    class DatabaseError : Error("Database cannot be reached")
    class UnknownError : Error("An unknown error has occurred")
}

fun main() {
    val errors = listOf(Error.NetworkError(), Error.DatabaseError(), Error.UnknownError())
    errors.forEach { println(it.message) }
}
// Network failure 
// Database cannot be reached 
// An unknown error has occurred
```

您可以在密封类中使用枚举类来使用枚举常量来表示状态并提供其他详细信息。每个枚举常量仅作为单个实例存在，而密封类的子类可能具有多个实例。

```kotlin
enum class ErrorSeverity { MINOR, MAJOR, CRITICAL }

sealed class Error(val severity: ErrorSeverity) {
    class FileReadError(val file: File): Error(ErrorSeverity.MAJOR)
    class DatabaseError(val source: DataSource): Error(ErrorSeverity.CRITICAL)
    object RuntimeError : Error(ErrorSeverity.CRITICAL)
    // 此处可添加其他错误类型
}
```

密封类的构造函数可以具有以下两种可见性之一：`protected`（默认情况下）或 `private` ：

```kotlin
sealed class IOError {
    // 密封类的构造函数默认具有受保护的可见性。它在该类及其子类内部可见
    constructor() { /*...*/ }

    // 私有构造函数，仅在本类内部可见
    // 在密封类中使用私有构造函数可以实现对实例化的更严格控制，从而允许在类内部执行特定的初始化流程
    private constructor(description: String): this() { /*...*/ }

    // 这将引发错误，因为密封类不允许使用公共和内部构造函数
    // public constructor(code: Int): this() {}
}
```



密封类和接口的直接子类必须在同一包中声明。它们可以是顶级的，也可以嵌套在任意数量的其他命名类、命名接口或命名对象中。子类可以具有任何可见性 ，只要它们与 Kotlin 中的正常继承规则兼容即可。

密封类的子类必须具有正确限定的名称。它们不能是本地或匿名对象。

这些限制不适用于间接子类。如果密封类的直接子类未标记为密封，则可以以其修饰符允许的任何方式扩展它。

```kotlin
// 密封接口Error仅在同一包和模块中实现
sealed interface Error

// 密封类IOError扩展了Error，并且只能在同一个包内扩展
sealed class IOError(): Error

// open 类CustomError扩展了Error，可以扩展到任何可见的地方
open class CustomError(): Error
```



使用密封类的主要好处在 `when` 表达式中使用它们时就会发挥作用。与密封类一起使用的 `when` 表达式允许 Kotlin 编译器详尽地检查是否涵盖了所有可能的情况。在这种情况下，无需添加 `else` 子句：

```kotlin
// 密封类及其子类
sealed class Error {
    class FileReadError(val file: String): Error()
    class DatabaseError(val source: String): Error()
    object RuntimeError : Error()
}

// 记录错误的函数
fun log(e: Error) = when(e) {
    is Error.FileReadError -> println("Error while reading file ${e.file}")
    is Error.DatabaseError -> println("Error while reading from database ${e.source}")
    Error.RuntimeError -> println("Runtime error")
    // 不需要else，因为所有情况都涵盖在内
}

// 列出所有错误
fun main() {
    val errors = listOf(
        Error.FileReadError("example.txt"),
        Error.DatabaseError("usersDatabase"),
        Error.RuntimeError
    )

    errors.forEach { log(it) }
}
```



##### 用例场景

您可以使用密封类来表示应用程序中的不同 UI 状态。这种方法允许对 UI 更改进行结构化和安全处理。

```kotlin
sealed class UIState {
    data object Loading : UIState()
    data class Success(val data: String) : UIState()
    data class Error(val exception: Exception) : UIState()
}

fun updateUI(state: UIState) {
    when (state) {
        is UIState.Loading -> showLoadingIndicator()
        is UIState.Success -> showData(state.data)
        is UIState.Error -> showError(state.exception)
    }
}
```



#### value class 内联值类

内联类是基于值的类的子集。他们没有身份，只能持有价值观。

要声明内联类，请在类名之前使用 `value` 修饰符。

```kotlin
value class Password(private val s: String)

// 要为 JVM 后端声明内联类，请在类声明之前使用 value 修饰符和 @JvmInline 注释：
@JvmInline
value class Password(private val s: String)
```



内联类必须在主构造函数中初始化单个属性。在运行时，内联类的实例将使用此单个属性表示。

这是内联类的主要特征，它启发了内联这个名称：类的数据被内联到它的用法中（类似于内联函数的内容内联到调用站点的方式）。

```kotlin
// 没有实际实例化类“Password”
// 在运行时，“securePassword”仅包含“String”
val securePassword = Password("Don't try this in production")
```



内联类支持常规类的某些功能。特别是，它们被允许声明属性和函数，具有 init 块和辅助构造函数。

内联类属性不能有幕后字段 。它们只能具有简单的可计算属性（没有 `lateinit` / `delegated` 属性）。

```kotlin
@JvmInline
value class Person(private val fullName: String) {
    init {
        require(fullName.isNotEmpty()) {
            "Full name shouldn't be empty"
        }
    }

    constructor(firstName: String, lastName: String) : this("$firstName $lastName") {
        require(lastName.isNotBlank()) {
            "Last name shouldn't be empty"
        }
    }

    val length: Int
        get() = fullName.length

    fun greet() {
        println("Hello, $fullName")
    }
}

fun main() {
    val name1 = Person("Kotlin", "Mascot")
    val name2 = Person("Kodee")
    name1.greet() // the `greet()` function is called as a static method
    println(name2.length) // property getter is called as a static method
}
```



允许内联类继承自接口。

禁止内联类参与类层次结构。这意味着内联类不能扩展其他类，并且始终是 `final ` 。

```kotlin
interface Printable {
    fun prettyPrint(): String
}

@JvmInline
value class Name(val s: String) : Printable {
    override fun prettyPrint(): String = "Let's $s!"
}

fun main() {
    val name = Name("Kotlin")
    println(name.prettyPrint()) // Still called as a static method
}
```



允许通过委托到内联类的内联值来实现接口：

```kotlin
interface MyInterface {
    fun bar()
    fun foo() = "foo"
}

@JvmInline
value class MyInterfaceWrapper(val myInterface: MyInterface) : MyInterface by myInterface

fun main() {
    val my = MyInterfaceWrapper(object : MyInterface {
        override fun bar() {
            // body
        }
    })
    println(my.foo()) // prints "foo"
}
```



#### abstract class 抽象类

在 Kotlin 中，使用 `abstract` 关键字声明一个抽象类。，抽象类是无法直接实例化的类。它们被设计为由定义其实际行为的其他类继承。此行为称为实现 。

抽象类可以声明抽象属性和函数，这些属性和函数必须由子类实现。

抽象类也可以有构造函数。这些构造函数初始化类属性并为子类强制执行所需的参数。

抽象类可以同时具有抽象和非抽象成员（属性和函数）。要将成员声明为抽象，必须显式使用 `abstract` 关键字。

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



您不需要使用 `open` 关键字注释抽象类或函数，因为它们默认是隐式可继承的。

抽象成员在抽象类中没有实现。您可以使用 `override` 函数或属性在子类或继承类中定义实现。

```kotlin
abstract class Person(
    val name: String,
    val age: Int
) {
		// 抽象方法
    abstract fun introduce()

    // 非抽象方法
    fun greet() {
        println("Hello, my name is $name.")
    }
}

// 继承抽象类
class Student(
    name: String,
    age: Int,
    val school: String
) : Person(name, age) {
    override fun introduce() {
        println("I am $name, $age years old, and I study at $school.")
    }
}

fun main() {
    val student = Student("Alice", 20, "Engineering University")
    
    student.greet()
    // Hello, my name is Alice.
    
    student.introduce()
    // I am Alice, 20 years old, and I study at Engineering University.
}
```



#### companion object 配套对象/伴生对象

在 Kotlin 中，每个类都可以有一个配套对象。配套对象是一种对象声明，允许您使用类名访问其成员，而无需创建类实例。

假设您需要编写一个函数，该函数可以在不创建类实例的情况下调用，但它仍然在逻辑上连接到该类（例如工厂函数）。在这种情况下，您可以在类中的配套对象声明中声明它。

如果在类中声明配套对象，则可以仅使用类名作为限定符来访问其成员。

```kotlin
class Person(
    val name: String
) {
    // 伴生对象
    companion object {
        fun createAnonymous() = Person("Anonymous")
    }
}

fun main() {
    val anonymous = Person.createAnonymous()
    println(anonymous.name)
    // Anonymous
}
```



#### 单例

```kotlin
// 创建单例
object Resource {
    val name = "Name"
}
```



#### Any 超类

Kotlin 中的所有类都有一个通用的超类 `Any`，这是未声明超类型的类的默认超类。

`Any` 有三个方法：`equals()` 、`hashCode()` 和 `toString()` 。因此，这些方法是为所有 Kotlin 类定义的。

```kotlin
class Example // 隐式继承自Any
```



#### 自定义 getter 和 setter

默认情况下，Kotlin 会自动生成 getter 和 setter。当需要额外的逻辑（例如验证、格式设置或基于其他属性的计算）时，可以定义自己的自定义访问器。

每次访问属性时都会运行自定义 getter。

```kotlin
class Rectangle(val width: Int, val height: Int) {
    val area: Int
        get() = this.width * this.height
  
  	// 如果编译器可以从 getter 推断出该类型，则可以省略该类型
  	val area get() = this.width * this.height
}
```



每次向属性分配值时都会运行自定义 setter，初始化期间除外。按照惯例，setter 参数的名称为 `value`，但您可以选择不同的名称。

```kotlin
class Point(var x: Int, var y: Int) {
    var coordinates: String
        get() = "$x,$y"
        set(value) {
            val parts = value.split(",")
            x = parts[0].toInt()
            y = parts[1].toInt()
        }
}

fun main() {
    val location = Point(1, 2)
    println(location.coordinates) 
    // 1,2

    location.coordinates = "10,20"
    println("${location.x}, ${location.y}") 
    // 10, 20
}
```



若要更改访问器的可见性，请在 `get` 或 `set` 关键字之前使用修饰符。

```kotlin
class BankAccount(initialBalance: Int) {
    var balance: Int = initialBalance
        // 只有类中可以修改 balance，不能在外部修改
        private set 

    fun deposit(amount: Int) {
        if (amount > 0) balance += amount
    }

    fun withdraw(amount: Int) {
        if (amount > 0 && amount <= balance) balance -= amount
    }
}
```



要注释访问器，请在 `get` 或 `set` 关键字之前使用注释。

```kotlin
// 定义一个可以应用于getter的注解
@Target(AnnotationTarget.PROPERTY_GETTER)
annotation class Inject

class Service {
    var dependency: String = "Default Service"
        // 为getter添加注解
        @Inject get
}

fun main() {
    val service = Service()
    println(service.dependency) // Default service
  
  	// 使用反射来显示 getter 和 setter 上存在哪些注释。
    println(service::dependency.getter.annotations) // [@Inject()]
    println(service::dependency.setter.annotations) // []
}
```



#### 幕后字段 field

Backing Field（幕后字段） 可以理解为 Kotlin 为属性自动生成的一个私有存储空间。它用于在属性的 getter 或 setter 内部直接存储这个属性的值。

简单来说，它就是那个你“看不见”的、真正持有属性数据的变量。

当您想要向 getter 或 setter 添加额外的逻辑时，或者当您想要在属性更改时触发其他操作时，幕后字段非常有用。

不能直接声明幕后字段。Kotlin 仅在必要时生成它们。您可以使用 `field` 关键字在访问器中引用幕后字段。

Kotlin 仅在您使用默认 getter 或 setter 时生成幕后字段，或者在至少一个自定义访问器中使用 `field `。

```kotlin
class Person {
    var name: String = ""
        get() {
          	// return name  // 错误！这实际上是在递归调用 get() 方法本身	
          
            // 这里返回的是幕后字段 field 的值，而不是再次调用 get()
            return field
        }
        set(value) {
          	// name = value  // 错误！这实际上是在递归调用 set() 方法本身
          
            // 这里是将值赋给幕后字段 field，而不是再次调用 set()
            field = value
        }
}

fun main() {
    val person = Person()
    person.name = "Alice" // 正常工作
    println(person.name) // 输出：Alice
}
```



#### 幕后属性

有时，您可能需要比使用幕后字段所能提供的更大的灵活性。例如，如果您有一个 API，您希望能够在内部修改属性，但不能在外部修改属性。在这种情况下，可以使用称为幕后属性的编码模式。

在以下示例中，`ShoppingCart` 类具有表示购物车中所有内容的 `items` 属性。您希望 `items` 属性在类外部是只读的，但仍允许用户直接修改 `items` 属性的一种“批准”方式。为此，可以定义名为 `_items` 的专用后备属性和名为 `items` 的公共属性，该属性委托给后备属性的值。

```kotlin
class ShoppingCart {
    // 幕后属性。在命名幕后属性时使用_下划线，以遵循 Kotlin 编码约定
    private val _items = mutableListOf<String>()

    // Public read-only view
    val items: List<String>
        get() = _items

    fun addItem(item: String) {
        _items.add(item)
    }

    fun removeItem(item: String) {
        _items.remove(item)
    }
}

fun main() {
    val cart = ShoppingCart()
    cart.addItem("Apple")
    cart.addItem("Banana")

    println(cart.items) 
    // [Apple, Banana]
    
    cart.removeItem("Apple")
    println(cart.items) 
    // [Banana]
}
```



#### const

如果只读属性的值在编译时已知，请使用 `const` 修饰符将其标记为编译时常量 。编译时常量在编译时内联，因此每个引用都替换为其实际值。它们的访问效率更高，因为没有调用 getter 。

编译时常量必须满足以下要求：

* 它们必须是顶级属性，或者是对象声明或配套对象的成员。
* 它们必须使用 String 类型或基元类型的值进行初始化。
* 他们不能有自定义 getter。

编译时常量仍然具有幕后字段，因此您可以使用反射与它们进行交互。

```kotlin
// File: AppConfig.kt
package com.example

// const 声明 编译时常量
const val MAX_LOGIN_ATTEMPTS = 3
```



您还可以在注释中使用以下属性：

```kotlin
const val SUBSYSTEM_DEPRECATED: String = "This subsystem is deprecated"

@Deprecated(SUBSYSTEM_DEPRECATED) fun processLegacyOrders() { ... }
```



#### lateinit

通常，必须在构造函数中初始化属性。然而，这并不总是很方便。例如，可以通过依赖项注入或在单元测试的设置方法中初始化属性。

要处理这些情况，请使用 `lateinit` 修饰符标记属性。

```kotlin
public class OrderServiceTest {
    lateinit var orderService: OrderService

    @SetUp fun setup() {
        orderService = OrderService()
    }

    @Test fun processesOrderSuccessfully() {
        // 直接调用orderService，无需检查null或初始化
        orderService.processOrder()
    }
}
```



您可以在声明为 `var` 的属性上使用 `lateinit` 修饰符：

* 顶级属性。
* 局部变量。
* 类体内部的属性。 对于类属性：
  * 您不能在主构造函数中声明它们。
  * 它们不得具有自定义 getter 或 setter。



如果您在初始化 `lateinit` 属性之前访问它，Kotlin 会抛出一个特定异常，用于标识正在访问的未初始化属性。

要检查 `lateinit` 变量是否已初始化，请在对该属性的引用上使用 `isInitialized` 属性。

只有在代码中已经可以访问该属性时，才能在属性上使用 `isInitialized`。该属性必须在同一类、外部类中声明，或作为同一文件中的顶级属性声明。

```kotlin
class WeatherStation {
    lateinit var latestReading: String

    fun printReading() {
        // 检查属性是否已初始化
        if (this::latestReading.isInitialized) {
            println("Latest reading: $latestReading")
        } else {
            println("No reading available")
        }
    }
}

fun main() {
    val station = WeatherStation()

    station.printReading()
    // No reading available
    station.latestReading = "22°C, sunny"
    station.printReading()
    // Latest reading: 22°C, sunny
}
```



#### 嵌套类和内部类

类可以嵌套在其他类中：

```kotlin
class Outer {
    private val bar: Int = 1
    class Nested {
        fun foo() = 2
    }
}

val demo = Outer.Nested().foo() // == 2
```



您还可以使用带有嵌套的接口。类和接口的所有组合都是可能的：您可以在类中嵌套接口，在接口中嵌套类，在接口中嵌套接口。

```kotlin
interface OuterInterface {
    class InnerClass
    interface InnerInterface
}

class OuterClass {
    class InnerClass
    interface InnerInterface
}
```



标记为`inner` 的嵌套类可以访问其外部类的成员。内部类携带对外部类对象的引用：

```kotlin
class Outer {
    private val bar: Int = 1
    inner class Inner {
        fun foo() = bar
    }
}

val demo = Outer().Inner().foo() // == 1
```



匿名内部类实例是使用对象表达式创建的：

```kotlin
window.addMouseListener(object : MouseAdapter() {

    override fun mouseClicked(e: MouseEvent) { ... }

    override fun mouseEntered(e: MouseEvent) { ... }
})
```



#### enum 枚举类

枚举类最基本的用例是类型安全枚举的实现。

每个枚举常量都是一个对象。枚举常量用逗号分隔。

```kotlin
enum class Direction {
    NORTH, SOUTH, WEST, EAST
}

// 由于每个枚举都是枚举类的实例，因此可以将其初始化为：
enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF)
}
```



枚举常量可以使用相应的方法以及覆盖的基本方法声明自己的匿名类。

如果枚举类定义了任何成员，请使用分号将常量定义与成员定义分开。

```kotlin
enum class ProtocolState {
    WAITING {
        override fun signal() = TALKING
    },

    TALKING {
        override fun signal() = WAITING
    };

    abstract fun signal(): ProtocolState
}
```



枚举类可以实现接口（但它不能派生自类），为所有条目提供接口成员的通用实现，或者为其匿名类中的每个条目提供单独的实现。

默认情况下，所有枚举类都实现 `Comparable` 接口。枚举类中的常量按自然顺序定义。

```kotlin
import java.util.function.BinaryOperator
import java.util.function.IntBinaryOperator

enum class IntArithmetics : BinaryOperator<Int>, IntBinaryOperator {
    PLUS {
        override fun apply(t: Int, u: Int): Int = t + u
    },
    TIMES {
        override fun apply(t: Int, u: Int): Int = t * u
    };

    override fun applyAsInt(t: Int, u: Int) = apply(t, u)
}

fun main() {
    val a = 13
    val b = 31
    for (f in IntArithmetics.entries) {
        println("$f($a, $b) = ${f.apply(a, b)}")
    }
}
```



Kotlin 中的枚举类具有合成属性和方法，用于列出定义的枚举常量并按其名称获取枚举常量。这些方法的签名如下（假设枚举类的名称是 `EnumClass`）。

```kotlin
EnumClass.valueOf(value: String): EnumClass
EnumClass.entries: EnumEntries<EnumClass> // specialized List<EnumClass>


enum class RGB { RED, GREEN, BLUE }

fun main() {
    for (color in RGB.entries) println(color.toString()) // prints RED, GREEN, BLUE
    println("The first color is: ${RGB.valueOf("RED")}") // prints "The first color is: RED"
}
```

如果指定的名称与类中定义的任何枚举常量不匹配，则 `valueOf()` 方法会抛出 `IllegalArgumentException`。

每个枚举常量也有属性：`name` 和 `ordinal`，用于在枚举类声明中获取其名称和位置（从 0 开始）：

```kotlin
enum class RGB { RED, GREEN, BLUE }

fun main() {
    println(RGB.RED.name)    // prints RED
    println(RGB.RED.ordinal) // prints 0

}
```



您可以使用 `enumValues<T>()` 和  `enumValueOf<T>()` 函数以通用方式访问枚举类中的常量。在 Kotlin 2.0.0 中，引入了 `enumEntries<T>()` 函数作为 `enumValues<T>()`  函数的替代品。`enumEntries<T>()` 函数返回给定枚举类型 T 的所有枚举条目的列表。

```kotlin
enum class RGB { RED, GREEN, BLUE }

inline fun <reified T : Enum<T>> printAllValues() {
    println(enumEntries<T>().joinToString { it.name })
}

printAllValues<RGB>()
// RED, GREEN, BLUE
```



#### 对象声明和表达式

在 Kotlin 中，对象允许您定义一个类并在一个步骤中创建它的实例。当您需要可重用的单例实例或一次性对象时，这非常有用。为了处理这些场景，Kotlin 提供了两种关键方法：用于创建单例的对象声明和用于创建匿名一次性对象的对象表达式。

单例确保一个类只有一个实例，并提供对它的全局访问点。

对象声明和对象表达式最适合在以下情况下使用：

* 对共享资源使用单例： 您需要确保在整个应用程序中仅存在一个类的实例。例如，管理数据库连接池。
* 创建工厂方法： 您需要一种便捷的方法来高效地创建实例。 配套对象允许您定义与类绑定的类级函数和属性，从而简化这些实例的创建和管理。
* 临时修改现有类行为： 您希望修改现有类的行为，而无需创建新的子类。例如，为特定作向对象添加临时功能。
* 需要类型安全设计： 您需要使用对象表达式一次性实现接口或抽象类 。这对于按钮单击处理程序等方案非常有用。



对象声明和对象表达式之间的初始化行为存在差异：

* 对象表达式在使用它们时立即执行（并初始化）。
* 对象声明在首次访问时延迟初始化。
* 当加载（解析）与 Java 静态初始值设定项的语义匹配的相应类时，将初始化配套对象。





##### 对象声明

您可以使用对象声明在 Kotlin 中创建对象的单个实例，这些对象声明始终在 `object` 关键字后面有一个名称。这允许您在单个步骤中定义一个类并创建它的实例，这对于实现单例很有用：

```kotlin
// 声明一个单例对象来管理数据提供者
object DataProviderManager {
    private val providers = mutableListOf<DataProvider>()

    // 注册一个新的数据提供程序
    fun registerDataProvider(provider: DataProvider) {
        providers.add(provider)
    }

    // 检索所有已注册的数据提供程序
    val allDataProviders: Collection<DataProvider> 
        get() = providers
}

// 数据提供者接口示例
interface DataProvider {
    fun provideData(): String
}

// 数据提供者示例实现
class ExampleDataProvider : DataProvider {
    override fun provideData(): String {
        return "Example data"
    }
}

fun main() {
    // 创建一个ExampleDataProvider的实例
    val exampleProvider = ExampleDataProvider()

    // 要引用该对象，请直接使用其名称
    DataProviderManager.registerDataProvider(exampleProvider)

    // 检索并打印所有数据提供者
    println(DataProviderManager.allDataProviders.map { it.provideData() })
    // [Example data]
}
```

对象声明的初始化是线程安全的，并在首次访问时完成。

要引用 `object` ，请直接使用其名称：

```kotlin
DataProviderManager.registerDataProvider(exampleProvider)
```



对象声明也可以具有超类型，类似于匿名对象可以继承现有类或实现接口的方式：

```kotlin
object DefaultListener : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) { ... }

    override fun mouseEntered(e: MouseEvent) { ... }
}
```



与变量声明一样，对象声明不是表达式，因此它们不能在赋值语句的右侧使用：

```kotlin
// Syntax error: An object expression cannot bind a name.  对象表达式无法绑定名称。
val myObject = object MySingleton {
    val name = "Singleton"
}
```

对象声明不能是本地的，这意味着它们不能直接嵌套在函数中。但是，它们可以嵌套在其他对象声明或非内部类中。



###### data object 数据对象

在 Kotlin 中打印普通对象声明时，字符串表示形式包含其名称和 `object` 的哈希：

```kotlin
object MyObject

fun main() {
    println(MyObject) 
    // MyObject@hashcode
}
```

但是，通过使用 `data` 修饰符标记对象声明，您可以指示编译器在调用 `toString()` 时返回对象的实际名称，与 `data class` 的工作方式相同：

```kotlin
data object MyDataObject {
    val number: Int = 3
}

fun main() {
    println(MyDataObject) 
    // MyDataObject
}
```



此外，编译器还会为 `data object` 生成多个函数：

* `toString()` 返回数据对象的名称
* `equals()`/`hashCode()` 支持相等性检查和基于哈希的集合

您无法为`data object` 提供自定义 `equals` 或 `hashCode` 实现。



##### 对象表达式

对象表达式声明一个类并创建该类的实例，但不命名其中任何一个。这些类对于一次性使用很有用。它们可以从头开始创建，也可以从现有类继承，也可以实现接口。这些类的实例也称为**匿名对象** ，因为它们由表达式而不是名称定义。

对象表达式以 `object` 关键字开头。

如果对象没有扩展任何类或实现接口，则可以直接在 `object` 关键字后面的大括号内定义对象的成员：

```kotlin
fun main() {
    val helloWorld = object {
        val hello = "Hello"
        val world = "World"
        // 对象表达式扩展了Any类，该类已经有一个toString()函数，所以它必须被重写
        override fun toString() = "$hello $world"
    }

    print(helloWorld)
    // Hello World
}
```



要创建继承自某个类型（或多个类型）的匿名对象，请在`object` 和冒号 `:` 之后指定此类型。然后实现或覆盖此类的成员，就像从它继承一样：

```kotlin
window.addMouseListener(object : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) { /*...*/ }

    override fun mouseEntered(e: MouseEvent) { /*...*/ }
})
```

如果超类型具有构造函数，请将相应的构造函数参数传递给它。可以在冒号后指定多个超类型，用逗号分隔：

```kotlin
// 创建一个具有balance属性的开放类BankAccount
open class BankAccount(initialBalance: Int) {
    open val balance: Int = initialBalance
}

// 定义一个名为Transaction的接口，包含一个execute()函数
interface Transaction {
    fun execute()
}

// 一个在BankAccount上执行特殊交易的函数
fun specialTransaction(account: BankAccount) {
    // 创建一个继承自BankAccount类并实现Transaction接口的匿名对象
    // 将所提供账户的余额传递给BankAccount超类构造函数
    val temporaryAccount = object : BankAccount(account.balance), Transaction {

        override val balance = account.balance + 500  //  临时奖励

        // 实现Transaction接口中的execute()函数
        override fun execute() {
            println("Executing special transaction. New balance is $balance.")
        }
    }
    // 执行交易
    temporaryAccount.execute()
}
fun main() {
    // 创建一个初始余额为1000的BankAccount对象
    val myAccount = BankAccount(1000)
    //  对已创建的账户执行特殊交易
    specialTransaction(myAccount)
    // Executing special transaction. New balance is 1500.
}
```



从本地或 `private` 函数或属性返回匿名对象时，可以通过该函数或属性访问该匿名对象的所有成员。

```kotlin
class UserPreferences {
    private fun getPreferences() = object {
        val theme: String = "Dark"
        val fontSize: Int = 14
    }

    fun printPreferences() {
        val preferences = getPreferences()
        println("Theme: ${preferences.theme}, Font Size: ${preferences.fontSize}")
    }
}

fun main() {
    val userPreferences = UserPreferences()
    userPreferences.printPreferences()
    // Theme: Dark, Font Size: 14
}
```

这允许您返回具有特定属性的匿名对象，从而提供一种封装数据或行为的简单方法，而无需创建单独的类。

如果返回匿名对象的函数或属性具有 `public`、`protected` 或 `internal` 可见性，则其实际类型为：

* 如果匿名对象没有声明的超类型，则为 `Any`。
* 匿名对象的声明超类型（如果恰好有一个这样的类型）。
* 如果有多个声明的超类型，则显式声明的类型。

在所有这些情况下，在匿名对象中添加的成员都无法访问。如果重写的成员在函数或属性的实际类型中声明，则可访问它们。



对象表达式主体中的代码可以访问封闭作用域中的变量：

```kotlin
import java.awt.event.MouseAdapter
import java.awt.event.MouseEvent

fun countClicks(window: JComponent) {
    var clickCount = 0
    var enterCount = 0

    // MouseAdapter为鼠标事件函数提供了默认实现
    // 模拟MouseAdapter处理鼠标事件
    window.addMouseListener(object : MouseAdapter() {
        override fun mouseClicked(e: MouseEvent) {
            clickCount++
        }

        override fun mouseEntered(e: MouseEvent) {
            enterCount++
        }
    })
    // 在对象表达式中，clickCount和enterCount变量是可以访问的
}
```







### interface 接口

Kotlin 中的接口可以包含抽象方法的声明以及方法实现。它们与抽象类的不同之处在于接口不能存储状态。它们可以具有属性，但这些属性需要抽象或提供访问器实现。

使用关键字 `interface` 定义接口。一个类或对象可以实现一个或多个接口。

```kotlin
interface MyInterface {
    fun bar()
    fun foo() { }
}

class Child : MyInterface {
    override fun bar() {
        // body
    }
}
```



可以在接口中声明属性。在接口中声明的属性可以是抽象的，也可以为访问器提供实现。在接口中声明的属性不能具有幕后字段，因此在接口中声明的访问器不能引用它们。

```kotlin
interface MyInterface {
    val prop: Int // abstract

    val propertyWithImplementation: String
        get() = "foo"

    fun foo() {
        print(prop)
    }
}

class Child : MyInterface {
    override val prop: Int = 29
}
```



接口可以派生自其他接口，这意味着它既可以为其成员提供实现，也可以声明新的函数和属性。很自然地，实现此类接口的类只需要定义缺失的实现。

```kotlin
interface Named {
    val name: String
}

interface Person : Named {
    val firstName: String
    val lastName: String

    override val name: String get() = "$firstName $lastName"
}

data class Employee(
    // implementing 'name' is not required
    override val firstName: String,
    override val lastName: String,
    val position: Position
) : Person
```



当您在超类型列表中声明多个类型时，您可以继承同一方法的多个实现。

```kotlin
interface A {
    fun foo() { print("A") }
    fun bar()
}

interface B {
    fun foo() { print("B") }
    fun bar() { print("bar") }
}

class C : A {
    override fun bar() { print("bar") }
}

class D : A, B {
    override fun foo() {
        super<A>.foo()
        super<B>.foo()
    }

    override fun bar() {
        super<B>.bar()
    }
}
```

如果从 A 和 B 派生 D，则需要实现从多个接口继承的所有方法，并且需要指定 D 应如何实现它们。此规则既适用于继承了单个实现的方法 （bar()），也适用于继承了多个实现的方法 （foo()）。



### 函数 (SAM) 接口

仅具有一个抽象成员函数的接口称为函数接口或单抽象方法 （SAM Single Abstract Method ） 接口 。函数接口可以有多个非抽象成员函数，但只能有一个抽象成员函数。

要在 Kotlin 中声明函数式接口，请使用 `fun` 修饰符。

```kotlin
fun interface KRunnable {
    fun invoke()
}
```



对于函数式接口，可以使用 SAM 转换，通过使用 lambda 表达式帮助使代码更加简洁和可读。

您可以使用 lambda 表达式，而不是手动创建实现函数接口的类。通过 SAM 转换，Kotlin 可以将签名与接口单一方法的签名匹配的任何 lambda 表达式转换为代码，从而动态实例化接口实现。

```kotlin
fun interface IntPredicate {
    fun accept(i: Int): Boolean
}

// 不使用 SAM 转换
val isEven = object : IntPredicate {
    override fun accept(i: Int): Boolean {
        return i % 2 == 0
    }
}

// SAM 转换
val isEven = IntPredicate { it % 2 == 0 }
```



### 可见性修饰符

Kotlin 中有四种可见性修饰符：`private`、`protected` 、`internal` 和 `public`。默认可见性为 `public`。

类、对象、接口、构造函数和函数，以及属性及其 setter 可以具有可见性修饰符 。Getter 始终具有与其属性相同的可见性。



#### package

函数、属性、类、对象和接口可以直接在包内的顶层声明。

* 如果您不使用可见性修饰符，则默认使用 `public`，这意味着您的声明将在任何地方可见。
* 如果将声明标记为 `private` ，则它将仅在包含该声明的文件中可见。
* 如果将其标记为 `internal` ，则在同一模块中的任何地方都可以看到它。
* `protected` 修饰符不适用于顶级声明。

要使用另一个包中的可见顶级声明，您应该导入它。

```kotlin
// file name: example.kt
package foo

fun baz() { }	// 默认是 public
class Bar { }

private fun foo() { ... } // 仅在 example.kt 中可见

public var bar: Int = 5 // 在任何地方可见
    private set         // setter只在 example.kt 中可见

internal val baz = 6    // 只在相同 module 中可见
```



#### class 中的成员

对于在类内声明的成员：

* `private` 表示该成员仅在此类中可见（包括其所有成员）。
* `protected` 意味着该成员与标记为 `private` 的成员具有相同的可见性，但它在子类中也可见。
* `internal` 意味着此模块中任何看到声明类的客户端都会看到其 `internal ` 成员。
* `public` 意味着任何看到声明类的客户端都会看到其 `public` 成员。

在 Kotlin 中，外部类看不到其内部类的私有成员。

如果覆盖 `protected` 成员或 `internal ` 成员，并且未显式指定可见性，则覆盖成员也将具有与原始成员相同的可见性。

```kotlin
open class Outer {
    private val a = 1
    protected open val b = 2
    internal open val c = 3
    val d = 4  // 默认是 public

    protected class Nested {
        public val e: Int = 5
    }
}

class Subclass : Outer() {
    // a is not visible
    // b, c and d are visible
    // Nested and e are visible

    override val b = 5   // 'b' is protected
    override val c = 7   // 'c' is internal
}

class Unrelated(o: Outer) {
    // o.a, o.b are not visible
    // o.c and o.d are visible (same module)
    // Outer.Nested is not visible, and Nested::e is not visible either
}
```



#### 构造函数

使用以下语法指定类的主构造函数的可见性。

```kotlin
class C private constructor(a: Int) { }
```

默认情况下，所有构造函数都是 `public` 的，这实际上相当于它们在类可见的任何地方都可见（这意味着 `internal` 类的构造函数仅在同一模块中可见）。

对于密封类，构造函数默认 `protected ` 。



### package 、 import 

源文件可以以包声明开头。

源文件的所有内容，例如类和函数，都包含在此包中。如果未指定包，则此类文件的内容属于没有名称的默认包。

```kotlin
package org.example

fun printMessage() { /*...*/ }
class Message { /*...*/ }
```



导入：

`import` 关键字不限于导入类，您还可以使用它来导入其他声明：

* 顶级函数和属性
* 对象声明中声明的函数和属性
* 常量枚举



如果顶级声明标记为`private`，则它对声明它的文件是私有的。

```kotlin
// 导入单个名称
import org.example.Message

// 导入作用域的所有可访问内容：包、类、对象等
import org.example.*

// 如果存在名称冲突，可以通过使用 as 关键字在本地重命名冲突实体来消除歧义
import org.example.Message
import org.test.Message as TestMessage
```



### 迭代器

您可以通过提供名为 `iterator()` 的成员或扩展函数来创建自己的迭代器，该函数返回 `Iterator<>`。`iterator()` 函数必须有一个 `next()` 函数和一个返回布尔值的 `hasNext()` 函数。

为类创建自己的迭代器的最简单方法是继承自 `Iterable` 接口并覆盖已经存在的 `iterator()` 、`next()` 和 `hasNext()` 函数。

```kotlin
class Booklet(val totalPages: Int) : Iterable<Int> {
    override fun iterator(): Iterator<Int> {
        return object : Iterator<Int> {
            var current = 1
            override fun hasNext() = current <= totalPages
            override fun next() = current++
        }
    }
}

fun main() {
    val booklet = Booklet(3)
    for (page in booklet) {
        println("Reading page $page")
    }
    // Reading page 1
    // Reading page 2
    // Reading page 3
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

可以使用 `throw` 关键字手动抛出异常。抛出异常表示代码中发生了意外的运行时错误。异常是对象，抛出一个异常会创建一个异常类的实例。

```kotlin
fun test() {
    val result = try {
        count()
    } catch (e: ArithmeticException) {
        throw IllegalStateException(e)
    } finally {
        
    }
}
```



自定义异常：

```kotlin
class NegativeNumberException: Exception("Parameter is less than zero.")
class NonNegativeNumberException: Exception("Parameter is a non-negative number.")

fun myFunction(number: Int) {
    if (number < 0) throw NegativeNumberException()
    else if (number >= 0) throw NonNegativeNumberException()
}

fun main() {
    myFunction(1)
}
```



### 扩展

Kotlin 扩展允许您使用新功能扩展类或接口，而无需使用继承或设计模式（如 Decorator）。当使用无法直接修改的第三方库时，它们非常有用。创建后，您可以调用这些扩展，就好像它们是原始类或接口的成员一样。

最常见的扩展形式是扩展函数和扩展属性 。

重要的是，扩展不会修改它们扩展的类或接口。定义扩展时，不会添加新成员。您可以使用相同的语法使新函数可调用或新属性可访问。



#### 接收器

扩展总是在接收器上调用。接收方必须与要扩展的类或接口具有相同的类型。要使用扩展名，请在其前加上接收方，后跟 `.` 以及函数或属性名称。

例如，标准库中的 `.appendLine()` 扩展函数扩展了 `StringBuilder` 类。所以在本例中，接收器是 `StringBuilder` 实例， 接收器类型是 `StringBuilder` 。

```kotlin
val builder = StringBuilder()
    // Calls .appendLine() extension function on builder
    .appendLine("Hello")
    .appendLine()
    .appendLine("World")
println(builder.toString())
// Hello
//
// World
```



#### 扩展方法

在创建您自己的扩展函数之前，请查看您要查找的内容是否已在 Kotlin 标准库中可用。标准库为以下内容提供了许多有用的扩展函数：

* 对集合进行操作：`.map()` 、`.filter()` 、`.reduce()` 、`.fold()` 、`.groupBy()` 。
* 转换为字符串：`.joinToString()` 。
* 处理 null 值：`.filterNotNull()` 。



要创建您自己的扩展函数，请在其名称前加上接收器类型，后跟 `.` 。

```kotlin
fun String.truncate(maxLength: Int): String {
    return if (this.length <= maxLength) this else take(maxLength - 3) + "..."
}

fun main() {
    val shortUsername = "KotlinFan42"
    val longUsername = "JetBrainsLoverForever"

    println("Short username: ${shortUsername.truncate(15)}") 
    // KotlinFan42
  
    println("Long username:  ${longUsername.truncate(15)}")
    // JetBrainsLov...
}
```



若要创建泛型扩展函数，请在函数名称之前声明泛型类型参数，使其在接收器类型表达式中可用。

```kotlin
fun <T> List<T>.endpoints(): Pair<T, T> {
    return first() to last()
}

fun main() {
    val cities = listOf("Paris", "London", "Berlin", "Prague")
    val temperatures = listOf(21.0, 19.5, 22.3)

    val cityEndpoints = cities.endpoints()
    val tempEndpoints = temperatures.endpoints()

    println("First and last cities: $cityEndpoints")
    // (Paris, Prague)
    println("First and last temperatures: $tempEndpoints") 
    // (21.0, 22.3)
}
```



由于扩展和成员函数调用具有相同的表示法，编译器如何知道要使用哪一个？扩展函数是静态调度的 ，这意味着编译器在编译时根据接收器类型确定要调用的函数。

```kotlin
fun main() {
    open class Shape
    class Rectangle: Shape()

    fun Shape.getName() = "Shape"
    fun Rectangle.getName() = "Rectangle"

    fun printClassName(shape: Shape) {
        println(shape.getName())
    }

    printClassName(Rectangle())
    // Shape
}
```

如果类具有成员函数，并且存在具有相同接收器类型、相同名称和兼容参数的扩展函数，则成员函数优先。

```kotlin
class Example {
    fun printFunctionType() { println("Member function") }
}

fun Example.printFunctionType() { println("Extension function") }

Example().printFunctionType()
// Member function
```

但是，扩展函数可以重载具有相同名称但签名不同的成员函数：

```kotlin
class Example {
    fun printFunctionType() { println("Member function") }
}

// Same name but different signature
fun Example.printFunctionType(index: Int) { println("Extension function #$index") }

Example().printFunctionType(1)
// Extension function #1
```



您可以定义扩展函数，而无需为它们命名（匿名扩展函数）。当您想要避免全局命名空间混乱或需要将某些扩展行为作为参数传递时，这非常有用。

```kotlin
fun main() {
    //sampleStart
    data class Order(val weight: Double)
    val calculateShipping = fun Order.(rate: Double): Double = this.weight * rate
    
    val order = Order(2.5)
    val cost = order.calculateShipping(3.0)
    println("Shipping cost: $cost") 
    // Shipping cost: 7.5
}
```

要将扩展行为作为参数传递，请使用带有类型注释的 lambda 表达式 。例如，假设您要检查一个数字是否在某个范围内，而无需定义命名函数：

```kotlin
val isInRange: Int.(min: Int, max: Int) -> Boolean = { min, max -> this in min..max }

println(5.isInRange(1, 10))
// true
println(20.isInRange(1, 10))
// false
```



#### 扩展属性

Kotlin 支持扩展属性，这些属性对于执行数据转换或创建界面显示帮助程序非常有用，而不会使您正在使用的类变得混乱。

要创建扩展属性，请写下要扩展的类的名称，后跟 `.` 和属性的名称。

例如，假设您有一个数据类表示具有名字和姓氏的用户，并且您想要创建一个属性，该属性在访问时返回电子邮件样式的用户名。您的代码可能如下所示：

```kotlin
data class User(val firstName: String, val lastName: String)

// An extension property to get a username-style email handle
val User.emailUsername: String
    get() = "${firstName.lowercase()}.${lastName.lowercase()}"

fun main() {
    val user = User("Mickey", "Mouse")
    // Calls extension property
    println("Generated email username: ${user.emailUsername}")
    // Generated email username: mickey.mouse
}
```

由于扩展实际上不会将成员添加到类中，因此扩展属性没有有效的方法可以具有幕后字段 。这就是扩展属性不允许使用初始值设定项的原因。你只能通过显式提供 getter 和 setter 来定义它们的行为。



#### 伴生对象扩展

如果类定义了伴生对象 ，您还可以为伴生对象定义扩展函数和属性。就像伴生对象的常规成员一样，可以仅使用类名作为限定符来调用它们。默认情况下，编译器将伴生对象命名为 `Companion` ：

```kotlin
class Logger {
    companion object { }
}

fun Logger.Companion.logStartupMessage() {
    println("Application started.")
}

fun main() {
    Logger.logStartupMessage()
    // Application started.
}
```



#### 委托

委托模式已被证明是实现继承的一个很好的替代方案，Kotlin 原生支持它，不需要零样板代码。

类 `Derived` 可以通过将其所有公共成员委托给指定对象来实现接口 `Base`：

```kotlin
interface Base {
    fun print()
}

class BaseImpl(val x: Int) : Base {
    override fun print() { print(x) }
}

class Derived(b: Base) : Base by b

fun main() {
    val base = BaseImpl(10)
    Derived(base).print()
}
```

`Derived` 超类型列表中的 `by` 子句表示 `b` 将在内部存储在 `Derived` 的对象中，编译器将生成转发到 `b` 的所有 `Base` 方法。



重写委托实现的接口的成员：

覆盖按预期工作：编译器将使用重`写`实现，而不是委托对象中的实现。如果要添加到 `override fun printMessage() { print("abc") }` 到 `Derived`，程序将在调用 `printMessage` 时打印 abc 而不是 10：

```kotlin
interface Base {
    fun printMessage()
    fun printMessageLine()
}

class BaseImpl(val x: Int) : Base {
    override fun printMessage() { print(x) }
    override fun printMessageLine() { println(x) }
}

class Derived(b: Base) : Base by b {
    override fun printMessage() { print("abc") }
}

fun main() {
    val base = BaseImpl(10)
    Derived(base).printMessage()
    Derived(base).printMessageLine()
}
```



但是请注意，以这种方式重写的成员不会从委托对象的成员调用，委托对象只能访问其自己的接口成员实现：

```kotlin
interface Base {
    val message: String
    fun print()
}

class BaseImpl(x: Int) : Base {
    override val message = "BaseImpl: x = $x"
    override fun print() { println(message) }
}

class Derived(b: Base) : Base by b {
    // This property is not accessed from b's implementation of `print`
    override val message = "Message of Derived"
}

fun main() {
    val b = BaseImpl(10)
    val derived = Derived(b)
    derived.print()
    println(derived.message)
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



### 强制转换 `as`  `as?`

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



`as` 和 `as?` ：

若要将对象显式强制转换为不可为 null 的类型，请使用 `as` 。

```kotlin
val x: String = y as String
```

如果无法强制转换，编译器将引发异常。这就是为什么它被称为不安全 。

在前面的示例中，如果 `y` 为 `null`，则上面的代码也会抛出异常。这是因为 `null` 不能强制转换为 `String`，因为 `String` 不可为 null。若要使示例适用于可能的 null 值，请在强制转换的右侧使用可为 null 的类型：

```kotlin
val x: String? = y as String?
```



若要避免异常，请使用安全强制转换运算符 `as?`，该运算符在失败时返回 `null`。

请注意，尽管 `as?` 的右侧是不可为 null 的类型 `String`，但强制转换的结果是可为 null 的。

```kotlin
val x: String? = y as? String
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



### String

在 JVM 上，UTF-16 编码的 `String` 类型的对象每个字符使用大约 2 个字节。

字符串的元素是可以通过索引作访问的字符：`s[i]。` 您可以使用 `for` 循环迭代这些字符。

字符串是不可变的。初始化字符串后，无法更改其值或为其分配新值。所有转换字符串的作都会在新的 `String` 对象中返回其结果，而原始字符串保持不变。

多行字符串可以包含换行符和任意文本。它由三引号 `"""` 分隔，不包含转义，可以包含换行符和任何其他字符。

```kotlin
val str = "abcd" 
for (c in str) {
    println(c)
}

// 连接字符串
val s = "abc" + 1
println(s + "def")	// // abc1def

// 转义字符串
val s = "Hello, world!\n"

// 多行字符串
val text = """
    for (c in "foo")
        print(c)
    """
```



要从多行字符串中删除前导空格，请使用 `trimMargin()` 函数。

默认情况下，管道符号 `|` 用作边距前缀，但您可以选择另一个字符并将其作为参数传递，例如 `trimMargin(">")`。

```kotlin
val text = """
    |Tell me and I forget.
    |Teach me and I remember.
    |Involve me and I learn.
    |(Benjamin Franklin)
    """.trimMargin()
```



字符串文字可能包含模板表达式（经过计算并连接其结果的代码片段）。处理模板表达式时，Kotlin 会自动对表达式的结果调用 `.toString()` 函数，将其转换为字符串。模板表达式以美元符号 `$` 开头，由变量名称组成：

```kotlin
val i = 10
println("i = $i") // i = 10

val letters = listOf("a","b","c","d","e")
println("Letters: $letters") // Letters: [a, b, c, d, e]

val s = "abc"
println("$s.length is ${s.length}") // abc.length is 3
```



### Array

数组是一种数据结构，它保存固定数量的相同类型或其子类型的值。数组索引从 0 开始。

要在 Kotlin 中创建数组，您可以使用：

* 函数，例如 `arrayOf()`、`arrayOfNulls()` 或 `emptyArray()`
* `Array` 构造函数



```kotlin
var riversArray = arrayOf("Nile", "Amazon", "Yangtze")

// 使用+=赋值操作创建一个新的riversArray
riversArray += "Mississippi"
println(riversArray.joinToString())	// Nile, Amazon, Yangtze, Mississippi

// 使用 arrayOfNulls() 函数创建填充 null 元素的给定大小的数组
val nullArray: Array<Int?> = arrayOfNulls(3)
println(nullArray.joinToString())	// null, null, null

// 使用 emptyArray() 函数创建一个空数组
var exampleArray = emptyArray<String>()

// 由于 Kotlin 的类型推断，您可以在赋值的左侧或右侧指定空数组的类型。
var exampleArray = emptyArray<String>()
var exampleArray: Array<String> = emptyArray()

// Array 构造函数采用数组大小和一个函数，该函数返回给定其索引的数组元素的值
val initArray = Array<Int>(3) { 0 }	// [0, 0, 0]
println(initArray.joinToString())

val asc = Array(5) { i -> (i * i).toString() }	// ["0", "1", "4", "9", "16"]
asc.forEach { print(it) }

// 嵌套数组。嵌套数组不必是相同的类型或相同的大小。
val twoDArray = Array(2) { Array<Int>(2) { 0 } }
println(twoDArray.contentDeepToString())	// [[0, 0], [0, 0]]

val threeDArray = Array(3) { Array(3) { Array<Int>(3) { 0 } } }
println(threeDArray.contentDeepToString())
// [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
```



在 Kotlin 中，您可以通过 `vararg` 参数将可变数量的参数传递给函数。

要将包含可变数量参数的数组传递给函数，请使用扩展运算符 `*` 。spread 运算符将数组的每个元素作为单独的参数传递给您选择的函数。

```kotlin
fun main() {
    val lettersArray = arrayOf("c", "d")
    printAllStrings("a", "b", *lettersArray) // abcd
}

fun printAllStrings(vararg strings: String) {
    for (string in strings) {
        print(string)
    }
}
```



要比较两个数组是否具有相同顺序的相同元素，请使用 `contentEquals()`  和 `contentDeepEquals()` 函数。

不要使用相等 `==` 和不等式 `!=` 运算符来比较数组的内容。这些运算符检查分配的变量是否指向同一对象。

```kotlin
val simpleArray = arrayOf(1, 2, 3)
val anotherArray = arrayOf(1, 2, 3)

println(simpleArray.contentEquals(anotherArray)) // true

simpleArray[0] = 10
println(simpleArray contentEquals anotherArray) // false
```



其他方法：

```kotlin
// sum() 返回数组中所有元素的总和。只能与数字数据类型的数组一起使用
val sumArray = arrayOf(1, 2, 3)
println(sumArray.sum())	// 6

// shuffle() 随机打乱数组中的元素
val simpleArray = arrayOf(1, 2, 3)
simpleArray.shuffle()
println(simpleArray.joinToString())

val simpleArray = arrayOf("a", "b", "c", "c")
// 将数组转换为 Set
println(simpleArray.toSet()) // [a, b, c]
// 将数组转换为 List
println(simpleArray.toList())	// [a, b, c, c]

// 将数组转换为 Map
// 只有 Pair<K，V> 的数组可以转换为 Map。Pair 实例的第一个值将成为键，第二个值将成为值。
val pairArray = arrayOf("apple" to 120, "banana" to 150, "cherry" to 90, "apple" to 140)
println(pairArray.toMap()) // {apple=140, banana=150, cherry=90}

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

https://kotlinlang.org/docs/delegated-properties.html



https://kotlinlang.org/docs/generics.html#underscore-operator-for-type-arguments









