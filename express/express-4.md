---
title: 使用 Mongoose 连接 JS 和 MongoDB
layout: linux
---

## 使用 Mongoose 连接 JS 和 MongoDB

Mongoose 是一个 JS 库，作用是把 MongoDB 的数据，封装成 JS 对象。便于 我们用 JS 代码来操作 Mongodb 。

有了 Mongoose 之后，我们就可以用 JS 代码来进行增删改查了。

参考：

[中文参考](http://ourjs.com/detail/53ad24edb984bb4659000013)：http://ourjs.com/detail/53ad24edb984bb4659000013
[官网](http://mongoosejs.com/)：http://mongoosejs.com/
[nodeclass](http://www.nodeclass.com/api/mongoose.html#quick_start): http://www.nodeclass.com/api/mongoose.html#quick_start
[操作步骤](http://haoqicat.com/react-express-api/3-mongoose)：http://haoqicat.com/react-express-api/3-mongoose

### 装包

安装到后台 express 代码中，装包命令：

```
npm install --save mongoose
```

装包成功后，一般的步骤就是先导如，后调用。

打开 express-hello 的 index.js 文件，导入 mongoose

```
const mongoose = require('mongoose');
```
