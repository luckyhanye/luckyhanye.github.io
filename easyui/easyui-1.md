---
title: easyui基础知识
layout: linux
---

## ionic css文档

[ionic官网](https://ionicframework.com)

### 头部 Header

头部写法：

```js
<div class="bar bar-header bar-light">
  <h1 class="title">
    头部Header
  </h1>
</div>
说明：bar-header 控制div的位置，在页面的头部位置
    bar-light 设置头部div的背景色（light代表颜色，更多颜色参考[ionic-color](http://www.ionic.wang/css_doc-index.html#colors)）
    title  设置头部文字‘头部Header’的样式
```

底部的写法：

```js
<div class="bar bar-footer bar-light">
  <h1 class="title">
    底部Footer
  </h1>
</div>
说明：bar-header 控制div的位置，在页面的底部位置
    其余同头部说明
```

内容的写法：
