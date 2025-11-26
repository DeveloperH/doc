# 了解Node.js

官网地址：https://nodejs.org/zh-cn/

中文网地址：http://nodejs.cn/



# npm包管理器

npm 全称为 Node Package Manager，是 Node.js 标准的软件包管理器。`npm` 可以管理项目依赖的下载。

官网地址：https://www.npmjs.com/

搜索合适的包：https://npms.io/



## 验证安装和配置源

* 验证安装
* 配置源地址
* 查看源地址
  * 默认为https://registry.npmjs.org/
* 安装 cnpm
* 升级 npm

```shell
node -v
npm -v
npm config set registry https://registry.npmmirror.com/
npm config get registry
npm install -g cnpm --registry=https://registry.npmmirror.com/
cnpm config get registry
npm install npm@latest -g
```



## 安装所有依赖

如果项目具有 `package.json` 文件，则通过运行：

```shell
npm install
```

它会在 `node_modules` 文件夹（如果尚不存在则会创建）中安装项目所需的所有东西。

> 开发依赖是仅用于开发的程序包，在生产环境中并不需要。 例如测试的软件包、cowsay、webpack 或 Babel。
>
> 当投入生产环境时，如果输入 `npm install` 且该文件夹包含 `package.json` 文件时，则会安装它们，因为 npm 会假定这是开发部署。
>
> 需要设置 `--production` 标志（`npm install --production`），以避免安装这些开发依赖项。

如果项目中缺失`package.json`文件，但又想安装所有依赖，那么先运行：`npm init -y` ，生成`package.json`文件。



## 安装单个软件包

通过运行以下命令安装特定的软件包：

```shell
npm install <package-name>
```

通常会在此命令中看到更多标志：

* `--save` 或 `-S` 安装并添加条目到 `package.json` 文件的 dependencies(生产环境依赖)。
* `--save-dev` 或 `-D` 安装并添加条目到 `package.json` 文件的 devDependencies(开发环境依赖)。

```shell
npm install -S <package-name>
npm install -D <package-name>
```

区别主要是，`devDependencies` 通常是开发的工具（例如测试的库），而 `dependencies` 则是与生产环境中的应用程序相关。`devDependencies`不同于 `dependencies`，因为它们只需安装在开发机器上，而无需在生产环境中运行代码。



* 本地安装
  * 软件包会被安装到当前文件树中的 `node_modules` 子文件夹下。
  * 在这种情况下，`npm` 还会在当前文件夹中存在的 `package.json` 文件的 `dependencies` 属性中添加该软件包条目。
* 全局安装
* 查看全局安装的位置
  * 在 macOS 或 Linux 上，此位置可能是 `/usr/local/lib/node_modules`。
  * 在 Windows 上，可能是 `C:\Users\YOU\AppData\Roaming\npm\node_modules`。
  * 如果使用 `nvm`，则软件包的位置可能为 `/Users/joe/.nvm/versions/node/v8.9.0/lib/node_modules`
* 安装npm包的旧版本 `npm install <pageage>@<version>`
* 卸载软件包，如果要卸载本地安装的软件包，则需要从所属该软件包的项目的根文件夹中执行卸载命令
  * 如果使用 `-S` 或 `--save` 标志，则此操作还会移除 `package.json` 文件中的引用。
  * 如果程序包是开发依赖项（列出在 `package.json` 文件的 devDependencies 中），则必须使用 `-D` 或 `--save-dev` 标志从文件中移除

```shell
npm install <package-name>
npm install -g <package-name>
npm root -g

# 安装指定版本
npm install cowsay@1.2.0
npm install -g webpack@4.16.4
npm install webpack@latest

npm uninstall <package-name>
npm uninstall -g <package-name>
npm uninstall -S <package-name>
npm uninstall -D <package-name>
```



## 查看npm软件包的安装版本

* 查看所有已安装的npm软件包（包括它们的依赖包）的最新版本
* 若要仅获取顶层的软件包，也就是手动npm install的，加上`--depth=0`参数
* 也可以通过指定名称来获取特定软件包的版本
* 同样适用于已安装的软件包的依赖，例如cowsay下的minimist依赖
* 查看软件包在 npm 仓库上最新的可用版本
* 列出软件包所有的以前的版本

```shell
npm list
npm list -g  //仅适用于全局安装的软件包
npm list --depth=0
npm list --depth=0 -g
npm list cowsay
npm list cnpm -g
npm list minimist

# 查看 jquery 的最新的可用版本
npm view jquery version
# 查看 jquery 的全部版本
npm view jquery versions
```

> 注意：如果要查看全局安装的软件包版本，则需要加上-g



## 更新软件包

`npm` 会检查所有软件包是否有满足版本限制的更新版本。也可以指定单个软件包进行更新：

```shell
npm update
npm update <package-name>
```

如果有新的次版本或补丁版本，并且输入了 `npm update`，则已安装的版本会被更新，并且 `package-lock.json` 文件会被新版本填充。

存疑：`package.json` 则保持不变。测试结果：也会变



## 使用或执行npm安装的软件包

若想要在代码中使用它，则只需使用 `require` 将其导入到程序中

```javascript
const _ = require('lodash')
```

如果软件包是可执行文件，该怎么办？

在这种情况下，它会把可执行文件放到 `node_modules/.bin/` 文件夹下。

当使用 `npm install cowsay` 安装软件包时，它会在 node_modules 文件夹中安装自身以及一些依赖包，其中有一个隐藏的 .bin 文件夹，其中包含指向 cowsay 二进制文件的符号链接。

如何执行这些文件？

可以输入 `./node_modules/.bin/cowsay` 来运行它，但是最新版本的 npm（自 5.2 起）中包含的 `npx` 是更好的选择。 只需运行：

```shell
npx cowsay <take me out of here>
```

则 `npx` 会找到程序包的位置。





## package.json文件

package.json 位于模块的目录下，用于定义包的属性，也是项目的清单。

它唯一的要求是必须遵守 JSON 格式，否则，尝试以编程的方式访问其属性的程序则无法读取它。

### 文件结构

```json
{
  "name": "test-project",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "main": "src/main.js",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "test": "npm run unit",
    "lint": "eslint --ext .js,.vue src test/unit",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.5.2"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "shelljs": "^0.7.6",
    "vue-jest": "^1.0.2",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```



* `version` 表明了软件包当前的版本。
* `name` 设置了应用程序/软件包的名称。
  * 名称必须少于 214 个字符，且不能包含空格，只能包含小写字母、连字符（`-`）或下划线（`_`）。
* `description` 是应用程序/软件包的简短描述。
* `main` 设置了应用程序的入口点。当在应用程序中导入此软件包时，应用程序会在该位置搜索模块的导出。
* `private` 如果设置为 `true`，则可以防止应用程序/软件包被意外地发布到 `npm`。
* `scripts` 定义了一组可以运行的 node 脚本。可以通过调用 `npm run XXXX` 来运行他们。
* `dependencies` 设置了作为依赖安装的 `npm` 软件包的列表。
* `devDependencies` 设置了作为开发依赖安装的 `npm` 软件包的列表。它们不同于 `dependencies`，因为它们只需安装在开发机器上，而无需在生产环境中运行代码。
* `engines` 设置了此软件包/应用程序在哪个版本的 Node.js 上运行。
* `browserslist` 用于告知要支持哪些浏览器（及其版本）。

以上所有的这些属性都可被 `npm` 或其他工具使用。



![640](http://qiniu.huangyihui.cn/doc/202511262256517.png)



#### (1) 必须属性

package.json中最重要的两个字段就是name和version，它们都是必须的，如果没有，就无法正常执行npm install命令。npm规定package.json文件是由名称和版本号作为唯一标识符的。

* name ：项目名称。如果项目不会发布在npm上，名称是否标准则不那么重要
  * 名称的长度必须小于或等于214个字符，不能以 `.` 和 `_` 开头，不能包含大写字母（这是因为当软件包在npm上发布时，会基于此属性获得自己的URL，所以不能包含非URL安全字符
  * 名称可以作为参数被传入 `require("")` ，用来导入模块，所以应当尽可能的简短、语义化
  * 名称不能和其他模块的名称重复，可以使用 `npm view` 命令查询模块明是否重复，如果不重复就会提示404。重复则会显示包的详细信息
* version ：表示该项目包的版本号。使用规范如下：
  * 版本号的命名遵循语义化版本2.0.0规范，格式为：**主版本号.次版本号.修订号**，通常情况下，修改主版本号是做了大的功能性的改动，修改次版本号是新增了新功能，修改修订号就是修复了一些bug；
  * 如果某个版本的改动较大，并且不稳定，可能如法满足预期的兼容性需求，就需要发布先行版本，先行版本通过会加在版本号的后面，通过“-”号连接以点分隔的标识符和版本编译信息：内部版本（alpha）、公测版本（beta）和候选版本（rc，即release candiate）。



#### (2) 描述信息

* description ：描述信息，可以让其他开发者在 npm 的搜索中发现我们的项目包。
* keywords ：表示这个项目包的关键词，是一个字符串数组。用来增加项目包的曝光率的。
* author ：作者。它有两种形式，一种是字符串格式，另一种是对象形式
* contributors ：贡献者。和 author 不同的是，该字段是一个数组，包含所有的贡献者，它同样有两种写法
* homepage ：项目的主页地址
* repository ：代码的存放仓库地址，它同样有两种写法
* bugs ：表示项目提交问题的地址，该字段是一个对象，可以添加一个提交问题的地址和反馈的邮箱



```
"author": "zs <xxxxx@xx.com> (https://juejin.cn/user/666)"

"author": {
  "name" : "zs",
  "email" : "xxxxx@xx.com",
  "url" : "https://juejin.cn/user/666"
}


"repository": "https://github.com/facebook/react.git"

"repository": {
  "type": "git",
  "url": "https://github.com/facebook/react.git"
}


"bugs": { 
  "url" : "https://github.com/facebook/react/issues",
  "email" : "xxxxx@xx.com"
}
```



#### (3) 依赖配置

* dependencies ：生产依赖
* devDependencies ：开发依赖
* engines ：当我们维护一些旧项目时，可能对npm包的版本或者Node版本有特殊要求，如果不满足条件就可能无法将项目跑起来。为了让项目开箱即用，可以在engines字段中说明具体的版本号。
  * 需要注意，engines只是起一个说明的作用，即使用户安装的版本不符合要求，也不影响依赖包的安装。
* peerDependencies ：用来供插件指定其所需要的主工具的版本，npm 3.0版开始，peerDependencies不再会默认安装了
* optionalDependencies ：如果需要在找不到包或者安装包失败时，npm仍然能够继续运行，则可以将该包放在optionalDependencies对象中，optionalDependencies对象中的包会覆盖dependencies中同名的包，所以只需在一个地方进行设置即可。
  * 需要注意，由于optionalDependencies中的依赖可能并未安装成功，所以一定要做异常处理，否则当获取这个依赖时，如果获取不到就会报错。
* bundledDependencies ：是一个数组，数组里可以指定一些模块，这些模块将在这个包发布时被一起打包。
  * 需要注意，这个字段数组中的值必须是在dependencies, devDependencies两个里面声明过的包才行。



#### (4) 脚本配置

* scripts ：scripts 是 package.json中内置的脚本入口，是key-value键值对配置，key为可运行的命令，可以通过 npm run 来执行命令。除了运行基本的scripts命令，还可以结合pre和post完成前置和后续操作。
  * 命令内容可以是 linux 中的命令，比如 `echo` 输出命令。可以使用 `&&` 继发执行多条命令，使用 `&` 并发执行多条命令
  * key 如果是 `start` 或者 `test` ，可以简写为 `npm start` ，和 `npm run start` 效果一样
* config ：用来配置scripts运行时的配置参数



```json
"scripts": {
  "dev": "node index.js",
  "predev": "node beforeIndex.js",
  "postdev": "node afterIndex.js",
  "runjs": "node script1.js && node script2.js",
  "greeting": "echo hello",
  "start": "node demo.js",
  "build": "echo $npm_package_config_port"
}
```

这三个js文件中都有一句console：

```js
// index.js
console.log("scripts: index.js")

// beforeIndex.js
console.log("scripts: before index.js")

// afterIndex.js
console.log("scripts: after index.js")
```

当我们执行npm run dev命令时，输出结果如下：

```
scripts: before index.js
scripts: index.js
scripts: after index.js
```

可以看到，三个命令都执行了，执行顺序是predev→dev→postdev。如果scripts命令存在一定的先后关系，则可以使用这三个配置项，分别配置执行命令。



npm 脚本还可以使用 npm 的内部变量。

```
"config": {
  "port": 3000
}
```

如果运行npm run start，则port字段会映射到`npm_package_config_port`环境变量中。

```js
console.log(process.env.npm_package_config_port) // 3000
```

用户可以通过`npm config set foo:port 3001` 命令来重写port的值。



#### (5) 文件&目录

* main ：用来指定加载的入口文件，在 browser 和 Node 环境中都可以使用。如果我们将项目发布为npm包，那么当使用 require 导入npm包时，返回的就是main字段所列出的文件的module.exports 属性。如果不指定该字段，默认是项目根目录下的index.js。如果没找到，就会报错。
* browser ：定义 npm 包在 browser 环境下的入口文件。如果 npm 包只在 web 端使用，并且严禁在 server 端使用，使用 browser 来定义入口文件。
* module ：定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用。如果 npm 包导出的是 ESM 规范的包，使用 module 来定义入口文件。
  * 需要注意，.js 文件是使用 commonJS 规范的语法(require('xxx'))，.mjs 是用 ESM 规范的语法(import 'xxx')。
* bin ：用来指定各个内部命令对应的可执行文件的位置
* files ：files配置是一个数组，用来描述当把npm包作为依赖包安装时需要说明的文件列表。当npm包发布时，files指定的文件会被推送到npm服务器中，如果指定的是文件夹，那么该文件夹下面所有的文件都会被提交。
  * 如果有不想提交的文件，可以在项目根目录中新建一个.npmignore文件，并在其中说明不需要提交的文件，防止垃圾文件推送到npm上。这个文件的形式和.gitignore类似。写在这个文件中的文件即便被写在files属性里也会被排除在外。
* man ：帮助指令。如果 node.js 模块是一个全局的命令行工具，在 package.json 通过 man 属性可以指定 man 命令查找的文档地址
* directories ：用来规范项目的目录



#### (6) 发布配置

* private ：可以防止我们意外地将私有库发布到npm服务器。只需要将该字段设置为true

* preferGlobal ：表示当用户不把该模块安装为全局模块时，如果设置为true就会显示警告。它并不会真正的防止用户进行局部的安装，只是对用户进行提示，防止产生误解

* publishConfig ：publishConfig配置会在模块发布时生效，用于设置发布时一些配置项的集合。如果不想模块被默认标记为最新，或者不想发布到公共仓库，可以在这里配置tag或仓库地址。更详细的配置可以参考 npm-config。通常情况下，publishConfig会配合private来使用，如果只想让模块发布到特定npm仓库，就可以这样来配置：

  ```
  "private": true,
  "publishConfig": {
    "tag": "1.1.0",
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
  ```

* os ：设置该npm包可以在什么操作系统使用，不能再什么操作系统使用。黑名单和白名单的区别就是，黑名单在前面加了一个 `!` 。

* cpu ：该配置和OS配置类似，用CPU可以更准确的限制用户的安装环境

* license ：用于指定软件的开源协议，常见的协议如下：

  * MIT ：只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任。
  * Apache ：类似于 MIT ，同时还包含了贡献者向用户提供专利授权相关的条款。
  * GPL ：修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改。



```
"os" ["linux"]   // 适用的操作系统
"os" ["!win32"]  // 禁用的操作系统

"cpu" ["x64", "AMD64"]   // 适用的cpu
"cpu" ["!arm", "!mips"]  // 禁用的cpu
```



#### (7) 第三方配置

package.json 文件还可以承载命令特有的配置，例如 Babel、ESLint 等。它们每个都有特有的属性，例如 eslintConfig、babel 等。它们是命令特有的，可以在相应的命令/项目文档中找到如何使用它们。



* typings ：用来指定TypeScript的入口文件
* eslintConfig ：eslint的配置可以写在单独的配置文件.eslintrc.json 中，也可以写在package.json文件的eslintConfig配置项中。
* babel ：用来指定Babel的编译配置
* unpkg ：使用该字段可以让 npm 上所有的文件都开启 cdn 服务，该CND服务由unpkg提供
* browserslist ：用来告知支持哪些浏览器及版本
* lint-staged ：是一个在Git暂存文件上运行linters的工具，配置后每次修改一个文件即可给所有文件执行一次lint检查，通常配合gitHooks一起使用。使用lint-staged时，每次提交代码只会检查当前改动的文件。
* gitHooks ：用来定义一个钩子，在提交（commit）之前执行ESlint检查。在执行lint命令后，会自动修复暂存区的文件。修复之后的文件并不会存储在暂存区，所以需要用git add命令将修复后的文件重新加入暂存区。在执行pre-commit命令之后，如果没有错误，就会执行git commit命令：



```
"lint-staged": {
 "*.js": [
   "eslint --fix",
    "git add"
  ]
}

"gitHooks": {
 "pre-commit": "lint-staged"
}
```



### 发布自己的软件包

如果需要在npm上发布软件包时，可以在package.json文件添加属性以便公开发布。

**注意：如果要发布模块到npm，必须把源设置为默认的，不能是其他源。**

```shell
npm config set registry https://registry.npmmirror.com/
npm init ：生成package.json文件
npm init -y ：生成package.json文件，选择项全部yes
npm adduser ：在npm资源库中注册用户（用邮箱注册）
# 完成编写代码后发布
npm publish ：发布模块
npm unpublish <package>@<version> ：可以撤销发布自己发布过的某个版本代码
```

配置package.json文件：

```json
{
	"name": "nodejs_cn",
	"author": {
        "name": "NodeJS中文网",
        "email": "mail@nodejs.cn",
        "url": "http://nodejs.cn"
     },
	"contributors": [
        {
          "name": "NodeJS中文网",
          "email": "mail@nodejs.cn",
          "url": "http://nodejs.cn"
        }
      ],
	"bugs": "https://github.com/nodejscn/node-api-cn/issues",
	"homepage": "http://nodejs.cn",
	"version": "1.0.0",
    "license": "MIT",
    "keywords": [
      "machine learning",
      "ai"
    ],
    "description": "NodeJS中文网入门教程",
    "repository": "github:nodejscn/node-api-cn",
    "main": "src/main.js",
    "private": true,
	"scripts": {
        "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
        "start": "npm run dev",
    },
    "dependencies": {
      "vue": "^2.5.2"
    },
    "devDependencies": {
      "autoprefixer": "^7.1.2",
      "babel-core": "^6.22.1"
    },
    "engines": {
      "node": ">= 6.0.0",
      "npm": ">= 3.0.0",
      "yarn": "^0.13.0"
    },
    "browserslist": [
      "> 1%",
      "last 2 versions",
      "not ie <= 8"
    ],

}
```

* `name` 设置了应用程序/软件包的名称。
* `author` 列出软件包的作者名称。
* `contributors` 除作者外，该项目可以有一个或多个贡献者。 此属性是列出他们的数组。
* `bugs` 链接到软件包的问题跟踪器，最常用的是 GitHub 的 issues 页面。
* `homepage` 设置软件包的主页。
* `version` 表明了软件包当前的版本。
* `license` 指定软件包的许可证。MIT为开源方式。
* `keywords` 属性包含与软件包功能相关的关键字数组。这有助于人们在浏览相似的软件包或浏览 https://www.npmjs.com/ 网站时找到你的软件包。
* `description` 此属性包含了对软件包的简短描述。
* `repository` 此属性指定了此程序包仓库所在的位置。
* `main` 设置了应用程序的入口点。当在应用程序中导入此软件包时，应用程序会在该位置搜索模块的导出。
* `private` 如果设置为 `true`，则可以防止应用程序/软件包被意外地发布到 `npm`。
* `scripts` 定义了一组可以运行的 node 脚本。可以通过调用 `npm run XXXX` 来运行他们。
* `dependencies` 设置了作为依赖安装的 `npm` 软件包的列表。
* `devDependencies` 设置了作为开发依赖安装的 `npm` 软件包的列表。它们不同于 `dependencies`，因为它们只需安装在开发机器上，而无需在生产环境中运行代码。
* `engines` 设置了此软件包/应用程序在哪个版本的 Node.js 上运行。
* `browserslist` 用于告知要支持哪些浏览器（及其版本）。



```js
// index.js npm包代码
function myFn() {
	return 123;
}

module.exports = myFn
```

```js
const myFn = require("myNpmPackage")
console.log(myFn()) // 123
```



### 版本号

node package versions

`version`属性遵循版本的语义版本控制记法，这意味着版本始终以 3 个数字表示：`x.x.x`。

第一个数字是主版本号，第二个数字是次版本号，第三个数字是补丁版本号。

这些数字中的含义是：仅修复缺陷的版本是补丁版本，引入向后兼容的更改的版本是次版本，具有重大更改的是主版本。

-13.4.6  = major:13, minor:4, patch:6

npm版本符号

* `^` ：锁定major
* `~` ：锁定minor
* `空` ：锁定patch
* `*`号： 最新版本
* `>`: 接受高于指定版本的任何版本。
* `>=`: 接受等于或高于指定版本的任何版本。
* `<=`: 接受等于或低于指定版本的任何版本。
* `<`: 接受低于指定版本的任何版本。
* `=`: 接受确切的版本。
* `-`: 接受一定范围的版本。例如：`2.1.0 - 2.6.2`。
* `||`: 组合集合。例如 `< 2.1 || > 2.6`。

可以合并其中的一些符号，例如 1.0.0 || >=1.1.0 <1.2.0，即使用 1.0.0 或从 1.1.0 开始但低于 1.2.0 的版本。



### npm脚本运行任务

npm脚本，也就是运行package.json文件中的scrpits脚本

​	scripts脚本有一些可以简写的命令，例如start,test等，可以直接`npm test`运行test中的脚本

```json
"scripts": { 
  	"hi": "echo hi",
  	"runjs": "node ../usemymodule.js",
  	"runmorejs": "node ../usemymodule.js && node ../非阻塞代码示例.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
"conf": {
	"env" : "env value"
},
```

```shell
npm run <task-name>
npm run hi
npm run runjs
npm run runmorejs
```

> 使用此特性运行 Webpack 是很常见的，而且不用输入那些容易忘记或输入错误的长命令



通过scripts脚本来获取package.json中的某个变量值

js文件内容：console.log(`process.env.npm_package_`conf_env);

* 红色为固定写法
* 注意：只能在package.json中的scripts中访问package.json中的值
* scripts脚本内部范围变量



## pageage-lock.json文件

该文件旨在跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制（即使软件包的维护者更新了软件包）。

因为当你，或者是其他人，会在某处尝试通过运行 `npm install` 初始化项目时，随着时间变化，依赖项可能已升级了版本，因此，原始的项目和新初始化的项目实际上是不同的。

`package-lock.json` 会固化当前安装的每个软件包的版本，当运行 `npm install`时，`npm` 会使用这些确切的版本。

`package-lock.json` 文件需要被提交到 Git 仓库，以便被其他人获取（如果项目是公开的或有合作者，或者将 Git 作为部署源）。

当运行 `npm update` 时，`package-lock.json` 文件中的依赖的版本会被更新。





## npm命令

> npm -v ：查看npm版本
>
> npm config set registry https://registry.npmmirror.com/ ：设置源
>
> npm config get registry ：查看下载源地址
>
> npm config get prefix ：查看全局安装目录
>
> npm config set prefix <新的路径> ：修改全局安装目录
>
> npm install 模块名 -g ：全局安装
>
> npm install 模块名 ：本地安装
>
> npm install -g cnpm --registry=https://registry.npmmirror.com/ ：安装cnpm
>
> npm install --production ：只安装生产依赖
>
> npm list -g ：查看所有已全局安装的npm软件包（包括它们的依赖包）的最新版本
>
> npm list [模块名] ：查看本地所有已安装的npm软件包（包括它们的依赖包）的最新版本
>
> npm list  | grep 模块名 ：过滤出符合模块名的npm软件包
>
> npm view 模块名 version ：查看软件包在 npm 仓库上最新的可用版本
>
> npm view 模块名 versions ：查看软件包在 npm 仓库上的所有版本
>
> npm uninstall 模块名 -g ：卸载全局模块
>
> npm uninstall 模块名 ：卸载模块
>
> npm search 模块名 ：搜索模块
>
> npm help ：查看帮助，
>
> npm help <command> ：会在浏览器中打开指定命令的详细帮助
>
> npm -h <command> : 简写，获取某个命令的帮助信息
>
> npm cache clear ：清空NPM本地缓存
>
> npm cache clear --force ：强制清空NPM本地缓存
>
> npm init ：生成package.json文件
>
> npm init -y ：生成package.json文件，选择项全部yes
>
> npm adduser ：在npm资源库中注册用户（用邮箱注册）
>
> npm publish ：发布模块
>
> `npm unpublish <package>@<version>`：可以撤销发布自己发布过的某个版本代码
>
> npm run 属性名 ：运行当前目录下package.json文件中的script脚本中的指定属性
>
> npm outdated：检查软件包的新版本
>
> npm update 模块名 ：更新模块
>
> npm dedupe ：删除重复的包
>
> npm audit ：查找所有依赖项中存在的漏洞
>
> npm audit fix ：自动安装所有易受攻击包的补丁版本
>
> npm root [-g] ：查看当前/全局包的安装路径。
>
> npm ls 包名 [-g] ：查看本地/全局安装的指定包及版本信息，没有显示 empty。
>
> npm info 包名 [description] ：获取包信息



## npm 设置代理

在使用npm安装包时发现npm并没有使用系统设置的代理，需要手动设置。

```sh
npm config set proxy=http://127.0.0.1:7897
```



## npx包运行器

`npx` 是一个非常强大的命令，从 **npm** 的 5.2 版本（发布于 2017 年 7 月）开始可用。

`npx` 可以运行使用 Node.js 构建并通过 npm 仓库发布的代码。

* 运行 `npx commandname` 会自动地在项目的 `node_modules` 文件夹中找到命令的正确引用，而无需知道确切的路径，也不需要在全局和用户路径中安装软件包。
  * `npx cowsay "你好"`
* `npx` 的另一个重要的特性是，**无需先安装命令即可运行命令。当被下载完，则下载的代码会被擦除。**
  * 运行 `vue` CLI 工具以创建新的应用程序并运行它们：`npx @vue/cli create my-vue-app`。
  * 使用 `create-react-app` 创建新的 `React` 应用：`npx create-react-app my-react-app`。
* 使用 @ 指定版本，可以使用不同的 Node.js 版本运行代码
  * `npx node@10 -v`  #v10.18.1  这有助于避免使用 `nvm` 之类的工具或其他 Node.js 版本管理工具。
* `npx` 并不限制使用 npm 仓库上发布的软件包，直接从 URL 运行任意代码片段
  * `npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32`
  * 当然，当运行不受控制的代码时，需要格外小心，因为强大的功能带来了巨大的责任。



```sh
# 报错，找不到 gulp 命令
gulp -v

# 成功，输入 gulp 版本号
npx gulp -v

# 让 npx 强制使用本地模块，不下载远程模块
npx --no-install http-server

# 让 npx 忽略使用本地模块，强制下载远程模块
npx --ignore-existing http-server

# 直接从一个代码仓库（如 GitHub、GitLab）下载一个模板或项目，而不包含其 Git 历史记录（.git 文件夹等）
# npx degit <github-user>/<repository>#<branch> <destination-directory>
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
```



## 安装 git 上发布的包

```sh
# 这样适合安装公司内部的 git 服务器上的项目
npm i git+https://git@github.com:DeveloperH/project.git

# 或者以 ssh 的方式
npm i git+ssh://git@github.com:DeveloperH/project.git
```

安装后，`package.json` 中的对应依赖包版本号会变成 git 地址的形式。



## cross-env 使用

`cross-env` 是运行跨平台设置和使用环境变量的脚本。

当你使用 `NODE_ENV=production` 来设置环境变量时，Windows 命令提示将会报错，因为它不支持这种设置方式。而 `cross-env` 能够提供一个设置环境变量的 script ，让你能够以 Unix 方式设置环境变量。



1. 安装 `npm i cross-env -D`

2. 使用

   ```json
   "scripts": {
     "build": "cross-env NODE_ENV=production demo.js"
   }
   ```

3. 获取 env 值

   ```js
   const node_env = process.env.NODE_ENV
   ```

   



## nrm

NRM (npm registry manager) 是 npm 的镜像源管理工具，可以快速的在 npm 源间切换。

```sh
npm i nrm -g

# 查看可选的源
nrm ls

# 切换源
nrm use 源名称

# 测试速度
nrm test

# 查看当前源
npm config get registry
```



## 常见问题

### npm i 时卡住

执行 `npm i` 时出现 `sill idealTree buildDeps` ，一直卡住不动。删除用户界面下的 `.npmrc` 文件即可。



## nvm

windows 版本：https://github.com/coreybutler/nvm-windows

mac 版本：https://github.com/nvm-sh/nvm

不同的项目可能对 Node.js 的版本要求不同，这时我门就需要切换不同版本的 Node.js。我们可以通过 Nvm 来管理Node.js 版本。

nvm（Node Version Manager）是一个用于管理 Node.js 版本的工具，它被设计成每个用户独立安装，并在每个终端会话中调用。



```sh
# 安装最新稳定版的 Node.js
nvm install stable

# 安装指定版本的 Node.js
nvm install 14.17.0

# 卸载指定的 Node.js 版本
nvm uninstall 14.17.0

# 切换 已安装的 Node.js 版本
nvm use 14.17.0
# 简写版本号进行切换，nvm 将自动选择符合的已安装版本
nvm use 14

# 列出已安装的所有版本
nvm ls
# or
nvm list

# 列出远程可用的所有版本
nvm ls-remote

# 设置默认 Node.js 版本
nvm alias default 14.17.0

# 在已安装的 Node.js 版本下运行命令 nvm exec <version> <command>
nvm exec 14.17.0 node -v

# 当前使用的 Node.js 版本下运行命令 nvm run <command>
nvm run node -v

# 查看可安装列表 (https://nodejs.org/en/about/previous-releases)
nvm list available
```



使用参考1：https://www.cnblogs.com/gaozejie/p/10689742.html

使用参考2：https://www.cnblogs.com/zhuyujie/p/12193123.html



### 出现没有安装npm问题

在 https://registry.npmmirror.com/binary.html?path=node/ 中下载对应的node版本的压缩包，然后解压到nvm目录中相应node版本文件夹中，替换掉原来目录下的node_modules文件夹即可。



# yarn

yarn 的优点：

* 安装速度快（并行下载）
* 版本锁定，安装版本统一
* 缓存机制，如果之前已经安装过一个软件包，用 yarn 再次安装时会从缓存中获取，就不用像 npm 那样再从网络下载了
* 输出简介并且多注册来源处理



```
npm i yarn -g
```



| npm                   | yarn                  |
| --------------------- | --------------------- |
| npm install           | yarn                  |
| npm install 模块名 -D | yarn add 模块名 --dev |
| npm install 模块名 -S | yarn add 模块名       |
| npm run serve         | yarn serve            |
| npm run build         | yarn build            |



# pnpm

[pnpm](https://pnpm.io/) 本质上就是一个包管理器，这一点跟 npm/yarn 没有区别，但它作为杀手锏的两个优势在于:

- 包安装速度极快；
- 磁盘空间利用非常高效。



```sh
# 安装 pnpm
npm i -g pnpm

pnpm init -y

pnpm install express
pnpm install axios -D
pnpm install axios -S

pnpm uninstall axios --filter package-a

pnpm run dev
pnpm run build
pnpm run ...

# 根据指定的范围将包更新到最新版本
pnpm update
```



# Node.js REPL(交互式解释器)

"读取-求值-输出"循环(英语：Read-Eval-Print Loop，简称REPL)，是一个简单的，交互式的编程环境。

Node的交互式解释器可以很好的调试JavaScript代码。

* 在命令行中使用`node`命令打开解释器
* 使用下划线`_`获取上一个表达式的运算结果 
* 详见：http://nodejs.cn/learn/how-to-use-the-nodejs-repl

```shell
> console.log('测试')
测试
undefined
>
```

第一个值 `测试` 是告诉控制台要打印的输出，然后得到 `undefined`，它是运行 `console.log()` 的返回值。



**点命令**：

REPL 有一些特殊的命令，所有这些命令都以点号 `.` 开头。它们是：

- `.help`: 显示点命令的帮助。
- `.editor`: 启用编辑器模式，可以轻松地编写多行 JavaScript 代码。当处于此模式时，按下 ctrl-D 可以运行编写的代码。
- `.break`: 当输入多行的表达式时，输入 `.break` 命令可以中止进一步的输入。相当于按下 ctrl-C。
- `.clear`: 将 REPL 上下文重置为空对象，并清除当前正在输入的任何多行的表达式。
- `.load`: 加载 JavaScript 文件（相对于当前工作目录）。
- `.save`: 将在 REPL 会话中输入的所有内容保存到文件（需指定文件名）。
- `.exit`: 退出 REPL（相当于按下两次 ctrl-C）。





# Node.js 回调函数

* Node.js 异步编程的直接体现就是回调。
* 异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了
* 回调函数在完成任务后就会被调用，Node使用了大量的回调函数，Node所有API都支持回调函数
* 回调函数一般作为函数的`最后一个参数`出现

```
function foo(value, callback){ }
```



## 处理回调中的错误

如何处理回调的错误？ 一种非常常见的策略是使用 Node.js 所采用的方式：任何回调函数中的第一个参数为错误对象（即错误优先的回调）。

如果没有错误，则该对象为 `null`。 如果有错误，则它会包含对该错误的描述以及其他信息。

```javascript
fs.readFile('/文件.json', (err, data) => {
  if (err !== null) {
    //处理错误
    console.log(err)
    return
  }

  //没有错误，则处理数据。
  console.log(data)
})
```





## 阻塞代码实例

```javascript
// 引入文件系统fs模块
var fs = require("fs");
// 读取文本内容并输出
var data = fs.readFileSync("book.txt");
console.log(data.toString());
console.log("程序结束");
```

## 非阻塞代码实例

```javascript
// 引入文件系统fs模块
var fs = require("fs");
// 读取文本内容，并调用回调函数
fs.readFile("book.txt", function(err, data){
    // 出现错误就打印错误信息并结束方法
    if(err){
        console.log(err.stack);
        return;
    }
    // 打印文本内容
    console.log(data.toString());
})
console.log("程序结束");

// 使用箭头函数
fs.readFile("book.txt", (err, data)=>{
    if(err){
        console.log(err.stack);
        return;
    }
    console.log(data.toString());
});
```

第一个实例在文件读取完后才执行程序。第二个实例不需要等待文件读取完，就可以在读取文件的同时执行接下来的代码，大大提高了程序的性能。



# Node.js 事件循环

* Node.js 是单进程单线程应用程序，但是因为V8引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高
* Node.js 几乎每一个API都是支持回调函数的
* Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现
* Node.js 单线程类型进入一个`while(true)`的事件循环，直到没有事件观察者退出。每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数



参考：http://nodejs.cn/learn/the-nodejs-event-loop

## 调用堆栈

**调用堆栈是一个LIFO队列（后进先出）。**

事件循环不断地检查调用堆栈，以查看是否需要运行任何函数。

当执行时，它会将找到的所有函数调用添加到调用堆栈中，并按顺序执行每个函数。

每次迭代中的事件循环都会查看调用堆栈中是否有东西并执行它直到调用堆栈为空。

```javascript
// 简单的事件循环
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  bar()
  baz()
}

foo()
```

执行结果：foo > bar > baz



## 消息队列

事件循环会赋予调用堆栈优先级，它首先处理在调用堆栈中找到的所有东西，一旦其中没有任何东西，便开始处理消息队列中的东西。

当调用 setTimeout() 时，浏览器或 Node.js 会启动定时器。 当定时器到期时（在此示例中会立即到期，因为将超时值设为 0），则回调函数会被放入“消息队列”中。

在消息队列中，用户触发的事件（如单击或键盘事件、或获取响应）也会在此排队，然后代码才有机会对其作出反应。 类似 `onLoad` 这样的 DOM 事件也如此。

```javascript
// 入队函数执行
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  // setTimeout(() => {}, 0) 的用例是调用一个函数，但是是在代码中的每个其他函数已被执行之后。
  setTimeout(bar, 0)
  baz()
}

foo()
```

执行结果：foo > baz > bar



## ES6作业队列

ECMAScript 2015 引入了作业队列的概念，Promise 使用了该队列（也在 ES6/ES2015 中引入）。 这种方式会尽快地执行异步函数的结果，而不是放在调用堆栈的末尾。

在当前函数结束之前 `resolve` 的 `Promise` 会在当前函数之后被立即执行。

有个游乐园中过山车的比喻很好：消息队列将你排在队列的后面（在所有其他人的后面），你不得不等待你的回合，而工作队列则是快速通道票，这样你就可以在完成上一次乘车后立即乘坐另一趟车。

```javascript
// ES6作业队列
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  new Promise((resolve, reject) =>
    resolve('应该在 baz 之后、bar 之前')
  ).then(resolve => console.log(resolve))
  baz()
}

foo()
```

执行结果：foo > baz > 应该在 baz 之后、bar 之前 > bar

这是 Promise（以及基于 promise 构建的 async/await）与通过 `setTimeout()` 或其他平台 API 的普通的旧异步函数之间的巨大区别。



## setImmediate()与 setTimeout(() => {}, 0)、process.nextTick()

当要异步地（但要尽可能快）执行某些代码时，有下面几种方式：

```javascript
setImmediate(() => {
  //运行一些东西
  //作为 setImmediate() 参数传入的任何函数都是在事件循环的下一个迭代中执行的回调。
})

setTimeout(() => {
  //运行一些东西
  //定时器结束后，被放入消息队列中，当调用堆栈全部执行完后，再在消息队列中排队执行
}, 0)

process.nextTick(()=>{
  //运行一些东西
  //当前事件循环结束后，下个事件循环开始前执行
  console.log("next tick")
})
```



`setImmediate()` 与 `setTimeout(() => {}, 0)`（传入 0 毫秒的超时）、`process.nextTick()` 有何不同？

传给 `process.nextTick()` 的函数会在事件循环的当前迭代中（当前操作结束之后）被执行。 这意味着它会始终在 `setTimeout` 和 `setImmediate` 之前执行。

延迟 0 毫秒的 `setTimeout()` 回调与 `setImmediate()` 非常相似。 执行顺序取决于各种因素，但是它们都会在事件循环的下一个迭代中运行。



## 事件驱动程序

Node.js使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

这个模型非常高效，可扩展性非常高，因为web server一直接受请求而不等待任何读写操作。

* 这也称之为非阻塞式IO 或者事件驱动IO

```javascript
// 引入 events模块
var events = require("events");
// 创建eventEmitter对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected(){
    console.log("连接成功");
    // 触发 data_received事件
    eventEmitter.emit("data_received");
};

// 绑定 connection事件处理程序
eventEmitter.on("connection", connectHandler);

// 使用匿名函数绑定 data_received事件
eventEmitter.on("data_received", function(){
    console.log("数据接收成功");
});

// 触发 connection事件
eventEmitter.emit("connection");

console.log("程序执行完毕");
```







# Node.js 模块系统

为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。

模块是Node.js应用程序的基本组成部分，文件和模块是一一对应的。一个Node.js文件就是一个模块，这个文件可能是JavaScript代码，JSON或者编译过的C/C++扩展。

## 创建模块

* `exports`对象- 模块公开的接口
* `require`对象- 用于从外部获取一个模块的接口，即获取模块的exports对象。
* 如果要对外暴露属性或方法，就用`exports`。如果要暴露对象或class，就用`module.exports`。

模块文件：mk01.js

```javascript
// 对外公开的方法
exports.hello = function(){
    console.log("hello function");
}
```

调用模块文件：

```javascript
// 引入自定义模块文件
var mk = require("./mk01");

// 调用模块中的方法
mk.hello();
```

****

对象封装到模块，模块文件：mk01.js

```javascript
function Student(){
    var name;
    this.setName = function(str){
        name = str;
    };
    this.sayHi = function(){
        console.log("Hi "+name);
    }
}
// 对外暴露对象
module.exports = Student;
```

调用模块文件：

```javascript
// 引入自定义模块
var Student = require("./mk01");
// 实例化对象，并调用对象中的方法
xm = new Student();
xm.setName("xiaoming");
xm.sayHi();
```



```js
// 导出
function testModule() {
    console.log('exports');
}

let name = 'zs';

module.exports = {
  	testModule,
 		name
}


// 导入
const {testModule, name} = require('./MyModule');
testModule();
console.log(name)
```





# 内置模块

## url

 url 模块提供了用于 URL 解析和解析的实用程序。



* `URL.parse(input[, base])` ：将字符串解析为 URL。如果提供了 `base`，则它将用作基本 URL，用于解析非绝对 URL。如果参数无法解析为有效的网址则返回 `null` 。
  * input：要解析的绝对或相对输入 URL。如果 URL 是相对的，那么 base 是必需的。如果URL是绝对的，则 base 被忽略。如果 input 不是字符串，则首先将其转换为字符串 。
  * base：基本 URL。



```js
const url = require('url')
const urlStr = "https://www.baidu.com/path/index.html?a=1"
console.log(url.parse(urlStr))
```





## http模块

### 第一个Web服务器示例

* 每当接收到新的请求时，request 事件会被调用，并提供两个对象：
  * 一个请求（`http.IncomingMessage` 对象）和一个响应（`http.ServerResponse` 对象）
  * 第一个对象提供了请求的详细信息。第二个对象用于返回数据给调用方。

```javascript
// 引入了 Node.js http 模块
const http = require('http')

// 配置要监听的主机名和端口号
const hostname = '127.0.0.1'
const port = 8080

// http 的 createServer() 方法会创建新的 HTTP 服务器并返回它
// 每当接收到新的请求时，request 事件会被调用，并提供两个对象：
// 一个请求（http.IncomingMessage 对象）和一个响应（http.ServerResponse 对象）
// 第一个对象提供了请求的详细信息。第二个对象用于返回数据给调用方。
const server = http.createServer((req, res) => {
  	// 获取请求地址
  	let url = req.url
    // 设置 statusCode 属性为 200，以表明响应成功
    res.statusCode = 200
    // 设置 Content-Type 响应头
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    // 关闭响应，添加内容作为 end() 的参数
    res.end('你好Nodejs')
})

// 服务器被设置为监听指定的端口和主机名。 当服务器就绪后，回调函数会被调用，在此示例中会通知我们服务器正在运行
server.listen(port, hostname, () =>{
    console.log(`服务器运行在http://${hostname}:${port}`)
})
```



### 发送HTTP请求

* 执行GET请求
* 执行POST请求
* PUT和DELETE请求
  * 使用相同的 POST 请求格式，只需更改 `options.method` 的值即可。
* 使用Node.js执行HTTP请求的最简单方式是使用第三方库，`Axios`库。

```javascript
//GET请求
const https = require('https')
const options = {
    hostname: 'www.baidu.com',
    port: 443,
    method: 'GET'
}

const req = https.request(options, res => {
    console.log(`状态码：${res.statusCode}`)

  	let data = ''
    res.on('data', (chunk) => {
      	data += chunk
        process.stdout.write(chunk)
    })
  
    res.on('end', () => {
        console.log('接收完毕')
    })
})

req.on('error', error => {
    console.log(error)
})

req.end()
```

```javascript
//POST请求
//因为POST传值为一段段的，所以服务器端获取到后需要将所有的data串联起来。
//在服务器端使用req.on('data')和req.on('end')监听数据的传输。
const https = require('https')

const data = JSON.stringify({
    todo: '做点事情'
})

const options = {
    hostname: 'www.baidu.com',
    port: 443,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, res => {
    console.log(`状态码：${res.statusCode}`)

  	let data = ''
    res.on('data', (chunk) => {
      	data += chunk
        process.stdout.write(chunk)
    })
  
    res.on('end', () => {
        console.log('接收完毕')
    })
})

req.on('error', error => {
    console.log(error)
})

req.write(data)
req.end()
```



### 属性、方法和类

* 属性
  * `http.METHODS`: 列出了所有支持的 HTTP 方法
  * `http.STATUS_CODES`: 列出了所有的 HTTP 状态代码及其描述
  * `http.globalAgent`: 指向 Agent 对象的全局实例，该实例是 `http.Agent` 类的实例。用于管理 HTTP 客户端连接的持久性和复用，它是 Node.js HTTP 网络的关键组件。
* 方法
  * `http.createServer()`: 创建服务器，返回 `http.Server` 类的新实例
  * `http.request()`: 发送 HTTP 请求到服务器，并创建 `http.ClientRequest` 类的实例。
  * `http.get()`: 类似于 `http.request()`，但会自动地设置 HTTP 方法为 GET，并自动地调用 `req.end()`。
* 类
  * `http.Agent`: 
  * `http.ClientRequest`: 
  * `http.Server`: 
  * `http.ServerResponse`: 
  * `http.IncomingMessage`: 

```javascript
const http = require('http')

//列出了所有支持的 HTTP 方法
http.METHODS

//列出了所有的 HTTP 状态代码及其描述
http.STATUS_CODES

//指向 Agent 对象的全局实例，该实例是 http.Agent 类的实例。
//用于管理 HTTP 客户端连接的持久性和复用，它是 Node.js HTTP 网络的关键组件。
http.globalAgent

//创建服务器，返回 http.Server 类的新实例
const server = http.createServer((req, res) => {
    //使用此回调处理每个单独的请求。
})


//发送 HTTP 请求到服务器，并创建 http.ClientRequest 类的实例。
const req = http.request('http://www.baidu.com', res =>{
    res.on('data', d => {
        console.log(d.toString())
    })
})
req.end()


//类似于 http.request()，但会自动地设置 HTTP 方法为 GET，并自动地调用 req.end()。
const req2 = http.get('http://www.baidu.com', res => {
    res.on('data', d => {
        console.log(d)
    })
})
```



#### **`http.Agent`**

Node.js 会创建 `http.Agent` 类的全局实例，以管理 HTTP 客户端连接的持久性和复用，这是 Node.js HTTP 网络的关键组成部分。

该对象会确保对服务器的每个请求进行排队并且单个 socket 被复用。

它还维护一个 socket 池。 出于性能原因，这是关键。



#### **`http.ClientRequest`**

当 `http.request()` 或 `http.get()` 被调用时，会创建 `http.ClientRequest` 对象。

当响应被接收时，则会使用响应（`http.IncomingMessage` 实例作为参数）来调用 `response` 事件。

返回的响应数据可以通过以下两种方式读取：

- 可以调用 `response.read()` 方法。
- 在 `response` 事件处理函数中，可以为 `data` 事件设置事件监听器，以便可以监听流入的数据。



#### **`http.Server`**

当使用 `http.createServer()` 创建新的服务器时，通常会实例化并返回此类。

拥有服务器对象后，就可以访问其方法：

- `close()` 停止服务器不再接受新的连接。
- `listen()` 启动 HTTP 服务器并监听连接。



#### **`http.ServerResponse`**

由 `http.Server` 创建，并作为第二个参数传给它触发的 `request` 事件。

通常在代码中用作 `res`：

```javascript
const server = http.createServer((req, res) => {
  //res 是一个 http.ServerResponse 对象。
})
```

在事件处理函数中总是会调用的方法是 `end()`，它会关闭响应，当消息完成时则服务器可以将其发送给客户端。 必须在每个响应上调用它。

以下这些方法用于与 HTTP 消息头进行交互：

- `getHeaderNames()` 获取已设置的 HTTP 消息头名称的列表。
- `getHeaders()` 获取已设置的 HTTP 消息头的副本。
- `setHeader('headername', value)` 设置 HTTP 消息头的值。
- `getHeader('headername')` 获取已设置的 HTTP 消息头。
- `removeHeader('headername')` 删除已设置的 HTTP 消息头。
- `hasHeader('headername')` 如果响应已设置该消息头，则返回 true。
- `headersSent()` 如果消息头已被发送给客户端，则返回 true。

在处理消息头之后，可以通过调用 `response.writeHead()`（该方法接受 statusCode 作为第一个参数，可选的状态消息和消息头对象）将它们发送给客户端。

若要在响应正文中发送数据给客户端，则使用 `write()`。 它会发送缓冲的数据到 HTTP 响应流。

如果消息头还未被发送，则使用 `response.writeHead()` 会先发送消息头，其中包含在请求中已被设置的状态码和消息，可以通过设置 `statusCode` 和 `statusMessage` 属性的值进行编辑：

```javascript
response.statusCode = 500
response.statusMessage = '内部服务器错误'
```





#### **`http.IncomingMessage`**

`http.IncomingMessage` 对象可通过以下方式创建：

- `http.Server`，当监听 `request` 事件时。
- `http.ClientRequest`，当监听 `response` 事件时。

它可以用来访问响应：

- 使用 `statusCode` 和 `statusMessage` 方法来访问状态。
- 使用 `headers` 方法或 `rawHeaders` 来访问消息头。
- 使用 `method` 方法来访问 HTTP 方法。
- 使用 `httpVersion` 方法来访问 HTTP 版本。
- 使用 `url` 方法来访问 URL。
- 使用 `socket` 方法来访问底层的 socket。

因为 `http.IncomingMessage` 实现了可读流接口，因此数据可以使用流访问。







## fs文件系统模块

`fs` 模块提供了许多非常实用的函数来访问文件系统并与文件系统进行交互。

### fs中的方法

- `fs.access()`: 检查文件是否存在，以及 Node.js 是否有权限访问。
- `fs.appendFile()`: 追加数据到文件。如果文件不存在，则创建文件。
- `fs.chmod()`: 更改文件（通过传入的文件名指定）的权限。相关方法：`fs.lchmod()`、`fs.fchmod()`。
- `fs.chown()`: 更改文件（通过传入的文件名指定）的所有者和群组。相关方法：`fs.fchown()`、`fs.lchown()`。
- `fs.close()`: 关闭文件描述符。
- `fs.copyFile()`: 拷贝文件。
- `fs.createReadStream()`: 创建可读的文件流。
- `fs.createWriteStream()`: 创建可写的文件流。
- `fs.link()`: 新建指向文件的硬链接。
- `fs.mkdir()`: 新建文件夹。
- `fs.mkdtemp()`: 创建临时目录。
- `fs.open()`: 设置文件模式。
- `fs.readdir()`: 读取目录的内容。
- `fs.readFile()`: 读取文件的内容。相关方法：`fs.read()`。
- `fs.readlink()`: 读取符号链接的值。
- `fs.realpath()`: 将相对的文件路径指针（`.`、`..`）解析为完整的路径。
- `fs.rename()`: 重命名文件或文件夹。
- `fs.rmdir()`: 删除文件夹。
- `fs.stat()`: 返回文件（通过传入的文件名指定）的状态。相关方法：`fs.fstat()`、`fs.lstat()`。
- `fs.symlink()`: 新建文件的符号链接。
- `fs.truncate()`: 将传递的文件名标识的文件截断为指定的长度。相关方法：`fs.ftruncate()`。
- `fs.unlink()`: 删除文件或符号链接。
- `fs.unwatchFile()`: 停止监视文件上的更改。
- `fs.utimes()`: 更改文件（通过传入的文件名指定）的时间戳。相关方法：`fs.futimes()`。
- `fs.watchFile()`: 开始监视文件上的更改。相关方法：`fs.watch()`。
- `fs.writeFile()`: 将数据写入文件。相关方法：`fs.write()`。



关于 `fs` 模块的特殊之处是，所有的方法默认情况下都是异步的，但是通过在前面加上 `Sync` 也可以同步地工作。

- `fs.rename()`
- `fs.renameSync()`





### 文件描述符 open()

在与位于文件系统中的文件进行交互之前，需要先获取文件的描述符。

文件描述符是使用 `fs` 模块提供的 `open()` 方法打开文件后返回的：

每个打开的文件都分配了一个称为文件描述符的简单的数字标识符

```javascript
const fs = require('fs')

fs.open('./book.txt', 'r', (err, fd) => {
    //fd 是文件描述符
    console.log(fd)
})

// 同步方式
try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r')
} catch (err) {
  console.error(err)
}
```

注意，将 `r` 作为 `fs.open()` 调用的第二个参数。

该标志意味着打开文件用于读取。

其他常用的标志有：

- `r+` 打开文件用于读写。
- `w+` 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
- `a` 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
- `a+` 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。

也可以使用 `fs.openSync` 方法打开文件，该方法会返回文件描述符（而不是在回调中提供）



### 文件属性 stat()

每个文件都带有一组详细信息，可以使用 Node.js 进行检查。

具体地说，使用 `fs` 模块提供的 `stat()` 方法。

调用时传入文件的路径，一旦 Node.js 获得文件的详细信息，则会调用传入的回调函数，并带上两个参数：错误消息和文件属性：

```javascript
const fs = require('fs')
fs.stat('./book.txt', (err, stats) => {
    if (err) {
        console.log(err)
        return
    }

    // 文件的信息包含在属性变量中
    stats.isFile()  //true
    stats.isDirectory() //false
    stats.isSymbolicLink()  //false
    stats.size  //1024000 //=1MB
})

//同步方式
try {
  const stats = fs.statSync('/Users/joe/test.txt')
} catch (err) {
  console.error(err)
}
```

文件的信息包含在属性变量中。 可以通过属性提取哪些信息？

- 使用 `stats.isFile()` 和 `stats.isDirectory()` 判断文件是否目录或文件。
- 使用 `stats.isSymbolicLink()` 判断文件是否符号链接。
- 使用 `stats.size` 获取文件的大小（以字节为单位）。

还有其他一些高级的方法，但是在日常编程中会使用的大部分是这些。



### 读取和写入文件

在 Node.js 中读取文件最简单的方式是使用 `fs.readFile()` 方法，向其传入文件路径、编码、以及会带上文件数据（以及错误）进行调用的回调函数。

`fs.readFile()` 和 `fs.readFileSync()` 都会在返回数据之前将文件的全部内容读取到内存中。

这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。

在这种情况下，更好的选择是使用流来读取文件的内容。

```javascript
const fs = require('fs')

fs.readFile('./book.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(data)
})

//同步版本
try {
    const data = fs.readFileSync('./book.txt', 'utf8')
    console.log(data)
} catch (err) {
    console.log(err)
}
```

```javascript
const fs = require('fs')

const content = '一些内容'

fs.writeFile('./test.txt', content, err => {
    if (err) {
        console.log(err)
        return
    }
    //文件写入成功
    console.log('文件写入成功')
})

//同步版本
try {
    const data = fs.writeFileSync('./test.txt', content)
    //文件写入成功
    console.log('文件写入成功')
} catch (err) {
    console.log(err)
}
```

默认情况下，此 API 会替换文件的内容（如果文件已经存在）。可以通过指定标志来修改默认的行为：

```javascript
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {})
```

可能会使用的标志有：

- `r+` 打开文件用于读写。
- `w+` 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
- `a` 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
- `a+` 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。



**追加到文件**

将内容追加到文件末尾的便捷方法是 `fs.appendFile()`（及其对应的 `fs.appendFileSync()`）：

```javascript
const content = '一些内容'

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //完成！
})
```



### 文件夹操作

Node.js 的 `fs` 核心模块提供了许多便捷的方法用于处理文件夹。

* 检查文件夹是否存在以及 Node.js 是否具有访问权限，使用 `fs.access()`
* 创建新的文件夹，使用 `fs.mkdir()` 或 `fs.mkdirSync()`
* 读取目录的内容，使用 `fs.readdir()` 或 `fs.readdirSync()`
* 重命名文件夹，使用 `fs.rename()` 或 `fs.renameSync()`， 第一个参数是当前的路径，第二个参数是新的路径
* 删除文件夹，使用 `fs.rmdir()` 或 `fs.rmdirSync()` 
  * 当文件夹不为空时，会报错：`directory not empty`
  * 删除包含内容的文件夹可能会更复杂。在这种情况下，最好安装 [`fs-extra`](https://www.npmjs.com/package/fs-extra) 模块，该模块非常受欢迎且维护良好。 它是 `fs` 模块的直接替代品，在其之上提供了更多的功能。

```javascript
const fs = require('fs')
const path = require('path')

const folderName = './test'

// 检查文件夹是否存在以及 Node.js 是否具有访问权限。
fs.access(folderName, (err) => {
    console.log(`${folderName} ${err? '不存在':'存在'}`)
})

// 创建新的文件夹
fs.mkdir(folderName, (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("文件夹创建成功")
})

// 读取目录的内容
fs.readdir('./', (err, files) => {
    if(err){
        console.log(err)
        return
    }
    console.log(files)
})

// 获取完整的路径
var files = fs.readdirSync('./').map(fileName => {
    return path.resolve('./', fileName)
})
console.log(files)

// 重命名文件夹
fs.rename('./test', './SuperTest', err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('重命名成功')
})

//删除文件夹
fs.rmdir('./SuperTest', err => {
    if(err){
        console.error(err)
        return
    }
    console.log('文件夹删除成功')
})
```



### fs-extra模块 删除文件夹

当一个文件夹中包含内容时，使用fs模块的`rmdir()`无法删除，这时可以用`fs-extra`模块来删除该文件夹。

首先需要：`npm install fs-extra`

```javascript
const fs = require('fs-extra')

const folder = './SuperTest'

// 删除文件夹（不为空的文件夹也可以删除）
fs.remove(folder, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('文件夹删除成功')
})


// 也可以与 promise 一起使用
fs.remove(folder)
  .then(() => {
    //完成
  })
  .catch(err => {
    console.error(err)
  })

  
//或使用 async/await
async function removeFolder(folder) {
    try {
      await fs.remove(folder)
      //完成
    } catch (err) {
      console.error(err)
    }
}
  
const folder = '/Users/joe'
removeFolder(folder)
```







## path路径模块

系统中的每个文件都有路径。`path` 模块提供了许多非常实用的函数来访问文件系统并与文件系统进行交互。

Linux 和 macOS 上，路径可能类似于：`/users/joe/file.txt`

在 Windows 上则有所不同，具有类似以下的结构：`C:\users\joe\file.txt`

当在应用程序中使用路径时需要注意，因为必须考虑到这种差异。

该模块提供了 `path.sep`（作为路径段分隔符，在 Windows 上是 `\`，在 Linux/macOS 上是 `/`）和 `path.delimiter`（作为路径定界符，在 Windows 上是 `;`，在 Linux/macOS 上是 `:`）。



### path中的方法

* `path.basename()`: 返回路径的最后一部分。 第二个参数可以过滤掉文件的扩展名
* `path.dirname()`: 返回路径的目录部分
* `path.extname()`: 返回路径的扩展名部分
* `path.isAbsolute()`: 如果是绝对路径，则返回 true。
* `path.join()`: 连接路径的两个或多个部分
* `path.normalize()`: 当包含类似 `.`、`..` 或双斜杠等相对的说明符时，则尝试计算实际的路径
* `path.parse()`: 解析对象的路径为组成其的片段
  * `root`: 根路径。
  * `dir`: 从根路径开始的文件夹路径。
  * `base`: 文件名 + 扩展名
  * `name`: 文件名
  * `ext`: 文件扩展名
* `path.relative()`: 接受 2 个路径作为参数。 基于当前工作目录，返回从第一个路径到第二个路径的相对路径。
* `path.resolve()`: 获得相对路径的绝对路径计算
  * 通过指定第二个参数，`resolve` 会使用第一个参数作为第二个参数的基准
  * 如果第一个参数以斜杠开头，则表示它是绝对路径



### 文件属性

```javascript
const path = require('path')

const notes = '/users/joe/notes.txt'

path.dirname(notes)     // /users/joe
path.basename(notes)    // notes.txt
path.extname(notes)     // .txt

// 可以通过为 basename 指定第二个参数来获取不带扩展名的文件名：
path.basename(notes, path.extname(notes)) //notes
require('path').basename('/test/something.txt', '.txt') //something
```

给定一个路径，可以使用以下方法从其中提取信息：

- `dirname`: 获取文件的父文件夹。
- `basename`: 获取文件名部分。
- `extname`: 获取文件的扩展名。



### 使用路径

```javascript
//可以使用 path.join() 连接路径的两个或多个片段
const name = 'joe'
path.join('/', 'users', name, 'notes.txt') //'/users/joe/notes.txt'

//可以使用 path.resolve() 获得相对路径的绝对路径计算：
path.resolve('joe.txt') //'/Users/joe/joe.txt' 如果从主文件夹运行。

path.resolve(__dirname) // 当前执行文件的路径

//如果指定第二个文件夹参数，则 resolve 会使用第一个作为第二个的基础：
path.resolve('tmp', 'joe.txt') //'/Users/joe/tmp/joe.txt' 如果从主文件夹运行。

//如果第一个参数以斜杠开头，则表示它是绝对路径：
path.resolve('/etc', 'joe.txt') //'/etc/joe.txt'

//path.normalize() 是另一个有用的函数，当包含诸如 .、.. 或双斜杠之类的相对说明符时，其会尝试计算实际的路径
path.normalize('/users/joe/..//test.txt') //'/users/test.txt'

//接受 2 个路径作为参数。 基于当前工作目录，返回从第一个路径到第二个路径的相对路径。
path.relative('/Users/joe', '/Users/joe/test.txt') //'test.txt'
path.relative('/Users/joe', '/Users/joe/something/test.txt') //'something/test.txt'


// 如果是绝对路径，则返回 true。
path.isAbsolute('./test/books') //false
path.isAbsolute('/test/books')  //true

```



### 解析对象的路径

```javascript
// 解析对象的路径
const pathObj = path.parse('/app/test/js/server.js')
console.log(pathObj)

结果是：
{
  root: '/',
  dir: '/app/test/js',
  base: 'server.js',
  ext: '.js',
  name: 'server'
}
```





## process模块

### process.nextTick()

当尝试了解 Node.js 事件循环时，其中一个重要的部分就是 `process.nextTick()`。

每当事件循环进行一次完整的行程时，我们都将其称为一个滴答。

当将一个函数传给 `process.nextTick()` 时，则指示引擎在当前操作结束（在下一个事件循环滴答开始之前）时调用此函数：

```javascript
// process.nextTick()
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  // setTimeout(() => {}, 0) 的用例是调用一个函数，但是是在代码中的每个其他函数已被执行之后。
  setTimeout(bar, 0)
  baz()
}
foo()

process.nextTick(()=>{
  console.log("next tick")
})
```

执行结果：foo > baz > next tick > bar

事件循环正在忙于处理当前的函数代码。

当该操作结束时，JS 引擎会运行在该操作期间传给 `nextTick` 调用的所有函数。

这是可以告诉 JS 引擎异步地（在当前函数之后）处理函数的方式，但是尽快执行而不是将其排入队列。

**当要确保在下一个事件循环迭代中代码已被执行，则使用 `nextTick()`。**

参考：http://nodejs.cn/learn/understanding-process-nexttick



### env环境变量属性

如何从 Node.js 读取环境变量？

Node.js 的 `process` 核心模块提供了 `env` 属性，该属性承载了在启动进程时设置的所有环境变量。

这是访问 NODE_ENV 环境变量的示例，该环境变量默认情况下被设置为 development。

> 注意：`process` 不需要 "require"，它是自动可用的。

```javascript
process.env.NODE_ENV // "development"
```

在脚本运行之前将其设置为 "production"，则可告诉 Node.js 这是生产环境。

可以用相同的方式访问设置的任何自定义的环境变量。



### 如何从 Node.js 程序退出

`process` 核心模块提供了一种便利的方法，可以以编程的方式退出 Node.js 程序：`process.exit()`。

当 Node.js 运行此行代码时，进程会被立即强制终止。

这意味着任何待处理的回调、仍在发送中的任何网络请求、任何文件系统访问、或正在写入 `stdout` 或 `stderr` 的进程，所有这些都会被立即非正常地终止。

```javascript
// 可以传入一个整数，向操作系统发送退出码
process.exit(1)
```

默认情况下，退出码为 0，表示成功。 不同的退出码具有不同的含义，可以在系统中用于程序与其他程序的通信。

有关退出码的信息，详见 http://nodejs.cn/api/process.html#process_exit_codes



也可以设置 `process.exitCode` 属性：

```javascript
process.exitCode = 1
```

当程序结束时，Node.js 会返回该退出码。

当进程完成所有处理后，程序会正常地退出。



通过发送SIGTERM信号方式进行处理程序的结束

```javascript
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('你好')
})

const server = app.listen(3000, () => console.log('服务器已就绪'))

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('进程已终止')
  })
})
```

> 在这种情况下，需要向该命令发送 SIGTERM 信号，并使用进程的信号处理程序进行处理：
>
> 什么是信号？信号是一个 POSIX 内部通信系统：发送通知给进程，以告知其发生的事件。

`SIGKILL` 是告诉进程要立即终止的信号，理想情况下，其行为类似于 `process.exit()`。

`SIGTERM` 是告诉进程要正常终止的信号。它是从进程管理者（如 `upstart` 或 `supervisord`）等发出的信号。



### Node.js 从命令行接收参数 process.argv属性

获取参数值的方法是使用 Node.js 中内置的 `process` 对象。

它公开了 `argv` 属性，该属性是一个包含所有命令行调用参数的数组。

* 详见：http://nodejs.cn/learn/nodejs-accept-arguments-from-the-command-line



```js
console.log(process.argv)
console.log(process.argv.slice(2)) // [ 'aaa', 'bbb' ]
```

```sh
node index.js aaa bbb
```





## console控制台模块

入门详见：http://nodejs.cn/learn/output-to-the-command-line-using-nodejs



## readline逐行读取模块

在 Node.js 中从命令行接收输入

入门详见：http://nodejs.cn/learn/accept-input-from-the-command-line-in-nodejs





## events事件模块

在后端，Node.js提供了使用`events`模块来用于处理事件。

具体上，该模块提供了`EventEmitter`类用于处理事件。



Node.js 所有的异步I/O操作在完成时都会发送一个事件到事件队列。

Node.js 里面的许多对象都会分发事件：

* 一个net.Server对象会在每次有新连接时触发一个事件
* 一个fs.readStream对象会在一个文件被打开时触发一个事件

这些所有产生事件的对象都是`events.EventEmitter`的实例。



该对象公开了`on`和`emit`方法。

* `emit`用于触发事件
* `on`用于添加回调函数（会在事件被触发时执行）

事件监听器返回及使用以下事件：

- 当监听器被添加时返回 `newListener`。
- 当监听器被移除时返回 `removeListener`。

```javascript
//引入events模块，并创建eventEmitter对象
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

//on方法用于添加回调函数，也就是绑定事件
eventEmitter.on('start', () => {
    console.log('开始')
})

//emit方法用于触发事件
eventEmitter.emit('start')
```



可以通过将参数作为额外参数传给`emit()`来将参数传给事件处理程序。参数也可以是多个。

```javascript
// 传递参数
eventEmitter.on('start', number => {
    console.log(`开始 ${number}`)
})
eventEmitter.emit('start', 22)

// 传递多个参数
eventEmitter.on('start', (start, end) => {
    console.log(`从 ${start} 到 ${end}`)
})
eventEmitter.emit('start', 1, 100)
```



EventEmitter 对象还公开了其他几个与事件进行交互的方法，例如：

- `once()`: 添加单次监听器。
- `removeListener()` / `off()`: 从事件中移除事件监听器。
- `removeAllListeners()`: 移除事件的所有监听器。



### 常用方法

* `emitter.addListener()`: `emitter.on()` 的别名。
* `emitter.emit()`: 触发事件。 按照事件被注册的顺序同步地调用每个事件监听器。
* `emitter.eventNames()`: 返回字符串（表示在当前 `EventEmitter` 对象上注册的事件）数组：
  * 注意：不包括在`once()`中添加的事件
* `emitter.getMaxListeners()`: 获取可以添加到 `EventEmitter` 对象的监听器的最大数量（默认为 10，但可以使用 `setMaxListeners()` 进行增加或减少）。
* `emitter.listenerCount()`: 获取作为参数传入的事件监听器的计数，也就是相同`on('eventStr')`的次数
* `emitter.listeners()`: 获取作为参数传入的事件监听器的数组，也就是传入的事件回调方法
* `emitter.on()`: 添加当事件被触发时调用的回调函数。
* `emitter.once()`: 添加当事件在注册之后首次被触发时调用的回调函数。 该回调只会被调用一次，不会再被调用。
* `emitter.prependListener()`: 当使用 `on` 或 `addListener` 添加监听器时，监听器会被添加到监听器队列中的最后一个，并且最后一个被调用。 使用 `prependListener` 则可以在其他监听器之前添加并调用。
* `emitter.prependOnceListener()`: 当使用 `once` 添加监听器时，监听器会被添加到监听器队列中的最后一个，并且最后一个被调用。 使用 `prependOnceListener` 则可以在其他监听器之前添加并调用。
* `emitter.removeAllListeners()`: 移除 `EventEmitter` 对象的所有监听特定事件的监听器：
* `emitter.removeListener()`: 移除特定的监听器。从名为 `eventName` 的事件的监听器数组中移除指定的 `listener`。 可以通过将回调函数保存到变量中（当添加时），以便以后可以引用它：
* `emitter.off()`: `emitter.removeListener()` 的别名，新增于 Node.js 10。
  * `removeListener()` 最多只会从监听器数组中移除一个监听器。 如果监听器被多次添加到指定 `eventName` 的监听器数组中，则必须多次调用 `removeListener()` 才能移除所有实例。
  * 移除监听器时，不仅监听器的名字相同，回调的方法也要相同（推荐将回调函数保存在变量中），当移除的是匿名函数时，会发生移除失效。
  * 一旦事件被触发，所有绑定到该事件的监听器都会按顺序依次调用。 这意味着，在事件触发之后、且最后一个监听器执行完成之前， `removeListener()` 或 `removeAllListeners()` 不会从 `emit()` 中移除它们。 后续事件的行为符合预期。
  * 详见：http://nodejs.cn/api/events.html#events_emitter_removelistener_eventname_listener

* `emitter.setMaxListeners()`: 设置可以添加到 `EventEmitter` 对象的监听器的最大数量（默认为 10，但可以增加或减少）。



**移除监听器方法的注意事项**：

如果要移除的监听器的回调函数是匿名函数时，off()或removeListener()可能会发生移除失效（移除后还能触发），这时，需要使用`removeAllListener()`全部移除。

发生这种情况的原因可能是，移除时无法从`eventName`的监听器数组中移除掉匿名函数。

总结：`off()`和`removeListener()`都无法移除参数是匿名函数的监听器。



### EventEmitter类

events模块只提供了一个对象：`events.EventEmitter`。EventEmitter的核心就是事件触发与事件监听器功能的封装。

* 单事件监听
* 多事件监听
  * 对于每个事件，EventEmitter 支持若干个事件监听器
  * 当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递

```javascript
// 引入events事件模块
var events = require("events");
// 创建EventEmitter对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
eventEmitter.on("myClick",function(){
    console.log("myClick事件触发了");
});

// 多事件监听触发
eventEmitter.on("myClick",function(){
    console.log("myClick多事件监听触发了")
});

// 创建带参数的事件处理程序
eventEmitter.on("showClick",function(str){
    console.log("showClick事件触发了："+str);
});

// 触发指定事件
eventEmitter.emit("myClick");
eventEmitter.emit("showClick","devh");
console.log("程序结束");
```



### TODO方法-事件-继承等











## stream流模块

**什么是流？**

Stream是一个抽象接口，流是为 Node.js 应用程序提供动力的基本概念之一。

Node中有很多对象实现了这个接口。例如，对http服务器发起请求的request对象就是一个Stream，还有stdout(标准输出)。

它们是一种以高效的方式处理读/写文件、网络通信、或任何类型的端到端的信息交换。

例如，在传统的方式中，当告诉程序读取文件时，这会将文件从头到尾读入内存，然后进行处理。

使用流，则可以逐个片段地读取并处理（而无需全部保存在内存中）。

Node.js 的 `stream` 模块 提供了构建所有流 API 的基础。 所有的流都是 `EventEmitter` 的实例。



所有的Stream对象都是EventEmitter的实例。常用的事件有：

* `data`- 当有数据可读时触发
* `end`- 没有更多数据可读时触发
* `error`- 在接收和写入过程中发生错误时触发
* `finish`- 所有数据已被写入到底层系统时触发



相对于使用其他的数据处理方法，流基本上提供了两个主要优点：

- **内存效率**: 无需加载大量的数据到内存中即可进行处理。
- **时间效率**: 当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始。

```javascript
//一个典型的例子是从磁盘读取文件
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + '/data.txt')
  stream.pipe(res)
})
server.listen(3000)
```



Node.js 中，Stream有四种流类型：

* `Readable`- 可读操作。 可以通过管道读取、但不能通过管道写入的流（可以接收数据，但不能向其发送数据）。 当推送数据到可读流中时，会对其进行缓冲，直到使用者开始读取数据为止。
* `Writable`- 可写操作。可以通过管道写入、但不能通过管道读取的流（可以发送数据，但不能从中接收数据）。
* `Duplex`- 可读可写操作。可以通过管道写入和读取的流，基本上相对于是可读流和可写流的组合。
* `Transform`- 操作被写入数据，然后读出数据。类似于双工流、但其输出是其输入的转换的转换流。



未完：http://nodejs.cn/learn/nodejs-streams



### 常用事件示例

#### 从流中读取数据

```javascript
// 引入fs文件系统模块
var fs = require("fs");
var content = "";

// 创建可读流
var readerStream = fs.createReadStream("book.txt");

// 设置编码为utf8
readerStream.setEncoding("utf8");

// 处理流事件--> data, end, error
readerStream.on("data", function(data){
    content += data;
});

readerStream.on("end",function(){
    console.log(content);
});

readerStream.on("error",function(err){
    console.log(err.stack);
});
```

#### 写入流

```javascript
var fs = require("fs");
var content = "devh开发者 https://www.huangyihui.cn";

// 创建可写流
var writerStream = fs.createWriteStream("output.txt");

// 写入内容，并设置编码为utf8
writerStream.write(content, "utf8");
writerStream.end();

// 处理流事件--> finish, error
writerStream.on("finish", function(){
    console.log("写入完毕");
});

writerStream.on("error", function(err){
    console.log(err.stack);
})

console.log("程序执行完毕");
```



### 管道流pipe()

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递给另一个流中。

可以简单理解为文件的复制过程。

```javascript
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream("book.txt");
// 创建一个可写流
var writerStream = fs.createWriteStream("output.txt");

// 管道读写操作，读取book.txt的文件内容，并将内容写入到output.txt文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```



### 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。

链式流一般用于管道操作。

例如：用管道和链式来压缩和解压文件。

```javascript
// 引入fs、zlib模块
var fs = require("fs");
var zlib = require("zlib");

// 通过管道流压缩文件
fs.createReadStream("book.txt")
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream("book.txt.gz"));
console.log("文件压缩成功");

// 通过管道流解压文件
fs.createReadStream("book.txt.gz")
.pipe(zlib.createGunzip())
.pipe(fs.createWriteStream("jieya.txt"));
console.log("文件解压成功");
```







### 流驱动的Node.js API

由于它们的优点，许多 Node.js 核心模块提供了原生的流处理功能，最值得注意的有：

- `process.stdin` 返回连接到 stdin 的流。
- `process.stdout` 返回连接到 stdout 的流。
- `process.stderr` 返回连接到 stderr 的流。
- `fs.createReadStream()` 创建文件的可读流。
- `fs.createWriteStream()` 创建到文件的可写流。
- `net.connect()` 启动基于流的连接。
- `http.request()` 返回 http.ClientRequest 类的实例，该实例是可写流。
- `zlib.createGzip()` 使用 gzip（压缩算法）将数据压缩到流中。
- `zlib.createGunzip()` 解压缩 gzip 流。
- `zlib.createDeflate()` 使用 deflate（压缩算法）将数据压缩到流中。
- `zlib.createInflate()` 解压缩 deflate 流。



### 从stream模块创建流

```javascript
// 创建可读流
const Stream = require('stream')
const readableStream = new Stream.Readable()

// 然后实现 _read
readableStream._read = () => {}

// 也可以使用 read 选项实现 _read
const readableStream = new Stream.Readable({
  read() {}
})

//现在，流已初始化，可以向其发送数据了
readableStream.push('hi!')
readableStream.push('ho!')
```

```javascript
// 创建可写流
const Stream = require('stream')
const writableStream = new Stream.Writable()

// 然后实现 _write
writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}

// 现在，可以通过以下方式传输可读流
process.stdin.pipe(writableStream)
```



从可读流中获取数据

```javascript
const Stream = require('stream')

const readableStream = new Stream.Readable({
  read() {}
})
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}

readableStream.pipe(writableStream)

readableStream.push('hi!')
readableStream.push('ho!')


// 也可以使用 readable 事件直接地消费可读流
readableStream.on('readable', () => {
  console.log(readableStream.read())
})
```



```javascript
//发送数据到可写流:write()方法
writableStream.write('hey!\n')

//使用信号通知已结束写入的可写流:end()方法
writableStream.end()
```







## os操作系统模块

该模块提供了许多函数，可用于从底层的操作系统和程序运行所在的计算机上检索信息并与其进行交互。

有一些有用的属性可以告诉我们一些与处理文件有关的关键事项：

`os.EOL` 可给出行定界符序列。 在 Linux 和 macOS 上为 `\n`，在 Windows 上为 `\r\n`。

`os.constants.signals` 可告知所有与处理过程信号相关的常量，例如 SIGHUP、SIGKILL 等。

`os.constants.errno` 可设置用于错误报告的常量，例如 EADDRINUSE、EOVERFLOW 等。

```javascript
const os = require('os')
```



### 常用方法

* `os.arch()`: 返回标识底层架构的字符串，例如 `arm`、`x64`、`arm64`。
* `os.cpus()`: 返回关于系统上可用的 CPU 的信息。
* `os.endianness()`: 根据是使用大端序或小端序编译 Node.js，返回 `BE` 或 `LE`。
* `os.freemem()`: 返回代表系统中可用内存的字节数。
* `os.homedir()`: 返回到当前用户的主目录的路径。例如`'/Users/joe'`
* `os.hostname()`: 返回主机名。
* `os.loadavg()`: 返回操作系统对平均负载的计算。这仅在 Linux 和 macOS 上返回有意义的值。
* `os.networkInterfaces()`: 返回系统上可用的网络接口的详细信息。
* `os.platform()`: 返回为 Node.js 编译的平台：
  * `darwin`
  * `freebsd`
  * `linux`
  * `openbsd`
  * `win32`
  * ...等
* `os.release()`: 返回标识操作系统版本号的字符串。
* `os.tmpdir()`: 返回指定的临时文件夹的路径。
* `os.totalmem()`: 返回表示系统中可用的总内存的字节数。
* `os.type()`: 标识操作系统：
  * `Linux`
  * macOS 上为`Darwin`
  * Windows 上为 `Windows_NT`
* `os.uptime()`: 返回自上次重新启动以来计算机持续运行的秒数。
* `os.userInfo()`: 返回包含当前 `username`、`uid`、`gid`、`shell` 和 `homedir` 的对象。





# Express

除了使用内置http模块搭建服务，还可以使用 `Express` 快速搭建服务器。

安装 Express 依赖: `npm install express`

```js
// 导入模块
const express = require('express')

// 创建一个express应用程序
const app = express()

// 处理get请求
app.get('/', function(req, res) {
  res.send('HOME')
})

// 监听端口
app.listen(3000, '127.0.0.1', function() {
  console.log('服务已启动')
})
```



## 示例

为了更方便的处理请求中传送过来的数据，可以使用 `body-parser` 插件。

```js
// server.js
// 导入模块
const express = require('express')
const bodyParser = require('body-parser')

// 创建一个express应用程序
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 处理get请求
app.get('/', function(req, res) {
  res.send('HOME')
})

app.get('/login', function(req, res) {
  // 发送文件
  res.sendFile(`${__dirname}/login.html`)
})  

app.post('/checkuser', function(req, res) {
  // 使用 bodyParser 后，能够通过 req.body 获取到传递过来的数据
  // console.log(req.body)
  if(req.body.username == 'hlw' && req.body.password == '123') {
    res.send('ok')
  } else {
    res.send('error')
  }
})

app.get('*', function(req, res) {
  res.send('404')
})

// 监听端口
app.listen(3000, '127.0.0.1', function() {
  console.log('服务已启动')
})
```



```js
// login.html 中的登录函数
const data = {
  username: 'hlw',
  password: '123'
}

function login(){
  fetch('http://localhost:3000/checkuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => {
    return res.text()
  }).then(data => {
    console.log(data)
  })
}
```



# 上传文件 multer

文档1: https://www.npmjs.com/package/multer

文档2: https://www.cnblogs.com/chyingp/p/express-multer-file-upload.html

```js
// server.js
const express = require('express')
const multer = require('multer')

const app = express()
// 文件保存路径
const upload = multer({dest:'upload/'})

// single() 中的值必须和 form 表单的input标签中的name属性一致
app.post('/upload', upload.single('pic'), function(req, res, next) {
  res.send({ret_code: '0'})
})

app.get('/form', function(req, res, next) {
  res.sendFile(`${__dirname}/form.html`)
})

app.listen(3000)
```

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="pic">
  <input type="submit" value="提交">
</form>
```



上面代码中，保存文件是以二进制格式保存。如果需要以原名称+原格式保存，使用以下代码。

```js
// server.js
const express = require('express')
const multer = require('multer')

const app = express()

// 设置上传文件的存放位置和名称
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `${__dirname}/upload`)
  },
  filename: function(req, file, cb) {
    // file 中可以获取到上传文件的信息
    // cb(null, file.fieldname + '-' + Date.now()) // 使用pic+当前时间 为名字保存
    cb(null, file.originalname)   // 使用原始名称保存
  }
})

const upload = multer({storage: storage})

// 单文件上传 upload.single() 参数中的值需要和上传控件input标签的name一致
app.post('/upload', upload.single('pic'), function(req, res, next) {
  res.send({ret_code: '0'})
})

// 多文件上传  upload.array()  数字表示同时支持几张图片上传
app.post('/upload-multiple', upload.array('pic', 2), function(req, res, next) {
  res.send({ret_code: '0'})
})

app.get('/form', function(req, res, next) {
  res.sendFile(`${__dirname}/form.html`)
})

app.listen(3000)
```









# 超好用辅助开发模块

## nodemon 进程管理工具

nodemon是一种工具，可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于node.js的应用程序。常用于重新启动挂起的进程，例如Web服务器。

* 安装 `npm install -g nodemon`
* 使用 `nodemon js文件名`
* 详见 https://www.npmjs.com/package/nodemon



## pm2 进程管理器

PM2 是 Node.js/Bun 应用程序的生产流程管理器，具有内置负载均衡器。它允许您使应用程序永远保持活动状态，在不停机的情况下重新加载它们，并简化常见的系统管理任务。

文档地址：https://github.com/Unitech/pm2



## log4js 日志生成工具

​	log4js用于日志生成，可以将调试的日志信息保存到自定义文本文件中，方便查看。

* 安装 `npm install log4js` ，注意：如果使用全局安装，require时可能找不到该模块

* 简单使用示例（不生成文件）

  ```javascript
  var log4js = require("log4js");
  var logger = log4js.getLogger();
  logger.level = "debug";
  logger.debug("Some debug messages");
  ```

* 生成日志文件使用示例

  ```javascript
  var log4js = require("log4js");
  log4js.configure({
      appenders: { cheese: { type: "file", filename: "cheese.log" } },
      categories: { default: { appenders: ["cheese"], level: "error" } }
  });
  
  const logger = log4js.getLogger("cheese");
  logger.level = "debug";
  logger.debug("Some debug messages");
  ```

* 详见 https://www.npmjs.com/package/log4js



## lodash工具



## fs-extra模块，fs的扩展

该模块非常受欢迎且维护良好。 它是 `fs` 模块的直接替代品，在其之上提供了更多的功能。

```
npm install fs-extra
```



## ncr-decode

链接：https://www.npmjs.com/package/ncr-decode

NCR字符转换工具。&#开头＋数字的。

什么是NRC：https://www.zhihu.com/question/21390312



# kill node 进程

```
# 找出所有 node 应用
ps -ax | grep node

# 找到要杀死 node 进程的 pid
sudo kill :pid
```

 

# module.exports 和 export 之间有什么区别？

前者公开了它指向的对象。 后者公开了它指向的对象的属性。

* 详见：http://nodejs.cn/learn/expose-functionality-from-a-nodejs-file-using-exports





# __dirname

​	获取当前执行文件的目录。



# 定时器

## setTimeout()

当编写 JavaScript 代码时，可能希望延迟函数的执行。

这就是 setTimeout 的工作。 指定一个回调函数以供稍后执行，并指定希望它稍后运行的时间（以毫秒为单位）的值

```javascript
setTimeout(() => {
  // 2 秒之后运行
}, 2000)

setTimeout(() => {
  // 50 毫秒之后运行
}, 50)
```

该语法定义了一个新的函数。 可以在其中调用所需的任何其他函数，也可以传入现有的函数名称和一组参数

```javascript
const myFunction = (firstParam, secondParam) => {
  // 做些事情
}

// 2 秒之后运行
setTimeout(myFunction, 2000, firstParam, secondParam)
```

`setTimeout` 会返回**定时器的 id**。 通常不使用它，但是可以保存此 id，并在要删除此安排的函数执行时清除它：

```javascript
const id = setTimeout(() => {
  // 应该在 2 秒之后运行
}, 2000)

// 改变主意了
clearTimeout(id)
```

**零延迟**：如果将超时延迟指定为 `0`，则回调函数会被尽快执行（但是是在当前函数执行之后）

```javascript
setTimeout(() => {
  console.log('后者 ')
}, 0)

console.log(' 前者 ')
```

执行结果：前者 > 后者

******



## setInterval()

`setInterval` 是一个类似于 `setTimeout` 的函数，不同之处在于：它会在指定的特定时间间隔（以毫秒为单位）一直地运行回调函数，而不是只运行一次

```javascript
setInterval(() => {
  // 每 2 秒运行一次
}, 2000)
```

上面的函数每隔 2 秒运行一次，除非使用 `clearInterval` 告诉它停止（传入 `setInterval` 返回的间隔定时器 id）：

```javascript
const id = setInterval(() => {
  // 每 2 秒运行一次
}, 2000)

clearInterval(id)
```

通常在 `setInterval` 回调函数中调用 `clearInterval`，以使其自行判断是否应该再次运行或停止。 例如，此代码会运行某些事情，除非 `App.somethingIWait` 具有值 `arrived`:

```javascript
const interval = setInterval(() => {
  if (App.somethingIWait === 'arrived') {
    clearInterval(interval)
    return
  }
  // 否则做些事情
}, 100)
```



******



## 递归的 setTimeout

`setInterval` 每 n 毫秒启动一个函数，而无需考虑函数何时完成执行。

如果一个函数总是花费相同的时间，那就没问题了，但是函数可能需要不同的执行时间，这具体取决于网络条件。也可能一个较长时间的执行会与下一次执行重叠

为了避免这种情况，可以在回调函数完成时安排要被调用的递归的 setTimeout：

```javascript
const myFunction = () => {
  // 做些事情

  setTimeout(myFunction, 1000)
}

setTimeout(myFunction, 1000)
```



> `setTimeout` 和 `setInterval` 可通过定时器模块`timer`在 Node.js 中使用。
>
> 参考：http://nodejs.cn/learn/discover-javascript-timers





# Promise

## Promise简介

Promise 通常被定义为**最终会变为可用值的代理**。

Promise 是一种处理异步代码（而不会陷入回调地狱）的方式。

**异步函数** 在底层使用了 promise，因此了解 promise 的工作方式是了解 `async` 和 `await` 的基础。

### Promise 如何运作

当 promise 被调用后，它会以**处理中状态**开始。 这意味着调用的函数会继续执行，而 promise 仍处于处理中直到解决为止，从而为调用的函数提供所请求的任何数据。

被创建的 promise 最终会以**被解决状态**或**被拒绝状态**结束，并在完成时调用相应的回调函数（传给 `then` 和 `catch`）。



## 创建Promise

Promise API 公开了一个 Promise 构造函数，可以使用 `new Promise()` 对其进行初始化：

```javascript
let done = true

const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = '这是创建的东西'
    resolve(workDone)
  } else {
    const why = '仍然在处理其他事情'
    reject(why)
  }
})
```

如你所见，promise 检查了 `done` 全局常量，如果为真，则 promise 进入**被解决**状态（因为调用了 `resolve` 回调）；否则，则执行 `reject` 回调（将 promise 置于被拒绝状态）。 如果在执行路径中从未调用过这些函数之一，则 promise 会保持处理中状态。

使用 `resolve` 和 `reject`，可以向调用者传达最终的 promise 状态以及该如何处理。 在上述示例中，只返回了一个字符串，但是它可以是一个对象，也可以为 `null`。

```javascript
// 经典示例：一种被称为 Promisifying 的技术
const fs = require('fs')

const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err)  // 调用 `reject` 会导致 promise 失败，无论是否传入错误作为参数，
        return        // 且不再进行下去。
      }
      resolve(data)
    })
  })
}

getFile('/etc/passwd')
.then(data => console.log(data))
.catch(err => console.error(err))
```



## 链式Promise

Promise 可以返回到另一个 promise，从而创建一个 promise 链。

链式 promise 的一个很好的示例是 Fetch API，可以用于获取资源，且当资源被获取时将 promise 链式排队进行执行。

Fetch API 是基于 promise 的机制，调用 `fetch()` 相当于使用 `new Promise()` 来定义 promsie。

```javascript
// 链式 promise 的示例
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))
}

const json = response => response.json()

fetch('/todos.json')
  .then(status)    // 注意，`status` 函数实际上在这里被调用，并且同样返回 promise，
  .then(json)      // 这里唯一的区别是的 `json` 函数会返回解决时传入 `data` 的 promise，
  .then(data => {  // 这是 `data` 会在此处作为匿名函数的第一个参数的原因。
    console.log('请求成功获得 JSON 响应', data)
  })
  .catch(error => {
    console.log('请求失败', error)
  })
```



## 处理错误

当 promise 链中的任何内容失败并引发错误或拒绝 promise 时，则控制权会转到链中最近的 `catch()` 语句。

```javascript
new Promise((resolve, reject) => {
  throw new Error('错误')
}).catch(err => {
  console.error(err)
})

// 或

new Promise((resolve, reject) => {
  reject('错误')
}).catch(err => {
  console.error(err)
})
```

**级联错误**：如果在 `catch()` 内部引发错误，则可以附加第二个 `catch()`来处理，依此类推。

```javascript
new Promise((resolve, reject) => {
  throw new Error('错误')
})
  .catch(err => {
    throw new Error('错误')
  })
  .catch(err => {
    console.error(err)
  })
```





## 常见的错误

### Uncaught TypeError: undefined is not a promise

如果在控制台中收到 `Uncaught TypeError: undefined is not a promise` 错误，则请确保使用 `new Promise()` 而不是 `Promise()`。

******

### UnhandledPromiseRejectionWarning

这意味着调用的 promise 被拒绝，但是没有用于处理错误的 `catch`。 在 `then` 之后添加 `catch` 则可以正确地处理。





# Buffer

**什么是buffer？**

Buffer 是内存区域。 JavaScript 开发者可能对这个概念并不熟悉，比每天与内存交互的 C、C++ 或 Go 开发者（或使用系统编程语言的任何程序员）要少得多。

它表示在 V8 JavaScript 引擎外部分配的固定大小的内存块（无法调整大小）。

可以将 buffer 视为整数数组，每个整数代表一个数据字节。它由 Node.js Buffer 类实现。



**为什么需要buffer？**

Buffer 被引入用以帮助开发者处理二进制数据，在此生态系统中传统上只处理字符串而不是二进制数据。

Buffer 与流紧密相连。 当流处理器接收数据的速度快于其消化的速度时，则会将数据放入 buffer 中。

一个简单的场景是：当观看 YouTube 视频时，红线超过了观看点：即下载数据的速度比查看数据的速度快，且浏览器会对数据进行缓冲。



## 创建buffer

使用 `Buffer.from()`、`Buffer.alloc()` 和 `Buffer.allocUnsafe()` 方法可以创建 buffer。

* `Buffer.from(array)`
* `Buffer.from(arrayBuffer[, byteOffset[, length]])`
* `Buffer.from(buffer)`
* `Buffer.from(string[, encoding])`

```javascript
const buf = Buffer.from('Hey!')

//也可以只初始化 buffer（传入大小）。 以下会创建一个 1KB 的 buffer：
const buf = Buffer.alloc(1024)
//或
const buf = Buffer.allocUnsafe(1024)
```

虽然 `alloc` 和 `allocUnsafe` 均分配指定大小的 `Buffer`（以字节为单位），但是 `alloc` 创建的 `Buffer` 会被使用零进行初始化，而 `allocUnsafe` 创建的 `Buffer` 不会被初始化。 这意味着，尽管 `allocUnsafe` 比 `alloc` 要快得多，但是分配的内存片段可能包含可能敏感的旧数据。

当 `Buffer` 内存被读取时，如果内存中存在较旧的数据，则可以被访问或泄漏。 这就是真正使 `allocUnsafe` 不安全的原因，在使用它时必须格外小心。



## 使用buffer

Buffer（字节数组）可以像数组一样被访问：

* `buffer.lenth`: buffer的长度
* `buffer.write()`: 更改 buffer 的内容
* `buffer.copy()`: 复制 buffer，默认情况下，会复制整个 buffer。
  * 另外的 3 个参数可以定义开始位置、结束位置、以及新的 buffer 长度
* `buffer.slice()`: 切片 buffer，一个参数是起始位置，可以指定第二个参数作为结束位置
  * 切片不是副本：原始 buffer 仍然是真正的来源。 如果那改变了，则切片也会改变。

```javascript
const buf = Buffer.from('Hey!')
console.log(buf[0]) //72
console.log(buf[1]) //101
console.log(buf[2]) //121
//可以使用 toString() 方法打印 buffer 的全部内容：
console.log(buf.toString())

//使用 length 属性获取buffer的长度
console.log(buf.length)

//迭代buffer的内容
for (const item of buf) {
    console.log(item) //72 101 121 33
}

//更改 buffer 的内容:可以使用 write() 方法将整个数据字符串写入 buffer
const buf = Buffer.alloc(4)
buf.write('Hey!')

//就像可以使用数组语法访问 buffer 一样，你也可以使用相同的方式设置 buffer 的内容
const buf = Buffer.from('Hey!')
buf[1] = 111 //o
console.log(buf.toString()) //Hoy!


//使用 copy() 方法可以复制 buffer
const buf = Buffer.from('Hey!')
let bufcopy = Buffer.alloc(4) //分配 4 个字节。
buf.copy(bufcopy)

//默认情况下，会复制整个 buffer。 另外的 3 个参数可以定义开始位置、结束位置、以及新的 buffer 长度
const buf = Buffer.from('Hey!')
let bufcopy = Buffer.alloc(2) //分配 2 个字节。
buf.copy(bufcopy, 0, 0, 2)
console.log(bufcopy.toString()) //'He'


//切片 buffer，使用 slice() 方法创建它。 第一个参数是起始位置，可以指定第二个参数作为结束位置
//如果要创建 buffer 的局部视图，则可以创建切片。 切片不是副本：原始 buffer 仍然是真正的来源。 如果那改变了，则切片也会改变。
const buf = Buffer.from('Hey!')
console.log(buf.slice(0).toString()) //Hey!
const slice = buf.slice(0, 2)
console.log(slice.toString()) //He
buf[1] = 111 //o
console.log(slice.toString()) //Ho

```





# 异常

使用 `throw` 关键字创建异常：

```javascript
throw value
```

一旦 JavaScript 执行到此行，则常规的程序流会被停止，且控制会被交给最近的异常处理程序。

通常，在客户端代码中，`value` 可以是任何 JavaScript 值（包括字符串、数字、或对象）。

在 Node.js 中，我们不抛出字符串，而仅抛出 Error 对象。



## 错误对象

错误对象是 Error 对象的实例、或者继承自 Error 类（由 Error 核心模块提供）：

```javascript
throw new Error('错误信息')

//或：
class NotEnoughCoffeeError extends Error {
  //...
}
throw new NotEnoughCoffeeError()
```



## 处理异常

异常处理程序是 `try`/`catch` 语句。

`try` 块中包含的代码行中引发的任何异常都会在相应的 `catch` 块中处理：

```javascript
//在此示例中，e 是异常值。
//可以添加多个处理程序，它们可以捕获各种错误。
try {
  //代码行
} catch (e) {}
```



## 捕获未捕获的异常

如果在程序执行过程中引发了未捕获的异常，则程序会崩溃。

若要解决此问题，则监听 `process` 对象上的 `uncaughtException` 事件：

```javascript
//无需为此导入 process 核心模块，因为它是自动注入的。
process.on('uncaughtException', err => {
  console.error('有一个未捕获的错误', err)
  process.exit(1) //强制性的（根据 Node.js 文档）
})
```



## Promise的异常

使用 promise 可以链接不同的操作，并在最后处理错误：

```javascript
doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err => console.error(err))
```

你怎么知道错误发生在哪里？ 你并不知道，但是你可以处理所调用的每个函数（`doSomethingX`）中的错误，并且在错误处理程序内部抛出新的错误，这就会调用外部的 `catch` 处理程序：

```javascript
const doSomething1 = () => {
  //...
  try {
    //...
  } catch (err) {
    //... 在本地处理
    throw new Error(err.message)
  }
  //...
}
```

为了能够在本地（而不是在调用的函数中）处理错误，则可以断开链条，在每个 `then()` 函数中创建函数并处理异常：

```javascript
doSomething1()
  .then(() => {
    return doSomething2().catch(err => {
      //处理错误
      throw err //打断链条
    })
  })
  .then(() => {
    return doSomething2().catch(err => {
      //处理错误
      throw err //打断链条
    })
  })
  .catch(err => console.error(err))
```



## async/await的错误处理

使用 async/await 时，仍然需要捕获错误，可以通过以下方式进行操作：

```javascript
async function someFunction() {
  try {
    await someOtherFunction()
  } catch (err) {
    console.error(err.message)
  }
}
```







# Async 和 Await

好处：更容易调试

调试 promise 很难，因为调试器不会跳过异步的代码。

Async/await 使这非常容易，因为对于编译器而言，它就像同步代码一样。

```javascript
//这是一个 async/await 的简单示例，用于异步地运行函数
const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('做些事情'), 3000)
  })
}

const doSomething = async () => {
  console.log(await doSomethingAsync())
}

console.log('之前')
doSomething()
console.log('之后')
```

执行结果：之前 > 之后 > 做些事情



在任何函数之前加上 `async` 关键字意味着该函数会返回 promise。

即使没有显式地这样做，它也会在内部使它返回 promise。

```javascript
const aFunction = async () => {
  return '测试'
}
aFunction().then(alert) // 这会 alert '测试'

//两个代码一样
const aFunction = () => {
  return Promise.resolve('测试')
}
aFunction().then(alert) // 这会 alert '测试'
```





# 开发环境和生产环境的区别

参考: http://nodejs.cn/learn/nodejs-the-difference-between-development-and-production

可以为生产环境和开发环境使用不同的配置。

Node.js 假定其始终运行在开发环境中。 可以通过设置 `NODE_ENV=production` 环境变量来向 Node.js 发出正在生产环境中运行的信号。

```
//通常通过在 shell 中执行以下命令来完成：
//但最好将其放在的 shell 配置文件中（例如，使用 Bash shell 的 .bash_profile），否则当系统重启时，该设置不会被保留
export NODE_ENV=production


//也可以通过将环境变量放在应用程序的初始化命令之前来应用它
NODE_ENV=production node app.js
```

此环境变量是一个约定，在外部库中也广泛使用。

设置环境为 `production` 通常可以确保：

- 日志记录保持在最低水平。
- 更高的缓存级别以优化性能。

```javascript
//应用
//可以使用条件语句在不同的环境中执行代码：
if (process.env.NODE_ENV === "development") {
  //...
}
if (process.env.NODE_ENV === "production") {
  //...
}
if(['production', 'staging'].indexOf(process.env.NODE_ENV) >= 0) {
  //...
})

//或者，在 Express 应用中，可以使用此工具为每个环境设置不同的错误处理程序
if (process.env.NODE_ENV === "development") {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

if (process.env.NODE_ENV === "production") {
  app.use(express.errorHandler())
})
```



# JSON.stringify()方法

当一个对象中有多层嵌套，在输出到控制台或日志文件时，可能不会被完整展开，Node.js 会放弃并打印 `[Object]` 作为占位符。

如何打印整个对象？最好的方法（同时保留漂亮的打印效果）是使用：

```javascript
//其中 2 是用于缩进的空格数。
console.log(JSON.stringify(obj, null, 2))
```



# TypeScript基础介绍

TypeScript 是由 Microsoft 维护和开发的一个非常流行的开源语言，它受到全世界许多软件开发者的喜爱和使用。

基本上，它是 JavaScript 的超集，为语言增加了新的功能。 最值得注意的新功能是静态类型定义，这是普通 JavaScript 中所没有的。

```
//在项目中安装TypeScript
npm install typescript

//在终端中使用 tsc 命令将其编译为 JavaScript
tsc example.ts
```

```typescript
// example.ts 示例
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine: User = {
  name: 'Justine',
  age: 23,
};

const isJustineAnAdult: boolean = isAdult(justine);
```



# 功能开发

## 实现上传文件到服务器

概述：通过`POST`方法，提交表单方式上传文件到服务器。协议采用`multipart/form-data`。

需要的第三方库：

* multiparty: 用于通过`multipart/form-data`协议，从表单提交中获取文件并下载到本地。
* ncr-decode: 用于将浏览器生成的Unicode码转换为中文字符。

```javascript
//实现代码：server.js

var multiparty = require('multiparty')
var ncrd = require('ncr-decode')
var http = require('http')
var util = require('util')
var fs = require('fs')

http.createServer(function(req, res) {
  if (req.url === '/' && req.method === 'POST') {
    // 解析文件上传
    var form = new multiparty.Form()
    // 设置编码，默认为utf8
    //form.encoding = 'utf-8'
    //设置文件存储路径
    form.uploadDir = './files'

    form.parse(req, function(err, fields, files) {
      //响应信息
      res.writeHead(200, { 'content-type': 'text/plain' })
      res.write('received upload:\n\n')
      res.write(util.inspect({ fields: fields, files: files }))

      // 调试输出上传文件信息、文件原名
      // console.log(files)
      // console.log(files.upload[0].originalFilename)

      // 以JSON格式展开显示对象files
      var filesTemp = JSON.stringify(files, null, 2)

      if(err) {
        console.log('parse error:' + err)
      }else {
        console.log('parse files:' + filesTemp)
        // 重命名所有上传文件
        for(let i = 0; i < files.upload.length; i++){
          var inputFile = files.upload[i]
          var uploadedPath = inputFile.path
          //将10进制的Unicode码转换为中文
          var dstPath = './files/' + ncrd.decode(inputFile.originalFilename)
          //重命名为真实文件名
          fs.rename(uploadedPath, dstPath, function(err) {
              if(err) {
                console.log('rename error:' + err)
              }else {
                console.log('rename ok')
              }
          })
        }
      }
      res.end()
    })
 
    return
  }
 
  // 显示文件上传表单
  res.writeHead(200, { 'content-type': 'text/html' })
  res.end(
    '<form action="/" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  )
}).listen(8080)
```





# 库

## inquirer 控制台交互

[文档地址](https://www.npmjs.com/package/inquirer)

[inquirer-table-prompt](https://github.com/eduardoboucas/inquirer-table-prompt)



![image-20230116141134355](http://qiniu.huangyihui.cn/doc/202511262256313.png)



## Socket.io

Socket.io 用于构建实时应用程序并在 Web 客户端和服务器之间建立双向通信。使用此库框架，可以开发具有 websocket 开发要求的应用程序。例如，聊天应用程序会持续运行以获取实时更新，并刷新后台进程以获取更新或消息。它还以更少的代码行提供实时分析。

Socket.io 适合开发实时应用程序，如聊天室应用程序、视频会议应用程序、多人游戏等，这些应用程序需要服务器推送数据而无需客户端请求。

[github地址](https://github.com/socketio/socket.io)

[官网地址](https://socket.io/)









## Egg.js

Egg.js 为企业级框架和应用而生，希望由 Egg.js 孕育出更多上层框架，帮助开发团队和开发人员降低开发和维护成本。它继承了Koajs的高性能优点，同时又加入了一些约束与开发规范，来规避Koajs框架本身的开发自由度太高的问题。Egg 提供了一个更加强大的插件机制，让这些独立领域的功能模块可以更加容易编写。

Egg.js 是国内最热门的 node.js 框架之一，不同于 Exporess、Koa 等基础框架，Egg.js 在应用级的提炼封装，使其更贴近业务场景，更快上手。

[github地址](https://github.com/eggjs/egg)

[官网地址](https://www.eggjs.org/)



## http-proxy-middleware 跨域

http-proxy-middleware http 代理中间件，可以用来解决跨域问题。

[文档地址](https://www.npmjs.com/package/http-proxy-middleware)



```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));
app.listen(3000);

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
```



# 生态系统

[生态推荐](https://nodejstoolbox.com/)



## HTTP 框架

### express

Express 是最受欢迎的、基于 MVC 的 Node.js 框架。它有许多与 Nodejs 同步的库和组件，以创建漂亮而强大的动态 Web 应用程序。Express 提供了所有 HTTP 实用方法、函数和中间件，可帮助开发人员编写健壮的 API。它适用于单页应用、多页应用、混合应用开发。

使用 Express.js 可以更快地开发 Web 应用程序，因为它具有几乎现成的 API 生成基础。由于其强大的路由、模板、安全功能和错误处理规定，可以将其用于任何企业级或基于浏览器的应用程序。

文档地址：https://github.com/expressjs/express

[官网地址](https://expressjs.com/)



通过应用生成器工具 `express-generator` 可以快速创建一个应用的骨架。

```shell
npm install -g express-generator
express --view=ejs projectName
```



### Fastify

Fastify 是一个快速并且低开销的 web 框架，专为 Node.js 平台量身打造。Fastify 的设计灵感来自 Hapi 和 Express，致力于以最少的开销和强大的插件结构提供最佳的开发体验。据我们所知，它是这个领域里速度最快的 web 框架之一。

[github地址](https://github.com/fastify/fastify)

[官网地址](https://fastify.dev/)



### Koa

Koa.js 被认为是对 Express 框架的扩展，它由 Express 团队设计和开发的基于 MVC 的框架。创建 Koa 的主要目的是提供一个比 Express 更轻量级并且能够更高效地开发 Web 应用程序和 API 的框架。

Koa 与 Express 非常相似，在编写代码时，仍然可以享受 Express 的灵活性和更多的自由度和更少的复杂性。这最大限度地减少了整个应用程序堆栈中的错误范围。当性能是 Web 应用程序的关键需求时，Koa 可能是最好的选择之一。特别是对于大型项目，该框架可以与大型且经验丰富的开发团队一起构建广泛的应用程序。在某些情况下，Koa 已被证明是比 Express 更快的框架。

文档地址：https://github.com/koajs/koa

[官网地址](https://koajs.com/)



## 静态服务器

在  localhost 上提供静态生成的站点。

### http-server

一个简单的命令行工具，用于在您的本地开发环境中快速启动一个基于 HTTP 的静态文件服务器。它允许您将当前目录下的文件作为静态资源托管，并通过 HTTP 协议提供这些文件。

文档地址：https://github.com/http-party/http-server

```sh
npx http-server
```



### serve

一个用于在本地开发环境中快速启动静态文件服务器的命令行工具。它是由 Vercel 开发的，旨在提供一个简单、轻量级且易于使用的方式来运行静态网站或应用程序。

文档地址：https://github.com/vercel/serve















## HTTP 请求模拟

模拟网络请求并隔离测试模块。



### superagent

优雅且功能丰富的浏览器/Node.js HTTP 以及流畅的 API。

文档地址：https://github.com/ladjs/superagent



### nock

一个 HTTP 模拟和预期测试库，用于 Node.js 平台。

文档地址：https://github.com/nock/nock



### msw

适用于浏览器和 Node.js 的无缝 REST/GraphQL API 模拟库。

文档地址：https://github.com/mswjs/msw















## 文件解析

### XLSX

SheetJS 电子表格数据解析器和编写器。

文档地址：https://github.com/SheetJS/sheetjs



### exceljs

Excel 工作簿管理器 - 读写 xlsx 和 csv 文件。

文档地址：https://github.com/exceljs/exceljs



### jspdf

一个使用 JavaScript 生成 PDF 文档的开源库。

文档地址：https://github.com/MrRio/jsPDF



### pdfmake

一个用于在客户端中生成 PDF 文档的库。它提供了一种简单而强大的方式来创建具有丰富内容和样式的 PDF 文件。

文档地址：https://github.com/bpampuch/pdfmake



### pdfkit

Node.js 的 PDF 生成库。

文档地址：https://github.com/foliojs/pdfkit



### pdf-lib

使用 JavaScript 创建和修改 PDF 文件

文档地址：https://github.com/Hopding/pdf-lib









### csv-parse

CSV 解析实现 Node.js `stream.Transform` API。

文档地址：https://github.com/adaltas/node-csv



### papaparse

适用于浏览器的快速而强大的 CSV 解析器，支持 Web Worker 和流式处理大文件。将 CSV 转换为 JSON 以及将 JSON 转换为 CSV。

文档地址：https://github.com/mholt/PapaParse







## 文件上传

### multer

用于操作“multipart/form-data”的中间件。

文档地址：https://github.com/expressjs/multer



### formidable

用于解析表单数据（尤其是文件上传）的 Node.js 模块。

文档地址：https://github.com/node-formidable/formidable



### busboy

Node.js HTML 表单数据的流式解析器。

文档地址：https://github.com/mscdex/busboy



## 对象模式验证

使用对象模式进行简单直观的验证。



### joi

一个用于JavaScript对象模式验证的库。

文档地址：https://github.com/mscdex/busboy



### yup

非常简单的对象模式验证。

文档地址：https://github.com/jquense/yup



### zod

具有静态类型推断的 TypeScript-first 模式声明和验证库。

文档地址：https://github.com/colinhacks/zod

















## HTML 抓取工具

从 HTML 中轻松查找并提取所需的数据。



### crawlee

使用 Node.js 爬取和抓取整个网站。适用于 JavaScript/Node.js 的可扩展网络爬取库。支持使用无头 Chrome 和 Puppeteer 开发数据提取和 Web 自动化作业。

文档地址：https://github.com/apify/crawlee



### jsdom

许多 Web 标准的 JavaScript 实现。

文档地址：https://github.com/jsdom/jsdom



### cheerio

专为服务器设计的核心 jQuery 的小型、快速且优雅的实现。

文档地址：https://github.com/cheeriojs/cheerio



## 数据库

### mongodb

Node.js 的官方 MongoDB 驱动程序。

文档地址：https://github.com/mongodb/node-mongodb-native



### mongoose

Node.js环境下一款优秀的MongoDB对象建模工具。

文档地址：https://github.com/Automattic/mongoose



### mysql

mysql 的 Node.js 驱动程序。它是用 JavaScript 编写的，不需要编译。

文档地址：https://github.com/mysqljs/mysql



### mysql2

一个用于Node.js的MySQL数据库驱动程序。它是mysql模块的一种增强版，提供更高性能和更好的功能。

文档地址：https://github.com/sidorares/node-mysql2



### pg

PostgreSQL 客户端 - 具有相同 API 的纯 javascript 和 libpq。

文档地址：https://github.com/brianc/node-postgres



### sqlite3

一个用于访问 SQLite 数据库的模块。SQLite 是一种嵌入式关系型数据库引擎，它以轻量级和高效性而闻名。sqlite3 模块允许您在 Node.js 应用程序中使用 JavaScript 来执行与 SQLite 数据库的交互操作。

文档地址：https://github.com/TryGhost/node-sqlite3



### better-sqlite3

一个在 Node.js 中使用的 SQLite3 数据库封装模块。它提供了一个简洁、易用和高性能的接口，让开发者可以方便地在 Node.js 应用程序中与 SQLite 数据库交互。

文档地址：https://github.com/WiseLibs/better-sqlite3



### knex

一个以 JavaScript 编写的 SQL 查询构建器，用于 Node.js 和浏览器环境中与数据库进行交互。它提供了一套简洁而强大的 API，使开发者能够以更直观的方式构建和执行 SQL 查询。

文档地址：https://github.com/knex/knex



### redis

现代、高性能 Redis 客户端。

文档地址：https://github.com/redis/node-redis



### ioredis

适用于 Node.js 的强大、注重性能且功能齐全的 Redis 客户端。

文档地址：https://github.com/luin/ioredis





## 对象关系映射 (ORM)

将 SQL 数据库表映射到 JavaScript 对象。



### Prisma

Prisma 是一个开源数据库工具包。它包括用于 Node.js 的 JavaScript/TypeScript ORM、迁移和用于查看和编辑数据库中的数据的现代 GUI。

文档地址：https://github.com/prisma/prisma



### Sequelize

Sequelize 是一个基于 Promise 的 Node.js ORM 工具，适用于 Postgres、MySQL、MariaDB、SQLite、Microsoft SQL Server、Amazon Redshift 和 Snowflake 的数据云。它具有可靠的事务支持、关系、急切和延迟加载、读取复制等功能。

文档地址：https://github.com/sequelize/sequelize

[教程文档](https://mp.weixin.qq.com/s/rXe1HiZ4qbAWKpkSd7CQvQ)



### typeorm

适用于 TypeScript、ES7、ES6、ES5 的数据映射器 ORM。支持 MySQL、PostgreSQL、MariaDB、SQLite、MS SQL Server、Oracle、MongoDB 数据库。

文档地址：https://github.com/typeorm/typeorm



## 定时任务

按计划运行任务。

### cron

一个用于执行定期任务的时间调度工具。它是基于时间的作业调度器，可以按照指定的时间规则自动执行预定的任务。

文档地址：https://github.com/kelektiv/node-cron



### node-schedule

一个用于在 Node.js 中执行定时任务的模块。它提供了一种简单而灵活的方式来安排和管理定时任务，可以根据指定的时间规则触发任务的执行。

文档地址：https://github.com/node-schedule/node-schedule



## 自动化测试

帮助编写自动化测试的框架。

### jest

一个用于 JavaScript 测试的现代化、开源的测试框架。它被广泛应用于前端开发和 Node.js 环境中，旨在提供简单、高效和可扩展的测试解决方案。

文档地址：https://github.com/facebook/jest



### mocha

一个灵活且功能强大的 JavaScript 测试框架。它适用于前端和后端的 JavaScript 应用程序，可用于编写各种类型的测试，包括单元测试、集成测试和端到端测试等。

文档地址：https://github.com/mochajs/mocha













## 浏览器测试

编写在真实浏览器环境中运行的自动化测试。

### Cypress

Cypress 是专为现代网络构建的下一代前端测试工具。

文档地址：https://github.com/cypress-io/cypress



### puppeteer

通过 DevTools 协议控制无头 Chrome 的高级 API。

文档地址：https://github.com/puppeteer/puppeteer



### @playwright/test

用于自动化 Web 浏览器的高级 API。

文档地址：https://github.com/Microsoft/playwright



### webdriverio

Node.js 的下一代浏览器和移动自动化测试框架。

文档地址：https://github.com/webdriverio/webdriverio



## 命令行工具

通过询问用户输入创建交互式命令行工具。

### inquirer

常见交互式命令行用户界面的集合。

文档地址：https://github.com/SBoudrias/Inquirer.js



### prompts

轻量、美观、人性化的提示。

文档地址：https://github.com/terkelg/prompts



### enquirer

时尚、直观、人性化的提示系统。对于小型项目来说足够快速和轻量，对于最先进的用例来说足够强大和可扩展。

文档地址：https://github.com/enquirer/enquirer



### chalk

终端字符串样式正确完成

文档地址：https://github.com/chalk/chalk



### commander

Node.js 命令行程序的完整解决方案。

文档地址：https://github.com/tj/commander.js



### yargs

Yargs 框架通过使用 Node.js 构建功能全面的命令行应用，它能轻松配置命令，解析多个参数，并设置快捷方式等，还能自动生成帮助菜单。

文档地址：https://github.com/yargs/yargs



### minimist

一个用来解析命令行选项的库。

文档地址：https://github.com/minimistjs/minimist



## 日志记录

日志记录事件以帮助调试应用中的问题。

### winston

几乎所有内容的日志记录器。

文档地址：https://github.com/winstonjs/winston



### loglevel

JavaScript 的最小轻量级日志记录，向任何可用的 console.log 方法添加可靠的日志级别方法。

文档地址：https://github.com/pimterry/loglevel



### npmlog

npmlog 是一个用于在命令行界面输出日志的Node.js库。

文档地址：https://github.com/npm/npmlog



## 构建系统

管理包含多个不同项目的代码库 (Monorepos)。

### Lerna

Lerna 是一个快速、现代的构建系统，用于管理和发布来自同一存储库的多个 JavaScript/TypeScript 包。

文档地址：https://github.com/lerna/lerna



### turbo

Turborepo 是一个用于 JavaScript 和 TypeScript 代码库的高性能构建系统。

文档地址：https://github.com/vercel/turbo



### nx

核心 Nx 插件包含 Nx 的核心功能，如项目图、nx 命令和任务编排。

文档地址：https://github.com/nrwl/nx



## 访问控制

根据各种访问控制模式限制用户操作。

### @casl/CASL

CASL是一个同构授权 JavaScript 库，它限制允许给定用户访问的资源。

文档地址：https://github.com/stalniy/casl



### casbin

Node.JS 中支持 ACL、RBAC、ABAC 等访问控制模型的授权库。

文档地址：https://github.com/casbin/node-casbin



### accesscontrol

Node.js 基于角色和属性的访问控制。

文档地址：https://github.com/onury/accesscontrol



## 作业队列

从主线程中安排和处理 CPU 密集型任务。

### bull

基于Redis的一个Node.js任务队列管理库。

文档地址：https://github.com/OptimalBits/bull



### bullmq

基于Redis的消息和作业队列。

文档地址：https://github.com/taskforcesh/bullmq



## 打包为可执行文件

将 Node.js 应用打包成单个可执行文件。



### pkg

一个命令行工具，用于将 JavaScript 代码打包成可执行的二进制文件。它提供了一种将 Node.js 应用程序打包为可独立运行的可执行文件的方法，无需依赖外部的 Node.js 安装。

文档地址：https://github.com/vercel/pkg



### @vercel/ncc

用于将 Node.js 模块打包成单个文件。它可以将项目中的多个模块打包成一个独立的 JavaScript 文件，方便在不需要依赖管理器或构建工具的环境中运行。

文档地址：https://github.com/vercel/ncc



## 模板引擎

渲染动态 HTML 输出。

### handlebars

一个简单、高效的模板引擎，用于在 Web 应用程序中生成动态的 HTML 页面。它基于 Mustache 模板语法，并扩展了一些功能。

文档地址：https://github.com/handlebars-lang/handlebars.js



### ejs

一种简单而灵活的模板引擎，用于在Node.js和浏览器中生成动态HTML页面。它允许您在你的HTML模板中嵌入JavaScript代码，以动态地生成内容。

文档地址：https://github.com/mde/ejs



















## shell

从 Node.js 执行 shell 命令。

### shelljs

一个基于 Node.js 的轻量级模块，它提供了一组可在命令行中运行的 Shell 命令的封装和工具函数。ShellJS 的目标是让在 Node.js 环境中使用命令行操作变得更加简单和方便。

文档地址：https://github.com/shelljs/shelljs



### execa

一个用于在 Node.js 中执行外部命令的模块。

文档地址：https://github.com/sindresorhus/execa



## 其他

### jsonwebtoken (JWT)

在 Node.js 中签署并验证 JWT。

文档地址：https://github.com/auth0/node-jsonwebtoken



#### 服务端

```sh
mkdir auth-system
cd auth-system
npm init -y
npm install koa koa-router koa-bodyparser @koa/cors jsonwebtoken md5
```

```js
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const app = new Koa();
const router = new Router();

const cors = require('@koa/cors');
app.use(cors());

// 模拟用户列表
const users = [
  { id: 1, username: 'user1', password: md5('password1') }, // 密码为 password1
  { id: 2, username: 'user2', password: md5('password2') }  // 密码为 password2
];
console.log(users[0].password)

// JWT 密钥
const secretKey = 'your_secret_key';

// 登录路由
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  const hashedPassword = md5(password);
  const user = users.find(u => u.username === username && u.password === hashedPassword);
  
  if (user) {
    // 生成 token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { message: '用户名或密码错误' };
  }
});

// 保护路由示例
router.get('/protected', async (ctx) => {
  try {
    const token = ctx.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    ctx.body = { message: '这是受保护的路由', user: decoded };
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: '未授权' };
  }
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('服务器在 http://localhost:3000 上运行');
});
```



#### 客户端

```vue
<template>
  <div>
    <h2>登录</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        });

        // 保存 JWT token
        localStorage.setItem("token", response.data.token);
        this.message = "登录成功！";
        // 可以在这里跳转到其他页面，例如 /protected
        this.$router.push("/protected");
      } catch (error) {
        this.message = "登录失败，请检查用户名和密码。";
      }
    },
  },
};
</script>

<style scoped>
.message {
  color: red;
}
</style>
```

```vue
<template>
  <div>
    <h2>受保护的页面</h2>
    <p>{{ message }}</p>
    <button @click="logout">登出</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.message = response.data.message;
    } catch (error) {
      this.message = "未授权，请登录。";
      this.$router.push("/login");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
```



### body-parser

node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。



### 身份验证 passport

一个用于身份验证的 Node.js 中间件。它提供了一种简单且灵活的方式来实现用户认证功能。

文档地址：https://github.com/jaredhanson/passport



### 身份验证 express-session

一个用于处理会话管理的 Node.js 中间件。它基于 Express 框架，提供了简单且易于使用的会话管理解决方案。

文档地址：https://github.com/expressjs/session















### 发送电子邮件 nodemailer

从 Node.js 应用发送电子邮件。

文档地址：https://github.com/nodemailer/nodemailer

教程：https://mp.weixin.qq.com/s/DQc7pddLhEeYoC-yWZ1q0A



### 版本发布 semantic-release

一个自动化版本发布工具，它遵循语义化版本规范，根据提交的代码变动自动生成适当的版本号，并发布到代码仓库。

文档地址：https://github.com/semantic-release/semantic-release



### 中国地址生成器 chinese-address-generator

中国地址生成器 - 三级地址 四级地址 随机生成完整地址。

文档地址：https://github.com/moonrailgun/chinese-address-generator



### 代理服务器 anyproxy

AnyProxy 是阿里的一个基于 NodeJS 的，可供插件配置的 HTTP/HTTPS 代理服务器。

文档地址：https://github.com/alibaba/anyproxy



### download-git-repo

从 node 下载并解压缩 git 存储库（GitHub、GitLab、Bitbucket）。

文档地址：https://www.npmjs.com/package/download-git-repo



### dotenv

从 .env 加载 nodejs 项目的环境变量。避免在js文件中明文写入服务器、数据库等敏感信息。

文档地址：https://github.com/motdotla/dotenv



### rimraf

跨平台实现中节点的 UNIX 命令 `rm -rf`。

文档地址：https://www.npmjs.com/package/rimraf

```sh
rimraf node_modules
```

