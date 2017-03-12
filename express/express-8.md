---
title: 写一个 express 静态服务器
layout: linux
---

## 写一个 express 静态服务器

所谓静态服务器，就是只提供静态的页面的服务器。就是指没有智能运算，就是纯粹提供静态文件：例如 html 图片 css 等。

### 一个基本服务器

server.js

```js
let express = require('express');
let app = express();

app.listen(3000, function(err) {
  console.log('Listening at http://localhost:3000');
});
```
上面的这个服务器，如果用 `node server.js` 执行的化，它就开始监听 3000 端口，但是没有实质性的功能。

### 提供 index.html 的功能

```
+++ app.get('/', function(req, res){
+++   res.sendFile('index.html');
+++ });
```

但是，只有上面的代码，运行 node server.js ，即使有一个 index.html 跟 server.js 放在同级位置，也会报错的：

> TypeError: path must be absolute or specify root to res.sendFile
   at ServerResponse.sendFile (/home/newming/桌面/peter/router-

添加这些代码

```
app.use(express.static('public'));
```

`app.use()` 是使用中间件（中间件就可以理解为插件），这里使用的是 express.static 。如果设置的参数是 `public/ `，就表示要把 public 文件夹作为，静态服务器的文件夹。

有了这一句

```
mkdir public
mv index.html public/
node server.js
```

就能正确的看到 localhost:3000/ 可以访问 index.js 了。

```
var express = require('express');
var app = express();

app.use(express.static('public'));
// 用跟本文件平级的一个 public 夹作为静态文件的存放位置
// 没有这一行，后面 sendFile 的 index.html 就找不到了。

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(3000, function(err) {
  console.log('Listening at http://localhost:3000');
});
```
