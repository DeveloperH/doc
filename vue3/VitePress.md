# VitePress

VitePress 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。



官网：https://vitepress.dev/

GitHub：https://github.com/vuejs/vitepress



## 开始

```sh
# VitePress 可以单独使用，也可以安装到现有项目中。
$ npm add -D vitepress

# VitePress 附带一个命令行设置向导，可以帮助你构建一个基本项目。启动向导：
$ npx vitepress init

# 将需要回答几个简单的问题：
# Where should VitePress initialize the config?
# VitePress 应在何处初始化配置？
# ./docs

# 启动具有即时热更新的本地开发服务器
$ npm run docs:dev
```



**文件结构**

如果正在构建一个独立的 VitePress 站点，可以在当前目录 (`./`) 中搭建站点。但是，如果在现有项目中与其他源代码一起安装 VitePress，建议将站点搭建在嵌套目录 (例如 `./docs`) 中，以便它与项目的其余部分分开。

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

`docs` 目录作为 VitePress 站点的项目根目录。`.vitepress` 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的位置。



* 配置文件： `.vitepress/config.js`
  * 配置文件能够自定义 VitePress 站点的各个方面，最基本的选项是站点的标题和描述。还可以通过 `themeConfig` 选项配置主题的行为。
* 源文件： `.vitepress` 目录之外的 Markdown 文件被视为源文件。
  * VitePress 使用基于文件的路由：每个 `.md` 文件将在相同的路径被编译成为 `.html` 文件。例如，`index.md` 将会被编译成 `index.html`，可以在生成的 VitePress 站点的根路径 `/` 进行访问。





## 路由

VitePress 使用基于文件的路由，这意味着生成的 HTML 页面是从源 Markdown 文件的目录结构映射而来的。

VitePress 项目的文件结构中有两个重要的概念：项目根目录 (**project root**) 和源目录 (**source directory**)。

* 项目根目录是 VitePress 将尝试寻找 `.vitepress` 特殊目录的地方。`.vitepress` 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的预留位置。
  * 当从命令行运行 `vitepress dev` 或 `vitepress build` 时，VitePress 将使用当前工作目录作为项目根目录。要将子目录指定为根目录，需要将相对路径传递给命令。
* 源目录是 Markdown 源文件所在的位置。默认情况下，它与项目根目录相同。但是，可以通过 `srcDir` 配置选项对其进行配置。`srcDir` 选项是相对于项目根目录解析的。



如果要生成简洁的 URL，可以启用 VitePress 自己的 `cleanUrls` 配置选项，访问时可以忽略 ` .html 扩展名`。



路由重写：

```js
// .vitepress/config.js
export default {
  rewrites: {
    'packages/pkg-a/src/pkg-a-docs.md': 'pkg-a/index.md',
    'packages/pkg-b/src/pkg-b-docs.md': 'pkg-b/index.md',
    
    // 动态路由参数
    'packages/:pkg/src/(.*)': ':pkg/index.md'
  }
}
```







## 部署

### 构建

```sh
# 构建文档
$ npm run docs:build

# 构建文档后，通过运行以下命令可以在本地预览它
$ npm run docs:preview
```

`preview` 命令将启动一个本地静态 Web 服务 `http://localhost:4173`，该服务以 `.vitepress/dist` 作为源文件。这是检查生产版本在本地环境中是否正常的一种简单方法。

可以通过传递 `--port` 作为参数来配置服务器的端口。

```js
{
  "scripts": {
    "docs:preview": "vitepress preview docs --port 8080"
  }
}
```



### 设定 public 根目录

默认情况下，我们假设站点将部署在域名 (`/`) 的根路径上。如果站点在子路径中提供服务，例如 `https://mywebsite.com/blog/`，则需要在 VitePress 配置中将 `base` 选项设置为 `'/blog/'`。



### Nginx

```nginx
location / {
	# 处理 cleanUrls: true 的方法
  try_files $uri $uri.html $uri/ =404;
  
  error_page 404 /404.html;
  error_page 403 /404.html;
}
```















































