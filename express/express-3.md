---
title: MongoDB 数据库
layout: linux
---

## MongoDB 数据库

网站运行需要有大量的数据的读取，同时用户也需要把自己的数据存储到服务器，对于海量数据的操作。 就需要有专门的软件配合，这个软件就是数据库。

当前比较流行的数据库，Oracle 甲骨文，SQL server ，这些都是商业数据库。但是，开源数据库 目前更受青睐。一个是 Mysql , 另一个是 MongoDB 。

我们课程中采用 MongoDB 数据库。MongoDB 是非关系型数据库，传统的关系型数据库的 table 表 和 record 记录，在 MongoDB 这里都有对应的替代物。

### 数据库基本概念

https://www.mongodb.com/ 是 MongoDB 的[官网](https://www.mongodb.com/)。

http://www.mongoing.com/ 是 MongoDB [中文社区](http://www.mongoing.com/)。

http://www.mongodb.org.cn/ 是 MongoDB [中文网](http://www.mongodb.org.cn/)。

- MongoDB：是一个数据库软件，有时候我们简称它叫一个数据库，但是其实一个 MongoDB 运行起来可以里面同时运行多个数据库
- Database: 数据库。一般做法是，一个项目对应一个数据库。
- Collection: 集合。类似于关系型数据库下的表的概念。
- Document：文档。一个集合中会包含多个文档。文档对应关系型数据库中的 记录 这个概念。

举例子来说，一个项目叫 facebook ，那么我们就建立一个c database 来存储这个项目的所有数据。 可以创建多个集合，比如 users 。一个 users 集合中，可以包含多个文档，每个文档中存储一个 user 的信息（信息可以有多项：email, name, brithday …）。

安装

在 deepin Linux 或者 ubuntu 系统，都是一样的命令

直接运行命令

sudo apt-get install mongodb
这个是安装的深度公司服务器上的 mongodb 。可能版本比较老。

可以按照这里的步骤 安装比较新的版本：

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
命令行操作，使用 Mongo Shell

启动 mongodb

mkdir -p data/db
mongod --dbpath=./data/db
这样，mongodb 就启动成功了，启动端口是 27017 。

现在要进行 Mongodb 数据库操作，我们就开启 Mongo Shell

mongo
这样，我们进入 Mongo 的命令行界面。

插入一条数据

可以参考：http://haoqicat.com/react-express-api/2-mongodb 可以参考：http://newming.coding.me/myidoc/html/%E6%95%B0%E6%8D%AE%E5%BA%93/mongodb.html

现在思考一下，一条数据，应该保存成一个什么单位？给出三个选项：数据库，集合，文档？

答案：一个文档。那么要保存一个文档，先要有一个数据库，再创建一个集合，然后集合中 才能插入这个文档。这个是总体思路。

具体操作步骤如下：

第一步，创建一个数据库

$ use digicity
switched to db digicity
下面的输出 switched to db digicity 意思是：已经切换到 digicity 这个数据库里面了。

查看数据库有没有创建成功，可以用

show dbs
暂时，没有保存数据到该数据库，所以，输出中没有 digicity 。

第二步，创建集合

创建集合，集合名称叫 users 。

> db.createCollection('users')
{ "ok" : 1 }
第三步，把一条数据，保存成一条文档（ Document ）

> db.users.insert({username: 'peter', email: 'peter@peter.com' })
WriteResult({ "nInserted" : 1 })
输出结果 WriteResult({ "nInserted" : 1 }) 表述成功写入一条数据。

第四步，列出一个集合中的所有文档：

db.users.find({})
对数据记录进行增删改查

第一步，增。

> db.users.insert({username: 'billie', email: 'billie@billie.com'})
第二步，改。

代码中比较推荐用 save ，不推荐 update。

 db.users.update({_id: ObjectId("584b62b830a2a2cbf4c4c3f6")}, {username: "billie66", email:"billie@billie.com"})
update 接口中有两个参考，第一个是查询条件，用来定位要更新的是哪一个文档，后面是更新后的数据。

第三步，查。

db.users.find({})
可以列出所有的 users 集合中的文档。

第四步，删。

删除特定一个文档：

> db.users.remove({_id:  ObjectId("584b5dbf30a2a2cbf4c4c3f5")})
WriteResult({ "nRemoved" : 1 })
删除集合中所有文档：

> db.users.remove({})
mongo shell 中的基本操作我们就介绍到这里。但是，我们发现敲命令比较麻烦，所以，可以考虑 使用图形化的界面来操作 MongoDB 。

图形化的操作界面 mongo-express

Mongo-express 是一个用 express 技术开发的，MongoDB 的　GUI (图形界面)　。可以方便美观的 操作 MongoDB 中的数据。

参考：http://haoqicat.com/hand-in-hand-react/4-mongo-express

一般系统上的工具，我们用全局安装就可以

npm install -g mongo-express
mongo-express 装好之后，我们需要通知它，到底要连接到哪个数据库。这个是通过，修改 mongo-express 的配置文件来搞定的。

所以首先第一步，我们先要找到　mongo-express 的配置文件。

$ npm list -g mongo-express
/home/peter/.nvm/versions/node/v7.1.0/lib
找到安装位置后，就可以进入安装文件夹，来修改配置文件了。

cd /home/peter/.nvm/versions/node/v7.1.0/lib
cd node_modules
cd mongo-express
cp config.default.js config.js
最后一步，就是把假配置文件 ，改名为真的　config.js , 也就是说是程序真正会读到的配置文件。

打开配置文件，把

mongo = {
  db:       'db',
  username: 'admin',
  password: 'pass',
  ...
  url:      'mongodb://localhost:27017/db',
};
改为

mongo = {
  db:       'digicity',
  username: '',
  password: '',
  ...
  url:      'mongodb://localhost:27017/digicity',
};
上面的　digicity 就是我们要操作的数据库的名字，这个是通过　mongo shell 中，执行

show dbs
看到的。

同时，mongo-express 的密码有默认值，通过　config.js 中这几行：

basicAuth: {
  username: process.env.ME_CONFIG_BASICAUTH_USERNAME || 'admin',
  password: process.env.ME_CONFIG_BASICAUTH_PASSWORD || 'pass',
},
用户名是　admin ，密码是　pass 。

启动　mongo-express 需要开启一个新的命令行标签。然后输入

$ mongo-express
在深度 Linux 上，输出如下

Mongo Express server listening at http://localhost:8081
basicAuth credentials are "admin:pass", it is recommended you change this in your config.js!
Connecting to digicity...
虽然上面有一个　MongoError 但是，浏览器中打开：　 http://localhost:8081 可以开始使用 mongo-express 了。

总结

上面。我们分别用 Mongo Shell 和　mongo-express 两种方式，对　mongodb 数据库进行了操作。 但是，最重要的一种操作　mongodb　的形式我们还没有介绍。这就是用　JS　来操作　mongodb 。
