# 内置类

## Scanner

`Scanner` 类用于获取获取用户的输入。

导包：`import java.util.Scanner;`



* 判断是否有输入：
  * `hasNext()` 、`hasNextLine()`、`hasNextInt()`、`hasNextDouble()` ...
* 获取输入的字符串：
  * `next()` ：不能得到带有空格的字符串
    * 一定要读取到有效字符后才可以结束输入
    * 对输入有效字符之前遇到的空白，将自动将其去掉
    * 只有输入有效字符后才将其后面输入的空白作为分隔符或者结束符
  * `nextLine()` ：可以获得空白
    * 以 Enter 为结束符，返回的是输入回车之前的所有字符
  * `nextInt()`、`nextDouble()` ...



```java
// 创建一个扫描器对象，用于接收键盘数据
Scanner scanner = new Scanner(System.in);

// 判断用户有没有输入，此方法可能在等待输入时发生阻塞
if (scanner.hasNextLine()) {
    System.out.println(scanner.nextLine());
}

// 凡是属于 IO 流的类如果不关闭会一直占用资源，所以要关闭
scanner.close();
```

```java
// 计算输入的总数和平均值
Scanner scanner = new Scanner(System.in);

double sum = 0;
int count = 0;

while (scanner.hasNextDouble()) {
    double num = scanner.nextDouble();
    count++;
    sum += num;
}

System.out.println(count + "个数的和为：" + sum);
System.out.println(count + "个数的平均值为：" + sum / count);

scanner.close();
```



## 字符串

### String

String 是不可变字符串对象。

* 只要是以 `"..."` 方式写出的字符串对象，都会在堆内存中的字符串常量池中存储，且相同内容的字符串只存储一份（节约内存）。
* 通过 new 方式创建字符串对象，每 new 一次都会产生一个新的对象放在堆内存中。每次改变字符串对象实际上是新产生了新的字符串对象，变量每次都是指向新的字符串对象，之前字符串的内容是没有改变的。



构造函数：

* `new String()` ：创建一个空白字符串对象
* `new String(String str)` ：根据传入的字符串内容来创建
* `new String(char[] chars)` ：根据字符数组的内容来创建
* `new String(byte[] bytes, [String charsetName])` ：通过指定的字符集解码指定的字节数组来构造新的字符串。不指定字符编码则使用平台的默认字符集



常用方法：

* `length()` ：获取字符串的长度
* `charAt(int index)` ：获取某个索引位置的字符，越界会抛出 `StringIndexOutOfBoundsException`
* `toCharArray()` ：将当前字符串转换成字符数组返回
* `equals(Object obj)` ：判断当前字符串与另一个字符串的内容是否一样，一样则返回 true
  * 业务中判断是否相等，一定要用 equals 方法
* `equalsIgnoreCase(Object obj)` ：判断当前字符串与另一个字符串的内容是否一样（忽略大小写），一样则返回 true
* `substring(int beginIndex [,int endIndex])` ：根据开始和结束索引进行截取，得到新的字符串。如果不传结束索引，则从开始索引处截取到末尾。（包前不包后）
* `replace(String target,String newStr)` ：替换字符串内容
* `replaceAll(String regex, String replacement)` ：按照正则表达式匹配的内容进行替换
* `contains(String str)` ：判断字符串中是否包含某个字符串
* `startsWith(String str)` ：判断字符串是否以某个字符串内容开头，是则返回 true
* `split(String regex)` ：按照正则表达式匹配的内容进行分割字符串，并返回字符串数组
* `matches(String regex)` ：判断字符串是否匹配正则表达式
* `byte[] getBytes([String charsetName])` ：使用指定的字符集将该字符串编码为一系列字节，将结果存储到新的字节数组中。不指定则使用平台的默认字符集



```java
// 通过字面量创建字符串
String s1 = "小黑";

// 通过构造函数创建字符串
String s2 = new String();
String s3 = new String("老陈");
String s4 = new String(new char[]{'a', 'b', 'c'});
String s5 = new String(new byte[]{65, 66});


String str = "一日看尽长安花";

System.out.println(str.length());   // 7
System.out.println(str.charAt(1));  // 日
char[] chars = str.toCharArray();
System.out.println(chars[3]);       // 尽
System.out.println(str == "一日看尽长安花");   // true
System.out.println(str == new String("一日看尽长安花"));       // false
System.out.println(str.equals(new String("一日看尽长安花")));  // true

String s1 = "abc";
String s2 = "AbC";
System.out.println(s1.equals(s2));              // false
System.out.println(s1.equalsIgnoreCase(s2));    // true

System.out.println(str.substring(3));     // 尽长安花
System.out.println(str.substring(3, 5));            // 尽长 (不包后)
System.out.println(str.replace("长安", "咸阳"));    // 一日看尽咸阳花
System.out.println(str.contains("日"));       // true
System.out.println(str.startsWith("一日"));   // true
System.out.println(Arrays.toString(str.split(""))); // [一, 日, 看, 尽, 长, 安, 花]
```



```java
// 编码
String data = "a我b";
byte[] bytes = data.getBytes();
System.out.println(Arrays.toString(bytes));

byte[] bytes1 = data.getBytes("GBK");
System.out.println(Arrays.toString(bytes1));

// 解码
String s1 = new String(bytes1);     // 按照平台默认编码 UTF-8 解码
System.out.println(s1);

String s2 = new String(bytes1, "GBK");
System.out.println(s2);
```



```java
// 面试题
String s1 = "abc";
String s2 = "ab";
String s3 = s2 + "c";
System.out.println(s1 == s3);   // false

String s4 = "abc";
String s5 = "a" + "b" + "c";		// java的编译优化机制，在编译会转成 "abc"，以提高执行性能
System.out.println(s4 == s5);   // true
```



### StringBuilder、StringBuffer 

StringBuilder 代表可变字符串对象，相当于是一个容器，它里面装的字符串是可以改变的，就是用来操作字符串的。

好处：StringBuilder 比 String 更适合做字符串的修改操作，效率会更高，代码也会更简洁。



StringBuffer 与 StringBuilder：

* 两者用法是一模一样的
* 但 StringBuilder 是线程不安全的，**StringBuffer 是线程安全的**



构造器：

* `StringBuilder()` ：创建一个空白的可变字符串对象，不包含任何内容
* `StringBuilder(String str)` ：创建一个指定字符串内容的可变字符串对象



方法：

* `StringBuilder append(任意类型)` ：添加数据并返回 StringBuilder 对象本身
* `StringBuilder reverse()` ：将对象的内容反转
* `int length()` ：返回对象内容长度
* `String toString()` ：把 StringBuilder 转换为 String



```java
StringBuilder sb = new StringBuilder();
sb.append("hello");
sb.append("java");
sb.reverse();

// 支持链式编程
sb.append("abc").append("123");

System.out.println(sb.length());
System.out.println(sb.toString());


StringBuffer sb2 = new StringBuffer();
sb2.append("hello");
```



### StringJoiner

StringJoiner 和 StringBuilder 一样，也是用来操作字符串的。常用于以指定字符来拼接字符串。



构造器：

* `StringJoiner(间隔符号)` ：创建一个 StringJoiner 对象，指定拼接时的间隔符号
* `StringJoiner(间隔符号, 开始符号, 结束符号)` ：创建一个 StringJoiner 对象，指定拼接时的间隔符号、开始符号、结束符号



方法：

* `StringJoiner add(添加的内容)` ：添加数据，并返回对象本身
* `int length()` ：返回长度
* `String toString()` ：返回拼接后的字符串



```java
int[] arr = {10, 23, 12, 42};
StringJoiner sj = new StringJoiner(",", "[", "]");
for (int i = 0; i < arr.length; i++) {
    sj.add(arr[i] + "");
}

System.out.println(sj); // [10,23,12,42]
```





## Arrays

用来操作数组的一个工具类。

* `toString(arr)` ：以字符串表示形式返回指定数组的内容
* `equals(arr1, arr2)` ：比较数组中元素值是否相等
* `fill()` ：给数组赋值
* `sort(arr)` ：对数组进行升序排序，会改变原数组
* `binarySearch(arr, value)` ：对排序好的数组进行二分查找法操作，返回索引位置
* `copyOfRange(arr, 起始索引, 结束索引)` ：拷贝数组，需指定范围，包前不包后
* `copyOf(arr, length)` ：拷贝数组，需指定长度
* `setAll(arr, callback)` ：把数组中的原数据改为新数据



导包：`import java.util.Arrays;`

```java
int[] arr = {10, 21, 13, 9, 32};
int[] arr2 = {10, 21, 13, 9, 32};
int[] arr3 = new int[5];

System.out.println(Arrays.equals(arr, arr2));   // true

Arrays.sort(arr);   // 升序排序，会改变原数组

System.out.println(Arrays.equals(arr, arr2));   // false

System.out.println(Arrays.binarySearch(arr, 21));   // 3

Arrays.fill(arr3, 12);  // 给数组中所有元素赋值

System.out.println(Arrays.toString(arr));   // 以字符串表示形式返回指定数组的内容

System.out.println(Arrays.toString(Arrays.copyOfRange(arr, 0, 2)));

System.out.println(Arrays.toString(Arrays.copyOf(arr, arr.length)));

Arrays.setAll(arr, new IntUnaryOperator() {
    @Override
    public int applyAsInt(int index) {
        return arr[index] + 1;
    }
});

Arrays.setAll(arr, (int index) -> arr[index] + 1);
System.out.println(Arrays.toString(arr));
```



### 对数组中的对象排序

方式1：让该对象的类实现 `Comparable` 比较规则接口，然后重写 `compareTo` 方法，自己来制定比较规则。

方式2：使用 `Arrays.sort()` 方法时，创建 `Comparator` 比较器接口的匿名内部类对象，然后自己制定比较规则。



自定义排序规则时，需要遵循的官方约定如下：

```
约定1：认为左边对象  大于  右边对象，返回正整数
约定2：认为左边对象  小于  右边对象，返回负整数
约定3：认为左边对象  等于  右边对象，返回0
```



```java
// 方式1
public class Student implements Comparable<Student> {

    // 指定比较规则
    @Override
    public int compareTo(Student o) {
        return this.age - o.age;    // 升序
    }

    private String name;
    private int age;
    private double score;

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public Student() {
    }

    public Student(String name, int age, double score) {
        this.score = score;
        this.age = age;
        this.name = name;
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

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", score=" + score +
                '}';
    }
}
```

```java
public class Test {
    public static void main(String[] args) throws Exception {
        Student[] students = new Student[3];
        students[0] = new Student("张三", 21, 92.3);
        students[1] = new Student("李四", 11, 85.2);
        students[2] = new Student("王五", 18, 89);
        System.out.println(Arrays.toString(students));

        // Arrays.sort(students);

				// 方式2
        Arrays.sort(students, new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                return Double.compare(o2.getScore(), o1.getScore());
            }
        });
      
      	// lambda 表达式
      	Arrays.sort(students, (Student o1, Student o2) -> Double.compare(o2.getScore(), o1.getScore()));

        System.out.println(Arrays.toString(students));
    }
}
```





## Random

作用：生成随机数。

导包：`import java.util.Random;`



* `nextInt(n)` ：生成 0 至 n-1 之间的随机整数，不包含 n。



减加法：

1. 最大值减去最小值，得到的商。这个商就是方法中的参数。如果需要包尾，这个商要加1。
2. 随机结果再加上最小值



```java
Random random = new Random();				// 创建随机数对象
int number = random.nextInt(10);    // 生成 0~9 之间的随机整数
System.out.println(number);


// 生成 1~10 之间的随机整数
Random r = new Random();
int num = r.nextInt(10) + 1;		// 减加法：1~10 之间的随机整数
System.out.println(r.nextInt(31) + 20);	// 减加法：20~50 之间的随机整数
```



```java
// 生成指定长度的随机字符串
public static String createCode(int n) {
    String code = "";
    String data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    Random r = new Random();
    for (int i = 0; i < n; i++) {
        int index = r.nextInt(data.length());
        code += data.charAt(index);
    }

    return code;
}

public static String createCode(int n) {
    String code = "";
    Random r = new Random();
    for (int i = 0; i < n; i++) {
        int type = r.nextInt(3);
        switch (type) {
            case 0:
                code += r.nextInt(10);
                break;
            case 1:
            		// A-Z 65~91
                char ch1 = (char) (r.nextInt(26) + 65);
                code += ch1;
                break;
            case 2:
            		// a-z 97~123
                char ch2 = (char) (r.nextInt(26) + 97);
                code += ch2;
                break;
        }
    }

    return code;
}
```



## UUID

* `static UUID randomUUID()` ：生成uuid



```java
System.out.println(UUID.randomUUID());  // 4707e662-ac58-44a0-8fae-e29983ecee04
```





## Math

数学的工具类，里面提供的都是对数据进行操作的一些静态方法。



方法：

* `abs(num)` ：获取参数的绝对值
* `ceil(num)` ：向上取整
* `floor(num)` ：向下取整
* `round(num)` ：四舍五入
* `max(a, b)` ：获取两个数中的较大值
* `min(a, b)` ：获取两个数中的较小值
* `pow(a, b)` ：返回 a 的 b 次幂
* `random()` ：返回0~1之间的随机数（包前不包后）



```java
System.out.println(Math.abs(-2));       // 2
System.out.println(Math.ceil(2.57));    // 3.0
System.out.println(Math.floor(2.3));    // 2.0
System.out.println(Math.round(3.57));   // 4
System.out.println(Math.max(6, 5));     // 6
System.out.println(Math.min(6, 5));     // 5
System.out.println(Math.pow(2, 3));     // 8.0
System.out.println(Math.random());      // 0~1之间的随机数
```



## BigDecimal

用来解决浮点型运算时，出现结果失真的问题。



构造器：

* `BigDecimal(double val)` ：不推荐使用这个，将 double 转换为 BigDecimal
* `BigDecimal(String val)` ：将 string 转为 BigDecimal



方法：

* `static BigDecimal valueOf(double val)` ：转换一个 double 或 BigDecimal
* `BigDecimal add(BigDecimal b)` ：加法
* `BigDecimal subtract(BigDecimal b)` ：减法
* `BigDecimal multiply(BigDecimal b)` ：乘法
* `BigDecimal divide(BigDecimal b)` ：除法
* `BigDecimal divide(BigDecimal b, 精确几位，舍入模式)` ：除法，可以控制精确到小数几位，小数部分自动补零
* `Double doubleValue()` ：将 BigDecimal 转换为 double



```java
System.out.println(0.1 + 0.2);  // 0.30000000000000004

// BigDecimal a1 = new BigDecimal("0.1");
double a = 0.1;
double b = 0.2;
BigDecimal a1 = BigDecimal.valueOf(a);  // 推荐方式
BigDecimal b1 = BigDecimal.valueOf(b);
System.out.println(a1.add(b1));         // 加法 0.3
System.out.println(a1.subtract(b1));    // 减法 -0.1
System.out.println(a1.multiply(b1));    // 乘法 0.02
System.out.println(a1.divide(b1));      // 除法 0.5

BigDecimal i = BigDecimal.valueOf(0.1);
BigDecimal j = BigDecimal.valueOf(0.3);
// BigDecimal res = i.divide(j);   // ArithmeticException 异常，除不尽会报错
BigDecimal res = i.divide(j, 2, RoundingMode.HALF_UP);   // ArithmeticException 异常，除不尽会报错
System.out.println(res);    // 0.33

double v = res.doubleValue();
System.out.println(v);
```





## Objects

Objects 是一个工具类，提供了很多操作对象的静态方法。



* `equals(Object a, Object b)` ：先做非空判断，再比较两个对象。比较时推荐用这个方法。
* `isNull(Object obj)` ：判断对象是否为 null
* `nonNull(Object obj)` ：判断对象是否不为 null
* `int hashCode()` ：返回对象的哈希码值。



```java
Student s1 = new Student("张三");
Student s2 = new Student("张三");

System.out.println(s1.equals(s2));
System.out.println(Objects.equals(s1, s2));     // 更安全

System.out.println(s1 == null);
System.out.println(Objects.isNull(s1));

System.out.println(s1 != null);
System.out.println(Objects.nonNull(s1));
```





## 日期

### Date

代表的是日期和时间。



构造器：

* `Date()` ：创建一个 Date 对象，代表的是系统此刻日期时间
* `Date(long time)` ：把时间毫秒值转换成 Date 日期对象



方法：

* `long getTime()` ：返回从1970-1-1 0:0:0 走到此刻的总毫秒数
* `void setTime(long time)` ：设置日期对象的时间为毫秒数对应的时间



```java
Date date = new Date();
System.out.println(date);

long time = date.getTime(); // 时间毫秒值
System.out.println(time);

// 2s 后的时间
time += 2 * 1000;
Date date1 = new Date(time);
System.out.println(date1);
```



### SimpleDateFormat

代表简单日期格式化，可以用来把日期对象、时间毫秒值格式化成指定的形式。



构造器：

* `SimpleDateFormat(String pattern)` ：创建简单日期格式化对象，并封装时间的格式



方法：

* `String format(Date date)` ：将日期格式化成日期/时间字符串
* `String format(Object time)` ：将时间毫秒值格式化成日期/时间字符串
* `Date parse(String source)` ：把字符串时间解析成日期对象。指定的时间格式必须与被解析的时间格式一致，不然会报错



```java
System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

Date date = new Date();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
System.out.println(sdf.format(date));   // 2024-06-25 09:45:24

long time = date.getTime(); // 时间毫秒值
System.out.println(sdf.format(time));

SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss EEE a");
System.out.println(sdf2.format(time));  // 2024年06月25日 09:56:06 星期二 上午

SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd");
Date parse = sdf3.parse("2023-11-21");
```



```java
// 判断指定的时间是否在活动时间内
// check("2023-12-12 00:00:00", "2023-12-30 23:59:59", "2023-12-21 12:00:11")
public static boolean check(String start, String end, String now) throws ParseException {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    long startTime = sdf.parse(start).getTime();
    long endTime = sdf.parse(end).getTime();
    long nowTime = sdf.parse(now).getTime();

    return nowTime >= startTime && nowTime <= endTime;
}
```



### Calendar

代表的是系统此刻时间对应的日历，通过它可以单独获取、修改时间中的年、月、日、时、分、秒等。

**注意：calendar 是可变对象，一旦修改后其对象本身表示的时间将产生变化。**



方法：

* `static Calendar getInstance()` ：获取当前日历对象
* `int get(int filed)` ：获取日历中的某个信息
* `Date getTime()` ：获取日期对象
* `long getTimeInMillis()` ：获取时间毫秒值
* `void set(int field, int value)` ：修改日历的某个信息
* `void add(int field, int amount)` ：为某个信息增加/减少指定的值



```java
Calendar now = Calendar.getInstance();
System.out.println(now);

System.out.println(now.get(Calendar.YEAR));
System.out.println(now.get(Calendar.MONTH));
System.out.println(now.get(Calendar.DAY_OF_MONTH));

Date date = now.getTime();
System.out.println(date);
System.out.println(now.getTimeInMillis());

now.set(Calendar.YEAR, 2000);
now.add(Calendar.DAY_OF_MONTH, 1);
System.out.println(now.get(Calendar.YEAR));
System.out.println(now.get(Calendar.DAY_OF_MONTH));
```



### JDK8 新增API

| jdk8之前的时间API                          | jdk8新增的时间API                        |
| ------------------------------------------ | ---------------------------------------- |
| 设计不合理，使用不方便，很多都被淘汰了     | 设计更合理，功能丰富，使用更方便         |
| 都是可变对象，修改后会丢失最开始的时间信息 | 都是不可变对象，修改后会返回新的时间对象 |
| 线程不安全                                 | 线程安全                                 |
| 只能精确到毫秒                             | 能精确到毫秒、纳秒                       |



* 代替 Calendar
  * LocalDate ：年、月、日
  * LocalTime ：时、分、秒
  * LocalDateTime ：年、月、日、时、分、秒
  * ZoneId ：时区
  * ZonedDateTime ：带时区的时间
* 代替 SimpleDateFormat
  * DateTimeFormatter ：用于时间的格式化和解析
* 代替 Date
  * Instant ：时间戳/时间线
* 其他补充
  * Period ：时间间隔（年、月、日）
  * Duration ：时间间隔（时、分、秒、纳秒）



### LocalDate、LocalTime、LocalDateTime

* LocalDate 代表本地日期（年、月、日、星期）
* LocalTime 代表本地时间（时、分、秒、纳秒）
* LocalDateTime 代表本地日期、时间（年、月、日、星期、时、分、秒、纳秒）



获取对象：

* `static Xxx now()` ：获取系统当前时间对应的日期对象
* `static Xxx of(...)` ：获取指定时间的日期对象



解析日期时间：

* `static Xxx parse(...)` ：解析时间日期

```java
LocalDate ld = LocalDate.now();
LocalTime lt = LocalTime.now();
LocalDateTime ldt = LocalDateTime.now();
System.out.println(ld);
System.out.println(lt);
System.out.println(ldt);

LocalDate ld2 = LocalDate.of(2023, 12, 21);
LocalTime lt2 = LocalTime.of(20, 12, 29, 2000);
LocalDateTime ldt2 = LocalDateTime.of(2023, 11, 3, 2, 13, 30, 200);
System.out.println(ld2);        // 2023-12-21
System.out.println(lt2);        // 20:12:29.000002
System.out.println(ldt2);       // 2023-11-03T02:13:30.000000200
```



#### LocalDate

方法：

* `int getYear()` ：获取年
* `int getMonthValue()` ：获取月份（1~12）
* `int getDayOfMonth()` ：获取日
* `int getDayOfYear()` ：获取当前是一年中的第几天
* `DayOfWeek getDayOfWeek()` ：获取星期几
* `withYear、withMonth、withDayOfMonth、withDayOfYear` ：直接修改某个信息，返回新日期对象
* `plusYears、plusMonths、plusDays、plusWeeks` ：把某个信息加多少，返回新日期对象
* `minusYears、minusMonths、minusDays、minusWeeks` ：把某个信息减多少，返回新日期对象
* `equals、isBefore、isAfter` ：判断两个日期对象，是否相等，在前还是在后
* `format(DateTimeFormatter formatter)` ：格式化时间



```java
LocalDate now = LocalDate.now();
System.out.println(now.getYear());
System.out.println(now.getMonthValue());
System.out.println(now.getDayOfMonth());
System.out.println(now.getDayOfYear());
System.out.println(now.getDayOfWeek().getValue());

LocalDate localDate;
localDate = now.withYear(2023);
localDate = now.withMonth(10);
localDate = now.withDayOfMonth(14);
localDate = now.withDayOfYear(20);

localDate = now.plusYears(10);
localDate = now.plusMonths(10);
localDate = now.plusDays(10);
localDate = now.plusWeeks(2);

localDate = now.minusYears(10);
localDate = now.minusMonths(10);
localDate = now.minusDays(10);
localDate = now.minusWeeks(2);

LocalDate ld1 = LocalDate.of(2023, 12, 21);
LocalDate ld2 = LocalDate.of(2023, 2, 21);
System.out.println(ld1.equals(ld2));
System.out.println(ld1.isBefore(ld2));
System.out.println(ld1.isAfter(ld2));
```



#### LocalTime

方法：

* `int getHour()` ：获取小时
* `int getMinute()` ：获取分
* `int getSecond()` ：获取秒
* `int getNano()` ：获取纳秒
* `withHour、withMinute、withSecond、withNano` ：直接修改某个信息，返回新时间对象
* `plusHours、plusMinutes、plusSeconds、plusNanos` ：把某个信息加多少，返回新时间对象
* `minusHours、minusMinutes、minusSeconds、minusNanos` ：把某个信息减多少，返回新时间对象
* `equals、isBefore、isAfter` ：判断两个时间对象，是否相等，在前还是在后
* `format(DateTimeFormatter formatter)` ：格式化时间



```java
LocalTime now = LocalTime.now();
System.out.println(now.getHour());
System.out.println(now.getMinute());
System.out.println(now.getSecond());
System.out.println(now.getNano());

LocalTime localTime;
localTime = now.withHour(10);
localTime = now.withMinute(10);
localTime = now.withSecond(10);
localTime = now.withNano(10);

localTime = now.plusHours(10);
localTime = now.plusMinutes(10);
localTime = now.plusSeconds(10);
localTime = now.plusNanos(2);

localTime = now.minusHours(10);
localTime = now.minusMinutes(10);
localTime = now.minusSeconds(10);
localTime = now.minusNanos(2);

LocalTime lt1 = localTime.of(10, 20, 30, 2000);
LocalTime lt2 = localTime.of(10, 20, 30, 2000);
System.out.println(lt1.equals(lt2));
System.out.println(lt1.isBefore(lt2));
System.out.println(lt1.isAfter(lt2));
```



#### LocalDateTime

LocalDateTime 包含了 LocalDate 和 LocalTime 所有的的API。



### 时区 ZoneId、ZonedDateTime

世界标准时间 UTC 。中国标准时间是 UTC + 8小时。



ZoneId 方法：

* `static Set<String> getAvailableZoneIds()` ：获取所有时区
* `static ZoneId systemDefault()` ：获取系统默认时区
* `static ZoneId of(String zoneId)` ：获取一个指定时区



ZonedDateTime 方法：

* `static ZonedDateTime now()` ：获取当前时区的 ZonedDateTime 对象
* `static ZonedDateTime now(ZoneId zone)` ：获取指定时区的 ZonedDateTime 对象
* `getXxx()` ：获取年月日时分秒等，同 LocalDateTime
* `withXxx()` ：修改时间的方法，同 LocalDateTime
* `minusXxx()` ：减少时间的方法，同 LocalDateTime
* `plusXxx()` ：增加时间的方法，同 LocalDateTime



```java
ZoneId zoneId = ZoneId.systemDefault();
System.out.println(zoneId);             // Asia/Shanghai
System.out.println(zoneId.getId());     // Asia/Shanghai

System.out.println(ZoneId.getAvailableZoneIds());

ZoneId zoneId1 = ZoneId.of("America/New_York");
System.out.println(zoneId1);    // America/New_York


ZonedDateTime zdt1 = ZonedDateTime.now();
System.out.println(zdt1);
ZonedDateTime zdt2 = ZonedDateTime.now(zoneId1);
System.out.println(zdt2);
ZonedDateTime zdt3 = ZonedDateTime.now(Clock.systemUTC());  // 世界标准时间
System.out.println(zdt3);
```



### Instant

通过获取 Instant 的对象可以拿到此刻的时间，该时间由两部分组成：总秒数+不够1秒的纳秒数。

常用于做代码的性能分析，或者记录用户的操作时间点。



方法：

* `static Instant.now()` ：获取当前时间的 Instant 对象（标准时间）
* `getEpochSecond()` ：获取从1970-1-1 0:0:0 开始记录的秒数
* `getNano()` ：从时间线开始，获取从第二个开始的纳秒数
* `plusMillis、plusSeconds、plusNanos` ：增加时间方法
* `minusMillis、minusSeconds、minusNanos` ：减少时间方法
* `equals、isBefore、isAfter` ：判断时间方法



```java
Instant now = Instant.now();
System.out.println(now);

System.out.println(now.getEpochSecond());
System.out.println(now.getNano());

now.plusMillis(2000);
now.plusSeconds(2000);
now.plusNanos(2000);

now.minusMillis(2000);
now.minusSeconds(2000);
now.minusNanos(2000);
```



### DateTimeFormatter

用于时间的格式化、解析。

* `static DateTimeFormatter.ofPattern(时间格式)` ：获取格式化对象
* `String format(时间对象)` ：格式化时间

```java
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");

LocalDateTime now = LocalDateTime.now();
System.out.println(now);
System.out.println(formatter.format(now));  // 正向格式化

// 方式2
System.out.println(now.format(formatter));  // 反向格式化


LocalDateTime parse = LocalDateTime.parse("2023年10月22日 12:11:21", formatter);
System.out.println(parse);
```



### Period

用于计算两个 LocalDate 对象相差的年数、月数、天数。

* `static Period between(LocalDate start, LocalDate end)` ：传入2个日期对象，得到 Period 对象
* `int getYears()` ：计算隔几年，并返回
* `int getMonths()` ：计算隔几月，并返回
* `int getDays()` ：计算隔几天，并返回

```java
LocalDate start = LocalDate.of(2023, 10, 30);
LocalDate end = LocalDate.of(2023, 10, 20);

Period between = Period.between(start, end);
System.out.println(between.getYears());
System.out.println(between.getMonths());
System.out.println(between.getDays());	// -10
```



### Duration

用于计算两个时间对象相差的天数、小时数、分数、毫秒数、纳秒数等。支持 LocalTime、LocalDateTime、Instant 等时间。

* `static Duration between(开始时间对象, 截止时间对象)` ：传入两个时间对象，得到 Duration 对象
* `long toDays()` ：计算隔几天，并返回
* `long toHours()` ：计算隔几小时，并返回
* `long toMinutes()` ：计算隔几分钟，并返回
* `long toMillis()` ：计算隔几毫秒，并返回
* `long toNanos()` ：计算隔几纳秒，并返回

```java
LocalDateTime start = LocalDateTime.of(2023, 10, 12, 22, 10, 30);
LocalDateTime end = LocalDateTime.of(2023, 10, 12, 22, 20, 30);

Duration between = Duration.between(start, end);
System.out.println(between.toDays());
System.out.println(between.toHours());
System.out.println(between.toMinutes());
System.out.println(between.toMillis());
System.out.println(between.toNanos());
```



### MySQL 中的时间

| MySQL     | Java          |
| --------- | ------------- |
| date      | LocalDate     |
| time      | LocalTime     |
| datetime  | LocalDateTime |
| timestamp | LocalDateTime |





## System

System 代表程序所在的系统，也是一个工具类。

* `exit(int status)` ：终止当前运行的 java 虚拟机
* `currentTimeMillis()` ：返回当前系统的时间毫秒值形式。从 1970-1-1 0:0:0 到此刻的总毫秒数
* `setOut(PrintStream ps)` ：把系统默认的打印流对象改成自己设置的打印流

```java
System.out.println(System.currentTimeMillis());

System.exit(0);

System.out.println("end");  // 不会执行
```

```java
System.out.println("aaa");
System.out.println("bbb");

try (
        PrintStream ps = new PrintStream("src/resource/print.txt");
) {
    // 把系统默认的打印流对象改成自己设置的打印流
    System.setOut(ps);

    System.out.println("ccc");
    System.out.println("ddd");
} catch (IOException e) {
    e.printStackTrace();
}
```





## Runtime

Runtime 是一个单例类，代表程序所在的运行环境。

* `Runtime.getRuntime()` ：返回与当前java应用程序关联的运行时对象
* `exit(int status)` ：终止当前运行的虚拟机
* `availableProcessors()` ：返回java虚拟机可用的处理器数
* `totalMemory()` ：返回java虚拟机中的内存总量
* `freeMemory()` ：返回java虚拟机中的可用内存
* `exec(String command)` ：启动某个程序，并返回代表该程序的对象



```java
Runtime r = Runtime.getRuntime();

System.out.println(r.availableProcessors());
System.out.println(r.totalMemory());
System.out.println(r.totalMemory() / 1024.0 / 1024.0 + "MB");
System.out.println(r.freeMemory() / 1024.0 / 1024.0 + "MB");

r.exec("C:\\SourceTree.exe");

r.exit(0);
```





## File

File 是 java.io 包下的类，File 对象用于代表当前操作系统的文件或文件夹，File 封装的对象仅仅是一个路径名，这个路径可以是存在的，也允许是不存在的。

常见功能：

* 获取文件信息（大小、文件名、修改时间）
* 判断文件的类型
* 创建文件/文件夹
* 删除文件/文件夹

注意：File 类只能对文件本身进行操作，不能读写文件里面存储的数据。



构造器：

* `File(String pathname)` ：根据文件路径创建文件对象
* `File(String parent, String child)` ：根据父路径和子路径名字创建文件对象
* `File(File parent, String child)` ：根据父路径对应文件对象和子路径名字创建文件对象



方法：

* `boolean exists()` ：判断文件对象对应的文件路径是否存在
* `boolean isFile()` ：判断文件对象指代的是否是文件
* `boolean isDirectory()` ：判断文件对象指代的是否是文件夹
* `String getName()` ：获取文件的名称，包含后缀
* `long length()` ：获取文件的大小，返回字节个数
* `long lastModified()` ：获取文件的最后修改时间
* `String getPath()` ：获取创建文件对象时，使用的路径
* `String getAbsolutePath()` ：获取绝对路径
* `Boolean renameTo(File path)` ：重命名
* `boolean createNewFile()` ：创建一个空文件
* `boolean mkdir()` ：只能创建一级文件夹
* `boolean mkdirs()` ：可以创建多级文件夹
* `boolean delete()` ：默认只能删除文件或空文件夹。删除后的文件不会进入回收站
* `String[] list()` ：获取当前目录下所有的**一级文件/文件夹名称**到一个字符串数组中返回
* `File[] listFiles()` ：获取当前目录下所有的**一级文件对象**到一个文件对象数组中返回
  * 当主调是文件，或者路径不存在时，返回 null
  * 当主调是空文件夹时，返回一个长度为0的数组
  * **当主调是一个有内容的文件夹时，将里面所有一级文件和文件夹的路径放在 File 数组中返回**
  * 当主调是一个文件夹，且里面有隐藏文件时，将里面所有文件和文件夹的路径放在 File 数组中返回，包含隐藏文件
  * 当主调是一个文件夹，但是没有权限访问该文件夹时，返回 null



静态属性：

* `File.separator` ：路径分隔符





```java
File f1 = new File("d:/ab.txt");
File f2 = new File("d:\\ab.txt");
File f3 = new File("d:" + File.separator + "ab.txt");   // File.separator 路径分隔符
System.out.println(f3.length());            // 文件大小（字节数）
System.out.println(f3.exists());            // 文件路径是否存在
System.out.println(f3.isDirectory());       // 是否为文件夹
System.out.println(f3.isFile());            // 是否为文件
System.out.println(f3.getName());           // 获取文件名，包含后缀
System.out.println(f3.getPath());           // 获取创建文件对象时，使用的路径
System.out.println(f3.getAbsolutePath());   // 获取文件的绝对路径
System.out.println(f3.lastModified());      // 获取文件的最后修改时间

long time = f3.lastModified();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
System.out.println(sdf.format(time));


// File 对象可以指代一个不存在的文件路径
File f4 = new File("d:/demo.txt");
System.out.println(f4.length());
System.out.println(f4.exists());

// 文件在模块中，该怎么定位：
// 绝对定位：带盘符
File f5 = new File("D:\\000temp\\java-test\\test\\src\\resource\\hello.txt");
// 相对路径：不带盘符，默认是直接去工程下寻找文件的
File f6 = new File("src/resource/hello.txt");
System.out.println(f6.length());
System.out.println(f6.getPath());           // 获取文件路径
System.out.println(f6.getAbsolutePath());   // 获取文件的绝对路径


File f7 = new File("d:/abc.txt");
System.out.println(f7.createNewFile());     // 创建文件

File f8 = new File("d:/aa");
System.out.println(f8.mkdir()); // 创建一级文件夹

File f9 = new File("d:/a1/b1");
System.out.println(f9.mkdirs());    // 创建多级文件夹

System.out.println(f7.delete());    // 删除文件或空文件夹
System.out.println(f8.delete());
```



```java
public class Demo {
    public static void main(String[] args) throws IOException {

        // 遍历文件夹
        File f1 = new File("D:\\gitbook");
        String[] names = f1.list();
        for (String name : names) {
            System.out.println(name);
        }

        File[] files = f1.listFiles();
        for (File file : files) {
            System.out.println(file.getAbsoluteFile());
        }

        // 文件批量重命名
        File dir = new File("d:/aa");
        File[] files2 = dir.listFiles();
        for (File file : files2) {
            String name = file.getName();
            String index = name.substring(0, name.indexOf("、"));
            String lastName = name.substring(name.indexOf("、"));
            String newName = (Integer.parseInt(index) + 10) + lastName;

            file.renameTo(new File(dir, newName));  // 重命名
        }

        searchFile(new File("d:/"), "key.txt");

        getAllFiles(new File("d:/gitbook"));

    }

    // 遍历文件夹下所有内容
    public static void getAllFiles(File dir) {
        if (dir == null || !dir.exists() || dir.isFile()) {
            return;
        }

        File[] files = dir.listFiles();
        if (files != null && files.length > 0) {
            for (File file : files) {
                System.out.println(file.getAbsoluteFile());
                if (file.isDirectory()) {
                    getAllFiles(file);
                }
            }
        }
    }

    // 在指定路径下查找指定文件
    public static void searchFile(File dir, String fileName) {
        if (dir == null || !dir.exists() || dir.isFile()) {
            return;
        }

        File[] files = dir.listFiles();

        if (files != null && files.length > 0) {
            for (File file : files) {
                if (file.isFile()) {
                    if (file.getName().contains(fileName)) {
                        System.out.println("找到了：" + file.getAbsoluteFile());
                    }
                } else {
                    searchFile(file, fileName);
                }
            }
        }
    }

}
```



## TODO Files

方法：

* 





## IO 流

用于读写数据的（可以读写文件、网络中的数据）。注意：流使用完毕后，必须关闭，以释放资源。	



按流的方向分为：

* 输入流：I 指 Input，负责把数据读到内存中去
* 输出流：O 指 Output，负责写数据出去



按流中数据的最小单位分为：

* 字节流：适合操作所有类型的文件。比如：音频、视频、图片、文本文件的复制、转移等
* 字符流：适合操作纯文本文件。比如：读写 txt、java 文件等



流的四大类：

* 字节输入流：以内存为基准，可以把磁盘文件/网络中的数据以字节的形式读入到内存中
* 字节输出流：以内存为基准，把内存中的数据以字节写入到磁盘文件/网络中
* 字符输入流：以内存为基准，可以把磁盘文件/网络中的数据以字符的形式读入到内存中
* 字符输出流：以内存为基准，把内存中的数据以字符写入到磁盘文件/网络中





![IO流体系.drawio](http://qiniu.huangyihui.cn/doc/202511250123120.png)



### FileInputStream 字节输入流

文件字节输入流：以内存为基准，可以把磁盘文件中的数据以字节的形式读入到内存中。

注意：读写文本内容更适合用字符流，以免出现乱码。



构造器：

* `FileInputStream(String pathname)` ：常用，创建字节输入流管道与源文件接通
* `FileInputStream(File file)` ：创建字节输入流管道与源文件接通



方法：

* `int read()` ：每次读取一个字节返回，如果发现没有数据可读会返回 -1
* `int read(byte[] buffer)` ：每次用一个字节数组去读取数据，返回字节数组，没有数据可读会返回 -1
* `close()` ：关闭流





```java
// 创建文件字节输入流管道
FileInputStream is = new FileInputStream("src/resource/hello.txt");

// 读取文件的字节数据
int b1 = is.read();     // 每次读取一个字节返回，如果没有数据了，返回-1
System.out.println(b1);
System.out.println((char) b1);
int b2 = is.read();
System.out.println(b2);
System.out.println((char) b2);

// 循环读取
int b;
while ((b = is.read()) != -1) {
    System.out.println((char) b);
}

// 使用字节数组读取数据
byte[] buffer = new byte[20];
int len = is.read(buffer);
// 读取多少，倒出多少
String rs = new String(buffer, 0, len);
System.out.println(rs);
System.out.println("当次读取的字节数量：" + len);


//  使用字节数组循环读取数据
byte[] buffer = new byte[5];
int len;
while ((len = is.read(buffer)) != -1) {
    String rs = new String(buffer, 0, len);
    System.out.println(rs);
}

// 一次性读取完文件的全部字节到一个字节数组中去，如果文件过大，可能引起内存溢出
File file = new File("src/resource/hello.txt");
long size = file.length();
byte[] buffer = new byte[(int) size];
int len = is.read(buffer);
System.out.println(new String(buffer, 0, len));

// 一次性读取完文件
byte[] bytes = Files.readAllBytes(Paths.get("src/resource/hello.txt"));
System.out.println(new String(bytes));

// 流使用完毕后，必须关闭！释放系统资源
is.close();
```





### FileOutputStream 字节输出流

文件字节输出流：以内存为基准，把内存中的数据以字节的形式写出到文件中去。



构造器：

* `FileOutputStream(String filepath [, boolean append])` ：创建字节输入流管道与源文件接通，append 表示是否可追加数据
* `FileOutputStream(File file [, boolean append])` ：创建字节输入流管道与源文件接通，append 表示是否可追加数据



方法：

* `write(int a)` ：写一个字节出去
* `write(bytep[] buffer)` ：写一个字节数组出去
* `write(byte[] buffer, int pos, int len)` ：写一个字节数组的一部分出去
* `close()` ：关闭流



```java
// 创建一个字节输出流管道与目标文件接通
FileOutputStream os = new FileOutputStream("src/resource/hello.txt", true);

// 写入字节数据
os.write(97);   // 97就是一个字节，代表a
os.write('b');
os.write('哈');  // 中文为三个字节，默认只能写出去一个字节，所以会乱码

byte[] bytes = "你好".getBytes();
os.write(bytes);
os.write(bytes, 0, 3);
os.write("\r\n".getBytes());    // 换行符

os.close();
```



```java
// 复制文件
FileInputStream is = new FileInputStream("c:/logo.jpg");
FileOutputStream os = new FileOutputStream("d:/logo.jpg");
byte[] buffer = new byte[1024];
int len;
while ((len = is.read(buffer)) != -1) {
    os.write(buffer, 0, len);
}

os.close();
is.close();
System.out.println("复制完成");
```



### FileReader 字符输入流

字符输入流：以内存为基准，可以把文件中的数据以字符的形式读入到内存中去。



构造器：

* `FileReader(String fileName)` ：创建字符输入流管道与源文件接通
* `FileReader(File file)` ：创建字符输入流管道与源文件接通



方法：

* `int read()` ：每次读取一个字符返回，如果发现没有数据可读会返回 -1
* `int read(char[] buffer)` ：每次用一个字符数组去读取数据，返回字符数组读取了多少个字符，如果发现没有数据可读会返回 -1



```java
try (
        FileReader fr = new FileReader("src/resource/hello.txt");
) {
    int c;
    while ((c = fr.read()) != -1) {
        System.out.println((char) c);
    }

    char[] buffer = new char[3];
    int len;
    while ((len = fr.read(buffer)) != -1) {
        System.out.println(new String(buffer, 0, len));
    }

} catch (IOException e) {
    e.printStackTrace();
}
```



### FileWriter 字符输出流

字符输出流：以内存为基准，把内存中的数据以字符的形式写出到文件中去。

字符输出流写出数据后，必须刷新流，或者关闭流，写出去的数据才能生效。



构造器：

* `FileWriter(String fileName [, boolean append])` ：创建字符输入流管道与源文件路径接通，append 表示是否可追加数据
* `FileWriter(File file [, boolean append])` ：创建字符输入流管道与源文件对象接通，append 表示是否可追加数据



方法：

* `write(int c)` ：写一个字符
* `write(String str)` ：写一个字符串
* `write(String str, int off, int len)` ：写一个字符串的一部分
* `write(char[] buffer)` ：写入一个字符数组
* `write(char[] buffer, int off, int len)` ：写入字符数组的一部分
* `flush()` ：刷新流。将内存中缓存的数据立即写到文件中去生效
* `close()` ：关闭流，包含了刷新



```java
try (
        FileWriter fr = new FileWriter("src/resource/hello2.txt", true);
) {
    fr.write(97);
    fr.write('瓜');
    fr.write("hello");
    fr.write("abcdefg", 0, 3);
    fr.write("\r\n");
    char[] buffer = {'过', '年', '啦'};
    fr.write(buffer);
    fr.write(buffer, 0, 2);

    fr.flush();
} catch (IOException e) {
    e.printStackTrace();
}
```



### 缓冲流

缓冲流：对原始流进行包装，以提高原始流读写数据的性能。

原理：自带了8KB缓冲池。



构造器：

* `BufferedInputStream(InputStream in)` ：把低级的字节输入流包装成一个高级的缓冲字节输入流，以提高性能
* `BufferedOutputStream(OutputStream out)` ：把低级的字节输出流包装成一个高级的缓冲字节输出流
* `BufferedReader(Reader in)` ：把字符输入流包装成字符缓冲输入流管道
* `BufferedWriter(Writer out)` ：把字符输出流包装成字符缓冲输出流管道



字符缓冲输入流的方法：

* `String readLine()` ：读取一行数据返回，如果没有数据可读了，会返回 null



字符缓冲输出流的方法：

* `newLine()` ：换行



```java
// 字节缓冲流
try (
        FileInputStream is = new FileInputStream("src/resource/hello.txt");
        InputStream bis = new BufferedInputStream(is);

        FileOutputStream os = new FileOutputStream("src/resource/hello2.txt");
        OutputStream bos = new BufferedOutputStream(os);
) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = bis.read(buffer)) != -1) {
        bos.write(buffer, 0, len);
    }
    System.out.println("复制完成");
} catch (IOException e) {
    e.printStackTrace();
}


// 字符缓冲输入流
try (
        FileReader fr = new FileReader("src/resource/hello2.txt");
        BufferedReader br = new BufferedReader(fr);
) {
    char[] buffer = new char[3];
    int len;
    while ((len = br.read(buffer)) != -1) {
        System.out.print(new String(buffer, 0, len));
    }

    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }

} catch (IOException e) {
    e.printStackTrace();
}


//  字符缓冲输出流
try (
        FileWriter fw = new FileWriter("src/resource/hello2.txt");
        BufferedWriter bw = new BufferedWriter(fw);
) {
    bw.write("Hello World");
    bw.newLine();

    bw.write("accc");

} catch (IOException e) {
    e.printStackTrace();
}
```



```java
// 复制文件
try (
        FileInputStream is = new FileInputStream("src/resource/hello.txt");
        BufferedInputStream bis = new BufferedInputStream(is);

        FileOutputStream os = new FileOutputStream("src/resource/copy.txt");
        BufferedOutputStream bos = new BufferedOutputStream(os);
) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = bis.read(buffer)) != -1) {
        bos.write(buffer, 0, len);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```



### 转换流

#### InputStreamReader

**字符输入转换流**：解决不同编码时，读取文本内容乱码的问题。

解决思路：先获取文件的原始字节流，再将其按真实的字符集编码转成字符流。

构造器：

* `InputStreamReader(InputStream in)` ：把原始的字节输入流，按照代码默认编码转成字符输入流（与直接用 FileReader 的效果一样）
* `InputStreamReader(InputStream in, String charsetName)` ：把原始的字节输入流，按照指定字符集编码转成字符输入流



```java
// 字符输入转换流
try (
        FileInputStream is = new FileInputStream("src/resource/hello.txt");
        Reader isr = new InputStreamReader(is, "GBK");
        BufferedReader br = new BufferedReader(isr);
) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }

} catch (IOException e) {
    e.printStackTrace();
}
```





#### OutputStreamWriter

**字符输出转换流**：控制写出去的字符使用什么字符集编码。

解决思路：获取字节输出流，再按照指定的字符集编码将其转换成字符输出流。

构造器：

* `OutputStreamWriter(OutputStream out)` ：把原始的字节输出流，按照代码默认编码转换成字符输出流
* `OutputStreamWriter(OutputStream out, String charsetName)` ：把原始的字节输出流，按照指定编码转换成字符输出流



```java
// 方式1：OutputStreamWriter 字符输出转换流
try (
        FileOutputStream os = new FileOutputStream("src/resource/hello.txt");
        Writer osw = new OutputStreamWriter(os, "GBK");
        BufferedWriter bw = new BufferedWriter(osw);
) {
    bw.write("你好");
} catch (IOException e) {
    e.printStackTrace();
}


// 方式2：通过getBytes对字符进行编码
String data = "你好";
byte[] bytes = data.getBytes("GBK");
```





### 打印流

打印流可以实现更方便、更高效的打印数据出去。

PrintStream 和 PrintWriter 的区别：

* 打印数据的功能上是一模一样的，都是使用方便，性能高效
* PrintStream 继承自字节输出流 OutputStream，因此支持写字节数据的方法
* PrintWriter 继承自字符输出流 Writer，因此支持写字符数据出去



#### PrintStream

构造器：

* `PrintStream(OutputStream / File / String)` ：打印流直接通向字节输出流/文件/文件路径
* `PrintStream(String fileName, String encoding)` ：可以指定写出去的字符编码
* `PrintStream(OutputStream out, boolean autoFlush)` ：可以指定实现自动刷新
* `PrintStream(OutputStream out, boolean autoFlush, String encoding)` ：可以指定实现自动刷新，并可指定字符的编码



方法：

* `println()` ：打印任意类型的数据出去
* `write()` ：可以支持写字节数据出去



```java
try (
        PrintStream ps = new PrintStream("src/resource/hello.txt");
) {
    ps.println("Hello World");
    ps.println(97);
    ps.println('a');
    ps.println(true);
    ps.println(99.5);
} catch (IOException e) {
    e.printStackTrace();
}
```



#### PrintWriter

构造器：

* `PrintWriter(OutputStream / Writer / File / String)` ：打印流直接通向字节输出流/文件/文件路径
* `PrintWriter(String fileName, String encoding)` ：可以指定写出去的字符编码
* `PrintWriter(OutputStream out, boolean autoFlush)` ：可以指定实现自动刷新
* `PrintWriter(OutputStream out, boolean autoFlush, String encoding)` ：可以指定实现自动刷新，并可指定字符的编码



方法：

* `println()` ：打印任意类型的数据出去
* `write()` ：可以支持写字符数据出去



```java
try (
        PrintWriter pw = new PrintWriter("src/resource/hello2.txt");
) {
    pw.println("Hello World");
    pw.println(97);
    pw.println('a');
    pw.println(true);
    pw.println(99.5);

    pw.write(97);   // a
} catch (IOException e) {
    e.printStackTrace();
}
```



#### 输出语句的重定向

应用：可以把输出语句的打印位置改到某个文件中去。

```java
System.out.println("aaa");
System.out.println("bbb");

try (
        PrintStream ps = new PrintStream("src/resource/print.txt");
) {
    // 把系统默认的打印流对象改成自己设置的打印流
    System.setOut(ps);

    System.out.println("ccc");
    System.out.println("ddd");
} catch (IOException e) {
    e.printStackTrace();
}
```





### 数据流



#### DataOutputStream

数据输出流：允许把数据和其类型一并写出去。

构造器：

* `DataOutputStream(OutputStream out)` ：创建新数据输出流包装基础的字节输出流



方法：

* `writeByte(int v)` ：将 byte 类型的数据写入基础的字节输出流
* `writeInt(int v)` ：将 int 类型的数据写入基础的字节输出流
* `writeDouble(Double v)` ：将 double 类型的数据写入基础的字节输出流
* `writeUTF(String v)` ：将字符串数据以 UTF-8 编码成字节写入基础的字节输出流
* `write()` ：支持写字节数据出去



```java
try (
        DataOutputStream dos = new DataOutputStream(new FileOutputStream("src/resource/hello.txt"));
) {
    dos.writeInt(97);
    dos.writeDouble(95.2);
    dos.writeBoolean(true);
    dos.writeUTF("你好");

} catch (IOException e) {
    e.printStackTrace();
}
```



#### DataInputStream

数据输入流：用于读取数据输出流写出去的数据。

构造器：

* `DataInputStream(InputStream in)` ：创建新数据输入流包装基础的字节输入流



方法：

* `readByte()` ：读取字节数据返回
* `readInt()` ：读取 int 类型的数据返回
* `readDouble()` ：读取 double 类型的数据返回
* `readUTF()` ：读取字符串数据 UTF-8 返回
* `read()` ：支持读字节数据进来



```java
try (
        DataInputStream dis = new DataInputStream(new FileInputStream("src/resource/hello.txt"));
) {
    int i = dis.readInt();
    System.out.println(i);

    double d = dis.readDouble();
    System.out.println(d);

    boolean b = dis.readBoolean();
    System.out.println(b);

    String s = dis.readUTF();
    System.out.println(s);
} catch (IOException e) {
    e.printStackTrace();
}
```





### 序列化流



#### ObjectOutputStream

可以把对象序列化：把 Java 对象写入到文件中去。

如果要一次序列化多个对象，可以用一个 ArrayList 集合存储多个对象，然后直接对集合进行序列化即可。ArrayList 集合已经实现了序列化接口。



构造器：

* `ObjectOutputStream(OutputStream out)` ：创建对象字节输出流，包装基础的字节输出流



方法：

* `writeObject(Object o)` ：把对象写出去。
  * 对象如果需要序列化，必须实现序列化接口 `java.io.Serializable`



```java
try (
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("src/resource/hello.txt"));
) {
    Student student = new Student("lisi", 20);
    oos.writeObject(student);
    System.out.println("success");

} catch (IOException e) {
    e.printStackTrace();
}
```

```java
// 实现 Serializable 接口
public class Student implements Serializable {

    private String name;

    // transient 表示这个成员变量将不参与序列化
    private transient int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
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

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```





#### ObjectInputStream

可以把对象反序列化：把文件里的 Java 对象读出来。

构造器：

* `ObjectInputStream(InputStream in)` ：创建对象字节输入流，包装基础的字节输入流



方法：

* `Object readObject()` ：把存储在文件中的 Java 对象读出来



```java
try (
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("src/resource/hello.txt"));
) {
    Student student = (Student) ois.readObject();
    System.out.println(student);
} catch (Exception e) {
    e.printStackTrace();
}
```







### IO框架



#### Commons-io

[Commons-io](https://commons.apache.org/proper/commons-io/) 是 apache 提供的一组有关 IO 操作的小框架，目的是提高 IO 流的开发效率。



FileUtils 类提供的方法：

* `copyFile(File srcFile, File destFile)` ：复制文件
* `copyDirectory(File srcDir, File destDir)` ：复制文件夹
* `deleteDirectory(File directory)` ：删除文件夹
* `String readFileToString(File file, String charsetName)` ：读数据
* `writeStringToFile(File file, String data, String charsetName, boolean append)` ：写数据



IOUtils 类提供的方法：

* `int copy(InputStream inputStream, OutputStream outputStream)` ：复制文件
* `int copy(Reader reader, Writer writer)` ：复制文件
* `write(String data, OutputStream output, String charsetName)` ：写数据



```java
FileUtils.copyFile(new File("src/resource/hello.txt"), new File("src/resource/copy.txt"));
FileUtils.copyDirectory(new File("C:\\Users\\yh\\Desktop\\imgs"), new File("D:\\imgs2"));
FileUtils.deleteDirectory(new File("D:\\imgs2"));

String s = FileUtils.readFileToString(new File("src/resource/hello.txt"));
System.out.println(s);
FileUtils.writeStringToFile(new File("src/resource/hello.txt"), "你好", "UTF-8", true);
```



### 释放资源

```java
// try-with-resource 释放资源方案
try (
        // 注意：这里只能放置资源对象，否则报错
        // 资源一般指的是实现了 AutoCloseable 接口，资源都会有一个 close方法
        // 该资源使用完毕后，会自动调用其close方法，完成对资源的释放操作

        // int a = 20;  // 报错

        FileInputStream is = new FileInputStream("c:/logo.jpg");
        FileOutputStream os = new FileOutputStream("d:/logo.jpg");
) {

    byte[] buffer = new byte[1024];
    int len;
    while ((len = is.read(buffer)) != -1) {
        os.write(buffer, 0, len);
    }

    System.out.println("复制完成");
} catch (IOException e) {
    e.printStackTrace();
}
```





## Optional

Optional 类是 Java 8 的新特性，是一个可以为 null 的容器对象。



* `Optional.of(object)` ：传递参数，如果 of 中的对象是 null，就报空指针异常

* `Optional.ofNullable(object)` ：允许 ofNullable 传递 null 对象

* `Optional.empty()` ：返回空的 Optional 实例

* `Optional.isPresent()` ：判断 Optional 实例是否为空

* `Optional.orElse(object)` ：如果 optional 为空的话，返回 orElse 中的对象

* `Optional.get()` ：获取 optional 中的 T 对象

* `Optional.map()` ：如果 optional 不为 null，则执行 map 方法中的映射函数得到返回值

  





























































