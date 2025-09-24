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

按照惯例，通常将事件处理程序命名为 `handle`，后接事件名。你会经常看到 `onClick={handleClick}`，`onMouseEnter={handleMouseEnter}` 等。

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



也可以在 JSX 中定义一个内联的事件处理函数，或者直接使用更为简洁箭头函数。

```react
<button onClick={function handleClick() {
  alert('你点击了我！');
}}>

<button onClick={() => {
  alert('你点击了我！');
}}>
```



### 事件传播

事件处理函数还将捕获任何来自子组件的事件。通常，我们会说事件会沿着树向上“冒泡”或“传播”：它从事件发生的地方开始，然后沿着树向上传播。

在 React 中所有事件都会传播，除了 `onScroll`，它仅适用于你附加到的 JSX 标签。

```react
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <button onClick={() => alert('正在播放！')}>
        播放电影
      </button>
      <button onClick={() => alert('正在上传！')}>
        上传图片
      </button>
    </div>
  );
}
```



#### 阻止传播

事件处理函数接收一个 **事件对象** 作为唯一的参数。按照惯例，它通常被称为 `e` ，代表 “event”（事件）。你可以使用此对象来读取有关事件的信息。

这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 `Button` 组件那样调用 `e.stopPropagation()` ：

```react
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
```



#### 捕获阶段事件

极少数情况下，你可能需要捕获子元素上的所有事件，**即便它们阻止了传播**。例如，你可能想对每次点击进行埋点记录，传播逻辑暂且不论。那么你可以通过在事件名称末尾添加 `Capture` 来实现这一点：

```react
<div onClickCapture={() => { /* 这会首先执行 */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

每个事件分三个阶段传播：

1. 它向下传播，调用所有的 `onClickCapture` 处理函数。
2. 它执行被点击元素的 `onClick` 处理函数。
3. 它向上传播，调用所有的 `onClick` 处理函数。

捕获事件对于路由或数据分析之类的代码很有用，但你可能不会在应用程序代码中使用它们。



#### 阻止默认行为

可以调用事件对象中的 `e.preventDefault()` 来阻止这种情况发生：

```react
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
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



## state

### useState

useState Hook 提供了两个功能：

1. **State 变量** 用于保存渲染间的数据。
2. **State setter 函数** 更新变量并触发 React 再次渲染组件。



```react
// 从 React 引入 useState
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <MyButton />
    </div>
  );
}

function MyButton() {
  // 声明一个 state 变量
  // 你可以给它们起任何名字，但按照惯例会像 [something, setSomething] 这样为它们命名。
  // 通过数组解构获取 useState 返回的数组。
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



在 React 中，`useState` 以及任何其他以“`use`”开头的函数都被称为 **Hook**。Hook 是特殊的函数，只在 React 渲染时有效。

**Hooks ——以 use 开头的函数——只能在组件或自定义 Hook 的最顶层调用。**你不能在条件语句、循环语句或其他嵌套函数内调用 Hook。



### state 如同一张快照

与普通 JavaScript 变量不同，React 状态的行为更像一个快照。设置它并不改变你已有的状态变量，而是触发一次重新渲染。

**React 会等到事件处理函数中的** 所有 **代码都运行完毕再处理你的 state 更新。**这也意味着只有在你的事件处理函数及其中任何代码执行完成 **之后**，UI 才会更新。这种特性也就是 **批处理**，它会使你的 React 应用运行得更快。

**一个 state 变量的值永远不会在一次渲染的内部发生变化，** 即使其事件处理函数的代码是异步的。在 **那次渲染的** `onClick` 内部，`number` 的值即使在调用 `setNumber(number + 5)` 之后也还是 `0`。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。

**React 会使 state 的值始终“固定”在一次渲染的各个事件处理函数内部**。你无需担心代码运行时 state 是否发生了变化。

```react
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```



如果你想在下次渲染之前多次更新同一个 state，你可以像 `setNumber(n => n + 1)` 这样传入一个根据队列中的前一个 state 计算下一个 state 的 **函数**，而不是像 `setNumber(number + 1)` 这样传入 **下一个 state 值**。这是一种告诉 React “用 state 值做某事”而不是仅仅替换它的方法。

在这里，`n => n + 1` 被称为 **更新函数**。当你将它传递给一个 state 设置函数时：

1. React 会将此函数加入队列，以便在事件处理函数中的所有其他代码运行后进行处理。
2. 在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state。

```react
setNumber(n => n + 1);
```

事件处理函数执行完成后，React 将触发重新渲染。在重新渲染期间，React 将处理队列。更新函数会在渲染期间执行，因此 更新函数必须是纯函数并且只返回结果。不要尝试从它们内部设置 state 或者执行其他副作用。



总结：

- 设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染。
- React 会在事件处理函数执行完成之后处理 state 更新。这被称为批处理。
- 要在一个事件中多次更新某些 state，你可以使用 `setNumber(n => n + 1)` 更新函数。



### 不要在 state 中镜像 props

这里，一个 `color` state 变量被初始化为 `messageColor` 的 prop 值。这段代码的问题在于，**如果父组件稍后传递不同的 `messageColor` 值（例如，将其从 `'blue'` 更改为 `'red'`），则 `color`** state 变量**将不会更新！** state 仅在第一次渲染期间初始化。

```react
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
}  
```



这就是为什么在 state 变量中，“镜像”一些 prop 属性会导致混淆的原因。相反，你要在代码中直接使用 `messageColor` 属性。如果你想给它起一个更短的名称，请使用常量。

这种写法就不会与从父组件传递的属性失去同步。

```react
function Message({ messageColor }) {
  const color = messageColor;
}  
```



只有当你 **想要** 忽略特定 props 属性的所有更新时，将 props “镜像”到 state 才有意义。按照惯例，prop 名称以 `initial` 或 `default` 开头，以阐明该 prop 的新值将被忽略：

```react
function Message({ initialColor }) {
  // 这个 `color` state 变量用于保存 `initialColor` 的 **初始值**。
  // 对于 `initialColor` 属性的进一步更改将被忽略。
  const [color, setColor] = useState(initialColor);
}
```



### 更新 state 中的对象

state 中可以保存任意类型的 JavaScript 值，包括对象。但是，你不应该直接修改存放在 React state 中的对象。相反，当你想要更新一个对象时，你需要创建一个新的对象（或者将其拷贝一份），然后将 state 更新为此对象。

换句话说，你应该 **把所有存放在 state 中的 JavaScript 对象都视为只读的**。

```react
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```



#### ... 展开语法

你可以使用 `...` 对象展开 语法，这样你就不需要单独复制每个属性。

```react
setPerson({
  firstName: e.target.value, // 从 input 中获取新的 first name
  lastName: person.lastName,
  email: person.email
});


// ... 展开语法
setPerson({
  ...person, // 复制上一个 person 中的所有字段
  firstName: e.target.value // 但是覆盖 firstName 字段 
});
```



#### 动态命名

你也可以在对象的定义中使用 `[` 和 `]` 括号来实现属性的动态命名。下面是同一个例子，但它使用了一个事件处理函数而不是三个：

```react
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      // 在这里，e.target.name 引用了 <input> 这个 DOM 元素的 name 属性。
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```



#### 更新一个嵌套对象

```react
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});

// 方式1
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);

// 方式2
setPerson({
  ...person, // 复制其它字段的数据 
  artwork: { // 替换 artwork 字段 
    ...person.artwork, // 复制之前 person.artwork 中的数据
    city: 'New Delhi' // 但是将 city 的值替换为 New Delhi！
  }
});
```



#### 使用 Immer 编写简洁的更新逻辑

[Immer](https://github.com/immerjs/use-immer) 是一个非常流行的库，它可以让你使用简便但可以直接修改的语法编写代码，并会帮你处理好复制的过程。通过使用 Immer，你写出的代码看起来就像是你“打破了规则”而直接修改了对象。

但是不同于一般的 mutation，它并不会覆盖之前的 state！

```react
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

由 Immer 提供的 `draft` 是一种特殊类型的对象，被称为 `Proxy`，它会记录你用它所进行的操作。这就是你能够随心所欲地直接修改对象的原因所在！从原理上说，Immer 会弄清楚 `draft` 对象的哪些部分被改变了，并会依照你的修改创建出一个全新的对象。





使用 Immer:

1. 运行 `npm install use-immer` 添加 Immer 依赖
2. 用 `import { useImmer } from 'use-immer'` 替换掉 `import { useState } from 'react'`



你可以随意在一个组件中同时使用 `useState` 和 `useImmer`。如果你想要写出更简洁的更新处理函数，Immer 会是一个不错的选择，尤其是当你的 state 中有嵌套，并且复制对象会带来重复的代码时。

```react
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```



### 更新 state 中的数组

同对象一样，当你想要更新存储于 state 中的数组时，你需要创建一个新的数组（或者创建一份已有数组的拷贝值），并使用新数组设置 state。

这意味着你不应该使用类似于 `arr[0] = 'bird'` 这样的方式来重新分配数组中的元素，也不应该使用会直接修改原始数组的方法，例如 `push()` 和 `pop()`。

相反，每次要更新一个数组时，你需要把一个**新**的数组传入 state 的 setting 方法中。为此，你可以通过使用像 `filter()` 和 `map()` 这样不会直接修改原始值的方法，从原始数组生成一个新的数组。然后你就可以将 state 设置为这个新生成的数组。



#### 向数组中添加元素

最简单的一种就是使用 `...` 数组展开 语法：

```react
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>添加</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```



#### 从数组中删除元素 

从数组中删除一个元素最简单的方法就是将它**过滤出去**。换句话说，你需要生成一个不包含该元素的新数组。这可以通过 `filter` 方法实现，例如：

```react
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```



#### 替换数组中的元素

想要替换数组中一个或多个元素是非常常见的。类似 `arr[0] = 'bird'` 这样的赋值语句会直接修改原始数组，所以在这种情况下，你也应该使用 `map`。

要替换一个元素，请使用 `map` 创建一个新数组。在你的 `map` 回调里，第二个参数是元素的索引。使用索引来判断最终是返回原始的元素（即回调的第一个参数）还是替换成其他值：

```react
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // 递增被点击的计数器数值
        return c + 1;
      } else {
        // 其余部分不发生变化
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
```



#### 使用 Immer 编写简洁的更新逻辑

```react
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```



### 对 state 进行保留和重置

各个组件的 state 是各自独立的。根据组件在 UI 树中的位置，React 可以跟踪哪些 state 属于哪个组件。你可以控制在重新渲染过程中何时对 state 进行保留和重置。

**只要一个组件还被渲染在 UI 树的相同位置，React 就会保留它的 state。** 如果它被移除，或者一个不同的组件被渲染在相同的位置，那么 React 就会丢掉它的 state。

记住 **对 React 来说重要的是组件在 UI 树中的位置,而不是在 JSX 中的位置！**



总结：

* 只要在相同位置渲染的是相同组件， React 就会保留状态。
* state 不会被保存在 JSX 标签里。它与你在树中放置该 JSX 的位置相关联。
* 你可以通过为一个子树指定一个不同的 key 来重置它的 state。
* 不要嵌套组件的定义，否则你会意外地导致 state 被重置。



## reducer

对于拥有许多状态更新逻辑的组件来说，过于分散的事件处理程序可能会令人不知所措。对于这种情况，你可以将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 **reducer**。

使用 reducer 管理状态与直接设置状态略有不同。它不是通过设置状态来告诉 React “要做什么”，而是通过事件处理程序 dispatch 一个 “action” 来指明 “用户刚刚做了什么”。

传递给 dispatch 的对象叫做 “action”。action 对象可以有多种结构。按照惯例，我们通常会添加一个字符串类型的 type 字段来描述发生了什么，并通过其它字段传递额外的信息。



React 会将状态设置为你从 reducer 返回的状态。

在这个例子中，要将状态设置逻辑从事件处理程序移到 reducer 函数中，你需要：

1. 声明当前状态（`tasks`）作为第一个参数；
2. 声明 `action` 对象作为第二个参数；
3. 从 `reducer` 返回 **下一个** 状态（React 会将旧的状态设置为这个最新的状态）。

由于 `reducer` 函数接受 state（`tasks`）作为参数，因此你可以 **在组件之外声明它**。这减少了代码的缩进级别，提升了代码的可读性。



`useReducer` 和 `useState` 很相似——你必须给它传递一个初始状态，它会返回一个有状态的值和一个设置该状态的函数（在这个例子中就是 dispatch 函数）。但是，它们两个之间还是有点差异的。

`useReducer` 钩子接受 2 个参数：

1. 一个 reducer 函数
2. 一个初始的 state

它返回如下内容：

1. 一个有状态的值
2. 一个 dispatch 函数（用来 “派发” 用户操作给 reducer）



```react
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    // action 对象
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  // 使用 switch 语句 是一种惯例
  // 我们建议将每个 case 块包装到 { 和 } 花括号中，这样在不同 case 中声明的变量就不会互相冲突。此外，case 通常应该以 return 结尾。
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false}
];
```



编写 `reducer` 时最好牢记以下两点：

- **reducer 必须是纯粹的。** 这一点和 状态更新函数 是相似的，`reducer` 是在渲染时运行的！（actions 会排队直到下一次渲染)。 这就意味着 `reducer` 必须纯净，即当输入相同时，输出也是相同的。它们不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）。它们应该以不可变值的方式去更新对象和数组。
- **每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。** 举个例子，如果用户在一个由 `reducer` 管理的表单（包含五个表单项）中点击了 `重置按钮`，那么 dispatch 一个 `reset_form` 的 action 比 dispatch 五个单独的 `set_field` 的 action 更加合理。



### 使用 Immer 简化 reducer

```react
import { useImmerReducer } from 'use-always';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
```



## Context

通常来说，你会通过 props 将信息从父组件传递到子组件。但是，如果你必须通过许多中间组件向下传递 props，或是在你应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。**Context** 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递。

可以通过以下三个步骤来实现它：

1. **创建** 一个 context。（你可以将其命名为 `LevelContext`, 因为它表示的是标题级别。）
2. 在需要数据的组件内 **使用** 刚刚创建的 context。（`Heading` 将会使用 `LevelContext`。）
3. 在指定数据的组件中 **提供** 这个 context。（`Section` 将会提供 `LevelContext`。）



```react
// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>主标题</Heading>
      <Section level={2}>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Section level={3}>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Section level={4}>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```react
// Section.js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      // 提供 context，如果你不提供 context，React 会使用你在上一步指定的默认值。
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```react
// Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}
```

```react
// LevelContext.js
import { createContext } from 'react';

// createContext 只需默认值这么一个参数
export const LevelContext = createContext(1);
```



### 在相同的组件中使用并提供 context 

由于 context 让你可以从上层的组件读取信息，每个 `Section` 都会从上层的 `Section` 读取 `level`，并自动向下层传递 `level + 1`。

```react
// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>主标题</Heading>
      <Section>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Section>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Section>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```react
// Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```



### 结合使用 reducer 和 context

Reducer 可以整合组件的状态更新逻辑。Context 可以将信息深入传递给其他组件。你可以组合使用它们来共同管理一个复杂页面的状态。

像 `useTasks` 和 `useTasksDispatch` 这样的函数被称为 **自定义 Hook** 。如果你的函数名以 `use` 开头，它就被认为是一个自定义 Hook。这让你可以使用其他 Hook，比如 `useContext`。

```react
// App.js
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

```react
// TasksContext.js
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```react
// AddTask.js
import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;
```

```react
// TaskList.js
import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
```



## ref



### 使用 ref 引用值

当你希望组件“记住”某些信息，但又不想让这些信息触发新的渲染时，你可以使用 ref 。

你可以用 `ref.current` 属性访问该 ref 的当前值。这个值是有意被设置为可变的，意味着你既可以读取它也可以写入它。

这里的 ref 指向一个数字，但是，像 state 一样，你可以让它指向任何东西：字符串、对象，甚至是函数。与 state 不同的是，ref 是一个普通的 JavaScript 对象，具有可以被读取和修改的 `current` 属性。

请注意，**组件不会在每次递增时重新渲染。** 与 state 一样，React 会在每次重新渲染之间保留 ref。但是，设置 state 会重新渲染组件，更改 ref 不会！

```react
import { useRef } from 'react';

const ref = useRef(0);

// useRef 返回一个这样的对象:
{ 
  current: 0 // 你向 useRef 传入的值
}

// 操作 ref
ref.current = ref.current + 1;
```



### 使用 ref 操作 DOM

`useRef` Hook 返回一个对象，该对象有一个名为 `current` 的属性。最初，`myRef.current` 是 `null`。当 React 为这个 `<div>` 创建一个 DOM 节点时，React 会把对该节点的引用放入 `myRef.current`。

```react
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
    	// 将 ref 作为 ref 属性值传递给想要获取的 DOM 节点的 JSX 标签：
      <input ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```



注意的是：避免更改由 React 管理的 DOM 节点。如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分。



### 访问另一个组件的 DOM 节点

Ref 是一个脱围机制。手动操作 **其它** 组件的 DOM 节点可能会让代码变得脆弱。

你可以 像其它 prop 一样 将 ref 从父组件传递给子组件。

```react
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```

在 `MyForm` 中创建的 `inputRef` 现在指向 `MyInput` 返回的 `<input>` DOM 元素。在 `MyForm` 中创建的点击处理程序可以访问 `inputRef` 并且调用 `focus()` 来将焦点设置在 `<input>` 上。



### 使用命令句柄暴露一部分 API

在上面的例子中，`MyInput` 暴露了原始的 DOM 元素 input。这让父组件可以对其调用`focus()`。然而，这也让父组件能够做其他事情 —— 例如，改变其 CSS 样式。在一些不常见的情况下，你可能希望限制暴露的功能。你可以用 `useImperativeHandle` 来做到这一点：

```react
import { useRef, useImperativeHandle } from "react";

function MyInput({ ref }) {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // 只暴露 focus，没有别的
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input ref={realInputRef} />;
};

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>聚焦输入框</button>
    </>
  );
}
```

这里，`MyInput` 中的 `realInputRef` 保存了实际的 input DOM 节点。 但是，`useImperativeHandle` 指示 React 将你自己指定的对象作为父组件的 ref 值。 所以 `Form` 组件内的 `inputRef.current` 将只有 `focus` 方法。在这种情况下，ref “句柄”不是 DOM 节点，而是你在 `useImperativeHandle` 调用中创建的自定义对象。



### 用 flushSync 同步更新 state

在 React 中，state 更新是排队进行的。你可以强制 React 同步更新（“刷新”）DOM。 为此，从 `react-dom` 导入 `flushSync` 并**将 state 更新包裹** 到 `flushSync` 调用中：

```react
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    
    // 这将指示 React 当封装在 flushSync 中的代码执行后，立即同步更新 DOM。
    flushSync(() => {
      setText('');
      setTodos([ ...todos, newTodo]);
    });
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        添加
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: '待办 #' + (i + 1)
  });
}
```



### 使用 ref 回调管理 ref 列表

在上面的例子中，ref 的数量是预先确定的。但有时候，你可能需要为列表中的每一项都绑定 ref ，而你又不知道会有多少项。像下面这样做**是行不通的**：

```react
<ul>
  {items.map((item) => {
    // 行不通！
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```

这是因为 **Hook 只能在组件的顶层被调用**。不能在循环语句、条件语句或 `map()` 函数中调用 `useRef` 。



解决方案是**将函数传递给 `ref` 属性**。这称为 `ref` 回调。当需要设置 ref 时，React 将传入 DOM 节点来调用你的 ref 回调，并在需要清除它时传入 `null` 。这使你可以维护自己的数组或 Map，并通过其索引或某种类型的 ID 访问任何 ref。

```react
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[8])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                map.set(cat, node);

                return () => {
                  map.delete(cat);
                };
              }}
            >
              <img src={cat.imageUrl} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catCount = 10;
  const catList = new Array(catCount)
  for (let i = 0; i < catCount; i++) {
    let imageUrl = '';
    if (i < 5) {
      imageUrl = "https://placecats.com/neo/320/240";
    } else if (i < 8) {
      imageUrl = "https://placecats.com/millie/320/240";
    } else {
      imageUrl = "https://placecats.com/bella/320/240";
    }
    catList[i] = {
      id: i,
      imageUrl,
    };
  }
  return catList;
}
```



## Effect

有些组件需要与外部系统同步。例如，你可能希望根据 React state 控制非 React 组件、建立服务器连接或当组件在页面显示时发送分析日志。Effect 允许你在渲染结束后执行一些代码，以便将组件与 React 外部的某个系统相同步。

**Effect 允许你指定由渲染自身，而不是特定事件引起的副作用**。在聊天中发送消息是一个“事件”，因为它直接由用户点击特定按钮引起。然而，建立服务器连接是一个 Effect，因为无论哪种交互致使组件出现，它都应该发生。Effect 在提交（React 把更改提交到 DOM 上）结束后、页面更新后运行。此时是将 React 组件与外部系统（如网络或第三方库）同步的最佳时机。



### 声明 Effect

要编写一个 Effect, 请遵循以下三个步骤：

1. **声明 Effect**。通常 Effect 会在每次提交后运行。
2. **指定 Effect 依赖**。大多数 Effect 应该按需运行，而不是在每次渲染后都运行。
3. **必要时添加清理操作**。一些 Effect 需要指定如何停止、撤销，或者清除它们所执行的操作。例如，“连接”需要“断开”，“订阅”需要“退订”，而“获取数据”需要“取消”或者“忽略”。你将学习如何通过返回一个 **清理函数** 来实现这些。



每当你的组件渲染时，React 会先更新页面，然后再运行 `useEffect` 中的代码。换句话说，**`useEffect` 会“延迟”一段代码的运行，直到渲染结果反映在页面上**。

```react
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // 每次渲染后都会执行此处的代码
  });
  return <div />;
}
```



默认情况下，Effect 会在 **每次** 渲染后运行。**正因如此，以下代码会陷入死循环**：

```react
const [count, setCount] = useState(0);
useEffect(() => {
  // Effect 在渲染结束后运行。更新 state 会触发重新渲染。
  setCount(count + 1);
});
```



### 指定 Effect 的依赖项

默认情况下，Effect 会在 **每次** 渲染后运行。但往往 **这并不是你想要的**。

通过在调用 `useEffect` 时指定一个 **依赖数组** 作为第二个参数，你可以让 React **跳过不必要地重新运行 Effect**。

依赖数组可以包含多个依赖项。只有当你指定的 **所有** 依赖项的值都与上一次渲染时完全相同，React 才会跳过重新运行该 Effect。React 使用 `Object.is` 来比较依赖项的值。

**请注意，你不能随意“选择”依赖项**。如果你指定的依赖项与 React 根据 Effect 内部代码所推断出的依赖项不匹配，你将收到来自 linter 的错误提示。这有助于捕捉代码中的许多 bug。



```react
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('调用 video.play()');
      ref.current.play();
    } else {
      console.log('调用 video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]);
  // 指定 [isPlaying] 作为依赖数组会告诉 React：如果 isPlaying 与上次渲染时相同，就跳过重新运行 Effect。这样一来，输入框的输入不会触发 Effect 重新运行，只有按下播放/暂停按钮会触发。

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```



为什么依赖数组中可以省略 ref ? 

下面的 Effect 同时使用了 `ref` 与 `isPlaying` prop，但是只有 `isPlaying` 被声明为依赖项：

```react
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
```

这是因为 `ref` 具有 **稳定** 的标识：React 确保你在每轮渲染中调用同一个 `useRef` 时，总能获得相同的对象。ref 不会改变，所以它不会导致重新运行 Effect。因此，在依赖数组中它可有可无。把它加进去也可以。



没有依赖数组和使用空数组 `[]` 作为依赖数组，行为是不同的：

```react
useEffect(() => {
  // 这里的代码会在每次渲染后运行
});

useEffect(() => {
  // 这里的代码只会在组件挂载（首次出现）时运行
}, []);

useEffect(() => {
  // 这里的代码不但会在组件挂载时运行，而且当 a 或 b 的值自上次渲染后发生变化后也会运行
}, [a, b]);
```



### 按需添加清理（cleanup）函数

React 会在每次 Effect 重新运行之前调用清理函数，并在组件卸载（被移除）时最后一次调用清理函数。

```react
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>欢迎来到聊天室！</h1>;
}
```

```react
export function createConnection() {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接中……');
    },
    disconnect() {
      console.log('❌ 连接断开。');
    }
  };
}
```



## 自定义 Hook 复用逻辑

Hook 的名称必须永远以 use 开头。

```react
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
```

```react
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
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



## 库

### Immer

使用 immer 通过 React 钩子驱动状态。

文档：https://github.com/immerjs/use-immer



#### 更新对象

```react
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
  );
}
```



#### 更新数组

```react
import { useState } from 'react';
import { useImmer } from 'use-immer';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```



## TODO

https://zh-hans.react.dev/reference/react

















