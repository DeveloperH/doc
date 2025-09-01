# 示例



## 主题颜色

受主题颜色影响的"本地界面"包括文件选择器、窗口边框、对话框、上下文 菜单等 - 任何UI来自操作系统而非应用的界面。 默认行为是从操作系统选择自动主题。



* nativeTheme ：读取并响应Chromium本地色彩主题中的变化。
  * shouldUseDarkColors 属性：只读。值为一个 `boolean` 类型的值，代表着当前 OS / Chromium 是否正处于dark模式。
  * themeSource 属性：获取或设置主题值。 可能的值为：`system` 默认， `light` ， `dark` 。



```js
// main.js
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
```

```js
// renderer.js
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>你好!</title>
    <link rel="stylesheet" type="text/css" href="./styles.css">
  </head>
  <body>
    <p>Current theme source: <strong id="theme-source">System</strong></p>

    <button id="toggle-dark-mode">切换主题</button>
    <button id="reset-to-system">重置为系统主题</button>

    <script src="./renderer.js"></script>
  </body>
</html>
```

```css
/* styles.css */
:root {
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  body { background: #333; color: white; }
}

@media (prefers-color-scheme: light) {
  body { background: #ddd; color: black; }
}
```





## 键盘快捷键

该功能允许你为 Electron 应用程序配置应用和全局键盘快捷键。



### 本地快捷键

应用键盘快捷键仅在应用程序被聚焦时触发。 为了配置本地快捷键，你需要在创建 `Menu` 模块中的 `MenuItem` 时指定 `accelerator` 属性。

```js
// main.js
const { app, BrowserWindow, Menu, MenuItem } = require('electron/main')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    // 处理不同操作系统的 accelerator 差异
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu)

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>你好!</title>
  </head>
  <body>
    <p>Hit Alt+Shift+I on Windows, or Opt+Cmd+I on mac to see a message printed to the console.</p>
  </body>
</html>
```



### 全局快捷键

要配置全局键盘快捷键， 您需要使用 `globalShortcon` 模块来检测键盘事件，即使应用程序没有获得键盘焦点。

```js
// main.js
const { app, BrowserWindow, globalShortcut } = require('electron/main')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
}).then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>你好!</title>
  </head>
  <body>
    <p>Hit Alt+Ctrl+I on Windows or Opt+Cmd+I on Mac to see a message printed to the console.</p>
  </body>
</html>
```



### 浏览器窗口内快捷键

#### 使用 web API

```js
// renderer.js
function handleKeyPress (event) {
  console.log(`You pressed ${event.key}`)
}

window.addEventListener('keyup', handleKeyPress, true)
```



#### 拦截主进程中的事件

在调度页面中的 keydown 和 keyup 事件之前，会发出 `before-input-event` 事件。 它可以用于捕获和处理在菜单中不可见的自定义快捷方式。

```js
const { app, BrowserWindow, } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.webContents.on('before-input-event', (event, input) => {
    // 同时按下 ctrl + i
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```



#### 使用第三方库

如果不想手动进行快捷键解析，可以使用一些库来进行高级的按键检测。例如 `mousetrap` 。

[mousetrap 文档](https://www.npmjs.com/package/mousetrap)

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// map multiple combinations to the same callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// gmail style sequences
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```



## 选择文件

```js
// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
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
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Dialog</title>
  </head>
  <body>
    <button type="button" id="btn">Open a File</button>
    File path: <strong id="filePath"></strong>
    <script src='./renderer.js'></script>
  </body>
</html>
```

```js
// renderer.js
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})
```





## 文件拖放

```js
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')
const https = require('node:https')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

// 设置拖放时的 icon
const iconName = path.join(__dirname, 'iconForDragAndDrop.png')
const icon = fs.createWriteStream(iconName)

// 创建文件
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-1.md'), '# First file to test drag and drop')
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-2.md'), '# Second file to test drag and drop')

https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
  response.pipe(icon)
})

app.whenReady().then(createWindow)

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: path.join(__dirname, filePath),
    icon: iconName
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

```js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electron', {
  startDrag: (fileName) => ipcRenderer.send('ondragstart', fileName)
})
```

```js
document.getElementById('drag1').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop-1.md')
}

document.getElementById('drag2').ondragstart = (event) => {
  event.preventDefault()
  window.electron.startDrag('drag-and-drop-2.md')
}
```

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <div style="border:2px solid black" draggable="true" id="drag1">Drag me - File 1</div>
    <div style="border:2px solid black" draggable="true" id="drag2">Drag me - File 2</div>
    <script src="renderer.js"></script>
</body>
</html>
```





## 进度条

进度条使窗口能够向用户提供其进度信息，而无需被切换到前台。

注意：在 Windows 上，每个窗口都可以有自己的进度条，而在 macOS 和 Linux（unity桌面）上，同一个应用程序只能有一个进度条。



进度条功能由同一个API实现：`BrowserWindow`实例下的 `setProgressBar()` 方法。 此方法以介于 `0` 和 `1` 之间的小数表示进度。 例如，如果有一个耗时很长的任务，它当前的进度是63%，那么你可以用 `setProgressBar(0.63)` 来显示这一进度。

将参数设置为负值 (例如， `-1`) 将删除进度条。 设定值大于 `1` 在 Windows 中将表示一个不确定的进度条 ，或在其他操作系统中显示为 100%。 一个不确定的进度条仍然处于活动状态，但不显示实际百分比， 并且用于当您不知道一个操作需要多长时间才能完成的情况。



```js
const { app, BrowserWindow } = require('electron/main')

let progressInterval

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')

  const INCREMENT = 0.03
  const INTERVAL_DELAY = 100 // ms

  let c = 0
  progressInterval = setInterval(() => {
    // 设置进度
    win.setProgressBar(c)

    
    if (c < 2) {
      c += INCREMENT
    } else {
      c = (-INCREMENT * 5)
    }
  }, INTERVAL_DELAY)
}

app.whenReady().then(createWindow)

// 窗口关闭，清除定时器
app.on('before-quit', () => {
  clearInterval(progressInterval)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```





## 通知

每个操作系统都有自己的机制向用户显示通知。 Electron 的通知 API 是跨平台的，但对每个进程类型来说是不同的。



### 主进程中显示通知

主进程通知使用 Electron的 `Notification` 模块显示。 使用此模块创建的通知对象不会立刻显示，除非调用他们的 `show()` 实例方法。

```js
const { app, BrowserWindow, Notification } = require('electron/main')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

const NOTIFICATION_TITLE = '通知标题'
const NOTIFICATION_BODY = '通知内容：哈哈哈'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```



### 渲染进程中显示通知

通知可以直接在渲染进程中使用 `Web Notifications AP`I 显示。

```js
// renderer.js
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => { document.getElementById('output').innerText = CLICK_MESSAGE }
```





## 托盘图标

在 MacOS 和 Ubuntu, 托盘将位于屏幕右上角上，靠近你的电池和 wifi 图标。 在 Windows 上，托盘通常位于右下角。

```js
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron')
const fs = require('node:fs')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

let tray

app.whenReady().then(
  ()=> {
    // 设置托盘图标
    const icon = nativeImage.createFromPath('favicon.ico')
    tray = new Tray(icon)

    // 设置图标的菜单，这里创建4个单独的 radio-type 单选类型项
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ])
    
    tray.setContextMenu(contextMenu)

    // 设置工具提示和标题
    tray.setToolTip('This is my application')
    tray.setTitle('This is my title')

    createWindow()
  }
)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```







## 离屏渲染

离屏渲染允许你以位图的方式来获取 `BrowserWindow` 中的内容，所以它可以在任何地方被渲染，例如在3D场景中的纹理。 



注意：

- 有两种渲染模式可以使用，只有未渲染区域传递到 `绘图` 事件才能提高效率。
  - GPU加速：GPU加速渲染意味着使用 GPU 用于合成。 这也就意味着帧必须从 GPU 拷贝过来，从而需求更多的资源，因此这会比软件输出设备更慢。 这种模式的优点是支持 WebGL 和 3D CSS动画。
  - 软件输出设备：此模式使用软件输出设备在 CPU 中渲染，因此帧 生成的速度要快得多。 因此，此模式优先于 GPU 加速模式。要启用此模式，必须通过调用 `app.disableHardwareAcceleration()` API 来禁用GPU加速。
- 您可以停止/继续渲染并设置帧速率。
- 最高帧速率为 240，因为更高的值只会带来性能上的损失而没有任何收益。
- 当网页上没有发生任何情况时，不会生成帧。
- 屏幕窗口始终创建为 `无边框窗口`



```js
const { app, BrowserWindow } = require('electron/main')
const fs = require('node:fs')
const path = require('node:path')

app.disableHardwareAcceleration()

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 设置为离屏渲染
      offscreen: true
    }
  })

  // 获取内容并保存为位图
  win.loadURL('https://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    fs.writeFileSync('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
  console.log(`The screenshot has been successfully saved to ${path.join(process.cwd(), 'ex.png')}`)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

在运行Electron应用后，进入你的应用的工作目录，你会在里面找到渲染的图片。





## 检测在线/离线

在渲染进程中，在线/离线事件 的探测，是通过标准 HTML5 API 中 `navigator.onLine` 属性来实现的。

`navigator.onLine` 属性返回值：

- `false`：如果所有网络请求都失败(例如，断开网络)。
- `true`: 在其他情况下都返回 true

由于许多情况都会返回 `true`，你应该小心对待误报的情况， 因为我们不能总是假设 `true` 值意味着 Electron 可以访问互联网。 例如，当计算机运行的虚拟化软件时，虚拟以太网适配器处于 "always connected" 状态。 因此，如果您想要确定 Electron 的互联网访问状态，您应该为此检查进行额外的开发。



```js
// renderer.js
const updateOnlineStatus = () => {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```





## Web 嵌入

有三种方式可以让你在Electron的`BrowserWindow`里集成（第三方）web内容，`<iframe>` 和, `<webview>` 和 `BrowserViews` 每个功能都略有不同，适用于不同的情况。



* Iframe ：Iframe 在 Electron 中的行为与普通浏览器中类似。 在宿主页面的 CSP 允许范围内，一个 `<iframe>` 元素能在页面上显示外部网页。 要限制 `<iframe>` 标签中站点的功能数量，建议使用 `sandbox` 属性并且只允许您想要支持的功能。
* BrowserView ：BrowserViews 不是 DOM 的一部分，而是由主进程创建和控制。它们只是现有窗口之上的另一层 Web 内容。 这意味着它们与您自己的 `BrowserWindow` 内容完全分离，并且它们的位置不受 DOM 或 CSS 的控制，而是通过在主进程中设置边界来控制其位置。 相反，它通过在主进程中设置界面来控制 。
* WebView ：不推荐。因为这个标签会发生剧烈的结构变化，可能会影响您应用程序的稳定性。 





## TODO 设备访问

https://www.electronjs.org/zh/docs/latest/tutorial/devices











































































