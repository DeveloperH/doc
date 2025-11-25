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



* App离线SDK下载：[最新android平台SDK下载](https://nativesupport.dcloud.net.cn/AppDocs/download/android.html) ，sdk 版本要和 HBuilder 版本一致，否则运行有提示

* 申请Appkey，具体请点击[链接](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey.html)

* 创建证书 

  * ```
    keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
    ```

  * testalias是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字

  * test.keystore是证书文件名称，可修改为自己想设置的文件名称，也可以指定完整文件路径

  * 36500是证书的有效期，表示100年有效期，单位天，建议时间设置长一点，避免证书过期

* 查看证书信息，修改应用的 SHA1值 为解析出来的值。保存后会更新Appkey。

  * ```
    keytool -list -v -keystore test.keystore  
    ```

* 





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







