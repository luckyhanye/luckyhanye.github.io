---
title: 显示一个用户的信息
layout: linux
---

## 显示一个用户的信息

我们这一节，没有新知识点，就是下面几部分知识的综合使用：

- MongoDB 数据库基本操作

- Mongoose 这个 JS 库的使用

- 前台向后台传递参数：涉及 axios 和 express 配合

- React 基本操作

我们要完成的任务是，用户在浏览器中点按钮，发　**axios** 请求访问这个链接：

> http://localhost:3000/users/一个真实的用户 id

页面上要能显示出用户名和邮箱。

### 前台代码

我们先打开 `mongo-express` ，拷贝一个真实的 id 出来。然后粘贴到 前台代码的 `axios` 请求中

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  handleClick(e){
    e.preventDefault();
    axios.get('http://localhost:3000/users/584dfb6fd5aa1c13955d5cca').then((response) => {
      console.log(response);
      this.setState({
        user: response.data.user
      });
    })
  }
  render(){
    return(
      <div>
        <div onClick={this.handleClick.bind(this)}>
           clickme
        </div>
        <div>
          username:
          { this.state.user.username }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'));
```

后台增加请求一位用户信息的API


src/index.js

```
const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/digicity');
// 执行此行代码之前，要保证 mongodb 数据库已经运行了，而且运行在 27017 端口

var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success');
});

// 下面三行就是我们实现的一个 API
app.get('/users/:id', function(req, res){
  User.findById(req.params.id,function (err,user) {
    console.log(user);
    res.json(user)
  })
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
```

models/user.js

```
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

### 总结

这样，前台打开 index.html 文件，点一下 clickme ，就可以在页面上 显示出从后台 mongodb 中取出的用户的 username 了。
