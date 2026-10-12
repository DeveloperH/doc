## ios 版本兼容

* **iOS 12 独有**：**iPhone 6**、**iPhone 6 Plus**、**iPhone 5s**。这三款机型因芯片（A8、A7）较旧，无法升级到 iOS 13。
* **iOS 13 起始线**：从 **iPhone 6s** 开始支持。





## `.a` 文件

`.a` 文件是 iOS/macOS 开发中的静态库文件（Static Library）。

- **文件类型**：静态链接库（Static Library）
- **平台**：主要用于 iOS/macOS（Unix/Linux 系统通用）
- **组成**：多个 `.o` 目标文件的归档集合
- **链接方式**：编译时链接，代码被复制到最终可执行文件中



```bash
# 创建 .a 文件的基本流程
1. 编译源码为 .o 文件：
   clang -c source1.m source2.m

2. 打包为 .a 文件：
   ar rcs libMyLibrary.a source1.o source2.o

3. 或使用 Xcode：
   Build Settings → Mach-O Type → Static Library
```



| 特性           | .a 文件              | .framework                     |
| :------------- | :------------------- | :----------------------------- |
| **结构**       | 纯二进制文件         | 文件夹结构                     |
| **包含内容**   | 仅编译后的代码       | 代码 + 头文件 + 资源           |
| **使用复杂度** | 需要额外配置头文件   | 开箱即用                       |
| **资源支持**   | 不支持               | 支持图片、nib等资源            |
| **可见性**     | 需手动管理公开头文件 | 有明确的 Public/Private 头文件 |



## 常用软件

### `OpenInTerminal`

```bash
brew install --cask openinterminal

# 功能：
• Finder 右键菜单添加"在终端中打开"
• 支持 iTerm2、Terminal、Hyper 等
• 可设置快捷键（默认 Ctrl+Opt+T）
• 支持在访达工具栏添加按钮
```





## 常见问题

### `sudo gem install cocoapods` 卡住

按 `Ctrl + C` 组合键即可强制退出当前命令。

按 `Ctrl + Z`（暂停进程）



```bash
# 查看当前源
gem sources -l

# 更换为国内镜像源
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/

# 或使用清华源
gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/

# 重新安装
sudo gem install cocoapods
```



还报错 ruby 版本低？使用 `Homebrew` 安装。

```bash
# 设置国内镜像环境变量（中科大源）。在终端中逐行运行以下命令
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"

# 安装Homebrew，中科大源
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"

# 设置环境变量（M1/M2/M3 Mac）
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc

# 设置环境变量（Intel Mac）
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 使用brew安装Ruby
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 使用brew安装Ruby（已安装情况）
brew reinstall ruby

# 再安装CocoaPods
sudo gem install cocoapods
brew install cocoapods
```



## Mac

### 查看ipa的devices

在 Mac 中，把 ipa 文件放到桌面，名字改成：`app.ipa` ，打开终端，执行以下命令：

```sh
cd ~/Desktop && unzip -q app.ipa "Payload/*.app/embedded.mobileprovision" -d . && security cms -D -i $(find Payload -name embedded.mobileprovision) | grep -A 50 ProvisionedDevices
```



然后你会直接看到：

```xml
<key>ProvisionedDevices</key>
<array>
<string>00000000-0000000000000000</string>
<string>11111111-1111111111111111</string>
<string>客户的UDID</string>
</array>
```



### 设置SDK软链接

```sh
# 1. 移动 SDK 到新位置（所有项目共用）
mv /Users/a1234/Desktop/dev/code/BloodSugar/SDK /Users/a1234/Desktop/dev/SDK

# 2. 在原位置创建软链接
ln -s /Users/a1234/Desktop/dev/SDK /Users/a1234/Desktop/dev/code/svn/BloodSugar/SDK
```



### 显示隐藏文件

```
打开访达，按一下：
shift + command + .
```



### 找不到钥匙串入口

1. 打开“访达”（Finder）
2. 在屏幕顶部的菜单栏选择 **前往** > **前往文件夹...**（快捷键 `Shift (⇧) + Command (⌘) + G`）。
3. 在弹出的窗口里粘贴上面的路径：`/System/Library/CoreServices/Applications/`，然后回车。
4. 在新的文件夹窗口中找到 **钥匙串访问**。



## 权限许可描述

```
Privacy - Bluetooth Always Usage Description  		需要蓝牙权限来实现设备连接
Privacy - Bluetooth Peripheral Usage Description	蓝牙用于连接智能设备

Privacy - Camera Usage Description					用于扫描设备二维码、上传图片
Privacy - Photo Library Usage Description			需要访问您的相册，用于选择图片，仅用于App功能使用

Privacy - Tracking Usage Description				请放心，开启权限不会获取您在其他站点的隐私信息，该权限仅用于标识设备并保障服务安全与提示浏览体验



```



### 蓝牙

**`Privacy - Bluetooth Always Usage Description` 是当前 iOS 13 及以上系统的唯一必需项，而 `Privacy - Bluetooth Peripheral Usage Description` 已被弃用，仅在适配 iOS 12 及更早系统时作为兼容项保留。**

两者的核心区别在于**适用系统版本**和**当前状态**：

#### Privacy - Bluetooth Always Usage Description

- **对应键名**：`NSBluetoothAlwaysUsageDescription`
- **当前状态**：**当前有效（必需）**
- **适用版本**：iOS 13.0 及以上
- **核心作用**：这是目前唯一能让 App 正常使用 Core Bluetooth API 的权限描述。只要你的 App 在 iOS 13 或更高版本上链接，就必须在 `Info.plist` 中包含此键，否则 App 在尝试访问蓝牙时会**直接崩溃**。



#### Privacy - Bluetooth Peripheral Usage Description

- **对应键名**：`NSBluetoothPeripheralUsageDescription`
- **当前状态**：**已弃用（Deprecated）**
- **适用版本**：iOS 6.0 至 iOS 12（旧系统）
- **核心作用**：在 iOS 13 之前，用于向用户解释为什么 App 需要连接蓝牙外设。从 iOS 13 开始，Apple 统一了蓝牙权限，不再区分“外设连接”和“常规访问”，因此这个键已被 `NSBluetoothAlwaysUsageDescription` 取代。



#### 实际配置建议

对于现在的 App 开发，你的配置策略取决于**最低支持的 iOS 版本**：

- **如果你的 App 最低支持 iOS 13 及以上（绝大多数现代 App）**：
  你**只需要**添加 `Privacy - Bluetooth Always Usage Description`。不需要添加那个已弃用的键，否则 Xcode 可能会给出黄色警告。
- **如果你的 App 需要兼容 iOS 12 及更早系统**：
  你需要在 `Info.plist` 中**同时添加**这两个键。系统运行在旧 iOS 上时会读取旧键，运行在新 iOS 上时会读取新键。

**注意**：无论使用哪个键，如果 `Info.plist` 中缺少对应系统版本所需的描述键，App 尝试调用蓝牙相关 API 时会立即崩溃。



### 常见授权提示

* 允许“远控照明”跟踪您在其他公司的App和网站上的活动吗?
  * 腾讯地图SDK需要获取设备标识以优化定位精度和服务稳定性，你可拒绝授权，拒绝后不影响地图导航核心功能使用
* 允许“网易云音乐”跟踪您在其他公司的App和网站上的活动吗?
  * 该标示符将用于向您投放个性化广告
* 允许“抖音”跟踪您在其他公司的App和网站上的活动吗?
  * 请放心，开启权限不会获取您在其他站点的隐私信息，该权限仅用于标识设备并保障服务安全与提示浏览体验



### 多语言处理

#### 推荐方案：使用 String Catalog（Xcode 15+）

核心是创建一个专门用于 `Info.plist` 的 String Catalog 文件。

1. **创建文件**：在 Xcode 中新建文件，选择 **String Catalog**，**必须命名为 `InfoPlist.xcstrings`**，并将其添加到你的主 Target 中。

2. **确保 Info.plist 配置正确**：蓝牙权限描述必须直接写在 `Info.plist` 文件里，**不要**通过 Xcode 界面以 `INFOPLIST_KEY_` 的形式添加。

   ```xml
   <key>NSBluetoothAlwaysUsageDescription</key>
   <string>这里填默认语言的描述</string>
   ```

   

3. **构建并翻译**：正常构建项目后，Xcode 会自动将 `Info.plist` 中已知的本地化键（包括 `NSBluetoothAlwaysUsageDescription`）提取到 `InfoPlist.xcstrings` 中。之后，你只需在 Xcode 的可视化编辑器里，为每种支持的语言填入对应的翻译文案即可。



#### 传统方案：使用 `InfoPlist.strings`（兼容旧版 Xcode）

如果你需要兼容老项目或使用旧版 Xcode，可以采用这种手动方式：

1. **创建本地化文件**：为每种语言创建一个名为 `InfoPlist.strings` 的文件（例如 `en.lproj/InfoPlist.strings`、`zh-Hans.lproj/InfoPlist.strings`）。

2. **编写翻译键值对**：在每个语言的文件中，写入对应的翻译。

   ```text
   "NSBluetoothAlwaysUsageDescription" = "这里是该语言的蓝牙权限描述";
   ```

   

3. **确保文件被包含**：记得在 Xcode 中勾选这些 `.strings` 文件对主 Target 的 **Target Membership**。



#### 为什么推荐 String Catalog？

相较于老旧的 `InfoPlist.strings`，String Catalog 的优势在于：它提供了一个可视化的编辑界面，能直观显示各语言的翻译进度，并且与 Xcode 的构建系统集成更紧密，自动同步键值，减少了手动维护文件的麻烦。

**总结：优先在 Xcode 15+ 中使用 `InfoPlist.xcstrings` 来管理蓝牙权限的多语言文案。**



## ios 申请证书

申请步骤：

1. Mac 中打开钥匙串访问
2. 选择证书助理 → 从证书颁发机构请求证书，获取 CSR 文件并保存到磁盘
3. 在 [Apple developer](https://developer.apple.com/) 中申请证书，选择刚才的 CSR 文件，完成后下载 cer 文件
4. 在 Mac 中双击 cer 文件后，在钥匙串访问中选择这个证书，右键选择导出，并设置证书密码，最终存储为 p12 文件

注意：开发版和正式版不能共用一个 CSR 文件。



## 提交审核

步骤：

1. 在 [App Store Connect](https://appstoreconnect.apple.com/) 中创建 App

2. 准备至少 4  张 1320 × 2868px 的 App 介绍 jpg 图片，只有前 3 张截屏将用于 App 安装表。

3. 准备官网地址、隐私政策网址

4. Mac 中打开 Transporter，拖入打包好的 ipa 文件，验证通过后，点击交付

5. App Store Connect 中构建版本里选择上传的应用，完善各类资料后提交审核

   

阿里云 ICP 备案：

1. 提供以下资料：营业执照图片、负责人身份证正反面、负责人人脸识别、承诺书签字盖章、2 个手机号、1 个邮箱、在公司名下的域名、iOS 证书的公钥和 SHA1 、Android 证书公钥和 MD5
2. 提交备案后，等待审核



### 常见审核拒绝

发审前自检：

* 含有 webview，加载了外部网页。
* 通过接口或者其他方式隐藏了功能。
* 含有医疗类信息，比如 心率，血氧，血压，血糖，心电等信息。或者有医学建议，评分等可能影响用户判断的信息。
* 用途说明字符串没正确填写，比如使用蓝牙，获取定位信息，获取图片库等。
* 设计和源码类似，可能判定为马甲包。



```
Guideline 1.4.1 - Safety - Physical Harm
指南 1.4.1 – 安全 – 身体伤害
该应用程序可以连接到外部医疗硬件设备，以提供医疗服务。
含有医疗类信息，比如 心率，血氧，血压，血糖，心电等信息。或者有医学建议，评分等可能影响用户判断的信息。


Guideline 2.3.1(a) - Performance
准则 2.3.1(a) - 性能表现
问题描述：该应用程序包含隐藏的功能。具体来说，该应用程序具有在应用程序内加载外部内容网页视图的功能。在重新提交以供审核之前，应该将这些网页的内容“嵌入”到提交的二进制文件中，或者将这些功能从应用程序中移除。


Guideline 4.2 - Design - Minimum Functionality
准则 4.2 – 设计 – 最低功能要求
问题描述：该应用程序提供的用户体验相当有限，因为它与网页浏览体验相差无几。因此，其用户体验类似于普通网页浏览器的体验。如果添加诸如推送通知、核心定位功能或分享功能等特性，也无法打造出足够出色的用户体验，无法胜任应用商店的推荐标准。为解决此问题，请通过添加更多原生功能来改进应用程序，以提供更优质的用户体验。


Guideline 4.3(a) - Design - Spam
指南 4.3(a) - 设计 - 垃圾邮件
我们注意到，这款应用与其他开发者提交到 App Store 的应用在二元结构、元数据以及概念方面有着相似之处，只是存在一些小的差异。
设计和源码类似，可能判定为马甲包。


指南 5.1.1(ii) – 法律方面 – 隐私 – 数据收集与存储
应用程序中有一到多个用途说明字符串，这些字符串并未充分解释受保护资源的使用方式。这些用途说明字符串必须清晰完整地描述应用程序对数据的使用方式，并且通常还需要提供一个具体的示例，说明数据将如何被使用。


Guideline 5.6 - Developer Code of Conduct
准则 5.6 – 开发者行为准则
问题描述：我们发现了该应用程序中存在一些异常行为，这些行为通常与欺诈活动有关。具体来说，该应用程序中包含一些在审核过程中被故意隐藏的功能。这种操纵性和误导性的行为不符合指南 5.6 中的要求
```









## 原生插件开发

* 下载 sdk 文件，解压后选择 HBuilder-uniPluginDemo 目录下的 `.xcodeproj` 打开项目。注意：SDK 目录文件一定要有
* 将离线打包的项目文件放入 `Pandora/apps` 目录下，修改 `control` 中的 appid，并且去掉 `syncDebug="true"`
* 在 `HBuilder-uniPlugin-Info` 中填入申请的离线 key
* 在 Target → Build Settings  →  Packaging  → Product Bundle Identifier 填入包名（同样是 ios app 的包名）
* 运行项目

 



## objc

### 原生弹窗

```objc
  // ios原生弹出提示
  UIAlertController *alert = [UIAlertController
      alertControllerWithTitle:@"连接成功"
                       message:[NSString stringWithFormat:
                                             @"设备名称: %@\nMAC: %@",
                                             BleDevice.blueName,
                                             BleDevice.Mac]
                preferredStyle:UIAlertControllerStyleAlert];
  [alert addAction:[UIAlertAction actionWithTitle:@"确定"
                                            style:UIAlertActionStyleDefault
                                          handler:nil]];
  [[UIApplication sharedApplication].keyWindow.rootViewController
      presentViewController:alert
                   animated:YES
                 completion:nil];
```



## 爱思助手查看app数据

需要在 `Info.plist` 中开启：

```
<key>UIFileSharingEnabled</key>
<true/>
```

作用：开启后，App 的 Documents 目录会暴露给 iTunes 和爱思助手这类工具，允许用户通过电脑直接存取该目录下的文件。