---
title: 打通全栈
layout: linux
---

## 打通全栈

这一节算是前面的几节内容的综合使用。所谓全栈项目，要有这几层技术组成：

- 最贴近用户的，是 React

- HTTP 请求，用 axios

- 后台，我们使用 express

- 最底层，海量数据，用 Mongodb

在，[第二节](https://luckyhanye.github.io/express/express-2.html)中，我们实际已经打通了三层技术，同时 [第四节](https://luckyhanye.github.io/express/express-4.html)中我们又学习了 MongoDB 。本节就来综合使用这两部分知识。从而打通全栈。

我们分几个具体任务来完成：

### 使用 Mongoose 来查询所有用户

首先，保证 mongodb 处于运行状态，然后，通过　mongo-express 查看一下， mongodb 中是否有多个用户。

成熟的工程师，你给他 [Mongoose的API文档](http://mongoosejs.com/docs/api.html) 他就有能力完成这个任务了。但是你属于开发新手，起步阶段， 还是要先通过教程，来学习一些最基本的使用，后续才会有能力看　API 文档。

参考：[好奇猫视频](http://haoqicat.com/react-express-api/5-rest-api)

到后台代码的 index.js 文件中，把 db.once 部分的修改成下面这样：

```
db.once('open', function() {
  User.find().exec(function(err, users) {
    console.log(users);
  });
});
```

这样，我们到　express-backend 文件夹中，运行，可以看到如下输出结果

```
$ nodemon index.js

running on port 3000...
[ { _id: 584b62b830a2a2cbf4c4c3f6,
    username: 'billie66',
    email: 'billie@billie66.com' },
  { _id: 584bb045ff8f0f1c7ba4fe24,
    username: 'inCode',
    email: 'inCode@incode.com',
    __v: 0 } ]
```

可以看到，终端中可以打印出所有数据文档。证明我们的　mongoose 的　find() 接口使用正确。

但是，我们为何不把代码写成这样呢？

```
let users = User.find();
conole.log(users)
```

**答案是：　find() 接口是一个异步函数，所以它的返回值　users 只能在回调函数中使用。.exec 字面意思就是执行，我们把回调函数传给它做参数。**

### 用 API 来返回　JSON

上面数据虽然拿到，但是如果想提供给客户端使用：

- 第一步，把它要封装成一个　API

- 第二步，数据格式转换为　JSON

先来做第一步，代码做出如下调整：

```
db.once('open', function() {
  console.log('success');
});

app.get('/users', function(req, res){
  User.find().exec(function(err, users) {
    console.log(users);
  });
})
```

上面把　`User.find()` 代码封装到了一个　API ( Web API ) 。这样， 触发条件就变了。只有当客户端发出　GET /users 请求的时候，User.find() 代码才会被执行。

暂时，我们用　curl 来模拟一下客户端请求：

```
curl -X GET http://localhost:3000/users
```

但是，此时，curl 请求不到任何返回信息，因为　console.log(users) 只会把 信息打印到后台终端。curl 请求不到信息，未来浏览器也就请求不到。所以要把这一行 改为

```
// res.send() 可以数据返回给客户端，但是我们要的是　json ，所以用下面接口
res.json()
```

也就是要写成这样：

```
app.get('/users', function(req, res){
  // res.json({"users": "happypeter"});
  User.find().exec(function(err, users) {
    res.json({users});
  });
})
```

这样，再用　curl 请求一下，前台就能读到数据了，如下

```
$ curl -X GET http://localhost:3000/users

{"users":[{"_id":"584b62b830a2a2cbf4c4c3f6","username":"billie66","email":"billie@billie66.com"},{"_id":"584b760498d7b520b68a05cd","username":"pppaaa"},{"_id":"584bb045ff8f0f1c7ba4fe24","username":"inCode","email":"inCode@incode.com","__v":0}]}
```
这样，后台代码就准备完毕。

后台代码

express-backend 文件夹中，有下面的文件：

```
index.js

const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/react-express-demo');
```

// 执行此行代码之前，要保证 mongodb 数据库已经运行了，而且运行在 27017 端口

```
var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success');
});
```

// 下面三行就是我们实现的一个 API

```
app.get('/users', function(req, res){
  // res.json({"users": "happypeter"});
  User.find().exec(function(err, users) {
    res.json({users});
  });
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String }
  }
);
module.exports = mongoose.model('User', UserSchema);
```
// `User` 会自动对应数据库中的　users 这个集合
// 如果这里是　Apple 那么就会对应　apples 集合
// 如果这里是　Person 那么就会对应　people 集合

package.json

```
{
  "name": "express-hello",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.1",
    "express": "^4.14.0",
    "mongoose": "^4.7.2"
  }
}
```

### 前台书写　axios 请求

到　react-express-demo/　也就前台项目中，修改生命周期函数如下：

```
componentWillMount() {
  axios.get('http://localhost:3000/users').then((response) => {
    console.log(response);
      // this.setState({username: response.data.username});
  })
}
```

这样，就可以看出　response 中的数据结构了，我们想要的数据可以这样拿到

```
constructor(){
  super();
  this.state = {
    users: []
  };
}
componentWillMount() {
  axios.get('http://localhost:3000/users').then((response) => {
      this.setState({users: response.data.users});
  })
}
```

但是，如果在　render 函数中，我们这样写

render(){
  return(
    <div>
      {this.state.users}
    </div>
  )
}
就会触发下面的错误：

bundle.js:894 Uncaught (in promise) Error: Objects are not valid as a React child (found: object with keys {_id, username, email}). If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons. Check the render method of `App`.(…)
报错信息的大致意思是：对象不是被允许的　React 子元素。

解决方式，看下一小部分。

使用 map 展开数组

我们可以使用　ES6 自带的　map 来完成该任务。也可以加载　lodash 的　map 方法。

小贴士：什么是　lodash ? lodash 是一个　JS 的库，它里面提供了很多　JS 的基础方法，方便使用　JS 语言。 使用　lodash 是写　JS 代码的标配。 小贴士结束

安装　lodash

npm i --save lodash
然后，到　index.js 中导入一下

import map from 'lodash/fp/map';
render 函数做如下调整：

render(){
  const userList = map((user) => {
    return (
      <div key={user._id}>
        {user.username}
      </div>
    )
  }, this.state.users);

  return(
    <div>
      { userList }
    </div>
  )
}
这样，页面中就可以显示出所有用户的用户名的列表了。

前台代码

src/index.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import map from 'lodash/fp/map';


class App extends Component {
  constructor(){
    super();
    this.state = {
      users: []
    };
  }
  componentWillMount() {
    axios.get('http://localhost:3000/users').then((response) => {
      // console.log(response);
      this.setState({users: response.data.users});
    })
  }
  render(){
    const userList = map((user) => {
      return (
        <div key={user._id}>
          {user.username}
        </div>
      )
    }, this.state.users);

    return(
      <div>
        { userList }
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'));
webpack.config.js 如下：

var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
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
.babelrc 如下

{
  "presets": ["es2015", "react", "stage-0"],
  "plugins": []
}
index.html 如下：

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <div id="app"></div>
  <script src="./build/bundle.js" charset="utf-8"></script>
</body>
</html>
