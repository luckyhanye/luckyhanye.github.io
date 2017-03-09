---
title: 上手 Express 框架
layout: linux
---

## 上手 Express 框架

前面课程中介绍了 React , React 是一个 前端框架 ，前端框架是运行在浏览器 环境下的，负责 UI（ User Interface 用户界面）。

但是，我们想一想，如果只有 UI ，那么用户要看的数据从哪里来？用户需要保存的数据 如何进行运算之后保存到数据库中？这部分的功能就需要后端代码来完成。今天我们要介绍的 Express 就是一个后端(back-end)框架。

我们可能知道，当下实现后台服务，最流行的方式就是使用 Nodejs(提供大家在服务器端运行javeScript的可能，是JS的运行环境) , Express 就是 Nodejs 的 一个框架，而且是 Nodejs 各种后台框架中最为通用，最为流行的一个，没有之一。所以学习 Nodejs 最佳途径就是从 Express 入手。

### 你好，Express

Express 基于 Node.js 平台，快速、开放、极简的 web 开发框架。[官网](http://www.expressjs.com.cn/)上，
首页最能吸引我们注意的就是 API(Application Program Interface) 这个关键字。API 是应用开发接口，简称接口。
而 Express 就是用来制作后台接口的，或者说叫制作后台 API 的。

那么之后，我们整个项目的架构，就是用 Express 来制作后台 API , 这些 API 的使用 者就是前台 React 代码。

### Express应用

第一步，要新建文件夹，并把它初始化为一个 Nodejs 项目：

```
$ npm install express --save
```
注意：一个常见装包错误，如果我们项目文件夹的名和要装的包名同名，例如

```
mkdir express    //项目文件夹
cd express
npm init -y
npm install --save express     //安装的包
```

安装就会失败，报错信息为：

```
Refusing to install express as a dependency of itself
```

### 写后台代码，用 ES6 吗？

我们的前台代码，因为有 Babel 的支持，可以全部采用 ES6 来写。后台代码，我们会让它直接运行在 Nodejs 之上，不用 Babel （ 当然也可以用，但是配置比较麻烦，不值当的）。

如果我们到 Node.green 网站上，可以看到新版的 Nodejs (7.0 版本以上)对于 ES6 的支持已经到了99% 。所以， 不用 Babel 我们也可以直接使用 ES6 语法，但是唯一要注意的就是不能用 import （ 也就是说 nodejs 是不支持 ES6 模块语法的），我们的后台代码暂时需要用 require 来替代 import 。require 用的是 commonjs 模块语法， 这个是 Nodejs 原生支持的。

最终结论，ES6 可以用,但不能用import。

### 应用实例

参考[官网教程](http://www.expressjs.com.cn/starter/hello-world.html)，我们来写 Hello World 。

到项目中，创建一个 index.js 文件，内容如下：

```
const express =  require('express');
const app = express();

app.listen(3000);
```

上面三句代码，我们就自己动手实现了一个服务器( server ) 。服务器（这里指的是软件）的作用是，始终监听客户端的请求，或者说前端不给服务器发信号，服务器 就什么都不做，但是也不死，只是去循环执行，或者就叫**始终在监听**（listen）。

上面的 `3000` 指的是 3000端口 ，端口的英文是 port ，一个服务器好比一座大厦，有很多个门，3000 是其中一个门的门牌号。

上面的程序执行，到后台运行

```
node index.js
```

因为我们写的 index.js 是一个 nodejs 程序，所以用 node 命令去执行，这个执行过程跟浏览器已经脱离了。这个也基本上是我们到目前为止，唯一一个可以脱离浏览器执行的 JS 程序。

但是，现在运行的效果,没有输出内容，解决这个问题，我们就可以把 app.listen 部分修改成下面这样：

```
app.listen(3000, function(){
  console.log('running on port 3000...');
});
```

这样，后台执行的效果就是

```
$ node index.js
running on port 3000...
```

用户体验好了很多。上面添加的无名函数 `function(){...}` 在这里 的作用是`回调函数( callback function )` 。

> 小贴士：什么是回调函数？ 回调函数是我们写 JS 程序，最常见的功能之一。程序会先执行一个操作， 执行完这个操作后，回过头来要调用的那个函数，就叫回调函数。

一般格式如下：

```
app.listen(3000, function(){

});
```
一般回调函数的使用场合就是，之前的一个操作耗时比较长（或者是异步操作） 这样的情况下才使用回调函数。大家暂时不必深究，异步操作未来会成为大家的 必备知识。

### 运行 Express 服务器

服务器监听端口后，唯一的作用就是来根据端口传入的请求，来执行特定代码。

比如，我们在上面的 index.js 中，app.listen 语句的上面，添加如下代码：

```
app.get('/', function(){
  console.log('request come in...');
})
```

上面代码中 `get('/') `这是什么？

- get 是一个 http 请求的动词 ，类似的还有 post/delete/put 。

- / 是一个路径 ，英文 path

一个动词加一个路径，这样就组成一个 `HTTP` 请求 ，公式如下

```
request = verb + path + data
```

但是，这里的请求，不是发出请求，而是接收请求。

现在来发客户端请求

现在我们需要的客户端请求是，一个

```
GET /
```
同时这个请求，必须来自3000端口。

可以发请求的方式不唯一，可以用浏览器地址栏，可以用页面的 `form` 发， 也可以用 `axios` 发，后者使用专门的 API 调试工具 curl/postman 来发。

Postman 是一个辅助工具，用它的目的就是美观方便。但是 Postman 需要用到谷歌的服务，所以需要我们的机器可以翻墙才行。

> 翻墙方式：
  - 免费的：https://laod.cn
  - Peter 自己用：https://agentwho.rocks。

现在，我们就用浏览器的地址栏来发请求。地址栏中输入

```
http://localhost:3000/
```

上的请求，默认动词就是 `GET` ，同时 `:3000` 用来指定端口号。

请求之后，会发现浏览器里没有任何输出，这是因为，我们的 express 服务器根本就没有给前台返回任何字符串，回调函数中的 `console.log()` 只能把字符串打印到后台。

### 前端和后端

前端，`front-end`，或者也可以叫前台。后端，`back-end` 也可叫后台。

前端代码运行环境是什么呢？

对于我们 Web 开发者来说，就是浏览器。 注意，浏览器是安装在用户自己的机器上的。也就是说前端代码运行在我们自己的笔记本或者 ipad 上，如果前端代码写的烂，那么考验的是我们自己设备的内存大小。

后端代码运行环境是？

是一个放在人家机房里的刀片机。上面运行 Linux 操作系统。刀片机根本就没有显示器，当然也不能跑浏览器。所以后端代码的运行是脱离浏览器的。如果后端写的烂，那么考验的就是刀片机的内存够不够了。

然后，再从 API 的角度来聊聊。前端是 API 的消费者，后端是 API 的生产者。后台 API 写好之后，默认不运行，只有当前端发送过请求来的时候才会触发后台 API 代码运行。

当然，在平常开发的时候，我们并没购买刀片机，所有只能是用自己的笔记本来当刀片机用了。
这时候，基本可以认为 `express` 写的代码就是`后端代码`，`react` 写的代码就是`前端代码`。

### 继续前面的代码：返回字符串

前面的回调函数中，`console.log `打印字符串，只是出现在后端（服务器端）。前端得不到任何反馈。所以，我们可以把代码做如下修改

```
app.get('/', function(req, res){
  res.send('Hello World');
})
```
上面代码中 req 是 `request` 请求的简写， res 是 `response` 响应的简写 。`res.send('Hello World')`的作用是从后端向前端浏览器返回字符串 `Hello World` 。

### 总结

到这里，我们一个 Express 的 Hello World API 就制作完毕， 我们需要掌握的概念就是：

- 前端和后端的区别

- API 基本格式

- Express 使用方式

### 全部代码

package.json 如下：

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
    "express": "^4.14.0"
  }
}
```

index.js 代码如下

```
const express =  require('express');
const app = express();
```

// 下面三行就是我们实现的一个 API
```
app.get('/', function(req, res){
  res.send('Hello World');
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
```

上面两个文件都放在一个 express-hello 文件夹中，然后

```
cd express-hello
npm install
node index.js
```

就可以把代码运行起来了。


### 补充知识：框架，库，工具

- 工具：就是完成特定的一个小功能的软件，比如 Babel

- 库： 英文叫 lib ，我们每天 import 的东西，都是库。库是把一系列相关工具，组织到一起。例如，lodash ，react 。库里面的东西虽然多，但是都是干一类工作的。

- 框架：英文是 framework ，是把很多类功能的工具和库集合到一起，目的是完成整个项目。 例如，RubyOnRails,Express,React(纯粹的react，官方说法称为库，这里指的是 react + friends )
