# Base

## 安装



[JDK 下载](https://www.oracle.com/java/)

[JDK8 下载 ](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)

[JDK11 下载](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)

[java8 文档](https://docs.oracle.com/javase/8/docs/api/index.html)



* Java 2 标准版(J2SE) ：桌面
* Java 2 企业版(J2EE) ：服务器
* Java 2 移动版(J2ME) ：手机



**JDK、JRE、JVM**

* JDK ：Java Development Kit (开发工具包)
  * 2014 jdk8
  * 2018 jdk11
  * 2021 jdk17
* JRE ：Java Runtime Environment (运行环境)
* JVM ：Java Virtual Machine (虚拟机)



**JDK 安装**

* 下载 JDK
* 配置环境变量 `JAVA_HOME` 、`Path`
* 验证安装 `java -version`



```java
public class Main {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}
```

```sh
# 检查版本号
java -version
javac -version

# 编译java文件
javac Demo.java

# 查看编译的class文件内容
javap A.class

# 执行class文件
java Demo.class

# 执行jar包
java -jar xxx.jar

# 生成javadoc
javadoc -encoding UTF-8 -charset UTF-8 Demo.java
```



### DOS 命令

* `dir` ：列出当前目录下的文件以及文件夹
* `md` ：创建目录
* `rd` ：删除目录
* `cd` ：进入指定目录 (change directory)
  * `cd ..` ：退回到上一级目录
  * `cd /` ：退回到根目录
* `del` ：删除文件
* `exit` ：退出 dos 命令行
* `cls` ：清理屏幕
* `ipconfig` ：查看电脑的 ip
* 打开应用：`calc mspaint notepad`





* JavaSE
* JavaWeb
* SSM 框架
* Linux
* SpringBoot
* SpringCloud





## 标识符

标识符由 26 个大小写字母、0～9 阿拉伯数字、`_` 和 `＄` 组成。数字不能开头。常量名全部大写。

标识符是大小写敏感的。可以用中文命名，但不推荐。

不能使用关键字作为变量名或方法名。



修饰符不存在先后顺序。

```java
public static final double PI = 3.14159;
```





### 关键字



![](http://qiniu.huangyihui.cn/202507072158283.png)



## 注释

* 单行注释：`//`
* 多行注释：`/*    */`
* 文档注释：`/**   */`

多行注释中不能嵌套多行注释，文档注释也不能嵌套多行注释。



```java
/**
 * @author: 张三
 * @ClassName: TestController
 * @Desciption: Test 控制类
 * @Date: 2024/01/20 21:22
*/
```



## 数据类型

* 基本类型
  * 整数类型。数字之间可以使用下划线分隔。操作比较大的数的时候，需注意溢出问题。
  * 浮点类型。最好完全避免使用浮点数进行比较。
  * 字符类型
  * 布尔类型
* 引用类型
  * 类、接口、数组



| 基本数据类型 | 内存占用（字节数） | 数据范围                                         |
| ------------ | ------------------ | ------------------------------------------------ |
| byte         | 1                  | -128~127                                         |
| short        | 2                  | -32768~32767                                     |
| int          | 4                  | -2147483648~2147483647(10位数，大概21亿多)       |
| long         | 8                  | -9223372036854775808~9223372036854775807(19位数) |
| float        | 4                  | 1.401298 E-45 到3.4028235 E+38                   |
| double       | 8                  | 4.9000000E-324 到1.797693E+308                   |
| char         | 2                  | 0-65535                                          |
| boolean      | 1                  | true，false                                      |



* 位(bit) ：是计算机内部数据储存的最小单位。10010011 是一个八位二进制数。
* 字节(byte) ：是计算机中数据处理的基本单位，习惯用大写 B 来表示。1B (字节) = 8 bit (位)
* 1024B = 1KB



```java
int num1 = 10;
byte num2 = 20;
short num3 = 30;
long num4 = 40L;    // Long 类型要在数字后面加 L
float num5 = 50.1f; // float 类型要在数字后面加 F
double num6 = 3.14159;
char ch1 = 'A';
String str1 = "abc";    // String 不是关键字，是类
boolean flag = true;
int money = 10_0000_0000;


// 最好完全避免使用浮点数进行比较
float f = 0.1f;
double d = 1.0 / 10;
System.out.println(f == d); // false

float d1 = 2131314124144f;
float d2 = d1 + 1;
System.out.println(d1 == d2);   // true


// 操作比较大的数的时候，需注意溢出问题
int money = 10_0000_0000;
int year = 20;
int total = money * year;   // -1474836480  溢出了
long total2 = money * year; // -1474836480  默认是 int，转换之前已经存在问题了
long total3 = money * ((long) year);    // 20000000000
```



### 类型转换

自动类型转换：类型范围小的变量，可以直接赋值给类型范围大的变量。

* byte → short →  int →  long → float → double
* char →  int

在表达式中，小范围类型的变量，会自动转换成表达式中较大范围的类型，再参与运算。表达式的最终结果类型由表达式中的`最高类型决定`。

**在表达式中，byte、short、char 是直接转换成 int 类型参与运算的。**



强制类型转换可能造成数据丢失。浮点型强转成整型，直接丢掉小数部分，保留整数部分返回。



```java
// 类型转换
// 自动类型转换
byte a = 12;
int b = a;
System.out.println(a);	// 12
System.out.println(b);	// 12

// 结果类型由最高类型决定
byte a = 10;
int b = 20;
long c = 30;
long d = a + b + c;
System.out.println(d);	// 60

// char 会转为 int 再进行运算
char a = 'a';       // 97
int b = a + 10;
System.out.println(b);  // 107
System.out.println(((char)98));  // b

// 强制类型转换可能造成数据丢失
int a = 220;
byte b = (byte)a;
System.out.println(b);  // -36 这是因为截取了220的二进制表示的后8位

// 浮点型强转为整型会丢失小数部分
double d  = 3.21;
int i = (int) d;
System.out.println(i);  // 3


// 面试题
byte b1 = 10;
byte b2 = 20;
// byte b3 = b1 + b2;   // 编译错误，Java在进行算术运算时，会自动将byte、short和char类型提升为int类型。
int b3 = b1 + b2;
byte b4 = (byte)(b1 + b2);
System.out.println(b3);
```





## 进制

* 二进制：由 0，1 组成，开头用 `0b` 表示
* 八进制：由 0～7 组成，开头用 `0` 表示
* 十进制：由 0～9 组成
* 十六进制：由 0～9，A～F组成，开头用 `0x` 表示



```java
int i = 10;
int i2 = 0b10;
int i3 = 010;
int i4 = 0x10;

System.out.println(i);  // 10
System.out.println(i2); // 2
System.out.println(i3); // 8
System.out.println(i4); // 16
```



进制转换：

* 十进制转二进制：就是除 2 运算
  * 除二取余法：将十进制数不断除以2，每次取余数，直至商为0为止，将所得的余数从下向上排列就是二进制结果。
* 二进制转十进制：就是乘 2 运算，每位乘以2的当前位数幂
  * 8421转换法：依次把每位是1的结果相加
* 二进制转十六进制：四个二进制位代表一个十六进制位
  * 8421转换法：4位最大值是15，依次把4位的结果拼接起来就是二进制转16进制的结果
* 二进制转八进制：三个二进制位代表一个八进制位
  * 8421转换法：3位最大值是7，依次把3位的结果拼接起来就是二进制转8进制的结果
* 负数的二进制就是它的取反 `+1`



```java
// java中内置的进制转换
System.out.println(Integer.toBinaryString(-6));

//十进制-->二进制
public static void toBin(int num){
  trans(num,1,1);
}

//十进制-->八进制
public static void toOctal(int num){
  trans(num,7,3);
}

//十进制-->十六进制
public static void toHex(int num){
  trans(num,15,4);
}
```



```java
// 十进制 --> 十六进制
public static void toHex(int num){
  StringBuffer sb = new StringBuffer();

  for(int x=0; x<8; x++){
    int temp = num & 15;
    if(temp>9)
      //System.out.println((char)(temp-10+'A'));
      sb.append((char)(temp-10+'A'));
    else
      //System.out.println(temp);
      sb.append(temp);

    num = num >>> 4;
  }
  System.out.println(sb.reverse());
}
```

```java
// 十进制-->二进制
public static void toBin(int num){
  StringBuffer sb = new StringBuffer();//存储数据

  while(num>0){
    //System.out.println(num%2);
    sb.append(num%2); //append 添加
    num = num / 2;
  }
  System.out.println(sb.reverse()); //reverse()反转
}
```

```java
// 查表法   十进制转二进制
public static void toBin_1(int num){
  if(num==0){
    System.out.println("0");
    return ;
  }

  char[] chs = {'0','1'};
  char[] arr = new char[32];
  int pos = arr.length;

  while(num!=0){
    int temp = num & 1;
    arr[--pos] = chs[temp];
    num = num >>> 1;
  }

  //System.out.println("pos="+pos);
  for(int x=pos; x<arr.length;x++){
    System.out.print(arr[x]);
  }
}
```

```java
// 十进制转十六进制
public static void toHex_2(int num){
  if(num==0){
    System.out.println("0");
    return ;
  }

  char[] chs = {'0','1','2','3',
    '4','5','6','7',
    '8','9','A','B',
    'C','D','E','F',};

  /*
  一会查表会查到比较多的数据，。
  数据一多，就先存储起来,再进行操作。
  所以定义一个数组，   临时容器
  */

  char[] arr = new char[8];
  int pos = arr.length;

  while(num!=0){
    int temp = num & 15;
    arr[--pos] = chs[temp];
    num = num >>> 4;
  }

  System.out.println("pos="+pos);
  for(int x=pos; x<arr.length;x++){
    System.out.print(arr[x]);
  }
}
```

```java
// 进制转换优化函数
//base: &数  offset: 右移位数
public static void trans(int num,int base,int offset){
  if(num==0){
    System.out.println("0");
    return ;
  }
  //定义一个对应关系表
  char[] chs = {'0','1','2','3',
    '4','5','6','7',
    '8','9','A','B',
    'C','D','E','F',};

  /*
   一会查表会查到比较多的数据，。
   数据一多，就先存储起来,再进行操作。
   所以定义一个数组，   临时容器
   */

  char[] arr = new char[32];
  int pos = arr.length;

  while(num!=0){
    int temp = num & base;
    arr[--pos] = chs[temp];
    num = num >>> offset;
  }

  for(int x=pos; x<arr.length; x++){
    System.out.print(arr[x]);
  }
  System.out.println();
}
```





## 运算符

* 算术远算符：`+ - * / % ++ --`
  * 两个整数相除结果还是整数
* 赋值运算符：`=  +=  -=  *=  /=  %=  &=`
* 关系运算符：`> < >=  <=  == != instanceof`
* 逻辑运算符：`&  |  ^  ! &&  || `
  * `&` ：两边都为true结果才为true，只要有一边是false，结果就是false
  * `|` ：两边都为false结果才为false，只要有一边是true，结果就是true
  * `^` ：判断两边的结果是否不同，不同则为true，相同则为false
  * `!` ：取反，!true结果是false，!fasle结果是true
  * `&&` ：和&结果相同，具有短路效果，如果前半是false，表达式结果一定为false，不运行后一半
  * `||` ：和||结果相同，具有短路效果，如果前半是true，表达式结果一定为true，不运行后一半
* 位运算符：` ~  <<  >>  >>>`
  * `<<` ：其实就是乘以2的移动的位数次幂。
  * `>>` ：其实就是除以2的移动的位数次幂。
  * `^` ：一个数异或同一个数两次，结果还是那个数。
* 三元运算符：`z=(x>y)?x:y;`



取模(取余数)：

* 当左边小于右边时,结果为左边
* 当右边为1时,结果为0
* 当两边相等时,结果为0
* 当出现负数时,只看左边



无符号右移：

* `>>` ：最高位补什么由原有数据的最高位值而定。如果最高位0，右移后，用0补空位
* `>>>` ：无论最高位是什么，右移后，都用0补。



```java
System.out.println(5 / 2);          // 2
System.out.println(1.0 * 5 / 2);    // 2.5

// 异或
System.out.println(2 > 1 ^ 3 > 1);          // false
System.out.println(1 > 1 ^ 2 > 1);          // true
System.out.println(true ^ true);            // false
System.out.println(false ^ false);          // false
System.out.println(false ^ true );          // true
System.out.println(23 ^ 54 ^ 23 );          // 54 一个数异或同一个数两次，结果还是那个数

// 短路运算
int c = 5;
boolean d = (c < 4) && (c++ < 4);
System.out.println(c);  // 5
System.out.println(d);  // false

// 运算符优先级
System.out.println(10 > 3 || 10 > 3 && 10 < 3); // true
```



运算符优先级：

| 优先级 | 运算符                      |
| ------ | --------------------------- |
| 1      | `()`                        |
| 2      | `!  -(负数)  ++  -- `       |
| 3      | `*  /  %`                   |
| 4      | `+  -(减)`                  |
| 5      | `<<  >>  >>>`               |
| 6      | `<  <=  >  >=  instanceof`  |
| 7      | `==  !=`                    |
| 8      | `&`                         |
| 9      | `^`                         |
| 10     | \|                          |
| 11     | `&&`                        |
| 12     | \|\|                        |
| 13     | `?:`                        |
| 14     | `=  +=  -=  *=  /=  %=  &=` |





## 转义字符

* `\n` ：回车
* `\b` ：退格
* `\t` ：制表符
* `\r` ：回车（window中允许有两个代表回车）





## 判断语句

* `if`
* `if ... else`
* `if ...else if ... else`
* `switch` ：语句中的变量类型可以是 `byte` 、`short` 、`int` 、`char` 、`String` 、枚举，同时 case 标签必须为字符串常量或字面量。



```java
int score = 95;

if (score == 100) {
    System.out.println("A级");
} else if (score < 100 && score > 80) {
    System.out.println("B级");
} else {
    System.out.println("C级");
}


String language = "ch";

switch (language) {
    case "ch":
        System.out.println("你好");
        break;
    case "fra":
        System.out.println("Bonjour");
        break;
    default:
        System.out.println("hi");
}
```





## 循环语句

* `while`
* `do...while` ：无论条件是否满足，循环体至少执行一次
* `for循环`
* 增强 for 循环：可以用来遍历集合或者数组

不知道循环次数用 while，知道循环次数用 for。



流程控制语句：

* `break` ：跳出并结束当前所在循环的执行。还可以用于 switch 语句。
* `continue` ：用于跳出当前循环的当次执行，直接进入循环的下一次执行。只能作于循环结构。
* 它们单独存在时，下面不可以有任何语句语句，因为执行不到。



```java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}

int num = 2;
do {
    System.out.println(num);
} while (num < 1);

for (int i = 0; i < 5; i++) {
    System.out.println(i);
}


// for 嵌套
for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + "*" + i + "=" + i * j + "\t");
    }
    System.out.println();
}

// 遍历数组或集合的增强型 for 循环 格式：for(元素的数据类型 变量名:数组或者集合) { }
int[] nums = {21, 5, 12, 94, 6};
for (int x : nums) {
    System.out.println(x);
}

// 死循环
for (; ; ) {
}

while (true) {
}
```



```java
for (int i = 0; i < 10; i++) {
    if (i > 5) {
        break;
    }

    System.out.println(i);
}

for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;
    }

    System.out.println(i);
}

// 通过标记跳出循环
OUT:
for (int i = 0; i <= 20; i++) {
    if(i%3 == 0) {
        continue OUT;
    }

    System.out.println(i);
}
```





## 函数 function

函数就是定义在类中的具有特定功能的一段独立小程序，函数也称为方法。

函数的格式：

```
修饰符 返回值类型 函数名(参数类型 形式参数1,参数类型 形式参数2,...)
{       
     执行语句;
     return 返回值;
}
```

当函数运算后，没有具体的返回值，就用关键字 `void` 标识。当函数返回值是 `void` 时，`return` 可以省略不写。



### 重载

重载(overload) 就是在一个类中，有相同的函数名称，但形参不同的函数。

当定义的功能相同，但参与运算的未知内容不同。那么，就定义一个函数名称以表示该功能，方便阅读，而通过参数列表的不同来区分多个不同名函数。

* 方法名称必须相同
* 参数列表必须不同（个数不同 / 类型不同 / 参数排列顺序不同）
* 与返回值类型无关

方法名称相同时，编译器会根据调用方法的参数个数、参数类型等去逐个匹配，以选择对应的方法。如果匹配失败，则编译器报错。



```java
public class Demo {
    public static void main(String[] args) {
        System.out.println(add(10, 20));
        System.out.println(add(10.0, 20.0));
    }

    public static int add(int a, int b) {
        return a + b;
    }

    public static double add(double a, double b) {
        return a + b;
    }
}
```



### 可变参数

可变参数就是一种特殊形参，定义在方法、构造器的形参列表中，在数据类型后加一个省略号 `...` 即可指定为一个可变参数。

* 特点：可以不传数据给它；可以传一个或者同时传多个数据给它；也可以传一个数组给它。
* 好处：常常用来灵活的接收数据。



注意事项：

* 一个形参列表中只能有一个可变参数
* 可变参数必须放在形参列表的最后面
* 可变参数在方法内部，本质就是一个数组

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println(add(10, 20, 30, 40));
      	System.out.println(add(1, new int[]{1, 2, 3}));
    }

  	// 可变参数 nums
    public static int add(int a, int... nums) {
      	// 可变参数在方法内部，本质就是一个数组
        int sum = a;
        for (int num : nums) {
            sum += num;
        }
        return sum;
    }
}
```



### 递归

递归就是自己调用自己。

* 需要设置停止的条件，不然会进入死循环
* 递归层级不能太大，否则就会出现栈溢出错误 `StackOverflowError`

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println(f(5));   // 120
    }

    // 阶乘 1*2*3* ... * n
    public static int f(int n) {
        if (n == 1) {
            return 1;
        } else {
            return n * f(n - 1);
        }
    }
}
```



### 命令行传参

如果希望运行一个程序时再传递给它消息，要靠传递命令行参数给 `main()` 函数实现。

```java
public class Demo {
    public static void main(String[] args) {
        for (int i = 0; i < args.length; i++) {
            System.out.println(args[i]);
        }
    }
}
```



步骤：

1. 在 java 文件目录下编译 `javac Demo.java`
2. 在项目 src 目录下根据包名执行程序 `java com.hyh.demo.Demo 参数1 参数2` 





## 数组 Array

数组是相同类型数据的有序集合。每个数据称作一个数组元素，每个数组元素可以通过索引访问，索引从0开始。索引一旦越界，就会出现 `ArrayIndexOutOfBoundsException` 异常。

其实数组就是一个容器。其长度是确定的，数组一旦被创建，它的大小就不可以改变。

数组的工具类 `java.util.Arrays` 提供了很多实用方法。

```java
int[] arr = new int[]{1, 2, 3, 4, 5};   // 推荐
int arr2[] = new int[]{1, 2, 3, 4, 5};
int[] arr3 = new int[10];   // 指定数组长度，数组元素会隐式初始化为相应类型的默认值
int[] arr4 = {1, 2, 3};			// 静态初始化

for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

arr3[0] = 99;
for (int i : arr3) {
    System.out.println(i);
}
```



数组元素默认值规则：

* byte、short、int、long ：0
* float、double ：0.0
* boolean ：false
* 类、接口、数组、String ：null





### 多维数组

```java
int[][] arr = new int[2][3];
int[][] arr2 = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

for (int[] ints : arr) {
    for (int item : ints) {
        System.out.print(item + "\t");
    }
    System.out.println();
}

System.out.println(arr2[1][2]); // 6
```



### 稀疏数组

当一个数组中大部分元素为 0，或者为同一值的数组时，可以使用稀疏数组来保存该数组，以节省空间。

处理方式：

* 记录数组一共有几行几列，和多少个不同值
* 把具有不同值的元素和行列及值记录在一个小规模的数组中，从而缩小程序的规模



```java
// 通过稀疏数组保存、还原棋盘数据
// 棋盘数据 0：没有棋子  1：黑棋  2：白棋
int[][] array1 = new int[11][11];
array1[1][2] = 1;
array1[2][3] = 2;

for (int[] ints : array1) {
    for (int anInt : ints) {
        System.out.print(anInt + "\t");
    }
    System.out.println();
}

// 将棋盘数据保存为稀疏数组
int sum = 2;
int[][] array2 = new int[sum + 1][3];
array2[0][0] = 11;
array2[0][1] = 11;
array2[0][2] = sum;

int count = 0;
for (int i = 0; i < array1.length; i++) {
    for (int j = 0; j < array1[i].length; j++) {
        if (array1[i][j] != 0) {
            count++;
            array2[count][0] = i;
            array2[count][1] = j;
            array2[count][2] = array1[i][j];
        }
    }
}

System.out.println("稀疏数组：");
for (int i = 0; i < array2.length; i++) {
    System.out.println(array2[i][0] + "\t" + array2[i][1] + "\t" + array2[i][2]);
}

// 还原数据
int[][] array3 = new int[array2[0][0]][array2[0][1]];
for (int i = 1; i < array2.length; i++) {
    array3[array2[i][0]][array2[i][1]] = array2[i][2];
}
System.out.println("还原数据：");
for (int[] ints : array3) {
    for (int anInt : ints) {
        System.out.print(anInt + "\t");
    }
    System.out.println();
}
```



### 常用方法

```java
// 遍历打印数组
public static void printArr(int[] arr) {
    System.out.print("[");

    for (int x = 0; x < arr.length; x++) {
        if (x != arr.length - 1) {
            //判断角标是否为最后一个
            System.out.print(arr[x] + ", ");
        } else {
            System.out.print(arr[x] + "]");
        }
    }

    System.out.println();
}


// 反转数组，不改变原数组
public static int[] reverse(int[] arr) {
    int[] result = new int[arr.length];
    for (int i = 0, j = result.length - 1; i < result.length; i++, j--) {
        result[j] = arr[i];
    }
    return result;
}

// 反转数组，改变原数组
public static int[] reverse2(int[] arr) {
    for (int i = 0, j = arr.length - 1; i < j; i++, j--) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// 打乱数组中的元素顺序
public static void randomSort(int[] arr) {
    Random r = new Random();
    for (int i = 0; i < arr.length; i++) {
        // 让当前值和随机索引位置处的值交换
        int index = r.nextInt(arr.length);
        int temp = arr[index];
        arr[index] = arr[i];
        arr[i] = temp;
    }
}

// 获取最大值
public static int getMax(int[] arr) {
    int max = arr[0];

    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max)
            max = arr[i];
    }
    return max;
}


// 获取最小值
public static int getMin(int[] arr) {
    int min = arr[0];

    for (int i = 1; i < arr.length; i++) {
        if (arr[i] < min)
            min = arr[i];
    }
    return min;
}

// 查找指定范围内的所有质数/素数
// 素数：除了1和它本身以外，不能被其他正整数整除。
public static void search(int min, int max) {
    for (int i = min; i <= max; i++) {
        boolean flag = true;
        for (int j = 2; j <= i / 2; j++) {
            if (i % j == 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            System.out.println(i);
        }
    }
}
```



### 排序

总共有八大排序。

```java
// 冒泡排序：相邻两个元素进行比较,如果符合条件就换位。两层循：外层冒泡轮数，里层依次比较
public static void bubbleSort(int[] arr) {
    // 不用遍历最后一个元素
    for (int i = 0; i < arr.length - 1; i++) {
        // -i：让每一次比较的元素减少；-1：避免角标越界
        for (int j = 0; j < arr.length - i - 1; j++) {
          	// 从小到大
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}


// 选择排序：内循环结束一次，最值出现头角标位置上。
public static void selectionSort(int[] arr) {
    // 不用遍历最后一个元素
    for (int i = 0; i < arr.length - 1; i++) {
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}
```



### 元素查找

```java
// 返回元素第一次出现时的角标
public static int getIndex(int[] arr, int value) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            return i;
        }
    }
    return -1;
}


// 折半查找：提高效率，但是必须要保证数组是有序的
public static int halfSearch(int[] arr, int value) {
    int min = 0;
    int max = arr.length - 1;
    int mid = (max + min) / 2;

    while (arr[mid] != value) {
        if (value > arr[mid]) {
            // value 比中间值大，最小角标移到中间角标前面
            min = mid + 1;
        } else if (value < arr[mid]) {
            max = mid - 1;
        }
        if (min > max) {
            return -1;
        }
        mid = (max + min) / 2;
    }

    return mid;
}


// 第二种折半查找
public static int halfSearch2(int[] arr, int value) {
    int min = 0, max = arr.length - 1;
    int mid;

    while (min <= max) {
        mid = (min + max) / 2;
        if (arr[mid] == value) {
            return mid;
        } else if (arr[mid] > value) {
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }
    return -1;
}
```





## 面向对象

面向对象(Object Oriented)是一种思想，90年代以后软件开发的主流思想。面向对象编程的本质就是：以类的方式组织代码，以对象的方式封装数据。**万物皆对象。**

面向对象编程的优点：

* 提高代码复用性。
* 使用者无需关心具体细节。
* 转变程序员角色，更加符合人的思维习惯。



面向对象的三个特征：**封装，继承，多态**。

以后开发，其实就是找对象使用。没有对象，就创建一个对象。开发步骤：找对象，建立对象，使用对象，维护对象的关系。



### 类 class

类是用来描述对象的。对象是类的实例，类是对象的抽象。类的5大成分（成员变量、构造器、方法、代码块、内部类）。

* 类中定义的变量也称为成员变量，类中定义的方法也成为成员方法。
* 成员变量本身存在默认值，在定义时一般不需要赋初始值（没有意义）。`修饰符 数据类型 变量名称 = 值`
* 一个代码文件中，可以写多个 class 类，但只能有一个用 public 修饰，其 public 修饰的类名必须成为代码文件名。
* 如果某个对象没有一个变量引用它，该对象会成为所谓的垃圾对象。`s1 = null;`



```java
public class Person {
    String name;	// 成员变量
    int age;

  	// 成员方法
    public void speak() {
        System.out.println("name=" + name + ",age=" + age);
    }
}
```

类和对象的关系：类就是对现实生活中事物的描述。对象就是这类事物实实在在存在的个体。



### 创建对象 new

使用 `new` 关键字和指定类名来创建一个对象。

```java
Person p = new Person();
p.name = "zhangsan"; //访问属性(成员变量)
p.age = 20;
p.speak(); //访问方法
```

这句话先在堆内存中创建了一个对象，然后栈内存中创建一个变量引用了对象的地址。

对象的生命周期从 `new` 关键字创建时开始，到没有任何引用达到对象时结束（成为垃圾）。



**成员变量初始化：**

* 基本数据类型初始化值为 0。
* 引用数据类型初始化值为 null。
* 布尔类型初始化值为 false。
* char 初始化值为 `\u0000` 表示为空。



### 成员变量和局部变量

| 区别         | 成员变量                   | 局部变量                                   |
| ------------ | -------------------------- | ------------------------------------------ |
| 类中位置不同 | 类中、方法外               | 方法内                                     |
| 初始化值不同 | 有默认值，不需要初始化赋值 | 没有默认值，使用之前必须完成赋值           |
| 内存位置不同 | 堆内存                     | 栈内存                                     |
| 作用域不同   | 整个对象                   | 在所归属的大括号内                         |
| 生命周期不同 | 与对象共存亡               | 随着方法的调用而生，随着方法的运行结束而亡 |



### 构造函数 constructor

对象一建立就会调用与之对应的构造函数。构造函数的作用：**可以用于给对象进行初始化**。创建对象都必须通过构造函数初始化。

当一个类没有定义构造函数时，那么系统会默认给该类加入一个空参数的构造函数，例如 `Person(){}`。当在类中自定义了构造函数后，默认的构造函数就没有了。

特点：

* 函数名和类名相同
* 必须没有返回类型，也不能写 `void`



**什么时候定义构造函数呢?**
当分析事物时，该事件存在具备一些特性或者行为，那么将这些内容定义在构造函数中。构造函数可以有多个，用于对不同的对象进行针对性的初始化。多个构造函数在类中是以重载的形式来体现的。



构造函数和一般函数在写法上有不同，在运行上也有不同：

* 构造函数是在对象一建立就运行。给对象初始化。而一般方法是对象调用才执行，是给对象添加对象具备的功能。
* 一个对象建立，构造函数只运行一次。而一般方法可以被该对象调用多次。



细节：

* 构造函数如果完成了 set 功能。set 方法是否需要。
* 一般函数不能直接调用构造函数。
* 构造函数如果前面加了 `void` 就变成了一般函数。
* 构造函数中是没有 `return` 语句的。



**构造代码块：**

* 作用：给所有对象进行初始化。
* 对象一建立就运行，而且优先于构造函数执行。
* 构造代码块是给所有对象进行统一初始化，而构造函数是给对应的对象初始化。



构造函数和构造代码块的区别：构造代码块是给所有对象进行统一初始化。构造函数是给对应对象初始化。



什么时候定义构造函数和构造代码块？在描述事物时，该事物一存在就具备的一些特性或者行为，这些内容都可以定义在构造函数中。不同对象共性的初始化内容可以定义在构造代码块中。



```java
public class Person {
    private String name;
    private int age;
    
    // 构造代码块中定义的是不同对象共性的初始化内容。
    {
        System.out.println("这里都是中国人");
    }

    // 构造函数
    Person() {
        System.out.println("A: name=" + name + ",,age=" + age);
        cry();
    }

    Person(String n) {
        name = n;
        System.out.println("B: name=" + name + ",,age=" + age);
        cry();
    }

    Person(String n, int a) {
        name = n;
        age = a;
        System.out.println("C: name=" + name + ",,age=" + age);
        cry();
    }

    public void setName(String n) {
        name = n;
    }

    public String getName() {
        return name;
    }

    public void cry() {
        System.out.println("cry....");
    }

    public void speak() {
        System.out.println("name=" + name + ",age=" + age);
    }
}
```



### this

`this` 主要用于解决局部变量和成员变量重名问题的。当成员变量和局部变量重名，可以用关键字 this 来区分。

this 代表它所在函数所属对象的引用，可以用来拿到当前对象。哪个对象调用方法，this 就代表哪个对象。



this 和 this 语句什么时候应用：

* this 的应用：当定义类中功能时，该函数内部要用到调用该函数的对象时，这时用 this 来表示这个对象。但凡本类功能内部使用了本类对象，都用 this 表示。
* this 语句：用于构造函数之间相互调用。this语句只能定义在构造函数的第一行。因为初始化要先执行。



super 和 this 的区别：this 代表的是本类对象的引用。super 代表的是父类对象的引用。

super 语句和 this 语句的特点：super 语句和 this 语句都只能在构造函数的第一行，所以一个构造函数中不能同时存在 super 语句和 this 语句。子类中至少会有一个构造函数会访问父类中的构造函数。



```java
public class Person {
    private String name;

    public Person() {
    }

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
      	// this 来区分重名的成员变量和局部变量
        this.name = name;
    }
}
```





### static 静态

用法：是一个修饰符，用于修饰成员(成员变量，成员函数)。当成员被静态修饰后，就多了一个调用方式，除了可以被对象调用外，还可以直接被类名调用。  `类名.静态成员`。

类方法最常见的应用场景是做工具类。工具类中的方法都是一些类方法，每个方法都是用来完成一个功能的。这样可以提高了代码复用、调用方便。提高了开发效率。

**工具类没有创建对象的需求，建议将工具类的构造器私有。**



static 特点：

* 随着类的加载而加载。也就说: 静态会随着类的消失而消失。说明它的生命周期最长。
* 优先于对象存在。明确一点：静态是先存在的，对象是后存在的。
* 类变量属于类，在计算机里只有一份，会被类的全部对象共享。
* 可以直接被类名所调用。
* 主函数是静态的。



类变量：属于类，与类一起加载一次，在内存中只有一份，可以被类和类的所有对象共享。

实例变量：属于对象，每个对象中都有一份，只能用对象访问。



实例变量和类变量的区别：

* 存放位置
  * 类变量随着类的加载而存在于方法区中。实例变量随着对象的建立而存在于堆内存中。
* 生命周期
  * 类变量生命周期最长，随着类的消失而消失。实例变量生命周期随着对象的消失而消失。



静态使用注意事项：

* 静态方法只能访问静态成员。非静态方法即可以访问静态也可以访问非静态。
* 静态方法中不可以定义 this，super 关键字。因为静态方法优先于对象存在，所以静态方法中不可以出现this。



静态有利有弊：

* 利处
  * 对对象的共享数据进行单独空间的存储，节省空间。没有必要每一个对象中都存储一份。
  * 可以直接被类名调用。
* 弊端
  * 生命周期过长。访问出现局限性。(静态虽好，只能访问静态)



```java
public class Student {
    static String name; // 类变量
    int age;            // 实例变量
  
    public static void say() {
        System.out.println("hello");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "张三";

        Student s2 = new Student();
        s2.name = "李四";

        System.out.println(s1.name);    // 李四
      	System.out.println(Student.name); // 李四
      
      	Student.say();
    }
}
```





什么时候使用静态呢？要从两方面下手，因为静态修饰的内容有成员变量和函数。

什么时候定义静态变量（类变量）呢？如果某个数据只需要一份，且希望能够被共享（访问、修改），则该数据可以定义成类变量来记住。例如：计数器。

什么时候定义静态函数（类方法）呢？当功能内部没有访问到非静态(对象的特有数据)，那么该功能可以定义成静态的。

```java
public class Student {
    public static int count;

    public Student() {
        Student.count++;
    }
}
```



### 代码块

* 静态代码块：`static {}`
  * 特点：类加载时自动执行，由于类只会加载一次，所以静态代码块也只会执行一次。
  * 作用：完成类的初始化。例如：对类变量的初始化赋值。
* 实例代码块：`{}`
  * 特点：每次创建对象时，执行实例代码块，并在构造器前执行。
  * 作用：和构造器一样，都是用来完成对象的初始化的。例如：对实例变量进行初始化赋值。



```java
public class Student {
    {
        System.out.println("实例代码块");
    }

    static {
        System.out.println("静态代码块");
    }
}
```





### 匿名对象

我们可以不定义变量引用对象，使用new关键字创建对象后直接使用，这样的对象没有名字，所以叫匿名对象。`new Car();`

匿名对象使用方式：

* 当对对象的方法只调用一次时，可以用匿名对象来完成，这样写比较简化。如果对一个对象进行多个成员调用，必须给这个对象起个名字。
* 可以将匿名对象作为实际参数进行传递。

匿名对象访问成员变量毫无意义，执行后就变成垃圾。



### 封装

封装：是指隐藏对象的属性和实现细节，仅对外提供公共访问方式。之所以对外提供访问方式，就因为可以在访问方式中加入逻辑判断等语句，对访问的数据进行操作。提高代码健壮性。

封装原则：将不需要对外提供的内容都隐藏起来。把属性都隐藏，仅提供公共方法对其访问。

封装规范：合理隐藏、合理暴露。

`高内聚`就是类的内部数据操作细节自己完成，不允许外部干涉。`低耦合`就是仅暴露少量的方法给外部使用。

好处：

* 将变化隔离。
* 便于使用。
* 提高重用性。
* 提高程序的安全性，保护数据。



`private` ：私有，权限修饰符。用于修饰类中的成员(成员变量，成员函数)。私有只在本类中有效。一个变量只有两种使用方式：设置方法，获取方法。(set get)

注意: 私有仅仅是封装的一种表现形式。

```java
public class Person {
  	// 属性私有
    private int age;

    // set 方法
    public void setAge(int a) {
        if (a > 0 && a < 130) {
            this.age = a;
            speak();
        } else {
            System.out.println("非法年龄");
        }
    }

    // get 方法
    public int getAge() {
        return this.age;
    }

    void speak() {
        System.out.println("age=" + age);
    }
}
```



### 继承

继承的本质是对某一批类的抽象，从而实现对现实世界更好的建模。用 `extends` 关键字，让一个类和另一个类建立起一种父子关系。 

所有的类都默认直接或者间接继承 `Object`。

**私有成员无法被继承。**

* 提高了代码的复用性。
* 让类与类之间产生了关系。有了这个关系，才有了多态的特性。

注意: 千万不要为了获取其他类的功能，简化代码而继承，必须是类与类之间有所属关系才可以继承。所属关系 is a 。



java 只支持单继承，不支持多继承。因为多继承容易带来安全隐患：当多个父类中定义了相同功能，当功能内容不同时，子类对象不确定运行哪一个。

但是 java 保留了这种机制，并用另一种体现形式来完成表示：多实现。

java 支持多层继承。也就是一个继承体系。



如何使用一个继承体系中的功能呢?

想要使用体系，先查阅体系父类的描述，因为父类中定义的是该体系中共性功能。通过了解共性功能，就可以知道该体系的基本功能，那么这个体系已经可以基本使用了。



那么在具体调用时，要创建最子类的对象，为什么呢?

一是因为有可能父类不能创建对象，二是创建子类对象可以使用更多的功能，包括基本的也包括特有的。



子父类出现后，类中成员的特点：

* 变量

  * 如果子类中出现了非私有的同名成员变量时，子类要访问本类中的变量，用this，子类要访问父类中的同名变量，用super。
  * super 的使用和 this 的使用几乎一致。this 代表的是本类对象的引用。super 代表的是父类对象的引用。

* 函数

  * 当子类出现和父类一模一样的函数时，当子类对象调用该函数，会运行子类函数的内容。如同父类的函数被覆盖一样。这种情况是函数的另一种特性: 重写(覆盖)。当子类继承父类，沿袭了父类的功能到子类中，但是子类虽具备该功能，但是功能的内容却和父类不一致，这时，没有必要定义新功能，而是使用覆盖特性，保留父类的功能定义，并重写功能内容。
  * 覆盖注意事项：子类覆盖父类，必须保证子类权限大于等于父类权限，才可以覆盖，否则编译失败。静态只能覆盖静态。

* 构造函数

  * 子类的全部构造器，都会先调用父类的构造器，再执行自己。那是因为子类的构造函数默认第一行有一条隐式的语句 `super();` `super()` 会访问父类中空参数的构造函数。而且子类中所有的构造函数默认第一行都是`super();`
  * 注意:：super 语句一定要定义在构造函数第一行。
* super 必须只能出现在子类的方法或者构造方法中。
  
  

为什么子类一定要访问父类中的构造函数呢?

因为父类中的数据子类可以直接获取，所以子类对象在建立时，需要先查看父类是如何对这些数据进行初始化的，所以子类在对象初始化时，要先访问一下父类中的构造函数。

如果要访问父类中指定的构造函数，可以通过手动定义 super 语句的方式来指定。



结论：

* 子类的所有构造函数，默认都会访问父类中空参数的构造函数。因为子类每一个构造函数内第一行都有一句隐式 `super();`
* 当父类中没有空参数的构造函数时，子类必须手动通过 super 语句形式来指定要访问的构造函数。
* 当然，子类的构造函数第一行也可以手动指定 this 语句来访问本类中的构造函数。子类中至少会有一个构造函数会访问父类中的构造函数。
* 子类构造器可以通过调用父类构造器，把对象中包含父类这部分的数据先初始化赋值，再回来把对象里包含子类这部分的数据也进行初始化赋值。





方法重写：

当子类觉得父类中的某个方法不好用，或者无法满足自己的需求时，**子类可以重写一个方法名称、参数列表一样的方法**，去覆盖父类的这个方法，这就是方法重写。例如：重写 `toString` 方法。

重写后，方法的访问，会遵循就近原则。

方法重写的注意事项：

* 方法名称、参数列表必须相同
* 子类重写父类方法时，访问权限必须大于或等于父类该方法的权限。 `public > protected > 缺省 > private`
* 重写的方法返回值类型，必须与被重写方法的返回值类型一样，或者范围更小
* 抛出的异常：范围可以被缩小但不能扩大。`Exception > ClassNotFoundException`
* 私有方法、静态方法不能被重写，如果重写会报错
* 建议使用 `@override` 注解，增加代码的可读性



子类的实例化过程：子类的所有构造函数，默认都会访问父类中空参数的构造函数。因为子类每一个构造函数内第一行都有一句隐式的 super()。当父类中没有空参数的构造函数时，子类必须手动通过 super 语句形式来指定要访问的构造函数。



### super 和 this

`this(...)` 和 `super(...)` 都只能放在构造器的第一行，且不能同时出现。



两者的区别：

* 代表的对象不同
  * this 代表本身调用者这个对象
  * super 代表父类对象的引用
* 前提
  * this 没有继承也可以使用
  * super 只能在继承条件下才可以使用
* 构造方法
  * this() 本类的构造方法
  * super() 父类的构造方法





### 重载和重写

重载: 只看同名函数的参数列表。(不看返回值类型)

重写：需要有继承关系，子类重写父类的方法。

* 方法名必须相同
* 参数列表必须相同
* 权限修饰符：范围可以扩大但不能缩小。 `public > protected > 缺省 > private`
* 抛出的异常：范围可以被缩小但不能扩大。`Exception > ClassNotFoundException`
* 返回值类型：与被重写方法的返回值类型一样，或者范围更小
* 私有方法、静态方法不能被重写，如果重写会报错
* 可以使用 `@override` 注解，增加代码的可读性





### 对象初始化过程

```java
Person p = new Person("zhangsan",20);
```

这句话都做了什么事情呢?

1. 因为new用到了 Person.class，所以会先找到 Person.class 文件并加载到内存中。
2. 执行该类中的 static 代码块，如果有的话，给 Person.class 类进行初始化。
3. 在堆内存中开辟空间，分配内存地址。
4. 在堆内存中建立对象的特有属性，并进行默认初始化。
5. 对属性进行显示初始化。
6. 对对象进行构造代码块初始化。
7. 对对象进行对应的构造函数初始化。
8. 将内存地址赋给栈内存中的p变量。



初始化顺序：

* static 代码块初始化 ：给类初始化
* 默认初始化：null，0，等等
* 显示初始化： 赋值
* 构造代码块初始化：给所有对象初始化
* 构造函数：给特定的对象初始化



### final

final：最终。作为一个修饰符。如果一个值不需要改变，可以加上 final 修饰作为常量。常量通常用于记录系统的配置信息。

程序编译后，常量会被“宏替换”，出现常量的地方全部会被替换成其的字面量，以提高程序性能。

常量书写规范：所有字母都大写，如果由多个单词组成，单词间通过下划线连接。

* 可以修饰类，函数，变量。
* 被 final 修饰的类被称为最终类，不可以被继承。这是为了避免被继承，被子类复写功能。
* 被 final 修饰的方法不可以被复写。
* 被 final 修饰的变量是一个常量，只能赋值一次。既可以修饰成员变量，也可以修饰局部变量。
  * 修饰基本类型的变量，变量存储的数据不能被改变
  * 修饰引用类型的变量，变量存储的地址不能被改变，但地址所指向对象的内容是可以被改变的
* 内部类定义在类中的局部位置时，只能访问该局部被 final 修饰的局部变量。



```java
public class Test {
    public static final String USER_NAME = "张三";

    public static void main(String[] args) {

        final double PI = 3.14;
        // Pi = 2; // 报错

        final int[] NUMS = {10, 20, 30};
        NUMS[1] = 99;
        System.out.println(NUMS[1]);    // 99
    }
}
```



### 多态

即同一个方法可以根据发生对象的不同而采用多种不同的行为方式。可以理解为事物存在的多种体现形态。

多态存在的条件：

* 有继承关系（要么继承，要么实现）
* 子类重写父类方法
* 父类引用指向子类对象

多态的出现大大的提高程序的扩展性，但是只能使用父类的引用访问父类的成员。

**注意的是，多态是对象、方法的多态，属性没有多态性。**

```
人: 男人，女人
动物: 猫，狗

猫 x= new 猫();
动物 x = new 猫();
```



**多态成员特点：**

* 在多态中成员函数的特点
  * 在编译时期：参阅引用型变量所属的类中是否有调用的方法。如果有，编译通过。如果没有，编译失败。
  * 在运行时期：参阅对象所属的类中是否有调用的方法。
  * 简单总结就是：成员函数在多态调用时，**编译看左边，运行看右边。**
* 在多态中，成员变量的特点:
  * **无论编译和运行，都参考左边**(引用型变量所属的类)。因为属性没有多态性。
* 在多态中，静态成员函数的特点:
  * 无论编译和运行，都参考左边。



多态的好处：

* 在多态形式下，右边对象是解耦合的，更便于扩展和维护
* 定义方法时，使用父类类型的形参，可以接收一切子类对象，扩展性更强、更便利

但是，多态下不能使用子类的独有功能。

如何使用子类的独有方法？可以向下转型。强制将父类的引用，转成子类类型。我们能转换的是父类引用指向了自己的子类对象时，该引用可以被提升，也可以被强制转换。

强转前建议使用 `instanceof` 判断当前对象的真实类型，再进行强转。

注意：多态自始自终都是子类对象在做着变化。



```java
public class Person {
    void run() {
        System.out.println("person run");
    }
}

public class Student extends Person {
    @Override
    void run() {
        System.out.println("student run");
    }

    void play() {
        System.out.println("student play");
    }
}

public class Teacher extends Person {
    @Override
    void run() {
        System.out.println("teacher run");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        Person person = new Student();
      	// 相当于 ((Student) person).run();
        person.run();   // student run  编译看左边，运行看右边

        test(new Student());    // student run
        test(new Teacher());    // teacher run

        // 父类引用可以指向子类，但是不能调用子类独有的方法。需要强制类型转换
        Student student = (Student) person;
        student.play();     // student play
      
      	// 千万不要将父类对象转成子类类型，编译阶段不会报错，运行时会报错
        Person person1 = new Person();
        // Student student1 = (Student) person1; // 报错
      
      
      	// instanceof 判断当前对象的真实类型
        Person p1 = new Student();
        if(p1 instanceof Student){
            Student s1 = (Student) p1;
            s1.play();
        }
    }

    public static void test(Person p) {
        p.run();
    }
}
```



### instanceof

格式：`x instanceof y` ，用于判断 x 是不是 y 的实例，返回布尔值。

```java
// 继承关系 Object > Person > Student
Object object = new Student();

System.out.println(object instanceof Student);  // true
System.out.println(object instanceof Person);   // true
System.out.println(object instanceof Object);   // true
System.out.println(object instanceof String);   // false
```



###  抽象 abstract

当多个类中出现相同功能，但是功能主体不同，这时可以进行向上抽取。这时，只抽取功能定义，而不抽取功能主体。

**抽象只能用来修饰类和方法。抽象方法只有方法签名，不要写方法体。**

抽象类的特点：

* 抽象类中不一定有抽象方法，但抽象方法一定在抽象类中。
* 抽象方法和抽象类都必须被 abstract 关键字修饰。
* 抽象类不可以用 new 创建对象，它是用来让子类继承的，并且调用抽象方法没意义。
* 一个类继承抽象类，必须重写抽象类的全部抽象方法，否则这个类也必须定义成抽象类。
* 类中该有的成员（成员变量、方法、构造器），抽象类都可以有。



好处：父类知道每个子类都要做某个行为，但每个子类要做的情况不一样，父类就定义成抽象方法，交给子类去重写实现，设计这样的抽象类，就是为了更好的支持多态。

**技巧：抽象类中可以不定义抽象方法。这样做仅仅是不让该类建立对象。**



```java
// 抽象类
public abstract class Action {
  	// 抽象方法
    public abstract void doSomething();
}

// 继承抽象类
public class User extends Action {

  	// 重写抽象类中的抽象方法
    @Override
    public void doSomething() {
        System.out.println("doSomething run");
    }
}
```



### 接口 interface

接口是一个特殊的抽象类。当抽象类中的方法都是抽象的，那么该类可以通过接口的形式来表示。

接口是不能创建对象的。因为有抽象方法，需要被子类实现，子类对接口中的抽象方法全都覆盖后，子类才可以实例化。否则子类是一个抽象类。

实现接口的类称为实现类。一个类可以实现多个接口，实现类实现多个接口，必须重写完全部接口的方法，否则实现类需要定义成抽象类。



* `class` ：用于定义类。
* `interface` ：用于定义接口。
* `implements` ：实现接口。



接口定义时，格式特点:

* 接口中常见定义：常量，抽象方法。
* 接口中的成员都有固定修饰符。
  * 常量：public static final
  * 方法：public abstract
* 记住：接口中的成员都是 public 的。



接口的好处：

* 弥补了类单继承的不足，一个类可以同时实现多个接口
* 让程序可以面向接口编程，这样就可以灵活方便的切换各种业务实现



注意事项：

* 一个接口继承多个接口，如果多个接口中存在方法签名冲突，则此时不支持多继承
* 一个类实现多个接口，如果多个接口存在方法签名冲突，则此时不支持多实现
* 一个类继承了父类，又同时实现了接口，父类中和接口中有**同名的默认方法**，实现类会优先用父类的
* 一个类实现了多个接口，多个接口中存在**同名的默认方法**，可以不冲突，这个类重写该方法即可



```java
// 定义接口
public interface Drive {

    // 接口中常量
    String DRIVE_TYPE = "D1";

    // 接口中的所有方法默认都是抽象的，自动省略了 public abstract
    void drive();

    // 默认方法，使用 default 修饰。只能使用接口的实现类对象调用
    default void test1() {
        System.out.println("default test1");
    }
    
    // 类方法，使用 static 修饰。只能用接口名调用
    static void test2() {
        System.out.println("static test2");
    }
    
    // 私有方法，JDK9 开始才支持
    private void test3() {
        System.out.println("private test3");
    }
}


// 实现接口
public class Student implements Drive {

    // 必须重写接口的中的所有方法
    @Override
    public void drive() {
        System.out.println("会开车了：" + DRIVE_TYPE);
    }
}

public class Test {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.drive();
        s1.test1();			// 调用接口的实例方法
        Drive.test2();	// 调用接口的类方法
    }
}
```





### Object 类

Object 类是所有类的祖宗类，该类中定义的肯定是所有对象都具备的功能。

如果自定义类中也有比较相同的功能，那么没有必要重新定义。只要沿袭父类的功能，建立自己特有的比较内容即可。这就是覆盖。

* `String toString() ` ：返回对象的字符串形式。存在的意义就是为了被子类重写，以便返回对象的具体内容。
* `boolean equals(Object o)` ：比较两个对象的地址是否相等。存在的意义就是为了被子类重写，以便子类自己来定制比较规则
* `Object clone()` ：对象克隆（浅克隆）

```java
public class Student {
    private String name;

    public Student(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

```java
public class Test {
    public static void main(String[] args) {

        Student s1 = new Student("张三");
        System.out.println(s1);
        System.out.println(s1.toString());

        Student s2 = new Student("张三");
        System.out.println(s1.equals(s2));  // 默认比较的是引用地址
        System.out.println(s1 == s2);
    }
}
```





### 内部类

内部类就是在一个类的内部再定义一个类。实际上就是类中的一个普通成员。

内部类的访问规则：

* 内部类可以直接访问外部类中的成员，包括私有。是因为内部类中持有了一个外部类的引用，格式：`外部类名.this`
* 外部类要访问内部类，必须建立内部类对象。



什么时候定义内部类：当一个类的内部，包含了一个完整的事物，且这个事物没有必要单独设计时，就可以把这个事物设计成内部类。



访问格式:

* 当内部类定义在外部类的成员位置上，而且非私有，可以在外部其他类中，直接建立内部类对象。

  ```java
  // 直接访问内部类中的成员 外部类名.内部类名 变量名 = new 外部类对象().内部类对象();
  Outer.Inner in = new Outer().new Inner();
  in.function();
  ```

* 当内部类在成员位置上，就可以被成员修饰符所修饰。比如：

  * private：将内部类在外部类中进行封装。
  * static：内部类就具备了 static 的特性。 当内部类被 static 修饰后，只能直接访问外部类中的静态成员。出现了访问局限。
  * 在外部其他类中，如何直接访问静态内部类的非静态成员呢? `new Outer.Inner1().function();`
  * 在外部其他类中，如何直接访问静态内部类的静态成员呢? `Outer.Inner1.function();`
  * 注意：当内部类中定义了静态成员，该内部类必须是 static 的。当外部类中的静态方法访问内部类时，内部类也必须是 static 的。



#### 成员内部类

JDK16 之后，成员内部类中可以定义静态成员了。

```java
public class Outer {
    private int id = 10;

    public class Inner {
        public void run() {
            System.out.println("成员内部类" + id);
          
          	System.out.println("获取当前外部类对象" + Outer.this);
          	
        }
    }
}

public class Demo {
    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.run();

        Outer.Inner inner2 = outer.new Inner();
        inner2.run();
      
      	Outer.Inner in = new Outer().new Inner();
    }
}
```



#### 静态内部类

```java
public class Outer {
    private static int id = 10;

    public static class Inner {
        public static void run() {
            System.out.println("静态内部类" + id);
        }
    }
}

public class Demo {
    public static void main(String[] args) {
        Outer.Inner.run();
    }
}
```



#### 局部内部类

局部内部类是定义在方法中、代码块中、构造器等执行体中。

内部类定义在局部时:

* 不可以被成员修饰符修饰。比如 static
* 可以直接访问外部类中的成员，因为还持有外部类中的引用。但是不可以访问它所在的局部中的变量。只能访问被final修饰的局部变量。



```java
public class Outer {
    private int id = 10;

    public void method() {
        String name = "HH";
        class Inner {
            int age = 30;

            public void run() {
                System.out.println("局部内部类" + id);
                System.out.println(name);
                System.out.println(age);
            }
        }

        new Inner().run();
    }
}


public class Demo {
    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.method();
    }
}
```



#### 匿名内部类(重点)

* 匿名内部类其实就是内部类的简写格式。
* 匿名内部类本质就是一个子类，并会立即创建出一个子类对象。
* 定义匿名内部类的前提：内部类必须是继承一个类或者实现接口。
* 匿名内部类的格式: `new 父类或者接口() { 类体(一般是方法重写) }`
* 匿名内部类中定义的方法最好不要超过3个。

作用：用于更方便的创建一个子类对象。通常作为一个参数传输给方法。

```java
public interface UserService {
    void add(String name);
}

public class Demo {
    public static void main(String[] args) {
        UserService userService = new UserService() {
            @Override
            public void add(String name) {
                System.out.println("add" + name);
            }
        };

        userService.add("张三");
    }
}
```



```java
public class Test {
    public static void main(String[] args) {
        // 匿名内部类
        go(new Swimming() {
            @Override
            public void swim() {
                System.out.println("游得飞快");
            }
        });

        // lambda 表达式
        go(() -> {
            System.out.println("游游游");
        });
    }

    // 可以接收 Swimming 接口的一切实现类对象
    public static void go(Swimming s) {
        s.swim();
    }
}

interface Swimming {
    void swim();
}
```



### main 函数

主函数：是一个特殊的函数。作为程序的入口，可以被 jvm 调用。

主函数的定义：

* public：代表着该函数访问权限是最大的。
* static：代表着主函数随着类的加载就已经存在了。
* void：主函数没有具体的返回值。
* main：不是关键字，但是是一个特殊的单词，可以被 jvm 识别。
* (String[] arr)：函数的参数，参数类型是一个数组， 该数组中的元素是字符串。



主函数是固定格式的，用于给 jvm 识别。jvm在调用主函数时，传入的是 new String[0];

```java
public static void main(String[] args) {

}
```





### 包装类

包装类就是把基本类型的数据包装成对象。

自动装箱：基本数据类型可以自动转换为包装类型。

自动拆箱：包装类型可以自动转换为基本数据类型。

| 基本数据类型 | 对应的包装类 |
| ------------ | ------------ |
| byte         | Byte         |
| short        | Short        |
| int          | Integer      |
| long         | Long         |
| char         | Character    |
| float        | Float        |
| double       | Double       |
| boolean      | Boolean      |



- **优先使用 `int`**：适用于大多数情况，性能更高，避免不必要的对象开销。
- **使用 `Integer`**：当需要 `null`、泛型、集合或调用工具方法时。

在自定义类中，如果字段 **不能为 `null`** 且 **不需要泛型**，推荐使用 `int`（更高效）。如果字段 **可能为 `null`** 或 **需要存入集合**，则使用 `Integer`。



```java
public class Test {
    public static void main(String[] args) {

      	// 包装类.valueOf()：转换成对应的数据类型
        Integer a1 = Integer.valueOf(12);
        System.out.println(a1);

        // 自动装箱
        Integer a2 = 12;
        // 自动拆箱
        int a3 = a2;

        ArrayList<Integer> list = new ArrayList<>();
        list.add(4);    // 自动装箱
        list.add(15);
        int a4 = list.get(1);   // 自动拆箱

    }
}
```





### 实体类

实体类就是一种特殊形式的类。

* 这个类中的成员变量都要私有，并且要对外提供相应的 getXxx 、setXxx 方法。
* 类中必须要有一个公共的无参的构造器。
* 实体类只负责数据存取，而对数据的处理交给其他类来完成，以实现数据和业务处理相分离。



```java
public class Student {
    private String name;

    public Student() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
public class StudentOperator {
    private Student student;

    public StudentOperator(Student student) {
        this.student = student;
    }

    // 业务处理的各种方法...
}
```



### 注解

注解：有功能的注释。



## 枚举

枚举是一种特殊类。

* 枚举类中的第一行，只能写一些合法的标识符（名称），多个名称用逗号隔开。这些名称，本质是常量，每个常量都会记住枚举类的一个对象
* 枚举类的构造器都是私有的（写不写都只能是私有的），因此，枚举类对外不能创建对象
* 枚举都是最终类，不可以被继承
* 枚举类中，从第二行开始，可以定义类的其他各种成员
* 编译器为枚举类新增了几个方法，并且枚举类都是继承 `java.lang.Enum` 类的，从 enum 类也会继承到一些方法



**应用场景：用来表示一组信息，然后作为参数进行传输。**

```
修饰符 enum 枚举类名 {
    名称1, 名称2...;
		其他成员... 
}
```



```java
public enum A {
    // 枚举类的第一行必须罗列的是枚举对象的名字
    X,Y,Z;

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
// 抽象枚举：枚举类型中需重写全部的抽象方法
public enum B {
    X() {
        @Override
        public void go() {

        }
    }, Y("张三") {
        @Override
        public void go() {
            System.out.println(getName() + "在跑");
        }
    };

    private String name;

    B() {
    }

    B(String name) {
        this.name = name;
    }

    public abstract void go();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
public class Test {
    public static void main(String[] args) {

        A a1 = A.X;
        A a2 = A.Y;

        A[] values = A.values();
        System.out.println(Arrays.toString(values));

        // valueOf 拿到全部对象
        A a3 = A.valueOf("Z");      // [X, Y, Z]
        System.out.println(a3);           // Z
        System.out.println(a3.name());    // Z
        // 索引
        System.out.println(a3.ordinal()); // 2


        B b = B.Y;
        b.go(); // 张三在跑
    }
}
```



```java
public class Test {
    public static void main(String[] args) {
        check(Gender.GIRL);
        check(Gender.BOY);
    }

    public static void check(Gender gender) {
        switch (gender) {
            case BOY:
                System.out.println("男孩看葫芦娃");
                break;
            case GIRL:
                System.out.println("女孩看巴拉拉");
                break;
        }
    }
}

enum Gender {
    BOY, GIRL;
}

```





## 异常 Exception

异常：就是程序在运行时出现不正常情况。

异常由来：问题也是现实生活中一个具体的事物，也可以通过 java 的类的形式进行描述，并封装成对象。其实就是 java 对不正常情况进行描述后的对象体现。



`java.lang.Throwable` 作为所有异常的超类。

```
Throwable
	|--Error
	|--Exception
		|--RuntimeException
		|--其他异常
```

对于问题的划分有两种：一种是严重的问题，一种是非严重的问题。

* Error ：代表系统级别错误，通常是灾难性的致命的错误，是程序无法控制和处理的，出现 Error 时，JVM 一般会选择终止线程。 对于Error，一般不编写针对性的代码对其进行处理。
* Exception ：代表的是程序可能出现的问题，可以使用针对性的处理方式进行处理。
  * 运行时异常：RuntimeException 及其子类，编译阶段不会出现错误提醒。（如：数组索引越界异常）
  * 编译时异常：编译阶段就会出现错误提醒的。（如：日期解析异常）

无论 Error 或者 Exception 都具备一些共性内容。比如：不正常情况的信息，引发原因等。



对于异常分两种:

* 编译时被检测的异常。
* 编译时不被检测的异常。(运行时异常 RuntimeException 以及其子类)



异常在子父类覆盖中的特点:

* 子类在覆盖父类时，如果父类的方法抛出异常，那么子类的覆盖方法，只能抛出父类的异常或者该异常的子类。
* 如果父类方法抛出多个异常，那么子类在覆盖该方法时，只能抛出父类异常的子集。
* 如果父类或者接口的方法中没有异常抛出，那么子类在覆盖方法时，也不可以抛出异常。如果子类方法发生了异常，就必须进行try处理，绝对不能抛。



常见的异常：

* `RuntimeException` ：运行时异常
* `ArrayIndexOutOfBoundsException` ：数组下标越界
* `NullPointerException` ：空指针异常
* `ArithmeticException` ：算术异常
* `MissingResourceException` ：丢失资源
* `ClassNotFoundException` ：找不到类等异常





### 异常处理

java 提供了特有的语句进行处理。建议在进行 catch 处理时，catch 中一定要定义具体处理方式。不要简单定义一句 `e.printStackTrace();` ，也不要简单的就书写一条输出语句。

记住一点：catch 是用于处理异常。如果没有 catch 就代表异常没有被处理过，如果该异常是检测时异常，那么必须声明。

```
try {
	可能出现异常的代码;
}
catch(异常类 变量) {
	处理异常的代码;
}
finally {
	一定会执行的语句;
}
```

finally代码块：定义一定执行的代码。通常用于关闭资源。

处理语句的其他格式:

```
try{} catch(){}

try{} catch(){} finally{}

try{} finally{}
```



对捕获到的异常对象进行常见方法操作：

* `String getMessage()` ：异常信息
* `toString()` ：异常名称 : 异常信息
* `printStackTrace()` ：打印错误的栈信息：包含异常名称，异常信息，异常出现的位置。



对多异常的处理：

* 声明异常时，建议声明更为具体的异常。这样处理的可以更具体。
* 对方声明几个异常，就对应有几个catch块。不要定义多余的catch块。如果多个catch块中的异常出现继承关系，父类异常catch块放在最下面（从小到大）。



```java
try {
    System.out.println(1 / 0);
} catch (ArithmeticException e) {
  	e.printStackTrace();	// 打印错误的栈信息
    System.out.println("除数不能为0");
} finally {
    System.out.println("finally");
}
```



### throws / throw

* throws ：在方法上使用，可以将方法内部出现的异常抛出去给调用者处理，不处理就编译失败。throws 后面跟的是异常类。可以跟多个，用逗号隔开。
* throw：在方法内使用。throw 后面跟的是异常对象。

注意：一般情况下，函数内出现异常，函数上需要声明。



```java
public class Demo {
    public static void main(String[] args) {
        try {
            new Demo().test(2, 0);
        } catch (ArithmeticException e) {
            e.printStackTrace();
        } finally {
            System.out.println("finally");
        }
    }

    // 如果在方法中处理不了这个异常，可以使用 throws 在方法上抛出异常
    public void test(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException();    // 主动抛出异常，throw 一般在方法中使用
        }
    }
}
```



### 自定义异常

因为项目中会出现特有的问题，而这些问题并未被 java 所描述并封装对象。所以对于这些特有的问题，可以按照java 对问题封装的思想，将特有的问题，进行自定义的异常封装。

当在函数内部出现了 throw 抛出异常对象，那么就必须要给出对应的处理动作。要么在内部 try catch 处理。要么在函数上声明，让调用者处理。

一般情况下：函数内出现异常，函数上需要声明。



**自定义异常：必须是自定义类继承 Exception 或 RuntimeException，并重写构造器。**

继承 Exception 的原因：
异常体系有一个特点：因为异常类和异常对象都需要被抛出。他们都具备可抛性。这个可抛性是 Throwable 这个体系的独有特点。只有这个体系中的类和对象才可以被 throws 和 throw 操作。



发现打印的结果中只有异常的名称，却没有异常的信息。因为自定义的异常并未定义信息。

如何定义异常信息呢?

因为父类中已经把异常信息的操作都完成了。所以子类只要在构造时，通过 super 语句将异常信息传递给父类。那么就可以直接通过 getMessage 方法获取自定义的异常信息了。



```java
public class MyException extends Exception {
    public MyException(String message) {
        super(message);
    }
}


public class Demo {
    public static void main(String[] args) {
        try {
            test(12);
        } catch (MyException e) {
          	e.printStackTrace();
            System.out.println(e);
        }
    }

    public static void test(int a) throws MyException {
        if (a > 10) {
            throw new MyException("输入不能大于10，当前值为："+ a);
        }
    }
}
```





### RuntimeException

Exception 中有一个特殊的子类异常 RuntimeException 运行时异常。如果在函数内抛出该异常，函数上可以不用声明，编译一样通过。如果在函数上声明了该异常，调用者可以不用进行处理，编译一样通过。

之所以不用在函数上声明，是因为不需要让调用者处理。当该异常发生，希望程序停止。因为在运行时，出现了无法继续运算的情况，希望停止程序后，对代码进行修正。

自定义异常时：如果该异常的发生，无法再继续进行运算，就让自定义异常继承 RuntimeException。



### 示例

```java
class LanPingException extends Exception{
	LanPingException(String message){
		super(message);
	}
}

class MaoYanException extends Exception{
	MaoYanException(String Message){
		super(Message);
	}
}

class NoPlanException extends Exception{
	NoPlanException(String msg){
		super(msg);
	}
}

class Computer{
	private int state = 3;//异常状态
	public void run() throws LanPingException,MaoYanException {
		if(state == 2)
			throw new LanPingException("蓝屏了");
		if(state == 3)
			throw new MaoYanException("冒烟了");
		System.out.println("电脑运行");
	}
	public void reset(){
		state = 1;
		System.out.println("电脑重启");
	}
}

class Teacher{
	private String name;
	private Computer cp;
	
	Teacher(String name){
		this.name = name;
		cp = new Computer();
	}
	
	public void prelect() throws NoPlanException{
		try{
			cp.run();
		}
		catch(LanPingException e){
			//System.out.println(e.toString());
			cp.reset();
		}
		catch(MaoYanException e){
			test();
			throw new NoPlanException("课时无法继续: "+e.getMessage());
		}
		
		System.out.println("讲课");
	}
	
	public void test(){
		System.out.println("做练习");
	}
}

public class Demo{
	public static void main(String[] args){
		Teacher t = new Teacher("毕老师");
		
		try{
			t.prelect();
		}catch(NoPlanException e){
			System.out.println(e.toString());
			System.out.println("换老师或者放假");
		}
	}
}
```



## 多线程

* 进程：是一个正在执行的程序。每一个进程执行都有一个执行顺序。该顺序是一个执行路径，或者叫一个控制单元
* 线程：就是进程中的一个独立的控制单元。线程在控制着进程的执行
* 一个进程中至少有一个线程。进程中的多个线程其实是并发和并行执行的



Java VM 启动的时候会有一个进程 java.exe。该进程中至少有一个线程负责 java 程序的执行，而且这个线程运行的代码存在于 main 方法中，该线程称之为主线程。

扩展：其实更细节说明 jvm，jvm 启动不止一个线程，还有负责垃圾回收机制的线程。



### 创建线程

java 已经提供了对线程这类事物的描述，就是 Thread 类。

注意：

* 启动线程必须是调用 start 方法，不是调用 run 方法
  * 直接调用 run 方法会当成普通方法执行，此时相当于还是单线程执行
  * 只有调用 start 方法才是启动一个新的线程执行
* 不要把主线程任务放在启动子线程之前
  * 这样主线程一直是先跑完的，相当于是一个单线程的效果了



#### 继承Thread类

* 定义类继承 Thread 类。
* 复写 Thread 类中的 run 方法。目的：将自定义的代码存储在 run 方法，让线程运行。
* 调用线程的 start 方法，该方法有两个作用：启动线程，执行 run 方法。



这种方式编码简单，但是线程类已经继承 Thread，无法继承其他类，不利于功能的扩展。

```java
// 继承Thread类
public class MyThread extends Thread {

    // 必须重写Thread类的run方法
    @Override
    public void run() {
      	// 描述线程的执行任务
        for (int i = 0; i < 5; i++) {
            System.out.println("MyThread: " + i);
        }
    }
}
```

```java
// 创建线程
MyThread myThread = new MyThread();
// 启动线程（会自动执行run方法）
myThread.start();
```



#### 实现Runnable接口

* 定义线程任务类实现 Runnable 接口
* 重写 Runnable 接口中的 run 方法，将线程要运行的代码存放在该 run 方法中
* 通过 Thread 类创建线程对象。
* 将 Runnable 接口的子类对象作为实际参数传递给 Thread 类的构造函数。
  * `Thread(Runnable target)` ：封装 Runnable 对象成为线程对象
* 调用线程对象的 start 方法开启线程并调用 Runnable 接口子类的 run 方法。



```java
// 实现Runnable接口
public class MyRunnable implements Runnable {

    // 实现Runnable类的run方法
    @Override
    public void run() {
        // 描述线程的执行任务
        for (int i = 0; i < 5; i++) {
            System.out.println("MyRunnable: " + i);
        }
    }
}
```

```java
// 创建任务对象
MyRunnable target = new MyRunnable();
// 把任务对象交给一个线程对象处理
new Thread(target).start();
```



#### 匿名内部类

1. 创建 Runnable 的匿名内部类对象
2. 再交给 Thread 线程对象
3. 再调用线程对象的 start() 启动线程



```java
// 匿名内部类
Runnable target = new Runnable() {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("子线程1: " + i);
        }
    }
};
new Thread(target).start();

// 简化形式
new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("子线程2: " + i);
    }
}).start();
```



#### Callable 、FutureTask

假如线程执行完毕后有一些数据需要返回，重写的 run 方法均不能直接返回结果。这时可以通过 Callable 接口和 FutureTask 类来实现。这种方式最大的优点就是可以返回线程执行完毕后的结果。



* 创建任务对象
  * 定义一个类实现 Callable 接口，重写 call 方法，封装要做的事情和要返回的数据
  * 把 Callable 类型的对象封装成 FutureTask（线程任务对象）
* 把线程对象交给 Thread 对象
* 调用 Thread 对象的 start 方法启动线程
* 线程执行完毕后，通过 FutureTask 对象的 get 方法获取线程任务执行的结果



 FutureTask 构造器：

* `FutureTask(Callable<V> callable)` ：把 Callable 对象封装成 FutureTask 对象



 FutureTask 方法：

* `V get()` ：获取线程执行 call 方法返回的结果



```java
// 实现Callable接口
public class MyCallable implements Callable<String> {

    // 重写call方法
    @Override
    public String call() throws Exception {
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += i;
        }
        // 返回数据
        return "结果是：" + sum;
    }
}
```

```java
// 创建一个Callable对象
MyCallable call = new MyCallable();

// 把Callable对象封装成一个未来任务对象
// 未来任务对象是一个任务对象，实现了Runnable对象。可以在线程执行完毕后，用未来任务对象调用get方法获取线程执行完毕的结果
FutureTask<String> task = new FutureTask<>(call);
// 把任务对象交给一个Thread对象，并执行
new Thread(task).start();

// 获取线程执行完毕后返回的结果
// 注意：如果执行到这里，上面的线程还没有执行完毕，这里的代码会暂停，等待上面线程执行完毕后才会获取结果
String s = task.get();
System.out.println(s);
```





#### 区别

实现方式和继承方式有什么区别呢?

* 继承 Thread：线程代码存放在 Thread 子类的 run 方法中。
* 实现 Runnable：线程代码存放在接口的子类的 run 方法中。实现方式好处：避免了单继承的局限性。在定义线程时，建议使用实现方式。



发现运行结果每一次都不同？

因为多个线程都获取 cpu 的执行权，cpu 执行到谁，谁就运行。明确一点，在某一时刻，只能有一个程序在运行(多核除外)。cpu 在做着快速的切换，以达到看上去是同时运行的效果。

我们可以形象把多线程的运行行为是在互相抢夺 cpu 的执行权。这就是多线程的一个特性：随机性。谁抢到谁执行，至于执行多长，cpu 说的算。



为什么要覆盖 run 方法呢?

Thread 类用于描述线程。该类就定义了一个功能，用于存储线程要运行的代码。该存储功能就是 run 方法。也就是说，Thread 类中的 run 方法，用于存储线程要运行的代码。



run() 和 start() 的什么不同?

* `d.start()` ：开启线程并执行该线程的run方法。
* `d.run()` ：仅仅是对象调用方法，而线程创建了，并没有运行。



### 线程的状态

Java 总共定义了6种状态，它们定义在 Thread 类的内部枚举类中。

* NEW ：新建。线程刚被创建，但是并未启动
* RUNNABLE ：可运行。线程已经调用了 start()，等待 CPU 调度
* BLOCKED ：锁阻塞。线程在执行的时候未竞争到锁对象，则该进程进入Blocked 状态
* WAITING ：无限等待。一个线程进入 Waiting 状态，另一个线程调用 notify 或者 notifyAll 方法才能唤醒
* TIMED_WAITING ：计时等待。同 waiting 状态，有几个方法 （sleep，wait）有超时参数，调用它们将进入该状态
* TERMINATED ：被终止。因为 run 方法正常退出而死亡，或者因为没有捕获的异常终止了 run 方法而死亡



```java
public class Thread {
		// ...

    public enum State {
        NEW,
        RUNNABLE,
        BLOCKED,
        WAITING,
        TIMED_WAITING,
        TERMINATED;
    }
    
}
```



* 被创建：创建线程。
* 运行状态：正在运行。`start();`
* 临时状态：具备运行资格，但没有执行权。
* 冻结状态：放弃了执行资格。
  * sleep(time)-----sleep(时间到); 休眠
  * wait();-----notify();  等待,唤醒
* 消亡状态：结束线程。
  * stop(); 停止，结束。`已过时`
  * run() 方法结束。



如何停止线程?

只有一种，run 方法结束。开启多线程运行，运行代码通常是循环结构。只要控制住循环，就可以让 run 方法结束，也就是线程结束。



特殊情况：当线程处于了冻结状态，就不会读取到标记，那么线程就不会结束。

当没有指定的方式让冻结的线程恢复到运行状态时，这时需要对冻结进行清除。强制让线程恢复到运行状态中来。这样就可以操作标记让线程结束。Thread类提供该方法 `interrupt()` 。



### Thread类

构造器：

* `Thread(String name)` ：可以为当前线程指定名称
* `Thread(Runnable target)` ：封装 Runnable 对象成为线程对象
* `Thread(Runnable target, String name)` ：封装 Runnable 对象成为线程对象，并指定线程名称



方法：

* `run()` ：线程的任务方法
* `start()` ：启动线程
* `String getName()` ：获取当前线程的名称。线程名称默认是 `Thread-索引`
* `setName(String name)` ：为线程设置名称
* `static Thread currentThread()` ：获取当前执行的线程对象
* `static void sleep(long time)` ：让当前执行的线程休眠多少毫秒后，再继续执行
* `void setDaemon(boolean b)` ：将该线程标记为后台线程（守护线程、用户线程），当正在运行的线程都是守护线程时，Java 虚拟机退出，该方法必须在启动线程前调用。
* `void join()` ：让调用当前这个方法的线程先执行完。当 A 线程执行到了 B 线程的 join 方法时，A 就会等待，等 B 线程都执行完，A 才会执行。join 方法可以用来临时加入线程执行。
* `String toString()` ：返回该线程的字符串表示形式，包括线程名称、优先级和线程组。
* `void setPriority()` ：设置该线程的优先级。默认值是5，范围为1~10。
  * MAX_PRIORITY：常量10。
  * MIN_PRIORITY：常量1。
  * NORM_PRIORITY：常量5。
* `void yield()` ：暂停当前正在执行的线程对象，并执行其他线程。



```java
Thread t1 = new Thread();
t1.setName("线程1");
t1.start();
System.out.println(t1.getName());

Thread t2 = new Thread("ss");
t2.start();
t2.join();
System.out.println(t2.getName());   // ss

Thread.sleep(3000);
Thread t3 = Thread.currentThread();
System.out.println(t3.getName());   // main
```



### 线程间通信

当多个线程共同操作共享的资源时，线程间通过某种方式互相告知自己的状态，以相互协调，并避免无效的资源争夺。



线程通信的常见模型（生产者与消费者模型）

* 生产者线程负责生成数据
* 消费者线程负责消费生产者生产的数据
* 注意：生产者生产完数据应该等待自己，通知消费者消费；消费者消费完数据也应该等待自己，再通知生产者生产



Object 类的等待和唤醒方法：

* `wait()` ：让当前线程等待并释放所占锁，直到另一个线程调用 notify() 方法或 notifyAll() 方法
* `notify()` ：唤醒正在等待的单个线程
* `notifyAll()` ：唤醒正在等待的所有线程

注意：这些方法应该使用当前同步锁对象进行调用。



```java
public class Desk {

    private List<String> list = new ArrayList<>();

    public synchronized void put() {
        try {
            String name = Thread.currentThread().getName();
            if (list.size() == 0) {
                list.add(name + "做的肉包子");
                System.out.println(name + "做了一个肉包子");
                Thread.sleep(2000);

                // 唤醒别人，等待自己
                this.wait();
                this.notifyAll();
            } else {
                this.wait();
                this.notifyAll();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public synchronized void get() {
        try {
            String name = Thread.currentThread().getName();
            if (list.size() == 1) {
                System.out.println(name + "吃了：" + list.get(0));
                list.clear();
                Thread.sleep(1000);
                this.notifyAll();
                this.wait();
            } else {
                this.notifyAll();
                this.wait();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
```

```java
Desk desk = new Desk();

new Thread(() -> {
    while (true) {
        desk.put();
    }
}, "厨师1").start();

new Thread(() -> {
    while (true) {
        desk.put();
    }
}, "厨师2").start();

new Thread(() -> {
    while (true) {
        desk.get();
    }
}, "吃货1").start();

new Thread(() -> {
    while (true) {
        desk.get();
    }
}, "吃货2").start();
```



为什么这些操作线程的方法要定义在 Object 类中呢?

因为这些方法在操作同步中线程时，都必须要标识他们所操作线程持有的锁。只有同一个锁上的被等待线程，可以被同一个锁上的 notify 唤醒。不可以对不同锁中的线程进行唤醒。也就是说，等待和唤醒必须是同一个锁。而锁可以是任意对象，所以可以被任意对象调用的方法定义在 Object 类中。



对于多个生产者和消费者，为什么要定义 while 判断标记？

原因：让被唤醒的线程再一次判断标记。



为什么定义 notifyAll?

因为需要唤醒对方线程。因为只用 notify，容易出现只唤醒本方线程的情况，导致程序中的所有线程都等待。



JDK1.5 中提供了多线程升级解决方案。

* 将同步 Synchronized 替换成显式 Lock 操作。
* 将 Object 中的 wait，notify，notifyAll，替换成 Condition 对象。该对象可以对 Lock 锁进行获取。

该示例中，实现了本方只唤醒对方操作。





### 线程安全

**多个线程，同时操作同一个共享资源**的时候，可能会出现业务安全问题。

线程安全问题出现的原因：

* 存在多个线程在同时进行
* 同时访问同一个共享资源
* 存在修改该共享资源



解决办法：对多条操作共享数据的语句，只能让一个线程都执行完。在执行过程中，其他线程不可以参与执行，也就是**线程同步**。

线程同步：保证同步中只能有一个线程在运行

* 解决线程安全问题的方案
* 思想：让多个线程实现先后依次访问共享资源
* 同步的前提：必须是有两个或者两个以上的线程，必须是多个线程使用同一个锁。



#### 同步代码块

作用：把访问共享资源的核心代码给上锁，依次保证线程安全。

原理：每次只允许一个线程加锁后进入，执行完毕后自动解锁，其他线程才可以进来。



```
synchronized(同步锁){
	访问共享资源的核心代码
}
```

对象如同锁，持有锁的线程可以在同步中执行。 没有持有锁的线程即使获取cpu的执行权，也进不去，因为没有获取锁。

注意：对于当前同时执行的线程来说，同步锁必须是同一把（同一个对象），否则会出 bug。



锁对象的使用规范：

* 建议使用共享资源作为锁对象，对于实例方法建议使用 this 作为锁对象
* 对于静态方法建议使用字节码（类名.class）对象作为锁对象



```java
public class Account {

    private double money = 10000;

    public void drawMoney(double money) {
        String name = Thread.currentThread().getName();

        // this正好代表共享资源
        synchronized (this) {
            if (this.money >= money) {
                System.out.println(name + "取走：" + money);
                this.money -= money;
                System.out.println(name + "取走后，余额：" + this.money);
            } else {
                System.out.println(name + "余额不足");
            }
        }
    }
}
```

```java
Account account = new Account();
new Thread(() -> {
    account.drawMoney(10000);
}).start();

new Thread(() -> {
    account.drawMoney(10000);
}).start();
```



#### 同步方法

作用：把访问共享资源的核心方法给上锁，以此保证线程安全。

原理：每次只能一个线程进入，执行完毕后自动解锁，其他线程才可以进来执行。

```
修饰符 synchronized 返回值类型 方法名称(形参) {
		操作共享资源的代码
}
```



同步方法底层原理：

* 同步方法底层也是有隐式锁对象的，只是锁的范围是整个方法代码
* 如果方法是实例方法：同步方法默认用 this 作为锁对象
* 如果方法是静态方法：同步方法默认用 类名.class 作为锁对象



```java
public synchronized void drawMoney(double money) {
    String name = Thread.currentThread().getName();

    if (this.money >= money) {
        System.out.println(name + "取走：" + money);
        this.money -= money;
        System.out.println(name + "取走后，余额：" + this.money);
    } else {
        System.out.println(name + "余额不足");
    }
}
```



同步代码块和同步方法哪个好一点：

* 范围上：同步代码块锁的范围更小，同步方法锁的范围更大
* 可读性：同步方法更好



#### Lock 锁

加锁：每次只允许一个线程加锁，加锁后才能进入访问，访问完毕后自动解锁，然后其他线程才能再加锁进来。



Lock 锁是 JDK5 开始提供的一个新的锁定操作，通过它可以创建出锁对象进行加锁和解锁，更灵活、更方便、更强大。

Lock 是接口，不能直接实例化，可以通过它的实现类 `ReentrantLock` 来构建锁对象。



构造器：

* `ReentrantLock()` ：获得 Lock 锁的实现类对象



Lock 的常用方法：

* `lock()` ：获得锁
* `unlock()` ：释放锁



```java
public class Account {

    private double money = 10000;

    // 创建一个锁对象
    private final Lock lk = new ReentrantLock();

    public void drawMoney(double money) {
        String name = Thread.currentThread().getName();

        lk.lock();  // 加锁
        if (this.money >= money) {
            System.out.println(name + "取走：" + money);
            this.money -= money;
            System.out.println(name + "取走后，余额：" + this.money);
        } else {
            System.out.println(name + "余额不足");
        }
        lk.unlock();    // 解锁
    }
}
```





#### 如何找问题

1. 明确哪些代码是多线程运行代码。
2. 明确共享数据。
3. 明确多线程运行代码中哪些语句是操作共享数据的。



同步函数用的是哪一个锁呢?

函数需要被对象调用。那么函数都有一个所属对象引用，就是this。所以同步函数使用的锁是this。

通过程序进行验证：

使用两个线程来卖票。一个线程在同步代码块中。一个线程在同步函数中。都在执行卖票动作。



如果同步函数被静态修饰，使用的锁是什么呢?

通过验证，发现不再是 this。因为静态方法中也不可以定义 this。静态进内存时，内存中没有本类对象，但是一定有该类对应的字节码文件对象。类名.class   该对象的类型是 Class。

静态的同步方法，使用的锁是该方法所在类的字节码文件对象。 类名.Class



```java
//懒汉式 延时加载。
class SingleD{
	private static SingleD s = null;
	private SingleD(){}
	
	public static SingleD getInstance(){
		if(s==null){
			synchronized(SingleD.class){ //锁类型是该类字节码文件对象。
				if(s==null)
					s = new SingleD();
			}
		}
		return s;
	}
}
```



### 死锁

同步中嵌套同步。



```java
//死锁的例子
class DeadLock implements Runnable{
	private boolean flag;
	DeadLock(boolean flag){
		this.flag = flag;
	}
	
	public void run(){
		if(flag){
			while(true){
				synchronized(ObjDemo.locka){
					System.out.println("if locka");
					synchronized(ObjDemo.lockb){
						System.out.println("if lockb");
					}
				}			
			}			
		}
		else{
			while(true){
				synchronized(ObjDemo.lockb){
					System.out.println("else lockb");
					synchronized(ObjDemo.locka){
						System.out.println("else locka");
					}
				}
			}			
		}
	}
}

class ObjDemo{
	static Object locka = new Object();
	static Object lockb = new Object();
}

public class Demo{
	public static void main(String[] args){
		Thread t1 = new Thread(new DeadLock(true));
		Thread t2 = new Thread(new DeadLock(false));
		t1.start();
		t2.start();
	}
}
```



### 线程池

线程池就是一个可以复用线程的技术。

每次创建新线程的开销是很大的，如果请求过多，就会产生大量的线程出来，会严重影响系统的性能。



JDK5 起提供了代表线程池的接口：`ExecutorService`

如何得到线程池对象：

* 方式1：使用 ExecutorService 的实现类 ThreadPoolExecutor 自创建一个线程池对象
* 方式2：使用 Executors （线程池的工具类）调用方法返回不同特点的线程池对象



#### ThreadPoolExecutor

ThreadPoolExecutor 构造器：

```java
public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue,
                              ThreadFactory threadFactory,
                              RejectedExecutionHandler handler)
```

* corePoolSize ：指定线程池的核心线程的数量
* maximumPoolSize ：指定线程池的最大线程数量
* keepAliveTime ：指定临时线程的存活时间
* unit ：指定临时线程存活的时间单位（秒、分、时、天）
* workQueue ：指定线程池的任务队列
* threadFactory ：指定线程池的线程工厂
* handler ：指定线程池的任务拒绝策略（线程都在忙，任务队列也满了的时候，新任务来了该怎么处理）
  * `ThreadPoolExecutor.AbortPolicy` ：默认。丢弃任务并抛出 RejectedExecutionException 异常
  * `ThreadPoolExecutor.DiscardPolicy` ：不推荐。丢弃任务，但是不抛出异常。
  * `ThreadPoolExecutor.DiscardOldestPolicy` ：抛弃队列中等待最久的任务，然后把当前任务加入队列中
  * `ThreadPoolExecutor.CallerRunsPolicy` ：由主线程负责调用任务的 run() 方法从而绕过线程池直接执行



注意事项：

* 临时线程什么时候创建
  * 新任务提交时发现核心线程都在忙，任务队列也满了，并且还可以创建临时线程，此时才会创建临时线程
* 什么时候会开始拒绝新任务
  * 核心线程和临时线程都在忙，任务队列也满了，新的任务过来的时候才会开始拒绝任务



ExecutorService 的常用方法：

* `void execute(Runnable command)` ：执行任务/命令，没有返回值，一般用来执行 Runnable 任务
* `Future<T> submit(Callable<T> task)` ：执行任务，返回未来任务对象，用于获取线程返回的结果，一般用来执行 Callable 任务
* `void shutdown()` ：等全部任务执行完毕后，再关闭线程池
* `List<Runnable> shutdownNow()` ：立即关闭线程池，停止正在执行的任务，并返回队列中未执行的任务



```java
ThreadPoolExecutor pool = new ThreadPoolExecutor(3, 5, 8,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(4),
        Executors.defaultThreadFactory(),
        new ThreadPoolExecutor.AbortPolicy());

MyRunnable target = new MyRunnable();
pool.execute(target);
pool.execute(target);
pool.execute(target);
pool.execute(target);
pool.execute(target);

pool.shutdown();
```



```java
ThreadPoolExecutor pool = new ThreadPoolExecutor(3, 5, 8,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(4),
        Executors.defaultThreadFactory(),
        new ThreadPoolExecutor.AbortPolicy());

// 处理Callable任务
Future<String> f1 = pool.submit(new MyCallable());
Future<String> f2 = pool.submit(new MyCallable());
Future<String> f3 = pool.submit(new MyCallable());

System.out.println(f1.get());
System.out.println(f2.get());
System.out.println(f3.get());
```



#### Executors

 Executors 是一个线程池的工具类，提供了很多静态方法用于返回不同特点的线程池对象。

* `static ExecutorService newFixedThreadPool(int nThreads)` ：创建固定线程数量的线程池，如果某个线程因为执行异常而结束，那么线程池会补充一个新线程替代它
* `static ExecutorService newSingleThreadExecutor()` ：创建只有一个线程的线程池对象，如果该线程出现异常而结束，那么线程池会补充一个新线程
* `static ExecutorService newCachedThreadPool()` ：线程数量随着任务增加而增加，如果线程任务执行完毕且空闲了60秒则会被回收掉
* `static ScheduledExecutorService newScheduledThreadPool(int corePoolSize)` ：创建一个线程池，可以实现在给定的延迟后运行任务，或者定期执行任务

这些方法的底层，都是通过线程池的实现类 ThreadPoolExecutor 创建的线程池对象。



核心线程数量应该配置多少：

* 计算密集型任务，核心线程数量 = CPU核数 + 1
* IO 密集型的任务，核心线程数量 = CPU核数 * 2



开发中，线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 方式创建。

```java
ExecutorService pool = Executors.newFixedThreadPool(3);

// 处理Callable任务
Future<String> f1 = pool.submit(new MyCallable());
Future<String> f2 = pool.submit(new MyCallable());
Future<String> f3 = pool.submit(new MyCallable());

System.out.println(f1.get());
System.out.println(f2.get());
System.out.println(f3.get());
```



### Lock 锁

文档：https://mp.weixin.qq.com/s/hOE51kjJ0do_IVb6i2RTXg





## 集合

集合是一种容器，用来装数据的，类似于数组，但它的大小可变，开发中用的更多。

集合都是支持泛型的，可以约束存储的数据类型。**定义集合都应该采用泛型。**



![](http://qiniu.huangyihui.cn/202507080101991.png)



### 体系

集合体系结构：

* Collection 代表单列集合，每个元素（数据）只包含一个值。
* Map 代表双列集合，每个元素包含两个值（键值对）。



Collection 集合特点：

* List 系列集合：**添加的元素是有序的、可重复、有索引。**
  * ArrayList、LinkedList ：有序、可重复、有索引。
* Set 系列集合：**添加的元素是无序的、不重复、无索引。**
  * HashSet ：无序、不重复、无索引。
  * LinkedHashSet ：**有序**、不重复、无索引。
  * TreeSet ：**按照大小默认升序排序**、不重复、无索引。



Collection 是单列集合的祖宗，它规定的方法是全部单列集合都会继承的。

方法：

* `int size()` ：返回集合中的元素的个数
* `boolean add(E e)` ：将指定的元素添加到此集合的末尾，返回是否插入成功
* `boolean addAll(Collection<? extends E> c)` ：把一个集合添加到另一个集合的后面
* `boolean remove(E e)` ：将给定的对象在当前集合中删除（如果对象有多个则删除第一个），返回是否删除成功
* `void clear()` ：清空集合中所有的元素
* `boolean contains(Object obj)` ：判断当前集合中是否包含给定对象
* `boolean isEmpty()` ：判断当前集合中是否为空
* `Object[] toArray()` ：把集合中的元素，存储到数组中
* `Iterator<E> iterator()` ：返回集合中的迭代器对象，该迭代器对象默认指向当前集合的第一个元素
* `default void forEach(Consumer<? super T> action)` ：结合 lambda 遍历集合



```java
Collection<String> c = new ArrayList<>();   // 多态
c.add("a");
c.add("b");
c.add("c");

System.out.println(c);
System.out.println(c.size());
System.out.println(c.contains("a"));
System.out.println(Arrays.toString(c.toArray()));

c.remove("b");
c.clear();
System.out.println(c.isEmpty());
System.out.println(c);

// <T> T[] toArray(T[] a);
String[] array = c.toArray(new String[c.size()]);	// 转换成指定类型的数组

c.forEach(new Consumer<String>() {
    @Override
    public void accept(String s) {
        System.out.println(s);
    }
});

c.forEach(System.out::println);
```



迭代器是用来遍历集合的专用方式（数组没有迭代器），java 中的迭代器是 `Iterator`。

* `boolean hasNext()` ：询问当前位置是否有元素存在
* `E next()` ：获取当前位置的元素，并同时将迭代器对象指向下一个元素处

```java
Collection<String> c = new ArrayList<>();
c.add("a");
c.add("b");
c.add("c");

Iterator<String> it = c.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}

// 增强for遍历集合，本质就是迭代器遍历集合的简化写法
for (String s : c) {
    System.out.println(s);
}
```





### List

List 集合因为支持索引，所以多了一些与索引相关的方法。

* `void add(int index, E e)` ：在此集合中的指定位置插入指定的元素
* `E remove(int index)` ：删除指定索引处的元素，返回被删除的元素
* `E set(int index, E e)` ：修改指定索引处的元素，返回被修改的元素
* `E get(int index)` ：返回指定索引处的元素，索引越界会报异常 IndexOutOfBoundsException



ArrayList 和 LinkedList  底层采用的数据结构（存储、组织数据的方式）不同，应用场景不同。



ArrayList 集合的底层原理：基于**数组**实现的。数组的特点：查询快、增删慢。

* 查询速度快（注意：是根据索引查询速度快）：查询数据通过地址值和索引定位，查询任意数据耗时相同。
* 删除效率低：可能需要把后面很多的数据进行前移。
* 添加效率极低：可能需要把后面很多的数据后移，再添加元素；或者也可能需要进行数组的扩容。

应用场景：

* 适合：根据索引查询数据，比如根据随机索引取数据，或者数据量不是很大时。
* 不适合：数据量大的同时，又要频繁的进行增删操作。

底层原理步骤：

1. 利用无参构造器创建的集合，会在底层创建一个默认长度为0的数组
2. 添加第一个元素时，底层会创建一个新的长度为10的数组
3. 存满时，会扩容1.5倍
4. 如果一次添加多个元素，1.5倍还放不下，则新创建数组的长度以实际为准



LinkedList 集合的底层原理：基于**双链表**实现的。特点：查询慢，增删相对较快，**但对首尾元素进行增删改查的速度是极快的。**

链表中的结点是独立的对象，在内存中是不连续的，每个结点包含数据值和下一个结点的地址。

链表的特点有：查询慢，无论查询哪个数据都要从头开始找；链表增删相对快。

应用场景：

* 可以用来设计队列（先进先出，后进后出）。
* 可以用来设计栈（后进先出，先进后出）。





#### ArrayList

ArrayList 是用的最多，最常见的一种集合。

```java
List<String> list = new ArrayList<>();	// 经典代码

ArrayList list = new ArrayList();
list.add("abc");
list.add(547);

System.out.println(list);   // [abc, 547]
System.out.println(list.get(1));    // 547
System.out.println(list.size());    // 2
System.out.println(list.set(1, "666"));
System.out.println(list.remove(1));
System.out.println(list.remove("abc"));
System.out.println(list);
```



```java
// 通过泛型约束存储的数据类型

ArrayList<Object> objects = new ArrayList<>();	// 什么都可以存

ArrayList<String> strings = new ArrayList<>();
strings.add("abc");
// strings.add(123);   // 只能添加 String 类型的元素
System.out.println(strings);

ArrayList<Integer> integers = new ArrayList<>();
integers.add(22);
// integers.add(35.14);    // 只能添加 int 类型的元素
System.out.println(integers);

ArrayList<Double> doubles = new ArrayList<>();
doubles.add(3.14);
// doubles.add(20);     // 只能添加浮点类型的元素
System.out.println(doubles);
```



从集合中删除元素后，集合长度会立刻改变，如果需要在循环中删除一些元素，有以下方式避免 bug：

* 方式1：从集合后面遍历然后删除，可以避免漏掉元素
* 方式2：每次删除一个数据后，索引减1
* 方式3：通过迭代器删除元素时，用迭代器自身的删除方法

```java
ArrayList<String> list = new ArrayList<>();
list.add("张三");
list.add("李四");
list.add("泥人张");
list.add("张麻子");
list.add("王五");

Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String str = it.next();
    if (str.contains("张")) {
        it.remove();    // 通过迭代器删除元素，而不是list删除
    }
}

for (int i = 0; i < list.size(); i++) {
    String str = list.get(i);
    if (str.contains("张")) {
        list.remove(i);
        i--;    // 索引-1
    }
}

// 倒着删除
int size = list.size() - 1;
for (int i = size; i >= 0; i--) {
    String str = list.get(i);
    if (str.contains("张")) {
        list.remove(i);
    }
}

System.out.println(list);
```



#### LinkedList

LinkedList 新增了一些首尾操作的特有方法。

* `void addFirst(E e)` ：在该列表开头插入指定的元素
* `void addLast(E e)` ：将指定的元素追加到此列表的末尾
* `E getFirst()` ：返回该列表中的第一个元素
* `E getLast()` ：返回该列表中的最后一个元素
* `E removeFirst()` ：从此列表中删除并返回第一个元素
* `E removeLast()` ：从此列表中删除并返回最后一个元素



```java
LinkedList<String> list = new LinkedList<>();
list.add("a");
list.add("b");
list.add("b");
list.add("c");

list.addFirst("start");
list.addLast("end");

System.out.println(list.getFirst());
System.out.println(list.getLast());

list.removeFirst();
list.removeLast();

System.out.println(list);
```





### Set

Set 要用到的常用方法，基本上就是 Collection 提供的，自己几乎没有额外新增一些常用功能。



HashSet 集合的底层原理：基于**哈希表(数组+链表+红黑树)**实现的。哈希表是一种增删改查数据，性能都较好的数据结构。

底层原理步骤：

1. 创建一个默认长度 16 的数组，默认加载因子为 0.75，数组名 table；
2. 使用元素的**哈希值对数组的长度求余**，计算出应存入的位置；
3. 判断当前位置位置是否为 null，如果是 null 直接存入；
4. 如果不为 null，表示有元素，则调用 equals 方法比较。相等则不存，不相等则存入数组。新元素直接挂在老元素下面；
5. 当链表长度超过8，且数组长度>=64时，自动将链表转成红黑树，以提高性能。



LinkedSet 集合的底层原理：同样是基于**哈希表**实现的，但是，它的每个元素都额外的多了一个双链表的机制记录它前后元素的位置，这就是能够有序的原因。



TreeSet 集合的底层原理：同样是基于**哈希表**实现的，基于红黑树实现的排序。

* 对于数值类型，默认按照数值本身的大小进行升序排序；
* 对于字符串类型，默认按照首字符的编号升序排序；
* 对于自定义类型，如 Student 对象，TreeSet 默认是无法直接排序的。需要自定义排序规则：
  * 方式1：让自定义的类实现 `Comparable` 接口，重写里面的 `compareTo` 方法来指定比较规则。
  * 方式2：通过调用 TreeSet 集合有参构造器，可以设置 `Comparator` 对象，用于指定比较规则。
  * 如果两种方式同时实现了，默认使用集合自带的比较器排序。

两种方式中，关于返回值的规则：

* 如果认为第一个元素 > 第二个元素，返回正整数；
* 如果认为第一个元素 < 第二个元素，返回负整数；
* 如果认为第一个元素 = 第二个元素，返回0，此时 TreeSet 集合只会保留一个元素，认为两者重复。





二叉查找树：小的存左边，大的存右边，一样的不存。

平衡二叉树：在满足查找二叉树的大小规则下，让树尽可能矮小，以此提高查数据的性能。

红黑树：就是可以自平衡的二叉树。红黑树是一种增删改查数据性能相对都较好的结构。



```java
Set<Integer> set = new HashSet<>();				// 经典代码
Set<Integer> set = new LinkedHashSet<>();
Set<Integer> set = new TreeSet<>();

set.add(777);
set.add(111);
set.add(555);
set.add(666);
set.add(555);

System.out.println(set);
```



#### HashSet

哈希值就是一个 int 类型的数值，java 中每个对象都有一个哈希值。对象可以调用 `hashCode` 方法，返回该对象自己的哈希值。

对象哈希值的特点：

* 同一个对象多次调用 hashCode() 方法返回的哈希值是相同的。
* 不同的对象，它们的哈希值一般不相同，但也有可能会相同（哈希碰撞）。比如有45亿个对象，但 int 类型能表示的范围只有21亿。



HashSet 集合默认不能对内容一样的两个不同对象去重复！如果希望去重复，必须重写对象的 hashCode() 和 equals() 方法。



```java
HashSet<String> list = new HashSet<>();
list.add("abc");
list.add("ab");
list.add("abc");
System.out.println(list);   // [ab, abc]  元素不重复
```



```java
public class Test {
    public static void main(String[] args) {
        Set<Student> set = new HashSet<>();
        set.add(new Student("张三", 18));
        set.add(new Student("张三", 18));
        set.add(new Student("李四", 20));
        System.out.println(set);
    }
}
```

```java
public class Student {
    private String name;
    private int age;

    public Student() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    public Student(String name, int age) {
        this.age = age;
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```



#### LinkedSet



#### TreeSet

自定义排序：方式1

```java
Set<Student> set = new TreeSet<>();
set.add(new Student("张三", 28));
set.add(new Student("小明", 18));
set.add(new Student("李四", 16));
System.out.println(set);
```

```java
public class Student implements Comparable<Student> {
    @Override
    public int compareTo(Student o) {
        return this.getAge() - o.getAge();
    }
}
```



自定义排序：方式2

```java
Set<Student> set = new TreeSet<>(new Comparator<Student>() {
    @Override
    public int compare(Student o1, Student o2) {
        return o1.getAge() - o2.getAge();
    }
});

Set<Student> set2 = new TreeSet<>((o1, o2) -> o1.getAge() - o2.getAge());
set.add(new Student("张三", 28));
set.add(new Student("小明", 18));
set.add(new Student("李四", 16));
System.out.println(set);
```



### Map

Map 集合称为双列集合，也叫做键值对集合。Map 集合的所有键是不允许重复的，但值可以重复。



Map 集合的特点都是**由键决定的**，值只是一个附属品，值是不做要求的。

* HashMap ：无序、不重复、无索引。
* LinkedHashMap ：**有序**、不重复、无索引。
* TreeMap ：**按照大小默认升序排序**、不重复、无索引。



Map 常用方法：

* `V put(K key, V value)` ：添加元素
* `int size()` ：获取集合的大小
* `void clear()` ：清空集合
* `boolean isEmpty()` ：判断集合是否为空
* `V get(Object key)` ：根据键获取对应值
* `V remove(Object key)` ：根据键删除整个元素
* `boolean containsKey(Object key)` ：判断是否包含某个键
* `boolean containsValue(Object value)` ：判断是否包含某个值
* `Set<K> keySet()` ：获取全部键的集合
* `Collection<V> values()` ：获取 Map 集合的全部值
* `Set<Map.Entry<K, V>> entrySet()` ：获取所有“键值对”的集合
* `default void forEach(BiConsumer<? super K, ? super V> action)` ：结合 lambda 遍历 Map 集合
* `void putAll(Map<? extends K, ? extends V> m)` ：将另一个集合的元素添加到集合内



```java
Map<String, Integer> map = new HashMap<>();
Map<String, Integer> map = new LinkedHashMap<>();
Map<String, Integer> map = new TreeMap<>();
map.put("b", 2320);
map.put("a", 120);
map.put("a", 700);
map.put(null, null);

System.out.println(map);
```

```java
Map<String, Integer> map = new HashMap<>();
map.put("b", 2320);
map.put("a", 120);
map.put("a", 700);
map.put(null, null);

System.out.println(map);
System.out.println(map.size());
System.out.println(map.isEmpty());
System.out.println(map.get("b"));
System.out.println(map.remove("b"));
System.out.println(map.containsKey("a"));
System.out.println(map.containsValue(700));
map.clear();
System.out.println(map);

Set<String> keys = map.keySet();
System.out.println(keys);
Collection<Integer> values = map.values();
System.out.println(values);

Map<String, Integer> map2 = new HashMap<>();
map2.put("java1", 100);
map2.put("java2", 200);

map.putAll(map2);
System.out.println(map2);
```



遍历集合

```java
Map<String, Integer> map = new HashMap<>();
map.put("张三", 12);
map.put("李四", 22);
map.put("王五", 42);
System.out.println(map);

// 方式1：键获取值
Set<String> keys = map.keySet();
for (String key : keys) {
    System.out.println(key + ":" + map.get(key));
}

// 方式2：键值对
Set<Map.Entry<String, Integer>> entries = map.entrySet();
for (Map.Entry<String, Integer> entry : entries) {
    System.out.println(entry.getKey() + ":" + entry.getValue());
}

// forEach + lambda
map.forEach((k, v) -> System.out.println(k + ":" + v));
```



#### HashMap

HashMap 集合是一种增删改查数据，性能都较好的集合。它是无序、不能重复、没有索引支持的。

HashMap 的键依赖 hashCode 方法和 equals 方法保证键的唯一。如果存储的是自定义类型的对象，可以通过重写 hashCode 和 equals 方法，这样可以保证多个对象内容一样时，HashMap 集合就能认为是重复的。

HashMap 和 HashSet 的底层原理是一模一样的，都是基于哈希表实现的。实际上，Set 系列集合的底层就是基于 Map 实现的，只是 Set 集合中的元素只要键数据，不要值数据而已。



```java
Map<Student, String> map = new HashMap<>();

map.put(new Student("张三", 22), "张三");
map.put(new Student("张三", 22), "张三");

System.out.println(map);
```

```java
public class Student {

    private String name;
    private int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```



#### LinkedMap

底层数据结构依然是基于哈希表实现的，只是每个键值对元素又额外的多了一个双链表的机制记录元素顺序（保证有序）。



#### TreeMap

特点：不重复、无索引、可排序（按照键的大小默认升序排序，只能对键排序）。

TreeMap 和 TreeSet 集合的底层原理一样，都是基于红黑树实现的排序。

TreeMap 集合同样也支持两种方式来指定排序规则：

* 让类实现 Comparable 接口，重写比较规则
* TreeMap 集合有一个有参数构造器，支持创建 Comparator 比较器对象，以便用来指定比较规则



```java
Map<Student, String> map2 = new TreeMap<>(new Comparator<Student>() {
    @Override
    public int compare(Student o1, Student o2) {
        return Double.compare(o2.getAge(), o1.getAge());    // 倒序
    }
});

Map<Student, String> map = new TreeMap<>((o1, o2) -> Double.compare(o2.getAge(), o1.getAge()));

map.put(new Student("张三", 20), "张三1");
map.put(new Student("张三", 25), "张三2");

System.out.println(map);
```

```java
public class Student implements Comparable<Student> {

    private String name;
    private int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public int compareTo(Student o) {
        return this.age - o.age;    // 升序
    }

}
```



### Collections

Collections 是一个用来操作集合的工具类。



静态方法：

* `static <T> boolean addAll(Collection<? super T> c, T... elements)` ：给集合批量添加元素
* `static void shuffle(List<?> list)` ：打乱 list 集合中的元素顺序
* `static <T> void sort(List<T> list)` ：对 list 集合中的元素进行升序排序
* `static <T> void sort(List<T> list, Comparator<? super T> c)` ：对 list 集合中的元素按照比较器对象指定的规则进行排序



```java
List<Integer> list1 = new ArrayList<>();
Collections.addAll(list1, 10, 7, 4, 8, 12);
System.out.println(list1);

Collections.shuffle(list1);
System.out.println(list1);

Collections.sort(list1);
System.out.println(list1);


List<Student> list2 = new ArrayList<>();
list2.add(new Student("张三", 24));
list2.add(new Student("李四", 22));
Collections.sort(list2, (o1, o2) -> o1.getAge() - o2.getAge());
System.out.println(list2);
```



### Collectors

* `static Collector toList()` ：把元素收集到 List 集合中
* `static Collector toSet()` ：把元素收集到 Set 集合中
* `static Collector toMap(Function keyMapper, Function valueMapper)` ：把元素收集到 Map 集合中



```java
List<Double> scores = new ArrayList<>();
Collections.addAll(scores, 88.5, 90.0, 27.1, 95.2, 78.4, 90.0);

// 将结果收集到集合
Set<Double> set = scores.stream().filter(s -> s >= 80).collect(Collectors.toSet());
System.out.println(set);

List<Double> list = scores.stream().filter(s -> s >= 80).collect(Collectors.toList());
System.out.println(list);
```



### 集合的嵌套

指的是集合中的元素又是一个集合。

```java
Map<String, List<String>> map = new HashMap<>();

List<String> list1 = new ArrayList<>();
Collections.addAll(list1, "a", "b", "c");
map.put("foo", list1);

List<String> list2 = new ArrayList<>();
Collections.addAll(list2, "A", "B", "C");
map.put("bar", list2);

System.out.println(map);

List<String> foo = map.get("foo");
for (String s : foo) {
    System.out.println(s);
}
```



## Stream 流

Stream 是 jdk8 开始新增的一套 API，可以用于操作集合或者数组的数据。

Stream 流大量的结合了 Lambda 的语法风格来编程，提供了一种更加强大、更加简单的方式操作集合或数组中的数据，代码更简洁，可读性更好。



Stream 流的使用步骤：

* 获取 Stream 流
* 调用流的中间方法对数据进行处理、计算。
  * 中间方法指的是调用完成后会返回新的 Stream 流，可以继续使用（支持链式编程）
* 获取处理的结果，遍历、统计、收集到一个新集合中返回（终结方法）
  * 终结方法指的是调用完成后，不会返回新 Stream 了，没法继续使用流了



常见方法：

* `stream()` ：Collcetion 提供的方法。获取当前集合对象的 stream 流
* `Arrays.stream(array)` ：Arrays 类提供的方法。获取当前数组的 stream 流
* `Stream.of(values)` ：Stream 类提供的方法。获取当前接收数据的 stream 流
* `filter(Predicate p)` ：用于对流中的数据进行过滤
* `sorted()` ：对元素进行升序排序
* `sorted(Comparator c)` ：按照指定规则排序
* `limit(Long maxSize)` ：获取前几个元素
* `skip(Long n)` ：跳过前几个元素
* `distinct()` ：去除流中重复的元素
* `map(Function fun)` ：对元素进行加工，并返回对应的新流
* `static Stream concat(Stream a, Stream b)` ：合并 a 和 b 两个流为一个流
* `forEach(Consumer action)` ：对此流运算后的元素执行遍历
* `count()` ：统计此流运算后的元素个数
* `max(Comparator c)` ：获取此流运算后的最大值元素
* `mix(Comparator c)` ：获取此流运算后的最小值元素
* `collect(Collector c)` ：把流处理后的结果收集到一个指定的集合中去
* `toArray()` ：把流处理后的结果收集到一个数组中去





```java
List<String> names = new ArrayList<>();
Collections.addAll(names, "张三丰", "张无忌", "葫芦娃", "李四");
System.out.println(names);

// 找出姓张，且名字长度为3的名字
List<String> list1 = new ArrayList<>();
for (String name : names) {
    if (name.startsWith("张") && name.length() == 3) {
        list1.add(name);
    }
}
System.out.println(list1);

// stream方式
List<String> list2 = names.stream().filter(s -> s.startsWith("张")).filter(s -> s.length() == 3).collect(Collectors.toList());
System.out.println(list2);
```



```java
// 获取流

// List
List<String> list = new ArrayList<>();
Collections.addAll(list, "张三丰", "张无忌", "葫芦娃", "李四");
Stream<String> stream = list.stream();

// Set
Set<String> set = new HashSet<>();
Collections.addAll(set, "张三丰", "张无忌", "葫芦娃", "李四");
Stream<String> stream1 = set.stream();

// Map
Map<String, Integer> map = new HashMap<>();
map.put("张三", 22);
map.put("李四", 28);

Collection<String> keys = map.keySet();
Stream<String> ks = keys.stream();

Collection<Integer> values = map.values();
Stream<Integer> vs = values.stream();

Set<Map.Entry<String, Integer>> entries = map.entrySet();
Stream<Map.Entry<String, Integer>> kvs = entries.stream();


// Array
String[] arr = {"张三丰", "张无忌", "葫芦娃", "李四"};
Stream<String> stream2 = Arrays.stream(arr);

// Stream
Stream<String> stream3 = Stream.of(arr);
```



```java
// 中间方法

List<Double> scores = new ArrayList<>();
Collections.addAll(scores, 88.5, 90.0, 27.1, 95.2, 78.4, 90.0);
// 找出大于60的数据，并升序后输出
scores.stream().filter(s -> s >= 60).sorted().forEach(s -> System.out.println(s));

// 找出大于80 小于95的数据，并降序后输出
scores.stream().filter(s -> s >= 80 && s <= 95).sorted((o1, o2) -> Double.compare(o2, o1)).forEach(System.out::println);

// 输出前3的数据
scores.stream().sorted((o1, o2) -> Double.compare(o2, o1)).limit(3).forEach(System.out::println);

// 输出倒数的2条数据
scores.stream().sorted((o1, o2) -> Double.compare(o2, o1)).skip(scores.size() - 2).forEach(System.out::println);

// 去除重复数据
scores.stream().distinct().forEach(System.out::println);

// 合并流
Stream<String> s1 = Stream.of("a", "b");
Stream<String> s2 = Stream.of("c", "d");
Stream<String> concat = Stream.concat(s1, s2);
concat.forEach(System.out::println);
```



```java
// 终结方法

List<Double> scores = new ArrayList<>();
Collections.addAll(scores, 88.5, 90.0, 27.1, 95.2, 78.4, 90.0);

// 遍历流
scores.stream().forEach(System.out::println);

// 获取运算后的元素个数
long count = scores.stream().filter(s -> s > 80).count();
System.out.println(count);

// 最大值
Double max = scores.stream().max((o1, o2) -> Double.compare(o1, o2)).get();
System.out.println(max);

// 最小值
Double min = scores.stream().min(Double::compare).get();
System.out.println(min);

// 将结果收集到集合
Set<Double> set = scores.stream().filter(s -> s >= 80).collect(Collectors.toSet());
System.out.println(set);

List<Double> list = scores.stream().filter(s -> s >= 80).collect(Collectors.toList());
System.out.println(list);

// 将结果收集到数组
Object[] array = scores.stream().filter(s -> s >= 80).toArray();
System.out.println(Arrays.toString(array));
```





## 泛型

定义类、接口、方法时，**同时声明了一个或多个类型变量（如 `<E>`）**，称为泛型类、泛型接口、泛型方法，它们统称为泛型。

作用：泛型提供了在编译阶段约束所能操作的数据类型，并自动进行检查的能力。这样可以避免强制类型转换，及其可能出现的异常。

泛型的本质：把具体的数据类型作为参数传给类型变量。

类型变量建议用大写的英文字母，常用的有：`E、T、K、V` 等。



注意事项：

* 泛型是工作在编译阶段的，一旦程序编译成 class 文件，class 文件中就不存在泛型了，这就是泛型擦除
* 泛型不支持基本数据类型，只能支持对象类型（引用数据类型）



### 泛型类

```java
// 泛型类
public class MyArrayList<E> {
    private Object[] arr = new Object[10];
    private int size;

    public boolean add(E e) {
        arr[size++] = e;
        return true;
    }

    public E get(int index) {
        return (E) arr[index];
    }

}

class MyClass<E, T> {
    public void put(E e, T t) {

    }
}

class MyClass2<E extends Student> {
}
```

```java
public class Test {
    public static void main(String[] args) {

        ArrayList<String> strings = new ArrayList<>();
        strings.add("a");
        // strings.add(new Student());

        MyArrayList<String> list = new MyArrayList<>();
        list.add("a");
        list.add("b");
        // list.add(new Student());
        System.out.println(list.get(1));

        MyClass<String, Student> list2 = new MyClass<>();
        MyClass2<Student> list3 = new MyClass2<>();
    }
}
```



### 泛型接口

```java
public interface Data<T> {
    void add(T t);

    ArrayList<T> getByName(String name);
}
```

```java
public class User implements Data<Student> {

    @Override
    public void add(Student student) {

    }

    @Override
    public ArrayList<Student> getByName(String name) {
        return null;
    }
}
```



### 泛型方法

* `?` 通配符：在使用泛型的时候可以代表一切类型
* 泛型上限：`? extends Car`  ? 能接收的必须是 Car 或者其子类
* 泛型下限：`? super Car`  ? 能接收的必须是 Car 或者其父类

```
修饰符 <类型变量, 类型变量...> 返回值类型 方法名(形参列表) {

}
```



```java
public class Test {
    public static void main(String[] args) {
        String str = test1("hello");
        System.out.println(str);

        test1(new Student());

        ArrayList<BMW> bmws = new ArrayList<>();
        bmws.add(new BMW());
        bmws.add(new BMW());
        go(bmws);

        ArrayList<BENZ> benzs = new ArrayList<>();
        benzs.add(new BENZ());
        benzs.add(new BENZ());
        go(benzs);

    }

    public static <T> T test1(T t) {
        return t;
    }

    public static <T extends Car> void go(ArrayList<T> cars) {

    }

    // ? 通配符，在使用泛型的时候可以代表一切类型
    public static void go2(ArrayList<?> cars) {

    }

    // ? 能接收的必须是 Car 或者其父类
    public static void go3(ArrayList<? super Car> cars) {

    }

}
```





## 包机制

包是用来分门别类的管理各种不同的程序的，类似于文件夹，建包有利于程序的管理和维护。一般利用公司域名倒置作为包名。

包语句的语法格式为：

```
package pkg1[. pkg2...]
package com.hyh.www;
```



* 调用自己所在包下的其他程序，可以直接调用，无需导包。
* 要调用其他包的程序，需要使用 `import` 语句导入该包。
* 如果要调用多个不同包下的程序，而这些程序名正好一样，此时默认只能导入一个程序，另一个程序必须带包名访问。

```java
import com.hyh.www.Demo;
import com.hyh.www.*;	// 导入这个包下所有的类

public class Main {
    public static void main(String[] args) {
        new Demo().say();
    }
}
```



权限修饰符：用来限制类中的成员（成员变量、成员方法、构造器、代码块）能够被访问的范围。

`private < 缺省 < protected < public `

| 修饰符    | 同一个类中 | 同一个包的其他类里 | 不同包的子类里 | 不同包中 |
| --------- | ---------- | ------------------ | -------------- | -------- |
| private   | ✓          |                    |                |          |
| 缺省      | ✓          | ✓                  |                |          |
| protected | ✓          | ✓                  | ✓              |          |
| public    | ✓          | ✓                  | ✓              | ✓        |

包与包之间进行访问，被访问的包中的类以及类中的成员，需要public修饰。

不同包中的子类还可以直接访问父类中被protected权限修饰的成员。

包与包之间可以使用的权限只有两种: `public`、`protected`





## 设计模式

设计模式：解决某一类问题最行之有效的方法。java 中有 23 种设计模式。



### 单例

解决一个类在内存中只存在一个对象。定义单例，建议使用饿汉式。  

想要保证对象唯一：

* 为了避免其他程序过多建立该类对象，先禁止其他程序建立该类对象。（将构造函数私有）
* 还为了让其他程序可以访问到该类对象，只好在本类中，自定义一个对象。（在类中创建一个本类对象）
* 为了方便其他程序对自定义对象的访问，可以对外提供一些访问方法。（提供一个方法可以获取到该对象）



应用场景：任务管理器对象，获取运行时对象。

在这些业务场景下，使用单例模式，可以避免浪费内存。

```java
// 饿汉式：先初始化对象。Single类一进内存，就已经创建好了对象。
public class Single {
    private Single() {
    }

    private static Single single = new Single();

    public static Single getInstance() {
        return single;
    }
}
```

```java
// 懒汉式：对象是方法被调用时，才初始化，也叫做对象的延时加载。
// Single类进内存，对象还没有存在，只有调用了getInstance方法时，才建立对象。
public class LazySingle {
    private static LazySingle single = null;

    private LazySingle() {
    }

    public static LazySingle getInstance() {
        if (single == null) {
            synchronized (LazySingle.class)//加锁
            {
                if (single == null)
                    single = new LazySingle();
            }
        }
        return single;
    }
}
```

```java
public enum Single {
    S;  // 单例
}
```





### 模板方法

什么是模板方法呢?

在定义功能时，功能的一部分是确定的，但是有一部分是不确定的，而确定的部分在使用不确定的部分。那么这时就将不确定的部分暴露出去，由该类的子类去完成。

用处：解决方法中存在重复代码的问题。



步骤：

1. 定义一个抽象类
2. 在里面定义两个方法。一个是模板方法：把相同代码放里面。一个是抽象方法：具体实现交给子类实现。

```java
// 获取一段程序运行的时间
public abstract class A {
  	// 模板方法是给对象直接使用的，不能被子类重写，所以使用final修饰
    public final void getTime() {
        long start = System.currentTimeMillis();

        this.doMehtod();

        long end = System.currentTimeMillis();
        System.out.println("毫秒：" + (end - start));
    }

    public abstract void doMehtod();
}

public class B extends A {

    @Override
    public void doMehtod() {
        for (int i = 0; i < 100000; i++) {
            System.out.println(i);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        new B().getTime();
    }
}
```



## Lambda 表达式

Lambda 表达式是一种语法形式，用于简化匿名内部类的代码写法。

**注意：Lambda 表达式只能简化函数式接口的匿名内部类。**



什么是函数式接口：

* 有且仅有一个抽象方法的接口
* 大部分函数式接口，上面都可能会有一个 `@FunctionalInterface` 的注解，有该注解的接口就必定是函数式接口



```java
public class Test {
    public static void main(String[] args) throws Exception {

        Swimming swimming = new Swimming() {
            @Override
            public void swim() {
                System.out.println("游游游");
            }
        };
        swimming.swim();

        // lambda 表达式简化代码
        Swimming swimming1 = () -> {
            System.out.println("蛙泳");
        };
        swimming1.swim();
    }
}

@FunctionalInterface
interface Swimming {
    void swim();
}
```



Lambda 表达式的省略写法：

* 参数类型可以省略不写
* 如果只有一个参数，参数类型可以省略，包括 `()` 也可以省略
* 如果 Lambda 表达式中的方法体代码只有一行代码，可以省略大括号不写，同时要省略分号！此刻，如果这行代码是 return 语句，也必须去掉 return 不写



```java
int[] arr = {10, 20, 30};
Arrays.setAll(arr, new IntUnaryOperator() {
    @Override
    public int applyAsInt(int index) {
        return arr[index] + 1;
    }
});

// 简写
Arrays.setAll(arr, index -> arr[index] + 1);

System.out.println(Arrays.toString(arr));
```



## 方法引用

* 静态方法的引用 `类名::静态方法`
  * 条件：某个 Lambda 表达式里只是调用一个静态方法，并且前后参数的形式一致
* 实例方法的引用 `对象名::实例方法`
  * 条件：某个 Lambda 表达式里只是调用一个实例方法，并且前后参数的形式一致
* 特定类型方法的引用 `类型::方法`
  * 条件：某个 Lambda 表达式里只是调用一个实例方法，并且前后参数列表中的第一个参数是作为方法的主调，后面的所有参数都是作为该实例方法的入参的
* 构造器引用 `类名::new`
  * 条件：某个 Lambda 表达式里只是在创建对象，并且前后参数情况一致



```java
// 静态方法的引用
public class Test {
    public static void main(String[] args) {
        Swimming swimming = (name) -> {
            Demo.print(name);
        };

        Swimming swimming2 = Demo::print;

        swimming2.swim("李四");
    }
}

@FunctionalInterface
interface Swimming {
    void swim(String name);
}

class Demo {
    public static void print(String name) {
        System.out.println(name + "在游泳");
    }
}
```

```java
// 实例方法的引用
public class Test {
    public static void main(String[] args) {
        Demo demo = new Demo();

        Swimming swimming1 = (name) -> {
            demo.print(name);
        };

        Swimming swimming2 = demo::print;


        swimming1.swim("张三");
        swimming2.swim("李四");
    }
}

@FunctionalInterface
interface Swimming {
    void swim(String name);
}

class Demo {
    public void print(String name) {
        System.out.println(name + "在游泳");
    }
}
```

```java
// 特定类型方法的引用
public class Test {
    public static void main(String[] args) {

        Swimming swimming1 = (d, name) -> {
            d.print(name);
        };

        Swimming swimming2 = Demo::print;


        swimming1.swim(new Demo(), "张三");
        swimming2.swim(new Demo(), "李四");
    }
}

@FunctionalInterface
interface Swimming {
    void swim(Demo demo, String name);
}

class Demo {
    public void print(String name) {
        System.out.println(name + "在游泳");
    }
}
```

```java
// 构造器引用
public class Test {
    public static void main(String[] args) {

        CreateCar cc = (name) -> new Car(name);
        cc.create("奔驰");

        CreateCar c2 = Car::new;
        c2.create("雅迪");
    }
}

class Car {
    public Car(String name) {
        System.out.println("生产了新车：" + name);
    }
}

interface CreateCar {
    Car create(String name);
}
```



## JDBC

JDBC（Java DataBase Connectivity），就是使用 Java 语言操作关系型数据库的一套 API。

本质：

* sun 公司官方定义的一套操作所有关系型数据库的规范，即接口。
* 各个数据库厂商去实现这套接口，提供数据库驱动 jar 包。
* 我们可以使用这套接口编程，真正执行的代码是驱动 jar 包中实现类。



Connection ：数据库连接实例对象。

* `createStatement()` ：创建 Statement 对象
* `prepareStatement` ：创建 PreparedStatement 对象
* `setAutoCommit(false)` ：关闭数据库的自动提交，自动会开启事务
* `commit()` ：提交事务
* `rollback()` ：回滚事务



Statement ：用于向数据库发送 SQL 语句，也就是执行 SQL 的对象。

* `executeQuery()` ：查询操作，返回 ResultSet 对象
* `execute()` ：执行任何 SQL
* `executeUpdate()` ：更新、插入、删除都用这个，返回受影响的行数



PreparedStatement ：可以防止 SQL 注入。会把传递进来的参数当作字符，假设其中存在转义字符，会被直接转义。

* `setInt(index, value)` ：给参数赋值
* `setString()` 、`setFloat()` ...



ResultSet ：查询的结果集，封装了所有的查询结果。

* `getObject()` ：获得指定的数据类型，在不知道列类型的情况下使用
* `getString()` 、`getInt()` 、`getFloat()` 、`getDate()` ：获得指定的数据类型
* `beforeFirst()` ：指针移动到最前面
* `afterLast()` ：指针移动到最后面
* `next()` ：指针移动到下一个数据
* `previous()` ：指针移动到前一行
* `absolute(row)` ：指针移动到指定行



```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.38</version>
</dependency>
```

```java
public void testJDBC() throws Exception {
    // 注册驱动
    Class.forName("com.mysql.cj.jdbc.Driver");

    // 获取连接
    // String url = "jdbc:mysql://localhost:3306/demo";
  	String url = "jdbc:mysql://localhost:3306/demo?useUnicode=true&characterEncoding=utf8&useSSL=true";
    String username = "root";
    String password = "123456";
    Connection conn = DriverManager.getConnection(url, username, password);

    // 获取执行sql的对象statement，并执行sql
    String sql = "select * from user";
    Statement statement = conn.createStatement();
    ResultSet resultSet = statement.executeQuery(sql);

    // 解析数据
    List<User> list = new ArrayList<>();
    while (resultSet.next()) {
        int id = resultSet.getInt("id");
        String name = resultSet.getString("name");
        int age = resultSet.getInt("age");
        int gender = resultSet.getInt("gender");
        String phone = resultSet.getString("phone");
        User user = new User(id, name, age, gender, phone);
        list.add(user);
    }
  
  	System.out.println(list);
  
  
    // 预编译sql
    String sql = "insert into tb_user(id, `name`) values(?,?)";
    PreparedStatement ps = conn.prepareStatement(sql);

    // 手动给参数赋值
    ps.setInt(1, 1001);     
    ps.setString(2, "张三");

    // 执行sql
    int i = ps.executeUpdate();
    if (i > 0) {
        System.out.println("插入成功");
    }

    // 释放资源
  	resultSet.close();
    statement.close();
    conn.close();
    
}
```





## JavaDoc

`javadoc` 命令是用来生成自己 API 文档的。

参数信息：

* `@author` ：作者名
* `@version` ：版本号
* `@since` ：指名需要最低使用的 jdk 版本
* `@param` ：参数名
* `@return` ：返回值情况
* `@throws` ：异常抛出情况



```java
/**
 * @param num 要输出的整数
 * @return 无返回值
 * @throws 无抛出异常
 * @author 张三
 * @version v1.0.0
 * @since jdk1.8
 */
public void method(int num) {
    System.out.println(num);
}
```



生成文档：

```sh
javadoc -encoding UTF-8 -charset UTF-8 Demo.java
```



## 反射

反射（Reflection）就是：加载类，并允许以编程的方式解剖类中的各种成分（成员变量、方法、构造器等）。

作用：

* 可以得到一个类的全部成分然后操作
* 可以破坏封装性
* 更重要的用途是：适合做 Java 的框架。基本上，主流的框架都会基于反射设计出一些通用的功能



步骤：

* 加载类，获取类的字节码：Class 对象
* 获取类的构造器：Constructor 对象
* 获取类的成员变量：Field 对象
* 获取类的成员方法：Method 对象



### 获取 Class 对象

```java
// 获取Class对象的三种方式

// 方式1：类名.class;
Class c1 = Student.class;
System.out.println(c1.getName());           // cn.hyh.Student
System.out.println(c1.getSimpleName());     // Student

// 方式2：Class.forName()
Class c2 = Class.forName("cn.hyh.Student");
System.out.println(c2.getName());   // cn.hyh.Student
System.out.println(c1 == c2);       // true

// 方式3：对象.getClass()
Student s = new Student();
Class c3 = s.getClass();
System.out.println(c3 == c2);       // true
```



### 获取类的构造器

* `Constructor<?>[] getConstructors()` ：获取全部构造器（只能获取public修饰的）
* `Constructor<?>[] getDeclaredConstructors()` ：获取全部构造器（只要存在就能拿到）
* `Constructor<T> getConstructor(Class<?>... parameterTypes)` ：获取某个构造器（只能获取public修饰的）
* `Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)` ：获取某个构造器（只要存在就能拿到）



获取类构造器的作用：依然是初始化对象返回。

* `T newInstance(Object ... initargs)` ：调用此构造器对象表示的构造器，并传入参数，完成对象的初始化并返回
* `setAccessible(boolean flag)` ：设置为 true，表示禁止检查访问控制（暴力反射）。也就是可以绕开 private 访问限制



```java
// 获取Class对象
Class c1 = Student.class;

// 获取类的全部构造器
Constructor[] constructors = c1.getConstructors();

// 遍历数组中的每个构造器对象
for (Constructor constructor : constructors) {
    System.out.println(constructor.getName() + "---->" + constructor.getParameterCount());
}

// 获取某个构造器，无参数构造器
Constructor constructor = c1.getConstructor();
Constructor constructor2 = c1.getDeclaredConstructor();

constructor.setAccessible(true);   // 禁止检查访问权限
Student s1 = (Student) constructor.newInstance(); // 初始化对象
System.out.println(s1);


// 获取有参数构造器
Constructor constructor3 = c1.getDeclaredConstructor(String.class, int.class);
constructor3.setAccessible(true);   // 禁止检查访问权限
Student s2 = (Student) constructor3.newInstance("张三", 24); // 初始化对象
System.out.println(s2);
```



### 获取类的成员变量

* `Field[] getFields()` ：获取类的全部成员变量（只能获取public修饰的）
* `Field[] getDeclaredFields()` ：获取类的全部成员变量（只要存在就能拿到）
* `Field getField(String name)` ：获取类的某个成员变量（只能获取public修饰的）
* `Field getDeclaredField(String name)` ：获取类的某个成员变量（只要存在就能拿到）



获取到成员变量的作用：依然是赋值、取值。

* `set(Object obj, Object value)` ：赋值
* `Object get(Object obj)` ：取值
* `setAccessible(boolean flag)` ：设置为 true，表示禁止检查访问控制（暴力反射）



```java
// 获取Class对象
Class c = Student.class;

// 获取类的所有成员变量
Field[] fields = c.getDeclaredFields();
for (Field field : fields) {
    System.out.println(field.getName() + "-->" + field.getType());
}

Field[] fields1 = c.getFields();
System.out.println(fields1.length);

Field fAge = c.getField("age");
System.out.println(fAge.getName() + "-->" + fAge.getType());

Field fName = c.getDeclaredField("name");
System.out.println(fName.getName() + "-->" + fName.getType());

// 取值、赋值
Student student = new Student();
fName.setAccessible(true);
fName.set(student, "李四");
String name = (String) fName.get(student);
System.out.println(name);
```



### 获取类的成员方法

* `Method[] getMethods()` ：获取类的全部成员方法（只能获取public修饰的）
* `Method[] getDeclaredMethods()` ：获取类的全部成员方法（只要存在就能拿到）
* `Method getMethod(String name, Class<?>... parameterTypes)` ：获取类的某个成员方法（只能获取public修饰的）
* `Method getDeclaredMethod(String name, Class<?>... parameterTypes)` ：获取类的某个成员方法（只要存在就能拿到）



获取到成员方法的作用：依然是执行。

* `Object invoke(Object obj, Object... args)` ：触发某个对象的该方法执行
* `setAccessible(boolean flag)` ：设置为 true，表示禁止检查访问控制（暴力反射）



```java
// 获取Class对象
Class c = Student.class;

// 获取类的成员方法
Method[] methods = c.getDeclaredMethods();
for (Method method : methods) {
    System.out.println(method.getName() + "-->" + method.getParameterCount() + "-->" + method.getReturnType());
}

Method method = c.getDeclaredMethod("getName");
System.out.println(method.getName() + "-->" + method.getParameterCount() + "-->" + method.getReturnType());

// 执行方法
Student student = new Student("张三", 20);
method.setAccessible(true);
Object rs = method.invoke(student);
System.out.println(rs);
```



### 功能演示

需求：对于任意一个对象，该框架都可以把对象的字段名和对应的值，保存到文件中去。



```java
public class Main {
    public static void main(String[] args) throws Exception {
        Student student = new Student("张三", 20);
        saveObject(student);
    }

    public static void saveObject(Object obj) throws Exception {
        PrintStream ps = new PrintStream(new FileOutputStream("src/res.txt"));
        // 通过反射拿到类
        Class c = obj.getClass();
        String cName = c.getSimpleName();
        ps.println("-----------" + cName + "----------");

        // 获取所有成员变量
        Field[] fields = c.getDeclaredFields();
        for (Field field : fields) {
            // 获取成员变量的名字和值
            field.setAccessible(true);
            String name = field.getName();
            String value = field.get(obj) + "";
            ps.println(name + "=" + value);
        }
        ps.close();
    }
}
```





## 字符集

* ASCII ：美国信息交换标准代码，包括了英文、数字、符号等
  * 使用1个字节存储一个字符，首位是0，总共可表示128个字符
* GBK ：汉字编码字符集，包含了2万多个汉字编码，兼容 ASCII 字符集
  * 汉字占2个字节，英文、数字占1个字节。GBK 规定：汉字的第一个字节的第一位必须是1
* Unicode ：统一码，由国际组织制定的，可以容纳世界所有文字、符号
  * UTF-8 ：Unicode 字符集的一种编码方案，采取可变长编码方案，总分四个长度区。英文字符、数字等占1个字节，汉字字符占3个字节
  * UFT-32 ：4个字节表示一个字符





ASCII 编码表：

* `0` ：对应的十进制 48
* `A` ：对应的十进制 65
* `a` ：对应的十进制 97





## 其他

开发规范：阿里巴巴 Java 开发手册

帮助文档：jdk1.8 帮助文档



## 网络编程

可以让设备中的程序与网络上其他设备中的程序进行数据交互（实现网络通信）。

`java.net.*` 包下提供了网络编程的解决方案。



### InetAddress

代表 IP 地址。

常用方法：

* `static InetAddress getLocalHost()` ：获取本地 IP，会返回一个 inetAddress 对象
* `static InetAddress getByName(String host)` ：根据 IP 地址或者域名，返回一个 inetAddress 对象
* `String getHostName()` ：获取该 ip 地址对象对应的主机名
* `String getHostAddress()` ：获取该 ip 地址对象中的 ip 地址信息
* `boolean isReachable(int timeout)` ：在指定毫秒内，判断主机与该 ip 对应的主机是否能连通



```java
// 获取本地IP地址对象
InetAddress ip1 = InetAddress.getLocalHost();
System.out.println(ip1.getHostName());      // LAPTOP-489TFMOL
System.out.println(ip1.getHostAddress());   // 192.168.235.1

// 获取指定IP或者域名的IP地址对象
InetAddress ip2 = InetAddress.getByName("www.baidu.com");
System.out.println(ip2.getHostName());
System.out.println(ip2.getHostAddress());
System.out.println(ip2.isReachable(4000));
```



### UDP 协议

* 特点：无连接、不可靠通信
* 不事先建立连接，数据按照包发，一个数据包包含：自己的 IP、程序端口、目的地 IP、程序端口和数据（限制在64KB以内）等
* 发送方不管对方是否在线，数据在中间丢失也不管，如果接收方收到数据也不返回确认，所以是不可靠的
* 通信效率高，常用于语音通话、视频直播



Java 提供了一个 `java.net.DatagramSocket` 类来实现 UDP 通信。

构造器：

* `DatagramSocket()` ：创建客户端的 Socket 对象，系统会随机分配一个端口号
* `DatagramSocket(int port)` ：创建服务端的 Socket 对象，并指定端口号

方法：

* `send(DatagramPacket p)` ：发送数据包
* `receive(DatagramPacket p)` ：使用数据包接收数据



DatagramPacket ：创建数据包。

构造器：

* `DatagramPacket(byte[] buf, int length, InetAddress address, int port)` ：创建发出去的数据包对象
  * buf ：封装要发出去的数据
  * length ：发送出去的数据大小（字节个数）
  * address ：服务端的 IP 地址
  * port ：服务端程序的端口
* `DatagramPacket(byte buf[], int length)` ：创建用来接收数据的数据包

方法：

* `int getLength()` ：获取数据包，实际接收到的字节个数
* `int getPort()` ：获取端口号



```java
// 创建客户端对象
DatagramSocket socket = new DatagramSocket();

// 创建数据包对象封装要发出去的数据
byte[] bytes = "你好".getBytes();
DatagramPacket packet = new DatagramPacket(bytes, bytes.length, InetAddress.getLocalHost(), 8888);

// 发送数据
socket.send(packet);
socket.close();
```

```java
// 创建服务端对象，注册端口
DatagramSocket socket = new DatagramSocket(8888);

// 创建数据包对象接收数据
byte[] buffer = new byte[1024 * 64];	// 64kb
DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

while (true) {
    // 接收数据
    socket.receive(packet);

    int len = packet.getLength();
    String s = new String(buffer, 0, len);
    System.out.println(s);

    System.out.println(packet.getAddress().getHostAddress());
    System.out.println(packet.getPort());
}
```



### TCP 协议

* 特点：面向连接、可靠通信
* TCP 的最终目的：要保证在不可靠的信道上实现可靠的传输
* TCP 三个步骤实现可靠传输：三次握手建立连接、传输数据进行确认、四次挥手断开连接。目的是确保双方数据的收发都已经完成。
* 通信效率相对不高，常用于网页、文件下载、支付



客户端程序是通过 `java.net.Socket` 类来实现的。

构造器：

* `Socket(String host, int port)` ：根据指定的服务器 ip、端口号请求与服务端建立连接。连接通过，就获得了客户端 socket

方法：

* `OutputStream getOutputStream()` ：获得字节输出流对象
* `InputStream getInputStream()` ：获得字节输入流对象



服务端程序是通过 `java.net.ServerSocket` 类来实现的。

构造器：

* `ServerSocket(int port)` ：为服务端程序注册端口

方法：

* `Socket accept()` ：阻塞等待客户端的连接请求，一旦与某个客户端成功连接，则返回服务端这边的 Socket 对象



```java
// 创建Socket对象
Socket socket = new Socket("127.0.0.1", 8888);

// 从socket通信管道中得到一个字节输出流，用来发数据给服务端程序
OutputStream os = socket.getOutputStream();

// 把低级的字节输出流包装成数据输出流
DataOutputStream dos = new DataOutputStream(os);

// 写数据出去
dos.writeUTF("你好");
dos.close();

socket.close();
```

```java
// 创建服务端对象，并注册端口
ServerSocket serverSocket = new ServerSocket(8888);

// 等待客户端的连接请求
Socket socket = serverSocket.accept();

// 把原始的字节输入流包装成数据输入流
InputStream is = socket.getInputStream();
DataInputStream dis = new DataInputStream(is);

// 读取客户端发送过来的消息
String r = dis.readUTF();
System.out.println(r);
// 获取客户端的IP地址
System.out.println(socket.getRemoteSocketAddress());

dis.close();
socket.close();
serverSocket.close();
```



#### 支持与多个客户端同时通信

主线程：负责接收客户端连接

```java
public class Client {
    public static void main(String[] args) throws Exception {
        // 创建Socket对象
        Socket socket = new Socket("127.0.0.1", 8888);

        // 从socket通信管道中得到一个字节输出流，用来发数据给服务端程序
        OutputStream os = socket.getOutputStream();
        
        // 把低级的字节输出流包装成数据输出流
        DataOutputStream dos = new DataOutputStream(os);

        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("请说：");
            String msg = sc.nextLine();

            if ("exit".equals(msg)) {
                System.out.println("退出成功");
                dos.close();
                socket.close();
                break;
            }

            // 写数据出去
            dos.writeUTF(msg);
            dos.flush();
        }
    }
}
```

```java
public class Server {
    public static void main(String[] args) throws Exception {
        // 创建服务端对象，并注册端口
        ServerSocket serverSocket = new ServerSocket(8888);

        while (true) {
            // 等待客户端的连接请求
            Socket socket = serverSocket.accept();

            // 把这个客户端对应的socket通信管道，交给一个独立的线程负责处理
            new ServerReaderThread(socket).start();
        }
    }
}
```

```java
public class ServerReaderThread extends Thread {

    private Socket socket;

    public ServerReaderThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            InputStream is = socket.getInputStream();
            DataInputStream dis = new DataInputStream(is);
            while (true) {
                try {
                    String r = dis.readUTF();
                    System.out.println(r);
                } catch (Exception e) {
                    e.printStackTrace();
                    dis.close();
                    socket.close();
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



#### 端口转发

IDEA 中多开相同的 class，在要执行的类上选择 Edit Configurations → Modify options → 勾选 Allow Multiple instances 即可。



```java
public class Server {

    public static List<Socket> onLineSockets = new ArrayList<Socket>();

    public static void main(String[] args) throws Exception {
        // 创建服务端对象，并注册端口
        ServerSocket serverSocket = new ServerSocket(8888);

        while (true) {
            // 等待客户端的连接请求
            Socket socket = serverSocket.accept();

            onLineSockets.add(socket);
            System.out.println("有人上线了：" + socket.getRemoteSocketAddress());

            // 把这个客户端对应的socket通信管道，交给一个独立的线程负责处理
            new ServerReaderThread(socket).start();
        }
    }
}
```

```java
public class ServerReaderThread extends Thread {

    private Socket socket;

    public ServerReaderThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            InputStream is = socket.getInputStream();
            DataInputStream dis = new DataInputStream(is);
            while (true) {
                try {
                    String msg = dis.readUTF();
                    System.out.println(msg);

                    // 转发消息给所有人
                    sendMsgToAll(msg);
                } catch (Exception e) {
                    System.out.println("有人下线了：" + socket.getRemoteSocketAddress());
                    Server.onLineSockets.remove(socket);
                    dis.close();
                    socket.close();
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendMsgToAll(String msg) throws IOException {
        for (Socket socket : Server.onLineSockets) {
            OutputStream os = socket.getOutputStream();
            DataOutputStream dos = new DataOutputStream(os);
            dos.writeUTF(msg);
            dos.flush();
        }
    }
}
```



```java
public class Client {
    public static void main(String[] args) throws Exception {
        // 创建Socket对象
        Socket socket = new Socket("127.0.0.1", 8888);

        new ClientReaderThread(socket).start();

        // 从socket通信管道中得到一个字节输出流，用来发数据给服务端程序
        OutputStream os = socket.getOutputStream();

        // 把低级的字节输出流包装成数据输出流
        DataOutputStream dos = new DataOutputStream(os);

        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("请说：");
            String msg = sc.nextLine();

            if ("exit".equals(msg)) {
                System.out.println("退出成功");
                dos.close();
                socket.close();
                break;
            }

            // 写数据出去
            dos.writeUTF(msg);
            dos.flush();
        }
    }
}
```

```java
public class ClientReaderThread extends Thread {

    private Socket socket;

    public ClientReaderThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            InputStream is = socket.getInputStream();
            DataInputStream dis = new DataInputStream(is);
            while (true) {
                try {
                    String msg = dis.readUTF();
                    System.out.println("收到消息：" + msg);
                } catch (Exception e) {
                    System.out.println("自己下线了：" + socket.getRemoteSocketAddress());
                    dis.close();
                    socket.close();
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



### 开发规范 Restful

REST (REpresentationanl State Transfer)，表述性转换，它是一种软件架构风格。

```
# 传统风格
http://localhost:8080/user/getById?id=1				// GET：查询id为1的用户
http://localhost:8080/user/saveUser						// POST：新增用户
http://localhost:8080/user/updateUser					// POST：修改用户
http://localhost:8080/user/deleteUser?id=1		// 删除id为1的用户


# REST风格：简洁、规范、优雅。
http://localhost:8080/users/1			// GET：查询id为1的用户
http://localhost:8080/users				// POST：新增用户
http://localhost:8080/users				// PUT：修改用户
http://localhost:8080/users/1			// DELETE：删除id为1的用户
```

描述模块的功能通常使用复数，也就是加 s，表示此类资源，而非单个资源。



## 文件解析

### properties 文件

Properties 是一个 Map 集合，但是我们一般不会当集合使用。它常用来代表属性文件的，通过 Properties 可以读写属性文件里的内容。

* 只能是键值对
* 键不能重复
* 注释用 `#` 开头
* 文件后缀一般是 `.properties` 结尾的



构造器：

* `Properties()` ：用于构建 Properties 集合对象（空容器）



方法：

* `load(InputStream is)` ：通过字节输入流，读取属性文件里的键值对数据
* `load(Reader reader)` ：通过字符输入流，读取属性文件里的键值对数据
* `String getProperty(String key)` ：根据键获取值
* `boolean containsKey(Object key)` ：判断是否包含某个键
* `Set<String> stringPropertyNames()` ：获取全部键的集合
* `Object setProperty(String key, String value)` ：保存键值对数据到 Properties 对象中去
* `store(OutputStream out, String comments)` ：把键值对数据，通过字节输出流写出到属性文件里去
* `void store(Writer writer, String comments)` ：把键值对数据，通过字符输出流写出到属性文件里去



```java
Properties properties = new Properties();

// 读取数据
// properties.load(new FileInputStream("src/resource/config.properties"));
// properties.load(Files.newInputStream(Paths.get("src/resource/config.properties")));

properties.load(new FileReader("src/resource/config.properties"));

// 通过键获取值
System.out.println(properties);
System.out.println(properties.getProperty("name"));
System.out.println(properties.getProperty("age"));
System.out.println(properties.getProperty("gender"));

// 遍历键值对数据
Set<String> keys = properties.stringPropertyNames();
System.out.println(keys);
for (String key : keys) {
    System.out.println(key + "=" + properties.getProperty(key));
}
properties.forEach((key, value) -> {
    System.out.println(key + "=" + value);
});

// 保存键值对数据到文件中
properties.setProperty("gender", "0");

if (properties.containsKey("age")) {
    properties.setProperty("age", "20");
}

properties.store(new FileWriter("src/resource/config.properties"), "message");
```



### XML 文件

XML （EXtensible Markup Language）可扩展标记语言。它本质是一种数据的格式，可以用来存储复杂的数据结构，和数据关系。

常用来做为系统的配置文件，或者作为一种特殊的数据结构，在网络中进行传输。

解析 XML 的框架：[Dom4j](https://dom4j.github.io/)



* XML 中的标签是成对出现的，标签名可以自定义，但必须要正确的嵌套
* XML 中只能有一个根标签
* XML 中的标签可以有属性
* 如果一个文件中放置的是 XML 格式的数据，这个文件就是 XML 文件，后缀一般是 `.xml`
* XML 文档声明必须在第一行
* 注释用 `<!--  -->` 表示
* CDATA 块：表示文档中可以包含任意文本的区块，其内容不作为标签来解析，因此可以在其中包含任意字符，并且不会引发语法错误。`<![CDATA[ 内容 ]]>`
* XML 中书写 `< &` 等，可能会出现冲突，导致报错，可以用如下特殊字符替代
  * `&lt;` ：`<` 小于
  * `&gt;` ： `>` 大于
  * `&amp;` ：`&`
  * `&apos;` ：`’` 单引号
  * `&quot;` ：`"` 双引号



把数据写出到 XML 文件中，推荐先把数据拼接成 XML 格式，再用 IO 流写出去。



```xml
<?xml version="1.0" encoding="UTF-8" ?>

<users>
    <user id="1">
        <name>张三</name>
        <age>23</age>
        <data> 3 &lt; 2</data>
        <msg>
            <![CDATA[ 3>2 ]]>
        </msg>
    </user>
</users>
```

```java
StringBuilder sb = new StringBuilder();
sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?> \r\n");
sb.append("<book>\r\n");
sb.append("<name>").append("西游记").append("</name>\r\n");
sb.append("</book>");

try (
        BufferedWriter bw = new BufferedWriter(new FileWriter("src/resource/book.xml"));
) {
    bw.write(sb.toString());
} catch (Exception e) {
    e.printStackTrace();
}
```



#### Dom4j

Dom4j 解析 XML 文件的思想：文档对象模型。

* SAXReader 解析器
  * `SAXReader()` ：构建 Dom4j 的解析器对象
  * `Document read(URL url)` ：把 XML 文件读成 Document 对象
  * `Document read(InputStream in)` ：通过字节输入流读取 XML 文件
* Document ：整个文档
  * `Element getRootElement()` ：获得根元素对象
* Element ：元素（标签）。其中包含 Attribute 属性、子元素、文本
  * `String getName()` ：得到元素名字
  * `List<Element> elements()` ：得到当前元素的所有子元素
  * `List<Element> elements(String name)` ：得到当前元素下指定名字的的所有子元素
  * `Element element(String name)` ：得到当前元素下指定名字的的子元素，如果有多个名字相同的返回第一个
  * `String elementText(子元素名)` ：得到指定名称的子元素的文本
  * `String getText()` ：得到文本
  * `String getTextTrim()` ：得到文本取出前后空格的结果
* Attribute ：属性
  * `List<Attribute> attributes()` ：获取元素的全部属性
  * `String attributeValue(String name)` ：通过属性名直接得到属性值
  * `String getName()` ：得到属性名
  * `String getValue()` ：得到属性值



```java
// 创建解析器对象
SAXReader saxReader = new SAXReader();
// 把需要解析的XML文件读成一个Document对象
Document document = saxReader.read("src/resource/hello.xml");
// 获得根元素对象
Element root = document.getRootElement();
System.out.println(root.getName());

// 获取元素下的全部一级子元素
List<Element> elements = root.elements();
for (Element element : elements) {
    System.out.println(element.getName());
}

// 获取当前元素下的某个子元素
Element student = root.element("student");
System.out.println(student.getText());

Element user = root.element("user");
System.out.println(user.attributeValue("id"));

Attribute id = user.attribute("id");
System.out.println(id.getName());
System.out.println(id.getValue());

// 获取元素的全部属性
List<Attribute> attributes = user.attributes();
for (Attribute attribute : attributes) {
    System.out.println(attribute.getName() + " : " + attribute.getValue());
}

System.out.println(user.elementText("name"));
System.out.println(user.elementText("age"));
System.out.println(user.getTextTrim());
```



#### 约束

约束：限制 XML 文件只能按照某种格式进行书写。

约束文档：专门用来限制 XML 书写格式的文档，比如：限制标签、属性应该怎么写。

约束文档的分类：

* DTD 文档：可以约束 XML 文件的编写，但不能约束具体的数据类型
* Schema 文档



**DTD 文档约束**：

* 编写 DTD 约束文档，后缀必须是 `.dtd`
* 在需要编写的 XML 文件中导入该 DTD 约束文档
* XML 文件必须按照 DTO 约束文档指定的格式进行编写，否则报错



```dtd
<!ELEMENT 书架 (书+)>
<!ELEMENT 书 (书名, 作者)>
<!ELEMENT 书名 (#PCDATA)>
<!ELEMENT 作者 (#PCDATA)>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE 书架 SYSTEM "book.dtd">
<书架>
    <书>
        <书名>西游记</书名>
        <作者>吴承恩</作者>
    </书>
</书架>
```



**Schema 文档约束**：

* 编写 Schema 约束文档，后缀必须是 `.xsd`
* 在需要编写的 XML 文件中导入该 Schema 约束文档
* 按照约束内容编写 XML 文件的内容



```
<?xml version="1.0" encoding="UTF-8" ?>
<schema xmlns="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.test.cn" elementFormDefault="qualified">
    <!--  targetNamespace: 声明约束文档的地址(命名空间) -->
    <element name="书架">
        <!-- 写子元素 -->
        <complexType>
            <!-- maxOccurs="unbounded": 书架下的子元素可以有任意多个 -->
            <sequence maxOccurs="unbounded">
                <element name="书">
                    <!-- 写子元素 -->
                    <complexType>
                        <sequence>
                            <element name="书名" type="string"/>
                            <element name="售价" type="double"/>
                        </sequence>
                    </complexType>
                </element>
            </sequence>
        </complexType>
    </element>
</schema>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<书架 xmlns="http://www.test.cn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.test.cn book.xsd">
    <书>
        <书名>西游记</书名>
        <售价>98</售价>
    </书>
</书架>
```





## 日志

日志：把程序运行的信息，记录到文件中，方便程序员定位 bug、并了解程序的执行情况等。

可以随时以开关的形式控制日志的启停，无需侵入到源代码中进行修改。



日志接口：Commons Logging （JCL）、Simple Logging Facade for Java （`SLF4J`）

日志框架：JUL（java.util.logging）、Log4j、`Logback`



### Logback

[Logback](https://logback.qos.ch/) 是基于 slf4j 的日志规范实现的框架。

Logback 有以下模块：

* logback-core ：基础模块，是其他两个模块依赖的基础（必须有）
* logback-classic ：完整实现了 slf4j API 的模块（必须有）
* logback-access ：与 Tomcat 和 Jetty 等 Servlet 容器集成，以提供 HTTP 访问日志的功能



使用步骤：

* 导入 Logback 框架到项目中：slf4j-api 日志接口、 logback-core、logback-classic 
* 将 Logback 框架的核心配置文件 `logback.xml` 拷贝到 src 目录下
* 创建 Logback 框架提供的 Logger 对象，然后用 Logger 对象调用其提供的方法就可以记录系统的日志信息



```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="false">

    <!--定义日志文件的存储地址 勿在 LogBack 的配置中使用相对路径-->
    <property name="LOG_HOME" value="d:/log" />

    <!--控制台日志， 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度,%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </appender>

    <!--文件日志， 按照每天生成日志文件 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${LOG_HOME}/TestWeb.log.%d{yyyy-MM-dd}.log</FileNamePattern>
            <!--日志文件保留天数-->
            <MaxHistory>30</MaxHistory>
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
        <!--日志文件最大的大小-->
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>10MB</MaxFileSize>
        </triggeringPolicy>
    </appender>

    <!-- show parameters for hibernate sql 专为 Hibernate 定制 -->
    <logger name="org.hibernate.type.descriptor.sql.BasicBinder" level="TRACE" />
    <logger name="org.hibernate.type.descriptor.sql.BasicExtractor" level="DEBUG" />
    <logger name="org.hibernate.SQL" level="DEBUG" />
    <logger name="org.hibernate.engine.QueryParameters" level="DEBUG" />
    <logger name="org.hibernate.engine.query.HQLQueryPlan" level="DEBUG" />

    <!--myibatis log configure-->
    <logger name="com.apache.ibatis" level="TRACE"/>
    <logger name="java.sql.Connection" level="DEBUG"/>
    <logger name="java.sql.Statement" level="DEBUG"/>
    <logger name="java.sql.PreparedStatement" level="DEBUG"/>

    <!-- 日志输出级别 -->
    <root level="DEBUG">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```



```java
public class Demo {
    public static final Logger LOGGER = LoggerFactory.getLogger("LogbackTest");

    public static void main(String[] args) {
        LOGGER.debug("调试");
        LOGGER.info("输出信息");
        LOGGER.error("报错了");
    }
}
```



### logback.xml

对 Logback 日志框架的控制，都是通过其核心配置文件 `logback.xml` 来实现的。



通常可以设置2个输出日志的位置：

* 控制台

  ```
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
  ```

* 系统文件

  ```
  <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
  ```



日志级别：指的是日志信息的类型，日志都会分级别（优先级此次升高）。只有日志的级别是大于或等于核心配置文件配置的日志级别，才会被记录。

* trace ：追踪，指明程序运行轨迹
* debug ：调试，实际应用中一般将其作为最低级别，而 trace 则很少使用
* info ：输出重要的运行信息，数据连接、网络连接、IO操作等等
* warn ：警告信息
* error ：错误信息

```
<!-- 日志输出级别 -->
<root level="DEBUG">
    <appender-ref ref="STDOUT" />
    <appender-ref ref="FILE"/>
</root>
```

开启日志（ALL），取消日志（OFF）



## 注解

注解（Annotation）是 Java 代码里的特殊标记，比如 `@Override` 、`@Test` 等，作用是：让其他程序根据注解信息来决定怎么执行该程序。

注解可以用在类上、构造器上、方法上、成员变量上、参数等位置处。



注解原理：

* 注解本质是一个接口，Java 中所有注解都是继承了 `Annotation` 接口的
* `@注解(...)` 其实就是一个实现类对象，实现了该注解以及 `Annotation` 接口



### 自定义注解

就是自己定义注解。

```java
public @interface 注解名称 {
    public 属性类型 属性名() default 默认值;
}
```

特殊属性名 `value` ：如果注解中只有一个 value 属性，使用注解时，value 名称可以不写。



```java
public @interface MyTest1 {

    String aaa();

    boolean bbb() default true;

    String[] ccc();
}
```

```java
public @interface MyTest2 {
    String value(); // 特殊属性

    int age() default 20;
}
```

```java
@MyTest2("老李")
@MyTest1(aaa = "张三", ccc = {"老二", "老三"})
public class User {

    @MyTest2(value = "周程程", age = 26)
    @MyTest1(aaa = "老王", bbb = false, ccc = {"王富贵"})
    public void test() {

    }
}
```



### 元注解

指的是：修饰注解的注解。

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface MyTest1 {

}
```



`@Target` ：声明被修饰的注解只能在哪些位置使用。

* `@Target({ElementType.METHOD})`
  * TYPE ：类，接口
  * FIELD ：成员变量
  * METHOD ：成员方法
  * PARAMETER ：方法参数
  * CONSTRUCTOR ：构造器
  * LOCAL_VARIABLE ：局部变量



`@Retention` ：声明注解的保留周期

* `@Retention(RetentionPolicy.RUNTIME)`
  * SOURCE ：只作用在源码阶段，字节码文件中不存在
  * CLASS ：默认值。保留到字节码文件阶段，运行阶段不存在
  * RUNTIME ：一直保留到运行阶段。**开发常用**



```java
@Retention(RetentionPolicy.RUNTIME)     // 控制注解一直保留到运行时
@Target({ElementType.METHOD, ElementType.FIELD})    // 当前被修饰的注解只能用在成员方法、成员变量上
public @interface MyTest1 {
    String value();
}
```

```java
public class User {

    @MyTest1("张三")
    private String name;

    @MyTest1("123")
    public void test() {

    }
}
```



### 注解解析

就是判断类上、方法上、成员变量上是否存在注解，并把注解的内容给解析出来。



如何解析注解：

* 指导思想：要解析谁上面的注解，就应该先拿到谁
* 比如要解析类上的注解，则应该先获取该类的 Class 对象，再通过 Class 对象解析其上面的注解
* Class 、Method 、Field 、Constructor 都实现了 AnnotatedElement 接口，它们都拥有解析注解的能力



AnnotatedElement  接口提供的方法：

* `Annotation[] getAnnotations()` ：获取当前对象上面的注解
* `A getDeclaredAnnotation(Class<A> annotationClass)` ：获取指定的注解对象
* `boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)` ：判断当前对象上是否存在某个注解



```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface MyTest1 {

    String value();

    double aaa() default 100;

    String[] bbb();

}
```

```java
@MyTest1(value = "张三", aaa = 26, bbb = {"李四", "王五"})
public class User {

    @MyTest1(value = "李四", bbb = {"花花"})
    public void test() {

    }
}
```

```java
// 得到Class对象
Class c = User.class;
Method m = c.getDeclaredMethod("test");

// 解析注解
// 判断类上是否包含了某个注解
if (c.isAnnotationPresent(MyTest1.class)) {
    MyTest1 myTest1 = (MyTest1) c.getDeclaredAnnotation(MyTest1.class);
    System.out.println(myTest1.value());
    System.out.println(myTest1.aaa());
    System.out.println(Arrays.toString(myTest1.bbb()));
}

// 判断方法上是否包含了某个注解
if (m.isAnnotationPresent(MyTest1.class)) {
    MyTest1 myTest1 = (MyTest1) m.getDeclaredAnnotation(MyTest1.class);
    System.out.println(myTest1.value());
    System.out.println(myTest1.aaa());
    System.out.println(Arrays.toString(myTest1.bbb()));
}
```



### 模拟 Junit

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyJunit {
}
```

```java
public class MyTest {

    @MyJunit
    public void test1() {
        System.out.println("test1");
    }

    public void test2() {
        System.out.println("test2");
    }

    @MyJunit
    public void test3() {
        System.out.println("test3");
    }

    public static void main(String[] args) throws Exception {
        MyTest myTest = new MyTest();

        // 得到Class对象
        Class c = MyTest.class;
        // 获取这个类中的全部成员方法
        Method[] methods = c.getDeclaredMethods();

        for (Method method : methods) {
            // 方法上存在@MyJunit注解则触发当前方法执行
            if (method.isAnnotationPresent(MyJunit.class)) {
                method.invoke(myTest);
            }
        }

    }
}
```





## Junit 单元测试

就是针对最小的功能单元（方法），编写测试代码对其进行正确性测试。

Junit 特点：

* 可以灵活的编写测试代码，可以针对某个方法进行测试，也支持一键完成对全部方法的自动化测试，且各自独立
* 不需要程序员去分析测试的结果，会自动生成测试报告出来	



步骤：

* 导入 jar 包
* 编写测试方法，必须是公共、无参、无返回值
* 测试方法上必须声明 `@Test` 注解
* 选中测试方法运行，如果通过测试则是绿色，如果测试失败则是红色



### Junit4

常用注解：

* `@Test` ：测试类中的方法必须用它修饰才能成为测试方法，才能启动执行
* `@Before` ：用来修饰一个实例方法，该方法会在每一个测试方法执行之前执行一次
* `@After` ：用来修饰一个实例方法，该方法会在每一个测试方法执行之后执行一次
* `@BeforeClass` ：用来修饰一个静态方法，该方法会在所有测试方法之前只执行一次
* `@AfterClass` ：用来修饰一个静态方法，该方法会在所有测试方法之后只执行一次

在测试方法执行前执行的方法，常用于：初始化资源。

在测试方法执行后再执行的方法，常用于：释放资源。



```java
public class MyTest {

    @Test
    public void Test() {
        System.out.println("Test");
        int len = 4;
        // 断言机制：可以预测业务方法的结果
        Assert.assertEquals("方法内部有bug", 4, len);
    }

    @Test
    public void Test2() {
        System.out.println("Test2");
    }

    @Before
    public void before() {
        System.out.println("before 在每个测试方法执行之前执行一次");
    }

    @After
    public void after() {
        System.out.println("after 在每个测试方法执行之后执行一次");
    }

    @BeforeClass
    public static void beforeClass() {
        System.out.println("BeforeClass 在所有测试方法之前只执行一次");
    }

    @AfterClass
    public static void afterClass() {
        System.out.println("AfterClass 在所有测试方法之后只执行一次");
    }

}
```



### Junit5

常用注解：

* `@Test` ：测试类中的方法必须用它修饰才能成为测试方法，才能启动执行
* `@BeforeEach` ：用来修饰一个实例方法，该方法会在每一个测试方法执行之前执行一次
* `@AfterEach` ：用来修饰一个实例方法，该方法会在每一个测试方法执行之后执行一次
* `@BeforeAll` ：用来修饰一个静态方法，该方法会在所有测试方法之前只执行一次
* `@AfterAll` ：用来修饰一个静态方法，该方法会在所有测试方法之后只执行一次

在测试方法执行前执行的方法，常用于：初始化资源。

在测试方法执行后再执行的方法，常用于：释放资源。



```java
public class MyTest {

    @Test
    public void Test() {
        System.out.println("Test");
    }

    @Test
    public void Test2() {
        System.out.println("Test2");
    }

    @BeforeEach
    public void before() {
        System.out.println("BeforeEach 在每个测试方法执行之前执行一次");
    }

    @AfterEach
    public void after() {
        System.out.println("AfterEach 在每个测试方法执行之后执行一次");
    }

    @BeforeAll
    public static void beforeClass() {
        System.out.println("BeforeAll 在所有测试方法之前只执行一次");
    }

    @AfterAll
    public static void afterClass() {
        System.out.println("AfterAll 在所有测试方法之后只执行一次");
    }

}
```



## 代理

对象如果嫌身上干的事太多的话，可以通过代理来转移部分职责。对象有什么方法想被代理，代理就一定要有对应的方法。可以通过接口来定义需要代理的方法。



`java.lang.reflect.Proxy` 类：提供了为对象产生代理对象的方法。

* `Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)`
  * 参数一：用于指定用哪个类加载器，去加载生成的代理类
  * 参数二：指定接口，这些接口用于指定生成的代理有哪些方法
  * 参数三：用来指定生成的代理对象要干什么事情



```java
public interface Star {
    String sing(String name);

    void dance();
}
```

```java
public class BigStar implements Star {

    private String name;

    public BigStar(String name) {
        this.name = name;
    }

    @Override
    public String sing(String name) {
        System.out.println(this.name + "正在唱：" + name);
        return "谢谢";
    }

    @Override
    public void dance() {
        System.out.println(this.name + "正在跳");
    }
}
```

```java
public class ProxyUtil {
    public static Star createProxy(BigStar bigStar) {
        Star starProxy = (Star) Proxy.newProxyInstance(ProxyUtil.class.getClassLoader(),
                new Class[]{Star.class},
                new InvocationHandler() {

                    // 回调方法
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        // 代理对象要做的事情，在这里写代码
                        if (method.getName().equals("sing")) {
                            System.out.println("准备话筒，收钱20万");
                        } else if (method.getName().equals("dance")) {
                            System.out.println("准备场地，收钱50万");
                        }
                        return method.invoke(bigStar, args);
                    }
                });
        return starProxy;
    }

}
```

```java
BigStar s = new BigStar("张三");
Star starProxy = ProxyUtil.createProxy(s);

String rs = starProxy.sing("好日子");
System.out.println(rs);

starProxy.dance();
```





## VO、DTO、BO、PO、DO

| 术语 | 解释                                                         |
| ---- | ------------------------------------------------------------ |
| VO   | view object：视图对象，用于展示层，把某个指定页面的展示数据封装起来 |
| DTO  | Data Transfer Object：用于展示层与服务层之间的数据传输对象   |
| BO   | Business Object：业务对象，把业务逻辑封装为一个对象          |
| PO   | Persistent Object：持久化对象，和持久层（如数据库）形成对应的映射关系 |
| DO   | Domain Object：领域对象，从现实对象中抽象出来的有形或无形的业务实体 |



## DOTO RxJava





## 库

### 框架

框架的形式：一般是把类、接口等编译成 class 形式，再压缩成一个 `.jar` 结尾的文件发行出去。



使用步骤：

* 在项目根目录创建 lib 文件夹，用于存放 jar 文件
* 将用到的 jar 文件复制到 lib 文件夹中
* 在 lib 文件夹上右键 → Add as Library → OK，就会将编译 jar 包中的内容到项目中了
* 在类中导包使用



### 接口文档 Swagger

Swagger是一个规范和完整的框架,用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。



### 接口文档 Knife4j

Knife4j是一个集 Swagger2 和 OpenAPI3 为一体的增强解决方案。

文档地址：https://github.com/xiaoymin/knife4j



### IO 框架 Commons-io

[Commons-io](https://commons.apache.org/proper/commons-io/) 是 apache 提供的一组有关 IO 操作的小框架，目的是提高 IO 流的开发效率。



### XML 解析 Dom4j

[Dom4j](https://dom4j.github.io/)



### 工具类库 Hutool

Hutool 是一个 Java 基础工具类，对文件、流、加密解密、转码、正则、线程、XML 等 JDK 方法进行封装，组成各种 Util 工具类。

文档地址：https://github.com/dromara/hutool



### 类型转换工具类 Convert

Convert 类是一个类型转换工具方法类，里面封装了针对 Java 常见类型的转换，用于简化类型转换。

文档地址：https://github.com/dromara/hutool



### 字符串工具 StrUtil

​	

### 日期时间工具 DateUtil

主要提供日期和字符串之间的转换，以及提供对日期的定位。



### 信息脱敏工具 DesensitizedUtil

在数据处理或清洗中，可能涉及到很多隐私信息的脱敏工作，因此 Hutool 针对常用的信息封装了一些脱敏方法。现阶段支持的脱敏数据类型包括：用户 id、中文姓名、身份证号、座机号、手机号、地址、电子邮件、密码、中国大陆车牌，包含普通车辆、新能源车辆、银行卡等。



### 图片工具 ImgUtil

针对 awt 中图片处理进行封装，这些封装包括：缩放、裁剪、转为黑白、加水印等操作。



### Excel工具 ExcelUtil



### 图形验证码 CaptchaUtil



### 反编译工具 XJad





















