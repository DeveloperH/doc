# App



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







