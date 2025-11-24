# Git入门

## 1、了解Git

`Git`是目前世界上最先进的分布式版本控制系统。

https://gitee.com/  码云，中国最大的开源项目网站

https://github.com/  全球最大的开源项目网站

下载地址：https://git-scm.com/

查看git版本：`$git --version`





## 2、设置全局身份

因为`Git`是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

1. 打开`Git Bash`输入命令
2. 这时会在C盘用户文件夹中生成配置文件：`.gitconfig`，代表配置成功。

```bash
$ git config --global user.name "yihui"
$ git config --global user.email "285134242@qq.com"
```

![img](http://qiniu.huangyihui.cn/doc/202511250111672.png)



```sh
git config user.name
git config user.email
git config --list
```



git config 命令为我们提供了一种创建别名的方法，这种别名通常用于缩短现有的命令或者创建自定义命令。

```sh
git config --global alias.cm "commit -m"
git cm <message>
```

这里为`commit -m`创建一个别名 `cm`，这样在提交暂存区文件时，只需要输入以上命令即可。





## 3、创建版本库

版本库又名仓库，英文名`repository`，可以简单理解成一个目录，这个目录里面的所有文件都可以被`Git`管理起来，每个文件的修改，删除，`Git`都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以"还原"。

1. 首先，选择一个合适的地方，创建一个空目录
2. 进入目录
3. 执行仓库的初始化命令
4. 执行成功后，当前仓库目录下会多了个隐藏的`.git`目录，这个目录是`Git`来跟踪管理版本库的。没事不要修改里面的文件，不然改乱了，就把`Git仓库`给破坏了。

```bash
$ mkdir G:/git/repository
$ cd G:/git/repository
$ git init
```

![img](http://qiniu.huangyihui.cn/doc/202511250111782.png)





## 4、添加文件

现在编写一个`readme.txt`文件，内容随意，一定要放到仓库目录下，放其他地方`Git`找不到。

1）用命令`git add`告诉`Git`，把文件添加到`暂存区`，（提交之后才会进入版本库）

注意：可以重复多次使用，添加多个文件。

2）用命令`git commit`告诉`Git`，把暂存区中的文件提交到`仓库repository`，（把暂存区里的数据提交到当前所在分支）

3）用命令`git status` 查看当前`git`目录的版本状态

如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改的内容。

```shell
$ git add readme.txt
$ git commit -m "第一次提交新文件"
$ git status

$ git diff


# 将所有未跟踪和修改的文件添加到暂存区
git add .


# 如果上次提交暂存的messge写错了怎么办呢？可以使用使用以下命令来更新提交，而不需要撤销并重新提交：
git commit --amend -m <message>


# 保持相同的提交信息
git commit --amend --no-edit
```



第一步：

![img](http://qiniu.huangyihui.cn/doc/202511250111854.png)



第二步：

![img](http://qiniu.huangyihui.cn/doc/202511250112592.png)



第三步：

![img](http://qiniu.huangyihui.cn/doc/202511250112083.png)



第四步：

![img](http://qiniu.huangyihui.cn/doc/202511250112297.png)



第五步：

![img](http://qiniu.huangyihui.cn/doc/202511250112486.png)





## 5、查看历史记录和版本回退

1. 查看当前分支的版本提交记录
2. 以一行简略格式查看版本提交记录
3. 回退到上一个版本，其中`HEAD`后面有几个`^`就是回退几次。注意：也可以用`HEAD~100`表示
4. 回退到指定版本，`commit id`不需要写全，但必须要确定是唯一的
5. 查看历史命令，可以看到以前所有的提交和回退记录

```shell
$ git log
$ git log --pretty=oneline
$ git reset --hard HEAD^
$ git reset --hard a965cc
$ git reflog
```

**总结：**

`HEAD`指向的版本就是当前版本，因此，`Git`允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`(版本号)

穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本

要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本



查看提交记录

![img](http://qiniu.huangyihui.cn/doc/202511250113214.png)



查看提交记录

![img](http://qiniu.huangyihui.cn/doc/202511250113121.png)



回退到上一个版本

![img](http://qiniu.huangyihui.cn/doc/202511250113320.png)



回退到指定版本

![img](http://qiniu.huangyihui.cn/doc/202511250113261.png)



查看历史命令，可以看到以前所有的提交和回退记录

![img](http://qiniu.huangyihui.cn/doc/202511250113542.png)





## 6、工作区和暂存区

工作区(`Working Directory`)：就是电脑里能看到的目录，比如`repository`文件夹就是一个工作区。

第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区。

第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master分支`，所以现在`git commit`就是往`master分支`上提交更改。也可以简单理解为，把需要提交的文件修改通通放在暂存区，然后一次性提交暂存区的所有修改。



![img](http://qiniu.huangyihui.cn/doc/202511250114379.png)





## 7、查看文件修改

Git比其他版本控制系统设计得优秀，因为Git跟踪并管理的是修改，而非文件。

**增加了一行，删除了一行都是修改。**

当我们第一次修改-> git add -> 第二次修改 -> git commit后，git status时会发现第二次的修改没有被提交。

因为Git管理的是修改，所以`git add` 命令后是把工作区的第一次修改放进暂存区，准备提交，但是第二次修改并没有被放进暂存区，所以`git commit`只把暂存区中的第一次修改提交了。

提交后，用`git diff HEAD -- readme.txt`可以查看工作区和版本库里面最新版本的区别。

如何解决：可以修改后再git add，然后提交，也可以两次修改完成后，再git add。

思路：在工作区创建文件--add到暂存区----commit到分支

1）查看工作区和版本库里面最新版本的区别。也就是修改的内容

```shell
$ git diff
$ git diff head -- readme.txt
```



![img](http://qiniu.huangyihui.cn/doc/202511250114157.png)





## 8、撤销修改

三种情况

1）数据只存在工作区

撤销修改，丢弃工作区的修改

```shell
$ git checkout -- readme.txt
```



2）数据使用add添加到了暂存区

撤销暂存区的修改，并重新放回工作区

执行第一种情况，丢弃工作区的修改

```shell
$ git reset HEAD readme.txt
$ git checkout -- readme.txt
```



3）数据使用add添加到暂存区并commit到版本库

使用版本回退，前提是没有提交推送到远程版本库。

```shell
$ git reset --hard HEAD^
```



第一种情况，数据只存在工作区

![img](http://qiniu.huangyihui.cn/doc/202511250114614.png)



第二种情况：数据使用add添加到了暂存区

![img](http://qiniu.huangyihui.cn/doc/202511250114015.png)



第三种情况：数据使用add添加到暂存区并commit到版本库

![img](http://qiniu.huangyihui.cn/doc/202511250115429.png)





**恢复删除内容**

这是一个很重要的命令，假如你回退到某个旧版本，现在想恢复到新版本，又找不到新版本的commit id怎么办？**Git**提供了下面的命令用来记录每一次命令：

```sh
git reflog show HEAD
git reflog
```

假如需要把代码回退到`HEAD@{5}`处，可以执行以下命令：

```sh
git reset --hard HEAD@{5}

# 或者
git reset --hard 8a0fd74
```





## 9、删除文件

1. 先删除文件
2. 再提交

```shell
$ git rm -rf hello.java
$ git commit -m 删除hello.java文件
```



![img](http://qiniu.huangyihui.cn/doc/202511250115442.png)



```sh
# 将文件从暂存区和工作区中删除
git rm <filename>

# 如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 -f
git rm -f <filename>

# 如果想把文件从暂存区域移除，但仍然希望保留在当前工作目录中，换句话说，仅是从跟踪清单中删除，使用 --cached 选项即可
git rm --cached <filename>

# 递归删除，即如果后面跟的是一个目录做为参数，则会递归删除整个目录中的所有子目录和文件
git rm –r * 
```





## 10、创建和合并分支

每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。在Git里，这个分支叫主分支，即master分支。HEAD严格来说不是指向提交，而是指向master，master才是指向提交的，所以，HEAD指向的就是当前分支。

1. 创建dev分支，并切换到dev分支
2. 查看当前分支，*号代表现在在哪个分支
3. 删除分支

```shell
$ git checkout -b dev
$ git branch
$ git branch -d bug
```

相当于以下两条命令，创建dev分支，切换到dev分支

```shell
$ git branch dev
$ git checkout dev
```



创建dev分支，并切换到dev分支

![img](http://qiniu.huangyihui.cn/doc/202511250115909.png)



查看当前分支

![img](http://qiniu.huangyihui.cn/doc/202511250115293.png)



删除分支

![img](http://qiniu.huangyihui.cn/doc/202511250115908.png)



当在dev分支中添加或修改数据后，需要把dev分支的工作成果合并到master分支上。

1）合并分支

如果把dev分支合并到master，那么要在master分支上执行合并的命令。

注意：是要在master主分支上执行合并分支命令

```shell
$ git merge dev
```



![img](http://qiniu.huangyihui.cn/doc/202511250116388.png)



当dev分支中修改了一个文件内容并提交了，master分支也修改这个文件内容，也提交了。那么这两个分支的起点发生改变，不一样了，就要手动解决合并的冲突。

也就是要编辑修改冲突数据文件后，再提交，这才合并完成。



![img](http://qiniu.huangyihui.cn/doc/202511250116216.png)



![img](http://qiniu.huangyihui.cn/doc/202511250116615.png)



总结：当Git无法自动合并分支时，就必须首先解决冲突，解决冲突后，再提交，合并完成。

解决冲突就是把Git合并失败的文件收到编辑为我们希望的内容，再提交。

用git log --graph命令可以看到分支合并图。



```sh
# 查看当前所在的分支以及该项目所有的分支情况
git branch 

# 列出所有的远程分支
git branch -r

# 查看所有的本地分支和远程分支
git branch -a


# 删除本地分支
git branch -d <branch>

# 强制删除本地分支
git branch -D <branch>

# 删除远程仓库分支
git push origin --delete <name>


# 分支重命名
git branch -m <oldname> <newname>

# 强制重命名
git branch -M <oldname> <newname>


# 合并分支：合并 dev 分支到当前分支
git merge dev

# 合并指定提交
git cherry-pick -x <commit hash>


# 查看有关当前提交的详细信息
git show

# 查看过去提交的详细信息。获取往前数的第三次提交的详细信息
git show HEAD~3

# 简化输出信息
git show --oneline


# 查看每个贡献者的commit次数以及每次commit的commit message
git shortlog

# 其可以添加两个参数。 s：省略每次 commit 的注释，仅仅返回一个简单的统计。n：按照 commit 数量从多到少的顺利对用户进行排序。
git shortlog -sn

# 忽略合并提交的次数
git shortlog -sn --no-merges
```





## 11、分支策略说明

通常合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用Fast forward模式，Git就会在merge合并时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

1. 创建并切换dev分支
2. 修改readme.txt文件，并提交一个新的commit
3. 切换回master分支
4. 准备合并dev分支，并禁用Fast forward

因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去

```shell
$ git merge --no-ff -m "合并dev并禁用FastForward" dev
```



![img](http://qiniu.huangyihui.cn/doc/202511250116612.png)





## 12、Bug分支

当遇到Bug时可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

当想创建一个分支来处理Bug时，当前所在dev上进行的工作还没有提交，该怎么办？

Git提供了一个stash功能，可以把当前工作现场储藏起来，等以后恢复现场后继续工作。

1）储藏工作现场

2）确定在哪个分支上修复Bug，假定需要在master分支上修复，就从master创建临时分支

3）修复完成后，切换到master分支，并完成合并，最后删除issue分支

4）查看工作现场储藏列表

$ git stash list

可以多次stash，恢复的时候可以指定恢复的stash：$ git stash apply stash@{0}

5）切换到dev分支，恢复工作现场

取出当前分支储藏的工作区栈顶的第一个储藏对象。

$ git stash pop

总结：当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。



```shell
$ git stash
$ git checkout master
$ git checkout -b issue
##修复BUG过程，最后commit
$ git checkout master
$ git merge --no-ff -m "合并修复BUG分支" issue
$ git branch -d issue

$ git stash list
$ git checkout dev
$ git stash pop
```



储藏工作现场

![img](http://qiniu.huangyihui.cn/doc/202511250116309.png)



创建issue分支修复Bug

![img](http://qiniu.huangyihui.cn/doc/202511250117278.png)



修复Bug后删除issue分支

![img](http://qiniu.huangyihui.cn/doc/202511250117982.png)



查看工作现场储藏列表

![img](http://qiniu.huangyihui.cn/doc/202511250117056.png)



恢复上一次工作现场

![img](http://qiniu.huangyihui.cn/doc/202511250117688.png)





```sh
# 存储更改，该命令会保存所有未提交的更改并恢复到上次提交时存储库的状态。
git stash
git stash push
git stash push -m "<stash message>"

# 检查所有存储
git stash list

# 取回所有的更改。apply 和 pop 之间的区别在于，pop 应用了 stash 中的更改并将其也从 stash 中删除，但 apply 即使在应用后仍将更改保留在 stash 中
git stash apply
git stash pop

# 取回存储列表中的第 N 个存储
git stash apply stash@{N}
git stash apply <n>
```





## 13、使用gitee远程仓库

1）创建SSH Key

由于本地仓库和gitee仓库之间的传输是通过SSH加密的，所以需要以下设置。

成功后，会在用户主目录下生成.ssh目录。

2）关联远程库

3）把本地库所有内容推送到远程库上

4）从现在起，只要本地作了提交，就可以通过命令$git push origin master 将本地master分支的最新修改推送至gitee。现在就拥有了真正的分布式版本库。

注意：

$ git push -u origin master  第一次推送master分支的所有内容

$ git push origin master  推送最新修改



```shell
$ ssh-keygen -t rsa -C "28513424@qq.com"
$ git remote add origin git@gitee.com:yihuidev/git_test.git
$ git push -u origin master
```



第一步：创建SSH Key

![img](http://qiniu.huangyihui.cn/doc/202511250118208.png)



第二步：得到密钥和公钥

![img](http://qiniu.huangyihui.cn/doc/202511250118102.png)



第三步：gitee中填写公钥内容

![img](http://qiniu.huangyihui.cn/doc/202511250118247.png)





第四步：创建仓库repository

![img](http://qiniu.huangyihui.cn/doc/202511250118974.png)



第五步：关联远程库

![img](http://qiniu.huangyihui.cn/doc/202511250118027.png)



第六步：把本地库所有内容推送到远程库上

报错：使用$ git push -u origin master -f 强制推送，慎用

详见：https://blog.csdn.net/qq_42469247/article/details/90757708

![img](http://qiniu.huangyihui.cn/doc/202511250119046.png)



![img](http://qiniu.huangyihui.cn/doc/202511250119204.png)



第七步：推送最新修改到远程仓库

![img](http://qiniu.huangyihui.cn/doc/202511250119377.png)





## 14、从远程仓库克隆

1）在clone时默认是把当前地址里面的所有分支全部clone下来，但是只有master显示

克隆dev分支：$ git remote update

$ git fetch

$ git checkout -b dev origin/dev

2）关联远程版本库中的dev分支

3）查看远程库的信息，更详细则加-v

上面显示了可以抓取和推送的origin的地址。如果没有推送权限，就看不到push的地址。

4）推送分支，就是把该分支上的所有本地提交推送到远程库。推送时要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上。

```shell
$ git clone git@gitee.com:yihuidev/git_test.git
$ git checkout -b dev origin/dev
$ git remote
$ git remote -v
$ git push origin master
$ git push origin dev
```



![img](http://qiniu.huangyihui.cn/doc/202511250119725.png)



![img](http://qiniu.huangyihui.cn/doc/202511250119350.png)



![img](http://qiniu.huangyihui.cn/doc/202511250120631.png)



```sh
# 移除远程仓库，该命令只是从本地移除远程仓库的记录（也就是解除本地仓库和远程仓库的关系），并不会真正影响到远程仓库。
git remote rm origin

# 从远程仓库获取最新版本到本地仓库，不会自动merge（合并数据）
git fetch 

# 将远程指定分支拉取到本地指定分支上
git pull origin <远程分支名>:<本地分支名>

# 将远程指定分支拉取到本地当前分支上
git pull origin <远程分支名>

# 将与本地当前分支同名的远程分支拉取到本地当前分支上
git pull
git pull --allow-unrelated-histories


# 将本地指定分支推送到远程指定分支上
git push origin <本地分支名>:<远程分支名>

# 将本地指定分支推送到与本地当前分支同名的远程分支上
git push origin <本地分支名>

# 将本地当前分支推送到与本地当前分支同名的远程分支上
git push

# 将本地分支与远程同名分支相关联
git push -u origin <本地分支名>
```

注意：如果当前本地仓库不是从远程仓库克隆，而是本地创建的仓库，并且仓库中存在文件，此时再从远程仓库拉取文件的时候会报错（`fatal: refusing to merge unrelated histories` ），解决此问题可以在`git pull`命令后加入参数`--allow-unrelated-histories` 。



由于远程库是空的，第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令为git push。



## 15、多人协作

背景：有两个开发者，xiaoming和xiaohong，他们分别在自己的电脑目录下clone了master项目

1、小红里面修改并提交 ，并推送

```shell
git add
git commit
git push -u origin master
```



2、小明里面修改并提交，会发生冲突。因为小明的提交和远程版本库最新内容不一样。会发生下面问题。解决方法，先拉取，再解决冲突，再添加提交推送

```shell
git add
git commit
git push -u origin master
```

发生冲突后：

```shell
git pull
git diff
####在本地解决合并冲突，也就是手动编辑冲突的内容，编辑后执行下一步
git add
git commit
git push -u origin master
```



3、如果git pull时发生错误，提示git branch --set-upstream等信息，

原因是没有指定本地dev分支和远程origin/dev分支的链接，根据提示设置dev和origin/dev的链接

解决方法：

```shell
$ git branch --set-upstream-to=origin/dev dev
```



出现问题：

![img](http://qiniu.huangyihui.cn/doc/202511250120333.png)



抓取远程库的最新提交：

![img](http://qiniu.huangyihui.cn/doc/202511250120269.png)



解决冲突后再次推送到远程版本库：

![img](http://qiniu.huangyihui.cn/doc/202511250120644.png)





## 实用技巧

拷贝最近一次的记录，文件会小一点 `git clone (git项目网址.git结尾) project-name --depth 1    `





## 可能遇到的问题解决方法：

Git 中 warning: LF will be replaced by CRLF in readme.txt.问题解决

详见：https://blog.csdn.net/qq_37189082/article/details/99707550





## 命令总结

| 命令                                                      | 描述                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| git init                                                  | 创建/初始化git仓库                                           |
| git add 文件名                                            | 添加指定文件到暂存区                                         |
| `git add .`                                               | 添加所有文件到暂存区                                         |
| `git commit -m '提交内容描述'`                            | 提交暂存区内容到本地仓库                                     |
| `git status`                                              | 查看工作区状态                                               |
| git diff                                                  | 对比工作区文件变化                                           |
| git log                                                   | 查看提交历史记录                                             |
| `git log --pretty=oneline`                                | 以一行简略格式查看版本提交记录                               |
| `git reset --hard HEAD^`                                  | 版本回退，其中`HEAD`后面有几个`^`就是回退几次                |
| git reset --hard commitID                                 | 回退到指定版本，commitID不用写全，只要确保唯一               |
| `git checkout -b dev`                                     | 创建dev分支并切换到该分支                                    |
| `git checkout dev`                                        | 切换到dev分支                                                |
| git branch                                                | 查看所有分支                                                 |
| git branch -d issue                                       | 删除issue分支                                                |
| git push -u origin master                                 | 第一次推送master分支的所有内容到远程库                       |
| `git push origin master`                                  | 将本地修改推送到远程库（推送master分支到远程仓库的master分支） |
| git push origin master.aaa                                | 推送本地master分支到远程仓库的aaa分支                        |
| `git pull`                                                | 拉取远程仓库并merge代码                                      |
| `git merge dev`                                           | 合并dev分支到当前分支                                        |
| git merge --no-ff -m "合并dev并禁用FastForward" dev       | 以禁用Fast forward模式合并分支                               |
| `git clone git@gitee.com:yihuidev/git_test.git`           | 克隆远程仓库的所有分支                                       |
| git clone (git项目网址.git结尾) project-name --depth 1    | 克隆最近一次的记录，文件会小一点                             |
| ssh-keygen -t rsa -C "28513424@qq.com"                    | 创建SSH Key                                                  |
| git remote add origin git@gitee.com:yihuidev/git_test.git | 关联远程库                                                   |
| git remote                                                | 查看远程库信息。加上 -v 可以详细显示                         |
| git config --global user.name "用户名"                    | 创建全局身份-用户名                                          |
| git config --global user.email "邮箱地址"                 | 创建全局身份-邮箱                                            |
| git config --list                                         | 查看已有的配置信息                                           |
| git cherry-pick <commitHash>                              | 将指定的提交（commit）应用于其他分支                         |
|                                                           |                                                              |
|                                                           |                                                              |





![git命令](http://qiniu.huangyihui.cn/doc/202511250121722.png)





## .gitignore

在使用 Git 进行代码管理时，不希望一些文件出现在跟踪列表中，比如`node_modules`文件。这种情况下，可以在项目的根目录中创建一个名为.gitignore的文件，在该文件中列出要忽略的文件和文件夹。

注意：以 # 符号开头的行是注释。

```
# 所有以.md结尾的文件
*.md  

# lib.a不能被忽略
!lib.a

# node_modules和.vscode文件被忽略
node_modules
.vscode

# build目录下的文件被忽略
build/

# doc目录下的.txt文件被忽略
doc/*.txt

# doc目录下多层目录的所有以.pdf结尾的文件被忽略
doc/**/*.pdf
```



## 标签

标签指的是**某个分支某个特定时间点的状态**，通过标签可以很方便的了解到标记时的状态。

标签有两种类型 ：

- **轻量标签 ：** 只是某个commit 的引用，可以理解为是一个commit的别名；
- **附注标签 ：** 存储在Git仓库中的一个完整对象，包含打标签者的名字、电子邮件地址、日期时间 以及其他的标签信息。它是可以被校验的，可以使用 GNU Privacy Guard (GPG) 签名并验证。



```sh
# 获取所有标签
git tag

# 查看某一个标签的详细信息
git show <tag_name>

# 根据条件来显示标签，比如列出以v1.开头的所有tag：
git tag -l "v1."


# 在本地创建新标签：例如 git tag v1.0.0
# 通常遵循的命名模式如下：v<major主版本号>.<minor次要版本号>.<patch补丁号>
git tag <tag_name>

# 为特定的commit创建标签
git tag <tagname> <commit_sha>

# 创建一个附注标签
git tag -a <tagname> -m "<message>"


# 推送本地所有标签到远程仓库
git push origin --tags

# 推送指定标签到远程仓库
git push origin <tagname>


# 切换标签
git checkout <tagname>

# 删除本地仓库指定标签
git tag -d <tagname>

# 删除远程仓库指定标签
git push origin :refs/tags/<tagname>
# or
git push origin --delete <tagname>


# 将远程仓库的标签拉取（同步）到当前分支
git fetch --tags

# 检出标签
git checkout -b <branch> <tagname>
```





## 日志

```sh
# 查看分支的历史提交信息
git log

# 只看提交的概要
git log --oneline

# 只看某个人的提交
git log --author="username"
# 搜索多个作者的提交信息，只需要在用|分隔用户名即可，注意需要使用\来对|进行转义
git log --author="username1\|usernmae2"


# 按时间查看
# 某个日期之后
git log --since=<date>
git log --after=<date>

# 某个日期之前
git log --until=<date>
git log --before=<date>

# 时间区间之间的日志
git log --since="2022.05.15" --until="2022.05.20"


# 查看某个文件都在哪些提交中修改了内容
git log -- <path>

# 只查看代码合并的记录
git log --merges

# 查看非合并操作的操作记录
git log --no-merges

# 按照分支查看日志。例如 查看test分支比master分支多提交了哪些内容
git log master..test

# 美化日志
git log --graph --oneline --decorate

# 简要显示文件增改行数统计
git log --stat

# 仅显示最近N次的提交。例如 git log -3 查看最近三次提交
git log -N

# 展开显示每次提交的内容差异对比
git log -p

# 注意，以上这些命令标识符都可以组合使用。
```





## 实用工具

* Git History ：是一个VS Code插件，增强了Git 的功能，它可以用来查看日志信息，查看和搜索历史，进行分支对比、提交对比，跨提交对比文件等。
* Sourcetree ：免费的 git 客户端管理工具。



## 开源许可证

开源许可证是为了明确开源软件的使用、修改、分发和贡献的规则，它为开发者和用户提供法律保障。开源许可证有很多种，下面是一些常见的开源许可证以及它们的作用：

### 1. **MIT 许可证（MIT License）**

- **作用**：MIT 许可证是非常宽松的开源许可证，允许用户几乎以任何方式使用、复制、修改、合并、发布、分发、再授权和/或出售软件。唯一的要求是包含原始版权声明和许可证声明。
- **特点**：几乎没有限制，适合商业用途。

### 2. **GNU 通用公共许可证（GPL）**

- **作用**：GPL 许可证要求修改过的开源软件在发布时也必须使用 GPL 许可证（传染性）。它确保软件的源代码在传播时可以自由地使用、修改和分享。
- 特点：
  - **GPL v2**：要求任何派生的作品都必须采用 GPL 许可证。
  - **GPL v3**：除了遵守 GPL v2 的条款外，还增加了对反向工程的限制（如防止专利侵权）。

### 3. **Apache 许可证（Apache License）**

- **作用**：Apache 许可证是一种比较宽松的开源许可证，允许用户自由使用、修改和分发软件。它的一个主要特点是提供了明确的专利授权，避免开发者在使用开源代码时侵犯专利权。
- **特点**：允许修改和分发，但要求提供修改版本的声明，且不允许使用“商标”作为产品名称的一部分。

### 4. **BSD 许可证（Berkeley Software Distribution License）**

- **作用**：BSD 许可证有两种主要形式：2-clause BSD 和 3-clause BSD。它们允许开发者自由使用、修改和分发软件，并且不要求公开源代码。不同的是，3-clause BSD 对广告中使用软件名称有所限制。
- **特点**：对开发者非常宽松，不要求发布修改后的源代码，适合商业用途。

### 5. **Mozilla 公共许可证（MPL）**

- **作用**：MPL 许可证允许软件的源代码被修改并重新发布，但它要求修改过的文件仍然使用 MPL 许可证，而其他文件可以采用不同的许可证。适用于混合软件的开发。
- **特点**：适中，既允许自由使用，也要求对修改后的文件进行公开。

### 6. **Creative Commons 许可证（CC）**

- **作用**：Creative Commons 许可证主要用于非软件项目，如艺术、文学、教育内容等。它允许创作者根据不同的需求选择不同的授权方式，如是否允许修改、是否要求署名、是否允许商业用途等。
- **特点**：适用于各种类型的创作作品，灵活多样。

### 7. **Eclipse 公共许可证（EPL）**

- **作用**：EPL 许可证要求修改和发布的代码需要保持开源，并且如果将软件与其他代码合并发布，必须公开修改部分的源代码。与 GPL 不同，它允许商业软件将 EPL 许可的软件与专有代码捆绑。
- **特点**：适用于商业开发，可以和专有软件一起使用，但修改部分必须公开。

### 8. **LGPL 许可证（Lesser GPL）**

- **作用**：LGPL 允许开发者将开源代码与专有软件结合使用，但修改过的 LGPL 代码仍然需要开源。与 GPL 的主要区别在于它对专有软件的兼容性较好。
- **特点**：适合需要与专有软件一起发布的开源项目。

### 9. **Artistic 许可证**

- **作用**：Artistic 许可证是一种比较宽松的开源许可证，允许开发者修改和分发软件。对于分发修改版本，它要求将修改的部分标明。
- **特点**：灵活，允许修改，但要求在发布修改时注明。

### 总结

不同的开源许可证适用于不同的场景和需求：

- **MIT、BSD** 等许可证相对宽松，适合商业使用。
- **GPL** 类的许可证则有更严格的要求，确保开源软件的自由流通和修改。
- **Apache** 和 **MPL** 提供了对专利和商标的保护，适合更复杂的项目。



## 解决方案

### gitignore 排除了文件，远程仓库文件怎么还在

```
git rm -r --cached build
git commit -m "remove build cache"
git push origin master
```





### github.com port 443 after 21224 ms: Timed out

git 报错Failed to connect to github.com port 443 after 21224 ms: Timed out 解决办法：



#### git 配置http代理

windows 中 git 默认不会使用系统代理，所以即使连接代理或者打开代理软件，浏览器仍然可以访问 GitHub 或 Gitee；但是使用 git 命令行连接 GitHub 或 Gitee 远程仓库可能会出现无法访问的现象。通过为 git 配置代理解决出现的问题。  

```sh
# 配置socks5代理
git config --global http.proxy socks5 127.0.0.1:7890
git config --global https.proxy socks5 127.0.0.1:7890

# 配置http代理
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890
```

```sh
# 查看代理命令
git config --global --get http.proxy
git config --global --get https.proxy

# 取消代理命令
git config --global --unset http.proxy
git config --global --unset https.proxy
```



* 命令中的主机号（127.0.0.1）是使用的代理的主机号，如果代理软件运行在本机则填入127.0.0.1即可，否则填入代理主机 ip
* 命令中的端口号为代理软件或代理主机的监听IP，可以从代理服务器配置中获得
* socks5和http两种协议由使用的代理软件决定，不同软件对这两种协议的支持有差异，如果不确定可以都尝试一下



#### 配置 SSH 代理

使用 https 协议连接输入账号密码比较麻烦，而使用 SSH 密钥验证连接更方便且安全。可以修改系统中的 SSH 配置设置代理，并且绕过 GFW 的封锁。



**注意事项：**

- 修改系统配置需要管理员权限
- 选择SOCKS 和 HTTPS代理需要根据代理软件支持的协议而定，二选一
- 如果软件在本机运行，host设置为本机（127.0.0.1）即可，端口号则设置为代理软件的监听端口号



##### window 平台

Windows平台的git中预置了connect.exe，可以用来接管git的流量。可以通过修改本地SSH配置文件来更改git的代理设置。

Windows平台配置文件位于`C:\Users$USERNAME$.ssh\config`，如果没有`config`文件，自己创建一个`config`文件，其中`USERNAME`是当前电脑用户名。

**在文件中加入下面配置：**

```
Host github.com *.github.com # 指定代理规则作用域
  User git
  Port 22 # 端口号
  # 自己的私钥所在路径
  IdentityFile "~\.ssh\id_rsa"
  # SOCKS代理设置方法
  ProxyCommand connect -S 172.16.100.211:808 %h %p
  # HTTPS代理设置方法
  ProxyCommand connect -H 172.16.100.211:808 %h %p
```



##### Linux 或 Mac OS

配置文件一般情况下在`~/.ssh/config`下，然后添加：

```
Host github.com *.github.com
  User git
  Port 22
  IdentityFile "~\.ssh\id_rsa"
  # SOCKS代理
  ProxyCommand nc -v -x 172.16.100.211:808 %h %p
  # HTTPS代理
  ProxyCommand socat - PROXY:172.16.100.211:%h:%p,proxyport=808
```









