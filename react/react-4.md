---
title: 修改 server 配置
---

如果现在访问 localhost:3000 网站可以正常进行路由的功能，所以像 /hello1 这样的链接
是可以正常打开的。

但是如果用户直接在浏览器中打开 localhost:3000/hello1 这样是无法打开的。

### 解决方法

把 `get('/')` 改为 `get('*')`

访问 localhost:3000/hello2 会报错

```
TypeError: path must be absolute or specify root to res.sendFile
   at ServerResponse.sendFile (/Users/peter/Desktop/react-router-monkey-stuff/react-router-monkey-demo/node_modules/express/lib/response.js:404:11)
   at /Users/peter/Desktop/react-router-monkey-stuff/react-router-monkey-demo/server.js:9:7
...

```


最终改成下面这样就可以了：

```
const path = require('path');
var express = require('express');
var app = express();

app.use(express.static('public'));
// 用跟 本文件平级的一个 public 夹作为静态文件的存放位置
// 没有这一行，后面 sendFile 的 index.html 就找不到了。

app.get('*', function(req, res){
  res.sendFile('index.html', {root: 'public'});
});

app.listen(3000, function(err) {
  console.log('Listening at http://localhost:3000');
});
```


### bundle.js 请求报错

访问： http://localhost:3000/posts/58574ecd7bedd716df5669ea

报错如下：

```
bundle.js:1 Uncaught SyntaxError: Unexpected token <
```

原因就是请求 bundle.js 的时候，结果请求得到的是 index.js 。

解决方法：index.js 中写 `/bundle.js` 不能省略 `/` 。

原理：

server.js 中是这样写的

```
app.use(express.static('public'));

app.get('*', function(req, res){
  res.sendFile('index.html', {root: 'public'});
});
```

`express.static` 这一行的作用是把 public/ 文件夹中的所有静态文件的路径都导出了，
也就是，如果服务器访问的是 localhost:3000/bundle.js 那么，直接就可以返回正确的 bundle.js 。
而不会执行到 `app.get('*')` 这一句。

但是，如果请求的是 localhost:3000/posts/ 注意 posts 后面的 `/` 同时，index.html 的 bundle.js
前面又没有加 `/` 那么，浏览器请求 bundle.js 的时候，发起的请求就是 localhost:3000/posts/bundle.js
这样，自然服务器就会返回 index.html 的内容，所以就有了一开始的报错了。
