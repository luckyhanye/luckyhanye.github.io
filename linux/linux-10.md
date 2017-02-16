---
title: 初试Webpack
layout: linux
---

## 初试Webpack

webpack是一款强大的模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。[官网](http://webpack.github.io/)

接下来我们将一步步熟悉Webpack的使用，并使用它来搭建一套前端工作流。



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

```
  module.exprots={
    entry(入口文件): './index.js'，
    output(出口文件): {
      path: 'build',（文件夹，名称随意，可写可不写）
      filename: 'bundle.js'（出口文件名称）
    }
  }
  ```

  ```
  {
    "name": "hanye-demo",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "node -v",
      "pack": "./node_modules/.bin/webpack index1.js new.js -p --watch -d --progress --display-error-details ",
      "push": "git add . && git commit -m'change' && git push"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^2.2.1"
    }
  }
```
