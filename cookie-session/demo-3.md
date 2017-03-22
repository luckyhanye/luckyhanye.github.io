---
title: Express Session 接口实现登录功能（上半部分）
layout: linux
---

## Express Session 接口实现登录功能（上半部分）

这个我们来写一个前后端不分离的项目来演示。

```js
mkdir session
cd session
```

初始化一个 nodejs 的项目

```
$ npm init -y
```

安装 express

```
$ npm i --save express
```

下面来写一个最简单 http 服务器

```js
const express = require('express');
const app = express();

app.listen(3006, function(){
  console.log('running on port 3006...');
})
```

下面来实现一个 API ，返回一个静态 HTML 页面

```diff
+ app.get('/', function(req, res){
+  res.sendFile('index.html', {root: 'public'});
+ })
```
然后添加 public/index.html 如下

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
  <a href="/login">登录</a>
</body>
</html>
```
同时，package.json 中做如下修改

```diff
+   "start": "nodemon index.js"
```

这样，我后台运行

```js
npm start
public/login.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Login</title>
</head>
<body>
  <form action="/login" method="post">
    <input type="text">
    <input type="submit">
  </form>
</body>
</html>
```

浏览器中打开

```
http://localhost:3006/
```

也能够看到 index.html 的内容，点链接也可以访问 login.html。

### 书写服务器对应接口

index.js 中修改如下：

```js
app.use(express.static('public'));
+const bodyParser = require('body-parser');
+
+// parse application/x-www-form-urlencoded
+app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  res.sendFile('index.html', {root: 'public'});
})

+app.post('/login', function(req, res){
+  console.log(req.body);
+})
+
app.listen(3006, function(){
```

### 重定向 redirect

index.js 做出如下修改

```js
app.post('/login', function(req, res){
+  let username = req.body.username;
+  // User.find({username: username}) 如果数据库中能找到这个用户
+  // 同时密码也对，这样才算登录成功
   console.log(req.body);
+  if(true) {
+    res.redirect('/');
+  }
 })
```

上面 redirect 接口实现的是“页面重定向”，具体的效果就是，前端页面会自动跳转到指定页面，对应上面的情况，就是自动跳转到首页。

### 总结

未完，下一节继续。
