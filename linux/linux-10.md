---
title: 初试Webpack
layout: linux
---

## 初试Webpack

webpack是一款强大的模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。[官网](http://webpack.github.io/)

接下来我们将一步步熟悉Webpack的使用，并使用它来搭建一套前端工作流。

### 初始化项目

创建一个项目

```
$ mkdir webpack-demos && cd webpack-demos (创建一个文件夹，跳转到此文件夹)
$ git init （初始化仓库）
$ touch README.md .gitignore （新建文件）
$ npm init（初始化 node 项目，生成 package.json 文件）
```

编辑.gitignore

> “.gitignore”文件的作用：



```
node_modules
*.log*
.idea
```


建立src和build两个目录


```
// src 目录存放源码，build 目录存放编译打包之后的资源
$ mkdir src build
$ cd src && touch index.js component.js
$ cd ../ && touch index.html
```

```
/* src/index.js */
var component = require('./component.js');

component();
/* src/component.js */
module.exports = function(){
  alert('component');
}
/*index.html */
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Webpack demos</title>
</head>
<body>
  <div id="app"></div>
  <script src="./build/bundle.js"></script>
</body>
</html>
```


下载webpack和webpack-dev-server


```
# 安装并保存在项目的依赖中
$ npm install --save-dev webpack webpack-dev-server
# 如果想直接在命令行使用webpack或webpack-dev-server命令，请全局安装
$ npm install -g webpack webpack-dev-server
```


创建webpack的配置文件


```
$ touch webpack.config.js
```

>请注意webpack.config.js这个文件命名，默认情况下需要严格按照这个命名，不然会报Output filename not configured的错误；另外，如果不按这个命名，那么在webpack运行的时候通过--conf这个参数指定配置文件，比如：webpack --config conf.js


进行基本配置


```
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
};
```


执行webpack命令,这里我们用的是项目内安装的webpack


```
$ ./node_modules/.bin/webpack
```

可以看到控制台出现如下信息：


```
Hash: cf7cc9272c664f542fcb
Version: webpack 1.13.0
Time: 80ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.04 kB       0  [emitted]  main
   [0] ./src/index.js 60 bytes {0} [built]
   [1] ./src/component.js 57 bytes {0} [built]
```


build目录下也新增了一个bundle.js文件

### webpack和webpack-dev-server的基本命令

```
$ webpack --help
```

执行以上命令，可以在控制台看到很多webpack相关的命令，选取几个常用的介绍下。

- webpack 开发环境下编译

- webpack -p 产品编译及压缩

- webpack --watch 开发环境下持续的监听文件变动来进行编译(非常快!)

- webpack -d 引入 source maps

- webpack --progress 显示构建进度

- webpack --display-error-details 这个很有用，显示打包过程中的出错信息

- webpack --profile 输出性能数据，可以看到每一步的耗时

另外，让我们使用webpack-dev-server来起一个本地服务进行调试,这里任然用的是项目内部的webpack-dev-server

```
$ ./node_modules/.bin/webpack-dev-server --progress --colors
```

修改我们的index.html代码

```
<script type="text/javascript" src="/bundle.js"></script>
```

打开localhost:8080，回车即可。

那么执行webpack-dev-server后面的几个参数是什么意思呢？


- webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器

- webpack-dev-server --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号

- webpack-dev-server --progress - 显示合并代码进度

- webpack-dev-server --colors - 命令行中显示颜色

- webpack-dev-server --content-base build - webpack-dev-server服务会默认以当前目录伺服文件，如果设置了content-base的话，服务的根路径则为build目录

- webpack-dev-server --inline 可以自动加上dev-server的管理代码，实现热更新

- webpack-dev-server --hot 开启代码热替换，可以加上HotModuleReplacementPlugin

- webpack-dev-server --port 3000 设置服务端口

关于webpack-dev-server的简单介绍：webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。它还有一个通过Socket.IO连接着webpack-dev-server服务器的小型运行时程序。webpack-dev-server发送关于编译状态的消息到客户端，客户端根据消息作出响应。

### devServer

刚才我们看到，在运行webpack-dev-server的时候，后面带了一串参数，这里我们可以使用devServer字段统一在webpack.config.js文件里面维护。


```
/* webpack.config.js */
var path = require('path');

module.exports = {
  entry(入口文件): './index.js'，
  output(出口文件): {
    path: 'build',（文件夹，名称随意，可写可不写）
    filename: 'bundle.js'（出口文件名称）
  }
}
  devServer: {
    publicPath: "/static/",
    stats: { colors: true },
    port: 3000,
    inline: true
  }
};
```


同时，我们可以简化scripts字段的配置了


```
"scripts": {
    "dev": "./node_modules/.bin/webpack-dev-server"
}
```


对应的修改index.html文件中的资源引用地址


```
<script src="/static/bundle.js"></script>
```

ok, npm run dev即可

### devtool

我们在配置中新增devtool字段，并设置值为source-map，这样我们就可以在浏览器中直接调试我们的源码，在控制台的sources下，点开可以看到webpack://目录，点开有惊喜哦。

代码清单：webpack.config.js

```
devtool: 'cheap-module-source-map'
```

devtool可以有几个配置项：

```
devtool          | build <br> speed | rebuild <br> speed | production <br> supported | quality
-----------------|------------------|--------------------|---------------------------|--------

```

### 多文件入口

```
$ cd src && touch entry1.js entry2.js
```

```
/* webpack.config.js */
var path = require('path');

module.exports = {
    entry: {
      entry1: './src/entry1.js',
      entry2: './src/entry2.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
};
```

### resolve解析

resolve下常用的是extension和alias字段的配置：

- extension 不用在require或是import的时候加文件后缀

  ```
  /* webpack.config.js */
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  ```

```
- var component = require('./component.js');
+ var component = require('./component');
```

- alias 配置别名，加快webpack构建的速度

每当引入jquery模块的时候，它会直接引入jqueryPath,而不需要从node_modules文件夹中按模块的查找规则查找,不需要webpack去解析jquery.js文件

先安装jQuery

```
npm install jquery --save
```

修改 webpack.config.js

```
resolve: {
   extensions: ["",".js",".css",".json"],
+  alias: {
+    'jquery': jqueryPath
+  }
},
```

### 使用Babel-loader来解析es6和jsx

我们在 src/index.js 里面尝试写一个最基本的组件代码，暂时不用理会代码为什么要这么写，这里先把ES6语法和JSX语法加进来，用于跑通我们的开发环境，后续会有专题内容来详细讲述。

首先要安装工具包，步骤如下：

- 打开 [babel](https://babeljs.io/) 官网；

- 找到docs——Setup，选择webpack,在命令行中输入如下代码：

  ```
  npm install --save-dev babel-loader babel-core
  ```
  即可安装；

- 在 "webpack.config.js" 中粘贴如下代码：

  ```
  module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
  ```
  把 上面的 “loaders” 改为 “rules”, 下面的 "loaders" 改为 “use”; 如下所示：

  ```
  module.exports={
  entry:'./src/newindex.js',
  output:{
    path:'build',
    filename:'bundle.js'
  },
  devtool: 'eval',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }
    ]
  }
};
```

- 新建文件 ".babelrc",





代码清单：src/index.js

```
'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends Component {
  render(){
    return (
      <h1>Hello world</h1>
    )
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('app'));
```

ok，我们看到，我们的代码用到了基本的react.js和react-dom.js，而且使用的是ES6的语法来封装的组件和应用模块。

所以接下来我们要做两件事：

下载相应的模块：

```
$ npm install --save react react-dom
```

下载并配置babel，以解析ES6语法和JSX语法。

babel是一款强大的解析器，拥有活跃而且完善的生态，不仅可以做JS相关的各种语法的解析，还提供丰富的插件功能。

```
$ npm install babel-loader babel-core --save-dev
```

安装后我们需要配置webapck.config.js文件

代码清单：webpack.config.js

```
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
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

这里指定了使用babel-loader来解析js文件，但是并没有告诉babel应该如何来解析，所以我们需要创建一个babelrc配置文件

```
$ touch .babelrc
```

然后编辑babelrc 代码清单：.babelrc

```
{
  "presets": ["es2015", "react", "stage-0"],
  "plugins": []
}
```

为什么配置的是这两个参数，解释一下，配置的preset字段是在为babel解析做预设，告诉babel需要使用相关的预设插件来解析代码，plugins字段，顾名思义，就是用来配置使用babel相关的插件的，这里暂且不装。

这里使用到了三个预设需要下载安装

```
$ npm install --save-dev babel-preset-es2015 babel-preset-react babel-preset-stage-0
// 其中stage-0预设是用来说明解析ES7其中一个阶段语法提案的转码规则
```

好了，开始运行试一下吧

```
$ npm run dev
```

在浏览器中访问：http://localhost:3000/

### 解析样式文件

```
style-loader css-loader less-loader
```

前面的大部分工作都在处理JS逻辑的解析和加载，但是我们还一直没有提我们的样式文件应该如何去处理。

我们在课程中暂且约定使用less预处理器（saas的类似）来写我们项目的样式，那么首先需要下载几个webpack的loader

```
$ npm install --save-dev style-loader css-loader less-loader
```

进行webpack配置。 代码清单：webpack.config.js

```
loaders: [
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: path.resolve(__dirname, 'node_modules')
    },
    {
      test: /\.css/,
      loader: 'style!css'
    },
    {
      test: /\.less/,
      loader: 'style!css!less'
    }
]
```

### 图片加载

```
{
  test: /\.(jpe?g|png)$/,
  loader: 'file-loader'
}
```

### 图标字体等资源

图标字体的加载可以选择file-loader 或 url-loader 进行加载，配置如下（示例配置，大家在项目中最好还是按实际情况配置）

```
{
  test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
  loader: "url?limit=10000"
}
```


nodejs 的模块分为 3 类，核心模块，第三方模块，以及自定义的模块

```
// 通过 module.exports 导出模块，require 导入模块。

// 导入核心模块
var fs = require('fs')

// 导入第三方模块
var $ = require('jquery')

// 导入自定义的模块
var test = require('./test')

// 导出模块
module.exports.test = 'test';
```

我们的前端开发会用到 es6 的模块，需要用 webpack 来打包我们的代码。

```
// 创建项目文件夹
mkdir webpack-demo && cd webpack-demo

// 初始化项目
npm init -y

// 安装 webpack
npm i -D webpack

// 编写我们的 npm 脚本，使用项目内的 webpack
"scripts": {
  "build": "./node_modules/.bin/webpack"
}
// 增加 webpack 的配置文件 webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  }
}
```
