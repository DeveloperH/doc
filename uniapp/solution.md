# 解决方案



* [uni-app可拖动的浮动图标](https://www.freesion.com/article/72211117855/) 
* [保存当前页面为图片](https://blog.csdn.net/zsdrhnfjn/article/details/129730503) 



## 图片

### 多张图片之间的间距

解决方案1：给 image 设置CSS属性 `vertical-align:bottom;`

```css
image {
  width: 750rpx;
  vertical-align:bottom;
}
```

解决方案2：用一个 view 将 image 包裹起来

```css
.test {
  display: flex;
  flex-direction: column;
}
```



## scroll-view

想要滚动生效，一定要添加以下CSS样式

```css
white-space: nowrap;
display:inline-block;
```



消除滚动条

```css
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}
```



