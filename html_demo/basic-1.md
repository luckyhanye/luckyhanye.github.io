---
title: html 基础知识
layout: linux
---

## html基础知识

### 页面构成

头部（header）、主体（content/main）、底部（footer）

- 示意图

![alt ""](../images/pageLayout-01.png)

### html 语言（超文本标记语言）

> 构成：`<html>`html文档的起始标签、`</html>`html文档的结束标签、`<head></head>`html文档的`头部`的起始/结束标签
`<body></body>`html文档`主体`的起始/结束标签

浏览器所有可见内容在`<body></body>`中，html文档的头部内容在浏览器中不可见。

代码展示

```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>标题</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="icon" type="image/x-icon" href="https://luckyhanye.github.io/images/favicon.ico">

  </head>
  <body>
    <!-- 浏览器中展示内容部分 -->
  </body>
  </html>
```
