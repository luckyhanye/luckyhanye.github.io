---
title: Express Session 接口实现登录功能（下半部分）
layout: linux
---

## Express Session 接口实现登录功能（下半部分）

继续上一节。

### 使用 req.session 接口

index.js 修改如下

```js
const bodyParser = require('body-parser');

+const session = require('express-session')
+
+app.use(session({
+  secret: 'keyboard cat',
+  resave: false,
+  saveUninitialized: true
+}))
+
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

@@ -12,6 +20,7 @@ app.get('/', function(req, res){

app.post('/login', function(req, res){
  let username = req.body.username;
+  req.session.username = username;
  // User.find({username: username}) 如果数据库中能找到这个用户
```

上面代码有了，就可以拥有一个特殊的变量了 req.session 保存到这个变量中的数据，可以在各个 API 之间（页面之间）共享。只要本次会话不结束，这个变量就不会消失。

### 观察浏览器中的现象

浏览器中，我们到 login 页面，填写用户名，提交，这样后端执行的是

```js
app.post('/login')
```

那么里面会有 session 的操作，也就是

```js
req.session.username = username
```

也就是，服务器端的 session 已经创建了。

那么浏览器中的体现就是有一个 cookie 被创建了，到 Application -> storage -> Cookie -> localhost:3006 之下，就可以看到，有这样的 cookie 数据：

```js
connect.sid   xxxxxfdsjfkldsjfklsdjxxxx
```

上面的 sid 意思就是 Session Id ，也就是是服务器端 req.session 的对应的 id 。由于，客户端，每次请求都会携带 cookie 去服务器端，所以后续每次请求，都可以拿到服务器端 req.session 中存储的数据。

例如：

```js
app.get('/hello', function(req, res){
  res.send(req.session.username)
  })
```

> 小陷阱：后台每次添加代码，服务器都会重启，所以要重新执行一下 POST /login 生成一下 session 才能测试。

### 使用 pug 模板

现在在 GET / 这个接口中，我们有了 req.session.username 也就是登录用户的用户名，但是现在我们想要在页面中显示这个变量，这个就不能直接用 index.html 了，而要使用一种模板语言。模板有多种，其中 pug 是常见的一种。

先来装包：

```
$ npm i --save pug
```

index.js 代码修改如下

```js
const session = require('express-session')
+const pug = require('pug');
+app.set('view engine', 'pug');
+

app.use(session({
  secret: 'keyboard cat',
@@ -15,7 +18,8 @@ app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  console.log('home page', req.session.username);
-  res.sendFile('index.html', {root: 'public'});
+  let currentUser = req.session.username;
+  res.render('index', { username: currentUser })
})
```

删除 public/index.html ，新增 views/index.pug 文件

```js
html
  body
    p= '当前用户名是：'
    h1= username
```

这样，再次登录一下，跳转到首页，就能显示出当前用户名了。

### 添加 logout 功能

index.js 中

```js
const session = require('express-session')
+const pug = require('pug');
+app.set('view engine', 'pug')
+

app.use(session({
  secret: 'keyboard cat',
@@ -15,13 +18,18 @@ app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  console.log('home page', req.session.username);
-  res.sendFile('index.html', {root: 'public'});
+  let currentUser = req.session.username;
+  res.render('index', { currentUser })
})
app.get('/login', function(req, res){
  res.sendFile('login.html', {root: 'public'});
})

+app.get('/logout', function(req, res){
+  req.session.destroy();
+  res.redirect('/');
+})
app.post('/login', function(req, res){
  let username = req.body.username;
```

views/index.pug 的功能为：

```js
html
  body
    if currentUser
      span= currentUser
      a(href='/logout') 退出
    else
      a(href='/login') 登录
```

### 单页面应用中 Cookie 使用不方便了

因为涉及到跨域问题。

在 React-Axios 环境下，前端和后端代码，其实两个独立的项目，跑在不同的域名之上。导致了收发 cookie 默认都是不允许的，所以 req.session 本身也是不工作的，使用意义不大了。

但是后续，我们采用的主要架构，还是前后端分离架构，req.session 虽然不能用，但是我们会采用非常类似的原理来实现登录态和购物车等效果。

### 参考文档

- [codeforgeek](https://codeforgeek.com/2014/09/manage-session-using-node-js-express-4/)

- Everything You Ever Wanted To Know About Authentication in Node.js

本节全部代码

```js
views/index.pug

html
  body
    if currentUser
      p= currentUser
      a(href='/logout') 退出
    else
      a(href='/login') 登录
```

index.js

```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const session = require('express-session')
const pug = require('pug');

app.set('view engine', 'pug');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.get('/', function(req, res){
  let currentUser = req.session.username;
  res.render('index', {currentUser});
})

app.get('/login', function(req, res){
  res.sendFile('login.html', {root: 'public'});
})

app.post('/login', function(req, res){
  let username = req.body.username;
  req.session.username = username;
  res.redirect('/');
})

app.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

app.listen(3006, function(){
  console.log('running on port 3006...');
})
```

public/login.html

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
   <form action="/login" method="post">
     用户名：
     <input name="username" type="text">
     <input type="submit">
   </form>
</body>
</html>
```
