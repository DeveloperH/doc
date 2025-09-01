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

