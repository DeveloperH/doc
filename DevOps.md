# 运维



# CentOS

CentOS（Community Enterprise Operating System，中文意思是社区企业操作系统）是Linux发行版之一，是免费的、开源的、可以重新分发的开源操作系统。

CentOS Linux发行版是一个稳定的，可预测的，可管理的和可复现的平台，源于Red Hat Enterprise Linux（RHEL）依照开放源代码（大部分是GPL开源协议）规定释出的源码所编译而成。

Red Hat软件包格式为 `.rpm` 。

CentOS 7 在2024年6月30日正式结束支持。



[官网](https://www.centos.org/)

[CentOS 7.9.2009](https://vault.centos.org/7.9.2009/isos/x86_64/)

[阿里云 CentOS 7.9.2009](https://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/)



```sh
# 显示 CentOS 的具体版本号。例如 CentOS Linux release 7.9.2009 (Core)
cat /etc/centos-release

# 显示更详细的操作系统信息，包括版本号、名称和其他有用的信息
cat /etc/os-release
```



## 术语和镜像

* `CentOS` ：Community Enterprise Operating System，社区企业操作系统
* `RHEL` ：Red Hat Enterprise Linux，红帽企业 Linux
* `RPM` ：Red Hat Package Manager，红帽包管理器
* `yum` ：Yellow dog Updater, Modified 简称，RPM 软件包管理器
* `Fedora` ：商业化的 Red Hat Enterprise Linux 发行版的上游源码
* `EPEL源` ：Extra Packages for Enterprise Linux，一个由 Fedora 项目支持的补充软件仓库，提供大量不在官方库中的开源软件



常见的 CentOS 7 镜像文件后缀及其含义：

1. **DVD** (`CentOS-7-x86_64-DVD.iso`)
   - 这是最常见的完整安装镜像。它包含了 CentOS 的完整安装包，可以离线安装操作系统，并且包含了大部分常用的软件包，适用于需要安装完整操作系统并能够不依赖网络连接的用户。这个镜像通常大小较大，约 4GB 左右。
2. **Minimal** (`CentOS-7-x86_64-Minimal.iso`)
   - 这个镜像比 DVD 镜像小，通常约为 600MB。它仅包含 CentOS 操作系统的基本安装，适合用来安装一个极简的操作系统，然后用户可以根据需求安装额外的包。这是适用于资源受限或需要定制安装的用户。
3. **NetInstall** (`CentOS-7-x86_64-NetInstall.iso`)
   - 这是一个较小的镜像文件（约 500MB）。它包含了最基本的安装程序，可以通过网络下载 CentOS 所需的软件包。适合那些网络速度较好，且希望从网络上下载最新版本软件包的用户。安装过程中需要有效的网络连接。
4. **Everything** (`CentOS-7-x86_64-Everything.iso`)
   - 这个镜像包含了 CentOS 的所有软件包，适用于那些需要离线访问所有 CentOS 软件包的用户。它比 DVD 镜像要大，因为它包含了完整的仓库数据，但仍然不会像完整仓库那样庞大。
5. **Live** (`CentOS-7-x86_64-LiveGNOME.iso` 或 `CentOS-7-x86_64-LiveKDE.iso`)
   - 这些是“Live”镜像，允许你在不安装操作系统的情况下运行 CentOS。你可以直接从 USB 或光盘启动系统，体验 CentOS 的桌面环境（GNOME 或 KDE）。这种镜像不适合进行完整的系统安装，而是适合演示、测试或修复现有系统。
6. **Boot** (`CentOS-7-x86_64-Boot.iso`)
   - 这个镜像文件仅包含启动程序。它用于从启动设备启动并获取安装程序，安装文件会从网络或其他媒体获取。这个镜像通常用于特殊场景，或者当你只需要启动并连接到网络获取安装文件时使用。



## 目录结构

Linux 的目录结构是一个树型结构，它没有盘符这个概念，只有一个根目录 `/` ，所有文件都在它下面。

* 在 Linux 系统中，路径之间的层级关系，使用 `/` 来表示
* 在 Windows 系统中，路径之间的层级关系，使用  `\` 来表示



工作目录：当前登录用户的 HOME 目录作为当前工作目录。

HOME 目录：每个 Linux 操作用户在 Linux 系统的个人账户目录，路径在 `/home/用户名` 。root 用户路径在 `/root`



特殊路径符：

* `.` ：表示当前目录
* `..` ：表示上一级目录
* `~` ：表示 HOME 目录



`*` 通配符用来做模糊匹配，它可以匹配任意内容（包含空），示例：

* `test*` ：表示匹配任何以 test 开头的内容
* `*test` ：表示匹配任何以 test 结尾的内容
* `*test*` ：表示匹配任何包含 test 的内容



管道符 `|` ：将管道符左边命令的结果，作为右边命令的输入。

被反引号包围的内容，会被作为命令执行，而非普通字符。

`$` 符：用于获取环境变量的值。`echo $PATH`



重定向符：

* `>` ：将左侧命令的结果，覆盖写入到符号右侧指定的文件中
* `>>` ：将左侧命令的结果，追加写入到符号右侧指定的文件中

```sh
echo `pwd` > 1.txt
echo `pwd` >> 1.txt
cat hello.txt >> 1.txt
```



IP 地址：

* `127.0.0.1` ：回环地址 IP，表示本机
* `0.0.0.0` ：特殊 IP 地址
  * 可以用于指代本机
  * 可以在端口绑定中用来确定绑定关系
  * 在一些 IP 地址限制中，代表所有 IP 的意思，如放行规则设置为这个，表示允许任意 IP 访问



域名解析：

* 先查看本机的记录 `/etc/hosts`
* 再联网去 DNS 服务器（如 114.114.144.114，8.8.8.8）询问



Linux 系统支持65535个端口：

* 公认端口：1~1023，通常用于一些系统内置或知名程序的预留使用，如22、443等。非特殊需要，不要占用这个范围的端口
* 注册端口：1024~49151，通常可以随意使用，用于松散的绑定一些程序/服务
* 动态端口：49152~65535，通常不会绑定程序，而是当程序对外进行网络链接时，用于临时使用





## 命令

无论是什么命令，用于什么用途，在 Linux 中，命令有其通用的格式：

`command [-options] [parameter]`

* command ：命令本身
* -options ：[可选，非必填] 命令的一些选项，可以通过选项控制命令的行为细节
* paramter ：[可选，非必填] 命令的参数，多数用于命令的指向目标等

语法中的 `[]` ，表示可选的意思。



### ls

`ls` 命令的作用是列出目录下的内容。

语法：`ls [-a -l -h] [Linux路径]`

* 当不使用选项和参数，直接使用 ls 命令本体，表示：以平铺形式，列出当前工作目录下的内容
* `-a` ：all 的意思，表示列出全部文件（包含隐藏的文件/文件夹）
* `-l` ：以列表（竖向排列）的形式展示内容，并展示更多细节
* `-h` ：以易于阅读的形式，列出文件大小，如 `K、M、G` 。必须要搭配 `-l` 一起使用
* 选项可以组合使用：`ls -l -a ` 、`ls -alh`
* 路径参数：指定要查看的文件夹（目录）的内容



```sh
ls
ls -lha
ls /etc/ssh
ls -lha /etc/ssh
```



### ll

`ll` 命令等于 `ls -l`



### cd

`cd` （Change Directory）：切换工作目录。

语法：`cd [Linux路径]`

* 带有参数，表示要切换到哪个目录下
* 不带参数，表示回到用户的 HOME 目录



### pwd

`pwd`（Print Work Directory）：查看当前所在的工作目录。

语法：`pwd`



### mkdir

`mkdir` （Make Directory）：创建新的目录（文件夹）。

语法：`mkdir [-p] Linux路径`

* `-p` ：表示自动创建不存在的父目录，适用于创建连续多层级的目录
* 参数必填，表示 Linux 路径，即要创建的文件夹的路径，相对路径或绝对路径均可。可以同时创建多个目录，用空格隔开

注意：创建文件夹需要修改权限。



```sh
mkdir test
mkdir -p test/a/b
mkdir -p /home/test
```



### touch

`touch` ：创建文件。

语法：`touch Linux路径`

如果不加选项，会修改文件或者目录的时间属性，包括存取时间和更改时间。

```sh
touch abc.txt
touch test/a.txt
touch 1.txt 2.txt
```



### cat

`cat` ：查看文件内容。

语法：`cat Linux路径`

```sh
cat abc.txt
cat /root/test/abc.txt

# 将多个文件内容追加到另一个文件中
cat 1.txt 2.txt >> 3.txt 
```



### more

`more` ：查看文件内容。

与 cat 不同的是，cat 是直接将内容全部显示出来。

而 more 支持翻页，如果文件内容过多，可以一页页的显示。在查看的过程中，通过空格翻页，通过 q 退出查看。

语法：`more Linux路径`

```sh
more abc.txt
more /etc/services
```



### cp

`cp` （Copy）：用于复制文件或文件夹。

语法：`cp [-r] 参数1 参数2 `

* `-r` ：复制文件夹时使用，表示递归
* 参数1：Linux 路径，表示被复制的文件或文件夹
* 参数2：Linux 路径，表示要复制去的地方

```sh
cp demo.txt demo1.txt
cp demo.txt ./test
cp -r test test-cp
```



### mv

`move` （Move）：用于移动文件或文件夹。还可以用于重命名操作。

语法：`move 参数1 参数2 `

* 参数1：Linux 路径，表示被移动的文件或文件夹
* 参数2：Linux 路径，表示要移动去的地方。如果目标不存在，则进行改名，确保目标存在

```sh
mv demo.txt demo2.txt
```



### rm

`rm`（Remove）：用于删除文件或文件夹。rm 命令支持通配符 `*` ，用来做模糊匹配。

语法：`rm [-r -f] 参数1 参数2 ... 参数N `

* `-r` ：删除文件夹时使用，表示递归
* `-f` ：表示 force，用于强制删除（不会弹出确认信息）。只有 root 用户删除内容才有提示，所以一般用户用不到该选项。
* 参数：Linux 路径，表示要删除的文件或文件夹路径，多个路径按照空格隔开

```sh
rm demo.txt
rm 1.txt 2.txt
rm -f demo.txt
rm -rf test

rm -rf test*
rm -rf *

# 格式化。不要用
rm -rf /
```



### which

命令实际就是一个个的二进制可执行程序。可以通过 `which` 命令，查看所使用的一系列命令的程序文件存放在哪里。

语法：`which 要查找的命令`

```sh
which ls
which mv

# 输出 /usr/bin/ls

# 找到实际的Java安装目录
readlink -f $(which java) | sed 's:/bin/java::g'
```



### find

`find` ：搜索指定的文件。

按文件名查找：被查找文件名，支持使用通配符 `*` 来做模糊查询。

语法：`find 起始路径 -name "被查找文件名"`

```sh
find / -name hello.txt
find / -name "hello.txt"
find / -name hello*
```



`find` 命令还支持按文件大小查找文件。

语法：`find 起始路径 -size +|-n[kMG]`

* `+、-` ：表示大于和小于
* `n` ：表示大小数字
* `kMG` ：表示大小单位。k 表示 kb，M 表示 MB，G 表示 GB

```sh
find / -size +1M
find /root -size +6k
find /root -size -2k
```



### locate

`locate` ：用于查找文件和文件夹。

语法：`locate 文件或文件夹`

```sh
locate 1.txt
locate demo
```



### grep

`grep` ：从文件中通过关键字过滤文件行。

语法：`grep [-n -c] 关键字 文件路径`

* `-n` ：表示在结果中显示匹配的行的行号
* `-c` ：计算重复的次数。不能和 `-n` 一起使用
* 关键字：表示要过滤的关键字。带有空格或其他特殊符号，建议使用 `""` 将关键字包围起来
* 文件路径：表示要过滤内容的文件路径，可作为管道符的输入

```sh
grep hh 1.txt
grep -n hh 1.txt
grep -c hh 1.txt
```



管道符 `|` ：将管道符左边命令的结果，作为右边命令的输入。

```sh
cat 1.txt | grep hh
ls -lh / | grep usr
```



### wc

`wc` ：统计文件的行数、单词数量等。

语法：`wc [-c -m -l -w] 文件路径`

* `-c` ：统计字节数
* `-m` ：统计字符数
* `-l` ：统计行数
* `-w` ：统计单词数
* 不带选项默认统计：行数、单词数、字节数
* 文件路径：被统计的文件，可作为管道符的输入

```sh
wc 1.txt
wc -c 1.txt
wc -cmlw 1.txt

ls -lh / | wc -l
```



### echo

`echo` ：在命令行内输出指定内容，复杂内容可以用 `""` 包围。类似于编程语言的 print 语句。

语法：`echo 输出的内容`

```sh
echo hello
echo "hello"

# 反引号 `` ：被反引号包围的内容，会被作为命令执行，而非普通字符
echo `pwd`

# 输入环境变量中PATH的值
echo $PATH
echo ${PATH}123
```



### tail

`tail` ：可以查看文件尾部内容，跟踪文件的最新修改。

语法：`tail [-f -num] Linux路径`

* `-f` ：表示持续跟踪
* `-num` ：表示查看尾部多少行，不填默认10行
* 参数：表示被跟踪的文件路径

```sh
tail 1.txt
tail -f 1.txt
tail /etc/services
tail -5 /etc/services
```



### history

`history` ：查看历史输入过的命令。

语法：`history`



历史命令搜索：

* 可以通过 `!命令前缀`，自动执行上一次匹配前缀的命令。
* 通过快捷键 `ctrl + r` ，输入内容去匹配历史命令。如果搜索到的内容是你需要的，那么：
  * 回车键可以直接执行
  * 键盘左右键，可以得到此命令（不执行）



### clear

`clear` ：清屏。还可以使用快捷键 `ctrl + l` 清屏。

语法：`clear`



### ping

`ping` ：检查指定的网络服务器是否是可联通状态

语法：`ping [-c num] ip或主机名`

* `-c` ：检查的次数。不使用 `-c` 选项，将无限次数持续检查

```sh
ping www.baidu.com
ping -c 3 www.baidu.com
```



### wget

`wget` ：非交互式的文件下载器，可以在命令行内下载网络文件。如果没有 wget 命令，可以通过 yum 安装。

语法：`wget [-b] url`

* `-b` ：后台下载，会将日志写入到当前工作目录的 wget-log 文件

注意：无论下载是否完成，都会生成要下载的文件。如果下载未完成，请及时清理未完成的不可用文件。

```sh
wget https://www.huangyihui.cn/upload/gburlimg/ebee5de398021.png
wget -b https://www.huangyihui.cn/upload/gburlimg/ebee5de398021.png

# 通过tail命令可以监控后台下载进度
tail -f wget-log
```



### curl

`curl` ：发送 http 网络请求，可用于下载文件、获取信息等。

语法：`curl [-O] url`

* `-O` ：用于下载文件，当 url 是下载链接时，可以使用此选项保存文件

```sh
curl www.baidu.com
curl -O https://www.huangyihui.cn/upload/gburlimg/ebee5de398021.png
```



### ssh

`ssh` ：连接基于 Linux 的远程主机。

```sh
ssh root@192.168.4.21

# 使用 GUI 连接远程主机
ssh -XY root@192.168.4.21
```



### tar

`tar` ：可以对 `.tar` 、`.gzip` 的压缩格式进行压缩或解压缩。

语法：`tar [-c -v -x -f -z -C] 参数1 ... 参数N`

* `-z` ：gzip 模式，不使用就是普通的 tarball 格式（不压缩）。如果使用的话，一般处于选项位第一个
* `-c` ：创建压缩文件，用于压缩模式
* `-v` ：显示压缩、解压过程，用于查看进度
* `-f` ：要创建的文件，或要解压的文件。`-f` 选项必须在所有选项中位置处于最后一个
* `-x` ：解压模式
* `-C` ：选择解压的目的地，用于解压模式

```sh
# 压缩
tar -cvf test.tar 1.txt 2.txt
tar -zcvf test.tar.gz 1.txt 2.txt

# 解压
tar -xvf test.tar
tar -zxvf test.tar.gz
tar -zxvf test.tar.gz -C test
```



### zip

`zip` ：压缩文件为 `.zip` 压缩包。

语法：`zip [-r] 参数1 ... 参数N`

* `-r` ：被压缩的包含文件夹的时候，需要使用该选项。

```sh
zip demo.zip 1.txt 2.txt
zip -r demo.zip 1.txt imgs
```



### unzip

`unzip` ：解压 zip 压缩包。

语法：`unzip [-d] 参数`

* `-d` ：指定要解压去的位置

```sh
unzip demo.zip
unzip demo.zip -d myzip
```



### rz、sz

`rz` ：文件上传。

`sz 文件路径` ：文件下载。会自动下载到桌面的 fsdownload 文件夹中。

注意：rz、sz 命令需要安装，并且需要终端软件支持才可正常运行。

```sh
yum -y install lrzsz
rz
sz 1.txt
```



### man

`man` ：用来查看 Linux 命令的使用手册。按 q 退出。

语法：`man 命令`

```sh
man ls
man clear
```





## vi/vim

vi/vim 是 visual interface 的简称，是 Linux 中最经典的文本编辑器。

vim 是 vi 的加强版本，兼容 vi 的所有指令，不仅能编辑文本，而且还具有 shell 程序编译的功能，可以不同颜色的字体来辨别语法的正确性，极大方便了程序的设计和编辑性。



语法：`vim 文件路径`

如果文件路径表示的文件不存在，那么此命令会用于编辑新文件。

快速体验：

1. 输入命令 `vim 1.txt` 后，会进入 vim 的命令模式
2. 按下 `i` 进入输入模式
3. 内容编辑完成后，按下 `esc` 退出输入模式，回到命令模式
4. 输入 `:` 进入底线命令模式，输入 `:wq` 保存并退出



工作模式：

* 命令模式：所敲的按键，编辑器都理解为命令，以命令驱动执行不同的功能。在此模式下，不能自由进行文本编辑
  * `i` ：**在当前光标位置**进入输入模式
  * `a` ：**在当前光标位置之后**进入输入模式
  * `I` ：**在当前行的开头**进入输入模式
  * `A` ：**在当前行的结尾**进入输入模式
  * `o` ：**在当前光标的下一行**进入输入模式
  * `O` ：**在当前光标的上一行**进入输入模式
  * `esc` ：任何情况下按下 esc 都能回到命令模式
* 输入模式：此模式下，可以对文件内容进行自由编辑
* 底线命令模式：以 `:` 开始，通常用于文件的保存、退出
  * `:wq` ：保存并退出
  * `:q` ：仅退出
  * `:q!` ：强制退出
  * `:w` ：仅保存
  * `:set nu` ：显示行号
  * `:set paste` ：设置粘贴模式



命令模式快捷键：

| 命令            | 描述                               |
| --------------- | ---------------------------------- |
| 方向键上、键盘k | 向上移动光标                       |
| 方向键下、键盘j | 向下移动光标                       |
| 方向键左、键盘h | 向左移动光标                       |
| 方向键右、键盘l | 向右移动光标                       |
| 数字0           | 移动光标到当前行的开头             |
| $               | 移动光标到当前行的结尾             |
| PgUp            | 向上翻页                           |
| PgDn            | 向下翻页                           |
| /               | 进入搜索模式                       |
| n               | 向下继续搜索                       |
| N               | 向上继续搜索                       |
| dd              | 删除光标所在行                     |
| ndd             | n是数字，表示删除当前光标向下n行   |
| yy              | 复制当前行                         |
| nyy             | n是数字，表示复制当前行和下面的n行 |
| p               | 粘贴复制的内容                     |
| u               | 撤销修改                           |
| ctrl + r        | 反向撤销修改                       |
| gg              | 跳到首行                           |
| G               | 跳到行尾                           |
| dG              | 从当前行开始，向下全部删除         |
| dgg             | 从当前行开始，向上全部删除         |
| d$              | 从当前光标开始，删除到本行的结尾   |
| d0              | 从当前光标开始，删除到本行的开头   |



## 用户与权限

Linux 采用多用户的管理模式进行权限管理，拥有最大权限的账户名为 `root` （超级管理员）。

root 用户拥有最大的系统操作权限，而普通用户在许多地方的权限是受限的。

普通用户的权限，一般在其 HOME 目录内是不受限的，一旦出了 HOME 目录，大多数地方，普通用户仅有只读和执行权限，无修改权限。



Linux 系统中可以：

* 配置多个用户
* 配置多个用户组
* 用户可以加入多个用户组中



Linux 中关于权限的管控级别有2个级别，分别是：

* 针对用户的权限控制
* 针对用户组的权限控制

比如，针对某文件，可以控制用户的权限，也可以控制用户组的权限。



权限信息：

```
		序号1     序号2 序号3
drwxr-xr-x. 2 root root    6 7月  20 18:05 test
```

* 序号1：表示文件、文件夹的权限控制信息
* 序号2：表示文件、文件夹所属用户
* 序号3：表示文件、文件夹所属用户组



序号1的权限细节：`drwxr-xr-x` 。权限细节总共分为10个槽位：

* 槽位1：`- 或 d 或 l`
  * `-` 表示文件
  * `d` 表示文件夹
  * `l` 表示软连接
* 槽位2~4：所属用户的权限
* 槽位5~7：所属用户组的权限
* 槽位8~10：其他用户的权限



rwx：

* r 表示读权限
  * 针对文件：可以查看文件内容
  * 针对文件夹：可以查看文件夹内容，例如 ls 命令
* w 表示写权限
  * 针对文件：可以修改此文件
  * 针对文件夹：可以在文件夹内，创建、删除、改名等操作
* x 表示执行权限
  * 针对文件：可以将文件作为程序执行
  * 针对文件夹：可以更改工作目录到此文件夹，即 cd 进入



权限的数字序号：r记为4，w记为2，x记为1。

* 0：无任何权限。`---`
* 1：仅有 x 权限。`--x`
* 2：仅有 w 权限。`-w-`
* 3：有 w 和 x 权限。`-wx`
* 4：仅有 r 权限。`r--`
* 5：有 r 和 x 权限。`r-x`
* 6：有 r 和 w 权限。`rw-`
* 7：有全部权限。`rwx`





### su

`su` （Switch User）：切换用户。

语法：`su [-] [用户名]`

* `-` ：表示是否在切换用户后加载环境变量，建议加上
* 参数：用户名，表示要切换的用户，省略则表示切换到 root

切换用户后，可以通过 `exit` 命令退回上一个用户，也可以使用快捷键 `ctrl + d`



使用普通用户，切换到其他用户需要输入密码。使用 root 用户切换到其他用户，则无须密码。

```sh
su root
su - root
su hlw
```



### exit

`exit` ：退回上一个用户。也可以使用快捷键 `ctrl + d`



### passwd

`passwd` ：用来更改使用者的密码，需要根据提示输入一次旧密码和两次新密码。



### sudo

`sudo` ：为普通的命令授权，临时以 root 身份执行。

语法：`sudo 其他命令`

```sh
sudo ls
```



注意：并不是所有的用户，都有权利使用 sudo，需要为普通用户配置 sudo 认证。



### visudo

`visudo` ：用于为普通用户配置 sudo 认证。

1. 切换到 root 用户，执行 `visudo` 命令，会自动通过 vim 编辑器打开 `/etc/sudoers`

2. 在文件的最后添加：

   ```
   hlw ALL=(ALL)           NOPASSWD: ALL
   ```

   `NOPASSWD: ALL` 表示使用 sudo 命令，无需输入密码。

3. 通过 wq 保存



### groupadd

`groupadd` ：创建用户组。

语法：`groupadd 用户组名`



### groupdel

`groupdel` ：删除用户组。

语法：`groupdel 用户组名`



### useradd

`useradd` ：创建用户。

语法：`useradd [-g -d] 用户名`

* `-g` ：指定用户的组，不指定 `-g` ，会创建同名组并自动加入。指定 `-g` 需要组名已经存在。如已存在同名组，必须使用 `-g`
* `-d` ：指定用户 HOME 路径。不指定，HOME 目录默认在 `/home/用户名`



### userdel

`userdel` ：删除用户。

语法：`userdel [-r] 用户名`

* `-r` ：删除用户的 HOME 目录。不使用 `-r` ，删除用户时，HOME 目录保留



### id

`id` ：查看用户所属组。

语法：`id [用户名]`

* 参数：用户名，被查看的用户。如果不提供则查看自身



### usermod

`usermod` ：修改用户所属组。

语法：`usermod -aG 用户组 用户名`

* `-aG` ：将用户追加至用户组中，并不从其它组中删除此用户
* 将指定用户加入指定用户组。



### getent

`getent passwd` ：查看当前系统中有哪些用户。

`getent group` ：查看当前系统中有哪些用户组。



```
hlw:x:1000:1000:hlw:/home/hlw:/bin/bash
用户名:密码(x):用户ID:组ID:描述信息(无用):HOME目录:执行终端(默认bash)

hlw:x:1000:
组名称:组认证(显示为x):组ID

```



### chmod

`chmod` ：修改文件、文件夹的权限信息。注意：只有文件、文件夹的所属用户或 root 用户可以修改。

语法：`chmod [-R] 权限 文件或文件夹`

* `-R` ：对文件夹内的全部内容应用同样的操作

```sh
chmod -R 751 test
权限的数字序号：r记为4，w记为2，x记为1。

chmod -R u=rwx,g=rwx,o=rwx test

u：user 表示所属用户权限
g：group 表示所属用户组权限
o：other 表示其他用户权限
```



### chown

`chown` ：可以修改文件、文件夹的所属用户和用户组。

普通用户无法修改所属为其他用户或组，所以此命令只适用于 root 用户执行。

语法：`chown [-R] [用户][:][用户组] 文件或文件夹`

* `-R` ：对文件夹内的全部内容应用同样的操作
* 用户：修改所属用户
* 用户组：修改所属用户组
* `:` 用于分隔用户和用户组

```sh
chown hlw  1.txt
chown hlw:hlw 1.txt
chown :hlw 1.txt
chown -R root:root test
```



### users

`users` ：显示系统当前登录的用户。

语法：`users`



### who

`who` ：返回用户名、主机信息、日期、时间。





## yum

`yum` ：RPM 软件包管理器，用于自动化安装配置 Linux 软件，并可以自动解决依赖问题。

`RPM` ：Red Hat Package Manager 红帽包管理器。

yum 可以通过配置文件（如 `/etc/yum.repos.d/` 下的 `.repo` 文件）来管理不同的远程仓库，指定软件包的来源。



### rpm

```sh
# 1.查看有没有安装yum 
rpm -qa |grep yum

# 2.卸载
$ rpm -aq|grep yum|xargs rpm -e --nodeps

# 3.下载rpm包
wget http://mirrors.aliyun.com/centos/7/os/x86_64/Packages/python-urlgrabber-3.10-10.el7.noarch.rpm
wget http://mirrors.aliyun.com/centos/7/os/x86_64/Packages/yum-cron-3.4.3-168.el7.centos.noarch.rpm
wget http://mirrors.aliyun.com/centos/7/os/x86_64/Packages/yum-3.4.3-168.el7.centos.noarch.rpm
wget http://mirrors.aliyun.com/centos/7/os/x86_64/Packages/yum-metadata-parser-1.1.4-10.el7.x86_64.rpm
wget http://mirrors.aliyun.com/centos/7/os/x86_64/Packages/yum-plugin-fastestmirror-1.1.31-54.el7_8.noarch.rpm

# 4.安装rpm包
# 注意:yum-xxx-168.el7.centos.noarch.rpm 必须与 yum-plugin-fastestmirror-xxx.el7_8.noarch.rpm 同时安装
rpm -ivh --force --nodeps python-urlgrabber-3.10-10.el7.noarch.rpm 
rpm -ivh --force --nodeps yum-metadata-parser-1.1.4-10.el7.x86_64.rpm 
rpm -ivh --force --nodeps yum-3.4.3-168.el7.centos.noarch.rpm yum-plugin-fastestmirror-1.1.31-54.el7_8.noarch.rpm

# 5.检验是否安装成功
yum
```



### 安装软件

语法：`yum [-y] [install | remove | search] 软件名称`

* `-y` ：自动确认，无需手动确认安装或卸载过程
* `install` ：安装
* `remove` ：卸载
* `search` ：搜索

注意：yum 命令需要 root 权限，或使用 sudo 授权。

```sh
yum search wget
yum -y install wget
yum remove wget
```



### 命令

* `yum update` ：更新软件包。可以更新系统中已经安装的软件包到最新版本。
* `yum list [package_name]` ：查询软件包。可以查询可用软件包、已安装软件包的信息，甚至查看某个软件包的文件列表。
* `yum clean all` ：yum缓存清理
* `yum makecache` ：创建缓存



```sh
yum update
yum list
yum clean all
yum makecache
```



### 设置 yum 源

```sh
# 首先备份你当前的YUM源配置文件
sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# 下载阿里云的CentOS 7源配置文件
sudo wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# yum缓存清理,把之前的索引删掉
sudo yum clean all

# 创建缓存，用刚配置好的源下载软件包的元数据和索引信息，并将它们存储在本地缓存中，加快操作速度减少网络访问
sudo yum makecache

# 更新系统中已安装的软件包到最新版本，还同时升级软件和系统内核确保系统的稳定性和安全性
yum update

# 检查看是否配置成功(其yum源是否为阿里云)
vim /etc/yum.repos.d/ CentOs-Base.repo
```



### 配置文件

#### 主配置文件 `/etc/yum.conf`

```sh
[root@localhost ~]# cat /etc/yum.conf
[main]
cachedir=/var/cache/yum/$basearch/$releasever  #yum下载的RPM包的缓存目录 $basearch代表硬件架构 $releasever系统版本比如7 例如 /var/cache/yum/x86_64/7
keepcache=0                               #是否保存缓存  0代表不保存，1代表保存
debuglevel=2                              #调试级别(0-10)，默认为2
logfile=/var/log/yum.log                  #日志文件位置
exactarch=1                               #是否允许不同版本的rpm安装
obsoletes=1                               #update的一个参数，是否可以允许旧版本的运行
gpgcheck=1                                #是否验证GPG密钥，1表示验证
plugins=1                                 #是否允许插件，1代表允许
installonly_limit=5                       #保存几个内核
bugtracker_url=http://bugs.centos.org/set_project.php?project_id=23&ref=http://bugs.centos.org/bug_report_page.php?category=yum
distroverpkg=centos-release

# yum的repo配置文件中可用的变量：
# $releasever: 当前OS的发行版的主版本号，如：8，7，6
# $arch: CPU架构，如：aarch64, i586, i686，x86_64等
# $basearch：系统基础平台；i386, x86_64
# $contentdir：表示目录，比如：centos-8，centos-7
# $YUM0-$YUM9:自定义变量
```



#### 仓库配置文件 `/etc/yum.repos.d/*.repo`

`yum`仓库配置文件位置：`/etc/yum.repos.d/*.repo`文件扩展名为 `.repo` 。这些文件定义了`Yum`如何连接到软件仓库并下载软件包。 系统内默认的`yum`仓库，是`centos`官方的`yum`源（国外源），需要连通外网才可以使用。

客户端配置文件两个要求 ：

1. 必须在`/etc/yum.repos.d/`这个目录下。
2. 配置文件必须以`*.repo`结尾。



```sh
[root@localhost ~]#  ls /etc/yum.repos.d
CentOS-Base.repo  CentOS-CR.repo  CentOS-Debuginfo.repo  CentOS-fasttrack.repo  CentOS-Media.repo  CentOS-Sources.repo  CentOS-Vault.repo
# `yum`仓库配置文件格式：
[root@localhost yum.repos.d]# cat CentOS-Base.repo    
[base]                       #仓库的描述

#设置名称
name=CentOS-$releasever - Base - mirrors.aliyun.com

#设置链接地址，file：//是本地源的固定格式
baseurl=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/

gpgcheck=0                  #是否验证公钥，0表示无需验证 
enabled=1                   #开启此yum源
 
# yum仓库配置文件中baseurl的几种形式：
# 1. 本地源 ： 本地目录   file://        
# 2. FTP源 ： FTP服务    ftp://
# 3. 网络源 ： http://  或  https://
```



### 常用软件

* net-tools ：网络配置工具。其中包含 ifconfig、hostname、mii-tool、netstat、route等命令。

  * `ifconfig` ：查看ip地址
  * `netstat` ：查看本机端口的占用情况
    * 语法：`netstat -anp | grep 端口号`

  ```sh
  yum -y install net-tools
  
  ifconfig
  
  # 查看22端口的占用情况
  netstat -anp | grep 22
  ```
  
* nmap ：查看指定 IP 的对外暴露端口。

  ```sh
  yum -y install nmap
  
  nmap 127.0.0.1
  nmap www.baidu.com
  ```

* ntp ：用于自动校准系统时间。当 ntpd 启动后会定期的联网校准系统的时间。

  ```sh
  yum -y install ntp
  systemctl start ntpd
  systemctl enable ntpd
  
  # 也可以手动校准
  ntpdate -u ntp.aliyun.com
  ```

* [pv 管道进度监控工具，可实现进度效果](https://www.ivarch.com/programs/pv.shtml) 



### epel 源

EPEL源（Extra Packages for Enterprise Linux）：EPEL是一个由Fedora项目支持的补充软件仓库，专为RHEL（Red Hat Enterprise Linux）及其衍生版如CentOS设计。它扩展了企业级Linux发行版的软件包库，提供大量不在官方库中的开源软件，增强了系统的功能性与灵活性。



```sh
# 启用 EPEL（Extra Packages for Enterprise Linux）存储库
# 如果无法安装，请yum源为阿里云源
yum install -y epel-release

# 备份(如有配置其他epel源)
mv /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel.repo.backup
mv /etc/yum.repos.d/epel-testing.repo /etc/yum.repos.d/epel-testing.repo.backup

# 下载新repo 到/etc/yum.repos.d/
wget -O /etc/yum.repos.d/epel.repo https://mirrors.aliyun.com/repo/epel-7.repo

# 安装软件
yum install nginx
```



## 系统命令

### systemctl

Linux 系统很多软件（内置或第三方）均支持使用 `systemctl` 命令控制：启动、停止、开启自启。能够被 systemctl 管理的软件，一般也称之为：服务。

系统内置的服务比较多，比如：

* NetworkManager ：主网络服务
* network ：副网络服务
* firewall ：防火墙服务
* sshd ：ssh服务

第三方软件如果自动注册了，可以被 systemctl 控制，如果没有自动注册，也可以手动注册。



`systemctl` ：可以控制软件（服务）的启动、关闭、开启自启动等。

语法：`systemctl start | stop | restart | status | enable | disable 服务名`

* `start` ：启动
* `stop` ：关闭
* `restart` ：重新启动
* `status` ：查看状态
* `enable` ：开启开机自启
* `disable` ：关闭开机自启

```sh
systemctl status NetworkManager

yum -y install ntp
systemctl start ntpd
systemctl stop ntpd
systemctl status ntpd
systemctl enable ntpd
systemctl disable ntpd

# 重载系统服务
systemctl daemon-reload

# 关闭防火墙
systemctl stop firewalld
```



### service

`service` ：较旧的系统服务管理工具，通常用于SysV初始化系统中。推荐用 `systemctl` 替代。

```sh
service docker start
```



### firewall-cmd

`firewall-cmd` ：防火墙管理。

```sh
# 查看开放的端口
firewall-cmd --list-all

# 允许 HTTP 和 HTTPS 流量通过
firewall-cmd --zone=public --add-service=http --permanent
firewall-cmd --zone=public --add-service=https --permanent

# 放开端口
firewall-cmd --zone=public --add-port=6379/tcp --permanent

# 关闭端口
firewall-cmd --permanent --zone=public --remove-port=22/tcp

# 重新加载firewalld配置
firewall-cmd --reload
```



### reboot

`reboot` ：重启服务器。



### ln

`ln` ：在系统中创建软链接，可以将文件、文件夹链接到其他位置。类似于快捷方式。

语法：`ln -s 参数1 参数2`

* `-s` ：创建软链接
* 参数1：被链接的文件或文件夹
* 参数2：要链接去的目的地

```sh
ln -s /etc/yum.conf ~/yum.conf
ln -s /etc/yum ~/yum
```



### ps

`ps` ：Process Status（进程状态），查看系统中的进程信息。

语法：`ps [-e -f]`

* `-e` ：显示出全部的进程
* `-f` ：以完全格式化的形式展示信息（展示全部信息）
* `-a`：显示所有用户的进程（包括其他用户的进程）。
* `-x`：显示没有控制终端（TTY）的进程（如后台服务、守护进程）。
* 一般来说，固定用法就是：`ps -ef` 列出全部进程的全部信息。在部分 Unix 系统中，`-ax` 也可以写作 `-e`（`ps -e`），表示显示所有进程。

```sh
ps -ef

# 可以使用管道符配合grep进行过滤
ps -ef | grep tail
```



进程信息内容：

* UID ：进程所属的用户 ID
* PID ：进程的进程号 ID
* PPID ：进程的父 ID（启动此进程的其他进程）
* C ：此进程的 cpu 占用率（百分比）
* STIME ：进程的启动时间
* TTY ：启动此进程的终端序号，如果显示 `?` ，表示非终端启动
* TIME ：进程占用 cpu 的时间
* CMD ：进程对应的名称或启动路径或启动命令



### kill

`kill` ：关闭进程。

语法：`kill [-9] 进程ID`

* `-9` ：表示强制关闭进程。不使用此选项会向进程发送信号要求其关闭，但是否关闭看进程自身的处理机制

```sh
kill 1245
kill -9 1245
```



### top

`top` ：查看 cpu、内存使用情况。默认每5秒刷新一次，按 q 或者 `ctrl + c` 退出。

语法：`top [选项]`

* `-p` ：只显示某个进程的信息
* `-d` ：设置刷新时间，默认是5s
* `-c` ：显示产生进程的完整命令，默认是进程名
* `-n` ：执行刷新次数，比如 `top -n 3` 刷新输出3次后退出
* `-b` ：以非交互非全屏模式运行，以批次的方式执行 top，一般配合 `-n` 指定输出几次统计信息，将输出重定向到指定文件，比如 `top -b -n 3 > /tmp/top.tmp`
* `-i` ：不显示任何闲置（idle）或无用（zombie）的进程
* `-u` ：查找特定用户启动的进程



命令内容详解：

* 第一、二行：

  ```
    top  - 14:54:48      up 2:08,    5 users,  load average: 0.26, 0.15, 0.13
  命令名称  当前系统时间   启动了多长时间  几个用户登录    1、5、15分钟的负载情况（百分比）
  
  Tasks: 216 total,   1 running,    215 sleeping,   0 stopped,   0 zombie
  任务：   多少个进程   几个进程正在运行   几个进程睡眠			几个停止进程   几个僵尸进程
  ```

* 第三行：cpu 使用率

  ```
  %Cpu(s):  0.7 us,  3.1 sy,  0.0 ni, 96.2 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
  ```

  * us ：用户cpu使用率
  * sy ：系统cpu使用率
  * ni ：高优先级进程占用cpu时间百分比
  * id ：空闲cpu率
  * wa ：IO等待cpu占用率
  * hi ：cpu硬件中断率
  * si ：cpu软件中断率
  * st ：强制等待占用cpu率

* 第四、五行：

  ```
  KiB Mem :   995672 total,    73672 free,   665080 used,   256920 buff/cache
  物理内存          总量            空闲           使用            buff和cache占用
  
  KiB Swap:  2097148 total,  2014460 free,    82688 used.   159388 avail Mem 
  虚拟内存          总量            空闲           使用            buff和cache占用
  ```

* 具体信息

  ```
     PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND
  108721 root      20   0  161424   2544    792 S  0.7  0.3   0:12.49 sshd
    1167 root      20   0  574288   2340    744 S  0.3  0.2   0:01.00 tuned         
   14343 root      20   0  161304   6172   4456 S  0.3  0.6   0:03.87 sshd
   14579 root      20   0  162944   3124   1572 S  0.3  0.3   0:01.16 top
  ```

  * PID ：进程id
  * USER ：进程所属用户
  * PR ：进程优先级，越小越高
  * NI ：负值表示高优先级，正表示低优先级
  * VIRT ：进程使用虚拟内存，单位kb
  * RES ：进程使用物理内存，单位kb
  * SHR ：进程使用共享内存，单位kb
  * S ：进程状态（S休眠，R运行，Z僵死状态，N负数优先级，I空闲状态）
  * %CPU ：进程占用cpu率
  * %MEM ：进程占用内存率
  * TIME+ ：进程使用cpu时间总计，单位毫秒
  * COMMAND ：进程的命令或名称或程序文件路径



当 top 以交互式运行，可以用以下交互式命令进行控制：

* h ：显示帮助画面
* c ：显示产生进程的完整命令，等同于 `-c`
* f ：可以选择需要展示的项目
* M ：根据物理内存大小（RES）排序
* P ：根据cpu使用百分比大小进行排序
* T ：根据时间/累计时间进行排序
* E ：切换顶部内存显示单位
* e ：切换进程内存显示单位
* l ：切换显示平均负载和启动时间信息
* i ：不显示闲置或无用的进程，等同于 `-i`
* t ：切换显示cpu状态信息
* m ：切换显示内存信息



### df

`df` ：查看硬盘的使用情况。

语法：`df [-h]`

* `-h` ：以更加人性化的单位显示



### iostat

`iostat` ：查看cpu、磁盘速率的相关信息。

语法：`iostat [-x] [刷新间隔] [刷新几次]`

* `-x` ：显示更多信息

```sh
iostat
iostat -x
iostat 3 2
```



信息详解：

* avg-cpu ：cpu相关信息
* tps ：该设备每秒的传输次数。
* rrqm/s ：每秒这个设备相关的读取请求有多少被 Merge 了
* wrqm/s ：每秒这个设备相关的写入请求多多少被 Merge 了
* r/s ：每秒读取的扇区数
* w/s ：每秒写入的扇区数
* **rkB/s ：每秒发送到设备的读取请求数**
* **wkB/s ：每秒发送到设备的写入请求数**
* avgrq-sz ：平均请求扇区的大小
* avgqu-sz ：平均请求队列的长度
* await ：每一个IO请求的处理的平均时间（微秒毫秒）
* r_await ：每一个读取请求的处理的平均时间（微秒毫秒）
* w_await ：每一个写入请求的处理的平均时间（微秒毫秒）
* svctm ：平均每次设备IO操作的服务时间（毫秒）
* **%util ：磁盘利用率**

​       

### sar

`sar` ：查看网络的相关统计。

语法：`sar -n DEV 刷新间隔 查看次数`

* `-n` ：查看网络
* `DEV` ：查看网络接口
* 最终会根据次数，汇总平均记录

```sh
sar -n DEV 2 3
```



信息详解：

* IFACE ：本地网卡接口的名称
* rxpck/s ：每秒钟接受的数据包
* txpck/s ：每秒钟发送的数据包
* rxkB/s ：每秒钟接受的数据包大小
* txkB/s ：每秒钟发送的数据包大小
* rxcmp/s ：每秒钟接受的压缩数据包
* txcmp/s ：每秒钟发送的压缩数据包
* rxmcst/s ：每秒钟接受的多播数据包

​             

### uptime、w

`uptime` ：显示系统运行了多少时间、当前登录的用户数，操作系统在过去的1、5、15分钟内的平均负载。

`w` ：可以用于替代 `uptime` ，w 也提供关于当前系统登录用户和用户所进行工作的相关信息。

它们都是 `top` 命令的简略信息。



### lsof

`lsof` ：查看端口占用情况。

语法：`lsof -i:端口号`



### env

`env` ：查看当前系统中记录的环境变量。环境变量是一种 KeyValue 型结构。常用于辅助系统在运行的时候从环境变量中获取关键信息。

语法：`env`



常见的环境变量：

* PATH ：记录了系统执行任何命令的搜索路径。路径间用 `:` 隔开。



`$` ：用于获取环境变量的值。当和其他内容混合在一起时，可以通过 `${}` 来包围变量。

```sh
env
env | grep PATH

# 获取环境变量中PATH的值
echo $PATH
echo ${PATH}123
```



设置环境变量：

* 临时设置：`export 变量名=变量值` 。例如 `export hello=abc123`
* 永久生效
  * 针对当前用户生效：配置在当前用户的 `~/bashrc` 文件中
  * 针对所有用户生效：配置在系统的 `/etc/profile` 文件中
  * 通过命令 `source 配置文件`，进行立即生效，或重新登录生效



```sh
# 自定义命令

# 创建自定义命令，也就是文件
mkdir -p /root/myenv
cd /root/myenv
vim print1
chmod 755 print1

# 临时设置
export PATH=$PATH:/root/myenv

# 永久生效：在 /etc/profile 中添加：export PATH=$PATH:/root/myenv
vim /etc/profile
source /etc/profile
```



### source

`source` ：用于从当前 shell 会话中的文件读取和执行命令。这个命令通常用于保留或更改当前 shell 中的环境变量。

语法：`source 文件路径`

```sh
source /etc/profile
```





### date

`date` ：查看系统的时间。

语法：`date [-d] [+格式化字符串]`

* `-d` ：按照给定的字符串显示日期，一般用于日期计算。支持的时间标记为：
  * year 年
  * month 月
  * day 天
  * hour 小时
  * minute 分钟
  * second 秒
* 格式化字符串：通过特定的字符串标记，来控制显示的日期格式
  * `%Y` ：年
  * `%y` ：年份后两位数字（00,99）
  * `%m` ：月份（01,12）
  * `%d` ：日（01,31）
  * `%H` ：小时（00,23）
  * `%M` ：分钟（00,59）
  * `%S` ：秒（00,60）
  * `%s` ：自 1970-01-01 00:00:00 UTC 到现在的秒数（时间戳）
* `-d` 选项可以和格式化字符串一起使用

```sh
date
date +%Y-%m-%d
date "+%Y-%m-%d %H:%M:%S"
date +%s

date -d "+1 day"
date -d "+3 month"
date -d "+3 month" "+%Y-%m-%d %H:%M:%S"
```



### 修改时区

如果系统默认时区不是中国的东八区，可以通过以下操作修改时区：

```sh
rm -f /etc/localtime
sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```



### ifconfig

`ifconfig` ：查看本机的 ip 地址。如无法使用 ifconfig 命令，可以安装 `yum -y install net-tools`

语法：`ifconfig`



### hostname

`hostname` ：查看主机名。

语法：`hostname`



### hostnamectl

`hostnamectl` ：可以控制主机名服务。

修改主机名，语法：`hostnamectl set-hostname 主机名`

```sh
hostnamectl set-hostname centos7
```

















## 快捷键

* `ctrl + c` ：强制停止或取消命令输入
* `ctrl + d` ：退出账号的登录或退出某些特定程序的专属页面。例如 python
* `ctrl + l` ：清屏
* `ctrl + r` ：历史命令搜索，回车可以执行，方向键可以得到此命令。
* 光标移动：
  * `ctrl + a` ：跳到命令开头
  * `ctrl + e` ：跳到命令结尾
  * `ctrl + 左方向键` ：向左跳一个单词
  * `ctrl + 右方向键` ：向右跳一个单词
* 



































# Ubuntu



## WSL

WSL（Windows Subsystem for Linux）是用于 Windows 系统之上的 Linux 子系统。它可以在 Windows 系统中获得 Linux 系统环境，并完成直连计算机硬件，无须通过虚拟机虚机硬件。

WSL 是 Windows10 自带功能，需要开启，无需下载。

* win10 ：应用和功能 → 启用或关闭 Windows 功能 → 勾选上适用于 Linux 的 Windows 子系统
* win11 ：设置 → 系统 → 更多 Windows 功能 → 勾选上适用于 Linux 的 Windows 子系统



打开 Windows 应用商店，搜索 Ubuntu，点击获取并安装，打开后输入用户名和密码就可以使用了。Ubuntu 自带的终端窗口软件不太好用，所以还需要在 Windows 应用商店中下载安装 Windows Terminal。



## apt

`apt` ：deb 包软件管理器，用于自动化安装配置 Linux 软件，并可以自动解决依赖问题。

语法：`apt [-y] [install | remove | search] 软件名称`

* `-y` ：自动确认，无需手动确认安装或卸载过程
* `install` ：安装
* `remove` ：卸载
* `search` ：搜索

注意：apt 命令需要 root 权限，或使用 sudo 授权。

```sh
apt search wget
apt -y install wget
apt remove wget
```









# VMware Workstation

VMware Workstation Pro 16：

* [下载地址](https://download3.vmware.com/software/wkst/file/VMware-workstation-full-16.0.0-16894299.exe)
* 密钥：ZF71R-DMX85-08DQY-8YMNC-PPHV8



VMware Workstation Pro 17：

* [下载地址](https://download3.vmware.com/software/WKST-1701-WIN/VMware-workstation-full-17.0.1-21139696.exe)
* 密钥：JU090-6039P-08409-8J0QH-2YR7F



## 快照

快照可以保存虚拟机的状态，当虚拟机出现问题的时候，可以通过预先制作的快照恢复到制作时候的状态，用于备份。

* 虚拟机关机后，选择虚拟机并右键 → 快照 → 快照管理器 → 拍摄快照或恢复



## 固定 IP

步骤：

1. 在 vmware 中配置 IP 地址网关和网段

   1. 修改虚拟机网络连接为：NAT 模式
   2. 打开菜单栏 → 编辑 → 虚拟网络编辑器
   3. 选择 NAT 模式的网卡 → NAT设置 → 记住配置中的 IP 信息

2. 在 Linux 系统中修改配置文件，固定 IP

   1. ```sh
      # 编辑配置文件
      vim /etc/sysconfig/network-scripts/ifcfg-ens33 
      ```

   2. ```
      # 修改为 static
      BOOTPROTO=static
      
      # 分别是：自定义IP地址、NAT配置中的地址、子网掩码、网关
      IPADDR=192.168.235.166
      NETMASK=255.255.255.0
      GATEWAY=192.168.235.2
      DNS1=192.168.235.2
      ```

   3. ```sh
      # 重启网络
      systemctl restart network
      ```

   4. ```sh
      # 如果虚拟机重启后，找不到网卡，ifconfig 也没有ip地址，并且 systemctl status network 报错
      # No suitable device found for this connection (device lo not available)
      # 使用以下命令解决
      
      chkconfig NetworkManager off
      service NetworkManager stop
      chkconfig network on
      service network start
      ```

      



# Nginx

[nginx](https://nginx.org/) 是一个高性能的 HTTP 和反向代理服务器，特点是占有内存少，并发能力强。

nginx 专为性能优化而开发，性能是其最重要的考量，实现上非常注重效率，能经受高负载的考验，有报告表明能支持高达 50000 个并发连接数。

常用于：

* 反向代理
* 负载均衡
* 动静分离



## 安装

```sh
# 压缩包方式安装
curl -O https://nginx.org/download/nginx-1.24.0.tar.gz
tar -zxvf nginx-1.24.0.tar.gz
```

```sh
# 启用 EPEL（Extra Packages for Enterprise Linux）存储库
# 如果无法安装，请yum源为阿里云源
yum install -y epel-release

# 备份(如有配置其他epel源)
mv /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel.repo.backup
mv /etc/yum.repos.d/epel-testing.repo /etc/yum.repos.d/epel-testing.repo.backup

# 下载新repo 到/etc/yum.repos.d/
wget -O /etc/yum.repos.d/epel.repo https://mirrors.aliyun.com/repo/epel-7.repo

# 安装 nginx，配置文件位于 /etc/nginx/ 目录下
yum install -y nginx

# 启动 Nginx 服务
systemctl start nginx

# 设置 Nginx 开机自启动
systemctl enable nginx

# 检查 Nginx 状态
systemctl status nginx

# 查看 Nginx 版本
nginx -v

# 查看开放的端口号
firewall-cmd --list-all

# 设置开放的端口号
firewall-cmd --add-service=http --permanent
firewall-cmd --add-port=80/tcp --permanent

# 重启防火墙
firewall-cmd --reload
```



## 常用命令

```sh
# 查看 nginx 版本
nginx -v

# nginx 详细信息，比如查看 config 目录
nginx -V

# 查看 nginx 运行进程
ps -ef | grep nginx

# 启动 nginx
nginx

# 关闭 nginx
nginx -s stop

# 重新加载
nginx -s reload





```





## 配置文件

文件位置：`/etc/nginx/nginx.conf`

配置文件组成：

* 全局块
* events 块
* http 块



### 全局块

从配置文件开始到 events 块之间的内容，主要会设置有一些影响 nginx 服务器整体运行的配置指令，主要包括配置运行 nginx 服务器的用户（组）、允许生成的 worker process 数、进程 PID 存放路径、日志存放路径和类型以及配置文件的引入等。

这是 nginx 服务器并发处理服务的关键配置， worker process 值越大，可以支持的并发处理数量也越多，但是会受到硬件、软件等设备的制约。

```
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
```



### events 块

events 块涉及的指令主要影响 nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 work process 下的网络连接进行序列化、是否允许同时接收多个网络连接、选取哪种事件驱动模型来处理连接请求、每个 work process 可以同时支持的最大连接数等。

这部分的配置对 nginx 的性能影响较大，在实际中应该灵活配置。

```
events {
		# 每个 work process 支持的最大连接数为 1024
    worker_connections 1024;
}
```



### http 块

这是 nginx 服务器配置中最频繁的部分，代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。

需要注意的是：http 块也可以包括 http 全局块、server 块。



#### http 全局块

http 全局块配置的指令包括文件引入、MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等。



#### server 块

这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。

每个 http 块可以包括多个 server 块，而每个 server 块就相当于一个虚拟主机。

而每个 server 块也分为全局 server 块，以及可以同时包含多个 location 块。



全局 server 块：

最常见的配置是本虚拟机主机的监听配置和本虚拟机主机的名称或 IP 配置。



location 块：

一个 server 块可以配置多个 location 块。

这块的主要作用是基于 nginx 服务器接收到的请求字符串，对虚拟主机名称（也可以是 IP 别名）之外的字符串进行匹配，对特定的请求进行处理。地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行。



```
http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2;
#        listen       [::]:443 ssl http2;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers HIGH:!aNULL:!MD5;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        error_page 404 /404.html;
#            location = /40x.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#            location = /50x.html {
#        }
#    }

}
```







## 正向代理

在客户端（浏览器）配置代理服务器，通过代理服务器进行互联网访问。

![](http://qiniu.huangyihui.cn//202503252312058.jpg)





## 反向代理

我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，再返回给客户端。此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器的地址，隐藏了真实服务器IP 地址。

![](http://qiniu.huangyihui.cn//202503252312092.jpg)



```
server {
    listen       80;
    server_name  192.168.64.66;

    location = / {
        root html;
        proxy_pass http://127.0.0.1:8080;
        index index.html index.htm;
    }
}
```

```
server {
    listen       9001;
    server_name  192.168.64.66;

    location ~ /user/ {
        proxy_pass http://127.0.0.1:8080;
    }
    
    location ~ /order/ {
        proxy_pass http://127.0.0.1:8081;
    }    
}
```



## 负载均衡

单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上。

将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，就是负载均衡。

![](http://qiniu.huangyihui.cn//202503252312107.jpg)



## 动静分离

为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力。

![](http://qiniu.huangyihui.cn//202503252312151.jpg)

















































## location 优先级

| 格式                  | 说明                                                     | 优先级(小值优先) | 备注                                                     |
| --------------------- | -------------------------------------------------------- | ---------------- | -------------------------------------------------------- |
| `location = /uri`     | = 开头表示精确匹配，只有完全匹配上才能生效               | 1                | 匹配后不再继续匹配                                       |
| `location ^~ /uri`    | ^~ 开头对URL路径进行前缀匹配，并且在正则之前             | 2                | 匹配后继续尝试匹配，匹配 /uri 最长为准                   |
| `location ~ pattern`  | ~ 开头表示区分大小写的正则匹配                           | 3                | 匹配后不会再继续匹配，多个正则匹配与配置文件中的顺序有关 |
| `location ~* pattern` | ~* 开头表示不区分大小写的正则匹配                        | 4                | 匹配后不会再继续匹配，多个正则匹配与配置文件中的顺序有关 |
| `location /uri`       | 不带任何修饰符，也表示前缀匹配，但是优先级在正则匹配之后 | 5                | 匹配后继续尝试匹配，以匹配 /uri 最长为准                 |
| `location /`          | 通用匹配，如果其他都没匹配上，则命中此配置               | 6                | 通用匹配，所有没匹配上则以此配置为准                     |



```nginx
# vue-router History 模式

location / {
  try_files $uri $uri/ /index.html;
}
```





# Docker

快速构建、运行、管理应用的工具。

[官网](https://www.docker.com/)

[Docker Hub](https://hub.docker.com/)



## 安装

1. 卸载旧版本

   ```sh
   yum remove docker \
               docker-client \
               docker-client-latest \
               docker-common \
               docker-latest \
               docker-latest-logrotate \
               docker-logrotate \
               docker-engine
   ```

   

2. 配置 docker 的 yum 库

   ```sh
   # 安装yum-utils
   yum install -y yum-utils
   
   # 配置docker的yum源
   yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
   
   # 安装docker
   yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

   

3. 当步骤2失败时，按这个操作

   ```sh
   # step 1: 安装必要的一些系统工具
   sudo yum install -y yum-utils device-mapper-persistent-data lvm2
   
   # Step 2: 添加软件源信息
   sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
   
   # Step 3
   sudo sed -i 's+download.docker.com+mirrors.aliyun.com/docker-ce+' /etc/yum.repos.d/docker-ce.repo
   
   # Step 4: 更新并安装Docker-CE
   sudo yum makecache fast
   sudo yum -y install docker-ce
   
   # Step 4: 开启Docker服务
   sudo systemctl start docker
   
   # 验证安装
   docker version
   docker -v
   
   # 文档：https://developer.aliyun.com/mirror/docker-ce
   ```

   

4. 启动和校验

   ```sh
   # 启动
   systemctl start docker
   
   # 停止
   systemctl stop docker
   
   # 重启
   systemctl restart docker
   
   # 设置开启自启
   systemctl enable docker
   
   # 查看正在运行的容器
   docker ps
   ```

   

5. 配置镜像加速

   1. 进入[阿里云](https://www.aliyun.com/)并登录，点击控制台 → 容器镜像服务→ 镜像工具 → 镜像加速器

   2. 根据文档操作

      ```sh
      sudo mkdir -p /etc/docker
      sudo tee /etc/docker/daemon.json <<-'EOF'
      {
        "registry-mirrors": ["https://eekc7qb2.mirror.aliyuncs.com"]
      }
      EOF
      sudo systemctl daemon-reload
      sudo systemctl restart docker
      ```





## 镜像、容器

当我们利用 Docker 安装应用时，Docker 会自动搜索并下载应用**镜像（image）**。镜像不仅包含应用本身，还包含应用运行所需要的环境、配置、系统函数库。

Docker 会在运行镜像时创建一个隔离环境，称为**容器（container）**。

镜像仓库：存储和管理镜像的平台。Docker 官方维护了一个公共仓库：[Docker Hub](https://hub.docker.com/)



镜像名称一般分两部分组成：`[repository]:[tag]`

* repository 是镜像名
* tag 是镜像的版本。没有指定 tag 时，默认是 latest，代表最新版本的镜像
* 例如 `mysql:5.7`



## 命令

* `docker images` ：查看本地镜像列表
* `docker rmi 镜像名称` ：删除镜像
* `docker run` ：创建并运行容器
  * `docker run -d --name ms -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 mysql`
* `docker stop 容器名` ：停止容器
* `docker start 容器名` ：启动容器
* `docker restart 容器名` ：重启容器
* `docker ps [-a]` ：查看容器
  * `-a` ：查看所有容器
* `docker rm [-f] 容器名` ：删除容器
  * `-f` ：强制删除容器，不需要先停止再删除
* `docker inspect 容器名` ：查看容器详细信息
* `docker logs [-f] 容器名` ：查看容器日志
  * `-f` ：跟踪日志输出
* `docker exec` ：在运行的容器中执行命令
  * `docker exec -it mysql mysql -uroot -p`
* `docker pull 镜像名` ：从镜像仓库拉取镜像到本地
* `docker push` ：本地镜像推送到镜像仓库
* `docker build [-t 镜像名] .` ：通过 DockerFile 构建镜像
  * `-t` ：给镜像起名，格式是 `[repository]:[tag]` 。如果不指定 tag，默认为 latest
  * `.` ：指定 Dockerfile 所在目录，如果就在当前目录，则指定为 `.`
  * `docker build -t myImage:1.0`
* `docker save` ：保存镜像到本地
  * `docker save -o nginx.tar nginx:latest`
* `docker load` ：加载镜像到本地
  * `docker load -i nginx.tar`
* `docker 命令 --help` ：查看 docker 命名帮助手册



### docker run

`docker run` ：创建并运行一个容器。

语法：`docker run -d --name 容器名字 -p 主机端口:容器端口 [-e 环境变量] [-v 数据卷/本地目录:容器内目录]  [--network 网络名] 镜像名称`

* `-d` ：让容器在后台运行	
* `--name` ：给容器起个名字，必须唯一
* `-p` ：设置端口映射，宿主机端口映射到容器内端口
* `-e` ：可选，设置环境变量
* `-v` ：可选。挂载数据卷或本地目录。如果创建了数据卷且数据卷不存在，会自动创建数据卷
  * 本地目录必须以 `/` 或者 `./` 开头，如果直接以名称开头，会被识别为数据卷而非本地目录
  * `-v mysql:/var/lib/mysql` 会被识别为一个数据卷叫 mysql
  * `-v ./mysql/data:/var/lib/mysql` 会被识别为当前目录下的 mysql 目录
* `--network` ：将容器加入某个已存在的网络
* 镜像名称：指定运行的镜像的名字

```sh
docker run -d --name ms -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 mysql

docker run -d --name nginx -p 80:80 -v html:/usr/share/nginx/html nginx

docker run -d --name dd -p 8888:8888 --network mytest docker-demo
```



## 自定义镜像

镜像就是包含了应用程序、程序运行的系统函数库、运行配置等文件的文件包。构建镜像的过程其实就是把上述文件打包的过程。



镜像结构：

* 入口（Entrypoint）：镜像运行入口，一般是程序启动的脚本和参数
* 层（Layer）：添加安装包、依赖、配置等，每次操作都形成新的一层
* 基础镜像（BaseImage）：应用依赖的系统函数库、环境、配置、文件等



### Dockerfile

Dockerfile 就是一个文本文件，其中包含一个个的指令，用指令来说明要执行什么操作来构建镜像。

Docker 可以根据 Dockerfile 来构建镜像。

常见指令：

* FROM ：指定基础镜像。
* ENV ：设置环境变量，可在后面指令使用
* COPY ：拷贝本地文件到镜像的指定目录
* RUN ：执行 Linux 的 shell 命令，一般是安装过程的命令
* EXPOSE ：指定容器运行时监听的端口，是给镜像使用者看的
* ENTRYPOINT ：镜像中应用的启动命令，容器运行时调用

```dockerfile
FROM centos:6
ENV key value
COPY ./jre11.tar.gz /tmp
RUN tar -zxvf /tep/jre11.tar.gz && EXPOSE path=/tmp/jre11:$path
EXPOSE 8080
ENTRYPOINT java -jar xx.jar
```



### 构建镜像并运行

1. 编写 Dockerfile 文件

   ```dockerfile
   # 基础镜像
   FROM openjdk:11.0-jre-buster
   
   # 拷贝jar包
   COPY docker-demo.jar /app.jar
   
   # 入口
   ENTRYPOINT ["java", "-jar", "/app.jar"]
   ```

2. 构建镜像并运行

   ```sh
   # 构建镜像
   docker build -t docker-demo .
   
   # 创建并运行容器
   docker run -d --name dd -p 8080:8080 docker-demo
   
   # 查看容器
   docker ps
   
   # 查看容器日志
   docker logs -f dd
   ```

3. 镜像更新

   ```sh
   # 需要停止并删除旧容器
   docker stop dd
   docker rm dd
   # 或者强制删除
   docker rm -f dd
   
   # 删除旧镜像，并重新构建镜像
   docker rmi docker-demo
   docker build -t docker-demo .
   docker run -d --name dd -p 8080:8080 docker-demo
   
   # 可选，将基础镜像拉取到本地，以提高构建镜像的速度
   docker pull openjdk:11.0-jre-buster
   ```

   



## 数据卷

数据卷（volume） 是一个虚拟目录，是**容器内目录与宿主机目录**之间映射的桥梁。

它将宿主机目录映射到容器内目录，方便我们操作容器内文件，或者方便迁移容器产生的数据。



* `docker volume create` ：创建数据卷
* `docker volume ls` ：查看所有数据卷
* `docker volume rm` ：删除指定数据卷
* `docker volume inspect 数据卷名` ：查看某个数据卷的详情
* `docker volume prune` ：删除未使用的数据卷



```sh
docker run -d --name nginx -p 80:80 -v html:/usr/share/nginx/html nginx

docker volume ls

docker volume inspect nginx
```



## 网络

默认情况下，所有容器都是以 bridge 方式连接到 Docker 的一个虚拟网桥上，加入自定义网络的容器才可以通过容器名互相访问。

Docker 的网络操作命令：

* `docker network create 网络名` ：创建一个网络
* `docker network ls` ：查看所有网络
* `docker network rm 网络名` ：删除指定网络
* `docker network prune` ：清除未使用网络
* `docker network connect 网络名 容器名` ：使指定容器连接加入某网络
* `docker network disconnect 网络名 容器名` ：使指定容器连接离开某网络
* `docker network inspect 网络名` ：查看网络详细信息



```sh
docker network create mytest
docker network ls
docker network rm mytest
docker network prune
docker network connect mytest dd
docker network disconnect mytest dd
docker network inspect mytest
```



## Docker Compose

Docker Compose 通过一个单独的 `docker-compose.yml` 模板文件，来定义一组相关联的应用容器，帮助我们实现多个相互关联的 Docker 容器的快速部署。



语法：`docker compose [options] [command]`

* `-f` ：选项，指定 compose 文件的路径和名称
* `-p` ：选项，指定 project 名称
* `-d` ：选项，后台运行
* `up` ：创建并启动所有 service 容器
* `down` ：停止并移除所有容器、网络
* `ps` ：列出所有启动的容器
* `logs` ：查看指定容器的日志
* `stop` ：停止容器
* `start` ：启动容器
* `restart` ：重启容器
* `top` ：查看运行的进行
* `exec` ：在指定的运行容器中执行命令



```sh
docker compose up -d
docker compose down
```



```yaml
services:
  mysql:
    image: mysql
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "/root/mysql/data:/var/lib/mysql"
      - "/root/mysql/init:/docker-entrypoint-initdb.d"
      - "/root/mysql/conf:/etc/mysql/conf.d"
  dd:
    image: docker-demo
    container_name: dd
    ports:
      - "8888:8888"
```





## 部署

### mysql

```sh
docker run -d --name ms -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 mysql

docker run -d \
	--name mysql \
	-p 3306:3306 \
	-e TZ=Asia/Shanghai \
	-e MYSQL_ROOT_PASSWORD=123 \
	-v /root/mysql/data:/var/lib/mysql \
	-v /root/mysql/init:/docker-entrypoint-initdb.d \
	-v /root/mysql/conf:/etc/mysql/conf.d \
	mysql
```



### nginx

```sh
# 拉取nginx镜像
docker pull nginx
# 创建并运行nginx容器
docker run -d --name nginx -p 80:80 nginx
# 进入nginx容器
docker exec -it nginx bash
# 进入容器内html目录
cd /usr/share/nginx/html/


docker run -d \
	--name nginx \
	-p 80:80 \
	-v /root/nginx/html:/usr/share/nginx/html \
	-v /root/nginx/nginx.conf:/etc/nginx/nginx.conf \
	-- network mynetwork \
	nginx
	
	docker run -d \
	--name nginx \
	-p 80:80 \
	-v /root/nginx/html:/usr/share/nginx/html \
	-v /root/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
	nginx
```





Dockerfile 文件



* Docker Compose
* Docker Swarm





# Jenkins

官网：https://www.jenkins.io/



持续集成(Continuous integration 简称 CI ) ：代码合并。构建、测试都在一起，不断地执行这个过程，并对结果反馈。

持续交付(Continuous delivery 简称 CD ) ：部署到测试环境、预生产环境。

持续部署(Continuous deployment 简称 CD ) ：将最终产品发布到生产环境给用户使用。



```sh
# 安装 jdk
yum install java-17-openjdk
java -version

# 如果已安装旧版本jdk，可以移除后再安装高版本jdk
yum remove java-1.8.0-*

# 安装 jenkins，需注意不同版本的 jenkins 对 jdk 的版本要求
yum insatall jenkins
jenkins -v

# jenkins 在下载插件之前会检查网络连接，需要将下面文件的 connectionCheckUrl 的 google 改成 www.baidu.com
vim /var/lib/jenkins/updates/default.json

# 启动 jenkins
systemctl start jenkins
# 停止 jenkins
systemctl stop jenkins

# 修改其中的用户和用户组为 root，才有权限将 jenkins 打包后的项目移动到指定路径
vim /usr/lib/systemd/system/jenkins.service

# 修改 npm 源
npm -v
npm config set registry https://registry.npmmirror.com/

# 彻底删除 jenkins
rm -rf /var/cache/jenkins
rm -rf /var/lib/jenkins
rm -rf /etc/sysconfig/jenkins
rm -rf /etc/systemd/system/jenkins.service
yum clean all

# 查看 yum 已安装的应用列表
yum list installed
```



自动化部署 vue 项目：

1. 需要安装 jenkins 插件：gitee、nodeJS
2. 新建任务 → 自由风格项目 → 配置内容
3. 源码管理中填写 git 仓库地址，并设置Credentials (账号密码)
4. 构建触发器中选择 Gitee webhook 选项，并生成 Gitee WebHook 密码。在 gitee 仓库管理中设置  Gitee webhook URL 为相应地址和生成后的密码。
5. 构建环境选择 Provide Node & npm bin/ folder to PATH，并设置 nodejs 版本。
6. Build Steps 选择 执行 shell，并设置执行脚本。
7. 保存后，可以点击立即构建。构建后的文件可以在工作空间中查看。

```sh
# shell 执行脚本
npm install
npm run build
#mv -f dist/* /www/wwwroot/jenkins.huangyihui.cn
cp -R dist/* /www/wwwroot/jenkins.huangyihui.cn
```



注：构建历史中的控制台输出，可以方便我们看到构建的过程，shell 脚本的执行，通过这些内容，我们可以更好的进行调试。





# 阿里云

[官网](https://www.aliyun.com/)



## 配置证书

1. 控制台选择 数字证书管理服务 → SSL 证书管理 → 创建证书
2. 输入域名，点击提交后，等待审核签发
3. 审核通过后，点击下载，选择对应的服务器类型的证书下载
4. 进入宝塔，选择网站 → 设置 → SSL，填写证书对应的 key 和 pem，保存即可





# 镜像站

[阿里巴巴开源镜像站](https://developer.aliyun.com/mirror/)