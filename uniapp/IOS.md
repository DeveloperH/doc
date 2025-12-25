

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

















