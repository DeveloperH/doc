# SVN











## 常用命令

````bash
svn checkout 地址    # 拉代码（简写 svn co）
svn update          # 更新代码（简写 svn up）
svn add 文件名       # 添加文件到版本控制
svn commit -m "备注" # 提交代码（简写 svn ci）
svn status          # 查看文件状态（简写 svn st）


svn log             # 查看提交日志
svn info            # 查看当前目录svn信息
svn diff            # 查看本地修改
svn diff -r 版本号   # 对比某个版本


svn revert 文件名    # 放弃本地修改（还原）
svn delete 文件名    # 删除文件（提交后生效）
svn move 旧名 新名   # 重命名/移动
svn mkdir 目录名     # 创建版本化目录


svn up -r 版本号     # 切换到某个历史版本
svn merge -r 新版本:旧版本 .  # 回退到历史版本
svn resolve 文件名   # 标记冲突已解决
svn cleanup         # 清理锁、报错时用
````

