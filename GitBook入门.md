### GitBook介绍

GitBook 是一个基于 Node.js 的命令行工具，可使用 Github/Git 和 Markdown来制作精美的电子书



### 安装

全局安装`gitbook-cli`

`npm install -g gitbook-cli`

推荐使用v10.22.0版本的node.js。

确认GitBook安装成功：`gitbook -V`



### 使用

1.创建书籍，新建mybook文件夹，初始化：`gitbook init`

执行上述命令后，会自动生成两个必要的文件 `README.md` 和 `SUMMARY.md`。
README.md: 书的介绍文字，如前言、简介，在章节中也可做为章节的简介。
SUMMARY.md: 定制书籍的章节结构和顺序。



2.预览书籍

`gitbook serve`

执行命令，GitBook 会启动一个 4000 端口（http://localhost:4000）用于预览。



3.构建书籍

`gitbook build`

上述命令默认将生成的静态网站输出到 _book 目录。
实际上，这一步也包含在 gitbook serve 里面，但 gitbook build 可以指定路径：

`gitbook build [书籍路径] [输出路径]`



生成其他格式的电子书：

```
gitbook pdf ./ ./mybook.pdf
gitbook epub ./ ./mybook.epub
gitbook mobi ./ ./mybook.mobi
```





### 添加GitBook插件

当遇到「左侧的目录折叠」这种需求的时候，就用到 GitBook 插件了。

安装插件只需要在书籍目录下增加 book.json 文件，例如增加 折叠目录 的插件，需要在 book.json 内增加下面代码:

```json
{
    "plugins": ["expandable-chapters-small"],
    "pluginsConfig": {
        "expandable-chapters-small":{}
    }
}
```

然后终端执行 install 来安装插件即可：

```
gitbook install
```



推荐插件：https://blog.csdn.net/weixin_37865166/article/details/91899788

https://www.cnblogs.com/mingyue5826/p/10307051.html

https://segmentfault.com/a/1190000019473512

https://segmentfault.com/a/1190000019806829





### 自定义主题

在偏好设置 > 外观 > 打开主题文件夹，找到 `github.css` 文件，可以先保留一份副本。

然后可以根据自己需求里面的修改css样式。

例如： 

```css
code {
    background-color: #f8f8fc;
    padding: 0 2px 0 2px;
    color: #d63200;
}
```









### 感谢提供参考

参考文章：https://blog.csdn.net/lu_embedded/article/details/81100704





























