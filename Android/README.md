# Android



## 介绍

官网：https://developer.android.google.cn

开发文档：https://developer.android.google.cn/develop



### Android 主要版本

| Android 版本号 | 对应 API | 发布时间   |
| -------------- | -------- | ---------- |
| Android 13     | 33       | 2022年2月  |
| Android 12     | 31       | 2021年10月 |
| Android 11     | 30       | 2020年9月  |
| Android 10     | 29       | 2019年8月  |
| Android 9      | 28       | 2018年8月  |
| Android 8      | 26/27    | 2017年8月  |
| Android 7      | 24/25    | 2016年8月  |
| Android 6      | 23       | 2015年9月  |
| Android 5      | 21/22    | 2014年6月  |
| Android 4.4    | 19/20    | 2013年9月  |



### Android Studio

Android Studio 是 Android 应用开发工具，由谷歌公司在 2013 年 5 月推出。

[下载地址](https://developer.android.google.cn/studio)

| Android Studio 版本号 | 发布时间   |
| --------------------- | ---------- |
| Android Studio 4.0    | 2020年5月  |
| Android Studio 3.0    | 2017年10月 |
| Android Studio 2.0    | 2016年4月  |
| Android Studio 1.0    | 2013年5月  |



如需自动引入所需的包，可以在设置中启用 `Insert import on paste` 功能。

注意：每个版本的 Android Studio 都有对应的 Gradle 版本，只有两者的版本正确对应，App 工程才能成功编译。



### SDK

SDK 全称为 Software Development Kit (软件开发工具包)，它可将 App 源码编译为可执行的 App 应用。



### ADB

ADB 全称为 Android Debug Bridge (安卓调试桥)，用于在设备间进行应用调试。



### 四大组件

Android 提供的4大组件，分别是活动 Activity、广播 Broadcast、服务 Service和内容提供器 ContentProvider。





## App 工程目录结构

App 工程分为两个层次，第一个层次是项目，另一个层次是模块。

模块依附于项目，每个项目至少有一个模块，也能拥有多个模块。

一般所言的 ”编译运行 App“，指的是**运行某个模块，而非运行某个项目**，因为模块才对应实际的 App。



App 项目下面有两个分类：app (代表 app 模块)、Gradle Scripts。

app 下面有三个子目录，Gradle Scripts 下面主要是工程的编译配置文件。



### app

* `AndroidManifest.xml` ：它是 App 的运行配置文件。
* java 子目录 ：存放当前模块的 Java 源代码。
* res 子目录 ：存放当前模块的资源文件。
  * drawable 目录 ：存放图形描述文件与图片文件。
  * layout 目录 ：存放 App 页面的布局文件。
  * mipmap 目录 ：存放 App 的启动图标。
  * values 目录 ：存放一些常量定义文件。例如字符串常量 `strings.xml` 、颜色常量 `colors.xml` 等。



#### AndroidManifest.xml

该文件指定了 App 的运行配置信息，它是一个 XML 描述文件。系统需要根据里面的内容运行 App 的代码，显示界面。

* `manifest` ：根节点。
* `application` ：应用描述节点。
  * `android:allowBackup` ：是否允许应用	备份。
  * `android:icon` ：指定 App 在手机屏幕上显示的图标。
  * `android:label` ：指定 App 在手机屏幕上显示的名称。
  * `android:roundIcon` ：指定 App 的圆角图标。
  * `android:supportsRtl` ：是否支持阿拉伯语 / 波斯语这种从右往左的文字排列顺序。
  * `android:theme` ：指定 App 的显示风格。
* `activity` ：活动界面的注册声明节点。只有正确配置了 activity 节点，才能在运行时访问对应的活动页面。
* `intent-filter` ：过滤规则节点。
* `action` ：`android:name="android.intent.action.MAIN"` 表示该页面是 App 的入口页面。
* `category` ：`android:name="android.intent.category.LAUNCHER"` 表示在手机屏幕上显示 App 图标。如果同时有两个 `activity` 节点都设置了，那么桌面就会显示两个 App 图标。



```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```



### Gradle Scripts

Gradle 是一个项目自动化构建工具，帮我们做了依赖、打包、部署、发布、各种渠道的差异管理等工作。



主要是工程的编译配置文件，主要有：

* `build.gradle` ：该文件分为项目级与模块级两种，用于描述 App 工程的编译规则。
* `proguard-rules.pro` ：用于描述 Java 代码的混淆规则。
* `gradle.properties` ：用于配置编译工程的命令行参数，一般无须改动。
* `settings.gradle` ：配置了需要编译哪些模块。初始内容为 `include(":app")` ，表示只编译 app 模块。
* `local.properties` ：项目的本地配置文件，它在工程编译时自动生成，用于描述开发者电脑的环境配置，包括 SDK 的本地路径、NDK 的本地路径等。



#### 项目级别 build.gradle

项目级别的 build.gradle 指定了当前项目的总体编译规则。

```kotlin
buildscript {
		// 用于设置Android Studio插件的网络仓库地址
    repositories {
        // 以下四行添加阿里云的仓库地址，方便国内开发者下载相关插件
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'https://maven.aliyun.com/repository/google'}
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven { url 'https://maven.aliyun.com/repository/public'}
        google()
        jcenter()
    }
    dependencies {
        // 配置gradle插件版本，下面的版本号就是Android Studio的版本号
        classpath 'com.android.tools.build:gradle:4.1.0'
    }
}
```



#### 模块级别 build.gradle

模块级别的 build.gradle 对应于具体模块，每个模块都有自己的 build.gradle，它指定了当前模块的详细编译规则。

```kotlin
plugins {
    id("com.android.application")
}

android {
    namespace = "com.example.helloworld"
  	// 指定编译用的 SDK 版本号
    compileSdk = 34

    defaultConfig {
      	// 指定该模块的应用编号，也就是 App 的包名
        applicationId = "com.example.helloworld"
      	// 指定 App 适合运行的最小 SDK 版本号
        minSdk = 24
      	// 指定目标设备的 SDK 版本号，表示 App 最希望在哪个版本的 Android 上运行
        targetSdk = 34
     		// 指定 App 的应用版本号
        versionCode = 1
      	// 指定 App 的应用版本名称
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

// 指定 App 编译的依赖信息
dependencies {
  	// 指定引用jar包的路径
  	implementation fileTree(dir: 'libs', include: ['*.jar'])
		// 指定编译 Android 的高版本支持库
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.9.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
  	// 指定单元测试编译用的 junit 版本号
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}
```



为啥这两种编译配置文件的扩展名都是 Gradle 呢？这是因为它们采用了 Gradle 工具完成编译构建操作。

Gradle 工具的版本配置在 `gradle\wrapper\gradle-wrapper.properties`，也可以依次选择菜单 `File→Project Structure→Project`，在弹出的设置页面中修改 Gradle Version。注意每个版本的 Android Studio 都有对应的 Gradle 版本，只有二者的版本正确对应，App 工程才能成功编译。比如Android Studio 4.1对应的Gradle版本为6.5，更多的版本对应关系见 https://developer.android.google.cn/studio/releases/gradle-plugin#updating-plugin。





#### TODO 代码混淆

在应用发布前，就需要对代码进行混淆处理，从而让我们代码即使被反编译，也难以阅读。

文档：https://mp.weixin.qq.com/s/CmFRAivUN0yc5QDXpdaHqw



## 创建新的 App 页面

完整的页面创建过程包括三个步骤：

* 在 layout 目录下创建 XML 文件
* 创建与 XML 文件对应的 Java 代码
* 在 AndroidManifest.xml 中注册页面配置

还可以通过 `右键菜单 → Activity → Empty Views Activity` ，按弹出框快速创建窗口。



## Base Demo

### Hello World

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tool="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

  	<!--  设置 id 为 tv  -->
    <TextView
        android:id="@+id/tv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
       	tool:text="开发调试时才会显示"
        android:text="Hello World!" />

</LinearLayout>
```



```java
package com.example.helloworld;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
      	// 往当前活动界面填充activity_main.xml的布局内容
        setContentView(R.layout.activity_main);

        // 获取 id 为 tv 的 TextView，并修改其文本
        TextView tv = findViewById(R.id.tv);
        tv.setText("你好");
    }
}
```



```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld"
        tools:targetApi="31">
				
      	<!-- 入口 -->
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```



### 新建页面并跳转

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity3"
            android:exported="false" />

				<!-- 入口 -->
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
      
      	<!-- 注册页面 -->
        <activity android:name=".MainActivity2" />
    </application>

</manifest>
```



```java
package com.example.helloworld;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 获取按钮，并添加点击事件监听
        Button button = findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 跳转页面
                Intent intent = new Intent();
                intent.setClass(MainActivity.this, MainActivity2.class);
                startActivity(intent);
            }
        });
    }
  
    @Override
    protected void onResume() {
        super.onResume();
        goNextPage();
    }

    // 跳到下个页面
    private void goNextPage() {
        TextView tv_hello = findViewById(R.id.tv_hello);
        tv_hello.setText("3秒后进入下个页面");
        // 延迟3秒（3000毫秒）后启动任务mGoNext
        new Handler(Looper.myLooper()).postDelayed(mGoNext, 3000);
    }

    private Runnable mGoNext = new Runnable() {
        @Override
        public void run() {
            // 活动页面跳转，从MainActivity跳到Main2Activity
            startActivity(new Intent(MainActivity.this, Main2Activity.class));
        }
    };
}
```



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="跳转" />
</LinearLayout>
```





## 尺寸单位

* px ：它是手机屏幕的最小显示单位，与设置的显示屏有关
* dp/dip ：它是与设备无关的显示单位，只与屏幕的尺寸有关
  * 对于相同分辨率的手机，屏幕越大，同 dp 的组件占用屏幕比例越小
  * 对于相同尺寸的手机，即使分辨率不同，同 dp 的组件占用屏幕比例也相同
  * dp 的 UI 效果只在相同尺寸的屏幕上相同，如果屏幕尺寸差异过大，则需要重做 dp 适配
* sp ：推荐。它专门用来设置字体大小，在系统设置中可以调整字体大小





## 组件

### TextView

* 设置文本内容
  * 通过属性 `android:text` 设置
  * 通过 TextView 对象的 `setText` 方法设置
* 设置文本大小
  * 通过属性 `android:textSize` 设置，需要指定字号单位
  * 通过 TextView 对象的 `setTextSize` 方法设置，默认字号单位为 `sp`
* 设置文本颜色
  * 通过属性 `android:textColor` 设置，色值由透明度 alpha 和 RGB 联合定义。
    * 八位表达方式：例如 `FF00FF00` ，透明度为 FF 表示完全不透明，为 00 表示完全透明
    * 六位表达方式：例如 `0000FF` ，默认不透明
  * 通过 TextView 对象的 `setTextColor` 方法设置
    * 色值可以从 `Color` 类获取
    * 以 `0x十六进制色值` 方式设置。如果未声明透明度，则默认为透明的。
* 设置背景颜色或背景图片
  * 通过属性 `android:background` 设置，参数和设置文本颜色相同
  * 通过 TextView 对象的 `setBackgroundResource` 方法设置
  * 通过 TextView 对象的 `setBackgroundColor` 方法仅设置背景色
* 设置行数：通过属性 `android:lines` 设置，参数为整数
* 设置最大行数：通过属性 `android:maxLines` 设置，参数为整数
* 设置阴影
  * `android:shadowColor` ：阴影颜色。需要与 shadowRadius 一起使用
  * `android:shadowRadius` ：阴影的模糊程度。建议为3
  * `android:shadowDx` ：阴影在水平方向的偏移
  * `android:shadowDy` ：阴影在垂直方向的偏移
  * `setShadowLayer()` ：设置阴影效果。
* 跑马灯效果
  * `android:singleLine` ：内容是否单行显示
  * `android:focusable` ：是否可以获取焦点
  * `android:focusableInTouchMode` ：控制视图在触摸模式下是否可以聚焦
  * `android:ellipsize` ：在哪里省略文本
  * `android:marqueeRepeatLimit` ：字幕动画重复的次数
* `drawable**` 属性：设置文本周围的图标，可以同时显示文本和图片。该属性也可以用在 Button 上。
  * `drawableTop` ：指定文字上方的图片
  * `drawableBottom` ：指定文字下方的图片
  * `drawableLeft` ：指定文字左边的图片
  * `drawableRight` ：指定文字右边的图片
* `drawablePadding` 属性：指定图片与文字的间距



```xml
<TextView
    android:id="@+id/tv"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="你好"
    android:textColor="#FF00FF00"
    android:textColor="#0000FF"
    android:background="#000000"
    android:lines="3"
    android:shadowColor="#ff0000"
    android:shadowRadius="3"
    android:shadowDx="10"
    android:shadowDy="10"
    android:drawableRight="@/drawable/icon1.png"
    android:drawablePadding="5dp"
    android:textSize="17dp" />

<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/app_name"
    android:textColor="@color/blue" />

<!--  省略号效果  -->
<TextView
    android:layout_width="100dp"
    android:layout_height="wrap_content"
    android:text="省略号"
    android:maxLines="1"
    android:ellipsize="end"
    android:textColor="#000000" />


<!--  跑马灯效果  -->
<TextView
    android:id="@+id/tv"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:textSize="20sp"
    android:singleLine="true"
    android:focusable="true"
    android:focusableInTouchMode="true"
    android:ellipsize="marquee"
    android:marqueeRepeatLimit="marquee_forever"
    android:text="hello hello hello hello hello hello hello hello hello hello">

    <!-- 获取焦点 -->
    <requestFocus />
</TextView>
```

```java
TextView tv = findViewById(R.id.tv);
tv.setText("Hello");
tv.setText(R.string.app_name);

tv.setTextSize(50);

tv.setTextColor(Color.RED);
tv.setTextColor(0x00ff00);  // 不设置透明度，则默认为透明
tv.setTextColor(0xff00ff00);

tv.setBackgroundColor(Color.GRAY);
tv.setBackgroundColor(0xff00ff00);
tv.setBackgroundResource(R.drawable.bg1)

tv.setShadowLayer(10, 10, 10, Color.RED);   // 设置阴影效果

tv.getPaint().setFlags(Paint.STRIKE_THRE_TEXT_FLAG);	// 删除线
tv.getPaint().setAntiAlias(true); // 去除锯齿

tv.getPaint().setFlags(Paint.UNDERLINE_TEXT_FLAG);	// 下划线
```

```xml
<resources>
    <string name="app_name">component</string>
</resources>
```



### Button

按钮组件 Button 由 TextView 派生而来，所以文本视图拥有的属性和方法，包括文本内容、文本大小、文本颜色等，按钮控件均能使用。它们之间的区别有：

* Button 有默认的按钮背景，TextView 默认无背景
* Button 的内部文本默认居中对齐，TextView 默认靠左对齐



Button 的其他衍生控件：ToggleButton、Switch。



* `textAllCaps` 属性：布尔值，是否将英文字母转为大写。默认 true。
* `onClick` 属性：点击事件触发哪个方法。不推荐。
* 事件监听器：
  * 点击监听器，通过 `setOnClickListener` 方法设置。按钮被按住少于 500 毫秒时，会触发点击事件。
  * 长按监听器，通过 `setOnLongClickListener` 方法设置。按钮被按住超过 500 毫秒时，会触发长按事件。长按事件需要有 `return`
  * 触摸监听器，通过 `setOnTouchListener` 方法设置。可能会触发多次。
  * 事件传递顺序： `touch > longClick > click`
  * 还提供了很多不同的监听事件，它们都是以 `setOn` 开头的方法。
  * 点击监听器和长按监听器不局限于按钮控件，其实它们都来源于视图基类View，凡是从 View 派生而来的各类控件，均可注册点击监听器和长按监听器。譬如文本视图 TextView。
* `enabled` 属性：是否允许点击。属性值为 true 表示允许(默认值)，false 表示不允许。当不允许点击时，按钮默认为灰色背景。可以通过 `setEnabled` 方法修改 `enabled`  属性值。
* `drawable**` 属性：设置文本周围的图标，可以同时显示文本和图片。该属性也可以用在 TextView 上。
  * `drawableTop` ：指定文字上方的图片
  * `drawableBottom` ：指定文字下方的图片
  * `drawableLeft` ：指定文字左边的图片
  * `drawableRight` ：指定文字右边的图片
* `drawablePadding` 属性：指定图片与文字的间距
* `foreground` 属性：前景色
* `backgroundTint` 属性：背景色调



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="10dp">

    <TextView
        android:id="@+id/tv"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="hello" />

    <Button
        android:id="@+id/btn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@drawable/bg_btn"
        android:onClick="handleClick"
        android:enabled="true"
        android:text="hello"
        android:textAllCaps="true" />
  
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:drawableTop="@drawable/bg"
        android:drawablePadding="5dp"
        android:background="#F5F5F5"
        android:text="图标在上"/>

</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity {

    private TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Ctrl + Alt + F  快捷键：可以快速将变量设置为私有变量
        tv = findViewById(R.id.tv);
      
       	Button btn = findViewById(R.id.btn);
        btn.setEnabled(true);	// 修改 enabled 属性
    }

    public void handleClick(View view) {
        String desc = String.format("%s 您点击了按钮：%s", Utils.getNowTime(), ((Button) view).getText());
        tv.setText(desc);
    }
}
```

```java
public class Utils {
    // 获取当前时间
    public static String getNowTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(new Date());
    }
}
```



#### 实现点击/长按事件

**实现方式1：**

```java
public class MainActivity extends AppCompatActivity {

    private TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        tv = findViewById(R.id.tv);
        Button btn = findViewById(R.id.btn);
        btn.setOnClickListener(new MyOnClickListener(tv));
    }

  	// 通过内部类 implements View.OnClickListener，并重写 onClick 方法实现点击事件
    class MyOnClickListener implements View.OnClickListener {
        private final TextView tv;

        public MyOnClickListener(TextView tv) {
            this.tv = tv;
        }

        @Override
        public void onClick(View view) {
            String desc = String.format("%s 您点击了按钮：%s", Utils.getNowTime(), ((Button) view).getText());
            tv.setText(desc);
        }
    }
}
```



**实现方式2：**

```java
// 外部类 implements View.OnClickListener，再重写 onClick 方法实现点击事件
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tv = findViewById(R.id.tv);
        Button btn = findViewById(R.id.btn);
        btn.setOnClickListener(this);

        Button btn2 = findViewById(R.id.btn2);
        btn2.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.btn) {
            // 根据不同的按钮，实现不同的点击效果
        }

        String desc = String.format("%s 您点击了按钮：%s", Utils.getNowTime(), ((Button) view).getText());
        tv.setText(desc);
    }

}
```



**实现方式3：**

```java
public class MainActivity extends AppCompatActivity {

    private TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tv = findViewById(R.id.tv);
        Button btn = findViewById(R.id.btn);
        
      	// 通过匿名内部类方式实现
        btn.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                String desc = String.format("%s 您长按了按钮：%s", Utils.getNowTime(), ((Button) v).getText());
                tv.setText(desc);

              	// return false 表示阻止事件冒泡
                return false;
            }
        });

    }
}
```



**实现方式4：**

```java
public class MainActivity extends AppCompatActivity {

    private TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tv = findViewById(R.id.tv);
        Button btn = findViewById(R.id.btn);
      
      	// 通过 lambda 表达式实现，也就是匿名函数
        btn.setOnLongClickListener(v -> {
            String desc = String.format("%s 您长按了按钮：%s", Utils.getNowTime(), ((Button) v).getText());
            tv.setText(desc);
            return false;
        });
        
    }
}
```



**触发顺序：**

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener, View.OnLongClickListener, View.OnTouchListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

      	// touch > longClick > click
        Button btn = findViewById(R.id.btn);
        btn.setOnClickListener(this);
        btn.setOnLongClickListener(this);
        btn.setOnTouchListener(this);
    }

    @Override
    public void onClick(View v) {
        Log.d("test", "onClick");
    }

    @Override
    public boolean onLongClick(View v) {
        Log.d("test", "onLongClick");
        return false;
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        Log.d("test", "onTouch");
        return false;
    }
}
```





### ImageView

图像视图展示的图片通常位于 `res/drawable` 目录。

* 设置图片资源
  * `src` 属性：属性值格式形如 `@drawable/不含扩展名的图片名称`
  * `setImageResource` 方法：方法参数形如 `R.drawable.不含扩展名的图片名称`
* 设置图片的显示方式
  * `scaleType` 属性：默认值为 `fitCenter`  居中显示。
  * `setScaleType` 方法：可选参数值表格。
* `android:maxHeight` ：最大高度
* `android:maxWidth` ：最大宽度
* `android:adjustViewBounds` ：调整 View 的界限



| XML 中的缩放类型 | ScaleType 类中的缩放类型 | 说明                                                         |
| ---------------- | ------------------------ | ------------------------------------------------------------ |
| fitXY            | FIT_XY                   | 拉伸图片使其正好填满视图（图片可能被拉伸变形）               |
| fitStart         | FIT_START                | 保持宽高比例，拉伸图片使其位于视图上方或左侧                 |
| fitCenter        | FIT_CENTER               | 默认值。保持宽高比例，拉伸图片使其位于视图中间（可缩小/放大） |
| fitEnd           | FIT_END                  | 保持宽高比例，拉伸图片使其位于视图下方或右侧                 |
| center           | CENTER                   | 保持图片原尺寸，并使其位于视图中间。原图 size 大于 iv size时，超过部分裁剪处理 |
| **centerCrop**   | CENTER_CROP              | 常用。拉伸图片使其充满视图，并位于视图中间（裁剪显示）       |
| centerInside     | CENTER_INSIDE            | 保持宽高比例，缩小图片使其位于视图中间（只缩小不放大）       |
| matrix           | MATRIX                   | 不改变原图大小，从iv左上角开始绘制原图，超出部分裁剪处理     |



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <ImageView
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:scaleType="centerCrop"
        android:src="@drawable/bg"/>

</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ImageView img = findViewById(R.id.img);
        img.setImageResource(R.drawable.logo);
      	img.setScaleType(ImageView.ScaleType.FIT_END);
        
    }
}
```



### ImageButton

ImageButton 是显示图片的图像按钮，但它继承自 ImageView，而非继承自 Button。

在某些场合，有的字符无法由输入法打出来，或者某些文字以特殊字体显示，就适合先切图再放到 ImageButton。例如：开平方符号等等。



**ImageButton 和 ImageView 的区别：**

* ImageButton 有默认的按钮背景，ImageView 默认无背景
* ImageButton 默认的缩放类型为 center，ImageView 默认为 fitCenter



**ImageButton 和 Button 的区别：**

* Button 既可显示文字也可显示图片，ImageButton 只能显示图片，不能显示文本
* Button 通过背景设置的图片会拉伸变形，ImageButton 上的图片可按比例缩放
* Button 只能靠背景显示一张图片，ImageButton  可分别在前景和背景显示图片，从而实现两张图片叠加的效果



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <ImageButton
        android:layout_width="match_parent"
        android:layout_height="100dp"
        android:src="@drawable/bg"
        android:scaleType="fitCenter"/>

</LinearLayout>
```



### 选择按钮

CompoundButton 类是抽象的复合按钮，由它派生而来的子类包括：复选框 CheckBox、单选按钮 RadioButton、开关按钮 Switch。



![未命名绘图 (2)](https://www.huangyihui.cn/upload/gburlimg/ebee5de398021.png)

CompoundButton 在 XML 文件中的属性：

* checked ：布尔值。指定按钮的勾选状态。默认未勾选。
* button ：指定左侧勾线图标的图形资源，不指定则使用系统的默认图标。

CompoundButton 在 Java 代码中的方法：

* setChecked ：设置按钮的勾选状态。
* setButtonDrawable ：设置左侧勾选图标的图形资源。
* setOnCheckedChangeListener ：设置勾选状态变化的监听器。
* isChecked ：判断按钮是否勾选。





#### CheckBox 复选框

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <CheckBox
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="默认 Checkbox" />

  	
    <CheckBox
        android:id="@+id/ck"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:button="@drawable/checkbox_selector"
        android:checked="true"
        android:padding="5dp"
        android:text="自定义 Checkbox" />
  
  	<!--  设置为 @null 可以清除所有默认样式 -->
    <CheckBox
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@drawable/switch_selector"
        android:button="@null"
        android:checked="true"
        android:padding="5dp"
        android:text="仿 IOS switch开关" />

</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity implements CompoundButton.OnCheckedChangeListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        CheckBox ck = findViewById(R.id.ck);
        ck.setOnCheckedChangeListener(this);
    }


    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        String desc = String.format(isChecked ? "勾选" : "取消勾选");
        buttonView.setText(desc);
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/check_choose" android:state_checked="true" />
    <item android:drawable="@drawable/check_unchoose" />
</selector>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/switch_on" android:state_checked="true" />
    <item android:drawable="@drawable/switch_off" />
</selector>
```



#### Switch 开关按钮

```java
public class MainActivity extends AppCompatActivity implements CompoundButton.OnCheckedChangeListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Switch sw = findViewById(R.id.sw);
        sw.setOnCheckedChangeListener(this);
    }


    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        String desc = String.format(isChecked ? "开" : "关");
        buttonView.setText(desc);
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    
    <Switch
        android:id="@+id/sw"
        android:layout_width="80dp"
        android:layout_height="30dp" />/
    
</LinearLayout>
```



#### RadioButton 单选按钮

同一组的 RadioButton 都要放在同一个 RadioGroup 节点下。RadioGroup 实质上是个布局，除了 RadioButton，也允许放置其他控件。

判断选中了哪个单选按钮，需要监听单选组的选中事件。RadioGroup 常用的3个方法：

* check ：选中指定资源编号的单选按钮。
* getCheckedRadioButtonId ：获取选中状态单选按钮的资源编号。
* setOnCheckedChangeListener ：设置单选按钮勾选变化的监听器。



```java
public class MainActivity extends AppCompatActivity implements RadioGroup.OnCheckedChangeListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        RadioGroup rg = findViewById(R.id.rg);
        rg.setOnCheckedChangeListener(this);
    }

    @Override
    public void onCheckedChanged(RadioGroup group, int checkedId) {
      	RadioButton radioButton = (RadioButton) group.findViewById(checkedId);
      	Log.i("res", radioButton.getText());
      
        if (checkedId == R.id.rb_male) {
            Log.i("res", "男");
        } else if (checkedId == R.id.rb_female) {
            Log.i("res", "女");
        }
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <!--  checkedButton 默认选中的选项  -->
    <!--  orientation 指定下级控件的排列方向，默认垂直排列  -->
    <RadioGroup
        android:id="@+id/rg"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:checkedButton="@id/rb_female"
        android:orientation="horizontal">

        <RadioButton
            android:id="@+id/rb_male"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="男" />

        <RadioButton
            android:id="@+id/rb_female"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="女" />
      
        <RadioButton
            android:id="@+id/rb_female"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:button:"@null"
            android:background:"@drawable/selector_radio"
            android:text="其他" />      
    </RadioGroup>

</LinearLayout>
```



### EditText 编辑框

编辑框 EditText 由文本视图派生而来，除了 TextView 已有的各种属性和方法，还支持以下 XML 属性：

* maxLength ：输入的最大长度。
* hint ：文本提示内容。
* textColorHint ：文本提示内容的颜色。
* inputType ：指定输入的文本类型。若需要使用多种文本类型，可使用竖线 `|` 把多种类型拼接起来。
  * text ：文本
  * textPassword ：文本密码。显示时用圆点代替。
  * number ：整型数。
  * numberSigned ：带符号的数字。允许在开头带符号。
  * numberDecimal ：带小数点的数字。
  * numberPassword ：数字密码。
  * datetime ：时间日期格式。除了数字外，还允许输入横线、斜杆、空格、冒号。
  * date ：日期格式。除了数字外，还允许输入横线和斜杆。
  * time ：时间格式。除了数字外，还允许输入冒号。
  * ...
* `drawable**` 属性：设置文本周围的图标，可以同时显示文本和图片。
  * `drawableTop` ：指定文字上方的图片
  * `drawableBottom` ：指定文字下方的图片
  * `drawableLeft` ：指定文字左边的图片
  * `drawableRight` ：指定文字右边的图片
* `drawablePadding` 属性：指定图片与文字的间距



编辑框点击两次后才会触发点击事件，因为第一次点击只触发焦点变更事件，第二次点击才触发点击事件。若要判断是否切换编辑框输入，应当监听焦点变更事件 `setOnFocusChangeListener` 。

调用编辑框对象的 `addTextChangedListener` 方法即可注册文本监听器。文本监听器的接口名称为 `TextWatcher` ，该接口提供了 3 个监控方法：

* beforeTextChanged ：在文本改变之前触发。
* onTextChanged ：在文本改变过程中触发。
* afterTextChanged ：在文本改变之后触发。



```xml
<!--  background="@null" 可以清除默认边框  -->
<EditText
    android:id="@+id/et"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/edittext_selector"
    android:hint="请输入"
    android:inputType="number|text"
    android:maxLength="6"
    android:textColorHint="#ff0000" />
```

```java
public class MainActivity extends AppCompatActivity implements View.OnFocusChangeListener {

    private EditText et;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        et = findViewById(R.id.et);
        et.setOnFocusChangeListener(this);

        et.addTextChangedListener(new HideTextWatcher(et, 6));
    }


    @Override
    public void onFocusChange(View v, boolean hasFocus) {
        if (hasFocus) {
            String pwd = et.getText().toString();
            if (TextUtils.isEmpty(pwd) || pwd.length() < 6) {
                // 请求焦点
                et.requestFocus();
                // 弹出提示
                Toast.makeText(this, "请输入6位密码", Toast.LENGTH_SHORT).show();
            }
        }
    }

    // 定义一个编辑器监听器，在输入文本达到指定长度时自动隐藏输入法
    private class HideTextWatcher implements TextWatcher {

        // 编辑器对象
        private EditText mView;
        // 文本最大长度
        private int mMaxLength;

        public HideTextWatcher(EditText et, int maxLength) {
            this.mView = et;
            this.mMaxLength = maxLength;
        }

        @Override
        public void afterTextChanged(Editable s) {
            String str = s.toString();
            if (str.length() == mMaxLength) {
                // 从系统服务中获取输入法管理器
                InputMethodManager imm = (InputMethodManager) MainActivity.this.getSystemService(Context.INPUT_METHOD_SERVICE);
                // 关闭屏幕上的输入法软键盘
                imm.hideSoftInputFromWindow(mView.getWindowToken(), 0);
            }
        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {

        }
    }
}
```



```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- edittext_selector.xml -->
    <item android:drawable="@drawable/shape_edit_focus" android:state_focused="true" />
    <item android:drawable="@drawable/shape_edit_normal" />
</selector>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- shape_edit_normal.xml -->
    <solid android:color="#ffffff" />
    <stroke
        android:width="1dp"
        android:color="#aaaaaa" />
    <corners android:radius="5dp" />
    <padding
        android:bottom="2dp"
        android:left="2dp"
        android:right="2dp"
        android:top="2dp" />
</shape>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- shape_edit_focus.xml -->
    <solid android:color="#ffffff" />
    <stroke
        android:width="1dp"
        android:color="#0000ff" />
    <corners android:radius="5dp" />
    <padding
        android:bottom="2dp"
        android:left="2dp"
        android:right="2dp"
        android:top="2dp" />
</shape>
```



### 对话框

#### 提醒对话框 AlertDialog

AlertDialog 需借助建造器 `AlertDialog.Builder` 才能完成参数设置。接着调用建造器的 `create` 方法生成对话框实例，再调用实例的 `show` 方法在页面上弹出提醒对话框。

* setIcon() ：设置对话框的标题图标。
* setTitle() ：设置对话框的标题文本。
* setMessage() ：设置对话框的内容文本。
* setPositiveButton() ：设置肯定按钮的信息，包括按钮文本和点击监听器。
* setNegativeButton() ：设置否定按钮的信息，包括按钮文本和点击监听器。
* setNeutralButton() ：设置中性按钮的信息，包括按钮文本和点击监听器。该方法比较少用。
* setView() ：设置自定义布局。
* create() ：创建 Dialog。
* show() ：显示对话框。



```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn).setOnClickListener(this);
      
      	// 获取布局
        View dialogView = getLayoutInflater().inflate(R.layout.dialog_layout, null);
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setView(dialogView).setPositiveButton("确定", (dialog, which) -> {
            Log.d("test", "confirm");
        }).create().show();
      
    }

    @Override
    public void onClick(View v) {
        // 创建提醒对话框的建造器
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        // 设置对话框的标题文本
        builder.setTitle("尊敬的用户");
        // 设置对话框的内容文本
        builder.setMessage("你真的要卸载我吗？");
        // 设置对话框的肯定按钮文本及其点击监听器
        builder.setPositiveButton("残忍卸载", (dialog, which) -> {
            Log.i("res", "确定");
        });
        // 设置对话框的否定按钮文本及其点击监听器
        builder.setNegativeButton("我再想想", (dialog, which) -> {
            Log.i("res", "取消");
        });

        // 根据建造器构建提醒对话框对象
        AlertDialog dialog = builder.create();
        // 显示对话框
        dialog.show();
      
        /*
        builder.setPositiveButton("残忍卸载", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Log.i("res", "确定");
            }
        });
        */
    }
}
```



#### 日期对话框 DatePickerDialog

日期选择器 `DatePicker` 可以让用户选择具体的年月日。但 DatePicker 并非弹出模式，而是在当前页面占据一块区域，并且不会自动关闭。

`DatePickerDialog` 相当于在 AlertDialog 上装载了 DatePicker，日期选择事件则由监听器 `OnDateSetListener` 负责响应，在该监听器的 `onDateSet` 方法中，开发者根据用户选择的具体日期，再做后续处理。

需要注意的是：获取的月份参数是从0开始的，即一月等于 0。



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="20dp">

    <!--  datePickerMode 显示模式：calendar默认日历效果  spinner滚动选择  -->
    <!--  calendarViewShown 是否显示右侧的日历视图，在 spinner 下才生效  -->
    <DatePicker
        android:id="@+id/dp_date"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:calendarViewShown="false"
        android:datePickerMode="spinner" />
    
    <Button
        android:id="@+id/btn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="确定" />

    <Button
        android:id="@+id/btn_open"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="弹出方式" />

</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private DatePicker dp_date;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn).setOnClickListener(this);
        findViewById(R.id.btn_open).setOnClickListener(this);
        dp_date = findViewById(R.id.dp_date);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn) {
            String desc = String.format("您选择的日期是%d年%d月%d日", dp_date.getYear(), dp_date.getMonth() + 1, dp_date.getDayOfMonth());
            Log.i("res", desc);
        } else if (v.getId() == R.id.btn_open) {
            // 获取日历的一个实例，里面包含了当前的年月日
            Calendar calendar = Calendar.getInstance();
            calendar.get(Calendar.YEAR);
            calendar.get(Calendar.MONTH);
            calendar.get(Calendar.DAY_OF_MONTH);
            // 创建日期选择器弹框对象
            // DatePickerDialog dialog = new DatePickerDialog(this);

            // 创建日期选择器弹框对象，设置选中日期的监听器和默认年月日
            DatePickerDialog dialog = new DatePickerDialog(this, this, 2023, 10, 21);
            // 显示日期对话框
            dialog.show();
        }
    }

  	@Override
    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
        String desc = String.format("您选择的日期是%d年%d月%d日", year, month + 1, dayOfMonth);
        Log.i("res", desc);
    }
}
```



#### 时间对话框 TimePickerDialog

时间选择器 `TimePicker` 可以让用户选择具体的小时和分钟。

`TimePickerDialog` 的用法类似 `DatePickerDialog` 。



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="20dp">

    <!--  timePickerMode 显示模式：clock默认时钟效果  spinner滚动选择  -->
    <TimePicker
        android:id="@+id/tp_time"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:timePickerMode="spinner" />

    <Button
        android:id="@+id/btn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="确定" />

    <Button
        android:id="@+id/btn_open"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="弹出方式" />

</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener, TimePickerDialog.OnTimeSetListener {

    private TimePicker tp_time;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn).setOnClickListener(this);
        findViewById(R.id.btn_open).setOnClickListener(this);
        tp_time = findViewById(R.id.tp_time);
      	// 设置为24小时制
        tp_time.setIs24HourView(true);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn) {
            String desc = String.format("您选择的时间是%d时%d分", tp_time.getHour(), tp_time.getMinute());
            Log.i("res", desc);
        } else if (v.getId() == R.id.btn_open) {
            // 获取日历的一个实例
            Calendar calendar = Calendar.getInstance();
            // 创建时间选择器弹框对象，设置选中时间的监听器、样式效果、默认时间、是否24小时制
            TimePickerDialog dialog = new TimePickerDialog(this, android.R.style.Theme_Holo_Light_Dialog, this, calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE), true);
            // 显示对话框
            dialog.show();
        }
    }

    @Override
    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
        String desc = String.format("您选择的时间是%d时%d分", hourOfDay, minute);
        Log.i("res", desc);
    }
}
```



### ProgressBar 进度条

进度条默认是一个旋转的加载效果。



* `android:max` ：进度条的最大值
* `android:progress` ：已完成进度值
* `style="?android:attr/progressBarStyleHorizontal"` ：水平进度条
* `android:indeterminate` ：如果设置为 true，则进度条不精确显示进度。也就是会不断滚动。



```xml
<ProgressBar
    android:id="@+id/progressbar"
    style="?android:attr/progressBarStyleHorizontal"
    android:layout_width="300dp"
    android:layout_height="wrap_content"
    android:max="50"
    android:progress="20" />
```

```java
ProgressBar progressBar = findViewById(R.id.progressbar);

// 修改进度
int progress = progressBar.getProgress();
progress += 10;
progressBar.setProgress(progress);
```



### ToolBar

Toolbar 是在 Android 5.0 开始推出的一个 Materal Design 风格的导航控件 ，Google 非常推荐大家使用 Toobar 来作为 Android 客户端的导航栏，它可以放到界面的任意位置。



```xml
<androidx.appcompat.widget.Toolbar
    android:id="@+id/tb"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:background="#ffff00"
    app:logo="@drawable/ic_launcher_foreground"
    app:navigationIcon="@drawable/ic_launcher_background"
    app:subtitle="子标题"
    app:subtitleTextColor="#00ff00"
    app:title="标题"
    app:titleMarginStart="90dp"
    app:titleTextColor="#ff0000" />

<androidx.appcompat.widget.Toolbar
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:layout_marginTop="60dp"
    android:background="#ffff00"
    app:navigationIcon="@drawable/ic_launcher_background">

    <!--  自定义内部控件  -->
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="hello" />

</androidx.appcompat.widget.Toolbar>
```

```java
Toolbar tb = findViewById(R.id.tb);
tb.setNavigationOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Log.d("test", "click");
    }
});
```





### PopupWindow

* `setContentView()` ：设置 PopupWindow 显示的 View
* `showAsDropDown()` ：相对某个控件的位置，默认在其的正左下方
* `setFocusable()` ：设置是否获取焦点
* `setBackgroundDrawable()` ：设置背景
* `dismiss()` ：关闭弹窗
* `setAnimationStyle()` ：设置加载动画
* `setTouchable` ：设置是否接收触摸事件
* `setOutsideTouchable` ：设置是否允许 PopupWindow 外面的触摸，为 true 则可以点击外部关闭弹窗。



```java
@Override
public void onClick(View v) {
    View popupView = getLayoutInflater().inflate(R.layout.dialog_layout, null);
  	// 最后的参数 focusable 设为 true，则允许点击弹窗外部区域关闭弹窗
    PopupWindow popupWindow = new PopupWindow(popupView, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT, true);
    popupWindow.showAsDropDown(v);
}
```







### 视图

* 设置视图宽高
  * 视图宽度通过属性 `android:layout_width` 表示，视图高度通过属性 `android:layout_height` 表示，取值主要有以下几种：
    * `match_parent` ：表示与上级视图保持一致
    * `wrap_content` ：表示与内容自适应。超过上级高度部分将会隐藏。
    * 以 dp 为单位的具体尺寸
  * 以 Java 代码方式设置，需确保其宽高属性值为 `wrap_content` 。
* 设置视图间距
  * 外边距属性：`layout_margin、layout_marginLeft、layout_marginRight、layout_marginTop、layout_marginBottom`
  * 内边距属性：`padding、paddingLeft、paddingRight、paddingTop、paddingBottom`
* 设置视图的对齐方式
  * `layout_gravity` 属性：指定当前视图对于上级视图的对齐方式
  * `gravity` 属性：指定下级(内部的子元素)视图相对于当前视图的对齐方式
  * 它们的取值包括：`left、right、top、bottom、center` ，还可以使用竖线连接 `left|top`
* 设置视图可见性
  * `setVisibility(value)` ：值 `View.VISIBLE` 可见，值 `View.GONE` 不可见。



```xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="300dp"
    android:text="Hi" />
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="300dp"
    android:background="#0000FF"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_margin="20dp"
        android:padding="50dp"
        android:background="#00FF00" >

        <View
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="#FF0000" />

    </LinearLayout>

</LinearLayout>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="300dp"
    android:background="#ff0000"
    android:orientation="horizontal">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:layout_gravity="center"
        android:layout_weight="1"
        android:background="#00FF00" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:layout_gravity="bottom"
        android:layout_weight="1"
        android:background="#0000ff"
        android:gravity="center">

        <View
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:background="#000000" />
    </LinearLayout>

</LinearLayout>
```

```java
TextView tv = findViewById(R.id.tv);

// 获取布局参数
ViewGroup.LayoutParams params = tv.getLayoutParams();
// 修改布局参数中的宽/高数值，默认 px 单位。需要将 dp 数值转成 px 数值
params.width = 200;
params.width = Utils.dip2px(this, 200);
// 将其修改成新的布局参数
tv.setLayoutParams(params);

// 设置视图可见
tv.setVisibility(View.VISIBLE);
// 设置视图不可见
tv.setVisibility(View.GONE);
```

```java
// utils.java
public class Utils {

    // 根据手机的分辨率从 dp 转为 px
    public static int dip2px(Context context, float dpValue) {
        // 获取当前手机的像素密度（1个dp对应几个px）
        float scale = context.getResources().getDisplayMetrics().density;
        // 四舍五入取值
        return (int) (dpValue * scale + 0.5f);
    }
}
```



### 布局

#### LinearLayout 线性布局

* `orientation` 属性：设置线性布局内部的各视图排列方式，不指定该属性时，默认水平方向排列。
  * horizontal ：默认。内部视图在水平方向从左到右排列
  * vertical ：内部视图在垂直方向从上到下排列
* `layout_weight` 属性：权重，指的是线性布局的下级视图各自拥有多大比例的宽高。
  * 该属性不在 `LinearLayout` 节点设置，而是在线性布局的直接下级视图设置
  * 为了区分是表示哪个方向的权重，一旦设置了该属性值，便要求 `layout_width` 或者 `layout_height` 填 dp。如果 `layout_width` 填 dp，则表示水平方向的宽度比例。如果 `layout_height` 填 dp，则表示垂直方向的高度比例。
  * 先减掉有宽度/高度的dp，剩余的空间再按权重分
* `android:divider` ：设置分割线
* `android:showDividers` ：设置分割线所在的位置
  * none ：无
  * beginning ：开始
  * middle ：每两个组件间
  * end ：结束
* `android:dividerPadding` ：设置分割线的 padding，也就是分割线左右的边距



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="300dp"
    android:orientation="vertical">

    <View
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:background="#000000" />

    <View
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:background="#ff0000" />

</LinearLayout>
```



#### RelativeLayout 相对布局

相对布局的下级视图位置由其他视图决定。用于确定下级视图位置的参照物分两种：

* 与该视图自身平级的视图，也就是需指定同级的参照物（根据兄弟组件定位）
  * `layout_toLeftOf` ：当前视图在指定视图的左边，推荐用 `layout_toStartOf`
  * `layout_toRightOf` ：当前视图在指定视图的右边，推荐用 `layout_toEndOf`
  * `layout_above` ：当前视图在指定视图的上方
  * `layout_below` ：当前视图在指定视图的下方
  * `layout_alignLeft` ：当前视图与指定视图的左侧对齐
  * `layout_alignRight` ：当前视图与指定视图的右侧对齐
  * `layout_alignTop` ：当前视图与指定视图的顶部对齐
  * `layout_alignBottom` ：当前视图与指定视图的底部对齐
  * 它们的值为指定的平级视图的 id。
* 该视图的上级视图，也就是它归属的 RelativeLayout（根据父容器定位）
  * `layout_centerInParent` ：当前视图在上级视图水平垂直中间
  * `layout_centerHorizontal` ：当前视图在上级视图水平方向居中
  * `layout_centerVertical` ：当前视图在上级视图垂直方向居中
  * `layout_alignParentLeft` ：当前视图在上级视图的左侧对齐，推荐用 `layout_alignParentStart`
  * `layout_alignParentRight` ：当前视图与上级视图的右侧对齐，推荐用 `layout_alignParentEnd`
  * `layout_alignParentTop` ：当前视图与上级视图的顶部对齐
  * `layout_alignParentBottom` ：当前视图与上级视图的底部对齐
  * 它们的值为布尔值。

如果不设定下级视图的参照物，那么下级视图默认显示在 RelativeLayout 内部的左上角，并且可能会发生重叠。多种参照属性可以组合使用。



```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="300dp">

    <TextView
        android:id="@+id/tv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="水平垂直居中" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_toLeftOf="@id/tv"
        android:text="我在tv的左边" />

</RelativeLayout>
```



#### GridLayout 网格布局

网格布局支持多行多列的表格排列，默认从左往右，从上到下排列。

* `orientation` 属性：设置水平排列还是垂直排列
* `columnCount` 属性：指定网格的列数
* `rowCount` 属性：指定网格的行数



子控件属性：

* `layout_rowWeight` 属性：网格布局的下级视图行比重
* `layout_columnWeight` 属性：网格布局的下级视图比重
* `layout_column` ：显示在第几列，从0开始
* `layout_columnSpan` ：横向跨几列
* `layout_row` ：显示在第几行，orientation 为 vertical 是生效
* `layout_rowSpan` ：横向跨几行，orientation 为 vertical 是生效



```xml
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"	
    android:layout_height="300dp"
    android:columnCount="2"
    android:rowCount="2">

    <TextView
        android:layout_rowWeight="1"
        android:layout_columnWeight="1"
        android:background="#FF0000"
        android:gravity="center"
        android:text="1" />

    <TextView
        android:layout_rowWeight="1"
        android:layout_columnWeight="1"
        android:background="#00FF00"
        android:gravity="center"
        android:text="2" />

    <TextView
        android:layout_rowWeight="1"
        android:layout_columnWeight="1"
        android:background="#F5F5F5"
        android:gravity="center"
        android:text="3" />

    <TextView
        android:layout_rowWeight="1"
        android:layout_columnWeight="1"
        android:background="#FFCCCC"
        android:gravity="center"
        android:text="4" />

</GridLayout>
```



#### FrameLayout 帧布局

多个帧布局会层叠在一起，最后面的帧布局显示在最上面。

* `android:foreground` ：设置前景
* `android:foregroundGravity` ：设置前景的位置



```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:layout_width="400dp"
        android:layout_height="400dp"
        android:background="#ff0000" />

    <FrameLayout
        android:layout_width="300dp"
        android:layout_height="300dp"
        android:background="#ffff00"
        android:foreground="@drawable/ic_launcher_foreground"
        android:foregroundGravity="right" />

    <FrameLayout
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:background="#00ff00" />

</FrameLayout>
```



#### TableLayout 表格布局

* `android:collapseColumns` ：设置需要被隐藏的列的序号，从0开始，多个列可以用逗号隔开。
* `android:stretchColumns` ：设置允许被拉伸的列的序号，从0开始，前提是还有剩余空间
* `android:shrinkColumns` ：设置允许被收缩的列的序号，从0开始，前提是空间已不足



子控件设置属性：

* `android:layout_column` ：显示在第几列
* `android:layout_span` ：横向跨几列



```xml
<?xml version="1.0" encoding="utf-8"?>
<TableLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TableRow>

        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="按钮0" />

        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="按钮1" />
        
    </TableRow>

</TableLayout>
```







#### ScrollView 滚动视图

滚动视图有两种：

* `ScrollView` ：垂直方向的滚动视图。
* `HorizontalScrollView` ：水平方向的滚动视图。

滚动视图节点下面必须且只能挂着一个子布局节点，否则会在运行时报错。

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <HorizontalScrollView
        android:layout_width="wrap_content"
        android:layout_height="200dp">

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="match_parent">

            <View
                android:layout_width="300dp"
                android:layout_height="200dp"
                android:background="#FF0000" />

            <View
                android:layout_width="300dp"
                android:layout_height="200dp"
                android:background="#00FF00" />

        </LinearLayout>

    </HorizontalScrollView>

  
    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="300dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">

            <View
                android:layout_width="300dp"
                android:layout_height="200dp"
                android:background="#FF0000" />

            <View
                android:layout_width="300dp"
                android:layout_height="200dp"
                android:background="#00FF00" />

        </LinearLayout>

    </ScrollView>

</LinearLayout>
```



有时 ScrollView 的实际内容不够，又想让它充满屏幕，怎么办呢？如果把layout_height属性赋值为
match_parent，结果还是不会充满，正确的做法是再增加一行属性 `android:fillViewport`（该属性为true
表示允许填满视图窗口）

```xml
<ScrollView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fillViewport="true" >

</ScrollView>
```



#### ListView 列表视图

* `setAdapter` ：设置列表项的数据适配器。
* `setOnItemClickListener` ：设置列表项的点击监听器。
* `setOnItemLongClickListener` ：设置列表项的长按监听器。
* 设置分割线的图形。如需取消分隔线，可将该属性值设为 `@null`
  * `android:divider`
  * `setDivider`
* 设置分割线的高度，当 divider 属性设置为 `@null` 时，该值不能大于0。通过代码设置时，需先设置分割线图形，再设置分割线高度。
  * `android:dividerHeight`
  * `setDividerHeight`
* 设置列表项的按压背景，取消默认背景可以将其设置为透明色。
  * `android:listSelector`
  * `setSelector`



```xml
<ListView
    android:id="@+id/lv_planet"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />

<ListView
    android:id="@+id/lv_planet"
    android:divider="@color/red"
    android:dividerHeight="1dp"
    android:listSelector="@drawable/list_selector"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/red" android:state_pressed="true" />
    <item android:drawable="@color/white" />
</selector>
```



```java
public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener, AdapterView.OnItemLongClickListener {

    private List<Planet> planetList;

    private ListView lv_planet;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        planetList = Planet.getDefaultList();
        PlanetBaseAdapter adapter = new PlanetBaseAdapter(this, planetList);
        lv_planet = findViewById(R.id.lv_planet);
        lv_planet.setAdapter(adapter);  // 设置列表视图的适配器
        lv_planet.setOnItemClickListener(this); // 设置列表项的点击监听器
        lv_planet.setOnItemLongClickListener(this); // 设置列表项的长按监听器

        // 设置分割线
        Drawable drawable = getResources().getDrawable(R.color.red, getTheme());
        lv_planet.setDivider(drawable);
        // 设置列表视图的分隔线高度
        lv_planet.setDividerHeight(Utils.dip2px(this, 1));

        // 设置按压背景
        lv_planet.setSelector(R.drawable.list_selector);
    }


    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Toast.makeText(this, "您点击的是" + planetList.get(position).name, Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
        Toast.makeText(this, "您长按的是" + planetList.get(position).name, Toast.LENGTH_SHORT).show();
        return true;
    }
}
```



##### 点击问题

如果列表项中存在编辑框或按钮（含Button、ImageButton、Checkbox等），点击列表项就无法触发点击事件了。缘由在于编辑框和按钮这类控件会抢占焦点。

为了规避焦点抢占的问题，列表视图允许开发者自行设置内部视图的焦点抢占方式，该方式在XML文件中由`descendantFocusability` 属性指定，在代码中由 `setDescendantFocusability` 方法设置。

注意：焦点抢占方式不是由 ListView 设置，而是由列表项的根布局设置。



| 抢占方式说明           | 代码中的抢占类型                   | XML 中的抢占属性  |
| ---------------------- | ---------------------------------- | ----------------- |
| 在子控件之前处理       | ViewGroup.FOCUS_BEFORE_DESCENDANTS | beforeDescendants |
| 在子控件之后处理       | ViewGroup.FOCUS_AFTER_DESCENDANTS  | afterDescendants  |
| 不让子控件处理（常用） | ViewGroup.FOCUS_BLOCK_DESCENDANTS  | blocksDescendants |



```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:descendantFocusability="blocksDescendants"
    android:orientation="horizontal">

    <!-- 这是显示行星图片的图像视图 -->
    <ImageView
        android:id="@+id/iv_icon"
        android:layout_width="0dp"
        android:layout_height="80dp"
        android:layout_weight="1"
        android:scaleType="fitCenter"
        tools:src="@drawable/diqiu" />
    
    <Button
        android:id="@+id/btn"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:text="按钮"/>
</LinearLayout>
```





#### GridView 网格视图

网格视图除了沿用列表视图的3个方法 setAdapter、setOnItemClickListener、setOnItemLongClickListener，网格视图还新增了部分属性与方法。

* 指定列的数目
  * `android:numColumns`
  * `setNumColumns`
* 指定网格项在水平方向的间距
  * `android:horizontalSpacing`
  * `setHorizontalSpacing`
* 指定网格项在垂直方向的间距
  * `android:verticalSpacing`
  * `setVerticalSpacing`
* 指定剩余空间的拉伸模式
  * `android:stretchMode`
  * `setStretchMode`
* 指定每列的宽度。拉伸模式为 spacingWidth 或 spacingWidthUniform 时，必须指定列宽。
  * `android:columnWidth`
  * `setColumnWidth`



拉伸模式：

| XML 中的拉伸模式    | GridView 类的拉伸模式   | 说明                                                         |
| ------------------- | ----------------------- | ------------------------------------------------------------ |
| none                | NO_STRETCH              | 不拉伸                                                       |
| columnWidth         | STRETCH_COLUMN_WIDTH    | 若有剩余空间，则拉伸列宽挤掉空隙                             |
| spacingWidth        | STRETCH_SPACING         | 若有剩余空间，则列宽不变，把空间分配到每列间的空隙（网格项左右对齐） |
| spacingWidthUniform | STRETCH_SPACING_UNIFORM | 若有剩余空间，则列宽不变，把空间分配到每列左右的空隙（网格项之间有相同间距） |



```xml
<GridView
    android:id="@+id/gv_list"
    android:numColumns="2"
    android:horizontalSpacing="20dp"
    android:verticalSpacing="50dp"
    android:stretchMode="spacingWidth"
    android:columnWidth="50dp"
    android:background="@color/red"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"/>
```

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/white"
    android:orientation="vertical">

    <!-- 这是显示行星名称的文本视图 -->
    <TextView
        android:id="@+id/tv_name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:textColor="@color/black"
        android:textSize="20sp"
        tools:text="地球" />

    <!-- 这是显示行星图片的图像视图 -->
    <ImageView
        android:id="@+id/iv_icon"
        android:layout_width="match_parent"
        android:layout_height="100dp"
        android:scaleType="fitCenter"
        tools:src="@drawable/diqiu" />

    <!-- 这是显示行星描述的文本视图 -->
    <TextView
        android:id="@+id/tv_desc"
        android:layout_width="match_parent"
        android:layout_height="70dp"
        android:gravity="start|top"
        android:textColor="@color/black"
        android:textSize="13sp"
        tools:text="地球是太阳系八大行星之一，排行第三，也是太阳系中直径、质量和密度最大的类地行星，距离太阳1.5亿公里" />
</LinearLayout>
```



```java
public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener, AdapterView.OnItemLongClickListener {

    private List<Planet> planetList;

    private GridView gv_list;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        planetList = Planet.getDefaultList();
        GridAdapter adapter = new GridAdapter(this, planetList);
        gv_list = findViewById(R.id.gv_list);
        gv_list.setAdapter(adapter);
        gv_list.setOnItemClickListener(this);
        gv_list.setOnItemLongClickListener(this);
      
        gv_list.setNumColumns(2);
        gv_list.setHorizontalSpacing(Utils.dip2px(this, 30));
        gv_list.setVerticalSpacing(Utils.dip2px(this, 50));
        gv_list.setStretchMode(GridView.STRETCH_SPACING);
        gv_list.setColumnWidth(Utils.dip2px(this, 100));
        
    }


    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Toast.makeText(this, "您点击的是" + planetList.get(position).name, Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
        Toast.makeText(this, "您长按的是" + planetList.get(position).name, Toast.LENGTH_SHORT).show();
        return true;
    }
}
```





#### ViewPager 翻页视图

翻页视图3个常用方法：

* `setAdapter` ：设置页面项的适配器。适配器用的是PagerAdapter及其子类。
* `setCurrentItem` ：设置当前页码，也就是要显示哪个页面。
* `addOnPageChangeListener` ：添加翻页视图的页面变更监听器。该监听器需实现以下方法：
  * `onPageScrollStateChanged` ：在页面滑动状态变化时触发。　
  * `onPageScrolled` ：在页面滑动过程中触发。　
  * `onPageSelected` ：在选中页面时，即滑动结束后触发。



PagerAdapter 适配器的方法：

* `getCount()` ：获得 viewPager 中有多少个 view
* `instantiateItem()` ：将指定位置的 view 添加到 ViewGroup容器中，创建并显示出来。并返回 view 本身。
* `isViewFromObject()` ：判断当前视图是否来自指定对象
* `destroyItem()` ：从容器中销毁指定位置的页面



```xml
<!-- 注意翻页视图ViewPager的节点名称要填全路径 -->
<androidx.viewpager.widget.ViewPager
    android:id="@+id/vp_content"
    android:layout_width="match_parent"
    android:layout_height="370dp" />
```

```java
public class ImagePagerAdapter extends PagerAdapter {
    private Context mContext;
    private List<Planet> mPlaneList;
    private List<ImageView> mViewList = new ArrayList<>();

  	// 图像翻页适配器的构造方法，传入上下文与商品信息列表
    public ImagePagerAdapter(Context mContext, List<Planet> mPlaneList) {
        this.mContext = mContext;
        this.mPlaneList = mPlaneList;
        // 给每个商品分配一个专用的图像视图
        for (Planet info : mPlaneList) {
            ImageView view = new ImageView(mContext);
            view.setLayoutParams(new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
            ));
            view.setImageResource(info.image);
            mViewList.add(view);
        }
    }

  	// 获取页面项的个数
    @Override
    public int getCount() {
        return mViewList.size();
    }

  	// 判断当前视图是否来自指定对象
    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view == object;
    }

    // 实例化指定位置的页面，并将其添加到容器中
    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {
        // 添加一个view到container中，而后返回一个跟这个view可以关联起来的对象，
        // 这个对象能够是view自身，也能够是其余对象，
        // 关键是在isViewFromObject可以将view和这个object关联起来
        ImageView item = mViewList.get(position);
        container.addView(item);
        return item;
    }

    // 从容器中销毁指定位置的页面
    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        container.removeView(mViewList.get(position));
    }

  	// 获得指定页面的标题文本
    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return mPlaneList.get(position).name;
    }
}
```



```java
public class MainActivity extends AppCompatActivity implements ViewPager.OnPageChangeListener {

    private List<Planet> mPlaneList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mPlaneList = Planet.getDefaultList();
        ImagePagerAdapter adapter = new ImagePagerAdapter(this, mPlaneList);
        ViewPager vp_content = findViewById(R.id.vp_content);
        vp_content.setAdapter(adapter);
        // 给翻页视图添加页面变更监听器
        vp_content.addOnPageChangeListener(this);
        vp_content.setCurrentItem(1);
        
    }


    // 翻页状态改变时触发。state取值说明为：0表示静止，1表示正在滑动，2表示滑动完毕
    // 在翻页过程中，状态值变化依次为：正在滑动→滑动完毕→静止
    @Override
    public void onPageScrollStateChanged(int state) {

    }

    // 在翻页过程中触发。该方法的三个参数取值说明为 ：第一个参数表示当前页面的序号
    // 第二个参数表示页面偏移的百分比，取值为0到1；第三个参数表示页面的偏移距离
    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

    }

    // 在翻页结束后触发。position表示当前滑到了哪一个页面
    @Override
    public void onPageSelected(int position) {
        Toast.makeText(this, "您翻到的是" + mPlaneList.get(position).name, Toast.LENGTH_SHORT).show();
    }

}
```



由于监听器 OnPageChangeListener 多数情况只用到 onPageSelected 方法，所以提供了一个简易版的监听器：

```java
// 给翻页视图添加简化版监听器
vp_content.addOnPageChangeListener(new ViewPager.SimpleOnPageChangeListener() {
    @Override
    public void onPageSelected(int position) {
        Toast.makeText(MainActivity.this, "您翻到的是" + mPlaneList.get(position).name, Toast.LENGTH_SHORT).show();
    }
});
```



##### PagerTabStrip 翻页标签栏

它能够在翻页视图上方显示页面标题，从而方便用户的浏览操作。PagerTabStrip类似选项卡效果，文本下面有横线，点击左右选项卡即可切换到对应页面。给翻页视图引入翻页标签栏只需下列两个步骤：

* 在XML文件的ViewPager节点内部添加PagerTabStrip节点
* 在翻页适配器的代码中重写getPageTitle方法，在不同位置返回对应的标题文本



```xml
<!-- 注意翻页视图ViewPager的节点名称要填全路径 -->
<androidx.viewpager.widget.ViewPager
    android:id="@+id/vp_content"
    android:layout_width="match_parent"
    android:layout_height="370dp">

    <!-- 注意翻页标签栏PagerTabStrip的节点名称要填全路径 -->
    <androidx.viewpager.widget.PagerTabStrip
        android:id="@+id/pts_tab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

</androidx.viewpager.widget.ViewPager>
```

```java
@Override
public CharSequence getPageTitle(int position) {
    return mPlaneList.get(position).name;
}
```

```java
// 修改翻页标签栏样式
private void initPagerStrip() {
    // 从布局视图中获取名叫pts_tab的翻页标签栏
    PagerTabStrip pts_tab = findViewById(R.id.pts_tab);
    // 设置翻页标签栏的文本大小
    pts_tab.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
    pts_tab.setTextColor(Color.RED); // 设置翻页标签栏的文本颜色
}
```



##### ViewPager2

```
dependencies {

    implementation 'androidx.viewpager2:viewpager2:1.0.0'
}
```

```xml
<androidx.viewpager2.widget.ViewPager2
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```









#### RecyclerView

RecyclerView 是进阶版的 ListView，不仅可以实现 ListView 的纵向滑动，还可以横向滑动和瀑布流滑动。



```
implementation "androidx.recyclerview:recyclerview:1.2.1"
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.recyclerview.widget.RecyclerView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/rv"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

</androidx.recyclerview.widget.RecyclerView>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="60dp"
    android:orientation="vertical">

    <TextView
        android:id="@+id/tv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:text="序号1"
        android:textSize="20sp" />

</LinearLayout>
```



```java
public class Bean {
    private String name = "";

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

```java
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> {

    private List<Bean> data;
    private Context context;

  	// 2. 构造函数,用于把要展示的数据源传入,并赋予值给全局变量data
    public MyAdapter(List<Bean> data, Context context) {
        this.data = data;
        this.context = context;
    }

  	// 继承RecyclerView.Adapter后需要重写三个方法
  
  
  	// 创建MyViewHolder实例,并把加载的布局传入到构造函数去,再把MyViewHolder实例返回
    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = View.inflate(context, R.layout.item, null);
        return new MyViewHolder(view);
    }

  	// 用于对子项的数据进行赋值,会在每个子项被滚动到屏幕内时执行。position得到当前的数据索引。
    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.tv.setText(data.get(position).getName());
      	// 添加子项点击事件
        holder.tv.setOnClickListener((View v) -> {
            Log.d("test", position + "");
        });
    }

  	// getItemCount()返回RecyclerView的子项数目。
    @Override
    public int getItemCount() {
        return data == null ? 0 : data.size();
    }

  	// 1.定义内部类MyViewHolder,并继承RecyclerView.ViewHolder。
  	// 传入的View参数通常是RecyclerView子项的最外层布局。
    public class MyViewHolder extends RecyclerView.ViewHolder {
        private TextView tv;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            tv = itemView.findViewById(R.id.tv);
        }
    }
}
```

```java
public class MainActivity extends AppCompatActivity {

    private List<Bean> data = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

				// 初始化列表数据
        for (int i = 0; i < 1000; i++) {
            Bean bean = new Bean();
            bean.setName("序号" + i);
            data.add(bean);
        }

        RecyclerView recyclerView = findViewById(R.id.rv);

				// 指定RecyclerView的布局方式，比如使用线性布局
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(linearLayoutManager);

      	// 设置适配器用于显示数据
        MyAdapter adapter = new MyAdapter(data, this);
        recyclerView.setAdapter(adapter);
    }
}
```





### Spinner 下拉列表

* `spinnerMode` ：设置展示效果。
  * dropdown ：默认值。在当前下拉框的正下方弹出列表框。
  * dialog ：在页面中部弹出列表对话框
* `setPrompt` ：设置标题文字。注意对话框模式才显示标题，下拉模式不显示标题。
* `setAdapter` ：设置列表项的数据适配器。
* `setSelection` ：设置当前选中哪项。注意该方法要在setAdapter方法后调用。
* `setOnItemSelectedListener` ：设置下拉列表的选择监听器，该监听器要实现接口 `OnItemSelectedListener`。



```xml
<Spinner
    android:id="@+id/sp_dropdown"
    android:spinnerMode="dropdown"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"/>

<Spinner
    android:id="@+id/sp_dropdown"
    android:spinnerMode="dialog"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"/>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="50dp"
    android:gravity="center"
    android:textColor="#0000ff"
    android:textSize="17sp"
    tools:text="火星" />
```



```java
public class MainActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    // 定义下拉列表需要显示的文本数组
    private final static String[] starArray = {"水星", "金星", "地球", "火星", "木星", "土星"};
    private Spinner sp_dropdown;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sp_dropdown = findViewById(R.id.sp_dropdown);
        // 声明一个下拉列表的数组适配器
        ArrayAdapter<String> startAdapter = new ArrayAdapter<>(this, R.layout.spinner_item, starArray);
        sp_dropdown.setAdapter(startAdapter);
        // 设置下拉框默认显示第一项
        sp_dropdown.setSelection(0);
        // 给下拉框设置选择监听器，一旦用户选中某一项，就触发监听器的onItemSelected方法
        sp_dropdown.setOnItemSelectedListener(this);
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        Toast.makeText(this, "您选择的是" + starArray[position], Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
```



### Adapter 适配器

适配器负责从数据集合中取出对应的数据显示到条目布局上。



#### 数组适配器

ArrayAdapter 只能显示文本列表。

```java
Spinner sp_dropdown = findViewById(R.id.sp_dropdown);
String[] starArray = {"水星", "金星", "地球", "火星", "木星", "土星"};

// 声明一个下拉列表的数组适配器
ArrayAdapter<String> startAdapter = new ArrayAdapter<>(this, R.layout.item_select, starArray);
sp_dropdown.setAdapter(startAdapter);
```



#### 简单适配器

SimpleAdapter 允许在列表项中同时展示文本与图片。

```java
public class MainActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    // 定义下拉列表需要显示的行星图标数组
    private static final int[] iconArray = {
            R.drawable.shuixing, R.drawable.jinxing, R.drawable.diqiu,
            R.drawable.huoxing, R.drawable.muxing, R.drawable.tuxing
    };
    // 定义下拉列表需要显示的行星名称数组
    private static final String[] starArray = {"水星", "金星", "地球", "火星", "木星", "土星"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        // 声明一个映射对象的列表，用于保存行星的图标与名称配对信息
        List<Map<String, Object>> list = new ArrayList<>();
        // iconArray是行星的图标数组，starArray是行星的名称数组
        for (int i = 0; i < iconArray.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("icon", iconArray[i]);
            item.put("name", starArray[i]);
            list.add(item);
        }

        // 声明一个下拉列表的简单适配器，其中指定了图标与文本两组数据
        SimpleAdapter startAdapter = new SimpleAdapter(this, list,
                R.layout.spinner_simple_item,
                new String[]{"icon", "name"},
                new int[]{R.id.iv_icon, R.id.tv_name});

        Spinner sp_dropdown = findViewById(R.id.sp_dropdown);
        sp_dropdown.setAdapter(startAdapter);
        sp_dropdown.setSelection(0);
        sp_dropdown.setOnItemSelectedListener(this);
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        Toast.makeText(this, "您选择的是" + starArray[position], Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <ImageView
        android:id="@+id/iv_icon"
        android:layout_width="0dp"
        android:layout_height="50dp"
        android:layout_weight="1"
        tools:src="@drawable/diqiu" />

    <TextView
        android:id="@+id/tv_name"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="3"
        android:gravity="center"
        android:textColor="#ff0000"
        android:textSize="17sp"
        tools:text="地球" />

</LinearLayout>
```



#### 基本适配器

BaseAdapter 适配器允许开发者在别的代码文件中编写操作代码，大大提高了代码的可读性和可维护性。

从 BaseAdapter 派生的数据适配器主要实现下面5种方法：

* 构造方法：指定适配器需要处理的数据集合。
* getCount：获取列表项的个数。
* getItem：获取列表项的数据。
* getItemId：获取列表项的编号
* getView：获取每项的展示视图，并对每项的内部控件进行业务处理



步骤：

* 创建模板 `layout/spinner_base_item.xml`
* 创建实体类 `/entity/Planet.java`
* 创建适配器 `/adapter/PlanetBaseApadter.java`
* 在页面代码中创建该适配器实例，并交给下拉框设置



```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <!-- 这是显示行星图片的图像视图 -->
    <ImageView
        android:id="@+id/iv_icon"
        android:layout_width="0dp"
        android:layout_height="80dp"
        android:layout_weight="1"
        android:scaleType="fitCenter"
        tools:src="@drawable/diqiu" />

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_marginLeft="5dp"
        android:layout_weight="3"
        android:orientation="vertical">

        <!-- 这是显示行星名称的文本视图 -->
        <TextView
            android:id="@+id/tv_name"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:gravity="start|center"
            android:textColor="@color/black"
            android:textSize="20sp"
            tools:text="地球" />

        <!-- 这是显示行星描述的文本视图 -->
        <TextView
            android:id="@+id/tv_desc"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="2"
            android:gravity="start|center"
            android:textColor="@color/black"
            android:textSize="13sp"
            tools:text="地球是太阳系八大行星之一，排行第三，也是太阳系中直径、质量和密度最大的类地行星，距离太阳1.5亿公里" />
    </LinearLayout>
</LinearLayout>
```



```java
public class Planet {
    public int image; // 行星图标
    public String name; // 行星名称
    public String desc; // 行星描述

    public Planet(int image, String name, String desc) {
        this.image = image;
        this.name = name;
        this.desc = desc;
    }

    private static int[] iconArray = {R.drawable.shuixing, R.drawable.jinxing, R.drawable.diqiu};
    private static String[] nameArray = {"水星", "金星", "地球"};
    private static String[] descArray = {
            "水星是太阳系八大行星最内侧也是最小的一颗行星，也是离太阳最近的行星",
            "金星是太阳系八大行星之一，排行第二，距离太阳0.725天文单位",
            "地球是太阳系八大行星之一，排行第三，也是太阳系中直径、质量和密度最大的类地行星，距离太阳1.5亿公里"
    };

    public static List<Planet> getDefaultList() {
        List<Planet> planetList = new ArrayList<Planet>();
        for (int i = 0; i < iconArray.length; i++) {
            planetList.add(new Planet(iconArray[i], nameArray[i], descArray[i]));
        }
        return planetList;
    }
}
```



```java
public class PlanetBaseAdapter extends BaseAdapter {

    private Context mContext;
    private List<Planet> mPlaneList;    // 行星信息列表

    // 行星适配器的构造方法，传入上下文与行星列表
    public PlanetBaseAdapter(Context mContext, List<Planet> mPlaneList) {
        this.mContext = mContext;
        this.mPlaneList = mPlaneList;
    }

    // 获取列表项的个数
    @Override
    public int getCount() {
        return mPlaneList.size();
    }

    // 获取列表项的数据
    @Override
    public Object getItem(int position) {
        return mPlaneList.get(position);
    }

    // 获取列表项的编号
    @Override
    public long getItemId(int position) {
        return position;
    }

    // 获取指定位置的列表项视图
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        if (convertView == null) {
            // 根据布局文件item_list.xml生成转换视图对象
            convertView = LayoutInflater.from(mContext).inflate(R.layout.spinner_base_item, null);
            holder = new ViewHolder();
            holder.iv_icon = convertView.findViewById(R.id.iv_icon);
            holder.tv_name = convertView.findViewById(R.id.tv_name);
            holder.tv_desc = convertView.findViewById(R.id.tv_desc);
            // 将视图持有者保存到转换视图当中
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        // 给控制设置好数据
        Planet planet = mPlaneList.get(position);
        holder.iv_icon.setImageResource(planet.image);
        holder.tv_name.setText(planet.name);
        holder.tv_desc.setText(planet.desc);

        return convertView;
    }

    // 定义一个视图持有者，以便重用列表项的视图资源
    public final class ViewHolder {
        public ImageView iv_icon;
        public TextView tv_name;
        public TextView tv_desc;
    }
}
```



```java
public class MainActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    private List<Planet> planetList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Spinner sp_dropdown = findViewById(R.id.sp_dropdown);
        // 获取默认的行星列表
        planetList = Planet.getDefaultList();
        // 构建一个行星列表的适配器
        PlanetBaseAdapter adapter = new PlanetBaseAdapter(this, planetList);
        sp_dropdown.setAdapter(adapter);
        sp_dropdown.setSelection(0);
        sp_dropdown.setOnItemSelectedListener(this);
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        Toast.makeText(this, "您选择的是" + planetList.get(position).name, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
```



#### 翻页适配器

从PagerAdapter派生的翻页适配器主要实现下面6个方法：

* 构造方法：指定适配器需要处理的数据集合。
* getCount：获取页面项的个数。
* isViewFromObject：判断当前视图是否来自指定对象，返回view == object即可。
* instantiateItem：实例化指定位置的页面，并将其添加到容器中。
* destroyItem：从容器中销毁指定位置的页面。
* getPageTitle：获得指定页面的标题文本，有搭配翻页标签栏时才要实现该方法。



```java
public class Planet {
    public int image; // 行星图标
    public String name; // 行星名称
    public String desc; // 行星描述

    public Planet(int image, String name, String desc) {
        this.image = image;
        this.name = name;
        this.desc = desc;
    }

    private static int[] iconArray = {R.drawable.shuixing, R.drawable.jinxing, R.drawable.diqiu};
    private static String[] nameArray = {"水星", "金星", "地球"};
    private static String[] descArray = {
            "水星",
            "金星是太阳系八大行星之一，排行第二，距离太阳0.725天文单位",
            "地球是太阳系八大行星之一，排行第三，也是太阳系中直径、质量和密度最大的类地行星，距离太阳1.5亿公里"
    };

    public static List<Planet> getDefaultList() {
        List<Planet> planetList = new ArrayList<Planet>();
        for (int i = 0; i < iconArray.length; i++) {
            planetList.add(new Planet(iconArray[i], nameArray[i], descArray[i]));
        }
        return planetList;
    }
}
```

```java
public class ImagePagerAdapter extends PagerAdapter {
    private Context mContext;
    private List<Planet> mPlaneList;
    private List<ImageView> mViewList = new ArrayList<>();

  	// 图像翻页适配器的构造方法，传入上下文与商品信息列表
    public ImagePagerAdapter(Context mContext, List<Planet> mPlaneList) {
        this.mContext = mContext;
        this.mPlaneList = mPlaneList;
        // 给每个商品分配一个专用的图像视图
        for (Planet info : mPlaneList) {
            ImageView view = new ImageView(mContext);
            view.setLayoutParams(new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
            ));
            view.setImageResource(info.image);
            mViewList.add(view);
        }
    }

  	// 获取页面项的个数
    @Override
    public int getCount() {
        return mViewList.size();
    }

  	// 判断当前视图是否来自指定对象
    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view == object;
    }

    // 实例化指定位置的页面，并将其添加到容器中
    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {
        // 添加一个view到container中，而后返回一个跟这个view可以关联起来的对象，
        // 这个对象能够是view自身，也能够是其余对象，
        // 关键是在isViewFromObject可以将view和这个object关联起来
        ImageView item = mViewList.get(position);
        container.addView(item);
        return item;
    }

    // 从容器中销毁指定位置的页面
    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        container.removeView(mViewList.get(position));
    }

  	// 获得指定页面的标题文本
    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return mPlaneList.get(position).name;
    }
}
```



### TODO FlexboxLayout

参考：https://mp.weixin.qq.com/s/d622sEScXbHdrcwrMsPzoA



## Fragment 碎片

碎片(类似于组件)有自己的生命周期，能够划区域的展示内容，且有属于自己的独立可操作空间。它必须委托在 activity 中才能运行。

每个碎片都有对应的 XML 布局文件，依据其使用方式可分为静态注册与动态注册两类。静态注册指的是在 XML 文件中直接放置 fragment 节点，类似于一个普通控件，可被多个布局文件同时引用。静态注册一般用于某个通用的页面部件（如Logo条、广告条等），每个活动页面均可直接引用该部件。



静态注册在布局文件中直接指定 Fragment，而动态注册直到在代码中才动态添加 Fragment。

碎片的好处：

* 加快启动速度
* 降低代码耦合



### 静态注册

碎片 XML 布局文件：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="#bbffbb">

    <TextView
        android:id="@+id/tv_adv"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:text="广告图片"
        android:textColor="#000000"
        android:textSize="17sp" />

    <ImageView
        android:id="@+id/iv_adv"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="4"
        android:src="@drawable/adv" />

</LinearLayout>
```



```java
// 与布局对于的碎片代码，需继承 Fragment，并重写入口方法 onCreateView
public class StaticFragment extends Fragment {
    private static final String TAG = "fragment";
    protected View mView;   // 视图对象
    protected Context mContext; // 上下文对象

    // 创建碎片视图
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        Log.d(TAG, "Fragment onCreateView");

        mContext = getActivity();   // 获取当前活动的上下文
        mView = inflater.inflate(R.layout.fragment_static, container, false);
        ImageView iv_adv = mView.findViewById(R.id.iv_adv);
        iv_adv.setOnClickListener((View v)-> {
            Log.d(TAG, "触发点击");
        });
        return mView;   // 返回该碎片的视图对象
    }

    // 把碎片贴到页面上
    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        Log.d(TAG, "Fragment onAttach");
    }

    // 页面创建
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "Fragment onCreate");
    }

    //在活动页面创建之后
    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        Log.d(TAG, "Fragment onActivityCreated");
    }


    // 页面启动
    @Override
    public void onStart() {
        super.onStart();
        Log.d(TAG, "Fragment onStart");
    }

    // 页面恢复
    @Override
    public void onResume() {
        super.onResume();
        Log.d(TAG, "Fragment onResume");
    }

    // 页面暂停
    @Override
    public void onPause() {
        super.onPause();
        Log.d(TAG, "Fragment onPause");
    }

    // 页面停止
    @Override
    public void onStop() {
        super.onStop();
        Log.d(TAG, "Fragment onStop");
    }

    // 销毁碎片视图
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        Log.d(TAG, "Fragment onDestroyView");
    }

    // 页面销毁
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "Fragment onDestroy");
    }

    // 把碎片从页面撕下来
    @Override
    public void onDetach() {
        super.onDetach();
        Log.d(TAG, "Fragment onDetach");
    }
}
```



* fragment 节点必须指定 id 属性，否则App运行会报错。
* fragment 节点必须通过 name 属性指定碎片类的完整路径。

```xml
<!--  在页面布局文件中引入需要的 fragment  -->
<fragment
    android:id="@+id/fragment_static"
    android:name="com.example.demo.fragment.StaticFragment"
    android:layout_width="match_parent"
    android:layout_height="60dp"/>
```



### 动态注册



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="320dp">

    <!--  碎片布局xml  -->
    <ImageView
        android:id="@+id/iv_pic"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <!--  页面布局xml，动态碎片常与翻页视图一起使用  -->
    <androidx.viewpager.widget.ViewPager
        android:id="@+id/vp_content"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

</LinearLayout>
```

```java
// 碎片适配器
public class ImageFragmentAdapter extends FragmentPagerAdapter {

    private final List<Planet> mPlantList;

    // 碎片页适配器的构造方法，传入碎片管理器与商品信息列表
    public ImageFragmentAdapter(@NonNull FragmentManager fm, List<Planet> planetList) {
        // 会将当前fragment设置为Resume的状态，把上个fragment设置成Start的状态。
        // 从而可以通过fragment的onResume()来懒加载数据。
        super(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        this.mPlantList = planetList;
    }

    // 获取指定位置的碎片Fragment
    @NonNull
    @Override
    public Fragment getItem(int position) {
        // 通过 newInstance 给碎片对象传递参数信息
        Planet info = mPlantList.get(position);
        return DynamicFragment.newInstance(position, info.image);
    }

    // 获取碎片Fragment的个数
    @Override
    public int getCount() {
        return mPlantList.size();
    }

    // 获得指定碎片页的标题文本
    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return mPlantList.get(position).name;
    }

}
```

```java
// 碎片代码
public class DynamicFragment extends Fragment {

    private static final String TAG = "fragment";

    // 获取该碎片的一个实例
    public static DynamicFragment newInstance(int position, int image_id) {
        DynamicFragment fragment = new DynamicFragment(); // 创建该碎片的一个实例
        // 把参数打包，传入fragment中
        Bundle args = new Bundle();
        args.putInt("position", position);
        args.putInt("image_id", image_id);
        fragment.setArguments(args);
        return fragment;
    }

    // 创建碎片视图
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // 根据布局文件fragment_dynamic.xml生成视图对象
        View view = inflater.inflate(R.layout.fragment_dynamic, container, false);

        // 如果碎片携带有包裹，就打开包裹获取参数信息
        Bundle arguments = getArguments();
        if (arguments != null) {

            ImageView iv_pic = view.findViewById(R.id.iv_pic);
            iv_pic.setImageResource(arguments.getInt("image_id", R.drawable.huawei));
        }
        Log.d(TAG, "fragment onCreateView position=" + getPosition());
        return view;
    }

    // 从包裹取出位置序号
    private int getPosition() {
        return getArguments().getInt("position", 0);
    }

}
```

```java
// activity 代码
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        List<Planet> planetList = Planet.getDefaultList();
        // 构建碎片翻页适配器
        ImageFragmentAdapter adapter = new ImageFragmentAdapter(getSupportFragmentManager(), planetList);

        ViewPager vp_content = findViewById(R.id.vp_content);
        vp_content.setAdapter(adapter);
        vp_content.setCurrentItem(0);
    }
}
```



### 动态切换

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn1).setOnClickListener(this);
        findViewById(R.id.btn2).setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn1) {
            replaceFragment(new BlankFragment());
        } else if (v.getId() == R.id.btn2) {
            replaceFragment(new BlankFragment2());
        }
    }

    // 动态切换 Fragment
    private void replaceFragment(Fragment fragment) {
        // 获取 Fragemnt 管理器
        FragmentManager fragmentManager = getSupportFragmentManager();
        // 开启事务
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        // 在 frameLayout 布局中切换 Fragment
        transaction.replace(R.id.frameLayout, fragment);
        // 将 fragment 添加进栈，页面返回时先出栈，栈内为空时才关闭 activity
        transaction.addToBackStack(null);
        // 提交事务
        transaction.commit();
    }
}
```



### 与 Activity 通信

* 原生方案：Bundle
* 接口
* eventBus、LiveData



Bundle 方式：

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn1).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        // 通过 Bundle 通信
        Bundle bundle = new Bundle();
        bundle.putString("msg", "早上好");
        BlankFragment bf = new BlankFragment();
        bf.setArguments(bundle);
        replaceFragment(bf);
    }

    // 动态切换 Fragment
    private void replaceFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.replace(R.id.frameLayout, fragment);
        transaction.commit();
    }
}
```

```java
public class BlankFragment extends Fragment {
    private View root;

    public BlankFragment() {
    }

    public static BlankFragment newInstance(String param1, String param2) {
        BlankFragment fragment = new BlankFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            // 获取传递的参数
            String msg = getArguments().getString("msg");
            Log.d("test", msg);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        if (root == null) {
            root = inflater.inflate(R.layout.fragment_blank, container, false);
        }

        return root;
    }
}
```



接口方式：

```java
public interface IFragmentCallback {
    void sendMsgToActivity(String msg);

    String getMsgFromActivity(String msg);
}
```

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn1).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        BlankFragment bf = new BlankFragment();
        bf.setFragmentCallback(new IFragmentCallback() {
            @Override
            public void sendMsgToActivity(String msg) {
                Log.d("test", msg);
            }

            @Override
            public String getMsgFromActivity(String msg) {
                return "你好";
            }
        });
        replaceFragment(bf);
    }

    // 动态切换 Fragment
    private void replaceFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.replace(R.id.frameLayout, fragment);
        transaction.commit();
    }
}
```

```java
public class BlankFragment extends Fragment {
    private View root;

    public BlankFragment() {
    }

    public static BlankFragment newInstance(String param1, String param2) {
        BlankFragment fragment = new BlankFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    private IFragmentCallback fragmentCallback;

    public void setFragmentCallback(IFragmentCallback callback) {
        fragmentCallback = callback;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        if (root == null) {
            root = inflater.inflate(R.layout.fragment_blank, container, false);
        }

        Button btn = root.findViewById(R.id.btn_send);
        btn.setOnClickListener((View v) -> {
            // 发送消息给 activity
            // fragmentCallback.sendMsgToActivity("hello");

            // 接收 activity 发送过来的消息
            String msg = fragmentCallback.getMsgFromActivity("null");
            Log.d("test", msg);
        });

        return root;
    }
}
```









### 生命周期

![BaiduShurufa_2024-4-29_10-10-54](https://www.huangyihui.cn/upload/gburlimg/9fb79773dac87.png)



* 动态注册时，碎片的 onCreate 方法在活动的 onCreate 方法之后，其余方法的先后顺序与静态注册时保持一致。
* 注意 onActivityCreated 方法，无论是静态注册还是动态注册，该方法都在活动的onCreate方法之后，可见该方法的确在页面创建之后才调用。
* 无论当前位于哪一页，系统都只会加载当前页及相邻的左右两页，总共加载不超过3页。一旦发生页面切换，相邻页面就被加载，非相邻页面就被回收。这么做的好处是节省了宝贵的系统资源。



### 应用场景

实现微信首页滑动切换效果：

* BottomNavigationView ：底部导航栏
* Fragment ：不同的页面
* ViewPager2 ：分页滑动





## 获取 View

```java
// 获取布局
View dialogView = getLayoutInflater().inflate(R.layout.dialog_layout, null);
```





## 页面中引入其他布局 xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
		
		<!-- 通过 include 引入其他布局xml -->
    <include layout="@layout/navbar" />

</LinearLayout>
```



`layout/navbar.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="50dp"
    android:background="#aaaaff">

    <ImageView
        android:id="@+id/iv_back"
        android:layout_width="50dp"
        android:layout_height="match_parent"
        android:layout_alignParentStart="true"
        android:padding="10dp"
        android:scaleType="fitCenter"
        android:src="@drawable/ic_back" />


    <TextView
        android:id="@+id/tv_title"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_centerInParent="true"
        android:gravity="center"
        android:text="我是标题"
        android:textSize="20sp" />

</RelativeLayout>
```



## 向布局中插入元素

```java
private void inertView() {
    // 商品条目是一个线性布局，设置布局的宽度为屏幕的一半
    int screenWidth = getResources().getDisplayMetrics().widthPixels;
    LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(screenWidth / 2, LinearLayout.LayoutParams.WRAP_CONTENT);
    // 查询商品数据库中的所有商品记录
    List<GoodsInfo> list = mDBHelper.queryAllGoodsInfo();

    // 移除下面的所有子视图
    gl_list.removeAllViews();

    for (GoodsInfo info : list) {
        Log.i("test", info.toString());
        // 获取布局文件item_goods.xml的根视图
        View view = LayoutInflater.from(this).inflate(R.layout.item_goods, null);
        ImageView iv_thumb = view.findViewById(R.id.iv_thumb);
        TextView tv_name = view.findViewById(R.id.tv_name);
        TextView tv_price = view.findViewById(R.id.tv_price);
        Button btn_add = view.findViewById(R.id.btn_add);

        // 给控件设置值
        iv_thumb.setImageURI(Uri.parse(info.picPath));
        tv_name.setText(info.name);
        tv_price.setText(String.valueOf((int) info.price));

        // 添加到购物车
        btn_add.setOnClickListener(v -> {
            addToCart(info.id, info.name);
        });

        // 点击商品图片，跳转到商品详情页面
        iv_thumb.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, Detail.class);
            intent.putExtra("goods_id", info.id);
            startActivity(intent);
        });

        // 把商品视图添加到网格布局
        gl_list.addView(view, params);
    }
}
```





## LayoutParams

LayoutParams 相当于一个 Layout 的信息包，它封装了 Layout 的位置、宽、高等信息。



```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 创建布局
    LinearLayout linearLayout = new LinearLayout(this);
    // 设置布局参数
    LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
    // 将布局参数添加到布局中
    linearLayout.setLayoutParams(layoutParams);

    TextView tv = new TextView(this);
    tv.setText("我是文本");
    tv.setBackgroundColor(Color.RED);
    // 默认单位是 px
    LinearLayout.LayoutParams textLayoutParams = new LinearLayout.LayoutParams(300, 300);

    // tv.setLayoutParams(textLayoutParams);
    // linearLayout.addView(tv);

    // 将tv组件和tv布局参数添加到 linearLayout
    linearLayout.addView(tv, textLayoutParams);

    // 设置 activity 的视图为自定义的布局
    setContentView(linearLayout);

}
```











## Activity

Activity 是一个应用程序组件，提供一个屏幕，用户可以用来交互完成任务。

通过依次选择右键菜单 `New → Activity → Empty Views Activity`，弹出图示的页面快速创建窗口。



### 生命周期

* onCreate ：创建活动。把页面布局加载进内存，进入了初始状态。
* onStart ：开始活动。把活动页面显示在屏幕上，进入了就绪状态。
* onResume ：恢复活动。活动页面进入活跃状态，能够与用户正常交互，例如能响应用户点击事件等。
* onPause ：暂停活动。页面进入暂停状态，无法与用户正常交互。
* onStop ：停止活动。页面将不在屏幕上显示。
* onDestroy ：销毁活动。回收活动占用的系统资源，把页面从内存中清除。
* onRestart ：重启活动。重新加载内存中的页面数据。处于停止状态的活动，若想重新开启的话，无须经历 onCreate 的重复创建过程，而是走 onRestart 的重启过程。
* onNewIntent ：重用已有的活动实例。如果一个 Activity 已经启动过，并且存在当前应用的 Activity 任务栈中，启动模式为 singleTask / singleInstance / singleTop 时，那么在启动或回到这个 Activity 的时候，不会创建新的实例，也就是不会执行 onCreate 方法，而是执行 onNewIntent 方法。



打开新页面的方法调用顺序为：`onCreate → onStart → onResume `

关闭旧页面的方法调用顺序为：`onPause → onStop → onDestroy`



```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
      
        Log.i("demo", "onCreate");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.i("demo", "onStart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.i("demo", "onResume");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.i("demo", "onPause");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.i("demo", "onStop");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i("demo", "onDestroy");
    }

}
```



![](https://www.huangyihui.cn/upload/uploads/202403311103992.png)





### 启动和结束

* 从当前页面跳转到新页面
* 从当前页面回到上一个页面，相对于关闭的当前页面



```java
// 跳转到新页面 startActivity(new Intent(源页面this, 目标页面.class));
startActivity(new Intent(this, MainActivity2.class));

// 关闭当前页面
finish();
```



### 启动模式

系统给每个正在运行的 App 都分配了活动栈，栈里面容纳着已经创建且未销毁的活动信息。当打开某个活动，这个活动就会入栈，活动关闭时就会出栈，当栈中没有活动信息后就会退出 App。

这种出入栈情况只是默认的标准模式，Android 允许在活动创建时指定该活动的启动模式，通过启动模式控制活动的出入栈行为。

如果同时有动态和静态设置，那么动态的优先级更高。



#### 在节点中设置

方式 1：修改 `AndroidManifest.xml` ，在指定的 activity 节点添加属性 `android:launchMode` ，表示本活动以哪种启动模式运行。



* 默认启动模式 `standard` ：在该模式下，启动的 Activity 会依照启动顺序被依次压入 task 栈中。无论何时启动哪个活动，都是重新创建该页面的实例并放入栈顶。
* 栈顶复用模式 `singleTop` ：如果栈顶的 Activity 为我们要新建的 Activity (目标 Activity)，那么就不会重复创建新的 Activity。
* 栈内复用模式 `singleTask` ：与 singleTop 模式相似，只不过 singleTop 模式只是针对栈顶的元素，而 singleTask 模式下，如果 task 栈内存在目标 Activity 实例，则将 task 内的相应 Activity 实例之上的所有 Activity 弹出栈，并将相应 Activity 置于栈顶，获得焦点。
  * 应用场景：程序主界面、耗费系统资源的 Activity。
* 全局唯一模式 `singleInstance` ：在该模式下，我们会为目标 Activity 创建一个新的 Task 栈，将目标 Activity 放入新的 Task，并让其获得焦点。新的 Task 有且只有这一个 Activity 实例。如果已经创建过目标 Activity 实例，则不会创建新的 Task，而是将以前创建过的 Activity 唤醒。



```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="standard">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />

        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```





#### 动态设置

方式 2：在代码中调用 intent 对象的 setFlags 方法，表明后续打开的活动页面采用该启动标志。

**Intent 类的启动标志：**

* `Intent.FLAG_ACTIVITY_NEW_TASK` ：开辟一个新的任务栈，该值类似于 `launchMode="standard"` ，不同之处在于，如果原来不存在活动栈，则会创建一个新栈。
* `Intent.FLAG_ACTIVITY_SINGLE_TOP` ：当栈顶为待跳转的活动实例时，则重用栈顶的实例。相当于 `launchMode="singleTop"`。
* `Intent.FLAG_ACTIVITY_CLEAR_TOP` ：当栈中存在待跳转的活动实例时，则重新创建一个新实例，并清除原实例上方的所有实例。该值与 `launchMode="singleTask"` 类似，但 singleTask 采取 onNewIntent 方法启用原任务，而它采取先调用 onDestroy 再调用 onCreate 来创建新任务。
* `Intent.FLAG_ACTIVITY_NO_HISTORY` ：该标志与 `launchMode="standard"` 情况类似，但栈中不保存新启动的活动实例。这样下次无论以何种方式再启动该实例，也要走 standard 模式的完整流程。
* `Intent.FLAG_ACTIVITY_CLEAR_TASK` ：跳转到新页面时，栈中的原有实例都被清空。注意该标志需要结合 `Intent.FLAG_ACTIVITY_NEW_TASK` 使用。



```java
// 创建一个意图对象，准备跳到指定的活动页面
Intent intent = new Intent(this, MainActivity2.class);

// 当栈中存在待跳转的活动实例时，则重新创建该活动的实例，并清除原实例上方的所有实例
intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);    // 设置启动标志

// 跳转到新页面时，栈中的原有实例都被清空，同时开辟新的任务活动栈
// intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);

startActivity(intent);  // 跳转到意图对象指定的活动页面
```



### Intent

Intent 是各个组件之前信息沟通的桥梁，它用于 Android 各组件之间的通信，主要完成下列工作：

* 标明本次通信请求从哪里来、到哪里去、要怎么走
* 发起方携带本次通信需要的数据内容，接收方从收到的意图中解析数据
* 发起方若想判断接收方的处理结果，意图就要负责让接收方传回应答的数据内容



Intent 的组成部分：

| 元素名称  | 设置方法     | 说明与用途                         |
| --------- | ------------ | ---------------------------------- |
| Component | setComponent | 组件，它指定意图的来源与目标       |
| Action    | setAction    | 动作，它指定意图的动作行为         |
| Data      | setData      | 即 Uri，它指定意图要操纵的数据路径 |
| Category  | addCategory  | 类别，它指定意图的操作类别         |
| Type      | setType      | 数据类型，它指定消息的数据类型     |
| Extras    | putExtras    | 扩展信息，它指定装载的包裹信息     |
| Flags     | setFlags     | 标志位，它指定活动的启动标志       |



#### 显式 Intent

显示 Intent 直接指定来源活动与目标活动，属于精确匹配。它有三种构建方式：

* 在 Intent 的构造函数中指定
* 调用意图对象的 `setClass` 方法指定
* 调用意图对象的 `SetComponent` 方法指定



```java
// 第一个参数表示跳转的来源页面，即"来源Activity.this"；第二个参数表示待跳转的页面，即"目标Activity.class"
Intent intent = new Intent(this, MainActivity2.class);
startActivity(intent);	// 跳转到意图对象指定的活动页面


// 通过调用意图对象的 setClass 方法指定
Intent intent = new Intent();
intent.setClass(this, MainActivity2.class);
startActivity(intent);


// 通过调用意图对象的 SetComponent 方法指定
Intent intent = new Intent();
ComponentName component =  new ComponentName(this, MainActivity2.class);
intent.setComponent(component);
startActivity(intent); 
```



#### 隐式 Intent

隐式 Intent 没有明确指定要跳转的目标活动，只给出一个动作字符串让系统自动匹配，属于模糊匹配。

通常 App 不希望向外部暴露活动名称，只给出一个事先定义好的标记串，这样大家约定俗成，按图索骥就好，隐式 Intent 便起到了标记过滤作用。这个动作名称标记串，可以是自己定义的，也可以是已有的系统动作。

动作名称既可以通过 `setAction` 方法指定，也可以通过构造函数 `Intent(String action)` 直接生成意图对象。



常见系统动作的取值：

| Intent 类的系统动作常量名 | 系统动作的常量值             | 说明             |
| ------------------------- | ---------------------------- | ---------------- |
| ACTION_MAIN               | android.intent.action.MAIN   | App 启动时的入口 |
| ACTION_VIEW               | android.intent.action.VIEW   | 向用户显示数据   |
| ACTION_SEND               | android.intent.action.SEND   | 分享内容         |
| ACTION_CALL               | android.intent.action.CALL   | 直接拨号         |
| ACTION_DIAL               | android.intent.action.DIAL   | 准备拨号         |
| ACTION_SENDTO             | android.intent.action.SENDTO | 发送短信         |
| ACTION_ANSWER             | android.intent.action.ANSWER | 接听电话         |



```java
// 拨打电话
String phoneNo = "12345";
Intent intent = new Intent();
intent.setAction(Intent.ACTION_DIAL);
Uri uri = Uri.parse("tel:" + phoneNo);
intent.setData(uri);
startActivity(intent);


// 发送短信
String phoneNo = "12345";
Intent intent = new Intent();
intent.setAction(Intent.ACTION_SENDTO);
Uri uri = Uri.parse("smsto:" + phoneNo);
intent.setData(uri);
startActivity(intent);
```



```java
// 打开其他应用的活动
Intent intent = new Intent();
// 设置对应的 Action 和 Category 标记

intent.setAction("android.intent.action.CALC");
// 或者 
//Intent intent = new Intent("android.intent.action.CALC");

intent.addCategory(Intent.CATEGORY_DEFAULT);
startActivity(intent);
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld">
      	<!-- android:exported 该活动页面是否可以向外暴露 -->
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- 向外暴露标记串 -->
            <intent-filter>
                <action android:name="android.intent.action.CALC" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```



### 向下一个 Activity 发送数据

Intent 使用 Bundle 对象存放待传递的数据信息。

Bundle 对象操作各类型数据的读写方法说明：

| 数据类型     | 读方法             | 写方法             |
| ------------ | ------------------ | ------------------ |
| 整型         | getInt             | putInt             |
| 浮点数       | getFloat           | putInt             |
| 双精度数     | getDouble          | putDouble          |
| 布尔值       | getBoolean         | puttBoolean        |
| 字符串       | getString          | putString          |
| 字符串数组   | getStringArray     | putStringArray     |
| 字符串列表   | getStringArrayList | putStringArrayList |
| 可序列化结构 | getSerializable    | putSerializable    |



```java
// 发送数据
@Override
public void onClick(View v) {
    Intent intent = new Intent(this, MainActivity2.class);
  	// 创建一个新包裹
    Bundle bundle = new Bundle();
  	// 往包裹中添加数据
    bundle.putString("time", "2022-01-22");
    bundle.putString("content", "hi");
  	// 将包裹添加进 intent
    intent.putExtras(bundle);
    startActivity(intent);
}
```

```java
// 接收数据
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main2);

  	// 从上一个页面传来的意图中获取包裹
    Bundle bundle = getIntent().getExtras();
  	// 根据 key 取得数据
    String time = bundle.getString("time");
    String content = bundle.getString("content");
    String desc = String.format("time: %s, content: %s", time, content);

  	TextView tv = findViewById(R.id.tv);
    tv.setText(desc);
}
```



### 向上一个 Activity 返回数据

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private ActivityResultLauncher<Intent> register;
    private TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn).setOnClickListener(this);
        tv = findViewById(R.id.tv);

        // 监听页面返回
        register = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
            if (result != null) {
                Intent intent = result.getData();
                if (intent != null && result.getResultCode() == Activity.RESULT_OK) {
                    Bundle bundle = intent.getExtras();
                    String time = bundle.getString("time");
                    String content = bundle.getString("content");
                    String desc = String.format("time: %s, content: %s", time, content);
                    tv.setText(desc);
                }
            }
        });
    }

    // 发送数据
    @Override
    public void onClick(View v) {
        Intent intent = new Intent(this, MainActivity2.class);
        Bundle bundle = new Bundle();
        bundle.putString("time", "2022-01-22");
        bundle.putString("content", "hi");
        intent.putExtras(bundle);
      	// 使用 register 跳转，才能触发监听页面返回的回调
        register.launch(intent);
    }
}
```

```java
// 携带数据返回上一个 Activity
@Override
public void onClick(View v) {
    Intent intent = new Intent();
    Bundle bundle = new Bundle();
    bundle.putString("time", "2022-02-12");
    bundle.putString("content", "你好");
    intent.putExtras(bundle);
  	// 携带意图返回上一个页面，RESULT_OK 表示处理成功
    setResult(Activity.RESULT_OK, intent);
    finish();
}
```



### 利用资源文件配置数据

```java
// 从 string.xml 获取名叫 app_name 的字符串值
String value = getString(R.string.app_name);
TextView tv = findViewById(R.id.tv);
tv.setText(value);
```

```xml
<resources>
    <string name="app_name">activitydemo</string>
</resources>
```



### 利用元数据配置数据

元数据是一种描述其他数据的数据，它相当于描述固定活动的参数信息。

元数据的 value 属性既可直接填字符串，也可引用 strings.xml 已定义的字符串资源，引用格式形如
`“@string/字符串的资源名称”`。

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="standard">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- 在 activity 节点内部添加 meta-data 标签，通过属性 name 指定元数据的名称，通过属性 value 指定元数据的值 -->
            <meta-data android:name="weather" android:value="晴天" />
        </activity>
    </application>

</manifest>
```

```java
TextView tv = findViewById(R.id.tv);
// 获取应用包管理器
PackageManager pm = getPackageManager();
try {
    // 从应用包管理器中获取当前的活动信息
    ActivityInfo info = pm.getActivityInfo(getComponentName(), PackageManager.GET_META_DATA);
    // 获取活动附加的元数据信息
    Bundle bundle = info.metaData;
    String weather = bundle.getString("weather");
    tv.setText(weather);
} catch (PackageManager.NameNotFoundException e) {
    e.printStackTrace();
}
```



### 给页面注册快捷方式

元数据不仅能传递简单的字符串参数，还能传送更复杂的资源数据，比如快捷方式菜单。

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld">

        <!-- exported 为 true 才能在外部被调起 -->
        <activity
            android:name=".MainActivity3"
            android:exported="true" />
        <activity
            android:name=".MainActivity2"
            android:exported="false" />
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="standard">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <meta-data
                android:name="weather"
                android:value="晴天" />
            
            <!-- 注册元数据的快捷菜单配置 -->
            <!-- resource 属性可指定一个 XML 文件，表示元数据想要的复杂信息保存于 XML 数据之中 -->
            <meta-data
                android:name="android.app.shortcuts"
                android:resource="@xml/shortcuts" />
        </activity>
    </application>

</manifest>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">

  	<!--  shortcutLongLabel 的内容显示不下时会显示 shortcutShortLabel 的内容  -->
  	<!--  每个快捷方式的 shortcutId 需唯一  -->
    <shortcut
        android:enabled="true"
        android:icon="@mipmap/ic_launcher"
        android:shortcutId="first"
        android:shortcutLongLabel="@string/longName"
        android:shortcutShortLabel="@string/shortName">

        <intent
            android:action="android.intent.action.VIEW"
            android:targetClass="com.example.activitydemo.MainActivity"
            android:targetPackage="com.example.activitydemo" />
        <categories android:name="android.shortcut.conversation" />
    </shortcut>

    <shortcut
        android:enabled="true"
        android:icon="@mipmap/ic_launcher"
        android:shortcutId="cc"
        android:shortcutLongLabel="@string/longName2"
        android:shortcutShortLabel="@string/shortName2">

        <intent
            android:action="android.intent.action.VIEW"
            android:targetClass="com.example.activitydemo.MainActivity3"
            android:targetPackage="com.example.activitydemo" />
        <categories android:name="android.shortcut.conversation" />
    </shortcut>

</shortcuts>
```

```xml
<resources>
    <string name="longName">长长长长长长长</string>
    <string name="shortName">短短短</string>
    <string name="longName2">我是长名称</string>
    <string name="shortName2">短名称</string>
</resources>
```



### PendingIntent 延迟意图

延迟意图不是马上执行的意图，而是延迟若干时间才执行的意图。

意图与延迟意图的差异：

* PendingIntent代表延迟的意图，它指向的组件不会马上激活；而Intent代表实时的意图，一旦被启动，它指向的组件就会马上激活。
* PendingIntent是一类消息的组合，不但包含目标的Intent对象，还包含请求代码、请求方式等信息。
* PendingIntent对象在创建之时便已知晓将要用于活动还是广播，例如调用getActivity方法得到的是活动跳转的延迟意图，调用getBroadcast方法得到的是广播发送的延迟意图。



```java
PendingIntent pendingIntent = PendingIntent.getBroadcast(mContext, 0, intent, PendingIntent.FLAG_IMMUTABLE);
```



### Activity Results API

Activity Results API 是从 **Android 13**（API 级别 33）开始支持的。这个 API 旨在简化权限请求、文件选择、设备返回结果等操作，并且替代了传统的 `startActivityForResult()` 方法。

对于 **Android 8**（API 级别 26），Activity Results API **不被直接支持**。但是，开发者可以通过使用 `ActivityResultContracts` 的兼容库来实现类似的功能，尽管这不是官方的原生支持。

参考：https://mp.weixin.qq.com/s/B0F3a8rWxiRcYI9bIlpSRA





## Drawable 图形

Android 把所有能够显示的图形都抽象为 Drawable 类（可绘制的）。 Drawable 类型表达了各种各样的图形，包括图片、色块、画板、背景等。

包含图片在内的图形文件放在 res 目录的各个 drawable 目录下，其中 drawable 目录一般保存描述性的 XML 文件，而图片文件一般放在具体分辨率的 drawable 目录下。例如：

* drawable-xhdpi ：里面存放高分辨率的图片（如720*1280），一般对应5英寸~5.5英寸的手机。
* drawable-xxhdpi ：里面存放超高分辨率的图片（如1080*1920），一般对应6英寸~6.5英寸的手机。
* drawable-xxxhdpi ：里面存放超超高分辨率的图片（如1440*2560），一般对应7英寸以上的平板电脑。

如果各目录存放同名图片，Android 就会根据手机的分辨率分别适配对应文件夹里的图片。在开发 App 时，为了兼容不同的手机屏幕，在各目录存放不同分辨率的图片，才能达到更合适的显示效果。



在 XML 布局文件中引用图形文件可使用 `@drawable/不含扩展名的文件名称` 这种形式，各视图的 background 属性、ImageView 和 ImageButton 的 src 属性、TextView 和 Button 四个方向的 `drawable***` 系列属性都可以引用图形文件。



### Shape 形状图形

形状图形用来描述常见的几何形状，包括矩形、圆角矩形、圆形、椭圆等等。

形状图形的定义文件放在 drawable 目录下，它是以 shape 标签为根节点的 XML 描述文件，它支持四种类型的形状：

* rectangle ：矩形。默认值。
* oval ：椭圆。此时 corners 节点会失效。
* line ：直线。此时必须设置 stroke 节点，不然会报错。
* ring ：圆环。



根节点下定义了以下子节点：

* stroke ：描边

  * color ：颜色类型，描边的颜色。
  * width ：像素类型，描边的厚度。
  * dashGap ：像素类型，每段虚线之间的间隔。
  * dashWidth ：像素类型，每段虚线的宽度。若 dashGap 和 dashWidth 有一个值为0，则描边为实线。

* solid ：填充颜色

  * color ：颜色类型，内部填充的颜色

* corners ：圆角大小

  * radius ：像素类型，4个圆角的半径
  * bottomLeftRadius ：像素类型，左下圆角的半径
  * bottomRightRadius ：像素类型，右下圆角的半径
  * topLeftRadius ：像素类型，左上圆角的半径
  * topRightRadius ：像素类型，右上圆角的半径

* size ：形状图形的宽高尺寸。若无 size 节点，则表示宽高与宿主视图一样大小。

  * height ：像素类型，图形高度。
  * width ：像素类型，图形宽度。

* padding ：形状图形与周围边界的间隔

  * top ：像素类型，与上方的间隔
  * bottom ：像素类型，与下方的间隔
  * left ：像素类型，与左边的间隔
  * right ：像素类型，与右边的间隔

* gradient ：颜色渐变

  * angle ：整型，渐变的起始角度，为0时表示时钟的9点位置，值增大表示往逆时针旋转。
  * type ：字符串类型，渐变类型。有以下取值：
    * linear ：线性渐变，默认值
    * radial ：放射渐变，起始颜色就是圆心颜色
    * sweep ：滚动渐变，即一个线段以某个端点为圆心做360度旋转
  * centerX ：浮点型，圆形的 X 坐标。type 为 linear 时不可用。
  * centerY ：浮点型，圆形的 Y 坐标。type 为 linear 时不可用。
  * gradientRadius ：整型，渐变的半径。type 为 radial 时需设置该属性。
  * centerColor ：颜色类型，渐变的中间颜色。
  * startColor ：颜色类型，渐变的起始颜色。
  * endColor ：颜色类型，渐变的终止颜色。
  * userLevel ：布尔类型，设置为 true 为渐变色，false 为有渐变色。

  



```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <!--  指定形状内部的填充颜色  -->
    <solid android:color="#ffdd66" />

    <!--  指定形状轮廓的粗细和颜色  -->
    <stroke
        android:width="0dp"
        android:color="#aaaaaa" />

    <!--  指定形状四个圆角的半径  -->
    <corners android:radius="10dp" />
</shape>
```

```java
@Override
public void onClick(View v) {
    if (v.getId() == R.id.btn_rect) {
        // 修改背景
        tv.setBackgroundResource(R.drawable.shape_rect_gold);
    } else if (v.getId() == R.id.btn_oval) {
        tv.setBackgroundResource(R.drawable.shape_oval_rose);
    }
}
```



### 动画

#### 逐帧动画

```xml
<?xml version="1.0" encoding="utf-8"?>
<animation-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/ic_launcher_foreground" android:duration="1000"/>
    <item android:drawable="@drawable/ic_launcher_background" android:duration="1000"/>
</animation-list>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/ll"
    android:background="@drawable/animation"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity {

    private boolean flag = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LinearLayout ll = findViewById(R.id.ll);
        // 获取动画
        AnimationDrawable ani = (AnimationDrawable) ll.getBackground();
        ll.setOnClickListener((View v) -> {
            if (flag) {
                ani.start();    // 启动动画
                flag = false;
            } else {
                ani.stop();     // 停止动画
                flag = true;
            }
        });

    }
}
```



#### 补间动画

注意：需要把动画的 xml 文件放在 anim 目录下。

补间动画类似于过渡效果，可以修改透明度、平移、旋转、缩放等效果。

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <!--  anim/alpha.xml 不透明度从0慢慢变成1  -->
    <alpha
        android:duration="5000"
        android:fromAlpha="0"
        android:toAlpha="1" />
</set>
```

```java
LinearLayout ll = findViewById(R.id.ll);
// 通过加载 xml 动画设置文件来创建一个 animation 对象
Animation animation = AnimationUtils.loadAnimation(this, R.anim.alpha);
ll.startAnimation(animation);   // 开始动画
```



可以同时设置多个效果：

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <rotate
        android:duration="5000"
        android:fromDegrees="0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:toDegrees="360" />

    <translate
        android:duration="5000"
        android:fromXDelta="0"
        android:fromYDelta="0"
        android:toXDelta="400"
        android:toYDelta="400" />
    
</set>
```

```java
View view = findViewById(R.id.view);
Animation animation = AnimationUtils.loadAnimation(this, R.anim.rotate);
view.startAnimation(animation);
```



#### 属性动画

```java
// 2秒内将0慢慢增加为1
ValueAnimator valueAnimator = ValueAnimator.ofFloat(0f, 1f);
valueAnimator.setDuration(2000);
valueAnimator.addUpdateListener((ValueAnimator animator)-> {
    float value = (float) animator.getAnimatedValue();
    Log.d("test", value+"");
});
valueAnimator.start();


TextView tv = findViewById(R.id.tv);
// 让元素的 alpha 属性从0到1
ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(tv, "alpha", 0f, 1f);
objectAnimator.setDuration(5000);

// 动画的监听器
objectAnimator.addListener(new Animator.AnimatorListener() {
    @Override
    public void onAnimationStart(@NonNull Animator animation) {
      	// 动画开始时调用
        Log.d("test", "onAnimationStart");
    }

    @Override
    public void onAnimationEnd(@NonNull Animator animation) {
      	// 动画结束时调用
        Log.d("test", "onAnimationEnd");
    }

    @Override
    public void onAnimationCancel(@NonNull Animator animation) {
      	// 动画被取消时调用
        Log.d("test", "onAnimationCancel");
    }

    @Override
    public void onAnimationRepeat(@NonNull Animator animation) {
      	// 动画重复执行时调用
        Log.d("test", "onAnimationRepeat");
    }
});

objectAnimator.start();
```







### 九宫格图片(点9图片)

将某张图片设置成视图背景时，如果图片尺寸太小，则系统会自动拉伸图片使其填满背景。可是一旦图片拉得过大，其画面容易变得模糊。

为了解决这个问题，Android 专门设计了点九图片。点九图片的扩展名是 png，文件名后面常带有 .9 字样。因为该图片划分了 3*3 的九宫格区域，所以得名点九图片，也叫九宫格图片。点九图片拉伸图形时，只拉伸内部区域，不拉伸边缘线条。

选择 png 图片，右键菜单选择 `Create 9-Patch files` 即可创建点九图片。点九图片编辑页面会有四段黑线：

* 上边的黑线：指的是水平方向的拉伸区域。水平方向拉伸图片时，只有黑线区域内的图形会拉伸，黑线以外的图像保持原状，从而保证左右两侧的边框厚度不变。
* 左边的黑线：指的是垂直方向的拉伸区域。
* 下边的黑线：表示控件内部的文字左右边界只能放在黑线区域内，效果相当于 paddingLeft 与 paddingRight
* 右边的黑线：表示控件内部的文字上下边界只能放在黑线区域内，效果相当于 paddingTop 与 paddingBottom



注意：如果点九图片被设置为视图背景，且该图片指定了 Horizontal Padding 和 Vertical Padding，那么视图内部将一直与视图边缘保持固定间距，无论怎么调整 XML 文件和 java 代码都无法缩小间隔，缘由是点九图片早已在水平和垂直方向都设置了 padding。



```xml
<Button
    android:id="@+id/btn_rect"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/button_normal_orig"
    android:text="点九图片"></Button>
```



### 状态列表图形

StateListDrawable 状态列表图形，它在 XML 文件中规定了不同状态时所呈现的图形列表。例如实现按钮的点击效果。

右击 drawable 目录，在右键菜单中选择 `New → Drawable Resource File` ，输入文件名称和根节点名称，确定后即可创建相应的 XML  描述文件。



状态列表图形不仅用于按钮控件，还可用于其他拥有多种状态的控件。

| 状态类型的属性名称   | 说明                                                 | 适用的控件                            |
| -------------------- | ---------------------------------------------------- | ------------------------------------- |
| state_pressed        | 是否按下                                             | 按钮 Button、`android:clickable`      |
| state_checked        | 是否勾选                                             | 复选框 CheckBox、单选按钮 RadioButton |
| state_focused        | 是否获得焦点                                         | 能 focus 的控件                       |
| state_selected       | 是否选中                                             | 各控件通用                            |
| state_enabled        | 是否可用                                             |                                       |
| state_checkable      | 是否可被勾选                                         |                                       |
| state_window_focused | 是否获得窗口焦点                                     |                                       |
| state_active         | 是否处于活动状态                                     |                                       |
| state_single         | 控件包含多个子控件时，是否只显示一个子控件           |                                       |
| state_first          | 控件包含多个子控件时，第一个子控件是否处于显示状态   |                                       |
| state_middle         | 控件包含多个子控件时，中间一个子控件是否处于显示状态 |                                       |
| state_last           | 控件包含多个子控件时，最后一个子控件是否处于显示状态 |                                       |



```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/button_pressed" android:state_pressed="true" />
    <item android:drawable="@drawable/button_normal" />
</selector>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_pressed="true">
        <shape>
            <solid android:color="#ffdd66" />
            <corners android:radius="10dp" />
        </shape>
  	</item>
    <item android:state_pressed="false">
        <shape>
            <solid android:color="#ff0000" />
            <corners android:radius="10dp" />
        </shape>
  	</item>
</selector>
```

```xml
<Button
    android:id="@+id/btn"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/btn_selector"
    android:text="Button"></Button>
```



## Broadcast 广播组件

广播分为系统广播，与用户自定义广播。

与广播有关的方法主要有以下3个：

* sendBroadcast：发送广播。
* registerReceiver：注册广播的接收器，可在onStart或onResume方法中注册接收器。
* unregisterReceiver：注销广播的接收器，可在onStop或onPause方法中注销接收器。



### 收发标准广播

发送广播：先创建意图对象，再调用 sendBroadcast 方法发送广播即可。



```java
// 定义一个标准广播的接收器
public class StandardReceiver extends BroadcastReceiver {

    public static final String STANDARD_ACTION = "com.example.demo.standard";

    // 一旦接收到标准广播，马上触发接收器的onReceive方法
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && intent.getAction().equals(STANDARD_ACTION)) {
            Log.d("test", "收到一个标准广播");
        }
    }
}
```

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private StandardReceiver standardReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn_send).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        // 发送标准广播，意图对象需要指定广播的动作名称
        Intent intent = new Intent(StandardReceiver.STANDARD_ACTION);
        sendBroadcast(intent);
    }

    @Override
    protected void onStart() {
        super.onStart();
        standardReceiver = new StandardReceiver();
        // 创建一个意图过滤器，只处理STANDARD_ACTION的广播
        IntentFilter filter = new IntentFilter(StandardReceiver.STANDARD_ACTION);
        // 注册接收器，注册之后才能正常接收广播
        registerReceiver(standardReceiver, filter);
    }

    @Override
    protected void onStop() {
        super.onStop();
        // 注销接收器，注销之后就不再接收广播
        unregisterReceiver(standardReceiver);
    }

}
```



### 收发有序广播

一个广播存在多个接收器，这些接收器需要排队收听广播，这意味着该广播是条有序广播。

先收到广播的接收器A，既可让其他接收器继续收听广播，也可中断广播不让其他接收器收听。

多个接收器处理有序广播的顺序规则为：

* 优先级越大的接收器，越早收到有序广播；
* 优先级相同的时候，越早注册的接收器越早收到有序广播



```java
// 接收器A
public class OrderAReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && intent.getAction().equals(MainActivity.ORDER_ACTION)) {
            Log.d("test", "接收器A收到一个有序广播");
        }
    }
}
```

```java
// 接收器B
public class OrderBReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && intent.getAction().equals(MainActivity.ORDER_ACTION)) {
            Log.d("test", "接收器B收到一个有序广播");

            abortBroadcast();   // 中断广播，此时后面的接收器无法收到该广播
        }
    }
}
```

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    public static final String ORDER_ACTION = "com.example.demo.order";
    private OrderAReceiver orderAReceiver;
    private OrderBReceiver orderBReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn_send).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        // 发送有序广播
        Intent intent = new Intent(ORDER_ACTION);
        sendOrderedBroadcast(intent, null);
    }

    @Override
    protected void onStart() {
        super.onStart();

        orderAReceiver = new OrderAReceiver();
        IntentFilter filterA = new IntentFilter(ORDER_ACTION);
        filterA.setPriority(8);		// 设置过滤器A的优先级，数值越大优先级越高
        registerReceiver(orderAReceiver, filterA);

        orderBReceiver = new OrderBReceiver();
        IntentFilter filterB = new IntentFilter(ORDER_ACTION);
        filterB.setPriority(10);
        registerReceiver(orderBReceiver, filterB);
    }

    @Override
    protected void onStop() {
        super.onStop();
        // 注销接收器
        unregisterReceiver(orderAReceiver);
        unregisterReceiver(orderBReceiver);
    }

}
```



### 收发静态广播

在AndroidManifest.xml中注册接收器，该方式被称作静态注册；而在代码中注册接收器，该方式被称作动态注册。之所以罕见静态注册，是因为静态注册容易导致安全问题，故而Android 8.0之后废弃了大多数静态注册。话虽如此，Android倒也没有彻底禁止静态注册，只要满足特定的编码条件，那么依然能够通过静态方式注册接收器。



* 选择右键菜单的New→Package，创建名为receiver的新包，用于存放静态注册的接收器代码。
* 右击刚创建的receiver包，依次选择右键菜单的New→Other→Broadcast Receiver，输入类名。确定后会生成相应的类名文件，并且 AndroidManifest.xml 自动添加接收器的节点配置。
* 发送广播

注意，经过整改的静态注册只适用于接收App自身的广播，不能接收系统广播，也不能接收其他应用的广播。



```java
public class MyReceiver extends BroadcastReceiver {

    public static final String SHOCK_ACTION = "com.example.demo.shock";

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && intent.getAction().equals(SHOCK_ACTION)){
            Log.d("test","震动");
            // 从系统服务中获取震动管理器
            Vibrator vb = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
            // 命令震动器吱吱个若干秒，这里的500表示500毫秒
            vb.vibrate(500);
        }
    }
}
```

```xml
<uses-permission android:name="android.permission.VIBRATE" />

<!-- 自动生成的接收器节点 -->
<receiver
    android:name=".receiver.MyReceiver"
    android:enabled="true"
    android:exported="true">
    <intent-filter>
        <action android:name="com.example.demo.shock" />
    </intent-filter>
</receiver>
```

```java
@Override
public void onClick(View v) {
    // Android8.0之后删除了大部分静态注册，防止退出App后仍在接收广播，
    // 为了让应用能够继续接收静态广播，需要给静态注册的广播指定包名。
    String receiverPath = "com.example.demo.receiver.MyReceiver";
    Intent intent = new Intent(MyReceiver.SHOCK_ACTION); // 创建一个指定动作的意图
    // 发送静态广播之时，需要通过setComponent方法指定接收器的完整路径
    ComponentName componentName = new ComponentName(this, receiverPath);
    intent.setComponent(componentName); // 设置意图的组件信息
    sendBroadcast(intent); // 发送静态广播
}
```



### 监听系统广播



#### 分钟到达广播

App只要在运行时侦听分钟广播 `Intent.ACTION_TIME_TICK`，即可在分钟切换之际收到广播信息。

```java
public class TimeReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent != null){
            Log.d("test", "收到一个分钟到达广播");
        }
    }
}
```

```java
public class MainActivity extends AppCompatActivity {

    private TimeReceiver timeReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    protected void onStart() {
        super.onStart();
        // 创建一个分钟变更的广播接收器
        timeReceiver = new TimeReceiver();
        IntentFilter filter = new IntentFilter(Intent.ACTION_TIME_TICK);
        registerReceiver(timeReceiver, filter);
    }

    @Override
    protected void onStop() {
        super.onStop();
        unregisterReceiver(timeReceiver);
    }

}
```



#### 网络变更广播

侦听网络变更广播 `android.net.conn.CONNECTIVITY_CHANGE`

```java
public class NetworkReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null) {
            NetworkInfo networkInfo = intent.getParcelableExtra("networkInfo");
            // 收到一个网络变更广播，网络大类为MOBILE，网络小类为HSPA，网络制式为3G，网络状态为DISCONNECTED
            // 收到一个网络变更广播，网络大类为WIFI，网络小类为，网络制式为未知，网络状态为CONNECTED
            String text = String.format("收到一个网络变更广播，网络大类为%s，" +
                            "网络小类为%s，网络制式为%s，网络状态为%s",
                    networkInfo.getTypeName(),
                    networkInfo.getSubtypeName(),
                    Utils.getNetworkClass(networkInfo.getSubtype()),
                    networkInfo.getState().toString());
            Log.d("test", text);
        }
    }
}
```

```java
public class MainActivity extends AppCompatActivity {

    private NetworkReceiver networkReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    protected void onStart() {
        super.onStart();
        networkReceiver = new NetworkReceiver();
        IntentFilter filter = new IntentFilter("android.net.conn.CONNECTIVITY_CHANGE");
        registerReceiver(networkReceiver, filter);
    }

    @Override
    protected void onStop() {
        super.onStop();
        unregisterReceiver(networkReceiver);
    }

}
```



#### 横竖屏切换

为了避免横竖屏切换时重新加载界面的情况，Android设计了一种配置变更机制，在指定的环境配置发生变更之时，无须重启活动页面，只需执行特定的变更行为。

* 修改 AndroidManifest.xml，给需要的 activity 添加 `android:configChanges="orientation|screenLayout|screenSize"`。新属性configChanges的意思是，在某些情况之下，配置项变更不用重启活动页面，只需调用onConfigurationChanged方法重新设定显示方式。故而只要给该属性指定若干豁免情况，就能避免无谓的页面重启操作了。
* 修改活动页面的Java代码



```xml
<activity
    android:name=".MainActivity"
    android:configChanges="orientation|screenLayout|screenSize"
    android:exported="true">
</activity>
```

```java
public class MainActivity extends AppCompatActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.i("test", "onStart");
    }

    // 在配置项变更时触发。比如屏幕方向发生变更等等
    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        switch (newConfig.orientation){
            case Configuration.ORIENTATION_PORTRAIT:
                Log.d("test", "当前屏幕为竖屏方向");
                break;
            case Configuration.ORIENTATION_LANDSCAPE:
                Log.d("test", "当前屏幕为横屏方向");
                break;
            default:
                break;
        }
    }

}
```



配置变更豁免情况的取值说明：

| configChanges属性的取值 | 说明                                           |
| ----------------------- | ---------------------------------------------- |
| orientation             | 屏幕方向发生改变                               |
| screenLayout            | 屏幕的显示发生改变，例如在全屏和分屏之间切换   |
| screenSize              | 屏幕大小发生改变，例如在竖屏与横屏之间切换     |
| keyboard                | 键盘发生改变，例如使用了外部键盘               |
| keyboardHidden          | 软键盘弹出或隐藏                               |
| navigation              | 导航方式发生改变，例如采用了轨迹球导航         |
| fontScale               | 字体比例发生改变，例如在系统设置中调整默认字体 |
| locale                  | 设备的本地位置发生改变，例如切换了系统语言     |
| uiMode                  | 用户界面的模式发生改变，例如开启了夜间模式     |



如果希望App始终保持竖屏界面，即使手机旋转为横屏也不改变App的界面方向，可以修改AndroidManifest.xml，给activity节点添加android:screenOrientation属性，并将该属性设置为portrait表示垂直方向，也就是保持竖屏界面；若该属性为landscape则表示水平方向，也就是保持横屏界面。

```xml
<activity
    android:name=".ReturnDesktopActivity"
    android:screenOrientation="portrait">
</activity>
```



#### 画中画

若想知晓是否回到桌面，以及是否打开任务列表，均需收听系统广播Intent.ACTION_CLOSE_SYSTEM_DIALOGS。至于如何区分当前广播究竟是回到桌面还是打开任务列表，则要从广播意图中获取原因reason字段，该字段值为homekey时表示回到桌面，值为recentapps时表示打开任务列表。



```xml
<!-- 添加supportsPictureInPicture属性并设为true 开启画中画支持 -->
<activity
    android:name=".MainActivity"
    android:supportsPictureInPicture="true">
</activity>
```

```java
public class MainActivity extends AppCompatActivity {

    private DesktopRecevier desktopRecevier;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        desktopRecevier = new DesktopRecevier();
        IntentFilter filter = new IntentFilter(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
        registerReceiver(desktopRecevier, filter);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(desktopRecevier);
    }

    // 在进入画中画模式或退出画中画模式时触发
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode, Configuration newConfig) {
        super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);
        if (isInPictureInPictureMode) {
            Log.d("test", "进入画中画模式");
        } else {
            Log.d("test", "退出画中画模式");
        }
    }

    // 定义一个返回到桌面的广播接收器
    private class DesktopRecevier extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent != null && intent.getAction().equals(Intent.ACTION_CLOSE_SYSTEM_DIALOGS)) {
                String reason = intent.getStringExtra("reason");
                if (!TextUtils.isEmpty(reason) &&
                        (reason.equals("homekey") || reason.equals("recentapps"))) {
                    // Android 8.0开始才提供画中画模式
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                            && !isInPictureInPictureMode()) {
                        // 创建画中画模式的参数构建器
                        PictureInPictureParams.Builder builder = new PictureInPictureParams.Builder();
                        // 设置宽高比例值，第一个参数表示分子，第二个参数表示分母
                        // 下面的10/5=2，表示画中画窗口的宽度是高度的两倍
                        // 设置画中画窗口的宽高比例
                        Rational ratio = new Rational(10, 5);
                        builder.setAspectRatio(ratio);
                        // 进入画中画模式
                        enterPictureInPictureMode(builder.build());
                    }
                }
            }
        }
    }
    
}
```













### 定时管理器 AlarmManager

它利用系统闹钟定时发送广播，比分钟广播拥有更强大的功能。由于闹钟与震动器同属系统服务，且闹钟的服务名称为ALARM_SERVICE，因此依然调用getSystemService方法获取闹钟管理器的实例。

```java
// 从系统服务中获取闹钟管理器
AlarmManager alarmMgr = (AlarmManager) getSystemService(ALARM_SERVICE);
```

AlarmManager的常见方法：

* set：设置一次性定时器。第一个参数为定时器类型，通常填AlarmManager.RTC_WAKEUP；第二个参数为期望的执行时刻（单位为毫秒）；第三个参数为待执行的延迟意图（PendingIntent类型）。
* setAndAllowWhileIdle：设置一次性定时器，参数说明同set方法，不同之处在于：即使设备处于空闲状态，也会保证执行定时器。因为从Android 6.0开始，set方法在暗屏时不保证发送广播，必须调用setAndAllowWhileIdle方法才能保证发送广播。
* setRepeating：设置重复定时器。第一个参数为定时器类型；第二个参数为首次执行时间（单位为毫秒）；第三个参数为下次执行的间隔时间（单位为毫秒）；第四个参数为待执行的延迟意图（PendingIntent类型）。然而从Android 4.4开始，setRepeating方法不保证按时发送广播，只能通过setAndAllowWhileIdle方法间接实现重复定时功能。
* cancel：取消指定延迟意图的定时器。



```java
public class AlarmReceiver extends BroadcastReceiver {

    public static final String ALARM_ACTION = "com.example.demo.alarm";

    private final Context mContext;

    public AlarmReceiver(Context context) {
        super();
        this.mContext = context;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && intent.getAction().equals(ALARM_ACTION)) {
            Log.d("test", "收到闹钟广播");
            sendAlarm();
        }
    }

    // 发送闹钟广播
    public void sendAlarm() {
        Intent intent = new Intent(ALARM_ACTION);
        // 创建一个用于广播的延迟意图
        // 针对 S+（版本 10000 及更高版本）要求在创建 PendingIntent 时指定 FLAG_IMMUTABLE 或 FLAG_MUTABLE 之一。
        // 强烈考虑使用 FLAG_IMMUTABLE，仅当某些功能依赖于 PendingIntent 是可变的时才使用 FLAG_MUTABLE
        PendingIntent pendingIntent = PendingIntent.getBroadcast(mContext, 0, intent, PendingIntent.FLAG_IMMUTABLE);
        // 从系统服务中获取闹钟管理器
        AlarmManager alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            // 允许在空闲时发送广播，Android6.0之后新增的方法
            alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, 1000, pendingIntent);
        } else {
            // 设置一次性闹钟，延迟若干秒后，携带延迟意图发送闹钟广播（但Android6.0之后，set方法在暗屏时不保证发送广播，
            // 必须调用setAndAllowWhileIdle方法）
            alarmManager.set(AlarmManager.RTC_WAKEUP, 1000, pendingIntent);
        }

        // 设置重复闹钟，每隔一定间隔就发送闹钟广播（但从Android4.4开始，setRepeating方法不保证按时发送广播）
        // alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), 1000, pendingIntent);

    }
}
```

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private AlarmReceiver alarmReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn_send).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        alarmReceiver.sendAlarm();
    }

    @Override
    protected void onStart() {
        super.onStart();
        alarmReceiver = new AlarmReceiver(getApplicationContext());
        IntentFilter filter = new IntentFilter(AlarmReceiver.ALARM_ACTION);
        registerReceiver(alarmReceiver, filter);
    }

    @Override
    protected void onStop() {
        super.onStop();
        unregisterReceiver(alarmReceiver);
    }
}
```





### WorkManager 异步执行任务

WorkManager是google提供的异步执行任务的管理框架，会根据手机的API版本和应用程序的状态来选择适当的方式执行任务；

当应用在运行的时候会在应用的进程中开一条线程来执行任务，当退出应用时，WorkManager会选择根据设备的API版本使用适合的算法调用JobScheduler或者Firebase JobDispatcher,或者AlarmManager来执行任务；

参考：https://mp.weixin.qq.com/s/6KxymRdEYibOR9Gg9DwG9g



## Service

* 创建 Service
* 在清单文件中注册 Service
* 开启、停止服务。
* 绑定、解绑服务。



```java
public class MyService extends Service {
    public MyService() {

    }

    @Override
    public IBinder onBind(Intent intent) {
        Log.d("test", "onBind");
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("test", "onCreate");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("test", "onStartCommand");
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public boolean onUnbind(Intent intent) {
        Log.d("test", "onUnbind");
        return super.onUnbind(intent);
    }

    @Override
    public void onDestroy() {
        Log.d("test", "onDestroy");
        super.onDestroy();
    }
}
```

```xml
<service android:name=".MyService" />
```

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn_start).setOnClickListener(this);
        findViewById(R.id.btn_stop).setOnClickListener(this);
        findViewById(R.id.btn_bind).setOnClickListener(this);
        findViewById(R.id.btn_unbind).setOnClickListener(this);
    }

    // 通常在 Activity 被销毁时，自动解绑服务
    @Override
    protected void onDestroy() {
        super.onDestroy();
        unbindService(connection);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn_start) {
            // 开启 Service
            startService(new Intent(this, MyService.class));
        } else if (v.getId() == R.id.btn_stop) {
            // 停止 Service
            stopService(new Intent(this, MyService.class));
        } else if (v.getId() == R.id.btn_bind) {
            // bind Service
            bindService(new Intent(this, MyService.class), connection, Context.BIND_AUTO_CREATE);
        } else if (v.getId() == R.id.btn_unbind) {
            // unbind Service
            unbindService(connection);
        }
    }

    // Acticity 与 MyService 的桥梁
    private ServiceConnection connection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {

        }

        @Override
        public void onServiceDisconnected(ComponentName name) {

        }
    };
    
}
```







## 数据存储

### 共享参数 SharedPreferences

SharedPreferences 是 Android 的一个轻量级存储工具，采用的存储结构是 key-value的键值对方式。

共享参数的存储介质是符合 XML 规范的配置文件。保存路径是：`/data/data/应用包名/shared_prrefs/文件名.xml`。



共享参数主要适用于以下场合：

* 简单且孤立的数据。若是复杂且相互间有关的数据，则要保存在数据库中。
* 文本形式的数据。若是二进制数据，则要保存在文件中。
* 需要持久化保存的数据。在 App 退出后再次启动时，之前保存的数据仍然有效。

**实际开发中，共享参数经常存储的数据有 App 的个性化配置信息、用户使用 App 的行为信息、临时需要保存的片段信息等。**



* getSharedPreferences(name, mode) ：获取共享参数实例
  * name ：文件名。若不存在会自动创建。
  * mode ：模式。
    * `Context.MODE_PRIVATE` ：常规(每次保存都会更新)
    * `Context.MODE_APPEND` ：追加(每次保存都会追加到后面)
* preferences.edit()：创建一个新的Editor，通过它可以修改首选项中的数据，并自动将这些更改提交回 SharedPreferences 对象。
* editor.putString(key, value) ：通过创建的编辑器添加一个指定类型的数据。
  * putInt() 、putFloat() ...
* editor.commit() ：提交编辑器中的修改，会替换 SharedPreferences 中当前的内容。
* preferences.getString(key, null) ：通过共享参数实例的 `get*` 方法读取键值，它的第二个参数表示默认值。
  * getInt() 、getFloat() ...



```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText et_name;
    private EditText et_age;
    private EditText et_height;
    private SharedPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        et_name = findViewById(R.id.et_name);
        et_age = findViewById(R.id.et_age);
        et_height = findViewById(R.id.et_height);
        findViewById(R.id.btn_save).setOnClickListener(this);

        // 获取共享参数实例，第一个参数为文件名，第二个参数是操作模式，填MODE_PRIVATE表示私有模式。
        preferences = getSharedPreferences("config", Context.MODE_PRIVATE);
        reload();
    }

    // 加载已保存的共享参数
    private void reload() {
        // 通过共享参数实例的 get* 方法读取键值，它的第二个参数表示默认值
        String name = preferences.getString("name", null);
        if (name != null) {
            et_name.setText(name);
        }
        int age = preferences.getInt("age", 0);
        if (age != 0) {
            et_age.setText(String.valueOf(age));
        }
        float height = preferences.getFloat("height", 0f);
        if (height != 0f) {
            et_height.setText(String.valueOf(height));
        }
    }

    // 共享参数保存信息
    @Override
    public void onClick(View v) {
        String name = et_name.getText().toString();
        String age = et_age.getText().toString();
        String height = et_height.getText().toString();

        // 获取编辑器对象
        SharedPreferences.Editor editor = preferences.edit();
        // 添加不同类型的参数
        editor.putString("name", name);
        editor.putInt("age", Integer.parseInt(age));
        editor.putFloat("height", Float.parseFloat(height));
        // 提交编辑器中的修改
        editor.commit();
    }
}
```



保存后的数据：`/data/data/应用包名/shared_prrefs/config.xml`

```xml
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <string name="name">哈哈哈</string>
    <int name="age" value="23" />
    <float name="height" value="1782.0" />
</map>
```



### 存储卡的文件操作

Android 从 7.0 开始把外部存储分成了两块区域，一块是所有应用均可访问的公共空间，另一块是只有应用自己才可访问的私有空间。

Android 7.0 后默认禁止访问公共存储目录。 

Androidd 的位图工具是 Bitmap，App 读写 Bitmap 可以使用性能更好的 BufferedOutputStream 和 BufferedInputStream。



文本文件的读写：

* FileOutputStream ：用于写文件。
* FileInputStream ：用于读文件。

BitmapFactory 工具类：用于读取各种来源的图片。

* decodeStream ：从输入流中读取位图数据。
* decodeFile ：将指定路径的图片读取到 Bitmap 对象。从 Android 10开始，该方法只适用于私有目录下的图片，不适用公共空间下的图片。
* decodeResource ：从资源文件中读取图片信息。



```java
package com.example.save.utils;

public class Util {

    // 把字符串保存到指定路径的文本文件
    public static void saveText(String path, String txt) {
        BufferedWriter os = null;
        try {
            os = new BufferedWriter(new FileWriter(path));
            os.write(txt);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (os != null) {
                try {
                    os.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    // 从指定路径的文本文件中读取内容字符串
    public static String openText(String path) {
        BufferedReader is = null;
        StringBuffer sb = new StringBuffer();
        try {
            is = new BufferedReader(new FileReader(path));
            String line = null;
            while ((line = is.readLine()) != null) {
                sb.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return sb.toString();
    }
  
    // 把位图数据保存到指定路径的图片文件中
    public static void saveImage(String path, Bitmap bitmap) {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(path);
            // 把位图数据压缩到文件输出流中
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        }
    }

    // 从指定路径的图片文件中读取位图数据
    public static Bitmap openImage(String path) {
        Bitmap bitmap = null;
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(path);
            // 从文件读取流中解码出位图数据
            bitmap = BitmapFactory.decodeStream(fis);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        }

        return bitmap;
    }
  
    // 通过 FileOutputStream 把字符串保存到指定路径的文本文件中
    public static void saveFileByStream(String path, String txt) {
        // 根据路径构建文件输出流对象
        try (FileOutputStream fos = new FileOutputStream(path)) {
            fos.write(txt.getBytes());  // 把字符串写入文件输出流
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 通过 FileInputStream 从指定路径的文本文件中读取字符串
    public static String readFileByStream(String path) {
        String readStr = "";
        // 根据路径构建文件输入流对象
        try (FileInputStream fis = new FileInputStream(path)) {
            byte[] b = new byte[fis.available()];
            fis.read(b);                // 从文件输入流读取字节数组
            readStr = new String(b);    // 把字节数组转换为字符串
        } catch (Exception e) {
            e.printStackTrace();
        }

        return readStr;
    }
}
```



```java
public void onClick(View v) {
    String name = et_name.getText().toString();
    String age = et_age.getText().toString();
    String height = et_height.getText().toString();

    if (v.getId() == R.id.btn_save) {
        // 保存文件
        StringBuffer sb = new StringBuffer();
        sb.append("姓名：").append(name);
        sb.append("\n年龄：").append(age);
        sb.append("\n身高：").append(height);

        String fileName = System.currentTimeMillis() + ".txt";
        String directory = null;
        // 外部存储的私有空间 /storage/emulated/0/Android/data/包名/files/Download/ 目录
        // directory = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString();

        // 外部存储的公共空间 /storage/emulated/0/Download/ 目录
        // directory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString();

        // 内部存储私有空间 /data/user/0/包名/files/ 目录
        directory = getFilesDir().toString();

        path = directory + File.separatorChar + fileName;
        Log.i("test", path);
        Util.saveText(path, sb.toString());
        Util.showToast(this, "保存成功");
    } else if (v.getId() == R.id.btn_read) {
        // 读取文件内容
        Log.i("test", Util.openText(path));
    } else if (v.getId() == R.id.btn_saveFile) {
        // 保存图片
        String fileName = System.currentTimeMillis() + ".jpeg";
        // 获取当前 App 的私有下载目录
        path = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString() + File.separatorChar + fileName;
        // 从指定的资源文件中获取位图对象
        Bitmap b1 = BitmapFactory.decodeResource(getResources(), R.drawable.img1);
        // 把位图对象保存为图片文件
        Util.saveImage(path, b1);
        Util.showToast(this, "保存成功");
        tv_path.setText("路径：" + path);
    } else if (v.getId() == R.id.btn_readFile) {
        // 读取图片文件
        // Bitmap b2 = Util.openImage(path);

        // 方式2
        // Bitmap b2 = BitmapFactory.decodeFile(path);
        // iv_content.setImageBitmap(b2);

        // 方式3
        iv_content.setImageURI(Uri.parse(path));
    }
}
```



```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!--  Android7 开始，想在公共空间读写文件需要添加权限  -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

    <!--  android:requestLegacyExternalStorage="true"  申请权限  -->
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:requestLegacyExternalStorage="true"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```





### 应用组件 Application

Application 是 Android 的一大组件，在 App 运行过程中有且仅有一个 Application 对象贯穿整个生命周期。

适合在 Application 中保存的全局变量主要有：

* 会频繁读取的信息，如用户名、手机号等
* 不方便由意图传递的数据，如位图数据。非字符串类型的集合对象等
* 容易因频繁分配内存而导致内存泄露的对象，如 Handle 对象等



```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!--  android:name=".MyApplication" 设置自定义的Application实例  -->
    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:requestLegacyExternalStorage="true"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HelloWorld">
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

```java
package com.example.save;

import android.app.Application;
import android.content.res.Configuration;
import android.util.Log;

import androidx.annotation.NonNull;

import java.util.HashMap;

// 继承 Application 类，并重写以下的方法
public class MyApplication extends Application {

    private static MyApplication mApp;
    // 声明一个公共的信息映射对象，可当作全局变量使用
    public HashMap<String, String> infoMap = new HashMap<>();

  	// 利用单例模式获取当前应用的唯一实例
    public static MyApplication getInstance() {
        return mApp;
    }

    // 在 App 启动时调用
    @Override
    public void onCreate() {
        super.onCreate();
        mApp = this;
        Log.i("test", "onCreate");
    }

    // 在 App 终止时调用
    @Override
    public void onTerminate() {
        super.onTerminate();
        Log.i("test", "onTerminate");
    }

    // 在配置改变时调用，例如从竖屏变为横屏
    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Log.i("test", "onConfigurationChanged");
    }
}
```

```java
MyApplication app = MyApplication.getInstance();
// 设置全局变量
app.infoMap.put("name", "zhangsan");

// 读取全局变量
String name = app.infoMap.get("name");
```









## SQLite 数据库

SQLite 是一种小巧的嵌入式数据库，由于它属于轻型数据库，不涉及复杂的数据控制操作，因此 App 开发只用到数据定义和数据操纵两类 SQL。

SQLite 的 SQL 语法与通用的 SQL 语法略有不同。

数据库信息可以在调试窗口的 App Inspection 模块 → 选择设备后 → Database Inspector 中查看。

[SQLite 可视化工具](https://www.sqliteexpert.com/download.html)



注意：

* SQL 语句不区分大小写
* SQLite 支持整型 INTEGER、字符串 VARCHAR、浮点数 FLOAT，但不支持布尔类型。布尔值入库时会自动转为0或1
* 为避免重复键表，应加上 `IF NOT EXISTS` 关键词
* 建表时需要唯一标识字段，应给主键加上 `PRIMARY KEY AUTOINCREMENT NOT NULL` 关键词



### SQL 语句

#### 创建表

```
CREATE TABLE IF NOT EXISTS 表格名称 (以逗号分隔的字段定义)

String sql = "CREATE TABLE IF NOT EXISTS " + TABLE_NAME + " (" +
        "_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
        "name VARCHAR NOT NULL," +
        "age INTEGER NOT NULL," +
        "height FLOAT NOT NULL," +
        "married INTEGER NOT NULL);";
```



#### 删除表

```
DROP TABLE IF EXISTS 表格名称
String sql = "DROP TABLE " + TABLE_NAME;
```



#### 修改表结构

SQLite 只支持增加字段，不支持修改字段，也不支持删除字段。

SQLite 的 ALERT 语句每次只能添加一列字段，若要添加多列，就得分多次添加。

```
ALTER TABLE 表格名称 修改操作

String sql = "ALTER TABLE " + TABLE_NAME + " ADD COLUMN phone VARCHAAR";
```



#### 增删改查

```
INSERT INFO 表名 (字段名...) VALUES (相应的字段值)
INSERT INFO user_info (name, age) VALUES ("张三", 20)

DELETE FROM 表名 WHERE 条件
DELETE FROM user_info WHERE name="张三";
DELETE FROM user_info WHERE name="张三" OR name=”李四“;

UPDATE 表名 SET 修改内容 WHERE 条件
UPDATE user_info SET age=30 WHERE name="张三"

SELECT 字段名 FROM 表名 WHERE 条件
SELECT * FROM user_info
SELECT name FROM user_info WHERE name=“张三"

// ASC升序 DESC降序 
SELECT * FROM user_info ORDER BY age ASC
```



### SQLiteDatabase

SQLiteDatabase 是 SQLite 的数据库管理类，它提供了若干操作数据表的 API，常用的方法有 3 类：

* 管理类，用于数据库层面的操作。
  * openDataBase ：打开指定路径的数据库。
  * isOpen ：判断数据库是否已打开。
  * close ：关闭数据库。
  * getVersion ：获取数据库的版本号。
  * setVersion ：设置数据库的版本号。
* 事务类，用于事务层面的操作。
  * beginTransaction ：开始事务。
  * setTransactionSuccessful ：设置事务的成功标志。
  * endTransaction ：结束事务。
* 数据处理类，用于数据表层面的操作。
  * execSQL ：执行 SQL 语句。
  * delete ：删除符合条件的记录。
  * update ：更新符合条件的记录。
  * insert ：插入一条记录。
  * query ：执行查询操作，返回结果集的游标。
  * rawQuery ：执行 SQL 语句，返回结果集的游标。



数据库方法：

* openOrCreateDatabase() ：创建或打开数据库。
* deleteDatabase() ：删除数据库。





```java
// 创建/删除数据库
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private String mDataBaseName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn_db_create).setOnClickListener(this);
        findViewById(R.id.btn_db_del).setOnClickListener(this);

        // 生成一个测试数据库的完整路径   /data/user/0/com.example.save/files/test.db
        mDataBaseName = getFilesDir() + "/test.db";
    }


    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn_db_create) {
            // 创建或打开数据库。数据库如果不存在就创建它，如果存在就打开它
            SQLiteDatabase db = openOrCreateDatabase(mDataBaseName, Context.MODE_PRIVATE, null);
            String desc = String.format("数据库%s创建%s", db.getPath(), (db != null) ? "成功" : "失败");
            Log.i("test", desc);
        } else if (v.getId() == R.id.btn_db_del) {
            // 删除数据库
            Boolean result = deleteDatabase(mDataBaseName);
            String desc = String.format("数据库%s删除%s", mDataBaseName, result ? "成功" : "失败");
            Log.i("test", desc);
        }
    }
}
```



### SQLiteOpenHelper

SQLiteOpenHelper 是 Android 提供的数据库管理器，用于指导开发者进行 SQLite 的合理使用。

具体使用步骤如下：

* 新建一个继承自 SQLiteOpenHelper 的数据库操作类，提示重写 onCreate 和 onUpgrade 两个方法
* 封装保证数据库安全的必要方法
* 提供对表记录进行增删改查的操作方法



能被 SQLite 直接使用的数据结构是 `ContentValues` 类，它类似于映射 Map，也提供了 put 和 get 方法存取
键值对。区别之处在于：`ContentValues` 的键只能是字符串，不能是其他类型。



记录的查询操作用到了游标类 `Cursor`，调用 query 和 rawQuery 方法返回的都是 `Cursor` 对象，若要获取全
部的查询结果，则需根据游标的指示一条一条遍历结果集合。

游标 Cursor：

* 游标控制类方法，用于指定游标的状态
  * close ：关闭游标。
  * isClosed ：判断游标是否关闭。
  * isFirst ：判断游标是否在开头。
  * isLast ：判断游标是否在末尾。
* 游标移动类方法，把游标移动到指定位置。
  * moveToFirst ：游标移动到开头。
  * moveToLast ：游标移动到末尾。
  * moveToNext ：游标移动到下一条记录。
  * moveToPrevious ：游标移动到上一条记录。
  * move ：往后移动游标若干条记录。
  * moveToPosition ：移动游标到指定位置的记录。
* 获取记录类方法，可获取记录的数量、类型以及取值
  * getCount ：获取结果记录的数量。
  * getInt ：获取指定字段的整型值。
  * getLong ：获取指定字段的长整型值。
  * getFloat ：获取指定字段的浮点数值。
  * getString ：获取指定字段的字符串值。
  * getType ：获取指定字段的字段类型。



```java
// UserDBHelper.java
package com.example.save.database;

public class UserDBHelper extends SQLiteOpenHelper {

    private static final String DB_NAME = "user.db";
    private static final int DB_VERSION = 1;
    private static UserDBHelper mHelper = null;
    private SQLiteDatabase mRDB = null;
    private SQLiteDatabase mWDB = null;
    private static final String TABLE_NAME = "user_info";

    private UserDBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    // 利用单例模式获取数据库帮助器的唯一实例
    public static UserDBHelper getInstance(Context context) {
        if (mHelper == null) {
            mHelper = new UserDBHelper(context);
        }
        return mHelper;
    }

    // 打开数据库的读连接
    public SQLiteDatabase openReadLink() {
        if (mRDB == null || !mRDB.isOpen()) {
            mRDB = mHelper.getReadableDatabase();
        }
        return mRDB;
    }

    // 打开数据库的写连接
    public SQLiteDatabase openWriteLink() {
        if (mWDB == null || !mWDB.isOpen()) {
            mWDB = mHelper.getWritableDatabase();
        }
        return mWDB;
    }

    // 关闭数据库连接
    public void closeLink() {
        if (mRDB != null && mRDB.isOpen()) {
            mRDB.close();
            mRDB = null;
        }

        if (mWDB != null && mWDB.isOpen()) {
            mWDB.close();
            mWDB = null;
        }
    }


    // 只在第一次打开数据库时执行。创建数据库，执行建表语句
    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql = "CREATE TABLE IF NOT EXISTS " + TABLE_NAME + " (" +
                "_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                "name VARCHAR NOT NULL," +
                "age INTEGER NOT NULL," +
                "height FLOAT NOT NULL," +
                "married INTEGER NOT NULL);";

        db.execSQL(sql);
    }

    // 在数据库版本升级时执行。用于数据库表结构变更
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String sql = "ALTER TABLE " + TABLE_NAME + " ADD COLUMN phone VARCHAAR";
        // 一次只能插入一个字段
        db.execSQL(sql);
        sql = "ALTER TABLE " + TABLE_NAME + " ADD COLUMN password VARCHAAR";
        db.execSQL(sql);
    }

    // 插入记录
    public long insert(User user) {
        ContentValues values = new ContentValues();
        values.put("name", user.name);
        values.put("age", user.age);
        values.put("height", user.height);
        values.put("married", user.married);
        // 执行插入记录动作，该语句返回插入记录的行号
        // 如果第三个参数 values 不为 null 并且元素的个数大于0，可以把第二个参数设置为 null
        return mWDB.insert(TABLE_NAME, null, values);
    }

  	// 使用事务批量插入数据
    public long batchInsert(User user) {
        ContentValues values = new ContentValues();
        values.put("name", user.name);
        values.put("age", user.age);
        values.put("height", user.height);
        values.put("married", user.married);

        try {
          	// 开始事务
            mWDB.beginTransaction();
            mWDB.insert(TABLE_NAME, null, values);
            // int i = 10 / 0;
            mWDB.insert(TABLE_NAME, null, values);
          	
          	// 标记事务成功
            mWDB.setTransactionSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
          	// 结束事务
            mWDB.endTransaction();
        }

        return 1;
    }

    // 删除记录
    public long deleteByName(String name) {
        // mWDB.delete(TABLE_NAME, "1=1", null); // 删除所有
        return mWDB.delete(TABLE_NAME, "name=?", new String[]{name});
    }

    // 修改数据
    public long update(User user) {
        ContentValues values = new ContentValues();
        values.put("name", user.name);
        values.put("age", user.age);
        values.put("height", user.height);
        values.put("married", user.married);
        return mWDB.update(TABLE_NAME, values, "name=?", new String[]{user.name});
    }

    // 查询所有记录
    public List<User> queryAll() {
        List<User> list = new ArrayList<>();

        // 执行记录查询操作，该语句返回结果集的游标
        Cursor cursor = mRDB.query(TABLE_NAME, null, null, null, null, null, null);
        // 循环取出游标指向的每条记录
        while (cursor.moveToNext()) {
            User user = new User();
            user.id = cursor.getInt(0);
            user.name = cursor.getString(1);
            user.age = cursor.getInt(2);
            user.height = cursor.getFloat(3);
            // SQLite 没有布尔型，用0表示false，用1表示true
            user.married = (cursor.getInt(4) == 0) ? false : true;
            list.add(user);
        }

        return list;
    }

    // 查询记录
    public List<User> queryByName(String name) {
        List<User> list = new ArrayList<>();

        // 执行记录查询操作，该语句返回结果集的游标
        Cursor cursor = mRDB.query(TABLE_NAME, null, "name=?", new String[]{name}, null, null, null);
        // 循环取出游标指向的每条记录
        while (cursor.moveToPrevious()) {
            User user = new User();
            user.id = cursor.getInt(0);
            user.name = cursor.getString(1);
            user.age = cursor.getInt(2);
            user.height = cursor.getFloat(3);
            // SQLite 没有布尔型，用0表示false，用1表示true
            user.married = (cursor.getInt(4) == 0) ? false : true;
            list.add(user);
        }

        return list;
    }
}
```



```java
package com.example.save;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText et_name;
    private EditText et_age;
    private EditText et_height;
    private UserDBHelper mHelper;
    private CheckBox cb_married;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        et_name = findViewById(R.id.et_name);
        et_age = findViewById(R.id.et_age);
        et_height = findViewById(R.id.et_height);
        cb_married = findViewById(R.id.cb_married);
        findViewById(R.id.btn_insert).setOnClickListener(this);
        findViewById(R.id.btn_delete).setOnClickListener(this);
        findViewById(R.id.btn_update).setOnClickListener(this);
        findViewById(R.id.btn_query).setOnClickListener(this);
    }

    @Override
    protected void onStart() {
        super.onStart();

        // 获得数据帮助器的实例
        mHelper = UserDBHelper.getInstance(this);
        // 打开数据库帮助器的读写连接
        mHelper.openReadLink();
        mHelper.openWriteLink();
    }

    @Override
    protected void onStop() {
        super.onStop();

        // 关闭数据库连接
        mHelper.closeLink();
    }

    @Override
    public void onClick(View v) {
        String name = et_name.getText().toString();
        String age = et_age.getText().toString();
        String height = et_height.getText().toString();
        User user = null;

        if (v.getId() == R.id.btn_insert) {
            user = new User(name, Integer.parseInt(age), Float.parseFloat(height), cb_married.isChecked());
            // mHelper.insert();  // 添加数据
            if (mHelper.batchInsert(user) > 0) {
                Util.showToast(this, "添加成功");
            }
        } else if (v.getId() == R.id.btn_delete) {
            if (mHelper.deleteByName(name) > 0) {
                Util.showToast(this, "删除成功");
            }
        } else if (v.getId() == R.id.btn_update) {
            user = new User(name, Integer.parseInt(age), Float.parseFloat(height), cb_married.isChecked());
            if (mHelper.update(user) > 0) {
                Util.showToast(this, "修改成功");
            }
        } else if (v.getId() == R.id.btn_query) {
            // List<User> list = mHelper.queryAll(); // 查询所有
            List<User> list = mHelper.queryByName(name);
            for (User u : list) {
                Log.i("test", u.toString());
            }
        }
    }
}
```



## Room 简化数据库操作

Room 通过注解技术极大地简化了数据库操作，减少了原来相当一部分编码工作量。

由于Room并未集成到SDK中，而是作为第三方框架提供，因此要修改模块的 build.gradle 文件，往 dependencies 节点添加下面两行配置，表示导入指定版本的Room库：

```groovy
dependencies {

    implementation 'androidx.room:room-runtime:2.2.5'
    annotationProcessor 'androidx.room:room-compiler:2.2.5'
}
```



导入Room库之后，还要编写若干对应的代码文件。具体的编码过程分为下列步骤：

1. 编写图书信息表对应的实体类，该类添加“@Entity”注解。`entity/BookInfo.java`
2. 编写图书信息表对应的持久化类，该类添加“@Dao”注解。 `dao/BookDao.java`
3. 编写图书信息表对应的数据库类，添加“@Database”注解。 `database/BookDatabase.java`
4. 在自定义的Application类中声明图书数据库的唯一实例。 `MyApplication.java`
5. 在操作图书信息表的地方获取数据表的持久化对象 。`MainActivity.java`



```java
// entity/BookInfo.java

package com.example.book.entity;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

// @Entity 注解：表示该类是Room专用的数据类型，对应的表名称也叫BookInfo
@Entity
public class BookInfo {

    // @PrimaryKey 表示主键  autoGenerate = true 表示自动生成
    @PrimaryKey(autoGenerate = true)
    private int id;

    private String name;    // 书籍名称
    private String author;  // 作者
    private double price;   // 价格

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "BookInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", price=" + price +
                '}';
    }
}
```



假设图书信息表的持久化类名叫作 BookDao，那么该类必须添加 `@Dao` 注解，内部的记录查询方法必须添加 `@Query` 注解，记录插入方法必须添加 `@Insert` 注解，记录更新方法必须添加 `@Update` 注解，记录删除方法必须添加 `@Delete` 注解（带条件的删除方法除外）。

```java
// dao/BookDao.java

package com.example.book.dao;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.book.entity.BookInfo;

import java.util.List;

@Dao
public interface BookDao {

    @Query("SELECT * FROM BookInfo")
    List<BookInfo> queryAllBook();  // 设置查询语句

    @Query("SELECT * FROM BookInfo WHERE name = :name ORDER BY id DESC limit 1")
    BookInfo queryByName(String name);  // 设置带条件的查询语句

    @Insert
    void insert(BookInfo... book);  // 插入记录

    @Delete
    void deleteBook(BookInfo... book);

    @Query("DELETE FROM BookInfo")
    void deleteAll();   // 删除所有记录

    @Update
    int update(BookInfo... book);   // 修改记录
}
```



因为先有数据库然后才有表，所以图书信息表还得放到某个数据库里，这个默认的图书数据库要从 `RoomDatabase` 派生而来，并添加 `@Database` 注解。

```java
// database/BookDatabase.java

package com.example.book.database;

import androidx.room.Database;
import androidx.room.RoomDatabase;

import com.example.book.dao.BookDao;
import com.example.book.entity.BookInfo;

// entities表示该数据库有哪些表，version 表示数据库的版本号
// exportSchema 表示是否导出数据库信息的json串，建议设为false，若设为true还需指定json文件的保存路径
@Database(entities = {BookInfo.class}, version = 1, exportSchema = false)
public abstract class BookDatabase extends RoomDatabase {
    // 获取该数据库中某张表的持久化对象
    public abstract BookDao bookDao();
}
```



```java
// MyApplication.java

package com.example.book;

import android.app.Application;
import android.content.res.Configuration;

import androidx.annotation.NonNull;
import androidx.room.Room;

import com.example.book.database.BookDatabase;

public class MyApplication extends Application {

    private static MyApplication mApp;
    private BookDatabase bookDatabase;

    public static MyApplication getInstance() {
        return mApp;
    }

  	// 获取书籍数据库的实例
    public BookDatabase getBookDB() {
        return bookDatabase;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mApp = this;    // 在打开应用时对静态的应用实例赋值

        // addMigrations() 允许迁移数据库（发生数据库变更时，Room默认删除原数据库再创建新数据库。如此一来原来的记录会丢失，故而要改为迁移方式以便保存原有记录）
        // allowMainThreadQueries() 允许在主线程中操作数据库（Room默认不能在主线程中操作数据库）
        bookDatabase = Room.databaseBuilder(this, BookDatabase.class, "book").addMigrations().allowMainThreadQueries().build();
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
    }

    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }
}
```



```java
// MainActivity.java

package com.example.book;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import com.example.book.Util.Utils;
import com.example.book.dao.BookDao;
import com.example.book.entity.BookInfo;

import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText et_name;
    private EditText et_author;
    private EditText et_price;
    private BookDao bookDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 从App实例中获取唯一的书籍持久化对象
        bookDao = MyApplication.getInstance().getBookDB().bookDao();

        et_name = findViewById(R.id.et_name);
        et_author = findViewById(R.id.et_author);
        et_price = findViewById(R.id.et_price);
        findViewById(R.id.btn_save).setOnClickListener(this);
        findViewById(R.id.btn_delete).setOnClickListener(this);
        findViewById(R.id.btn_update).setOnClickListener(this);
        findViewById(R.id.btn_query).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        String name = et_name.getText().toString();
        String author = et_author.getText().toString();
        String price = et_price.getText().toString();

        if (v.getId() == R.id.btn_save) {
            BookInfo b1 = new BookInfo();
            b1.setName(name);
            b1.setAuthor(author);
            b1.setPrice(Double.parseDouble(price));
            bookDao.insert(b1);
            Utils.showToast(this, "保存成功");
        } else if (v.getId() == R.id.btn_delete) {
            BookInfo b2 = new BookInfo();
            // 根据名字查询到数据库中已有的记录再删除
            BookInfo b4 = bookDao.queryByName(name);
            b2.setId(b4.getId());
            bookDao.deleteBook(b2);
            // bookDao.deleteAll();
            Utils.showToast(this, "删除成功");
        } else if (v.getId() == R.id.btn_update) {
            BookInfo b3 = new BookInfo();
            // 根据名字查询到数据库中已有的记录
            BookInfo b4 = bookDao.queryByName(name);
            b3.setId(b4.getId());
            b3.setName(name);
            b3.setAuthor(author);
            b3.setPrice(Double.parseDouble(price));
            bookDao.update(b3);
            Utils.showToast(this, "修改成功");
        } else if (v.getId() == R.id.btn_query) {
            List<BookInfo> list = bookDao.queryAllBook();
            for (BookInfo b : list) {
                Log.d("res", b.toString());
            }
            Utils.showToast(this, "查询成功");
        }
    }
}
```



### DAO

DAO (Data Access Object) 数据存取对象：是指位于业务逻辑和持久化数据之间实现对持久化数据的访问。通俗来讲，就是就数据库操作都封装起来。

dao 组成部分：

* DAO 接口：把对数据库的所有操作定义成抽象方法，可以提供多种实现。
* DAO 实现类：针对不同数据库给出 DAO 接口定义方法的具体实现。
* 实体类：用于存放与传输对象数据。
* 数据库连接和关闭工具类：避免了数据库连接和关闭代码的重复使用，方便修改。





## 内容共享

### ContentProvider 内容提供者

Android 号称提供了4大组件，分别是活动 Activity、广播 Broadcast、服务 Service和内容提供器 ContentProvider。其中内容提供器涵盖与内部数据存取有关的一系列组件，完整的内容组件由内容提
供器 `ContentProvider`、内容解析器 `ContentResolver`、内容观察器 `ContentObserver` 三部分组成。



ContentProvider 为 App 存取内部数据提供统一的外部接口，让不同的应用之间得以共享数据。

ContentProvider 可操作当前设备其他应用的内部数据，它是一种中间层次的数据存储形式。

在实际编码中，ContentProvider 只是服务端 App 存取数据的抽象类，开发者需要在其基础上实现一个完
整的内容提供器，并重写下列数据库管理方法。



#### Uri

Uri(通用资源标识符 Universal Resource Identifer)，代表数据操作的地址，每一个ContentProvider 都会有唯一的地址。

ContentProvider 使用的Uri 语法结构：`content://authority/data_path/id`

* 「content://」 是通用前缀，表示该Uri用于ContentProvider定位资源。
* 「authority」 是授权者名称，用来确定具体由哪一个ContentProvider提供资源。因此一般authority都由类的小写全称组成，以保证唯一性。
* 「data_path」 是数据路径，用来确定请求的是哪个数据集。
* 「id」 是数据编号，用来请求单条数据。如果是多条这个字段忽略。



#### 服务端

1、编写用户信息表的数据库帮助器

2、编写内容提供器的基础字段类，该类需要实现接口 `BaseColumns`，同时加入几个常量定义。

3、创建内容提供器。右击 App 模块的包名目录，在弹出的右键菜单中依次选择 `New → Other → Content Provider`，打开创建对话框。

在创建对话框的 Class Name 一栏填写内容提供器的名称，比如 `UserInfoProvider`；在 URI Authorities 一
栏填写URI的授权串，比如 `com.example.server.provider.UserInfoProvider`。完成创建后，会自动往 `AndroidManifest.xml` 中添加内容提供器的注册配置。

并且会在包名目录下生成名为 `UserInfoProvider.java` 的代码文件，打开一看发现该类继承了
`ContentProvider`，并且提示重写 onCreate、insert、delete、query、update、getType 等方法，以便
对数据进行增删改查等操作。

```xml
<!-- provider的authorities属性值需要与Java代码的AUTHORITIES保持一致 -->
<provider
    android:name=".provider.UserInfoProvider"
    android:authorities="com.example.server.provider.UserInfoProvider"
    android:enabled="true"
    android:exported="true" />
```



```java
public class UserDBHelper extends SQLiteOpenHelper {

    private static final String DB_NAME = "user.db";
    public static final String TABLE_NAME = "user_info";
    private static final int DB_VERSION = 1;
    private static UserDBHelper mHelper = null;

    private UserDBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    // 利用单例模式获取数据库帮助器的唯一实例
    public static UserDBHelper getInstance(Context context) {
        if (mHelper == null) {
            mHelper = new UserDBHelper(context);
        }
        return mHelper;
    }

    // 创建数据库，执行建表语句
    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql = "CREATE TABLE IF NOT EXISTS " + TABLE_NAME + " (" +
                "_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                " name VARCHAR NOT NULL," +
                " age INTEGER NOT NULL," +
                " height LONG NOT NULL);";
        db.execSQL(sql);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    }

}
```



```java
public class UserInfoContent implements BaseColumns {

    // 这里的名称必须与AndroidManifest.xml里的android:authorities保持一致 com.example.server.provider.UserInfoProvider
    public static final String AUTHORITIES = "com.example.server.provider.UserInfoProvider";
    // 访问内容提供器的URI
    public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITIES + "/user");

    // 下面是该表的各个字段名称
    public static final String USER_NAME = "name";
    public static final String USER_AGE = "age";
    public static final String USER_HEIGHT = "height";

}
```



```java
public class UserInfoProvider extends ContentProvider {

    private UserDBHelper dbHelper;
    private static final UriMatcher URI_MATCHER = new UriMatcher(UriMatcher.NO_MATCH);

    private static final int USERS = 1;

    static {
        // 往Uri匹配器中添加指定的数据路径
        URI_MATCHER.addURI(UserInfoContent.AUTHORITIES, "/user", USERS);
    }

    public UserInfoProvider() {
    }

    @Override
    public boolean onCreate() {
        dbHelper = UserDBHelper.getInstance(getContext());
        return true;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        Log.d("test", "UserInfoProvider insert");
        if (URI_MATCHER.match(uri) == USERS) {
            SQLiteDatabase db = dbHelper.getWritableDatabase();
            long rowId = db.insert(UserDBHelper.TABLE_NAME, null, values);
            if (rowId > 0) { // 判断插入是否执行成功
                Log.d("test", "UserInfoProvider insert success");
                // 如果添加成功，就利用新记录的行号生成新的地址
                Uri newUri = ContentUris.withAppendedId(UserInfoContent.CONTENT_URI, rowId);
                // 通知监听器，数据已经改变
                getContext().getContentResolver().notifyChange(newUri, null);
            }
        }
        return uri;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        Log.d("test", "UserInfoProvider delete");
        int count = 0;

        if (URI_MATCHER.match(uri) == USERS) {
            SQLiteDatabase db1 = dbHelper.getWritableDatabase();
            count = db1.delete(UserDBHelper.TABLE_NAME, selection, selectionArgs);
            db1.close();
        }

        return count;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
                        String[] selectionArgs, String sortOrder) {
        Log.d("test", "UserInfoProvider query");
        if (URI_MATCHER.match(uri) == USERS) {
            SQLiteDatabase db = dbHelper.getReadableDatabase();
            return db.query(UserDBHelper.TABLE_NAME, projection, selection, selectionArgs, null, null, null);
        }
        return null;
    }

    @Override
    public String getType(Uri uri) {
        // TODO: Implement this to handle requests for the MIME type of the data
        // at the given URI.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection,
                      String[] selectionArgs) {
        // TODO: Implement this to handle requests to update one or more rows.
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
```



```java
public class UserInfoProvider extends ContentProvider {

    private UserDBHelper dbHelper;
    private static final UriMatcher URI_MATCHER = new UriMatcher(UriMatcher.NO_MATCH);

    private static final int USERS = 1;

    static {
        // 往Uri匹配器中添加指定的数据路径
        URI_MATCHER.addURI(UserInfoContent.AUTHORITIES, "/user", USERS);
    }

    public UserInfoProvider() {
    }

    @Override
    public boolean onCreate() {
        dbHelper = UserDBHelper.getInstance(getContext());
        return true;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        Log.d("test", "UserInfoProvider insert");
        if (URI_MATCHER.match(uri) == USERS) {
            SQLiteDatabase db = dbHelper.getWritableDatabase();
            long rowId = db.insert(UserDBHelper.TABLE_NAME, null, values);
            if (rowId > 0) { // 判断插入是否执行成功
                Log.d("test", "UserInfoProvider insert success");
                // 如果添加成功，就利用新记录的行号生成新的地址
                Uri newUri = ContentUris.withAppendedId(UserInfoContent.CONTENT_URI, rowId);
                // 通知监听器，数据已经改变
                getContext().getContentResolver().notifyChange(newUri, null);
            }
        }
        return uri;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        Log.d("test", "UserInfoProvider delete");
        int count = 0;

        if (URI_MATCHER.match(uri) == USERS) {
            SQLiteDatabase db1 = dbHelper.getWritableDatabase();
            count = db1.delete(UserDBHelper.TABLE_NAME, selection, selectionArgs);
            db1.close();
        }

        return count;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
                        String[] selectionArgs, String sortOrder) {
        Log.d("test", "UserInfoProvider query");
        if (URI_MATCHER.match(uri) == USERS) {
            SQLiteDatabase db = dbHelper.getReadableDatabase();
            return db.query(UserDBHelper.TABLE_NAME, projection, selection, selectionArgs, null, null, null);
        }
        return null;
    }

    @Override
    public String getType(Uri uri) {
        // TODO: Implement this to handle requests for the MIME type of the data
        // at the given URI.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection,
                      String[] selectionArgs) {
        // TODO: Implement this to handle requests to update one or more rows.
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
```



#### 客户端

利用 ContentProvider 封装服务端App的数据，如果客户端App想访问对方的内部数据，就要借助内容解析器ContentResolver。内容解析器是客户端 App 操作服务端数据的工具，与之对应的内容提供器则是服务端的数据接口。在活动代码中调用 `getContentResolver` 方法，即可获取内容解析器的实例。

ContentResolver提供的方法与ContentProvider一一对应，比如insert、delete、query、update、getType等，甚至连方法的参数类型都雷同。



1、创建数据的实体类

2、编写内容提供器的基础字段类，该类需要实现接口 `BaseColumns`，同时加入几个常量定义。

3、通过ContentResolver访问数据



```java
public class User {
    public int id; // 序号
    public String name; // 姓名
    public int age; // 年龄
    public long height; // 身高

    public User(){

    }

    public User(String name, int age, long height) {
        this.name = name;
        this.age = age;
        this.height = height;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", height=" + height +
                '}';
    }
}
```

```java
public class UserInfoContent implements BaseColumns {

    public static final String AUTHORITIES = "com.example.server.provider.UserInfoProvider";

    // 访问内容提供器的URI
    public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITIES + "/user");

    // 下面是该表的各个字段名称
    public static final String USER_NAME = "name";
    public static final String USER_AGE = "age";
    public static final String USER_HEIGHT = "height";

}
```

```java
@SuppressLint("Range")
@Override
public void onClick(View v) {
    if (v.getId() == R.id.btn_save) {
        ContentValues values = new ContentValues();
        values.put(UserInfoContent.USER_NAME, et_name.getText().toString());
        values.put(UserInfoContent.USER_AGE, Integer.parseInt(et_age.getText().toString()));
        values.put(UserInfoContent.USER_HEIGHT, Integer.parseInt(et_height.getText().toString()));
        getContentResolver().insert(UserInfoContent.CONTENT_URI, values);

    } else if (v.getId() == R.id.btn_delete) {
        String name = et_name.getText().toString();
        int count = getContentResolver().delete(UserInfoContent.CONTENT_URI, "name=?", new String[]{name});
        if (count > 0) {
            Toast.makeText(this, "删除成功", Toast.LENGTH_SHORT).show();
        }
    } else if (v.getId() == R.id.btn_read) {
        Cursor cursor = getContentResolver().query(UserInfoContent.CONTENT_URI, null, null, null, null);
        if (cursor != null) {
            while (cursor.moveToNext()) {
                User info = new User();
                info.id = cursor.getInt(cursor.getColumnIndex(UserInfoContent._ID));
                info.name = cursor.getString(cursor.getColumnIndex(UserInfoContent.USER_NAME));
                info.age = cursor.getInt(cursor.getColumnIndex(UserInfoContent.USER_AGE));
                info.height = cursor.getInt(cursor.getColumnIndex(UserInfoContent.USER_HEIGHT));
                Log.d("test", info.toString());
            }
            cursor.close();
        }
    }
}
```



AndroidManifest.xml

```xml
<!-- 出于安全考虑，Android 11 要求应用事先说明需要访问的其他软件包 -->
<queries>
    <!-- <package android:name="com.example.server"/> -->
    <provider android:authorities="com.example.server.provider.UserInfoProvider" />
</queries>
```



### 动态申请权限

Android系统为了防止某些App滥用权限，从6.0开始引入了运行时权限管理机制，允许App在运行过程中动态检查是否拥有某项权限，一旦发现缺少某种必需的权限，则系统会自动弹出小窗提示用户去开启该权限。

Android 6.0之前，只要App在AndroidManifest.xml中添加了权限配置，则系统会自动给App开启相关权限。但在6.0 之后，即便事先添加了权限配置，系统也不会自动开启权限，而要开发者在App运行时判断权限的开关情况，再据此动态申请未获授权的权限。



动态申请权限的步骤：

* **检查App是否开启了指定权限**。调用ContextCompat的checkSelfPermission方法。
  * 该方法的第一个参数为活动实例，第二个参数为待检查的权限名称。
  * 方法的返回值为 `PackageManager.PERMISSION_GRANTED` 时表示已经授权，否则就是未获授权。
* **请求系统弹窗，以便用户选择是否开启权限**。调用ActivityCompat的requestPermissions方法，即可命令系统自动弹出权限申请窗口。
  * 该方法的第一个参数为活动实例，第二个参数为待申请的权限名称数组，第三个参数为本次操作的请求代码。
* **判断用户的权限选择结果**。重写活动页面的权限请求回调方法onRequestPermissionsResult，在该方法内部处理用户的权限选择结果。



```java
import android.Manifest;

public class PermissionActivity extends AppCompatActivity implements View.OnClickListener {

    private static final int REQUEST_CODE_STORAGE = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_permission);

        findViewById(R.id.btn_get).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn_get) {
            if (PermissionUtil.checkPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE, REQUEST_CODE_STORAGE)) {
                Log.i("test", "已授权");
            }
        }
    }

  	// 判断用户的权限选择结果
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == REQUEST_CODE_STORAGE) {
            if (PermissionUtil.checkGrant(grantResults)) {
                Log.i("test", "权限获取成功");
            } else {
                Log.i("test", "权限获取失败");
              	jumpToSettings();
            }
        }
    }

    // 跳转到应用设置界面
    private void jumpToSettings() {
        Intent intent = new Intent();
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(Uri.fromParts("package", getPackageName(), null));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }
}
```

```java
public class PermissionUtil {
    // 检查某个权限。返回true表示已启用该权限，返回false表示未启用该权限
    public static boolean checkPermission(Activity act, String permission, int
            requestCode) {
        return checkPermission(act, new String[]{permission}, requestCode);
    }

    // 检查多个权限。返回true表示已完全启用权限，返回false表示未完全启用权限
    public static boolean checkPermission(Activity act, String[] permissions, int requestCode) {
        // Android 6.0 之后开始采用动态权限管理
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int check = PackageManager.PERMISSION_GRANTED;
            for (String permission : permissions) {
                check = ContextCompat.checkSelfPermission(act, permission);
                if (check != PackageManager.PERMISSION_GRANTED) {
                    break;
                }
            }
            // 未开启该权限，则请求系统弹窗，好让用户选择是否立即开启权限
            if (check != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(act, permissions, requestCode);
                return false;
            }
        }
        return true;
    }

    // 检查权限结果数组，返回true表示都已经获得授权。返回false表示至少有一个未获得授权
    public static boolean checkGrant(int[] grantResults) {
        if (grantResults != null) {
            // 遍历权限结果数组中的每条选择结果
            for (int grant : grantResults) {
                // 未获得授权
                if (grant != PackageManager.PERMISSION_GRANTED) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
```

```xml
<!--  声明需要的权限  -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```



在Android 10系统中，即使授权通过，App仍然无法访问公共空间，这是因为Android 10默认开启沙箱模式，不允许直接使用公共空间的文件路径，此时要修改AndroidManifest.xml，给application节点添加如下的requestLegacyExternalStorage属性：

```
android:requestLegacyExternalStorage="true"
```

从Android 11开始，为了让应用升级时也能正常访问公共空间，还得修改AndroidManifest.xml，给application节点添加如下的preserveLegacyExternalStorage属性，表示暂时关闭沙箱模式：

```
android:preserveLegacyExternalStorage="true
```



#### 权限名称

| 代码中的权限名称                           | 权限说明             |
| ------------------------------------------ | -------------------- |
| Manifest.permission.READ_EXTERNAL_STORAGE  | 读存储卡             |
| Manifest.permission.WRITE_EXTERNAL_STORAGE | 写存储卡             |
| Manifest.permission.READ_CONTACTS          | 读联系人             |
| Manifest.permission.WRITE_CONTACTS         | 写联系人             |
| Manifest.permission.SEND_SMS               | 发送短信             |
| Manifest.permission.RECEIVE_SMS            | 接收短信             |
| Manifest.permission.READ_SMS               | 读短信               |
| Manifest.permission.READ_CALL_LOG          | 读通话记录           |
| Manifest.permission.WRITE _CALL_LOG        | 写通话记录           |
| Manifest.permission.CAMERA                 | 相机                 |
| Manifest.permission.RECORD_AUDIO           | 录音                 |
| Manifest.permission.ACCESS_FINE_LOCATION   | 精确定位             |
| RECEIVE_BOOT_COMPLETED                     | 接收广播             |
| WAKE_LOCK                                  | 休眠唤醒             |
| ACCESS_NETWORK_STATE                       | 获取网络状态         |
| INTERNET                                   | 连接网络             |
| DOWNLOAD_WITHOUT_NOTIFICATION              | 下载通知             |
| MODIFY_AUDIO_SETTINGS                      | 修改系统音频设置     |
| ACCESS_WIFI_STATE                          | WIFI网络状态信息权限 |
| CHANGE_WIFI_STATE                          | 改变wifi网络状态权限 |







### 读写联系人

在实际开发中，普通App很少会开放数据接口给其他应用访问，作为服务端接口的ContentProvider基本用不到。内容组件能够派上用场的情况，往往是App想要访问系统应用的通讯数据，比如查看联系人、短信、通话记录，以及对这些通讯数据进行增、删、改、查。

访问系统的通讯数据之前，得先在AndroidManifest.xml添加相应的权限配置，常见的通讯权限配置主要有下面几个：

```xml
<!-- 联系人/通讯录。包括读联系人、写联系人 -->
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.WRITE_CONTACTS" />
<!-- 短信。包括发送短信、接收短信、读短信-->
<uses-permission android:name="android.permission.SEND_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_SMS" />
<!-- 通话记录。包括读通话记录、写通话记录 -->
<uses-permission android:name="android.permission.READ_CALL_LOG" />
<uses-permission android:name="android.permission.WRITE_CALL_LOG" />
```

```java
// 读取通讯录
@SuppressLint("Range")
private void readPhoneContacts() {
    ContentResolver resolver = getContentResolver();
    // 先查询 raw_contacts 表，在根据 raw_contacts_id 去查询 data 表
    Cursor cursor = resolver.query(ContactsContract.RawContacts.CONTENT_URI, new String[]{ContactsContract.RawContacts._ID}, null, null, null, null);
    while (cursor.moveToNext()) {
        int rawContactId = cursor.getInt(0);
        Uri uri = Uri.parse("content://com.android.contacts/contacts/" + rawContactId + "/data");
        Cursor dataCursor = resolver.query(uri, new String[]{ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.Contacts.Data.DATA1, ContactsContract.Contacts.Data.DATA2},
                null, null, null);
        ContentValues values = new ContentValues();
        while (dataCursor.moveToNext()) {
            String data1 = dataCursor.getString(dataCursor.getColumnIndex(ContactsContract.Contacts.Data.DATA1));
            String mimeType = dataCursor.getString(dataCursor.getColumnIndex(ContactsContract.Contacts.Data.MIMETYPE));
            switch (mimeType) {
                //是姓名
                case ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE:
                    values.put("name", data1);
                    break;

                //手机
                case ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE:
                    values.put("phone", data1);
                    break;
            }
        }

        dataCursor.close();
        Log.d("test", values.toString());
    }
    cursor.close();
}

// 添加联系人
private void addContacts() {
    ContentResolver resolver = getContentResolver();
    String name = "葫芦娃";
    String phone = "66612477788";

    // 创建一个插入联系人主记录的内容操作器
    ContentProviderOperation op_main = ContentProviderOperation
            .newInsert(ContactsContract.RawContacts.CONTENT_URI)
            .withValue(ContactsContract.RawContacts.ACCOUNT_NAME, null)
            .build();

    // 创建一个插入联系人姓名记录的内容操作器
    ContentProviderOperation op_name = ContentProviderOperation
            .newInsert(ContactsContract.Data.CONTENT_URI)
            // 将第0个操作的id，即 raw_contacts 的 id 作为 data 表中的 raw_contact_id
            .withValueBackReference(ContactsContract.Contacts.Data.RAW_CONTACT_ID, 0)
            .withValue(ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE)
            .withValue(ContactsContract.Contacts.Data.DATA2, name)
            .build();

    // 创建一个插入联系人电话号码记录的内容操作器
    ContentProviderOperation op_phone = ContentProviderOperation
            .newInsert(ContactsContract.Data.CONTENT_URI)
            // 将第0个操作的id，即 raw_contacts 的 id 作为 data 表中的 raw_contact_id
            .withValueBackReference(ContactsContract.Contacts.Data.RAW_CONTACT_ID, 0)
            .withValue(ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
            .withValue(ContactsContract.Contacts.Data.DATA1, phone)
            .withValue(ContactsContract.Contacts.Data.DATA2, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE)
            .build();

    // 声明一个内容操作器的列表，并将上面四个操作器添加到该列表中
    ArrayList<ContentProviderOperation> operations = new ArrayList<>();
    operations.add(op_main);
    operations.add(op_name);
    operations.add(op_phone);

    try {
        // 批量提交四个操作
        resolver.applyBatch(ContactsContract.AUTHORITY, operations);
    } catch (OperationApplicationException e) {
        e.printStackTrace();
    } catch (RemoteException e) {
        e.printStackTrace();
    }
}

// 添加联系人方式2
public void addContacts2() {
    ContentResolver resolver = getContentResolver();
    String contact_name = "葫芦娃";
    String contact_phone = "2222";

    // 构建一个指向系统联系人提供器的Uri对象
    Uri raw_uri = Uri.parse("content://com.android.contacts/raw_contacts");
    ContentValues values = new ContentValues(); // 创建新的配对
    // 往 raw_contacts 添加联系人记录，并获取添加后的联系人编号
    long contactId = ContentUris.parseId(resolver.insert(raw_uri, values));
    // 构建一个指向系统联系人数据的Uri对象
    Uri uri = Uri.parse("content://com.android.contacts/data");

    ContentValues name = new ContentValues(); // 创建新的配对
    name.put("raw_contact_id", contactId); // 往配对添加联系人编号
    // 往配对添加“姓名”的数据类型
    name.put("mimetype", "vnd.android.cursor.item/name");
    name.put("data2", contact_name); // 往配对添加联系人的姓名
    resolver.insert(uri, name); // 往提供器添加联系人的姓名记录

    ContentValues phone = new ContentValues(); // 创建新的配对
    phone.put("raw_contact_id", contactId); // 往配对添加联系人编号
    // 往配对添加“电话号码”的数据类型
    phone.put("mimetype", "vnd.android.cursor.item/phone_v2");
    phone.put("data1", contact_phone); // 往配对添加联系人的电话号码
    phone.put("data2", "2"); // 联系类型。1表示家庭，2表示工作
    resolver.insert(uri, phone); // 往提供器添加联系人的号码记录
}
```



### 利用 ContentObserver 监听短信

内容观察器 `ContentObserve`r 给目标内容注册一个观察器，目标内容的数据一旦发生变化，观察器规定好的动作马上触发，从而执行开发者预先定义的代码。

内容观察器的用法与内容提供器类似，也要从ContentObserver派生一个新的观察器，然后通过ContentResolver对象调用相应的方法注册或注销观察器。下面是内容解析器与内容观察器之间的交互方法说明。

* registerContentObserver：内容解析器要注册内容观察器。
* unregisterContentObserver：内容解析器要注销内容观察器。
* notifyChange：通知内容观察器发生了数据变化，此时会触发观察器的onChange方法。



```java
public class SmsActivity extends AppCompatActivity implements View.OnClickListener {

    private SmsGetObserver mObserver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sms);

        findViewById(R.id.btn_jump).setOnClickListener(this);
        findViewById(R.id.btn_auto_send).setOnClickListener(this);

        // 给指定Uri注册内容观察器，一旦发生数据变化，就触发观察器的onChange方法
        Uri uri = Uri.parse("content://sms");
        // notifyForDescendents：
        // false ：表示精确匹配，即只匹配该Uri，true ：表示可以同时匹配其派生的Uri
        // 假设UriMatcher 里注册的Uri共有一下类型：
        // 1.content://AUTHORITIES/table
        // 2.content://AUTHORITIES/table/#
        // 3.content://AUTHORITIES/table/subtable
        // 假设我们当前需要观察的Uri为content://AUTHORITIES/student:
        // 如果发生数据变化的 Uri 为 3。
        // 当notifyForDescendents为false，那么该ContentObserver会监听不到，但是当notifyForDescendents 为ture，能捕捉该Uri的数据库变化。
        mObserver = new SmsGetObserver(this);
        getContentResolver().registerContentObserver(uri, true, mObserver);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 移除观察器
        getContentResolver().unregisterContentObserver(mObserver);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn_jump) {
            sendSmsManual("10086", "hello");
        } else if (v.getId() == R.id.btn_auto_send) {
            sendSmsAuto("10086", "你好");
        }
    }

    // 跳到系统的短信发送页面，由用户手工编辑与发送短信
    public void sendSmsManual(String phoneNumber, String message) {
        Intent intent = new Intent(Intent.ACTION_SENDTO, Uri.parse("smsto:" + phoneNumber));
        intent.putExtra("sms_body", message);
        startActivity(intent);
    }

    // 无需用户操作，由App自动发送短信
    public void sendSmsAuto(String phoneNumber, String message) {
        // 短信发送事件
        String SENT_SMS_ACTION = "com.example.client.SENT_SMS_ACTION";
        // 短信接收事件
        String DELIVERED_SMS_ACTION = "com.example.client.DELIVERED_SMS_ACTION";

        // 以下指定短信发送事件的详细信息
        Intent sentIntent = new Intent(SENT_SMS_ACTION);
        sentIntent.putExtra("phone", phoneNumber);
        sentIntent.putExtra("message", message);
        PendingIntent sentPI = PendingIntent.getBroadcast(this, 0, sentIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        // 以下指定短信接收事件的详细信息
        Intent deliverIntent = new Intent(DELIVERED_SMS_ACTION);
        deliverIntent.putExtra("phone", phoneNumber);
        deliverIntent.putExtra("message", message);
        PendingIntent deliverPI = PendingIntent.getBroadcast(this, 1, deliverIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        // 获取默认的短信管理器
        SmsManager smsManager = SmsManager.getDefault();
        // 开始发送短信内容。要确保打开发送短信的完全权限，不是那种还需提示的不完整权限
        smsManager.sendTextMessage(phoneNumber, null, message, sentPI, deliverPI);
    }

    private static class SmsGetObserver extends ContentObserver {

        private final Context mContext;

        public SmsGetObserver(Context context) {
            super(new Handler(Looper.getMainLooper()));
            this.mContext = context;
        }

        @SuppressLint("Range")
        @Override
        public void onChange(boolean selfChange, @Nullable Uri uri) {
            super.onChange(selfChange, uri);
            // onChange会多次调用，收到一条短信会调用两次onChange
            // mUri===content://sms/raw/20
            // mUri===content://sms/inbox/20
            // 安卓7.0以上系统，点击标记为已读，也会调用一次
            // mUri===content://sms
            // 收到一条短信都是uri后面都会有确定的一个数字，对应数据库的_id，比如上面的20
            if (uri == null) {
                return;
            }
            if (uri.toString().contains("content://sms/raw") ||
                    uri.toString().equals("content://sms")) {
                return;
            }

            // 通过内容解析器获取符合条件的结果集游标
            Cursor cursor = mContext.getContentResolver().query(uri, new String[]{"address", "body", "date"}, null, null, "date DESC");
            if (cursor.moveToNext()) {
                // 短信的发送号码
                String sender = cursor.getString(cursor.getColumnIndex("address"));
                // 短信内容
                String content = cursor.getString(cursor.getColumnIndex("body"));
                Log.d("test", String.format("sender:%s,content:%s", sender, content));
            }
            cursor.close();
        }
    }
}
```



### 发彩信

```java
public class MmsActivity extends AppCompatActivity implements View.OnClickListener {

    private ImageView iv_img;
    private ActivityResultLauncher<Intent> mResultLauncher;
    private Uri picUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mms);

        iv_img = findViewById(R.id.iv_img);
        iv_img.setOnClickListener(this);
        findViewById(R.id.btn_send).setOnClickListener(this);

        // 跳转到系统相册，选择图片，并返回
        mResultLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), new ActivityResultCallback<ActivityResult>() {
            @Override
            public void onActivityResult(ActivityResult result) {
                if (result.getResultCode() == RESULT_OK) {
                    Intent intent = result.getData();
                    // 获得选中图片的路径对象
                    picUri = intent.getData();
                    if (picUri != null) {
                        // ImageView 显示刚刚选中的图片
                        iv_img.setImageURI(picUri);
                        Log.d("test", "picUri:" + picUri.toString());
                    }
                }
            }
        });
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.iv_img) {
            // 跳转到系统相册，选择图片，并返回
            Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
            // 设置内容类型为图片类型
            intent.setType("image/*");
            // 打开系统相册，并等待图片选择结果
            mResultLauncher.launch(intent);
        } else if (v.getId() == R.id.btn_send) {
            sendMms("10086", "我是标题", "我是内容");
        }
    }

    // 发送彩信
    private void sendMms(String phone, String title, String message) {
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // Intent 的接受者将被准许读取Intent 携带的URI数据
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        // 彩信发送的目标号码
        intent.putExtra("address", phone);
        // 彩信的标题
        intent.putExtra("subject", title);
        // 彩信的内容
        intent.putExtra("sms_body", message);
        // 彩信的图片附件
        intent.putExtra(Intent.EXTRA_STREAM, picUri);
        // 彩信的附件为图片
        intent.setType("image/*");
        // 因为未指定要打开哪个页面，所以系统会在底部弹出选择窗口
        startActivity(intent);
        Toast.makeText(this, "请在弹窗中选择短信或者信息应用", Toast.LENGTH_SHORT).show();
    }
}
```



### FileProvider

通过系统相册固然可以获得照片的路径对象，却无法知晓更多的详细信息，例如照片名称、文件大小、文件路径等信息，也就无法进行个性化的定制开发。为了把更多的文件信息开放出来，Android设计了专门的媒体共享库，允许开发者通过内容组件从中获取更详细的媒体信息。



#### 获取图片信息发送彩信

```java
public class ProviderMmsActivity extends AppCompatActivity {

    private static final String[] PERMISSIONS = new String[]{
            Manifest.permission.READ_EXTERNAL_STORAGE
    };

    private static final int PERMISSION_REQUEST_CODE = 1;

    private List<ImageInfo> mImageList = new ArrayList<>();
    private GridLayout gl_list;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_provider_mms);

        gl_list = findViewById(R.id.gl_list);

        //手动让MediaStore扫描入库
        MediaScannerConnection.scanFile(this,
                new String[]{Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString()},
                null, null);

        if (PermissionUtil.checkPermission(this, PERMISSIONS, PERMISSION_REQUEST_CODE)) {
            // 加载图片列表
            loadImageList();
            // 显示图像网格
            showImageGrid();
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_CODE &&
                PermissionUtil.checkGrant(grantResults)) {
            // 加载图片列表
            loadImageList();
            // 显示图像网格
            showImageGrid();
        }
    }

    // 显示图像网格
    private void showImageGrid() {
        gl_list.removeAllViews();
        for (ImageInfo image : mImageList) {
            // image -> ImageView
            ImageView iv_appendix = new ImageView(this);
            Bitmap bitmap = BitmapFactory.decodeFile(image.path);
            iv_appendix.setImageBitmap(bitmap);
            // 设置图像视图的缩放类型
            iv_appendix.setScaleType(ImageView.ScaleType.FIT_CENTER);
            // 设置图像视图的布局参数
            int px = Utils.dip2px(this, 110);
            ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(px, px);
            iv_appendix.setLayoutParams(params);
            // 设置图像视图的内部间距
            int padding = Utils.dip2px(this, 5);
            iv_appendix.setPadding(padding, padding, padding, padding);
            iv_appendix.setOnClickListener(v -> {
                sendMms("10086", "title", "哈哈哈", image.path);
            });
            // 把图像视图添加至网格布局
            gl_list.addView(iv_appendix);
        }
    }

    // 加载图片列表
    @SuppressLint("Range")
    private void loadImageList() {
        //MediaStore
        String[] columns = new String[]{
                MediaStore.Images.Media._ID, // 编号
                MediaStore.Images.Media.TITLE, // 标题
                MediaStore.Images.Media.SIZE,// 文件大小
                MediaStore.Images.Media.DATA,// 文件路径
        };
        // 图片大小在300KB以内
        Cursor cursor = getContentResolver().query(
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                columns,
                "_size < 307200",
                null,
                "_size DESC"
        );
        int count = 0;
        if (cursor != null) {
            while (cursor.moveToNext() && count < 6) {
                ImageInfo image = new ImageInfo();
                image.id = cursor.getLong(cursor.getColumnIndex(MediaStore.Images.Media._ID));
                image.name = cursor.getString(cursor.getColumnIndex(MediaStore.Images.Media.TITLE));
                image.size = cursor.getLong(cursor.getColumnIndex(MediaStore.Images.Media.SIZE));
                image.path = cursor.getString(cursor.getColumnIndex(MediaStore.Images.Media.DATA));
                if (Utils.checkFileUri(this, image.path)) {
                    count++;
                    mImageList.add(image);
                }
                Log.d("test", "image:" + image.toString());
            }
        }

    }

    // 发送带图片的彩信
    private void sendMms(String phone, String title, String message, String path) {
        // 根据指定路径创建一个Uri对象
        Uri uri = Uri.parse(path);
        // 兼容Android7.0，把访问文件的Uri方式改为FileProvider
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            // 通过FileProvider获得文件的Uri访问方式
            uri = FileProvider.getUriForFile(this, getString(R.string.file_provider), new File(path));
            Log.d("test", String.format("new uri:%s", uri.toString()));
        }
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // Intent 的接受者将被准许读取Intent 携带的URI数据
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        // 彩信发送的目标号码
        intent.putExtra("address", phone);
        // 彩信的标题
        intent.putExtra("subject", title);
        // 彩信的内容
        intent.putExtra("sms_body", message);
        // 彩信的图片附件
        intent.putExtra(Intent.EXTRA_STREAM, uri);
        // 彩信的附件为图片
        intent.setType("image/*");
        // 因为未指定要打开哪个页面，所以系统会在底部弹出选择窗口
        startActivity(intent);
        Toast.makeText(this, "请在弹窗中选择短信或者信息应用", Toast.LENGTH_SHORT).show();
    }
}
```

```java
// entity/ImageInfo.java
public class ImageInfo {
    public long id; // 图片编号
    public String name; // 图片标题
    public long size; // 文件大小
    public String path; // 文件路径

    @Override
    public String toString() {
        return "ImageInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", size=" + size +
                ", path='" + path + '\'' +
                '}';
    }
}
```

```java
// util/PermissionUtil.java
public class PermissionUtil {
    // 检查某个权限。返回true表示已启用该权限，返回false表示未启用该权限
    public static boolean checkPermission(Activity act, String permission, int
            requestCode) {
        return checkPermission(act, new String[]{permission}, requestCode);
    }

    // 检查多个权限。返回true表示已完全启用权限，返回false表示未完全启用权限
    public static boolean checkPermission(Activity act, String[] permissions, int requestCode) {
        // Android 6.0 之后开始采用动态权限管理
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int check = PackageManager.PERMISSION_GRANTED;
            for (String permission : permissions) {
                check = ContextCompat.checkSelfPermission(act, permission);
                if (check != PackageManager.PERMISSION_GRANTED) {
                    break;
                }
            }
            // 未开启该权限，则请求系统弹窗，好让用户选择是否立即开启权限
            if (check != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(act, permissions, requestCode);
                return false;
            }
        }
        return true;
    }

    // 检查权限结果数组，返回true表示都已经获得授权。返回false表示至少有一个未获得授权
    public static boolean checkGrant(int[] grantResults) {
        if (grantResults != null) {
            // 遍历权限结果数组中的每条选择结果
            for (int grant : grantResults) {
                // 未获得授权
                if (grant != PackageManager.PERMISSION_GRANTED) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
```

```java
// util/Utils.java
public class Utils {
    // 根据手机的分辨率从 dp 的单位 转成为 px(像素)
    public static int dip2px(Context context, float dpValue) {
        // 获取当前手机的像素密度（1个dp对应几个px）
        float scale = context.getResources().getDisplayMetrics().density;
        // 四舍五入取整
        return (int) (dpValue * scale + 0.5f);
    }

    // 检查文件是否存在，以及文件路径是否合法
    public static boolean checkFileUri(Context ctx, String path) {
        File file = new File(path);
        Log.d("test", "old path:" + path);
        if (!file.exists() || !file.isFile() || file.length() <= 0) {
            return false;
        }
        try {
            // 检测文件路径是否支持 FileProvider 访问方式，如果发生异常，说明不支持
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                FileProvider.getUriForFile(ctx, ctx.getString(R.string.file_provider), file);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
```



还需要配置以下信息：

```xml
<resources>
    <string name="app_name">client</string>
    <!--  路径  -->
    <string name="file_provider">com.example.client.ProviderMmsActivity</string>
</resources>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <!--sdcard 下所有文件都可以访问-->
    <external-path path="." name="external_storage_root" />
    <!--只有该目录下的文件可以访问 -->
    <external-path path="Download" name="external_storage_download" />
</paths>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- 声明需要的权限 -->
  	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" /> 
  	<!-- 短信。包括发送短信、接收短信、读短信 -->
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.RECEIVE_SMS" />
    <uses-permission android:name="android.permission.READ_SMS" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Demo">
        <meta-data
            android:name="com.google.android.actions"
            android:resource="@xml/file_paths" />

        <activity
            android:name=".ProviderMmsActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

      	<!-- 兼容Android7.0，把访问文件的Uri方式改为FileProvider -->
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="@string/file_provider"
            android:grantUriPermissions="true">

            <!-- 配置哪些路径是可以通过FileProvider访问的 -->
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>
    </application>

</manifest>
```



#### 安装 apk



```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
```

```java
public class ProviderApkActivity extends AppCompatActivity implements View.OnClickListener {

    private static final String[] PERMISSIONS = new String[]{
            Manifest.permission.READ_EXTERNAL_STORAGE
    };

    private static final int PERMISSION_REQUEST_CODE = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_provider_apk);

        findViewById(R.id.btn_install).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        // Android 11 之后获取 MANAGE_EXTERNAL_STORAGE 权限
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Log.d("test", "Android 11+");
            checkAndInstall();
        } else {
            // 如果有权限，直接安装，没有权限则获取权限
            if (PermissionUtil.checkPermission(this, PERMISSIONS, PERMISSION_REQUEST_CODE)) {
                installApk();
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_CODE &&
                PermissionUtil.checkGrant(grantResults)) {
            installApk();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.R)
    private void checkAndInstall() {
        // 检查是否拥有MANAGE_EXTERNAL_STORAGE 权限，没有则跳转到设置页面
        if (!Environment.isExternalStorageManager()) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.setData(Uri.fromParts("package", getPackageName(), null));
            startActivity(intent);
        } else {
            installApk();
        }
    }

    private void installApk() {
        String apkPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString() + "/app-release.apk";
        Log.d("test", "apkPath:" + apkPath);
        // 获取应用包管理器
        PackageManager pm = getPackageManager();
        // 获取apk文件的包信息
        PackageInfo pi = pm.getPackageArchiveInfo(apkPath, PackageManager.GET_ACTIVITIES);
        if (pi == null) {
            Toast.makeText(this, "安装文件已经损坏!", Toast.LENGTH_SHORT).show();
            return;
        }
        // installer
        Uri uri = Uri.parse(apkPath);
        // 兼容Android7.0，把访问文件的Uri方式改为FileProvider
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            // 通过FileProvider获得文件的Uri访问方式
            uri = FileProvider.getUriForFile(this, getString(R.string.file_provider), new File(apkPath));
            Log.d("test", String.format("new uri:%s", uri.toString()));
        }
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        // 设置Uri的数据类型为APK文件
        intent.setDataAndType(uri, "application/vnd.android.package-archive");
        // 启动系统自带的应用安装程序
        startActivity(intent);
    }
}
```





## Notification 通知



`NotificationManager` 类是一个通知管理器类，这个对象是由系统维护的服务，是以单例模式的方法获得，可以通过 `getSystemService(NOTIFICATION_SERVICE)` 方法获取。

* getSystemService(str) ：通过 Android 系统级服务的句柄，返回对应的对象。
* NotificationManager 实例下的方法：
  * `notify` ：发送通知
  * `cancel` ：关闭通知



使用 `NotificationCompat` 类的 `Builder` 构造器来创建 `Notification` 对象，可以保证程序在所有版本上都能正常工作。 Android 8 新增了通知渠道这个概念，如果没有设置，则通知无法在 Android 8 的机器上显示。

`NotificationChannel` 通知渠道，其允许您为要显示的每种通知类型创建用户可自定义的渠道。

通知重要程度设置：

* `NotificationManager.IMPORTANCE_NONE` ：关闭通知。
* `NotificationManager.IMPORTANCE_MIN` ：开启通知，不会弹出，没提示音，状态栏中不显示。
* `NotificationManager.IMPORTANCE_LOW` ：开启通知，不会弹出，没提示音，状态栏中显示。
* `NotificationManager.IMPORTANCE_DEFAULT` ：开启通知，不会弹出，发出提示音，状态栏中显示。
* `NotificationManager.IMPORTANCE_HIGH` ：开启通知，会弹出，发出提示音，状态栏中显示。



`NotificationCompat.Builder()` ：创建 `Notification` 对象。

* `setContentTitle` ：设置标题
* `setContentText` ：设置文本内容
* `setSmallIcon` ：设置小图标。图标应使用 alpha 图层，而不是 RGB 图层。
* `setLargeIcon` ：设置大图标
* `setColor` ：设置小图标的颜色
* `setContentIntent` ：设置点击通知后的跳转意图
* `setAutoCancel` ：设置点击通知后自动清除通知
* `setWhen` ：设置通知被创建的时间



```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private NotificationManager manager;    // 通知管理器实例
    private Notification notification;      // 通知对象

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btn_send).setOnClickListener(this);
        findViewById(R.id.btn_close).setOnClickListener(this);


        // 获取通知管理器实例
        manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        // 点击通知要跳转的意图对象
        Intent intent = new Intent(this, MainActivity2.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE);

        // Android 8 以上需设置通知渠道
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("hlw", "测试通知", NotificationManager.IMPORTANCE_HIGH);
            manager.createNotificationChannel(channel);
        }

        // 创建通知对象，渠道 id 需要和上面定义的 id 一致
        notification = new NotificationCompat.Builder(this, "hlw")
                .setContentTitle("我是标题")
                .setContentText("我是内容")
                .setSmallIcon(R.drawable.ic_launcher_background)
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.ic_launcher_background))
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)
                .build();

    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn_send) {
            // 发送通知
            manager.notify(1, notification);
        } else if (v.getId() == R.id.btn_close) {
            // 关闭通知
            manager.cancel(1);
        }
    }
}
```

```xml
<!--  声明权限  -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```







## Log

Android 采用 Log 工具打印日志，它将各类日志划分为五个等级：

* `Log.e` ：表示错误信息，比如可能导致程序崩溃的异常。
* `Log.w` ：表示警告信息。
* `Log.i` ：表示一般信息。
* `Log.d` ：表示调试信息。
* `Log.v` ：表示冗余信息。



```java
import android.util.Log;

Log.d("tagName","info");
```





## Handler

```java
// 延迟处理功能，用到了Handler工具的postDelayed方法，该方法的第一个参数为待处理的Runnable任务对象，第二个参数为延迟间隔（单位为毫秒）

private void goNextPage() {
    // 延迟3秒（3000毫秒）后启动任务mGoNext
    new Handler(Looper.myLooper()).postDelayed(mGoNext, 3000);
}

private Runnable mGoNext = new Runnable() {
    @Override
    public void run() {
        Log.i("test", "run")
    }
};
```

```java
// setTimeout 效果，回调函数 3000 毫秒后执行
new Handler().postDelayed(()-> {
    Log.d("test", "hhhh");
}, 3000);
```





## Toast

对于一句话的提示，Android设计了 Toast 控件，用于展示短暂的提示文字。

* makeText(ctx, text, duration) ：用来构建提示文字的模板
  * 第一个参数为当前页面的实例
  * 第二个参数为准备显示的提示文本
  * 第三个参数规定了提示窗的驻留时长，为 `Toast.LENGTH_SHORT` 表示停留2秒后消失，为 `Toast.LENGTH_LONG` 表示停留3.5秒后消失。
* show() ：展示提示窗

```java
Toast.makeText(MainActivity.this, "提示文字", Toast.LENGTH_SHORT).show();

Toast.makeText(this, "提示文字", Toast.LENGTH_SHORT).show();
```



## GestureDetector 手势检测

当用户触摸屏幕的时候，会产生许多手势，例如down，up，scroll，filing等等；

Android sdk给我们提供了GestureDetector类，通过这个类我们可以识别很多的手势；

参考：https://mp.weixin.qq.com/s/CVOahiISbvU-fSl40pyk8A



## kit

```java
public class Utils {

		// 格式化时间
    public static String getNowTime(){
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(new Date());
    }
  
    // 根据手机的分辨率从 dp 的单位 转成为 px(像素)
    public static int dip2px(Context context, float dpValue) {
        // 获取当前手机的像素密度（1个dp对应几个px）
        float scale = context.getResources().getDisplayMetrics().density;
        // 四舍五入取整
        return (int) (dpValue * scale + 0.5f);
    }
  
  	// 关闭屏幕上的输入法软键盘
    public static void hideOneInputMethod(Activity act, View v) {
        // 从系统服务中获取输入法管理器
        InputMethodManager imm = (InputMethodManager) act.getSystemService(Context.INPUT_METHOD_SERVICE);
        // 关闭屏幕上的输入法软键盘
        imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
    }
  
  	// 弹出提示窗
    public static void showToast(Context ctx, String desc) {
        Toast.makeText(ctx, desc, Toast.LENGTH_SHORT).show();
    }
  
  	// 生成六位随机数
    public static String getRandomNumber() {
        return String.format("%06d", new Random().nextInt(999999));
    }  

}
```



## AAR

‌AAR（Android Archive）文件‌是一种用于传递Android库文件的包格式，它包含了Android项目的所有组件，如代码、资源文件和AndroidManifest.xml文件等。通过使用AAR格式，开发者可以将功能模块独立封装，方便重用和共享‌。



### AAR文件的特点和用途

1. ‌**包含多种组件**‌：AAR文件可以包含Android资源、清单文件等，使得开发者可以在布局和可绘制对象等共享资源中进行捆绑‌。
2. ‌**支持C/C++库**‌：AAR文件可以包含C/C++库，供应用模块的C/C++代码使用‌。
3. ‌**模块化开发**‌：在开发中，AAR文件使得模块化开发变得更加容易，开发者可以将重复使用的代码、资源和布局等封装成AAR文件，然后在其他项目中引用‌。

### 生成和使用AAR文件的步骤

1. ‌**创建Android Library模块**‌：在Android Studio中，通过File > New > New Module，选择Android Library并完成相关设置。创建完成后，将需要重复使用的代码、资源和布局等放入该模块中‌。
2. ‌**修改Gradle配置**‌：在Library模块的build.gradle文件中添加相应的配置，例如使用`apply plugin: 'maven-publish'`来配置发布设置‌。
3. ‌**打包AAR文件**‌：在Library模块中，通过点击Build > Make Module 'app'来打包生成AAR文件，打包成功后会在指定的路径下生成AAR文件‌。
4. ‌**在其他项目中引用AAR文件**‌：将生成的AAR文件添加到其他项目的依赖中。可以在其他项目的build.gradle文件中添加如下依赖：`implementation files('libs/your-library.aar')`‌。



## 常见问题

### 修改默认主体色

在 `themes.xml` 中修改 `parent` 值。

```xml
<resources xmlns:tools="http://schemas.android.com/tools">
    <style name="Base.Theme.HelloWorld" parent="Theme.MaterialComponents.Light.NoActionBar.Bridge">
    </style>

    <style name="Theme.HelloWorld" parent="Base.Theme.HelloWorld" />
</resources>
```



### 快捷键



* `Alt + Enter` ：快速补全/引入
* `Ctrl + Alt + F`  ：可以快速将变量设置为私有变量
* `Ctrl + Alt + L`  ：格式化



### gradle 下载慢

修改 `gradle/wrapper/gradle-wrappper.properties` 文件：

```
#Thu Mar 17 14:07:42 CST 2022
distributionBase=GRADLE_USER_HOME
#distributionUrl=https\://services.gradle.org/distributions/gradle-7.2-bin.zip

# 改成腾讯源
distributionUrl=https://mirrors.cloud.tencent.com/gradle/gradle-7.2-bin.zip
distributionPath=wrapper/dists
zipStorePath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
```



### 镜像源

[Android Studio 配置国内镜像源](https://blog.csdn.net/UnityBoy/article/details/141825396) 



https://developer.aliyun.com/mvn/guide





### 打包流程

参考：https://mp.weixin.qq.com/s/E9bYHEgaH9IGKdPuLyJMWw



### 串口通讯

参考：https://mp.weixin.qq.com/s/3lOn9QKliUfaiZYgLOBr9g



### BLE蓝牙开发

参考：https://mp.weixin.qq.com/s/IctNPC-ICz4AEdxJypdgRQ



### 截屏实现方式和监听截屏

参考：https://mp.weixin.qq.com/s/DFoatE9qsquf_6-ZUHxQLw



### 指纹验证登录

参考：https://mp.weixin.qq.com/s/-IvAw54SzCxoSEU8_M-yoA



### 修改开机logo和动画

参考：https://mp.weixin.qq.com/s/jlmbf2K9kzeVbfvYnu7rCw











