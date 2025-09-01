# React Native

React Native 官网：https://reactnative.dev/



React Native 最新版本：0.79.2

当前文档版本：

当前 Nodejs 版本：16.5.0



VS Code 插件：

* [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)





React Native 将 React 的声明式 UI 框架引入 iOS 和 Android。使用 React Native，你可以使用原生 UI 控件并拥有对原生平台的完全访问权限。

* **声明。**React 使创建交互式 UI 变得轻松。声明式视图使您的代码更具可预测性，并且更易于调试。
* **基于组件。** 构建管理其状态的封装组件，然后组合它们以制作复杂的 UI。
* **开发人员速度。** 在几秒钟内查看本地更改。对 JavaScript 代码的更改可以实时重新加载，而无需重新构建本机应用程序。
* **可移植性。** 在 iOS、Android 和其他平台上重用代码。
* Learn once, write anywhere. 一次学习，随处编写。



React Native 应用程序可能面向 iOS 15.1 和 Android 7.0 （API 24） 或更高版本。您可以使用 Windows、macOS 或 Linux 作为开发作系统，但构建和运行 iOS 应用程序仅限于 macOS。可以使用 [Expo](https://expo.dev/) 等工具来解决这个问题。



## Hello world

```react
import React from 'react';
import {Text, View} from 'react-native';

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
};

export default YourApp;
```



## React 基础

### JSX

因为 JSX 包含在 React 库中，所以如果你在文件顶部没有 `import React from 'react'` ，它就不起作用！

```react
import React from 'react';
import {Text} from 'react-native';

const Cat = () => {
  // 声明变量，并使用 {} 插入
  const name = 'Maru';
  return <Text>Hello, I am {name}!</Text>;
};

export default Cat;
```



任何 JavaScript 表达式都可以在大括号之间工作。

```react
import React from 'react';
import {Text} from 'react-native';

const getFullName = (firstName, secondName, thirdName) => {
  return firstName + ' ' + secondName + ' ' + thirdName;
};

const Cat = () => {
  return <Text>Hello, I am {getFullName('Rum', 'Tum', 'Tugger')}!</Text>;
};

export default Cat;
```



### component

您可以使用 `<Cat>` 在多个位置多次呈现此组件，而无需重复您的代码：

```react
import React from 'react';
import {Text, View} from 'react-native';

const Cat = () => {
  return (
    <View>
      <Text>I am also a cat!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Text>Welcome!</Text>
      <Cat />
      <Cat />
      <Cat />
    </View>
  );
};

export default Cafe;
```



### props

**Props** 是 “properties” 的缩写。Props 允许你自定义 React 组件。

```react
import React from 'react';
import {Text, View} from 'react-native';

const Cat = props => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
    </View>
  );
};

export default Cafe;
```



请注意双花括号 `{{ }}` 括住 `style` 的宽度和高度。在 JSX 中，JavaScript 值用 `{}` 引用。如果您将字符串以外的其他内容作为 props 传递，例如数组或数字，这将非常方便： `<Cat food={["fish", "kibble"]} age={2} />` 。但是，JS 对象也用大括号表示：`{width： 200， height： 200}`。因此，要在 JSX 中传递 JS 对象，您必须将对象括在**另一对**大括号中：`{{width： 200， height： 200}}`

```react
import React from 'react';
import {Text, View, Image} from 'react-native';

const CatApp = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
        }}
        style={{width: 200, height: 200}}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
};

export default CatApp;
```



### state

**state** 就像组件的个人数据存储。状态对于处理随时间变化或来自用户交互的数据非常有用。State 为您的组件提供内存！

作为一般规则，使用 props 在渲染组件时配置组件。使用 state 来跟踪您预期随时间变化的任何组件数据。



可以通过调用 React 的 useState Hook 来为组件添加状态。例如，`useState` 是一个 Hook，它允许你向函数组件添加 state。

你可以使用 `useState` 来跟踪任何类型的数据：字符串、数字、布尔值、数组、对象。

调用 `useState` 可以做两件事：

* 它创建一个具有初始值的“状态变量”，在本例中，状态变量为 `isHungry`，其初始值为 `true`
* 它创建一个函数来设置该 state 变量的值 `setIsHungry`



用什么名字并不重要。但是将模式视为 `[<getter>, <setter>] = useState(<initialValue>)` 会很方便。

```react
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

const Cat = props => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

您可能已经注意到，尽管 `isHungry` 是一个 `const`，但它似乎是可重新分配的！发生的情况是，当调用像 `setIsHungry` 这样的状态设置函数时，它的组件将重新渲染。在这种情况下，`Cat` 函数将再次运行，这一次，`useState` 将为我们提供下一个 `isHungry` 值。

 看到上面的 `<>` 和 `</>` 了吗？这些 JSX 位是片段。相邻的 JSX 元素必须包装在封闭的标签中。Fragment 允许您执行此作，而无需嵌套额外的、不必要的包装元素，例如 `View`。



## 设置环境

如果您使用的是 [Framework](https://reactnative.dev/architecture/glossary#react-native-framework)，则不需要设置环境。使用 React Native Framework，您无需设置 Android Studio 或 XCode，因为 Framework 将负责为您构建原生应用程序。



* Node.js
* JDK
  * `JAVA_HOME` ：例如 `D:\Java\jdk1.8.0_351`
* Android Studio
  * Android SDK
  * Android SDK Platform
  * Android Virtual Device



我们建议通过 Chocolatey 安装 Node，[Chocolatey](https://chocolatey.org/install) 是一种流行的 Windows 包管理器。

```
choco install -y nodejs-lts microsoft-openjdk17
```



如果您已经在系统上安装了 Node，请确保它是 Node 18 或更高版本。如果您的系统上已有 JDK，我们建议使用 JDK17。使用更高的 JDK 版本时可能会遇到问题。

如果您使用的是最新版本的 Java Development Kit，则需要更改项目的 Gradle 版本，以便它可以识别 JDK。您可以通过转到 `{project root folder}\android\gradle\wrapper\gradle-wrapper.properties` 并更改 `distributionUrl` 值来升级 Gradle 版本。您可以[在此处查看最新版本的 Gradle](https://gradle.org/releases/)。



### Android Studio

#### 下载  Android SDK

默认情况下，Android Studio 会安装最新的 Android SDK。但是，使用本机代码构建 React Native 应用程序尤其需要 `Android 15 （VanillaIceCream）` SDK。可以通过 Android Studio 中的 SDK 管理器安装其他 Android SDK。

从 SDK 管理器中选择“SDK Platforms”选项卡，然后选中右下角“Show Package Details”旁边的框。查找并展开 `Android 15 （VanillaIceCream）` 条目，然后确保选中以下项目：

* Android SDK Platform 35
* Intel x86 Atom_64 System Image 或者 Google APIs Intel x86 Atom System Image 

接下来，选择 “SDK Tools” 选项卡，并在此处选中 “Show Package Details” 旁边的框。查找并展开 `Android SDK Build-Tools` 条目，然后确保选择了 `35.0.0`。

最后，点击 “Apply” 下载并安装 Android SDK 和相关构建工具。



#### 设置环境变量

React Native 工具需要设置一些环境变量才能使用本机代码构建应用程序。

* `ANDROID_HOME` ：例如 `D:\Android\Sdk`
* 将 platform-tools 添加到 Path ：例如 `D:\Android\Sdk\platform-tools`



## 在没有框架的情况下开始

https://reactnative.dev/docs/getting-started-without-a-framework



首先需要设置您的环境 。设置完成后，请继续执行以下步骤以创建应用程序并开始开发。



### 1.创建新应用程序

```sh
# 如果您之前安装了全局 react-native-cli 包，请将其删除，因为它可能会导致意外问题：
npm uninstall -g react-native-cli @react-native-community/cli
```



您可以使用 [React Native Community CLI](https://github.com/react-native-community/cli) 生成新项目。让我们创建一个名为 “AwesomeProject” 的新 React Native 项目：

```sh
# Node.js 版本需要大于等于 18
npx @react-native-community/cli@latest init AwesomeProject

# 如果你想使用特定的 React Native 版本启动一个新项目，你可以使用 --version 参数：
# 注意：两个版本都要写
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X

# 可用-jdk11
npx @react-native-community/cli@8.0.7 init AwesomeProject --version 0.69.0
```

你也可以使用带有 `--template` 参数的自定义 React Native 模板启动一个项目，[ 在这里](https://github.com/react-native-community/cli/blob/main/docs/init.md#initializing-project-with-custom-template)阅读更多内容。



修改 `android\gradle\wrapper\gradle-wrapper.properties`

```
# distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-bin.zip
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.13-bin.zip
```



修改 `android\build.gradle` repositories 下载源，速度更快更稳定。

```
repositories {

    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/public' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/spring' }
    maven { url 'https://maven.aliyun.com/repository/spring-plugin' }
    maven { url 'https://maven.aliyun.com/repository/releases' }
    maven { url 'https://maven.aliyun.com/repository/grails-core' }
    maven { url 'https://maven.aliyun.com/repository/mapr-public' }
    maven { url 'https://maven.aliyun.com/repository/staging-alpha' }
    maven { url 'https://maven.aliyun.com/repository/staging-alpha-group' }

    maven { url 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }

    // google()
    // mavenCentral()
}
```





### 打包

如果您未使用 Android Studio，则可以使用以下方法创建发布 build：

```
cd android
# For a Release APK
./gradlew :app:assembleRelease
# For a Release AAB
./gradlew :app:bundleRelease
```

您还可以使用 `React Native CLI` 生成并运行发布版本（例如，从项目的根目录：`npm run android --mode release`）。







失败记录：

```
# 到安装app这步失败，可能是java版本问题。用的是jdk21
# 可能要Jdk8，还没测试
npx @react-native-community/cli@6.2.0 init appv6 --version 0.67.0


# 安装太慢，阿里云镜像没得加速
# :react-native-gradle-plugin:classpath > kotlin-compiler-embeddable-1.6.10.jar > 2 MiB/47.6 MiB 
npx @react-native-community/cli@7.0.1 init appv7 --version 0.68.0


```







## Expo

expo 官网：https://expo.dev/

Expo 是一个生产级的 React Native 框架。Expo 提供了开发人员工具，使开发应用程序变得更加容易，例如基于文件的路由、原生模块的标准库等等。

Expo 是一个用于 React Native 的工具和服务框架，专注于帮助您构建、发布和迭代您的应用程序，使用 Web 开发中流行的预览部署工作流程，以及自动化您的开发工作流程。Expo 还使得在不接触 Xcode 或 Android Studio 的情况下构建 React Native 应用程序成为可能，如果你想使用这些工具，它不会妨碍你。

Expo 的框架是免费和开源的，Expo 团队与 Meta 的 React Native 团队密切合作，将最新的 React Native 功能引入 Expo SDK。

Expo 的团队还提供 Expo Application Services （EAS），这是一组可选的服务，在开发过程的每个步骤中补充 Expo，即框架。

要创建新的 Expo 项目，请在终端中运行以下命令：

```
npx create-expo-app@latest
```

创建应用程序后，请查看 [Expo 入门指南](https://docs.expo.dev/get-started/set-up-your-environment/) 的其余部分以开始开发您的应用程序。





### Snack Player

Snack Player 是 Expo 创建的一个便捷工具，用于嵌入和运行 React Native 项目，并分享它们在 Android 和 iOS 等平台上的渲染方式。

网址：https://snack.expo.dev/



## Ignite

[Ignite](https://github.com/infinitered/ignite) 是一个初学者工具包 CLI，其中包含多个 React Native 样板。最新的 Ignite Maverick 使用 MobX-State-Tree 进行状态管理、React Navigation 和其他常用库。它具有用于屏幕、模型等的生成器，并支持开箱即用的 Expo。Ignite 还附带一个组件库，该库针对自定义设计、主题支持和测试进行了优化。如果您正在寻找预配置的技术堆栈，Ignite 可能非常适合您。



##  Native Directory

Native Directory 网址：https://reactnative.directory/

可以查找社区一直在创建的组件。



## 核心组件

| React Native UI 组件 | Android 视图   | iOS 视图         | Web                   | 描述                                                         |
| -------------------- | -------------- | ---------------- | --------------------- | ------------------------------------------------------------ |
| `<View>`             | `<ViewGroup>`  | `<UIView>`       | `<div>`               | 支持使用 Flexbox、样式、一些触摸处理和辅助功能控件进行布局的容器 |
| `<Text>`             | `<TextView>`   | `<UITextView>`   | `<p>`                 | 显示、设置和嵌套文本字符串，甚至处理触摸事件                 |
| `<Image>`            | `<ImageView>`  | `<UIImageView>`  | `<img>`               | 显示不同类型的图像                                           |
| `<ScrollView>`       | `<ScrollView>` | `<UIScrollView>` | `<div>`               | 可以包含多个组件和视图的通用滚动容器                         |
| `<TextInput>`        | `<EditText>`   | `<UITextField>`  | `<input type="text">` | 允许用户输入文本                                             |



在 React Native 中，`View` 使用 Flexbox 作为其子项的布局。

```react
import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
};

export default App;
```



### `<TextInput>`

TextInput 是一个允许用户输入文本的核心组件。它有一个 `onChangeText` 属性，每次文本更改时都调用一个函数，还有一个 `onSubmitEditing` 属性，在提交文本时调用一个函数。



```react
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40, padding: 5}}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text
          .split(' ')
          .map(word => word && '🍕')
          .join(' ')}
      </Text>
    </View>
  );
};

export default PizzaTranslator;
```



### `<Image>`

在浏览器中 ，如果您没有为图像指定大小，浏览器将呈现一个 0x0 元素，下载图像，然后根据正确的大小呈现图像。此行为的最大问题是，您的 UI 将在图像加载时跳来跳去，这会导致非常糟糕的用户体验。

在 React Native 中 ，此行为是故意不实现的。开发人员提前了解远程图像的尺寸（或纵横比）需要做更多的工作，但我们相信这会带来更好的用户体验。通过 `require（'./my-icon.png'）` 语法从 app bundle 加载的静态图像可以自动调整大小 ，因为它们的尺寸在挂载时立即可用。

例如，`require（'./my-icon.png'）` 的结果可能是：

```react
{"__packager_asset":true,"uri":"my-icon.png","width":591,"height":573}
```



在 React Native 中，一个有趣的决定是 `src` 属性被命名为 `source`，它不接受字符串，而是带有 `uri` 属性的对象。

在基础设施方面，原因是它允许我们将元数据附加到此对象。例如，如果你正在使用 `require（'./my-icon.png'），` 那么我们会添加有关其实际位置和大小的信息。

在用户端，这允许您使用有用的属性（例如图像的尺寸）对对象进行注释，以便计算它将要显示的大小。随意将其用作数据结构，以存储有关图像的更多信息。

```react
<Image source={{uri: 'something.jpg'}} />
```



请注意，iOS 的 image 组件可能会忽略以下特定于角的边框半径样式属性：

* `borderTopLeftRadius`
* `borderTopRightRadius`
* `borderBottomLeftRadius`
* `borderBottomRightRadius`





#### 静态资源

React Native 提供了一种在 Android 和 iOS 应用程序中管理图像和其他媒体资产的统一方式。要将静态图像添加到您的应用程序，请将其放在源代码树中的某个位置并引用它。

 `require` 语法也可用于在项目中静态包含音频、视频或文档文件。支持最常见的文件类型，包括 `.mp3`、`.wav`、`.mp4`、`.mov`、`.html` 和 `.pdf`。

```react
<Image source={require('./my-icon.png')} />
```



您可以使用 `@2x` 和 `@3x` 后缀为不同的屏幕密度提供图像。如果您具有以下文件结构：

```
.
├── button.js
└── img
    ├── check.png
    ├── check@2x.png
    └── check@3x.png
```

打包器将捆绑并提供与设备的屏幕密度对应的图像。例如，`check@2x.png` 将在 iPhone 7 上使用，而 `check@3x.png` 将在 iPhone 7 Plus 或 Nexus 5 上使用。如果没有与屏幕密度匹配的图像，则将选择最接近的最佳选项。

在 Windows 上，如果您向项目添加新图像，则可能需要重新启动打包器。



为了使其正常工作，`require` 中的镜像名称必须静态已知。

请注意，以这种方式所需的图像源包括 Image 的大小（宽度、高度）信息。如果你需要动态缩放图像（即通过 flex），你可能需要手动设置 `{width: undefined, height: undefined}` style 属性。

```react
// GOOD
<Image source={require('./my-icon.png')} />;

// BAD
const icon = this.props.active
  ? 'my-icon-active'
  : 'my-icon-inactive';
<Image source={require('./' + icon + '.png')} />;

// GOOD
const icon = this.props.active
  ? require('./my-icon-active.png')
  : require('./my-icon-inactive.png');
<Image source={icon} />;
```



如果你正在构建一个混合应用程序（React Native 中的一些 UI，平台代码中的一些 UI），你仍然可以使用已经捆绑到应用程序中的图像。

这些方法不提供安全检查。您需要保证这些图像在应用程序中可用。此外，您还必须手动指定图像尺寸。

对于通过 Xcode 资产目录或 Android drawable 文件夹包含的图像，请使用不带扩展名的图像名称：

```react
<Image
  source={{uri: 'app_icon'}}
  style={{width: 40, height: 40}}
/>
```



对于 Android assets 文件夹中的图像，请使用 `asset：/` 方案：

```react
<Image
  source={{uri: 'asset:/app_icon.png'}}
  style={{width: 40, height: 40}}
/>
```



#### 网络资源

网络资源与静态资源不同， 需要手动指定图像的尺寸 。强烈建议您也使用 https。

```react
// GOOD
<Image source={{uri: 'https://reactjs.org/logo-og.png'}}
       style={{width: 400, height: 400}} />

// BAD
<Image source={{uri: 'https://reactjs.org/logo-og.png'}} />
```



如果您想在图像请求中设置 HTTP-Verb、Headers 或 Body 等内容，您可以通过在源对象上定义这些属性来实现：

```react
<Image
  source={{
    uri: 'https://reactjs.org/logo-og.png',
    method: 'POST',
    headers: {
      Pragma: 'no-cache',
    },
    body: 'Your Body goes here',
  }}
  style={{width: 400, height: 400}}
/>
```



#### base64

有时，您可能会从 REST API 调用获取编码的图像数据。您可以使用 `'data：'` URI 方案来使用这些图像。与网络资源相同， 您需要手动指定图像的尺寸。

建议仅对非常小的动态图像（如数据库列表中的图标）执行此作。

```react
// 至少包含宽度和高度！
<Image
  style={{
    width: 51,
    height: 51,
    resizeMode: 'contain',
  }}
  source={{
    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
  }}
/>
```



#### drawable 资源

Android 支持通过 xml 文件类型加载可绘制对象资源 。这意味着您可以使用矢量可绘制对象来渲染图标，或者使用形状可绘制对象来绘制形状！您可以像导入任何其他静态资源或混合资源一样导入和使用这些资源类型。您必须手动指定图像尺寸。

对于与 JS 代码并存的静态可绘制对象，请使用 `require` 或 `import` 语法。

```react
<Image
  source={require('./img/my_icon.xml')}
  style={{width: 40, height: 40}}
/>
```



对于 Android drawable 文件夹中包含的可绘制对象（即 `res/drawable`），请使用不带扩展名的资源名称：

```react
<Image
  source={{uri: 'my_icon'}}
  style={{width: 40, height: 40}}
/>
```



可绘制资源与其他图像类型之间的一个关键区别是，必须在 Android 应用程序的编译时引用资产，因为 Android 需要运行 `Android 资产打包工具 （AAPT）` 来打包资产。二进制 XML 是 AAPT 创建的文件格式，Metro 无法通过网络加载。如果您更改了资源的目录或名称，则每次都需要重新构建 Android 应用程序。



Android 在其 [Drawable 资源](https://developer.android.com/guide/topics/resources/drawable-resource)指南中提供了有关每种受支持的可绘制资源类型的全面文档，以及原始 XML 文件的示例。您可以利用 Android Studio 中的工具（如 [Vector Asset Studio](https://developer.android.com/studio/write/vector-asset-studio)）从可缩放矢量图形 （SVG） 和 Adobe Photoshop 文档 （PSD） 文件创建矢量可绘制对象。

如果要将 XML 文件视为静态图像资源（即使用 `import` 或 `require` 语句），则应尽量避免在创建的 XML 文件中引用其他资源。如果您希望利用对其他可绘制对象或属性（例如[颜色状态列表](https://developer.android.com/guide/topics/resources/color-list-resource)或[维度资源 ](https://developer.android.com/guide/topics/resources/more-resources#Dimension)）的引用，则应将可绘制对象作为[混合资源](https://reactnative.dev/docs/images#images-from-hybrid-apps-resources)添加，并按名称导入。



#### cache

在某些情况下，您可能只想显示已在本地缓存中的图像，即在有更高分辨率可用之前显示低分辨率占位符。在其他情况下，您不在乎图像是否过时，并且愿意显示过时的图像以节省带宽。` cache` 源属性允许您控制网络层与缓存的交互方式。



* `default`：使用本机平台默认策略
* `reload`：将从原始源加载 URL 的数据。不应使用现有的缓存数据来满足 URL 加载请求。
* `force-cache`：现有的缓存数据将用于满足请求，无论其存在时间或到期日期如何。如果缓存中没有与请求对应的现有数据，则从原始源加载数据。
* `only-if-cached`：现有缓存数据将用于满足请求，无论其存在时间或到期日期如何。如果缓存中没有与 URL 加载请求对应的现有数据，则不会尝试从原始源加载数据，并且加载被视为失败。



```react
<Image
  source={{
    uri: 'https://reactjs.org/logo-og.png',
    cache: 'only-if-cached',
  }}
  style={{width: 400, height: 400}}
/>
```



#### 对本地相机胶卷或照片库的访问

CameraRoll 是一个 react-native 原生模块，提供对本地相机胶卷或照片库的访问。

文档：https://github.com/react-native-cameraroll/react-native-cameraroll



#### 配置 iOS 图像缓存限制

在 iOS 上，我们公开了一个 API 来覆盖 React Native 的默认图像缓存限制。这应该从你的原生 AppDelegate 代码中调用（例如，在 `didFinishLaunchingWithOptions` 中）。

```react
RCTSetImageCacheLimits(4*1024*1024, 200*1024*1024);
```

* imageSizeLimit ： 图像缓存大小限制。
* totalCostLimit ：总缓存成本限制。

在上面的代码示例中，图像大小限制设置为 4 MB，总成本限制设置为 200 MB。



### `<ImageBackground>`

熟悉 Web 的开发人员经常要求使用背景图像 。要处理此用例，您可以使用 `<ImageBackground>` 组件，该组件具有与 `<Image>` 相同的 props，并添加您希望在其上分层的任何子项。

请注意，您必须指定一些 width 和 height 样式属性。

```react
return (
  <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
    <Text>Inside</Text>
  </ImageBackground>
);
```





### `<ScrollView>`

ScrollView 是一个通用的滚动容器，可以包含多个组件和视图。可滚动项可以是异构的，并且您可以垂直和水平滚动（通过设置 `horizontal` 属性）。

ScrollView 最适合呈现少量大小有限的事物。`ScrollView` 的所有元素和视图都会被渲染，即使它们当前未显示在屏幕上。如果你有一长串无法在屏幕上显示的项目，你应该使用 `FlatList` 来代替。



通过使用 `pagingEnabled` 属性，可以将 ScrollView 配置为允许使用滑动手势对视图进行分页。



```react
import React from 'react';
import {Image, ScrollView, Text} from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

const App = () => (
  <ScrollView>
    <Text style={{fontSize: 96}}>Scroll me plz</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>If you like</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>Scrolling down</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>What's the best</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>Framework around?</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 80}}>React Native</Text>
  </ScrollView>
);

export default App;
```



### `<FlatList>`

`FlatList` 组件显示一个滚动列表，其中包含已更改但结构相似的数据。`FlatList` 适用于较长的数据列表，其中的项目数可能会随时间变化。与更通用的 `ScrollView` 不同，`FlatList` 只渲染当前在屏幕上显示的元素，而不是一次渲染所有元素。

`FlatList` 组件需要两个 props：`data` 和 `renderItem`。`data` 是列表的信息来源。`renderItem` 从源中获取一个项目，并返回一个格式化的组件来渲染。



```react
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

export default FlatListBasics;
```



### `<SectionList>`

如果要呈现一组分解为逻辑部分的数据，可能带有节标头，那么 SectionList 是要走的路。

```react
import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SectionListBasics = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
};

export default SectionListBasics;
```



### `<Button>`

这将在 iOS 上呈现一个蓝色标签，在 Android 上呈现一个带有浅色文本的蓝色圆角矩形。按下该按钮将调用“onPress”函数。

可以指定一个 `color` 属性来更改按钮的颜色。

```react
<Button
  onPress={() => {
    console.log('You tapped the button!');
  }}
  title="Press Me"
  color="#841584"
/>
```



### Touchable

如果基本按钮看起来不适合你的应用程序，你可以使用 React Native 提供的任何 “Touchable” 组件构建自己的按钮。这些组件提供了捕获点击手势的功能，并且可以在识别手势时显示反馈。但是，这些组件不提供任何默认样式，因此您需要做一些工作才能使它们在应用程序中看起来不错。

在某些情况下，您可能希望检测用户何时长按并按住视图一段时间。这些长按可以通过将函数传递给任何 “Touchable” 组件的 `onLongPress` props 来处理。

您使用哪个 “Touchable” 组件将取决于您要提供的反馈类型：

* 通常，您可以在 Web 上使用按钮或链接的任何地方使用 `TouchableHighlight`。当用户按下按钮时，视图的背景将变暗。
* 您可以考虑在 Android 上使用 `TouchableNativeFeedback` 来显示响应用户触摸的油墨表面反应波纹。
* `TouchableOpacity` 可用于通过降低按钮的不透明度来提供反馈，从而允许用户在按下按钮时看到背景。
* 如果需要处理点击手势，但不希望显示任何反馈，请使用 `TouchableWithoutFeedback`。



```react
import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Touchables = () => {
  const onPressButton = () => {
    Alert.alert('You tapped the button!');
  };

  const onLongPressButton = () => {
    Alert.alert('You long-pressed the button!');
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPressButton} underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableHighlight</Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableOpacity</Text>
        </View>
      </TouchableOpacity>
      <TouchableNativeFeedback
        onPress={onPressButton}
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackground()
            : undefined
        }>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            TouchableNativeFeedback{' '}
            {Platform.OS !== 'android' ? '(Android only)' : ''}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableHighlight
        onPress={onPressButton}
        onLongPress={onLongPressButton}
        underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>Touchable with Long Press</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});

export default Touchables;
```







## 原生组件



## Style

所有核心组件都接受名为 `style` 的 prop。样式名称和值通常与 CSS 在 Web 上的工作方式相匹配，但名称是使用驼峰式大小写编写的，例如 `backgroundColor` 而不是 `background-color`。

`style` prop 可以是一个普通的旧 JavaScript 对象。这就是我们通常用于示例代码的内容。你还可以传递一个样式数组 - 数组中的最后一个样式具有优先权，因此你可以使用它来继承样式。

随着组件复杂性的增加，使用 `StyleSheet.create` 在一个地方定义多个样式通常会更简洁。

一种常见的模式是让你的组件接受一个 `style` prop，而这个 prop 又被用来给子组件设置样式。你可以使用它来使样式像它们在 CSS 中那样 “级联”。

React Native 仅支持小写颜色名称。不支持大写颜色名称。

```react
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LotsOfStyles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default LotsOfStyles;
```



## 宽高

### width 、height

组件的高度和宽度决定了它在屏幕上的大小。

`width` 属性指定元素内容区域的宽度。同样，`height` 属性指定元素内容区域的高度。

`width` 和 `height` 都可以采用以下值：

* `auto` （ **默认值** ） React Native 根据元素的内容计算元素的宽度/高度，无论是其他子元素、文本还是图像。
* `pixels` 以绝对像素定义宽度/高度。根据组件上设置的其他样式，这可能是也可能不是节点的最终维度。
* `百分比` 分别定义宽度或高度（以父项的宽度或高度的百分比表示）。



#### 固定尺寸

设置组件尺寸的一般方法是向 style 添加固定的宽度和高度 。React Native 中的所有维度都是无单位的，代表与密度无关的像素。

以这种方式设置尺寸对于大小应始终固定为多个点且不根据屏幕大小计算的组件来说很常见。

```react
import React from 'react';
import {View} from 'react-native';

const FixedDimensionsBasics = () => {
  return (
    <View>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'powderblue',
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'skyblue',
        }}
      />
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'steelblue',
        }}
      />
    </View>
  );
};

export default FixedDimensionsBasics;
```



#### 百分比

如果要填充屏幕的某个部分，但不想使用 `flex` 布局， 则可以在组件的样式中使用**百分比值** 。 与弹性尺寸类似，百分比尺寸需要具有定义大小的父级。

```react
import React from 'react';
import {View} from 'react-native';

const PercentageDimensionsBasics = () => {
  // 尝试删除父视图中的`height: '100%'，则子视图没有高度，不会显示
  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          height: '15%',
          backgroundColor: 'powderblue',
        }}
      />
      <View
        style={{
          width: '66%',
          height: '35%',
          backgroundColor: 'skyblue',
        }}
      />
      <View
        style={{
          width: '33%',
          height: '50%',
          backgroundColor: 'steelblue',
        }}
      />
    </View>
  );
};

export default PercentageDimensionsBasics;
```







### flex

组件可以使用 Flexbox 算法指定其子组件的布局。Flexbox 旨在在不同屏幕尺寸上提供一致的布局。

在组件的样式中使用 `flex` 可使组件根据可用空间动态扩展和收缩。通常你会使用 `flex： 1`，它告诉组件填充所有可用空间，在具有相同父组件的其他组件之间平均共享。给定的 `flex` 越大，与它的同级相比，组件占用的空间比率就越高。

如果组件的父组件的尺寸大于 `0`，则组件只能扩展以填充可用空间。如果父项没有固定的宽度和高度或 `flex`，则父项的尺寸将为 `0`，并且 `flex` 子项将不可见。

```react
import React from 'react';
import {View} from 'react-native';

const FlexDimensionsBasics = () => {
  return (
    // 尝试删除父视图中的'flex: 1'，则子视图没有高度，不会显示
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      <View style={{flex: 2, backgroundColor: 'skyblue'}} />
      <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    </View>
  );
};

export default FlexDimensionsBasics;
```



您通常会使用 `flexDirection`、`alignItems` 和 `justifyContent` 的组合来实现正确的布局。

Flexbox 在 React Native 中的工作方式与在 Web 上的 CSS 中的工作方式相同，但有一些例外。默认值不同，flexDirection 默认为 column 而不是 row，alignContent 默认为 flex-start 而不是 stretch，flexShrink 默认为 0 而不是 1，flex 参数仅支持单个数字。

`flex` 将定义你的项目如何**沿主轴 “填充”** 可用空间。空间将根据每个元素的 flex 属性进行划分。



* flexDirection ： 控制节点的子项的布局方向。这也称为主轴。
  * column ：（ **默认值** ） 从上到下对齐子项。如果启用了换行，则下一行将从容器顶部第一项的右侧开始。
  * row ：从左到右对齐子项。如果启用了换行，则下一行将从容器左侧的第一项下开始。
  * column-reverse ：（列反转） 从下到上对齐子项。如果启用了换行，则下一行将从容器底部第一项的右侧开始。
  * row-reverse ：（行反转）从右到左对齐子项。如果启用了换行，则下一行将从容器右侧的第一项下开始。
* direction ：布局方向指定层次结构中子项和文本的布局方向。默认情况下，React Native 使用 LTR 布局方向进行布局。在此模式下 ，start 是指 left，end 是指 right。
  * LTR ：（ **默认值** ）文本和子项从左到右布局。应用于元素开头的 margin 和 padding 将应用于左侧。
  * RTL ：文本和子项从右到左布局。应用于元素开头的边距和填充将应用于右侧。
* flexWrap ：控制当子项沿主轴溢出容器大小时是否换行。
  * wrap ：换行。
  * nowrap ：不换行。
* justifyContent ：描述了如何在其容器的主轴内对齐子项。
  * flex-start ：（ **默认值** ） 将容器的子项与容器主轴的起点对齐。
  * flex-end ：将容器的子项与容器主轴的末端对齐。
  * center ：将容器的子项对齐到容器主轴的中心。
  * space-between ：在容器的主轴上均匀分布子项，在子项之间分配剩余空间。
  * space-around ：在容器的主轴上均匀分布子项，将剩余空间分布在子项周围。
  * space-evenly ：沿主轴在对齐容器内均匀分布子项。
* alignItems ：描述了如何沿容器的交叉轴对齐子项。
  * stretch ：（ **默认值** ） 拉伸容器的子对象以匹配容器的交叉轴的高度 。要使 `stretch` 生效，子项不得沿次轴具有固定尺寸。
  * flex-start ：将容器的子对象与容器的交叉轴的起点对齐。
  * flex-end ：将容器的子对象与容器的交叉轴的末端对齐。
  * center ：将容器的子对象对齐到容器的交叉轴中心。
  * baseline ：沿公共基线对齐容器的子项。可以将单个子项设置为其父项的参考基线。
* alignSelf ：具有与 `alignItems` 相同的选项和效果，但你可以将此属性应用于单个子项以更改其在其父项中的对齐方式，而不是影响容器中的子项。`alignSelf` 使用 `alignItems` 覆盖父级设置的任何选项。
* alignContent ：定义沿交叉轴的线条分布。仅当使用 `flexWrap` 将项目换行到多行时，这才有效。
  * flex-start ：（ **默认值** ） 将换行的行与容器的交叉轴的起点对齐。
  * flex-end ：将换行的线条与容器的交叉轴末端对齐。
  * stretch ：（ *在 Web 上使用 Yoga 时的默认值* ） 拉伸换行的线条以匹配容器的交叉轴的高度。
  * center ：将换行线对齐到容器的交叉轴中心。
  * space-between ：在容器的交叉轴上均匀地分隔换行的线条，从而在线条之间分配剩余空间。
  * space-around ：在容器的交叉轴上均匀地分隔换行的线条，从而将剩余空间分布到线条周围。与项之间的空间相比，容器的每一端都有一半的空间。
  * space-evenly ：在容器的交叉轴上均匀地分隔换行的线条，从而将剩余空间分布到线条周围。每个空间的大小相同。
* flexBasis ：是一种独立于轴的方式，用于提供沿主轴的项的默认大小。设置子项的 flexBasis 类似于设置该子项的宽度 （如果其父项是具有 flexDirection： row 的容器）或设置子项的高度（ 如果其父项是具有 flexDirection： column 的容器）。项目的 flexBasis 是该项目的默认大小，即执行任何 flexGrow 和 flexShrink 计算之前项目的大小。
* flexGrow ：描述了容器内应沿主轴在其子项之间分配多少空间。在布置其 children 之后，容器将根据其 children 指定的 flex grow 值分配任何剩余空间。
  * `flexGrow` 接受任何浮点值 >= 0，其中 0 是默认值。容器将在其子项之间分配任何剩余空间，这些子项由子项的 `flexGrow` 值加权。
* flexShrink ：描述了在子项的总大小超过主轴上容器的大小的情况下，如何沿主轴收缩子项。`flexShrink` 与 `flexGrow` 非常相似，如果任何溢出大小被视为负剩余空间，则可以以相同的方式进行考虑。这两个属性还可以很好地协同工作，允许子项根据需要生长和收缩。
  * `flexShrink` 接受任何浮点值 >= 0，其中 0 是默认值（在 Web 上，默认值为 1）。容器将收缩其子项，该子项由子项的 `flexShrink` 值加权。
* rowGap ：设置元素行之间的间隙（装订线）的大小。
* columnGap ：设置元素列之间的间隙（装订线）的大小。
* Gap ：设置行和列之间的间隙（装订线）的大小。它是 `rowGap` 和 `columnGap` 的简写。



您可以[在此处](https://www.yogalayout.dev/docs/styling/flex-basis-grow-shrink)了解更多信息。



### position

元素的位置类型定义它相对于自身、其父级或包含块的定位方式。



* relative ：（ **默认值** ） 默认情况下，元素是相对定位的。这意味着根据布局的正常流程对元素进行定位，然后根据 `top`、`right`、`bottom` 和 `left` 的值相对于该位置进行偏移。偏移量不会影响任何同级元素或父元素的位置。
* absolute ：当绝对定位时，元素不参与正常的布局流。相反，它的布局独立于其兄弟姐妹。位置是根据 `top`、`right`、`bottom` 和 `left` 值确定的。这些值将相对于其包含块定位元素。
* static ：当静态定位时，元素根据正常的布局流程进行定位，并且会忽略 `top`、`right`、`bottom` 和 `left` 值。这个位置也会导致元素不形成绝对后代的包含块，除非存在其他替代 style props（例如 `transform`）。这允许将 `absolute` 元素定位到不是其父元素的某个对象。请注意，**`static` 仅在 New Architecture 上可用** 。



```react
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const PositionLayout = () => {
  const [position, setPosition] = useState('relative');

  return (
    <PreviewLayout
      label="position"
      selectedValue={position}
      values={['relative', 'absolute', 'static']}
      setSelectedValue={setPosition}>
      <View
        style={[
          styles.box,
          {
            top: 25,
            left: 25,
            position,
            backgroundColor: 'powderblue',
          },
        ]}
      />
      <View
        style={[
          styles.box,
          {
            top: 50,
            left: 50,
            position,
            backgroundColor: 'skyblue',
          },
        ]}
      />
      <View
        style={[
          styles.box,
          {
            top: 75,
            left: 75,
            position,
            backgroundColor: 'steelblue',
          },
        ]}
      />
    </PreviewLayout>
  );
};

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{padding: 10, flex: 1}}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map(value => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[styles.button, selectedValue === value && styles.selected]}>
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.container}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
    minHeight: 200,
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});

export default PositionLayout;
```



### 包含块

元素的包含块是控制其位置和大小的 ancestor 元素。

绝对定位元素的 `top`、`right`、`bottom` 和 `left` 值将相对于其包含的块。

应用于绝对定位元素的百分比长度（例如：`width： '50%'` 或 `padding： '10%'`）将相对于其包含块的大小进行计算。例如，如果包含块的宽度为 100 磅，则绝对定位元素上的 `width： 50%` 将导致其宽度为 50 磅。



以下列表将帮助您确定任何给定元素的包含块：

* 如果该元素的 `position` 类型为 `relative` 或 `static`，则其包含块是其父元素。
* 如果该元素的 `position` 类型为 `absolute`，则其包含块是满足以下条件之一的最近祖先：
  * 它具有除 `static` 以外的 `position` 类型
  * 它有一个 `transform`







## 特定于平台的代码

React Native 提供了两种方法来组织代码并按平台分隔代码：

* 使用 Platform 模块。
* 使用特定于平台的文件扩展名。



某些组件可能具有仅在一个平台上工作的属性。所有这些 props 都带有 `@platform` 注释，并在网站上旁边有一个小徽章。



### Platform 模块

React Native 提供了一个模块，用于检测运行应用程序的平台。您可以使用检测逻辑来实现特定于平台的代码。当组件中只有一小部分特定于平台时，请使用此选项。



#### Platform.OS

`Platform.OS` 在 iOS 上运行时为 `ios`，在 Android 上运行时为 `android`。

```react
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```



#### Platform.select

还有一个 `Platform.select` 方法可用，给定一个对象，其中 keys 可以是 之一 `'ios' | 'android' | 'native' | 'default'` ，返回最适合您当前运行的平台的值。也就是说，如果您在手机上运行， 则 ios 和 android key 将优先使用。如果未指定这些值，则将使用 `native` key，然后使用 `default` key。

```react
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        // 其他平台，例如 Web
        backgroundColor: 'blue',
      },
    }),
  },
});
```

由于它接受任何值，因此您还可以使用它来返回特定于平台的组件，如下所示：

```react
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```



#### Platform.Version

在 Android 上，`Platform` 模块还可用于检测运行应用程序的 Android 平台版本：

```js
import {Platform} from 'react-native';

if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```

`Version` 设置为 Android API 版本，而不是 Android OS 版本。要查找映射，请参阅 [Android 版本历史记录 ](https://en.wikipedia.org/wiki/Android_version_history#Overview)。



在 iOS 上，`Version` 是 `-[UIDevice systemVersion]` 的结果，它是一个包含当前作系统版本的字符串。系统版本的一个示例是 “10.3”。例如，要在 iOS 上检测主要版本号：

```js
import {Platform} from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```



### 特定于平台的文件扩展名

当特定于平台的代码更复杂时，应考虑将代码拆分为单独的文件。React Native 将检测文件何时具有 `.ios.` 或 `.android.` 扩展名，并在需要时从其他组件加载相关的平台文件。

例如，假设您的项目中有以下文件：

```
BigButton.ios.js
BigButton.android.js
```

然后，您可以按如下方式导入组件：

```js
import BigButton from './BigButton';
```

React Native 将根据正在运行的平台自动选择正确的文件。



当模块需要在 NodeJS/Web 和 React Native 之间共享，但它没有 Android/iOS 差异时，你也可以使用 `.native.js` 扩展。这对于在 React Native 和 ReactJS 之间共享通用代码的项目特别有用。

例如，假设您的项目中有以下文件：

```
Container.js # 被 webpack、Rollup 或任何其他 Web 打包器拾取
Container.native.js # 被 Android 和 iOS (Metro) 的 React Native 打包器所采用
```

您仍然可以在没有 `.native` 扩展名的情况下导入它，如下所示：

```js
import Container from './Container';
```

**专业提示：** 将 Web 捆绑器配置为忽略 `.native.js` 扩展，以避免生产捆绑包中包含未使用的代码，从而减小最终捆绑包的大小。



## 网络连接

许多移动应用程序需要从远程 URL 加载资源。您可能希望向 REST API 发出 POST 请求，或者可能需要从另一台服务器获取一段静态内容。

默认情况下，iOS 9.0 或更高版本强制实施应用程序传输安全性 （ATS）。ATS 要求任何 HTTP 连接都使用 HTTPS。

在 Android 上，从 API 级别 28 开始，明文流量也默认被阻止。可以通过在应用清单文件中设置 [`android：usesCleartextTraffic`](https://developer.android.com/guide/topics/manifest/application-element#usesCleartextTraffic) 来覆盖此行为。



### 使用 Fetch

React Native 为您的网络需求提供了 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)。如果您以前使用过 `XMLHttpRequest` 或其他网络 API，则 Fetch 似乎很熟悉。

为了从任意 URL 获取内容，您可以将 URL 传递给 fetch：

```react
fetch('https://mywebsite.com/mydata.json');
```



Fetch 还采用可选的第二个参数，该参数允许您自定义 HTTP 请求。您可能希望指定其他标头，或发出 POST 请求：

```react
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  }),
});
```

查看 [Fetch Request 文档 ](https://developer.mozilla.org/en-US/docs/Web/API/Request)以获取属性的完整列表。



联网本质上是一种异步操作。Fetch 方法将返回一个 `Promise`，这使得编写以异步方式工作的代码变得简单明了：

```react
const getMoviesFromApi = () => {
  return fetch('https://reactnative.dev/movies.json')
    .then(response => response.json())
    .then(json => {
      return json.movies;
    })
    .catch(error => {
      console.error(error);
    });
};
```



你也可以在 React Native 应用程序中使用 `async` / `await` 语法：

```react
const getMoviesFromApiAsync = async () => {
  try {
    const response = await fetch(
      'https://reactnative.dev/movies.json',
    );
    const json = await response.json();
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};
```

不要忘记捕获 `fetch` 可能引发的任何错误，否则它们将被静默删除。



```react
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;
```



### axios

[XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 内置于 React Native 中。这意味着您可以使用依赖于它的第三方库，例如 [frisbee](https://github.com/niftylettuce/frisbee) 或 [axios](https://github.com/axios/axios)，或者如果您愿意，可以直接使用 XMLHttpRequest API。

XMLHttpRequest 的安全模型与 Web 上的安全模型不同，因为本机应用程序中没有 `CORS` 的概念。

```react
const request = new XMLHttpRequest();
request.onreadystatechange = e => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};

request.open('GET', 'https://mywebsite.com/endpoint/');
request.send();
```



### WebSocket

React Native 还支持 WebSockets，这是一种通过单个 TCP 连接提供全双工通信通道的协议。

```react
const ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {
  // connection opened
  ws.send('something'); // send a message
};

ws.onmessage = e => {
  // a message was received
  console.log(e.data);
};

ws.onerror = e => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = e => {
  // connection closed
  console.log(e.code, e.reason);
};
```





### TODO ATS







## 动画

React Native 提供了两个互补的动画系统：`Animated` 用于对特定值进行精细和交互式控制，以及用于动画全局布局事务的 `LayoutAnimation`。



### Animated

Animated API 旨在以非常高性能的方式简明扼要地表达各种有趣的动画和交互模式。Animated 侧重于输入和输出之间的声明性关系，两者之间具有可配置的转换，以及用于控制基于时间的动画执行的 start/stop 方法。

`Animated` 会导出六种可动画化的组件类型：`View`、`Text`、`Image`、`ScrollView`、`FlatList` 和 `SectionList`，但您也可以使用 `Animated.createAnimatedComponent()` .



#### TODO

https://reactnative.dev/docs/animations





### LayoutAnimation





## 安全

### 存储敏感信息

切勿在应用代码中存储敏感的 API 密钥。检查 app bundle 的任何人都可以以纯文本形式访问代码中包含的任何内容。[react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv) 和 [react-native-config](https://github.com/luggit/react-native-config/) 等工具非常适合添加特定于环境的变量，例如 API 端点，但它们不应与服务器端环境变量混淆，后者通常可能包含密钥和 API 密钥。

如果您必须具有 API 密钥或密钥才能从应用程序访问某些资源，则最安全的处理方法是在应用程序和资源之间构建一个编排层。这可以是无服务器函数（例如，使用 AWS Lambda 或 Google Cloud Functions），它可以使用所需的 API 密钥或密钥转发请求。API 使用者无法像应用程序代码中的 Secret 那样访问服务器端代码中的 Secret。

**对于持久用户数据，请根据其敏感度选择正确的存储类型。** 在使用您的应用时，您通常会发现需要在设备上保存数据，无论是支持您的应用离线使用、减少网络请求，还是在会话之间保存用户的访问令牌，这样他们就不必在每次使用应用时都重新进行身份验证。

**持久化与非持久化** — 持久化数据将写入设备的磁盘，这样您的应用程序就可以在应用程序启动期间读取数据，而无需执行其他网络请求来获取数据或要求用户重新输入数据。但这也可能会使该数据更容易被攻击者访问。未持久化的数据永远不会写入磁盘，因此没有数据可访问！

**请注意无意中存储或暴露敏感信息。** 这可能是意外发生的，例如将敏感的表单数据保存在 redux state 中，并将整个 state tree 持久化在 Async Storage 中。或者将用户令牌和个人信息发送到应用程序监控服务，例如 Sentry 或 Crashlytics。



#### 异步存储

[Async Storage](https://github.com/react-native-async-storage/async-storage) 是一个社区维护的 React Native 模块，它提供了一个异步的、未加密的键值存储。异步存储不在应用程序之间共享：每个应用程序都有自己的沙盒环境，并且无法访问来自其他应用程序的数据。

Async Storage 是 React Native 等价于 Web 上的 Local Storage。

| 在以下情况下使用异步存储       | 不要将异步存储用于 |
| ------------------------------ | ------------------ |
| 在应用程序运行中保留非敏感数据 | Token 令牌存储     |
| 持久化 Redux state             | Secrets 秘钥       |
| 持久化 GraphQL 状态            |                    |
| 存储全局应用程序范围的变量     |                    |



#### 安全存储

React Native 没有捆绑任何存储敏感数据的方式。但是，有适用于 Android 和 iOS 平台的现有解决方案。



####  iOS - 钥匙串服务

[Keychain Services](https://developer.apple.com/documentation/security/keychain_services) 允许您安全地为用户存储小块敏感信息。这是存储证书、令牌、密码和不属于 Async Storage 的任何其他敏感信息的理想位置。



#### Android - 安全共享首选项

[Shared Preferences](https://developer.android.com/reference/android/content/SharedPreferences) 是 Android 中持久性键值数据存储的等效项。 **默认情况下，共享首选项中的数据不加密** ，但[加密的共享首选项](https://developer.android.com/topic/security/data)包装了 Android 的共享首选项类，并自动加密键和值。



#### Android - 密钥库

[Android 密钥库](https://developer.android.com/training/articles/keystore)系统允许您将加密密钥存储在容器中，使其更难从设备中提取。

为了使用 iOS Keychain 服务或 Android Secure Shared Preferences，您可以自己编写一个桥，也可以使用一个库来包装它们并提供统一的 API，风险自负。需要考虑的一些库：

* [expo-secure-store （expo-secure-store）](https://docs.expo.dev/versions/latest/sdk/securestore/)
* [react-native-keychain](https://github.com/oblador/react-native-keychain)



### 身份验证和深度链接

移动应用程序有一个在 Web 中不存在的独特漏洞： **深度链接** 。深度链接是一种将数据从外部源直接发送到本机应用程序的方法。深度链接看起来像 `app://` 其中 `app` 是你的应用程序方案，并且 // 后面的任何内容都可以在内部用于处理请求。

例如，如果您正在构建一个电子商务应用程序，则可以使用 `app://products/1` 深度链接到您的应用程序，并打开 ID 为 1 的商品的商品详情页面。您可以将这些 URL 视为 Web 上的 URL，但有一个关键的区别：深度链接不安全，您永远不应该在其中发送任何敏感信息。

深度链接不安全的原因是没有注册 URL 方案的集中方法。作为应用程序开发人员，您几乎可以使用您选择的任何 url 方案，只需[在 Xcode for iOS 中配置它](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app)或在 [Android 上添加 intent](https://developer.android.com/training/app-links/deep-linking)。

没有什么可以阻止恶意应用程序通过注册到同一方案，然后获得对链接包含的数据的访问权限来劫持您的深度链接。发送 `app://products/1` 之类的内容无害，但发送令牌是一个安全问题。

当作系统在打开链接时有两个或多个应用程序可供选择时，Android 将向用户显示[一个消除歧义对话框 ](https://developer.android.com/training/basics/intents/sending#disambiguation-dialog)，并要求他们选择使用哪个应用程序来打开链接。但是，在 iOS 上，操作系统将为您做出选择，因此用户将毫无察觉。Apple 已在更高的 iOS 版本 （iOS 11） 中采取措施解决此问题，他们制定了先到先得的原则，尽管此漏洞仍可能以不同的方式被利用，您可以[在此处](https://thehackernews.com/2019/07/ios-custom-url-scheme.html)阅读更多信息。使用[通用链接](https://developer.apple.com/ios/universal-links/)将允许在 iOS 中安全地链接到您应用程序中的内容。



#### OAuth2 和重定向

OAuth2 身份验证协议现在非常流行，被誉为最完整、最安全的协议。OpenID Connect 协议也基于此。在 OAuth2 中，系统会要求用户通过第三方进行身份验证。成功完成后，该第三方使用验证码重定向回请求应用程序，该验证码可以兑换成 JWT（[ 一种 JSON Web 令牌 ](https://jwt.io/introduction/)）。JWT 是一种开放标准，用于在 Web 上的各方之间安全地传输信息。

在 Web 上，此重定向步骤是安全的，因为 Web 上的 URL 保证是唯一的。对于应用程序来说，情况并非如此，因为如前所述，没有集中的注册 URL 方案的方法！为了解决此安全问题，必须以 PKCE 的形式添加额外的检查。

[PKCE](https://oauth.net/2/pkce/)，发音为“Pixy”，代表密钥代码交换证明，是 OAuth 2 规范的扩展。这涉及添加额外的安全层，以验证身份验证和令牌交换请求是否来自同一客户端。PKCE 使用 [SHA 256](https://www.movable-type.co.uk/scripts/sha256.html) 加密哈希算法。SHA 256 为任何大小的文本或文件创建唯一的“签名”，但它是：

* 无论输入文件如何，长度始终相同
* 保证对相同的输入始终产生相同的结果
* 一种方法（即，您不能对其进行逆向工程以显示原始输入）



现在你有两个值：

* **code_verifier** - 客户端生成的大型随机字符串
* **code_challenge** - code_verifier 的 SHA 256



在初始 `/authorize` 请求期间，客户端还会发送它保留在内存中的 `code_verifier` 的 `code_challenge`。正确返回 authorize 请求后，客户端还会发送用于生成 `code_challenge code_verifier`。然后，IDP 将计算 `code_challenge`，查看它是否与第一个 `/authorize` 请求中设置的内容匹配，并且仅在值匹配时发送访问令牌。

这保证了只有触发初始授权流程的应用程序才能成功地将验证码交换为 JWT。因此，即使恶意应用程序获得了验证码，它自己也将毫无用处。要查看实际效果，请查看[此示例 ](https://aaronparecki.com/oauth-2-simplified/#mobile-apps)。

要考虑用于本机 OAuth 的库是 [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth)。React-native-app-auth 是用于与 OAuth2 提供者通信的 SDK。它封装了本机 [AppAuth-iOS](https://github.com/openid/AppAuth-iOS) 和 [AppAuth-Android](https://github.com/openid/AppAuth-Android) 库，并且可以支持 PKCE。

注意：React-native-app-auth 只有在您的身份提供商支持 PKCE 时才能支持 PKCE。



## 资源

* 开源示例应用程序：https://github.com/ReactNativeNews/React-Native-Apps









## TODO 

手势响应系统：https://reactnative.dev/docs/gesture-responder-system

辅助访问：https://reactnative.dev/docs/accessibility



debugger：https://reactnative.dev/docs/debugging