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

打开 express-backend 的 index.js 文件，导入 mongoose

```
const mongoose = require('mongoose');
```

### 连接数据库

然后进行连接,添加如下代码

```
mongoose.connect('mongodb://localhost:27017/react-express-demo');

// 执行此行代码之前，要保证 mongodb 数据库已经运行了，而且运行在 27017 端口
```
启动数据库，保证有一个 database（数据库） 叫做 react-express-demo 。

然后添加下面代码

```
let db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success!')
});
```

如果连接数据库成功，就打印 success 。once('open') 的意思就是 “一旦打开成功” 。如果数据库没有启动，是看不到 success 的。

### 创建数据 model

创建一个专门的　models/user.js ，里面代码的作用是，实现一个对象跟一个数据集合之间映射关系。

```
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String }
  }
);
module.exports = mongoose.model('User', UserSchema);

// `User` 会自动对应数据库中的　users 这个集合
// 如果这里是　Apple 那么就会对应　apples 集合
// 如果这里是　Person 那么就会对应　people 集合
```

首先创建了一个　Schema （概要），Schema 就是用来描述这个集合中每个文档的数据结构，具体来讲就是

- 有哪几个字段（　field ）？我们这里有两个　username 和　email

- 每个字段的类型

这样，映射关系就建立完毕。最终用`module.exports`导出的就是一个 module (模型)

### 保存一个文档

把　db.once 部分的代码，改成下面这个样子

```
db.once('open', function() {
   let user = new User({username: 'Hanye', email: 'hanye@hanye.com'});
   user.save(function(err){
     if(err) console.log(err);
   })
  console.log('success!')
});
```

然后，后台重启 index.js 看看数据库中，的确添加了一个文档。

强调：`User` 对应　users 集合，它本身是　models/user.js 中导出的一个 model 。所以说　User 就是一个空盒子。而小写的 `user` 是　new User 得到的一个对象，对应一个实际的文档，所以其中会真 正保存一个用户的实际　username 和 email 数据。

`user.save` 就是把　user 中已经有的数据（在内存中），真正保存到　MongoDB 数据库中（保存到硬盘上）。

### 解决那个讨厌的警告

后台 index.js 运行时可以看到一个讨厌的警告信息，虽然不影响代码运行效果，但是也很碍眼。

Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library
解决办法是在连接 MongoDB 数据库 mongoose.connect(...); 之前，添加一行代码：

```
mongoose.Promise = global.Promise;
```

重启后台，警告信息就没有了。

代码

index.js 如下

```
const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/digicity');
```

// 执行此行代码之前，要保证 mongodb 数据库已经运行了，而且运行在 27017 端口

```
let db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
   let user = new User({username: 'inCode', email: 'inCode@incode.com'});
   user.save(function(err){
     if(err) console.log(err);
   })
  console.log('success!')
});
```

// 下面三行就是我们实现的一个 API

```
app.get('/username', function(req, res){
  res.json({"username": "happypeter"});
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
// `User` 会自动对应数据库中的　users 这个集合
// 如果这里是　Apple 那么就会对应　apples 集合
// 如果这里是　Person 那么就会对应　people 集合
```

package.json 如下

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
