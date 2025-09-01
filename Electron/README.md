# Electron

[官网](https://www.electronjs.org/)

[Electron Fiddle](https://github.com/electron/fiddle/releases/download/v0.36.0/electron-fiddle-0.36.0-win32-x64-setup.exe)

[Electron Forge](https://www.electronforge.io/)



|          | 后端   | 前端引擎 | 安装包 | 资源占用 |
| -------- | ------ | -------- | ------ | -------- |
| Electron | nodejs | chromium | 大     | 高       |
| Tauri    | rust   | webview  | 小     | 低       |



## 介绍

Electron 是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建在 Windows 上运行的跨平台应用 macOS 和 Linux。



## 快速入门

在使用Electron进行开发之前，您需要安装 Node.js。

**注意：**因为 Electron 将 Node.js 嵌入到其二进制文件中，你应用运行时的 Node.js 版本与你系统中运行的 Node.js 版本无关。



1. 创建一个文件夹并初始化 npm 包。
2. 将 `electron` 包安装到应用的开发依赖中。
3. 在项目的根目录创建 `main.js` 文件，并在 `package.json` 配置中添加启动命令。
4. 在项目的根目录创建 `index.html` 文件。
5. 在项目的根目录创建 `preload.js` 文件。



```shell
mkdir my-electron-app
cd my-electron-app
npm init
npm install --save-dev electron
```



### package.json

配置中有几条规则需要遵循：

- `entry point` 应为 `main.js`.
- `author` 与 `description` 可为任意值，但对于应用打包是必填项。

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "author": "Jane Doe",
  "license": "MIT"
}
```

`start` 命令能让您在开发模式下打开您的应用。



### main.js

任何 Electron 应用程序的入口都是 `main` 文件。 这个文件控制了**主进程**，它运行在一个完整的Node.js环境中，负责控制您应用的生命周期，显示原生界面，执行特殊操作并管理渲染器进程。



为了将 html 页面加载进应用窗口中。 要做到这一点，需要两个Electron模块：

- `app` 模块，它控制应用程序的事件生命周期。
- `BrowserWindow` 模块，它创建和管理应用程序窗口。

```js
const { app, BrowserWindow } = require('electron')
// 在文件顶部导入 Node.js 的 path 模块
const path = require('node:path')

// 创建浏览器窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // 通过预加载脚本从渲染器访问 Node.js
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  
  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口。
app.whenReady().then(() => {
  createWindow()

  // 如果没有任何浏览器窗口是打开的，则调用 createWindow() 方法。
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序。
// 如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit() 退出应用程序。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```



### index.html

在可以为我们的应用创建窗口前，我们需要先创建加载进该窗口的内容。 在Electron中，各个窗口显示的内容可以是本地HTML文件，也可以是一个远程url。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>你好!</title>
  </head>
  <body>
    <h1>你好!</h1>
    我们正在使用 Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    和 Electron <span id="electron-version"></span>.

    <!-- 将更多功能添加到您的网页内容 -->
    <script src="./renderer.js"></script>
  </body>
</html>
```



### preload.js

通过预加载脚本从渲染器访问 Node.js ： 预加载脚本在渲染器进程加载之前加载，并有权访问两个 渲染器全局 (例如 `window` 和 `document`) 和 Node.js 环境。

```js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  // 通过 replaceText 辅助函数将版本号插入到 HTML 文档中
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

所有的 Node.js API接口都可以在 preload 进程中被调用。





## 打包

**打包时可能会出现没系统权限而导致失败的情况，需要使用管理员身份运行打包命令。**



### Electron Forge

最快捷的打包方式是使用 `Electron Forge`。

将 Electron Forge 添加到您应用的开发依赖中，并使用其 `import` 命令设置 Forge 的脚手架

注意：打包需对 `package.json` 中的 `author` 与 `description` 属性进行设置。可为任意值。

```shell
npm install --save-dev @electron-forge/cli
npx electron-forge import
npm run make
```



#### 错误处理

在 `npx electron-forge import` 过程中可能会出现网络超时。需进行以下配置。



1、修改 `package.json` 文件，手动添加依赖项

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "test electron",
  "main": "main.js",
  "scripts": {
    "start": "electron-forge start",
    "test": "echo \"Error: no test specified\" && exit 1",
    "package": "electron-forge package",
    "make": "electron-forge make",
    "e-start": "electron ."
  },
  "author": "zs",
  "license": "MIT",
  "devDependencies": {
    "@electron-forge/cli": "^7.2.0",
    "@electron-forge/maker-deb": "^7.2.0",
    "@electron-forge/maker-rpm": "^7.2.0",
    "@electron-forge/maker-squirrel": "^7.2.0",
    "@electron-forge/maker-zip": "^7.2.0",
    "@electron-forge/plugin-auto-unpack-natives": "^7.2.0",
    "electron": "^28.0.0"
  },
  "dependencies": {
    "electron-squirrel-startup": "^1.0.0"
  },
  "config": {
    "forge": {
      "packagerConfig": {
        "asar": true
      },
      "makers": [{
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "electron_demo"
          }
        },
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        }
      ]
    }
  }
}
```



2、执行命令，需使用 npm 安装依赖后打包

```shell
npm config set electron_mirror https://npmmirror.com/mirrors/electron/
npm i
npm run make
```



#### 代码签名

代码签名是一种用来证明应用是由你创建的一种安全技术。 您应该对应用程序进行签名，以使它不会触发用户操作系统的安全检查。

作为桌面应用开发人员， 如果您计划将代码分发给公众，则必须对代码进行签名。

文档：https://www.electronforge.io/guides/code-signing



### electron-builder

文档：https://www.electron.build/



1. 安装依赖

   ```sh
   npm i electron-builder -D
   ```

2. 设置 package.json

   ```json
   "scripts": {
   	"postinstall": "electron-builder install-app-deps",
     "app:dir": "electron-builder --dir",
     "app:dist": "electron-builder"
   }
   ```

3. 打包

   ```sh
   npm run app:dist
   ```

   

### vue-cli-plugin-electron-builder

文档：https://github.com/nklayman/vue-cli-plugin-electron-builder



```
vue add electron-builder

npm run electron:serve
npm run electron:build
```





## 预加载脚本

Electron 的主进程是一个拥有着完全操作系统访问权限的 Node.js 环境。 除了 **Electron 模组** 之外，您也可以访问 **Node.js 内置模块** 和所有通过 npm 安装的包。 另一方面，出于安全原因，渲染进程默认跑在网页页面上，而并非 Node.js里。

为了将 Electron 的不同类型的进程桥接在一起，我们需要使用被称为 **预加载** 的特殊脚本。

预加载脚本包含在浏览器窗口加载网页之前运行的代码。 其可访问 DOM 接口和 Node.js 环境，并且经常在其中使用 `contextBridge` 接口将特权接口暴露给渲染器。



```js
// preload.js
// 如果想为渲染器添加需要特殊权限的功能，可以通过 contextBridge 接口定义全局对象。
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 除函数之外，我们也可以暴露变量
  name: 'zhangsan'
})
```

```js
// renderer.js
// 也可以通过 window.versions 访问
let res = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`
console.log(res)
console.log(window.versions.name)
```





## 流程模型

Electron 继承了来自 Chromium 的多进程架构，这使得此框架在架构上非常相似于一个现代的网页浏览器。 

作为应用开发者，你将控制两种类型的进程：**主进程** 和 **渲染器进程**。



### 主进程

每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。 主进程在 Node.js 环境中运行，这意味着它具有 `require` 模块和使用所有 Node.js API 的能力。



#### 窗口管理

主进程的主要目的是使用 `BrowserWindow` 模块创建和管理应用程序窗口。

BrowserWindow 类的每个实例创建一个应用程序窗口，且在单独的渲染器进程中加载一个网页。 

当一个 BrowserWindow 实例被销毁时，与其相应的渲染器进程也会被终止。

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

// 您可以使用窗口的 webContents 对象从主进程与此 Web 内容进行交互。
const contents = win.webContents
console.log(contents)
```



#### 应用程序生命周期

主进程还能通过 Electron 的 `app` 模块来控制您应用程序的生命周期。 该模块提供了一整套的事件和方法，可以让您用来添加自定义的应用程序行为 (例如：以编程方式退出您的应用程序、修改应用程序坞，或显示一个关于面板) 。

```js
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```



#### 原生 API

为了使 Electron 的功能不仅仅限于对网页内容的封装，主进程也添加了自定义的 API 来与用户的作业系统进行交互。 Electron 有着多种控制原生桌面功能的模块，例如菜单、对话框以及托盘图标。



### 渲染器进程

每个 Electron 应用都会为每个打开的 BrowserWindow ( 与每个网页嵌入 ) 生成一个单独的渲染器进程。 洽如其名，渲染器负责渲 网页内容。 所以实际上，运行于渲染器进程中的代码是须遵照网页标准的 。

因此，一个浏览器窗口中的所有的用户界面和应用功能，都应与您在网页开发上使用相同的工具和规范来进行攥写。



### 预加载脚本

预加载（preload）脚本包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码 。 这些脚本虽运行于渲染器的环境中，却因能访问 Node.js API 而拥有了更多的权限。

预加载脚本可以在 `BrowserWindow` 构造方法中的 `webPreferences` 选项里被附加到主进程。

```js
const win = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
})
```



因为预加载脚本与浏览器共享同一个全局 `Window` 接口，并且可以访问 Node.js API，所以它通过在全局 window 中暴露任意 API 来增强渲染器，以便你的网页内容使用。

虽然预加载脚本与其所附着的渲染器在共享着一个全局 window 对象，但您并不能从中直接附加任何变动到 window 之上，因为 `contextIsolation` (上下文隔离) 是默认的。



#### 上下文隔离 Context Isolation

上下文隔离功能将确保您的**预加载脚本**和 Electron 的内部逻辑运行在所加载的 `webcontent` 网页之外的另一个独立的上下文环境里。 这对安全性很重要，因为它有助于阻止网站访问 Electron 的内部组件和您的预加载脚本可访问的高等级权限的API 。

这意味着，实际上，您的预加载脚本访问的 `window` 对象**并不是**网站所能访问的对象。 例如，如果您在预加载脚本中设置 `window.hello = 'wave'` 并且启用了上下文隔离，当网站尝试访问`window.hello`对象时将返回 undefined。



```js
// preload.js
window.myAPI = {
  desktop: true
}
```

```js
// renderer.js
console.log(window.myAPI)	// undefined
```



#### contextBridge

需使用 `contextBridge` 模块来安全地实现交互：

```js
// preload.js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})
```

```js
// renderer.js
console.log(window.myAPI)
// => { desktop: true }
```





## IPC 进程间通信

Electron 的主进程和渲染进程有着清楚的分工并且不可互换。 这代表着无论是从渲染进程直接访问 Node.js 接口，亦或者是从主进程访问 HTML 文档对象模型 (DOM)，都是不可能的。

解决这一问题的方法是使用进程间通信 (IPC inter-process communication)。可以使用 Electron 的 `ipcMain` 模块和 `ipcRenderer` 模块来进行进程间通信。 为了从你的网页向主进程发送消息，你可以使用 `ipcMain.handle` 设置一个主进程处理程序（handler），然后在预处理脚本中暴露一个被称为 `ipcRenderer.invoke` 的函数来触发该处理程序。



由于主进程和渲染进程有着完全不同的分工，Electron 应用通常使用预加载脚本来设置进程间通信 (IPC) 接口以在两种进程之间传输任意信息。



### 渲染器进程到主进程（双向）

双向 IPC 的一个常见应用是从渲染器进程代码调用主进程模块并等待结果。 这可以通过将 `ipcRenderer.invoke` 与 `ipcMain.handle` 搭配使用来完成。



```js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  // 定义接收器， 在 HTML 文件加载之前执行，才能保证在渲染器触发前准备就绪
  ipcMain.handle('ping', () => 'pong')
  createWindow()
})
```

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
	// 暴露发送器
  // 不要通过预加载直接暴露整个 ipcRenderer 模块，这将使得你的渲染器能够直接向主进程发送任意的 IPC 信息，会使得其成为恶意代码最强有力的攻击媒介
  ping: () => ipcRenderer.invoke('ping')
})
```

```js
// renderer.js
// 将信息通过刚刚定义的 'ping' 通道从渲染器发送至主进程当中
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // 打印 'pong'
}

func()
```



### 渲染器进程到主进程（单向）

要将单向 IPC 消息从渲染器进程发送到主进程，您可以使用 `ipcRenderer.send` API 发送消息，然后使用 `ipcMain.on` API 接收。



以下例子，通过渲染器向主进程通信，实现更改窗口标题功能。

```js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 监听器
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

// 暴露 ipcRenderer.send
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>你好!</title>
  </head>
  <body>
    Title: <input id="title"/>
    <button id="btn" type="button">Set</button>

    <script src="./renderer.js"></script>
  </body>
</html>
```

```js
// renderer.js
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

// 调用暴露的 ipcRenderer.send，向主进程通信
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})
```



### 主进程到渲染器进程

将消息从主进程发送到渲染器进程时，需要指定是哪一个渲染器接收消息。 消息需要通过其 `WebContents` 实例发送到渲染器进程。 此 WebContents 实例包含一个 `send` 方法，其使用方式与 `ipcRenderer.send` 相同。

例子：原生操作系统菜单控制的数字计数器。

```js
// main.js
const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 设置菜单项
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          // 触发计数器
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])

  // 挂载菜单
  Menu.setApplicationMenu(menu)
  mainWindow.loadFile('index.html')

  // 打开开发者调试
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.on('counter-value', (_event, value) => {
    console.log(value)	// 获取计算结果并打印在 node 控制台
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send('counter-value', value)
})
```

```js
// renderer.js
const counter = document.getElementById('counter')

// 监听主进程触发的增减事件，并计算结果
window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
  // 传递结果到主进程
  window.electronAPI.counterValue(newValue)
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>你好!</title>
  </head>
  <body>
    Current value: <strong id="counter">0</strong>

    <script src="./renderer.js"></script>
  </body>
</html>
```





## TODO MessagePort 消息端口

[文档](https://www.electronjs.org/zh/docs/latest/tutorial/message-ports)

`MessagePort` 是一个允许在不同上下文之间传递消息的Web功能。 就像 `window.postMessage`，但是在不同的通道上。



**主进程中的 MessagePort**

在渲染器中， `MessagePort` 类的行为与它在 web 上的行为完全一样。 但是，主进程不是网页（它没有 Blink 集成），因此它没有 `MessagePort` 或 `MessageChannel` 类。

为了在主进程中处理 MessagePorts 并与之交互，Electron 添加了两个新类： `MessagePortMain` 和 `MessageChannelMain`。 

`MessagePort` 对象可以在渲染器或主进程中创建，并使用 `ipcRenderer.postMessage` 和 `WebContents.postMessage` 方法互相传递。 请注意，通常的 IPC 方法，例如 `send` 和 `invoke` 不能用来传输 `MessagePort`, 只有 `postMessage` 方法可以传输 `MessagePort`。

通过主进程传递 `MessagePort`，就可以连接两个可能无法通信的页面 (例如，由于同源限制) 。



























## 进程沙盒化

Chromium的一个关键安全特性是，进程可以在沙盒中执行。 沙盒通过限制对大多数系统资源的访问来减少恶意代码可能造成的伤害 — 沙盒化的进程只能自由使用CPU周期和内存。 为了执行需要额外权限的操作，沙盒处的进程通过专用通信渠道将任务下放给更大权限的进程。

在Chromium中，沙盒化应用于主进程以外的大多数进程。 其中包括渲染器进程，以及功能性进程，如音频服务、GPU 服务和网络服务。



**渲染器进程沙盒**

当 Electron 中的渲染进程被沙盒化时，它们的行为与常规 Chrome 渲染器一样。 一个沙盒化的渲染器**不会**有一个 Node.js 环境。

因此，在沙盒中，渲染进程只能透过进程间通讯 (inter-process communication, IPC) 委派任务给主进程的方式， 来执行需权限的任务 (例如：文件系统交互，对系统进行更改或生成子进程) 。

从 Electron 20 开始，渲染进程默认启用了沙盒。



**预加载沙盒**

为了让渲染进程能与主进程通信，附属于沙盒化的渲染进程的 preload 脚本中仍可使用一部分以 Polyfill 形式实现的 Node.js API。 有一个与 Node 中类似的 `require` 函数提供了出来，但只能载入 Electron 和 Node 内置模块的一个子集。

require 函数只是一个功能有限的 Ployfill 实现，并不支持把 preload 脚本拆成多个文件然后作为 `CommonJS` 模块 来加载。 若需要拆分 preload 脚本的代码，可以使用 webpack 或 Parcel 等打包工具。



### 配置沙盒

* 可通过在 `BrowserWindow` 构造函数中使用 `sandbox: false` 选项来针对单个进程禁用渲染器沙盒。
* 通过在 `BrowserWindow` 构造函数中使用 `nodeIntegration: true` 选项来实现。
* 调用 `app.enableSandbox` API 来强制沙盒化**所有渲染器**。 注意，此 API 必须在应用的 ready 事件之前调用。

```js
app.enableSandbox()	// 全局启用沙盒

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      // 为单个渲染器禁用沙盒
      sandbox: false,
      
      nodeIntegration: true,
    }
  })
  win.loadURL('https://google.com')
})
```





## 引入其他js库

因为 Electron 在运行环境中引入了 Node.js，所以在 DOM 中有一些额外的变量，比如 `module`、`exports` 和` require`。 这导致 了许多库不能正常运行，因为它们也需要将同名的变量加入运行环境中。

可以通过禁用 Node.js 来解决这个问题，在Electron里用如下的方式：

```js
// 在主进程中.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```



假如你依然需要使用 Node.js 和 Electron 提供的 API，你需要在引入那些库之前将这些变量重命名，比如：

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```





































