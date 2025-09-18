# React

React 官网：https://react.dev/

React 中文文档：https://zh-hans.react.dev/



React 最新版本：v19.1

当前文档版本：v19.1

当前 Nodejs 版本：16.15.0



## JSX

 JSX 允许你在 JavaScript 中嵌入标签。

没有括号包裹的话，任何在 `return` 下一行的代码都将被忽略！

JSX 比 HTML 更加严格。你必须闭合标签，如 `<br />`。你的组件也不能返回多个 JSX 标签。你必须将它们包裹到一个共享的父级中，比如 `<div>...</div>` 或使用空的 `<>...</>` 包裹：

```react
function AboutPage() {
  return (
    <>
      <h1>关于</h1>
      <p>你好。<br />最近怎么样？</p>
    </>
  );
}
```



### 添加样式

在 React 中，你可以使用 `className` 来指定一个 CSS 的 class。它与 HTML 的 `class` 属性的工作方式相同：

```react
<img className="avatar" />
```

然后，你可以在一个单独的 CSS 文件中为它编写 CSS 规则：

```css
/* 在你的 CSS 文件中修改 */
.avatar {
  border-radius: 50%;
}
```



### 显示数据

大括号内的任何 JavaScript 表达式都能正常运行，包括函数调用。

`style={{}}` 并不是一个特殊的语法，而是 `style={ }` JSX 大括号内的一个普通 `{}` 对象。当你的样式依赖于 JavaScript 变量时，你可以使用 `style` 属性。

内联 `style` 属性使用驼峰命名法编写。

```react
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```



### 条件渲染

使用 `if` 语句根据条件引入 JSX：

```react
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

如果不想有任何东西进行渲染，可以直接返回 `null`。



三元表达式方式：

```react
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```



逻辑 `&&` 方式：

```react
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

**切勿将数字放在 `&&` 左侧.**

JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 `0`，整个表达式将变成左侧的值（`0`），React 此时则会渲染 `0` 而不是不进行渲染。



### 渲染列表

在你的组件中，使用 `map()` 函数将数组转换为 `<li>` 标签构成的列表。

注意， `<li>` 有一个 `key` 属性。对于列表中的每一个元素，你都应该传递一个字符串或者数字给 `key`，用于在其兄弟节点中唯一标识该元素。

```react
const products = [
  { title: '卷心菜', isFruit: false, id: 1 },
  { title: '大蒜', isFruit: false, id: 2 },
  { title: '苹果', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```



如果你想让每个列表项都输出多个 DOM 节点而非一个的话，该怎么做呢？

Fragment 语法的简写形式 `<> </>` 无法接受 key 值，所以你只能要么把生成的节点用一个 `<div>` 标签包裹起来，要么使用长一点但更明确的 `<Fragment>` 写法：

```react
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

这里的 Fragment 标签本身并不会出现在 DOM 上，这串代码最终会转换成 `<h1>`、`<p>`、`<h1>`、`<p>`…… 的列表。



### 响应事件

你可以通过在组件中声明 **事件处理** 函数来响应事件。

注意，`onClick={handleClick}` 的结尾没有小括号！不要 **调用** 事件处理函数：你只需 **把函数传递给事件** 即可。当用户点击按钮时 React 会调用你传递的事件处理函数。

```react
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}
```



### 更新界面 useState

```react
// 从 React 引入 useState
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>独立更新的计数器</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  // 声明一个 state 变量
  // 你可以给它们起任何名字，但按照惯例会像 [something, setSomething] 这样为它们命名。
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      点了 {count} 次
    </button>
  );
}
```



### 使用 Hook

以 `use` 开头的函数被称为 **Hook**。`useState` 是 React 提供的一个内置 Hook。

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 **顶层** 调用 Hook。如果你想在一个条件或循环中使用 `useState`，请提取一个新的组件并在组件内部使用它。



### 组件间共享数据 prop

可以使用 **prop** 方式传递的信息。

你不能改变 props。当你需要交互性时，你可以设置 state。

```react
import { useState } from 'react';

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      点了 {count} 次
    </button>
  );
}

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>共同更新的计数器</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```





## 组件

**React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数**。

React 应用程序是由 **组件** 组成的。一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

**React 组件必须以大写字母开头**，而 HTML 标签则必须是小写字母。

React 组件是返回标签的 JavaScript 函数：

```react
function MyButton() {
  return (
    <button>
      我是一个按钮
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>欢迎来到我的应用</h1>
      <MyButton />
    </div>
  );
}
```







## 全栈框架

### Next.js

Next.js 的 App Router 是一个 React 框架，充分利用了 React 的架构，支持全栈 React 应用。

```sh
npx create-next-app@latest
```



https://github.com/vercel/next.js



### React Router

React Router 是 React 最流行的路由库，可以与 Vite 结合创建一个全栈 React 框架。它强调标准的 Web API 并提供了多个 可部署的模板 适用于各种 JavaScript 运行时和平台。

文档：https://github.com/remix-run/react-router

模板：https://github.com/remix-run/react-router-templates



```sh
# 默认模板：功能齐全的生产就绪模板，具有服务器端渲染、TypeScript、TailwindCSS 和 Docker 支持。非常适合构建具有内置资产优化和热模块更换功能的可扩展应用程序。
npx create-react-router@latest

# 默认模板的无 TypeScript 版本，提供相同的生产就绪功能，但无需类型检查。
npx create-react-router@latest --template remix-run/react-router-templates/javascript
```



### Remix

https://github.com/remix-run/remix



### Expo

Expo 是一个 React 框架，让你可以创建支持真正原生 UI 的通用 Android、iOS 和 Web 应用。它为 React Native 提供了一个 SDK，让原生部分更易于使用。

```sh
npx create-expo-app@latest
```



https://github.com/expo/expo



## React 开发者工具

使用 React 开发者工具检查 React components，编辑 props 和 state，并识别性能问题。

- [安装 **Chrome** 扩展](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)



## 组件库

### Chakra UI

https://chakra-ui.com/



### Material UI

https://mui.com/material-ui/

pro版本收费



## TODO

https://zh-hans.react.dev/learn/adding-interactivity

















