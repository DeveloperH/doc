# 导航 @react-navigation

React Navigation 提供了一个简单的导航解决方案，能够在 Android 和 iOS 上呈现常见的堆栈导航和选项卡式导航模式。

它是一个独立的库，它允许开发人员使用几行代码设置应用程序的屏幕。

文档：https://github.com/react-navigation/react-navigation



版本说明：

```json
"dependencies": {
  "@react-navigation/material-bottom-tabs": "^6.2.29",
  "@react-navigation/native": "^7.1.9",
  "@react-navigation/stack": "^7.3.2",
  "react": "19.0.0",
  "react-native": "0.79.2",
  "react-native-safe-area-context": "^5.4.0",
  "react-native-screens": "^4.10.0",
  "react-native-webview": "^13.13.5",
  "react-redux": "^9.2.0",
  "redux-saga": "^1.1.3"
}
```



## @react-navigation/native

React Native 不像 Web 浏览器那样具有全局历史堆栈的内置概念——这就是 React Navigation 的用武之地。

React Navigation 的原生堆栈导航器为您的应用程序提供了一种在屏幕之间转换和管理导航历史记录的方法。如果您的应用程序只使用一个堆栈导航器，则它在概念上类似于 Web 浏览器处理导航状态的方式 - 当用户与导航堆栈交互时，您的应用程序会从导航堆栈中推送和弹出项，这会导致用户看到不同的屏幕。这在 Web 浏览器和 React Navigation 中的工作方式之间的一个关键区别在于，React Navigation 的原生堆栈导航器提供了你在 Android 和 iOS 上在堆栈中的路由之间导航时所期望的手势和动画。



### 安装依赖

```sh
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context -S
```



### 动态配置路由

需要将您的应用程序包装在 `NavigationContainer` 中。通常，会在 `index.js` 或 `App.js` 文件中进行操作。

在典型的 React Native 应用程序中，`NavigationContainer` 应该只在你的应用程序的根目录中使用一次。除非你有特定的用例，否则不应嵌套多个 `NavigationContainer`。

```react
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
    </NavigationContainer>
  );
};

export default App;
```



## @react-navigation/native-stack

到目前为止，我们安装的库是导航器的构建块和共享基础，React Navigation 中的每个导航器都位于自己的库中。要使用原生堆栈导航器，我们需要安装 `@react-navigation/native-stack` ：

```sh
npm install @react-navigation/native-stack
```

注意：`@react-navigation/native-stack` 依赖于 `react-native-screens` 和前面安装的其他库。



### 创建原生堆栈导航器（动态）

`createNativeStackNavigator` 是一个函数，它返回一个包含 2 个属性的对象：`Screen` 和 `Navigator`。它们都是用于配置 navigator 的 React 组件。`Navigator` 应包含 `Screen` 元素作为其子元素，以定义路由的配置。

`NavigationContainer` 是一个组件，用于管理我们的导航树并包含导航状态。此组件必须包装应用程序中的所有导航器。通常，我们会在应用程序的根目录下渲染这个组件，通常是从 `App.js` 导出的组件。

```react
// App.js

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
```



可以使用 `Screen` 组件指定路由。`Screen` 组件接受一个 `name` prop，它对应于我们将用于导航的路线的名称，以及一个 `component` prop，它对应于它将要渲染的组件。

当使用动态 API 时，`component` prop 接受一个组件，而不是一个 render 函数。不要传递内联函数（例如 `component={() => <HomeScreen />}` ），否则当父组件重新渲染时，你的组件将卸载并重新挂载，失去所有状态。



路由名称的大小写无关紧要，可以使用小写的 `home` 或大写的 `Home`，推荐路由名称大写。

React Native 的快速刷新不会更新 `initialRouteName` 的更改，需要重新加载应用程序。



### options

导航器中的每个屏幕都可以为导航器指定一些选项，例如设置标题。

任何自定义选项都可以在每个 screen 组件的 `options` prop 中传递。

有时我们希望为导航器中的所有屏幕指定相同的选项。为此，我们可以将 `screenOptions` 属性传递给导航器。

```react
<Stack.Navigator
  initialRouteName="Home"
  screenOptions={{
    headerStyle: { backgroundColor: 'tomato' },
  }}
>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ title: 'Overview' }}
  />
  <Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>
```



有时我们可能想要将额外的 props 传递给 screen。我们可以通过 2 种方法来实现：

* 使用 [React context](https://react.dev/reference/react/useContext) 并使用上下文提供程序包装导航器以将数据传递到屏幕（推荐）。

* 对屏幕使用 render 回调，而不是指定 `component` prop：

  ```react
  <Stack.Screen name="Home">
    {(props) => <HomeScreen {...props} extraData={someData} />}
  </Stack.Screen>
  ```

  

默认情况下，React Navigation 对屏幕组件进行优化，以防止不必要的渲染。使用 render 回调会删除这些优化。因此，如果你使用渲染回调，则需要确保对屏幕组件使用 [`React.memo`](https://react.dev/reference/react/memo) 或 [`React.PureComponent`](https://react.dev/reference/react/PureComponent)，以避免性能问题。



### navigation

使用可在 screen 组件中访问的 `navigation` 对象进行路由跳转。`navigation` 对象可用于所有带有  `useNavigation` 钩子的屏幕组件。

如果我们使用尚未在 navigator 中定义的路由名称调用 `navigation.navigate `，它将在开发版本中打印错误，并且在生产版本中不会发生任何事情。

```react
import * as React from 'react';
import { View, Text } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Details')}>
        Go to Details
      </Button>
    </View>
  );
}

// ... other code
```



* `navigate(routeName, params)` ：跳转到指定路由。如果已在指定路由，则什么也不做。
* `push(routeName, params)` ：跳转到指定路由。
* `goBack()` ：返回上一个路由。
* `popTo(routeName, params)` ：返回到指定路由，并关闭其他路由。
* `popToTop()` ：返回到堆栈中的第一个路由。



### 跳转时传递参数

1. 通过将参数作为 `navigation.navigate` 函数的第二个参数放入对象中，将参数传递给路由： `navigation.navigate('RouteName', { /* params go here */ })`
2. 读取 screen 组件中的 params：`route.params`。



建议传递的参数是 JSON 可序列化的。这样，您将能够使用 state 持久化 ，并且您的 Screen 组件将具有实现深度链接的正确契约。

Params 应包含显示屏幕所需的最少数据，例如 id、分页、排序方式。



```react
function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {
          /* 1. 跳转时传递参数 */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      >
        Go to Details
      </Button>
    </View>
  );
}

function DetailsScreen({ route }) {
  const navigation = useNavigation();

  /* 2. 获取参数 */
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        onPress={
          () =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
        }
      >
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  );
}
```



#### initialParams 初始参数

您还可以将一些初始参数传递给 screen。如果您在导航到此屏幕时未指定任何参数，则将使用初始参数。它们也与您传递的任何 params 进行浅层合并。初始参数可以在 `initialParams` 中指定：

```react
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```



#### 更新参数

Screen 还可以更新它们的 params，就像它们可以更新它们的 state 一样。`navigation.setParams` 方法允许您更新屏幕的参数。

```js
navigation.setParams({
  itemId: Math.floor(Math.random() * 100),
})
```

`setParams` 方法将新参数与现有参数合并。要替换现有参数，您可以改用 [`replaceParams`](https://reactnavigation.org/docs/navigation-object#replaceparams)。

注意：避免使用 `setParams` 或 `replaceParams` 来更新屏幕选项，例如标题等。如果需要更新选项，请改用 [`setOptions`](https://reactnavigation.org/docs/navigation-object#setoptions)。



#### 将 params 传递给上一个屏幕

Params 不仅可用于将一些数据传递到新屏幕，而且还可用于将数据传递到以前的屏幕。

为此，您可以使用 `popTo` 方法返回到上一个屏幕，并将 params 传递给它：

```js
navigation.popTo('Home', { post: 123 });
```



#### 将 params 传递给嵌套屏幕

如果您有嵌套的 navigators，则需要以不同的方式传递 params。例如，假设您在 `More` 屏幕中有一个导航器，并且希望将参数传递给该导航器内的 `Settings` 屏幕。然后，您可以按如下方式传递 params：

```js
navigation.navigate('More', {
  screen: 'Settings',
  params: { user: 'jane' },
})
```







# react-native-navigation

如果你正在将 React Native 集成到已经原生管理导航的应用程序中，或者正在寻找 React Navigation 的替代方案，以下库在两个平台上都提供了原生导航：[react-native-navigation](https://github.com/wix/react-native-navigation)。









