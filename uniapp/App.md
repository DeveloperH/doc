# App

在App端JS脚本运行在独立的JS引擎中，vue页面使用系统webview渲染，nvue页面使用系统原生View渲染。

Android平台：JS脚本运行在独立Google V8引擎中，版本与Chrome83一致，因此支持的语法与Android系统版本无关。

iOS平台：JS脚本运行在iOS操作系统提供的JavaScriptCore 引擎，因此支持的语法与iOS系统有关，跟iOS系统的Safari浏览器一致。



App打包时，注意如果涉及三方sdk，需进行申请并在manifest.json里配置，否则相关功能无法使用。

iOS App打包需要向Apple申请证书。



`uni-app`在App侧可以使用丰富的小程序sdk，如网易云信、环信、七牛等众多sdk厂商均原厂维护其小程序sdk版本，而这些sdk均可直接用于uni-app并发布为iOS、Android的App。https://ask.dcloud.net.cn/article/35070

App和web提供了renderjs，使得浏览器专用的库也可以在App和web里使用，https://uniapp.dcloud.net.cn/tutorial/renderjs.html





## splash 启动页

Android平台启动图使用.9.png图片：https://ask.dcloud.net.cn/article/35527

Android平台签名证书(.keystore)生成指南：https://ask.dcloud.net.cn/article/35777



## Demo

### 下载安装 apk

```js
// #ifdef APP
let versionCode = plus.runtime.versionCode;

detailValueConfig('seller_app_version').then(res => {
  if (Number(res.data.value) > Number(versionCode)) {

    uni.showModal({
      title: '更新提示',
      content: '检测到新版本，请立即下载更新。',
      confirmText: '好的',
      showCancel: false,
      success: res => {
        if (res.confirm) {
          uni.showModal({
            title: '请稍等',
            content: '正在更新...',
            showCancel: false,
            confirmText: '',
          })

          let downloadApkUrl = "https://szdbi.oss-cn-shenzhen.aliyuncs.com/unattended/shangjia.apk"

          var dtask = plus.downloader.createDownload(downloadApkUrl, {}, function(d, status) {
            if (status == 200) {
              plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(
                error) {
                uni.showToast({
                  title: '安装失败',
                  duration: 1500
                });
              })
            } else {
              uni.showToast({
                title: '更新失败',
                duration: 1500
              });
            }
          })
          dtask.start(); //执行下载
        }
      }
    })
  }
})
// #endif
```



### 离线打包app 无法安装问题

HBuilder X 3.8.7-alpha开始。离线打包将安装功能独立成单独的aar `install-apk-release.aar`，上架谷歌市场不能包含此库，非谷歌市场可酌情考量。

不包含此库，调用 `plus.runtime.install` 将无法安装apk文件。

解决方案：把 `install-apk-release.aar` 放到项目中并引入即可。



### 跳转到系统蓝牙

```js
let main = plus.android.runtimeMainActivity();
let Intent = plus.android.importClass("android.content.Intent");
main.startActivity(new Intent('android.settings.BLUETOOTH_SETTINGS'));
```



## 离线打包

文档：https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html



### 创建证书

* App离线SDK下载：[最新android平台SDK下载](https://nativesupport.dcloud.net.cn/AppDocs/download/android.html) ，sdk 版本要和 HBuilder 版本一致，否则运行有提示

* 申请Appkey，具体请点击[链接](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey.html)

* 创建证书 

  * ```sh
    keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
    ```

  * testalias是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字

  * test.keystore是证书文件名称，可修改为自己想设置的文件名称，也可以指定完整文件路径

  * 36500是证书的有效期，表示100年有效期，单位天，建议时间设置长一点，避免证书过期

* 查看证书 SHA1，SHA256 信息，修改应用的 SHA1值 为解析出来的值。保存后会更新Appkey。

  * ```sh
    keytool -list -v -keystore test.keystore  
    ```





查看证书报错：keytool 错误: java.io.IOException: Invalid keystore format。

1. 打开 `app/build.gradle`，在 android 内部加：

```
buildTypes {
    release {
        signingConfig signingConfigs.release
        // ...
    }
}
```

2. 在 AS 右侧 Gradle → Task → 执行 signingReport，就可以查看证书信息了。





### 获取MD5

```sh
# 获取der文件
keytool -exportcert -keystore 证书名称.keystore -alias 你的别名 -storepass 你的密码 -file cert.der

# 获取MD5
openssl x509 -in cert.der -inform DER -md5 -noout -fingerprint
```

如果这条命令成功，会输出类似：`MD5 Fingerprint=XX:XX:XX:...` 。



### 获取公钥

```sh
# 获取der文件
keytool -exportcert -keystore 证书名称.keystore -alias 你的别名 -storepass 你的密码 -file cert.der

# 获取公钥
openssl x509 -in cert.der -inform DER -modulus -noout
```

它会输出类似：

```
Modulus=C732EEED692C6916F309DDA86B673A1A0E53F7F4E43288669F89B3345349227BAE907FC9A320650EF8A27FBDB7CFA7E843C08E4A1AB8E6479ADDB414022BC143F809DD003F813EAEBD35C2048C885A654BF8A65E51758F380EB38B9DF5A81F125018B26B3F0971D6D6BE6E27E0017DABCE5D7F68B538B9DA442F05C39204ECDB40A6DA0CD05A420FB71B95679F216534D0AA0C537D26D545C43200F161981A02D0556AF59ADA728C2172A0D6BFB2ACCA11F89CCA6BAF584A16FB2DE791927D69F26821A41BF34914484DB58D8A4B591916E10CED7370E8CC2799EF3BA32A1B014144155A5FCBBA92F9963EFD652EFE78EC81B792D00C5A2DA2DF60993EF0AF85
```

等号后面那串 **512 个十六进制字符**就是你需要的**公钥模数** 。





### 运行报错

```
as 运行出现 The project is using an incompatible version (AGP 8.7.3) of the Android Gradle plugin. Latest supported version is AGP 8.3.1

AGP 8.7.3 需要 Android Studio Jellyfish (2023.3.1) 或更高版本

修改项目根目录的 build.gradle 文件：
buildscript {
    dependencies {
        // 将 AGP 版本从 8.7.3 改为 8.3.1
        classpath 'com.android.tools.build:gradle:8.3.1'
    }
}

修改源
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.4-bin.zip
```





## Uniapp: 原生Android插件开发调试打包详细历程

https://blog.51cto.com/u_16117621/6292772





## ios

iOS证书证书申请：https://blog.csdn.net/qq_39196447/article/details/136877424

IOS隐私信息访问的许可描述：https://blog.csdn.net/2301_81028896/article/details/145042464



## 应用上架

### 应用宝

* [申请账号](https://open.tencent.com/) ，完成个人/企业认证
* 软著





### 华为应用市场

* [申请账号](https://developer.huawei.com/) ，完成个人/企业认证
* 软著





## 原生插件

### 扩展 Module

下面以TestModule为例，源码请查看 UniPlugin-Hello-AS 工程中的`uniplugin_module`模块。

```java
//Module 扩展必须继承 UniModule 类
public class TestModule extends UniModule {}
```



- 扩展方法必须加上 `@UniJSMethod (uiThread = false or true)` 注解。UniApp 会根据注解来判断当前方法是否要运行在 UI 线程，和当前方法是否是扩展方法。
  - `uiThread` 的值决定了 JS 调用原生代码时，这段原生代码是跑在 **主线程（UI 线程）** 还是 **子线程（非 UI 线程）**。
  - 需要操作 UI，例如更新界面、弹出对话框、修改 View 属性等，用 true，否则都用 false。
- UniApp是根据反射来进行调用 Module 扩展方法，所以Module中的扩展方法必须是 public 类型。
- Module 扩展的方法可以使用 int, double, float, String, Map, List ,com.alibaba.fastjson.JSONObject 类型的参数

```java
//run ui thread
@UniJSMethod(uiThread = true)
public void testAsyncFunc(JSONObject options, UniJSCallback callback) {
    Log.e(TAG, "testAsyncFunc--"+options);
    if(callback != null) {
        JSONObject data = new JSONObject();
        data.put("code", "success");
        callback.invoke(data);
    }
}

//run JS thread
@UniJSMethod (uiThread = false)
public JSONObject testSyncFunc(){
    JSONObject data = new JSONObject();
    data.put("code", "success");
    return data;
}
```



### UniJSCallback 结果回调

JS 调用时，有的场景需要返回一些数据，比如以下例子，返回x、y坐标。

```
void invoke(Object data);
void invokeAndKeepAlive(Object data);
```

- `invoke` 调用 javascript 回调方法，此方法将在调用后被销毁。
- `invokeAndKeepAlive`  调用 javascript 回调方法并保持回调活动以备以后使用。



### globalEvent 事件

用于页面监听持久性事件，例如定位信息，陀螺仪等的变化。

**注意**：globalEvent 事件只能通过页面的 UniSDKInstance 实例给当前页面发送 globalEvent 事件。其他页面无法接受。所以经常在 App.vue 中设置监听全局事件。



```js
// 页面监听event事件
var globalEvent = uni.requireNativePlugin('globalEvent');
globalEvent.addEventListener('myEvent', function(e) {
  console.log('myEvent'+JSON.stringify(e));
});

// 或者在 App.vue 中监听。myEvent 是原生插件中发出事件的名称
plus.globalEvent.addEventListener('myEvent', (res) => {
  console.log(res);
});
```



```java
// 插件 原生代码发出myEvent事件
Map<String,Object> params=new HashMap<>();
params.put("type","typeName");
params.put("key","value");
mUniSDKInstance.fireGlobalEventCallback("myEvent", params);
```



### mUniSDKInstance

```java
if(mUniSDKInstance.getContext() != null) {
  	Context context = mUniSDKInstance.getContext();
    Activity activity = (Activity) mUniSDKInstance.getContext();
    Context appContext = (Context) mUniSDKInstance.getContext().getApplicationContext();
}

Map<String,Object> params=new HashMap<>();
params.put("type","typeName");
params.put("key","value");
mUniSDKInstance.fireGlobalEventCallback("myEvent", params);
```



### 常见问题

**如何查看如何查看uniapp console日志：**

修改项目中assets/data/dcloud_control.xml 内部信息。将syncDebug改为true，开启调试模式。 注意正式版需要改为false!!! 查看log.TAG为console



### 自定义基座

1. 需要把插件 module 打包为 aar，放在 app 下的 libs 中，并在 build.gradle 引用

2. 需要将 app 打包为 debug 包，选择 Build -> Generate App Bundles or APKs -> Generate APKs

3. 需要在 manifest.json 中设置包名

   ```
   {
     "app-plus" : {
         "distribute" : {
             "android" : {
                 "packageName" : "com.example.yourapp"
             }
         }
     }
   }
   ```

   

4. 如果之前有安装过相同包名的app，在自定义基座下运行可能会没效果，需要卸载之前的app后重试。



## build.gradle

### repositories

```groovy
repositories {
    flatDir {
        dirs 'libs'
    }
}
```

这段配置的意思是：**在 Gradle 构建时，将当前项目下的 `libs` 文件夹声明为一个本地依赖仓库**。

简单来说，Gradle 会去 `libs` 目录里查找 `.jar` 或 `.aar` 文件，让你可以直接依赖它们，而不用从 Maven 远程仓库下载。

主要场景是：**引入未发布到远程仓库的本地库文件**。

- **`repositories`**：配置依赖项的来源（仓库）。Gradle 支持多种仓库，如 `mavenCentral()`、`google()`。
- **`flatDir`**：声明一个“扁平目录”仓库。这种仓库没有元数据（如 pom 文件），只是简单地在一个文件夹中搜索文件。
- **`dirs 'libs'`**：指定仓库的目录路径。路径是相对当前 `build.gradle` 文件所在的模块目录。因此它会指向 `模块名/libs/`。



通常，你需要先在模块的 `libs` 目录中放入一个库文件（如 `weex_sdk.aar`），然后在 `dependencies` 中这样引用：

```groovy
dependencies {
    // 引用 libs 目录下的 weex_sdk.aar（name 不写扩展名）
    implementation(name: 'weex_sdk', ext: 'aar')
}
```

Gradle 会在 `flatDir` 配置的 `libs` 目录下找到 `weex_sdk.aar` 并引入工程。



注意事项：

- **不支持传递依赖**：`flatDir` 仓库不会自动解析这个 `aar` 内部依赖的其他库。你需要手动在 `dependencies` 中补齐它需要的所有依赖（比如 Weex 可能依赖 `support-v4`、`okhttp` 等）。这是它和远程仓库最大的不同。
- **名称严格匹配**：引用时 `name` 必须和文件名（不含扩展名）完全一致，且文件需直接放在配置的目录下，不能有子目录。
- **可以指定多个目录**：`dirs 'libs', 'other_libs'` 会让 Gradle 同时在这两个目录下查找。









