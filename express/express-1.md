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

如果我们到 Node.green 网站上，可以看到新版的 Nodejs (7.0 版本以上)对于 ES6 的支持已经到了99% 。所以， 不用 Babel 我们也可以直接使用 ES6 语法，但是唯一要 注意的就是不能用 import （ 也就是说 nodejs 是不支持 ES6 模块语法的），我们的后台代码暂时需要用 require 来替代 import 。require 用的是 commonjs 模块语法， 这个是 Nodejs 原生支持的。

最终结论，ES6 可以用。







### 补充知识：框架，库，工具

- 工具：就是完成特定的一个小功能的软件，比如 Babel
- 库： 英文叫 lib ，我们每天 import 的东西，都是库。库是把一系列相关工具，组织到一起。例如，lodash ，react 。库里面的东西虽然多，但是都是干一类工作的。
- 框架：英文是 framework ，是把很多类功能的工具和库集合到一起，目的是完成整个项目。 例如，RubyOnRails,Express,React(纯粹的react，官方说法称为库，这里指的是 react + friends )
