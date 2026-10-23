# Flutter

Flutter 让构建精美的移动应用变得简单快捷。

官网：https://flutter.dev/



## 安装

最简单的是使用 VS Code 安装 Flutter SDK，官方也提供这种快速安装方式。

1. 安装 Git：[下载 Git for Windows](https://git-scm.com/download/win)。
2. 安装 VS Code：[下载 VS Code](https://code.visualstudio.com)。
3. 打开 VS Code，在扩展市场搜索并安装 `Flutter`。
4. 按 `Ctrl + Shift + P`，输入 `Flutter: New Project`。
5. 如果提示没有 Flutter SDK，选择下载 SDK，并指定安装目录，例如 `D:\dev`。
6. 安装完成后，打开终端，执行以下命令验证：

```sh
flutter --version
dart --version
flutter doctor
```



手动安装（系统必须已安装 Git）：

1. 下载 Flutter SDK：

   - 访问 [Flutter 官方安装页面](https://docs.flutter.dev/install)，下载对应操作系统的稳定版压缩包（`.zip` 或 `.tar.xz`）。   

2. 解压文件：

   - 将压缩包解压到一个稳定的路径下（切勿放在需要管理员权限的目录，如 `C:\Program Files\`），例如 `C:\src\flutter` 或 macOS 的开发目录下。

3. 配置环境变量（PATH）：   

   - 将 Flutter 的 `bin` 目录（例如 `C:\src\flutter\bin`）完整路径添加到系统的环境变量 `Path` 中。   
   - (Mac/Linux 用户需将 `export PATH="$PATH:[你的路径]/flutter/bin"` 写入终端配置文件如 `~/.zshrc` 中)

4. 检查环境：

   - 打开一个新的终端或命令行窗口，运行以下命令：

     ```sh
     flutter doctor
     ```

   - 依照终端的提示，补全可能缺失的依赖组件（例如 Android Studio、Xcode 或平台工具）。

5. 验证安装

   * 当环境配置完成后，你可以尝试创建并运行你的第一个项目：   

     ```sh
     flutter create my_app
     cd my_app
     flutter run
     ```





## Dart

官网：https://dart.dev/

Dart 是由 Google 开发的一门开源、面向对象、通用的编程语言。它于 2011 年发布，其主要设计目标是为多平台开发提供高生产力和高性能。

Dart 最广为人知的身份是跨平台框架 Flutter 的核心编程语言。通过 Dart 和 Flutter，开发者可以使用一套代码库同时构建运行在以下平台上的应用程序。

简单理解：

- Dart：负责写业务代码。
- Flutter：负责提供 UI 组件、布局和跨平台开发框架。
- iOS / Android 原生代码：负责系统底层能力，例如 CoreBluetooth、Android BLE API。



主要特点：

* 高效的编译模式：

  * JIT（即时编译）：在开发阶段使用，支持强大的热重载（Hot Reload）功能，让开发者能够秒级看到代码修改后的效果，大幅提升开发效率。
  * AOT（提前编译）：在发布生产环境时，将 Dart 代码直接编译为高效的原生机器码（ARM、x86），保证应用运行流畅、性能接近原生。

* 面向对象与现代语法：Dart 是一门纯面向对象的语言，支持类、继承、接口、泛型以及混入（Mixins）。它的语法结构与 Java、C#、TypeScript 和 JavaScript 非常相似，如果你熟悉这些语言，可以非常快速地上手。

* 强类型与类型推导：Dart 拥有强大的类型系统（Sound Type System），既支持明确的类型声明，也支持使用 var 进行类型推导，兼顾了代码的安全性和灵活性。

* 垃圾回收（Garbage Collection）：自动管理内存，减少开发者的心智负担。

  

### 安装

可以单独下载安装 Dart SDK，或者直接安装 **Flutter SDK**（Flutter 默认自带并打包了 Dart）

```
windows: winget install --id=Google.DartSDK -e
mac: brew install dart

dart --version
```



### 运行

创建一个 `hello.dart` 文件：

```dart
void main() {
  print('Hello Dart!');

  final name = 'Medical App';
  print('当前项目：$name');
}
```

进入文件所在目录，运行：

```sh
dart run hello.dart
```



### 入门

#### 一、 程序的入口与打印

每个 Dart 程序都从 `main()` 函数开始，使用 `print()` 在控制台输出内容：

```dart
void main() {
  print('Hello, Dart!');
}
```



#### 二、 变量与数据类型

Dart 是一门强类型语言，但它支持**类型推导**，这意味着你既可以显式声明类型，也可以让编译器自动推导。

- **`var`**：自动推导类型（一旦赋值，类型就固定了）。
- **`final` 和 `const`**：定义常量。`final` 在运行时确定，`const` 在编译时确定。

```dart
void main() {
  // 1. 基本数据类型
  String name = '张三';       // 字符串
  int age = 25;             // 整数
  double height = 1.75;     // 浮点数
  bool isStudent = true;    // 布尔值
  dynamic free = 24;		// 动态类型

  // 2. 类型推导 (var)
  var city = '北京';        // 自动推导为 String
  // city = 100;          // 错误！不能改变数据类型

  // 3. 字符串插值 (非常常用！)
  print('我叫 $name，今年 $age 岁，身高 ${height}m。');
    
  // 列表：类似 JavaScript 数组
  List<int> heartRates = [72, 75, 80];

  heartRates.add(85);
  print(heartRates[0]);

  // Map：类似 JavaScript 对象
  Map<String, dynamic> device = {
    'name': 'X100',
    'deviceId': 'BLE_001',
    'rssi': -65,
    'connected': true,
  };

  print(device['name']);
  print(device['rssi']);

}
```



#### 三、 函数（方法）

Dart 中的函数是一等公民，支持简写语法（箭头函数）。

```dart
// 标准函数
int add(int a, int b) {
  return a + b;
}

// 箭头函数（当函数体只有一行时，可以使用 => 简化）
int multiply(int a, int b) => a * b;

// 可选命名参数（在 Flutter 中极其常用）
void printUserInfo({required String name, int age = 18}) {
  print('姓名: $name, 年龄: $age');
}

void main() {
  print(add(3, 5));       // 输出 8
  print(multiply(4, 2));  // 输出 8
  
  // 调用命名参数
  printUserInfo(name: '李四', age: 30);
}
```



#### 四、 控制流（条件与循环）

与其他主流语言（如 Java、JavaScript、C#）几乎完全一致：

```dart
void main() {
  int score = 85;

  // 1. 条件判断
  if (score >= 90) {
    print('优秀');
  } else if (score >= 60) {
    print('及格');
  } else {
    print('不及格');
  }

  // 2. for 循环
  for (int i = 0; i < 3; i++) {
    print('当前循环：$i');
  }

  // 3. 集合遍历
  var list = ['苹果', '香蕉', '橘子'];
  for (var item in list) {
    print(item);
  }
}
```



#### 五、 面向对象编程 (OOP)

Dart 是纯面向对象的语言，一切皆对象。

```dart
// 定义一个类
class Person {
  // 属性
  String name;
  int age;

  // 构造函数（简化写法）
  Person(this.name, this.age);

  // 方法
  void sayHello() {
    print('大家好，我是 $name，今年 $age 岁。');
  }
}

void main() {
  // 创建对象
  var p = Person('王五', 22);
  p.sayHello(); // 输出：大家好，我是 王五，今年 22 岁。
}
```



#### 六、 异步编程 (Async / Await)

在开发 App 时，经常需要请求网络、读取数据库，这就需要用到异步编程。Dart 使用 `Future` 和 `async/await` 来处理异步操作：

```dart
// 模拟一个网络请求，延迟 2 秒返回数据
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return '服务器数据获取成功！';
}

void main() async {
  print('开始请求...');
  
  // 等待异步结果返回
  String result = await fetchData();
  print(result);
  
  print('流程结束');
}
```



### 空安全机制（Null Safety）

Dart 的空安全机制，简单来说就是：在编译阶段尽可能发现变量可能为 `null` 的问题，避免程序运行时因为空值而崩溃。

这是 Dart 非常重要的特性，建议重点掌握 `?`、`!`、`late`、`??` 和 `?.`。

#### 一、 核心原则：默认不可空

在开启空安全后，Dart 的一个基本法则是：**所有变量默认都是“不可为空（Non-nullable）”的**。 也就是说，如果你声明了一个变量，它必须被赋予一个具体的值，绝对不能为 `null`。

```dart
void main() {
  String name = '张三'; // 正确
  // name = null;      // 编译错误！Dart 会直接提示该变量不能为 null
}
```



#### 二、 常用符号与语法

为了在“安全”和“灵活性”之间找到平衡，Dart 提供了一套非常直观的符号来处理可空变量：

##### 1. 可空类型：`?`

如果你明确希望某个变量可以为 `null`，需要在类型后面加上问号 **`?`**。

```dart
void main() {
  String? nickname; // 声明一个可空的字符串变量，默认值是 null
  nickname = '小明';   // 合法
  nickname = null;   // 合法
}
```



##### 2. 安全调用运算符：`?.`

当你调用一个可能为 `null` 的对象的属性或方法时，如果直接点（`.`）且对象刚好是 `null`，程序就会崩溃。使用 `?.` 可以安全地调用：

```dart
void main() {
  String? name;
  
  // print(name.length); // 危险！如果 name 为 null，会直接报错
  
  print(name?.length);   // 安全！如果 name 为 null，不会报错，而是直接返回 null
}
```



##### 3. 空合并运算符：`??` 和 `??=`

- **`??`**：如果左边的表达式为 `null`，就使用右边的默认值。
- **`??=`**：如果变量本身是 `null`，就把右边的值赋给它；如果不是 `null`，则保持原样。

```dart
void main() {
  String? username;
  
  // 如果 username 为 null，则使用 '访客'
  String displayName = username ?? '访客'; 
  print(displayName); // 输出：访客

  // 如果 username 是 null，则赋值为 '管理员'
  username ??= '管理员';
  print(username); // 输出：管理员
}
```



##### 4. 类型断言（强制非空）：`!`

有时你（开发者）心里很确定这个可空变量**当前绝对不可能是 null**，但 Dart 编译器不放心。此时可以使用 **`!`** 运算符强行解除安全检查：

```dart
void main() {
  String? text = 'Hello Dart';
  
  // 告诉编译器：“我保证它现在不是 null，放心用吧！”
  int length = text!.length; 
  print(length);
}
```

*⚠️ 注意：如果用了 `!` 但变量实际上是 `null`，程序依然会抛出运行时异常。*



##### 5. 延迟初始化：`late`

有时候某个变量你不想在声明时就立刻赋值（比如它需要等页面加载或构造函数执行时再赋值），但又想保证它是“不可空”的，可以使用 **`late`** 关键字：

```dart
class User {
  late String address; // 声明时先不赋值，承诺在使用前一定会赋值

  void init() {
    address = '北京市朝阳区';
  }
}
```

如果在赋值前就去访问 `late` 变量，程序会报错。



##### 总结与好处

- **以前**：很多 Bug 只有在用户点击 App 某一个按钮、触发了某个隐藏逻辑时，因为读到了 `null` 导致 App 突然闪退（崩溃）。
- **现在（有了空安全）**：绝大多数这类错误在**写代码时（IDE 编辑器中）\**或者\**编译时**就会被红色波浪线标记出来，逼你在上线前就把隐患修复。













