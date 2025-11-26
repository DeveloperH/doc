# Element-UI

Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。

官网：https://element.eleme.cn/

vue2文档地址：https://github.com/ElemeFE/element

vue3文档地址：https://github.com/element-plus/element-plus



## 安装和引用

```sh
npm i element-ui -S
```

在 `main.js` 中引入，可以引入整个 Element，也可以按需仅引入部分组件。

```js
// 完整引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```



### 按需引入

在项目中，推荐使用按需引入，这样会大大减少项目打包后的体积。

#### 方式1

借助 `babel-plugin-component`，我们可以只引入需要的组件，以达到减小项目体积的目的。

1. 安装依赖

   ```shell
   npm install babel-plugin-component -D
   ```

2. 修改 `babel.config.js`

   ```js
   module.exports = {
     presets: [
       '@vue/cli-plugin-babel/preset',
       ["@babel/preset-env", { "modules": false }]
     ],
     "plugins": [
       [
         "component",
         {
           "libraryName": "element-ui",
           "styleLibraryName": "theme-chalk"
         }
       ]
     ]
   }
   ```

   这里需要注意的是，如果按照官网指南的配置引入，会出现 `Error: Cannot find module 'babel-preset-es2015` 报错信息，因此，需要将 `es2015` 改成 `@babel/preset-env` 即可。

3. 按需引入

   ```js
   import Vue from 'vue'
   import {Pagination} from 'element-ui'
   Vue.use(Pagination)
   // 这里就不用再引入样式文件了
   ```
```
   
   

#### 方式2

通过 `vue add` 方式按需引入

1. 安装组件

```
   vue add element
   ```

   需要注意的是，这种方式会对 `App.vue` 文件进行修改，请提前做好备份。

2. 选择 `Import on demand`

3. 按需引入

   ```js
   import Vue from 'vue'
   import {Pagination} from 'element-ui'
   Vue.use(Pagination)
   // 这里就不用再引入样式文件了
   ```

   



### **全局配置**

在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 `size` 与 `zIndex` 字段。`size` 用于改变组件的默认尺寸，`zIndex` 设置弹框的初始 z-index（默认值：2000）。

```js
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
```





## form 表单

### 表单验证

```vue
<template>
  <div style="width: 500px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      @keyup.enter.native="submitForm('ruleForm')">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        pwd: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!")
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
```



 el-form 添加 v-if之后，表单校验不生效问题：给设置 v-if 的元素加上key值。



### `validator` 自定义校验规则

高级用法：[async-validator](https://github.com/yiminghe/async-validator)

![image-20230116143153036](http://qiniu.huangyihui.cn/doc/202511262255727.png)



#### 金额验证

```vue
<template>
  <div>
    <el-form ref="form" :model="saveModel" :rules="ruleForm" class="myform">
      <el-form-item prop="name">
        <el-input v-model="saveModel.name" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="saveModel.phone" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item prop="cooperationPrice">
        <el-input
          v-model="saveModel.cooperationPrice"
          placeholder="合作价"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn-apply" @click="handleApply">入驻申请</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      let reg = /^1\d{10}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确格式的手机号!"));
      } else {
        callback();
      }
    };
    var validatePrice = (rule, value, callback) => {
      if (!value) {
        return callback();
      } else if (value.split(".").length > 2) {
        callback(new Error("请输入正确格式的金额")); //防止输入多个小数点
      } else {
        value = Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2); //四舍五入
        value = Number(value).toFixed(2); //不足补位
        this.saveModel[rule.field] = value;
        callback();
      }
    };
    return {
      saveModel: {
        name: "",
        phone: "",
        cooperationPrice: "",
      },
      ruleForm: {
        name: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        cooperationPrice: [
          { required: true, message: "请输入合作价", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleApply() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // success
        } else {
          return false;
        }
      });
    },
  },
};
</script>
```



## upload 图片上传

### 演示

```vue
<template>
  <div>
    <el-upload
      action="https://www.huangyihui.cn:8888/profile"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        console.log(file)
      }
    }
  }
</script>
```







### 后端上传文件代码

安装依赖：`npm install --save multer`

```js
const express = require('express')
const multer  = require('multer')

// 配置存储路径和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' + file.originalname)
  	cb(null, Math.random().toString(16).substring(2) + file.originalname.substring(file.originalname.lastIndexOf('.')))
  }
})
const upload = multer({ storage: storage })

// 这里的file需要和接口请求时配置的参数名一致
app.post('/profile', upload.single('file'), function (req, res, next) {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
  console.log(req.file)
  console.log(req.body)
  // 返回状态码和图片路径
  res.send({
      code: 200,
      filePath: req.file.path
  })
})
```



文档教程：https://www.npmjs.com/package/multer

文档教程：https://gitee.com/codesohigh/multer?_from=gitee_search





## 样式修改

### 去除 table 边框

```html
<!-- 给 table 添加自定义class -->
<el-table class="my-table" :data="tableData">
  <el-table-column prop="date" label="日期" width="180">
  </el-table-column>
  <el-table-column prop="name" label="姓名" width="180">
  </el-table-column>
  <el-table-column prop="address" label="地址"></el-table-column>
</el-table>
```

```scss
// 核心：通过 css 权重覆盖原样式

// 去除表格内边框
.my-table.el-table td.el-table__cell {
  border: none;
}

// 去除表格下边框，需配合 去除表格内边框 一起使用
.my-table.el-table::before {
  height: 0;
}

// 去除表头下边框
.my-table.el-table th.el-table__cell.is-leaf {
  border: none;
}
```





## 自定义组件

### 选址：高德地图POI搜索

参考资料：https://blog.csdn.net/DLGDark/article/details/111881767







