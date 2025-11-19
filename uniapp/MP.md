# 微信小程序

微信小程序当前bug列表：https://developers.weixin.qq.com/community/develop/issueList





## 修改对象、数组中的值

```js
data: {
  user: {
    name: 'li',
    age: 10
  },
  cars: ['nio', 'bmw', 'wolks'],
  color: [{
    value: 'red'
  }]
}
```

```js
let str = `color[0].value`

// 修改对象属性
this.setData({
  'user.name': 'aaa',
  ['user.age']: 20,
  'cars[0]': 'mi',
  [str]: 'green'
})
```



## wxs过滤

1、定义

```vue
<wxs module="fname">
	var price = function(a, b) {
		var res = a * b
		return res && Number(res.toFixed(2))
	}
	module.exports = {
		price: price
	}
</wxs>
```



2、使用

```vue
<view>{{ fname.price(10, 20) }}</view>
```



```vue
<!--wxml-->
<wxs module="m1">
var msg = "hello world";

module.exports.message = msg;
</wxs>

<view> {{m1.message}} </view>
```



## 保存图片到系统相册

```js
// 保存图片到系统相册
savePhoto() {
  // wx.env.USER_DATA_PATH ：用户文件目录，开发者对这个目录有完全自由的读写权限
  let path = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}.jpg`
  let img = this.data.base64
  wx.getFileSystemManager().writeFile({
    filePath: path, // 这里先把文件写到临时目录里
    data: img.slice(22), // 选择 base64 编码，data 只需要传 base64 内容本身，不要传 Data URI 前缀，
    encoding: 'base64',
    success: res => {
      wx.saveImageToPhotosAlbum({
        filePath: path, // 这是把临时文件保存到相册
        success: res => {
          wx.showToast({
            title: '保存成功！'
          })
        },
        fail: error => {
          console.log(error)
        }
      })
    },
    fail: error => {
      console.log(error)
    }
  })
},
```



## 修改 radio 样式

```css
radio {
	margin-left: 40rpx;
}

radio .wx-radio-input {
	width: 36rpx;
	height: 36rpx;
	border-radius: 50%;
	margin-top: -4rpx;
}

radio .wx-radio-input.wx-radio-input-checked {
	width: 36rpx;
	height: 36rpx;
	border: 1px solid #8CD241 !important;
	background: #fff !important;
}

radio .wx-radio-input.wx-radio-input-checked::before {
	border-radius: 50%;
	text-align: center;
	color: #8CD241;
	font-size: 30rpx;
	transform: translate(-50%, -50%) scale(1);
	-webkit-transform: translate(-50%, -50%) scale(1);
}
```

```html
<radio-group class="radio-group" bindchange="radioChange">
	<label class="radio" wx:for="{{status}}" wx:key="">
		<radio value="{{item.name}}" checked="{{item.checked}}" />
		<text>{{item.value}}</text>
	</label>
</radio-group>
```





## Canvas 海报

### 纯 canvas

```
Page({
  data: {
    navData: {},
    list: [],
    poster: ['https://demo.com/1.png'],
  },

  onLoad(options) {
    setTimeout(() => {
      this.createPoster(0, 'https://demo.com/1.png')
    }, 500)
  },

  rpx2px(arg) {
    const info = wx.getSystemInfoSync()
    const width = info.screenWidth
    return arg * width / 750
  },

  /**该方法用来绘制一个有填充色的圆角矩形 
   *@param cxt:canvas的上下文环境 
   *@param x:左上角x轴坐标 
   *@param y:左上角y轴坐标 
   *@param width:矩形的宽度 
   *@param height:矩形的高度 
   *@param radius:圆的半径 
   *@param fillColor:填充颜色 
   **/
  fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor) {
    //圆的直径必然要小于矩形的宽高          
    if (2 * radius > width || 2 * radius > height) {
      return false;
    }
    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边  
    this.drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || "#fff"; //若是给定了值就用给定的值否则给予默认值  
    cxt.fill();
    cxt.restore();
  },

  drawRoundRectPath(cxt, width, height, radius) {
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI  
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

    //矩形下边线  
    cxt.lineTo(radius, height);

    //左下角圆弧，弧度从1/2PI到PI  
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

    //矩形左边线  
    cxt.lineTo(0, radius);

    //左上角圆弧，弧度从PI到3/2PI  
    cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

    //上边线  
    cxt.lineTo(width - radius, 0);

    //右上角圆弧  
    cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

    //右边线  
    cxt.lineTo(width, height - radius);
    cxt.closePath();
  },

  circleImg(ctx, img, x, y, r) {
    ctx.beginPath()
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    // ctx.stroke()
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
  },

  circleImgTwo(ctx, img, x, y, w, h, r) {
    // 画一个图形
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    // ctx.strokeStyle = '#FFFFFF'; // 设置绘制圆形边框的颜色
    // ctx.stroke();
    ctx.clip();
    ctx.drawImage(img, x, y, w, h);
  },

  createPoster(index, url) {
    wx.createSelectorQuery()
      .select('#myCanvas' + index) // 在 WXML 中填入的 id
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        let bgUrl = url

        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        // 缩放
        const width = res[0].width
        const height = res[0].height

        const dpr = wx.getWindowInfo().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)

        ctx.clearRect(0, 0, width, height)

        const bg = canvas.createImage()
        bg.onload = () => {
          // this.circleImg(ctx, bg, this.rpx2px(0), this.rpx2px(0), this.rpx2px(20))

          this.circleImgTwo(ctx, bg, 0, 0, this.rpx2px(506), this.rpx2px(828), this.rpx2px(20))
          this.fillRoundRect(ctx, this.rpx2px(20), this.rpx2px(370), this.rpx2px(466), this.rpx2px(189), this.rpx2px(10))
          ctx.font = `${this.rpx2px(24)}px PingFang-SC-Regular`
          ctx.fillStyle = '#3E2F24'
          ctx.fillText(this.data.navData.nickname, this.rpx2px(132), this.rpx2px(410))
          ctx.font = `${this.rpx2px(20)}px PingFang-SC-Regular`
          ctx.fillStyle = '#8C7F76'
          if (this.data.navData.type === 'WALK') {
            ctx.fillText('刚刚完成了徒步路线', this.rpx2px(132), this.rpx2px(440))
          } else {
            ctx.fillText('刚刚完成了骑行路线', this.rpx2px(132), this.rpx2px(440))
          }

          ctx.fillStyle = '#634E3F'
          ctx.fillText('用时', this.rpx2px(58), this.rpx2px(490))
          ctx.fillText('里程', this.rpx2px(214), this.rpx2px(490))
          ctx.fillText('减少碳排放', this.rpx2px(357), this.rpx2px(490))

          ctx.font = `${this.rpx2px(32)}px PingFang-SC-Regular`
          ctx.fillStyle = '#3E2F24'
          ctx.fillText(this.data.navData.time, this.rpx2px(58), this.rpx2px(530))
          ctx.fillText(this.data.navData.mileage + '9999m', this.rpx2px(214), this.rpx2px(530))
          ctx.fillText(parseFloat(this.data.navData.carbonEmission) + '9999g', this.rpx2px(357), this.rpx2px(530))

          const image = canvas.createImage()
          image.onload = () => {
            this.circleImg(ctx, image, this.rpx2px(42), this.rpx2px(380), this.rpx2px(70 / 2))
          }
          image.src = this.data.navData.iconPath

          this.fillRoundRect(ctx, this.rpx2px(20), this.rpx2px(582), this.rpx2px(466), this.rpx2px(170), this.rpx2px(10))
          ctx.font = `${this.rpx2px(26)}px PingFang-SC-Regular`
          ctx.fillStyle = '#3E2F24'
          ctx.fillText('小程序', this.rpx2px(54), this.rpx2px(650))
          ctx.font = `${this.rpx2px(22)}px PingFang-SC-Regular`
          ctx.fillStyle = '#8C7F76'
          ctx.fillText('小程序大家都在用', this.rpx2px(54), this.rpx2px(690))

          const qr = canvas.createImage()
          qr.onload = () => {
            ctx.drawImage(qr, this.rpx2px(320), this.rpx2px(605), this.rpx2px(124), this.rpx2px(124))
          }
          qr.src = 'http://szdbi.oss-cn-shenzhen.aliyuncs.com/ruyan/qr.jpg'

          setTimeout(() => {
            wx.canvasToTempFilePath({
              canvas,
              success: res => {
                // 生成的图片临时文件路径
                const tempFilePath = res.tempFilePath
                let temp = [...this.data.list, ...[tempFilePath]]
                this.setData({
                  list: temp
                })
                console.log('end')
              },
            })
          }, 200);
        }

        bg.src = bgUrl
      })
  },

  saveImage(index) {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.list[1],
      success(res) {
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },

})
```

```
<view>
  <canvas wx:for="{{poster}}" wx:key="index" id="{{'myCanvas'+index}}" type="2d" style="position: absolute;left:-9999px" />
  <image wx:for="{{list}}" wx:key="index" src="{{item}}" alt="" class="post-img"	show-menu-by-longpress/>
  <view bindtap="saveImage">保存</view>
</view>
```

```
canvas {
  width: 506rpx;
  height: 828rpx;
  background: transparent;
  margin: 40rpx auto;
}

.post-img {
  width: 506rpx;
  height: 828rpx;
}
```



### Painter 库

小程序生成图片库，轻松通过 json 方式绘制一张可以发到朋友圈的图片

文档地址：https://github.com/Kujiale-Mobile/Painter



## 写字板

```
<view class="container">
  <canvas id="canvas" type="2d" class="canvas" bindtouchstart="startDraw" bindtouchmove="drawing" bindtouchend="endDraw"></canvas>
  <button class="btn-clear" bindtap="clearCanvas">清除</button>
  <button class="btn-save" bindtap="saveSignature">保存</button>
</view>
```

```
page {
  background: #F5F5F5;
}

.canvas {
  width: 100%;
  height: 500rpx;
  background: #FFF;
}
```

```
// page.js
Page({
  data: {
    pen: {
      x: 0,
      y: 0,
      enabled: false
    },
    lineWidth: 1,
    strokeStyle: '#000000',
    actions: [],
    ctx: {},
    canvas: {},
  },
  onReady: function () {
    const query = wx.createSelectorQuery()
    query.select('#canvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        ctx.lineWidth = this.data.lineWidth
        ctx.strokeStyle = this.data.strokeStyle

        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.setData({
          ctx,
          canvas
        })
      })
  },
  startDraw(event) {
    const {
      x,
      y
    } = event.touches[0]
    this.setData({
      pen: {
        x,
        y,
        enabled: true
      }
    })
  },
  drawing(event) {
    const {
      x,
      y,
      enabled
    } = this.data.pen
    if (!enabled) return
    const {
      ctx
    } = this.data
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(event.touches[0].x, event.touches[0].y)
    ctx.stroke()
    // ctx.draw(true)
    this.setData({
      pen: {
        x: event.touches[0].x,
        y: event.touches[0].y,
        enabled: true
      }
    })
  },
  endDraw() {
    this.setData({
      pen: {
        x: 0,
        y: 0,
        enabled: false
      }
    })
  },
  clearCanvas() {
    const {
      ctx,
      canvas
    } = this.data
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.draw(true)
  },
  saveSignature() {
    const {
      canvas
    } = this.data
    wx.canvasToTempFilePath({
      canvas,
      success: (res) => {
        // 保存图片至相册或其他操作
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function () {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
          },
          fail: function (err) {
            console.error(err);
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      fail: (err) => {
        console.error(err)
      }
    })
  },
  undo() {
    console.log('131')
    const {
      actions,
      ctx,
      canvas
    } = this.data
    if (actions.length > 0) {
      actions.pop()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      actions.forEach(({
        type,
        data
      }) => {
        if (type === 'path') {
          const [moveTo, ...lineTos] = data
          ctx.beginPath()
          ctx.moveTo(moveTo.x, moveTo.y)
          lineTos.forEach(({
            x,
            y
          }) => ctx.lineTo(x, y))
          ctx.stroke()
        }
      })
      // ctx.draw(true)
      this.setData({
        actions: [...actions]
      })
    }
  }
})
```





## 二维码

文档地址：https://github.com/davidshimjs/qrcodejs

文档地址：https://github.com/yingye/weapp-qrcode



### weapp-qrcode

文档：https://github.com/yingye/weapp-qrcode



```
const QRCode = require('../../../utils/weapp.qrcode.min.js');

QRCode({
  width: 135,
  height: 135,
  x: 0,
  y: 0,
  typeNumber: 4,
  canvasId: 'mycanvas',
  text: res.item.id,
  callback(e) {
    console.log('e: ', e)
  }
})
```

```
<canvas class="qr" canvas-id="mycanvas"></canvas>
```

```
.qr {
  width: 135px;
  height: 135px;
}
```



## BLE

### 搜索蓝牙列表

```
Page({
  data: {
    devices: [],
    device: {},
    deviceId: '',
    serviceId: '',
    characteristicId: ''
  },

  onLoad(options) {
    this.init()
  },

  init() {
    wx.openBluetoothAdapter({
      mode: 'central',
      success: res => {
        console.log('初始化蓝牙模块', res);

        wx.startBluetoothDevicesDiscovery({
          success: res => {
            console.log('开启查找蓝牙设备 ok', res);

            wx.onBluetoothDeviceFound(
              (res) => {
                console.log('找到设备', res);
                wx.getBluetoothDevices({
                  success: res => {
                    console.log('蓝牙设备列表', res);
                    let devices = res.devices || []
                    devices = devices.filter(item => {
                      return item.localName && item.localName.includes('ble_at')
                    })
                    this.setData({
                      devices: devices
                    })
                  },
                  fail: err => {
                    console.error('蓝牙设备列表失败', res);
                  }
                })
              }
            )
          },
          fail: err => {
            console.error('开启查找蓝牙设备失败', err);
          }
        })
      },
      fail: err => {
        console.error('----初始化蓝牙模块失败 err', err, err.errCode);
        wx.showModal({
          content: '请打开手机蓝牙',
          confirmText: '好的',
          showCancel: false,
          complete: (res) => {
            this.onBluetoothAdapterStateChange()
          }
        })
      }
    })
  },

  // 监听蓝牙开关状态
  onBluetoothAdapterStateChange() {
    wx.onBluetoothAdapterStateChange(
      (res) => {
        console.log('onBluetoothAdapterStateChange', res);
        if (res.available) {
          // 已打开蓝牙
          this.init()
        }
      }
    )
  },

  onConnect(e) {
    wx.showLoading({
      title: '连接中',
      mask: true
    })
    let device = this.data.devices[e.currentTarget.dataset.index]
    console.log(device);
    this.setData({
      device
    })

    // 连接蓝牙
    wx.createBLEConnection({
      deviceId: device.deviceId,
      success: res => {
        console.log('连接成功', res);
        wx.showToast({
          title: '连接成功',
          mask: true
        })

        wx.stopBluetoothDevicesDiscovery({
          success: res => {
            console.log('停止搜索蓝牙');
          },
          fail: err => {
            console.log('停止搜索蓝牙失败', err);
          }
        })

        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/deviceDetail/deviceDetail?id=${device.deviceId}`,
          })
        }, 1000);
      },
      fail: err => {
        console.log('连接失败', err);
      }
    })
  },

})
```



### 筛选特征码发送数据

```
Page({
  data: {
    deviceId: '',
    serviceId: '',
    characteristicId: ''
  },

  onLoad(options) {
    this.setData({
      deviceId: options.id
    })
    this.getConnectInfo()
  },

  getConnectInfo() {
    wx.getBLEDeviceServices({
      deviceId: this.data.deviceId,
      success: res => {
        console.log('蓝牙service', res);
        res.services.forEach(item => {
          if (item.uuid.includes('0000FFF0')) {
            this.setData({
              serviceId: item.uuid
            })
            wx.getBLEDeviceCharacteristics({
              deviceId: this.data.deviceId,
              serviceId: this.data.serviceId,
              success: res => {
                console.log('characteristic 特征：', res);
                res.characteristics.forEach(item => {
                  if (item.properties.write) {
                    this.setData({
                      characteristicId: item.uuid
                    })
                    console.log('连接信息获取完成')
                    console.log('deviceId', this.data.deviceId)
                    console.log('serviceId', this.data.serviceId)
                    console.log('characteristicId', this.data.characteristicId)
                  }
                })
              },
              fail: err => {
                console.log('获取characteristic 特征失败：', err);
              }
            })
          }
        })
      },
      fail: err => {
        console.log('获取蓝牙service失败', err);
      }
    })
  },

  onSend(opt, speed) {
    console.log(opt, speed);
    let command1 = ''
    let command2 = ''
    switch (opt) {
      case 'on':
        command1 = 0xFE
        command2 = 0x01
        break;
      case 'off':
        command1 = 0xFD
        command2 = 0x02
        this.reset()
        break;
      case 'longpress':
        let hex = this.toHexAndInverted(speed)
        command1 = hex.originalHex
        command2 = hex.invertedHex
        break;
    }

    let data = new Array(0x00, 0xFF, command1, command2);
    let buffer = new ArrayBuffer(4);
    let dataview = new DataView(buffer);
    data.forEach((item, index) => {
      dataview.setUint8(index, item);
    })

    wx.writeBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      characteristicId: this.data.characteristicId,
      value: buffer,
      success: res => {
        console.log('发送指令成功', res)
      }
    })
  },

  toHexAndInverted(num) {
    // 将原始数字转换为十六进制，并保留两位
    const hex = '0x' + num.toString(16).padStart(2, '0').toUpperCase();

    // 反码操作：先将数转换为32位二进制，再进行反转，保留低8位
    const inverted = ~num & 0xFF; // 保证反码在一个字节范围内，即0x00到0xFF

    // 将反码结果转换为十六进制，确保是两位数，前面补零
    const invertedHex = '0x' + inverted.toString(16).padStart(2, '0').toUpperCase();

    // 返回原始十六进制和反码十六进制
    return {
      originalHex: hex,
      invertedHex: invertedHex
    };
  },

  onBack() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId,
      success: res => {
        console.log('离开页面，蓝牙已断开', res)
      },
      fail: err => {
        console.log('离开页面，蓝牙断开失败', err)
      }
    })
    wx.navigateBack()
  },

})
```







## resolveAlias

使用 resolveAlias 配置项用来自定义模块路径的映射规则。

配置了之后，会对 require 里的模块路径进行规则匹配并映射成配置的路径。

如果命中多条映射规则，则取最长的命中规则。



`app.json`

```
"resolveAlias": {
  "@/*":"/*"
}
```

注意：resolveAlias 进行的是路径匹配，其中的 key 和 value 须以 `/*` 结尾。

文档：https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#resolveAlias



## jssdk

文档地址：https://www.weixinsxy.com/jssdk/



* [微信jssdk本地调试](https://www.jianshu.com/p/2fcbb29cb977?utm_campaign=maleskine) 



## 腾讯位置服务-小程序插件

官网：https://lbs.qq.com/miniProgram/plugin/pluginGuide/pluginOverview



## 自定义组件

### navigationBar

自定义navigationBar顶部导航栏，兼容适配所有机型。

文档：https://zhuanlan.zhihu.com/p/117244248



## 组件触发事件

`this.triggerEvent('agree')`



## UI 组件库

### Vant Weapp

Vant 是一个**轻量、可靠的移动端组件库**，于 2017 年开源。

目前 Vant 官方提供了 [Vue 2 版本](https://vant-ui.github.io/vant/v2/)、[Vue 3 版本](https://vant-ui.github.io/vant/)和[微信小程序版本](https://vant-ui.github.io/vant-weapp/)，并由社区团队维护 [React 版本](https://github.com/3lang3/react-vant)和[支付宝小程序版本](https://github.com/ant-move/Vant-Aliapp)。

文档地址：https://vant-ui.github.io/vant-weapp



### Lin UI

Lin UI 是基于 微信小程序原生语法 实现的组件库。遵循简洁，易用的设计规范。

文档地址：https://github.com/TaleLin/lin-ui



### WeUI

WeUI 是由微信官方设计团队专为微信移动 Web 应用设计的 UI 库。

文档地址：https://github.com/Tencent/weui-wxss

文档地址：https://wechat-miniprogram.github.io/weui/docs/





## 开源库

### weapp-qrcode

在微信小程序 中，快速生成二维码。

文档地址：https://github.com/yingye/weapp-qrcode



### 富文本解析

#### mp-html (推荐)

小程序富文本组件，支持渲染和编辑 html，支持在微信、QQ、百度、支付宝、头条和 uni-app 平台使用

文档地址：https://github.com/jin-yufeng/mp-html



#### wxParse(停止维护)

wxParse-微信小程序富文本解析自定义组件，支持HTML及markdown解析。

文档地址：https://github.com/icindy/wxParse



### 图表

#### echarts-for-weixin

基于 Apache ECharts 的微信小程序图表库。

文档地址：https://github.com/ecomfe/echarts-for-weixin



### validate 表单验证

表单验证：https://github.com/18622426238/WxValidate/tree/master

```vue
<script>
	import WxValidate from '/script/validate.js';
	export default {
		data() {
			return {
				WxValidate: '',
			}
		},
		onLoad() {
			this.initValidate()
		},
		methods: {
			initValidate() {
				const rules = {
					name: {
						required: true,
						maxlength: 20
					},
					phone: {
						required: true,
						length: 11
					},
					gender: {
						required: true,
					},
					weight: {
						required: true,
						number: true,
					},
					id_card: {
						required: true,
						idcard: true,
					},
				}
				const message = {
					name: {
						required: '请输入',
						maxlength: '最大长度20'
					},
					phone: {
						required: "请输入",
						length: '长度11',
					},
					gender: {
						required: '必填',
					},
					weight: {
						required: '请输入',
						number: '不是数字',
					},
					id_card: {
						required: '请输入',
						idcard: '请输入18位的有效身份证',
					}
				}
				//实例化当前的验证规则和提示消息
				this.WxValidate = new WxValidate(rules, message);
			},
			onSubmit() {
				let formData = {}
				if (!this.WxValidate.checkForm(formData)) {
					let error = this.WxValidate.errorList[0];
					wx.showToast({
						title: error.msg,
						icon: 'none',
						duration: 1500,
					});
					return;
				}
			},
		},
	}
</script>
```





## 用户隐私保护指引

```
为了分辨用户，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
为了显示距离，开发者将在获取你的明示同意后，收集你的位置信息。
开发者收集你的地址，用于获取位置信息。
开发者收集你的发票信息，用于维护消费功能。
为了用户互动，开发者将在获取你的明示同意后，收集你的微信运动步数。
为了通过语音与其他用户交流互动，开发者将在获取你的明示同意后，访问你的麦克风。
开发者收集你选中的照片或视频信息，用于提前上传减少上传时间。
为了上传图片或者视频，开发者将在获取你的明示同意后，访问你的摄像头。
为了登录或者注册，开发者将在获取你的明示同意后，收集你的手机号。
开发者使用你的通讯录（仅写入）权限，用于方便用户联系信息。
开发者收集你的设备信息，用于保障你正常使用网络服务。
开发者收集你的身份证号码，用于实名认证后才能继续使用的相关网络服务。
开发者收集你的订单信息，用于方便获取订单信息。
开发者收集你的发布内容，用于用户互动。
开发者收集你的所关注账号，用于用户互动。
开发者收集你的操作日志，用于运营维护。
为了保存图片或者上传图片，开发者将在获取你的明示同意后，使用你的相册（仅写入）权限。
为了用户互动，开发者将在获取你的明示同意后，收集你的车牌号。
开发者访问你的蓝牙，用于设备连接。
开发者使用你的日历（仅写入）权限，用于用户日历日程提醒。
开发者收集你的邮箱，用于在必要时和用户联系。
开发者收集你选中的文件，用于提前上传减少上传时间。
```



## 快速链接

* [官方文档](https://developers.weixin.qq.com/doc/) 
* [微信公众平台](https://mp.weixin.qq.com/) 
* [微信开放平台](https://open.weixin.qq.com/)
* [jssdk 示例](https://www.weixinsxy.com/jssdk/) 
* [jssdk](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
* [服务类目](https://developers.weixin.qq.com/miniprogram/product/material/ITkeji/ruanjian.html) 
* [备案指南](https://developers.weixin.qq.com/miniprogram/product/record_guidelines.html) 



