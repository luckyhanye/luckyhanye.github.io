---
title: 写一个 react-router 的 Hello World
---

来写一个使用 browserHistory 的 react-router 的 Hello World ，涉及到为何要使用服务器，
以及如何写服务器。

### 装包

```
npm i --save react-router
```

`--save` 的作用就是把报名和版本号，写入 package.json 。


### 导入

到 index.js

```js
import { Router, Route, browserHistory } from 'react-router';
```

Router 就是路由器，Route 就是具体的一个路由，browserHistory 和 hashHistory 是相对的，
用来生成没有 `#` 的链接。

### 定义路由

规定一下每个链接形式指向哪个组件。基本格式就是

```
<Router>
  <Route path component />
  <Route path component/>
</Router>
```

实际代码写成：

```
const renderRoutes = () => (
  <Router>
    <Route path='/' component={App} />
    <Route path='/hello1' component={Hello1} />
    <Route path='/hello2' component={Hello2} />
  </Router>
);
ReactDOM.render(renderRoutes(), document.getElementById('app'));
```


如果此时执行 npm run build ，然后浏览器中打开 index.html 那么， chrome console 中
报错

```
Uncaught TypeError: Cannot read property 'getCurrentLocation' of undefined
```

报错是和获取以及修改，地址栏中的 url 有关系

解决方法：

```diff
--- <Router>
+++ <Router history={browserHistory} >
```

### 浏览器自带的 history 接口


对于单页面应用，我们必然涉及到，如何用 js 修改地址栏链接的问题，
而，浏览器自带的 [history](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method)

可以在 chrome console 中执行下面的代码看看效果：

```js
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "/");
undefined
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "/about");
```

>小贴士：查询 H5/JS/CSS3 的接口文档，最权威的地方就是 MDN
> https://developer.mozilla.org/


但是，有了 react-router 我们就可以通过

```
<Router history={browserHistory}>
```

来使用浏览器原生的 history 接口了。


### 需要启动服务器了

添加了 `history={browserHistory}` 之后，浏览器 console 的报错是

```
bundle.js:22749 Warning: [react-router] Location "/home/newming/%E6%A1%8C%E9%9D%A2/peter/router-hello/index.html" did not match any routes
```

这个报错的意思是：我们访问 `/index.html` 但是，我们的路由定义中，根本
没有定义这个路由（ Route ）。

解决这个问题，我们就要把项目（index.html 和 bundle.js，源码文件都不包含在内）运行在服务器之上。

服务器有多种，最著名的有 apache/nginx ，但是我们现在用 express 自己写
一个服务器。

代码如下：

server.js

```js
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

上面的详细讲解，参考 [express 部分的第八小节](../express/8-static-server.html) 。


### Link 调用路由

代码如下：

```js
import { Router, Route, browserHistory, Link } from 'react-router';


class App extends Component {
  render(){
    return(
      <div>
        <Link to='/hello1'>Hello1</Link>
        <Link to='/hello2'>Hello2</Link>
      </div>
...
```

这样，代码就完整了。最终代码参考本页，最后一部分，《代码》。


### 如何运行


第一步，编译生成 bundle.js

```
npm run build
```

这样，会通过 webpack 调用 babel 来对源码进行编译。编程完成之后，源码就不需要了。

第二步，架设服务器

```
mkdir -p tmp/public
cp index.html tmp/public
cp server.js tmp/
cp build/bundle.js tmp/public/
cd tmp
node server.js
```

这样，浏览器中，访问 localhost:3000 就可以看到最终运行效果了。


### 代码

server.js

```js
var express = require('express');
var app = express();

app.use(express.static('public'));
// 用跟 本文件平级的一个 public 夹作为静态文件的存放位置
// 没有这一行，后面 sendFile 的 index.html 就找不到了。

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(3000, function(err) {
  console.log('Listening at http://localhost:3000');
});
```

src/index.js

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {Link} from 'react-router';

class App extends Component {
  render(){
    return(
      <div>
        <Link to='/hello1'>Hello1</Link>
        <Link to='/hello2'>Hello2</Link>
      </div>
    )
  }
}

class Hello1 extends Component {
  render(){
    return(
      <h1>
        Hello1 Page
      </h1>
    )
  }
}

class Hello2 extends Component {
  render(){
    return(
      <h1>
        Hello2 Page
      </h1>
    )
  }
}



const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='/hello1' component={Hello1} />
    <Route path='/hello2' component={Hello2} />
  </Router>
);



ReactDOM.render(renderRoutes(), document.getElementById('app'));
```

.babelrc


```json
{
  "presets": ["es2015", "react", "stage-0"]
}
```

webpack.config.js

```js
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
```

package.json

```json
{
  "name": "react-with-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.10.4",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-react": "^6.11.1",
    "babel-preset-stage-0": "^6.5.0",
    "express": "^4.14.0",
    "webpack": "^1.13.1"
  },
  "dependencies": {
    "react": "^15.2.1",
    "react-dom": "^15.2.1",
    "react-router": "^3.0.0"
  }
}
```

public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Router</title>
</head>
<body>

  <div id="app"></div>
  <script src="bundle.js" charset="utf-8"></script>
</body>
</html>
```

启动

```
node server.js
```

就可以看到 react-router 可以正常运行了。
